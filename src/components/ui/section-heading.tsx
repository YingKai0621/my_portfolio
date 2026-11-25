import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
  titleId?: string;
};

export function SectionHeading({
  align = "start",
  className,
  description,
  eyebrow,
  title,
  titleId,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "max-w-copy",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="type-caption text-accent">{eyebrow}</p>
      <h2 className="mt-5 type-section" id={titleId}>
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-copy type-body text-muted">{description}</p>
      ) : null}
    </header>
  );
}
