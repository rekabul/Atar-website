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
// 3-phone marketing composite (My Dues / Home / Request screens) for the
// Branded Mobile App page's Layout 2 hero — transparent background,
// cropped from the client-provided render.
import brandedApp3Phone from "./illustrations/branded-app-3phone.webp";
// Client-provided browser-window mockup of the actual marketplace/listing
// site (hero + "Explore our communities" search/filter/cards) — used as the
// Listing Website add-on page's hero visual in place of the earlier
// hand-drawn placeholder mockup.
import listingWebsiteMockup from "./illustrations/listing-website-mockup.webp";

export { atarLogo, atarLogoLight, dashboard, dashboardV2, brandedAppMockup, brandedApp3Phone, listingWebsiteMockup };

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
