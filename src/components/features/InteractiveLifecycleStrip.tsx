import { useLayoutEffect, useRef, useState } from "react";
import { buildStageDetails } from "../../data/lifecycle";

/**
 * "Linear" — a Swiss-precision flat diagram of the 8-stage continuous
 * lifecycle: a zigzag brand-tinted spine connecting eight numbered, icon +
 * label nodes (data from data/lifecycle.ts). Purely illustrative — it
 * depicts a continuous loop rather than a sequence to step through, so
 * there's no click-to-expand affordance; every node's stage number, icon,
 * and title are always visible instead of being gated behind an
 * interaction. No horizontal scroll — the row wraps to a 4x2 grid below the
 * sm breakpoint instead of clipping or requiring a scrollbar (the spine is
 * sm+ only, since a zigzag wouldn't read correctly across two wrapped rows).
 *
 * The spine's vertical position is measured (not a hardcoded pixel guess) —
 * it reads the first icon's actual on-screen center relative to the row —
 * so it always lands exactly behind the icon circles regardless of font
 * metrics. The icon circles themselves are opaque (dark mode used to be a
 * near-transparent bg-white/5, which let the spine show through) so no part
 * of the line is ever visible cutting across a node.
 */
export default function InteractiveLifecycleStrip({ locale }: { locale: string }) {
  const stages = buildStageDetails(locale);
  const rowRef = useRef<HTMLDivElement>(null);
  const firstIconRef = useRef<HTMLSpanElement>(null);
  const [lineY, setLineY] = useState<number | null>(null);

  useLayoutEffect(() => {
    function measure() {
      if (!rowRef.current || !firstIconRef.current) return;
      const rowTop = rowRef.current.getBoundingClientRect().top;
      const iconRect = firstIconRef.current.getBoundingClientRect();
      setLineY(iconRect.top - rowTop + iconRect.height / 2);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Zigzag path: a smooth curve that passes exactly through every node's x
  // position (so each end is guaranteed to sit on the node's own center,
  // hidden behind the opaque icon circle) and bows toward a midpoint —
  // alternating up/down — between each pair of nodes. Built as quadratic
  // Bézier segments (using each midpoint as the curve's control point,
  // rather than a vertex the line actually passes through) instead of a
  // polyline, so the bends are smooth curves rather than sharp angles.
  const n = stages.length;
  const AMP = 11;
  let path = "M 0,20";
  for (let i = 0; i < n - 1; i++) {
    const midX = i * 100 + 50;
    const midY = i % 2 === 0 ? 20 - AMP : 20 + AMP;
    const nextX = (i + 1) * 100;
    path += ` Q ${midX},${midY} ${nextX},20`;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div ref={rowRef} className="relative">
        {lineY !== null && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[6.25%] hidden w-[87.5%] -translate-y-1/2 text-primary/25 sm:block dark:text-white/15"
            style={{ top: lineY, height: 40 }}
            viewBox={`0 0 ${(n - 1) * 100} 40`}
            preserveAspectRatio="none"
          >
            <path
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}

        <div className="grid grid-cols-4 gap-y-7 sm:grid-cols-8 sm:gap-y-0">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="flex flex-col items-center gap-2 px-1">
                <span className="font-mono text-[11px] tracking-wider text-ink-muted/70 dark:text-white/40">
                  {s.stageNo}
                </span>

                <span
                  ref={i === 0 ? firstIconRef : undefined}
                  className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-grey-200 bg-white text-ink-soft shadow-card dark:border-white/15 dark:bg-secondary-dark dark:text-white/70"
                >
                  <Icon size={17} />
                </span>

                <span className="max-w-[6.5rem] text-center text-xs font-semibold leading-snug text-ink dark:text-white sm:text-sm">
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
