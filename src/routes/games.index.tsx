import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { GameCard } from "@/components/site/GameCard";
import { games } from "@/data/games";

export const Route = createFileRoute("/games/")({
  head: () => ({
    meta: [
      { title: "Games — Wildcrown Games" },
      { name: "description", content: "Explore games from Wildcrown Games, including KAALVAN, an upcoming first-person horror game built in Unreal Engine 5." },
      { property: "og:title", content: "Games — Wildcrown Games" },
      { property: "og:description", content: "Explore games from Wildcrown Games, including KAALVAN, an upcoming first-person horror game built in Unreal Engine 5." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/games" },
    ],
    links: [{ rel: "canonical", href: "/games" }],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <>
      <PageHero eyebrow="Portfolio" title="Our games">Worlds in progress. Each one built with patience and intent.</PageHero>
      <section className="py-20 md:py-20">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {games.map((g) => <GameCard key={g.slug} game={g} />)}
          <div className="flex min-h-72 flex-col justify-center border border-dashed border-border p-10">
            <p className="eyebrow">Future projects</p>
            <p className="mt-4 font-display text-3xl font-extrabold uppercase text-foreground/60">More worlds ahead</p>
            <p className="mt-3 text-sm text-muted-foreground">Future titles will be announced when they're ready.</p>
          </div>
        </div>
      </section>
    </>
  );
}
