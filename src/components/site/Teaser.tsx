import { Play } from "lucide-react";
import { youtubeEmbed, type Game } from "@/data/games";

export function Teaser({ game }: { game: Game }) {
  const embed = game.teaserUrl ? youtubeEmbed(game.teaserUrl) : null;
  return (
    <div className="relative aspect-video w-full overflow-hidden border border-border bg-ink">
      {embed ? (
        <iframe src={embed} title={`${game.title} official teaser`} className="absolute inset-0 h-full w-full" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        // Shown until teaserUrl is set in src/data/games.ts
        <>
          <img src={game.gallery[1]?.src ?? game.cover} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 veil" />
          <div className="relative flex h-full flex-col items-center justify-center gap-5 text-center px-6">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-soft text-gold md:h-20 md:w-20"><Play className="h-6 w-6 translate-x-0.5" /></span>
            <p className="eyebrow">Teaser</p>
            <p className="font-display text-3xl font-extrabold uppercase md:text-5xl">{game.teaserNote}</p>
            <p className="text-sm text-muted-foreground">The player will appear here once the official link is published.</p>
          </div>
        </>
      )}
    </div>
  );
}
