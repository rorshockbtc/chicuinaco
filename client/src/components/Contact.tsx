import { useLanguage } from "./LanguageProvider";
import { images } from "../data/images";
import {
  restaurantInfo,
  getWhatsAppUrl,
  getPhoneUrl,
  getGoogleMapsUrl
} from "../data/content";
import { openInquiryDialog } from "@/lib/scroll";
import { Eyebrow, FadeIn, Hairline, RevealImage, RevealText } from "./motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();
  const title = t("contact.title");

  const rows = [
    {
      label: t("contact.location.title"),
      body: (
        <>
          <p className="font-display text-[1.6rem] leading-[1.15] text-ink">
            {t("contact.location.address")}
          </p>
          <p className="mt-1 text-[0.9375rem] text-ink-soft">{t("contact.location.range")}</p>
          <p className="mt-1 text-[0.8125rem] text-muted-ink tabular-nums">
            {t("contact.location.coordinates")}
          </p>
          <a
            href={getGoogleMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ink"
          >
            <span className="link-underline-static">{t("contact.location.directions")}</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </>
      )
    },
    {
      label: t("contact.hours.title"),
      body: (
        <>
          <p className="font-display text-[1.6rem] leading-[1.15] text-ink">
            {t("contact.hours.daily")}
          </p>
          <p className="mt-2 text-[0.9375rem] leading-[1.65] text-ink-soft max-w-[46ch]">
            {t("contact.hours.appointments")}
          </p>
        </>
      )
    }
  ];

  return (
    <section id="contact" className="relative section-pad bg-paper-alt overflow-hidden">
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Type block */}
          <div className="lg:col-span-6">
            <Eyebrow index="07">{t("contact.eyebrow")}</Eyebrow>
            <RevealText
              as="h2"
              text={title}
              italicWords={[title.split(" ").length - 1]}
              className="type-h2 text-ink mt-8"
            />
            <FadeIn delay={0.15}>
              <p className="type-body mt-6">{t("contact.subtitle")}</p>
            </FadeIn>

            {/* Phone as the hero of the block */}
            <FadeIn delay={0.2}>
              <div className="mt-12">
                <p className="type-eyebrow">{t("contact.phone.title")}</p>
                <a
                  href={getPhoneUrl()}
                  className="mt-3 inline-block font-display font-light text-[clamp(2.75rem,6vw,4.75rem)] leading-none text-ink tabular-nums link-underline"
                >
                  {restaurantInfo.phone}
                </a>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center">
                  <button
                    type="button"
                    onClick={() => openInquiryDialog("hiking")}
                    className="btn-primary cursor-pointer"
                  >
                    {t("concierge.title")}
                  </button>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-14 px-6 border border-rule rounded-full text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink hover:border-ink transition-colors"
                  >
                    {t("contact.phone.whatsapp_label")}
                  </a>
                  <a
                    href={getPhoneUrl()}
                    className="inline-flex items-center justify-center h-14 px-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink"
                  >
                    <span className="link-underline-static">{t("contact.phone.call_label")}</span>
                  </a>
                  <a
                    href={restaurantInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-14 px-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink"
                  >
                    <span className="link-underline-static">Facebook</span>
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Details as hairline rows */}
            <div className="mt-16">
              {rows.map((r, i) => (
                <div key={i}>
                  <Hairline delay={0.08 * i} />
                  <FadeIn delay={0.08 * i}>
                    <div className="grid sm:grid-cols-[10rem_1fr] gap-3 sm:gap-8 py-8">
                      <p className="type-eyebrow pt-2">{r.label}</p>
                      <div>{r.body}</div>
                    </div>
                  </FadeIn>
                </div>
              ))}
              <Hairline />
            </div>
          </div>

          {/* View + quote */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <RevealImage
                src={images.contact.view}
                alt={images.contact.alt}
                parallax={30}
                className="aspect-[4/5] w-full"
              />
              <FadeIn delay={0.2}>
                <blockquote className="mt-8 type-quote text-ink max-w-[22ch]">
                  “{t("contact.view.text")}”
                </blockquote>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
