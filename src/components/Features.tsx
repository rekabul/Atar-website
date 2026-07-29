import { useLocale } from "../i18n/LocaleContext";
import { featureIllustrations } from "../data/assetsMap";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { ArrowRight } from "./ui/Icon";

export default function Features() {
  const { t } = useLocale();
  return (
    <section id="features" className="scroll-mt-28 pt-20 pb-10" aria-labelledby="features-title">
      <Reveal className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 id="features-title" className="text-3xl font-medium leading-tight text-ink dark:text-white lg:text-4xl">
          {t.featuresIntro.title}
        </h2>
        <p className="mt-4 text-lg text-ink-soft dark:text-white/70">{t.featuresIntro.subtitle}</p>
      </Reveal>

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-12 lg:space-y-24 lg:px-8">
        {t.features.map((f, i) => {
          const reversed = i % 2 === 1;
          const art = featureIllustrations[i];
          const titleId = `feature-${i}`;
          return (
            <Reveal key={f.eyebrow}>
              <div
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                aria-labelledby={titleId}
              >
              <div className={reversed ? "lg:order-2" : ""}>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  {f.eyebrow}
                </p>
                <h3 id={titleId} className="mt-3 text-2xl font-medium text-ink dark:text-white lg:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-soft dark:text-white/70">{f.body}</p>
                <Button href="/contact" className="mt-6" icon={<ArrowRight />}>
                  {t.featureCta}
                </Button>
              </div>
              <div className={reversed ? "lg:order-1" : ""}>
                <div className="rounded-2xl border border-grey-100 bg-grey-100/40 p-4 shadow-card dark:border-white/10 dark:bg-white/5 sm:p-6">
                  <img
                    src={art.url}
                    alt={art.alt}
                    className="mx-auto block h-auto w-full max-w-[560px]"
                    loading="lazy"
                  />
                </div>
              </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
