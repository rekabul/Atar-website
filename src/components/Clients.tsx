import { useLocale } from "../i18n/LocaleContext";
import { clientLogos } from "../data/assetsMap";

/** Continuous logo marquee; each real client logo sits in a light-grey card.
 *  Animation pauses under prefers-reduced-motion. */
export default function Clients() {
  const { t, dir } = useLocale();
  const anim = dir === "rtl" ? "animate-marquee-rtl" : "animate-marquee";

  const Row = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul className="flex shrink-0 items-center gap-5" aria-hidden={ariaHidden || undefined}>
      {clientLogos.map((c) => (
        <li key={c.file + (ariaHidden ? "-d" : "")} className="shrink-0">
          <div className="flex h-28 w-52 items-center justify-center rounded-2xl bg-[#F6F7F8] px-8">
            <img
              src={c.url}
              alt={ariaHidden ? "" : c.name}
              className="max-h-14 w-auto object-contain"
              loading="lazy"
            />
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="bg-white py-14" aria-labelledby="clients-title">
      <div className="mx-auto max-w-content px-5 lg:px-8">
        <h2
          id="clients-title"
          className="text-center text-sm font-medium uppercase tracking-wider text-ink-soft"
        >
          {t.clients.title}
        </h2>
        <div className="marquee-mask relative mt-8 overflow-hidden" role="group" aria-label={t.clients.title}>
          <div className={`flex w-max items-center gap-5 ${anim}`}>
            <Row />
            <Row ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
