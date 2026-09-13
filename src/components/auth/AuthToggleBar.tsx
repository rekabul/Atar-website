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
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-all duration-150 hover:bg-grey-50 hover:text-primary active:bg-grey-100 motion-safe:active:scale-90 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white dark:active:bg-white/10"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
      </button>
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-medium text-ink-muted transition-all duration-150 hover:text-primary active:opacity-60 motion-safe:active:scale-95 dark:text-white/70 dark:hover:text-white"
        aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
      >
        <Globe size={16} />
        {locale === "en" ? "عربي" : "EN"}
      </button>
    </div>
  );
}
