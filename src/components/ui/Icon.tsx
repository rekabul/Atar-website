import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

/** Directional arrow — flips automatically in RTL via the `rtl:-scale-x-100` utility. */
export function ArrowRight({ size = 18, className = "", ...p }: IconProps) {
  return (
    <svg {...base(size)} className={`rtl:-scale-x-100 ${className}`} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Plus({ size = 20, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Minus({ size = 20, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Menu({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function Close({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Phone({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z" />
    </svg>
  );
}

/**
 * Saudi Riyal symbol (2025). This is a clean geometric rendition — to use the
 * exact SAMA artwork, drop the official `riyal.svg` into src/assets and swap it in.
 * Inherits color via currentColor; scale it with font-size using em-based height.
 */
export function Riyal({ className = "", ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...p}
    >
      {/* right stem with foot (hook) */}
      <path d="M16 3.5v10.8c0 2.2-1.8 4-4 4H8.4" />
      {/* left stem */}
      <path d="M10.2 6v9" />
      {/* two parallel crossbars slanting up to the right */}
      <path d="M4.8 12.6 19 10.4" />
      <path d="M4.8 8.9 19 6.7" />
    </svg>
  );
}

export function Check({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}

export function Mail({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function Globe({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 000 18 14 14 0 000-18z" />
    </svg>
  );
}

export function Sun({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

export function Moon({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" />
    </svg>
  );
}

export function Target({ size = 28, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

/** Icons for the Features "Built for Every Role" cards, keyed by name. */
export const roleIcons: Record<string, (p: IconProps) => ReactElement> = {
  owner: (p) => (
    <svg {...base(24)} {...p}>
      <path d="M4 21V10l8-6 8 6v11" />
      <path d="M9 21v-6h6v6" />
    </svg>
  ),
  manager: (p) => (
    <svg {...base(24)} {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
      <circle cx="17.5" cy="9" r="2.2" />
      <path d="M21 20c0-2.4-1.8-4.2-4-4.7" />
    </svg>
  ),
  tenant: (p) => (
    <svg {...base(24)} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  ),
  accountant: (p) => (
    <svg {...base(24)} {...p}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6M8 11h1M11.5 11h1M15 11h1M8 15h1M11.5 15h1M15 15h1" />
    </svg>
  ),
};

/** Icons for the About "Values" cards, keyed by name. */
export const valueIcons: Record<string, (p: IconProps) => ReactElement> = {
  check: (p) => (
    <svg {...base(28)} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  ),
  bulb: (p) => (
    <svg {...base(28)} {...p}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 00-4 10.5c.6.6 1 1.3 1 2.1h6c0-.8.4-1.5 1-2.1A6 6 0 0012 3z" />
    </svg>
  ),
  shield: (p) => (
    <svg {...base(28)} {...p}>
      <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  rocket: (p) => (
    <svg {...base(28)} {...p}>
      <path d="M5 15c-1 1-1.4 4-1.4 4s3-.4 4-1.4M9.5 15.5L8 14a10 10 0 019-9c2 0 3 1 3 3a10 10 0 01-9 9l-1.5-1.5z" />
      <circle cx="14.5" cy="9.5" r="1.4" />
    </svg>
  ),
};
