import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "../i18n/LocaleContext";
import { pick, type LStr } from "../data/pricing";
import {
  placeholderPages,
  placeholderFallback,
  type PageSection,
} from "../data/placeholderPages";
import { caseStudyPhotos } from "../data/assetsMap";
import { brandedAppMockup, brandedApp3Phone, listingWebsiteMockup } from "../assets";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import Clients from "../components/Clients";
import Logo, { LogoMark } from "../components/ui/Logo";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
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
  AppleLogo,
  GoogleLogo,
  TagIcon,
  BellIcon,
  Riyal,
  Search,
  GridIcon,
  LinkIcon,
  Globe,
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
  const isBrandedMobileApp = pathname === "/products/addons/branded-mobile-app";
  const isListingWebsite = pathname === "/products/addons/listing-website";
  // Two selectable visual treatments for the Branded Mobile App page, so the
  // team can compare them side by side before picking one. Toggle only
  // renders on this one route; every other placeholder page is unaffected.
  const [demoVariant, setDemoVariant] = useState<"a" | "b">("a");

  useEffect(() => {
    const prev = document.title;
    document.title = `${pick(copy.title, "en")} | Atar`;
    return () => {
      document.title = prev;
    };
  }, [copy]);

  return (
    <>
      {isBrandedMobileApp && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div
            role="group"
            aria-label={locale === "ar" ? "تبديل تصميم الصفحة" : "Switch page layout"}
            className="inline-flex items-center gap-1 rounded-full border border-grey-200 bg-white/95 p-1 shadow-lift backdrop-blur dark:border-white/15 dark:bg-secondary-darker/95"
          >
            <button
              type="button"
              onClick={() => setDemoVariant("a")}
              aria-pressed={demoVariant === "a"}
              className={`min-h-11 rounded-full px-4 text-sm font-medium transition-colors ${
                demoVariant === "a" ? "bg-primary text-white" : "text-ink-soft dark:text-white/60"
              }`}
            >
              {locale === "ar" ? "التصميم 1" : "Layout 1"}
            </button>
            <button
              type="button"
              onClick={() => setDemoVariant("b")}
              aria-pressed={demoVariant === "b"}
              className={`min-h-11 rounded-full px-4 text-sm font-medium transition-colors ${
                demoVariant === "b" ? "bg-primary text-white" : "text-ink-soft dark:text-white/60"
              }`}
            >
              {locale === "ar" ? "التصميم 2" : "Layout 2"}
            </button>
          </div>
        </div>
      )}

      <section
        className={`hero-bg ${isListingWebsite ? "relative overflow-hidden" : ""}`}
        aria-labelledby="placeholder-title"
      >
        {/* Soft blurred glow behind the headline, echoing the reference
            layout's cloudy hero background — fades to plain white well
            before the screenshot below so the image itself sits on a clean
            background rather than fading content. */}
        {isListingWebsite && (
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden" aria-hidden="true">
            <div className="absolute -top-32 start-1/2 h-80 w-[560px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl dark:bg-primary/10" />
            <div className="absolute -top-16 start-[15%] h-56 w-56 rounded-full bg-secondary/10 blur-3xl dark:bg-white/5" />
            <div className="absolute -top-10 end-[12%] h-64 w-64 rounded-full bg-primary/10 blur-3xl dark:bg-primary/10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white dark:to-secondary-darker" />
          </div>
        )}
        {/* Layout 2 of the Branded Mobile App page replaces this generic
            eyebrow/title/body block with its own pill + headline + store
            badges (built inside BrandedAppShowcase) instead of stacking two
            heroes on top of each other. */}
        {!(isBrandedMobileApp && demoVariant === "b") && (
          <div
            className={`mx-auto max-w-3xl px-5 text-center lg:px-8 ${
              isListingWebsite ? "pt-16 pb-4 lg:pt-20 lg:pb-6" : "py-16 lg:py-20"
            }`}
          >
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary dark:border-primary/30 dark:bg-white/5">
                {pick(copy.eyebrow, locale)}
              </span>
              <h1
                id="placeholder-title"
                className="mt-4 text-4xl font-medium tracking-tight text-ink dark:text-white sm:text-5xl"
              >
                {pick(copy.title, locale)}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft dark:text-white/70">
                {pick(copy.body, locale)}
              </p>
              {isListingWebsite && (
                <div className="mt-8">
                  <Button href="https://meetings.hubspot.com/atar/demo-meeting" icon={<ArrowRight />}>
                    {locale === "ar" ? "احجز عرضاً توضيحياً" : "Book a Demo"}
                  </Button>
                </div>
              )}
            </Reveal>
          </div>
        )}
        {isSalesSuite && <SalesFlowStepper locale={locale} />}
        {isLeasingSuite && <LeasingFlowStepper locale={locale} />}
        {isOperationsSuite && <OperationsFlowStepper locale={locale} />}
        {isBrandedMobileApp && (
          <BrandedAppShowcase
            locale={locale}
            variant={demoVariant}
            title={copy.title}
            body={copy.body}
          />
        )}
        {isListingWebsite && <ListingWebsiteShowcase locale={locale} />}
      </section>

      {isListingWebsite && <ListingWebsiteFeatureGrid locale={locale} />}

      {copy.sections?.map((section, i) => (
        <SectionBlock key={i} section={section} locale={locale} />
      ))}

      {isListingWebsite && <ListingWebsiteFAQ locale={locale} />}

      {isBrandedMobileApp &&
        (demoVariant === "a" ? (
          <MobileFeatureShowcase locale={locale} />
        ) : (
          <BrandedAppVariantB locale={locale} />
        ))}

      {!copy.minimalFooter && (isBrandedMobileApp ? <DownloadCTA locale={locale} /> : (
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
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-all duration-150 hover:bg-secondary active:bg-secondary motion-safe:active:scale-[0.97]"
                >
                  <span>{locale === "ar" ? "احجز عرضاً توضيحياً" : "Book a Demo"}</span>
                  <ArrowRight />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}

/**
 * Branded Mobile App page's closing CTA — replaces the generic "Book a
 * Demo" block with App Store / Google Play download buttons, since the
 * page's own goal is getting the app installed, not booking a demo.
 * Store links are placeholders ("#") until the app is actually published.
 */
function DownloadCTA({ locale }: { locale: "en" | "ar" }) {
  return (
    <section id="download" className="scroll-mt-28 bg-white py-16 dark:bg-secondary-darker lg:py-24" aria-label="Download the app">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal>
          <div className="rounded-[28px] border border-grey-100 bg-[#F6F7F8] p-8 text-center dark:border-white/10 dark:bg-white/5 lg:p-10">
            <p className="leading-relaxed text-ink-soft dark:text-white/70">
              {locale === "ar"
                ? "جاهز تبدأ؟ حمّل تطبيق أتار على iOS أو Android"
                : "Ready to get started? Download the Atar app on iOS or Android"}
            </p>
            <div className="mt-5">
              <StoreBadges locale={locale} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
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
 * Real App Store / Google Play badges (black, two-line label), shared by
 * Layout 2's hero and DownloadCTA so both places use the exact same button
 * style instead of two different-looking "download" controls on one page.
 */
function StoreBadges({ locale }: { locale: "en" | "ar" }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href="#download"
        className="inline-flex items-center gap-2.5 rounded-xl bg-ink px-4 py-2.5 text-white transition-transform duration-150 hover:scale-[1.03] motion-safe:active:scale-[0.97] dark:bg-black"
      >
        <AppleLogo size={22} />
        <span className="text-start leading-tight">
          <span className="block text-[10px]">{locale === "ar" ? "التحميل من" : "Download on the"}</span>
          <span className="block text-sm font-semibold">{locale === "ar" ? "أب ستور" : "App Store"}</span>
        </span>
      </a>
      <a
        href="#download"
        className="inline-flex items-center gap-2.5 rounded-xl bg-ink px-4 py-2.5 text-white transition-transform duration-150 hover:scale-[1.03] motion-safe:active:scale-[0.97] dark:bg-black"
      >
        <GoogleLogo size={20} />
        <span className="text-start leading-tight">
          <span className="block text-[10px] uppercase">{locale === "ar" ? "احصل عليه من" : "Get it on"}</span>
          <span className="block text-sm font-semibold">{locale === "ar" ? "جوجل بلاي" : "Google Play"}</span>
        </span>
      </a>
    </div>
  );
}

/**
 * Branded Mobile App hero visual — a client-provided photorealistic iPhone
 * frame with the app screenshot already composited inside it, used as-is
 * (no CSS-drawn bezel needed). The line below states iOS + Android
 * availability as plain text rather than pill "buttons" — the real,
 * clickable App Store / Google Play badges live once, at DownloadCTA,
 * so this doesn't duplicate an inert-looking control the visitor might
 * try to tap.
 */
function BrandedAppShowcase({
  locale,
  variant,
  title,
  body,
}: {
  locale: "en" | "ar";
  variant: "a" | "b";
  title: LStr;
  body: LStr;
}) {
  if (variant === "b") {
    // Layout 2's own hero — a two-tone pill eyebrow, a headline with one
    // highlighted phrase, the same real subtitle copy as Layout 1, and
    // proper "Available on" App Store / Google Play badges — replacing the
    // generic eyebrow/title/body block for this variant only (see the
    // conditional render around this component in PlaceholderPage).
    //
    // The 3-phone hero composite needs more horizontal room than the
    // max-w-3xl text column above it, so the text and the image live in two
    // separately-sized wrappers inside one shared padded section.
    return (
      <div className="px-5 pb-4 pt-16 text-center lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 py-1.5 pe-4 ps-1.5 text-sm dark:border-primary/30 dark:bg-white/5">
            <span className="rounded-full bg-white px-2.5 py-1 font-medium text-ink shadow-card dark:bg-secondary-darker dark:text-white">
              + {locale === "ar" ? "إضافة" : "Add-on"}
            </span>
            <span className="font-medium text-secondary dark:text-white/80">{pick(title, locale)}</span>
          </span>

          <h1
            id="placeholder-title"
            className="mx-auto mt-6 max-w-2xl text-4xl font-medium leading-[1.1] tracking-tight text-ink dark:text-white sm:text-5xl"
          >
            {locale === "ar" ? (
              <>
                تطبيقك الجوال <span className="italic text-primary">بعلامتك التجارية</span> لإسعاد المقيمين
              </>
            ) : (
              <>
                Your Branded <span className="italic text-primary">Mobile App</span> For Happier Residents
              </>
            )}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft dark:text-white/70">
            {pick(body, locale)}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 text-xs font-medium uppercase tracking-wider text-ink-muted dark:text-white/40">
            {locale === "ar" ? "متوفر على" : "Available on"}
          </p>
          <div className="mt-3">
            <StoreBadges locale={locale} />
          </div>
        </Reveal>
        </div>

        <Reveal delay={200} className="mx-auto mt-16 flex max-w-4xl justify-center lg:mt-20">
          <img
            src={brandedApp3Phone}
            alt="Atar branded mobile app shown on three phones — dues, home, and service request screens"
            className="w-full max-w-3xl motion-safe:animate-float"
          />
        </Reveal>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 flex flex-col items-center px-5 pb-4">
      <Reveal delay={80}>
        <img
          src={brandedAppMockup}
          alt="Atar branded mobile app — resident home screen"
          className="w-64 motion-safe:animate-float sm:w-72"
        />
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-6 text-sm text-ink-soft dark:text-white/60">
          {locale === "ar"
            ? "متوفر على iOS وAndroid — استخدم أتار في أي مكان وأي وقت"
            : "Available on iOS and Android — use Atar anywhere, anytime"}
        </p>
      </Reveal>
    </div>
  );
}

/**
 * Mobile feature section for the Branded Mobile App page — a phone mockup
 * beside an icon-led list of 4 features. On desktop (lg+), the section pins
 * in place while scrolling: cards step through one at a time (dimmed →
 * active) and the phone gives a small "screen change" pulse in sync, so the
 * page holds still until all 4 features have had their turn instead of
 * flying past in a normal scroll. Below lg, ScrollTrigger's pin is skipped
 * (pinning is a poor fit for small screens) and cards just reveal normally
 * via Reveal as the user scrolls past them.
 *
 * Only one real screenshot exists today, so the "screen change" is a scale/
 * opacity pulse on the same image rather than a true content swap — once
 * per-feature screenshots exist, swap the single <img> for a per-index src
 * inside the onUpdate active-index branch below.
 */
type MobileFeature = { Icon: (p: { size?: number }) => JSX.Element; title: string; body: string };

/** Shared by MobileFeatureShowcase (Layout 1) and BrandedAppGrid (Layout 2) so the same 4 real feature points aren't duplicated in two data literals. */
function getMobileFeatures(locale: "en" | "ar"): MobileFeature[] {
  return locale === "ar"
    ? [
        {
          Icon: TagIcon,
          title: "علامتك التجارية، في كل مكان",
          body: "شعارك وألوانك وقائمتك الخاصة في متجر التطبيقات — يرى المقيمون علامتك التجارية.",
        },
        {
          Icon: TicketIcon,
          title: "طلبات الخدمة، ببساطة",
          body: "يقدّم المقيمون طلبات الصيانة ويتابعونها دون الحاجة لمكالمة هاتفية.",
        },
        {
          Icon: PaymentIcon,
          title: "المدفوعات، في متناول اليد",
          body: "مدفوعات وكشوف حساب داخل التطبيق — دون الحاجة لبوابة منفصلة.",
        },
        {
          Icon: BellIcon,
          title: "دائماً على اطلاع",
          body: "إشعارات فورية للإعلانات والتحديثات فور صدورها.",
        },
      ]
    : [
        {
          Icon: TagIcon,
          title: "Your brand, everywhere",
          body: "Custom logo, colors and app store listing — residents see your name, not ours.",
        },
        {
          Icon: TicketIcon,
          title: "Service requests, simplified",
          body: "Residents submit and track maintenance requests without a phone call.",
        },
        {
          Icon: PaymentIcon,
          title: "Payments, in their pocket",
          body: "In-app payments and statements — no separate portal to log into.",
        },
        {
          Icon: BellIcon,
          title: "Always in the loop",
          body: "Push notifications for announcements and updates, the moment they go out.",
        },
      ];
}

function MobileFeatureShowcase({ locale }: { locale: "en" | "ar" }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const phoneRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !stageRef.current) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = cardRefs.current.filter((c): c is HTMLLIElement => !!c);
        if (cards.length < 2 || !stageRef.current) return;

        gsap.set(cards.slice(1), { opacity: 0.35, y: 16 });

        let activeIndex = 0;
        const trigger = ScrollTrigger.create({
          trigger: stageRef.current,
          start: () => {
            const header = document.getElementById("top");
            return `top ${header?.offsetHeight ?? 0}`;
          },
          end: () => `+=${cards.length * 380}`,
          pin: true,
          scrub: 0.5,
          snap: 1 / (cards.length - 1),
          onUpdate: (self) => {
            const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
            if (idx === activeIndex) return;
            activeIndex = idx;
            cards.forEach((card, i) => {
              gsap.to(card, {
                opacity: i === idx ? 1 : 0.35,
                y: i === idx ? 0 : 16,
                duration: 0.35,
                ease: "power2.out",
              });
            });
            if (phoneRef.current) {
              gsap.fromTo(
                phoneRef.current,
                { scale: 0.97, opacity: 0.85 },
                { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
              );
            }
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: stageRef, dependencies: [locale] }
  );

  const features = getMobileFeatures(locale);

  return (
    <section className={sectionPad}>
      <div className={wrap}>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-medium text-ink dark:text-white sm:text-3xl">
              {locale === "ar" ? "مصمم لهاتف مقيميك" : "Built for your residents' phones"}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft dark:text-white/70">
              {locale === "ar"
                ? "كل ما يحتاجه المقيم والمالك، في تطبيق واحد يحمل علامتك التجارية."
                : "Everything a resident or owner needs, in one app that carries your brand."}
            </p>
          </div>
        </Reveal>

        <div ref={stageRef} className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-5 lg:items-center lg:gap-16">
          <Reveal className="flex justify-center lg:col-span-2">
            <img
              ref={phoneRef}
              src={brandedAppMockup}
              alt="Atar branded mobile app on a resident's phone"
              className="w-52 motion-safe:animate-float sm:w-60"
            />
          </Reveal>

          <ul className="space-y-4 lg:col-span-3">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 60}>
                <li
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="flex items-start gap-4 rounded-2xl border border-grey-100 bg-grey-100/40 p-5 dark:border-white/10 dark:bg-white/5"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    <f.Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-medium text-ink dark:text-white">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft dark:text-white/70">{f.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Layout 2 for the Branded Mobile App page — the alternate visual treatment
 * from the reference layout the team shared (hero + alternating feature
 * spotlights + a compact "built for" grid + FAQ), rebuilt in Atar's own
 * theme and content rather than copied literally. Wrapped in one
 * `#mobile-features` anchor target so the Layout 2 hero's "See All
 * Features" button can jump straight here.
 */
function BrandedAppVariantB({ locale }: { locale: "en" | "ar" }) {
  return (
    <>
      <Clients />
      <div id="mobile-features" className="scroll-mt-28">
        <BrandedAppSpotlight locale={locale} />
        <BrandedAppGrid locale={locale} />
        <BrandedAppFAQ locale={locale} />
      </div>
    </>
  );
}

/**
 * Two alternating "feature spotlight" rows — a real product-screen mockup
 * beside a heading + body, reusing the same ServiceLog / OnlinePaymentCard
 * visuals already built for the Features/Products pages instead of drawing
 * new illustrative graphics just for this variant.
 */
function BrandedAppSpotlight({ locale }: { locale: "en" | "ar" }) {
  const rows: { Visual: () => JSX.Element; title: string; body: string }[] =
    locale === "ar"
      ? [
          {
            Visual: ServiceLog,
            title: "طلبات الخدمة، دون أي مكالمة",
            body: "يقدّم المقيمون طلبات الصيانة ويتابعون حالتها لحظة بلحظة، من داخل التطبيق مباشرة.",
          },
          {
            Visual: OnlinePaymentCard,
            title: "الدفع، من هاتفهم مباشرة",
            body: "رسوم الخدمة والمدفوعات وكشوف الحساب — كل ذلك داخل التطبيق، دون بوابة منفصلة.",
          },
        ]
      : [
          {
            Visual: ServiceLog,
            title: "Service requests, without the phone call",
            body: "Residents submit maintenance requests and track status in real time, right from the app.",
          },
          {
            Visual: OnlinePaymentCard,
            title: "Payments, straight from their phone",
            body: "Service charges, fees and statements — all in the app, no separate portal to log into.",
          },
        ];

  return (
    <section className="bg-white py-14 dark:bg-secondary-darker lg:py-20">
      <div className={wrap}>
        <div className="space-y-10 lg:space-y-14">
          {rows.map((r, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={i} delay={i * 80}>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className={flip ? "lg:order-2" : ""}>
                    <r.Visual />
                  </div>
                  <div className={flip ? "lg:order-1" : ""}>
                    <h3 className="text-xl font-medium text-ink dark:text-white lg:text-2xl">{r.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-soft dark:text-white/70">{r.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Compact 2x2 recap of all 4 feature points, reusing the exact same data as Layout 1's MobileFeatureShowcase via getMobileFeatures. */
function BrandedAppGrid({ locale }: { locale: "en" | "ar" }) {
  const features = getMobileFeatures(locale);

  return (
    <section className={sectionPad}>
      <div className={wrap}>
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-medium text-ink dark:text-white sm:text-3xl">
            {locale === "ar" ? "مبني لفِرَق إدارة العقارات ومقيميهم" : "Built for property teams and residents alike"}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="h-full rounded-2xl border border-grey-100 bg-grey-100/40 p-6 dark:border-white/10 dark:bg-white/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                  <f.Icon size={20} />
                </span>
                <h3 className="mt-4 font-medium text-ink dark:text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft dark:text-white/70">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Small local FAQ accordion with app-specific questions — deliberately not
 * the sitewide <FAQ> component, since that one carries the general Atar FAQ
 * content plus its own "Still have questions" links, neither of which fit
 * this page. Same open/close + Plus/Minus interaction pattern, though.
 */
function BrandedAppFAQ({ locale }: { locale: "en" | "ar" }) {
  const [open, setOpen] = useState<number | null>(0);
  const items: { q: string; a: string }[] =
    locale === "ar"
      ? [
          {
            q: "هل يحتاج المقيمون إلى حساب جديد؟",
            a: "لا — يسجّلون الدخول بنفس بياناتهم الحالية، والتطبيق فقط يحمل علامتك التجارية.",
          },
          {
            q: "هل يعمل التطبيق على iOS وAndroid؟",
            a: "نعم، تطبيق واحد يعمل على الجهازين حتى يستخدمه كل مقيم بغض النظر عن هاتفه.",
          },
          {
            q: "هل يمكن الدفع وتقديم طلبات الخدمة من داخل التطبيق؟",
            a: "نعم — المدفوعات وكشوف الحساب وطلبات الخدمة متوفرة داخل التطبيق منذ اليوم الأول.",
          },
          {
            q: "كم يستغرق إعداد العلامة التجارية الخاصة بنا؟",
            a: "أرسل لنا شعارك وألوانك، ونتولى الباقي حتى إعداد قائمتك في متجر التطبيقات.",
          },
        ]
      : [
          {
            q: "Do residents need to create a new account?",
            a: "No — they sign in with the same details you already give them; the app just carries your brand.",
          },
          {
            q: "Does it work on both iPhone and Android?",
            a: "Yes, one app built for both, so every resident can use it regardless of their phone.",
          },
          {
            q: "Can residents pay and submit requests from the app?",
            a: "Yes — in-app payments, statements and service requests are all built in from day one.",
          },
          {
            q: "How long does branding take to set up?",
            a: "Send your logo and colors — we handle the rest, including your app store listing.",
          },
        ];

  return (
    <section className="bg-[#F6F7F8] py-14 dark:bg-white/5 lg:py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal>
          <h2 className="text-center text-2xl font-medium text-ink dark:text-white sm:text-3xl">
            {locale === "ar" ? "أسئلة شائعة" : "Got questions? We've got answers"}
          </h2>
        </Reveal>

        <div className="mt-8 space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `mobile-faq-panel-${i}`;
            const btnId = `mobile-faq-btn-${i}`;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-grey-200 bg-white dark:border-white/10 dark:bg-secondary-darker"
              >
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
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="px-5 pb-4 leading-relaxed text-ink-soft dark:text-white/70"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Small inline WhatsApp glyph — same path used for the footer's social icon, kept local here since this is the only other spot on the site that needs it as a standalone contact affordance. */
function WhatsAppGlyph({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.01 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.43 1.27 4.87L2 22l5.28-1.24A9.96 9.96 0 0 0 12.01 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.2a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.83.84-3.05-.2-.31A8.2 8.2 0 1 1 20.2 12a8.2 8.2 0 0 1-8.19 8.2zm4.51-6.13c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.15.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

/**
 * Listing Website add-on's hero visual — the client-provided screenshot of
 * the actual marketplace site (browser-window mockup with the real hero +
 * "Explore our communities" search/filter/cards), replacing the earlier
 * hand-drawn placeholder mockup now that a real screenshot is available. The
 * competitive UX audit (DoorLoop, TenantCloud, Wasalt, Property Finder SA)
 * found this page had zero visual proof a listing website exists at all,
 * unlike every competitor's own feature page — this closes that gap with the
 * real thing instead of a mockup.
 */
function ListingWebsiteShowcase({ locale }: { locale: "en" | "ar" }) {
  return (
    <div className="mx-auto mt-4 max-w-5xl px-5 pb-10 lg:mt-6 lg:px-8 lg:pb-14">
      {/* Same card treatment as the Home hero's dashboard screenshot
          (components/Hero.tsx) — overflow-hidden rounded-2xl bg-white, same
          shadow color/opacity — but centered (no y-offset) so it reads
          evenly on all four sides, including the bottom, instead of only
          below like Home's directional version. The pb-10/lg:pb-14 above
          is load-bearing: without it the shadow was rendered correctly but
          immediately painted over by the next (opaque) section, since the
          hero section ended right at the image's edge with no gap for the
          shadow to actually be visible in. */}
      <Reveal delay={150} className="overflow-hidden rounded-2xl bg-white shadow-[0_0_50px_-12px_rgba(8,15,26,0.25)]">
        <img
          src={listingWebsiteMockup}
          alt={
            locale === "ar"
              ? "لقطة شاشة لموقع الإعلانات الفعلي — الصفحة الرئيسية وقسم استكشاف المجتمعات"
              : "Screenshot of the actual listing website — homepage and Explore Communities section"
          }
          className="block w-full"
        />
      </Reveal>
    </div>
  );
}

/**
 * Concrete, competitor-informed feature grid — replaces the old generic
 * 4-item checklist (sync / lead capture / own domain / bilingual) with
 * specifics buyers actually compare across listing sites, per the
 * competitive UX audit (Wasalt, Property Finder SA both sell on exactly
 * these kinds of specifics rather than generic claims).
 */
function ListingWebsiteFeatureGrid({ locale }: { locale: "en" | "ar" }) {
  const features: { Icon: (p: { size?: number }) => JSX.Element; title: string; body: string }[] = [
    {
      Icon: (p) => <WhatsAppGlyph size={p.size ?? 20} />,
      title: locale === "ar" ? "واتساب واتصال على كل إعلان" : "WhatsApp & Call on every listing",
      body:
        locale === "ar"
          ? "يتواصل المهتم معك مباشرة من بطاقة الإعلان، دون نموذج تواصل بطيء."
          : "A buyer can reach you straight from the listing card — no slow contact form in between.",
    },
    {
      Icon: (p) => <Riyal size={p.size ?? 20} />,
      title: locale === "ar" ? "السعر ظاهر منذ البداية" : "Price shown up front",
      body:
        locale === "ar"
          ? "السعر ظاهر على كل بطاقة، مع تفصيل الرسوم والضريبة في صفحة الوحدة."
          : "Every card shows the price, with the full fee and tax breakdown on the unit page.",
    },
    {
      Icon: (p) => <GridIcon size={p.size ?? 20} />,
      title: locale === "ar" ? "معرض صور كامل لكل وحدة" : "Full photo gallery per unit",
      body:
        locale === "ar"
          ? "عدة صور لكل وحدة بدل صورة واحدة، لثقة أكبر قبل التواصل."
          : "Multiple photos per unit instead of a single image, so buyers trust it before they call.",
    },
    {
      Icon: (p) => <Search size={p.size ?? 20} />,
      title: locale === "ar" ? "مهيّأ لمحركات البحث فعلياً" : "SEO-ready with real structured data",
      body:
        locale === "ar"
          ? "بيانات منظمة (schema.org) على كل صفحة إعلان، لا مجرد وعد تسويقي."
          : "Real schema.org structured data on every listing page — not just a marketing claim.",
    },
    {
      Icon: (p) => <LinkIcon size={p.size ?? 20} />,
      title: locale === "ar" ? "نطاقك الخاص، مُستضاف بالكامل" : "Your own domain, fully hosted",
      body:
        locale === "ar"
          ? "الموقع يحمل علامتك ونطاقك، وليس علامة أتار."
          : "The site carries your brand and your domain — not Atar's.",
    },
    {
      Icon: (p) => <Globe size={p.size ?? 20} />,
      title: locale === "ar" ? "عربي وإنجليزي جاهزان مباشرة" : "Arabic and English out of the box",
      body:
        locale === "ar"
          ? "كل إعلان جاهز باللغتين دون عمل إضافي."
          : "Every listing is ready in both languages with no extra work.",
    },
  ];

  return (
    <section className={sectionPad}>
      <div className={wrap}>
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-medium text-ink dark:text-white sm:text-3xl">
            {locale === "ar" ? "كل ما يقارنه المشتري بين المواقع" : "Everything a buyer compares between listing sites"}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="h-full rounded-2xl border border-grey-100 bg-grey-100/40 p-6 dark:border-white/10 dark:bg-white/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                  <f.Icon size={20} />
                </span>
                <h3 className="mt-4 font-medium text-ink dark:text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft dark:text-white/70">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Small local FAQ accordion for the Listing Website add-on — same
 * open/close + Plus/Minus pattern as BrandedAppFAQ, not the sitewide <FAQ>
 * component, since that one carries unrelated general content.
 */
function ListingWebsiteFAQ({ locale }: { locale: "en" | "ar" }) {
  const [open, setOpen] = useState<number | null>(0);
  const items: { q: string; a: string }[] =
    locale === "ar"
      ? [
          {
            q: "كم يستغرق ظهور إعلان جديد على الموقع؟",
            a: "يتزامن تلقائياً من أتار خلال دقائق من حفظه — لا حاجة لإعادة إدخاله يدوياً.",
          },
          {
            q: "هل يمكنني استخدام نطاقي الخاص؟",
            a: "نعم، الموقع مُستضاف بالكامل تحت نطاقك وعلامتك التجارية.",
          },
          {
            q: "هل يغني هذا عن النشر على منصات أخرى مثل عقار أو وصلت؟",
            a: "لا يحل محلها بالضرورة — إنه موقعك الخاص المتحكم فيه بالكامل، إلى جانب أي منصة أخرى تنشر عليها.",
          },
          {
            q: "هل الموقع متوافق مع الجوال؟",
            a: "نعم، كل صفحة مصممة لتعمل بسلاسة على الجوال أولاً.",
          },
          {
            q: "ماذا عن تهيئة محركات البحث؟",
            a: "كل صفحة إعلان تحمل بيانات منظمة (schema.org) وتُبنى بسرعة تحميل عالية بالعربية والإنجليزية.",
          },
        ]
      : [
          {
            q: "How fast does a new listing appear on the site?",
            a: "It syncs automatically from Atar within minutes of being saved — no manual re-entry.",
          },
          {
            q: "Can I use my own domain?",
            a: "Yes, the site is fully hosted under your own domain and brand.",
          },
          {
            q: "Does this replace posting to other portals like Aqar or Wasalt?",
            a: "Not necessarily — it's your own fully-controlled site, alongside whatever other portals you already use.",
          },
          {
            q: "Is the site mobile-friendly?",
            a: "Yes, every page is built mobile-first from the ground up.",
          },
          {
            q: "What about SEO?",
            a: "Every listing page carries real schema.org structured data and loads fast in both Arabic and English.",
          },
        ];

  return (
    <section className="bg-[#F6F7F8] py-14 dark:bg-white/5 lg:py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal>
          <h2 className="text-center text-2xl font-medium text-ink dark:text-white sm:text-3xl">
            {locale === "ar" ? "أسئلة شائعة" : "Got questions? We've got answers"}
          </h2>
        </Reveal>

        <div className="mt-8 space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `listing-faq-panel-${i}`;
            const btnId = `listing-faq-btn-${i}`;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-grey-200 bg-white dark:border-white/10 dark:bg-secondary-darker"
              >
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
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="px-5 pb-4 leading-relaxed text-ink-soft dark:text-white/70"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
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
        {section.heading && (
          <Reveal>
            <div className="mx-auto mb-10 max-w-2xl text-center">
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
                  <h3 className="mt-3 text-2xl font-medium tracking-tight text-ink dark:text-white lg:text-3xl">
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
            <h2 className="mb-10 text-center text-2xl font-medium tracking-tight text-ink dark:text-white sm:text-3xl">
              {pick(section.heading, locale)}
            </h2>
          </Reveal>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((n, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className="h-full">
              {/* Static preview card — the full story lives at its own page
                  (see BlogPostPage.tsx), so "View Details" is a real link
                  rather than an in-card expand. */}
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-grey-100 bg-white shadow-card dark:border-white/10 dark:bg-white/5">
                <div className="flex aspect-[16/9] shrink-0 items-center justify-center bg-gradient-to-br from-secondary to-primary">
                  <Logo light className="h-9 w-auto opacity-90" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">{formatDate(n.date)}</p>
                  <p className="mt-2 font-medium leading-snug text-ink dark:text-white">{pick(n.title, locale)}</p>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft dark:text-white/70">
                    {pick(n.body, locale)}
                  </p>
                  <Link
                    to={`/resources/blog/${n.slug}`}
                    className="mt-4 inline-flex items-center justify-center gap-2 self-start rounded-xl border border-grey-200 px-4 py-2.5 text-sm font-medium text-ink transition-all duration-150 hover:border-primary hover:text-primary active:bg-grey-50 motion-safe:active:scale-95 dark:border-white/15 dark:text-white dark:active:bg-white/5"
                  >
                    <span>{locale === "ar" ? "عرض التفاصيل" : "View Details"}</span>
                    <ArrowRight size={15} />
                  </Link>
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
