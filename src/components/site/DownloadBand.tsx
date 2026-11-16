import { Download } from "lucide-react";
import type { Game } from "@/data/games";
import { SocialLinks } from "./SocialLinks";

export function DownloadButton({ game, label }: { game: Game; label?: string }) {
  if (!game.downloadUrl) return null;
  return (
    <a
      href={game.downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-gold"
      aria-label={`Download ${game.title} on itch.io (opens in a new tab)`}
    >
      {label ?? `Download ${game.title}`} <Download className="h-4 w-4" aria-hidden />
    </a>
  );
}

export function DownloadBand({ game }: { game: Game }) {
  return (
    <section aria-labelledby={`download-${game.slug}`} className="border-y border-border bg-ink py-16 md:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="min-w-0 lg:col-span-7">
          <p className="eyebrow">Play now</p>
          <h2 id={`download-${game.slug}`} className="mt-4 text-3xl font-extrabold md:text-5xl">Step into {game.title}.</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Download {game.title} from itch.io and follow the studio for development updates.
          </p>
        </div>
        <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:items-end">
          <DownloadButton game={game} label="Download on itch.io" />
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
