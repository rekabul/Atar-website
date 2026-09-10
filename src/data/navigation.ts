/**
 * Header + footer navigation taxonomy (bilingual, LStr pattern — see data/pricing.ts).
 * Single source of truth so Navbar.tsx (dropdowns) and Footer.tsx (repeated as flat
 * columns) never drift apart.
 *
 * A NavGroup is either a flat list (`items`) or split into labeled sub-sections
 * (`sections`) — used by Products, which shows a "Products" sub-heading (the
 * three suites + Atar OS + All Modules) and an "Add-ons" sub-heading (Listing
 * Website, Branded Mobile App, PowerBI Reports) inside one dropdown/column.
 *
 * Duplicate-avoidance: items that already have a real page reuse that page's route
 * instead of spawning a near-duplicate — Products > All Modules points at the
 * existing /features page. Integrations (/integrations, see
 * pages/IntegrationsPage.tsx) and Resources > FAQ Hub (/faq, see pages/FaqPage.tsx)
 * each have their own dedicated page — reusing the same real data
 * (data/assetsMap.ts integrations, data/pricing.ts pricingFaq) — rather than
 * scrolling to a teaser/accordion section on another page. Everything else is a
 * new, lightweight page (see data/placeholderPages.ts) rather than a dead "#" link.
 */
import { type LStr } from "./pricing";
import {
  TrendingUpIcon,
  LeaseIcon,
  FacilityIcon,
  CpuIcon,
  GridIcon,
  Globe,
  SmartphoneIcon,
  BarChartIcon,
  UsersIcon,
  HandoverIcon,
  FileTextIcon,
  WalletIcon,
  TicketIcon,
  MessageIcon,
  UserCircleIcon,
  RentListIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  CompoundIcon,
  LayersIcon,
} from "../components/ui/Icon";

const L = (en: string, ar: string): LStr => ({ en, ar });

/** A nav item's icon — used by the header mega-menu (see ui/NavDropdown.tsx). */
export type NavIcon = (props: { size?: number; className?: string }) => JSX.Element;

export type NavLink = { label: LStr; to: string; external?: boolean; icon?: NavIcon };
export type NavSection = { label: LStr; items: NavLink[] };
export type NavGroup = { label: LStr; items?: NavLink[]; sections?: NavSection[] };

/** Flattened items for a group, whether it's a plain list or split into sections. */
export function groupItems(group: NavGroup): NavLink[] {
  return group.sections ? group.sections.flatMap((s) => s.items) : group.items ?? [];
}

/**
 * The footer never nests — every column is a plain label + flat list, so all
 * columns read the same at a glance. A header dropdown's sub-sections (e.g.
 * Products' "Products"/"Add-ons", Solutions' 3 groups) are exactly the right
 * size for their own footer column, so this expands a sectioned NavGroup into
 * one standalone flat NavGroup per section instead of nesting them under one
 * heading. A plain (non-sectioned) group passes through unchanged.
 */
export function sectionsToFooterGroups(group: NavGroup): NavGroup[] {
  return group.sections ? group.sections.map((s) => ({ label: s.label, items: s.items })) : [group];
}

// ---- Header dropdown groups -------------------------------------------------

export const productsGroup: NavGroup = {
  label: L("Products", "المنتجات"),
  sections: [
    {
      label: L("Products", "المنتجات"),
      items: [
        { label: L("Sales Suite", "حزمة المبيعات"), to: "/products/sales-suite", icon: TrendingUpIcon },
        { label: L("Leasing Suite", "حزمة التأجير"), to: "/products/leasing-suite", icon: LeaseIcon },
        { label: L("Property Operations Suite", "حزمة عمليات العقارات"), to: "/products/operations-suite", icon: FacilityIcon },
        { label: L("Atar OS", "نظام أتار"), to: "/products/atar-os", icon: CpuIcon },
        { label: L("All Modules", "جميع الوحدات"), to: "/features", icon: GridIcon },
      ],
    },
    {
      label: L("Add-ons", "الإضافات"),
      items: [
        { label: L("Listing Website", "موقع الإعلانات"), to: "/products/addons/listing-website", icon: Globe },
        { label: L("Branded Mobile App", "تطبيق جوال بعلامتك التجارية"), to: "/products/addons/branded-mobile-app", icon: SmartphoneIcon },
        { label: L("PowerBI Reports", "تقارير PowerBI"), to: "/products/addons/powerbi-reports", icon: BarChartIcon },
      ],
    },
  ],
};

export const solutionsGroup: NavGroup = {
  label: L("Solutions", "الحلول"),
  sections: [
    {
      label: L("Sales & Leasing", "المبيعات والتأجير"),
      items: [
        { label: L("Real Estate CRM", "إدارة علاقات العملاء العقارية"), to: "/solutions/real-estate-crm", icon: UsersIcon },
        { label: L("Listing Website", "موقع الإعلانات"), to: "/solutions/listing-website", icon: Globe },
        { label: L("Sales & Handover", "المبيعات والتسليم"), to: "/solutions/sales-handover", icon: HandoverIcon },
        { label: L("Leasing & Contract Management", "التأجير وإدارة العقود"), to: "/solutions/leasing-contract-management", icon: FileTextIcon },
      ],
    },
    {
      label: L("Operations & Finance", "العمليات والماليات"),
      items: [
        { label: L("Property & Portfolio Financials", "الماليات العقارية ومالية المحفظة"), to: "/solutions/property-portfolio-financials", icon: WalletIcon },
        { label: L("Maintenance & Ticketing", "الصيانة والتذاكر"), to: "/solutions/maintenance-ticketing", icon: TicketIcon },
        { label: L("Facilities Management", "إدارة المرافق"), to: "/solutions/facilities-management", icon: FacilityIcon },
      ],
    },
    {
      label: L("Engagement & Insights", "التفاعل والتحليلات"),
      items: [
        { label: L("Community Engagement & Access", "تفاعل المجتمع والدخول"), to: "/solutions/community-engagement-access", icon: MessageIcon },
        { label: L("Customer Portal", "بوابة العملاء"), to: "/solutions/customer-portal", icon: UserCircleIcon },
        { label: L("Reporting & Analytics", "التقارير والتحليلات"), to: "/solutions/reporting-analytics", icon: BarChartIcon },
      ],
    },
  ],
};

export const marketsGroup: NavGroup = {
  label: L("Markets", "القطاعات"),
  items: [
    { label: L("Residential", "سكني"), to: "/markets/residential", icon: RentListIcon },
    { label: L("Retail", "تجزئة"), to: "/markets/retail", icon: ShoppingBagIcon },
    { label: L("Office", "مكاتب"), to: "/markets/office", icon: BriefcaseIcon },
    { label: L("Compounds & Communities", "المجمّعات والمجتمعات السكنية"), to: "/markets/compounds-communities", icon: CompoundIcon },
    { label: L("Mixed-use Developments", "المشاريع متعددة الاستخدامات"), to: "/markets/mixed-use-developments", icon: LayersIcon },
  ],
};

// ---- Header flat links -------------------------------------------------

export const integrationsLink: NavLink = { label: L("Integrations", "التكاملات"), to: "/integrations" };
export const caseStudiesLink: NavLink = { label: L("Case Studies", "دراسات الحالة"), to: "/case-studies" };
export const pricingLink: NavLink = { label: L("Pricing", "الأسعار"), to: "/pricing" };
export const apiDocsLink: NavLink = { label: L("API Docs", "توثيق الواجهة البرمجية"), to: "https://docs.goatar.com", external: true };
export const loginLink: NavLink = { label: L("Log In", "تسجيل الدخول"), to: "/login" };
export const signUpLink: NavLink = { label: L("Sign Up", "إنشاء حساب"), to: "/signup" };

/** Header dropdown groups, in nav order. */
export const headerGroups: NavGroup[] = [productsGroup, solutionsGroup, marketsGroup];

/** Header flat links that sit between the Markets dropdown and Login/Sign Up. */
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
  label: L("Legal", "قانوني"),
  items: [
    { label: L("Terms of Use", "شروط الاستخدام"), to: "/legal/terms" },
    { label: L("Privacy Policy", "سياسة الخصوصية"), to: "/legal/privacy" },
    { label: L("Refund Policy", "سياسة الاسترداد"), to: "/legal/refund" },
    { label: L("Disclaimer", "إخلاء المسؤولية"), to: "/legal/disclaimer" },
  ],
};

/**
 * Footer repeats the header taxonomy as flat columns, plus the footer-only
 * groups. "Additional Links" bundles the header's flat, group-less links plus
 * API Docs under one column heading for the footer layout.
 *
 * Unlike the header (where Products/Solutions nest labeled sub-sections
 * inside one dropdown), the footer flattens them: groupItems() merges a
 * sub-sectioned group's items into one plain list under a single column
 * heading (Products' "Products"/"Add-ons" split and Solutions' 3 groups all
 * collapse into one "Products" column and one "Solutions" column), so no
 * footer column shows a sub-heading.
 */
export const additionalLinksGroup: NavGroup = {
  label: L("Additional Links", "روابط إضافية"),
  items: [apiDocsLink, integrationsLink, caseStudiesLink, pricingLink],
};

export const footerGroups: NavGroup[] = [
  { label: productsGroup.label, items: groupItems(productsGroup) },
  { label: solutionsGroup.label, items: groupItems(solutionsGroup) },
  marketsGroup,
  additionalLinksGroup,
  companyGroup,
  resourcesGroup,
  legalGroup,
];
