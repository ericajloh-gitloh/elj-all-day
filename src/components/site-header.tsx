"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollSpy, useScrolled } from "@/hooks/use-scroll-spy";
import { NAV_LINKS, SITE } from "@/lib/site";
import "./site-header.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(32);
  const { activeId, scrollProgress } = useScrollSpy();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`site-nav ${scrolled ? "is-scrolled" : ""}`}
        style={{ "--nav-progress": `${scrollProgress}%` } as React.CSSProperties}
      >
        <div className="site-nav__bar mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="flex h-[4.25rem] items-center justify-between gap-4">
            <Link href="#hero" className="site-nav__logo" onClick={close}>
              {SITE.name}
            </Link>

            <nav
              className="hidden items-center gap-7 lg:flex"
              aria-label="Main"
            >
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`site-nav__link ${activeId === id ? "is-active" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href={SITE.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav__link"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                LinkedIn
              </a>
              <a
                href={SITE.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav__cta"
                aria-label="Book a call (opens in new tab)"
              >
                Book a call
              </a>
            </nav>

            <button
              type="button"
              className="site-nav__menu-btn flex items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="site-nav-overlay"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="font-display text-2xl italic leading-none">
                {open ? "×" : "≡"}
              </span>
            </button>
          </div>
          <div className="site-nav__accent" aria-hidden="true" />
        </div>
      </header>

      <div
        id="site-nav-overlay"
        className={`site-nav__overlay ${open ? "is-open" : "is-closed"}`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-between px-6 py-8 sm:px-10">
          <div className="flex items-center justify-between">
            <p className="site-nav__overlay-meta">{SITE.name}</p>
            <button
              type="button"
              className="site-nav__menu-btn flex items-center justify-center text-3xl"
              aria-label="Close menu"
              onClick={close}
            >
              ×
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-col gap-2 py-8">
            {NAV_LINKS.map((link, i) => {
              const id = link.href.replace("#", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="site-nav__overlay-link"
                  style={{ transitionDelay: `${open ? 80 + i * 70 : 0}ms` }}
                  onClick={close}
                >
                  <span
                    className={
                      activeId === id ? "text-[#c8ff00]" : undefined
                    }
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-4 border-t border-white/15 pt-6">
            <a
              href={SITE.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-nav__overlay-meta site-nav__overlay-meta--link hover:text-[#c8ff00]"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              LinkedIn ↗
            </a>
            <a
              href={SITE.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-nav__cta inline-flex min-h-12 w-full items-center justify-center px-8 py-4 sm:w-fit"
              aria-label="Book a call (opens in new tab)"
              onClick={close}
            >
              Book a call
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
