/**
 * Pricing data (bilingual). Content transcribed from goatar.com/pricing.
 * `c` cells: 3 chars for [Starter, Professional, Enterprise], "1"=included, "0"=not.
 * FAQ answers are written on-brand (the live page collapses them) — ASSUMPTION.
 */
export type Locale = "en" | "ar";
export type LStr = { en: string; ar: string };
const L = (en: string, ar: string): LStr => ({ en, ar });
export const pick = (s: LStr, l: Locale) => s[l];

export const pricingHero = {
  eyebrow: L("Pricing", "الأسعار"),
  title: L("Pricing & Plans", "الأسعار والباقات"),
  subtitle: L(
    "We offer a range of plans to suit the needs of every real estate agent, property manager and real estate developer. Start your free trial today or contact us for more information on our enterprise package.",
    "نقدّم مجموعة من الباقات تناسب احتياجات كل وكيل عقاري ومدير عقارات ومطوّر. ابدأ تجربتك المجانية اليوم أو تواصل معنا لمزيد من المعلومات حول باقة المؤسسات."
  ),
};

export const billing = {
  monthly: L("Monthly billing", "فوترة شهرية"),
  annual: L("Annual billing", "فوترة سنوية"),
  save: L("2 months free", "شهران مجاناً"),
  perMonth: L("/mo", "/شهرياً"),
  exclVat: L("excl. VAT", "غير شامل الضريبة"),
  basedOnUnits: L("based on the number of units", "حسب عدد الوحدات"),
  startingFrom: L("Starting from", "يبدأ من"),
  annualNote: L("billed annually", "تُدفع سنوياً"),
  popular: L("Most popular", "الأكثر اختياراً"),
};

export type Plan = {
  id: string;
  name: LStr;
  audience: LStr;
  monthly: number | null; // null = custom
  customLabel?: LStr;
  featuresIntro: LStr;
  features: LStr[];
  primaryCta: LStr;
  secondaryCta?: LStr;
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: L("Starter Plan", "الباقة الأساسية"),
    audience: L("Individuals and Real Estate Agents", "الأفراد ووكلاء العقارات"),
    monthly: 89.55,
    featuresIntro: L("Key features", "أبرز المميزات"),
    features: [
      L("App access for admins and managers", "وصول التطبيق للمشرفين والمدراء"),
      L("Create and manage leases", "إنشاء وإدارة عقود الإيجار"),
      L("Manage financials", "إدارة الشؤون المالية"),
      L("Generate reports", "إنشاء التقارير"),
      L("Upload documents", "رفع المستندات"),
    ],
    primaryCta: L("Start Your Free 14-Day Trial!", "ابدأ تجربتك المجانية 14 يوماً"),
    secondaryCta: L("Contact Us", "تواصل معنا"),
  },
  {
    id: "professional",
    name: L("Professional Plan", "الباقة الاحترافية"),
    audience: L("Property Managers and Residential Communities", "مدراء العقارات والمجتمعات السكنية"),
    monthly: 267.3,
    featuresIntro: L("Everything in Starter, plus", "كل ما في الباقة الأساسية، بالإضافة إلى"),
    features: [
      L("App access for tenants and professionals", "وصول التطبيق للمستأجرين ومزودي الخدمات"),
      L("AI-based Ejar contract reader", "قارئ عقود إيجار بالذكاء الاصطناعي"),
      L("Online payments", "المدفوعات الإلكترونية"),
      L("Property and facility management", "إدارة العقارات والمرافق"),
      L("Community management", "إدارة المجتمعات"),
    ],
    primaryCta: L("Start Your Free 14-Day Trial!", "ابدأ تجربتك المجانية 14 يوماً"),
    secondaryCta: L("Contact Us", "تواصل معنا"),
    popular: true,
  },
  {
    id: "enterprise",
    name: L("Enterprise Plan", "باقة المؤسسات"),
    audience: L("Custom Package", "باقة مخصصة"),
    monthly: null,
    customLabel: L("Custom Plan", "خطة مخصصة"),
    featuresIntro: L("Everything in Professional, plus", "كل ما في الباقة الاحترافية، بالإضافة إلى"),
    features: [
      L("Company Branded Platform", "منصة بعلامتك التجارية"),
      L("Company branded property marketplace", "سوق عقارات بعلامتك التجارية"),
      L("Dedicated account management", "إدارة حساب مخصصة"),
      L("Customizations", "تخصيصات"),
    ],
    primaryCta: L("Contact Us", "تواصل معنا"),
  },
];

export type Feature = { name: LStr; c: string };
export type Category = { name: LStr; features: Feature[] };

export const compare = {
  title: L("Compare Plans", "قارن الباقات"),
  chooseYourPlan: L("Choose Your Plan", "اختر باقتك"),
  included: L("Included", "مُضمَّن"),
  yes: L("Included", "مُضمَّن"),
  no: L("Not included", "غير مُضمَّن"),
  planNames: [L("Starter", "الأساسية"), L("Professional", "الاحترافية"), L("Enterprise", "المؤسسات")],
};

export const categories: Category[] = [
  {
    name: L("Platform Access", "الوصول إلى المنصة"),
    features: [
      { name: L("Admins", "المشرفون"), c: "111" },
      { name: L("Managers", "المدراء"), c: "111" },
      { name: L("Service Professionals", "مزودو الخدمات"), c: "011" },
      { name: L("Tenants", "المستأجرون"), c: "011" },
      { name: L("Dependents", "التابعون"), c: "011" },
      { name: L("Property Owners", "ملاك العقارات"), c: "011" },
    ],
  },
  {
    name: L("Lease Management", "إدارة عقود الإيجار"),
    features: [
      { name: L("Create Leases", "إنشاء عقود الإيجار"), c: "111" },
      { name: L("Move-In and Move-Out Tenants", "إسكان وإخلاء المستأجرين"), c: "111" },
      { name: L("Integrate with EJAR", "التكامل مع إيجار"), c: "111" },
      { name: L("AI-Based EJAR Contract Reader", "قارئ عقود إيجار بالذكاء الاصطناعي"), c: "111" },
    ],
  },
  {
    name: L("Accounting", "المحاسبة"),
    features: [
      { name: L("Transaction Recording", "تسجيل المعاملات"), c: "111" },
      { name: L("Payment Recording", "تسجيل المدفوعات"), c: "111" },
      { name: L("Payment Receipts", "إيصالات الدفع"), c: "111" },
      { name: L("Payment Reminders", "تذكيرات الدفع"), c: "111" },
      { name: L("E-Invoicing (ZATCA Compliant)", "الفوترة الإلكترونية (متوافقة مع الزكاة والضريبة)"), c: "111" },
      { name: L("Online Payments", "المدفوعات الإلكترونية"), c: "011" },
    ],
  },
  {
    name: L("Reporting & Business Intelligence", "التقارير وذكاء الأعمال"),
    features: [
      { name: L("Interactive Dashboard", "لوحة تحكم تفاعلية"), c: "111" },
      { name: L("Performance Measures and KPIs", "مؤشرات ومقاييس الأداء"), c: "111" },
      { name: L("Lease Reports", "تقارير الإيجار"), c: "111" },
      { name: L("Financial Reports", "التقارير المالية"), c: "111" },
      { name: L("Tenant Reports", "تقارير المستأجرين"), c: "111" },
      { name: L("Maintenance Reports", "تقارير الصيانة"), c: "011" },
    ],
  },
  {
    name: L("Property Management", "إدارة العقارات"),
    features: [
      { name: L("Property Documentation", "توثيق العقارات"), c: "111" },
      { name: L("Property Handover", "تسليم العقارات"), c: "011" },
      { name: L("Add and Manage Services", "إضافة وإدارة الخدمات"), c: "011" },
      { name: L("Add and Manage Service Pricing", "إضافة وإدارة تسعير الخدمات"), c: "011" },
      { name: L("Manage Service Workflows and Automation", "إدارة سير عمل الخدمات وأتمتتها"), c: "011" },
      { name: L("Manage Service Scheduling", "إدارة جدولة الخدمات"), c: "011" },
      { name: L("Manage Service Tickets", "إدارة تذاكر الخدمات"), c: "011" },
      { name: L("Receive Service Ratings", "استقبال تقييمات الخدمة"), c: "011" },
      { name: L("Visitor Access Management", "إدارة دخول الزوار"), c: "011" },
    ],
  },
  {
    name: L("Facility Management", "إدارة المرافق"),
    features: [
      { name: L("Add and Manage Common Areas", "إضافة وإدارة المناطق المشتركة"), c: "011" },
      { name: L("Manage Common Area Service Tickets", "إدارة تذاكر خدمات المناطق المشتركة"), c: "011" },
      { name: L("Add and Manage Facilities", "إضافة وإدارة المرافق"), c: "011" },
      { name: L("Facility Booking Management", "إدارة حجز المرافق"), c: "011" },
    ],
  },
  {
    name: L("Community Management", "إدارة المجتمعات"),
    features: [
      { name: L("Add and Manage Exclusive Offers", "إضافة وإدارة العروض الحصرية"), c: "011" },
      { name: L("Send Announcements", "إرسال الإعلانات"), c: "011" },
      { name: L("Manage Directory", "إدارة الدليل"), c: "011" },
      { name: L("Send Push Notifications", "إرسال الإشعارات الفورية"), c: "011" },
      { name: L("Send SMS Messages", "إرسال الرسائل النصية"), c: "011" },
      { name: L("Integrate with WhatsApp Business", "التكامل مع واتساب للأعمال"), c: "011" },
    ],
  },
  {
    name: L("Service Provider Platform", "منصة مزودي الخدمات"),
    features: [
      { name: L("Services From Third-Party Vendors", "خدمات من موردين خارجيين"), c: "001" },
      { name: L("Offers From Third-Party Vendors", "عروض من موردين خارجيين"), c: "001" },
    ],
  },
  {
    name: L("Additional Services", "خدمات إضافية"),
    features: [
      { name: L("Data Migration Support", "دعم ترحيل البيانات"), c: "001" },
      { name: L("Dedicated Account Management", "إدارة حساب مخصصة"), c: "001" },
      { name: L("Third-Party Integrations", "تكاملات خارجية"), c: "001" },
      { name: L("Customization", "التخصيص"), c: "001" },
    ],
  },
  {
    name: L("Property Marketplace", "سوق العقارات"),
    features: [
      { name: L("Customer Relationship Management (CRM)", "إدارة علاقات العملاء (CRM)"), c: "001" },
      { name: L("List Units for Sale or Rent", "إدراج الوحدات للبيع أو الإيجار"), c: "001" },
      { name: L("Integrate with Company Website", "التكامل مع موقع الشركة"), c: "001" },
      { name: L("Generate Leads", "توليد العملاء المحتملين"), c: "001" },
      { name: L("Receive Applications", "استقبال الطلبات"), c: "001" },
      { name: L("Schedule Property Visits", "جدولة زيارات العقار"), c: "001" },
      { name: L("Receive Bookings", "استقبال الحجوزات"), c: "001" },
      { name: L("Receive Payments", "استقبال المدفوعات"), c: "001" },
    ],
  },
  {
    name: L("Company Branded Platform", "منصة بعلامتك التجارية"),
    features: [
      { name: L("Company Branded Web App", "تطبيق ويب بعلامتك التجارية"), c: "001" },
      { name: L("Company Branded Mobile App", "تطبيق جوال بعلامتك التجارية"), c: "001" },
      { name: L("Company Branded Property Marketplace", "سوق عقارات بعلامتك التجارية"), c: "001" },
    ],
  },
];

export const pricingFaq = {
  title: L("FAQs", "الأسئلة الشائعة"),
  items: [
    {
      q: L("What is Atar and who is it for?", "ما هو أتار ولمن هو موجّه؟"),
      a: L(
        "ATAR is a Saudi real estate and community management platform for real estate agents, property managers, developers, and owners' associations—covering leasing, accounting, service requests, and community operations in one place.",
        "أتار منصة سعودية لإدارة العقارات والمجتمعات، موجّهة لوكلاء العقارات ومدراء العقارات والمطوّرين وجمعيات الملاك—تجمع التأجير والمحاسبة وطلبات الخدمة وعمليات المجتمع في مكان واحد."
      ),
    },
    {
      q: L("Can I have a free trial?", "هل يمكنني الحصول على تجربة مجانية؟"),
      a: L(
        "Yes. Every plan starts with a free 14-day trial. Contact us to tailor a trial for a larger portfolio.",
        "نعم، تبدأ كل باقة بتجربة مجانية لمدة 14 يوماً. تواصل معنا لتخصيص تجربة لمحفظة أكبر."
      ),
    },
    {
      q: L("Is there a limit on the number of units or users?", "هل هناك حد لعدد الوحدات أو المستخدمين؟"),
      a: L(
        "Pricing scales with the number of units you manage; there's no hard cap. Reach out and we'll size the right plan for your portfolio.",
        "يعتمد السعر على عدد الوحدات التي تديرها دون حد أقصى صارم. تواصل معنا لنحدد الباقة المناسبة لمحفظتك."
      ),
    },
    {
      q: L("Which plan works best for me?", "أي باقة تناسبني أكثر؟"),
      a: L(
        "Starter suits individual agents; Professional fits property managers and residential communities; Enterprise adds branded apps and customization for larger operators.",
        "الباقة الأساسية تناسب الوكلاء الأفراد، والاحترافية تناسب مدراء العقارات والمجتمعات السكنية، وباقة المؤسسات تضيف تطبيقات بعلامتك التجارية وتخصيصاً للمشغّلين الأكبر."
      ),
    },
    {
      q: L("What properties can I manage with Atar?", "ما العقارات التي يمكنني إدارتها عبر أتار؟"),
      a: L(
        "Residential and commercial units, buildings, mixed-use developments, and entire communities—from a single unit to a full portfolio.",
        "الوحدات السكنية والتجارية والمباني والمشاريع متعددة الاستخدامات والمجتمعات بأكملها—من وحدة واحدة إلى محفظة كاملة."
      ),
    },
    {
      q: L("Can I upgrade or downgrade after subscribing?", "هل يمكنني الترقية أو التخفيض بعد الاشتراك؟"),
      a: L(
        "Yes, you can change plans at any time and your access updates immediately; billing is prorated.",
        "نعم، يمكنك تغيير الباقة في أي وقت ويُحدَّث وصولك فوراً، وتُحتسب الفوترة بالتناسب."
      ),
    },
    {
      q: L("What distinguishes Atar from other real estate software?", "ما الذي يميّز أتار عن برامج العقارات الأخرى؟"),
      a: L(
        "ATAR is built for Saudi Arabia—native Ejar integration, an AI Ejar contract reader, ZATCA-compliant e-invoicing, Arabic-first design, and branded web and mobile apps in one platform.",
        "أتار مبني للسوق السعودي—تكامل مباشر مع إيجار، وقارئ عقود إيجار بالذكاء الاصطناعي، وفوترة إلكترونية متوافقة مع الزكاة والضريبة، وتصميم عربي أولاً، وتطبيقات ويب وجوال بعلامتك التجارية في منصة واحدة."
      ),
    },
    {
      q: L("Can I integrate Atar with software I already use?", "هل يمكنني ربط أتار بالبرامج التي أستخدمها حالياً؟"),
      a: L(
        "Yes. Professional and Enterprise support online payments and integrations, and Enterprise includes third-party integrations and data-migration support.",
        "نعم، تدعم الباقتان الاحترافية والمؤسسات المدفوعات الإلكترونية والتكاملات، وتشمل باقة المؤسسات تكاملات خارجية ودعم ترحيل البيانات."
      ),
    },
    {
      q: L("Is there a mobile app my employees and customers can use?", "هل يوجد تطبيق جوال لموظفيّ وعملائي؟"),
      a: L(
        "Yes—admins, managers, tenants, owners, and service professionals get mobile access, and Enterprise offers fully company-branded web and mobile apps.",
        "نعم، يحصل المشرفون والمدراء والمستأجرون والملاك ومزودو الخدمات على وصول عبر الجوال، وتوفّر باقة المؤسسات تطبيقات ويب وجوال بعلامتك التجارية بالكامل."
      ),
    },
    {
      q: L("How easy is it to move from my existing software to Atar?", "ما مدى سهولة الانتقال من برنامجي الحالي إلى أتار؟"),
      a: L(
        "Very. Enterprise includes dedicated data-migration support and an account manager to move your data and get your team live quickly.",
        "سهل جداً، تشمل باقة المؤسسات دعم ترحيل بيانات مخصصاً ومدير حساب لنقل بياناتك وتشغيل فريقك بسرعة."
      ),
    },
  ],
};
