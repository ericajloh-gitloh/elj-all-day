"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollSpy, useScrolled } from "@/hooks/use-scroll-spy";
import { NAV_LINKS, SITE } from "@/lib/site";
import "./site-header.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrolled = useScrolled(32);
  const { activeId, scrollProgress } = useScrollSpy();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.dataset.navScrollY = String(scrollY);
      document.body.classList.add("site-nav-menu-open");
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.classList.remove("site-nav-menu-open");
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        const saved = document.body.dataset.navScrollY;
        delete document.body.dataset.navScrollY;
        if (saved) window.scrollTo(0, Number(saved));
      };
    }

    document.body.classList.remove("site-nav-menu-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  const mobileOverlay =
    mounted &&
    createPortal(
      <div
        id="site-nav-overlay"
        className={`site-nav__overlay lg:hidden ${open ? "is-open" : "is-closed"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
      >
        <div className="site-nav__overlay-panel">
          <div className="site-nav__overlay-top">
            <p className="site-nav__overlay-meta">{SITE.name}</p>
            <button
              type="button"
              className="site-nav__overlay-close"
              aria-label="Close menu"
              onClick={close}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="site-nav__overlay-nav">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`site-nav__overlay-link ${activeId === id ? "is-active" : ""}`}
                  onClick={close}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="site-nav__overlay-bottom">
            <a
              href={SITE.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-nav__overlay-meta site-nav__overlay-meta--link"
              aria-label="LinkedIn profile (opens in new tab)"
              onClick={close}
            >
              LinkedIn ↗
            </a>
            <a
              href={SITE.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-nav__cta site-nav__overlay-cta"
              aria-label="Book a call (opens in new tab)"
              onClick={close}
            >
              Book a call
            </a>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <header
        className={`site-nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-menu-open" : ""}`}
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
              onClick={() => setOpen((value) => !value)}
            >
              <span className="font-display text-2xl italic leading-none">
                {open ? "×" : "≡"}
              </span>
            </button>
          </div>
          <div className="site-nav__accent" aria-hidden="true" />
        </div>
      </header>

      {mobileOverlay}
    </>
  );
}
