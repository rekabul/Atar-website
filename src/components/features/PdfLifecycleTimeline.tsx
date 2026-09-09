import { ChevronDown } from "../ui/Icon";
import {
  lifecycleStages,
  suiteCoverage,
  suiteBarClasses,
  suiteTextClasses,
  sourceOfTruth,
  pick,
} from "../../data/lifecycle";

/**
 * Variant 2 — "PDF Timeline". A closer recreation of company-profile page 6:
 * a bracket labelled "Continuous Cycle" spanning stage 01 to stage 08 with an
 * arrow dropping back into stage 01, a tick-mark ruler with the 8 numbered
 * stages, the suite-coverage bars (which suite runs which stage range), and
 * the "One source of truth" footer band — all in Atar's own tokens rather
 * than the PDF's export colours (they were already teal/navy, close enough
 * that no translation was needed).
 */
export default function PdfLifecycleTimeline({ locale }: { locale: string }) {
  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-grey-100 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        {locale === "ar" ? "دورة الحياة" : "Lifecycle"}
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-ink dark:text-white lg:text-3xl">
        {locale === "ar" ? "العقار دورة حياة مستمرة واحدة." : "Real estate is one continuous lifecycle."}
      </h3>

      <div className="mt-10 overflow-x-auto">
        <div className="min-w-[720px]">
          {/* Bracket — a single bordered div (top + two side "legs", rounded
              top corners) reads as a staple spanning stage 01 to stage 08. */}
          <div className="relative h-9">
            <div className="absolute inset-x-[6.25%] top-0 h-7 rounded-t-2xl border-2 border-b-0 border-primary/40" />
            <span className="absolute inset-x-0 -top-1 text-center text-[11px] font-semibold uppercase tracking-wider text-primary">
              {locale === "ar" ? "دورة مستمرة" : "Continuous Cycle"}
            </span>
            <ChevronDown size={14} className="absolute left-[6.25%] top-6 -translate-x-1/2 text-primary" />
          </div>

          {/* Ruler */}
          <div className="relative mt-1 h-px w-full bg-grey-200 dark:bg-white/15">
            <div className="absolute inset-0 grid grid-cols-8">
              {lifecycleStages.map((s) => (
                <div key={s.n} className="flex justify-start">
                  <span className="h-2 w-px bg-grey-600 dark:bg-white/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Stage numbers + labels */}
          <div className="mt-3 grid grid-cols-8 gap-2">
            {lifecycleStages.map((s) => (
              <div key={s.n}>
                <p className="text-xs font-semibold text-primary">{s.n}</p>
                <p className="mt-1 text-xs font-medium leading-snug text-ink dark:text-white sm:text-sm">
                  {pick(s.label, locale)}
                </p>
              </div>
            ))}
          </div>

          {/* Suite coverage */}
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-white/50">
              {locale === "ar" ? "تغطية الحزم" : "Suite Coverage"}
            </p>
            <div className="mt-4 space-y-4">
              {suiteCoverage.map((suite) => (
                <div key={suite.name.en} className="flex items-center gap-4">
                  <p className={`w-32 shrink-0 text-sm font-semibold ${suiteTextClasses[suite.color]}`}>
                    {pick(suite.name, locale)}
                  </p>
                  <div className="grid h-1.5 flex-1" style={{ gridTemplateColumns: "repeat(8, 1fr)" }}>
                    {suite.segments.map(([start, end], i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full ${suiteBarClasses[suite.color]}`}
                        style={{ gridColumn: `${start} / ${end}` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* One source of truth */}
          <div className="mt-10 border-t border-grey-100 pt-6 text-center dark:border-white/10">
            <p className="text-sm font-semibold text-ink dark:text-white">
              {locale === "ar" ? "مصدر واحد للحقيقة" : "One source of truth"}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {sourceOfTruth.map((item) => (
                <span
                  key={item.en}
                  className="text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-white/50"
                >
                  {pick(item, locale)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
