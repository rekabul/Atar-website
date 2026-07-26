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
