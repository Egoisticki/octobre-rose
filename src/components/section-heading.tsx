type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, description, align = "left", light = false }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`text-xs font-extrabold uppercase tracking-[.25em] ${light ? "text-pink-200" : "text-primary"}`}>{eyebrow}</p>
      <h2 className={`mt-4 font-heading text-4xl font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-6xl ${light ? "text-white" : "text-burgundy"}`}>
        {title}
      </h2>
      {description && <p className={`mt-5 text-base leading-8 sm:text-lg ${light ? "text-pink-100/78" : "text-burgundy/65"}`}>{description}</p>}
    </div>
  );
}
