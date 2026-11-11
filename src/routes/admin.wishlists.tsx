import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/admin/wishlists")({
  head: () => ({
    meta: [
      { title: "Website wishlist registrations — Wildcrown Games" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: WishlistAdmin,
});

type Registration = { id: string; game_slug: string; email: string; name: string | null; created_at: string };
type AccessState = "checking" | "signed-out" | "not-admin" | "ready" | "error";
const emailSchema = z.string().trim().email().max(254);
const PAGE_SIZE = 50;

function WishlistAdmin() {
  const [access, setAccess] = useState<AccessState>(isSupabaseConfigured ? "checking" : "error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<Registration[]>([]);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(false);

  async function loadPage(pageIndex: number) {
    const client = getSupabaseClient();
    if (!client) { setAccess("error"); return; }
    setBusy(true);
    const { data, count, error } = await client
      .from("wishlist_registrations")
      .select("id, game_slug, email, name, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE - 1);
    setBusy(false);
    if (error) { setAccess("error"); setNotice("The registration list could not be loaded."); return; }
    setRows((data ?? []) as Registration[]);
    setTotal(count ?? 0);
    setPage(pageIndex);
    setAccess("ready");
  }

  async function checkAccess() {
    const client = getSupabaseClient();
    if (!client) { setAccess("error"); return; }
    const { data, error } = await client.auth.getSession();
    if (error) { setAccess("error"); return; }
    const user = data.session?.user;
    if (!user) { setAccess("signed-out"); return; }

    const { data: membership, error: membershipError } = await client
      .from("wishlist_admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (membershipError) { setAccess("error"); return; }
    if (!membership) { setAccess("not-admin"); return; }

    await loadPage(0);
  }

  useEffect(() => {
    void checkAccess();
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success || !password) { setNotice("Enter the administrator email and password."); return; }
    const client = getSupabaseClient();
    if (!client) { setAccess("error"); return; }
    setBusy(true);
    setNotice("");
    const { error } = await client.auth.signInWithPassword({ email: parsed.data.toLowerCase(), password });
    setBusy(false);
    if (error) {
      setNotice("The administrator email or password could not be verified.");
      return;
    }
    setPassword("");
    await checkAccess();
  }

  async function signOut() {
    const client = getSupabaseClient();
    if (!client) return;
    await client.auth.signOut();
    setRows([]);
    setTotal(0);
    setAccess("signed-out");
    setNotice("You have signed out.");
  }

  async function exportCsv() {
    const client = getSupabaseClient();
    if (!client || access !== "ready") return;
    setBusy(true);
    setNotice("");
    const allRows: Registration[] = [];
    for (let start = 0; start < total; start += 1000) {
      const { data, error } = await client
        .from("wishlist_registrations")
        .select("id, game_slug, email, name, created_at")
        .order("created_at", { ascending: false })
        .range(start, start + 999);
      if (error) {
        setBusy(false);
        setNotice("The export could not be completed.");
        return;
      }
      allRows.push(...((data ?? []) as Registration[]));
      if (!data?.length) break;
    }

    const cell = (value: string | null) => {
      let safe = value ?? "";
      if (/^[\t\r ]*[=+@-]/.test(safe)) safe = `'${safe}`;
      return `"${safe.replaceAll('"', '""')}"`;
    };
    const csv = [
      ["id", "game_slug", "email", "name", "created_at"],
      ...allRows.map((row) => [row.id, row.game_slug, row.email, row.name, row.created_at]),
    ].map((record) => record.map(cell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "kaalvan-website-registrations.csv";
    link.click();
    URL.revokeObjectURL(url);
    setBusy(false);
    setNotice("Website registration export downloaded. This is separate from Steam wishlist data.");
  }

  return (
    <section className="container-x min-h-[55vh] py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow">Private admin area</p>
        <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">KAALVAN website registrations</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">This private list contains KAALVAN website wishlist entries. It is separate from official Steam wishlist data and is not a Steam wishlist count.</p>

        {!isSupabaseConfigured && <p className="mt-8 border border-border p-5 text-muted-foreground">Supabase is not configured. Follow SUPABASE_SETUP.md to connect a project.</p>}
        {isSupabaseConfigured && access === "checking" && <p className="mt-8 text-muted-foreground">Checking administrator access…</p>}
        {isSupabaseConfigured && access === "signed-out" && (
          <form onSubmit={signIn} className="mt-8 max-w-lg border border-border p-5 md:p-7">
            <label className="block text-sm">Administrator email
              <input type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-input bg-transparent px-3 py-3 focus:border-gold focus:outline-none" />
            </label>
            <label className="mt-4 block text-sm">Password
              <input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full border border-input bg-transparent px-3 py-3 focus:border-gold focus:outline-none" />
            </label>
            <button type="submit" disabled={busy} className="btn-gold mt-5">{busy ? "Signing in…" : "Sign in"}</button>
          </form>
        )}
        {isSupabaseConfigured && access === "not-admin" && (
          <div className="mt-8 border border-border p-5">
            <p>This signed-in account does not have administrator access to the website registration list.</p>
            <button type="button" onClick={signOut} className="btn-outline mt-5">Sign out</button>
          </div>
        )}
        {isSupabaseConfigured && access === "error" && <p className="mt-8 border border-destructive/60 p-5">Supabase could not verify access or load the list. Check the project setup and try again.</p>}
        {access === "ready" && (
          <div className="mt-8 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5">
              <div><p className="text-2xl font-bold">{total}</p><p className="text-sm text-muted-foreground">website wishlist entries</p></div>
              <div className="flex flex-wrap gap-3">
                <button type="button" disabled={busy || total === 0} onClick={exportCsv} className="btn-outline">{busy ? "Working…" : "Export CSV"}</button>
                <button type="button" disabled={busy} onClick={() => void loadPage(page)} className="btn-outline">Refresh</button>
                <button type="button" onClick={signOut} className="btn-outline">Sign out</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-4">Email</th><th className="p-4">Name</th><th className="p-4">Registered</th><th className="p-4">List</th></tr></thead>
                <tbody>
                  {rows.map((row) => <tr key={row.id} className="border-b border-border/60"><td className="p-4">{row.email}</td><td className="p-4">{row.name || "—"}</td><td className="p-4">{new Date(row.created_at).toLocaleString()}</td><td className="p-4">KAALVAN website</td></tr>)}
                  {!rows.length && <tr><td colSpan={4} className="p-6 text-muted-foreground">No website wishlist entries yet.</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-border p-4 text-sm">
              <span>Page {page + 1} of {Math.max(1, Math.ceil(total / PAGE_SIZE))}</span>
              <div className="flex gap-2"><button type="button" className="btn-outline" disabled={busy || page === 0} onClick={() => void loadPage(page - 1)}>Previous</button><button type="button" className="btn-outline" disabled={busy || (page + 1) * PAGE_SIZE >= total} onClick={() => void loadPage(page + 1)}>Next</button></div>
            </div>
          </div>
        )}
        <p role="status" aria-live="polite" className="mt-4 text-sm text-muted-foreground">{notice}</p>
      </div>
    </section>
  );
}
