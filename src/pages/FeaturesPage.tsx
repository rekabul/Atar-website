import { useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLocale } from "../i18n/LocaleContext";
import Reveal from "../components/ui/Reveal";
import StaggerReveal from "../components/ui/StaggerReveal";
import {
  ArrowRight,
  Search,
  RentersIcon,
  RentListIcon,
  Globe,
  EyeIcon,
  CalendarIcon,
  LeaseIcon,
  EditIcon,
  ApplicationIcon,
  QuotePriceIcon,
  FacilityIcon,
  GridIcon,
  HandoverIcon,
  BellIcon,
  ClipboardIcon,
  valueIcons,
  BookOpenIcon,
  TagIcon,
  LayersIcon,
  Riyal,
  Share2Icon,
  FileTextIcon,
  BarChartIcon,
  SmartphoneIcon,
  LinkIcon,
} from "../components/ui/Icon";
import { prefersReducedMotion } from "../hooks/useInView";
import { type LStr, pick } from "../data/lifecycle";
import InteractiveLifecycleStrip from "../components/features/InteractiveLifecycleStrip";
// OrbitalLifecycleTimeline and CardStackLifecycle were two alternative takes on
// this same diagram, compared side by side via a variant switcher during
// review — Linear (InteractiveLifecycleStrip) is the one that shipped, so the
// switcher and the other two are gone. Their component files are still in
// ../components/features/ if either is needed again.

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Platform lifecycle + module map — mixes two pages of the company profile:
 * page 6's continuous 8-stage lifecycle (kept as a light strip for context)
 * and page 11's 20+ module breadth, now shown as a searchable, categorised
 * card directory modelled on zoho.com/all-products.html (category heading +
 * one-line description, then a grid of icon/name/description cards) rather
 * than AppFolio's partner-marketplace card-grid, which represents third-party
 * add-ons rather than first-party modules.
 *
 * The "Continuous Cycle" strip shows as a single static diagram (Linear) —
 * it previously had Orbital/Stack alternatives behind a review-only variant
 * switcher; both the switcher and the other two takes are gone now that
 * Linear is the one that shipped. It's also no longer clickable: it's a
 * decorative illustration of a continuous loop, not a step-by-step wizard,
 * so a click-to-expand affordance that didn't lead anywhere was more
 * confusing than helpful.
 */

type ModuleColor = "primary" | "secondary" | "success" | "neutral";
type IconType = (p: { size?: number; className?: string }) => ReactElement;

/**
 * Every module, grouped by suite — modelled on how Zoho's all-products
 * directory (zoho.com/all-products.html) represents a large catalogue: a
 * category heading with a one-line description, then a grid of cards, each
 * with its own icon, name, and a short plain-language description of what it
 * does. AppFolio's partner marketplace (appfolio.com/stack/marketplace) uses
 * a similar card-grid, but for third-party add-ons rather than first-party
 * modules — closer to what Atar's own Integrations page already covers, so
 * Zoho's pattern is the closer fit here.
 */
type Module = { en: string; ar: string; descEn: string; descAr: string; icon: IconType };

const m = (en: string, ar: string, descEn: string, descAr: string, icon: IconType): Module => ({
  en,
  ar,
  descEn,
  descAr,
  icon,
});

type Category = { name: LStr; desc: LStr; color: ModuleColor; items: Module[] };

const moduleCategories: Category[] = [
  {
    name: { en: "Sell", ar: "البيع" },
    desc: {
      en: "Everything to market, sell, and close a property.",
      ar: "كل ما تحتاجه لتسويق العقار وبيعه وإتمام الصفقة.",
    },
    color: "primary",
    items: [
      m(
        "CRM",
        "إدارة علاقات العملاء",
        "Track every lead from first contact to closed deal.",
        "تتبع كل عميل محتمل من أول تواصل حتى إتمام الصفقة.",
        RentersIcon
      ),
      m(
        "Listings",
        "الإعلانات",
        "Publish and manage property listings in one place.",
        "انشر وأدر إعلانات العقارات من مكان واحد.",
        RentListIcon
      ),
      m(
        "Listing website",
        "موقع الإعلانات",
        "A branded website that showcases your listings.",
        "موقع إلكتروني بعلامتك التجارية يعرض إعلاناتك.",
        Globe
      ),
      m(
        "Property viewings",
        "معاينات العقار",
        "Schedule and confirm viewings without the back-and-forth.",
        "جدولة وتأكيد المعاينات دون تبادل رسائل لا نهاية له.",
        EyeIcon
      ),
      m(
        "Property bookings",
        "حجوزات العقار",
        "Let buyers reserve a unit online, instantly.",
        "امنح المشترين إمكانية حجز الوحدة إلكترونياً وفوراً.",
        CalendarIcon
      ),
      m(
        "Sales contracts",
        "عقود البيع",
        "Generate and manage sale contracts digitally.",
        "أنشئ وأدر عقود البيع إلكترونياً.",
        LeaseIcon
      ),
      m(
        "Nafath eSign",
        "التوقيع عبر نفاذ",
        "Sign contracts securely with Nafath verification.",
        "وقّع العقود بأمان عبر التحقق من نفاذ.",
        EditIcon
      ),
    ],
  },
  {
    name: { en: "Lease", ar: "التأجير" },
    desc: {
      en: "Everything to market, lease, and onboard a renter.",
      ar: "كل ما تحتاجه لتسويق الوحدة وتأجيرها واستقبال المستأجر.",
    },
    color: "secondary",
    items: [
      m(
        "CRM",
        "إدارة علاقات العملاء",
        "Track every renter from inquiry to signed lease.",
        "تتبع كل مستأجر من الاستفسار حتى توقيع العقد.",
        RentersIcon
      ),
      m(
        "Listings",
        "الإعلانات",
        "Publish and manage rental listings in one place.",
        "انشر وأدر إعلانات الإيجار من مكان واحد.",
        RentListIcon
      ),
      m(
        "Listing website",
        "موقع الإعلانات",
        "A branded website that showcases your rentals.",
        "موقع إلكتروني بعلامتك التجارية يعرض وحداتك المؤجرة.",
        Globe
      ),
      m(
        "Property viewings",
        "معاينات العقار",
        "Schedule and confirm rental viewings without the back-and-forth.",
        "جدولة وتأكيد معاينات الإيجار دون تبادل رسائل لا نهاية له.",
        EyeIcon
      ),
      m(
        "Applications",
        "الطلبات",
        "Collect and review rental applications online.",
        "استقبل ودقق طلبات الإيجار إلكترونياً.",
        ApplicationIcon
      ),
      m(
        "Quotes",
        "عروض الأسعار",
        "Send rental price quotes in a few clicks.",
        "أرسل عروض أسعار الإيجار خلال نقرات قليلة.",
        QuotePriceIcon
      ),
      m(
        "Contracts",
        "العقود",
        "Generate and manage lease agreements digitally.",
        "أنشئ وأدر عقود الإيجار إلكترونياً.",
        LeaseIcon
      ),
    ],
  },
  {
    name: { en: "Operate", ar: "التشغيل" },
    desc: {
      en: "Everything to run day-to-day operations after handover.",
      ar: "كل ما تحتاجه لإدارة العمليات اليومية بعد التسليم.",
    },
    color: "success",
    items: [
      m(
        "Maintenance",
        "الصيانة",
        "Log, assign, and track maintenance requests to completion.",
        "سجّل طلبات الصيانة وأسندها وتابعها حتى الإنجاز.",
        FacilityIcon
      ),
      m(
        "Facility management",
        "إدارة المرافق",
        "Keep shared facilities running and well maintained.",
        "حافظ على تشغيل المرافق المشتركة وصيانتها.",
        GridIcon
      ),
      m(
        "Visitor management",
        "إدارة الزوار",
        "Approve and track visitor access to your properties.",
        "اعتمد وتتبع دخول الزوار إلى عقاراتك.",
        HandoverIcon
      ),
      m(
        "Space bookings",
        "حجوزات المساحات",
        "Let residents reserve shared spaces online.",
        "امنح السكان إمكانية حجز المساحات المشتركة إلكترونياً.",
        CalendarIcon
      ),
      m(
        "News",
        "الأخبار",
        "Share community updates and announcements.",
        "شارك أخبار المجتمع والإعلانات.",
        BellIcon
      ),
      m(
        "Events",
        "الفعاليات",
        "Plan and promote community events.",
        "خطط للفعاليات المجتمعية وروّج لها.",
        CalendarIcon
      ),
      m(
        "Surveys",
        "الاستبيانات",
        "Collect resident feedback with quick surveys.",
        "اجمع آراء السكان عبر استبيانات سريعة.",
        ClipboardIcon
      ),
      m(
        "Suggestions",
        "الاقتراحات",
        "Give residents a channel to suggest improvements.",
        "امنح السكان قناة لاقتراح التحسينات.",
        valueIcons.bulb as IconType
      ),
      m(
        "Directory",
        "الدليل",
        "A searchable directory of residents and units.",
        "دليل قابل للبحث للسكان والوحدات.",
        BookOpenIcon
      ),
      m(
        "Offers",
        "العروض",
        "Promote deals and offers to your community.",
        "روّج للعروض والصفقات لمجتمعك.",
        TagIcon
      ),
    ],
  },
  {
    name: { en: "Shared", ar: "مشترك" },
    desc: { en: "Runs underneath every suite, all the time.", ar: "يعمل أسفل كل حزمة، طوال الوقت." },
    color: "neutral",
    items: [
      m(
        "Portfolio management",
        "إدارة المحفظة",
        "See every property and unit in one portfolio view.",
        "اطّلع على جميع العقارات والوحدات في واجهة محفظة واحدة.",
        LayersIcon
      ),
      m(
        "Finance",
        "المالية",
        "Automate rent collection, invoicing, and reconciliation.",
        "أتمتة تحصيل الإيجارات والفوترة والتسوية المالية.",
        Riyal
      ),
      m(
        "Workflows",
        "سير العمل",
        "Automate repetitive tasks across every suite.",
        "أتمتة المهام المتكررة عبر جميع الحزم.",
        Share2Icon
      ),
      m(
        "Documents",
        "المستندات",
        "Store and organize every document in one place.",
        "خزّن ونظّم جميع المستندات في مكان واحد.",
        FileTextIcon
      ),
      m(
        "Reporting",
        "التقارير",
        "Real-time dashboards and reports on demand.",
        "لوحات معلومات وتقارير فورية عند الطلب.",
        BarChartIcon
      ),
      m("Mobile app", "تطبيق الجوال", "Manage your business from anywhere.", "أدر أعمالك من أي مكان.", SmartphoneIcon),
      m(
        "Integrations",
        "التكاملات",
        "Connect Atar with the tools you already use.",
        "اربط أتار بالأدوات التي تستخدمها بالفعل.",
        LinkIcon
      ),
    ],
  },
];

const categoryClasses: Record<ModuleColor, { heading: string; iconText: string }> = {
  primary: {
    heading: "text-primary dark:text-primary-light",
    iconText: "text-primary dark:text-primary-light",
  },
  secondary: {
    heading: "text-secondary dark:text-white",
    iconText: "text-secondary dark:text-white",
  },
  success: {
    heading: "text-success",
    iconText: "text-success",
  },
  neutral: {
    heading: "text-ink-muted dark:text-white/60",
    iconText: "text-ink-muted dark:text-white/70",
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

  const className =
    "mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white shadow-card transition-colors hover:bg-secondary";

  // External (e.g. the HubSpot demo-booking link) → plain anchor, new tab;
  // internal route → SPA navigation.
  if (/^https?:\/\//.test(to)) {
    return (
      <a ref={ref} href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link ref={ref} to={to} className={className}>
      {children}
    </Link>
  );
}

export default function FeaturesPage() {
  const { locale } = useLocale();
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visibleCategories = moduleCategories
    .map((cat) => ({
      ...cat,
      items: q ? cat.items.filter((i) => i.en.toLowerCase().includes(q) || i.ar.includes(query.trim())) : cat.items,
    }))
    .filter((cat) => cat.items.length > 0);

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

  const heroText = (
    <Reveal>
      <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary motion-safe:animate-pulse" />
        All Modules
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
  );

  return (
    <>
      <section className="hero-bg" aria-labelledby="features-title">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">{heroText}</div>
        </div>
      </section>

      {/* Continuous Cycle — page 6's 8-stage lifecycle, shown as a single
          static diagram (no variant switcher — see the file-header comment
          above for why, and no click-to-expand, since it's meant to
          illustrate a continuous loop rather than invite interaction). */}
      <section className="py-12 lg:py-16" aria-label="Continuous cycle">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mt-10">
            <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-muted dark:text-white/50">
              {locale === "ar" ? "الدورة المستمرة" : "Continuous Cycle"}
            </p>
            <InteractiveLifecycleStrip locale={locale} />
          </div>
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
                : "From list & market to renew & re-market: 20+ modules, one connected data model."}
            </p>
          </Reveal>

          {/* Search — same affordance as Zoho's "I'm looking for..." bar. */}
          <Reveal delay={100} className="mx-auto mt-8 max-w-md">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink-muted dark:text-white/40"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={locale === "ar" ? "ابحث عن وحدة..." : "Search modules..."}
                className="w-full rounded-xl border border-grey-200 bg-white py-3 ps-11 pe-4 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-white"
              />
            </div>
          </Reveal>

          {/* Module directory — one category per suite, each a heading +
              one-line description + a grid of icon/name/description cards. */}
          {visibleCategories.length === 0 ? (
            <p className="mt-14 text-center text-ink-soft dark:text-white/60">
              {locale === "ar" ? "لا توجد نتائج مطابقة" : "No modules match your search."}
            </p>
          ) : (
            visibleCategories.map((cat) => {
              const c = categoryClasses[cat.color];
              return (
                <div key={cat.name.en} className="mt-14">
                  <h3 className={`text-lg font-semibold ${c.heading}`}>{pick(cat.name, locale)}</h3>
                  <p className="mt-1 max-w-xl text-sm text-ink-soft dark:text-white/60">{pick(cat.desc, locale)}</p>
                  <StaggerReveal className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" y={16} stagger={0.06}>
                    {cat.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={item.en}
                          className="flex items-start gap-4 rounded-2xl border border-grey-100 bg-white p-5 shadow-card transition-shadow hover:shadow-lift dark:border-white/10 dark:bg-white/5"
                        >
                          <ItemIcon size={28} className={`mt-0.5 shrink-0 ${c.iconText}`} />
                          <div>
                            <p className="text-lg font-medium text-ink dark:text-white">{pick(item, locale)}</p>
                            <p className="mt-1 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                              {pick({ en: item.descEn, ar: item.descAr }, locale)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </StaggerReveal>
                </div>
              );
            })
          )}
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
              <MagneticCta to="https://meetings.hubspot.com/atar/demo-meeting">
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
