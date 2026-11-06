import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { images } from "../data/images";
import { getWhatsAppUrl, getPhoneUrl, restaurantInfo } from "../data/content";
import {
  EASE,
  Eyebrow,
  FadeIn,
  GhostNumeral,
  Hairline,
  RevealImage,
  RevealText
} from "./motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Volume2, VolumeX, X } from "lucide-react";

type GalleryItem = { src: string; alt: string; captionKey: string };
type LightboxState = { items: GalleryItem[]; index: number } | null;

/* Muted viewport-gated loop with a quiet sound toggle (avoids downloading 7.7MB offscreen) */
function LoopVideo({
  src,
  poster,
  className = "",
  label
}: {
  src: string;
  poster?: string;
  className?: string;
  label: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [near, setNear] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setNear(true);
            if (!reduce) {
              ref.current?.play().catch(() => {});
            }
          } else {
            ref.current?.pause();
          }
        }
      },
      { rootMargin: "350px 0px", threshold: 0.05 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-[#14120F] ${className}`}>
      <video
        ref={ref}
        src={near ? src : undefined}
        poster={poster || images.story.hacienda}
        autoPlay={!reduce && near}
        muted={muted}
        loop
        playsInline
        preload={near ? "metadata" : "none"}
        controls={!!reduce}
        aria-label={label}
        className="w-full h-full object-cover"
      />
      {!reduce && (
        <button
          type="button"
          onClick={() => {
            setMuted(!muted);
            ref.current?.play().catch(() => {});
          }}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 right-4 h-11 w-11 rounded-full border border-white/40 bg-black/30 backdrop-blur-md text-white inline-flex items-center justify-center hover:border-white transition-colors cursor-pointer"
        >
          {muted ? <VolumeX className="w-4 h-4" strokeWidth={1.5} /> : <Volume2 className="w-4 h-4" strokeWidth={1.5} />}
        </button>
      )}
    </div>
  );
}

export default function ExperiencesShowcase() {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const hikeGallery = images.hiking.gallery;
  const eventGallery = images.events.gallery;

  const hikeFacts = [
    t("hiking.badge_acreage"),
    t("hiking.badge_duration"),
    t("hiking.badge_waterfall"),
    t("hiking.badge_difficulty")
  ];

  const eventSpecs = [1, 2, 3, 4].map((n) => ({
    label: t(`events.spec${n}_label`),
    value: t(`events.spec${n}_value`)
  }));

  const balsamoProducts = [1, 2, 3].map((n) => ({
    title: t(`balsamo.product${n}_title`),
    desc: t(`balsamo.product${n}_desc`)
  }));

  const openGallery = (items: GalleryItem[], index: number) =>
    setLightbox({ items, index });

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
      } else if (e.key === "ArrowRight") {
        setLightbox((prev) =>
          prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : null
        );
      } else if (e.key === "ArrowLeft") {
        setLightbox((prev) =>
          prev
            ? { ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length }
            : null
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  const hikingTitle = t("hiking.title");
  const eventsTitle = t("events.title");
  const balsamoTitle = t("balsamo.title");

  return (
    <div>
      {/* =====================================================================
          02 — HIKING CHICUINACO  (deep emerald band)
      ===================================================================== */}
      <section id="hiking" className="relative bg-[#0F2A1D] text-[#EDE6DA] overflow-hidden">
        {/* Full-bleed cinematic image */}
        <RevealImage
          src={hikeGallery[0].src}
          alt={hikeGallery[0].alt}
          parallax={60}
          className="h-[70svh] sm:h-[88svh] w-full"
        />

        <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Headline overlaps the image's lower edge */}
          <div className="relative -mt-24 sm:-mt-40 lg:-mt-52 bg-[#0F2A1D] before:content-[''] before:absolute before:inset-y-0 before:right-full before:w-[50vw] before:bg-[#0F2A1D] pt-10 sm:pt-14 lg:pt-16 pr-6 lg:pr-24 max-w-5xl">
            <Eyebrow index="02" light>
              {t("hiking.eyebrow")}
            </Eyebrow>
            <RevealText
              as="h2"
              text={hikingTitle}
              italicWords={[hikingTitle.split(" ").length - 1]}
              className="type-h2 text-[#F4EFE6] mt-8"
            />
            <FadeIn delay={0.2}>
              <p className="mt-6 font-display italic font-light text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.25] text-[#B8E986]">
                {t("hiking.subtitle")}
              </p>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 pt-14 sm:pt-20 pb-[clamp(5.5rem,12vw,10rem)]">
            {/* Narrative */}
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="drop-cap text-[clamp(1.125rem,1.4vw,1.3125rem)] leading-[1.7] text-[#EDE6DA]/90 max-w-[62ch] [&::first-letter]:text-[#B8E986]">
                  {t("hiking.paragraph1")}
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-7 text-[1.0625rem] leading-[1.75] text-[#EDE6DA]/75 max-w-[62ch]">
                  {t("hiking.paragraph2")}
                </p>
              </FadeIn>

              {/* Gallery strip — snap scroll on phones */}
              <div className="mt-14 -mx-5 sm:mx-0 px-5 sm:px-0 flex sm:grid sm:grid-cols-2 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar">
                {hikeGallery.slice(1).map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => openGallery(hikeGallery, i + 1)}
                    className="group relative shrink-0 w-[78%] sm:w-auto snap-start text-left cursor-zoom-in"
                  >
                    <RevealImage
                      src={g.src}
                      alt={g.alt}
                      delay={0.1 * i}
                      className="aspect-[4/5] w-full"
                      imgClassName="transition-transform duration-1000 ease-editorial group-hover:scale-105"
                    />
                    <p className="mt-3 leading-[1.5] text-[#EDE6DA]/65 font-display italic text-[1.05rem]">
                      {t(g.captionKey)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Facts as a numbered definition list + booking */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <ol className="border-t border-[#EDE6DA]/20">
                  {hikeFacts.map((f, i) => (
                    <FadeIn key={i} delay={0.06 * i}>
                      <li className="flex items-baseline gap-5 py-5 border-b border-[#EDE6DA]/20">
                        <span className="type-numeral text-[1rem] text-[#B8E986] tabular-nums">
                          0{i + 1}
                        </span>
                        <span className="font-display text-[1.75rem] leading-[1.1] text-[#F4EFE6]">
                          {f}
                        </span>
                      </li>
                    </FadeIn>
                  ))}
                </ol>

                <FadeIn delay={0.2}>
                  <p className="mt-8 font-display italic text-[1.3rem] leading-[1.4] text-[#EDE6DA]/85">
                    {t("hiking.appointment_notice")}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                    <a
                      href={getWhatsAppUrl(t("hiking.whatsapp_prefill"))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-[#B8E986] text-[#0F2A1D] text-[0.78rem] font-semibold uppercase tracking-[0.18em] hover:bg-[#cdf2a6] transition-colors duration-500"
                    >
                      {t("hiking.cta_whatsapp")}
                    </a>
                    <a
                      href={getPhoneUrl()}
                      className="inline-flex items-center justify-center h-14 px-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#EDE6DA]"
                    >
                      <span className="link-underline-static">{restaurantInfo.phone}</span>
                    </a>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          03 — EVENT VENUE  (paper, asymmetric collage)
      ===================================================================== */}
      <section id="events" className="relative section-pad bg-paper overflow-hidden">
        <GhostNumeral n="03" className="absolute top-10 left-[-2vw]" />
        <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            {/* Collage */}
            <div className="lg:col-span-6 relative pb-24 sm:pb-32">
              <button
                type="button"
                onClick={() => openGallery(eventGallery, 0)}
                className="block w-[82%] cursor-zoom-in"
              >
                <RevealImage
                  src={eventGallery[0].src}
                  alt={eventGallery[0].alt}
                  parallax={24}
                  className="aspect-[3/4] w-full"
                />
              </button>
              <button
                type="button"
                onClick={() => openGallery(eventGallery, 1)}
                className="absolute bottom-0 right-0 w-[58%] cursor-zoom-in border-[6px] border-[color:var(--a-bg)] shadow-[0_30px_60px_-30px_rgba(31,27,22,0.45)]"
              >
                <RevealImage
                  src={eventGallery[1].src}
                  alt={eventGallery[1].alt}
                  delay={0.25}
                  className="aspect-[4/3] w-full"
                />
              </button>
              <p className="hidden sm:block absolute bottom-2 left-0 w-[38%] font-display italic text-[1.05rem] leading-[1.4] text-muted-ink">
                {t(eventGallery[0].captionKey)}
              </p>
            </div>

            {/* Copy */}
            <div className="lg:col-span-6 lg:pt-16">
              <Eyebrow index="03">{t("events.eyebrow")}</Eyebrow>
              <RevealText
                as="h2"
                text={eventsTitle}
                italicWords={[eventsTitle.split(" ").length - 1]}
                className="type-h2 text-ink mt-8"
              />
              <FadeIn delay={0.15}>
                <p className="mt-6 font-display italic font-light text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.25] text-[#9F1D5E] dark:text-[#FF85C8]">
                  {t("events.subtitle")}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="type-lede mt-8">{t("events.paragraph1")}</p>
                <p className="type-body mt-6">{t("events.paragraph2")}</p>
              </FadeIn>

              {/* Specs: two-column definition list */}
              <dl className="mt-12 grid grid-cols-2 border-t border-rule">
                {eventSpecs.map((s, i) => (
                  <FadeIn key={i} delay={0.06 * i}>
                    <div
                      className={`py-6 border-b border-rule ${i % 2 === 0 ? "pr-6 border-r" : "pl-6"}`}
                    >
                      <dt className="type-eyebrow">{s.label}</dt>
                      <dd className="mt-2 font-display text-[1.6rem] sm:text-[1.9rem] leading-[1.1] text-ink">
                        {s.value}
                      </dd>
                    </div>
                  </FadeIn>
                ))}
              </dl>

              <FadeIn delay={0.2}>
                <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center">
                  <a
                    href={getWhatsAppUrl(t("events.whatsapp_prefill"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    {t("events.cta_whatsapp")}
                  </a>
                  <a
                    href={getPhoneUrl()}
                    className="inline-flex items-center justify-center h-14 px-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink"
                  >
                    <span className="link-underline-static">{t("events.cta_call")}</span>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          04 — BÁLSAMO OIL  (sandstone band, cinematic video)
      ===================================================================== */}
      <section id="balsamo" className="relative section-pad bg-paper-alt overflow-hidden">
        <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Heading with script signature */}
          <div className="relative max-w-5xl">
            <Eyebrow index="04">{t("balsamo.eyebrow")}</Eyebrow>
            <div className="relative mt-8">
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, rotate: -8, y: 10 }}
                whileInView={{ opacity: 1, rotate: -5, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
                className="absolute -top-16 sm:-top-28 right-0 font-lavishly text-[clamp(3rem,7vw,6rem)] leading-none text-gold-ink opacity-70 pointer-events-none"
              >
                Bálsamo
              </motion.span>
              <RevealText
                as="h2"
                text={balsamoTitle}
                italicWords={[balsamoTitle.split(" ").length - 1]}
                className="relative type-h2 text-ink"
              />
            </div>
            <FadeIn delay={0.15}>
              <p className="mt-6 font-display italic font-light text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.25] text-gold-ink">
                {t("balsamo.subtitle")}
              </p>
            </FadeIn>
          </div>

          {/* Cinematic video with inset */}
          <div className="relative mt-14 sm:mt-20 pb-0 md:pb-24">
            <motion.div
              initial={{ clipPath: "inset(12% 8% 12% 8%)", opacity: 0.4 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <LoopVideo
                src={images.balsamo.videoWide}
                poster={images.balsamo.posterWide}
                label={t("balsamo.video1_title")}
                className="aspect-[4/5] sm:aspect-[16/9] w-full md:w-[78%]"
              />
            </motion.div>
            <FadeIn
              delay={0.3}
              className="mt-4 md:mt-0 md:absolute md:right-0 md:bottom-0 md:w-[34%]"
            >
              <LoopVideo
                src={images.balsamo.videoClose}
                poster={images.balsamo.posterClose}
                label={t("balsamo.video2_title")}
                className="aspect-[4/5] w-full md:border-[6px] md:border-[color:var(--a-bg-alt)] md:shadow-[0_30px_60px_-30px_rgba(31,27,22,0.5)]"
              />
            </FadeIn>
            <div className="mt-5 md:absolute md:left-0 md:-bottom-2 md:w-[40%] grid grid-cols-2 gap-6 md:block">
              <p className="type-eyebrow">01 · {t("balsamo.video1_title")}</p>
              <p className="type-eyebrow md:mt-2">02 · {t("balsamo.video2_title")}</p>
            </div>
          </div>

          {/* Story + numbered products */}
          <div className="mt-20 sm:mt-28 grid lg:grid-cols-12 gap-14 lg:gap-20">
            <div className="lg:col-span-6">
              <FadeIn>
                <p className="type-lede drop-cap text-ink [&::first-letter]:!text-[color:var(--a-gold)]">
                  {t("balsamo.paragraph1")}
                </p>
                <p className="type-body mt-7">{t("balsamo.paragraph2")}</p>
              </FadeIn>
            </div>
            <div className="lg:col-span-6">
              <ol className="border-t border-[color:var(--a-gold)]/50">
                {balsamoProducts.map((p, i) => (
                  <FadeIn key={i} delay={0.08 * i}>
                    <li className="grid grid-cols-[3rem_1fr] gap-4 py-7 border-b border-rule">
                      <span className="type-numeral text-[1.5rem] text-gold-ink tabular-nums">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.9rem] leading-[1.05] text-ink">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-[0.9375rem] leading-[1.65] text-ink-soft">
                          {p.desc}
                        </p>
                      </div>
                    </li>
                  </FadeIn>
                ))}
              </ol>
              <FadeIn delay={0.2}>
                <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center">
                  <a
                    href={getWhatsAppUrl(t("balsamo.whatsapp_tour_prefill"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-[#1F1B16] dark:bg-[#E8C25A] text-[#F4EFE6] dark:text-[#14120F] text-[0.78rem] font-semibold uppercase tracking-[0.18em] hover:opacity-90 transition-opacity duration-500"
                  >
                    {t("balsamo.cta_tour")}
                  </a>
                  <a
                    href={getWhatsAppUrl(t("balsamo.whatsapp_buy_prefill"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-14 px-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink"
                  >
                    <span className="link-underline-static">{t("balsamo.cta_buy")}</span>
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          HACIENDA SUITES — accommodations showcase with gallery
      ===================================================================== */}
      <section id="suites" className="py-24 lg:py-32 border-b border-border/80 bg-surface">
        <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl">
            <Eyebrow>{t("accommodation.eyebrow")}</Eyebrow>
            <RevealText
              as="h2"
              text={t("accommodation.title")}
              className="type-h2 text-ink mt-4"
            />
            <p className="mt-3 type-editorial text-ink/75">
              {t("accommodation.subtitle")}
            </p>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-[1.0625rem] leading-[1.75] text-ink/80 max-w-2xl">
                {t("accommodation.description")}
              </p>
            </FadeIn>
          </div>

          {/* Specs Hairline Grid */}
          <FadeIn delay={0.2} className="mt-12 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="type-eyebrow !text-ink/65">{t("accommodation.spec_capacity_label")}</span>
              <p className="mt-2 font-serif text-[1.15rem] text-ink leading-snug">
                {t("accommodation.spec_capacity_value")}
              </p>
            </div>
            <div>
              <span className="type-eyebrow !text-ink/65">{t("accommodation.spec_beds_label")}</span>
              <p className="mt-2 font-serif text-[1.15rem] text-ink leading-snug">
                {t("accommodation.spec_beds_value")}
              </p>
            </div>
            <div>
              <span className="type-eyebrow !text-ink/65">{t("accommodation.spec_layout_label")}</span>
              <p className="mt-2 font-serif text-[1.15rem] text-ink leading-snug">
                {t("accommodation.spec_layout_value")}
              </p>
            </div>
            <div>
              <span className="type-eyebrow !text-ink/65">{t("accommodation.spec_rates_label")}</span>
              <p className="mt-2 font-serif text-[1.15rem] text-ink leading-snug">
                {t("accommodation.spec_rates_value")}
              </p>
            </div>
          </FadeIn>

          {/* Room Photo Gallery */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {images.accommodation.gallery.map((photo, i) => (
              <FadeIn key={photo.src} delay={0.1 + i * 0.08}>
                <div
                  className="group relative cursor-pointer overflow-hidden border border-border/70 bg-[#DFD9CB]"
                  onClick={() => openGallery(images.accommodation.gallery, i)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 bg-surface flex items-start justify-between gap-3 border-t border-border/60">
                    <p className="text-[0.84rem] text-ink/80 leading-snug font-sans line-clamp-2">
                      {t(photo.captionKey)}
                    </p>
                    <span className="shrink-0 text-ink/65 group-hover:text-ink transition-colors mt-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTAs */}
          <FadeIn delay={0.3} className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href={getWhatsAppUrl(t("accommodation.whatsapp_prefill"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-ink text-surface text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span>{t("accommodation.cta_whatsapp")}</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="inline-flex items-center justify-center gap-2 h-14 px-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink"
            >
              <span className="link-underline-static">{t("accommodation.cta_call")}</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (() => {
          const activeItem = lightbox.items[lightbox.index];
          return (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Image gallery preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={() => setLightbox(null)}
              data-lenis-prevent
              className="fixed inset-0 z-[70] bg-[#14120F]/95 backdrop-blur-sm flex flex-col items-center justify-center p-5 sm:p-10"
            >
              <div className="absolute top-5 inset-x-5 sm:inset-x-10 flex items-center justify-between">
                <span className="type-eyebrow !text-white/75 tabular-nums">
                  0{lightbox.index + 1} / 0{lightbox.items.length}
                </span>
                <button
                  type="button"
                  aria-label="Close preview"
                  onClick={() => setLightbox(null)}
                  className="h-11 w-11 rounded-full border border-white/30 text-white inline-flex items-center justify-center hover:border-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {lightbox.items.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((prev) =>
                        prev
                          ? {
                              ...prev,
                              index: (prev.index - 1 + prev.items.length) % prev.items.length
                            }
                          : null
                      );
                    }}
                    className="hidden sm:inline-flex absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/30 text-white items-center justify-center hover:border-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((prev) =>
                        prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : null
                      );
                    }}
                    className="hidden sm:inline-flex absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/30 text-white items-center justify-center hover:border-white transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </>
              )}

              <motion.img
                key={activeItem.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                src={activeItem.src}
                alt={activeItem.alt}
                className="max-h-[75vh] max-w-full object-contain"
              />
              <p className="mt-6 font-display italic text-[1.25rem] text-white/85 text-center max-w-2xl">
                {t(activeItem.captionKey)}
              </p>

              {lightbox.items.length > 1 && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 flex sm:hidden items-center gap-4"
                >
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() =>
                      setLightbox((prev) =>
                        prev
                          ? {
                              ...prev,
                              index: (prev.index - 1 + prev.items.length) % prev.items.length
                            }
                          : null
                      )
                    }
                    className="h-11 w-11 rounded-full border border-white/30 text-white inline-flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() =>
                      setLightbox((prev) =>
                        prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : null
                      )
                    }
                    className="h-11 w-11 rounded-full border border-white/30 text-white inline-flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
