import { ArrowRight, RefreshIcon } from "../ui/Icon";
import { lifecycleStages, pick } from "../../data/lifecycle";

/**
 * Variant 1 — "Linear". The simplest possible read of page 6's 8-stage
 * cycle: a badge + a wrapping row of stage names joined by arrows. No
 * numbers, no suite-coverage detail, no source-of-truth footer — just the
 * sequence itself.
 */
export default function LinearLifecycleStrip({ locale }: { locale: string }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4">
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-ink-muted dark:bg-white/5 dark:text-white/50">
        <RefreshIcon size={13} className="motion-safe:animate-spin-slow" />
        {locale === "ar" ? "دورة مستمرة" : "Continuous Cycle"}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2.5">
        {lifecycleStages.map((s, i) => (
          <div key={s.n} className="flex shrink-0 items-center gap-2.5">
            <span className="whitespace-nowrap text-xs font-medium text-ink-soft dark:text-white/60">
              {pick(s.label, locale)}
            </span>
            {i < lifecycleStages.length - 1 && (
              <ArrowRight size={12} className="shrink-0 text-grey-600 dark:text-white/30" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
