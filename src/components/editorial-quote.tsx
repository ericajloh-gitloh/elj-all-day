import "./editorial-quote.css";

/** Hero / approach editorial quote — copy fixed in site content */
export const EDITORIAL_QUOTE =
  "We build products, teams, and strategies that move at the pace and emotion of sports — driving measurable impact while deepening fandom and bringing new audiences into the game." as const;

export function EditorialQuotePanel({ className = "" }: { className?: string }) {
  return (
    <figure className={`editorial-quote-panel ${className}`.trim()}>
      <blockquote className="editorial-quote-panel__text">
        <p>&ldquo;{EDITORIAL_QUOTE}&rdquo;</p>
      </blockquote>
    </figure>
  );
}
