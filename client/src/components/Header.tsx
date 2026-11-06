import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll
} from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { openInquiryDialog, scrollToSection, scrollToTop } from "@/lib/scroll";
import { EASE } from "./motion";
import { Sun, Moon, Menu as MenuIcon, X } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 60);
  });

  const languages = [
    { code: "en", name: "English", label: "EN" },
    { code: "es", name: "Español", label: "ES" },
    { code: "fr", name: "Français", label: "FR" },
    { code: "de", name: "Deutsch", label: "DE" }
  ];

  useEffect(() => {
    const handleClickOutside = () => setShowLanguageMenu(false);
    if (showLanguageMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showLanguageMenu]);

  const go = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  const navItems = [
    { id: "story", label: t("nav.story") },
    { id: "hiking", label: t("nav.hiking") },
    { id: "events", label: t("nav.events") },
    { id: "balsamo", label: t("nav.balsamo") },
    { id: "menu", label: t("nav.menu") },
    { id: "contact", label: t("nav.contact") }
  ];

  // Over the hero the header is transparent with light type.
  const overHero = !solid && !mobileMenuOpen;
  const ink = overHero ? "text-white" : "text-ink";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
        overHero
          ? "bg-[#14120F]/90 backdrop-blur-md border-white/10"
          : "bg-[color-mix(in_srgb,var(--a-bg)_86%,transparent)] backdrop-blur-xl border-rule"
      }`}
    >
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Wordmark */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToTop();
            }}
            className={`font-lavishly text-[2rem] md:text-[2.4rem] leading-none cursor-pointer transition-colors duration-700 ${ink}`}
          >
            Chicuinaco
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`link-underline text-[0.8125rem] tracking-[0.04em] cursor-pointer transition-colors duration-700 ${
                  overHero ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className={`flex items-center gap-1 sm:gap-2 ${ink}`}>
            {/* Bitcoin Accepted Badge */}
            <div
              title="Bitcoin Accepted Here (BTC / Lightning)"
              className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full text-[0.68rem] font-semibold tracking-[0.12em] uppercase border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 select-none mr-1"
            >
              <span className="font-bold text-[0.8rem] leading-none text-[#F7931A]">₿</span>
              <span className="hidden xs:inline sm:inline">Bitcoin</span>
            </div>

            <button
              type="button"
              onClick={() => openInquiryDialog("hiking")}
              className={`hidden sm:inline-flex items-center h-10 px-5 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.18em] border transition-all duration-500 cursor-pointer whitespace-nowrap ${
                overHero
                  ? "border-white/50 hover:bg-white hover:text-neutral-900"
                  : "border-transparent bg-accent-ink text-[color:var(--a-accent-ink)] hover:brightness-110"
              }`}
            >
              {t("nav.reserve_cta")}
            </button>

            {/* Language */}
            <div className="relative">
              <button
                aria-label="Select Language"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLanguageMenu(!showLanguageMenu);
                }}
                className="h-11 min-w-[44px] px-2 text-[0.72rem] font-semibold tracking-[0.18em] cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              >
                {languages.find((l) => l.code === language)?.label || "EN"}
              </button>

              <AnimatePresence>
                {showLanguageMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="absolute right-0 mt-2 w-44 bg-surface text-ink rounded-md shadow-[0_20px_50px_-20px_rgba(31,27,22,0.35)] border border-rule py-2 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer hover:bg-[color:var(--a-bg)] ${
                          language === lang.code ? "text-accent-ink font-semibold" : "text-ink-soft"
                        }`}
                      >
                        <span>{lang.name}</span>
                        <span className="text-[0.7rem] tracking-[0.18em] opacity-60">
                          {lang.label}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme */}
            <button
              aria-label="Toggle Dark or Light Theme"
              onClick={toggleTheme}
              className="h-11 w-11 inline-flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            >
              {theme === "light" ? <Moon className="w-4 h-4" strokeWidth={1.5} /> : <Sun className="w-4 h-4" strokeWidth={1.5} />}
            </button>

            {/* Mobile menu */}
            <button
              aria-label="Toggle Navigation Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-11 w-11 inline-flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <MenuIcon className="w-5 h-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — editorial full list */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:hidden overflow-hidden bg-paper border-t border-rule"
          >
            <ol className="px-5 sm:px-8 pt-2 pb-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.05 }}
                  className="border-b border-rule"
                >
                  <button
                    onClick={() => go(item.id)}
                    className="w-full flex items-baseline gap-4 py-4 text-left cursor-pointer"
                  >
                    <span className="type-numeral text-sm text-muted-ink tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[2rem] leading-none text-ink">
                      {item.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
