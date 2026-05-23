"use client";

import { useEffect } from "react";

/** Parallax + depth for sections outside hero & work */
export function ScrollParallaxProvider() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || mobile || coarse) return;

    const layers = document.querySelectorAll<HTMLElement>(
      "[data-scroll-parallax]",
    );
    if (!layers.length) return;

    let ticking = false;

    const update = () => {
      layers.forEach((el) => {
        const speed = parseFloat(el.dataset.scrollParallax || "0.15");
        const rect = el.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
        const translate = Math.max(
          -36,
          Math.min(36, centerOffset * speed * -0.65),
        );
        el.style.transform = `translate3d(0, ${translate}px, 0)`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
