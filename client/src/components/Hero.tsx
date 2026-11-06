import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { images } from "../data/images";
import { scrollToSection } from "@/lib/scroll";
import { EASE, RevealText } from "./motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Hero image drifts at ~0.4× scroll and gently dims as you leave.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stats = [
    { label: t("hero.stat_estate"), target: "hiking" },
    { label: t("hero.stat_patio"), target: "events" },
    { label: t("hero.stat_hike"), target: "hiking" },
    { label: t("hero.stat_balsamo"), target: "balsamo" }
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-[#14120F] text-white flex flex-col justify-between"
    >
      {/* Image: fades from black, settles from a slow zoom, then parallaxes */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imgY }}
      >
        <motion.img
          src={images.hero.main}
          alt={images.hero.alt}
          fetchPriority="high"
          width={1920}
          height={1080}
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1.03 }}
          transition={{ scale: { duration: 6, ease: EASE } }}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
      {/* Luminous editorial vignette — preserves the electric sunset sky while grounding bottom-left typography */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/65" />
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

      {/* Content — bottom-left editorial composition */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-end pt-28 sm:pt-32 pb-8 sm:pb-[clamp(2.5rem,7vh,5rem)] my-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          className="type-eyebrow !text-white/80 mb-5 sm:mb-7 flex items-center gap-4"
        >
          <span className="block h-px w-10 bg-white/70" />
          <span>{t("hero.badge")}</span>
        </motion.p>

        <h1 className="type-hero text-white">
          <RevealText text="Chicuinaco" immediate delay={0.8} />
        </h1>

        <div className="mt-6 sm:mt-8 grid lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-7 notranslate" translate="no">
            <RevealText
              as="p"
              text={t("hero.subtitle")}
              immediate
              delay={1.15}
              stagger={0.04}
              className="font-display italic font-light text-[clamp(1.6rem,3.4vw,2.75rem)] leading-[1.1] text-white/95 notranslate"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
              className="mt-5 max-w-[52ch] text-[1rem] sm:text-[1.0625rem] leading-[1.7] text-white/80"
            >
              {t("hero.description")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.7 }}
            className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3"
          >
            <button
              onClick={() => scrollToSection("hiking")}
              className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white text-[#1F1B16] text-[0.78rem] font-semibold uppercase tracking-[0.18em] hover:bg-[#F4EFE6] transition-colors duration-500 cursor-pointer"
            >
              {t("hero.experiences_button")}
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-white/45 text-white text-[0.78rem] font-semibold uppercase tracking-[0.18em] hover:border-white transition-colors duration-500 cursor-pointer"
            >
              {t("hero.menu_button")}
            </button>
          </motion.div>
        </div>

        {/* Drawn hairline + single stat line (replaces the 4 stat cards) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 1.9 }}
          className="mt-10 sm:mt-14 h-px w-full bg-white/30 origin-left"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 2.3 }}
          className="pt-5 flex items-center justify-between gap-6"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.72rem] sm:text-[0.75rem] uppercase tracking-[0.2em] text-white/80">
            {stats.map((s, i) => (
              <li key={i} className="flex items-center gap-6">
                <button
                  onClick={() => scrollToSection(s.target)}
                  className="link-underline cursor-pointer hover:text-white transition-colors"
                >
                  {s.label}
                </button>
                {i < stats.length - 1 && (
                  <span aria-hidden="true" className="hidden sm:inline text-white/40">·</span>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={() => scrollToSection("story")}
            aria-label="Scroll to story"
            className="hidden md:inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 hover:border-white transition-colors cursor-pointer flex-shrink-0"
          >
            <motion.span
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
            </motion.span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
