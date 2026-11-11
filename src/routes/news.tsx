import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Wildcrown Games" },
      { name: "description", content: "Development updates and announcements from Wildcrown Games." },
      { property: "og:title", content: "News — Wildcrown Games" },
      { property: "og:description", content: "Development updates and announcements from Wildcrown Games." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: News,
});

// TODO: add verified posts here (title, date, excerpt). Empty array shows the empty state.
const posts: { title: string; date: string; excerpt: string }[] = [];

function News() {
  return (
    <>
      <PageHero eyebrow="News & updates" title="Transmissions" />
      <section className="py-16 md:py-24">
        <div className="container-x">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-2xl border border-border p-12 text-center md:p-14">
              <span aria-hidden className="mx-auto block h-px w-16 bg-gold" />
              <h2 className="mt-8 text-3xl font-extrabold md:text-4xl">The next transmission is on its way.</h2>
              <p className="mt-6 text-muted-foreground">No updates have been published yet. Check back soon, or reach out for press enquiries.</p>
              <Link to="/contact" className="btn-line mt-8">Press contact</Link>
            </div>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {posts.map((p) => (<li key={p.title} className="py-8"><p className="eyebrow">{p.date}</p><h2 className="mt-3 text-3xl font-extrabold">{p.title}</h2><p className="mt-3 text-muted-foreground">{p.excerpt}</p></li>))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
