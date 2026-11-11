import { getSupabaseClient } from "@/lib/supabase";

export type WishlistSubmissionResult = "success" | "rate-limited" | "unconfigured" | "error";

export async function submitKaalvanWishlist(input: {
  email: string;
  name: string;
  company: string;
}): Promise<WishlistSubmissionResult> {
  const client = getSupabaseClient();
  if (!client) return "unconfigured";

  const { data, error } = await client.functions.invoke("kaalvan-wishlist", {
    body: {
      email: input.email.trim().toLowerCase(),
      name: input.name.trim(),
      company: input.company,
    },
  });

  if (error) {
    const context = error.context;
    if (context && typeof context === "object" && "status" in context && context.status === 429) return "rate-limited";
    return "error";
  }
  if (data?.success === true) return "success";
  if (data?.error === "rate_limited") return "rate-limited";
  return "error";
}
