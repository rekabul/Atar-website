/**
 * Header + footer navigation taxonomy (bilingual, LStr pattern — see data/pricing.ts).
 * Single source of truth so Navbar.tsx (dropdowns) and Footer.tsx (repeated as flat
 * columns) never drift apart.
 *
 * Duplicate-avoidance: items that already have a real page reuse that page's route
 * instead of spawning a near-duplicate — Products > Overview/All Modules both point
 * at the existing /features page. Integrations (/integrations, see
 * pages/IntegrationsPage.tsx) and Resources > FAQ Hub (/faq, see pages/FaqPage.tsx)
 * each have their own dedicated page — reusing the same real data
 * (data/assetsMap.ts integrations, data/pricing.ts pricingFaq) — rather than
 * scrolling to a teaser/accordion section on another page. Everything else is a
 * new, lightweight page (see data/placeholderPages.ts) rather than a dead "#" link.
 */
import { type LStr } from "./pricing";

const L = (en: string, ar: string): LStr => ({ en, ar });

export type NavLink = { label: LStr; to: string; external?: boolean };
export type NavGroup = { label: LStr; items: NavLink[] };

// ---- Header dropdown groups -------------------------------------------------

export const productsGroup: NavGroup = {
  label: L("Products", "المنتجات"),
  items: [
    { label: L("Overview", "نظرة عامة"), to: "/features" },
    { label: L("Sales Suite", "حزمة المبيعات"), to: "/products/sales-suite" },
    { label: L("Leasing Suite", "حزمة التأجير"), to: "/products/leasing-suite" },
    { label: L("Property Operations Suite", "حزمة العمليات العقارية"), to: "/products/operations-suite" },
    { label: L("All Modules", "جميع الوحدات"), to: "/features" },
  ],
};

export const solutionsGroup: NavGroup = {
  label: L("Solutions", "الحلول"),
  items: [
    { label: L("Property Developers", "المطورون العقاريون"), to: "/solutions/property-developers" },
    { label: L("Real Estate Marketers", "المسوّقون العقاريون"), to: "/solutions/real-estate-marketers" },
    { label: L("Property Managers", "مديرو العقارات"), to: "/solutions/property-managers" },
    { label: L("Facility Managers", "مديرو المرافق"), to: "/solutions/facility-managers" },
    { label: L("Owner Associations", "اتحادات الملّاك"), to: "/solutions/owner-associations" },
    { label: L("Coworking Operators", "مشغّلو مساحات العمل المشترك"), to: "/solutions/coworking-operators" },
  ],
};

export const marketsGroup: NavGroup = {
  label: L("Markets", "القطاعات"),
  items: [
    { label: L("Residential", "سكني"), to: "/markets/residential" },
    { label: L("Commercial", "تجاري"), to: "/markets/commercial" },
    { label: L("Compounds & Communities", "المجمّعات والمجتمعات السكنية"), to: "/markets/compounds-communities" },
    { label: L("Accommodation & Housing", "الإسكان والسكن"), to: "/markets/accommodation-housing" },
    { label: L("Coworking Spaces", "مساحات العمل المشترك"), to: "/markets/coworking-spaces" },
  ],
};

export const compareGroup: NavGroup = {
  label: L("Compare", "قارن"),
  items: [
    { label: L("Atar vs. Disconnected Systems & Spreadsheets", "أتار مقابل الأنظمة المتفرقة وجداول البيانات"), to: "/compare/spreadsheets" },
    { label: L("Atar vs. Global PropTech Platforms", "أتار مقابل منصات التقنية العقارية العالمية"), to: "/compare/proptech-platforms" },
    { label: L("Atar vs. Building In-House", "أتار مقابل البناء الداخلي"), to: "/compare/in-house" },
    { label: L("Atar vs. Point Solutions", "أتار مقابل الحلول الفردية"), to: "/compare/point-solutions" },
  ],
};

// ---- Header flat links -------------------------------------------------

export const integrationsLink: NavLink = { label: L("Integrations", "التكاملات"), to: "/integrations" };
export const caseStudiesLink: NavLink = { label: L("Case Studies", "دراسات الحالة"), to: "/case-studies" };
export const pricingLink: NavLink = { label: L("Pricing", "الأسعار"), to: "/pricing" };
export const loginLink: NavLink = { label: L("Log In", "تسجيل الدخول"), to: "/login" };
export const signUpLink: NavLink = { label: L("Sign Up", "إنشاء حساب"), to: "/signup" };

/** Header dropdown groups, in nav order. */
export const headerGroups: NavGroup[] = [productsGroup, solutionsGroup, marketsGroup, compareGroup];

/** Header flat links that sit between the Markets/Compare dropdowns and Login/Sign Up. */
export const headerFlatLinks: NavLink[] = [integrationsLink, caseStudiesLink, pricingLink];

// ---- Footer-only groups -------------------------------------------------

export const companyGroup: NavGroup = {
  label: L("Company", "الشركة"),
  items: [
    { label: L("About Us", "من نحن"), to: "/about" },
    { label: L("Leadership", "القيادة"), to: "/company/leadership" },
    { label: L("Contact Us", "تواصل معنا"), to: "/contact" },
  ],
};

export const resourcesGroup: NavGroup = {
  label: L("Resources", "الموارد"),
  items: [
    { label: L("Blog", "المدونة"), to: "/resources/blog" },
    { label: L("FAQ Hub", "الأسئلة الشائعة"), to: "/faq" },
  ],
};

export const legalGroup: NavGroup = {
  label: L("Legal Center", "المركز القانوني"),
  items: [
    { label: L("Terms of Use", "شروط الاستخدام"), to: "/legal/terms" },
    { label: L("Privacy Policy", "سياسة الخصوصية"), to: "/legal/privacy" },
    { label: L("Refund Policy", "سياسة الاسترداد"), to: "/legal/refund" },
    { label: L("Disclaimer", "إخلاء المسؤولية"), to: "/legal/disclaimer" },
  ],
};

export const apiDocsGroup: NavGroup = {
  label: L("API Docs", "توثيق الواجهة البرمجية"),
  items: [{ label: L("docs.goatar.com", "docs.goatar.com"), to: "https://docs.goatar.com", external: true }],
};

/**
 * Footer repeats the entire header taxonomy as flat columns (dropdowns become
 * columns), plus the footer-only groups. "Platform" bundles the header's
 * flat, group-less links under one column heading for the footer layout.
 */
export const platformGroup: NavGroup = {
  label: L("Platform", "المنصة"),
  items: [integrationsLink, caseStudiesLink, pricingLink],
};

export const footerGroups: NavGroup[] = [
  productsGroup,
  solutionsGroup,
  marketsGroup,
  compareGroup,
  platformGroup,
  companyGroup,
  resourcesGroup,
  legalGroup,
  apiDocsGroup,
];
