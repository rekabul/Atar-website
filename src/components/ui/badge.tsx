import * as React from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "default" | "secondary" | "success" | "outline";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary-lighter text-primary dark:bg-white/10 dark:text-primary-light",
  secondary: "bg-grey-100 text-ink-muted dark:bg-white/10 dark:text-white/60",
  success: "bg-success-light text-success dark:bg-success/15",
  outline: "border border-grey-200 text-ink-soft dark:border-white/15 dark:text-white/70",
};

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
