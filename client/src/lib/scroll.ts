import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

const HEADER_OFFSET = -72;

/** Smoothly scroll to a section id (uses Lenis when active, native otherwise) and sync URL hash. */
export function scrollToSection(id: string, updateHash = true) {
  const el = document.getElementById(id);
  if (!el) return;
  if (updateHash && typeof window !== "undefined") {
    const url = `${window.location.pathname}${window.location.search}#${id}`;
    window.history.replaceState(null, "", url);
  }
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.6 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (typeof window !== "undefined" && window.location.hash) {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`
    );
  }
  if (lenisInstance) lenisInstance.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export type InquiryTopic = "hiking" | "events" | "suites" | "balsamo" | "dining";

export function openInquiryDialog(topic: InquiryTopic = "hiking") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("chicuinaco:open-inquiry", { detail: { topic } }));
  }
}
