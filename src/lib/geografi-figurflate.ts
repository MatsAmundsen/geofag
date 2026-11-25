/**
 * Hvilken flate hver Geografi-figur står på i lyst tema.
 *
 * Figurene i kapitlene beholder de mørke figurfargene også i lyst tema (styles.css, 5ca7baf). Det
 * passer bare for figurer tegnet for mørk bunn (lys tekst, svg-kit-paletten C). Figurer tegnet for
 * hvit bunn, med mørk tekst som #334155 eller med eget lyst kart, får klassen `geo-lys-flate` og
 * dermed hvit flate i lyst tema. Alle andre figurer har mørk flate.
 *
 * `kilde` er komponentfila og `merke` en tekst som står i figuren (overskrift eller kildelinje).
 */
export type Figurflate = {
  readonly figur: string;
  readonly kilde: string;
  readonly merke: string;
  readonly grunn: string;
};

export const LYSE_FIGURER: readonly Figurflate[] = [
  { figur: "1.9", kilde: "kap1-figurer.tsx", merke: "Figur 1.9 – John Snows kart", grunn: "historisk kart på hvit bunn" },
  { figur: "1.10", kilde: "kap1-figurer.tsx", merke: "Figur 1.10 – Innblikk: to kart", grunn: "lyst kart med mørk tekst" },
  { figur: "3.0", kilde: "indre-valg.tsx", merke: "Figur 3.0. Tektoniske plater", grunn: "USGS-kart på hvit bunn, mørk tekst" },
  { figur: "3.0b", kilde: "skjelv-verdenskart.tsx", merke: "Egen Gall–Peters-projeksjon", grunn: "lyst verdenskart (felles med 6.1)" },
  { figur: "3.9", kilde: "indre-skjulte.tsx", merke: "Figur 3.9 – Plategrenser", grunn: "USGS-kart på hvit bunn" },
  { figur: "4.9", kilde: "landskap-valg.tsx", merke: "Figur 4.9. Vega", grunn: "lyst kart med mørk tekst" },
  { figur: "5.0", kilde: "klima-skjulte.tsx", merke: "Figur 5.0 – Global temperatur", grunn: "mørk tekst #334155 og rød linje for hvit bunn" },
  { figur: "5.11", kilde: "klima-skjulte.tsx", merke: "Figur 5.11", grunn: "lyst kart med mørk tekst" },
  { figur: "6.1", kilde: "skjelv-verdenskart.tsx", merke: "Egen Gall–Peters-projeksjon", grunn: "lyst verdenskart (felles med 3.0b)" },
  { figur: "7.8", kilde: "ressurs-skjulte.tsx", merke: "Figur 7.8", grunn: "lyst kart med mørk tekst" },
  { figur: "8.1", kilde: "baerekraft-skjulte.tsx", merke: "Figur 8.1 –", grunn: "koropletkart på lys bunn" },
  { figur: "8.6", kilde: "baerekraft-skjulte.tsx", merke: "Figur 8.6 –", grunn: "koropletkart på lys bunn" },
  { figur: "9.1", kilde: "naering-skjulte.tsx", merke: "Figur 9.1 –", grunn: "koropletkart på lys bunn" },
  { figur: "9.6", kilde: "naering-valg.tsx", merke: "Figur 9.6", grunn: "koropletkart på lys bunn" },
  { figur: "9.7", kilde: "naering-valg.tsx", merke: "Figur 9.7, stedsdel", grunn: "lyst kart med mørk tekst" },
  { figur: "10.1", kilde: "befolkning-kart.tsx", merke: "Figur 10.1.", grunn: "koropletkart på lys bunn" },
  { figur: "10.7", kilde: "befolkning-kart.tsx", merke: "Figur 10.7", grunn: "koropletkart på lys bunn" },
  { figur: "11.1", kilde: "migrasjon-skjulte.tsx", merke: "Figur 11.1 –", grunn: "koropletkart på lys bunn" },
  { figur: "11.6", kilde: "migrasjon-skjulte.tsx", merke: "Figur 11.6", grunn: "lyst kart med mørk tekst" },
  { figur: "11.7", kilde: "migrasjon-kart.tsx", merke: "Figur 11.7, kartdel", grunn: "koropletkart på lys bunn" },
];

/** Relativ luminans (WCAG 2.x) for en #rrggbb-farge. */
export function luminans(hex: string): number {
  const v = hex.replace("#", "");
  const kanal = (i: number) => {
    const c = parseInt(v.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * kanal(0) + 0.7152 * kanal(2) + 0.0722 * kanal(4);
}

export function kontrast(a: string, b: string): number {
  const [x, y] = [luminans(a), luminans(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
