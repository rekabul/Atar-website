import { useEffect, useMemo } from "react";
import { useLocale } from "../i18n/LocaleContext";
import Reveal from "../components/ui/Reveal";
import StaggerReveal from "../components/ui/StaggerReveal";
import Logo from "../components/ui/Logo";
import { Globe, Target, valueIcons, ArrowRight } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { Counter, useRepeatInView } from "../components/Stats";
import { aboutStatsConfig } from "../data/aboutStats";
import { teamMembers } from "../data/team";
import { pick } from "../data/pricing";
import { aboutHeroMockup } from "../assets";

export default function AboutPage() {
  const { t, locale } = useLocale();
  const a = t.aboutPage;
  const { ref: statsRef, inView: statsInView } = useRepeatInView<HTMLDivElement>();

  useEffect(() => {
    const prev = document.title;
    document.title = "About Atar | The National Real Estate Management Platform";
    return () => {
      document.title = prev;
    };
  }, []);

  const dateFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [locale]
  );

  return (
    <>
      {/* Who we are — text left, product mockup right (same side-by-side
          pattern as the Markets pages' bespoke hero). */}
      <section className="hero-bg overflow-hidden" aria-labelledby="about-title">
        <div className="mx-auto grid max-w-content items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-28">
          <Reveal className="min-w-0 text-center lg:text-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{a.eyebrow}</p>
            <h1
              id="about-title"
              className="mt-4 text-[2.75rem] font-medium leading-[1.05] tracking-tight text-ink dark:text-white sm:text-6xl"
            >
              {a.whoTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft dark:text-white/70 lg:mx-0">
              {a.whoBody}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button href="/features">{locale === "ar" ? "استكشف أتار" : "Explore Atar"}</Button>
              <Button href="https://meetings.hubspot.com/atar/demo-meeting" variant="outline">
                {locale === "ar" ? "احجز عرضاً توضيحياً" : "Book a Demo"}
              </Button>
            </div>
            <p className="mt-6 text-sm text-ink-muted dark:text-white/50">
              {locale === "ar" ? "تأسست عام 2021" : "Founded in 2021"}
              <span className="mx-2 text-primary">&bull;</span>
              {locale === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}
            </p>
          </Reveal>
          {/* Soft panel framing the real product mockup, inset within the same
              container padding as the text column (and every other section on
              this page) rather than bleeding to the viewport edge. */}
          <Reveal delay={150} className="min-w-0">
            <div className="flex h-full min-w-0 items-center justify-center rounded-[32px] bg-[#F6F7F8] p-8 dark:bg-white/5 lg:min-h-[560px] lg:p-14">
              <img src={aboutHeroMockup} alt="" className="block w-full min-w-0 max-w-full" loading="lazy" />
            </div>
          </Reveal>
        </div>
        {/* Real figures from the Company Profile PDF's "AT A GLANCE" page —
            a hairline-divided strip at the hero's own grid width, start-aligned
            like the hero text, instead of a disconnected centered grey box. */}
        <div className="border-t border-grey-100 dark:border-white/5">
          <div className="mx-auto max-w-content px-5 py-10 lg:px-8 lg:py-12">
            <Reveal delay={90}>
              <div ref={statsRef}>
                <dl className="grid grid-cols-2 gap-y-8 text-center sm:grid-cols-4 sm:gap-y-0">
                  {aboutStatsConfig.map((s, i) => (
                    <div
                      key={i}
                      className="px-6 sm:border-e sm:border-grey-100 sm:last:border-e-0 dark:sm:border-white/5"
                    >
                      <dt className="text-2xl font-bold tracking-tight text-ink dark:text-white lg:text-3xl">
                        <Counter {...s} active={statsInView} />
                      </dt>
                      <dd className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink-soft dark:text-white/60">
                        {a.stats.items[i].label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Story — static text + CTA on the left, numbered connector
          timeline with cards on the right. */}
      <section className="relative overflow-hidden bg-secondary py-16 dark:bg-secondary-darker lg:py-24" aria-labelledby="about-story">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-content gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal className="text-center lg:text-start">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-light">{a.storyEyebrow}</p>
            <h2 id="about-story" className="mt-3 text-3xl font-medium tracking-tight text-white lg:text-4xl">
              {a.storyTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/70 lg:mx-0">{a.storySubtitle}</p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button href="https://meetings.hubspot.com/atar/demo-meeting" variant="onDark">
                {locale === "ar" ? "احجز عرضاً توضيحياً" : "Book a Demo"}
              </Button>
            </div>
          </Reveal>

          <div className="relative">
            {/* connecting line, anchored to the badge column */}
            <div className="absolute bottom-5 top-5 w-px bg-white/15 start-5" aria-hidden="true" />
            <ol className="space-y-6">
              {a.timeline.map((item, i) => {
                const isLast = i === a.timeline.length - 1;
                return (
                  <li key={item.year} className="relative flex gap-5">
                    <span
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        isLast ? "bg-primary text-white" : "bg-white/10 text-white"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Reveal delay={i * 80} y={16} className="min-w-0 flex-1">
                      <div
                        className={`rounded-2xl border p-6 text-start backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1 ${
                          isLast
                            ? "border-primary/40 bg-primary/10 hover:border-primary/60"
                            : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-semibold text-white" dir="ltr">
                            {item.year}
                          </span>
                          {isLast && (
                            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                              {a.storyToday}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-white/70">{item.label}</p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Vision + Mission (paired, no dead space) */}
      <section className="bg-white py-16 dark:bg-secondary-darker lg:py-20" aria-label={`${a.visionTitle} & ${a.missionTitle}`}>
        <div className="mx-auto grid max-w-content gap-6 px-5 md:grid-cols-2 lg:px-8">
          {[
            { Icon: Globe, title: a.visionTitle, body: a.visionBody },
            { Icon: Target, title: a.missionTitle, body: a.missionBody },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="h-full">
              <div className="group h-full rounded-[28px] bg-[#F6F7F8] p-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1 hover:shadow-lift dark:bg-white/5 lg:p-10">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-lighter text-primary transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-110 dark:bg-white/10 dark:text-primary-light">
                  <c.Icon size={28} />
                </div>
                <h2 className="text-2xl font-medium tracking-tight text-ink dark:text-white">{c.title}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft dark:text-white/70">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-grey-100/40 py-16 dark:bg-white/[0.03] lg:py-20" aria-labelledby="about-values">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 id="about-values" className="text-2xl font-medium tracking-tight text-ink dark:text-white lg:text-3xl">
            {a.valuesTitle}
          </h2>
          <p className="mt-4 text-ink-soft dark:text-white/70">{a.valuesSubtitle}</p>
        </div>
        <StaggerReveal className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {a.values.map((v) => {
            const Icon = valueIcons[v.icon];
            return (
              <article
                key={v.title}
                className="group h-full rounded-2xl border border-grey-100 bg-white p-6 text-start shadow-card transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1 hover:border-primary/20 hover:shadow-lift dark:border-white/10 dark:bg-white/5 dark:hover:border-primary/30"
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary-lighter text-primary transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-110 dark:bg-white/10 dark:text-primary-light">
                  {Icon ? <Icon /> : null}
                </div>
                <h3 className="text-lg font-medium text-ink dark:text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/70">{v.body}</p>
              </article>
            );
          })}
        </StaggerReveal>
      </section>

      {/* Leadership / Team — real board + executive roster from the Company
          Profile PDF's "Leadership & Governance" page. */}
      <section className="bg-white py-16 dark:bg-secondary-darker lg:py-20" aria-labelledby="about-team">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 id="about-team" className="text-2xl font-medium tracking-tight text-ink dark:text-white lg:text-3xl">
            {a.teamTitle}
          </h2>
          <p className="mt-4 text-ink-soft dark:text-white/70">{a.teamSubtitle}</p>
        </div>
        <StaggerReveal className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
          {teamMembers.map((m) => (
            <article
              key={m.name}
              className="group text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1"
            >
              <div className="mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-[28px] bg-grey-100 dark:bg-white/5">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 font-medium text-ink dark:text-white">{m.name}</h3>
              <p className="mt-1 text-sm text-ink-soft dark:text-white/60">{pick(m.title, locale)}</p>
            </article>
          ))}
        </StaggerReveal>
      </section>

      {/* Latest news */}
      <section className="bg-white py-16 dark:bg-secondary-darker lg:py-20" aria-labelledby="about-news">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 id="about-news" className="text-2xl font-medium tracking-tight text-ink dark:text-white lg:text-3xl">
            {a.newsTitle}
          </h2>
          <p className="mt-4 text-ink-soft dark:text-white/70">{a.newsSubtitle}</p>
        </div>
        <StaggerReveal className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {a.news.map((n, i) => (
            <article
              key={i}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-grey-100 bg-white shadow-card transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1 hover:shadow-lift dark:border-white/10 dark:bg-white/5"
            >
              {/* Branded placeholder — replace with the real news photo */}
              <div className="flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-primary">
                <Logo
                  light
                  className="h-9 w-auto opacity-90 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 text-start">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{n.category}</p>
                <h3 className="mt-2 text-lg font-medium leading-snug text-ink dark:text-white">{n.title}</h3>
                <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-ink-soft dark:text-white/70">{n.body}</p>
                <time dateTime={n.date} className="mt-4 text-xs text-grey-600 dark:text-white/40">
                  {dateFmt.format(new Date(n.date))}
                </time>
              </div>
            </article>
          ))}
        </StaggerReveal>
      </section>

      {/* Standard site-wide "Book a Demo" CTA, same as every other page. */}
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
