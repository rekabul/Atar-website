import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { ArrowRight } from "./ui/Icon";

export default function CTA() {
  const { t } = useLocale();
  return (
    <section id="partner" className="bg-secondary-dark text-white" aria-labelledby="cta-title">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-14 lg:flex-row lg:items-center lg:px-8 lg:py-16">
        <h2 id="cta-title" className="max-w-xl text-2xl font-medium lg:text-3xl">
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
  );
}
