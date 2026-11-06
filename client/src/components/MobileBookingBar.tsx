import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { getWhatsAppUrl, getPhoneUrl } from "../data/content";
import { MessageCircle, Phone } from "lucide-react";
import { EASE } from "./motion";

/**
 * Slim single-row booking bar for phones. Appears after the hero,
 * keeping repeated CTAs out of every section.
 */
export default function MobileBookingBar() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > window.innerHeight * 0.85);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-rule bg-[color-mix(in_srgb,var(--a-surface)_94%,transparent)] backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
        >
          <div className="flex items-center gap-2 h-14 px-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-full bg-accent-ink text-[color:var(--a-accent-ink)] text-[0.75rem] font-semibold uppercase tracking-[0.16em] whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t("nav.reserve_cta")}</span>
            </a>
            <a
              href={getPhoneUrl()}
              aria-label="Call Chicuinaco"
              className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-rule-strong text-ink"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
