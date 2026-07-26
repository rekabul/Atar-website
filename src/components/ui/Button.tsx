import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "outline" | "ghost" | "onDark";

const styles: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-secondary shadow-card",
  outline: "border border-grey-200 bg-white text-ink hover:border-primary hover:text-primary",
  ghost: "text-ink hover:text-primary",
  onDark: "bg-primary text-white hover:bg-white hover:text-secondary",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
};

/** All CTAs on this page navigate, so we render an anchor. */
export default function Button({
  href,
  children,
  variant = "primary",
  icon,
  fullWidth = false,
  className = "",
}: Props) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-medium transition-colors",
    styles[variant],
    fullWidth ? "w-full sm:w-auto" : "",
    className,
  ].join(" ");

  // Internal route (starts with "/") → SPA navigation; otherwise a plain anchor.
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={classes}>
        <span>{children}</span>
        {icon}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      <span>{children}</span>
      {icon}
    </a>
  );
}
