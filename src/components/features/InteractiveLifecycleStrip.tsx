import { useState } from "react";
import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { buildStageDetails } from "../../data/lifecycle";

/**
 * "Linear" variant — a Swiss-precision flat stepper: a single brand-tinted
 * spine connecting eight numbered nodes, each clickable to reveal the same
 * stage detail panel the Orbital variant shows (identical icon/label/data
 * from data/lifecycle.ts). No horizontal scroll — the row wraps to a 4x2
 * grid below the sm breakpoint instead of clipping or requiring a scrollbar.
 */
export default function InteractiveLifecycleStrip({ locale }: { locale: string }) {
  const stages = buildStageDetails(locale);
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = stages.find((s) => s.id === activeId) ?? null;

  const toggle = (id: number) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative">
        {/* Connecting spine — sm+ only, sits at the icon row's vertical
            center regardless of viewport width; hidden on the wrapped
            mobile grid where a straight line wouldn't read correctly. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[6.25%] right-[6.25%] top-[46px] hidden h-px bg-gradient-to-r from-primary/20 via-secondary/25 to-primary/20 sm:block dark:from-primary/25 dark:via-white/15 dark:to-primary/25"
        />

        <div className="grid grid-cols-4 gap-y-7 sm:grid-cols-8 sm:gap-y-0">
          {stages.map((s) => {
            const Icon = s.icon;
            const isActive = s.id === activeId;
            return (
              <div key={s.id} className="flex flex-col items-center gap-2 px-1">
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  aria-pressed={isActive}
                  className="flex flex-col items-center gap-2 rounded-xl py-1 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <span
                    className={`font-mono text-[11px] tracking-wider transition-colors ${
                      isActive ? "font-semibold text-primary dark:text-primary-light" : "text-ink-muted/70 dark:text-white/40"
                    }`}
                  >
                    {s.stageNo}
                  </span>

                  <span className="relative z-10 flex h-11 w-11 items-center justify-center">
                    {isActive && (
                      <span className="absolute -inset-1.5 animate-ping rounded-full border border-primary/30 opacity-70" />
                    )}
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "scale-110 border-primary bg-primary text-white shadow-[0_0_0_6px_rgba(0,142,165,0.12)]"
                          : "border-grey-200 bg-white text-ink-soft shadow-card hover:border-primary/40 hover:text-primary dark:border-white/15 dark:bg-white/5 dark:text-white/70"
                      }`}
                    >
                      <Icon size={17} />
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  className={`max-w-[6.5rem] text-center text-xs font-semibold leading-snug transition-colors sm:text-sm ${
                    isActive ? "text-primary dark:text-primary-light" : "text-ink hover:text-primary dark:text-white dark:hover:text-primary-light"
                  }`}
                >
                  {s.title}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {active && (
        <div className="mt-4 flex justify-center">
          <Card key={active.id} className="w-full max-w-md animate-fade-in-up shadow-lift">
            <div className="mx-auto -mt-3 h-3 w-px bg-grey-300 dark:bg-white/30" aria-hidden="true" />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-start">
                <span className="font-mono text-xs text-ink-muted dark:text-white/50">{active.stageNo}</span>
              </div>
              <CardTitle className="mt-2 text-sm">{active.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-ink-soft dark:text-white/70">
              <p>{active.content}</p>

              <div className="mt-4 border-t border-grey-100 pt-3 dark:border-white/10">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center">
                    <Zap size={10} className="me-1" />
                    {locale === "ar" ? "تغطية الوحدات" : "Module coverage"}
                  </span>
                  <span className="font-mono">{active.energy}%</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-grey-100 dark:bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${active.energy}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
