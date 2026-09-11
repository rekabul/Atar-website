import { Link } from "react-router-dom";
import { useLocale } from "../../i18n/LocaleContext";
import { useTheme } from "../../theme/ThemeContext";
import Logo, { LogoMark } from "../ui/Logo";
import { dashboard } from "../../assets";

type LStr = { en: string; ar: string };
const pick = (s: LStr, l: "en" | "ar") => s[l];

const copy = {
  eyebrow: { en: "Property management, simplified", ar: "إدارة عقارية مبسّطة" },
  titleA: { en: "Manage Your", ar: "أدِر" },
  titleHighlight: { en: "Properties", ar: "عقاراتك" },
  titleB: { en: "With Ease", ar: "بكل سهولة" },
  body: {
    en: "Leasing, accounting, service requests, and reporting, all from one smart dashboard. Sign in to stay in control of your portfolio.",
    ar: "التأجير والمحاسبة وطلبات الخدمة والتقارير، كل ذلك من لوحة تحكم ذكية واحدة. سجّل الدخول لتبقى في السيطرة على محفظتك.",
  },
} as const;

/**
 * Left brand panel shared by every auth screen (Sign In, Sign Up) — logo,
 * headline, and product screenshot bleeding off the bottom edge. Hidden below
 * `lg`, where the auth form takes the full screen.
 */
export default function AuthBrandPanel() {
  const { locale } = useLocale();
  const { theme } = useTheme();

  return (
    <div className="relative hidden w-[44%] shrink-0 overflow-hidden bg-gradient-to-br from-primary-lighter via-primary-lighter to-white dark:from-secondary-dark dark:via-secondary-darker dark:to-secondary-darker lg:flex lg:flex-col">
      <LogoMark className="pointer-events-none absolute -top-10 -start-16 h-56 w-56 -rotate-12 text-primary/10 dark:text-white/[0.05]" />
      <LogoMark className="pointer-events-none absolute -end-24 bottom-24 h-72 w-72 rotate-12 text-primary/10 dark:text-white/[0.04]" />

      <div className="relative z-10 px-12 pt-14">
        <Link to="/" aria-label="Atar home" className="inline-block">
          <Logo light={theme === "dark"} className="h-9 w-auto" />
        </Link>
      </div>

      <div className="relative z-10 mt-16 flex-1 px-12">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">{pick(copy.eyebrow, locale)}</p>
        <h2 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-ink dark:text-white">
          {pick(copy.titleA, locale)} <span className="text-primary">{pick(copy.titleHighlight, locale)}</span>{" "}
          {pick(copy.titleB, locale)}
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-ink-soft dark:text-white/70">{pick(copy.body, locale)}</p>
      </div>

      {/* Product screenshot, bleeding off the bottom edge for depth */}
      <div className="relative z-10 mt-10 px-12">
        <div className="overflow-hidden rounded-t-2xl border border-b-0 border-grey-100 bg-white shadow-[0_-16px_40px_-16px_rgba(8,15,26,0.2)] dark:border-white/10">
          <img src={dashboard} alt="" aria-hidden="true" className="block w-full translate-y-4" loading="eager" />
        </div>
      </div>
    </div>
  );
}
