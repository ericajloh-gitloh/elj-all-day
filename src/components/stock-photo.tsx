import Image from "next/image";

type StockPhotoProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: "dark" | "none";
  imageClassName?: string;
  decorative?: boolean;
};

export function StockPhoto({
  src,
  alt,
  className = "relative aspect-[21/9] w-full overflow-hidden",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 1440px",
  overlay = "none",
  imageClassName = "object-cover",
  decorative = false,
}: StockPhotoProps) {
  return (
    <div
      className={className}
      aria-hidden={decorative || alt === "" ? true : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName}
        sizes={sizes}
        priority={priority}
      />
      {overlay === "dark" && (
        <div
          className="absolute inset-0 bg-navy/55"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
