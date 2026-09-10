import { useState } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { Plus, Minus, ArrowRight } from "./ui/Icon";
import Button from "./ui/Button";

export default function FAQ() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 bg-white py-16 dark:bg-secondary-darker lg:py-20" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 id="faq-title" className="text-2xl font-medium text-ink dark:text-white lg:text-3xl">
          {t.faq.title}
        </h2>
        <p className="mt-4 text-ink-soft dark:text-white/70">{t.faq.subtitle}</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-3 px-5 lg:px-8">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const btnId = `faq-btn-${i}`;
          return (
            <div key={item.q} className="overflow-hidden rounded-2xl border border-grey-200 bg-white dark:border-white/10 dark:bg-white/5">
              <h3>
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-medium text-ink dark:text-white"
                >
                  <span>{item.q}</span>
                  <span className="shrink-0 text-primary">{isOpen ? <Minus /> : <Plus />}</span>
                </button>
              </h3>
              {isOpen && (
                <div id={panelId} role="region" aria-labelledby={btnId} className="px-5 pb-4 leading-relaxed text-ink-soft dark:text-white/70">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions — routes to the FAQ Hub or Contact page. */}
      <div id="contact" className="mx-auto mt-8 max-w-3xl scroll-mt-28 px-5 lg:px-8">
        <div className="rounded-[28px] bg-[#F6F7F8] p-8 text-center dark:bg-white/5">
          <h3 className="text-xl font-medium text-ink dark:text-white">{t.faq.stillTitle}</h3>
          <p className="mt-2 text-ink-soft dark:text-white/70">{t.faq.homeStillBody}</p>

          <div className="mx-auto mt-5 flex max-w-md flex-col justify-center gap-3 sm:flex-row">
            <Button href="/faq" icon={<ArrowRight />}>
              {t.faq.stillFaqCta}
            </Button>
            <Button href="/contact" variant="outline">
              {t.faq.stillContactCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
