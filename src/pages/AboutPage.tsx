import { useEffect, useMemo } from "react";
import { useLocale } from "../i18n/LocaleContext";
import Reveal from "../components/ui/Reveal";
import Logo from "../components/ui/Logo";
import { Globe, Target, valueIcons } from "../components/ui/Icon";

export default function AboutPage() {
  const { t, locale } = useLocale();
  const a = t.aboutPage;

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
      {/* Who we are */}
      <section className="hero-bg" aria-labelledby="about-title">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">{a.eyebrow}</p>
            <h1
              id="about-title"
              className="mt-3 text-4xl font-medium tracking-tight text-ink dark:text-white sm:text-5xl"
            >
              {a.whoTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft dark:text-white/70">
              {a.whoBody}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Our Story — alternating vertical timeline */}
      <section className="relative overflow-hidden bg-secondary py-16 dark:bg-secondary-darker lg:py-24" aria-labelledby="about-story">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-2xl px-5 text-center lg:px-8">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary-light">{a.storyEyebrow}</p>
            <h2 id="about-story" className="mt-3 text-3xl font-medium text-white lg:text-4xl">
              {a.storyTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">{a.storySubtitle}</p>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl px-5 lg:mt-16 lg:px-8">
          {/* connecting line */}
          <div
            className="absolute bottom-2 left-[27px] top-2 w-px bg-white/15 lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
          />
          <ol className="space-y-10 lg:space-y-6">
            {a.timeline.map((item, i) => {
              const isLast = i === a.timeline.length - 1;
              const flip = i % 2 === 1;
              return (
                <li key={item.year} className="relative pl-14 lg:pl-0">
                  <Reveal delay={i * 100} y={20}>
                    <div className={`lg:flex lg:items-center ${flip ? "lg:flex-row-reverse" : ""}`}>
                      <div className="lg:w-1/2 lg:px-10">
                        <div
                          className={`rounded-2xl border p-6 text-start backdrop-blur-sm ${
                            isLast ? "border-primary/40 bg-primary/10" : "border-white/10 bg-white/5"
                          } ${flip ? "lg:text-start" : "lg:text-end"}`}
                        >
                          <div className={`flex items-center gap-3 ${flip ? "lg:justify-start" : "lg:justify-end"}`}>
                            <span className="text-3xl font-semibold text-white" dir="ltr">
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
                      </div>
                      <div className="hidden lg:block lg:w-1/2" />
                    </div>
                  </Reveal>
                  {/* dot marker on the line */}
                  <span
                    className={`absolute left-[27px] top-6 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full ring-4 ring-secondary dark:ring-secondary-darker lg:left-1/2 ${
                      isLast ? "bg-white" : "bg-primary"
                    }`}
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ol>
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
              <div className="h-full rounded-[28px] bg-[#F6F7F8] p-8 dark:bg-white/5 lg:p-10">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-lighter text-primary dark:bg-white/10 dark:text-primary-light">
                  <c.Icon size={28} />
                </div>
                <h2 className="text-2xl font-medium text-ink dark:text-white">{c.title}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft dark:text-white/70">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-grey-100/40 py-16 dark:bg-white/[0.03] lg:py-20" aria-labelledby="about-values">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 id="about-values" className="text-2xl font-medium text-ink dark:text-white lg:text-3xl">
            {a.valuesTitle}
          </h2>
          <p className="mt-4 text-ink-soft dark:text-white/70">{a.valuesSubtitle}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {a.values.map((v, i) => {
            const Icon = valueIcons[v.icon];
            return (
              <Reveal key={v.title} delay={i * 90} className="h-full">
                <article className="h-full rounded-2xl border border-grey-100 bg-white p-6 text-start shadow-card transition-shadow hover:shadow-lift dark:border-white/10 dark:bg-white/5">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary-lighter text-primary dark:bg-white/10 dark:text-primary-light">
                    {Icon ? <Icon /> : null}
                  </div>
                  <h3 className="text-lg font-medium text-ink dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/70">{v.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Latest news */}
      <section className="bg-white py-16 dark:bg-secondary-darker lg:py-20" aria-labelledby="about-news">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 id="about-news" className="text-2xl font-medium text-ink dark:text-white lg:text-3xl">
            {a.newsTitle}
          </h2>
          <p className="mt-4 text-ink-soft dark:text-white/70">{a.newsSubtitle}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {a.news.map((n, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-grey-100 bg-white shadow-card transition-shadow hover:shadow-lift dark:border-white/10 dark:bg-white/5">
                {/* Branded placeholder — replace with the real news photo */}
                <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-secondary to-primary">
                  <Logo light className="h-9 w-auto opacity-90" />
                </div>
                <div className="flex flex-1 flex-col p-6 text-start">
                  <time
                    dateTime={n.date}
                    className="text-xs font-medium uppercase tracking-wide text-grey-600 dark:text-white/40"
                  >
                    {dateFmt.format(new Date(n.date))}
                  </time>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/70">{n.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
