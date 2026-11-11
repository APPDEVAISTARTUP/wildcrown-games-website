import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { getGame } from "@/data/games";

export const Route = createFileRoute("/games/two-the-sides")({
  head: () => ({
    meta: [
      { title: "TWO — THE SIDES | Wildcrown Games" },
      { name: "description", content: "A story-driven zombie survival experience where love, loss, betrayal and survival collide. Upcoming from Wildcrown Games." },
      { property: "og:title", content: "TWO — THE SIDES | Wildcrown Games" },
      { property: "og:description", content: "A story-driven zombie survival experience where love, loss, betrayal and survival collide." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/games/two-the-sides" },
    ],
    links: [{ rel: "canonical", href: "/games/two-the-sides" }],
  }),
  component: TwoTheSidesPage,
});

function TwoTheSidesPage() {
  const game = getGame("two-the-sides")!;
  return (
    <>
      <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#08090b]">
        <img src={game.cover} alt={game.coverAlt ?? "Stylized key art, not gameplay footage"} width={1920} height={1080} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090b]/90 via-[#08090b]/35 to-[#08090b]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-[#08090b]/25" />
        <div className="container-x relative pb-16 pt-32 md:pb-20">
          <Link to="/games" className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> All games
          </Link>
          <p className="eyebrow rise">Wildcrown Games presents</p>
          <p className="rise mt-5 text-xs font-semibold uppercase tracking-[0.36em] text-[#d98b70]" style={{ animationDelay: "80ms" }}>{game.status}</p>
          <h1 className="rise mt-5 max-w-6xl font-black leading-[0.78] tracking-[0.015em]" style={{ animationDelay: "150ms" }}>
            <span className="block text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem]">TWO</span>
            <span className="mt-4 block text-[2.1rem] sm:text-5xl md:text-7xl lg:text-[6.5rem]">— THE SIDES</span>
          </h1>
          <p className="rise mt-8 max-w-2xl text-sm font-semibold uppercase leading-relaxed tracking-[0.22em] text-foreground/85 sm:text-base" style={{ animationDelay: "240ms" }}>{game.tagline}</p>
          <div className="rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: "330ms" }}>
            <a href="#story" className="btn-gold">Enter the story <ArrowDown className="h-4 w-4" /></a>
            <Link to="/games" className="btn-line">Explore all games</Link>
          </div>
          <p className="mt-10 text-[0.6rem] uppercase tracking-[0.18em] text-foreground/65">{game.coverLabel}</p>
        </div>
      </section>

      <section id="story" aria-labelledby="story-title" className="py-20 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">The story</p>
            <p className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.88] text-foreground/20 md:text-7xl">One world.<br />Two sides.</p>
          </div>
          <div className="lg:col-span-8">
            <p className="eyebrow text-[#d98b70]">{game.status}</p>
            <h2 id="story-title" className="mt-5 max-w-4xl text-4xl font-extrabold leading-[0.95] md:text-6xl">Love, loss, betrayal and survival collide.</h2>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{game.summary}</p>
          </div>
        </div>
      </section>

      <section aria-label="Story themes" className="border-y border-border bg-ink py-16 md:py-24">
        <div className="container-x">
          <p className="eyebrow mb-8">At the heart of the story</p>
          <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
            {["Love", "Loss", "Betrayal", "Survival"].map((theme, index) => (
              <div key={theme} className="min-h-36 bg-ink p-6 md:min-h-48 md:p-8">
                <p className="text-xs tracking-[0.2em] text-[#d98b70]">0{index + 1}</p>
                <h3 className="mt-8 text-3xl font-extrabold md:text-4xl">{theme}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Upcoming game</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold md:text-6xl">A father's fight.<br />A daughter's future.</h2>
          </div>
          <Link to="/games" className="btn-line">Back to all games <ArrowLeft className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
