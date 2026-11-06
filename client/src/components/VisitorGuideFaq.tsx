import { useLanguage } from "./LanguageProvider";
import { getGoogleMapsUrl, restaurantInfo } from "../data/content";
import { openInquiryDialog } from "@/lib/scroll";
import { Eyebrow, FadeIn, GhostNumeral, Hairline, RevealText } from "./motion";
import { ArrowUpRight, Plus } from "lucide-react";

export default function VisitorGuideFaq() {
  const { t } = useLanguage();
  const title = t("faq.title");

  const routes = [
    {
      from: t("faq.route1_from"),
      time: t("faq.route1_time"),
      via: t("faq.route1_via")
    },
    {
      from: t("faq.route2_from"),
      time: t("faq.route2_time"),
      via: t("faq.route2_via")
    },
    {
      from: t("faq.route3_from"),
      time: t("faq.route3_time"),
      via: t("faq.route3_via")
    }
  ];

  const faqs = [1, 2, 3, 4, 5].map((n) => ({
    q: t(`faq.q${n}_q`),
    a: t(`faq.q${n}_a`)
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return (
    <section id="faq" className="relative section-pad bg-paper overflow-hidden border-t border-rule">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GhostNumeral n="06" className="absolute top-8 left-[-2vw]" />

      <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14 sm:mb-20">
          <div className="lg:col-span-7">
            <Eyebrow index="06">{t("faq.eyebrow")}</Eyebrow>
            <RevealText
              as="h2"
              text={title}
              italicWords={[title.split(" ").length - 1]}
              className="type-h2 text-ink mt-8"
            />
          </div>
          <FadeIn className="lg:col-span-5" delay={0.15}>
            <p className="type-body">{t("faq.subtitle")}</p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left column: Driving distances & route ledger */}
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="type-eyebrow">{t("faq.routes_title")}</p>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ink-soft">
                {t("faq.routes_note")}
              </p>

              <dl className="mt-8 border-t border-rule">
                {routes.map((r, i) => (
                  <div
                    key={i}
                    className="py-5 border-b border-rule flex items-baseline justify-between gap-4"
                  >
                    <div>
                      <dt className="font-display text-[1.45rem] leading-[1.15] text-ink">
                        {r.from}
                      </dt>
                      <dd className="mt-1 text-[0.8125rem] text-muted-ink">{r.via}</dd>
                    </div>
                    <span className="font-display italic text-[1.5rem] text-accent-ink tabular-nums shrink-0">
                      {r.time}
                    </span>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href={getGoogleMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ink"
                >
                  <span className="link-underline-static">{t("contact.location.directions")}</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <span className="text-[0.75rem] tracking-[0.14em] text-muted-ink tabular-nums">
                  Plus Code: {restaurantInfo.plusCode}
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right column: Mutually exclusive native <details name="chicuinaco-faq"> accordion */}
          <div className="lg:col-span-7">
            <Hairline />
            <div>
              {faqs.map((item, i) => (
                <details
                  key={i}
                  name="chicuinaco-faq"
                  open={i === 0}
                  className="group border-b border-rule"
                >
                  <summary className="list-none [&::-webkit-details-marker]:hidden py-6 sm:py-7 flex items-baseline justify-between gap-6 cursor-pointer select-none">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="type-numeral text-[1.15rem] text-muted-ink tabular-nums shrink-0">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-[clamp(1.45rem,2.4vw,2rem)] leading-[1.15] text-ink group-hover:text-accent-ink transition-colors">
                        {item.q}
                      </h3>
                    </div>
                    <span
                      aria-hidden="true"
                      className="h-9 w-9 rounded-full border border-rule inline-flex items-center justify-center shrink-0 text-ink transition-transform duration-500 group-open:rotate-45"
                    >
                      <Plus className="w-4 h-4" strokeWidth={1.5} />
                    </span>
                  </summary>
                  <div className="pb-7 pl-9 sm:pl-12 pr-4">
                    <p className="text-[0.96875rem] leading-[1.75] text-ink-soft max-w-[60ch]">
                      {item.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            <FadeIn delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <p className="font-display italic text-[1.25rem] text-muted-ink">
                  {t("contact.hours.appointments")}
                </p>
                <button
                  type="button"
                  onClick={() => openInquiryDialog("hiking")}
                  className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-accent-ink cursor-pointer"
                >
                  <span className="link-underline-static">{t("concierge.title")}</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
