import { Instagram, Youtube } from "lucide-react";
import { activeSocials } from "@/data/site";

const icons = { Instagram, YouTube: Youtube } as Record<string, typeof Instagram>;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {activeSocials().map((s) => {
        const Icon = icons[s.label];
        return (
          <li key={s.label}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Wildcrown Games on ${s.label} (opens in a new tab)`} className="flex h-10 w-10 items-center justify-center border border-input text-foreground/80 transition-colors hover:border-gold hover:text-gold">
              {Icon && <Icon className="h-4 w-4" aria-hidden />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
