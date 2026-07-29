import { useLocale } from "../i18n/LocaleContext";
import { dashboard } from "../assets";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { ArrowRight } from "./ui/Icon";

export default function Hero() {
  const { t } = useLocale();
  return (
    <section className="hero-bg" aria-labelledby="hero-title">
      <div className="mx-auto max-w-4xl px-5 pt-16 pb-10 text-center lg:px-8 lg:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-medium text-secondary shadow-card dark:border-primary/30 dark:bg-white/5 dark:text-white">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          {t.hero.eyebrow}
        </span>
        <h1
          id="hero-title"
          className="mt-6 text-4xl font-medium leading-[1.1] tracking-tight text-ink dark:text-white sm:text-5xl lg:text-[64px]"
        >
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft dark:text-white/70">{t.hero.subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/contact" fullWidth icon={<ArrowRight />}>
            {t.hero.getStarted}
          </Button>
          <Button href="/contact" variant="outline" fullWidth>
            {t.hero.getDemo}
          </Button>
        </div>
      </div>

      <div id="platform" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-16 lg:px-8">
        <Reveal className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_50px_-24px_rgba(8,15,26,0.25)]">
          <img
            src={dashboard}
            alt={t.hero.dashboardAlt}
            className="block w-full"
            width={1600}
            height={1146}
            loading="eager"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  );
}
