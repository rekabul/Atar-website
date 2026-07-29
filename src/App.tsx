import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      {/* Auth screen sits outside the marketing Layout — no site nav/footer,
          just its own minimal header, matching how most SaaS sign-in pages
          keep the flow focused. */}
      <Route path="/login" element={<LoginPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Unknown routes fall back to the home page */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
