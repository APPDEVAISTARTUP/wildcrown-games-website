import { useState, type FormEvent } from "react";
import { z } from "zod";
import type { Game } from "@/data/games";
import { isSupabaseConfigured } from "@/lib/supabase";
import { submitKaalvanWishlist } from "@/lib/wishlist-registration";
import { TurnstileWidget } from "./TurnstileWidget";

const turnstileSiteKey = import.meta.env["VITE_TURNSTILE_SITE_KEY"]?.trim() ?? "";
const isWishlistConfigured = isSupabaseConfigured && Boolean(turnstileSiteKey);

const registrationSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254, "Email address is too long."),
  name: z.string().trim().max(100, "Name must be 100 characters or fewer."),
  company: z.string().max(200),
});

type RegistrationStatus = "idle" | "sending" | "success" | "rate-limited" | "captcha-required" | "error" | "unconfigured";

export function WishlistRegistration({ game }: { game: Game }) {
  const [status, setStatus] = useState<RegistrationStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState(false);
  const [widgetVersion, setWidgetVersion] = useState(0);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = registrationSchema.safeParse({
      email: data.get("email"),
      name: data.get("name") ?? "",
      company: data.get("company") ?? "",
    });

    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      setStatus("idle");
      return;
    }

    setErrors({});
    if (!isWishlistConfigured) {
      setStatus("unconfigured");
      return;
    }
    if (!turnstileToken) {
      setStatus("captcha-required");
      return;
    }

    setStatus("sending");
    try {
      const submitResult = await submitKaalvanWishlist({ ...parsed.data, turnstileToken });
      setStatus(submitResult);
      if (submitResult === "success") form.reset();
    } catch {
      setStatus("error");
    } finally {
      setTurnstileToken("");
      setWidgetVersion((version) => version + 1);
    }
  }

  const field =
    "mt-2 w-full border border-input bg-transparent px-3 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none";

  return (
    <div className="border border-border bg-background p-5 md:p-6">
      <p className="eyebrow">{game.title} website wishlist</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Add your email and optional name for the KAALVAN website wishlist. No email is sent when you join; this list is separate from the official Steam wishlist.
      </p>
      <form noValidate onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2">
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            aria-invalid={Boolean(errors["email"])}
            aria-describedby={errors["email"] ? "wishlist-email-error" : undefined}
            className={field}
            placeholder="you@example.com"
          />
          {errors["email"] && <span id="wishlist-email-error" className="mt-2 block text-sm text-destructive">{errors["email"]}</span>}
        </label>
        <label className="block text-sm sm:col-span-2">
          Name <span className="text-muted-foreground">(optional)</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            aria-invalid={Boolean(errors["name"])}
            aria-describedby={errors["name"] ? "wishlist-name-error" : undefined}
            className={field}
            placeholder="Your name"
          />
          {errors["name"] && <span id="wishlist-name-error" className="mt-2 block text-sm text-destructive">{errors["name"]}</span>}
        </label>
        <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>Leave this field empty<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label>
        </div>
        {turnstileSiteKey && (
          <div className="sm:col-span-2">
            <TurnstileWidget
              key={widgetVersion}
              siteKey={turnstileSiteKey}
              onToken={(token) => {
                setTurnstileToken(token);
                if (token) {
                  setTurnstileError(false);
                  setStatus((current) => current === "captcha-required" ? "idle" : current);
                }
              }}
              onError={() => { setTurnstileToken(""); setTurnstileError(true); setStatus("error"); }}
            />
          </div>
        )}
        <button type="submit" className="btn-gold sm:col-span-2" disabled={status === "sending" || !isWishlistConfigured}>
          {status === "sending" ? "Adding…" : "ADD TO WISHLIST"}
        </button>
      </form>
      <div role="status" aria-live="polite" className="mt-4 text-sm">
        {!isWishlistConfigured && (
          <p className="border border-border p-3 text-muted-foreground">Wishlist registration will be available when Supabase and Turnstile are configured.</p>
        )}
        {status === "success" && (
          <p className="border border-gold-soft p-3">KAALVAN has been added to your wishlist!</p>
        )}
        {status === "rate-limited" && (
          <p className="border border-border p-3">Please wait a little while before trying again.</p>
        )}
        {status === "captcha-required" && (
          <p className="border border-border p-3">Complete the bot protection check to continue.</p>
        )}
        {status === "error" && (
          <p className="border border-destructive/60 p-3">{turnstileError ? "Bot protection could not load. Refresh the page and try again." : "We couldn’t add your wishlist entry. Please try again later."}</p>
        )}
        {status === "unconfigured" && (
          <p className="border border-border p-3 text-muted-foreground">Wishlist registration is not connected yet.</p>
        )}
      </div>
    </div>
  );
}
