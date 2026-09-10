import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "./Icon";
import { pick, type Locale } from "../../data/pricing";
import type { NavGroup, NavLink } from "../../data/navigation";

/** Delay before a hover-close actually closes the panel — long enough that
 * moving the mouse diagonally from the trigger into the panel doesn't
 * accidentally dismiss it, short enough that it doesn't feel sticky. */
const CLOSE_DELAY = 150;

/**
 * Desktop mega-menu for the header's Products / Solutions / Markets
 * dropdowns — styled after DoorLoop's and TenantCloud's feature menus: a wide
 * panel with one labeled column per sub-section (or a single unlabeled
 * column for a flat group like Markets), each item shown as an icon badge +
 * label row.
 *
 * Opens on hover (mouseenter of the whole trigger+panel wrapper, so moving
 * from the trigger down into the panel doesn't close it), closes on
 * mouseleave after a short delay, and still toggles on click so it works the
 * same for touch and keyboard users. Closes on outside click, Escape, or
 * route change. Positioned with logical `start-0` so it lands on the correct
 * side in both LTR and RTL without extra flipping logic.
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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

  const slug = group.label.en.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const btnId = `navdd-${slug}-btn`;
  const panelId = `navdd-${slug}-panel`;

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

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

  useEffect(() => clearCloseTimer, []);

  // Sub-sectioned groups (Products, Solutions) get one labeled column per
  // section; a flat group (Markets) renders as a single column with no
  // heading, since repeating the trigger's own label inside the panel would
  // just be noise.
  const columns = group.sections ?? [{ label: group.label, items: group.items ?? [] }];
  const showColumnLabels = Boolean(group.sections);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={() => {
        clearCloseTimer();
        closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
      }}
    >
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
          className="absolute start-0 top-full z-50 mt-3 rounded-2xl border border-grey-100 bg-white p-5 shadow-lift dark:border-white/10 dark:bg-secondary-darker"
        >
          <div
            className="grid gap-x-10 gap-y-1"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(200px, 232px))` }}
          >
            {columns.map((section) => (
              <div key={section.label.en}>
                {showColumnLabels && (
                  <p className="mb-2 px-2.5 text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-white/40">
                    {pick(section.label, locale)}
                  </p>
                )}
                <ul className="flex flex-col">
                  {section.items.map((item) => (
                    <NavDropdownItem key={item.to} item={item} locale={locale} onNavigate={() => setOpen(false)} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NavDropdownItem({
  item,
  locale,
  onNavigate,
}: {
  item: NavLink;
  locale: Locale;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  return (
    <li role="none">
      <Link
        role="menuitem"
        to={item.to}
        onClick={onNavigate}
        className="group flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm leading-snug text-ink transition-colors hover:bg-grey-50 hover:text-primary dark:text-white dark:hover:bg-white/5 dark:hover:text-primary-light"
      >
        {Icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:bg-white/10 dark:text-primary-light dark:group-hover:bg-primary dark:group-hover:text-white">
            <Icon size={18} />
          </span>
        )}
        <span>{pick(item.label, locale)}</span>
      </Link>
    </li>
  );
}
