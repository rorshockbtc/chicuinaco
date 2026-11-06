import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue
} from "framer-motion";
import { setLenis } from "@/lib/scroll";

/** Editorial easing — slow, soft settle. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------
   SmoothScroll — Lenis weighted scrolling (desktop pointer devices only)
   Disabled on touch, mobile, and low-end devices to prevent scroll jank
   ------------------------------------------------------------------------- */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    // Disable on touch devices and low-spec hardware (concurrency < 4)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isLowPower = typeof navigator !== "undefined" && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    if (reduce || isTouch || isLowPower) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduce]);

  return <>{children}</>;
}

/* -------------------------------------------------------------------------
   RevealText — words rise from behind a mask, staggered.
   Uses transform/translate-y only for zero layout shifts and 60fps GPU execution
   ------------------------------------------------------------------------- */
export function RevealText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.04,
  italicWords = [],
  immediate = false
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  italicWords?: number[];
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const reduce = useReducedMotion();
  const show = immediate || inView;
  const words = text.split(" ");
  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag ref={ref as any} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            className={`inline-block ${italicWords.includes(i) ? "italic" : ""}`}
            initial={reduce ? { opacity: 0 } : { y: "105%" }}
            animate={show ? (reduce ? { opacity: 1 } : { y: "0%" }) : undefined}
            transition={{ duration: 0.85, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------
   FadeIn — crisp opacity + transform (no CPU-expensive blur filters)
   ------------------------------------------------------------------------- */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 12
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
   RevealImage — clip-path curtain + settle scale, optional parallax drift
   ------------------------------------------------------------------------- */
export function RevealImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  parallax = 0,
  delay = 0,
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  parallax?: number;
  delay?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden photo-grade ${className}`}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        style={reduce || !parallax ? undefined : { y }}
        initial={reduce ? undefined : { scale: 1.08 }}
        whileInView={reduce ? undefined : { scale: parallax ? 1.05 : 1 }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{ duration: 1.4, ease: EASE, delay }}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
   Hairline — 1px rule that draws in smoothly
   ------------------------------------------------------------------------- */
export function Hairline({
  className = "",
  delay = 0
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px w-full origin-left ${className}`}
      style={{ backgroundColor: "var(--a-rule-strong)" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{ duration: 1.0, ease: EASE, delay }}
    />
  );
}

/* -------------------------------------------------------------------------
   Eyebrow — label with drawn rule
   ------------------------------------------------------------------------- */
export function Eyebrow({
  index,
  children,
  className = "",
  light = false
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 type-eyebrow ${
        light ? "!text-white/80" : ""
      } ${className}`}
    >
      <motion.span
        aria-hidden="true"
        className="block h-px w-10 origin-left"
        style={{ backgroundColor: "currentColor" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      {index && <span className="tabular-nums">{index}</span>}
      {index && <span aria-hidden="true">/</span>}
      <span>{children}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Parallax
   ------------------------------------------------------------------------- */
export function useParallax(
  ref: React.RefObject<HTMLElement>,
  distance = 40
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
}

/* -------------------------------------------------------------------------
   GhostNumeral — subtle section numeral
   ------------------------------------------------------------------------- */
export function GhostNumeral({
  n,
  className = ""
}: {
  n: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const y = useParallax(ref as React.RefObject<HTMLElement>, 50);
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={reduce ? undefined : { y }}
      className={`type-numeral pointer-events-none select-none leading-none text-[clamp(9rem,22vw,20rem)] text-ink opacity-[0.05] ${className}`}
    >
      {n}
    </motion.div>
  );
}
