import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { statsConfig } from "../data/stats";
import { Riyal } from "./ui/Icon";
import Reveal from "./ui/Reveal";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** True while the element is in view; flips back to false on exit so the
 *  count-up re-runs every time the section scrolls into view again. */
function useRepeatInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(ease(p) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

function Counter({
  target,
  comma,
  suffix,
  currency,
  active,
}: (typeof statsConfig)[number] & { active: boolean }) {
  const value = useCountUp(target, active);
  const display = comma ? value.toLocaleString("en-US") : String(value);
  return (
    <span dir="ltr" className="inline-flex items-baseline gap-0.5 tabular-nums">
      {currency && <Riyal className="h-[0.62em] w-auto self-center text-secondary" />}
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useLocale();
  const { ref, inView } = useRepeatInView<HTMLDivElement>();

  return (
    <section className="py-16 lg:py-20" aria-labelledby="stats-title">
      <div className="mx-auto max-w-content px-5 lg:px-8">
        <Reveal>
        <div
          ref={ref}
          className="rounded-[28px] bg-[#F6F7F8] px-6 py-12 sm:px-10 lg:py-16"
        >
          <h2
            id="stats-title"
            className="text-center text-2xl font-medium text-secondary lg:text-3xl"
          >
            {t.stats.title}
          </h2>
          <dl className="mt-10 grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:gap-0">
            {statsConfig.map((s, i) => (
              <div
                key={i}
                className={
                  i === 1 ? "sm:border-x sm:border-grey-200 sm:px-6" : "sm:px-6"
                }
              >
                <dt className="text-4xl font-semibold tracking-tight text-secondary lg:text-5xl">
                  <Counter {...s} active={inView} />
                </dt>
                <dd className="mt-3 text-sm text-ink-soft">{t.stats.items[i].label}</dd>
              </div>
            ))}
          </dl>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
