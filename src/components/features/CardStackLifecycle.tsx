import { useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { buildStageDetails } from "../../data/lifecycle";

/**
 * "Stack" variant — a true sticky scroll-stack, ported from the mechanics
 * of reactbits' ScrollStack (https://reactbits.dev/components/scroll-stack)
 * and Webflow's "Sticky stacking cards" showcase. Both drive the effect
 * from scroll position rather than plain CSS `position: sticky`, because
 * sticky-alone only works cleanly when every card pins at the *same* spot —
 * getting cards to overlap into a fanned deck (each new one landing
 * slightly further down, on top of the last) needs the pin offset AND the
 * scale to be computed per card as you scroll, which is what this effect
 * does with a scroll listener instead of Lenis (no new dependency needed
 * for a fixed 8-card list): each card's static (transform-independent)
 * document offset is measured once via `offsetTop`, then on every scroll
 * frame we compute whether that card should be "pinned" at
 * `stackPosition + stackDistance * index` from the viewport top, and scale
 * it down slightly once a later card has started covering it — same
 * `translateY`/`scale` formula reactbits uses, just without Lenis's easing.
 *
 * Same shared per-stage data (icon/label/description/coverage) as the
 * Linear and Orbital variants — see ../../data/lifecycle.
 */

const ITEM_DISTANCE = 48; // normal-flow gap between cards (keeps the next card's reveal close behind the current one)
const STACK_POSITION = 112; // px from the viewport top where the front card pins
const STACK_DISTANCE = 16; // px each deeper card's pin sits below the last, for the fanned-peek edge
const SCALE_END_POSITION = 48; // px — how soon after passing the pin point a card finishes shrinking
const BASE_SCALE = 0.93;
const ITEM_SCALE = 0.008;

function calcProgress(value: number, start: number, end: number) {
  if (value < start) return 0;
  if (value > end) return 1;
  return (value - start) / (end - start);
}

export default function CardStackLifecycle({ locale }: { locale: string }) {
  const stages = buildStageDetails(locale);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const endEl = endRef.current;
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!container || !endEl || cards.length === 0) return;

    cards.forEach((card, i) => {
      card.style.transformOrigin = "top center";
      card.style.willChange = "transform";
      card.style.backfaceVisibility = "hidden";
      if (i < cards.length - 1) card.style.marginBottom = `${ITEM_DISTANCE}px`;
    });

    // offsetTop is a layout-only measurement — unlike getBoundingClientRect
    // it ignores any transform we later apply, so it stays a stable
    // reference point across every frame instead of drifting.
    let containerTop = 0;
    const measure = () => {
      containerTop = container.getBoundingClientRect().top + window.scrollY;
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      const scrollY = window.scrollY;
      const endTop = containerTop + endEl.offsetTop;
      const pinEnd = endTop - window.innerHeight / 2;

      cards.forEach((card, i) => {
        const cardTop = containerTop + card.offsetTop;
        const triggerStart = cardTop - STACK_POSITION - STACK_DISTANCE * i;
        const triggerEnd = cardTop - SCALE_END_POSITION;
        const pinStart = triggerStart;

        const scaleProgress = calcProgress(scrollY, triggerStart, triggerEnd);
        const targetScale = BASE_SCALE + i * ITEM_SCALE;
        const scale = 1 - scaleProgress * (1 - targetScale);

        let translateY = 0;
        if (scrollY >= pinStart && scrollY <= pinEnd) {
          translateY = scrollY - cardTop + STACK_POSITION + STACK_DISTANCE * i;
        } else if (scrollY > pinEnd) {
          translateY = pinEnd - cardTop + STACK_POSITION + STACK_DISTANCE * i;
        }

        card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [stages.length]);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-xl">
      {stages.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={s.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="relative"
          >
            <Card className="relative overflow-hidden border-grey-100 bg-white shadow-lift dark:border-white/10 dark:bg-secondary-darker">
              {/* Oversized ghost numeral, bleeding off the corner — a quiet
                  wayfinding cue ("which stage is this") that doubles as the
                  one element per card that ignores the grid. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 end-3 select-none font-mono text-[6rem] font-medium leading-none text-secondary/[0.06] dark:text-white/[0.06]"
              >
                {s.stageNo}
              </span>

              <CardHeader className="relative flex flex-row items-center gap-4 px-6 pb-4 pt-6">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light">
                  <span aria-hidden="true" className="absolute -inset-1 rounded-full border border-primary/15" />
                  <Icon size={19} />
                </span>
                <div>
                  <span className="font-mono text-[11px] font-medium tracking-wider text-primary dark:text-primary-light">
                    {s.stageNo}
                  </span>
                  <CardTitle className="mt-0.5 text-lg font-medium tracking-tight">{s.title}</CardTitle>
                </div>
              </CardHeader>

              <div className="relative border-t border-grey-100 dark:border-white/10" />

              <CardContent className="relative px-6 pb-6 pt-4 text-sm leading-relaxed text-ink-soft dark:text-white/70">
                <p>{s.content}</p>

                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium uppercase tracking-wide text-ink-muted dark:text-white/50">
                    <Zap size={11} className="text-primary" />
                    {locale === "ar" ? "تغطية الوحدات" : "Module coverage"}
                  </span>
                  <span className="font-mono text-ink dark:text-white">{s.energy}%</span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-grey-100 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-700 ease-out"
                    style={{ width: `${s.energy}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}

      {/* Marks where the stack finishes — the last card releases its pin
          once this scrolls to roughly mid-viewport. */}
      <div ref={endRef} aria-hidden="true" />
      <div aria-hidden="true" style={{ height: "30vh" }} />
    </div>
  );
}
