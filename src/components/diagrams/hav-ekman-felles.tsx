/**
 * Felles for ekmanspiralen i Ekman-figuren (hav-ekman.tsx) og fane 1 i EkmanUpwellingModel:
 * stegnavn, nøkkelbilder, vinklene og statustekstene (havstrommer.md l. 62). Teksten er den samme begge steder.
 */
const KILDE = "text-muted-foreground";

export const EKMAN_FASER = ["Vinden", "Overflaten", "Lagene under", "Ekmantransporten"];

/** Tilstand ved slutten av hver fase (indeks = p). */
export const EKMAN_BILDER = [
  { vind: 0, flate: 0, lag: 0, netto: 0 },
  { vind: 1, flate: 0, lag: 0, netto: 0 },
  { vind: 1, flate: 1, lag: 0, netto: 0 },
  { vind: 1, flate: 1, lag: 1, netto: 0 },
  { vind: 1, flate: 1, lag: 1, netto: 1 },
];

/** Vinkel fra vinden for overflaten og lagene under, i grader. Stopper før 180°. Bare 45° merkes. */
export const EKMAN_VINKLER = [45, 72, 98, 122, 144, 162];

/** Statustekst per steg. `side` er «høyre» på den nordlige halvkulen og «venstre» på den sørlige. */
export function ekmanStatus(side: "høyre" | "venstre") {
  return [
    <>Vinden drar i det øverste laget. <span className={KILDE}>(Ekman, 1905)</span></>,
    <>
      Corioliseffekten bøyer laget mot {side}. I Ekmans enkle teori går overflatestrømmen 45 grader til {side} for vinden. I virkeligheten blir vinkelen en annen, ofte mindre.{" "}
      <span className={KILDE}>(Ekman, 1905; Talley mfl., 2011)</span>
    </>,
    <>
      Det øverste laget drar i laget under. Hvert lag lenger ned beveger seg litt saktere og litt mer til {side}. Tegner du strømretningen nedover i dypet, får du ekmanspiralen.{" "}
      <span className={KILDE}>(Ekman, 1905)</span>
    </>,
    <>
      Summerer du alle lagene, går ekmantransporten 90 grader til høyre for vinden på den nordlige halvkulen og 90 grader til venstre på den sørlige.{" "}
      <span className={KILDE}>(Barthel, 2021a)</span>
    </>,
  ];
}
