/**
 * Terreng-kit: nøkkelbilder. For hver fase lages noen få nøkkelbilder (canvas), lat og i ledige
 * øyeblikk, delt opp i små biter, så ingen oppgave blir lang. Brukes av terreng-figur.tsx.
 */
import { useEffect, useRef, useState } from "react";

/* ---------- planlegger for ledige øyeblikk ---------- */

type Ledig = { timeRemaining: () => number };
const harIdle = typeof window !== "undefined" && "requestIdleCallback" in window;
function vedLedig(fn: (d: Ledig) => void) {
  if (harIdle) {
    const id = window.requestIdleCallback(fn, { timeout: 120 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(() => {
    const slutt = performance.now() + 8;
    fn({ timeRemaining: () => Math.max(0, slutt - performance.now()) });
  }, 16);
  return () => clearTimeout(id);
}

/** Hvor lenge én omgang i ledig tid eller i et bilde får tegne (ms), så ingen oppgave blir lang ved 4x CPU. */
const BUDSJETT = 8;

/** Neste bilde (rask): brukes når figuren står stille og venter på et bilde. */
function vedNesteBilde(fn: (d: Ledig) => void) {
  if (typeof requestAnimationFrame === "undefined") return vedLedig(fn);
  const id = requestAnimationFrame(() => {
    const slutt = performance.now() + BUDSJETT;
    fn({ timeRemaining: () => Math.max(0, slutt - performance.now()) });
  });
  return () => cancelAnimationFrame(id);
}

/* ---------- nøkkelbilder ---------- */

export type BildeJobb = (ctx: CanvasRenderingContext2D) => Generator<void, unknown, void>;

type Bilde = { canvas: HTMLCanvasElement; jobb: Generator<void, unknown, void> | null; brukt: number };

/**
 * Lager og husker nøkkelbilder. `lag(nokkel)` gir en tegnejobb for nøkkelen. Bildene er
 * `bredde × hoyde` viewBox-enheter, i `skala` CSS-piksler per enhet (ganger enhetens pikseltetthet,
 * maks 1,5). Når størrelsen endres, kastes alle bildene.
 */
export class NokkelbildeLager {
  private bilder = new Map<string, Bilde>();
  private ko: string[] = [];
  private stopp: (() => void) | null = null;
  private teller = 0;
  /** Køen haster (figuren står stille uten bilde): tegnes i biter i hvert bilde, ikke bare i ledig tid. */
  private haster = false;
  constructor(
    private lag: (nokkel: string) => BildeJobb,
    private bredde: number,
    private hoyde: number,
    private skala: number,
    private varsle: () => void,
    private maks = 10,
  ) {}

  private nytt(nokkel: string): Bilde {
    const dpr = Math.min(1.5, typeof window === "undefined" ? 1 : window.devicePixelRatio || 1);
    const k = this.skala * dpr;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(this.bredde * k));
    canvas.height = Math.max(1, Math.round(this.hoyde * k));
    const ctx = canvas.getContext("2d");
    if (!ctx) return { canvas, jobb: null, brukt: ++this.teller };
    ctx.setTransform(k, 0, 0, k, 0, 0);
    const b: Bilde = { canvas, jobb: this.lag(nokkel)(ctx), brukt: ++this.teller };
    this.bilder.set(nokkel, b);
    this.rydd();
    return b;
  }

  private rydd() {
    if (this.bilder.size <= this.maks) return;
    const eldst = [...this.bilder.entries()].filter(([n]) => !this.ko.includes(n)).sort((a, b) => a[1].brukt - b[1].brukt);
    for (const [n] of eldst.slice(0, this.bilder.size - this.maks)) this.bilder.delete(n);
  }

  /** Ferdig bilde, eller null. */
  hent(nokkel: string): HTMLCanvasElement | null {
    const b = this.bilder.get(nokkel);
    if (!b || b.jobb) return null;
    b.brukt = ++this.teller;
    return b.canvas;
  }

  /** Tegner et bilde ferdig med en gang (når figuren står stille og brukeren venter på det). */
  tving(nokkel: string): HTMLCanvasElement | null {
    const b = this.bilder.get(nokkel) ?? this.nytt(nokkel);
    while (b.jobb) {
      if (b.jobb.next().done) b.jobb = null;
    }
    b.brukt = ++this.teller;
    return b.canvas;
  }

  /** Ønskede bilder, viktigst først. Lages i ledige øyeblikk. */
  bestill(nokler: string[]) {
    this.ko = nokler.filter((n) => !this.hent(n));
    this.haster = false;
    if (this.ko.length && !this.stopp) this.kjor();
  }

  /**
   * Som `tving`, men i biter over flere bilder i stedet for i én lang oppgave: bildene legges først i
   * køen og tegnes i hvert bilde (maks BUDSJETT ms) til de er ferdige. `varsle` sier fra når de er klare.
   */
  hast(nokler: string[]) {
    const mangler = nokler.filter((n) => !this.hent(n));
    if (!mangler.length) return;
    this.ko = [...mangler, ...this.ko.filter((n) => !mangler.includes(n))];
    if (!this.haster) {
      this.haster = true;
      this.stopp?.();
      this.stopp = null;
    }
    if (!this.stopp) this.kjor();
  }

  private kjor() {
    const planlegg = this.haster ? vedNesteBilde : vedLedig;
    this.stopp = planlegg((frist) => {
      this.stopp = null;
      let ferdige = 0;
      // ledig tid kan vare opptil 50 ms; tegn likevel bare BUDSJETT ms per omgang
      const slutt = performance.now() + BUDSJETT;
      while (this.ko.length && frist.timeRemaining() > 3 && performance.now() < slutt) {
        const n = this.ko[0];
        const b = this.bilder.get(n) ?? this.nytt(n);
        if (!b.jobb || b.jobb.next().done) {
          b.jobb = null;
          this.ko.shift();
          ferdige++;
        }
      }
      if (ferdige) this.varsle();
      if (!this.ko.length) this.haster = false;
      if (this.ko.length) this.kjor();
    });
  }

  avslutt() {
    this.stopp?.();
    this.stopp = null;
    this.bilder.clear();
    this.ko = [];
  }
}

/**
 * Nøkkelbilder for en figur: lageret byttes når størrelsen endres. `versjon` øker når et nytt
 * bilde er ferdig, så figuren rendres på nytt.
 */
export function useNokkelbilder(lag: (nokkel: string) => BildeJobb, bredde: number, hoyde: number, skala: number, aktiv: boolean) {
  const [versjon, setVersjon] = useState(0);
  const lagRef = useRef(lag);
  lagRef.current = lag;
  const [lager, setLager] = useState<NokkelbildeLager | null>(null);
  useEffect(() => {
    if (!aktiv || !(skala > 0)) return;
    const l = new NokkelbildeLager((n) => lagRef.current(n), bredde, hoyde, Math.round(skala * 1000) / 1000, () => setVersjon((v) => v + 1));
    setLager(l);
    return () => l.avslutt();
  }, [aktiv, bredde, hoyde, skala]);
  return { lager, versjon };
}
