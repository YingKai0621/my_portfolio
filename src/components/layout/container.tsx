import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "content" | "copy";
};

export function Container({
  className,
  size = "content",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter",
        size === "content" ? "max-w-content" : "max-w-copy",
        className,
      )}
      {...props}
    />
  );
}
