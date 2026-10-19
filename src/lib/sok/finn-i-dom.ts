/**
 * Finner treff nr. n i brødteksten slik den er tegnet opp, med samme
 * normalisering og samme treffregel som indeksen.
 *
 * Bare tekst inne i [data-sok-tekst] (markdown-delene i PosterBody) teller.
 * Figurer, widgets, skjulte tabelltitler og kodeblokker hoppes over, akkurat
 * som i indeksen.
 */
import { finnTreff, normaliser, type Sporring } from "./normaliser.ts";

const HOPP_OVER =
  "figure, caption, .sr-only, pre, svg, button, script, style, noscript, [aria-hidden='true'], [data-sok-skip]";
const BLOKK = "p, li, h1, h2, h3, h4, h5, h6, td, th, blockquote, dd, dt, div";
/** Skiller blokker, så ord i to avsnitt aldri flyter sammen. Verken ord eller mellomrom. */
const SKILLE = "\u0001";

type Bit = { node: Text; fra: number };

export type DomTekst = {
  tekst: string;
  norm: string;
  biter: Bit[];
};

export function samleTekst(rot: ParentNode = document): DomTekst {
  const deler: string[] = [];
  const biter: Bit[] = [];
  let lengde = 0;
  let forrigeBlokk: Element | null = null;
  const containere = Array.from(rot.querySelectorAll<HTMLElement>("[data-sok-tekst]"));
  for (const c of containere) {
    const walker = document.createTreeWalker(c, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;
          if (el.matches(HOPP_OVER)) return NodeFilter.FILTER_REJECT;
          return el.tagName === "BR" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let n: Node | null;
    while ((n = walker.nextNode())) {
      if (n.nodeType === Node.ELEMENT_NODE) {
        // <br> blir et mellomrom (indeksen gjør hardt linjeskift til mellomrom).
        deler.push(" ");
        lengde += 1;
        continue;
      }
      const text = n as Text;
      const verdi = text.data;
      if (!verdi) continue;
      const blokk = text.parentElement?.closest(BLOKK) ?? null;
      if (blokk !== forrigeBlokk) {
        deler.push(SKILLE);
        lengde += 1;
        forrigeBlokk = blokk;
      }
      biter.push({ node: text, fra: lengde });
      deler.push(verdi);
      lengde += verdi.length;
    }
    deler.push(SKILLE);
    lengde += 1;
    forrigeBlokk = null;
  }
  const tekst = deler.join("");
  return { tekst, norm: normaliser(tekst), biter };
}

function punkt(dom: DomTekst, pos: number, slutt: boolean): { node: Text; offset: number } | null {
  // Binærsøk etter biten som inneholder pos.
  let lo = 0;
  let hi = dom.biter.length - 1;
  let funnet = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (dom.biter[mid]!.fra <= pos) {
      funnet = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  if (funnet < 0) return null;
  let bit = dom.biter[funnet]!;
  // Slutten av et treff kan ligge akkurat på grensen til neste bit.
  if (slutt && pos === bit.fra && funnet > 0) bit = dom.biter[funnet - 1]!;
  const offset = Math.min(pos - bit.fra, bit.node.data.length);
  return { node: bit.node, offset };
}

export function rangeFor(dom: DomTekst, start: number, slutt: number): Range | null {
  const a = punkt(dom, start, false);
  const b = punkt(dom, slutt, true);
  if (!a || !b) return null;
  const range = document.createRange();
  range.setStart(a.node, a.offset);
  range.setEnd(b.node, b.offset);
  return range;
}

export type DomTreff = { start: number; slutt: number };

export function domTreff(dom: DomTekst, sporring: Sporring): DomTreff[] {
  return finnTreff(dom.norm, sporring).map(([start, slutt]) => ({ start, slutt }));
}

/** Teksten i blokken rundt et treff (normalisert), for å kontrollere at vi har riktig setning. */
export function blokkRundt(dom: DomTekst, t: DomTreff): string {
  const fra = dom.norm.lastIndexOf(SKILLE, t.start) + 1;
  const til = dom.norm.indexOf(SKILLE, t.slutt);
  return dom.norm.slice(fra, til < 0 ? undefined : til).replace(/ +/g, " ");
}

/**
 * Velger treffet som skal vises. Vanligvis bare nr. n. Når indeksen er i
 * minnet og setningen ikke stemmer (teksten er endret siden indeksen ble
 * hentet), velges nærmeste treff i en blokk som inneholder setningen.
 */
export function velgTreff(
  dom: DomTekst,
  treff: DomTreff[],
  nr: number,
  forventetSetning?: string,
): DomTreff | null {
  if (treff.length === 0) return null;
  const idx = Math.min(Math.max(nr, 1), treff.length) - 1;
  if (!forventetSetning) return treff[idx]!;
  const mal = normaliser(forventetSetning).replace(/ +/g, " ");
  if (blokkRundt(dom, treff[idx]!).includes(mal)) return treff[idx]!;
  let best: DomTreff | null = null;
  let bestAvstand = Infinity;
  treff.forEach((t, i) => {
    if (!blokkRundt(dom, t).includes(mal)) return;
    const avstand = Math.abs(i - idx);
    if (avstand < bestAvstand) {
      best = t;
      bestAvstand = avstand;
    }
  });
  return best ?? treff[idx]!;
}
