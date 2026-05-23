"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["hero", "approach", "practice", "work", "testimonials", "about", "contact"];

export function useScrollSpy() {
  const [activeId, setActiveId] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const offset = window.innerHeight * 0.35;
      let current = "hero";

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - offset <= scrollTop) {
          current = id;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { activeId, scrollProgress };
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
