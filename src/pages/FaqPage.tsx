import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { pick } from "../data/pricing";
import { faqHubCategories, allFaqHubItems, type FaqHubItem } from "../data/faqHub";
import Reveal from "../components/ui/Reveal";
import StaggerReveal from "../components/ui/StaggerReveal";
import { Plus, Minus, ArrowRight, Search } from "../components/ui/Icon";

/**
 * Dedicated FAQ Hub — content lives in data/faqHub.ts (its own dataset, not
 * shared with /pricing's FAQ) across 5 categories: the original Getting
 * Started / Pricing & Plans / Product & Integrations, plus two new ones —
 * Comparisons (the standalone Compare pages were dropped from nav, so their
 * competitive-positioning content lives here now) and Security & Compliance.
 *
 * Category filter uses the same pill-row pattern as the Integrations page
 * category filter (rounded-full, filled when active, outlined otherwise).
 */

const categories = faqHubCategories;

export default function FaqPage() {
  const { t, locale } = useLocale();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const prev = document.title;
    document.title = "FAQ Hub | Atar";
    return () => {
      document.title = prev;
    };
  }, []);

  // FAQPage structured data (schema.org) so search engines / AI answer
  // engines can surface these Q&As directly.
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqHubItems.map((item) => ({
        "@type": "Question",
        name: pick(item.q, locale),
        acceptedAnswer: {
          "@type": "Answer",
          text: pick(item.a, locale),
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [locale]);

  const trimmedQuery = query.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;
  const activeCategoryData = categories.find((c) => c.id === activeCategory) ?? categories[0];

  const visibleItems: FaqHubItem[] = useMemo(() => {
    if (isSearching) {
      return allFaqHubItems.filter(
        (item) =>
          pick(item.q, locale).toLowerCase().includes(trimmedQuery) ||
          pick(item.a, locale).toLowerCase().includes(trimmedQuery)
      );
    }
    return activeCategoryData.items;
  }, [isSearching, trimmedQuery, activeCategoryData, locale]);

  return (
    <>
      <section className="hero-bg" aria-labelledby="faq-title">
        <div className="mx-auto max-w-2xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <Reveal>
            <h1 id="faq-title" className="text-4xl font-medium tracking-tight text-ink dark:text-white sm:text-5xl">
              {locale === "ar" ? "مرحباً، كيف يمكننا مساعدتك؟" : "Hello, how can we help?"}
            </h1>

            <form
              role="search"
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-grey-200 bg-white p-2 shadow-card dark:border-white/10 dark:bg-white/5"
            >
              <Search size={18} className="ms-3 shrink-0 text-ink-muted dark:text-white/50" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={locale === "ar" ? "اطرح سؤالاً..." : "Ask a question..."}
                aria-label={locale === "ar" ? "ابحث في الأسئلة الشائعة" : "Search the FAQ"}
                className="w-full bg-transparent px-1 py-2.5 text-sm text-ink outline-none placeholder:text-ink-muted dark:text-white dark:placeholder:text-white/40"
              />
              <button
                type="submit"
                className="shrink-0 whitespace-nowrap rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary"
              >
                {locale === "ar" ? "بحث" : "Search"}
              </button>
            </form>

            {!isSearching && (
              <p className="mt-6 text-sm text-ink-soft dark:text-white/60">
                {locale === "ar"
                  ? "أو اختر فئة للوصول السريع إلى المساعدة التي تحتاجها"
                  : "or choose a category to quickly find the help you need"}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {!isSearching && (
        <section className="bg-white pb-4 dark:bg-secondary-darker">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <Reveal>
              <div
                className="flex flex-wrap justify-center gap-2.5"
                role="group"
                aria-label={locale === "ar" ? "الفئات" : "Categories"}
              >
                {categories.map((cat) => {
                  const isActive = cat.id === activeCategory;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setOpenFaq(0);
                      }}
                      aria-pressed={isActive}
                      className={
                        isActive
                          ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors"
                          : "rounded-full border border-grey-200 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-primary dark:border-white/15 dark:text-white/70"
                      }
                    >
                      {pick(cat.label, locale)}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-white py-10 dark:bg-secondary-darker lg:py-14">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-medium text-ink dark:text-white lg:text-3xl">
              {isSearching
                ? locale === "ar"
                  ? `نتائج البحث عن "${query}"`
                  : `Search results for "${query}"`
                : pick(activeCategoryData.label, locale)}
            </h2>
            <p className="mt-3 text-ink-soft dark:text-white/70">
              {isSearching
                ? locale === "ar"
                  ? `${visibleItems.length} نتيجة`
                  : `${visibleItems.length} result${visibleItems.length === 1 ? "" : "s"}`
                : pick(activeCategoryData.subtitle, locale)}
            </p>
          </Reveal>
        </div>

        <StaggerReveal className="mx-auto mt-10 max-w-3xl space-y-3 px-5 lg:px-8" y={16}>
          {visibleItems.map((item, i) => {
            const isOpen = openFaq === i;
            const panelId = `faq-hub-panel-${i}`;
            const btnId = `faq-hub-btn-${i}`;
            return (
              <div
                key={`${activeCategoryData.id}-${i}-${pick(item.q, locale)}`}
                className="overflow-hidden rounded-2xl border border-grey-200 bg-white dark:border-white/10 dark:bg-white/5"
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-medium text-ink dark:text-white"
                  >
                    <span>{pick(item.q, locale)}</span>
                    <span className="shrink-0 text-primary">{isOpen ? <Minus /> : <Plus />}</span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="px-5 pb-4 leading-relaxed text-ink-soft dark:text-white/70"
                  >
                    {pick(item.a, locale)}
                  </div>
                )}
              </div>
            );
          })}
          {visibleItems.length === 0 && (
            <p className="text-center text-ink-soft dark:text-white/70">
              {locale === "ar" ? "لا توجد نتائج مطابقة." : "No matching questions found."}
            </p>
          )}
        </StaggerReveal>
      </section>

      <section className="bg-[#F6F7F8] py-14 dark:bg-white/5 lg:py-20" aria-label="Still have questions">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Reveal>
            <div className="rounded-[28px] border border-grey-100 bg-white p-8 text-center dark:border-white/10 dark:bg-secondary-darker lg:p-10">
              <h2 className="text-xl font-medium text-ink dark:text-white">{t.faq.stillTitle}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft dark:text-white/70">{t.faq.stillBody}</p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-colors hover:bg-secondary"
              >
                <span>{t.faq.stillCta}</span>
                <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
