import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero } from "@/components/site/PageHero";
import { SocialLinks } from "@/components/site/SocialLinks";
import { contactCategories, contactEnquirySchema } from "@/lib/contact-enquiry.schema";
import { submitContactEnquiry } from "@/lib/contact-enquiry.functions";

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

function Contact() {
  const [category, setCategory] = useState<(typeof contactCategories)[number]>("Business");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "accepted" | "unconfigured" | "rate-limited" | "failed">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const r = contactEnquirySchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      category,
      message: fd.get("message"),
      company: fd.get("company") ?? "",
    });
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const result = await submitContactEnquiry({ data: r.data });
      setStatus(result.status);
      if (result.status === "accepted") form.reset();
    } catch {
      setStatus("failed");
    }
  }

  const field = "mt-2 w-full border border-input bg-transparent px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none";
  const err = (k: string) => errors[k] && <p id={`${k}-err`} className="mt-2 text-sm text-destructive">{errors[k]}</p>;

  return (
    <>
      <PageHero eyebrow="Contact" title="Start a conversation">For business, publishing, press and general enquiries.</PageHero>
      <section className="py-20 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-8">
            {[["Business", "Partnerships and collaborations."], ["Publishing", "Publishing and distribution discussions for KAALVAN and future titles."], ["Press", "Interviews, previews and media assets."], ["General", "Everything else."]].map(([t, d]) => (
              <div key={t} className="border-l border-gold-soft pl-5"><h2 className="text-2xl font-extrabold">{t}</h2><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
            ))}
            <div><p className="eyebrow">Follow the studio</p><SocialLinks className="mt-4" /></div>
          </aside>
          <form noValidate onSubmit={submit} className="lg:col-span-8 space-y-7">
            <fieldset>
              <legend className="eyebrow">Enquiry type</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {contactCategories.map((c) => (
                  <button type="button" key={c} aria-pressed={category === c} onClick={() => setCategory(c)} className={`border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${category === c ? "border-gold bg-gold text-primary-foreground" : "border-input hover:border-gold"}`}>{c}</button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-7 md:grid-cols-2">
              <label className="block text-sm">Name<input name="name" autoComplete="name" maxLength={100} aria-invalid={!!errors["name"]} aria-describedby="name-err" className={field} />{err("name")}</label>
              <label className="block text-sm">Email<input name="email" type="email" autoComplete="email" maxLength={255} aria-invalid={!!errors["email"]} aria-describedby="email-err" className={field} />{err("email")}</label>
            </div>
            <label className="block text-sm">Message<textarea name="message" rows={6} maxLength={2000} aria-invalid={!!errors["message"]} aria-describedby="message-err" className={field} />{err("message")}</label>
            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
              <label>Leave this field empty<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <button type="submit" className="btn-gold" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </button>
            <div aria-live="polite">
              {status === "accepted" && <p className="border border-gold-soft p-4 text-sm">Your enquiry has been sent to Wildcrown Games. Thank you for getting in touch.</p>}
              {status === "unconfigured" && <p className="border border-destructive/60 p-4 text-sm">The contact form is temporarily unavailable. Please try again later.</p>}
              {status === "rate-limited" && <p className="border border-destructive/60 p-4 text-sm">Too many enquiries were sent from this connection. Please wait a few minutes and try again.</p>}
              {status === "failed" && <p className="border border-destructive/60 p-4 text-sm">We couldn’t send your enquiry. Please try again in a few minutes.</p>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
