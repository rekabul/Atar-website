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
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button href="/integrations" icon={<ArrowRight />}>
            {t.integrations.seeAll}
          </Button>
          <Button href="https://docs.goatar.com" variant="outline">
            {t.integrations.apiDocs}
          </Button>
        </div>
      </div>

      <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-5 px-5 lg:px-8">
        {integrations.map((it) => (
          <li key={it.file}>
            <span
              className="flex h-24 w-24 items-center justify-center rounded-full p-4"
              style={{ backgroundColor: it.bg }}
            >
              {/* A fixed target height (not "fill the box width") so every
                  logo reads at the same visual size regardless of how wide
                  or narrow its own wordmark is — the old w-full approach
                  made wide logos (Oracle, ZATCA, SendGrid) shrink to a
                  near-invisible sliver while squarer ones (SAP, Salesforce)
                  ballooned to fill the whole circle. max-w-full is just a
                  safety net for the widest logos so they never overflow the
                  circle. */}
              <img
                src={it.url}
                alt={it.name}
                className="h-8 w-auto max-w-full object-contain"
                loading="lazy"
              />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
