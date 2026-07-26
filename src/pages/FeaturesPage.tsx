import { useEffect } from "react";
import { useLocale } from "../i18n/LocaleContext";
import Reveal from "../components/ui/Reveal";
import { Check } from "../components/ui/Icon";
import CTA from "../components/CTA";

type LStr = { en: string; ar: string };

const pick = (str: LStr, locale: string) => (locale === "ar" ? str.ar : str.en);

const featureSections = [
  {
    id: "financial",
    eyebrow: { en: "Smart Finances", ar: "التمويل الذكي" },
    title: { en: "Reduce Late Payments by 40%", ar: "قلل الدفعات المتأخرة بنسبة 40٪" },
    subtitle: { en: "Automate collections, maximize cash flow, stay compliant", ar: "أتمتة التحصيل وتعظيم تدفق النقد والامتثال" },
    benefits: [
      { en: "Automated rent collection with local payment gateways", ar: "تحصيل الإيجارات الآلي مع بوابات الدفع المحلية" },
      { en: "Real-time payment reconciliation & VAT compliance", ar: "المصالحة الفورية والامتثال لضريبة القيمة المضافة" },
      { en: "Late payment escalation & dunning management", ar: "تصعيد الدفعات المتأخرة وإدارة المتابعة" },
      { en: "ZAKAT, tax, and withholding calculations", ar: "حسابات الزكاة والضريبة والاستقطاع" },
    ],
  },
  {
    id: "service",
    eyebrow: { en: "Tenant Experience", ar: "تجربة المستأجر" },
    title: { en: "Resolve Issues 3x Faster", ar: "حل المشاكل أسرع 3 مرات" },
    subtitle: { en: "Keep tenants happy, maintenance streamlined, costs controlled", ar: "اسعد المستأجرين والصيانة مبسطة والتكاليف محكومة" },
    benefits: [
      { en: "Mobile app for instant maintenance requests with photos", ar: "تطبيق جوال لطلبات الصيانة الفورية مع الصور" },
      { en: "AI-powered cost estimation before work begins", ar: "تقدير التكاليف المدعوم بالذكاء الاصطناعي" },
      { en: "Real-time task dispatch to contractors", ar: "توزيع المهام الفوري على المقاولين" },
      { en: "Predictive maintenance to prevent breakdowns", ar: "الصيانة الاستباقية لمنع الأعطال" },
    ],
  },
  {
    id: "property",
    eyebrow: { en: "Portfolio Control", ar: "تحكم المحفظة" },
    title: { en: "Manage 1 Property or 10,000", ar: "أدِر عقار أو 10,000" },
    subtitle: { en: "Centralized operations, instant insights, zero spreadsheets", ar: "عمليات مركزية ورؤى فورية بدون جداول" },
    benefits: [
      { en: "Unified tenant database with complete payment history", ar: "قاعدة بيانات موحدة مع السجل المالي الكامل" },
      { en: "Automated lease renewals & compliance tracking", ar: "تجديد العقود الآلي وتتبع الامتثال" },
      { en: "Revenue analytics by property, district & asset class", ar: "تحليلات الإيرادات حسب الملكية والمنطقة والنوع" },
      { en: "Occupancy forecasting & dynamic pricing optimization", ar: "التنبؤ بالإشغال وتحسين التسعير الديناميكي" },
    ],
  },
  {
    id: "ai",
    eyebrow: { en: "AI & Automation", ar: "الذكاء الاصطناعي والأتمتة" },
    title: { en: "Let AI Handle Routine Work", ar: "دع الذكاء الاصطناعي يتولى العمل الروتيني" },
    subtitle: { en: "Smart automation means more time for strategy", ar: "الأتمتة الذكية تعني وقتاً أكثر للإستراتيجية" },
    benefits: [
      { en: "AI tenant screening with 99.2% accuracy", ar: "فحص المستأجرين بدقة 99.2٪" },
      { en: "Automatic expense categorization & coding", ar: "تصنيف المصروفات التلقائي والترميز" },
      { en: "Predictive analytics for maintenance & vacancy", ar: "التحليلات التنبئية للصيانة والشغور" },
      { en: "Smart chatbot for tenant communication", ar: "روبوت محادثة ذكي للتواصل مع المستأجرين" },
    ],
  },
  {
    id: "compliance",
    eyebrow: { en: "Governance", ar: "الحوكمة" },
    title: { en: "Built for Saudi Arabia", ar: "مصمم للمملكة العربية السعودية" },
    subtitle: { en: "RERA-compliant, VAT-ready, audit-proof", ar: "متوافق مع ريرا وجاهز للضريبة وآمن للتدقيق" },
    benefits: [
      { en: "RERA regulation compliance & transaction logging", ar: "امتثال تنظيم ريرا وتسجيل المعاملات" },
      { en: "Automatic VAT calculation & ZATCA reporting", ar: "حساب ضريبة القيمة المضافة التلقائي وتقرير زاتكا" },
      { en: "Complete audit trail with immutable logs", ar: "سجل تدقيق كامل مع سجلات ثابتة" },
      { en: "Withholding tax & ZAKAT automation", ar: "أتمتة ضريبة الاستقطاع والزكاة" },
    ],
  },
  {
    id: "integrations",
    eyebrow: { en: "Ecosystem", ar: "النظام البيئي" },
    title: { en: "Connect Your Entire Tech Stack", ar: "قم بربط مجموعة التكنولوجيا بالكاملة" },
    subtitle: { en: "Payments, banking, accounting—all in one place", ar: "المدفوعات والخدمات المصرفية والمحاسبة في مكان واحد" },
    benefits: [
      { en: "Payment gateway integration (Telr, PayTabs, 2Checkout)", ar: "تكامل بوابة الدفع (تلر وباي تابز وغيرها)" },
      { en: "Direct bank connections with auto-reconciliation", ar: "اتصالات بنكية مباشرة مع المصالحة التلقائية" },
      { en: "Accounting software sync (QuickBooks, FreshBooks)", ar: "مزامنة برنامج المحاسبة" },
      { en: "CRM & property listing platform integrations", ar: "تكامل CRM وأنظمة الإدراج العقاري" },
    ],
  },
];

const roles = [
  { title: { en: "Property Owners", ar: "مالكو العقارات" }, desc: { en: "Maximize income, see performance, reduce vacancy", ar: "زيادة الدخل ورؤية الأداء وتقليل الشغور" } },
  { title: { en: "Managers", ar: "المديرون" }, desc: { en: "Streamline ops, reduce admin by 60%, scale easily", ar: "تبسيط العمليات وتقليل الإدارة بنسبة 60٪" } },
  { title: { en: "Tenants", ar: "المستأجرون" }, desc: { en: "Fast requests, instant resolutions, full transparency", ar: "طلبات سريعة وحلول فورية وشفافية كاملة" } },
  { title: { en: "Accountants", ar: "المحاسبون" }, desc: { en: "Auto-categorized data, audit-ready reports, zero errors", ar: "بيانات مصنفة تلقائياً وتقارير جاهزة للتدقيق" } },
];

export default function FeaturesPage() {
  const { locale } = useLocale();

  useEffect(() => {
    const prev = document.title;
    document.title = "Features — ATAR";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero-bg border-b border-grey-100" aria-labelledby="features-title">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Enterprise Features</p>
            <h1 id="features-title" className="mt-3 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              Everything to Scale Your Real Estate Business
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Financial automation, AI-powered insights, compliance, and integrations—all built for Saudi Arabia's property market.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Feature sections */}
      {featureSections.map((section, idx) => {
        const bgClasses = ["bg-white", "bg-grey-50", "bg-grey-100/40", "bg-white", "bg-grey-50", "bg-grey-100/40"];
        return (
          <section
            key={section.id}
            className={`py-16 lg:py-20 ${bgClasses[idx]}`}
            aria-labelledby={`feature-${section.id}`}
          >
            <div className="mx-auto max-w-5xl px-5 lg:px-8">
              {/* Section header */}
              <Reveal delay={idx * 100}>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  {pick(section.eyebrow, locale)}
                </p>
                <h2 id={`feature-${section.id}`} className="mt-3 text-3xl font-medium text-ink lg:text-4xl">
                  {pick(section.title, locale)}
                </h2>
                <p className="mt-3 text-lg font-medium text-primary">
                  {pick(section.subtitle, locale)}
                </p>
              </Reveal>

              {/* Benefits grid */}
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {section.benefits.map((benefit, benefitIdx) => (
                  <Reveal key={benefitIdx} delay={(idx * 100) + (benefitIdx * 40)}>
                    <div className="flex items-start gap-3 rounded-xl border border-grey-100 bg-white p-4 shadow-card hover:shadow-lift transition-shadow">
                      <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-lighter text-primary">
                        <Check size={14} />
                      </div>
                      <p className="text-sm leading-relaxed text-ink-soft">{pick(benefit, locale)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Roles section */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="roles-title">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal className="text-center">
            <h2 id="roles-title" className="text-3xl font-medium text-ink lg:text-4xl">
              Built for Every Role
            </h2>
            <p className="mt-3 text-lg text-ink-soft">
              Whether you own properties or manage them, ATAR adapts to your needs.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role, idx) => (
              <Reveal key={idx} delay={idx * 75}>
                <div className="rounded-2xl border border-grey-100 bg-gradient-to-b from-grey-50 to-white p-6 shadow-card hover:shadow-lift transition-shadow">
                  <h3 className="text-lg font-semibold text-ink">{pick(role.title, locale)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pick(role.desc, locale)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof section */}
      <section className="bg-grey-50 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Trusted by Leaders</p>
            <h2 className="mt-3 text-2xl font-medium text-ink lg:text-3xl">
              1,000+ property professionals use ATAR daily
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              From small landlords to enterprise portfolios managing 10,000+ units.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { metric: "25K+", label: { en: "Units Managed", ar: "وحدة مدارة" } },
              { metric: "5B+", label: { en: "Assets Managed", ar: "أصول مدارة" } },
              { metric: "99.9%", label: { en: "Uptime SLA", ar: "التوفر" } },
            ].map((stat, idx) => (
              <Reveal key={idx} delay={idx * 75}>
                <div className="rounded-2xl border border-grey-100 bg-white p-6 shadow-card hover:shadow-lift transition-shadow">
                  <p className="text-3xl font-semibold text-primary">{stat.metric}</p>
                  <p className="mt-2 text-sm text-ink-soft">{pick(stat.label, locale)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  );
}
