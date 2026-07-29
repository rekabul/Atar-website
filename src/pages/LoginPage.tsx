import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { useTheme } from "../theme/ThemeContext";
import Reveal from "../components/ui/Reveal";
import Logo, { LogoMark } from "../components/ui/Logo";
import { dashboard } from "../assets";
import { ArrowRight, ArrowLeft, Sun, Moon, Globe, Check } from "../components/ui/Icon";

type LStr = { en: string; ar: string };
type Locale = "en" | "ar";
const pick = (s: LStr, l: Locale) => s[l];

const copy = {
  eyebrow: { en: "Welcome back", ar: "مرحباً بعودتك" },
  title: { en: "Sign in to ATAR", ar: "سجّل الدخول إلى أتار" },
  subtitlePhone: {
    en: "Enter your phone number and we'll text you a verification code.",
    ar: "أدخل رقم هاتفك وسنرسل لك رمز تحقق عبر رسالة نصية.",
  },
  businessLabel: { en: "Business name", ar: "اسم المنشأة" },
  businessPlaceholder: { en: "e.g. Al Nakheel Properties", ar: "مثال: شركة النخيل العقارية" },
  businessError: { en: "Enter your business name.", ar: "أدخل اسم منشأتك." },
  phoneLabel: { en: "Phone number", ar: "رقم الهاتف" },
  phonePlaceholder: { en: "5X XXX XXXX", ar: "5X XXX XXXX" },
  phoneError: { en: "Enter a valid Saudi mobile number.", ar: "أدخل رقم جوال سعودي صحيح." },
  sendCode: { en: "Send verification code", ar: "إرسال رمز التحقق" },
  sending: { en: "Sending…", ar: "جارٍ الإرسال…" },
  otpTitle: { en: "Enter verification code", ar: "أدخل رمز التحقق" },
  otpError: { en: "That code doesn't look right. Try again.", ar: "الرمز غير صحيح، حاول مرة أخرى." },
  verify: { en: "Verify & sign in", ar: "تحقق وسجّل الدخول" },
  verifying: { en: "Verifying…", ar: "جارٍ التحقق…" },
  resend: { en: "Resend code", ar: "إعادة إرسال الرمز" },
  changeNumber: { en: "Change number", ar: "تغيير الرقم" },
  noAccount: { en: "New to ATAR?", ar: "جديد على أتار؟" },
  contactSales: { en: "Talk to sales", ar: "تحدث مع المبيعات" },
  doneTitle: { en: "You're in", ar: "تم الدخول" },
  doneBody: {
    en: "You're verified. (Demo only — connect this screen to your auth backend.)",
    ar: "تم التحقق بنجاح. (نسخة تجريبية—اربط هذه الشاشة ببوابة الدخول الفعلية.)",
  },
  backToSite: { en: "Back to atar.com", ar: "العودة إلى atar.com" },
  panelEyebrow: { en: "Property management, simplified", ar: "إدارة عقارية مبسّطة" },
  panelTitleA: { en: "Manage Your", ar: "أدِر" },
  panelTitleHighlight: { en: "Properties", ar: "عقاراتك" },
  panelTitleB: { en: "With Ease", ar: "بكل سهولة" },
  panelBody: {
    en: "Leasing, accounting, service requests, and reporting — all from one smart dashboard. Sign in to stay in control of your portfolio.",
    ar: "التأجير والمحاسبة وطلبات الخدمة والتقارير—كل ذلك من لوحة تحكم ذكية واحدة. سجّل الدخول لتبقى في السيطرة على محفظتك.",
  },
  privacy: { en: "Privacy & Terms", ar: "الخصوصية والشروط" },
  contactUs: { en: "Contact us", ar: "تواصل معنا" },
  support: { en: "Support", ar: "الدعم" },
} as const;

const RESEND_SECONDS = 45;

export default function LoginPage() {
  const { locale, toggle } = useLocale();
  const { theme, toggle: toggleTheme } = useTheme();
  const [step, setStep] = useState<"phone" | "otp" | "done">("phone");

  const [business, setBusiness] = useState("");
  const [businessError, setBusinessError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendIn, setResendIn] = useState(RESEND_SECONDS);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const prev = document.title;
    document.title = "Sign in — ATAR";
    return () => {
      document.title = prev;
    };
  }, []);

  // Resend countdown — only ticks while on the OTP step.
  useEffect(() => {
    if (step !== "otp" || resendIn <= 0) return;
    const id = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [step, resendIn]);

  function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault();
    const businessOk = business.trim().length > 0;
    const phoneOk = /^5\d{8}$/.test(phone);
    setBusinessError(!businessOk);
    setPhoneError(!phoneOk);
    if (!businessOk || !phoneOk) return;
    setSubmitting(true);
    // TODO: await fetch("/api/auth/request-otp", { method: "POST", body: JSON.stringify({ business, phone }) })
    setTimeout(() => {
      setSubmitting(false);
      setOtp(Array(6).fill(""));
      setResendIn(RESEND_SECONDS);
      setStep("otp");
    }, 800);
  }

  function verify() {
    const code = otp.join("");
    if (code.length < 6) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    setVerifying(true);
    // TODO: await fetch("/api/auth/verify-otp", { method: "POST", body: JSON.stringify({ phone, code }) })
    setTimeout(() => {
      setVerifying(false);
      setStep("done");
    }, 800);
  }

  function updateOtp(i: number, val: string) {
    const digit = val.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (otpError) setOtpError(false);
    if (digit && i < 5) otpRefs.current[i + 1]?.focus();
  }

  function handleOtpKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  }

  function handleOtpPaste(e: ClipboardEvent<HTMLDivElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = Array(6).fill("");
    text.split("").forEach((d, idx) => {
      next[idx] = d;
    });
    setOtp(next);
    otpRefs.current[Math.min(text.length, 6) - 1]?.focus();
  }

  function handleResend() {
    if (resendIn > 0) return;
    setResendIn(RESEND_SECONDS);
    // TODO: await fetch("/api/auth/request-otp", ...) again
  }

  function changeNumber() {
    setStep("phone");
    setOtp(Array(6).fill(""));
    setOtpError(false);
  }

  // Auto-verify once all 6 digits are entered — a manual submit button remains
  // as the accessible/explicit fallback.
  useEffect(() => {
    if (step === "otp" && !verifying && otp.every((d) => d !== "")) {
      verify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const ToggleBar = (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggleTheme}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-primary dark:text-white/70 dark:hover:text-white"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
      </button>
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-primary dark:text-white/70 dark:hover:text-white"
        aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
      >
        <Globe size={16} />
        {locale === "en" ? "عربي" : "EN"}
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen dark:bg-secondary-darker">
      {/* Left — brand panel with product screenshot. Hidden below lg. */}
      <div className="relative hidden w-[44%] shrink-0 overflow-hidden bg-gradient-to-br from-primary-lighter via-primary-lighter to-white dark:from-secondary-dark dark:via-secondary-darker dark:to-secondary-darker lg:flex lg:flex-col">
        <LogoMark className="pointer-events-none absolute -top-10 -start-16 h-56 w-56 -rotate-12 text-primary/10 dark:text-white/[0.05]" />
        <LogoMark className="pointer-events-none absolute -end-24 bottom-24 h-72 w-72 rotate-12 text-primary/10 dark:text-white/[0.04]" />

        <div className="relative z-10 px-12 pt-14">
          <Logo light={theme === "dark"} className="h-9 w-auto" />
        </div>

        <div className="relative z-10 mt-16 flex-1 px-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {pick(copy.panelEyebrow, locale)}
          </p>
          <h2 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-ink dark:text-white">
            {pick(copy.panelTitleA, locale)}{" "}
            <span className="text-primary">{pick(copy.panelTitleHighlight, locale)}</span>{" "}
            {pick(copy.panelTitleB, locale)}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft dark:text-white/70">
            {pick(copy.panelBody, locale)}
          </p>
        </div>

        {/* Product screenshot, bleeding off the bottom edge for depth */}
        <div className="relative z-10 mt-10 px-12">
          <div className="overflow-hidden rounded-t-2xl border border-b-0 border-grey-100 bg-white shadow-[0_-16px_40px_-16px_rgba(8,15,26,0.2)] dark:border-white/10">
            <img
              src={dashboard}
              alt=""
              aria-hidden="true"
              className="block w-full translate-y-4"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Right — auth form */}
      <div className="hero-bg relative flex flex-1 flex-col">
        <LogoMark className="pointer-events-none absolute -bottom-16 -end-20 h-[360px] w-[360px] rotate-6 text-primary/[0.05] dark:text-white/[0.03] lg:hidden" />

        <header className="relative z-10 flex items-center justify-between px-5 py-6 lg:justify-end lg:px-10">
          <Link to="/" aria-label="ATAR home" className="lg:hidden">
            <Logo light={theme === "dark"} className="h-8 w-auto" />
          </Link>
          {ToggleBar}
        </header>

        <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-6">
          <Reveal className="w-full max-w-md">
            <div className="rounded-[28px] border border-grey-100 bg-white/95 p-8 shadow-lift backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06] sm:p-10">
              {step === "phone" && (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-wider text-primary">
                        {pick(copy.eyebrow, locale)}
                      </p>
                      <h1 className="mt-2 text-2xl font-medium tracking-tight text-ink dark:text-white sm:text-3xl">
                        {pick(copy.title, locale)}
                      </h1>
                    </div>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink-soft dark:text-white/70">
                    {pick(copy.subtitlePhone, locale)}
                  </p>

                  <form onSubmit={handlePhoneSubmit} noValidate className="mt-7">
                    <label htmlFor="business" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                      {pick(copy.businessLabel, locale)}
                    </label>
                    <input
                      id="business"
                      type="text"
                      autoComplete="organization"
                      placeholder={pick(copy.businessPlaceholder, locale)}
                      value={business}
                      onChange={(e) => {
                        setBusiness(e.target.value);
                        if (businessError) setBusinessError(false);
                      }}
                      aria-required="true"
                      aria-invalid={businessError || undefined}
                      aria-describedby={businessError ? "business-err" : undefined}
                      className={`w-full rounded-xl border bg-white px-3.5 py-3.5 text-ink placeholder:text-grey-600 transition-colors focus:border-primary focus:outline-none dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 ${
                        businessError ? "border-danger" : "border-grey-200 dark:border-white/15"
                      }`}
                    />
                    {businessError && (
                      <p id="business-err" role="alert" className="mt-1.5 text-sm text-danger">
                        {pick(copy.businessError, locale)}
                      </p>
                    )}

                    <label htmlFor="phone" className="mb-1.5 mt-5 block text-sm font-medium text-ink dark:text-white">
                      {pick(copy.phoneLabel, locale)}
                    </label>
                    <div
                      dir="ltr"
                      className={`flex items-center overflow-hidden rounded-xl border bg-white transition-colors focus-within:border-primary dark:bg-white/5 ${
                        phoneError ? "border-danger" : "border-grey-200 dark:border-white/15"
                      }`}
                    >
                      <span className="flex shrink-0 items-center gap-1.5 self-stretch border-e border-grey-200 bg-grey-50 px-3 text-sm font-medium text-ink-soft dark:border-white/15 dark:bg-white/5 dark:text-white/70">
                        <span aria-hidden="true">🇸🇦</span>
                        +966
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder={pick(copy.phonePlaceholder, locale)}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, "").slice(0, 9));
                          if (phoneError) setPhoneError(false);
                        }}
                        aria-required="true"
                        aria-invalid={phoneError || undefined}
                        aria-describedby={phoneError ? "phone-err" : undefined}
                        className="w-full bg-transparent px-3 py-3.5 text-ink placeholder:text-grey-600 focus:outline-none dark:text-white dark:placeholder:text-white/30"
                      />
                    </div>
                    {phoneError && (
                      <p id="phone-err" role="alert" className="mt-1.5 text-sm text-danger">
                        {pick(copy.phoneError, locale)}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span>{submitting ? pick(copy.sending, locale) : pick(copy.sendCode, locale)}</span>
                      {!submitting && <ArrowRight />}
                    </button>
                  </form>
                </>
              )}

              {step === "otp" && (
                <>
                  <button
                    type="button"
                    onClick={changeNumber}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-primary dark:text-white/60"
                  >
                    <ArrowLeft size={16} />
                    {pick(copy.changeNumber, locale)}
                  </button>

                  <p className="mt-4 text-sm font-medium uppercase tracking-wider text-primary">
                    {pick(copy.eyebrow, locale)}
                  </p>
                  <h1 className="mt-2 text-2xl font-medium tracking-tight text-ink dark:text-white sm:text-3xl">
                    {pick(copy.otpTitle, locale)}
                  </h1>
                  <p className="mt-3 leading-relaxed text-ink-soft dark:text-white/70">
                    {locale === "ar" ? (
                      <span dir="rtl">
                        أرسلنا رمزاً مكوناً من 6 أرقام إلى{" "}
                        <span dir="ltr" className="font-medium text-ink dark:text-white">
                          +966 {phone}
                        </span>
                      </span>
                    ) : (
                      <>
                        We sent a 6-digit code to{" "}
                        <span dir="ltr" className="font-medium text-ink dark:text-white">
                          +966 {phone}
                        </span>
                      </>
                    )}
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      verify();
                    }}
                    noValidate
                    className="mt-8"
                  >
                    <div className="flex justify-between gap-2" dir="ltr" onPaste={handleOtpPaste}>
                      {otp.map((d, i) => (
                        <input
                          key={i}
                          ref={(el) => (otpRefs.current[i] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          autoComplete={i === 0 ? "one-time-code" : "off"}
                          value={d}
                          onChange={(e) => updateOtp(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          aria-label={`${pick(copy.otpTitle, locale)} — digit ${i + 1}`}
                          aria-invalid={otpError || undefined}
                          className={`h-14 w-11 rounded-xl border bg-white text-center text-xl font-semibold text-ink transition-colors focus:border-primary focus:outline-none dark:bg-white/5 dark:text-white sm:w-14 ${
                            otpError ? "border-danger" : "border-grey-200 dark:border-white/15"
                          }`}
                        />
                      ))}
                    </div>
                    {otpError && (
                      <p role="alert" className="mt-2 text-sm text-danger">
                        {pick(copy.otpError, locale)}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={verifying}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span>{verifying ? pick(copy.verifying, locale) : pick(copy.verify, locale)}</span>
                      {!verifying && <ArrowRight />}
                    </button>

                    <p className="mt-4 text-center text-sm text-ink-soft dark:text-white/60">
                      {resendIn > 0 ? (
                        <span dir="ltr">0:{String(resendIn).padStart(2, "0")}</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResend}
                          className="font-medium text-primary hover:underline"
                        >
                          {pick(copy.resend, locale)}
                        </button>
                      )}
                    </p>
                  </form>
                </>
              )}

              {step === "done" && (
                <div className="py-2 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success-light text-success">
                    <Check size={26} />
                  </div>
                  <h1 className="mt-4 text-2xl font-medium text-ink dark:text-white">{pick(copy.doneTitle, locale)}</h1>
                  <p className="mt-2 leading-relaxed text-ink-soft dark:text-white/70">{pick(copy.doneBody, locale)}</p>
                </div>
              )}
            </div>

            {step !== "done" && (
              <p className="mt-6 text-center text-sm text-ink-soft dark:text-white/60">
                {pick(copy.noAccount, locale)}{" "}
                <Link to="/contact" className="font-medium text-primary hover:underline">
                  {pick(copy.contactSales, locale)}
                </Link>
              </p>
            )}
          </Reveal>
        </main>

        <footer className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 pb-8 text-sm text-ink-muted dark:text-white/50">
          <Link to="/contact" className="hover:text-primary dark:hover:text-white">
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
