import type { ComponentPropsWithoutRef } from "react";
import { PROOF_POINTS } from "@/lib/site";
import "./about-editorial-panel.css";

const HERO_STAT = PROOF_POINTS[0];

type AboutEditorialPanelProps = {
  className?: string;
  variant?: "banner" | "context";
} & ComponentPropsWithoutRef<"div">;

export function AboutEditorialPanel({
  className = "",
  variant = "context",
  ...props
}: AboutEditorialPanelProps) {
  return (
    <div
      className={`about-editorial-panel about-editorial-panel--${variant} ${className}`.trim()}
      aria-hidden="true"
      {...props}
    >
      <div className="about-editorial-panel__mesh" aria-hidden="true" />
      <div className="about-editorial-panel__slash" aria-hidden="true" />
      <div className="about-editorial-panel__texture" aria-hidden="true" />
      <div className="about-editorial-panel__orb about-editorial-panel__orb--a" aria-hidden="true" />
      <div className="about-editorial-panel__orb about-editorial-panel__orb--b" aria-hidden="true" />
      <div className="about-editorial-panel__ring" aria-hidden="true" />
      <div className="about-editorial-panel__rule" aria-hidden="true" />
      <span className="about-editorial-panel__sticker about-editorial-panel__sticker--lime">
        Fan First
      </span>
      <span className="about-editorial-panel__sticker about-editorial-panel__sticker--live">
        Live Sports
      </span>
      <div className="about-editorial-panel__content">
        <p className="about-editorial-panel__stat">
          <span className="about-editorial-panel__stat-value">
            {HERO_STAT.stat}
          </span>
          <span className="about-editorial-panel__stat-suffix">
            {HERO_STAT.suffix}
          </span>
        </p>
        <p className="about-editorial-panel__stat-label">{HERO_STAT.label}</p>
      </div>
    </div>
  );
}
