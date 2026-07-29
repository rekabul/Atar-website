import { useEffect } from "react";
import { useLocale } from "../i18n/LocaleContext";
import ContactForm from "../components/ContactForm";
import Reveal from "../components/ui/Reveal";
import { ArrowRight } from "../components/ui/Icon";

export default function ContactPage() {
  const { t } = useLocale();
  const cp = t.contactPage;

  useEffect(() => {
    const prev = document.title;
    document.title = "Contact ATAR — The National Real Estate Management Platform";
    return () => {
      document.title = prev;
    };
  }, []);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    t.footer.address
  )}`;

  return (
    <>
      {/* Page header */}
      <section className="hero-bg" aria-labelledby="contact-page-title">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {t.contactForm.eyebrow}
            </p>
            <h1
              id="contact-page-title"
              className="mt-3 text-4xl font-medium tracking-tight text-ink dark:text-white sm:text-5xl"
            >
              {cp.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft dark:text-white/70">{cp.subtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* Form + contact details (reused, validated). Eyebrow hidden — the page header already has one. */}
      <ContactForm hideEyebrow />

      {/* Working hours + location */}
      <section className="bg-white pb-16 dark:bg-secondary-darker lg:pb-24" aria-label={cp.hoursTitle}>
        <div className="mx-auto grid max-w-content gap-6 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal className="h-full">
            <div className="h-full rounded-[28px] bg-[#F6F7F8] p-8 dark:bg-white/5">
              <h2 className="text-lg font-medium text-ink dark:text-white">{cp.hoursTitle}</h2>
              <dl className="mt-4 space-y-2 text-ink-soft dark:text-white/70">
                <div className="flex items-center justify-between gap-4">
                  <dt>{cp.hoursDays}</dt>
                  <dd className="font-medium text-ink dark:text-white" dir="ltr">
                    {cp.hoursTime}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-ink-soft dark:text-white/70">{cp.hoursNote}</p>
            </div>
          </Reveal>

          <Reveal className="h-full" delay={90}>
            <div className="flex h-full flex-col justify-between rounded-[28px] bg-secondary p-8 text-white">
              <div>
                <h2 className="text-lg font-medium">{cp.mapLabel}</h2>
                <p className="mt-3 text-secondary-light">{t.footer.address}</p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${cp.mapCta} ${cp.newTab}`}
                className="mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-primary px-5 py-3 font-medium text-white transition-colors hover:bg-white hover:text-secondary"
              >
                <span>{cp.mapCta}</span>
                <ArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
