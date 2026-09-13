import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { pick } from "../data/pricing";
import { blogPosts, getBlogPostBySlug } from "../data/placeholderPages";
import Reveal from "../components/ui/Reveal";
import { ArrowLeft, ArrowRight } from "../components/ui/Icon";

/**
 * Full-story page for a single blog/newsroom announcement, linked from the
 * "View Details" button on each card in /resources/blog (see NewsSection in
 * PlaceholderPage.tsx). Looked up by `slug` — see NewsItem in
 * data/placeholderPages.ts for where that data lives.
 */
export default function BlogPostPage() {
  const { locale } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    const prev = document.title;
    document.title = `${pick(post.title, "en")} | Atar`;
    return () => {
      document.title = prev;
    };
  }, [post]);

  // Unknown/removed slug — send back to the hub rather than showing a dead page.
  if (!post) {
    return <Navigate to="/resources/blog" replace />;
  }

  const formatDate = (iso: string) => {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="hero-bg" aria-labelledby="blog-post-title">
        <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <Link
              to="/resources/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-primary dark:text-white/60"
            >
              <ArrowLeft size={16} />
              {locale === "ar" ? "العودة إلى المدونة" : "Back to Blog"}
            </Link>
            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-primary">{formatDate(post.date)}</p>
            <h1
              id="blog-post-title"
              className="mt-3 text-3xl font-medium tracking-tight text-ink dark:text-white sm:text-4xl"
            >
              {pick(post.title, locale)}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-4 dark:bg-secondary-darker">
        <div className="mx-auto max-w-3xl px-5 pb-14 lg:px-8 lg:pb-20">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink-soft dark:text-white/70">{pick(post.body, locale)}</p>
          </Reveal>
        </div>
      </section>

      {more.length > 0 && (
        <section className="bg-[#F6F7F8] py-14 dark:bg-white/5 lg:py-20" aria-label={locale === "ar" ? "قصص أخرى" : "More stories"}>
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <Reveal>
              <h2 className="mb-8 text-center text-2xl font-medium tracking-tight text-ink dark:text-white">
                {locale === "ar" ? "قصص أخرى" : "More stories"}
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {more.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60} className="h-full">
                  <Link
                    to={`/resources/blog/${p.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-grey-100 bg-white p-5 shadow-card transition-all duration-150 hover:shadow-lift active:shadow-card motion-safe:active:scale-[0.99] dark:border-white/10 dark:bg-white/5"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">{formatDate(p.date)}</p>
                    <p className="mt-2 font-medium leading-snug text-ink dark:text-white">{pick(p.title, locale)}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-16 dark:bg-secondary-darker lg:py-24" aria-label="Talk to us">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <div className="rounded-[28px] border border-grey-100 bg-[#F6F7F8] p-8 text-center dark:border-white/10 dark:bg-white/5 lg:p-10">
              <p className="leading-relaxed text-ink-soft dark:text-white/70">
                {locale === "ar"
                  ? "هل تحتاج إلى مزيد من المعلومات؟ احجز عرضاً توضيحياً لمعرفة المزيد"
                  : "Need more information? Book a demo to learn more"}
              </p>
              <a
                href="https://meetings.hubspot.com/atar/demo-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-all duration-150 hover:bg-secondary active:bg-secondary motion-safe:active:scale-[0.97]"
              >
                <span>{locale === "ar" ? "احجز عرضاً توضيحياً" : "Book a Demo"}</span>
                <ArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
