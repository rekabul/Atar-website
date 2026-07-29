import { useRef, useState, type FormEvent } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { Phone, Mail, ArrowRight } from "./ui/Icon";
import Reveal from "./ui/Reveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = { name: string; email: string; company: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

/**
 * Accessible contact form. Validates on submit (and clears errors as the user
 * types). There is NO backend: on a valid submit it surfaces a success message
 * and a note telling the integrator to connect a real endpoint. Replace the
 * marked TODO with a fetch() to activate.
 */
export default function ContactForm({ hideEyebrow = false }: { hideEyebrow?: boolean }) {
  const { t } = useLocale();
  const c = t.contactForm;
  const [values, setValues] = useState<Fields>({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  function validate(v: Fields): Errors {
    const e: Errors = {};
    if (!v.name.trim()) e.name = c.errors.name;
    if (!v.email.trim()) e.email = c.errors.emailRequired;
    else if (!EMAIL_RE.test(v.email.trim())) e.email = c.errors.emailInvalid;
    if (!v.message.trim()) e.message = c.errors.message;
    return e;
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setDone(false);
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) {
      (["name", "email", "message"] as const).find((k) => {
        if (e[k]) {
          refs[k].current?.focus();
          return true;
        }
        return false;
      });
      return;
    }
    // TODO: await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })
    setDone(true);
    setValues({ name: "", email: "", company: "", message: "" });
  }

  function update<K extends keyof Fields>(key: K, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const fieldClass = (err?: string) =>
    `w-full rounded-xl border px-4 py-3 text-ink placeholder:text-grey-600 focus:border-primary dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 ${
      err ? "border-danger" : "border-grey-200 dark:border-white/15"
    }`;

  return (
    <section id="contact" className="scroll-mt-28 bg-white py-16 dark:bg-secondary-darker lg:py-20" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-content gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Intro + contact details */}
        <Reveal>
          {!hideEyebrow && (
            <p className="text-sm font-medium uppercase tracking-wider text-primary">{c.eyebrow}</p>
          )}
          <h2 id="contact-title" className="mt-3 text-3xl font-medium text-ink dark:text-white lg:text-4xl">
            {c.title}
          </h2>
          <p className="mt-4 text-lg text-ink-soft dark:text-white/70">{c.subtitle}</p>

          <ul className="mt-8 space-y-4 text-ink dark:text-white">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-primary-lighter text-primary dark:bg-white/10 dark:text-primary-light" aria-hidden="true">
                <Phone size={18} />
              </span>
              <a href={`tel:${t.footer.phone.replace(/\s/g, "")}`} className="hover:text-primary" dir="ltr">
                {t.footer.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-primary-lighter text-primary dark:bg-white/10 dark:text-primary-light" aria-hidden="true">
                <Mail size={18} />
              </span>
              <a href={`mailto:${t.footer.email}`} className="hover:text-primary">
                {t.footer.email}
              </a>
            </li>
            <li className="text-ink-soft dark:text-white/70">{t.footer.address}</li>
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal delay={90}>
        <form onSubmit={handleSubmit} noValidate className="rounded-[28px] bg-[#F6F7F8] p-6 dark:bg-white/5 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                {c.name.label}
              </label>
              <input
                id="cf-name"
                ref={refs.name}
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                aria-required="true"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "cf-name-err" : undefined}
                placeholder={c.name.placeholder}
                className={fieldClass(errors.name)}
              />
              {errors.name && (
                <p id="cf-name-err" role="alert" className="mt-1.5 text-sm text-danger">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                {c.email.label}
              </label>
              <input
                id="cf-email"
                ref={refs.email}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                aria-required="true"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "cf-email-err" : undefined}
                placeholder={c.email.placeholder}
                className={fieldClass(errors.email)}
                dir="ltr"
              />
              {errors.email && (
                <p id="cf-email-err" role="alert" className="mt-1.5 text-sm text-danger">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="cf-company" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                {c.company.label} <span className="text-grey-600 dark:text-white/40">{c.company.optional}</span>
              </label>
              <input
                id="cf-company"
                type="text"
                autoComplete="organization"
                value={values.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder={c.company.placeholder}
                className={fieldClass()}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                {c.message.label}
              </label>
              <textarea
                id="cf-message"
                ref={refs.message}
                rows={4}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                aria-required="true"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "cf-message-err" : undefined}
                placeholder={c.message.placeholder}
                className={fieldClass(errors.message)}
              />
              {errors.message && (
                <p id="cf-message-err" role="alert" className="mt-1.5 text-sm text-danger">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-secondary sm:w-auto"
          >
            <span>{c.submit}</span>
            <ArrowRight />
          </button>

          {done && (
            <p role="status" className="mt-4 rounded-lg bg-success/10 px-4 py-3 text-sm text-success">
              {c.success}
            </p>
          )}
          <p className="mt-4 text-xs text-ink-soft dark:text-white/50">{c.note}</p>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
