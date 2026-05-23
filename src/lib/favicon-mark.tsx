/** Shared favicon / app-icon mark — matches public/favicon.svg */
export function FaviconMark({ size }: { size: number }) {
  const barWidth = Math.max(2, Math.round(size * 0.094));
  const fontSize = Math.round(size * 0.56);
  const padLeft = Math.round(size * 0.28);
  const slashWidth = Math.round(size * 0.22);
  const slashHeight = Math.max(2, Math.round(size * 0.06));

  return (
    <div
      style={{
        width: size,
        height: size,
        background: "#0a0a12",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: barWidth,
          height: size,
          background: "#c8ff00",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: padLeft,
          top: "50%",
          transform: "translateY(-52%)",
          fontSize,
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic",
          fontWeight: 300,
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        E
      </div>
      <div
        style={{
          position: "absolute",
          right: Math.round(size * 0.12),
          top: Math.round(size * 0.38),
          width: slashWidth,
          height: slashHeight,
          background: "#c8ff00",
          transform: "rotate(-12deg)",
          opacity: 0.9,
        }}
      />
    </div>
  );
}
