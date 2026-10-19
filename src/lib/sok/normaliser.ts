/**
 * Felles søkelogikk for indeksen (server) og hoppet i kapitlet (nettleser).
 *
 * Begge sider bruker nøyaktig de samme funksjonene, slik at «treff nr. n» i
 * søkeresultatet peker på det samme ordet når kapitlet er tegnet opp.
 *
 * `normaliser` endrer aldri lengden på teksten (ett tegn inn, ett tegn ut).
 * Da kan en treffposisjon i normalisert tekst brukes direkte i originalen.
 */

const KEEP = new Set(["æ", "ø", "å"]);
const DASHES = /[\u2010-\u2015\u2212\u00ad]/;
const QUOTES_SINGLE = /[\u2018\u2019\u201a\u201b\u2032]/;

const charCache = new Map<string, string>();

function normChar(ch: string): string {
  const cached = charCache.get(ch);
  if (cached !== undefined) return cached;
  let out: string;
  if (/\s/.test(ch)) out = " ";
  else if (DASHES.test(ch)) out = "-";
  else if (QUOTES_SINGLE.test(ch)) out = "'";
  else {
    const lower = ch.toLowerCase();
    if (KEEP.has(lower)) out = lower;
    else {
      // NFKD gjør også senket/hevet skrift om til vanlige tegn: CO₂ → co2, km² → km2.
      const base = lower.normalize("NFKD").replace(/\p{M}+/gu, "");
      out = base.length === 1 ? base : lower.length === 1 ? lower : ch;
    }
  }
  charCache.set(ch, out);
  return out;
}

/** Små bokstaver, bort med aksenter (men ikke æ, ø, å), senket/hevet skrift til vanlige tegn, like bindestreker og mellomrom. Samme lengde inn og ut. */
export function normaliser(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    // Rask vei for vanlige ASCII-tegn.
    if (code < 128) {
      if (code >= 65 && code <= 90) out += String.fromCharCode(code + 32);
      else if (code === 9 || code === 10 || code === 13) out += " ";
      else out += text[i];
      continue;
    }
    // Surrogatpar (emoji o.l.) beholdes urørt, ett og ett kodeenhet.
    if (code >= 0xd800 && code <= 0xdfff) {
      out += text[i];
      continue;
    }
    out += normChar(text[i]!);
  }
  return out;
}

/** Vanlige bøyningsendelser på norsk. Lengste først. */
const ENDELSER = ["ene", "ane", "er", "en", "et", "ar", "a", "e"];

/**
 * Enkel stamme for siste ord i søket: «isbreer» → «isbre», «bergartene» → «bergart».
 * Stammen må ha minst fire bokstaver, ellers brukes ordet slik det er.
 */
export function stamme(ord: string): string {
  if (ord.length < 6) return ord;
  for (const e of ENDELSER) {
    if (ord.endsWith(e) && ord.length - e.length >= 4) return ord.slice(0, -e.length);
  }
  return ord;
}

export type Sporring = {
  /** Det brukeren skrev, ryddet (vises i grensesnittet). */
  visning: string;
  /** Ordene etter normalisering. */
  ord: string[];
  /** Regex med flagg g som finner treff i normalisert tekst. */
  regex: RegExp;
  /** Hvor mange tegn stammen kuttet av siste ord (for å kjenne igjen helt ord). */
  kuttet: number;
};

/**
 * Korteste søkeord (i bokstaver) som også gir treff inne i ord. Kortere ord
 * treffer bare hele ord og starten av ord. Mats valgte 3 (18.10): «is» treffer
 * bare helt ord og ordstart, mens «bre» og «elv» også treffer inne i ord
 * («isbreen», «dalbre», «jordskjelv»). 2 = treff inne i ord alltid.
 */
export const MIN_INNI_ORD_LENGDE = 3;

/** Hvor godt et treff passer: 0 = helt ord, 1 = starten av et ord, 2 = inne i et ord. */
export type Kvalitet = 0 | 1 | 2;

/** Vekt per kvalitet når kapitler og setninger rangeres. */
export const KVALITET_VEKT: Record<Kvalitet, number> = { 0: 3, 1: 2, 2: 1 };

const ORD = /[\p{L}\p{N}][\p{L}\p{N}'-]*/gu;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Lager søket. Treffet kan stå hvor som helst i et ord, så «bre» finner
 * både «breen», «isbreer» og «dalbre». Siste ord treffer også bøyde former
 * via `stamme`. Flere ord må stå etter hverandre i samme setning; ord i
 * midten må være hele ord, og første ord må slutte der ordet slutter.
 * Returnerer null når søket er for kort.
 */
export function lagSporring(input: string, minLengde = 2): Sporring | null {
  const norm = normaliser(input.trim());
  const ord = norm.match(ORD) ?? [];
  if (ord.length === 0) return null;
  const samlet = ord.join(" ");
  if (samlet.length < minLengde) return null;
  const siste = ord[ord.length - 1]!;
  const stammet = stamme(siste);
  const deler = ord.map((o, i) => {
    const last = i === ord.length - 1;
    const kjerne = last ? stammet : o;
    // Ord før det siste må slutte ved ordgrensen, ord i midten må også starte der.
    // Første ord kan stå inne i et ord når det er langt nok (MIN_INNI_ORD_LENGDE).
    const inni = i === 0 && o.length >= MIN_INNI_ORD_LENGDE;
    const foran = inni ? "" : "(?<![\\p{L}\\p{N}])";
    return foran + escapeRegExp(kjerne) + (last ? "" : "(?![\\p{L}\\p{N}])");
  });
  return {
    visning: input.trim().replace(/\s+/g, " "),
    ord,
    regex: new RegExp(deler.join("[ ]+"), "gu"),
    kuttet: siste.length - stammet.length,
  };
}

const ORDTEGN = /[\p{L}\p{N}]/u;

function erOrdtegn(ch: string | undefined): boolean {
  if (ch === undefined) return false;
  const c = ch.charCodeAt(0);
  // Rask vei for a–z og 0–9.
  if ((c >= 97 && c <= 122) || (c >= 48 && c <= 57)) return true;
  if (c < 128) return false;
  return ORDTEGN.test(ch);
}

/**
 * Alle treff i en normalisert tekst, som [start, slutt, kvalitet). Treffet
 * utvides til hele ordet det står i, så «dalbre» og «magmatisk» markeres
 * som hele ord. Ett ord gir høyst ett treff, slik at nummereringen er lik i
 * indeksen og på siden.
 */
export function finnTreff(norm: string, sporring: Sporring): Array<[number, number, Kvalitet]> {
  const out: Array<[number, number, Kvalitet]> = [];
  const re = new RegExp(sporring.regex.source, "gu");
  let m: RegExpExecArray | null;
  while ((m = re.exec(norm))) {
    const mStart = m.index;
    const mSlutt = mStart + m[0].length;
    let start = mStart;
    while (start > 0 && erOrdtegn(norm[start - 1])) start--;
    let slutt = mSlutt;
    while (slutt < norm.length && erOrdtegn(norm[slutt])) slutt++;
    const kvalitet: Kvalitet =
      start !== mStart ? 2 : slutt === mSlutt || slutt === mSlutt + sporring.kuttet ? 0 : 1;
    out.push([start, slutt, kvalitet]);
    re.lastIndex = Math.max(slutt, mStart + 1);
  }
  return out;
}
