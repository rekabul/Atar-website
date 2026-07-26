import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type Strings } from "./en";
import { ar } from "./ar";

type Locale = "en" | "ar";
type Ctx = { locale: Locale; dir: "ltr" | "rtl"; t: Strings; toggle: () => void };

const dictionaries: Record<Locale, Strings> = { en, ar };
const LocaleContext = createContext<Ctx | null>(null);

function initialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("atar-locale");
  return saved === "ar" ? "ar" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    try {
      window.localStorage.setItem("atar-locale", locale);
    } catch {
      /* storage may be unavailable — non-fatal */
    }
  }, [locale]);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      t: dictionaries[locale],
      toggle: () => setLocale((l) => (l === "en" ? "ar" : "en")),
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
