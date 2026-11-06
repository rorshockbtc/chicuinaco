import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { contactInfo, getWhatsAppUrl } from "../data/content";
import { type InquiryTopic } from "@/lib/scroll";
import { ArrowUpRight, X } from "lucide-react";

export default function InquiryDialog() {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [topic, setTopic] = useState<InquiryTopic>("hiking");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("guests_4");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Fallback for browsers without declarative closedby="any" support (e.g. Safari)
    let removeClickFallback: (() => void) | undefined;
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      };
      dialog.addEventListener("click", handleBackdropClick);
      removeClickFallback = () => dialog.removeEventListener("click", handleBackdropClick);
    }

    const handleOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ topic?: InquiryTopic }>).detail;
      if (detail?.topic) {
        setTopic(detail.topic);
      }
      if (!dialog.open) {
        dialog.showModal();
      }
    };

    window.addEventListener("chicuinaco:open-inquiry", handleOpen);
    return () => {
      window.removeEventListener("chicuinaco:open-inquiry", handleOpen);
      removeClickFallback?.();
    };
  }, []);

  const experiences: { key: InquiryTopic; label: string }[] = [
    { key: "hiking", label: t("concierge.exp_hiking") },
    { key: "events", label: t("concierge.exp_events") },
    { key: "suites", label: t("concierge.exp_suites") },
    { key: "balsamo", label: t("concierge.exp_balsamo") },
    { key: "dining", label: t("concierge.exp_dining") }
  ];

  const guestOptions = ["guests_2", "guests_4", "guests_10", "guests_30", "guests_100"];

  const composeMessage = () => {
    const expLabel = experiences.find((e) => e.key === topic)?.label ?? topic;
    const guestLabel = t(`concierge.${guests}`);
    const lines = [
      `Hola Chicuinaco — ${t("concierge.title")}:`,
      `• ${t("concierge.exp_label")}: ${expLabel}`,
      `• ${t("concierge.guests_label")}: ${guestLabel}`
    ];
    if (date) {
      lines.push(`• ${t("concierge.date_label")}: ${date}`);
    }
    if (notes.trim()) {
      lines.push(`• ${t("concierge.notes_label")}: ${notes.trim()}`);
    }
    return lines.join("\n");
  };

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(composeMessage());
    window.open(url, "_blank", "noopener,noreferrer");
    dialogRef.current?.close();
  };

  const handleEmail = () => {
    const expLabel = experiences.find((e) => e.key === topic)?.label ?? "Chicuinaco";
    const subject = encodeURIComponent(`Chicuinaco — ${expLabel}`);
    const body = encodeURIComponent(composeMessage());
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as any)}
      aria-labelledby={titleId}
      data-lenis-prevent
      className="m-auto w-[calc(100vw-2rem)] max-w-xl bg-surface text-ink border border-rule p-0 shadow-[0_35px_80px_-25px_rgba(20,18,15,0.65)] backdrop:bg-[#14120F]/75 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="type-eyebrow">{t("concierge.eyebrow")}</p>
            <h2
              id={titleId}
              className="mt-2 font-display text-[clamp(1.85rem,3.4vw,2.5rem)] leading-[1.08] text-ink"
            >
              {t("concierge.title")}
            </h2>
          </div>
          <button
            type="button"
            aria-label={t("concierge.close_label")}
            onClick={() => dialogRef.current?.close()}
            className="h-11 w-11 rounded-full border border-rule text-ink inline-flex items-center justify-center hover:border-ink transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <p className="mt-3 text-[0.9rem] leading-[1.6] text-ink-soft">
          {t("concierge.subtitle")}
        </p>

        <div className="mt-7 space-y-6">
          {/* Experience Selection */}
          <div>
            <label
              htmlFor="concierge-exp"
              className="block type-eyebrow mb-2.5"
            >
              {t("concierge.exp_label")}
            </label>
            <select
              id="concierge-exp"
              value={topic}
              onChange={(e) => setTopic(e.target.value as InquiryTopic)}
              className="w-full h-12 px-4 bg-paper text-ink border border-rule text-[0.9375rem] focus:outline-none focus:border-ink"
            >
              {experiences.map((exp) => (
                <option key={exp.key} value={exp.key}>
                  {exp.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Party Size */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="concierge-date"
                className="block type-eyebrow mb-2.5"
              >
                {t("concierge.date_label")}
              </label>
              <input
                id="concierge-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-12 px-4 bg-paper text-ink border border-rule text-[0.9375rem] focus:outline-none focus:border-ink"
              />
            </div>

            <div>
              <label
                htmlFor="concierge-guests"
                className="block type-eyebrow mb-2.5"
              >
                {t("concierge.guests_label")}
              </label>
              <select
                id="concierge-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full h-12 px-4 bg-paper text-ink border border-rule text-[0.9375rem] focus:outline-none focus:border-ink"
              >
                {guestOptions.map((g) => (
                  <option key={g} value={g}>
                    {t(`concierge.${g}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="concierge-notes"
              className="block type-eyebrow mb-2.5"
            >
              {t("concierge.notes_label")}
            </label>
            <textarea
              id="concierge-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("concierge.notes_placeholder")}
              className="w-full p-4 bg-paper text-ink border border-rule text-[0.9375rem] leading-[1.5] focus:outline-none focus:border-ink resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="btn-primary flex-1 cursor-pointer"
            >
              {t("concierge.submit_whatsapp")}
            </button>
            <button
              type="button"
              onClick={handleEmail}
              className="inline-flex items-center justify-center gap-2 h-14 px-6 border border-rule text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink hover:border-ink transition-colors cursor-pointer"
            >
              <span>{t("concierge.submit_email")}</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
