import { Heart } from "lucide-react";
import type { Game } from "@/data/games";
import { SocialLinks } from "./SocialLinks";
import { WishlistRegistration } from "./WishlistRegistration";

export function WishlistButton({ game }: { game: Game }) {
  const wishlist = game.wishlist;
  if (!wishlist) return null;
  const { url, store } = wishlist;
  if (!url) {
    return (
      <span className="btn-gold cursor-not-allowed opacity-60" aria-disabled="true" title={`${store} wishlist page not yet live`}>
        <Heart className="h-4 w-4" aria-hidden /> Official {store} wishlist coming soon
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
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="min-w-0 lg:col-span-4">
          <p className="eyebrow">Follow development</p>
          <h2 id={`follow-${game.slug}`} className="mt-4 text-3xl font-extrabold md:text-5xl">Be there when {game.title} awakens.</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">Keep {game.title} on your website wishlist and follow the studio for development updates.</p>
        </div>
        <div className="space-y-5 lg:col-span-8">
          <WishlistRegistration game={game} />
          <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Official store wishlist</p>
              <p className="mt-2 text-sm text-muted-foreground">A separate Steam wishlist action; website registrations are not Steam wishlist counts.</p>
            </div>
            <WishlistButton game={game} />
          </div>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
