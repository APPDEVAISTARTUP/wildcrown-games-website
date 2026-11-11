import corridor from "@/assets/kaalvan-corridor.jpg";
import forest from "@/assets/kaalvan-forest.jpg";
import chamber from "@/assets/kaalvan-chamber.jpg";
import temple from "@/assets/hero-temple.jpg";

export type GalleryImage = { src: string; alt: string; placeholder: boolean };

export type Game = {
  slug: string;
  title: string;
  tagline: string;
  genre: string;
  engine: string;
  status: string;
  summary: string;
  cover: string;
  /** TODO: paste the official YouTube teaser URL (watch or youtu.be link). Empty = placeholder panel. */
  teaserUrl: string;
  teaserNote: string;
  gallery: GalleryImage[];
};

/**
 * Add future titles to this array. Each needs a matching detail route
 * (see src/routes/games.kaalvan.tsx) or a shared $slug route.
 */
export const games: Game[] = [
  {
    slug: "kaalvan",
    title: "KAALVAN",
    tagline: "Something old is waiting beneath the stone.",
    genre: "First-person horror",
    engine: "Unreal Engine 5",
    status: "In development",
    summary:
      "An upcoming first-person horror game inspired by Indian folklore, ancient mysteries and occult traditions. Explore forgotten places, solve what they conceal, and survive an unknown entity.",
    cover: corridor,
    teaserUrl: "https://youtu.be/9wL7YmDBcQ0?si=A8RBPbfVSvDkaEwb",
    teaserNote: "Official teaser — November 10, 2026",
    // TODO: replace with real KAALVAN screenshots. Set placeholder:false for real in-game captures.
    gallery: [
      { src: corridor, alt: "Concept placeholder: candlelit carved temple corridor", placeholder: true },
      { src: chamber, alt: "Concept placeholder: underground chamber with ritual circle", placeholder: true },
      { src: forest, alt: "Concept placeholder: banyan forest in fog at night", placeholder: true },
      { src: temple, alt: "Concept placeholder: temple ruins at dusk", placeholder: true },
    ],
  },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);

export function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}
