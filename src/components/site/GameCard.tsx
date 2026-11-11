import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Game } from "@/data/games";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link to="/games/kaalvan" className="group relative block overflow-hidden border border-border bg-card focus-visible:outline-gold">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={game.cover} alt={`${game.title} concept placeholder art`} loading="lazy" width={1920} height={1088} className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105" />
        <div className="absolute inset-0 veil" />
        <span className="absolute left-5 top-5 border border-gold-soft bg-ink/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold">{game.status}</span>
      </div>
      <div className="flex items-end justify-between gap-6 p-6 md:p-8">
        <div>
          <h3 className="text-4xl font-extrabold md:text-4xl">{game.title}</h3>
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">{game.genre} · {game.engine}</p>
        </div>
        <ArrowUpRight className="h-7 w-7 shrink-0 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
