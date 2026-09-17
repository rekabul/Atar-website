import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<Ctx | null>(null);
// Presence of this key means the visitor picked a theme manually via the
// toggle — until then, the site follows the device's OS-level setting.
const STORAGE_KEY = "atar-theme";

function prefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}

function initialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return prefersDark() ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Live-follow the device's dark/light setting (e.g. switching at sunset,
  // or a system-wide toggle) as long as the visitor hasn't manually chosen a
  // theme themselves.
  useEffect(() => {
    if (typeof window === "undefined" || window.localStorage.getItem(STORAGE_KEY)) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      theme,
      toggle: () =>
        setTheme((th) => {
          const next = th === "light" ? "dark" : "light";
          try {
            window.localStorage.setItem(STORAGE_KEY, next);
          } catch {
            /* storage may be unavailable — non-fatal */
          }
          return next;
        }),
    }),
    []
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Ctx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
