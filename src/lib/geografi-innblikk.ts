/**
 * Deler kapittel-markdown i vanlig tekst og Innblikk-blokker.
 *
 * En blokk starter på en overskrift «Innblikk: …» (### i kapitlet, ## på undersider, der
 * mellomtitlene er flyttet ett nivå opp) og varer til neste overskrift på samme eller høyere
 * nivå. Avsluttende oppgavelinjer («Tenk over:», «Undersøk casen:») står utenfor boksen, rett
 * etter den. Teksten endres ikke: segmentene satt sammen gir den samme markdownen.
 */
export type InnblikkSegment =
  | { readonly type: "tekst"; readonly value: string }
  | { readonly type: "innblikk"; readonly value: string; readonly tittel: string };

const HEADING = /^(#{1,6})[ \t]+(.*?)[ \t#]*$/;
const INNBLIKK = /^Innblikk:\s*/;
const FENCE = /^\s*(```|~~~)/;
/** Oppgavelinjer som hører etter boksen, også som sitatblokk (`> **Undersøk casen:** …`). */
const OPPGAVE = /^(?:>\s*)?\*\*(?:Tenk over|Undersøk casen)\s*:?\s*\*\*/;

/** Blanklinjeskilte blokker utenfor kodegjerder; returnerer startlinja til hver blokk. */
function blokkStarter(lines: readonly string[]): number[] {
  const starts: number[] = [];
  let inFence = false;
  let forrigeBlank = true;
  lines.forEach((line, i) => {
    const blank = !inFence && line.trim() === "";
    if (!inFence && !blank && forrigeBlank) starts.push(i);
    if (FENCE.test(line)) inFence = !inFence;
    forrigeBlank = blank;
  });
  return starts;
}

/** Flytter avsluttende oppgaveblokker ut av Innblikk-teksten. */
function skillUtOppgaver(lines: string[]): { inne: string[]; etter: string[] } {
  let slutt = lines.length;
  while (slutt > 0 && lines[slutt - 1]!.trim() === "") slutt -= 1;
  const starter = blokkStarter(lines.slice(0, slutt));
  let kutt = slutt;
  for (let i = starter.length - 1; i > 0; i -= 1) {
    if (!OPPGAVE.test(lines[starter[i]!]!)) break;
    kutt = starter[i]!;
  }
  return { inne: lines.slice(0, kutt), etter: lines.slice(kutt) };
}

export function splitInnblikk(markdown: string): InnblikkSegment[] {
  const lines = markdown.split("\n");
  const segmenter: InnblikkSegment[] = [];
  let tekst: string[] = [];
  let blokk: { nivaa: number; tittel: string; lines: string[] } | null = null;
  let inFence = false;

  const lukkBlokk = () => {
    if (!blokk) return;
    const { inne, etter } = skillUtOppgaver(blokk.lines);
    segmenter.push({ type: "innblikk", value: inne.join("\n"), tittel: blokk.tittel });
    tekst = etter;
    blokk = null;
  };
  const lukkTekst = () => {
    if (tekst.length) segmenter.push({ type: "tekst", value: tekst.join("\n") });
    tekst = [];
  };

  for (const line of lines) {
    const heading = inFence ? null : HEADING.exec(line);
    if (FENCE.test(line)) inFence = !inFence;
    if (heading) {
      const nivaa = heading[1]!.length;
      if (blokk && nivaa <= blokk.nivaa) lukkBlokk();
      const tittel = heading[2]!;
      if (!blokk && INNBLIKK.test(tittel)) {
        lukkTekst();
        blokk = { nivaa, tittel: tittel.replace(INNBLIKK, ""), lines: [line] };
        continue;
      }
    }
    if (blokk) blokk.lines.push(line);
    else tekst.push(line);
  }
  lukkBlokk();
  lukkTekst();
  return segmenter;
}
