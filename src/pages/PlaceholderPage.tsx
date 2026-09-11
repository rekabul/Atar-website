import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "../i18n/LocaleContext";
import { pick } from "../data/pricing";
import {
  placeholderPages,
  placeholderFallback,
  type PageSection,
} from "../data/placeholderPages";
import { caseStudyPhotos } from "../data/assetsMap";
import Reveal from "../components/ui/Reveal";
import Clients from "../components/Clients";
import Logo, { LogoMark } from "../components/ui/Logo";
import {
  ArrowRight,
  Check,
  Minus,
  RentListIcon,
  RentersIcon,
  ApplicationIcon,
  QuotePriceIcon,
  LeaseIcon,
  HandoverIcon,
  MessageIcon,
  TicketIcon,
  FacilityIcon,
  PaymentIcon,
} from "../components/ui/Icon";
import { prefersReducedMotion } from "../hooks/useInView";

gsap.registerPlugin(ScrollTrigger, useGSAP);
import {
  CollectionsAreaChart,
  ServiceLog,
  PropertyDonut,
  AIPipeline,
  ComplianceLog,
  IntegrationsHub,
  ListingCard,
  LeadsChart,
  BookingConfirm,
  SignatureCheck,
  MilestoneBar,
  RentalListingCard,
  RenterInterestChart,
  ApplicationReviewCard,
  QuotationCard,
  LeaseAgreementCard,
  HandoverChecklistCard,
  CommunicationFeedCard,
  FacilityStatusCard,
  OnlinePaymentCard,
} from "../components/FeatureVisuals";
import type { VisualKey, DetailedVisualKey } from "../data/placeholderPages";

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

/** One distinct mockup per step for a detailed "How it works" — see stepsDetailed. */
const detailedVisualComponents: Record<DetailedVisualKey, () => JSX.Element> = {
  listing: ListingCard,
  leads: LeadsChart,
  booking: BookingConfirm,
  signature: SignatureCheck,
  milestones: MilestoneBar,
  rentalListing: RentalListingCard,
  renterInterest: RenterInterestChart,
  application: ApplicationReviewCard,
  quotation: QuotationCard,
  leaseAgreement: LeaseAgreementCard,
  handoverChecklist: HandoverChecklistCard,
  communication: CommunicationFeedCard,
  tickets: ServiceLog,
  facility: FacilityStatusCard,
  onlinePayment: OnlinePaymentCard,
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
  // Sales Suite, Leasing Suite and Operations Suite each get a compact flow
  // stepper under their hero, without touching any other placeholder route.
  const isSalesSuite = pathname === "/products/sales-suite";
  const isLeasingSuite = pathname === "/products/leasing-suite";
  const isOperationsSuite = pathname === "/products/operations-suite";

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
        {isSalesSuite && <SalesFlowStepper locale={locale} />}
        {isLeasingSuite && <LeasingFlowStepper locale={locale} />}
        {isOperationsSuite && <OperationsFlowStepper locale={locale} />}
      </section>

      {copy.sections?.map((section, i) => (
        <SectionBlock key={i} section={section} locale={locale} />
      ))}

      {!copy.minimalFooter && (
        <section className="bg-white py-16 dark:bg-secondary-darker lg:py-24" aria-label="Talk to us">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <Reveal>
              <div className="rounded-[28px] border border-grey-100 bg-[#F6F7F8] p-8 text-center dark:border-white/10 dark:bg-white/5 lg:p-10">
                <p className="leading-relaxed text-ink-soft dark:text-white/70">
                  {locale === "ar"
                    ? "هل تحتاج إلى مزيد من المعلومات؟ احجز عرضاً توضيحياً لمعرفة المزيد"
                    : "Need more information? Book a demo to learn more"}
                </p>
                <a
                  href="https://meetings.hubspot.com/atar/demo-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-secondary"
                >
                  <span>{locale === "ar" ? "احجز عرضاً توضيحياً" : "Book a Demo"}</span>
                  <ArrowRight />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
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
    case "stepsDetailed":
      return <StepsDetailedSection section={section} locale={locale} />;
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
      return <Clients />;
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

/**
 * Sales Suite "alt" variant only — a compact 5-stop overview of the whole
 * sales flow, sitting right under the hero copy: number, short label, a
 * connecting line with a dot per stop, and a one-word sub-label. Purely a
 * visual summary — the detailed step-by-step section below still carries the
 * real copy.
 */
function SalesFlowStepper({ locale }: { locale: "en" | "ar" }) {
  const steps: { n: string; label: string; sub: string }[] = [
    { n: "01", label: locale === "ar" ? "الإدراج" : "List", sub: locale === "ar" ? "العقار" : "Property" },
    { n: "02", label: locale === "ar" ? "العملاء" : "Leads", sub: locale === "ar" ? "العميل" : "Customer" },
    { n: "03", label: locale === "ar" ? "العرض" : "Quote", sub: locale === "ar" ? "عرض السعر" : "Quotation" },
    { n: "04", label: locale === "ar" ? "الإغلاق" : "Close", sub: locale === "ar" ? "الاتفاقية" : "Agreement" },
    { n: "05", label: locale === "ar" ? "التسليم" : "Handover", sub: locale === "ar" ? "الإنجاز" : "Completion" },
  ];

  return (
    <div className="mx-auto mt-4 max-w-4xl overflow-x-auto px-5 pb-14 lg:px-8">
      <Reveal delay={80}>
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-muted dark:text-white/50">
          {locale === "ar" ? "من الإدراج إلى التسليم النهائي" : "From listing to final handover"}
        </p>
        <div className="mx-auto min-w-[520px]">
          <div className="grid grid-cols-5 gap-2 text-center">
            {steps.map((s) => (
              <div key={s.n}>
                <p className="text-xs font-medium text-ink-muted dark:text-white/40">{s.n}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-ink dark:text-white sm:text-base">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="relative mt-4 h-px w-full bg-grey-200 dark:bg-white/15">
            <div className="absolute inset-0 grid grid-cols-5">
              {steps.map((s) => (
                <div key={s.n} className="flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-secondary-darker" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2 text-center">
            {steps.map((s) => (
              <p key={s.n} className="text-xs text-ink-muted dark:text-white/40">
                {s.sub}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/**
 * Leasing Suite "alt" hero strip — a compact 5-stop overview of the whole
 * leasing flow, sitting right under the hero copy. Same flat-line timeline
 * mechanic as the Sales Suite stepper, but each stop gets a small icon in a
 * muted circle instead of a number, matching the icon-circle style requested.
 */
function LeasingFlowStepper({ locale }: { locale: "en" | "ar" }) {
  const steps: {
    key: string;
    label: string;
    sub: string;
    Icon: (p: { size?: number }) => JSX.Element;
  }[] = [
    {
      key: "list",
      label: locale === "ar" ? "الإدراج" : "List",
      sub: locale === "ar" ? "الوحدة" : "Listing",
      Icon: RentListIcon,
    },
    {
      key: "attract",
      label: locale === "ar" ? "الاستقطاب" : "Attract",
      sub: locale === "ar" ? "المستأجرون" : "Renters",
      Icon: RentersIcon,
    },
    {
      key: "applications",
      label: locale === "ar" ? "الطلبات" : "Applications",
      sub: locale === "ar" ? "المراجعة" : "Review",
      Icon: ApplicationIcon,
    },
    {
      key: "quote",
      label: locale === "ar" ? "العرض" : "Quote",
      sub: locale === "ar" ? "التسعير" : "Pricing",
      Icon: QuotePriceIcon,
    },
    {
      key: "lease",
      label: locale === "ar" ? "العقد" : "Lease",
      sub: locale === "ar" ? "الاتفاقية" : "Agreement",
      Icon: LeaseIcon,
    },
  ];

  return (
    <div className="mx-auto mt-4 max-w-5xl overflow-x-auto px-5 pb-14 lg:px-8">
      <Reveal delay={80}>
        <div className="mx-auto min-w-[600px] rounded-[28px] bg-[#F6F7F8] px-6 py-10 dark:bg-white/5 sm:px-10">
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-muted dark:text-white/50">
            {locale === "ar" ? "من أول إعلان إلى عقد مُدار بالكامل" : "From listing to a fully managed lease"}
          </p>
          <div className="grid grid-cols-5 gap-2 text-center">
            {steps.map(({ key, label, Icon }) => (
              <div key={key} className="flex flex-col items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-card dark:bg-secondary-darker">
                  <Icon size={18} />
                </span>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-ink dark:text-white sm:text-base">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="relative mt-4 h-px w-full bg-grey-200 dark:bg-white/15">
            <div className="absolute inset-0 grid grid-cols-5">
              {steps.map(({ key }) => (
                <div key={key} className="flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-[#F6F7F8] dark:ring-white/5" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2 text-center">
            {steps.map(({ key, sub }) => (
              <p key={key} className="text-xs text-ink-muted dark:text-white/40">
                {sub}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/**
 * Operations Suite "alt" hero strip — same small-point timeline idea as
 * Sales/Leasing, but each stop is its own bordered card; a line-and-dot rail
 * above the row visually connects card one through to card five.
 */
function OperationsFlowStepper({ locale }: { locale: "en" | "ar" }) {
  const steps: {
    key: string;
    label: string;
    sub: string;
    Icon: (p: { size?: number }) => JSX.Element;
  }[] = [
    {
      key: "handover",
      label: locale === "ar" ? "التسليم" : "Handover",
      sub: locale === "ar" ? "الإدراج" : "Onboarding",
      Icon: HandoverIcon,
    },
    {
      key: "communicate",
      label: locale === "ar" ? "التواصل" : "Communicate",
      sub: locale === "ar" ? "العملاء" : "Customers",
      Icon: MessageIcon,
    },
    {
      key: "tickets",
      label: locale === "ar" ? "التذاكر" : "Tickets",
      sub: locale === "ar" ? "الطلبات" : "Requests",
      Icon: TicketIcon,
    },
    {
      key: "facilities",
      label: locale === "ar" ? "المرافق" : "Facilities",
      sub: locale === "ar" ? "المناطق المشتركة" : "Common Areas",
      Icon: FacilityIcon,
    },
    {
      key: "payments",
      label: locale === "ar" ? "المدفوعات" : "Payments",
      sub: locale === "ar" ? "إلكترونياً" : "Online",
      Icon: PaymentIcon,
    },
  ];

  return (
    <div className="mx-auto mt-4 max-w-5xl overflow-x-auto px-5 pb-16 lg:px-8">
      <Reveal delay={80}>
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-muted dark:text-white/50">
          {locale === "ar" ? "من التسليم الرقمي إلى التشغيل اليومي" : "From digital handover to everyday operations"}
        </p>

        <div className="mx-auto min-w-[880px]">
          {/* Connecting rail — one dot per card, centered directly above it. */}
          <div className="relative mb-6 h-px w-full bg-grey-200 dark:bg-white/15">
            <div className="absolute inset-0 grid grid-cols-5">
              {steps.map(({ key }) => (
                <div key={key} className="flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-secondary-darker" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {steps.map(({ key, label, sub, Icon }) => (
              <div
                key={key}
                className="flex flex-col items-center rounded-2xl border border-grey-100 bg-white p-5 text-center shadow-card dark:border-white/10 dark:bg-secondary-darker"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                  <Icon size={18} />
                </span>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-ink dark:text-white sm:text-base">
                  {label}
                </p>
                <p className="mt-1 text-xs text-ink-muted dark:text-white/40">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/**
 * A more detailed "How it works" — each step is its own full-width card with
 * its own product-screen mockup (not one shared visual for the whole flow),
 * alternating sides like the site's other "remaining feature" rows. A slim
 * rail beside the sequence fills in as you scroll, reading as literal
 * progress through the steps rather than decoration.
 */
function StepsDetailedSection({
  section,
  locale,
}: {
  section: Extract<PageSection, { kind: "stepsDetailed" }>;
  locale: "en" | "ar";
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !railRef.current || !fillRef.current) return;
      gsap.set(fillRef.current, { scaleY: 0 });
      gsap.to(fillRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: railRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
        },
      });
    },
    { scope: railRef }
  );

  return (
    <section className={sectionPad}>
      <div className={wrap}>
        {section.heading && (
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-medium text-ink dark:text-white sm:text-3xl">
                {pick(section.heading, locale)}
              </h2>
              {section.subtitle && (
                <p className="mt-3 leading-relaxed text-ink-soft dark:text-white/70">
                  {pick(section.subtitle, locale)}
                </p>
              )}
            </div>
          </Reveal>
        )}

        <div ref={railRef} className="relative mt-12 lg:mt-16">
          {/* scroll-progress rail — desktop only, tracks how far through the sequence you are */}
          <div
            className="absolute top-1 bottom-1 hidden w-px bg-grey-200 dark:bg-white/10 lg:block"
            style={{ insetInlineStart: 0 }}
            aria-hidden="true"
          />
          <div
            ref={fillRef}
            className="absolute top-1 hidden w-px origin-top bg-primary lg:block"
            style={{ insetInlineStart: 0, height: "calc(100% - 0.5rem)" }}
            aria-hidden="true"
          />

          <ol className="space-y-8 lg:space-y-12 lg:ps-10">
            {section.items.map((step, i) => {
              const Visual = detailedVisualComponents[step.visual];
              const flip = i % 2 === 1;
              return (
                <li key={i}>
                  <Reveal delay={i * 60}>
                    <article className="overflow-hidden rounded-3xl border border-grey-100 bg-grey-100/40 dark:border-white/10 dark:bg-white/5 lg:grid lg:grid-cols-5 lg:items-center">
                      <div className={`p-8 lg:col-span-2 lg:p-10 ${flip ? "lg:order-2" : ""}`}>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                          {i + 1}
                        </span>
                        <h3 className="mt-4 text-xl font-medium text-ink dark:text-white lg:text-2xl">
                          {pick(step.title, locale)}
                        </h3>
                        <p className="mt-3 leading-relaxed text-ink-soft dark:text-white/70">
                          {pick(step.body, locale)}
                        </p>
                      </div>
                      <div className={`p-6 lg:col-span-3 lg:p-8 ${flip ? "lg:order-1" : ""}`}>
                        <Visual />
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
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
              className={`mx-auto grid grid-cols-1 gap-10 text-center sm:gap-0 ${
                section.items.length === 2 ? "max-w-xl sm:grid-cols-2" : "sm:grid-cols-3"
              } ${section.heading ? "mt-10" : ""}`}
            >
              {section.items.map((stat, i) => (
                <div
                  key={i}
                  className={
                    (i === 1 && section.items.length === 3) || (i === 1 && section.items.length === 2)
                      ? "sm:border-s sm:border-grey-200 dark:sm:border-white/15 sm:px-6"
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

/**
 * Reveals each comparison row as two opposing cards sliding in from their own
 * side (Atar from the start, the alternative from the end) via GSAP
 * ScrollTrigger — a spatial echo of the "vs." framing already in the page
 * title, rather than a generic fade-up. Falls back to a static render when
 * reduced motion is set.
 */
function CompareBattle({
  children,
  className = "",
  rtl = false,
}: {
  children: React.ReactNode;
  className?: string;
  rtl?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", containerRef.current);
      if (!rows.length) return;

      // Each card slides in from its own visual edge — physical transforms
      // aren't mirrored by `dir`, so the offsets flip explicitly for RTL.
      const atarFrom = rtl ? 28 : -28;
      const otherFrom = rtl ? -28 : 28;

      rows.forEach((row) => {
        const atarCard = row.querySelector<HTMLElement>("[data-side='atar']");
        const otherCard = row.querySelector<HTMLElement>("[data-side='other']");
        if (!atarCard || !otherCard) return;

        gsap.set(atarCard, { opacity: 0, x: atarFrom });
        gsap.set(otherCard, { opacity: 0, x: otherFrom });

        ScrollTrigger.create({
          trigger: row,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(atarCard, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" });
            gsap.to(otherCard, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.1 });
          },
        });
      });
    },
    { scope: containerRef, dependencies: [rtl] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
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
          {/* Face-off header: Atar vs. the alternative, matching the page's own "vs." framing */}
          <div className="mb-10 flex items-center justify-center gap-3 sm:gap-5">
            <div className="flex flex-1 items-center justify-end gap-3">
              <span className="hidden h-px flex-1 bg-grey-200 dark:bg-white/10 sm:block" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                <LogoMark className="h-3.5 w-3.5" />
                Atar
              </span>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-grey-200 bg-white text-[11px] font-semibold text-ink-muted dark:border-white/15 dark:bg-white/5 dark:text-white/50">
              VS
            </span>
            <div className="flex flex-1 items-center gap-3">
              <span className="max-w-[16ch] rounded-full border border-grey-200 bg-white px-4 py-2 text-center text-sm font-medium leading-snug text-ink-soft dark:border-white/15 dark:bg-white/5 dark:text-white/70 sm:max-w-none">
                {pick(section.otherLabel, locale)}
              </span>
              <span className="hidden h-px flex-1 bg-grey-200 dark:bg-white/10 sm:block" />
            </div>
          </div>

          <CompareBattle className="space-y-6" rtl={locale === "ar"}>
            {section.rows.map((row, i) => (
              <div key={i} data-row>
                <p className="mb-3 text-center text-sm font-medium text-ink-muted dark:text-white/50">
                  {pick(row.aspect, locale)}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <div
                    data-side="atar"
                    className="flex items-start gap-2.5 rounded-2xl border border-primary/25 bg-primary/5 p-4 shadow-card dark:border-primary/30 dark:bg-primary/10 sm:p-5"
                  >
                    <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-primary text-white">
                      <Check size={12} />
                    </span>
                    <p className="text-sm leading-relaxed text-ink dark:text-white">{pick(row.atar, locale)}</p>
                  </div>
                  <div
                    data-side="other"
                    className="flex items-start gap-2.5 rounded-2xl border border-grey-100 bg-[#F6F7F8] p-4 dark:border-white/10 dark:bg-white/5 sm:p-5"
                  >
                    <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-grey-200 text-ink-muted dark:bg-white/10 dark:text-white/40">
                      <Minus size={12} />
                    </span>
                    <p className="text-sm leading-relaxed text-ink-muted dark:text-white/50">
                      {pick(row.other, locale)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CompareBattle>
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
