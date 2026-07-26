/**
 * Numeric config for the "Our Success in Numbers" counters. Labels come from
 * the locale files (src/i18n); these are the language-independent figures used
 * for the scroll-triggered count-up animation.
 */
export type StatConfig = {
  target: number;
  comma: boolean; // thousands separators
  suffix: string;
  currency?: boolean; // render the Saudi Riyal symbol before the number
};

export const statsConfig: StatConfig[] = [
  { target: 25000, comma: true, suffix: "+" },
  { target: 5, comma: false, suffix: "BN+", currency: true },
  { target: 200000, comma: true, suffix: "+" },
];
