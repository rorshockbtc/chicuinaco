import { useLanguage } from "./LanguageProvider";
import { images } from "../data/images";
import { Eyebrow, FadeIn, GhostNumeral, Hairline, RevealImage, RevealText } from "./motion";

export default function Story() {
  const { t } = useLanguage();

  const highlights = [
    { title: t("story.highlight1_title"), desc: t("story.highlight1_desc") },
    { title: t("story.highlight2_title"), desc: t("story.highlight2_desc") },
    { title: t("story.highlight3_title"), desc: t("story.highlight3_desc") }
  ];

  const title = t("story.title");
  const titleWords = title.split(" ");

  return (
    <section id="story" className="relative section-pad bg-paper overflow-hidden">
      <GhostNumeral n="01" className="absolute -top-6 right-[-2vw]" />

      <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading block */}
        <div className="max-w-4xl">
          <Eyebrow index="01">{t("story.eyebrow")}</Eyebrow>
          <RevealText
            as="h2"
            text={title}
            italicWords={[titleWords.length - 1]}
            className="type-h2 text-ink mt-8"
          />
          <FadeIn delay={0.2}>
            <p className="mt-5 font-display italic text-[1.375rem] text-muted-ink">
              {t("story.pronunciation_label")}
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 sm:mt-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Photos column: side-by-side or paired diptych */}
          <div className="lg:col-span-5 space-y-6">
            <div className="group relative">
              <RevealImage
                src={images.story.hacienda}
                alt={images.story.alt}
                parallax={15}
                className="aspect-[4/3] sm:aspect-[16/10] w-full border border-border/80"
              />
              <div className="mt-3 flex items-baseline justify-between type-eyebrow !text-ink/65">
                <span>Hacienda Chicuinaco • Rejuvenation</span>
                <span className="tabular-nums">13.595° N</span>
              </div>
            </div>

            <div className="group relative">
              <RevealImage
                src={images.story.restaurant}
                alt={images.restaurant.alt}
                delay={0.15}
                className="aspect-[16/10] w-full border border-border/80"
              />
              <div className="mt-3 flex items-baseline justify-between type-eyebrow !text-ink/65">
                <span>Restaurante & Covered Patio</span>
                <span className="tabular-nums">Est. 2024</span>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="type-lede drop-cap text-ink">{t("story.paragraph1")}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="type-body mt-7">{t("story.paragraph2")}</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="type-body mt-7">{t("story.paragraph3")}</p>
            </FadeIn>

            {/* Highlights: plain columns under one hairline (no cards) */}
            <div className="mt-16">
              <Hairline />
              <div className="grid sm:grid-cols-3 gap-10 sm:gap-8 pt-8">
                {highlights.map((h, i) => (
                  <FadeIn key={i} delay={0.1 * i}>
                    <span className="type-numeral text-[1rem] text-muted-ink tabular-nums">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-[1.65rem] leading-[1.1] text-ink mt-2">
                      {h.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ink-soft">
                      {h.desc}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
