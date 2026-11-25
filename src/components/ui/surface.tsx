import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SurfaceProps = ComponentPropsWithoutRef<"div"> & {
  level?: "primary" | "secondary" | "elevated";
};

const levelStyles: Record<NonNullable<SurfaceProps["level"]>, string> = {
  primary: "bg-surface",
  secondary: "bg-surface-secondary",
  elevated: "bg-elevated shadow-soft",
};

export function Surface({
  className,
  level = "primary",
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-panel border border-border p-6 tablet:p-8",
        levelStyles[level],
        className,
      )}
      {...props}
    />
  );
}
