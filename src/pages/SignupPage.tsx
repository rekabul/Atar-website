import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { useTheme } from "../theme/ThemeContext";
import Reveal from "../components/ui/Reveal";
import Logo, { LogoMark } from "../components/ui/Logo";
import AuthBrandPanel from "../components/auth/AuthBrandPanel";
import AuthToggleBar from "../components/auth/AuthToggleBar";
import { ArrowRight, ArrowLeft, Check, ChevronDown, UserIcon, IdCardIcon, Mail } from "../components/ui/Icon";

type LStr = { en: string; ar: string };
type Locale = "en" | "ar";
const pick = (s: LStr, l: Locale) => s[l];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const copy = {
  titleA: { en: "Welcome to", ar: "مرحباً بك في" },
  titleHighlight: { en: "Atar", ar: "أتار" },
  subtitle: { en: "Create your account", ar: "أنشئ حسابك" },
  stepOneLabel: { en: "Personal details", ar: "البيانات الشخصية" },
  stepTwoLabel: { en: "Contact details", ar: "بيانات التواصل" },
  firstNameLabel: { en: "First Name", ar: "الاسم الأول" },
  firstNamePlaceholder: { en: "Enter First Name", ar: "أدخل الاسم الأول" },
  firstNameError: { en: "Please enter your first name.", ar: "الرجاء إدخال الاسم الأول." },
  lastNameLabel: { en: "Last Name", ar: "اسم العائلة" },
  lastNamePlaceholder: { en: "Enter Last Name", ar: "أدخل اسم العائلة" },
  lastNameError: { en: "Please enter your last name.", ar: "الرجاء إدخال اسم العائلة." },
  nationalIdLabel: { en: "National ID / Residence Permit No.", ar: "رقم الهوية الوطنية / الإقامة" },
  nationalIdPlaceholder: { en: "Enter National ID/Residence Permit No.", ar: "أدخل رقم الهوية الوطنية/الإقامة" },
  nationalIdError: {
    en: "Please enter your national ID or residence permit number.",
    ar: "الرجاء إدخال رقم الهوية الوطنية أو الإقامة.",
  },
  countryCodeLabel: { en: "Country Code", ar: "رمز الدولة" },
  phoneLabel: { en: "Phone number", ar: "رقم الهاتف" },
  phonePlaceholder: { en: "Enter phone number", ar: "أدخل رقم الهاتف" },
  phoneError: { en: "Enter a valid Saudi mobile number.", ar: "أدخل رقم جوال سعودي صحيح." },
  emailLabel: { en: "Email", ar: "البريد الإلكتروني" },
  emailPlaceholder: { en: "Enter Email", ar: "أدخل البريد الإلكتروني" },
  emailError: { en: "Please enter a valid email address.", ar: "الرجاء إدخال بريد إلكتروني صحيح." },
  termsPrefix: {
    en: "By proceeding to create your account, you are agreeing to our",
    ar: "بالمتابعة لإنشاء حسابك، فإنك توافق على",
  },
  termsLink: { en: "Terms of Condition", ar: "شروط الاستخدام" },
  and: { en: "and", ar: "و" },
  privacyLink: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  continueLabel: { en: "Continue", ar: "متابعة" },
  backLabel: { en: "Back", ar: "رجوع" },
  submit: { en: "Sign Up", ar: "إنشاء حساب" },
  submitting: { en: "Creating account…", ar: "جارٍ إنشاء الحساب…" },
  haveAccount: { en: "Already have an account?", ar: "لديك حساب بالفعل؟" },
  signIn: { en: "Sign In To Your Account", ar: "سجّل الدخول إلى حسابك" },
  doneTitle: { en: "You're all set", ar: "كل شيء جاهز" },
  doneBody: {
    en: "Your details look good. (Demo only — connect this screen to your auth backend to create real accounts.)",
    ar: "بياناتك جاهزة. (نسخة تجريبية، اربط هذه الشاشة ببوابة الدخول الفعلية لإنشاء حسابات حقيقية.)",
  },
  privacy: { en: "Privacy & Terms", ar: "الخصوصية والشروط" },
  contactUs: { en: "Contact us", ar: "تواصل معنا" },
  support: { en: "Support", ar: "الدعم" },
} as const;

export default function SignupPage() {
  const { locale } = useLocale();
  const { theme } = useTheme();

  const [step, setStep] = useState<1 | 2>(1);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [nationalIdError, setNationalIdError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const phoneValid = /^5\d{8}$/.test(phone);
  const emailValid = EMAIL_RE.test(email.trim());

  useEffect(() => {
    const prev = document.title;
    document.title = "Sign up for Atar";
    return () => {
      document.title = prev;
    };
  }, []);

  function handleContinue() {
    const firstNameOk = firstName.trim().length > 0;
    const lastNameOk = lastName.trim().length > 0;
    const nationalIdOk = nationalId.trim().length > 0;

    setFirstNameError(!firstNameOk);
    setLastNameError(!lastNameOk);
    setNationalIdError(!nationalIdOk);

    if (!firstNameOk || !lastNameOk || !nationalIdOk) return;
    setStep(2);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPhoneError(!phoneValid);
    setEmailError(!emailValid);
    if (!phoneValid || !emailValid) return;

    setSubmitting(true);
    // TODO: await fetch("/api/auth/sign-up", { method: "POST", body: JSON.stringify({ firstName, lastName, nationalId, phone, email }) })
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 800);
  }

  const inputClass = (hasError: boolean, hasLeadingIcon = true) =>
    `w-full rounded-xl border bg-white py-3.5 pe-3.5 text-ink placeholder:text-grey-600 transition-colors focus:border-primary focus:outline-none dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 ${
      hasLeadingIcon ? "ps-10" : "ps-3.5"
    } ${hasError ? "border-danger" : "border-grey-200 dark:border-white/15"}`;

  return (
    <div className="flex min-h-screen dark:bg-secondary-darker">
      <AuthBrandPanel />

      {/* Right — auth form */}
      <div className="hero-bg relative flex flex-1 flex-col">
        <LogoMark className="pointer-events-none absolute -bottom-16 -end-20 h-[360px] w-[360px] rotate-6 text-primary/[0.05] dark:text-white/[0.03] lg:hidden" />

        <header className="relative z-10 flex items-center justify-between px-5 py-6 lg:justify-end lg:px-10">
          <Link to="/" aria-label="Atar home" className="lg:hidden">
            <Logo light={theme === "dark"} className="h-8 w-auto" />
          </Link>
          <AuthToggleBar />
        </header>

        <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-6">
          <Reveal className="w-full max-w-md">
            <div className="rounded-[28px] border border-grey-100 bg-white/95 p-8 shadow-lift backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06] sm:p-10">
              {!done ? (
                <>
                  <div className="text-center">
                    <h1 className="text-3xl font-medium tracking-tight text-ink dark:text-white sm:text-4xl">
                      {pick(copy.titleA, locale)} <span className="text-primary">{pick(copy.titleHighlight, locale)}</span>
                    </h1>
                    <p className="mt-2 text-ink-soft dark:text-white/70">{pick(copy.subtitle, locale)}</p>
                  </div>

                  {/* Step progress */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs font-medium text-ink-muted dark:text-white/40">
                      <span>{pick(step === 1 ? copy.stepOneLabel : copy.stepTwoLabel, locale)}</span>
                      <span>{step}/2</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-grey-100 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: step === 1 ? "50%" : "100%" }}
                      />
                    </div>
                  </div>

                  {step === 1 ? (
                    <Reveal key="step-1" className="mt-6 space-y-5">
                      <Field
                        id="firstName"
                        icon={<UserIcon size={17} />}
                        label={pick(copy.firstNameLabel, locale)}
                        error={firstNameError ? pick(copy.firstNameError, locale) : undefined}
                      >
                        <input
                          id="firstName"
                          type="text"
                          autoComplete="given-name"
                          placeholder={pick(copy.firstNamePlaceholder, locale)}
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            if (firstNameError) setFirstNameError(false);
                          }}
                          aria-required="true"
                          aria-invalid={firstNameError || undefined}
                          className={inputClass(firstNameError)}
                        />
                      </Field>

                      <Field
                        id="lastName"
                        icon={<UserIcon size={17} />}
                        label={pick(copy.lastNameLabel, locale)}
                        error={lastNameError ? pick(copy.lastNameError, locale) : undefined}
                      >
                        <input
                          id="lastName"
                          type="text"
                          autoComplete="family-name"
                          placeholder={pick(copy.lastNamePlaceholder, locale)}
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            if (lastNameError) setLastNameError(false);
                          }}
                          aria-required="true"
                          aria-invalid={lastNameError || undefined}
                          className={inputClass(lastNameError)}
                        />
                      </Field>

                      <Field
                        id="nationalId"
                        icon={<IdCardIcon size={17} />}
                        label={pick(copy.nationalIdLabel, locale)}
                        error={nationalIdError ? pick(copy.nationalIdError, locale) : undefined}
                      >
                        <input
                          id="nationalId"
                          type="text"
                          inputMode="numeric"
                          placeholder={pick(copy.nationalIdPlaceholder, locale)}
                          value={nationalId}
                          onChange={(e) => {
                            setNationalId(e.target.value);
                            if (nationalIdError) setNationalIdError(false);
                          }}
                          aria-required="true"
                          aria-invalid={nationalIdError || undefined}
                          className={inputClass(nationalIdError)}
                        />
                      </Field>

                      <button
                        type="button"
                        onClick={handleContinue}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-secondary"
                      >
                        <span>{pick(copy.continueLabel, locale)}</span>
                        <ArrowRight />
                      </button>
                    </Reveal>
                  ) : (
                    <Reveal key="step-2" className="mt-6">
                      <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        <div>
                          <div className="grid grid-cols-[auto_1fr] gap-3">
                            <div>
                              <label className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                                {pick(copy.countryCodeLabel, locale)}
                              </label>
                              <div
                                dir="ltr"
                                className="flex h-[52px] items-center gap-1.5 rounded-xl border border-grey-200 bg-white px-3 text-ink dark:border-white/15 dark:bg-white/5 dark:text-white"
                              >
                                <span aria-hidden="true">🇸🇦</span>
                                <span className="text-sm font-medium">(+966)</span>
                                <ChevronDown size={14} className="text-ink-muted dark:text-white/50" />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                                {pick(copy.phoneLabel, locale)}
                              </label>
                              <div className="relative">
                                <input
                                  id="phone"
                                  type="tel"
                                  inputMode="numeric"
                                  dir="ltr"
                                  autoComplete="tel-national"
                                  placeholder={pick(copy.phonePlaceholder, locale)}
                                  value={phone}
                                  onChange={(e) => {
                                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 9));
                                    if (phoneError) setPhoneError(false);
                                  }}
                                  aria-required="true"
                                  aria-invalid={phoneError || undefined}
                                  className={inputClass(phoneError, false)}
                                />
                                {phoneValid && !phoneError && <ValidTick />}
                              </div>
                            </div>
                          </div>
                          {phoneError && (
                            <p role="alert" className="mt-1.5 text-sm text-danger">
                              {pick(copy.phoneError, locale)}
                            </p>
                          )}
                        </div>

                        <Field
                          id="email"
                          icon={<Mail size={17} />}
                          label={pick(copy.emailLabel, locale)}
                          error={emailError ? pick(copy.emailError, locale) : undefined}
                          trailing={emailValid && !emailError ? <ValidTick /> : undefined}
                        >
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder={pick(copy.emailPlaceholder, locale)}
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (emailError) setEmailError(false);
                            }}
                            aria-required="true"
                            aria-invalid={emailError || undefined}
                            className={inputClass(emailError)}
                          />
                        </Field>

                        <p className="text-xs leading-relaxed text-ink-soft dark:text-white/60">
                          {pick(copy.termsPrefix, locale)}{" "}
                          <Link to="/legal/terms" className="font-semibold text-ink hover:text-primary dark:text-white">
                            {pick(copy.termsLink, locale)}
                          </Link>{" "}
                          {pick(copy.and, locale)}{" "}
                          <Link to="/legal/privacy" className="font-semibold text-ink hover:text-primary dark:text-white">
                            {pick(copy.privacyLink, locale)}
                          </Link>
                        </p>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-grey-200 px-5 py-3.5 font-medium text-ink transition-colors hover:bg-grey-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                          >
                            <ArrowLeft />
                            <span>{pick(copy.backLabel, locale)}</span>
                          </button>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
                          >
                            <span>{submitting ? pick(copy.submitting, locale) : pick(copy.submit, locale)}</span>
                            {!submitting && <ArrowRight />}
                          </button>
                        </div>
                      </form>
                    </Reveal>
                  )}
                </>
              ) : (
                <div className="py-2 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success-light text-success">
                    <Check size={26} />
                  </div>
                  <h1 className="mt-4 text-2xl font-medium text-ink dark:text-white">{pick(copy.doneTitle, locale)}</h1>
                  <p className="mt-2 leading-relaxed text-ink-soft dark:text-white/70">{pick(copy.doneBody, locale)}</p>
                  <Link
                    to="/login"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-secondary"
                  >
                    <span>{pick(copy.signIn, locale)}</span>
                    <ArrowRight />
                  </Link>
                </div>
              )}
            </div>

            {!done && (
              <p className="mt-6 text-center text-sm text-ink-soft dark:text-white/60">
                {pick(copy.haveAccount, locale)}{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  {pick(copy.signIn, locale)}
                </Link>
              </p>
            )}
          </Reveal>
        </main>

        <footer className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 pb-8 text-sm text-ink-muted dark:text-white/50">
          <Link to="/legal/terms" className="hover:text-primary dark:hover:text-white">
            {pick(copy.privacy, locale)}
          </Link>
          <Link to="/contact" className="hover:text-primary dark:hover:text-white">
            {pick(copy.contactUs, locale)}
          </Link>
          <Link to="/contact" className="hover:text-primary dark:hover:text-white">
            {pick(copy.support, locale)}
          </Link>
        </footer>
      </div>
    </div>
  );
}

/** Labeled input row with a leading icon (and optional trailing adornment
 * like a validity checkmark), matching the site's existing bordered-input
 * convention but with room for the icon on the reading-direction start side. */
function Field({
  id,
  icon,
  label,
  error,
  trailing,
  children,
}: {
  id: string;
  icon: ReactNode;
  label: string;
  error?: string;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 start-3.5 flex items-center text-ink-muted dark:text-white/40">
          {icon}
        </span>
        {children}
        {trailing}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Small filled checkmark shown once a field's value passes validation. */
function ValidTick() {
  return (
    <span className="absolute inset-y-0 end-3.5 flex items-center text-success" aria-hidden="true">
      <Check size={16} />
    </span>
  );
}
