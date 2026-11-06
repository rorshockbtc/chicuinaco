import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { images } from "../data/images";
import { EASE, Eyebrow, FadeIn, GhostNumeral, Hairline, RevealText } from "./motion";

type MenuCategory = "all" | "traditional" | "grilled" | "american";

/**
 * The menu as a printed "carta": dish names with dotted leaders,
 * and a sticky photograph that crossfades to the dish you hover.
 */
export default function Menu() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [activeDish, setActiveDish] = useState("churrasco");

  const menuData = [
    { id: "churrasco", category: "grilled" as const, image: images.menu.churrasco, alt: "Grilled Churrasco Asada platter with rice, pico de gallo, and chorizo" },
    { id: "alitas", category: "grilled" as const, image: images.menu.alitas, alt: "Alitas Especiales served with rice, fresh salad, and traditional sides" },
    { id: "tacos", category: "traditional" as const, image: images.menu.tacos, alt: "Traditional Salvadoran Tacos Típicos with salsas and lime" },
    { id: "yuca", category: "traditional" as const, image: images.menu.yuca, alt: "Golden fried Yuca Frita with traditional curtido and house sauce" },
    { id: "burger", category: "american" as const, image: images.menu.burger, alt: "Hamburguesa Especial with melted cheese and crispy french fries" },
    { id: "hotdog", category: "american" as const, image: images.menu.hotdog, alt: "Loaded Hot Dog Especial with toppings and crispy fries" }
  ];

  const categories: { key: MenuCategory; label: string }[] = [
    { key: "all", label: t("menu.filter_all") },
    { key: "traditional", label: t("menu.filter_traditional") },
    { key: "grilled", label: t("menu.filter_grilled") },
    { key: "american", label: t("menu.filter_american") }
  ];

  const filtered =
    activeCategory === "all" ? menuData : menuData.filter((d) => d.category === activeCategory);

  const handleSelectCategory = (cat: MenuCategory) => {
    setActiveCategory(cat);
    const nextList = cat === "all" ? menuData : menuData.filter((d) => d.category === cat);
    if (!nextList.some((d) => d.id === activeDish) && nextList.length > 0) {
      setActiveDish(nextList[0].id);
    }
  };

  const current = filtered.find((d) => d.id === activeDish) ?? filtered[0] ?? menuData[0];
  const menuTitle = t("menu.title");

  return (
    <section id="menu" className="relative section-pad bg-paper overflow-hidden">
      <GhostNumeral n="05" className="absolute top-6 right-[-2vw]" />

      <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="05">{t("menu.eyebrow")}</Eyebrow>
            <RevealText
              as="h2"
              text={menuTitle}
              italicWords={[menuTitle.split(" ").length - 1]}
              className="type-h2 text-ink mt-8"
            />
          </div>
          <FadeIn className="lg:col-span-5" delay={0.15}>
            <p className="type-body">{t("menu.subtitle")}</p>
          </FadeIn>
        </div>

        {/* Underline tab filter */}
        <LayoutGroup>
          <div
            role="tablist"
            className="mt-14 flex gap-6 sm:gap-10 overflow-x-auto no-scrollbar border-b border-rule -mx-5 px-5 sm:mx-0 sm:px-0"
          >
            {categories.map((c) => {
              const on = activeCategory === c.key;
              return (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => handleSelectCategory(c.key)}
                  className={`relative shrink-0 pb-4 pt-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] whitespace-nowrap cursor-pointer transition-colors duration-500 ${
                    on ? "text-ink" : "text-muted-ink hover:text-ink"
                  }`}
                >
                  {c.label}
                  {on && (
                    <motion.span
                      layoutId="menuTabUnderline"
                      transition={{ duration: 0.6, ease: EASE }}
                      className="absolute left-0 right-0 -bottom-px h-[2px] bg-accent-ink"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Carta list */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.ol layout className="relative">
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((d, i) => {
                  const on = activeDish === d.id;
                  return (
                    <motion.li
                      layout
                      key={d.id}
                      id={`menu-dish-${d.id}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
                      className="border-b border-rule"
                    >
                      <button
                        type="button"
                        onMouseEnter={() => setActiveDish(d.id)}
                        onFocus={() => setActiveDish(d.id)}
                        onClick={() => setActiveDish(d.id)}
                        className="group w-full text-left py-7 sm:py-8 px-1 sm:px-0 cursor-pointer"
                      >
                        <div className="flex items-baseline gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
                          <span
                            className={`font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] transition-all duration-700 ease-editorial ${
                              on ? "text-ink italic translate-x-1 sm:translate-x-2" : "text-ink/80"
                            }`}
                          >
                            {t(`menu.${d.id}.title`)}
                          </span>
                          <span
                            aria-hidden="true"
                            className="hidden sm:block flex-1 translate-y-[-0.3em] border-b border-dotted border-rule-strong"
                          />
                          <span className="type-eyebrow whitespace-nowrap ml-auto sm:ml-0">
                            {t(`menu.${d.id}.category_label`)}
                          </span>
                        </div>
                        <p className="mt-3 max-w-[54ch] text-[0.9375rem] leading-[1.65] text-ink-soft">
                          {t(`menu.${d.id}.description`)}
                        </p>
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </motion.ol>

            <FadeIn delay={0.1}>
              <p className="mt-10 px-1 sm:px-0 font-display italic text-[1.25rem] sm:text-[1.35rem] leading-[1.4] text-muted-ink max-w-[48ch]">
                {t("menu.catering_note")}
              </p>
            </FadeIn>
          </div>

          {/* Sticky crossfading photograph (desktop) */}
          <div className="hidden lg:block lg:col-span-5 order-1 lg:order-2">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden photo-grade bg-paper-alt">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={current.id}
                    src={current.image}
                    alt={current.alt}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <Hairline className="mt-5" />
              <div className="pt-4 flex items-baseline justify-between">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="font-display italic text-[1.35rem] text-ink"
                  >
                    {t(`menu.${current.id}.title`)}
                  </motion.span>
                </AnimatePresence>
                <span className="type-eyebrow">Restaurante Chicuinaco</span>
              </div>
            </div>
          </div>

          {/* Phone: horizontal snap strip of dish photos */}
          <div className="lg:hidden order-1 -mx-5 px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {filtered.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setActiveDish(d.id);
                  document.getElementById(`menu-dish-${d.id}`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                  });
                }}
                className="shrink-0 w-[56%] sm:w-[36%] snap-start text-left"
              >
                <div className="aspect-[4/5] overflow-hidden photo-grade">
                  <img src={d.image} alt={d.alt} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <p className="mt-3 font-display italic text-[1.2rem] text-ink">
                  {t(`menu.${d.id}.title`)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
