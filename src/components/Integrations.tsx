import { useLocale } from "../i18n/LocaleContext";
import { integrations } from "../data/assetsMap";
import Button from "./ui/Button";
import { ArrowRight } from "./ui/Icon";

export default function Integrations() {
  const { t } = useLocale();
  return (
    <section id="integrations" className="scroll-mt-28 py-16 lg:py-20" aria-labelledby="integrations-title">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 id="integrations-title" className="text-2xl font-medium text-ink dark:text-white lg:text-3xl">
          {t.integrations.title}
        </h2>
        <p className="mt-4 text-ink-soft dark:text-white/70">{t.integrations.subtitle}</p>
        <Button href="/contact" className="mt-6" icon={<ArrowRight />}>
          {t.integrations.seeAll}
        </Button>
      </div>

      <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-5 px-5 lg:px-8">
        {integrations.map((it) => (
          <li key={it.file}>
            <span
              className="flex h-20 w-20 items-center justify-center rounded-full p-4"
              style={{ backgroundColor: it.bg }}
            >
              <img src={it.url} alt={it.name} className="h-auto w-full" loading="lazy" />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm text-ink-soft dark:text-white/60">{t.integrations.footnote}</p>
    </section>
  );
}
