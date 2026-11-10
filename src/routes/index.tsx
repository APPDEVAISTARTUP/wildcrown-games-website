import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero-temple.jpg";
import { games } from "@/data/games";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wildcrown Games — We Create Worlds" },
      { name: "description", content: "Wildcrown Games is an independent game development studio creating immersive worlds. Now developing KAALVAN, a first-person horror game in Unreal Engine 5." },
      { property: "og:title", content: "Wildcrown Games — We Create Worlds" },
      { property: "og:description", content: "Wildcrown Games is an independent game development studio creating immersive worlds. Now developing KAALVAN, a first-person horror game in Unreal Engine 5." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const pillars = [
  { n: "01", t: "World first", d: "Every project begins with a place — its history, its silence, its rules. Story and play grow out of the world, not the other way around." },
  { n: "02", t: "Atmosphere as design", d: "Light, sound and pacing are treated as systems. We want players to feel a space before they understand it." },
  { n: "03", t: "Rooted in culture", d: "We draw from folklore and traditions that are rarely explored in games, and approach them with care and research." },
];

function Home() {
  const k = games[0]!;
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img src={hero} alt="" aria-hidden width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover slow-zoom" />
        <div className="absolute inset-0 veil" />
        <div className="absolute inset-0 veil-side opacity-70" />
        <div className="container-x relative pb-20 pt-40 md:pb-28">
          <p className="eyebrow rise">Wildcrown Games — Independent studio</p>
          <h1 className="rise mt-6 max-w-5xl text-[3.6rem] font-black sm:text-7xl md:text-8xl lg:text-[9.5rem]" style={{ animationDelay: "120ms" }}>
            We create worlds.<br /><span className="text-gold">You live</span> the stories.
          </h1>
          <p className="rise mt-8 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg" style={{ animationDelay: "260ms" }}>
            An independent game development studio crafting immersive worlds and experiences that stay with you long after the screen goes dark.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: "380ms" }}>
            <Link to="/games" className="btn-gold">Explore our games <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/about" className="btn-line">The studio</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured" className="py-24 md:py-36">
        <div className="container-x">
          <div className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-6">
            <p className="eyebrow">Featured title</p>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{k.status}</p>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Link to="/games/kaalvan" className="group relative block overflow-hidden border border-border lg:col-span-7" aria-label="View KAALVAN">
              <img src={k.cover} alt="KAALVAN concept placeholder art: candlelit temple corridor" loading="lazy" width={1920} height={1088} className="aspect-[16/10] w-full object-cover transition-transform duration-[1.8s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-4 left-4 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">Concept placeholder art</span>
            </Link>
            <div className="lg:col-span-5">
              <h2 id="featured" className="text-7xl font-black md:text-9xl">{k.title}</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {[k.genre, k.engine].map((t) => (<span key={t} className="border border-gold-soft px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">{t}</span>))}
              </div>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{k.summary}</p>
              <Link to="/games/kaalvan" className="btn-gold mt-10">Discover KAALVAN <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="craft" className="border-y border-border bg-ink py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Our craft</p>
            <h2 id="craft" className="mt-6 text-5xl font-extrabold md:text-6xl">Built slowly.<br />Felt deeply.</h2>
          </div>
          <div className="grid gap-px bg-border lg:col-span-8 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.n} className="bg-ink p-8">
                <p className="font-display text-sm text-gold">{p.n}</p>
                <h3 className="mt-6 text-3xl font-extrabold">{p.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="updates" className="py-24 md:py-32">
        <div className="container-x flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Latest updates</p>
            <h2 id="updates" className="mt-6 text-5xl font-extrabold md:text-7xl">The next transmission<br />is on its way.</h2>
            <p className="mt-6 max-w-lg text-muted-foreground">Development news and announcements will be published here first.</p>
          </div>
          <Link to="/news" className="btn-line">Visit news <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
