export function Wordmark({
  className = "",
  emblemClassName = "h-9 w-11",
}: {
  className?: string;
  emblemClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-lg font-extrabold uppercase tracking-[0.18em] ${className}`}>
      <img
        src="/wildcrown-logo.png"
        alt=""
        aria-hidden="true"
        width={512}
        height={423}
        className={`${emblemClassName} shrink-0 object-contain`}
      />
      Wildcrown
    </span>
  );
}
