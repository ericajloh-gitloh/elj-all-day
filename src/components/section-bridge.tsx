import { DOMAINS, MARQUEE_ITEMS } from "@/lib/site";

type BridgeVariant = "lime" | "ink" | "violet" | "gradient";

const VARIANTS: Record<
  BridgeVariant,
  { bg: string; text: string; dot: string; border: string }
> = {
  lime: {
    bg: "bg-[#c8ff00]",
    text: "text-[#0a0a12]",
    dot: "bg-[#0a0a12]",
    border: "border-[#0a0a12]",
  },
  ink: {
    bg: "bg-[#0a0a12]",
    text: "text-[#c8ff00]",
    dot: "bg-[#c8ff00]",
    border: "border-[#c8ff00]/30",
  },
  violet: {
    bg: "bg-[#7c3aed]",
    text: "text-white",
    dot: "bg-[#c8ff00]",
    border: "border-white/20",
  },
  gradient: {
    bg: "section-bridge--gradient",
    text: "text-white",
    dot: "bg-[#c8ff00]",
    border: "border-white/15",
  },
};

type SectionBridgeProps = {
  variant?: BridgeVariant;
  phrases?: readonly string[];
  label?: string;
};

export function SectionBridge({
  variant = "ink",
  phrases = MARQUEE_ITEMS,
  label,
}: SectionBridgeProps) {
  const v = VARIANTS[variant];
  const items = [...phrases, ...phrases];

  return (
    <div
      className={`section-bridge section-bridge-marquee overflow-hidden border-y-2 ${v.border} ${v.bg}`}
      aria-hidden={label ? undefined : true}
    >
      {label && (
        <p className={`section-bridge__label eyebrow ${v.text} px-5 py-2 lg:px-10`}>
          {label}
        </p>
      )}
      <div className="section-bridge__track marquee-track py-3">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`marquee-item flex items-center gap-8 px-8 ${v.text}`}
          >
            {item}
            <span className={`h-2 w-2 shrink-0 rounded-full ${v.dot}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function SectionBridgeDomains({ variant = "lime" }: { variant?: BridgeVariant }) {
  return <SectionBridge variant={variant} phrases={DOMAINS} />;
}

export function AnimatedDivider({ variant = "diagonal" }: { variant?: "diagonal" | "slash" | "wave" }) {
  return (
    <div
      className={`section-divider section-divider--${variant}`}
      aria-hidden="true"
    />
  );
}
