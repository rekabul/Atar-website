import { useLocale } from "../../i18n/LocaleContext";
import { useTheme } from "../../theme/ThemeContext";
import { Sun, Moon, Globe } from "../ui/Icon";

/** Dark-mode + language toggle shared by every auth screen (Sign In, Sign Up). */
export default function AuthToggleBar() {
  const { locale, toggle } = useLocale();
  const { theme, toggle: toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggleTheme}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-primary dark:text-white/70 dark:hover:text-white"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
      </button>
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-primary dark:text-white/70 dark:hover:text-white"
        aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
      >
        <Globe size={16} />
        {locale === "en" ? "عربي" : "EN"}
      </button>
    </div>
  );
}
