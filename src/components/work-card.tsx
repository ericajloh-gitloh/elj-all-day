import Image from "next/image";

type ChipVariant = "green" | "accent" | "slate" | "navy";

function Chip({ label, variant }: { label: string; variant: ChipVariant }) {
  const styles: Record<ChipVariant, string> = {
    green: "bg-green-text/15 text-green-text border-green-text/50",
    accent: "bg-accent-text/15 text-accent-text border-accent-text/50",
    slate: "bg-navy-mid/20 text-ink border-border",
    navy: "bg-navy text-white border-navy-light",
  };
  return (
    <span
      className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-widest ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

export type WorkProject = {
  slug: string;
  title: string;
  description: string;
  chips: ReadonlyArray<{ label: string; variant: ChipVariant }>;
  featured?: boolean;
};

export function WorkCardFeatured({ project }: { project: WorkProject }) {
  return (
    <article className="group border-b border-border bg-navy">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[5/4] overflow-hidden border-b border-white/10 bg-navy-mid lg:border-b-0 lg:border-r">
          <div className="work-image-zoom flex h-full w-full items-center justify-center">
            <Image
              src={`/work/${project.slug}.jpg`}
              alt={`Screenshot of ${project.title} product work`}
              width={800}
              height={640}
              className="h-full w-full object-contain p-4 opacity-90"
            />
          </div>
          <div className="absolute left-4 top-4 rounded-full bg-accent-bright px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy">
            NDA
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="mb-3 flex flex-wrap gap-2">
            {project.chips.map((chip) => (
              <Chip key={chip.label} label={chip.label} variant={chip.variant} />
            ))}
          </div>
          <h3 className="font-display mb-3 text-3xl font-light italic leading-tight text-white lg:text-4xl">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-text-on-dark">
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function WorkCardGrid({ project }: { project: WorkProject }) {
  return (
    <li className="group overflow-hidden bg-white">
      <div className="aspect-[5/4] overflow-hidden border-b border-border bg-navy">
        <div className="work-image-zoom flex h-full w-full items-center justify-center">
          <Image
            src={`/work/${project.slug}.jpg`}
            alt={`Screenshot of ${project.title} product work`}
            width={800}
            height={640}
            className="h-full w-full object-contain p-3"
          />
        </div>
      </div>
      <div className="bg-mist px-6 py-6 transition-colors group-hover:bg-white sm:px-7 sm:py-7">
        <div className="mb-2.5 flex flex-wrap gap-2">
          {project.chips.map((chip) => (
            <Chip key={chip.label} label={chip.label} variant={chip.variant} />
          ))}
        </div>
        <h3 className="font-display mb-2 text-[22px] font-light italic leading-tight text-ink">
          {project.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-muted">
          {project.description}
        </p>
      </div>
    </li>
  );
}
