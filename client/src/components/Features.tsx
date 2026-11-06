import { useLanguage } from "./LanguageProvider";
import { scrollToSection } from "@/lib/scroll";
import { Eyebrow, FadeIn, Hairline, RevealText } from "./motion";

export default function Features() {
  const { t } = useLanguage();

  const pillars = [
    {
      titleKey: "features.restaurant.title",
      descriptionKey: "features.restaurant.description",
      badgeKey: "features.restaurant.badge",
      targetId: "menu"
    },
    {
      titleKey: "features.events.title",
      descriptionKey: "features.events.description",
      badgeKey: "features.events.badge",
      targetId: "events"
    },
    {
      titleKey: "features.hiking.title",
      descriptionKey: "features.hiking.description",
      badgeKey: "features.hiking.badge",
      targetId: "hiking"
    },
    {
      titleKey: "features.balsamo.title",
      descriptionKey: "features.balsamo.description",
      badgeKey: "features.balsamo.badge",
      targetId: "balsamo"
    },
    {
      titleKey: "accommodation.title",
      descriptionKey: "accommodation.description",
      badgeKey: "accommodation.eyebrow",
      targetId: "suites"
    }
  ];

  return (
    <section id="experiences" className="section-pad bg-paper-alt">
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header aligned to 12-column grid matching the row columns below */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 items-end mb-14 sm:mb-20">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow>{t("features.eyebrow")}</Eyebrow>
            <RevealText as="h2" text={t("features.title")} className="type-h2 text-ink mt-8" />
          </div>
          <FadeIn className="col-span-12 lg:col-span-5" delay={0.15}>
            <p className="type-body">{t("features.subtitle")}</p>
          </FadeIn>
        </div>

        {/* Clean, undisturbed editorial index — aligned to identical 12-column track */}
        <div className="relative">
          <Hairline />
          {pillars.map((p, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => scrollToSection(p.targetId)}
                className="group w-full text-left grid grid-cols-12 gap-4 sm:gap-6 items-baseline py-8 sm:py-10 cursor-pointer transition-colors duration-300 hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
              >
                {/* 01-05 numerals: 1 col on sm+ (matches left offset) */}
                <span className="col-span-2 sm:col-span-1 type-numeral text-[1.25rem] sm:text-[1.5rem] text-muted-ink tabular-nums">
                  0{i + 1}
                </span>

                {/* Pillar Title + Badge: 6 cols on sm+ (1 + 6 = 7 cols total) */}
                <span className="col-span-10 sm:col-span-6">
                  <span className="block font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1] text-ink transition-transform duration-500 ease-editorial group-hover:translate-x-2">
                    {t(p.titleKey)}
                  </span>
                  <span className="block mt-3 type-eyebrow">{t(p.badgeKey)}</span>
                </span>

                {/* Description: Starts at col 8, spans 5 cols (7 + 5 = 12 cols total) */}
                {/* This exactly mirrors the lg:col-span-5 subtitle above so their left edges align perfectly */}
                <span className="col-span-10 col-start-3 sm:col-start-8 sm:col-span-5 text-[0.9375rem] leading-[1.65] text-ink-soft">
                  {t(p.descriptionKey)}
                </span>
              </button>
              <Hairline delay={0.05 * (i + 1)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
