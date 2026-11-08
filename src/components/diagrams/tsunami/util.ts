import { useEffect, useState, type RefObject } from "react";

/** Tall på norsk: desimalkomma og ekte minustegn. */
export function nb(value: number, digits = 0): string {
  const v = Number.isFinite(value) ? value : 0;
  const s = Math.abs(v).toFixed(digits).replace(".", ",");
  const rounded = Number(Math.abs(v).toFixed(digits));
  return (v < 0 && rounded !== 0 ? "−" : "") + s;
}

/** Runder en forstørrelsesfaktor til et lesbart tall, for eksempel 3 900 → «4 000». */
export function roundFactor(f: number): string {
  if (!Number.isFinite(f) || f <= 0) return "1";
  if (f < 1.5) return "1";
  const exp = Math.floor(Math.log10(f));
  const step = exp >= 2 ? Math.pow(10, exp - 1) : 1;
  const r = Math.max(step, Math.round(f / step) * step);
  return r.toLocaleString("nb-NO").replace(/\u00a0/g, " ");
}

/** `true` når brukeren har bedt om redusert bevegelse. */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduce;
}

/** `true` mens elementet er synlig i vinduet. Brukes for å stoppe tegning utenfor skjermen. */
export function useInView(ref: RefObject<Element | null>): boolean {
  const [seen, setSeen] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => setSeen(entries.some((e) => e.isIntersecting)), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

