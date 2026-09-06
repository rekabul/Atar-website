import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { pick } from "../data/pricing";
import {
  placeholderPages,
  placeholderFallback,
  type PageSection,
} from "../data/placeholderPages";
import { clientLogos, caseStudyPhotos } from "../data/assetsMap";
import Reveal from "../components/ui/Reveal";
import CTA from "../components/CTA";
import Logo from "../components/ui/Logo";
import { ArrowRight, Check, Minus } from "../components/ui/Icon";
import {
  CollectionsAreaChart,
  ServiceLog,
  PropertyDonut,
  AIPipeline,
  ComplianceLog,
  IntegrationsHub,
} from "../components/FeatureVisuals";
import type { VisualKey } from "../data/placeholderPages";

/**
 * Most of these are the same "product screen" mockups used on the Features
 * page, reused here for the Products suite pages. "financial" is the
 * exception — it points at `CollectionsAreaChart`, a separate modern
 * gradient-area chart, rather than the plain bar chart Features uses
 * (`FinancialChart`), so this page can look different without touching what
 * renders on Features.
 */
const visualComponents: Record<VisualKey, () => JSX.Element> = {
  financial: CollectionsAreaChart,
  service: ServiceLog,
  property: PropertyDonut,
  ai: AIPipeline,
  compliance: ComplianceLog,
  integrations: IntegrationsHub,
};

/**
 * Generic page shell for new nav destinations that don't have bespoke content
 * yet (Products sub-suites, Solutions by role, Markets by asset class,
 * Compare, Case Studies, Leadership, Blog, Legal Center). Keyed off the route
 * path against data/placeholderPages.ts so ~25 destinations share one file
 * instead of near-duplicate page components. `sections` (see PageSection in
 * data/placeholderPages.ts) let individual pages render rich, real content
 * blocks — workflow steps, stat rows, bullet lists, comparison tables,
 * case-study cards, a real client-logo wall, team grids, a timeline, and full
 * legal document text — without needing bespoke components per page.
 */
export default function PlaceholderPage() {
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const copy = placeholderPages[pathname] ?? placeholderFallback;

  useEffect(() => {
    const prev = document.title;
    document.title = `${pick(copy.title, "en")} | Atar`;
    return () => {
      document.title = prev;
    };
  }, [copy]);

  return (
    <>
      <section className="hero-bg" aria-labelledby="placeholder-title">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {pick(copy.eyebrow, locale)}
            </p>
            <h1
              id="placeholder-title"
              className="mt-3 text-4xl font-medium tracking-tight text-ink dark:text-white sm:text-5xl"
            >
              {pick(copy.title, locale)}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft dark:text-white/70">
              {pick(copy.body, locale)}
            </p>
          </Reveal>
        </div>
      </section>

      {copy.sections?.map((section, i) => (
        <SectionBlock key={i} section={section} locale={locale} />
      ))}

      {!copy.minimalFooter && (
        <>
          <section className="bg-white py-16 dark:bg-secondary-darker lg:py-24" aria-label="Talk to us">
            <div className="mx-auto max-w-3xl px-5 lg:px-8">
              <Reveal>
                <div className="rounded-[28px] border border-grey-100 bg-[#F6F7F8] p-8 text-center dark:border-white/10 dark:bg-white/5 lg:p-10">
                  <p className="leading-relaxed text-ink-soft dark:text-white/70">
                    {locale === "ar"
                      ? "هل تريد معرفة المزيد الآن؟ فريقنا جاهز للحديث عن احتياجاتك."
                      : "Want the details now? Our team is ready to talk through your needs."}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-secondary"
                  >
                    <span>{locale === "ar" ? "تواصل مع فريقنا" : "Talk to our team"}</span>
                    <ArrowRight />
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>

          <CTA />
        </>
      )}
    </>
  );
}

function SectionBlock({ section, locale }: { section: PageSection; locale: "en" | "ar" }) {
  switch (section.kind) {
    case "steps":
      return <StepsSection section={section} locale={locale} />;
    case "stepsVisual":
      return <StepsVisualSection section={section} locale={locale} />;
    case "stats":
      return <StatsSection section={section} locale={locale} />;
    case "bullets":
      return <BulletsSection section={section} locale={locale} />;
    case "chips":
      return <ChipsSection section={section} locale={locale} />;
    case "compare":
      return <CompareSection section={section} locale={locale} />;
    case "caseStudies":
      return <CaseStudiesSection section={section} locale={locale} />;
    case "logos":
      return <LogosSection locale={locale} />;
    case "team":
      return <TeamSection section={section} locale={locale} />;
    case "timeline":
      return <TimelineSection section={section} locale={locale} />;
    case "news":
      return <NewsSection section={section} locale={locale} />;
    case "quote":
      return <QuoteSection section={section} locale={locale} />;
    case "legal":
      return <LegalSectionBlock section={section} locale={locale} />;
    default:
      return null;
  }
}

const wrap = "mx-auto max-w-5xl px-5 lg:px-8";
const sectionPad = "bg-white py-14 dark:bg-secondary-darker lg:py-20";

function StepsSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "steps" }>;
  locale: "en" | "ar";
}) {
  return (
    <section className={sectionPad}>
      <div className={wrap}>
        {section.heading && (
          <Reveal>
            <h2 className="mb-10 text-center text-2xl font-medium text-ink dark:text-white sm:text-3xl">
              {pick(section.heading, locale)}
            </h2>
          </Reveal>
        )}
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {section.items.map((step, i) => (
            <Reveal key={i} delay={i * 60}>
              <li className="h-full rounded-2xl border border-grey-100 bg-[#F6F7F8] p-6 dark:border-white/10 dark:bg-white/5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <p className="mt-4 font-medium text-ink dark:text-white">{pick(step.title, locale)}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/70">
                  {pick(step.body, locale)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Same split-row pattern as the homepage/Features "How Atar works" sections — steps beside a real product-screen mockup, instead of a plain grid of boxes. */
function StepsVisualSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "stepsVisual" }>;
  locale: "en" | "ar";
}) {
  const Visual = visualComponents[section.visual];
  return (
    <section className={sectionPad}>
      <div className={wrap}>
        {section.heading && (
          <Reveal>
            <h2 className="mb-10 text-center text-2xl font-medium text-ink dark:text-white sm:text-3xl">
              {pick(section.heading, locale)}
            </h2>
          </Reveal>
        )}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ol className="space-y-6">
              {section.items.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-ink dark:text-white">{pick(step.title, locale)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft dark:text-white/70">
                      {pick(step.body, locale)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={80}>
            <Visual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChipsSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "chips" }>;
  locale: "en" | "ar";
}) {
  return (
    <section className={sectionPad}>
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {section.heading && (
          <Reveal>
            <h2 className="mb-6 text-center text-2xl font-medium text-ink dark:text-white sm:text-3xl">
              {pick(section.heading, locale)}
            </h2>
          </Reveal>
        )}
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {section.items.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-grey-200 bg-white px-4 py-2 text-sm font-medium text-ink-soft dark:border-white/15 dark:bg-white/5 dark:text-white/80"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={10} />
                </span>
                {pick(item, locale)}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatsSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "stats" }>;
  locale: "en" | "ar";
}) {
  return (
    <section className={sectionPad}>
      <div className={wrap}>
        <Reveal>
          <div className="rounded-[28px] bg-[#F6F7F8] px-6 py-12 dark:bg-white/5 sm:px-10 lg:py-16">
            {section.heading && (
              <h2 className="text-center text-2xl font-medium text-secondary dark:text-white lg:text-3xl">
                {pick(section.heading, locale)}
              </h2>
            )}
            <dl
              className={`grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:gap-0 ${
                section.heading ? "mt-10" : ""
              }`}
            >
              {section.items.map((stat, i) => (
                <div
                  key={i}
                  className={
                    i === 1 && section.items.length === 3
                      ? "sm:border-x sm:border-grey-200 dark:sm:border-white/15 sm:px-6"
                      : "sm:px-6"
                  }
                >
                  <dt className="text-4xl font-semibold tracking-tight text-secondary dark:text-white lg:text-5xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-3 text-sm text-ink-soft dark:text-white/60">{pick(stat.label, locale)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BulletsSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "bullets" }>;
  locale: "en" | "ar";
}) {
  return (
    <section className={sectionPad}>
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {section.heading && (
          <Reveal>
            <h2 className="mb-8 text-center text-2xl font-medium text-ink dark:text-white sm:text-3xl">
              {pick(section.heading, locale)}
            </h2>
          </Reveal>
        )}
        <Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-grey-100 bg-[#F6F7F8] p-4 dark:border-white/10 dark:bg-white/5"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={12} />
                </span>
                <span className="text-sm leading-relaxed text-ink-soft dark:text-white/80">
                  {pick(item, locale)}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CompareSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "compare" }>;
  locale: "en" | "ar";
}) {
  return (
    <section className={sectionPad}>
      <div className={wrap}>
        <Reveal>
          <div className="overflow-x-auto rounded-2xl border border-grey-100 dark:border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-start text-sm">
              <thead>
                <tr className="border-b border-grey-100 dark:border-white/10">
                  <th className="p-4 text-start font-medium text-ink-muted dark:text-white/50"> </th>
                  <th className="p-4 text-start font-semibold text-primary">Atar</th>
                  <th className="p-4 text-start font-medium text-ink-soft dark:text-white/70">
                    {pick(section.otherLabel, locale)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 ? "bg-[#F6F7F8] dark:bg-white/5" : "bg-white dark:bg-transparent"}
                  >
                    <td className="p-4 font-medium text-ink dark:text-white">{pick(row.aspect, locale)}</td>
                    <td className="p-4 text-ink-soft dark:text-white/80">
                      <span className="flex items-start gap-2">
                        <Check size={14} className="mt-0.5 flex-none text-primary" />
                        {pick(row.atar, locale)}
                      </span>
                    </td>
                    <td className="p-4 text-ink-muted dark:text-white/50">
                      <span className="flex items-start gap-2">
                        <Minus size={14} className="mt-0.5 flex-none" />
                        {pick(row.other, locale)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseStudiesSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "caseStudies" }>;
  locale: "en" | "ar";
}) {
  return (
    <section className={sectionPad}>
      <div className="mx-auto max-w-6xl space-y-10 px-5 lg:px-8">
        {section.items.map((item, i) => {
          const reversed = i % 2 === 1;
          const photo = caseStudyPhotos[item.imageId];
          return (
            <Reveal key={i} delay={i * 60}>
              {/* Same full-width split-card pattern as the homepage/Features "remaining feature" blocks: a bordered rounded-3xl bg-grey-100/40 card, light on both sides. */}
              <article className="overflow-hidden rounded-3xl border border-grey-100 bg-grey-100/40 dark:border-white/10 dark:bg-white/5 lg:grid lg:grid-cols-5 lg:items-center">
                <div className={`p-8 lg:col-span-2 lg:p-10 ${reversed ? "lg:order-2" : ""}`}>
                  <p className="text-sm font-medium uppercase tracking-wider text-primary">
                    {pick(item.tag, locale)}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium text-ink dark:text-white lg:text-3xl">
                    {pick(item.title, locale)}
                  </h3>

                  <p className="mt-4 leading-relaxed text-ink-soft dark:text-white/70">{pick(item.challenge, locale)}</p>
                  <p className="mt-3 leading-relaxed text-ink-soft dark:text-white/70">{pick(item.outcome, locale)}</p>

                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-grey-200 pt-6 dark:border-white/10">
                    {item.stats.map((stat, j) => (
                      <div key={j}>
                        <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                        <p className="text-xs text-ink-muted dark:text-white/50">{pick(stat.label, locale)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-6 lg:col-span-3 lg:p-8 ${reversed ? "lg:order-1" : ""}`}>
                  {photo && (
                    <img
                      src={photo}
                      alt={pick(item.title, locale)}
                      className="mx-auto block aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
                      loading="lazy"
                    />
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function LogosSection({ locale }: { locale: "en" | "ar" }) {
  return (
    <section className="bg-[#F6F7F8] py-14 dark:bg-white/5 lg:py-20">
      <div className={wrap}>
        <Reveal>
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-ink-muted dark:text-white/50">
            {locale === "ar" ? "موثوق به من قبل" : "Trusted by"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {clientLogos.map((c) => (
              <div
                key={c.file}
                className="flex h-20 w-36 items-center justify-center rounded-2xl bg-white px-6 dark:bg-white/10"
              >
                <img
                  src={c.url}
                  alt={c.name}
                  className="max-h-10 w-auto object-contain dark:brightness-0 dark:invert dark:opacity-80"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Neutral placeholder silhouette — stands in for a real headshot until one is provided. */
function PersonPlaceholder({ className = "h-12 w-12 text-primary/40" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth={1.5} />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function TeamSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "team" }>;
  locale: "en" | "ar";
}) {
  return (
    <section className={sectionPad}>
      <div className={wrap}>
        <Reveal>
          <h2 className="mb-8 text-center text-2xl font-medium text-ink dark:text-white sm:text-3xl">
            {pick(section.heading, locale)}
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((m, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="overflow-hidden rounded-2xl border border-grey-100 bg-white shadow-card dark:border-white/10 dark:bg-white/5">
                {/* Placeholder photo — swap for a real headshot later. */}
                <div className="flex aspect-[4/5] items-center justify-center bg-[#F6F7F8] dark:bg-white/10">
                  <PersonPlaceholder />
                </div>
                <div className="p-5">
                  <p className="font-medium text-ink dark:text-white">{m.name}</p>
                  <p className="mt-1 text-sm text-ink-soft dark:text-white/70">{pick(m.title, locale)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "timeline" }>;
  locale: "en" | "ar";
}) {
  return (
    <section className={`${sectionPad} bg-[#F6F7F8] dark:bg-white/5`}>
      <div className={wrap}>
        <Reveal>
          <ol className="grid gap-6 sm:grid-cols-5">
            {section.items.map((t, i) => (
              <li key={i} className="rounded-2xl border border-grey-100 bg-white p-5 text-center dark:border-white/10 dark:bg-secondary-darker">
                <p className="text-lg font-semibold text-primary">{t.year}</p>
                <p className="mt-1 text-sm text-ink-soft dark:text-white/70">{pick(t.label, locale)}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function NewsSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "news" }>;
  locale: "en" | "ar";
}) {
  const formatDate = (iso: string) => {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className={sectionPad}>
      <div className={wrap}>
        {section.heading && (
          <Reveal>
            <h2 className="mb-10 text-center text-2xl font-medium text-ink dark:text-white sm:text-3xl">
              {pick(section.heading, locale)}
            </h2>
          </Reveal>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((n, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-grey-100 bg-white shadow-card transition-shadow hover:shadow-lift dark:border-white/10 dark:bg-white/5">
                <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-secondary to-primary">
                  <Logo light className="h-9 w-auto opacity-90" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">{formatDate(n.date)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/70">{pick(n.body, locale)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "quote" }>;
  locale: "en" | "ar";
}) {
  return (
    <section className={`${sectionPad} bg-[#F6F7F8] dark:bg-white/5`}>
      <div className="mx-auto max-w-2xl px-5 text-center lg:px-8">
        {section.items.map((q, i) => (
          <Reveal key={i} delay={i * 60}>
            <blockquote className="text-xl font-medium leading-relaxed text-ink dark:text-white sm:text-2xl">
              "{pick(q.quote, locale)}"
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-3">
              {/* Placeholder avatar — swap for a real headshot later. */}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <PersonPlaceholder className="h-6 w-6 text-primary" />
              </span>
              <div className="text-start">
                <p className="font-medium text-ink dark:text-white">{q.name}</p>
                <p className="text-sm text-ink-soft dark:text-white/70">{pick(q.title, locale)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LegalSectionBlock({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "legal" }>;
  locale: "en" | "ar";
}) {
  return (
    <section className="bg-white pb-20 dark:bg-secondary-darker">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-grey-100 bg-[#F6F7F8] p-5 text-sm leading-relaxed text-ink-soft dark:border-white/10 dark:bg-white/5 dark:text-white/70">
            {pick(section.note, locale)}
          </div>
          <p className="mt-6 text-xs uppercase tracking-wider text-ink-muted dark:text-white/50">
            {section.updated}
          </p>
          <div className="mt-4 space-y-8" dir="ltr">
            {section.sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-lg font-medium text-ink dark:text-white">{s.heading}</h2>
                {s.body.split("\n\n").map((para, j) => (
                  <p key={j} className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-soft dark:text-white/70">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
