import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { integrations as integrationAssets } from "../data/assetsMap";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Reveal from "../components/ui/Reveal";
import StaggerReveal from "../components/ui/StaggerReveal";
import { ArrowRight } from "../components/ui/Icon";

type LStr = { en: string; ar: string };
const pick = (str: LStr, locale: string) => (locale === "ar" ? str.ar : str.en);
const L = (en: string, ar: string): LStr => ({ en, ar });

type Category =
  | "identity"
  | "payments"
  | "analytics"
  | "housing"
  | "automation"
  | "trust"
  | "enterprise"
  | "messaging";

const categories: { id: Category; label: LStr }[] = [
  { id: "identity", label: L("Identity & Compliance", "الهوية والامتثال") },
  { id: "payments", label: L("Payments", "المدفوعات") },
  { id: "analytics", label: L("Analytics & Reporting", "التحليلات والتقارير") },
  { id: "housing", label: L("Government & Housing", "الجهات الحكومية والإسكان") },
  { id: "automation", label: L("Automation", "الأتمتة") },
  { id: "trust", label: L("Trust & Verification", "الثقة والتحقق") },
  { id: "enterprise", label: L("Enterprise Systems", "أنظمة المؤسسات") },
  { id: "messaging", label: L("Engagement & Messaging", "التواصل والمراسلة") },
];

/** Real integration copy, keyed by the same `name` used in data/assetsMap.ts so the logo, brand color, and description always stay in sync. */
const integrationCopy: Record<string, { category: Category; description: LStr }> = {
  Nafath: {
    category: "identity",
    description: L(
      "Verify tenant, buyer, and owner identity in seconds with Saudi Arabia's national digital identity platform.",
      "تحقق من هوية المستأجر والمشتري والمالك خلال ثوانٍ عبر منصة الهوية الرقمية الوطنية نفاذ."
    ),
  },
  Edaat: {
    category: "payments",
    description: L(
      "Collect rent, sale, and service payments through the national payment network, reconciled automatically.",
      "حصّل مدفوعات الإيجار والبيع والخدمات عبر شبكة الدفع الوطنية، مع مطابقة تلقائية."
    ),
  },
  "Power BI": {
    category: "analytics",
    description: L(
      "Turn portfolio, financial, and occupancy data into custom dashboards and reports.",
      "حوّل بيانات المحفظة والماليات والإشغال إلى لوحات تحكم وتقارير مخصصة."
    ),
  },
  Sakani: {
    category: "housing",
    description: L(
      "Connect listings and eligible units with the Ministry of Housing's national housing program.",
      "اربط الإعلانات والوحدات المؤهلة ببرنامج سكني الوطني التابع لوزارة الإسكان."
    ),
  },
  Zapier: {
    category: "automation",
    description: L(
      "Automate workflows and connect Atar to thousands of other apps without writing code.",
      "أتمتة سير العمل وربط أتار بآلاف التطبيقات الأخرى دون كتابة أي كود."
    ),
  },
  Sadq: {
    category: "trust",
    description: L(
      "Add trusted regional verification to contracts and transactions as they move through Atar.",
      "أضف تحققاً إقليمياً موثوقاً للعقود والمعاملات أثناء انتقالها عبر أتار."
    ),
  },
  // Added from the Company Profile "Ecosystem" page (p.13).
  SADAD: {
    category: "payments",
    description: L(
      "Collect national bill payments, including bulk requests billed straight against project milestones.",
      "حصّل مدفوعات الفواتير الوطنية، بما في ذلك الطلبات المجمّعة التي تُفوتَر مباشرة مقابل مراحل المشروع."
    ),
  },
  ZATCA: {
    category: "identity",
    description: L(
      "Generate and clear Fatoora-compliant e-invoices automatically from every contract.",
      "أصدر فواتير إلكترونية متوافقة مع فاتورة (زاتكا) وقم بتصفيتها تلقائياً من كل عقد."
    ),
  },
  HyperPay: {
    category: "payments",
    description: L(
      "Accept card and digital payments from tenants, buyers, and owners with a regional payment gateway.",
      "اقبل مدفوعات البطاقات والمدفوعات الرقمية من المستأجرين والمشترين والملاك عبر بوابة دفع إقليمية."
    ),
  },
  Oracle: {
    category: "enterprise",
    description: L(
      "Sync financial and operational records with Oracle's enterprise resource planning suite.",
      "زامن السجلات المالية والتشغيلية مع مجموعة أوراكل لتخطيط موارد المؤسسات."
    ),
  },
  SAP: {
    category: "enterprise",
    description: L(
      "Connect Atar's property and financial data to an existing SAP deployment.",
      "اربط بيانات أتار العقارية والمالية بمنصة SAP القائمة لديك."
    ),
  },
  "Microsoft Dynamics 365": {
    category: "enterprise",
    description: L(
      "Keep customer, sales, and finance records aligned between Atar and Dynamics 365.",
      "حافظ على تناسق سجلات العملاء والمبيعات والمالية بين أتار وDynamics 365."
    ),
  },
  Odoo: {
    category: "enterprise",
    description: L(
      "Extend Atar's data into Odoo's broader suite of business applications.",
      "امتدّ ببيانات أتار إلى مجموعة تطبيقات أودو الأوسع لإدارة الأعمال."
    ),
  },
  Zoho: {
    category: "enterprise",
    description: L(
      "Push leads, deals, and contacts between Atar and the Zoho suite.",
      "انقل العملاء المحتملين والصفقات وجهات الاتصال بين أتار ومجموعة Zoho."
    ),
  },
  Salesforce: {
    category: "enterprise",
    description: L(
      "Sync leads, accounts, and deal stages with your existing Salesforce CRM.",
      "زامن العملاء المحتملين والحسابات ومراحل الصفقات مع نظام Salesforce الحالي لديك."
    ),
  },
  Unifonic: {
    category: "messaging",
    description: L(
      "Send SMS and OTP messages to tenants and owners through a regional messaging platform.",
      "أرسل رسائل SMS ورموز التحقق للمستأجرين والملاك عبر منصة مراسلة إقليمية."
    ),
  },
  Twilio: {
    category: "messaging",
    description: L(
      "Trigger SMS, voice, and WhatsApp notifications directly from Atar workflows.",
      "أطلق إشعارات SMS والصوت وواتساب مباشرة من سير عمل أتار."
    ),
  },
  SendGrid: {
    category: "messaging",
    description: L(
      "Deliver transactional emails, receipts, and statements reliably at scale.",
      "أرسل رسائل بريد إلكتروني معاملاتية وإيصالات وكشوف حساب بشكل موثوق وعلى نطاق واسع."
    ),
  },
  Meta: {
    category: "messaging",
    description: L(
      "Reach tenants and leads through Facebook and Instagram messaging and ads.",
      "تواصل مع المستأجرين والعملاء المحتملين عبر رسائل وإعلانات فيسبوك وإنستغرام."
    ),
  },
  WhatsApp: {
    category: "messaging",
    description: L(
      "Send maintenance updates, payment reminders, and confirmations where tenants already are.",
      "أرسل تحديثات الصيانة وتذكيرات الدفع والتأكيدات عبر واتساب حيث يتواجد المستأجرون بالفعل."
    ),
  },
};

export default function IntegrationsPage() {
  const { locale } = useLocale();
  const [filter, setFilter] = useState<Category | "all">("all");

  useEffect(() => {
    const prev = document.title;
    document.title = "Integrations | Atar";
    return () => {
      document.title = prev;
    };
  }, []);

  const items = useMemo(
    () =>
      integrationAssets
        .map((asset) => ({ asset, copy: integrationCopy[asset.name] }))
        .filter((i) => i.copy),
    []
  );

  const visible = filter === "all" ? items : items.filter((i) => i.copy.category === filter);

  return (
    <>
      <section className="hero-bg" aria-labelledby="integrations-title">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {locale === "ar" ? "النظام البيئي" : "Ecosystem"}
            </p>
            <h1
              id="integrations-title"
              className="mt-3 text-4xl font-medium tracking-tight text-ink dark:text-white sm:text-5xl"
            >
              {locale === "ar" ? "اربط أتار بالأدوات التي تستخدمها بالفعل" : "Connect Atar to the tools you already use"}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft dark:text-white/70">
              {locale === "ar"
                ? "من منصات التحقق من الهوية والتحليلات إلى الحلول الفردية وأنظمة تخطيط موارد المؤسسات، يتصل أتار مباشرة بالبنية التحتية الوطنية وأدوات أخرى."
                : "From identity verification and analytics platforms to point-solutions and ERPs, Atar connects natively to national infrastructure and other tools."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14 dark:bg-secondary-darker lg:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label={locale === "ar" ? "تصفية حسب الفئة" : "Filter by category"}>
              <button
                type="button"
                onClick={() => setFilter("all")}
                aria-pressed={filter === "all"}
                className={
                  filter === "all"
                    ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors"
                    : "rounded-full border border-grey-200 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-primary dark:border-white/15 dark:text-white/70"
                }
              >
                {locale === "ar" ? "الكل" : "All"}
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilter(c.id)}
                  aria-pressed={filter === c.id}
                  className={
                    filter === c.id
                      ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors"
                      : "rounded-full border border-grey-200 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-primary dark:border-white/15 dark:text-white/70"
                  }
                >
                  {pick(c.label, locale)}
                </button>
              ))}
            </div>
          </Reveal>

          <StaggerReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" y={20}>
            {visible.map(({ asset, copy }) => {
              const categoryLabel = categories.find((c) => c.id === copy.category)?.label;
              return (
                <Card key={asset.file} className="h-full">
                  <CardHeader className="grid-rows-1">
                    <div className="flex items-center gap-4">
                      <span
                        className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl p-3"
                        style={{ backgroundColor: asset.bg }}
                      >
                        <img src={asset.url} alt={asset.name} className="h-auto w-full" loading="lazy" />
                      </span>
                      <div>
                        <CardTitle className="text-base">{asset.name}</CardTitle>
                        {categoryLabel && (
                          <Badge variant="outline" className="mt-1.5">
                            {pick(categoryLabel, locale)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-ink-soft dark:text-white/70">
                      {pick(copy.description, locale)}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </StaggerReveal>

          <p className="mt-10 text-center text-sm text-ink-soft dark:text-white/60">
            {locale === "ar" ? "وأكثر من 100+ أداة قابلة للتكامل" : "and 100+ more tools to integrate"}
          </p>
        </div>
      </section>

      <section className="bg-[#F6F7F8] py-14 dark:bg-white/5 lg:py-20" aria-label="Request an integration">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Reveal>
            <Card className="items-center p-8 text-center lg:p-10">
              <CardContent className="px-0 pb-0">
                <p className="leading-relaxed text-ink-soft dark:text-white/70">
                  {locale === "ar"
                    ? "لا ترى الأداة التي تستخدمها؟ أخبرنا وسنساعدك في إيجاد أفضل طريقة للربط."
                    : "Don't see the tool you use? Tell us and we'll help you find the best way to connect it."}
                </p>
              </CardContent>
              <CardFooter className="justify-center px-0 pb-0 pt-5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-secondary"
                >
                  <span>{locale === "ar" ? "اسأل عن التكاملات" : "Ask about integrations"}</span>
                  <ArrowRight />
                </Link>
              </CardFooter>
            </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
