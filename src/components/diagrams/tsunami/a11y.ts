import { nb } from "./util";

/*
 * Korte statustekster for skjermlesere i M1–M3. De leses opp i en aria-live-region
 * når modellen går over i en ny fase, når brukeren tar et steg eller setter avspillingen
 * på pause. Under avspilling endres teksten bare ved faseskifte, så den ikke leses opp
 * for hvert bilde. Tall og tid tas med når avspillingen står stille.
 */

const join = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

export type SourceStatus = {
  stage: "før" | "etter";
  playing: boolean;
  /** Simulert tid i sekunder. */
  time: number;
  end: number;
  up: number;
  down: number;
  /** −1 dalen kom først til kysten, 1 toppen, 0 ingen ennå. */
  first: number;
};

export function sourceStatus(s: SourceStatus): string {
  if (s.stage === "før") return "Før skjelvet. Havet er i ro.";
  const flat = s.up < 0.1 && s.down > -0.1;
  const phase =
    s.time < 60
      ? flat
        ? "Skjelvet har skjedd, men havbunnen er nesten ikke løftet eller senket, så vannet får nesten ingen dytt."
        : `Skjelvet har skjedd. Havbunnen er løftet opptil ${nb(s.up, 1)} m og senket opptil ${nb(Math.abs(s.down), 1)} m, og vannflaten har fått samme form.`
      : s.first < 0
        ? "Dalen har nådd kysten først, så havet trekker seg tilbake før vannet stiger."
        : s.first > 0
          ? "Toppen har nådd kysten først."
          : flat
            ? "Vannflaten er nesten i ro."
            : "Bølgen har delt seg. Én del går ut mot havet og én del inn mot land.";
  const done = s.time >= s.end ? "Avspillingen er ferdig." : "";
  return join(phase, done, !s.playing && `Simulert tid ${nb(s.time / 60, 1)} min.`);
}

export type ShoalStatus = {
  playing: boolean;
  time: number;
  end: number;
  /** Dypet der bølgen er høyest nå, i meter. */
  crestDepth: number;
  /** Bølgen har nådd kysten. */
  atCoast: boolean;
};

const roundDepth = (d: number) => (d >= 1000 ? Math.round(d / 100) * 100 : Math.round(d / 10) * 10);

export function shoalStatus(s: ShoalStatus): string {
  const where = s.atCoast
    ? "Bølgen har nådd kysten."
    : s.time <= 0
      ? `Bølgen står klar ute på dypt hav, ${nb(roundDepth(s.crestDepth))} m dyp.`
      : s.crestDepth > 1000
        ? "Bølgen er på dypt hav."
        : s.crestDepth > 200
          ? "Bølgen er over kontinentalskråningen og går saktere."
          : "Bølgen er inne på sokkelen. Den går sakte og blir kortere og høyere.";
  const done = s.time >= s.end ? "Avspillingen er ferdig." : "";
  const detail =
    !s.playing && s.time > 0 && !s.atCoast
      ? `Den høyeste delen er på om lag ${nb(roundDepth(s.crestDepth))} m dyp.`
      : "";
  return join(where, detail, done, !s.playing && `Simulert tid ${nb(s.time / 3600, 1)} t.`);
}

export type RunupStatus = {
  playing: boolean;
  time: number;
  end: number;
  reached: boolean;
  first: number;
  runup: number;
  reach: number;
  house: number;
};

export function runupStatus(s: RunupStatus): string {
  const phase =
    s.time <= 0
      ? "Bølgen er ute på 30 m dyp og har ikke nådd stranda."
      : !s.reached
        ? s.first < 0
          ? "Vannet trekker seg tilbake ved stranda før bølgetoppen kommer."
          : "Bølgen er på vei inn mot stranda."
        : s.time >= s.end
          ? "Bølgen har skylt inn over land og trukket seg tilbake."
          : s.house > 0.02
            ? "Vannet har nådd huset."
            : "Vannet skyller inn over stranda.";
  const numbers =
    !s.playing && s.reached
      ? `Oppskylling ${nb(s.runup, 1)} m, inntrenging ${nb(s.reach)} m, vanndyp ved huset ${s.house > 0.02 ? `${nb(s.house, 1)} m` : "0 m"}.`
      : "";
  const done = s.time >= s.end ? "Avspillingen er ferdig." : "";
  return join(phase, numbers, done, !s.playing && `Simulert tid ${nb(s.time / 60, 1)} min.`);
}
