import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "small";

const baseStyles =
  "inline-flex min-h-11 items-center justify-center rounded-control border px-5 font-semibold leading-none transition ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-interactive-disabled disabled:bg-interactive-disabled disabled:text-muted disabled:opacity-65";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-background shadow-glow hover:border-interactive-hover hover:bg-interactive-hover active:border-interactive-active active:bg-interactive-active",
  secondary:
    "border-border bg-surface text-foreground shadow-soft hover:border-muted/70 hover:bg-elevated active:bg-surface-secondary",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "gap-2.5 text-sm",
  small: "min-h-10 gap-2 px-4 text-sm",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = "primary",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
