import { useState, type FormEvent } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { Plus, Minus, ArrowRight } from "./ui/Icon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FAQ() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  // Email capture in the "Still have questions?" card
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(false);
    if (!EMAIL_RE.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    // TODO: await fetch("/api/contact-lead", { method: "POST", body: email })
    setDone(true);
    setEmail("");
  }

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

      {/* Still have questions — email capture */}
      <div id="contact" className="mx-auto mt-8 max-w-3xl scroll-mt-28 px-5 lg:px-8">
        <div className="rounded-[28px] bg-[#F6F7F8] p-8 text-center dark:bg-white/5">
          <h3 className="text-xl font-medium text-ink dark:text-white">{t.faq.stillTitle}</h3>
          <p className="mt-2 text-ink-soft dark:text-white/70">{t.faq.stillBody}</p>

          <form onSubmit={handleSubmit} noValidate className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="flex-1 text-start">
              <label htmlFor="faq-email" className="sr-only">
                {t.faq.emailPlaceholder}
              </label>
              <input
                id="faq-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                dir="ltr"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(false);
                }}
                aria-required="true"
                aria-invalid={error || undefined}
                aria-describedby={error ? "faq-email-err" : undefined}
                placeholder={t.faq.emailPlaceholder}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-grey-600 focus:border-primary dark:bg-white/10 dark:text-white dark:placeholder:text-white/40 ${
                  error ? "border-danger" : "border-grey-200 dark:border-white/15"
                }`}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-secondary"
            >
              <span>{t.faq.stillCta}</span>
              <ArrowRight />
            </button>
          </form>

          {error && (
            <p id="faq-email-err" role="alert" className="mt-2 text-sm text-danger">
              {t.faq.emailError}
            </p>
          )}
          {done && (
            <p role="status" className="mt-2 text-sm text-success">
              {t.faq.emailSuccess}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
