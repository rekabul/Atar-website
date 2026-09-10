import { type LStr } from "./pricing";

const L = (en: string, ar: string): LStr => ({ en, ar });

export type FaqHubItem = { q: LStr; a: LStr };

export type FaqHubCategory = {
  id: string;
  label: LStr;
  subtitle: LStr;
  items: FaqHubItem[];
};

/**
 * Dedicated FAQ Hub content (5 categories). This used to reuse
 * data/pricing.ts's `pricingFaq` (the /pricing page's own FAQ set) grouped
 * by index — that shared a single flat list with a page we're not meant to
 * touch. This is now its own independent dataset so editing the FAQ Hub
 * never changes what shows on /pricing.
 *
 * "Comparisons" and "Security & Compliance" are new categories (the
 * standalone Compare pages were dropped from nav, so their competitive-
 * positioning content now lives here instead; compliance/data-residency
 * questions are common late-stage blockers for enterprise buyers).
 */
export const faqHubCategories: FaqHubCategory[] = [
  {
    id: "getting-started",
    label: L("Getting Started", "البدء"),
    subtitle: L(
      "The basics — what Atar is, who it's for, and how to move your data over.",
      "الأساسيات — ما هو أتار، ولمن هو موجّه، وكيفية نقل بياناتك إليه."
    ),
    items: [
      {
        q: L("What is Atar and who is it for?", "ما هو أتار ولمن هو موجّه؟"),
        a: L(
          "Atar is a Saudi real estate and community management platform built for real estate agents, property managers, developers, and owners' associations. It covers leasing, sales, accounting, service requests, and community operations in one system, and is used by 20+ enterprise accounts managing 14,000+ units across Saudi Arabia.",
          "أتار منصة سعودية لإدارة العقارات والمجتمعات السكنية، مصممة للوسطاء العقاريين ومديري العقارات والمطورين واتحادات الملّاك. تغطي المنصة التأجير والمبيعات والمحاسبة وطلبات الخدمة وعمليات المجتمعات السكنية في نظام واحد، ويستخدمها أكثر من 20 حساباً مؤسسياً يديرون أكثر من 14,000 وحدة في جميع أنحاء المملكة العربية السعودية."
        ),
      },
      {
        q: L("What properties can I manage with Atar?", "ما هي أنواع العقارات التي يمكنني إدارتها عبر أتار؟"),
        a: L(
          "Atar supports five property types: Residential, Retail, Office, Compounds & Communities, and Mixed-Use Developments. Each market has the same core functionality, with Retail and Office distinguished mainly by leasing and reporting workflows suited to commercial tenants.",
          "يدعم أتار خمسة أنواع من العقارات: السكني والتجزئة والمكاتب والمجمّعات والمجتمعات السكنية والمشاريع متعددة الاستخدامات. تتشارك جميع القطاعات نفس الوظائف الأساسية، مع تمايز قطاعي التجزئة والمكاتب أساساً في سير عمل التأجير والتقارير الملائم للمستأجرين التجاريين."
        ),
      },
      {
        q: L(
          "What's the difference between Atar's Sales Suite, Leasing Suite, and Property Operations Suite?",
          "ما الفرق بين حزمة المبيعات وحزمة التأجير وحزمة عمليات العقارات في أتار؟"
        ),
        a: L(
          "Sales Suite covers property sales, CRM, and handovers. Leasing Suite covers lease contracts, renewals, and tenant management. Property Operations Suite covers maintenance, facilities, financials, and reporting once a property is leased or sold. Most customers use more than one suite together, since a single property often moves through sales, leasing, and operations over its lifecycle.",
          "تغطي حزمة المبيعات بيع العقارات وإدارة علاقات العملاء والتسليم. تغطي حزمة التأجير عقود الإيجار والتجديدات وإدارة المستأجرين. تغطي حزمة عمليات العقارات الصيانة والمرافق والماليات والتقارير بعد تأجير العقار أو بيعه. يستخدم معظم العملاء أكثر من حزمة واحدة معاً، إذ غالباً ما يمر العقار الواحد بمراحل البيع والتأجير والتشغيل على مدى دورة حياته."
        ),
      },
      {
        q: L("Is Atar built specifically for the Saudi real estate market?", "هل أتار مصمم خصيصاً للسوق العقاري السعودي؟"),
        a: L(
          "Yes. Atar integrates directly with Saudi national infrastructure, including Nafath for ID verification, SADAD for payments, and ZATCA for e-invoicing, and supports Arabic alongside English throughout the platform.",
          "نعم. يتكامل أتار مباشرة مع البنية التحتية الوطنية السعودية، بما في ذلك نفاذ للتحقق من الهوية، وسداد للمدفوعات، وفاتورة (زاتكا) للفوترة الإلكترونية، ويدعم اللغة العربية إلى جانب الإنجليزية في جميع أنحاء المنصة."
        ),
      },
      {
        q: L("How easy is it to move from my existing software to Atar?", "ما مدى سهولة الانتقال من برنامجي الحالي إلى أتار؟"),
        a: L(
          "Atar's onboarding team handles data migration from spreadsheets or existing property management software, typically covering property records, tenant/owner contacts, and active leases. Most customers are fully onboarded within a few weeks depending on portfolio size.",
          "يتولى فريق التأهيل في أتار عملية نقل البيانات من جداول البيانات أو برامج إدارة العقارات الحالية، وتشمل عادةً سجلات العقارات وبيانات التواصل مع المستأجرين والملاك والعقود النشطة. يكتمل تأهيل معظم العملاء بالكامل خلال أسابيع قليلة حسب حجم المحفظة العقارية."
        ),
      },
    ],
  },
  {
    id: "pricing-plans",
    label: L("Pricing & Plans", "الأسعار والباقات"),
    subtitle: L(
      "Trials, plan limits, and how billing works as your portfolio grows.",
      "التجارب المجانية وحدود الباقات وكيفية عمل الفوترة مع نمو محفظتك."
    ),
    items: [
      {
        q: L("Can I have a free trial?", "هل يمكنني الحصول على نسخة تجريبية مجانية؟"),
        a: L(
          "Yes, Starter and Professional plans include a free 14-day trial with no credit card required to start.",
          "نعم، تتضمن باقتا البداية والاحترافية نسخة تجريبية مجانية لمدة 14 يوماً دون الحاجة إلى بطاقة ائتمان للبدء."
        ),
      },
      {
        q: L("Is there a limit on the number of units or users?", "هل يوجد حد لعدد الوحدات أو المستخدمين؟"),
        a: L(
          "Plan limits scale with portfolio size. Starter and Professional plans are designed for smaller to mid-sized portfolios with set unit and user caps, while Enterprise plans remove these limits and are priced based on your specific portfolio size and requirements.",
          "تتناسب حدود الباقات مع حجم المحفظة العقارية. صُممت باقتا البداية والاحترافية للمحافظ الصغيرة إلى المتوسطة بحدود محددة للوحدات والمستخدمين، بينما تزيل باقة المؤسسات هذه الحدود ويُحدَّد سعرها بناءً على حجم محفظتك ومتطلباتك الخاصة."
        ),
      },
      {
        q: L("Which plan works best for me?", "أي باقة تناسبني أكثر؟"),
        a: L(
          "Starter suits individual property managers or small portfolios just getting started with digital property management. Professional suits growing portfolios that need automated leasing, accounting, and reporting. Enterprise suits large developers, owners' associations, or portfolios exceeding 20 units that need custom integrations, dedicated support, or multi-suite deployment.",
          "تناسب باقة البداية مديري العقارات الأفراد أو المحافظ الصغيرة التي بدأت للتو باستخدام إدارة العقارات الرقمية. تناسب الباقة الاحترافية المحافظ النامية التي تحتاج إلى تأجير ومحاسبة وتقارير آلية. تناسب باقة المؤسسات المطورين الكبار واتحادات الملّاك أو المحافظ التي تتجاوز 20 وحدة والتي تحتاج إلى تكاملات مخصصة أو دعم مخصص أو نشر عدة حزم معاً."
        ),
      },
      {
        q: L("Can I upgrade or downgrade after subscribing?", "هل يمكنني ترقية أو تخفيض باقتي بعد الاشتراك؟"),
        a: L(
          "Yes, you can change plans at any time from your account settings, and billing is prorated for the remainder of your billing cycle.",
          "نعم، يمكنك تغيير باقتك في أي وقت من إعدادات حسابك، وتُحتسب الفوترة تناسبياً لما تبقى من دورة الفوترة الحالية."
        ),
      },
      {
        q: L("Does pricing scale by units, users, or a flat fee?", "هل يعتمد التسعير على عدد الوحدات أو المستخدمين أم أنه رسم ثابت؟"),
        a: L(
          "Starter and Professional plans are priced per month with defined unit and user caps included. Enterprise plans are custom-quoted based on total units under management, number of users, and which suites you need.",
          "تُسعَّر باقتا البداية والاحترافية شهرياً بحدود محددة للوحدات والمستخدمين مشمولة ضمن السعر. أما باقة المؤسسات فتُسعَّر بعرض سعر مخصص بناءً على إجمالي الوحدات المُدارة، وعدد المستخدمين، والحزم التي تحتاجها."
        ),
      },
    ],
  },
  {
    id: "product-integrations",
    label: L("Product & Integrations", "المنتج والتكاملات"),
    subtitle: L(
      "What makes Atar different, the tools it connects to, and mobile access.",
      "ما الذي يميّز أتار، والأدوات التي يتصل بها، والوصول عبر الجوال."
    ),
    items: [
      {
        q: L("What distinguishes Atar from other real estate software?", "ما الذي يميّز أتار عن برامج العقارات الأخرى؟"),
        a: L(
          "Atar is a single platform covering sales, leasing, and property operations, rather than requiring separate tools stitched together. This matters against three common alternatives: spreadsheets and disconnected tools, which break down as a portfolio grows past a handful of properties; global property management platforms, which are often built for markets outside Saudi Arabia and lack native Nafath, SADAD, and ZATCA integration; and building a custom in-house system, which takes significant engineering time to reach feature parity with an already-built platform. Atar is purpose-built for the Saudi market from the ground up.",
          "أتار منصة واحدة تغطي المبيعات والتأجير وعمليات العقارات، بدلاً من الاعتماد على أدوات منفصلة يتم ربطها ببعضها. يبرز هذا الفرق مقارنةً بثلاثة بدائل شائعة: جداول البيانات والأدوات المتفرقة، التي تتعثر مع نمو المحفظة العقارية عن حفنة من العقارات؛ ومنصات إدارة العقارات العالمية، التي تُبنى غالباً لأسواق خارج المملكة العربية السعودية وتفتقر إلى تكامل أصلي مع نفاذ وسداد وفاتورة؛ وبناء نظام داخلي مخصص، الذي يتطلب وقتاً هندسياً كبيراً للوصول إلى مستوى ميزات مماثل لمنصة جاهزة بالفعل. أتار مبني خصيصاً للسوق السعودي من الأساس."
        ),
      },
      {
        q: L("Can I integrate Atar with software I already use?", "هل يمكنني ربط أتار بالبرامج التي أستخدمها بالفعل؟"),
        a: L(
          "Yes. Atar integrates with Nafath, SADAD, and ZATCA for Saudi-specific compliance and payments, and with enterprise systems including Oracle, SAP, Odoo, Microsoft Dynamics 365, Salesforce, and Zoho. It also connects with messaging platforms including Unifonic, Twilio, SendGrid, Meta, and WhatsApp. We also offer open API documentation for you to connect to any other tools you may be using.",
          "نعم. يتكامل أتار مع نفاذ وسداد وفاتورة للامتثال والمدفوعات الخاصة بالسوق السعودي، ومع أنظمة المؤسسات بما في ذلك Oracle وSAP وOdoo وMicrosoft Dynamics 365 وSalesforce وZoho. كما يتصل بمنصات المراسلة بما في ذلك Unifonic وTwilio وSendGrid وMeta وWhatsApp. كما نوفر توثيقاً مفتوحاً لواجهة برمجة التطبيقات (API) لربط أي أدوات أخرى تستخدمها."
        ),
      },
      {
        q: L("Is there a mobile app my employees and customers can use?", "هل يوجد تطبيق جوال يمكن لموظفي وعملائي استخدامه؟"),
        a: L(
          "Yes, Atar offers a branded mobile app as an add-on, giving property managers, owners, and tenants mobile access to their accounts, service requests, and communications.",
          "نعم، يوفر أتار تطبيق جوال بعلامتك التجارية كإضافة اختيارية، يمنح مديري العقارات والملاك والمستأجرين وصولاً عبر الجوال إلى حساباتهم وطلبات الخدمة والتواصل."
        ),
      },
      {
        q: L("Does Atar have a public API for custom integrations?", "هل يمتلك أتار واجهة برمجة تطبيقات (API) عامة للتكاملات المخصصة؟"),
        a: L(
          "Yes, Atar provides public API documentation for teams that want to build custom integrations beyond the built-in connectors.",
          "نعم، يوفر أتار توثيقاً عاماً لواجهة برمجة التطبيقات للفرق التي ترغب ببناء تكاملات مخصصة تتجاوز الموصلات المدمجة."
        ),
      },
      {
        q: L("Is Atar available in Arabic?", "هل أتار متوفر باللغة العربية؟"),
        a: L(
          "Yes, the entire platform, including the customer-facing website and the product itself, is available in both Arabic and English.",
          "نعم، المنصة بأكملها، بما في ذلك الموقع الإلكتروني الموجّه للعملاء والمنتج نفسه، متوفرة باللغتين العربية والإنجليزية."
        ),
      },
    ],
  },
  {
    id: "comparisons",
    label: L("Comparisons", "المقارنات"),
    subtitle: L(
      "How Atar stacks up against spreadsheets, global platforms, custom builds, and point solutions.",
      "كيف يقارن أتار بجداول البيانات والمنصات العالمية والأنظمة المخصصة والحلول الفردية."
    ),
    items: [
      {
        q: L(
          "How does Atar compare to global property management platforms?",
          "كيف يقارن أتار بمنصات إدارة العقارات العالمية؟"
        ),
        a: L(
          "Global platforms are typically built for markets outside Saudi Arabia and require third-party workarounds for local compliance. Atar is built natively for the Saudi market, with direct Nafath, SADAD, and ZATCA integration, Arabic-first support, and local customer support, without needing extra middleware to operate compliantly here.",
          "عادةً ما تُبنى المنصات العالمية لأسواق خارج المملكة العربية السعودية، وتتطلب حلولاً بديلة من أطراف ثالثة لتحقيق الامتثال المحلي. أتار مبني بشكل أصلي للسوق السعودي، مع تكامل مباشر مع نفاذ وسداد وفاتورة، ودعم عربي أولاً، ودعم عملاء محلي، دون الحاجة إلى برمجيات وسيطة إضافية للعمل بامتثال هنا."
        ),
      },
      {
        q: L(
          "Do I still need Atar if I'm currently managing properties with spreadsheets?",
          "هل ما زلت بحاجة إلى أتار إذا كنت أدير عقاراتي حالياً عبر جداول البيانات؟"
        ),
        a: L(
          "Spreadsheets work for a handful of units but break down once you're tracking leases, maintenance requests, payments, and owner/tenant communication across a growing portfolio. Atar replaces manual tracking with automated workflows, reducing manual errors and giving owners and tenants self-service access instead of routing every request through a property manager.",
          "تصلح جداول البيانات لعدد قليل من الوحدات، لكنها تتعثر بمجرد أن تبدأ بتتبع عقود الإيجار وطلبات الصيانة والمدفوعات والتواصل مع الملاك والمستأجرين عبر محفظة عقارية متنامية. يستبدل أتار التتبع اليدوي بسير عمل آلي، ما يقلل الأخطاء اليدوية ويمنح الملاك والمستأجرين وصولاً ذاتياً بدلاً من توجيه كل طلب عبر مدير العقار."
        ),
      },
      {
        q: L("Should I build a custom system instead of using Atar?", "هل ينبغي لي بناء نظام مخصص بدلاً من استخدام أتار؟"),
        a: L(
          "Building in-house means budgeting for ongoing engineering time to build and maintain features Atar already provides, including Saudi-specific compliance integrations that take significant effort to build correctly. Atar gives you a production-ready platform from day one, with updates and compliance changes (such as ZATCA requirements) handled centrally rather than requiring your own engineering team to track and implement them.",
          "يعني البناء الداخلي رصد وقت هندسي مستمر لبناء وصيانة ميزات يوفرها أتار بالفعل، بما في ذلك تكاملات الامتثال الخاصة بالسوق السعودي التي تتطلب جهداً كبيراً لبنائها بشكل صحيح. يمنحك أتار منصة جاهزة للإنتاج منذ اليوم الأول، مع إدارة مركزية للتحديثات وتغييرات الامتثال (مثل متطلبات فاتورة) بدلاً من تحميل فريقك الهندسي مسؤولية تتبعها وتنفيذها."
        ),
      },
      {
        q: L(
          "What's the difference between using Atar and combining several point solutions (e.g. separate CRM, accounting, and maintenance tools)?",
          "ما الفرق بين استخدام أتار والجمع بين عدة حلول فردية (مثل أدوات منفصلة لإدارة العملاء والمحاسبة والصيانة)؟"
        ),
        a: L(
          "Point solutions require manually syncing data between tools, which creates gaps and duplicate work. Atar keeps sales, leasing, accounting, maintenance, and reporting in one system with shared data, so a lease signed in the Leasing Suite automatically reflects in financial reporting and tenant records without manual re-entry.",
          "تتطلب الحلول الفردية مزامنة البيانات يدوياً بين الأدوات، ما يخلق ثغرات وازدواجية في العمل. يبقي أتار المبيعات والتأجير والمحاسبة والصيانة والتقارير في نظام واحد ببيانات مشتركة، بحيث ينعكس عقد الإيجار الموقّع في حزمة التأجير تلقائياً في التقارير المالية وسجلات المستأجرين دون إعادة إدخال يدوية."
        ),
      },
    ],
  },
  {
    id: "security-compliance",
    label: L("Security & Compliance", "الأمان والامتثال"),
    subtitle: L(
      "E-invoicing, identity verification, and where your data is hosted.",
      "الفوترة الإلكترونية والتحقق من الهوية ومكان استضافة بياناتك."
    ),
    items: [
      {
        q: L(
          "Is Atar compliant with Saudi e-invoicing (ZATCA) requirements?",
          "هل أتار متوافق مع متطلبات الفوترة الإلكترونية السعودية (فاتورة)؟"
        ),
        a: L(
          "Yes, Atar's Property & Portfolio Financials tools integrate directly with ZATCA for e-invoicing compliance.",
          "نعم، تتكامل أدوات الماليات العقارية والمحفظة في أتار مباشرة مع فاتورة (زاتكا) للامتثال في الفوترة الإلكترونية."
        ),
      },
      {
        q: L("Does Atar support ID verification through Nafath?", "هل يدعم أتار التحقق من الهوية عبر نفاذ؟"),
        a: L(
          "Yes, Atar integrates with Nafath for identity verification, supporting compliant onboarding of owners and tenants.",
          "نعم، يتكامل أتار مع نفاذ للتحقق من الهوية، ما يدعم تأهيل الملاك والمستأجرين بشكل متوافق مع الأنظمة."
        ),
      },
      {
        q: L("Where is Atar's customer data hosted?", "أين تُستضاف بيانات عملاء أتار؟"),
        a: L(
          "Atar's customer data is hosted on cloud servers owned and operated by Google Cloud within the Kingdom of Saudi Arabia, meeting the highest standards of security and compliance with the National Data Management Office (NDMO) and the Saudi Data and Artificial Intelligence Authority (SDAIA).",
          "تُستضاف بيانات عملاء أتار على خوادم سحابية مملوكة ومُشغَّلة من قبل Google Cloud داخل المملكة العربية السعودية، بما يستوفي أعلى معايير الأمان والامتثال لدى مكتب إدارة البيانات الوطنية (NDMO) والهيئة السعودية للبيانات والذكاء الاصطناعي (SDAIA)."
        ),
      },
    ],
  },
];

/** Every question across every category, flattened for the search box. */
export const allFaqHubItems: FaqHubItem[] = faqHubCategories.flatMap((c) => c.items);
