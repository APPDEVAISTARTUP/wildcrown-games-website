import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getClient: vi.fn(),
  invoke: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({ getSupabaseClient: mocks.getClient }));

import { submitKaalvanWishlist } from "@/lib/wishlist-registration";

describe("KAALVAN website wishlist submission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getClient.mockReturnValue({ functions: { invoke: mocks.invoke } });
  });

  it("sends the normalized form to the Edge Function without using Auth", async () => {
    mocks.invoke.mockResolvedValue({ data: { success: true }, error: null });

    const result = await submitKaalvanWishlist({
      email: "  PLAYER@Example.com ",
      name: "  Player  ",
      turnstileToken: "challenge-token",
      company: "",
    });

    expect(result).toBe("success");
    expect(mocks.invoke).toHaveBeenCalledWith("kaalvan-wishlist", {
      body: {
        email: "player@example.com",
        name: "Player",
        turnstileToken: "challenge-token",
        company: "",
      },
    });
  });

  it("reports rate limits without exposing registration existence", async () => {
    mocks.invoke.mockResolvedValue({ data: null, error: { context: { status: 429 } } });

    await expect(submitKaalvanWishlist({ email: "player@example.com", name: "", turnstileToken: "token", company: "" }))
      .resolves.toBe("rate-limited");
  });

  it("fails closed when Supabase is not configured", async () => {
    mocks.getClient.mockReturnValue(null);

    await expect(submitKaalvanWishlist({ email: "player@example.com", name: "", turnstileToken: "token", company: "" }))
      .resolves.toBe("unconfigured");
    expect(mocks.invoke).not.toHaveBeenCalled();
  });
});
