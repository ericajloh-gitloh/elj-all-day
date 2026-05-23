"use client";

import { ScrollParallaxProvider } from "@/components/scroll-parallax-provider";
import "@/components/desktop-experience.css";
import "@/components/mobile-experience.css";
import "@/components/scroll-experience.css";

export function ScrollShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollParallaxProvider />
      {children}
    </>
  );
}
