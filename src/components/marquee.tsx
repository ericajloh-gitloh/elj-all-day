import { MARQUEE_ITEMS } from "@/lib/site";

export function Marquee({
  variant = "green",
}: {
  variant?: "green" | "navy";
}) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const isNavy = variant === "navy";

  return (
    <div
      className={`section-bridge overflow-hidden border-y-2 py-3 ${
        isNavy
          ? "border-[var(--brand-lime)]/30 bg-[var(--brand-ink)]"
          : "border-[var(--brand-ink)] bg-[var(--brand-lime)]"
      }`}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`marquee-item flex items-center gap-8 px-8 ${
              isNavy ? "text-[var(--brand-lime)]" : "text-[var(--brand-ink)]"
            }`}
          >
            {item}
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                isNavy ? "bg-[var(--brand-orange)]" : "bg-[var(--brand-ink)]"
              }`}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
