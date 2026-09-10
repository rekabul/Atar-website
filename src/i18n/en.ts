/**
 * English strings — copy is taken verbatim from the Figma file where present.
 * Items tagged ASSUMPTION were placeholder/hidden in Figma and written on-brand.
 */
export const en = {
  dir: "ltr" as "ltr" | "rtl",
  langToggle: "عربي", // shows the OTHER language
  topbar: { phone: "+966 531 155 105" },
  // Header/footer nav labels now live in data/navigation.ts (bilingual LStr
  // pattern, shared between the Navbar dropdowns and the repeated footer
  // columns) — only Login/Sign Up route labels are defined there directly.
  hero: {
    eyebrow: "One platform, one source of truth",
    title: "The Operating System for Real Estate",
    subtitle:
      "Digitizing the end-to-end real estate lifecycle across sales, leasing and operations.",
    getStarted: "Get Started",
    getDemo: "Book a Demo",
    dashboardAlt: "Atar dashboard showing units, requests and user activity",
  },
  clients: { title: "Our Clients" },
  stats: {
    title: "Our Success in Numbers",
    items: [
      { value: "14,000+", label: "Units under Management" },
      { value: "SAR 10BN+", label: "Assets under Management" },
      { value: "200,000+", label: "Transactions" },
    ],
  },
  featuresIntro: {
    title: "One platform, one source of truth",
    subtitle:
      "Atar digitizes every stage of the real estate lifecycle - sales, leasing and operations - in a single connected platform built for enterprise scale.",
  },
  features: [
    {
      eyebrow: "Sales Suite",
      title: "Sell ready units and off-plan properties",
      body: "Real estate sales automation for ready units and off-plan projects that helps you sell more and faster.",
    },
    {
      eyebrow: "Leasing Suite",
      title: "Rent, renew, and retain",
      body: "Rental management software to handle contracts, payments and renewals in one seamless interface.",
    },
    {
      eyebrow: "Property Operations Suite",
      title: "Operate, maintain, and engage",
      body: "Unify all post-sale and post-rental operations, including communication, maintenance, facility management and space and visitor management.",
    },
  ],
  featureCta: "Get Started",
  benefits: {
    title:
      "Built for Developers and Managers Who Want Less Stress, More Control, and Real Results. That's Atar.",
    subtitle:
      "From streamlined operations to meaningful insights, Atar is built for those who expect more from property tech.",
    items: [
      {
        title: "Security & Permissions",
        body: "Role-based access control keeps sensitive data safe and workflows clean across teams.",
      },
      {
        title: "Insightful Dashboards",
        body: "Make smarter decisions with real-time analytics on revenue, occupancy, and maintenance.",
      },
      {
        title: "End-to-End Automation",
        body: "Handle recurring tasks like invoicing, renewals, and inspections without lifting a finger.",
      },
      {
        title: "Collaborative Tools",
        body: "Communicate with tenants, owners, and vendors in one place, no third-party tools required.",
      },
    ],
  },
  integrations: {
    title: "Connect Atar to the tools you already use",
    subtitle:
      "From identity verification and analytics platforms to point-solutions and ERPs, Atar connects natively to national infrastructure and other tools.",
    seeAll: "See All Integrations",
    apiDocs: "View API Docs",
  },
  faq: {
    title: "Got questions? we've got answers!",
    subtitle:
      "Whether you're curious about features, pricing, or getting started, we've got you covered. If you don't find what you're looking for, our team is always ready to assist you",
    items: [
      {
        q: "What is Atar and who is it for?",
        a: "Atar is a Saudi real estate and community management platform built for real estate agents, property managers, developers, and owners' associations. It covers leasing, sales, accounting, service requests, and community operations in one place, and is used by 20+ enterprise accounts managing 14,000+ units across Saudi Arabia.",
      },
      {
        q: "Is Atar built specifically for the Saudi real estate market?",
        a: "Yes. Atar integrates directly with Saudi national infrastructure, including Nafath for ID verification, SADAD for payments, and ZATCA for e-invoicing, and supports Arabic alongside English throughout the platform.",
      },
      {
        q: "How does Atar compare to global property management platforms?",
        a: "Global platforms are typically built for markets outside Saudi Arabia and require third-party workarounds for local compliance. Atar is built natively for the Saudi market, with direct Nafath, SADAD, and ZATCA integration, Arabic-first support, and local customer support, without needing extra middleware to operate compliantly here.",
      },
      {
        q: "Can I have a free trial?",
        a: "Yes, Starter and Professional plans include a free 14-day trial with no credit card required to start.",
      },
      {
        q: "Can I integrate Atar with software I already use?",
        a: "Yes. Atar integrates with Nafath, SADAD, and ZATCA for Saudi-specific compliance and payments, and with enterprise systems including Oracle, SAP, Odoo, Microsoft Dynamics 365, Salesforce, and Zoho. It also connects with messaging platforms including Unifonic, Twilio, SendGrid, Meta, and WhatsApp. We also offer open API documentation for you to connect to any other tools you may be using.",
      },
    ],
    stillTitle: "Still have questions?",
    stillBody:
      "Can't find the answer you're looking for? Please contact to our friendly team.",
    stillCta: "Get in Touch",
    // Home page's CTA card links out to two places instead of one, so it gets its own subtext + button labels.
    homeStillBody: "Go to our FAQ Hub, or contact us for any other questions you may have.",
    stillFaqCta: "FAQ Hub",
    stillContactCta: "Contact Us",
  },
  cta: {
    title: "Looking for a true partner to help grow your business?",
    button: "Contact Us",
  },
  contactForm: {
    eyebrow: "Contact us",
    title: "Tell us about your portfolio",
    subtitle:
      "Share a few details and our team will get back to you within one business day.",
    name: { label: "Full name", placeholder: "e.g. Mohammed Abdullah" },
    email: { label: "Work email", placeholder: "you@company.com" },
    company: { label: "Company", optional: "(optional)", placeholder: "Your company" },
    message: { label: "How can we help?", placeholder: "Tell us what you're looking to manage…" },
    submit: "Send message",
    errors: {
      name: "Please enter your name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "Please enter a valid email address.",
      message: "Please add a short message.",
    },
    success: "Thanks! Your message is validated and ready to send.",
    // Honest note — there is no backend wired up.
    note: "This form validates on the client only. Connect a POST endpoint (or an email/CRM service) to receive submissions.",
  },
  contactPage: {
    title: "Get in touch",
    subtitle:
      "Questions about the platform, pricing, or a partnership? Reach out and the Atar team will respond within one business day.",
    hoursTitle: "Working hours",
    // ASSUMPTION: standard Saudi business week — confirm actual hours.
    hoursDays: "Sunday to Thursday",
    hoursTime: "9:00 AM to 6:00 PM (AST)",
    hoursNote: "Closed on Fridays and Saturdays.",
    mapLabel: "Find us in Riyadh",
    mapCta: "Open in Google Maps",
    newTab: "(opens in a new tab)",
  },
  // Copy is verbatim from goatar.com/about (Who We Are / Vision / Mission /
  // Values / Latest News). Value descriptions are added for clarity (the live
  // page lists the value names only) — ASSUMPTION, review wording.
  aboutPage: {
    eyebrow: "About us",
    whoTitle: "Who We Are",
    whoBody:
      "Atar is Saudi Arabia's leading enterprise real estate management software solution that aims to increase operational efficiency in pre-sale and post-sale processes and provide an inclusive user experience and higher quality of life to landlords and tenants. Atar was established in 2021 and today is one of the largest national platforms for residential and commercial real estate management.",
    visionTitle: "Vision",
    visionBody:
      "Become a world leader in digitalization and automation of real estate management and improve the standard of living for landlords and tenants.",
    missionTitle: "Mission",
    missionBody:
      "To create digital communities that cater to the needs of real estate developers, homeowners, tenants and service professionals.",
    storyEyebrow: "Our Story",
    storyTitle: "Built inside the problem",
    storySubtitle:
      "From founding in 2021 to platform scale in 2025, built alongside the operators who use it.",
    storyToday: "Today",
    timeline: [
      { year: "2021", label: "Founded" },
      { year: "2022", label: "First commercial deployments" },
      { year: "2023", label: "Enterprise adoption" },
      { year: "2024", label: "Scalable operations" },
      { year: "2025", label: "From product to platform" },
    ],
    valuesTitle: "Values",
    valuesSubtitle: "The principles behind everything we build.",
    values: [
      { icon: "check", title: "Responsibility", body: "We own the outcomes for the owners, tenants, and communities who rely on Atar every day." },
      { icon: "bulb", title: "Innovation", body: "We keep pushing real estate technology forward with automation and smart, practical tools." },
      { icon: "shield", title: "Security", body: "We protect sensitive property and resident data with rigorous, role-based safeguards." },
      { icon: "rocket", title: "Empowerment", body: "We give every stakeholder the clarity and control to make better decisions, faster." },
    ],
    newsTitle: "Latest News",
    newsSubtitle: "Partnerships and milestones from across the Kingdom.",
    newsCta: "Read more",
    news: [
      { date: "2024-10-28", body: "We are pleased to announce that Wathba Investment Company has chosen the Atar platform to be its partner in its journey towards digital transformation in real estate and residential community management." },
      { date: "2024-10-30", body: "We are pleased to announce that Rafeh Real Estate Development Company has chosen Atar platform to be its partner in its journey towards digital transformation in the management of real estate and residential communities." },
      { date: "2024-11-04", body: "We are pleased to announce that Mushid Company has selected the Atar platform to be the primary partner in its digital transformation journey for managing real estate and residential communities." },
      { date: "2023-03-09", body: "Under the patronage of the Minister of Municipalities and Housing, Mr. Majid Al-Hogail, and the Chairman of the Board of Directors of the Riyadh Chamber, Mr. Ajlan Al-Ajlan, we are pleased to announce the signing of an agreement with Safa Investment Company to provide a real estate and residential communities management system." },
      { date: "2023-09-12", body: "On the sidelines of the #Cityscape_World exhibition, a cooperation agreement was signed between Atar Real Estate Services Company, in the presence of CEO / Hasib Mohammed, and Al Sulaiman Real Estate Company, in the presence of Business Development Manager / Othman Al Sulaiman." },
      { date: "2024-11-08", body: "We are very pleased to proudly announce the launch of the Khawaled Real Estate Company platform in a record time of no more than 48 hours. The platform aims to provide all property and residential community management services and raise the quality of life for residents." },
    ],
  },
  footer: {
    blurb:
      "Digitizing the end-to-end real estate lifecycle across sales, leasing and operations.",
    // Company/Resources/Legal Center columns now come from data/navigation.ts
    // (footerGroups) so they stay in sync with the header's taxonomy.
    contactTitle: "Contact Details",
    address: "Al Imam Saud Ibn Faysal Rd, Riyadh 13522, Saudi Arabia",
    phone: "+966 53 115 5105",
    email: "Info@goatar.com",
    copyright:
      "Copyright © 2024 Atar Real Estate Services Company, All Rights Reserved",
  },
};

export type Strings = typeof en;
