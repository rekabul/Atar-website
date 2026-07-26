import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import Logo from "./ui/Logo";

/** Router Link for clean internal routes; plain anchor for hash/placeholder links. */
function FooterLink({ href, label }: { href: string; label: string }) {
  const isRoute = href.startsWith("/") && !href.includes("#");
  if (isRoute) {
    return (
      <Link to={href} className="hover:text-white">
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className="hover:text-white">
      {label}
    </a>
  );
}

export default function Footer() {
  const { t } = useLocale();
  const f = t.footer;

  return (
    <footer className="bg-secondary-darker text-white/80">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo light className="mb-4 h-9 w-auto" />
          <p className="max-w-xs text-sm leading-relaxed">{f.blurb}</p>
          <div className="mt-5 flex gap-3">
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
          </div>
        </div>

        <nav aria-label={f.companyTitle}>
          <h2 className="mb-4 font-medium text-white">{f.companyTitle}</h2>
          <ul className="space-y-3 text-sm">
            {f.company.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href} label={l.label} />
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={f.helpTitle}>
          <h2 className="mb-4 font-medium text-white">{f.helpTitle}</h2>
          <ul className="space-y-3 text-sm">
            {f.help.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href} label={l.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-medium text-white">{f.contactTitle}</h2>
          <ul className="space-y-3 text-sm">
            <li>{f.address}</li>
            <li>
              <a href={`tel:${f.phone.replace(/\s/g, "")}`} className="hover:text-white" dir="ltr">
                {f.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${f.email}`} className="hover:text-white">
                {f.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-content px-5 py-5 text-center text-sm text-white/60 lg:px-8">
          {f.copyright}
        </p>
      </div>
    </footer>
  );
}

function Social({
  label,
  children,
  stroke = false,
}: {
  label: string;
  children: React.ReactNode;
  stroke?: boolean;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 transition-colors hover:bg-primary"
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
