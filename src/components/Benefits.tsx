import { useLocale } from "../i18n/LocaleContext";
import { benefitIcons } from "../data/assetsMap";
import Reveal from "./ui/Reveal";

export default function Benefits() {
  const { t } = useLocale();
  return (
    <section className="bg-grey-100/40 py-16 dark:bg-white/5 lg:py-20" aria-labelledby="benefits-title">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 id="benefits-title" className="text-2xl font-medium leading-snug text-ink dark:text-white lg:text-3xl">
          {t.benefits.title}
        </h2>
        <p className="mt-4 text-ink-soft dark:text-white/70">{t.benefits.subtitle}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {t.benefits.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 90} className="h-full">
            <article className="h-full rounded-2xl border border-grey-100 bg-white p-6 shadow-card transition-shadow hover:shadow-lift dark:border-white/10 dark:bg-secondary-darker">
              <img
                src={benefitIcons[i]?.url}
                alt=""
                aria-hidden="true"
                className="mb-4 h-14 w-14"
                loading="lazy"
              />
              <h3 className="text-lg font-medium text-ink dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/70">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
