import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import FaqPage from "./pages/FaqPage";
import PlaceholderPage from "./pages/PlaceholderPage";

// Every path in data/placeholderPages.ts gets a route here, all sharing the
// one generic PlaceholderPage component (see that file for why).
const PLACEHOLDER_PATHS = [
  "/products/sales-suite",
  "/products/leasing-suite",
  "/products/operations-suite",
  "/products/atar-os",
  "/products/addons/listing-website",
  "/products/addons/branded-mobile-app",
  "/products/addons/powerbi-reports",
  "/solutions/real-estate-crm",
  "/solutions/listing-website",
  "/solutions/sales-handover",
  "/solutions/leasing-contract-management",
  "/solutions/property-portfolio-financials",
  "/solutions/maintenance-ticketing",
  "/solutions/facilities-management",
  "/solutions/community-engagement-access",
  "/solutions/customer-portal",
  "/solutions/reporting-analytics",
  "/markets/residential",
  "/markets/retail",
  "/markets/office",
  "/markets/compounds-communities",
  "/markets/mixed-use-developments",
  "/compare/spreadsheets",
  "/compare/proptech-platforms",
  "/compare/in-house",
  "/compare/point-solutions",
  "/case-studies",
  "/company/leadership",
  "/resources/blog",
  "/legal/terms",
  "/legal/privacy",
  "/legal/refund",
  "/legal/disclaimer",
];

export default function App() {
  return (
    <Routes>
      {/* Auth screens sit outside the marketing Layout — no site nav/footer,
          just their own minimal header, matching how most SaaS sign-in flows
          keep the flow focused. Sign Up is its own dedicated registration
          form (see SignupPage.tsx), sharing the same brand panel + toggle
          bar as Log In via components/auth/*. */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        {PLACEHOLDER_PATHS.map((path) => (
          <Route key={path} path={path} element={<PlaceholderPage />} />
        ))}
        {/* Unknown routes fall back to the home page */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
