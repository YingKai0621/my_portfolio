import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: "default" | "compact";
};

export function Section({
  className,
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        spacing === "default" ? "py-section" : "py-12 tablet:py-16",
        className,
      )}
      {...props}
    />
  );
}
