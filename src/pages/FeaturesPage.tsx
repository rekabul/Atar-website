import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLocale } from "../i18n/LocaleContext";
import Reveal from "../components/ui/Reveal";
import StaggerReveal from "../components/ui/StaggerReveal";
import { ArrowRight, RefreshIcon } from "../components/ui/Icon";
import { prefersReducedMotion } from "../hooks/useInView";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type LStr = { en: string; ar: string };

const pick = (str: LStr, locale: string) => (locale === "ar" ? str.ar : str.en);

/**
 * Platform lifecycle + module map — mixes two pages of the company profile:
 * page 6's continuous 8-stage lifecycle (with which suite covers which
 * stage) and page 11's 20+ module breadth, grouped by Sell/Lease/Operate/
 * Shared. Modules render as a chip cloud per category rather than the
 * icon-tile picker style of a typical "app launcher" reference, since a
 * plain wrapped list scans faster for 27 short names than a grid of large
 * icon tiles would.
 */
const lifecycleStages: { n: string; label: LStr }[] = [
  { n: "01", label: { en: "List & market", ar: "الإدراج والتسويق" } },
  { n: "02", label: { en: "Attract & qualify", ar: "الاستقطاب والتأهيل" } },
  { n: "03", label: { en: "Sell or lease", ar: "البيع أو التأجير" } },
  { n: "04", label: { en: "Contract & collect", ar: "التعاقد والتحصيل" } },
  { n: "05", label: { en: "Handover & onboard", ar: "التسليم والإدراج" } },
  { n: "06", label: { en: "Operate & maintain", ar: "التشغيل والصيانة" } },
  { n: "07", label: { en: "Engage & serve", ar: "التفاعل والخدمة" } },
  { n: "08", label: { en: "Renew & re-market", ar: "التجديد وإعادة التسويق" } },
];

type SuiteColor = "primary" | "secondary" | "success";

/** [start, end) 1-indexed grid-column ranges into the 8-stage row above. */
const suiteCoverage: { name: LStr; color: SuiteColor; segments: [number, number][] }[] = [
  { name: { en: "Sales Suite", ar: "حزمة المبيعات" }, color: "primary", segments: [[1, 5], [8, 9]] },
  { name: { en: "Leasing Suite", ar: "حزمة التأجير" }, color: "secondary", segments: [[1, 5], [8, 9]] },
  { name: { en: "Operations Suite", ar: "حزمة العمليات" }, color: "success", segments: [[5, 9]] },
];

const suiteBarClasses: Record<SuiteColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary dark:bg-white/70",
  success: "bg-success",
};

const suiteTextClasses: Record<SuiteColor, string> = {
  primary: "text-primary dark:text-primary-light",
  secondary: "text-secondary dark:text-white",
  success: "text-success",
};

type ModuleColor = SuiteColor | "neutral";

const moduleCategories: { name: LStr; color: ModuleColor; items: LStr[] }[] = [
  {
    name: { en: "Sell", ar: "البيع" },
    color: "primary",
    items: [
      { en: "CRM", ar: "إدارة علاقات العملاء" },
      { en: "Listings", ar: "الإعلانات" },
      { en: "Listing website", ar: "موقع الإعلانات" },
      { en: "Property viewings", ar: "معاينات العقار" },
      { en: "Property bookings", ar: "حجوزات العقار" },
      { en: "Sales contracts", ar: "عقود البيع" },
      { en: "Nafath eSign", ar: "التوقيع عبر نفاذ" },
    ],
  },
  {
    name: { en: "Lease", ar: "التأجير" },
    color: "secondary",
    items: [
      { en: "CRM", ar: "إدارة علاقات العملاء" },
      { en: "Listings", ar: "الإعلانات" },
      { en: "Listing website", ar: "موقع الإعلانات" },
      { en: "Property viewings", ar: "معاينات العقار" },
      { en: "Applications", ar: "الطلبات" },
      { en: "Quotes", ar: "عروض الأسعار" },
      { en: "Contracts", ar: "العقود" },
    ],
  },
  {
    name: { en: "Operate", ar: "التشغيل" },
    color: "success",
    items: [
      { en: "Maintenance", ar: "الصيانة" },
      { en: "Facility management", ar: "إدارة المرافق" },
      { en: "Visitor management", ar: "إدارة الزوار" },
      { en: "Space bookings", ar: "حجوزات المساحات" },
      { en: "News", ar: "الأخبار" },
      { en: "Events", ar: "الفعاليات" },
      { en: "Surveys", ar: "الاستبيانات" },
      { en: "Suggestions", ar: "الاقتراحات" },
      { en: "Directory", ar: "الدليل" },
      { en: "Offers", ar: "العروض" },
    ],
  },
  {
    name: { en: "Shared", ar: "مشترك" },
    color: "neutral",
    items: [
      { en: "Portfolio management", ar: "إدارة المحفظة" },
      { en: "Finance", ar: "المالية" },
      { en: "Workflows", ar: "سير العمل" },
      { en: "Documents", ar: "المستندات" },
      { en: "Reporting", ar: "التقارير" },
      { en: "Mobile app", ar: "تطبيق الجوال" },
      { en: "Integrations", ar: "التكاملات" },
    ],
  },
];

const moduleColorClasses: Record<
  ModuleColor,
  { heading: string; underline: string; chipBg: string; chipBorder: string; span: string }
> = {
  primary: {
    heading: "text-primary dark:text-primary-light",
    underline: "bg-primary",
    chipBg: "bg-primary/5 dark:bg-primary/10",
    chipBorder: "border-primary/20 dark:border-primary/30",
    span: "",
  },
  secondary: {
    heading: "text-secondary dark:text-white",
    underline: "bg-secondary dark:bg-white/60",
    chipBg: "bg-secondary/5 dark:bg-white/5",
    chipBorder: "border-secondary/20 dark:border-white/15",
    span: "",
  },
  success: {
    heading: "text-success",
    underline: "bg-success",
    chipBg: "bg-success-light dark:bg-success/10",
    chipBorder: "border-success/25 dark:border-success/25",
    // Operate carries 10 modules vs 7 for the others — a wider card is a
    // functional fix (less cramped) as much as it is the grid-breaking
    // moment: not every card has to be the same size to feel systematic.
    span: "lg:col-span-2",
  },
  neutral: {
    heading: "text-ink-muted dark:text-white/60",
    underline: "bg-grey-600 dark:bg-white/30",
    chipBg: "bg-grey-50 dark:bg-white/5",
    chipBorder: "border-grey-200 dark:border-white/15",
    span: "",
  },
};

/** CTA button that pulls gently toward the cursor, then springs back on leave. */
function MagneticCta({ to, children }: { to: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - rect.left - rect.width / 2) * 0.25,
        y: (e.clientY - rect.top - rect.height / 2) * 0.35,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Link
      ref={ref}
      to={to}
      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white shadow-card transition-colors hover:bg-secondary"
    >
      {children}
    </Link>
  );
}

export default function FeaturesPage() {
  const { locale } = useLocale();
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const suiteBarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = "Features | Atar";
    return () => {
      document.title = prev;
    };
  }, []);

  // Hero headline — cinematic word-by-word reveal (skipped under reduced motion).
  useGSAP(
    () => {
      if (prefersReducedMotion() || !heroTitleRef.current) return;
      const split = new SplitText(heroTitleRef.current, { type: "words" });
      gsap.set(split.words, { opacity: 0, y: 60, rotateX: -40, transformOrigin: "top center" });
      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.035,
        duration: 0.8,
        ease: "power4.out",
        delay: 0.15,
      });
      return () => split.revert();
    },
    { scope: heroTitleRef }
  );

  // Suite-coverage bars — each segment draws in from its reading-direction start on scroll.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !suiteBarsRef.current) return;
      const bars = gsap.utils.toArray<HTMLElement>(".suite-bar", suiteBarsRef.current);
      if (!bars.length) return;
      gsap.set(bars, { scaleX: 0, transformOrigin: locale === "ar" ? "right center" : "left center" });
      ScrollTrigger.batch(bars, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { scaleX: 1, duration: 0.9, ease: "power3.out", stagger: 0.12 }),
      });
    },
    { scope: suiteBarsRef, dependencies: [locale] }
  );

  return (
    <>
      {/* Hero */}
      <section className="hero-bg" aria-labelledby="features-title">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary motion-safe:animate-pulse" />
              Enterprise Features
            </p>
            <h1
              ref={heroTitleRef}
              id="features-title"
              className="mt-3 text-4xl font-medium tracking-tight text-ink dark:text-white sm:text-5xl"
              style={{ perspective: 600 }}
            >
              Everything to Scale Your Real Estate Business
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft dark:text-white/70">
              Financial automation, AI-powered insights, compliance, and integrations, all built for Saudi Arabia's property market.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Platform lifecycle + module map — see the data block above this
          component for how this mixes company-profile pages 6 and 11. */}
      <section className="bg-white py-16 dark:bg-secondary-darker lg:py-24" aria-labelledby="lifecycle-title">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Platform Breadth</p>
            <h2 id="lifecycle-title" className="mt-3 text-3xl font-medium text-ink dark:text-white lg:text-4xl">
              {locale === "ar"
                ? "منصة واحدة عبر دورة حياة العقار بأكملها"
                : "One Platform Across the Entire Property Lifecycle"}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-ink-soft dark:text-white/70">
              {locale === "ar"
                ? "من الإدراج والتسويق إلى التجديد وإعادة التسويق - أكثر من 20 وحدة، ونموذج بيانات واحد متصل."
                : "From list & market to renew & re-market — 20+ modules, one connected data model."}
            </p>
          </Reveal>

          {/* Part A — the 8-stage lifecycle, with which suite covers which stage. */}
          <Reveal delay={80} className="mt-14 overflow-x-auto">
            <div className="mx-auto min-w-[860px]">
              <div className="mb-7 flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-grey-50 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-ink-muted dark:bg-white/5 dark:text-white/50">
                  <RefreshIcon size={13} className="motion-safe:animate-spin-slow" />
                  {locale === "ar" ? "دورة مستمرة" : "Continuous Cycle"}
                </span>
              </div>

              <div className="grid grid-cols-8 gap-2 text-center">
                {lifecycleStages.map((s) => (
                  <div key={s.n}>
                    <p className="text-xs font-semibold text-primary">{s.n}</p>
                    <p className="mt-1 text-xs font-medium leading-snug text-ink dark:text-white sm:text-sm">
                      {pick(s.label, locale)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative mt-4 h-px w-full bg-grey-200 dark:bg-white/15">
                <div className="absolute inset-0 grid grid-cols-8">
                  {lifecycleStages.map((s) => (
                    <div key={s.n} className="flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-grey-600 dark:bg-white/30" />
                    </div>
                  ))}
                </div>
              </div>

              <div ref={suiteBarsRef} className="mt-8 space-y-4">
                {suiteCoverage.map((suite) => (
                  <div key={suite.name.en} className="flex items-center gap-4">
                    <p className={`w-32 shrink-0 text-sm font-semibold ${suiteTextClasses[suite.color]}`}>
                      {pick(suite.name, locale)}
                    </p>
                    <div className="grid h-1.5 flex-1" style={{ gridTemplateColumns: "repeat(8, 1fr)" }}>
                      {suite.segments.map(([start, end], i) => (
                        <div
                          key={i}
                          className={`suite-bar h-1.5 rounded-full ${suiteBarClasses[suite.color]}`}
                          style={{ gridColumn: `${start} / ${end}` }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Part B — 20+ modules, grouped Sell / Lease / Operate / Shared, colour-matched to the suites above. */}
          <StaggerReveal className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" y={20}>
            {moduleCategories.map((cat) => {
              const c = moduleColorClasses[cat.color];
              return (
                <div
                  key={cat.name.en}
                  className={`h-full rounded-2xl border border-grey-100 bg-white p-6 shadow-card transition-shadow hover:shadow-lift dark:border-white/10 dark:bg-white/5 ${c.span}`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-wider ${c.heading}`}>
                    {pick(cat.name, locale)}
                  </p>
                  <div className={`mb-4 mt-2 h-0.5 w-8 rounded-full ${c.underline}`} />
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item.en}
                        className={`rounded-full border px-3 py-1 text-xs font-medium text-ink dark:text-white/80 ${c.chipBg} ${c.chipBorder}`}
                      >
                        {pick(item, locale)}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 dark:bg-secondary-darker lg:py-24" aria-label="Talk to us">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <div className="rounded-[28px] border border-grey-100 bg-[#F6F7F8] p-8 text-center dark:border-white/10 dark:bg-white/5 lg:p-10">
              <p className="leading-relaxed text-ink-soft dark:text-white/70">
                {locale === "ar"
                  ? "هل تحتاج إلى مزيد من المعلومات؟ احجز عرضاً توضيحياً لمعرفة المزيد"
                  : "Need more information? Book a demo to learn more"}
              </p>
              <MagneticCta to="/contact">
                <span>{locale === "ar" ? "احجز عرضاً توضيحياً" : "Book a Demo"}</span>
                <ArrowRight />
              </MagneticCta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
