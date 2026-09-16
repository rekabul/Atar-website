import type { StatConfig } from "./stats";

/**
 * "Who We Are" stats strip on the About page — verified figures from the
 * Company Profile PDF's "AT A GLANCE" page (p.2), reusing the same
 * StatConfig/Counter animation as the Home page's Stats component. Labels
 * live in i18n (aboutPage.stats.items) since they're language-dependent.
 */
export const aboutStatsConfig: StatConfig[] = [
  { target: 20, comma: false, suffix: "+" },
  { target: 300, comma: false, suffix: "M+", currency: true },
  { target: 400, comma: false, suffix: "M+", currency: true },
  { target: 10000, comma: true, suffix: "+" },
  { target: 14000, comma: true, suffix: "+" },
  { target: 30000, comma: true, suffix: "+" },
];
