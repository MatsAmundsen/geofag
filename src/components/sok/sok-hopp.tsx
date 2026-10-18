import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { domTreff, rangeFor, samleTekst, velgTreff } from "@/lib/sok/finn-i-dom";
import { lastetIndeks, treffIKapittel } from "@/lib/sok/klient";
import { lagSporring } from "@/lib/sok/normaliser";

type CssHighlights = {
  set: (name: string, h: unknown) => void;
  delete: (name: string) => void;
};

function highlights(): { reg: CssHighlights; Ctor: new (...r: Range[]) => unknown } | null {
  const css = (globalThis as { CSS?: { highlights?: CssHighlights } }).CSS;
  const Ctor = (globalThis as { Highlight?: new (...r: Range[]) => unknown }).Highlight;
  return css?.highlights && Ctor ? { reg: css.highlights, Ctor } : null;
}

const VISES_MS = 3500;
const FADE_MS = 900;
const VENT_MAKS_MS = 10_000;

let ryddForrige: (() => void) | null = null;

/**
 * Markerer ordet uten å endre DOM-en React eier: CSS Custom Highlight API
 * farger selve teksten, og et eget lag over siden tegner en ring rundt.
 */
function visMarkering(range: Range, redusert: boolean): () => void {
  ryddForrige?.();
  const hl = highlights();
  if (hl) hl.reg.set("sok-treff", new hl.Ctor(range));

  const lag = document.createElement("div");
  lag.className = "sok-markering-lag";
  lag.setAttribute("aria-hidden", "true");
  document.body.appendChild(lag);
  const tegn = () => {
    const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0);
    lag.replaceChildren(
      ...rects.map((r) => {
        const d = document.createElement("div");
        d.className = redusert ? "sok-markering" : "sok-markering sok-markering--puls";
        d.style.left = `${r.left + window.scrollX - 3}px`;
        d.style.top = `${r.top + window.scrollY - 2}px`;
        d.style.width = `${r.width + 6}px`;
        d.style.height = `${r.height + 4}px`;
        return d;
      }),
    );
  };
  tegn();
  const ro = new ResizeObserver(tegn);
  ro.observe(document.body);
  window.addEventListener("resize", tegn);

  const timers: number[] = [];
  timers.push(
    window.setTimeout(() => {
      lag.classList.add("sok-markering-lag--borte");
      if (hl) hl.reg.set("sok-treff-svak", new hl.Ctor(range));
      if (hl) hl.reg.delete("sok-treff");
    }, VISES_MS),
  );
  const rydd = () => {
    timers.forEach((t) => window.clearTimeout(t));
    ro.disconnect();
    window.removeEventListener("resize", tegn);
    lag.remove();
    if (hl) {
      hl.reg.delete("sok-treff");
      hl.reg.delete("sok-treff-svak");
    }
    if (ryddForrige === rydd) ryddForrige = null;
  };
  timers.push(window.setTimeout(rydd, VISES_MS + FADE_MS));
  ryddForrige = rydd;
  return rydd;
}

function sentrer(range: Range) {
  const r = range.getBoundingClientRect();
  const top = r.top + window.scrollY - window.innerHeight / 2 + r.height / 2;
  // «instant» overstyrer scroll-behavior: smooth på <html>. Raskt, og uten bevegelse.
  window.scrollTo({ top: Math.max(0, top), behavior: "instant" as ScrollBehavior });
}

function lesSok(search: unknown): { sok: string; treff: number } | null {
  const s = (search ?? {}) as Record<string, unknown>;
  if (s.sok === undefined || s.sok === null || s.sok === "") return null;
  const sok = String(s.sok);
  const treff = Math.max(1, Math.floor(Number(s.treff) || 1));
  return { sok, treff };
}

/**
 * Leser ?sok=<ord>&treff=<n> på kapittelsiden, venter til brødteksten er
 * tegnet, og hopper til treff nr. n og markerer det i noen sekunder.
 */
export function SokHopp({ slug }: { slug?: string }) {
  const search = useRouterState({ select: (s) => s.location.search });
  const href = useRouterState({ select: (s) => s.location.href });
  const [melding, setMelding] = useState("");
  const params = lesSok(search);

  useEffect(() => {
    if (!params) return;
    const sporring = lagSporring(params.sok);
    if (!sporring) return;
    const redusert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let avbrutt = false;
    let brukerHarScrollet = false;
    const start = performance.now();
    const stoppVed = () => {
      brukerHarScrollet = true;
    };
    window.addEventListener("wheel", stoppVed, { passive: true });
    window.addEventListener("touchstart", stoppVed, { passive: true });
    window.addEventListener("keydown", stoppVed);

    let obs: MutationObserver | null = null;
    let ventTimer = 0;
    let rydd: (() => void) | null = null;
    const sjekkTimers: number[] = [];

    const forsok = (): boolean => {
      if (avbrutt) return true;
      const dom = samleTekst();
      if (!dom.biter.length) return false;
      const treff = domTreff(dom, sporring);
      if (!treff.length) {
        // Teksten kan fortsatt være på vei (kapitlet hentes etter første visning).
        if (performance.now() - start < VENT_MAKS_MS) return false;
        setMelding(`Fant ikke «${params.sok}» i teksten.`);
        return true;
      }
      // Kontroller mot setningen i indeksen når den er i minnet.
      let forventet: string | undefined;
      const indeks = lastetIndeks();
      const kap = indeks?.k.find((k) => k.s === slug);
      if (kap) {
        const kt = treffIKapittel(kap, sporring);
        forventet = kt?.rader.find((r) => r.treff.some((t) => t.nr === params.treff))?.setning;
      }
      const valgt = velgTreff(dom, treff, params.treff, forventet);
      if (!valgt) return false;
      const range = rangeFor(dom, valgt.start, valgt.slutt);
      if (!range) return false;
      sentrer(range);
      rydd = visMarkering(range, redusert);
      const nr = treff.indexOf(valgt) + 1;
      setMelding(`Treff ${nr} av ${treff.length} for «${params.sok}».`);
      performance.mark("sok-markert");
      try {
        performance.measure("sok-hopp", {
          start: performance.getEntriesByName("sok-klikk").at(-1)?.startTime ?? start,
        });
      } catch {
        /* eldre nettlesere */
      }
      // Gi tastaturbrukere fokus på avsnittet, uten å scrolle på nytt.
      const blokk = (range.startContainer.parentElement?.closest(
        "p, li, h1, h2, h3, h4, h5, h6, td, th, blockquote",
      ) ?? null) as HTMLElement | null;
      if (blokk) {
        if (!blokk.hasAttribute("tabindex")) {
          blokk.setAttribute("tabindex", "-1");
          blokk.addEventListener("blur", () => blokk.removeAttribute("tabindex"), { once: true });
        }
        blokk.focus({ preventScroll: true });
      }
      // Figurer lenger opp kan endre høyde rett etterpå. Hold treffet i midten en liten stund.
      for (const ms of [150, 400, 800, 1400]) {
        sjekkTimers.push(
          window.setTimeout(() => {
            if (avbrutt || brukerHarScrollet) return;
            const r = range.getBoundingClientRect();
            const midt = window.innerHeight / 2;
            if (Math.abs(r.top + r.height / 2 - midt) > window.innerHeight * 0.2) sentrer(range);
          }, ms),
        );
      }
      return true;
    };

    const kjor = () => {
      if (forsok()) {
        obs?.disconnect();
        obs = null;
        window.clearTimeout(ventTimer);
      }
    };

    // Første forsøk etter neste tegning.
    const raf = requestAnimationFrame(() => {
      if (forsok()) return;
      obs = new MutationObserver(() => {
        window.clearTimeout(ventTimer);
        ventTimer = window.setTimeout(kjor, 50);
      });
      obs.observe(document.body, { childList: true, subtree: true, characterData: true });
      ventTimer = window.setTimeout(kjor, 300);
      sjekkTimers.push(
        window.setTimeout(() => {
          if (obs) {
            obs.disconnect();
            obs = null;
            kjor();
          }
        }, VENT_MAKS_MS + 100),
      );
    });

    return () => {
      avbrutt = true;
      cancelAnimationFrame(raf);
      obs?.disconnect();
      window.clearTimeout(ventTimer);
      sjekkTimers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("wheel", stoppVed);
      window.removeEventListener("touchstart", stoppVed);
      window.removeEventListener("keydown", stoppVed);
      rydd?.();
    };
    // params er avledet av href
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href, slug]);

  return (
    <p className="sr-only" role="status" aria-live="polite">
      {melding}
    </p>
  );
}
