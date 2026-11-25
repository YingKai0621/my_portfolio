import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Divider({
  className,
  ...props
}: ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      className={cn("h-px w-full border-0 bg-border", className)}
      {...props}
    />
  );
}
