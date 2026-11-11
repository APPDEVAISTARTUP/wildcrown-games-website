import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children, image }: { eyebrow: string; title: ReactNode; children?: ReactNode; image?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-32 pb-16 md:pt-36 md:pb-20">
      {image && (
        <>
          <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35 slow-zoom" />
          <div className="absolute inset-0 veil" />
        </>
      )}
      <div className="container-x relative">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="rise mt-6 text-4xl font-extrabold md:text-6xl lg:text-7xl" style={{ animationDelay: "120ms" }}>{title}</h1>
        {children && <div className="rise mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "240ms" }}>{children}</div>}
      </div>
    </section>
  );
}
