import { useLanguage } from "./LanguageProvider";
import { restaurantInfo, getWhatsAppUrl, getPhoneUrl } from "../data/content";
import { scrollToSection } from "@/lib/scroll";
import { FadeIn } from "./motion";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { id: "story", label: t("nav.story") },
    { id: "hiking", label: t("nav.hiking") },
    { id: "events", label: t("nav.events") },
    { id: "balsamo", label: t("nav.balsamo") },
    { id: "suites", label: t("accommodation.title") },
    { id: "menu", label: t("nav.menu") },
    { id: "faq", label: t("faq.title") },
    { id: "contact", label: t("nav.contact") }
  ];

  return (
    <footer className="bg-[#14120F] text-[#C9BFB0] pb-20 sm:pb-0">
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28">
        {/* Oversized signature wordmark */}
        <FadeIn>
          <p className="font-lavishly text-[clamp(4.5rem,16vw,13rem)] leading-[0.9] text-[#EDE6DA]">
            Chicuinaco
          </p>
          <p className="mt-4 max-w-[48ch] font-display italic text-[1.35rem] leading-[1.4] text-[#C9BFB0]">
            {t("footer.tagline")}
          </p>
        </FadeIn>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-12 gap-12 border-t border-[#EDE6DA]/15 pt-12">
          <nav className="lg:col-span-6">
            <p className="type-eyebrow !text-[#8F8576]">{t("footer.quick_links")}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToSection(l.id)}
                    className="link-underline font-display text-[1.4rem] text-[#EDE6DA] cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-6">
            <p className="type-eyebrow !text-[#8F8576]">{t("footer.contact_heading")}</p>
            <p className="mt-5 text-[0.9375rem] leading-[1.7]">{restaurantInfo.location}</p>
            <p className="text-[0.9375rem] leading-[1.7]">{t("contact.hours.daily")}</p>
            <div className="mt-5 flex flex-wrap items-center gap-6 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#EDE6DA]">
              <a href={getPhoneUrl()} className="link-underline-static tabular-nums">
                {restaurantInfo.phone}
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline-static"
              >
                WhatsApp
              </a>
              <a
                href={restaurantInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline-static"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 py-8 border-t border-[#EDE6DA]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[0.75rem] tracking-[0.08em] text-[#8F8576]">
          <p>{t("footer.copyright")}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="tabular-nums">13.595° N · 89.519° W — Teotepeque, El Salvador</p>
            <span aria-hidden="true" className="hidden sm:inline text-[#EDE6DA]/25">·</span>
            <p>
              Built by{" "}
              <a
                href="https://hire.colonhyphenbracket.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EDE6DA] link-underline hover:text-white transition-colors"
              >
                Colon Hyphen Bracket
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
