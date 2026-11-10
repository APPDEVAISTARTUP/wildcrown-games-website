import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Wildcrown Games" },
      { name: "description", content: "Business, publishing, press and general enquiries for Wildcrown Games." },
      { property: "og:title", content: "Contact — Wildcrown Games" },
      { property: "og:description", content: "Business, publishing, press and general enquiries for Wildcrown Games." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const categories = ["Business", "Publishing", "Press", "General"] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  category: z.enum(categories),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});

/**
 * No backend is connected. On submit, this opens the visitor's email app with a
 * pre-filled message to site.email (src/data/site.ts). Until that email is set,
 * the form explains it is not yet configured. To send server-side instead,
 * enable Lovable Cloud and an email integration.
 */
function Contact() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Business");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "opened" | "unconfigured">("idle");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const r = schema.safeParse({ name: fd.get("name"), email: fd.get("email"), category, message: fd.get("message") });
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
      setStatus("idle");
      return;
    }
    setErrors({});
    if (!site.email) { setStatus("unconfigured"); return; }
    const subject = encodeURIComponent(`[${r.data.category}] Enquiry from ${r.data.name}`);
    const body = encodeURIComponent(`${r.data.message}\n\n— ${r.data.name} (${r.data.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("opened");
  }

  const field = "mt-2 w-full border border-input bg-transparent px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none";
  const err = (k: string) => errors[k] && <p id={`${k}-err`} className="mt-2 text-sm text-destructive">{errors[k]}</p>;

  return (
    <>
      <PageHero eyebrow="Contact" title="Start a conversation">For business, publishing, press and general enquiries.</PageHero>
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-8">
            {[["Business", "Partnerships and collaborations."], ["Publishing", "Publishing and distribution discussions for KAALVAN and future titles."], ["Press", "Interviews, previews and media assets."], ["General", "Everything else."]].map(([t, d]) => (
              <div key={t} className="border-l border-gold-soft pl-5"><h2 className="text-2xl font-extrabold">{t}</h2><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
            ))}
          </aside>
          <form noValidate onSubmit={submit} className="lg:col-span-8 space-y-7">
            <fieldset>
              <legend className="eyebrow">Enquiry type</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button type="button" key={c} aria-pressed={category === c} onClick={() => setCategory(c)} className={`border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${category === c ? "border-gold bg-gold text-primary-foreground" : "border-input hover:border-gold"}`}>{c}</button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-7 md:grid-cols-2">
              <label className="block text-sm">Name<input name="name" autoComplete="name" maxLength={100} aria-invalid={!!errors["name"]} aria-describedby="name-err" className={field} />{err("name")}</label>
              <label className="block text-sm">Email<input name="email" type="email" autoComplete="email" maxLength={255} aria-invalid={!!errors["email"]} aria-describedby="email-err" className={field} />{err("email")}</label>
            </div>
            <label className="block text-sm">Message<textarea name="message" rows={6} maxLength={2000} aria-invalid={!!errors["message"]} aria-describedby="message-err" className={field} />{err("message")}</label>
            <button type="submit" className="btn-gold">Compose email</button>
            <div aria-live="polite">
              {status === "opened" && <p className="border border-gold-soft p-4 text-sm">Your email app should now be open with your message ready. Press send there to deliver it.</p>}
              {status === "unconfigured" && <p className="border border-destructive/60 p-4 text-sm">Your message looks good, but the studio's contact address hasn't been set up yet, so nothing was sent. Please check back soon.</p>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
