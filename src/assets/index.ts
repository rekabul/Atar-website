/**
 * Central asset registry. All logos/illustrations are the REAL exported files
 * provided by the client (src/assets/*). We use import.meta.glob so files with
 * spaces in their names (e.g. "Group 45.svg") import cleanly and are bundled +
 * content-hashed by Vite.
 */
import atarLogo from "./logo/atar-logo.svg";
import atarLogoLight from "./logo/atar-logo-light.svg";
import dashboard from "./illustrations/dashboard.webp";

export { atarLogo, atarLogoLight, dashboard };

const clientGlob = import.meta.glob("./clients/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const integrationGlob = import.meta.glob("./integrations/*.svg", {
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
