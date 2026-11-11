import { Heart } from "lucide-react";
import type { Game } from "@/data/games";
import { SocialLinks } from "./SocialLinks";

export function WishlistButton({ game }: { game: Game }) {
  const { url, store } = game.wishlist;
  if (!url) {
    return (
      <span className="btn-gold cursor-not-allowed opacity-60" aria-disabled="true" title="Store page not yet live">
        <Heart className="h-4 w-4" aria-hidden /> Wishlist opening soon
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="btn-gold" aria-label={`Wishlist ${game.title} on ${store} (opens in a new tab)`}>
      <Heart className="h-4 w-4" aria-hidden /> Wishlist on {store}
    </a>
  );
}

export function FollowBand({ game }: { game: Game }) {
  return (
    <section aria-labelledby={`follow-${game.slug}`} className="border-y border-border bg-ink py-16 md:py-20">
      <div className="container-x grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <p className="eyebrow">Follow development</p>
          <h2 id={`follow-${game.slug}`} className="mt-4 text-3xl font-extrabold md:text-5xl">Be there when {game.title} awakens.</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">Wishlist the game and follow the studio for development updates, new footage and release news.</p>
        </div>
        <div className="flex flex-col items-start gap-5">
          <WishlistButton game={game} />
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
