import forest from "@/assets/kaalvan-forest.jpg";
import chamber from "@/assets/kaalvan-chamber.jpg";
import temple from "@/assets/hero-temple.jpg";
import pillarScreenshot from "@/assets/kaalvan-c_pillar.png";
import hallScreenshot from "@/assets/kaalvan-d_hall.png";
import stambhaScreenshot from "@/assets/kaalvan-e_stambha.png";
import ringsScreenshot from "@/assets/kaalvan-g_rings.png";
import echoScreenshot from "@/assets/kaalvan-h_echo.png";
import twoTheSidesArt from "@/assets/two-the-sides-zombie-keyart.jpg";
import twoPoster from "@/assets/two-poster.webp";
import kaalvanEntity from "@/assets/kaalvan-entity.jpg";

export type GalleryImage = { src: string; alt: string; placeholder: boolean };

export type Game = {
  slug: string;
  detailRoute: "/games/kaalvan" | "/games/two-the-sides";
  title: string;
  tagline: string;
  genre: string;
  engine?: string;
  status: string;
  summary: string;
  cover: string;
  coverAlt?: string;
  coverLabel?: string;
  /** Optional separate background for the detail-page hero (defaults to cover). */
  heroImage?: string;
  /** Official game website, shown as an "Explore" link. */
  websiteUrl?: string;
  downloadUrl?: string;
  /** TODO: paste the official YouTube teaser URL (watch or youtu.be link). Empty = placeholder panel. */
  teaserUrl?: string;
  teaserNote?: string;
  gallery: GalleryImage[];
};

/**
 * Add future titles to this array. Each needs a matching detail route
 * (see src/routes/games.kaalvan.tsx) or a shared $slug route.
 */
export const games: Game[] = [
  {
    slug: "kaalvan",
    detailRoute: "/games/kaalvan",
    title: "KAALVAN",
    tagline: "Something old is waiting beneath the stone.",
    genre: "First-person horror",
    engine: "Unreal Engine 5",
    status: "In development",
    summary:
      "An upcoming first-person horror game inspired by Indian folklore, ancient mysteries and occult traditions. Explore forgotten places, solve what they conceal, and survive an unknown entity.",
    cover: kaalvanEntity,
    coverAlt: "KAALVAN: a faceless entity with a glowing red chest stands in a blood-red fog",
    downloadUrl: "https://wildcrowngames.itch.io/kaalvan",
    teaserUrl: "https://youtu.be/9wL7YmDBcQ0?si=A8RBPbfVSvDkaEwb",
    teaserNote: "Official teaser — November 10, 2026",
    gallery: [
      { src: pillarScreenshot, alt: "In-game screenshot: carved stone pillars inside a misty temple hall", placeholder: false },
      { src: hallScreenshot, alt: "In-game screenshot: a dim carved temple hall filled with fog", placeholder: false },
      { src: stambhaScreenshot, alt: "In-game screenshot: an ornate stone stambha in a shadowed courtyard", placeholder: false },
      { src: ringsScreenshot, alt: "In-game screenshot: three glowing symbol rings mounted on a stone wall", placeholder: false },
      { src: echoScreenshot, alt: "In-game screenshot: a narrow path through dense forest at night", placeholder: false },
    ],
  },
  {
    slug: "two-the-sides",
    detailRoute: "/games/two-the-sides",
    title: "TWO — THE SIDES",
    tagline: "INDIA'S MOST AMBITIOUS PROJECT EVER.",
    genre: "Story-driven zombie survival",
    status: "UPCOMING",
    summary:
      "A story-driven zombie survival experience where love, loss, betrayal and survival collide. Follow a father's fight through a world devastated by an outbreak, where protecting his daughter becomes a journey of sacrifice and revenge.",
    cover: twoPoster,
    coverAlt: "TWO key art: a lone survivor faces a ruined, rain-soaked city at night under the tagline Every day. One step closer.",
    coverLabel: "Key art · Not gameplay footage",
    heroImage: twoTheSidesArt,
    websiteUrl: "https://www.playtwo.in/",
    gallery: [],
  },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);

export function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}
