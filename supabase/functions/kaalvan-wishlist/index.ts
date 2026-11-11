import { createClient } from "npm:@supabase/supabase-js@2";

const localOrigins = ["http://localhost:8080", "http://127.0.0.1:8080"];
const configuredOrigins = (Deno.env.get("WISHLIST_ALLOWED_ORIGINS") ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...localOrigins, ...configuredOrigins]);
const genericSuccess = { success: true };

function respond(body: unknown, status: number, origin: string) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    Vary: "Origin",
  });
  if (allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Headers", "authorization, apikey, x-client-info, content-type");
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  }
  return new Response(JSON.stringify(body), { status, headers });
}

function getClientIp(request: Request) {
  const direct = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-real-ip");
  if (direct?.trim()) return direct.trim();
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

async function hmacHex(secret: string, message: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin") ?? "";
  if (!allowedOrigins.has(origin)) return respond({ error: "not_allowed" }, 403, origin);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  } });
  if (request.method !== "POST") return respond({ error: "method_not_allowed" }, 405, origin);

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > 8192) return respond({ error: "invalid_request" }, 413, origin);
  let body: Record<string, unknown> | null;
  try {
    body = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    body = null;
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return respond({ error: "invalid_request" }, 400, origin);

  // A filled honeypot is indistinguishable from success and never reaches storage.
  if (typeof body.company === "string" && body.company.trim()) return respond(genericSuccess, 200, origin);

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (body.gameSlug !== undefined && body.gameSlug !== "kaalvan") return respond({ error: "invalid_request" }, 400, origin);
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) return respond({ error: "invalid_email" }, 400, origin);
  if (name.length > 100) return respond({ error: "invalid_request" }, 400, origin);

  const projectUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const rateLimitSecret = Deno.env.get("RATE_LIMIT_HMAC_SECRET");
  if (!projectUrl || !serviceRoleKey || !rateLimitSecret) {
    return respond({ error: "service_unavailable" }, 503, origin);
  }
  if (new TextEncoder().encode(rateLimitSecret).byteLength < 32) {
    return respond({ error: "service_unavailable" }, 503, origin);
  }

  const admin = createClient(projectUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const ip = getClientIp(request);
    const ipKey = await hmacHex(rateLimitSecret, `ip:${ip}`);
    const ipLimit = await admin.rpc("consume_wishlist_rate_limit", {
      p_key_hash: ipKey,
      p_max_requests: 12,
      p_window_seconds: 600,
    });
    if (ipLimit.error) return respond({ error: "service_unavailable" }, 503, origin);
    if (ipLimit.data !== true) return respond({ error: "rate_limited" }, 429, origin);

    const emailKey = await hmacHex(rateLimitSecret, `email:${email}`);
    const emailLimit = await admin.rpc("consume_wishlist_rate_limit", {
      p_key_hash: emailKey,
      p_max_requests: 3,
      p_window_seconds: 86400,
    });
    if (emailLimit.error) return respond({ error: "service_unavailable" }, 503, origin);
    if (emailLimit.data !== true) return respond({ error: "rate_limited" }, 429, origin);

    const { error } = await admin.from("wishlist_registrations").insert({
      game_slug: "kaalvan",
      email,
      name: name || null,
    });
    if (error?.code === "23505") return respond(genericSuccess, 200, origin);
    if (error) {
      console.error("Wishlist insert failed", error.code ?? "unknown");
      return respond({ error: "service_unavailable" }, 503, origin);
    }
    return respond(genericSuccess, 200, origin);
  } catch {
    return respond({ error: "service_unavailable" }, 503, origin);
  }
});
