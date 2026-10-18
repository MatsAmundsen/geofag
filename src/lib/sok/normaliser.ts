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
      const base = lower.normalize("NFD").replace(/\p{M}+/gu, "");
      out = base.length === 1 ? base : lower.length === 1 ? lower : ch;
    }
  }
  charCache.set(ch, out);
  return out;
}

/** Små bokstaver, bort med aksenter (men ikke æ, ø, å), like bindestreker og mellomrom. Samme lengde inn og ut. */
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
};

const ORD = /[\p{L}\p{N}][\p{L}\p{N}'-]*/gu;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Lager søket. Treff må starte ved begynnelsen av et ord. Siste ord treffer
 * også lengre ord (prefiks) og bøyde former via `stamme`: «magma» finner
 * «magmaen» og «magmatisk». Flere ord må stå etter hverandre i samme setning.
 * Returnerer null når søket er for kort.
 */
export function lagSporring(input: string, minLengde = 2): Sporring | null {
  const norm = normaliser(input.trim());
  const ord = norm.match(ORD) ?? [];
  if (ord.length === 0) return null;
  const samlet = ord.join(" ");
  if (samlet.length < minLengde) return null;
  const deler = ord.map((o, i) => {
    const last = i === ord.length - 1;
    const kjerne = last ? stamme(o) : o;
    // Ikke-siste ord må være hele ord.
    return escapeRegExp(kjerne) + (last ? "" : "(?![\\p{L}\\p{N}])");
  });
  const kilde = `(?<![\\p{L}\\p{N}])${deler.join("[ ]+")}`;
  return {
    visning: input.trim().replace(/\s+/g, " "),
    ord,
    regex: new RegExp(kilde, "gu"),
  };
}

/** Lengden på treffet utvides til slutten av ordet, så hele «magmatisk» markeres. */
function ordSlutt(norm: string, fra: number): number {
  let i = fra;
  while (i < norm.length && /[\p{L}\p{N}]/u.test(norm[i]!)) i++;
  return i;
}

/** Alle treff i en normalisert tekst, som [start, slutt) med hele siste ord tatt med. */
export function finnTreff(norm: string, sporring: Sporring): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  const re = new RegExp(sporring.regex.source, "gu");
  let m: RegExpExecArray | null;
  while ((m = re.exec(norm))) {
    const start = m.index;
    const end = ordSlutt(norm, start + m[0].length);
    out.push([start, end]);
    if (re.lastIndex <= start) re.lastIndex = start + 1;
  }
  return out;
}
