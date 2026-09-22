import { useLocale } from "../i18n/LocaleContext";
import { clientLogos } from "../data/assetsMap";

/** Continuous logo marquee; each real client logo sits in a light-grey card.
 *  Animation pauses under prefers-reduced-motion. */
export default function Clients({
  maxWidthClassName = "max-w-content",
}: {
  /** Home/About keep the section's own default (1200px). Placeholder pages'
   *  other generic sections (iconFeatures, whyAtar, etc.) share a narrower
   *  1024px ("max-w-5xl") container — passed in here so this section's
   *  edges line up with theirs instead of sitting visibly wider. */
  maxWidthClassName?: string;
} = {}) {
  const { t, dir } = useLocale();
  const anim = dir === "rtl" ? "animate-marquee-rtl" : "animate-marquee";

  const Row = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul className="flex shrink-0 items-center gap-5" aria-hidden={ariaHidden || undefined}>
      {clientLogos.map((c) => (
        <li key={c.file + (ariaHidden ? "-d" : "")} className="shrink-0">
          {/* Dark mode gets a real dark card (matching every other card on
              the site) instead of a light island. That only works now
              because the logos carry real per-pixel alpha (fixed above) —
              dark:brightness-0/invert recolors just the opaque ink to white,
              leaving the transparent background untouched, instead of the
              earlier flattened-opaque-rectangle bug turning into a blank
              white block. */}
          <div className="flex h-28 w-52 items-center justify-center rounded-2xl bg-[#F6F7F8] px-8 dark:bg-white/5">
            <img
              src={c.url}
              alt={ariaHidden ? "" : c.name}
              className="max-h-14 w-auto object-contain dark:brightness-0 dark:invert dark:opacity-90"
              loading="lazy"
            />
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="bg-white py-14 dark:bg-secondary-darker" aria-labelledby="clients-title">
      <div className={`mx-auto ${maxWidthClassName} px-5 lg:px-8`}>
        <h2
          id="clients-title"
          className="text-center text-sm font-medium uppercase tracking-wider text-ink-soft dark:text-white/60"
        >
          {t.clients.title}
        </h2>
        {/* Forced to dir="ltr": in RTL, the browser auto-right-aligns this
            block's start edge, which (since the track is a double-width
            "w-max" strip meant for a seamless loop) shoves ~90% of it off
            the left edge of the viewport before the animation even starts —
            the marqueeRtl keyframes assume a flush-left base position (they
            just replay the LTR motion in reverse), so under real RTL
            alignment the strip sits almost entirely outside the visible
            mask and the logos never appear. Pinning this subtree to ltr
            restores that flush-left base regardless of page direction; only
            the animation class below still switches with `dir` to pick the
            correct scroll direction. */}
        <div
          dir="ltr"
          className="marquee-mask relative mt-8 overflow-hidden"
          role="group"
          aria-label={t.clients.title}
        >
          <div className={`flex w-max items-center gap-5 ${anim}`}>
            <Row />
            <Row ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
