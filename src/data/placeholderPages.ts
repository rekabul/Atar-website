/**
 * Copy for the pages behind the new header/footer nav items that didn't
 * already have a real page (see data/navigation.ts for which items reuse an
 * existing page instead of landing here). Each entry renders through
 * pages/PlaceholderPage.tsx, keyed by route path.
 *
 * Content sources (see the research doc shared with the team):
 *  - The official "Atar Company Profile (EN)" — product/solution/market
 *    names, the 5-step suite workflows, the fragmentation/compare framework,
 *    5 real quantified case studies, and the leadership/timeline/stats.
 *  - goatar.com's live Termly-hosted legal documents — transcribed verbatim
 *    for the Legal Center (English is the governing language; the Arabic
 *    locale shows a translated note pointing that out rather than a
 *    non-professional translation of binding legal text).
 *  - Competitor structural patterns (DoorLoop, TenantCloud) informed page
 *    layout only — no competitor copy is reproduced.
 */
import { type LStr } from "./pricing";

const L = (en: string, ar: string): LStr => ({ en, ar });

// ---- Rich content block types ------------------------------------------

export type Stat = { value: string; label: LStr };
export type Step = { title: LStr; body: LStr };
export type CompareRow = { aspect: LStr; atar: LStr; other: LStr };
export type CaseStudyItem = {
  tag: LStr;
  title: LStr;
  challenge: LStr;
  outcome: LStr;
  stats: Stat[];
  /** Key into data/assetsMap.ts `caseStudyPhotos` — real project photography from the Company Profile. */
  imageId: string;
};
export type TeamMember = { name: string; title: LStr };
export type TimelineItem = { year: string; label: LStr };
/** Same real partnership/milestone items already published on the About page.
 * `slug` gives each item a stable, real detail page at
 * /resources/blog/:slug (see pages/BlogPostPage.tsx) — `title` is a short
 * heading for that page and the card, since the original copy is a full
 * announcement paragraph with no headline of its own. */
export type NewsItem = { date: string; slug: string; title: LStr; body: LStr };
/** Placeholder testimonial — quote/name/title are dummy copy until a real customer quote is provided. */
export type QuoteItem = { quote: LStr; name: string; title: LStr };
/** Legal body text stays English-only — see note above; kept as plain strings, not LStr. */
export type LegalSection = { heading: string; body: string };
/** Keys into the small self-contained "product screen" mockups already built for the Features page (components/FeatureVisuals.tsx) — reused here instead of new artwork. */
export type VisualKey = "financial" | "service" | "property" | "ai" | "compliance" | "integrations";
/** Keys into the per-step mockups built specifically for a detailed "How it works" — one distinct visual per step, unlike `VisualKey` which is one shared visual per whole section. */
export type DetailedVisualKey =
  | "listing"
  | "leads"
  | "booking"
  | "signature"
  | "milestones"
  | "rentalListing"
  | "renterInterest"
  | "application"
  | "quotation"
  | "leaseAgreement"
  | "handoverChecklist"
  | "communication"
  | "tickets"
  | "facility"
  | "onlinePayment";
export type DetailedStep = { title: LStr; body: LStr; visual: DetailedVisualKey };

/**
 * Small icon set shared by the "iconFeatures" and "whyAtar" sections below —
 * keys only, so this data file never needs to import React icon components.
 * Looked up against `solutionIconMap` in pages/PlaceholderPage.tsx.
 */
export type SolutionIcon =
  | "users"
  | "globe"
  | "handover"
  | "file"
  | "wallet"
  | "ticket"
  | "facility"
  | "message"
  | "userCircle"
  | "chart"
  | "refresh"
  | "shield"
  | "clipboard"
  | "bell"
  | "calendar"
  | "tag"
  | "layers"
  | "share"
  | "smartphone"
  | "link"
  | "trending"
  | "cpu"
  | "briefcase"
  | "idCard"
  | "compound"
  | "search"
  | "riyal"
  | "grid";
export type IconFeatureItem = { icon: SolutionIcon; title: LStr; body: LStr };
export type WhyAtarCard = { icon: SolutionIcon; title: LStr; body: LStr };

export type PageSection =
  | { kind: "steps"; heading?: LStr; items: Step[] }
  | { kind: "stepsVisual"; heading?: LStr; visual: VisualKey; items: Step[] }
  | { kind: "stepsDetailed"; heading?: LStr; subtitle?: LStr; items: DetailedStep[] }
  | { kind: "stats"; heading?: LStr; items: Stat[] }
  | { kind: "bullets"; heading?: LStr; items: LStr[] }
  | { kind: "chips"; heading?: LStr; items: LStr[] }
  | { kind: "compare"; heading?: LStr; subtitle?: LStr; otherLabel: LStr; rows: CompareRow[] }
  | { kind: "iconFeatures"; heading?: LStr; items: IconFeatureItem[] }
  | { kind: "whyAtar"; heading: LStr; subtitle?: LStr; cards: WhyAtarCard[] }
  | { kind: "caseStudies"; items: CaseStudyItem[] }
  | { kind: "logos" }
  | { kind: "team"; heading: LStr; items: TeamMember[] }
  | { kind: "timeline"; items: TimelineItem[] }
  | { kind: "news"; heading?: LStr; items: NewsItem[] }
  | { kind: "quote"; items: QuoteItem[] }
  | { kind: "legal"; updated: string; note: LStr; sections: LegalSection[] };

export type PlaceholderCopy = {
  eyebrow: LStr;
  title: LStr;
  body: LStr;
  sections?: PageSection[];
  /** Legal pages skip the "talk to our team" + CTA banner blocks. */
  minimalFooter?: boolean;
};

const PRODUCTS = L("Products", "المنتجات");
const SOLUTIONS = L("Solutions", "الحلول");
const MARKETS = L("Markets", "القطاعات");
const COMPARE = L("Compare", "قارن");

/** "Included with every suite" — repeated across all three Products pages. */
const includedWithEverySuite: PageSection = {
  kind: "chips",
  heading: L("Included with every suite", "مشمول في كل حزمة"),
  items: [
    L("Portfolio management", "إدارة المحفظة"),
    L("Finance", "المالية"),
    L("Workflows", "سير العمل"),
    L("Documents", "المستندات"),
    L("Reporting", "التقارير"),
    L("Mobile app", "تطبيق الجوال"),
    L("Integrations", "التكاملات"),
  ],
};

export const placeholderPages: Record<string, PlaceholderCopy> = {
  // ---- Products ---------------------------------------------------------
  "/products/sales-suite": {
    eyebrow: PRODUCTS,
    title: L("Sales Suite", "حزمة المبيعات"),
    body: L(
      "Real estate sales automation for ready units and off-plan projects that helps you sell more and faster.",
      "أتمتة مبيعات العقارات للوحدات الجاهزة والمشاريع على الخريطة، لمساعدتك على البيع بشكل أكثر وأسرع."
    ),
    sections: [
      {
        kind: "stepsDetailed",
        heading: L("How it works", "كيف تعمل"),
        subtitle: L(
          "From first listing to final handover — five connected steps, one platform.",
          "من أول إعلان إلى التسليم النهائي، خمس خطوات متصلة على منصة واحدة."
        ),
        items: [
          {
            title: L("List properties for sale", "أدرج العقارات للبيع"),
            body: L(
              "Create listings for ready and off-plan units with full property and purchase detail.",
              "أنشئ إعلانات للوحدات الجاهزة والمباعة على الخريطة مع كامل تفاصيل العقار والشراء."
            ),
            visual: "listing",
          },
          {
            title: L("Attract buyers", "استقطب المشترين"),
            body: L(
              "Publish to your website; interest registers and leads generate automatically.",
              "انشر على موقعك الإلكتروني؛ يُسجَّل الاهتمام وتُولَّد العملاء المحتملون تلقائياً."
            ),
            visual: "leads",
          },
          {
            title: L("Secure bookings", "أمّن الحجوزات"),
            body: L(
              "Approve booking requests and collect booking payments through SADAD.",
              "وافق على طلبات الحجز وحصّل مدفوعات الحجز عبر سداد."
            ),
            visual: "booking",
          },
          {
            title: L("Sign contracts", "وقّع العقود"),
            body: L(
              "Sign digitally via Nafath, with legal compliance and protection for both parties.",
              "وقّع إلكترونياً عبر نفاذ، مع الامتثال القانوني وحماية الطرفين."
            ),
            visual: "signature",
          },
          {
            title: L("Collect payments & handover", "حصّل المدفوعات وسلّم"),
            body: L(
              "Collect via SADAD and issue bulk requests against off-plan completion milestones.",
              "حصّل عبر سداد وأصدر طلبات دفع مجمّعة مقابل مراحل إنجاز المشروع على الخريطة."
            ),
            visual: "milestones",
          },
        ],
      },
      {
        kind: "stats",
        heading: L("Backed by Real Numbers", "مدعومة بأرقام حقيقية"),
        items: [
          { value: "300M+", label: L("SAR property sales enabled", "ريال مبيعات عقارية مُمكَّنة") },
          { value: "400+", label: L("Units sold on the platform", "وحدة مباعة عبر المنصة") },
        ],
      },
      includedWithEverySuite,
    ],
  },

  "/products/leasing-suite": {
    eyebrow: PRODUCTS,
    title: L("Leasing Suite", "حزمة التأجير"),
    body: L(
      "Rental management software to handle contracts, payments and renewals in one seamless interface.",
      "برنامج إدارة تأجير يتعامل مع العقود والمدفوعات والتجديدات في واجهة واحدة سلسة."
    ),
    sections: [
      {
        kind: "stepsDetailed",
        heading: L("How it works", "كيف تعمل"),
        subtitle: L(
          "From first listing to a fully managed lease — five connected steps, one platform.",
          "من أول إعلان إلى عقد إيجار مُدار بالكامل، خمس خطوات متصلة على منصة واحدة."
        ),
        items: [
          {
            title: L("List available rentals", "أدرج الوحدات المتاحة للتأجير"),
            body: L(
              "Publish listings with areas, annual rentals and booking deposits.",
              "انشر إعلانات تتضمن المساحات والإيجار السنوي ومبالغ حجز التأمين."
            ),
            visual: "rentalListing",
          },
          {
            title: L("Attract renters", "استقطب المستأجرين"),
            body: L(
              "Showcase on your website; interest converts to leads automatically.",
              "اعرض على موقعك الإلكتروني؛ يتحول الاهتمام إلى عملاء محتملين تلقائياً."
            ),
            visual: "renterInterest",
          },
          {
            title: L("Receive applications", "استقبل الطلبات"),
            body: L(
              "Approve rental applications with full KYC and customer detail.",
              "وافق على طلبات التأجير مع التحقق الكامل من هوية العميل وبياناته."
            ),
            visual: "application",
          },
          {
            title: L("Issue quotations", "أصدر عروض الأسعار"),
            body: L(
              "Link quotations to leads and applications to track the whole journey.",
              "اربط عروض الأسعار بالعملاء المحتملين والطلبات لتتبع الرحلة كاملة."
            ),
            visual: "quotation",
          },
          {
            title: L("Create & manage leases", "أنشئ العقود وأدرها"),
            body: L(
              "Generate agreements and raise invoices automatically on payment dates.",
              "أنشئ الاتفاقيات وأصدر الفواتير تلقائياً في مواعيد الدفع."
            ),
            visual: "leaseAgreement",
          },
        ],
      },
      {
        kind: "stats",
        heading: L("Backed by Real Numbers", "مدعومة بأرقام حقيقية"),
        items: [
          { value: "400M+", label: L("SAR rental value managed", "ريال قيمة إيجار مُدارة") },
          { value: "400+", label: L("Units sold on the platform", "وحدة مباعة عبر المنصة") },
        ],
      },
      includedWithEverySuite,
    ],
  },

  "/products/operations-suite": {
    eyebrow: PRODUCTS,
    title: L("Property Operations Suite", "حزمة عمليات العقارات"),
    body: L(
      "Unify all post-sale and post-rental operations, including communication, maintenance, facility management and space and visitor management.",
      "وحّد جميع عمليات ما بعد البيع وما بعد التأجير، بما في ذلك التواصل والصيانة وإدارة المرافق وإدارة المساحات والزوار."
    ),
    sections: [
      {
        kind: "stepsDetailed",
        heading: L("How it works", "كيف تعمل"),
        subtitle: L(
          "From digital handover to everyday operations — five connected steps, one platform.",
          "من التسليم الرقمي إلى التشغيل اليومي، خمس خطوات متصلة على منصة واحدة."
        ),
        items: [
          {
            title: L("Handover & onboard digitally", "سلّم وأدرج رقمياً"),
            body: L(
              "Hand over properties with all documentation and guidelines attached.",
              "سلّم العقارات مع إرفاق جميع المستندات والإرشادات."
            ),
            visual: "handoverChecklist",
          },
          {
            title: L("Communicate with customers", "تواصل مع العملاء"),
            body: L(
              "Engage through news, events, surveys and suggestions.",
              "تفاعل من خلال الأخبار والفعاليات والاستبيانات والاقتراحات."
            ),
            visual: "communication",
          },
          {
            title: L("Manage tickets & requests", "أدر التذاكر والطلبات"),
            body: L(
              "Run customer-initiated workflows end to end, with KPI measurement.",
              "أدر سير عمل طلبات العملاء من البداية للنهاية مع قياس مؤشرات الأداء."
            ),
            visual: "tickets",
          },
          {
            title: L("Manage facilities & common areas", "أدر المرافق والمناطق المشتركة"),
            body: L(
              "Maintain shared assets and assign and monitor teams.",
              "حافظ على الأصول المشتركة وكلّف الفرق وتابعها."
            ),
            visual: "facility",
          },
          {
            title: L("Collect payments online", "حصّل المدفوعات إلكترونياً"),
            body: L(
              "Take payments through online gateway solutions.",
              "استلم المدفوعات عبر حلول الدفع الإلكترونية."
            ),
            visual: "onlinePayment",
          },
        ],
      },
      {
        kind: "stats",
        heading: L("Backed by Real Numbers", "مدعومة بأرقام حقيقية"),
        items: [
          { value: "30,000+", label: L("Tickets processed", "تذكرة تمت معالجتها") },
          { value: "50%", label: L("Reduction in lead time", "خفض في زمن الاستجابة") },
          { value: "4.5+ / 5.0", label: L("Average customer rating", "متوسط تقييم العملاء") },
        ],
      },
      includedWithEverySuite,
    ],
  },

  // ---- Products > Atar OS --------------------------------------------------
  // ---- Products > Add-ons --------------------------------------------------
  "/products/addons/listing-website": {
    eyebrow: L("Add-ons", "الإضافات"),
    title: L("Listing Website", "موقع الإعلانات"),
    body: L(
      "A branded, SEO-ready listing website for your sale and rental inventory, connected directly to your Atar data — no manual re-entry.",
      "موقع إعلانات بعلامتك التجارية ومهيّأ لمحركات البحث لعرض مخزون البيع والتأجير، متصل مباشرة ببيانات أتار دون إعادة إدخال يدوية."
    ),
    // The generic "bullets" checklist is replaced by a bespoke feature grid
    // (ListingWebsiteFeatureGrid in PlaceholderPage.tsx) with concrete,
    // competitor-informed specifics instead of generic claims — see the
    // competitive UX audit. Compare below stays data-driven since the
    // existing CompareSection renderer already fits as-is.
    sections: [
      {
        kind: "compare",
        heading: L("Why not just post to the portals yourself?", "لماذا لا تنشر بنفسك على المنصات؟"),
        subtitle: L(
          "A quick look at what changes when your listings live on your own site instead of being re-entered everywhere by hand.",
          "نظرة سريعة على ما يتغيّر عندما تكون إعلاناتك على موقعك الخاص بدلاً من إعادة إدخالها يدوياً في كل مكان."
        ),
        otherLabel: L("Posting Manually to Portals", "النشر يدوياً على المنصات"),
        rows: [
          {
            aspect: L("Publishing a new listing", "نشر إعلان جديد"),
            atar: L("Syncs automatically the moment it's added in Atar", "يتزامن تلقائياً فور إضافته في أتار"),
            other: L("Re-entered by hand on every portal you use", "يُعاد إدخاله يدوياً على كل منصة تستخدمها"),
          },
          {
            aspect: L("Price & fee transparency", "شفافية السعر والرسوم"),
            atar: L("Full breakdown shown — price, RETT, fees, VAT", "تفصيل كامل — السعر وضريبة التصرفات والرسوم والقيمة المضافة"),
            other: L("Usually just an asking price, nothing else", "غالباً سعر الطلب فقط دون تفاصيل"),
          },
          {
            aspect: L("Leads", "العملاء المحتملون"),
            atar: L("Captured straight into your Atar CRM", "تُلتقط مباشرة في نظام أتار لإدارة العملاء"),
            other: L("Scattered across each portal's own inbox", "متفرقة بين صناديق وارد كل منصة"),
          },
          {
            aspect: L("Branding", "العلامة التجارية"),
            atar: L("Your own domain, fully hosted under your brand", "نطاقك الخاص، مُستضاف بالكامل تحت علامتك"),
            other: L("Buried under the portal's own branding", "مدفون تحت علامة المنصة نفسها"),
          },
        ],
      },
    ],
  },

  "/products/addons/branded-mobile-app": {
    eyebrow: L("Add-ons", "الإضافات"),
    title: L("Branded Mobile App", "تطبيق جوال بعلامتك التجارية"),
    body: L(
      "A white-labeled mobile app for your tenants, owners and buyers — service requests, payments and announcements, under your own brand.",
      "تطبيق جوال بعلامتك الخاصة لمستأجريك وملّاكك ومشتريك — طلبات الخدمة والمدفوعات والإعلانات، تحت علامتك التجارية."
    ),
    // No generic "bullets" section here — the same 4 points are covered by
    // the bespoke MobileFeatureShowcase (heading + subheading + phone image
    // per feature) rendered in PlaceholderPage.tsx for this route.
  },

  "/products/addons/powerbi-reports": {
    eyebrow: L("Add-ons", "الإضافات"),
    title: L("PowerBI Reports", "تقارير PowerBI"),
    body: L(
      "Connect Atar's live data to Microsoft PowerBI for deeper, customizable reporting and dashboards beyond the built-in analytics.",
      "اربط بيانات أتار الحية بمايكروسوفت PowerBI للحصول على تقارير ولوحات تحكم أعمق وقابلة للتخصيص إلى جانب التحليلات المدمجة."
    ),
    sections: [
      {
        kind: "bullets",
        items: [
          L("Pre-built PowerBI templates for common reports", "قوالب PowerBI جاهزة للتقارير الشائعة"),
          L("Live connection, no manual data exports", "اتصال مباشر دون تصدير بيانات يدوي"),
          L("Build fully custom dashboards for your team", "أنشئ لوحات تحكم مخصصة بالكامل لفريقك"),
          L("Role-based access to sensitive financial data", "وصول محكوم حسب الدور للبيانات المالية الحساسة"),
        ],
      },
    ],
  },

  // ---- Solutions by capability ---------------------------------------------
  // Every Solutions page below shares the Listing Website add-on page's
  // layout (cloudy hero, Book a Demo button, dummy hero image, icon feature
  // grid) via the isSolutionsPage flag in pages/PlaceholderPage.tsx — only
  // the content is unique per page. The compare/screenshot pattern from that
  // add-on page is deliberately NOT reused here; instead each page closes its
  // intro with a "why Atar" card row tailored to that specific capability.
  "/solutions/real-estate-crm": {
    eyebrow: SOLUTIONS,
    title: L("Real Estate CRM", "إدارة علاقات العملاء العقارية"),
    body: L(
      "Track every lead, buyer and tenant from first contact to signed contract in one real estate CRM built for the full lifecycle.",
      "تتبّع كل عميل محتمل ومشترٍ ومستأجر من أول تواصل إلى توقيع العقد في نظام إدارة علاقات عملاء عقاري مصمم لكامل دورة الحياة."
    ),
    sections: [
      {
        kind: "iconFeatures",
        items: [
          {
            icon: "users",
            title: L("One pipeline across sales and leasing leads", "مسار واحد لعملاء المبيعات والتأجير المحتملين"),
            body: L(
              "Buyer and tenant enquiries sit in the same pipeline, so nothing gets worked twice by two different teams.",
              "تجتمع طلبات المشترين والمستأجرين في مسار واحد، فلا يعمل فريقان على نفس العميل مرتين."
            ),
          },
          {
            icon: "refresh",
            title: L("Automatic lead capture from your listings", "التقاط تلقائي للعملاء المحتملين من إعلاناتك"),
            body: L(
              "Enquiries from your listing site and marketplace drop straight into the CRM — no forwarding, no copy-paste.",
              "تصل الاستفسارات من موقع الإعلانات والسوق مباشرة إلى نظام إدارة العملاء دون تحويل أو نسخ يدوي."
            ),
          },
          {
            icon: "clipboard",
            title: L("Full activity history per contact", "سجل نشاط كامل لكل جهة اتصال"),
            body: L(
              "Calls, viewings, offers and notes stay attached to the contact record instead of scattered across inboxes.",
              "تبقى المكالمات والمعاينات والعروض والملاحظات مرتبطة بسجل جهة الاتصال بدل تشتتها بين صناديق البريد."
            ),
          },
          {
            icon: "bell",
            title: L("Follow-up reminders and task assignment", "تذكيرات متابعة وتوزيع مهام"),
            body: L(
              "Reminders and owner assignment keep every lead moving, instead of going cold in someone's spreadsheet.",
              "تُبقي التذكيرات وتكليف المسؤول كل عميل محتمل قيد المتابعة بدل أن يبرد في جدول بيانات منسي."
            ),
          },
        ],
      },
      {
        kind: "whyAtar",
        heading: L("Why Atar for Real Estate CRM", "لماذا أتار لإدارة علاقات العملاء العقارية"),
        subtitle: L(
          "The advantages that only show up once your CRM shares one platform with sales, leasing and operations.",
          "المزايا التي تظهر فقط عندما يشارك نظام إدارة العملاء منصة واحدة مع المبيعات والتأجير والعمليات."
        ),
        cards: [
          {
            icon: "refresh",
            title: L("Live, not batch", "مباشر لا دفعي"),
            body: L(
              "Every lead status updates in real time across your team — no waiting on an end-of-day import.",
              "تتحدّث حالة كل عميل محتمل فورياً لدى فريقك بأكمله، دون انتظار استيراد نهاية اليوم."
            ),
          },
          {
            icon: "shield",
            title: L("Built for Saudi compliance", "مصمم للامتثال السعودي"),
            body: L(
              "Contact and consent data is handled in line with Saudi data protection requirements from day one.",
              "تُدار بيانات جهات الاتصال والموافقات وفق متطلبات حماية البيانات السعودية منذ اليوم الأول."
            ),
          },
          {
            icon: "layers",
            title: L("One system, not five", "نظام واحد لا خمسة"),
            body: L(
              "Your CRM sits inside the same platform as sales, leasing and operations — not a bolt-on tool with its own login.",
              "يعمل نظام إدارة العملاء ضمن نفس منصة المبيعات والتأجير والعمليات، لا كأداة منفصلة بتسجيل دخول خاص بها."
            ),
          },
          {
            icon: "message",
            title: L("Support in Arabic and English", "دعم بالعربية والإنجليزية"),
            body: L(
              "Your sales team gets local support in both languages, not a ticket queue in another time zone.",
              "يحصل فريق المبيعات على دعم محلي باللغتين، لا طابور تذاكر في منطقة زمنية أخرى."
            ),
          },
        ],
      },
    ],
  },

  // Deliberate exception: this route is an exact copy of the
  // "/products/addons/listing-website" entry (eyebrow, title, body and the
  // compare section), and pages/PlaceholderPage.tsx's isListingWebsite flag
  // treats this path the same as that add-on page — same real screenshot,
  // same feature grid, same FAQ — per an explicit request to reuse that
  // page wholesale here rather than the generic Solutions template used by
  // every other route below.
  "/solutions/listing-website": {
    eyebrow: L("Add-ons", "الإضافات"),
    title: L("Listing Website", "موقع الإعلانات"),
    body: L(
      "A branded, SEO-ready listing website for your sale and rental inventory, connected directly to your Atar data — no manual re-entry.",
      "موقع إعلانات بعلامتك التجارية ومهيّأ لمحركات البحث لعرض مخزون البيع والتأجير، متصل مباشرة ببيانات أتار دون إعادة إدخال يدوية."
    ),
    sections: [
      {
        kind: "compare",
        heading: L("Why not just post to the portals yourself?", "لماذا لا تنشر بنفسك على المنصات؟"),
        subtitle: L(
          "A quick look at what changes when your listings live on your own site instead of being re-entered everywhere by hand.",
          "نظرة سريعة على ما يتغيّر عندما تكون إعلاناتك على موقعك الخاص بدلاً من إعادة إدخالها يدوياً في كل مكان."
        ),
        otherLabel: L("Posting Manually to Portals", "النشر يدوياً على المنصات"),
        rows: [
          {
            aspect: L("Publishing a new listing", "نشر إعلان جديد"),
            atar: L("Syncs automatically the moment it's added in Atar", "يتزامن تلقائياً فور إضافته في أتار"),
            other: L("Re-entered by hand on every portal you use", "يُعاد إدخاله يدوياً على كل منصة تستخدمها"),
          },
          {
            aspect: L("Price & fee transparency", "شفافية السعر والرسوم"),
            atar: L("Full breakdown shown — price, RETT, fees, VAT", "تفصيل كامل — السعر وضريبة التصرفات والرسوم والقيمة المضافة"),
            other: L("Usually just an asking price, nothing else", "غالباً سعر الطلب فقط دون تفاصيل"),
          },
          {
            aspect: L("Leads", "العملاء المحتملون"),
            atar: L("Captured straight into your Atar CRM", "تُلتقط مباشرة في نظام أتار لإدارة العملاء"),
            other: L("Scattered across each portal's own inbox", "متفرقة بين صناديق وارد كل منصة"),
          },
          {
            aspect: L("Branding", "العلامة التجارية"),
            atar: L("Your own domain, fully hosted under your brand", "نطاقك الخاص، مُستضاف بالكامل تحت علامتك"),
            other: L("Buried under the portal's own branding", "مدفون تحت علامة المنصة نفسها"),
          },
        ],
      },
    ],
  },

  "/solutions/sales-handover": {
    eyebrow: SOLUTIONS,
    title: L("Sales & Handover", "المبيعات والتسليم"),
    body: L(
      "Run the full sales journey, from booking to signed contract to digital handover, without losing track of a single unit.",
      "أدر رحلة المبيعات كاملة، من الحجز إلى توقيع العقد إلى التسليم الرقمي، دون فقدان تتبّع أي وحدة."
    ),
    sections: [
      {
        kind: "iconFeatures",
        items: [
          {
            icon: "file",
            title: L("Booking, contracts and milestone billing in one flow", "الحجز والعقود والفوترة حسب المراحل في مسار واحد"),
            body: L(
              "A unit moves from reservation to contract to milestone invoice without leaving the same screen.",
              "تنتقل الوحدة من الحجز إلى العقد إلى فاتورة الدفعة دون مغادرة الشاشة نفسها."
            ),
          },
          {
            icon: "idCard",
            title: L("Digital signature via Nafath", "توقيع إلكتروني عبر نفاذ"),
            body: L(
              "Buyers sign contracts remotely through Nafath, with a legally recognized signature and no printed paperwork.",
              "يوقّع المشترون العقود عن بُعد عبر نفاذ، بتوقيع معترف به قانونياً دون أي أوراق مطبوعة."
            ),
          },
          {
            icon: "clipboard",
            title: L("Handover checklists with full documentation", "قوائم تسليم مع توثيق كامل"),
            body: L(
              "Snags, sign-offs and attachments are logged against the unit, so nothing about the handover is verbal.",
              "تُسجَّل الملاحظات والاعتمادات والمرفقات على الوحدة نفسها، فلا يبقى شيء من التسليم شفهياً."
            ),
          },
          {
            icon: "handover",
            title: L("Seamless handoff into post-sale operations", "تسليم سلس إلى عمليات ما بعد البيع"),
            body: L(
              "Once a unit is handed over, its history moves with it into facilities and customer service — nothing re-typed.",
              "بمجرد تسليم الوحدة، ينتقل سجلها إلى إدارة المرافق وخدمة العملاء دون إعادة كتابة أي شيء."
            ),
          },
        ],
      },
      {
        kind: "whyAtar",
        heading: L("Why Atar for Sales & Handover", "لماذا أتار للمبيعات والتسليم"),
        subtitle: L(
          "What a connected sales and handover flow gives you that a spreadsheet and a shared inbox can't.",
          "ما الذي يمنحك إياه مسار مبيعات وتسليم متصل ولا يمنحه جدول بيانات وصندوق بريد مشترك."
        ),
        cards: [
          {
            icon: "refresh",
            title: L("Live, not batch", "مباشر لا دفعي"),
            body: L(
              "Every booking, payment and signature updates the unit's status immediately for sales, finance and operations alike.",
              "يحدّث كل حجز ودفعة وتوقيع حالة الوحدة فوراً لفرق المبيعات والمالية والعمليات."
            ),
          },
          {
            icon: "shield",
            title: L("Built for Saudi compliance", "مصمم للامتثال السعودي"),
            body: L(
              "Nafath signatures and RETT-ready billing are built in, not a workaround stitched together after the fact.",
              "توقيعات نفاذ وفوترة جاهزة لرسوم نقل الملكية مدمجة أصلاً، لا حل مؤقت يُركّب لاحقاً."
            ),
          },
          {
            icon: "layers",
            title: L("One system, not five", "نظام واحد لا خمسة"),
            body: L(
              "Booking, contract, billing and handover live in one flow instead of four disconnected tools and a shared drive.",
              "يعيش الحجز والعقد والفوترة والتسليم في مسار واحد بدل أربع أدوات منفصلة ومحرك تخزين مشترك."
            ),
          },
          {
            icon: "message",
            title: L("Support in Arabic and English", "دعم بالعربية والإنجليزية"),
            body: L(
              "Your sales and handover teams get local support in both languages when a deal needs a fast answer.",
              "تحصل فرق المبيعات والتسليم على دعم محلي باللغتين عندما تحتاج الصفقة إجابة سريعة."
            ),
          },
        ],
      },
    ],
  },

  "/solutions/leasing-contract-management": {
    eyebrow: SOLUTIONS,
    title: L("Leasing & Contract Management", "التأجير وإدارة العقود"),
    body: L(
      "Manage leases end to end — applications, agreements, renewals and invoicing — with every contract and payment in one place.",
      "أدر عقود التأجير من البداية للنهاية — الطلبات والاتفاقيات والتجديدات والفوترة — مع كل عقد ومدفوعة في مكان واحد."
    ),
    sections: [
      {
        kind: "iconFeatures",
        items: [
          {
            icon: "idCard",
            title: L("Application review with full KYC detail", "مراجعة الطلبات مع تفاصيل التحقق الكامل من الهوية"),
            body: L(
              "Applicant identity, income and history are reviewed in one screen instead of a folder of email attachments.",
              "تُراجَع هوية المتقدّم ودخله وسجله في شاشة واحدة بدل مجلد من مرفقات البريد الإلكتروني."
            ),
          },
          {
            icon: "file",
            title: L("Auto-generated lease agreements", "عقود إيجار تُنشأ تلقائياً"),
            body: L(
              "Approved applications turn into a ready-to-sign lease automatically, with the right clauses every time.",
              "تتحول الطلبات المعتمدة تلقائياً إلى عقد إيجار جاهز للتوقيع، بالبنود الصحيحة في كل مرة."
            ),
          },
          {
            icon: "bell",
            title: L("Renewal reminders before contracts expire", "تذكيرات تجديد قبل انتهاء العقود"),
            body: L(
              "Upcoming expiries surface automatically, so a renewal conversation starts weeks early, not the day after.",
              "تظهر العقود القريبة من الانتهاء تلقائياً، فتبدأ محادثة التجديد قبل أسابيع لا في اليوم التالي لانتهائها."
            ),
          },
          {
            icon: "riyal",
            title: L("Invoicing raised automatically on payment dates", "فواتير تُصدر تلقائياً في مواعيد الدفع"),
            body: L(
              "Rent invoices go out on schedule without anyone needing to remember which tenant is due this week.",
              "تصدر فواتير الإيجار في موعدها دون الحاجة لتذكّر أي مستأجر مستحق هذا الأسبوع."
            ),
          },
        ],
      },
      {
        kind: "whyAtar",
        heading: L("Why Atar for Leasing & Contract Management", "لماذا أتار للتأجير وإدارة العقود"),
        subtitle: L(
          "Why leasing teams stop chasing renewals and start planning them.",
          "لماذا تتوقف فرق التأجير عن ملاحقة التجديدات وتبدأ بالتخطيط لها."
        ),
        cards: [
          {
            icon: "refresh",
            title: L("Live, not batch", "مباشر لا دفعي"),
            body: L(
              "Every application, signature and payment updates the lease record the moment it happens.",
              "يحدّث كل طلب وتوقيع ودفعة سجل العقد فور حدوثه."
            ),
          },
          {
            icon: "shield",
            title: L("Built for Saudi compliance", "مصمم للامتثال السعودي"),
            body: L(
              "Lease agreements follow Ejar-aligned terms, so contracts hold up the same way a landlord already expects.",
              "تتبع عقود الإيجار شروطاً متوافقة مع إيجار، فتبقى العقود صالحة بالشكل الذي يتوقعه المالك أصلاً."
            ),
          },
          {
            icon: "layers",
            title: L("One system, not five", "نظام واحد لا خمسة"),
            body: L(
              "Applications, agreements, renewals and invoicing live in one record per lease, not four separate files.",
              "تعيش الطلبات والاتفاقيات والتجديدات والفوترة في سجل واحد لكل عقد، لا في أربعة ملفات منفصلة."
            ),
          },
          {
            icon: "message",
            title: L("Support in Arabic and English", "دعم بالعربية والإنجليزية"),
            body: L(
              "Your leasing team gets local support in both languages when a tenant's contract needs a quick fix.",
              "يحصل فريق التأجير على دعم محلي باللغتين عندما يحتاج عقد المستأجر تعديلاً سريعاً."
            ),
          },
        ],
      },
    ],
  },

  "/solutions/property-portfolio-financials": {
    eyebrow: SOLUTIONS,
    title: L("Billing & Financials", "الفوترة والماليات"),
    body: L(
      "Owner-ready financial reporting across your entire portfolio — revenue, collections, and occupancy in one connected view.",
      "تقارير مالية جاهزة للملّاك عبر كامل محفظتك — الإيرادات والتحصيل والإشغال في عرض واحد متصل."
    ),
    sections: [
      {
        kind: "iconFeatures",
        items: [
          {
            icon: "wallet",
            title: L("Real-time revenue and collections dashboards", "لوحات تحكم فورية للإيرادات والتحصيل"),
            body: L(
              "See what's been collected, what's overdue and what's projected, updated the moment a payment lands.",
              "اطّلع على ما تم تحصيله وما تأخر وما هو متوقع، محدّثاً فور وصول أي دفعة."
            ),
          },
          {
            icon: "file",
            title: L("Owner statements generated automatically", "كشوف حساب للملّاك تُنشأ تلقائياً"),
            body: L(
              "Owners get a clear statement every period without your finance team building it by hand.",
              "يحصل الملّاك على كشف حساب واضح كل فترة دون أن يُعدّه فريق المالية يدوياً."
            ),
          },
          {
            icon: "compound",
            title: L("Occupancy and portfolio performance in one view", "الإشغال وأداء المحفظة في عرض واحد"),
            body: L(
              "Compare occupancy and revenue across every property in the portfolio from a single screen.",
              "قارن الإشغال والإيرادات عبر كل عقار في المحفظة من شاشة واحدة."
            ),
          },
          {
            icon: "briefcase",
            title: L("Export-ready reporting for finance teams", "تقارير جاهزة للتصدير لفرق المالية"),
            body: L(
              "Pull a clean export whenever finance needs one, instead of rebuilding a report from scratch each time.",
              "استخرج تقريراً منظماً وقت الحاجة دون إعادة بنائه من الصفر في كل مرة."
            ),
          },
        ],
      },
      {
        kind: "whyAtar",
        heading: L("Why Atar for Billing & Financials", "لماذا أتار للفوترة والماليات"),
        subtitle: L(
          "What owner-ready reporting looks like when it comes straight out of the same platform running your portfolio.",
          "كيف تبدو التقارير الجاهزة للملّاك عندما تصدر مباشرة من المنصة نفسها التي تدير محفظتك."
        ),
        cards: [
          {
            icon: "refresh",
            title: L("Live, not batch", "مباشر لا دفعي"),
            body: L(
              "Collections and occupancy figures update as payments and move-outs happen, not at month-end close.",
              "تتحدّث أرقام التحصيل والإشغال فور حدوث الدفعات وإخلاء الوحدات، لا عند إقفال نهاية الشهر."
            ),
          },
          {
            icon: "shield",
            title: L("Built for Saudi compliance", "مصمم للامتثال السعودي"),
            body: L(
              "Invoices and statements carry ZATCA-ready formatting, so finance isn't reformatting them by hand.",
              "تحمل الفواتير والكشوف تنسيقاً جاهزاً لهيئة الزكاة والضريبة والجمارك، فلا يعيد فريق المالية تنسيقها يدوياً."
            ),
          },
          {
            icon: "layers",
            title: L("One system, not five", "نظام واحد لا خمسة"),
            body: L(
              "Revenue, collections and occupancy come from the same records as leasing and operations — not a separate export.",
              "تأتي الإيرادات والتحصيل والإشغال من نفس سجلات التأجير والعمليات، لا من تصدير منفصل."
            ),
          },
          {
            icon: "message",
            title: L("Support in Arabic and English", "دعم بالعربية والإنجليزية"),
            body: L(
              "Your finance team gets local support in both languages when an owner statement needs a closer look.",
              "يحصل فريق المالية على دعم محلي باللغتين عندما يحتاج كشف حساب المالك لمراجعة أدق."
            ),
          },
        ],
      },
    ],
  },

  "/solutions/maintenance-ticketing": {
    eyebrow: SOLUTIONS,
    title: L("Maintenance & Ticketing", "الصيانة والتذاكر"),
    body: L(
      "Run every maintenance request end to end, with KPI tracking so nothing sits unresolved.",
      "أدر كل طلب صيانة من البداية للنهاية، مع تتبّع مؤشرات الأداء حتى لا يبقى شيء دون حل."
    ),
    sections: [
      {
        kind: "iconFeatures",
        items: [
          {
            icon: "ticket",
            title: L("Customer-initiated ticket workflows", "سير عمل تذاكر يبدأها العميل"),
            body: L(
              "Tenants and owners raise a request themselves, with photos and details attached from the start.",
              "يرفع المستأجرون والملّاك الطلب بأنفسهم، مع الصور والتفاصيل المرفقة منذ البداية."
            ),
          },
          {
            icon: "briefcase",
            title: L("Vendor and technician dispatch", "إرسال المقاولين والفنيين"),
            body: L(
              "The right vendor or technician gets assigned and notified automatically based on the ticket type.",
              "يُكلَّف المقاول أو الفني المناسب ويُبلَّغ تلقائياً حسب نوع التذكرة."
            ),
          },
          {
            icon: "chart",
            title: L("SLA and KPI tracking on every ticket", "تتبّع اتفاقيات مستوى الخدمة ومؤشرات الأداء على كل تذكرة"),
            body: L(
              "Response and resolution times are tracked against SLA automatically, not reconstructed after the fact.",
              "تُتابع أوقات الاستجابة والحل تلقائياً مقابل اتفاقية مستوى الخدمة، لا بإعادة بنائها لاحقاً."
            ),
          },
          {
            icon: "clipboard",
            title: L("Full audit trail from request to resolution", "سجل تدقيق كامل من الطلب إلى الحل"),
            body: L(
              "Every update, photo and note stays attached to the ticket, so a dispute is settled by the record, not memory.",
              "يبقى كل تحديث وصورة وملاحظة مرفقة بالتذكرة، فيُحسم أي خلاف بالسجل لا بالذاكرة."
            ),
          },
        ],
      },
      {
        kind: "whyAtar",
        heading: L("Why Atar for Maintenance & Ticketing", "لماذا أتار للصيانة والتذاكر"),
        subtitle: L(
          "What changes when every ticket runs on the same platform as the lease, the unit and the owner behind it.",
          "ما الذي يتغيّر عندما تعمل كل تذكرة على نفس منصة العقد والوحدة والمالك خلفها."
        ),
        cards: [
          {
            icon: "refresh",
            title: L("Live, not batch", "مباشر لا دفعي"),
            body: L(
              "Ticket status updates the moment a technician acts on it — tenants aren't left guessing.",
              "تتحدّث حالة التذكرة فور تصرّف الفني بشأنها، فلا يبقى المستأجر في حيرة."
            ),
          },
          {
            icon: "shield",
            title: L("Built for Saudi compliance", "مصمم للامتثال السعودي"),
            body: L(
              "Vendor records and service history are kept in a form your compliance team can actually audit.",
              "تُحفظ سجلات المقاولين وتاريخ الخدمة بشكل يمكن لفريق الامتثال مراجعته فعلياً."
            ),
          },
          {
            icon: "layers",
            title: L("One system, not five", "نظام واحد لا خمسة"),
            body: L(
              "A ticket is linked to its unit, lease and owner automatically — not a standalone helpdesk with no context.",
              "تُربط التذكرة بوحدتها وعقدها ومالكها تلقائياً، لا كنظام دعم مستقل بلا سياق."
            ),
          },
          {
            icon: "message",
            title: L("Support in Arabic and English", "دعم بالعربية والإنجليزية"),
            body: L(
              "Your operations team gets local support in both languages when an urgent ticket needs escalation.",
              "يحصل فريق العمليات على دعم محلي باللغتين عندما تحتاج تذكرة عاجلة إلى تصعيد."
            ),
          },
        ],
      },
    ],
  },

  "/solutions/facilities-management": {
    eyebrow: SOLUTIONS,
    title: L("Facilities Management", "إدارة المرافق"),
    body: L(
      "Keep shared assets and common areas maintained, with teams assigned, monitored, and accountable.",
      "حافظ على صيانة الأصول المشتركة والمناطق المشتركة، مع تكليف الفرق ومتابعتها ومحاسبتها."
    ),
    sections: [
      {
        kind: "iconFeatures",
        items: [
          {
            icon: "facility",
            title: L("Manage common areas and shared facilities", "أدر المناطق المشتركة والمرافق المشتركة"),
            body: L(
              "Lobbies, pools, gyms and parking are tracked as assets with their own maintenance history.",
              "تُتابع الردهات والمسابح والصالات الرياضية ومواقف السيارات كأصول لها سجل صيانة خاص بها."
            ),
          },
          {
            icon: "calendar",
            title: L("Facility booking management for shared spaces", "إدارة حجز المرافق للمساحات المشتركة"),
            body: L(
              "Residents reserve shared spaces themselves, with double-bookings and conflicts prevented automatically.",
              "يحجز السكان المساحات المشتركة بأنفسهم، مع منع التعارض والحجز المزدوج تلقائياً."
            ),
          },
          {
            icon: "users",
            title: L("Assign and monitor maintenance teams", "كلّف فرق الصيانة وتابعها"),
            body: L(
              "See which team is on which job right now, and whether it's on schedule, from one dashboard.",
              "اطّلع على الفريق المكلّف بكل مهمة الآن ومدى التزامه بالجدول من لوحة تحكم واحدة."
            ),
          },
          {
            icon: "refresh",
            title: L("Preventive maintenance scheduling", "جدولة الصيانة الوقائية"),
            body: L(
              "Recurring inspections and servicing are scheduled automatically instead of relying on someone to remember.",
              "تُجدوَل الفحوصات والصيانة الدورية تلقائياً بدل الاعتماد على تذكّر أحد لها."
            ),
          },
        ],
      },
      {
        kind: "whyAtar",
        heading: L("Why Atar for Facilities Management", "لماذا أتار لإدارة المرافق"),
        subtitle: L(
          "Why shared assets stop being everyone's job and no one's responsibility.",
          "لماذا تتوقف الأصول المشتركة عن أن تكون مسؤولية الجميع ولا أحد في آن واحد."
        ),
        cards: [
          {
            icon: "refresh",
            title: L("Live, not batch", "مباشر لا دفعي"),
            body: L(
              "Booking conflicts and maintenance status update in real time across every building in the portfolio.",
              "تتحدّث حالة الصيانة وتعارضات الحجز فورياً عبر كل مبنى في المحفظة."
            ),
          },
          {
            icon: "shield",
            title: L("Built for Saudi compliance", "مصمم للامتثال السعودي"),
            body: L(
              "Facility safety and inspection records are kept in a form ready for a regulator or an insurer to review.",
              "تُحفظ سجلات سلامة المرافق وفحصها بشكل جاهز لمراجعة جهة تنظيمية أو شركة تأمين."
            ),
          },
          {
            icon: "layers",
            title: L("One system, not five", "نظام واحد لا خمسة"),
            body: L(
              "Facility bookings and maintenance sit on the same platform as the community's own portal — not a separate app.",
              "تعيش حجوزات المرافق وصيانتها على نفس منصة بوابة المجتمع، لا في تطبيق منفصل."
            ),
          },
          {
            icon: "message",
            title: L("Support in Arabic and English", "دعم بالعربية والإنجليزية"),
            body: L(
              "Your facilities team gets local support in both languages when a shared asset needs urgent attention.",
              "يحصل فريق المرافق على دعم محلي باللغتين عندما يحتاج أصل مشترك لعناية عاجلة."
            ),
          },
        ],
      },
    ],
  },

  "/solutions/community-engagement-access": {
    eyebrow: SOLUTIONS,
    title: L("Community Engagement & Access", "تفاعل المجتمع والدخول"),
    body: L(
      "Keep residents and tenants informed and engaged, and control who comes and goes across your properties.",
      "أبقِ السكان والمستأجرين على اطلاع وتفاعل، وتحكّم بمن يدخل ويخرج عبر عقاراتك."
    ),
    sections: [
      {
        kind: "iconFeatures",
        items: [
          {
            icon: "bell",
            title: L("News, events, surveys and suggestions", "أخبار وفعاليات واستبيانات واقتراحات"),
            body: L(
              "Post an announcement or a survey once and it reaches every resident on the app, not just a WhatsApp group.",
              "انشر إعلاناً أو استبياناً مرة واحدة ليصل إلى كل ساكن عبر التطبيق، لا مجرد مجموعة واتساب."
            ),
          },
          {
            icon: "idCard",
            title: L("Visitor management and access control", "إدارة الزوار والتحكم في الدخول"),
            body: L(
              "Residents pre-register guests and deliveries, so security knows who's expected before they arrive.",
              "يسجّل السكان زوارهم وطلبات التوصيل مسبقاً، فيعرف الأمن الوافدين قبل وصولهم."
            ),
          },
          {
            icon: "users",
            title: L("Resident directory and announcements", "دليل السكان والإعلانات"),
            body: L(
              "A shared directory keeps residents reachable for the community without swapping personal numbers around.",
              "يبقي الدليل المشترك السكان قابلين للتواصل ضمن المجتمع دون تبادل أرقام شخصية."
            ),
          },
          {
            icon: "message",
            title: L("Community-wide notifications", "إشعارات على مستوى المجتمع"),
            body: L(
              "Urgent notices — a water outage, a maintenance window — reach every unit at once, in Arabic and English.",
              "تصل الإشعارات العاجلة — انقطاع مياه أو نافذة صيانة — إلى كل وحدة فوراً، بالعربية والإنجليزية."
            ),
          },
        ],
      },
      {
        kind: "whyAtar",
        heading: L("Why Atar for Community Engagement", "لماذا أتار لتفاعل المجتمع"),
        subtitle: L(
          "What a connected community app gives residents that a notice board and a guard logbook never could.",
          "ما الذي يمنحه تطبيق مجتمع متصل للسكان ولا يستطيع لوح إعلانات أو سجل حارس تقديمه."
        ),
        cards: [
          {
            icon: "refresh",
            title: L("Live, not batch", "مباشر لا دفعي"),
            body: L(
              "Announcements and visitor approvals reach residents the moment they're sent, not on the next printed notice.",
              "تصل الإعلانات وموافقات الزوار للسكان فور إرسالها، لا في الإشعار المطبوع التالي."
            ),
          },
          {
            icon: "shield",
            title: L("Built for Saudi compliance", "مصمم للامتثال السعودي"),
            body: L(
              "Visitor and access logs are kept in a form your security team can hand to a regulator without reformatting.",
              "تُحفظ سجلات الزوار والدخول بشكل يستطيع فريق الأمن تسليمه لجهة تنظيمية دون إعادة تنسيق."
            ),
          },
          {
            icon: "layers",
            title: L("One system, not five", "نظام واحد لا خمسة"),
            body: L(
              "Announcements, visitor access and the resident directory live in the same app as service requests and billing.",
              "تعيش الإعلانات ودخول الزوار ودليل السكان في التطبيق نفسه الذي يحتوي طلبات الخدمة والفوترة."
            ),
          },
          {
            icon: "message",
            title: L("Support in Arabic and English", "دعم بالعربية والإنجليزية"),
            body: L(
              "Residents and your community team both get support in the language they're already communicating in.",
              "يحصل السكان وفريق إدارة المجتمع على الدعم باللغة التي يتواصلون بها أصلاً."
            ),
          },
        ],
      },
    ],
  },

  // Deliberate exception (same pattern as "/solutions/listing-website"
  // above): an exact copy of "/products/addons/branded-mobile-app", and
  // pages/PlaceholderPage.tsx's isBrandedMobileApp flag treats this path the
  // same as that add-on page — both hero layouts, the layout switcher, the
  // feature showcase, the Download CTA — per an explicit request to reuse
  // that page wholesale here rather than the generic Solutions template.
  "/solutions/customer-portal": {
    eyebrow: L("Add-ons", "الإضافات"),
    title: L("Branded Mobile App", "تطبيق جوال بعلامتك التجارية"),
    body: L(
      "A white-labeled mobile app for your tenants, owners and buyers — service requests, payments and announcements, under your own brand.",
      "تطبيق جوال بعلامتك الخاصة لمستأجريك وملّاكك ومشتريك — طلبات الخدمة والمدفوعات والإعلانات، تحت علامتك التجارية."
    ),
    // No generic "bullets" section here — same as the add-on page, the
    // content is covered by the bespoke components in PlaceholderPage.tsx.
  },

  "/solutions/reporting-analytics": {
    eyebrow: SOLUTIONS,
    title: L("Reporting & Analytics", "التقارير والتحليلات"),
    body: L(
      "Real-time dashboards and KPIs across sales, leasing and operations, so decisions are backed by current data.",
      "لوحات تحكم ومؤشرات أداء فورية عبر المبيعات والتأجير والعمليات، لتكون القرارات مدعومة ببيانات حالية."
    ),
    sections: [
      {
        kind: "iconFeatures",
        items: [
          {
            icon: "chart",
            title: L("Real-time dashboards across every module", "لوحات تحكم فورية عبر كل وحدة"),
            body: L(
              "Sales, leasing, operations and finance data sit on one dashboard instead of four separate exports.",
              "تجتمع بيانات المبيعات والتأجير والعمليات والمالية في لوحة تحكم واحدة بدل أربعة تصديرات منفصلة."
            ),
          },
          {
            icon: "trending",
            title: L("Custom KPI tracking for your team", "تتبّع مؤشرات أداء مخصصة لفريقك"),
            body: L(
              "Track the specific metrics your team is measured on, not a generic template built for someone else.",
              "تابع المؤشرات المحددة التي يُقاس عليها فريقك، لا قالباً عاماً مبنياً لجهة أخرى."
            ),
          },
          {
            icon: "briefcase",
            title: L("Export-ready reports for stakeholders", "تقارير جاهزة للتصدير لأصحاب المصلحة"),
            body: L(
              "Board and investor updates export in minutes, pulled from the same live numbers your team already sees.",
              "تُصدَّر تحديثات المجلس والمستثمرين خلال دقائق، من نفس الأرقام الحية التي يراها فريقك أصلاً."
            ),
          },
          {
            icon: "link",
            title: L("Connects to PowerBI for deeper analysis", "تتصل بـ PowerBI لتحليل أعمق"),
            body: L(
              "Feed the same live data into PowerBI when your analysts need to go beyond the built-in dashboards.",
              "غذِّ نفس البيانات الحية إلى PowerBI عندما يحتاج محللوك تحليلاً أعمق من اللوحات المدمجة."
            ),
          },
        ],
      },
      {
        kind: "whyAtar",
        heading: L("Why Atar for Reporting & Analytics", "لماذا أتار للتقارير والتحليلات"),
        subtitle: L(
          "Why the numbers in your reports match the numbers your teams are actually working from.",
          "لماذا تتطابق الأرقام في تقاريرك مع الأرقام التي تعمل عليها فرقك فعلياً."
        ),
        cards: [
          {
            icon: "refresh",
            title: L("Live, not batch", "مباشر لا دفعي"),
            body: L(
              "Dashboards reflect what happened this hour, not what was true at last night's export.",
              "تعكس لوحات التحكم ما حدث هذه الساعة، لا ما كان صحيحاً عند تصدير الليلة الماضية."
            ),
          },
          {
            icon: "shield",
            title: L("Built for Saudi compliance", "مصمم للامتثال السعودي"),
            body: L(
              "Financial figures trace back to ZATCA-ready records, so a report can be defended, not just presented.",
              "تعود الأرقام المالية إلى سجلات جاهزة لهيئة الزكاة والضريبة والجمارك، فيمكن الدفاع عن التقرير لا مجرد عرضه."
            ),
          },
          {
            icon: "layers",
            title: L("One system, not five", "نظام واحد لا خمسة"),
            body: L(
              "Every dashboard reads from the same sales, leasing and operations data — no reconciling three exports first.",
              "تقرأ كل لوحة تحكم من نفس بيانات المبيعات والتأجير والعمليات، دون تسوية ثلاثة تصديرات أولاً."
            ),
          },
          {
            icon: "message",
            title: L("Support in Arabic and English", "دعم بالعربية والإنجليزية"),
            body: L(
              "Your leadership team gets local support in both languages when a KPI needs explaining before a board meeting.",
              "يحصل فريق القيادة على دعم محلي باللغتين عندما يحتاج مؤشر أداء لشرح قبل اجتماع المجلس."
            ),
          },
        ],
      },
    ],
  },

  // ---- Markets by asset class --------------------------------------------
  "/markets/residential": {
    eyebrow: MARKETS,
    title: L("Residential", "سكني"),
    body: L(
      "Every residential asset class you hold, from single-family homes to multifamily residential portfolios, on one platform.",
      "كل فئة من الأصول السكنية التي تديرها، من المنازل الفردية إلى المحافظ السكنية متعددة الوحدات، على منصة واحدة."
    ),
    sections: [
      {
        kind: "bullets",
        items: [
          L("Residential single family", "سكني للأسرة الواحدة"),
          L("Residential multifamily", "سكني متعدد الوحدات"),
          L("Lease management from listing to renewal", "إدارة التأجير من الإعلان إلى التجديد"),
          L("Tenant and owner communication built in", "تواصل مدمج مع المستأجرين والملّاك"),
        ],
      },
    ],
  },

  "/markets/retail": {
    eyebrow: MARKETS,
    title: L("Retail", "تجزئة"),
    body: L(
      "Manage retail centers and storefronts, from complex commercial lease terms to multi-tenant portfolio reporting.",
      "أدر مراكز ومحلات التجزئة، من شروط الإيجار التجاري المعقدة إلى تقارير المحفظة متعددة المستأجرين."
    ),
    sections: [
      {
        kind: "bullets",
        items: [
          L("Complex commercial lease terms", "شروط إيجار تجاري معقدة"),
          L("Multi-tenant portfolio reporting", "تقارير محفظة متعددة المستأجرين"),
          L("Facility and common-area management", "إدارة المرافق والمناطق المشتركة"),
          L("Online payments and collections", "مدفوعات وتحصيل إلكتروني"),
        ],
      },
    ],
  },

  "/markets/office": {
    eyebrow: MARKETS,
    title: L("Office", "مكاتب"),
    body: L(
      "Run office portfolios with the lease complexity, common-area management, and investor-ready reporting the asset class demands.",
      "أدر محافظ المكاتب بما يتطلبه هذا النوع من الأصول من تعقيد في الإيجار وإدارة للمناطق المشتركة وتقارير جاهزة للمستثمرين."
    ),
    sections: [
      {
        kind: "bullets",
        items: [
          L("Multi-tenant office lease management", "إدارة عقود إيجار المكاتب متعددة المستأجرين"),
          L("Shared facility and common-area billing", "فوترة المرافق والمناطق المشتركة"),
          L("Investor-ready financial reporting", "تقارير مالية جاهزة للمستثمرين"),
          L("Online payments and collections", "مدفوعات وتحصيل إلكتروني"),
        ],
      },
    ],
  },

  "/markets/compounds-communities": {
    eyebrow: MARKETS,
    title: L("Compounds & Communities", "المجمّعات والمجتمعات السكنية"),
    body: L(
      "Coordinate shared amenities, service charges, and community rules across gated compounds and master-planned communities.",
      "نسّق المرافق المشتركة ورسوم الخدمة وأنظمة المجتمع عبر المجمعات المسوّرة والمجتمعات المخططة."
    ),
    sections: [
      {
        kind: "bullets",
        items: [
          L("Residential compound management", "إدارة المجمعات السكنية"),
          L("Service-charge automation", "أتمتة رسوم الخدمة"),
          L("Community announcements and directory", "إعلانات ودليل للمجتمع"),
          L("Visitor and access management", "إدارة الزوار والدخول"),
        ],
      },
    ],
  },

  "/markets/mixed-use-developments": {
    eyebrow: MARKETS,
    title: L("Mixed-use Developments", "المشاريع متعددة الاستخدامات"),
    body: L(
      "Coordinate residential, retail, and office components of one master-planned development on a single connected platform.",
      "نسّق المكونات السكنية والتجارية والمكتبية لمشروع مخطط واحد على منصة واحدة متصلة."
    ),
    sections: [
      {
        kind: "bullets",
        items: [
          L("One platform across residential, retail and office", "منصة واحدة عبر السكني والتجزئة والمكاتب"),
          L("Shared facility and common-area management", "إدارة المرافق والمناطق المشتركة"),
          L("Consolidated reporting across every asset type", "تقارير موحّدة عبر كل نوع من الأصول"),
          L("Community engagement across every resident and tenant", "تفاعل مجتمعي مع كل ساكن ومستأجر"),
        ],
      },
    ],
  },

  // ---- Compare pages ------------------------------------------------------
  "/compare/spreadsheets": {
    eyebrow: COMPARE,
    title: L("Atar vs. Disconnected Systems & Spreadsheets", "أتار مقابل الأنظمة المتفرقة وجداول البيانات"),
    body: L(
      "Real estate has become more complex than ever: more units, more stakeholders, more regulation, more systems. Separate software for sales, leasing and operations creates frustrating data silos. Atar replaces the spreadsheet-and-scattered-tools approach with one connected platform.",
      "أصبحت إدارة العقارات أكثر تعقيداً من أي وقت مضى: وحدات أكثر، وأطراف أكثر، وأنظمة أكثر. البرامج المنفصلة للمبيعات والتأجير والعمليات تخلق عزلاً مزعجاً في البيانات. يستبدل أتار أسلوب جداول البيانات والأدوات المتفرقة بمنصة واحدة متصلة."
    ),
    sections: [
      {
        kind: "compare",
        otherLabel: L("Spreadsheets & Disconnected Tools", "جداول البيانات والأدوات المتفرقة"),
        rows: [
          {
            aspect: L("Source of truth", "مصدر الحقيقة"),
            atar: L("One connected platform across sales, leasing and operations", "منصة واحدة متصلة عبر المبيعات والتأجير والعمليات"),
            other: L("Data scattered across spreadsheets, chats, and separate tools", "بيانات متفرقة بين جداول البيانات والمحادثات والأدوات المنفصلة"),
          },
          {
            aspect: L("Errors", "الأخطاء"),
            atar: L("Automated workflows reduce manual entry", "سير عمل آلي يقلل الإدخال اليدوي"),
            other: L("Manual processes increase the risk of errors", "العمليات اليدوية تزيد من احتمالية الأخطاء"),
          },
          {
            aspect: L("Reporting", "التقارير"),
            atar: L("Real-time dashboards and KPIs", "لوحات تحكم ومؤشرات أداء فورية"),
            other: L("Manually compiled reports, often out of date", "تقارير مجمّعة يدوياً وغالباً غير محدّثة"),
          },
          {
            aspect: L("Compliance", "الامتثال"),
            atar: L("Nafath, SADAD and ZATCA built in", "نفاذ وسداد وزاتكا مدمجة"),
            other: L("Manual compliance tracking", "تتبّع امتثال يدوي"),
          },
        ],
      },
    ],
  },

  "/compare/proptech-platforms": {
    eyebrow: COMPARE,
    title: L("Atar vs. Global PropTech Platforms", "أتار مقابل منصات التقنية العقارية العالمية"),
    body: L(
      "Global property management platforms weren't built for Saudi Arabia. Atar connects natively to the national infrastructure that matters here.",
      "لم تُبنَ منصات إدارة العقارات العالمية للسوق السعودي. يتصل أتار بشكل أصلي بالبنية التحتية الوطنية التي تهم هنا."
    ),
    sections: [
      {
        kind: "compare",
        otherLabel: L("Global Platforms", "المنصات العالمية"),
        rows: [
          {
            aspect: L("Identity verification", "التحقق من الهوية"),
            atar: L("Native Nafath single sign-on", "تسجيل دخول موحد عبر نفاذ بشكل أصلي"),
            other: L("Third-party or manual verification", "تحقق يدوي أو عبر طرف ثالث"),
          },
          {
            aspect: L("Payments & collections", "المدفوعات والتحصيل"),
            atar: L("Native SADAD, including bulk milestone billing", "سداد بشكل أصلي، بما في ذلك الفوترة المجمّعة للمراحل"),
            other: L("Generic global payment gateways only", "بوابات دفع عالمية عامة فقط"),
          },
          {
            aspect: L("E-invoicing", "الفوترة الإلكترونية"),
            atar: L("ZATCA Fatoora e-invoicing generated automatically from every contract", "فوترة إلكترونية (فاتورة) متوافقة مع زاتكا تُولَّد تلقائياً من كل عقد"),
            other: L("Manual or bolted-on compliance workarounds", "حلول امتثال يدوية أو مُلحقة"),
          },
          {
            aspect: L("Language", "اللغة"),
            atar: L("Arabic-first, RTL by design", "عربي أولاً، ومصمم للاتجاه من اليمين لليسار"),
            other: L("English-first, Arabic often an afterthought", "إنجليزي أولاً، والعربية غالباً إضافة لاحقة"),
          },
        ],
      },
    ],
  },

  "/compare/in-house": {
    eyebrow: COMPARE,
    title: L("Atar vs. Building In-House", "أتار مقابل البناء الداخلي"),
    body: L(
      "Real estate is one continuous lifecycle, from listing to renewal. Building and maintaining that in-house means replicating years of platform work before you even start managing property.",
      "العقار دورة حياة مستمرة واحدة، من الإعلان إلى التجديد. بناء ذلك داخلياً يعني إعادة بناء سنوات من العمل على المنصة قبل أن تبدأ حتى بإدارة العقار."
    ),
    sections: [
      {
        kind: "compare",
        otherLabel: L("Building In-House", "البناء الداخلي"),
        rows: [
          {
            aspect: L("Time to launch", "الوقت حتى الإطلاق"),
            atar: L("Live in weeks, not years of development", "جاهز خلال أسابيع، لا سنوات من التطوير"),
            other: L("Months to years of in-house build time", "شهور إلى سنوات من وقت البناء الداخلي"),
          },
          {
            aspect: L("Lifecycle coverage", "تغطية دورة الحياة"),
            atar: L("8-stage lifecycle covered out of the box", "دورة حياة من 8 مراحل مغطاة مباشرة"),
            other: L("Built incrementally, module by module", "يُبنى تدريجياً، وحدة تلو الأخرى"),
          },
          {
            aspect: L("Maintenance", "الصيانة"),
            atar: L("Continuously updated and supported", "تحديث ودعم مستمر"),
            other: L("Your team owns every bug and update", "فريقك مسؤول عن كل خطأ وتحديث"),
          },
          {
            aspect: L("Compliance upkeep", "متابعة الامتثال"),
            atar: L("Nafath/SADAD/ZATCA integrations maintained for you", "تكاملات نفاذ وسداد وزاتكا تُصان نيابة عنك"),
            other: L("Your team tracks and implements every regulation change", "فريقك يتابع وينفّذ كل تغيير تنظيمي"),
          },
        ],
      },
    ],
  },

  "/compare/point-solutions": {
    eyebrow: COMPARE,
    title: L("Atar vs. Point Solutions", "أتار مقابل الحلول الفردية"),
    body: L(
      "Atar covers all aspects of pre-sale and post-sale processes under one software seamlessly, so you're not stitching together separate leasing, accounting, and maintenance tools.",
      "يغطي أتار جميع جوانب عمليات ما قبل وما بعد البيع تحت برنامج واحد بسلاسة، فلا تضطر لربط أدوات منفصلة للتأجير والمحاسبة والصيانة."
    ),
    sections: [
      {
        kind: "compare",
        otherLabel: L("Point Solutions", "الحلول الفردية"),
        rows: [
          {
            aspect: L("Data model", "نموذج البيانات"),
            atar: L("One source of truth: properties, customers, contracts, financials, documents, workflows", "مصدر حقيقة واحد: العقارات والعملاء والعقود والماليات والمستندات وسير العمل"),
            other: L("Separate databases per tool, reconciled manually", "قواعد بيانات منفصلة لكل أداة، تُطابَق يدوياً"),
          },
          {
            aspect: L("Modules", "الوحدات"),
            atar: L("20+ modules on one data model", "أكثر من 20 وحدة على نموذج بيانات واحد"),
            other: L("Point solutions bought and integrated separately", "حلول فردية تُشترى وتُدمج بشكل منفصل"),
          },
          {
            aspect: L("Handoffs", "الانتقال بين المراحل"),
            atar: L("Sales, leasing and operations connected end to end", "المبيعات والتأجير والعمليات متصلة من البداية للنهاية"),
            other: L("Manual handoffs between disconnected tools", "انتقال يدوي بين أدوات غير متصلة"),
          },
          {
            aspect: L("Cost of ownership", "تكلفة الملكية"),
            atar: L("One subscription, one vendor relationship", "اشتراك واحد وعلاقة واحدة مع مزوّد واحد"),
            other: L("Multiple subscriptions, multiple vendor relationships", "اشتراكات متعددة وعلاقات متعددة مع مزوّدين"),
          },
        ],
      },
    ],
  },

  // ---- Case Studies ---------------------------------------------------
  "/case-studies": {
    eyebrow: L("Customers", "العملاء"),
    title: L("Case Studies", "دراسات الحالة"),
    body: L(
      "Real portfolios, real results. Five operators, developers, and owners running their business on Atar today.",
      "محافظ حقيقية ونتائج حقيقية. خمسة مشغّلين ومطورين وملّاك يديرون أعمالهم على أتار اليوم."
    ),
    sections: [
      {
        kind: "caseStudies",
        items: [
          {
            tag: L("Commercial RE Operator", "مشغّل عقارات تجارية"),
            title: L("Atar scales complex commercial leasing operations", "أتار يوسّع عمليات التأجير التجاري المعقدة"),
            challenge: L(
              "Scaling property management of a commercial portfolio of retail and office space, 1,200+ units spread across 13 cities.",
              "توسيع إدارة محفظة عقارات تجارية من مساحات تجزئة ومكاتب، أكثر من 1,200 وحدة موزعة على 13 مدينة."
            ),
            outcome: L(
              "The operator manages a portfolio with an annual rental value of SAR 400M, while handling relationships with more than 500 tenants simultaneously.",
              "يدير المشغّل محفظة بقيمة إيجار سنوية تبلغ 400 مليون ريال، مع إدارة علاقات أكثر من 500 مستأجر في آنٍ واحد."
            ),
            stats: [
              { value: "1,200+", label: L("Units", "وحدة") },
              { value: "13", label: L("Cities", "مدينة") },
              { value: "400M+", label: L("SAR annual rental value", "ريال قيمة إيجار سنوية") },
            ],
            imageId: "commercial-operator",
          },
          {
            tag: L("PIF Developer", "مطور تابع لصندوق الاستثمارات العامة"),
            title: L("Atar enables large-scale, seamless handovers", "أتار يمكّن عمليات تسليم سلسة وواسعة النطاق"),
            challenge: L(
              "Handing over 1,500 units to new homeowners in a flagship community, phase I, with only two months until handover.",
              "تسليم 1,500 وحدة لملّاك جدد في مجتمع رائد، المرحلة الأولى، مع مهلة شهرين فقط حتى موعد التسليم."
            ),
            outcome: L(
              "The developer handed over 1,500 units and now manages post-handover operations with more than 5,000 registered users.",
              "سلّم المطور 1,500 وحدة ويدير الآن عمليات ما بعد التسليم مع أكثر من 5,000 مستخدم مسجّل."
            ),
            stats: [
              { value: "3M", label: L("sqm project land area", "م² مساحة أرض المشروع") },
              { value: "1,500", label: L("Units handed over", "وحدة تم تسليمها") },
              { value: "5,000", label: L("End users", "مستخدم نهائي") },
            ],
            imageId: "pif-developer",
          },
          {
            tag: L("Residential RE Operator", "مشغّل عقارات سكنية"),
            title: L("Atar improves efficiency and customer satisfaction", "أتار يحسّن الكفاءة ورضا العملاء"),
            challenge: L(
              "Managing customer tickets and raising satisfaction across a portfolio of 1,700+ units in 7 different cities.",
              "إدارة تذاكر العملاء ورفع مستوى الرضا عبر محفظة من أكثر من 1,700 وحدة في 7 مدن مختلفة."
            ),
            outcome: L(
              "The operator handled more than 10,000 customer service tickets, reduced lead time by 50%, and achieved an average customer rating of 4.5 out of 5.",
              "تعامل المشغّل مع أكثر من 10,000 تذكرة خدمة عملاء، وخفّض زمن الاستجابة بنسبة 50%، وحقق تقييماً متوسطاً من العملاء بلغ 4.5 من 5."
            ),
            stats: [
              { value: "10,000+", label: L("Service tickets", "تذكرة خدمة") },
              { value: "50%", label: L("Reduction in lead time", "خفض في زمن الاستجابة") },
              { value: "4.5 / 5", label: L("Average customer rating", "متوسط تقييم العملاء") },
            ],
            imageId: "residential-operator",
          },
          {
            tag: L("Subdivision Developer", "مطور تقسيم أراضٍ"),
            title: L("Atar accelerates high-volume launches", "أتار يسرّع الإطلاقات عالية الحجم"),
            challenge: L(
              "Enabling a fully digital sales journey for buyers of residential and commercial land in a 415,000 sqm subdivision in Dammam. The developer digitalized plot sales within 20 days.",
              "تمكين رحلة مبيعات رقمية كاملة لمشتري الأراضي السكنية والتجارية في تقسيم بمساحة 415,000 م² في الدمام. أنجز المطور رقمنة مبيعات القطع خلال 20 يوماً."
            ),
            outcome: L(
              "SAR 40M+ of property sold in the first three hours of launch.",
              "بيع عقارات بقيمة تجاوزت 40 مليون ريال خلال أول ثلاث ساعات من الإطلاق."
            ),
            stats: [
              { value: "415,000", label: L("sqm project land area", "م² مساحة أرض المشروع") },
              { value: "100+", label: L("Sellable plots", "قطعة قابلة للبيع") },
              { value: "40M+", label: L("SAR sold in first 3 hours", "ريال مبيعات في أول 3 ساعات") },
            ],
            imageId: "subdivision-developer",
          },
          {
            tag: L("Residential RE Developer", "مطور عقارات سكنية"),
            title: L("Atar digitalizes large-volume sales processes", "أتار يرقمن عمليات المبيعات عالية الحجم"),
            challenge: L(
              "Implementing a scalable digital sales solution for one of the largest real estate developers, with an investment turnover of under 12 months.",
              "تنفيذ حل مبيعات رقمي قابل للتوسع لأحد أكبر المطورين العقاريين، بدورة استثمار أقل من 12 شهراً."
            ),
            outcome: L(
              "The developer fully digitalized its sales process on a customized platform connected to Nafath identity verification, SADAD payment processing and eSigning.",
              "أنجز المطور رقمنة كاملة لعملية المبيعات على منصة مخصصة متصلة بالتحقق من الهوية عبر نفاذ، ومعالجة المدفوعات عبر سداد، والتوقيع الإلكتروني."
            ),
            stats: [
              { value: "300M+", label: L("SAR property sales", "ريال مبيعات عقارية") },
              { value: "400+", label: L("Units sold", "وحدة مباعة") },
            ],
            imageId: "residential-developer",
          },
        ],
      },
      { kind: "logos" },
    ],
  },

  // ---- Company > Leadership -----------------------------------------
  "/company/leadership": {
    eyebrow: L("Company", "الشركة"),
    title: L("Leadership", "القيادة"),
    body: L(
      "Built inside the problem: from founding in 2021 to platform scale in 2025, built alongside the operators who use it.",
      "بُني من داخل المشكلة: من التأسيس عام 2021 إلى منصة على نطاق واسع عام 2025، بالتعاون مع المشغّلين الذين يستخدمونه."
    ),
    sections: [
      {
        kind: "team",
        heading: L("Board of Directors", "مجلس الإدارة"),
        items: [
          { name: "Bassam AlBassam", title: L("Chairman of the Board", "رئيس مجلس الإدارة") },
          { name: "Ahmed Mirghani", title: L("Board Member", "عضو مجلس الإدارة") },
          { name: "Haseeb Shaikh", title: L("Founder, Managing Director", "المؤسس والمدير الإداري") },
        ],
      },
      {
        kind: "team",
        heading: L("Executive Team", "الفريق التنفيذي"),
        items: [
          { name: "Haseeb Shaikh", title: L("Founder, Managing Director", "المؤسس والمدير الإداري") },
          { name: "Ghassan Dardas", title: L("Chief Commercial Officer", "الرئيس التجاري") },
          { name: "Ahmed Sharaf", title: L("Chief Technology Officer", "الرئيس التقني") },
        ],
      },
      {
        // Placeholder — swap for a real customer quote + headshot later.
        kind: "quote",
        items: [
          {
            quote: L(
              "Add a real customer quote here — this is placeholder text.",
              "أضف اقتباساً حقيقياً من عميل هنا — هذا نص مؤقت."
            ),
            name: "Haseeb Mohammed",
            title: L("Title, Company", "المسمى الوظيفي، الشركة"),
          },
        ],
      },
    ],
  },

  // ---- Resources > Blog -----------------------------------------------
  "/resources/blog": {
    eyebrow: L("Resources", "الموارد"),
    title: L("Blog", "المدونة"),
    body: L(
      "Insights on property management, compliance, and the Saudi real estate market. Our first guide, walking through the real estate lifecycle from listing to renewal, is on its way.",
      "رؤى حول إدارة العقارات والامتثال والسوق العقاري السعودي. دليلنا الأول، الذي يستعرض دورة حياة العقار من الإعلان إلى التجديد، في الطريق."
    ),
    sections: [
      {
        kind: "news",
        items: [
          {
            date: "2024-10-28",
            slug: "wathba-investment-partnership",
            title: L(
              "Wathba Investment Company Partners with Atar",
              "شركة وثبة الاستثمارية تختار منصة أتار شريكاً"
            ),
            body: L(
              "We are pleased to announce that Wathba Investment Company has chosen the Atar platform to be its partner in its journey towards digital transformation in real estate and residential community management.",
              "يسعدنا الإعلان عن اختيار شركة وثبة الاستثمارية لمنصة أتار شريكاً لها في رحلتها نحو التحول الرقمي في إدارة العقارات والمجتمعات السكنية."
            ),
          },
          {
            date: "2024-10-30",
            slug: "rafeh-real-estate-partnership",
            title: L(
              "Rafeh Real Estate Development Chooses Atar",
              "شركة رافع للتطوير العقاري تختار أتار"
            ),
            body: L(
              "We are pleased to announce that Rafeh Real Estate Development Company has chosen Atar platform to be its partner in its journey towards digital transformation in the management of real estate and residential communities.",
              "يسعدنا الإعلان عن اختيار شركة رافع للتطوير العقاري لمنصة أتار شريكاً لها في رحلتها نحو التحول الرقمي في إدارة العقارات والمجتمعات السكنية."
            ),
          },
          {
            date: "2024-11-04",
            slug: "mushid-company-partnership",
            title: L(
              "Mushid Company Selects Atar as Digital Transformation Partner",
              "شركة مشيد تختار أتار شريكاً للتحول الرقمي"
            ),
            body: L(
              "We are pleased to announce that Mushid Company has selected the Atar platform to be the primary partner in its digital transformation journey for managing real estate and residential communities.",
              "يسعدنا الإعلان عن اختيار شركة مشيد لمنصة أتار لتكون الشريك الأساسي في رحلة تحوّلها الرقمي لإدارة العقارات والمجتمعات السكنية."
            ),
          },
          {
            date: "2023-03-09",
            slug: "safa-investment-agreement",
            title: L(
              "Atar Signs Agreement with Safa Investment Company",
              "أتار توقّع اتفاقية مع شركة صفا الاستثمارية"
            ),
            body: L(
              "Under the patronage of the Minister of Municipalities and Housing, Mr. Majid Al-Hogail, and the Chairman of the Board of Directors of the Riyadh Chamber, Mr. Ajlan Al-Ajlan, we are pleased to announce the signing of an agreement with Safa Investment Company to provide a real estate and residential communities management system.",
              "برعاية معالي وزير الشؤون البلدية والقروية والإسكان الأستاذ ماجد الحقيل، ورئيس مجلس إدارة غرفة الرياض الأستاذ عجلان العجلان، يسعدنا الإعلان عن توقيع اتفاقية مع شركة صفا الاستثمارية لتوفير نظام إدارة العقارات والمجتمعات السكنية."
            ),
          },
          {
            date: "2023-09-12",
            slug: "al-sulaiman-cityscape-agreement",
            title: L(
              "Atar and Al Sulaiman Real Estate Sign Cooperation Agreement at Cityscape World",
              "أتار والسليمان العقارية توقّعان اتفاقية تعاون في سيتي سكيب العالمي"
            ),
            body: L(
              "On the sidelines of the #Cityscape_World exhibition, a cooperation agreement was signed between Atar Real Estate Services Company, in the presence of CEO / Hasib Mohammed, and Al Sulaiman Real Estate Company, in the presence of Business Development Manager / Othman Al Sulaiman.",
              "على هامش معرض #سيتي_سكيب العالمي، تم توقيع اتفاقية تعاون بين شركة أتار للخدمات العقارية، بحضور الرئيس التنفيذي / حسيب محمد، وشركة السليمان العقارية، بحضور مدير تطوير الأعمال / عثمان السليمان."
            ),
          },
          {
            date: "2024-11-08",
            slug: "khawaled-real-estate-launch",
            title: L(
              "Khawaled Real Estate Launches on Atar in 48 Hours",
              "الخوالد العقارية تطلق منصتها على أتار خلال 48 ساعة"
            ),
            body: L(
              "We are very pleased to proudly announce the launch of the Khawaled Real Estate Company platform in a record time of no more than 48 hours. The platform aims to provide all property and residential community management services and raise the quality of life for residents.",
              "يسرّنا الإعلان بكل فخر عن إطلاق منصة شركة الخوالد العقارية في وقت قياسي لا يتجاوز 48 ساعة. تهدف المنصة إلى توفير جميع خدمات إدارة العقارات والمجتمعات السكنية والارتقاء بجودة حياة السكان."
            ),
          },
        ],
      },
      {
        kind: "bullets",
        heading: L("Topics we're building out", "مواضيع نعمل عليها"),
        items: [
          L("The real estate lifecycle, explained", "دورة حياة العقار، بالتفصيل"),
          L("Ejar contracts and the AI contract reader", "عقود إيجار وقارئ العقود بالذكاء الاصطناعي"),
          L("ZATCA e-invoicing for landlords", "الفوترة الإلكترونية زاتكا للملّاك"),
          L("Nafath & SADAD: what they mean for your portfolio", "نفاذ وسداد: ماذا يعنيان لمحفظتك"),
        ],
      },
    ],
  },

  // ---- Legal Center -----------------------------------------------------
  "/legal/terms": {
    eyebrow: L("Legal Center", "المركز القانوني"),
    title: L("Terms of Use", "شروط الاستخدام"),
    body: L(
      "The governing version of this document is in English.",
      "النسخة المعتمدة قانونياً من هذه الوثيقة هي باللغة الإنجليزية."
    ),
    minimalFooter: true,
    sections: [
      {
        kind: "legal",
        updated: "Last updated January 01, 2026",
        note: L(
          "This is our real Terms of Use, governing your use of the Atar website and app. The English text below is the binding version.",
          "هذه شروط الاستخدام الفعلية التي تحكم استخدامك لموقع وتطبيق أتار. النص الإنجليزي أدناه هو النسخة المعتمدة قانونياً."
        ),
        sections: [
          {
            heading: "AGREEMENT TO OUR LEGAL TERMS",
            body: "We are Atar Real Estate Services Company, doing business as Atar (\"Company,\" \"we,\" \"us,\" \"our\"), a company registered in Saudi Arabia at 3504 Imam Saud bin Faisal Road, Al Malqa 6418, Riyadh, Riyadh 13522.\n\nWe operate the website https://www.goatar.com (the \"Site\"), the mobile application Atar (the \"App\"), as well as any other related products and services that refer or link to these legal terms (the \"Legal Terms\") (collectively, the \"Services\").\n\nYou can contact us by email at info@goatar.com or by mail to 3504 Imam Saud bin Faisal Road, Al Malqa 6418, Riyadh, Riyadh 13522, Saudi Arabia.\n\nThese Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (\"you\"), and Atar Real Estate Services Company, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.\n\nThe Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.",
          },
          {
            heading: "1. OUR SERVICES",
            body: "The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.",
          },
          {
            heading: "2. INTELLECTUAL PROPERTY RIGHTS",
            body: "We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the \"Content\"), as well as the trademarks, service marks, and logos contained therein (the \"Marks\"). Our Content and Marks are protected by copyright and trademark laws and treaties around the world, and are provided \"AS IS\" for your internal business purpose only.\n\nSubject to your compliance with these Legal Terms, we grant you a non-exclusive, non-transferable, revocable license to access the Services and to download or print a copy of any portion of the Content to which you have properly gained access, solely for your internal business purpose. Except as set out in these Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose without our express prior written permission. Requests should go to info@goatar.com.\n\nBy sending us Submissions or posting Contributions, you agree to assign to us all intellectual property rights in such Submissions, and you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, worldwide license to use, copy, reproduce, distribute, publish, and otherwise exploit your Contributions for any purpose. You are solely responsible for your Submissions and Contributions and warrant that they are original to you, do not violate any third-party rights, and are not illegal, harassing, hateful, defamatory, obscene, or misleading. We may remove or edit any Contributions at any time without notice.",
          },
          {
            heading: "3. USER REPRESENTATIONS",
            body: "By using the Services, you represent and warrant that: all registration information you submit will be true, accurate, current, and complete; you will maintain and promptly update such information; you have the legal capacity to comply with these Legal Terms; you are not a minor in your jurisdiction; you will not access the Services through automated or non-human means; you will not use the Services for any illegal or unauthorized purpose; and your use will not violate any applicable law or regulation. If any information you provide is untrue, inaccurate, or incomplete, we may suspend or terminate your account.",
          },
          {
            heading: "4. USER REGISTRATION",
            body: "You may be required to register to use the Services. You agree to keep your password confidential and are responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username we determine, in our sole discretion, to be inappropriate, obscene, or otherwise objectionable.",
          },
          {
            heading: "5. PURCHASES AND PAYMENT",
            body: "We accept Visa and Mastercard. You agree to provide current, complete, and accurate purchase and account information, and to promptly update it. All payments shall be in Saudi Riyals. We may change prices at any time, and reserve the right to correct pricing errors even after payment has been requested or received, and to refuse or limit any order at our sole discretion, including orders that appear to be placed by dealers, resellers, or distributors.",
          },
          {
            heading: "6. SUBSCRIPTIONS",
            body: "Billing and Renewal: your subscription continues and automatically renews unless canceled; you consent to recurring charges to your payment method until you cancel.\n\nFree Trial: we offer a 14-day free trial to new users. The account will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the free trial.\n\nCancellation: all purchases are non-refundable. You can cancel your subscription at any time by contacting info@goatar.com. Cancellation takes effect at the end of the current paid term.\n\nFee Changes: we may change subscription fees from time to time and will communicate any price changes in accordance with applicable law.",
          },
          {
            heading: "7. PROHIBITED ACTIVITIES",
            body: "You may not access or use the Services for any purpose other than that for which we make them available. Prohibited activities include (among others): systematically retrieving data to build a collection or database without permission; attempting to defraud or mislead us or other users; circumventing or interfering with security features; harassing, abusing, or harming other users; misusing support services or submitting false abuse reports; unauthorized framing of or linking to the Services; uploading viruses or other harmful material; automated data mining, scraping, or use of bots; impersonating another user; interfering with or disrupting the Services or connected networks; attempting to bypass access restrictions; reverse-engineering the Services' software; and using the Services to compete with us or for unauthorized commercial purposes.",
          },
          {
            heading: "8. USER GENERATED CONTRIBUTIONS",
            body: "The Services may invite you to chat, contribute to, or participate in blogs, message boards, and other functionality, and to submit content (\"Contributions\"). By making Contributions available, you represent and warrant that they do not infringe any third party's rights, that you own or have the necessary rights and licenses to them, that they are not false or misleading, are not unsolicited advertising or spam, are not obscene, harassing, or otherwise objectionable, and do not violate any applicable law. Violations may result in termination or suspension of your rights to use the Services.",
          },
          {
            heading: "9. CONTRIBUTION LICENSE",
            body: "By posting Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, worldwide license to host, use, copy, reproduce, publish, distribute, and create derivative works from such Contributions, for any purpose. You retain full ownership of your Contributions; we do not assert ownership over them, but may edit, re-categorize, or delete Contributions at any time and for any reason, without notice.",
          },
          {
            heading: "10. MOBILE APPLICATION LICENSE",
            body: "If you access the Services via the App, we grant you a revocable, non-exclusive, non-transferable, limited license to install and use the App on devices you own or control. You may not decompile, reverse-engineer, or modify the App; use it for unauthorized commercial purposes; make it available to multiple users over a network; or use it to build a competing product. Additional terms apply if the App was obtained via the Apple App Store or Google Play, including that those app distributors are not responsible for maintenance or support and are third-party beneficiaries of this license.",
          },
          {
            heading: "11. THIRD-PARTY WEBSITES AND CONTENT",
            body: "The Services may link to third-party websites or content that we do not investigate, monitor, or check for accuracy, and for which we assume no responsibility. If you access third-party websites or content through the Services, you do so at your own risk, and any purchases made through them are solely between you and that third party.",
          },
          {
            heading: "12. SERVICES MANAGEMENT",
            body: "We reserve the right, but not the obligation, to monitor the Services for violations of these Legal Terms, take legal action against violators, restrict or disable access to any Contributions, remove excessive or burdensome content, and otherwise manage the Services to protect our rights and property.",
          },
          {
            heading: "13. PRIVACY POLICY",
            body: "We care about data privacy and security. Please review our Privacy Policy, which is incorporated into these Legal Terms. The Services are hosted in Saudi Arabia; by using the Services from another region, you consent to your data being transferred to and processed in Saudi Arabia.",
          },
          {
            heading: "14. COPYRIGHT INFRINGEMENTS",
            body: "We respect the intellectual property rights of others. If you believe material on the Services infringes a copyright you own or control, please notify us using the contact information in Section 27. Misrepresentations in a notification may result in liability under applicable law.",
          },
          {
            heading: "15. TERM AND TERMINATION",
            body: "These Legal Terms remain in effect while you use the Services. We reserve the right, in our sole discretion and without notice, to deny access to and use of the Services to any person for any reason, and to terminate your account and delete your content at any time. If your account is terminated, you may not register a new account under your name, a false name, or a third party's name.",
          },
          {
            heading: "16. MODIFICATIONS AND INTERRUPTIONS",
            body: "We reserve the right to change, modify, or remove the contents of the Services at any time, without notice or obligation to update, and we will not be liable for any modification, suspension, or discontinuance of the Services or for any downtime.",
          },
          {
            heading: "17. GOVERNING LAW",
            body: "These Legal Terms are governed by the laws of Saudi Arabia. Atar Real Estate Services Company and you irrevocably consent that the courts of Saudi Arabia shall have exclusive jurisdiction to resolve any dispute arising in connection with these Legal Terms.",
          },
          {
            heading: "18. DISPUTE RESOLUTION",
            body: "The parties agree to first attempt to negotiate any dispute informally for at least 30 days before initiating arbitration. Disputes not resolved informally shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Brussels, Belgium), with three arbitrators, seated in Riyadh, Saudi Arabia, proceedings in Arabic, governed by the substantive law of Saudi Arabia. Arbitration is limited to disputes between the parties individually — no class actions or representative claims. Disputes concerning intellectual property rights, allegations of theft, piracy, invasion of privacy, unauthorized use, or claims for injunctive relief are not subject to informal negotiation or arbitration and may be brought before a court of competent jurisdiction.",
          },
          {
            heading: "19. CORRECTIONS",
            body: "There may be information on the Services containing typographical errors, inaccuracies, or omissions. We reserve the right to correct any such errors and to change or update information at any time without prior notice.",
          },
          {
            heading: "20. DISCLAIMER",
            body: "THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT, AND WE MAKE NO WARRANTY AS TO THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT. WE ASSUME NO LIABILITY FOR ERRORS, PERSONAL INJURY OR PROPERTY DAMAGE, UNAUTHORIZED ACCESS TO OUR SERVERS, INTERRUPTION OF TRANSMISSION, OR BUGS OR VIRUSES TRANSMITTED THROUGH THE SERVICES BY THIRD PARTIES. WE DO NOT ENDORSE OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED BY A THIRD PARTY THROUGH THE SERVICES.",
          },
          {
            heading: "21. LIMITATIONS OF LIABILITY",
            body: "IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICES. OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.",
          },
          {
            heading: "22. INDEMNIFICATION",
            body: "You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, officers, agents, partners, and employees, from any loss, damage, liability, claim, or demand made by any third party due to or arising out of your Contributions, use of the Services, breach of these Legal Terms, breach of your representations and warranties, violation of a third party's rights, or any harmful act toward another user.",
          },
          {
            heading: "23. USER DATA",
            body: "We maintain certain data you transmit to the Services to manage performance, as well as data relating to your use of the Services. Although we perform routine backups, you are solely responsible for all data you transmit, and we have no liability to you for any loss or corruption of such data.",
          },
          {
            heading: "24. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
            body: "Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications and agree that electronic signatures, contracts, orders, and records satisfy any legal requirement that such communications be in writing.",
          },
          {
            heading: "25. SMS TEXT MESSAGING",
            body: "By opting into any Atar text messaging program, you expressly consent to receive SMS messages, which may include account alerts, order updates, responses to inquiries, appointment reminders, and special offers. Message and data rates may apply depending on your carrier. For help, reply HELP or email info@goatar.com.",
          },
          {
            heading: "26. MISCELLANEOUS",
            body: "These Legal Terms, together with any policies or operating rules posted on the Services, constitute the entire agreement between you and us. Our failure to enforce any right or provision does not waive it. We may assign our rights and obligations at any time. If any provision is found unlawful or unenforceable, it is deemed severable and does not affect the remaining provisions. No joint venture, partnership, employment, or agency relationship is created between you and us as a result of these Legal Terms.",
          },
          {
            heading: "27. CONTACT US",
            body: "To resolve a complaint regarding the Services or for further information, contact:\n\nAtar Real Estate Services Company\n3504 Imam Saud bin Faisal Road\nAl Malqa 6418\nRiyadh, Riyadh 13522\nSaudi Arabia\ninfo@goatar.com",
          },
        ],
      },
    ],
  },

  "/legal/privacy": {
    eyebrow: L("Legal Center", "المركز القانوني"),
    title: L("Privacy Policy", "سياسة الخصوصية"),
    body: L(
      "The governing version of this document is in English.",
      "النسخة المعتمدة قانونياً من هذه الوثيقة هي باللغة الإنجليزية."
    ),
    minimalFooter: true,
    sections: [
      {
        kind: "legal",
        updated: "Last updated January 01, 2026",
        note: L(
          "This is our real Privacy Policy, describing how we collect, use, and protect your personal information. The English text below is the binding version.",
          "هذه سياسة الخصوصية الفعلية التي تصف كيفية جمعنا لبياناتك الشخصية واستخدامها وحمايتها. النص الإنجليزي أدناه هو النسخة المعتمدة قانونياً."
        ),
        sections: [
          {
            heading: "OVERVIEW",
            body: "This Privacy Notice for Atar Real Estate Services Company (doing business as Atar) describes how and why we might access, collect, store, use, and/or share (\"process\") your personal information when you visit our website at https://www.goatar.com, download and use our mobile application (Atar), or otherwise engage with us, including marketing or events. If you do not agree with our policies and practices, please do not use our Services. Questions or concerns may be sent to info@goatar.com.\n\nWe do not process sensitive personal information (such as racial or ethnic origin, sexual orientation, or religious beliefs), and we do not collect any information from third parties.",
          },
          {
            heading: "1. WHAT INFORMATION DO WE COLLECT?",
            body: "Personal information you disclose to us: names, phone numbers, email addresses, billing addresses, mailing addresses, and contact or authentication data, collected when you register, express interest in our products, participate in activities on the Services, or contact us.\n\nPayment Data: if you make purchases, we collect data necessary to process payment, such as your payment instrument number and security code. All payment data is handled and stored by HyperPay and Edaat — see their privacy notices at hyperpay.com/privacy-policy and edaat.sa/Home/PrivacyPolicy.\n\nApplication Data: if you use our mobile app, we may request access to your device's calendar, camera, and other features, and may send push notifications; you can change these permissions in your device settings.\n\nInformation automatically collected: IP address, browser and device characteristics, operating system, language preferences, referring URLs, and usage information, collected via cookies and similar technologies, primarily for security, operation, and internal analytics.",
          },
          {
            heading: "2. HOW DO WE PROCESS YOUR INFORMATION?",
            body: "We process your information to facilitate account creation and authentication, deliver the services you request, evaluate and improve our Services and marketing, identify usage trends, and comply with our legal obligations.",
          },
          {
            heading: "3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
            body: "We may share your information in connection with a business transfer (such as a merger, sale of assets, or acquisition), and with Google Maps Platform APIs (e.g. Google Maps API, Places API) to provide location-based features.",
          },
          {
            heading: "4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
            body: "We use cookies and similar tracking technologies to maintain security, prevent crashes, fix bugs, and save your preferences. We also permit third parties to use tracking technologies for analytics and advertising. We share information with Google Analytics; you can opt out at tools.google.com/dlpage/gaoptout.",
          },
          {
            heading: "5. HOW LONG DO WE KEEP YOUR INFORMATION?",
            body: "We keep your personal information only as long as necessary for the purposes set out in this notice, unless a longer period is required by law. No purpose in this notice requires keeping your information for longer than twelve (12) months past the termination of your account.",
          },
          {
            heading: "6. HOW DO WE KEEP YOUR INFORMATION SAFE?",
            body: "We have implemented appropriate technical and organizational security measures to protect your personal information. However, no method of electronic transmission or storage is 100% secure, so we cannot guarantee absolute security, and transmission of your information is at your own risk.",
          },
          {
            heading: "7. DO WE COLLECT INFORMATION FROM MINORS?",
            body: "We do not knowingly collect data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18, or are the parent/guardian of a minor dependent and consent to their use of the Services. If we learn we have collected data from a user under 18, we will deactivate the account and delete the data.",
          },
          {
            heading: "8. WHAT ARE YOUR PRIVACY RIGHTS?",
            body: "You may withdraw consent for our processing of your information at any time, unsubscribe from marketing communications via the link in our emails, and review, change, or terminate your account by contacting us or through your account settings. Upon account termination, we may retain some information to prevent fraud, troubleshoot problems, or comply with legal requirements.",
          },
          {
            heading: "9. CONTROLS FOR DO-NOT-TRACK FEATURES",
            body: "No uniform technology standard for Do-Not-Track (DNT) signals has been finalized, so we do not currently respond to DNT browser signals.",
          },
          {
            heading: "10. DO WE MAKE UPDATES TO THIS NOTICE?",
            body: "Yes. We will update this notice as necessary to stay compliant with relevant laws, indicated by an updated \"Last updated\" date. We encourage you to review this notice periodically.",
          },
          {
            heading: "11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
            body: "Atar Real Estate Services Company, Data Protection Officer, 3504 Al Imam Saud Ibn Faysal Rd, Office 08, Al Malqa 6418, Riyadh, Riyadh Province 13522, Saudi Arabia. Email: info@goatar.com.",
          },
          {
            heading: "12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
            body: "Depending on the laws of your country, you may have the right to request access to your personal information, details on how it's been processed, correction of inaccuracies, deletion, or to withdraw your consent. To exercise these rights, please contact us at info@goatar.com.",
          },
        ],
      },
    ],
  },

  "/legal/refund": {
    eyebrow: L("Legal Center", "المركز القانوني"),
    title: L("Refund Policy", "سياسة الاسترداد"),
    body: L(
      "The governing version of this document is in English.",
      "النسخة المعتمدة قانونياً من هذه الوثيقة هي باللغة الإنجليزية."
    ),
    minimalFooter: true,
    sections: [
      {
        kind: "legal",
        updated: "Last updated January 01, 2026",
        note: L(
          "This is our real Refund (Return) Policy. The English text below is the binding version.",
          "هذه سياسة الاسترداد (الإرجاع) الفعلية. النص الإنجليزي أدناه هو النسخة المعتمدة قانونياً."
        ),
        sections: [
          {
            heading: "REFUNDS",
            body: "All sales are final and no refund will be issued.",
          },
          {
            heading: "QUESTIONS",
            body: "If you have any questions concerning our return policy, please contact us at info@goatar.com.",
          },
        ],
      },
    ],
  },

  "/legal/disclaimer": {
    eyebrow: L("Legal Center", "المركز القانوني"),
    title: L("Disclaimer", "إخلاء المسؤولية"),
    body: L(
      "The governing version of this document is in English.",
      "النسخة المعتمدة قانونياً من هذه الوثيقة هي باللغة الإنجليزية."
    ),
    minimalFooter: true,
    sections: [
      {
        kind: "legal",
        updated: "Last updated January 01, 2026",
        note: L(
          "This is our real legal Disclaimer. The English text below is the binding version.",
          "هذا إخلاء المسؤولية القانوني الفعلي. النص الإنجليزي أدناه هو النسخة المعتمدة قانونياً."
        ),
        sections: [
          {
            heading: "WEBSITE DISCLAIMER",
            body: "The information provided by Atar Real Estate Services Company (\"we,\" \"us,\" or \"our\") on https://www.goatar.com and our mobile application is for general informational purposes only. All information is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site or app. Your use of the Site and app, and your reliance on any information provided, is solely at your own risk.",
          },
          {
            heading: "EXTERNAL LINKS DISCLAIMER",
            body: "The Site and app may contain links to other websites or content belonging to third parties. Such external links are not investigated, monitored, or checked for accuracy or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any third-party information, and we are not a party to any transaction between you and a third-party provider.",
          },
          {
            heading: "TESTIMONIALS DISCLAIMER",
            body: "The Site may contain testimonials by users of our products and/or services, reflecting their real-life experiences and opinions, which are personal to those users and may not be representative of all users — individual results may vary. Testimonials are reviewed by us before posting and appear verbatim except for correction of grammar or typing errors, and may be shortened for brevity. The views in testimonials belong solely to the individual user; we are not affiliated with, and do not pay or otherwise compensate, users who provide testimonials.",
          },
        ],
      },
    ],
  },
};

export const placeholderFallback: PlaceholderCopy = {
  eyebrow: L("Atar", "أتار"),
  title: L("Page coming soon", "الصفحة قادمة قريباً"),
  body: L(
    "This page is on its way. In the meantime, get in touch and our team will help directly.",
    "هذه الصفحة قيد الإعداد. في هذه الأثناء، تواصل معنا وسيساعدك فريقنا مباشرة."
  ),
};

/** All blog announcement items, in the order they render on /resources/blog — used by BlogPostPage.tsx to look up a single story by slug (`getBlogPostBySlug`) and by its "more stories" list. */
export const blogPosts: NewsItem[] = (
  placeholderPages["/resources/blog"].sections?.find((s) => s.kind === "news") as
    | { kind: "news"; heading?: LStr; items: NewsItem[] }
    | undefined
)?.items ?? [];

export function getBlogPostBySlug(slug: string): NewsItem | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
