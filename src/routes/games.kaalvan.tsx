import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getGame } from "@/data/games";
import { Teaser } from "@/components/site/Teaser";
import { Gallery } from "@/components/site/Gallery";
import { WishlistButton, FollowBand } from "@/components/site/Wishlist";
import forest from "@/assets/kaalvan-forest.jpg";
import chamber from "@/assets/kaalvan-chamber.jpg";

export const Route = createFileRoute("/games/kaalvan")({
  head: () => ({
    meta: [
      { title: "KAALVAN — First-Person Horror in Unreal Engine 5 | Wildcrown Games" },
      { name: "description", content: "KAALVAN is an upcoming first-person horror game inspired by Indian folklore, ancient mysteries and the occult. Exploration, puzzles and survival against an unknown entity." },
      { property: "og:title", content: "KAALVAN — First-Person Horror in Unreal Engine 5 | Wildcrown Games" },
      { property: "og:description", content: "KAALVAN is an upcoming first-person horror game inspired by Indian folklore, ancient mysteries and the occult. Exploration, puzzles and survival against an unknown entity." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/games/kaalvan" },
    ],
    links: [{ rel: "canonical", href: "/games/kaalvan" }],
  }),
  component: KaalvanPage,
});

const pillars = [
  { t: "Atmosphere", d: "Dread is built from silence, shadow and the weight of ancient stone. The goal is a horror that lingers rather than one that shouts.", img: chamber },
  { t: "Exploration", d: "Forests, temple corridors and chambers below the earth are designed to be read carefully. The environment itself carries the story.", img: forest },
];

function KaalvanPage() {
  const g = getGame("kaalvan")!;
  return (
    <>
      <section className="relative flex min-h-[88svh] items-end overflow-hidden">
        <img src={g.cover} alt="" aria-hidden width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover slow-zoom" />
        <div className="absolute inset-0 veil" />
        <div className="container-x relative pb-16 pt-32 md:pb-20">
          <p className="eyebrow rise">Wildcrown Games presents</p>
          <h1 className="rise mt-4 text-[4.25rem] font-black leading-[0.85] tracking-[0.04em] sm:text-[6rem] md:text-[8.5rem] lg:text-[10rem]" style={{ animationDelay: "120ms" }}>{g.title}</h1>
          <p className="rise mt-6 max-w-xl text-lg italic text-foreground/80" style={{ animationDelay: "240ms" }}>{g.tagline}</p>
          <dl className="rise mt-8 grid max-w-2xl grid-cols-3 gap-px border border-border bg-border text-left" style={{ animationDelay: "360ms" }}>
            {[["Genre", g.genre], ["Engine", g.engine], ["Status", g.status]].map(([k, v]) => (
              <div key={k} className="bg-ink/80 p-4"><dt className="eyebrow text-[0.6rem]">{k}</dt><dd className="mt-2 text-sm font-semibold">{v}</dd></div>
            ))}
          </dl>
          <div className="rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: "480ms" }}>
            <WishlistButton game={g} />
            <a href="#teaser" className="btn-line">Watch teaser</a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3">Overview</p>
          <div className="lg:col-span-9">
            <h2 className="text-3xl font-extrabold md:text-4xl">Folklore. Ancient mysteries. Something that should not be found.</h2>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              KAALVAN is a first-person horror game being developed in Unreal Engine 5, inspired by Indian folklore, ancient mysteries, occult themes and the supernatural. Its direction centres on exploration, puzzles and survival — and on a presence no one can name. Development is well advanced and the team is now focused on polish.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="glance" className="pb-16 md:pb-20">
        <div className="container-x">
          <h2 id="glance" className="eyebrow mb-6">At a glance</h2>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[["Perspective", "First-person"], ["Inspired by", "Indian folklore & the occult"], ["Core play", "Exploration · Puzzles · Survival"], ["Developer", "Wildcrown Games"]].map(([k, v]) => (
              <div key={k} className="bg-background p-6"><dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{k}</dt><dd className="mt-3 font-display text-2xl font-extrabold uppercase">{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="teaser" className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-5">
            <h2 id="teaser" className="text-3xl font-extrabold md:text-4xl">Teaser</h2>
            <p className="eyebrow">{g.teaserNote}</p>
          </div>
          <Teaser game={g} />
        </div>
      </section>

      <section aria-label="Design pillars" className="border-y border-border bg-ink">
        {pillars.map((p, i) => (
          <div key={p.t} className="grid lg:grid-cols-2">
            <img src={p.img} alt={`Concept placeholder: ${p.t.toLowerCase()}`} loading="lazy" className={`aspect-[16/10] h-full w-full object-cover ${i % 2 ? "lg:order-2" : ""}`} />
            <div className="flex flex-col justify-center p-10 md:p-14">
              <p className="eyebrow">Design intent 0{i + 1}</p>
              <h3 className="mt-5 text-4xl font-extrabold md:text-5xl">{p.t}</h3>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          </div>
        ))}
        <div className="container-x grid gap-px bg-border py-px md:grid-cols-2">
          {[["Puzzles", "Mysteries are meant to be understood, not merely unlocked. Solutions are designed to emerge from the world's own logic and lore."], ["Survival", "You are not meant to win a fight. Survival is about awareness, caution and knowing when to move — and when to hide."]].map(([t, d], i) => (
            <div key={t} className="bg-ink p-10 md:p-12">
              <p className="eyebrow">Design intent 0{i + 3}</p>
              <h3 className="mt-5 text-4xl font-extrabold md:text-4xl">{t}</h3>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="gallery" className="py-16 md:py-20">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
            <h2 id="gallery" className="text-3xl font-extrabold md:text-4xl">Gallery</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Five in-game screenshots</p>
          </div>
          <Gallery images={g.gallery} />
        </div>
      </section>

      <FollowBand game={g} />

      <section className="border-t border-border py-16 md:py-20">
        <div className="container-x flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Press &amp; partners</p>
            <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">Interested in KAALVAN?</h2>
            <p className="mt-6 max-w-lg text-muted-foreground">For publishing, business or press enquiries, reach out to the studio directly.</p>
          </div>
          <Link to="/contact" className="btn-gold">Get in touch <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
