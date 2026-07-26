import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { Menu, Close, Phone, Globe } from "./ui/Icon";

type NavTarget = { label: string; to: string };

/** Renders a router Link for real routes and an anchor for in-page hashes. */
function NavItem({
  target,
  active = false,
  className,
  onClick,
}: {
  target: NavTarget;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const cls = `${className ?? ""} ${active ? "font-medium text-primary" : ""}`.trim();
  const current = active ? ({ "aria-current": "page" } as const) : {};
  if (target.to.includes("#")) {
    return (
      <a href={target.to} className={cls} onClick={onClick} {...current}>
        {target.label}
      </a>
    );
  }
  return (
    <Link to={target.to} className={cls} onClick={onClick} {...current}>
      {target.label}
    </Link>
  );
}

export default function Navbar() {
  const { t, toggle } = useLocale();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = (to: string) => to === pathname;

  const links: NavTarget[] = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.features, to: "/#features" },
    { label: t.nav.pricing, to: "/pricing" },
    { label: t.nav.about, to: "/about" },
    { label: t.nav.contact, to: "/contact" },
  ];

  return (
    <header id="top" className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      {/* Utility top bar */}
      <div className="border-b border-grey-100">
        <div className="mx-auto flex max-w-content items-center justify-end gap-4 px-5 py-2 lg:px-8">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary"
            aria-label={t.langToggle === "EN" ? "Switch to English" : "التبديل إلى العربية"}
          >
            <Globe size={16} />
            {t.langToggle}
          </button>
          <a
            href={`tel:${t.topbar.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-primary"
          >
            <Phone size={15} />
            <span dir="ltr">{t.topbar.phone}</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav aria-label="Primary" className="border-b border-grey-100">
        <div className="mx-auto flex h-[72px] max-w-content items-center justify-between gap-6 px-5 lg:px-8">
          <Link to="/" aria-label="ATAR home" className="shrink-0">
            <Logo className="h-10 w-auto" />
          </Link>

          <ul className="hidden items-center gap-8 text-[17px] text-ink lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavItem
                  target={l}
                  active={isActive(l.to)}
                  className="transition-colors hover:text-primary"
                />
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <a href="#login" className="font-medium text-ink hover:text-primary">
              {t.nav.login}
            </a>
            <Button href="/contact">{t.nav.getStarted}</Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-secondary hover:bg-grey-100 lg:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>

        {open && (
          <div id="mobile-menu" className="border-t border-grey-100 bg-white px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1 text-base text-ink">
              {links.map((l) => (
                <li key={l.to}>
                  <NavItem
                    target={l}
                    active={isActive(l.to)}
                    className="block py-2.5"
                    onClick={() => setOpen(false)}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#login"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-grey-200 px-4 py-3 text-center font-medium text-ink"
              >
                {t.nav.login}
              </a>
              <Button href="/contact" fullWidth>
                {t.nav.getStarted}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
