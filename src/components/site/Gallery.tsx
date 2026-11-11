import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/data/games";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [idx, close, step]);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-4 md:gap-4">
        {images.map((img, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`Open image ${i + 1}: ${img.alt}`} className={`group relative overflow-hidden border border-border ${i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 && images.length === 4 ? "md:col-span-2" : ""}`}>
            <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[16/9] h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-90" />
            <span className="absolute bottom-3 left-3 bg-ink/80 px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{img.placeholder ? "Concept placeholder" : "In-game screenshot"}</span>
          </button>
        ))}
      </div>
      {idx !== null && images[idx] && (
        <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4" onClick={close}>
          <img src={images[idx]!.src} alt={images[idx]!.alt} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <button autoFocus onClick={close} aria-label="Close" className="absolute right-4 top-4 p-3 text-foreground hover:text-gold"><X className="h-6 w-6" /></button>
          <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image" className="absolute left-2 p-3 hover:text-gold md:left-6"><ChevronLeft className="h-8 w-8" /></button>
          <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image" className="absolute right-2 p-3 hover:text-gold md:right-6"><ChevronRight className="h-8 w-8" /></button>
          <p className="absolute bottom-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">{idx + 1} / {images.length} — {images[idx]!.alt}</p>
        </div>
      )}
    </>
  );
}
