"use client";

import { useEffect, useRef } from "react";
import {
  IMPACT_SECTION,
  PROOF_POINTS,
  STRATEGIC_PILLARS,
} from "@/lib/site";
import "./work-editorial.css";

const MARQUEE_PHRASES = [
  "Product Vision",
  "Fan Engagement",
  "Design Leadership",
  "0→1 Launches",
  "Cross-Functional Alignment",
  "Sports & Fantasy",
  "Growth & Retention",
  "Founder Partnership",
  "Monetization",
  "Live Sports",
] as const;

const STAT_ROTATIONS = ["-4deg", "3deg", "-2deg", "5deg"] as const;

type PillarTone = (typeof STRATEGIC_PILLARS)[number]["tone"];

type PillarSlot = {
  pillarId: (typeof STRATEGIC_PILLARS)[number]["id"];
  slot: string;
  rotate: string;
  revealRotate: string;
  isHero?: boolean;
};

const PILLAR_LAYOUT: PillarSlot[] = [
  {
    pillarId: "product-vision",
    slot: "work-editorial__slot--hero work-editorial__slot--text-only work-editorial__slot--text-only-hero",
    rotate: "-1.5deg",
    revealRotate: "-1deg",
    isHero: true,
  },
  {
    pillarId: "fan-engagement",
    slot: "work-editorial__slot--stock-tall work-editorial__slot--offset-up",
    rotate: "3deg",
    revealRotate: "2deg",
  },
  {
    pillarId: "org-alignment",
    slot: "work-editorial__slot--tall work-editorial__slot--offset-down",
    rotate: "2deg",
    revealRotate: "1deg",
  },
  {
    pillarId: "systems-scale",
    slot: "work-editorial__slot--wide",
    rotate: "-2deg",
    revealRotate: "-1deg",
  },
  {
    pillarId: "modern-sports",
    slot: "work-editorial__slot--stock-wide",
    rotate: "-3deg",
    revealRotate: "0deg",
  },
  {
    pillarId: "design-leadership",
    slot: "work-editorial__slot--medium",
    rotate: "3deg",
    revealRotate: "2deg",
  },
  {
    pillarId: "cross-functional",
    slot: "work-editorial__slot--compact work-editorial__slot--offset-up",
    rotate: "-4deg",
    revealRotate: "-2deg",
  },
  {
    pillarId: "sports-innovation",
    slot: "work-editorial__slot--stock-accent work-editorial__slot--offset-down",
    rotate: "2deg",
    revealRotate: "1deg",
  },
];

type ChipVariant = "green" | "accent" | "slate" | "navy";

function Chip({ label, variant }: { label: string; variant: ChipVariant }) {
  const styles: Record<ChipVariant, string> = {
    green: "border-green-text/50 bg-green-text/15 text-green-text",
    accent: "border-accent-text/50 bg-accent-text/15 text-accent-text",
    slate: "border-border bg-navy-mid/10 text-ink",
    navy: "border-navy-light bg-navy text-white",
  };
  return (
    <span
      className={`work-editorial__chip rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest sm:text-[11px] ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

function HighlightedText({
  text,
  phrases,
}: {
  text: string;
  phrases: readonly string[];
}) {
  if (!phrases.length) return <>{text}</>;

  const pattern = new RegExp(
    `(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        phrases.some((phrase) => phrase === part) ? (
          <mark key={`${part}-${i}`} className="work-editorial__text-highlight">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

function toneBodyClass(tone: PillarTone, isHero: boolean) {
  if (tone === "dark") {
    return `work-editorial__card-body--text-only work-editorial__card-body--stealth ${isHero ? "work-editorial__card-body--text-only-hero" : ""}`;
  }
  if (tone === "lime") {
    return `work-editorial__card-body--text-only work-editorial__pillar-body--lime ${isHero ? "work-editorial__card-body--text-only-hero" : ""}`;
  }
  return `work-editorial__card-body--text-only ${isHero ? "work-editorial__card-body--text-only-hero" : ""}`;
}

function PillarPanel({
  pillarId,
  rotate,
  isHero = false,
}: {
  pillarId: (typeof STRATEGIC_PILLARS)[number]["id"];
  rotate: string;
  isHero?: boolean;
}) {
  const pillar = STRATEGIC_PILLARS.find((p) => p.id === pillarId);
  if (!pillar) return null;

  const isDark = pillar.tone === "dark";

  return (
    <article
      className={`work-editorial__card work-editorial__pillar flex flex-col overflow-hidden border-[3px] border-[var(--we-ink)] bg-white shadow-[8px_10px_0_var(--we-ink)] work-editorial__card--text-only ${isHero ? "work-editorial__card--text-only-hero h-full" : "h-auto"}`}
      style={{ "--card-rotate": rotate } as React.CSSProperties}
    >
      <div
        className={`work-editorial__card-body relative flex flex-col gap-2.5 p-4 sm:p-5 ${toneBodyClass(pillar.tone, isHero)}`}
      >
        <div className="flex flex-wrap items-start gap-1.5">
          <span className="work-editorial__pillar-num" aria-hidden="true">
            {pillar.num}
          </span>
          {pillar.tags.map((tag, i) => (
            <Chip
              key={tag}
              label={tag}
              variant={
                i === 0 ? "green" : pillar.tone === "dark" ? "accent" : "slate"
              }
            />
          ))}
        </div>
        {isDark && (
          <div
            className="work-editorial__card-stealth-rule"
            aria-hidden="true"
          />
        )}
        <h3
          className={`work-editorial__pillar-title font-display italic leading-[1.05] ${
            isDark
              ? `work-editorial__card-title--text-only work-editorial__card-title--stealth ${isHero ? "work-editorial__card-title--text-only-hero" : ""}`
              : `work-editorial__card-title--text-only text-[var(--we-ink)] ${isHero ? "work-editorial__card-title--text-only-hero" : ""}`
          }`}
        >
          {pillar.title}
        </h3>
        <p
          className={`work-editorial__pillar-copy ${
            isDark
              ? `work-editorial__card-copy--text-only work-editorial__card-copy--stealth ${isHero ? "work-editorial__card-copy--text-only-hero" : ""}`
              : `work-editorial__card-copy--text-only text-muted ${isHero ? "work-editorial__card-copy--text-only-hero" : ""}`
          }`}
        >
          <HighlightedText text={pillar.body} phrases={pillar.highlights} />
        </p>
        {"proofLine" in pillar && pillar.proofLine && (
          <p
            className={`work-editorial__pillar-proof ${isDark ? "work-editorial__pillar-proof--dark" : ""}`}
          >
            {pillar.proofLine}
          </p>
        )}
      </div>
    </article>
  );
}

function Reveal({
  children,
  className = "",
  revealRotate = "0deg",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  revealRotate?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (prefersReduced || isMobile) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`work-reveal ${className}`}
      style={
        {
          "--reveal-rotate": revealRotate,
          transitionDelay: `${delay}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function WorkEditorial() {
  const marqueeItems = [...MARQUEE_PHRASES, ...MARQUEE_PHRASES];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="work-editorial border-b border-border"
    >
      <div className="work-editorial__mesh" aria-hidden="true" />

      <div className="relative z-10 overflow-hidden" aria-hidden="true">
        <div className="work-editorial__marquee-track">
          {marqueeItems.map((phrase, i) => (
            <span key={`${phrase}-${i}`} className="work-editorial__marquee-item">
              {phrase}
              <span className="mx-8 inline-block text-[var(--we-orange)]">◆</span>
            </span>
          ))}
        </div>
      </div>

      <header className="relative z-10 border-b-[3px] border-[var(--we-ink)] px-5 py-8 md:py-10 lg:px-10 lg:py-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="work-editorial__eyebrow mb-3 font-bold uppercase tracking-[0.2em] text-green-text">
              {IMPACT_SECTION.eyebrow}
            </p>
            <p className="work-editorial__sub mb-6 uppercase tracking-widest text-muted lg:absolute lg:right-10 lg:top-10">
              {IMPACT_SECTION.sub}
            </p>
            <h2
              id="work-heading"
              className="work-editorial__headline font-display font-light leading-[0.88] tracking-tight text-[var(--we-ink)]"
            >
              {IMPACT_SECTION.headlineBefore}{" "}
              <em className="text-green-text">{IMPACT_SECTION.headlineEm}</em>
            </h2>
          </div>
          <span
            className="work-editorial__sticker hidden self-start bg-[var(--we-lime)] text-[var(--we-ink)] lg:inline-block"
            style={{ "--rotate": "8deg" } as React.CSSProperties}
          >
            {IMPACT_SECTION.sticker}
          </span>
        </div>
      </header>

      <div className="work-editorial__metrics relative z-10 border-b-[3px] border-[var(--we-ink)]">
        <div className="work-editorial__metrics-grid mx-auto max-w-[1440px] px-5 py-10 md:py-14 lg:px-10 lg:py-20">
          <Reveal
            className="work-editorial__metric-hero"
            revealRotate="-2deg"
          >
            <article className="work-editorial__metric-block work-editorial__metric-block--hero">
              <p className="work-editorial__metric-value work-editorial__mega-stat">
                <span className="work-editorial__metric-number">
                  {PROOF_POINTS[0].stat}
                </span>
                <span className="work-editorial__metric-suffix work-editorial__metric-suffix--hero">
                  {PROOF_POINTS[0].suffix}
                </span>
              </p>
              <p className="work-editorial__metric-label work-editorial__metric-label--hero">
                {PROOF_POINTS[0].label}
              </p>
            </article>
          </Reveal>

          <div className="work-editorial__metrics-stack">
            {PROOF_POINTS.slice(1).map((point, i) => (
              <Reveal
                key={point.label}
                revealRotate={STAT_ROTATIONS[i + 1]}
                delay={i * 80}
              >
                <article className="work-editorial__metric-block work-editorial__metric-block--secondary">
                  <p className="work-editorial__metric-value work-editorial__metric-value--secondary">
                    <span className="work-editorial__metric-number">
                      {point.stat}
                    </span>
                    <span className="work-editorial__metric-suffix">
                      {point.suffix}
                    </span>
                  </p>
                  <p className="work-editorial__metric-label">
                    {point.label}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal className="relative z-10">
        <div className="work-editorial__intro mx-auto max-w-[1440px] border-b-[3px] border-[var(--we-ink)] px-5 py-8 md:py-10 lg:px-10 lg:py-12">
          <p className="work-editorial__intro-copy font-display font-light italic text-[var(--we-ink)]">
            {IMPACT_SECTION.intro}
          </p>
        </div>
      </Reveal>

      <div className="work-editorial__collage relative z-10 mx-auto max-w-[1440px]">
        {PILLAR_LAYOUT.map((item, index) => (
          <Reveal
            key={item.pillarId}
            className={item.slot}
            revealRotate={item.revealRotate}
            delay={(index % 5) * 60}
          >
            <PillarPanel
              pillarId={item.pillarId}
              rotate={item.rotate}
              isHero={item.isHero}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
