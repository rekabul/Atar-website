import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import Reveal from "../components/ui/Reveal";
import { ArrowRight } from "../components/ui/Icon";

type LStr = { en: string; ar: string };

const featuresPageContent = {
  hero: {
    eyebrow: { en: "Complete platform", ar: "منصة شاملة" },
    title: {
      en: "Smart Features Built for Saudi Real Estate",
      ar: "مميزات ذكية مصممة لسوق العقارات السعودي",
    },
    subtitle: {
      en: "From financial management to tenant engagement, ATAR delivers every feature you need to scale your real estate business efficiently and profitably.",
      ar: "من الإدارة المالية إلى تفاعل المستأجرين، توفر أتار كل مميزة تحتاجها لتوسع أعمالك العقارية بكفاءة وربحية.",
    },
  } as const,
  sections: [
    {
      id: "financial",
      eyebrow: { en: "Financial Management", ar: "الإدارة المالية" },
      title: {
        en: "Complete Financial Control",
        ar: "تحكم مالي شامل",
      },
      subtitle: {
        en: "Manage every dirham with confidence and clarity",
        ar: "أدِر كل ريال بثقة ووضوح",
      },
      body: {
        en: "ATAR's financial management suite automates rent collection, tracks expenses, and generates detailed reports—all aligned with Saudi accounting standards. Whether you manage residential units or commercial properties, maintain accurate records and optimize cash flow across your entire portfolio.",
        ar: "توفر أتار مجموعة متكاملة لإدارة المالية تأتمتة تحصيل الإيجارات وتتبع المصروفات وإنشاء تقارير تفصيلية—كل ذلك متوافق مع المعايير المحاسبية السعودية. سواء كنت تدير وحدات سكنية أو عقارات تجارية، احتفظ بسجلات دقيقة وحسّن تدفق النقد عبر محفظتك الكاملة.",
      },
      features: [
        {
          title: { en: "Automated Rent Collection", ar: "تحصيل الإيجارات الآلي" },
          desc: {
            en: "Reduce late payments and manual follow-ups with automated invoicing and payment reminders integrated with local payment gateways.",
            ar: "قلل الدفعات المتأخرة والمتابعات اليدوية عبر الفوترة الآلية وتذكيرات الدفع المتكاملة مع بوابات الدفع المحلية.",
          },
        },
        {
          title: { en: "Expense Tracking", ar: "تتبع المصروفات" },
          desc: {
            en: "Categorize and monitor all property expenses in real time—maintenance, utilities, taxes, and insurance—for complete financial visibility.",
            ar: "صنّف ومراقبة جميع مصروفات العقار في الوقت الفعلي—الصيانة والمرافق والضرائب والتأمين—للحصول على رؤية مالية شاملة.",
          },
        },
        {
          title: { en: "Financial Reports", ar: "التقارير المالية" },
          desc: {
            en: "Generate quarterly and annual reports that comply with Saudi regulations and support your tax filings and investor meetings.",
            ar: "أنشئ تقارير ربع سنوية وسنوية متوافقة مع اللوائح السعودية وتدعم إقراراتك الضريبية واجتماعات المستثمرين.",
          },
        },
      ],
    },
    {
      id: "service",
      eyebrow: { en: "Service Management", ar: "إدارة الخدمات" },
      title: {
        en: "Tenant-First Maintenance",
        ar: "صيانة موجهة للمستأجر",
      },
      subtitle: {
        en: "Resolve issues faster, improve satisfaction",
        ar: "حل المشاكل بسرعة وحسّن الرضا",
      },
      body: {
        en: "Keep your properties in peak condition with ATAR's centralized service request system. Tenants submit maintenance requests through the mobile app, managers assign and prioritize tasks, and real-time tracking ensures nothing falls through the cracks. Reduce response times and boost tenant satisfaction.",
        ar: "احتفظ بعقاراتك في أفضل حالة باستخدام نظام طلبات الخدمة المركزي في أتار. يقدم المستأجرون طلبات الصيانة عبر تطبيق الهاتف، ويوزع المدراء المهام ويحددون الأولويات، والتتبع في الوقت الفعلي يضمن عدم ضياع أي شيء. قلل أوقات الاستجابة وحسّن رضا المستأجرين.",
      },
      features: [
        {
          title: { en: "Mobile Request Portal", ar: "بوابة الطلبات عبر الهاتف" },
          desc: {
            en: "Tenants file maintenance requests directly from the app with photos and descriptions. Instant notifications alert your team to urgent issues.",
            ar: "يقدم المستأجرون طلبات الصيانة مباشرة من التطبيق مع صور وأوصاف. إشعارات فورية تنبه فريقك للمشاكل العاجلة.",
          },
        },
        {
          title: { en: "Task Assignment & Dispatch", ar: "تعيين المهام والتوزيع" },
          desc: {
            en: "Route requests to maintenance contractors, track progress, and get real-time updates—all within the platform. No more scattered emails or phone calls.",
            ar: "وجّه الطلبات إلى متعهدي الصيانة واتبع التقدم واحصل على تحديثات فورية—كل شيء داخل المنصة. لا مزيد من رسائل البريد الإلكتروني أو المكالمات المشتتة.",
          },
        },
        {
          title: { en: "Cost Estimation & Invoicing", ar: "تقدير التكاليف والفوترة" },
          desc: {
            en: "Get instant cost estimates for repairs, approve before work begins, and auto-invoice tenants or insurance—ensuring accountability and compliance.",
            ar: "احصل على تقديرات تكاليف فورية للإصلاحات وأعط موافقة قبل بدء العمل وأنشئ فواتير آلية للمستأجرين أو التأمين.",
          },
        },
      ],
    },
    {
      id: "property",
      eyebrow: { en: "Property Management", ar: "إدارة العقارات" },
      title: {
        en: "Unified Portfolio Control",
        ar: "تحكم موحد بالمحفظة",
      },
      subtitle: {
        en: "Manage one unit or a thousand with ease",
        ar: "أدِر وحدة واحدة أو ألف بسهولة",
      },
      body: {
        en: "Scale from small landlords to large property developers—ATAR centralizes tenant data, lease agreements, payment histories, and property documents. Automated lease renewals, inspection schedules, and occupancy tracking keep you ahead of compliance and maximize revenue per property.",
        ar: "تدرّج من مالكي الأملاك الصغار إلى مطوري العقارات الكبار—تركّز أتار بيانات المستأجرين وعقود الإيجار والسجلات المالية والوثائق العقارية. يبقيك تجديد العقود الآلي وجداول التفتيش وتتبع الإشغال في الطليعة والامتثال وتعظيم الإيرادات لكل عقار.",
      },
      features: [
        {
          title: { en: "Centralized Tenant Database", ar: "قاعدة بيانات المستأجرين المركزية" },
          desc: {
            en: "Store all tenant information, lease terms, contact details, and communication history in one secure location. Instant lookups save time and reduce errors.",
            ar: "خزّن جميع معلومات المستأجرين وشروط العقد وبيانات الاتصال وسجل الاتصالات في مكان آمن واحد. البحث الفوري يوفر الوقت ويقلل الأخطاء.",
          },
        },
        {
          title: { en: "Lease Lifecycle Management", ar: "إدارة دورة العقد" },
          desc: {
            en: "Automate lease renewals, send reminders for expirations, track key dates, and maintain compliance with Saudi labor and tenancy laws.",
            ar: "أتمتة تجديد العقود وإرسال تذكيرات بانتهاء الصلاحيات وتتبع التواريخ الرئيسية والامتثال لقوانين العمل والإيجار السعودية.",
          },
        },
        {
          title: { en: "Occupancy & Revenue Insights", ar: "رؤى الإشغال والإيرادات" },
          desc: {
            en: "Track vacancy rates, rental income, and occupancy trends. Identify underperforming units and optimize pricing in real time based on market data.",
            ar: "تتبع معدلات الشغور والدخل الإيجاري واتجاهات الإشغال. حدد الوحدات التي تؤدي أداءً ضعيفاً وحسّن التسعير في الوقت الفعلي بناءً على بيانات السوق.",
          },
        },
      ],
    },
  ] as const,
  cta: {
    title: {
      en: "Ready to transform your real estate business?",
      ar: "هل أنت مستعد لتحويل عملك العقاري؟",
    },
    button: {
      en: "Start Free Trial",
      ar: "ابدأ التجربة المجانية",
    },
  } as const,
};

export default function FeaturesPage() {
  const { locale } = useLocale();

  useEffect(() => {
    const prev = document.title;
    document.title = "Features — ATAR";
    return () => {
      document.title = prev;
    };
  }, []);

  const pick = (str: LStr, loc: typeof locale) => (loc === "ar" ? str.ar : str.en);

  return (
    <>
      {/* Hero */}
      <section className="hero-bg border-b border-grey-100" aria-labelledby="features-title">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {pick(featuresPageContent.hero.eyebrow, locale)}
            </p>
            <h1 id="features-title" className="mt-3 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              {pick(featuresPageContent.hero.title, locale)}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
              {pick(featuresPageContent.hero.subtitle, locale)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Feature sections */}
      {featuresPageContent.sections.map((section, sectionIdx) => (
        <section
          key={section.id}
          className={`py-16 lg:py-20 ${sectionIdx % 2 === 0 ? "bg-white" : "bg-grey-50"}`}
          aria-labelledby={`feature-${section.id}`}
        >
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <Reveal delay={sectionIdx * 100}>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                {pick(section.eyebrow, locale)}
              </p>
              <h2 id={`feature-${section.id}`} className="mt-3 text-3xl font-medium text-ink lg:text-4xl">
                {pick(section.title, locale)}
              </h2>
              <p className="mt-2 text-lg text-primary font-medium">{pick(section.subtitle, locale)}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {pick(section.body, locale)}
              </p>
            </Reveal>

            {/* Feature items grid */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.features.map((feature, featureIdx) => (
                <Reveal key={featureIdx} delay={(sectionIdx * 100) + (featureIdx * 50)}>
                  <div className="rounded-2xl border border-grey-200 bg-white p-6 shadow-card hover:shadow-lift transition-shadow">
                    <h3 className="text-lg font-semibold text-ink">{pick(feature.title, locale)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {pick(feature.desc, locale)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-secondary-dark text-white" aria-labelledby="features-cta">
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-14 lg:flex-row lg:items-center lg:px-8 lg:py-16">
          <h2 id="features-cta" className="max-w-xl text-2xl font-medium lg:text-3xl">
            {pick(featuresPageContent.cta.title, locale)}
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-white hover:text-secondary"
          >
            <span>{pick(featuresPageContent.cta.button, locale)}</span>
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
