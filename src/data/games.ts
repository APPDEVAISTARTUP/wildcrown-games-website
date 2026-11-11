import corridor from "@/assets/kaalvan-corridor.jpg";
import forest from "@/assets/kaalvan-forest.jpg";
import chamber from "@/assets/kaalvan-chamber.jpg";
import temple from "@/assets/hero-temple.jpg";
import pillarScreenshot from "@/assets/kaalvan-c_pillar.png";
import hallScreenshot from "@/assets/kaalvan-d_hall.png";
import stambhaScreenshot from "@/assets/kaalvan-e_stambha.png";
import ringsScreenshot from "@/assets/kaalvan-g_rings.png";
import echoScreenshot from "@/assets/kaalvan-h_echo.png";

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
  /** Wishlist store page. Empty url = CTA shows "Wishlist opening soon" (disabled). */
  wishlist: { url: string; store: string };
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
    // TODO: paste the store page URL (e.g. Steam) and store name to activate the wishlist button.
    wishlist: { url: "", store: "Steam" },
    gallery: [
      { src: pillarScreenshot, alt: "In-game screenshot: carved stone pillars inside a misty temple hall", placeholder: false },
      { src: hallScreenshot, alt: "In-game screenshot: a dim carved temple hall filled with fog", placeholder: false },
      { src: stambhaScreenshot, alt: "In-game screenshot: an ornate stone stambha in a shadowed courtyard", placeholder: false },
      { src: ringsScreenshot, alt: "In-game screenshot: three glowing symbol rings mounted on a stone wall", placeholder: false },
      { src: echoScreenshot, alt: "In-game screenshot: a narrow path through dense forest at night", placeholder: false },
    ],
  },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);

export function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}
