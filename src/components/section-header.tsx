export function SectionLabelBar({
  eyebrow,
  sub,
  dark = false,
}: {
  eyebrow: string;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`section-label-bar section-x flex flex-col items-start gap-2 border-b py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
        dark ? "border-white/10" : "border-border"
      }`}
    >
      <span
        className={`eyebrow shrink-0 ${
          dark ? "text-green-bright" : "text-green-text"
        }`}
      >
        {eyebrow}
      </span>
      {sub && (
        <span
          className={`eyebrow-sub max-w-full leading-snug sm:max-w-[58%] sm:text-right ${
            dark ? "text-text-on-dark-muted" : "text-muted"
          }`}
        >
          {sub}
        </span>
      )}
    </div>
  );
}

export function SectionHeadline({
  children,
  className = "",
  dark = false,
  id,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`section-headline section-x border-b py-8 sm:py-10 lg:py-12 ${
        dark ? "border-white/10" : "border-border"
      } ${wide ? "section-headline--wide" : ""} ${className}`}
    >
      <h2
        id={id}
        className={`section-headline__title font-display font-light tracking-tight [text-wrap:balance] [&_em]:italic ${
          dark
            ? "text-white [&_em]:text-green-bright"
            : "text-ink [&_em]:text-green-text"
        }`}
      >
        {children}
      </h2>
    </div>
  );
}
