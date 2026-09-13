import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import Logo from "./ui/Logo";
import { pick, type Locale } from "../data/pricing";
import { footerGroups, legalGroup, type NavGroup } from "../data/navigation";

/** Router Link for clean internal routes; plain anchor for hash/external/placeholder links. */
function FooterLink({ href, label }: { href: string; label: string }) {
  const isRoute = href.startsWith("/") && !href.includes("#");
  if (isRoute) {
    return (
      <Link to={href} className="hover:text-white">
        {label}
      </Link>
    );
  }
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className="hover:text-white"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

function FooterNavColumn({ group, locale }: { group: NavGroup; locale: Locale }) {
  const title = pick(group.label, locale);
  return (
    <nav aria-label={title}>
      <h2 className="mb-4 font-medium text-white">{title}</h2>
      {group.sections ? (
        <div className="space-y-4">
          {group.sections.map((section) => (
            <div key={section.label.en}>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
                {pick(section.label, locale)}
              </p>
              <ul className="space-y-3 text-sm">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <FooterLink href={item.to} label={pick(item.label, locale)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-3 text-sm">
          {(group.items ?? []).map((item) => (
            <li key={item.to}>
              <FooterLink href={item.to} label={pick(item.label, locale)} />
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default function Footer() {
  const { t, locale } = useLocale();
  const f = t.footer;

  return (
    // `border-t` gives the footer its own visible seam even when the section
    // right above it happens to share the exact same dark-mode background
    // (e.g. the Home page's FAQ/CTA section is `dark:bg-secondary-darker`,
    // identical to the footer's own always-dark background) — without it the
    // two read as one continuous block in dark mode. Same subtle treatment
    // already used for the divider between the nav columns and copyright bar
    // below, just applied to the footer's leading edge too.
    <footer className="border-t border-white/10 bg-secondary-darker text-white/80">
      <div className="mx-auto max-w-content px-5 py-14 lg:px-8">
        {/* Brand */}
        <div className="mb-12 max-w-sm">
          <Logo light className="mb-4 h-9 w-auto" />
          <p className="text-sm leading-relaxed">{f.blurb}</p>
        </div>

        {/* Full nav — repeats every header destination as flat columns. Every
            column is a plain label + flat list (sub-sectioned header groups
            like Products and Solutions are split into one column per
            sub-section instead of nesting), so all 6 columns read the same
            at a glance and sit on one row together (lg:grid-cols-6 matches
            footerGroups.length exactly, so Resources doesn't wrap alone onto
            a second row). Contact Details (address/phone/email) isn't shown
            as its own column for now — f.contactTitle/address/phone/email
            are still there in i18n if it needs to come back. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-6">
          {footerGroups.map((group) => (
            <FooterNavColumn key={group.label.en} group={group} locale={locale} />
          ))}
        </div>
      </div>

      {/* Bottom bar: legal links start-aligned, copyright centered, socials
          end-aligned — stacks to a centered column on narrow screens where
          there isn't room for all three side by side. */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-5 py-5 text-sm text-white/60 lg:flex-row lg:justify-between lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:order-1 lg:justify-start">
            {legalGroup.items!.map((item) => (
              <li key={item.to}>
                <FooterLink href={item.to} label={pick(item.label, locale)} />
              </li>
            ))}
          </ul>

          <p className="order-first text-center lg:order-2">{f.copyright}</p>

          <div className="flex gap-3 lg:order-3">
            <Social label="LinkedIn">
              <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 105 0 2.5 2.5 0 00-2.52-2.5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21H9z" />
            </Social>
            <Social label="X">
              <path d="M18.9 2H22l-7.4 8.5L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.9-9L1 2h7l4.8 6.3zM17.7 20h1.7L7.4 3.9H5.6z" />
            </Social>
            <Social label="Instagram" stroke>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </Social>
            <Social label="WhatsApp" href={`https://wa.me/${f.phone.replace(/[^\d]/g, "")}`}>
              <path d="M12.01 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.43 1.27 4.87L2 22l5.28-1.24A9.96 9.96 0 0 0 12.01 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.2a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.83.84-3.05-.2-.31A8.2 8.2 0 1 1 20.2 12a8.2 8.2 0 0 1-8.19 8.2zm4.51-6.13c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.15.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z" />
            </Social>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({
  label,
  children,
  stroke = false,
  href = "#",
}: {
  label: string;
  children: React.ReactNode;
  stroke?: boolean;
  href?: string;
}) {
  const isExternal = href !== "#";
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 transition-colors hover:bg-primary"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={stroke ? "none" : "currentColor"}
        stroke={stroke ? "currentColor" : "none"}
        strokeWidth={stroke ? 2 : undefined}
        aria-hidden="true"
      >
        {children}
      </svg>
    </a>
  );
}
