import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/hero-temple.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Studio — Wildcrown Games" },
      { name: "description", content: "The mission and creative philosophy of Wildcrown Games, an independent game development studio." },
      { property: "og:title", content: "Studio — Wildcrown Games" },
      { property: "og:description", content: "The mission and creative philosophy of Wildcrown Games, an independent game development studio." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  ["Immersion over spectacle", "We value presence — the feeling of truly being somewhere — above noise and excess."],
  ["Respect for source material", "When we draw from folklore and history, we research it and treat it with care."],
  ["Craft at every scale", "From a single footstep sound to the shape of a level, details are where trust is earned."],
  ["Independent by choice", "Staying independent lets us follow ideas with patience and protect a clear creative vision."],
];

function About() {
  return (
    <>
      <PageHero eyebrow="The studio" title={<>Worlds worth<br />getting lost in</>} image={hero}>
        Wildcrown Games is an independent game development studio. Our mission is simple: create immersive worlds and memorable experiences that players carry with them.
      </PageHero>
      <section className="py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Philosophy</p>
            <h2 className="mt-6 text-4xl font-extrabold md:text-4xl">What guides us</h2>
          </div>
          <ol className="lg:col-span-8 divide-y divide-border border-y border-border">
            {values.map(([t, d], i) => (
              <li key={t} className="grid gap-4 py-8 md:grid-cols-12">
                <span className="font-display text-gold md:col-span-1">0{i + 1}</span>
                <h3 className="text-3xl font-extrabold md:col-span-5">{t}</h3>
                <p className="text-muted-foreground md:col-span-6">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="border-t border-border bg-ink py-16">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">See what we're building</h2>
          <Link to="/games/kaalvan" className="btn-gold">KAALVAN <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
