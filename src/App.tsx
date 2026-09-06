import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import FaqPage from "./pages/FaqPage";
import PlaceholderPage from "./pages/PlaceholderPage";

// Every path in data/placeholderPages.ts gets a route here, all sharing the
// one generic PlaceholderPage component (see that file for why).
const PLACEHOLDER_PATHS = [
  "/products/sales-suite",
  "/products/leasing-suite",
  "/products/operations-suite",
  "/solutions/property-developers",
  "/solutions/real-estate-marketers",
  "/solutions/property-managers",
  "/solutions/facility-managers",
  "/solutions/owner-associations",
  "/solutions/coworking-operators",
  "/markets/residential",
  "/markets/commercial",
  "/markets/compounds-communities",
  "/markets/accommodation-housing",
  "/markets/coworking-spaces",
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
          keep the flow focused. Sign Up reuses the same phone+business+OTP
          flow as Log In rather than duplicating a near-identical page. */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<LoginPage />} />

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
