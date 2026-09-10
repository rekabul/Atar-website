import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { useTheme } from "../theme/ThemeContext";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import NavDropdown from "./ui/NavDropdown";
import { Menu, Close, Phone, Globe, Sun, Moon, ChevronDown } from "./ui/Icon";
import { pick } from "../data/pricing";
import {
  headerGroups,
  headerFlatLinks,
  loginLink,
  signUpLink,
  type NavLink,
} from "../data/navigation";

/** Renders a mobile accordion group's items — either a flat list, or, for a
 * sub-sectioned group like Products, each labeled sub-section in turn. */
function MobileGroupItems({
  group,
  locale,
  onNavigate,
}: {
  group: (typeof headerGroups)[number];
  locale: "en" | "ar";
  onNavigate: () => void;
}) {
  if (group.sections) {
    return (
      <>
        {group.sections.map((section) => (
          <div key={section.label.en} className="mb-2 last:mb-0">
            <p className="px-0 py-1.5 text-xs font-medium uppercase tracking-wider text-ink-muted dark:text-white/40">
              {pick(section.label, locale)}
            </p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavItem
                    target={item}
                    locale={locale}
                    className="block py-2 text-sm text-ink-soft dark:text-white/70"
                    onClick={onNavigate}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </>
    );
  }
  return (
    <ul className="flex flex-col gap-0.5">
      {(group.items ?? []).map((item) => (
        <li key={item.to}>
          <NavItem
            target={item}
            locale={locale}
            className="block py-2 text-sm text-ink-soft dark:text-white/70"
            onClick={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}

/** Renders a router Link for real routes and a plain anchor for in-page hashes. */
function NavItem({
  target,
  locale,
  active = false,
  className,
  onClick,
}: {
  target: NavLink;
  locale: "en" | "ar";
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const cls = `${className ?? ""} ${active ? "font-medium text-primary" : ""}`.trim();
  const current = active ? ({ "aria-current": "page" } as const) : {};
  const label = pick(target.label, locale);
  if (target.to.includes("#")) {
    return (
      <a href={target.to} className={cls} onClick={onClick} {...current}>
        {label}
      </a>
    );
  }
  return (
    <Link to={target.to} className={cls} onClick={onClick} {...current}>
      {label}
    </Link>
  );
}

export default function Navbar() {
  const { t, locale, toggle } = useLocale();
  const { theme, toggle: toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { pathname } = useLocation();
  const isActive = (to: string) => to === pathname;

  return (
    <header id="top" className="sticky top-0 z-40 bg-white/95 backdrop-blur dark:bg-secondary-darker/95">
      {/* Utility top bar */}
      <div className="border-b border-grey-100 dark:border-white/10">
        <div className="mx-auto flex max-w-content items-center justify-end gap-4 px-5 py-2 lg:px-8">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-primary dark:text-white/70 dark:hover:text-white"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary dark:text-white/70 dark:hover:text-white"
            aria-label={t.langToggle === "EN" ? "Switch to English" : "التبديل إلى العربية"}
          >
            <Globe size={16} />
            {t.langToggle}
          </button>
          <a
            href={`tel:${t.topbar.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-primary dark:text-white dark:hover:text-primary-light"
          >
            <Phone size={15} />
            <span dir="ltr">{t.topbar.phone}</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav aria-label="Primary" className="border-b border-grey-100 dark:border-white/10">
        <div className="mx-auto flex h-[72px] max-w-content items-center justify-between gap-6 px-5 lg:px-8">
          <Link to="/" aria-label="Atar home" className="shrink-0">
            <Logo light={theme === "dark"} className="h-10 w-auto" />
          </Link>

          <ul className="hidden items-center gap-7 text-[15px] text-ink dark:text-white xl:flex">
            {headerGroups.map((group) => (
              <li key={group.label.en}>
                <NavDropdown
                  group={group}
                  locale={locale}
                  triggerClassName="font-normal transition-colors hover:text-primary dark:hover:text-primary-light"
                />
              </li>
            ))}
            {headerFlatLinks.map((l) => (
              <li key={l.to}>
                <NavItem
                  target={l}
                  locale={locale}
                  active={isActive(l.to)}
                  className="transition-colors hover:text-primary dark:hover:text-primary-light"
                />
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 xl:flex">
            <Link
              to={loginLink.to}
              className="font-medium text-ink hover:text-primary dark:text-white dark:hover:text-primary-light"
            >
              {pick(loginLink.label, locale)}
            </Link>
            <Button href={signUpLink.to}>{pick(signUpLink.label, locale)}</Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-secondary hover:bg-grey-100 dark:text-white dark:hover:bg-white/10 xl:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-grey-100 bg-white px-5 py-4 dark:border-white/10 dark:bg-secondary-darker xl:hidden"
          >
            <ul className="flex flex-col gap-1 text-base text-ink dark:text-white">
              {headerGroups.map((group) => {
                const isGroupOpen = openGroup === group.label.en;
                const panelId = `mobile-group-${group.label.en.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                return (
                  <li key={group.label.en} className="border-b border-grey-100 last:border-0 dark:border-white/10">
                    <button
                      type="button"
                      aria-expanded={isGroupOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenGroup(isGroupOpen ? null : group.label.en)}
                      className="flex w-full items-center justify-between py-3 text-start font-medium"
                    >
                      <span>{pick(group.label, locale)}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isGroupOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isGroupOpen && (
                      <div id={panelId} className="mb-2 ps-3">
                        <MobileGroupItems
                          group={group}
                          locale={locale}
                          onNavigate={() => {
                            setOpen(false);
                            setOpenGroup(null);
                          }}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
              {headerFlatLinks.map((l) => (
                <li key={l.to}>
                  <NavItem
                    target={l}
                    locale={locale}
                    active={isActive(l.to)}
                    className="block py-2.5"
                    onClick={() => setOpen(false)}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to={loginLink.to}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-grey-200 px-4 py-3 text-center font-medium text-ink dark:border-white/20 dark:text-white"
              >
                {pick(loginLink.label, locale)}
              </Link>
              <Button href={signUpLink.to} fullWidth>
                {pick(signUpLink.label, locale)}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
