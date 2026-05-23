import Image from "next/image";
import Link from "next/link";
import "@/components/approach-editorial.css";
import { HeroCampaign } from "@/components/hero-campaign";
import { EditorialQuotePanel } from "@/components/editorial-quote";
import { Marquee } from "@/components/marquee";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  AnimatedDivider,
  SectionBridge,
  SectionBridgeDomains,
} from "@/components/section-bridge";
import { ScrollShell } from "@/components/scroll-shell";
import { SectionHeadline, SectionLabelBar } from "@/components/section-header";
import { SiteHeader } from "@/components/site-header";
import { AboutEditorialPanel } from "@/components/about-editorial-panel";
import { StockPhoto } from "@/components/stock-photo";
import { WorkEditorial } from "@/components/work-editorial";
import { STOCK_IMAGES } from "@/lib/stock-images";
import { SECTION_IMAGES } from "@/lib/images";
import {
  DOMAINS,
  NAV_LINKS,
  PRACTICE_OFFERS,
  PRINCIPLES,
  SITE,
  TESTIMONIALS,
} from "@/lib/site";

const PRACTICE_PHOTOS = [
  STOCK_IMAGES.practiceSprint,
  STOCK_IMAGES.practiceEmbedded,
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />

      <ScrollShell>
        <main id="main-content">
          <HeroCampaign />

          <AnimatedDivider variant="slash" />
          <SectionBridge variant="gradient" />

          {/* Approach */}
          <section
            id="approach"
            className="scroll-section relative border-b border-border bg-white"
          >
            <div className="scroll-section__glow" aria-hidden="true" />
            <span
              className="scroll-section-header__index pointer-events-none absolute right-5 top-2 select-none lg:right-10"
              aria-hidden="true"
            >
              01
            </span>
            <ScrollReveal>
              <SectionLabelBar
                eyebrow="Approach"
                sub="How we think about the work"
              />
            </ScrollReveal>
            <ScrollReveal delay={80} direction="left">
              <SectionHeadline>
                Built for fans, <em>platforms</em>, and live moments.
              </SectionHeadline>
            </ScrollReveal>
            <ScrollReveal>
              <div className="approach-editorial">
                <div className="approach-editorial__mesh" aria-hidden="true" />
                <div className="approach-editorial__grid section-x">
                  <EditorialQuotePanel className="approach-editorial__quote" />
                  <div
                    className="approach-editorial__visual"
                    data-scroll-parallax="0.08"
                  >
                    <StockPhoto
                      src={STOCK_IMAGES.approachBanner.src}
                      alt={STOCK_IMAGES.approachBanner.alt}
                      overlay="dark"
                      className="approach-editorial__banner section-approach-banner image-reveal mobile-banner-crop relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]"
                      imageClassName="object-cover object-[center_30%] sm:object-center"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <div className="principles-grid grid gap-px border-b border-border bg-border md:grid-cols-3">
              {PRINCIPLES.map((principle, i) => (
                <ScrollReveal key={principle.title} delay={i * 90}>
                  <article
                    className={`hover-lift editorial-card bg-white px-5 py-10 lg:px-10 lg:py-12 ${
                      i === 1 ? "md:border-x md:border-border" : ""
                    }`}
                  >
                    <h3 className="display-card-title mb-4">
                      {principle.title}
                    </h3>
                    <p className="body-copy-sm">
                      {principle.body}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal>
              <div className="section-x domains-row flex flex-wrap gap-2.5 py-8 lg:py-10">
                {DOMAINS.map((domain, i) => (
                  <span
                    key={domain}
                    className="editorial-chip"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </section>

          <SectionBridgeDomains variant="lime" />
          <AnimatedDivider variant="wave" />

          {/* Practice */}
          <section
            id="practice"
            className="scroll-section relative border-b border-border bg-mist"
          >
            <div className="scroll-section__glow" aria-hidden="true" />
            <span
              className="scroll-section-header__index pointer-events-none absolute right-5 top-2 select-none lg:right-10"
              aria-hidden="true"
            >
              02
            </span>
            <ScrollReveal>
              <SectionLabelBar
                eyebrow="Practice"
                sub="Two ways to work together"
              />
            </ScrollReveal>
            <ScrollReveal delay={80} direction="right">
              <SectionHeadline>
                How we work <em>together.</em>
              </SectionHeadline>
            </ScrollReveal>
            <div className="grid lg:grid-cols-2">
              {PRACTICE_OFFERS.map((offer, i) => (
                <ScrollReveal key={offer.name} delay={i * 120} direction="up">
                  <article
                    className={`hover-lift flex flex-col bg-white ${
                      i === 0
                        ? "border-b border-border lg:border-b-0 lg:border-r"
                        : ""
                    }`}
                  >
                    <div data-scroll-parallax="0.12">
                      <StockPhoto
                        src={PRACTICE_PHOTOS[i].src}
                        alt={PRACTICE_PHOTOS[i].alt}
                        overlay="dark"
                        className="section-practice-photo image-reveal relative aspect-[16/9] w-full overflow-hidden"
                        imageClassName="object-cover object-[center_25%]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="section-body-pad flex flex-col gap-5">
                      <span className="eyebrow text-accent-text">
                        {offer.num} / {offer.name}
                      </span>
                      <h3 className="display-module-title">
                        {offer.name}
                      </h3>
                      <p className="eyebrow font-medium tracking-widest text-green-text">
                        {offer.tag}
                      </p>
                      <p className="body-copy">
                        {offer.description}
                      </p>
                      <hr className="border-border" />
                      <ul className="flex flex-col gap-2">
                        {offer.items.map((item) => (
                          <li
                            key={item}
                            className="body-copy-sm flex gap-3 text-ink before:shrink-0 before:text-green-text before:content-['→']"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>

          <AnimatedDivider variant="diagonal" />

          <WorkEditorial />

          <SectionBridge variant="ink" />
          <AnimatedDivider variant="slash" />

          {/* Testimonials */}
          <section
            id="testimonials"
            aria-labelledby="testimonials-heading"
            className="scroll-section relative border-b border-border bg-navy"
          >
            <div
              className="scroll-section__glow opacity-30"
              aria-hidden="true"
            />
            <span
              className="scroll-section-header__index scroll-section-header__index--dark pointer-events-none absolute right-5 top-2 select-none lg:right-10"
              aria-hidden="true"
            >
              03
            </span>
            <StockPhoto
              src={STOCK_IMAGES.testimonialsBg.src}
              alt=""
              overlay="dark"
              className="pointer-events-none absolute inset-0 aspect-auto h-full w-full opacity-40"
              imageClassName="object-cover"
              sizes="100vw"
              decorative
            />
            <div className="relative">
              <ScrollReveal>
                <SectionLabelBar
                  eyebrow="What people say about Erica"
                  dark
                />
              </ScrollReveal>
              <ScrollReveal delay={80} direction="left">
                <SectionHeadline dark wide id="testimonials-heading">
                  The kind of leader people <em>want</em> on their team.
                </SectionHeadline>
              </ScrollReveal>
              <ul className="testimonials-list section-x flex flex-col gap-5 py-10 lg:py-12">
                {TESTIMONIALS.map((t, i) => (
                  <ScrollReveal key={t.name} delay={i * 100}>
                    <li
                      className={`hover-lift editorial-card editorial-card--dark p-6 sm:p-8 lg:p-10 ${
                        i % 2 === 0
                          ? "editorial-card--accent-left border-l-green-bright"
                          : "border-l-4 border-l-accent-bright"
                      }`}
                    >
                      <figure>
                        <blockquote className="testimonial-quote text-white">
                          <p>&ldquo;{t.quote}&rdquo;</p>
                        </blockquote>
                        <figcaption className="mt-6 flex flex-col gap-0.5 border-t border-white/10 pt-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                          <cite className="caption font-medium not-italic text-green-bright">
                            {t.name}
                          </cite>
                          <span className="caption text-text-on-dark">
                            {t.title}
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </section>

          <SectionBridge variant="gradient" />
          <AnimatedDivider variant="wave" />

          {/* About */}
          <section
            id="about"
            className="scroll-section relative border-b border-border bg-white"
          >
            <div className="scroll-section__glow" aria-hidden="true" />
            <span
              className="scroll-section-header__index pointer-events-none absolute right-5 top-2 select-none lg:right-10"
              aria-hidden="true"
            >
              04
            </span>
            <ScrollReveal>
              <SectionLabelBar
                eyebrow="About"
                sub={`Founded by ${SITE.founder}`}
              />
            </ScrollReveal>
            <ScrollReveal delay={80} direction="right">
              <SectionHeadline>
                Always on. <em>Always</em> fan-first.
              </SectionHeadline>
            </ScrollReveal>
            <ScrollReveal>
              <div data-scroll-parallax="0.08">
                <AboutEditorialPanel
                  variant="banner"
                  className="image-reveal mobile-banner-crop relative aspect-[4/3] w-full overflow-hidden border-b border-border sm:aspect-[21/9] lg:hidden"
                />
              </div>
            </ScrollReveal>
            <div className="grid lg:grid-cols-[minmax(280px,360px)_1fr]">
              <ScrollReveal direction="left">
                <div className="section-body-pad border-b border-border lg:border-b-0 lg:border-r">
                  <div className="about-portrait image-reveal relative mb-8 aspect-[3/4] overflow-hidden rounded-[var(--radius-soft)] border-4 border-green-text bg-navy-light lg:mb-10">
                    <Image
                      src={SECTION_IMAGES.founderPortrait.src}
                      alt={SECTION_IMAGES.founderPortrait.alt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                  </div>
                  <p className="eyebrow text-accent-text">
                    {SITE.founder}
                  </p>
                  <p className="mt-1 caption text-muted">
                    Founder & Principal, {SITE.name}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={120} direction="right">
                <div className="section-body-pad">
                  <p className="about-bio-lead display-lead mb-8">
                    For 20+ years,{" "}
                    <strong className="font-normal not-italic text-accent-text">
                      {SITE.founder}
                    </strong>{" "}
                    has led teams building products people love — most recently
                    as Head of Product Design at{" "}
                    <strong className="font-normal not-italic text-accent-text">
                      Yahoo Sports and Yahoo Fantasy
                    </strong>
                    , directing design strategy for platforms serving{" "}
                    <strong className="font-normal not-italic text-green-text">
                      120M+ daily active users
                    </strong>{" "}
                    and products generating{" "}
                    <strong className="font-normal not-italic text-green-text">
                      $100M+ in annual revenue
                    </strong>
                    .
                  </p>
                  <p className="about-bio-body body-copy mb-6">
                    Through {SITE.name}, that same executive clarity comes to
                    founders and leadership teams who need strategic direction,
                    design leadership, and product momentum — across fantasy
                    sports, sports betting, live sports, gaming, and media.
                  </p>
                  <p className="about-bio-body body-copy">
                    Expertise spans product strategy, fan engagement, 0→1
                    launches, org building, and cross-functional alignment —
                    with 15+ industry awards recognizing work across fantasy,
                    sports, and betting.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <AnimatedDivider variant="diagonal" />
          <SectionBridge variant="lime" />

          {/* Contact */}
          <section
            id="contact"
            aria-labelledby="contact-heading"
            className="scroll-section relative bg-gradient-funky-contact border-t-4 border-green-bright"
          >
            <span
              className="scroll-section-header__index scroll-section-header__index--dark pointer-events-none absolute right-5 top-4 select-none lg:right-10"
              aria-hidden="true"
            >
              05
            </span>
            <div className="grid lg:grid-cols-2">
              <ScrollReveal direction="left">
                <div className="section-body-pad border-b border-white/10 lg:border-b-0 lg:border-r">
                  <h2
                    id="contact-heading"
                    className="contact-headline font-display mb-6 font-light italic tracking-tight text-white [text-wrap:balance]"
                  >
                    Let&apos;s build something{" "}
                    <em className="not-italic text-green-bright">great.</em>
                  </h2>
                  <p className="contact-body mb-9 max-w-md text-text-on-dark">
                    Whether you need a rapid strategy sprint or an embedded
                    design leader — let&apos;s find the right fit. Book a
                    30-minute intro call.
                  </p>
                  <a
                    href={SITE.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary hover-lift w-full px-9 py-4 sm:w-auto"
                    aria-label="Book a call (opens in new tab)"
                  >
                    Book a call
                  </a>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100} direction="right">
                <div className="contact-meta-stack section-body-pad flex flex-col justify-center gap-3">
                  {[
                    { label: "Based in", value: SITE.location },
                    {
                      label: "Availability",
                      value: "Now accepting new engagements",
                    },
                    {
                      label: "Engagement types",
                      value: "Sprint / Embedded",
                    },
                    {
                      label: "Expertise",
                      value:
                        "Fantasy sports, fan engagement, betting, live sports, gaming, media",
                    },
                  ].map((item, i) => (
                    <div
                      key={item.label}
                      className="hover-lift editorial-card editorial-card--dark-glass px-6 py-5 hover:border-green/40"
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      <p className="eyebrow mb-1.5 text-text-on-dark-muted">
                        {item.label}
                      </p>
                      <p className="contact-meta-value text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>

        <Marquee variant="navy" />

        <ScrollReveal>
          <footer className="site-footer section-x flex flex-col items-center justify-between gap-4 bg-navy py-6 text-center sm:flex-row sm:text-left">
            <p className="caption-sm text-text-on-dark">
              © {new Date().getFullYear()} {SITE.name}. Founded by{" "}
              {SITE.founder}.
            </p>
            <nav
              className="flex flex-wrap justify-center gap-6"
              aria-label="Footer"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-nav-link caption-sm rounded-sm uppercase tracking-widest text-text-on-dark transition-colors hover:-translate-y-0.5 hover:text-green-bright"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={SITE.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-nav-link caption-sm rounded-sm uppercase tracking-widest text-text-on-dark transition-colors hover:text-accent-bright"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                LinkedIn
                <span aria-hidden="true"> ↗</span>
              </a>
              <a
                href={SITE.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-nav-link caption-sm rounded-sm uppercase tracking-widest text-text-on-dark transition-colors hover:text-green-bright"
                aria-label="Book a call (opens in new tab)"
              >
                Book a call
              </a>
            </nav>
          </footer>
        </ScrollReveal>
      </ScrollShell>
    </>
  );
}
