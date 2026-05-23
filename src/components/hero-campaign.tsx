import Image from "next/image";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/hero-images";
import { PROOF_POINTS, SITE } from "@/lib/site";
import "./hero-campaign.css";

const STAT_ROTATIONS = ["-3deg", "2deg", "-1deg", "4deg"] as const;

export function HeroCampaign() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero-campaign border-b border-white/10"
    >
      <div aria-hidden="true">
        <div className="hero-campaign__mesh" />
        <div className="hero-campaign__slash" />
        <div className="hero-campaign__grain" />
      </div>

      <div className="hero-campaign__stage mx-auto max-w-[1440px]">
        <div
          className="hero-campaign__sticker-all-day pointer-events-none absolute z-20 hidden lg:block"
          aria-hidden="true"
        >
          <span
            className="hero-campaign__sticker text-white"
            style={
              {
                "--sticker-rotate": "-12deg",
                background: "var(--hero-violet)",
              } as React.CSSProperties
            }
          >
            All Day
          </span>
        </div>
        <div
          className="hero-campaign__sticker-fan pointer-events-none absolute z-20 hidden md:block"
          aria-hidden="true"
        >
          <span
            className="hero-campaign__sticker bg-white text-[var(--hero-ink)]"
            style={{ "--sticker-rotate": "8deg" } as React.CSSProperties}
          >
            Fan First
          </span>
        </div>
        <div
          className="hero-campaign__sticker-live pointer-events-none absolute z-20 hidden lg:block"
          aria-hidden="true"
        >
          <span
            className="hero-campaign__sticker border-white text-white"
            style={
              {
                "--sticker-rotate": "-6deg",
                background: "var(--hero-orange)",
              } as React.CSSProperties
            }
          >
            Live Sports
          </span>
        </div>
        <div
          className="hero-campaign__photo-stack hero-campaign__layer"
          data-parallax="slow"
        >
          <div className="hero-campaign__photo-main overflow-hidden">
            <Image
              src={HERO_IMAGES.primary.src}
              alt={HERO_IMAGES.primary.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 70vw, 520px"
              priority
            />
          </div>
          <div className="hero-campaign__photo-secondary overflow-hidden">
            <Image
              src={HERO_IMAGES.secondary.src}
              alt={HERO_IMAGES.secondary.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 45vw, 280px"
              priority
            />
          </div>
          <div className="hero-campaign__photo-accent overflow-hidden max-md:hidden">
            <Image
              src={HERO_IMAGES.accent.src}
              alt={HERO_IMAGES.accent.alt}
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        </div>

        <div className="hero-campaign__content relative z-10 min-h-0 lg:min-h-[820px]">
          <div className="hero-campaign__layer pt-2 lg:absolute lg:bottom-[12%] lg:left-0 lg:max-w-[58%] lg:pb-0 lg:pt-0">
            <p className="hero-campaign__eyebrow mb-5 inline-block -rotate-2 bg-white/10 px-4 py-2 backdrop-blur-sm">
              Design advisory & creative strategy
            </p>

            <h1 id="hero-heading" className="hero-campaign__headline mb-6">
              Design that <em>moves</em> the whole game.
            </h1>

            <p className="hero-campaign__deck mb-8 max-w-md md:-rotate-1">
              ELJ All Day partners with founders and leadership teams in
              sports, media, and fan platforms — aligning product vision,
              design strategy, and cross-functional execution at the speed of
              live sports.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:translate-x-2">
              <a
                href={SITE.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-campaign__cta hero-campaign__cta--primary inline-flex min-h-12 w-full -rotate-1 items-center justify-center rounded-none border-2 border-[var(--hero-lime)] bg-[var(--hero-lime)] px-8 py-3.5 text-[var(--hero-ink)] shadow-[6px_6px_0_#fff] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_#fff] sm:w-auto"
                aria-label="Book a call (opens in new tab)"
              >
                Book a call
              </a>
              <Link
                href="#work"
                className="hero-campaign__cta hero-campaign__cta--secondary inline-flex min-h-12 w-full rotate-1 items-center justify-center border-2 border-white bg-transparent px-8 py-3.5 text-white transition-colors hover:bg-white hover:text-[var(--hero-ink)] sm:w-auto"
              >
                See the work
              </Link>
            </div>
          </div>

          <dl className="hero-campaign__stats hero-campaign__layer relative z-10 mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:absolute lg:bottom-[6%] lg:right-0 lg:mt-0 lg:w-[min(100%,520px)]">
            {PROOF_POINTS.map((point, i) => (
              <div
                key={point.label}
                className="hero-campaign__stat rounded-none border-2 border-white/25 bg-[var(--hero-ink)]/60 p-4 sm:p-5"
                style={
                  { "--stat-rotate": STAT_ROTATIONS[i] } as React.CSSProperties
                }
              >
                <dt className="hero-campaign__stat-value font-display font-light leading-none text-white">
                  {point.stat}
                  <sup className="hero-campaign__stat-suffix text-[var(--hero-lime)]">
                    {point.suffix}
                  </sup>
                </dt>
                <dd className="hero-campaign__stat-label mt-2 leading-snug text-white/85">
                  {point.label}
                </dd>
              </div>
            ))}
            <div
              className="hero-campaign__stat col-span-2 flex items-start gap-3 border-[var(--hero-lime)]/60 bg-[var(--hero-lime)]/15 p-4 sm:p-5"
              style={{ "--stat-rotate": "1deg" } as React.CSSProperties}
            >
              <span
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--hero-lime)] animate-pulse-dot"
                aria-hidden="true"
              />
              <p className="hero-campaign__availability leading-snug text-white">
                <strong className="font-bold text-[var(--hero-lime)]">
                  Now accepting engagements.
                </strong>{" "}
                Sprint and Embedded partnerships available.
              </p>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
