import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { site } from "@/data/site";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="container-x py-20 grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark className="text-2xl" emblemClassName="h-12 w-14" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            An independent game development studio creating immersive worlds and memorable experiences.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/games" className="link-underline">Games</Link></li>
            <li><Link to="/games/kaalvan" className="link-underline">KAALVAN</Link></li>
            <li><Link to="/games/two-the-sides" className="link-underline">TWO — THE SIDES</Link></li>
            <li><Link to="/about" className="link-underline">Studio</Link></li>
            <li><Link to="/news" className="link-underline">News</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow mb-5">Get in touch</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/contact" className="link-underline">Business, publishing &amp; press</Link></li>
            {site.email && <li><a href={`mailto:${site.email}`} className="link-underline">{site.email}</a></li>}
          </ul>
          <SocialLinks className="mt-6" />
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Wildcrown Games. All rights reserved.</p>
        <p>KAALVAN is in development. TWO — THE SIDES is upcoming. Artwork is not gameplay footage.</p>
      </div>
    </footer>
  );
}
