import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: "accent" | "neutral";
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-pill border px-3 py-1 type-caption",
        tone === "accent"
          ? "border-accent/45 bg-accent/10 text-focus"
          : "border-border bg-surface text-muted",
        className,
      )}
      {...props}
    />
  );
}
