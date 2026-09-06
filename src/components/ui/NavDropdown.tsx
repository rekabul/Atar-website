import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "./Icon";
import { pick, type Locale } from "../../data/pricing";
import type { NavGroup } from "../../data/navigation";

/**
 * Accessible desktop mega-menu trigger + panel for the header's Products /
 * Solutions / Markets / Compare groups. Click-toggled (not hover-only, so it
 * works the same with touch/keyboard), closes on outside click, Escape, or
 * route change. Panel is positioned with logical `start-0` so it lands on the
 * correct side in both LTR and RTL without extra flipping logic.
 */
export default function NavDropdown({
  group,
  locale,
  triggerClassName = "",
}: {
  group: NavGroup;
  locale: Locale;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const slug = group.label.en.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const btnId = `navdd-${slug}-btn`;
  const panelId = `navdd-${slug}-panel`;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={btnId}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 ${triggerClassName}`}
      >
        <span>{pick(group.label, locale)}</span>
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          id={panelId}
          role="menu"
          aria-labelledby={btnId}
          className="absolute start-0 top-full z-50 mt-3 w-[320px] rounded-2xl border border-grey-100 bg-white p-2.5 shadow-lift dark:border-white/10 dark:bg-secondary-darker"
        >
          <ul className="flex flex-col">
            {group.items.map((item) => (
              <li key={item.to} role="none">
                <Link
                  role="menuitem"
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3.5 py-2.5 text-sm leading-snug text-ink transition-colors hover:bg-grey-50 hover:text-primary dark:text-white dark:hover:bg-white/5 dark:hover:text-primary-light"
                >
                  {pick(item.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
