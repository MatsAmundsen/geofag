/**
 * Søk i nettleseren. Indeksen hentes én gang (lat lasting når søkefeltet
 * åpnes) og holdes i minnet for resten av besøket.
 */
import type { SokIndeks, SokKapittel } from "./indeks.ts";
import {
  finnTreff,
  KVALITET_VEKT,
  lagSporring,
  normaliser,
  type Kvalitet,
  type Sporring,
} from "./normaliser.ts";

export type ForberedtKapittel = SokKapittel & {
  /** normalisert tekst per setning, samme lengde som originalen */
  n: string[];
};

export type ForberedtIndeks = {
  v: string;
  k: ForberedtKapittel[];
  /** ms brukt på henting + forberedelse (for måling) */
  lastetMs: number;
};

let lasting: Promise<ForberedtIndeks> | null = null;
let ferdig: ForberedtIndeks | null = null;

/** Indeksen hvis den allerede er lastet (brukes av hoppet for å kontrollere treffet). */
export function lastetIndeks(): ForberedtIndeks | null {
  return ferdig;
}

export function lastSokIndeks(): Promise<ForberedtIndeks> {
  if (lasting) return lasting;
  const t0 = performance.now();
  lasting = fetch("/api/sok-indeks", { headers: { accept: "application/json" } })
    .then(async (res) => {
      if (!res.ok) throw new Error(`Søkeindeksen svarte ${res.status}`);
      const data = (await res.json()) as SokIndeks;
      const k = data.k.map((kap) => ({ ...kap, n: kap.x.map(normaliser) }));
      ferdig = { v: data.v, k, lastetMs: performance.now() - t0 };
      return ferdig;
    })
    .catch((err) => {
      lasting = null;
      throw err;
    });
  return lasting;
}

export type TreffIOrd = {
  /** treff nr. i kapitlet, fra 1 (brukes i lenken) */
  nr: number;
  start: number;
  slutt: number;
  /** 0 = helt ord, 1 = starten av et ord, 2 = inne i et ord */
  kvalitet: Kvalitet;
};

export type TreffRad = {
  setning: string;
  /** nærmeste overskrift over setningen */
  overskrift: string;
  erOverskrift: boolean;
  treff: TreffIOrd[];
  /** beste (laveste) kvalitet i setningen */
  beste: Kvalitet;
};

export type KapittelTreff = {
  kapittel: ForberedtKapittel;
  antall: number;
  /** vektet poengsum: helt ord teller mest, treff inne i et ord minst */
  poeng: number;
  rader: TreffRad[];
};

export type SokResultat = {
  sporring: Sporring;
  gjeldende: KapittelTreff | null;
  g1: KapittelTreff[];
  g2: KapittelTreff[];
  antall: number;
  kapitler: number;
  ms: number;
};

/**
 * Alle treff i ett kapittel, nummerert i dokumentrekkefølge (nr brukes i
 * lenken og må stemme med siden). Setningene sorteres etter beste treff,
 * så hele ord kommer før treff inne i lengre ord; ellers dokumentrekkefølge.
 */
export function treffIKapittel(kap: ForberedtKapittel, sporring: Sporring): KapittelTreff | null {
  const rader: TreffRad[] = [];
  let nr = 0;
  let poeng = 0;
  let overskrift = "";
  const erOverskrift = new Set(kap.o);
  for (let i = 0; i < kap.n.length; i++) {
    const heading = erOverskrift.has(i);
    if (heading) overskrift = kap.x[i]!;
    const funn = finnTreff(kap.n[i]!, sporring);
    if (funn.length === 0) continue;
    let beste: Kvalitet = 2;
    const treff = funn.map(([start, slutt, kvalitet]) => {
      poeng += KVALITET_VEKT[kvalitet];
      if (kvalitet < beste) beste = kvalitet;
      return { nr: ++nr, start, slutt, kvalitet };
    });
    rader.push({
      setning: kap.x[i]!,
      overskrift: heading ? "" : overskrift,
      erOverskrift: heading,
      treff,
      beste,
    });
  }
  if (!nr) return null;
  // Stabil sortering: beste kvalitet først, ellers rekkefølgen i kapitlet.
  rader.sort((a, b) => a.beste - b.beste);
  return { kapittel: kap, antall: nr, poeng, rader };
}

export function sok(
  indeks: ForberedtIndeks,
  tekst: string,
  opts: { gjeldendeSlug?: string; bareGjeldende?: boolean } = {},
): SokResultat | null {
  const t0 = performance.now();
  const sporring = lagSporring(tekst);
  if (!sporring) return null;
  let gjeldende: KapittelTreff | null = null;
  const g1: KapittelTreff[] = [];
  const g2: KapittelTreff[] = [];
  let antall = 0;
  let kapitler = 0;
  for (const kap of indeks.k) {
    const erGjeldende = kap.s === opts.gjeldendeSlug;
    if (opts.bareGjeldende && !erGjeldende) continue;
    const t = treffIKapittel(kap, sporring);
    if (!t) continue;
    antall += t.antall;
    kapitler += 1;
    if (erGjeldende) gjeldende = t;
    else (kap.g === 1 ? g1 : g2).push(t);
  }
  // Høyest poengsum først (helt ord > ordstart > inne i ord), ellers rekkefølgen i læreplanen.
  const sorter = (a: KapittelTreff, b: KapittelTreff) => b.poeng - a.poeng;
  g1.sort(sorter);
  g2.sort(sorter);
  return { sporring, gjeldende, g1, g2, antall, kapitler, ms: performance.now() - t0 };
}

/** Lenke til treffet på kapittelsiden. */
export function treffLenke(kap: SokKapittel, sok: string, nr: number) {
  return { to: kap.p, search: { sok, treff: nr } } as const;
}
