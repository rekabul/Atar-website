/**
 * English strings — copy is taken verbatim from the Figma file where present.
 * Items tagged ASSUMPTION were placeholder/hidden in Figma and written on-brand.
 */
export const en = {
  dir: "ltr" as "ltr" | "rtl",
  langToggle: "عربي", // shows the OTHER language
  topbar: { phone: "+966 531 155 105" },
  nav: {
    home: "Home",
    features: "Features",
    pricing: "Pricing",
    about: "About Us",
    contact: "Contact Us",
    login: "Log In",
    getStarted: "Get Started",
  },
  hero: {
    eyebrow: "Leading property management system",
    title: "The National Real Estate Management Platform",
    subtitle:
      "Manage everything from leasing to handovers—smarter, faster, and stress-free.",
    getStarted: "Get Started",
    getDemo: "Get a Demo",
    dashboardAlt: "ATAR dashboard showing units, requests and user activity",
  },
  clients: { title: "Our Clients" },
  stats: {
    title: "Our Success in Numbers",
    items: [
      { value: "25,000+", label: "Units under Management" },
      { value: "$5BN+", label: "Assets under Management" },
      { value: "200,000+", label: "Transactions" },
    ],
  },
  featuresIntro: {
    title:
      "Experience Effortless Property Management, Backed by Smart Features",
    subtitle:
      "We designed ATAR to make every task easier—so you can focus on growth, not admin.",
  },
  features: [
    {
      eyebrow: "Financial Management",
      title: "Take full control of your property finances with ease",
      body: "Gain complete control over your property's finances with our integrated tools. From automated rent collection and expense tracking to detailed financial reporting, manage your income and expenditures efficiently and accurately.",
    },
    {
      eyebrow: "Service Management",
      title: "Keep every service request organized, on time, and under control.",
      body: "With ATAR's Service Management, property issues are tracked from start to resolution. Tenants can easily submit maintenance requests, while managers assign tasks, monitor progress, and ensure timely completion.",
    },
    {
      eyebrow: "Property Management",
      title: "Manage every property with confidence, clarity, and control.",
      body: "ATAR simplifies the way you manage properties—whether it's one unit or an entire portfolio. Keep track of tenant details, lease agreements, payment status, inspections, and more—all from a centralized dashboard.",
    },
  ],
  featureCta: "Get Started",
  benefits: {
    title:
      "Built for Property Managers Who Want Less Stress, More Control, and Real Results — That's ATAR",
    subtitle:
      "From streamlined operations to meaningful insights—ATAR is built for those who expect more from property tech.",
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
        title: "Collaborative Tools Built-In",
        body: "Communicate with tenants, owners, and vendors in one place—no third-party tools required.",
      },
    ],
  },
  integrations: {
    title: "Empowering your business with streamlined connectivity",
    subtitle:
      "Optimize your business with our seamless connectivity solutions, unlocking efficiency and collaboration across platforms.",
    seeAll: "See all integrations",
    footnote: "and more than 100+ tools to integrate",
  },
  faq: {
    title: "Got questions? we've got answers!",
    subtitle:
      "Whether you're curious about features, pricing, or getting started, we've got you covered. If you don't find what you're looking for, our team is always ready to assist you",
    items: [
      {
        q: "Service Management",
        a: "Streamline maintenance and service requests with our centralised system. Schedule tasks, track progress, and ensure timely resolutions to enhance tenant satisfaction and property upkeep.",
      },
      {
        q: "What real estate asset classes does Atar serve?",
        // ASSUMPTION: answer hidden in Figma.
        a: "ATAR supports residential communities, commercial buildings, mixed-use developments, and individual units—scaling from a single property to an entire portfolio.",
      },
      {
        q: "What is Atar property management software?",
        // ASSUMPTION: answer hidden in Figma.
        a: "ATAR is a national real estate management platform that brings leasing, accounting, service requests, contracts, and reporting into one centralized dashboard for owners, managers, and tenants.",
      },
      {
        q: "How does ATAR handle payments and accounting?",
        // ASSUMPTION: 4th item de-duplicated from Figma (was a repeat).
        a: "Automate rent collection, track expenses, and generate detailed financial reports. ATAR integrates with regional payment and e-invoicing tools so your books stay accurate and up to date.",
      },
    ],
    stillTitle: "Still have questions?",
    stillBody:
      "Can't find the answer you're looking for? Please contact to our friendly team.",
    stillCta: "Get in Touch",
    emailPlaceholder: "Enter your email",
    emailError: "Please enter a valid email address.",
    emailSuccess: "Thanks! We'll be in touch shortly.",
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
      "Questions about the platform, pricing, or a partnership? Reach out and the ATAR team will respond within one business day.",
    hoursTitle: "Working hours",
    // ASSUMPTION: standard Saudi business week — confirm actual hours.
    hoursDays: "Sunday – Thursday",
    hoursTime: "9:00 AM – 6:00 PM (AST)",
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
    valuesTitle: "Values",
    valuesSubtitle: "The principles behind everything we build.",
    values: [
      { icon: "check", title: "Responsibility", body: "We own the outcomes for the owners, tenants, and communities who rely on ATAR every day." },
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
    // ASSUMPTION: Figma blurb was lorem ipsum — replaced with on-brand copy.
    blurb:
      "The national real estate management platform—leasing, accounting, service, and reporting in one place.",
    companyTitle: "Company",
    company: [
      { label: "Home", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
    helpTitle: "Help",
    help: [
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Return Policy", href: "#" },
      { label: "Disclaimer", href: "#" },
    ],
    contactTitle: "Contact Details",
    address: "Al Imam Saud Ibn Faysal Rd, Riyadh 13522, Saudi Arabia",
    phone: "+966 53 115 5105",
    email: "Info@goatar.com",
    copyright:
      "Copyright © 2024 Atar Real Estate Services Company, All Rights Reserved",
  },
};

export type Strings = typeof en;
