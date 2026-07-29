import { atarLogo, atarLogoLight } from "../../assets";

/** The real Atar logo. `light` swaps the dark wordmark for white on dark backgrounds. */
export default function Logo({
  light = false,
  className = "h-9 w-auto",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <img
      src={light ? atarLogoLight : atarLogo}
      alt="ATAR"
      className={className}
      width={142}
      height={55}
    />
  );
}

/**
 * Just the arrow/mountain icon mark (no wordmark) — extracted from the full
 * logo's opening paths. Used as a subtle decorative watermark, e.g. on the
 * login screen. Inherits color via `currentColor` so it can be tinted with
 * a single Tailwind text-* class and faded with opacity utilities.
 */
export function LogoMark({ className = "h-24 w-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 77 55" fill="none" className={className} aria-hidden="true">
      <path
        d="M41.52 0v24.43L23.9 41.55 10.87 54.24c-1.66 1.62-4.46.44-4.46-1.85V34.07c0-.69.28-1.36.79-1.85L39.45.82c.02-.03.06-.07.1-.1C40.1.25 40.82.01 41.52.01"
        fill="currentColor"
      />
      <path
        d="M76.56 34.54v15.18c0 .06 0 .14-.01.2-.16 3.16-4.05 4.7-6.36 2.45l-8.56-8.33L49.28 32.01l-7.76-7.44c-.09-.09 0-.22 0-.36V.01c.77 0 1.54.31 2.12.93l31.14 30.3.66.64c.64.62 1.02 1.42 1.11 2.28.01.13.01.25.01.38"
        fill="currentColor"
      />
      <path
        d="M76.54 34.16v17.63c0 1.77-1.45 3.21-3.24 3.21H58.28c-2.88 0-4.32-3.48-2.26-5.5l5.6-5.46 13.14-12.8.67.65c.64.62 1.02 1.42 1.11 2.27"
        fill="currentColor"
        opacity=".55"
      />
    </svg>
  );
}
