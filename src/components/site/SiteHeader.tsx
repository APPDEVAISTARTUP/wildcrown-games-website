import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Wordmark";

const nav = [
  { to: "/games", label: "Games" },
  { to: "/about", label: "Studio" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? "border-b border-border bg-background/90 backdrop-blur" : ""}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 btn-gold">Skip to content</a>
      <div className="container-x flex h-18 items-center justify-between py-5">
        <Link to="/" aria-label="Wildcrown Games home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="link-underline pb-1 text-xs font-semibold uppercase tracking-[0.26em] text-foreground/80 hover:text-foreground" activeProps={{ className: "text-gold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden p-2 -mr-2" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="md:hidden h-[calc(100dvh-4.5rem)] border-t border-border bg-background container-x flex flex-col pt-10 gap-2">
          {[{ to: "/", label: "Home" } as const, ...nav].map((n, i) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rise font-display text-5xl font-extrabold uppercase py-2 border-b border-border" style={{ animationDelay: `${i * 60}ms` }} activeProps={{ className: "text-gold" }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
