import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import Reveal from "../components/ui/Reveal";
import { Riyal, Check, Plus, Minus, ArrowRight } from "../components/ui/Icon";
import {
  pricingHero,
  billing,
  plans,
  compare,
  categories,
  pricingFaq,
  pick,
  unitsCalculator,
  unitTiers,
  unitTierLabels,
  unitMultipliers,
} from "../data/pricing";

function formatSar(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PricingPage() {
  const { t, locale } = useLocale();
  const [annual, setAnnual] = useState(false);
  const [unitIndex, setUnitIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openCat, setOpenCat] = useState<Record<number, boolean>>(
    Object.fromEntries(categories.map((_, i) => [i, true]))
  );

  useEffect(() => {
    const prev = document.title;
    document.title = "Pricing — ATAR";
    return () => {
      document.title = prev;
    };
  }, []);

  // Annual = 2 months free → pay for 10 of 12 months. Scaled by portfolio size.
  const unitMultiplier = unitMultipliers[unitIndex];
  const monthlyEquivalent = (m: number) => (annual ? (m * 10) / 12 : m) * unitMultiplier;
  const sliderPercent = (unitIndex / (unitTiers.length - 1)) * 100;

  return (
    <>
      {/* Hero */}
      <section className="hero-bg" aria-labelledby="pricing-title">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {pick(pricingHero.eyebrow, locale)}
            </p>
            <h1 id="pricing-title" className="mt-3 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              {pick(pricingHero.title, locale)}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
              {pick(pricingHero.subtitle, locale)}
            </p>

            {/* Billing toggle */}
            <div
              className="mt-8 inline-flex items-center gap-1 rounded-full border border-grey-200 bg-white p-1"
              role="group"
              aria-label={pick(billing.monthly, locale) + " / " + pick(billing.annual, locale)}
            >
              <button
                type="button"
                onClick={() => setAnnual(false)}
                aria-pressed={!annual}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  !annual ? "bg-primary text-white" : "text-ink-soft hover:text-primary"
                }`}
              >
                {pick(billing.monthly, locale)}
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                aria-pressed={annual}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  annual ? "bg-primary text-white" : "text-ink-soft hover:text-primary"
                }`}
              >
                {pick(billing.annual, locale)}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    annual ? "bg-white/20 text-white" : "bg-success/10 text-success"
                  }`}
                >
                  {pick(billing.save, locale)}
                </span>
              </button>
            </div>

            {/* Units calculator */}
            <div className="relative mx-auto mt-10 max-w-2xl" dir="ltr">
              {dragging && (
                <div
                  className="pointer-events-none absolute -top-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white shadow-lift"
                  style={{ left: `${sliderPercent}%` }}
                >
                  {unitTierLabels[unitIndex]}
                  <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ink" />
                </div>
              )}
              <input
                type="range"
                min={0}
                max={unitTiers.length - 1}
                step={1}
                value={unitIndex}
                onChange={(e) => setUnitIndex(Number(e.target.value))}
                onPointerDown={() => setDragging(true)}
                onPointerUp={() => setDragging(false)}
                onBlur={() => setDragging(false)}
                onWheel={(e) => {
                  e.preventDefault();
                  const dir = e.deltaY > 0 ? -1 : 1;
                  setUnitIndex((v) => Math.min(unitTiers.length - 1, Math.max(0, v + dir)));
                }}
                className="units-slider"
                style={{
                  background: `linear-gradient(to right, #008ea5 ${sliderPercent}%, #E4E7E8 ${sliderPercent}%)`,
                }}
                aria-label={pick(unitsCalculator.title, locale)}
                aria-valuetext={`${unitTierLabels[unitIndex]} ${pick(unitsCalculator.unitsLabel, locale)}`}
              />
              <div className="mt-1.5 flex justify-between text-xs text-grey-600">
                {unitTierLabels.map((label, i) => (
                  <span
                    key={label}
                    className={`transition-colors ${i === unitIndex ? "font-semibold text-primary" : ""}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Plan cards */}
      <section className="py-16 lg:py-20" aria-label={pick(pricingHero.title, locale)}>
        <div className="mx-auto grid max-w-6xl items-stretch gap-6 px-5 lg:grid-cols-3 lg:px-8">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 90} className="h-full">
              <div
                className={`flex h-full flex-col rounded-[28px] border bg-white p-8 ${
                  plan.popular
                    ? "border-primary shadow-lift ring-1 ring-primary/20"
                    : "border-grey-200 shadow-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    {pick(plan.name, locale)}
                  </p>
                  {plan.popular && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                      {pick(billing.popular, locale)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-soft">{pick(plan.audience, locale)}</p>

                <div className="mt-6">
                  {plan.monthly === null ? (
                    <p className="text-3xl font-medium text-ink">{pick(plan.customLabel!, locale)}</p>
                  ) : (
                    <>
                      <p className="text-xs uppercase tracking-wide text-grey-600">
                        {pick(billing.startingFrom, locale)}
                      </p>
                      <p className="mt-1 flex items-baseline gap-1.5 text-ink" dir="ltr">
                        <Riyal className="h-[0.7em] w-auto self-center text-secondary" />
                        <span className="text-4xl font-semibold tracking-tight">
                          {formatSar(monthlyEquivalent(plan.monthly))}
                        </span>
                        <span className="text-sm text-ink-soft">{pick(billing.perMonth, locale)}</span>
                      </p>
                      <p className="mt-1 text-xs text-grey-600">
                        {pick(billing.exclVat, locale)} · {pick(billing.basedOnUnits, locale)}
                        {annual ? ` · ${pick(billing.annualNote, locale)}` : ""}
                      </p>
                    </>
                  )}
                </div>

                <p className="mt-6 text-sm font-medium text-ink">{pick(plan.featuresIntro, locale)}</p>
                <ul className="mt-3 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.en} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-lighter text-primary">
                        <Check size={13} />
                      </span>
                      {pick(f, locale)}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    to="/contact"
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium transition-colors ${
                      plan.popular
                        ? "bg-primary text-white hover:bg-secondary"
                        : "border border-grey-200 text-ink hover:border-primary hover:text-primary"
                    }`}
                  >
                    {pick(plan.primaryCta, locale)}
                  </Link>
                  {plan.secondaryCta && (
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-ink-soft hover:text-primary"
                    >
                      {pick(plan.secondaryCta, locale)}
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Compare plans */}
      <section className="bg-grey-100/40 py-16 lg:py-20" aria-labelledby="compare-title">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <h2 id="compare-title" className="text-center text-2xl font-medium text-ink lg:text-3xl">
            {pick(compare.title, locale)}
          </h2>

          <div className="mt-10 overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Plan header — a plain (non-sticky) section header */}
              <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center gap-2 rounded-2xl border border-grey-200 bg-white px-5 py-5 shadow-card">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                    {pick(compare.chooseYourPlan, locale)}
                  </span>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-soft">
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary-lighter text-primary">
                      <Check size={10} />
                    </span>
                    {pick(compare.included, locale)}
                  </div>
                </div>
                {plans.map((p) => (
                  <div key={p.id} className="text-center">
                    <p className="text-sm font-bold text-ink">{pick(compare.planNames[plans.indexOf(p)], locale)}</p>
                    <p className="mt-1 text-xs font-semibold text-primary" dir="ltr">
                      {p.monthly === null
                        ? pick(p.customLabel!, locale)
                        : `SAR ${formatSar(monthlyEquivalent(p.monthly))}`}
                    </p>
                  </div>
                ))}
              </div>

              {/* Categories */}
              <div className="mt-6 space-y-3">
                {categories.map((cat, ci) => {
                  const open = openCat[ci];
                  return (
                    <div key={ci} className="overflow-hidden rounded-2xl border border-grey-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenCat((s) => ({ ...s, [ci]: !s[ci] }))}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-4 bg-grey-100/60 px-5 py-4 text-start font-semibold text-ink"
                      >
                        <span>{pick(cat.name, locale)}</span>
                        <span className="shrink-0 text-primary">{open ? <Minus /> : <Plus />}</span>
                      </button>
                      {open && (
                        <div>
                          {cat.features.map((f, fi) => (
                            <div
                              key={fi}
                              className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center gap-2 border-t border-grey-100 px-5 py-3.5"
                            >
                              <span className="text-sm text-ink">{pick(f.name, locale)}</span>
                              {[0, 1, 2].map((pi) => {
                                const included = f.c[pi] === "1";
                                return (
                                  <div key={pi} className="flex justify-center">
                                    {included ? (
                                      <span
                                        className="grid h-6 w-6 place-items-center rounded-full bg-primary-lighter text-primary"
                                        role="img"
                                        aria-label={pick(compare.yes, locale)}
                                      >
                                        <Check size={14} />
                                      </span>
                                    ) : (
                                      <span
                                        className="text-grey-600"
                                        role="img"
                                        aria-label={pick(compare.no, locale)}
                                      >
                                        –
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20" aria-labelledby="pricing-faq-title">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 id="pricing-faq-title" className="text-2xl font-medium text-ink lg:text-3xl">
            {pick(pricingFaq.title, locale)}
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl space-y-3 px-5 lg:px-8">
          {pricingFaq.items.map((item, i) => {
            const isOpen = openFaq === i;
            const panelId = `pfaq-panel-${i}`;
            const btnId = `pfaq-btn-${i}`;
            return (
              <div key={i} className="overflow-hidden rounded-2xl border border-grey-200 bg-white">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-medium text-ink"
                  >
                    <span>{pick(item.q, locale)}</span>
                    <span className="shrink-0 text-primary">{isOpen ? <Minus /> : <Plus />}</span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={btnId} className="px-5 pb-4 leading-relaxed text-ink-soft">
                    {pick(item.a, locale)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary-dark text-white" aria-labelledby="pricing-cta">
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-14 lg:flex-row lg:items-center lg:px-8 lg:py-16">
          <h2 id="pricing-cta" className="max-w-xl text-2xl font-medium lg:text-3xl">
            {t.cta.title}
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-white hover:text-secondary"
          >
            <span>{t.cta.button}</span>
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
