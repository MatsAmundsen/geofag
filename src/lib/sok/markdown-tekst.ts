/**
 * Lett markdown → ren tekst for søkeindeksen. Bevisst ikke en full parser:
 * remark bruker ~250 ms CPU på alle kapitlene, dette bruker noen få ms.
 *
 * Teksten skal tilsvare det `Markdown`-komponenten viser som brødtekst
 * (overskrifter, avsnitt, lister, sitater og tabellceller). Bilder, figurer,
 * widget-blokker og kodeblokker tas ikke med. Det samme hoppes over i
 * nettleseren når treffet skal finnes (se `sok-hopp.tsx`).
 */

export type TekstBlokk = {
  /** true for overskrifter (#–######). */
  overskrift: boolean;
  tekst: string;
};

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
  shy: "\u00ad",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  laquo: "«",
  raquo: "»",
  deg: "°",
  minus: "−",
  times: "×",
};

function decodeEntities(s: string): string {
  if (!s.includes("&")) return s;
  return s.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);/g, (m, body: string) => {
    if (body[0] === "#") {
      const code =
        body[1] === "x" || body[1] === "X"
          ? parseInt(body.slice(2), 16)
          : parseInt(body.slice(1), 10);
      return Number.isFinite(code) && code > 0 ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[body] ?? m;
  });
}

/** Inline-markdown til ren tekst. */
export function inlineTilTekst(s: string): string {
  let t = s;
  // Rask vei: ren tekst uten markdown-tegn.
  if (!/[`\\[\]!<>*_~&]/.test(t)) return t.replace(/\s+/g, " ").trim();
  // Inline-kode: behold innholdet, uten tolkning av resten.
  const koder: string[] = [];
  if (t.includes("`"))
    t = t.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (_m, _f, inner: string) => {
      koder.push(inner.trim() ? inner.replace(/^ (.*) $/s, "$1") : inner);
      return `\ue000${koder.length - 1}\ue000`;
    });
  // Escapes: \* → *
  const escaped: string[] = [];
  if (t.includes("\\"))
    t = t.replace(/\\([!-/:-@[-`{-~])/g, (_m, ch: string) => {
      escaped.push(ch);
      return `\ue001${escaped.length - 1}\ue001`;
    });
  if (t.includes("[")) {
    // Bilder fjernes helt (de blir figurer, ikke brødtekst).
    t = t.replace(/!\[(?:[^\]\\]|\\.)*\]\((?:[^()\s]|\([^()]*\))*(?:\s+"[^"]*")?\)/g, "");
    t = t.replace(/!\[(?:[^\]\\]|\\.)*\]\[[^\]]*\]/g, "");
    // Lenker: [tekst](url) → tekst, også nøstet én gang.
    for (let i = 0; i < 2; i++) {
      t = t.replace(
        /\[((?:[^\][]|\[[^\]]*\])*)\]\((?:[^()\s]|\([^()]*\))*(?:\s+"[^"]*")?\)/g,
        "$1",
      );
      t = t.replace(/\[((?:[^\][]|\[[^\]]*\])*)\]\[[^\]]*\]/g, "$1");
    }
  }
  if (t.includes("<")) {
    // Autolenker <https://…>
    t = t.replace(/<((?:https?|mailto):[^>\s]+)>/g, "$1");
    // HTML-tagger vises ikke (react-markdown uten rehype-raw dropper dem).
    t = t.replace(/<\/?[A-Za-z][^<>]*>/g, "");
    t = t.replace(/<!--[\s\S]*?-->/g, "");
  }
  // Utheving og gjennomstreking.
  if (t.includes("*") || t.includes("_")) {
    t = t.replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g, "$2");
    // * kan stå inne i ord, _ kan ikke (CommonMark).
    t = t.replace(/\*(?=[^\s*])([^*]*?[^\s*])\*/g, "$1");
    t = t.replace(
      /(^|[^A-Za-z0-9\u00c0-\u024f_])_(?=[^\s_])([^_]*?[^\s_])_(?![A-Za-z0-9\u00c0-\u024f_])/g,
      "$1$2",
    );
  }
  if (t.includes("~")) t = t.replace(/~~(?=\S)([\s\S]*?\S)~~/g, "$1");
  // Harde linjeskift.
  t = t.replace(/ {2,}\n/g, "\n").replace(/\\\n/g, "\n");
  t = decodeEntities(t);
  t = t.replace(/\ue001(\d+)\ue001/g, (_m, i: string) => escaped[Number(i)] ?? "");
  t = t.replace(/\ue000(\d+)\ue000/g, (_m, i: string) => koder[Number(i)] ?? "");
  return t.replace(/\s+/g, " ").trim();
}

const FENCE = /^ {0,3}(`{3,}|~{3,})/;
const HEADING = /^ {0,3}(#{1,6})(?:[ \t]+(.*?))?(?:[ \t]+#+)?[ \t]*$/;
const HR = /^ {0,3}([-*_])(?:[ \t]*\1){2,}[ \t]*$/;
const TABLE_SEP = /^ {0,3}\|?[ \t]*:?-+:?[ \t]*(\|[ \t]*:?-+:?[ \t]*)*\|?[ \t]*$/;
const LIST_ITEM = /^[ \t]*(?:[-*+]|\d{1,9}[.)])(?:[ \t]+|$)/;
const QUOTE = /^ {0,3}>[ \t]?/;

function tabellCeller(line: string): string[] {
  let l = line.trim();
  if (l.startsWith("|")) l = l.slice(1);
  if (l.endsWith("|") && !l.endsWith("\\|")) l = l.slice(0, -1);
  return l
    .split(/(?<!\\)\|/)
    .map((c) => inlineTilTekst(c.replace(/\\\|/g, "|")))
    .filter(Boolean);
}

/** Markdown (uten widget-blokker) til tekstblokker i dokumentrekkefølge. */
export function markdownTilBlokker(markdown: string): TekstBlokk[] {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const out: TekstBlokk[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) {
      const tekst = inlineTilTekst(para.join("\n"));
      if (tekst) out.push({ overskrift: false, tekst });
      para = [];
    }
  };
  let fence: string | null = null;
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]!;
    if (fence) {
      if (raw.trim().startsWith(fence)) fence = null;
      continue;
    }
    const f = FENCE.exec(raw);
    if (f) {
      flush();
      fence = f[1]!;
      continue;
    }
    if (!raw.trim()) {
      flush();
      continue;
    }
    const h = HEADING.exec(raw);
    if (h) {
      flush();
      const tekst = inlineTilTekst(h[2] ?? "");
      if (tekst) out.push({ overskrift: true, tekst });
      continue;
    }
    if (HR.test(raw)) {
      // «---» rett under en tekstlinje er en setext-overskrift, ellers en strek.
      if (para.length && /^ {0,3}-+[ \t]*$/.test(raw)) {
        const tekst = inlineTilTekst(para.join("\n"));
        para = [];
        if (tekst) out.push({ overskrift: true, tekst });
      } else flush();
      continue;
    }
    if (para.length && /^ {0,3}=+[ \t]*$/.test(raw)) {
      const tekst = inlineTilTekst(para.join("\n"));
      para = [];
      if (tekst) out.push({ overskrift: true, tekst });
      continue;
    }
    // Tabell: en rad med | etterfulgt av en skillelinje.
    if (
      raw.includes("|") &&
      i + 1 < lines.length &&
      TABLE_SEP.test(lines[i + 1]!) &&
      lines[i + 1]!.includes("-")
    ) {
      flush();
      for (const c of tabellCeller(raw)) out.push({ overskrift: false, tekst: c });
      i += 1;
      while (i + 1 < lines.length && lines[i + 1]!.trim() && lines[i + 1]!.includes("|")) {
        i += 1;
        for (const c of tabellCeller(lines[i]!)) out.push({ overskrift: false, tekst: c });
      }
      continue;
    }
    let line = raw;
    let nyBlokk = false;
    // Sitater og listepunkter starter en ny blokk (eget <p>/<li> i DOM).
    while (QUOTE.test(line)) {
      line = line.replace(QUOTE, "");
      nyBlokk = true;
    }
    if (LIST_ITEM.test(line)) {
      line = line.replace(LIST_ITEM, "");
      nyBlokk = true;
      const h2 = HEADING.exec(line);
      if (h2) {
        flush();
        const tekst = inlineTilTekst(h2[2] ?? "");
        if (tekst) out.push({ overskrift: true, tekst });
        continue;
      }
    }
    if (nyBlokk) flush();
    para.push(line);
  }
  flush();
  return out;
}

/**
 * Deler en blokk i setninger. Delingen skjer etter . ! ? … når neste ord
 * starter med stor bokstav eller anførselstegn. «f.eks. noe» og «ca. 95 %»
 * deles ikke.
 */
export function delISetninger(tekst: string): string[] {
  return tekst
    .split(/(?<=[.!?…][»”")\]]?)\s+(?=[«"“([]?\p{Lu})/u)
    .map((d) => d.trim())
    .filter(Boolean);
}
