/**
 * Central asset registry. All logos/illustrations are the REAL exported files
 * provided by the client (src/assets/*). We use import.meta.glob so files with
 * spaces in their names (e.g. "Group 45.svg") import cleanly and are bundled +
 * content-hashed by Vite.
 */
import atarLogo from "./logo/atar-logo.svg";
import atarLogoLight from "./logo/atar-logo-light.svg";
import dashboard from "./illustrations/dashboard.webp";
// Replacement hero image exported from the Figma "Dashboard V2" frame
// (Atar Design File — Web, node 39344:13474) — the old dashboard.webp is
// kept in place, just no longer imported by Hero.tsx.
import dashboardV2 from "./illustrations/dashboard-v2.webp";
// Client-provided photorealistic iPhone frame with the app screenshot
// already composited inside it — used as-is on the Branded Mobile App
// add-on page instead of a CSS-drawn bezel.
import brandedAppMockup from "./illustrations/branded-app-mockup.webp";

export { atarLogo, atarLogoLight, dashboard, dashboardV2, brandedAppMockup };

const clientGlob = import.meta.glob("./clients/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const integrationGlob = import.meta.glob("./integrations/*.{svg,png}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/** Look a bundled asset URL up by its original file name. */
function byName(map: Record<string, string>, dir: string, file: string): string {
  const key = `./${dir}/${file}`;
  const url = map[key];
  if (!url) console.warn(`[assets] missing ${key}`);
  return url ?? "";
}

const illustrationWebpGlob = import.meta.glob("./illustrations/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const clientAsset = (f: string) => byName(clientGlob, "clients", f);
export const integrationAsset = (f: string) => byName(integrationGlob, "integrations", f);
export const illustrationWebp = (f: string) => byName(illustrationWebpGlob, "illustrations", f);
