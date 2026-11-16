import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";
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
      <section className="relative flex min-h-[88svh] flex-col justify-between overflow-hidden bg-[#08090b]">
        <img src={game.cover} alt={game.coverAlt ?? ""} width={1672} height={941} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="container-x relative pt-28">
          <Link to="/games" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> All games
          </Link>
        </div>
        <div className="container-x relative pb-12 pt-[38svh] md:pb-16">
          <h1 className="sr-only">TWO — THE SIDES</h1>
          <p className="eyebrow rise">Wildcrown Games presents · <span className="text-[#d98b70]">{game.status}</span></p>
          <p className="rise mt-5 max-w-2xl text-sm font-semibold uppercase leading-relaxed tracking-[0.22em] text-foreground/90 sm:text-base" style={{ animationDelay: "120ms" }}>{game.tagline}</p>
          <div className="rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: "240ms" }}>
            <a href="#story" className="btn-gold">Enter the story <ArrowDown className="h-4 w-4" /></a>
            {game.websiteUrl && (
              <a href={game.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-line" aria-label="Explore TWO on playtwo.in (opens in a new tab)">
                Explore TWO <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            )}
            <Link to="/games" className="btn-line">All games</Link>
          </div>
          <p className="mt-8 text-[0.6rem] uppercase tracking-[0.18em] text-foreground/65">{game.coverLabel}</p>
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
          <div className="flex flex-wrap gap-4">
            {game.websiteUrl && (
              <a href={game.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-gold" aria-label="Explore TWO on playtwo.in (opens in a new tab)">
                Explore TWO <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            )}
            <Link to="/games" className="btn-line">Back to all games <ArrowLeft className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
