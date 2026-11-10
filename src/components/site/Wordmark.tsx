export function Wordmark({ className = "" }: { className?: string }) {
  // TODO: swap for the final logo file once available.
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-lg font-extrabold uppercase tracking-[0.18em] ${className}`}>
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 18 L5 7 L9.5 12 L12 4 L14.5 12 L19 7 L21 18 Z" />
        <path d="M3 21 H21" />
      </svg>
      Wildcrown
    </span>
  );
}
