import type { ElementType } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

export type LifecycleCardItem = {
  key: string;
  Icon: ElementType<{ size?: number; className?: string }>;
  title: string;
  body: string;
  /** "#step-1" scrolls within the same page; "/solutions/..." routes away;
   *  omit entirely for a purely illustrative card with no destination. */
  href?: string;
};

/**
 * The shared "lifecycle" card — the same icon/title/body card already used
 * by IconFeaturesSection on the Solutions pages (a tinted bg-grey-100/40
 * fill + circular icon badge, no shadow) rather than the white/shadow
 * Benefits-style card, since these rails sit directly on a plain white page
 * background with no colored section wrapper behind them to contrast against.
 */
function LifecycleCard({ item }: { item: LifecycleCardItem }) {
  const { Icon } = item;
  const className =
    "h-full w-full rounded-2xl border border-grey-100 bg-grey-100/40 p-6 dark:border-white/10 dark:bg-white/5";

  const inner = (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
        <Icon size={20} />
      </span>
      <h3 className="mt-4 font-medium text-ink dark:text-white">{item.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft dark:text-white/70">{item.body}</p>
    </>
  );

  if (!item.href) return <article className={className}>{inner}</article>;
  if (item.href.startsWith("#")) return <a href={item.href} className={`block text-start ${className}`}>{inner}</a>;
  return (
    <Link to={item.href} className={`block text-start ${className}`}>
      {inner}
    </Link>
  );
}

export default function LifecycleCardRail({
  caption,
  items,
  columns = 5,
  className = "",
}: {
  caption: string;
  items: LifecycleCardItem[];
  locale: "en" | "ar";
  /** Grid columns at desktop width — 5 for the Sales/Leasing/Operations
   *  strips, 4 for the Features page's 8-card Continuous Cycle (so it lays
   *  out as two rows of 4 instead of one long row). Always 1 column on
   *  mobile, 2 on tablet. */
  columns?: 4 | 5;
  className?: string;
}) {
  const caption_ = (
    <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-muted dark:text-white/50">
      {caption}
    </p>
  );

  const gridCols = columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5";

  return (
    <div className={`mx-auto max-w-6xl px-5 pb-16 lg:px-8 ${className}`}>
      <Reveal delay={80}>
        {caption_}
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${gridCols}`}>
          {items.map((item) => (
            <Reveal key={item.key} className="h-full">
              <LifecycleCard item={item} />
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
