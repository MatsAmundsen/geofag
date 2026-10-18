/**
 * A · SeaBreezeLandBreeze: sjøbrisens kretsløp (steg 1–4), sjøbrisfronten (steg 5) og landbris om natten (steg 6).
 * Følger «Solgangsvind» i lokale-vaersystemer.md. Tall bare fra teksten: 1000–1500 m og 8–11 °C (NOAA, u.å.-a).
 */
import { useId } from "react";
import { clamp, lerp } from "./isbre-kit";
import { lat, tidslinjeVerdi } from "./prosess-kit";
import { SJOBRIS_TEKST } from "./lokale-tekst";
import {
  F,
  Hav,
  Himmel,
  Hus,
  LokaleRamme,
  Maane,
  Regn,
  Sky,
  Sol,
  Stjerner,
  Strom,
  Termometer,
  Terreng,
  Traer,
  fyltProfil,
  hoydeVed,
  lagProfil,
  medKilde,
  useLokaleTidslinje,
  type Hinder,
  type Lab,
  type Strek,
} from "./lokale-kit";

const FASER = ["Land varmes", "Termisk lavtrykk", "Sjøbris", "Returstrøm", "Sjøbrisfronten", "Natt: landbris"];

const STATUS = [
  medKilde("Havet har stor varmekapasitet og tar lang tid å varme opp. På solrike dager varmes land raskere.", "Store norske leksikon, u.å.-b; Store norske leksikon, u.å.-e"),
  medKilde("Den varme lufta over land stiger, og det dannes et termisk lavtrykk.", "Store norske leksikon, u.å.-b; Store norske leksikon, u.å.-e"),
  medKilde("Kjøligere luft fra havet strømmer inn ved bakken. Det er sjøbris.", "Store norske leksikon, u.å.-b; Store norske leksikon, u.å.-e"),
  medKilde("I høyden, ofte mellom 1000 og 1500 meter, dannes et lite høytrykk, og lufta strømmer tilbake mot havet.", "NOAA, u.å.-a"),
  medKilde(
    "Forkanten kalles en sjøbrisfront og virker omtrent som en kaldfront: temperaturen kan falle 8–11 °C når den passerer, himmelen klarner, og fuktigheten øker. Det kan dannes byger langs fronten.",
    "NOAA, u.å.-a",
  ),
  medKilde(
    "Om natten kjøles landet raskere enn havet, og det blåser fra land. Landbrisen er som regel vesentlig svakere enn sjøbrisen. I høyden er det pålandsvind.",
    "Store norske leksikon, u.å.-e; Store norske leksikon, u.å.-f",
  ),
];

/** Tilstand ved slutten av hver fase (indeks = p). */
const BILDER = [
  { varme: 0, stig: 0, inn: 0, retur: 0, front: 0, natt: 0 },
  { varme: 1, stig: 0, inn: 0, retur: 0, front: 0, natt: 0 },
  { varme: 1, stig: 1, inn: 0, retur: 0, front: 0, natt: 0 },
  { varme: 1, stig: 1, inn: 1, retur: 0, front: 0, natt: 0 },
  { varme: 1, stig: 1, inn: 1, retur: 1, front: 0, natt: 0 },
  { varme: 1, stig: 1, inn: 1, retur: 1, front: 1, natt: 0 },
  { varme: 0, stig: 0, inn: 0, retur: 0, front: 1, natt: 1 },
];

const KYST = 400;
const HAV_Y = 400;
const hentLand = lat(() =>
  lagProfil({
    seed: 4101,
    x0: KYST - 8,
    x1: 960,
    grunn: (x) => {
      const t = clamp((x - 540) / 400);
      return HAV_Y - 4 - (x - KYST) * 0.03 - 250 * t * t * (3 - 2 * t);
    },
    ruhet: (x) => 3 + 26 * clamp((x - 560) / 350),
  }),
);

const STASJON = 770;

export function SjobrisFigur({ heading, caption }: { heading?: string; caption?: React.ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const { ref, tl } = useLokaleTidslinje(FASER.length);
  const s = tidslinjeVerdi(BILDER, tl.p);
  const LAND = hentLand();
  const PYNT = hentPynt();
  const NATT_LAND_Y = hoydeVed(LAND, 600);
  const sek = tl.sek;
  const dag = 1 - s.natt;
  const fase = tl.fase;

  // sjøbrisfronten: fra kysten og innover land i steg 5
  const fx = lerp(470, 900, s.front);
  // Bygeskya følger fronten og ligger hele veien en fast avstand over terrenget under seg (skjematisk
  // cumulusbunn ved kondensasjonsnivået). Terrenget stiger mot høyre, så skybunnen måles mot
  // høyeste punkt under skya (høyre kant). Regnet går fra skybunnen helt ned til bakken.
  const SKY_S = 0.85;
  const SKY_LUFT = 45;
  const skyX = fx - 10;
  const skyBunn = hoydeVed(LAND, Math.min(skyX + 51, 958)) - SKY_LUFT;
  const skyY = skyBunn - 28 * SKY_S;
  const frontBunn = hoydeVed(LAND, fx);
  const frontH = frontBunn - skyBunn;
  // regnet faller til venstre for frontfoten (bak fronten), så foten selv er fri
  const regnStriper = Array.from({ length: 7 }, (_, i) => fx - 58 + i * 7.5);
  const frontOp = fase === 5 ? clamp(s.front * 4) : fase === 6 ? 1 - s.natt : 0;
  const yStasjon = hoydeVed(LAND, STASJON);
  const passert = clamp((fx - STASJON + 20) / 40);
  const temp = fase >= 5 ? lerp(0.85, 0.35, passert) : 0.4 + 0.45 * s.varme;
  const innTil = fase >= 5 ? Math.max(560, fx - 10) : 560;
  // søylen med varm luft (x = 650) tones ned når sjøbrisfronten passerer den i steg 5, slik som skyen over
  const soyleOp = fase >= 5 ? 1 - clamp((fx - 630) / 60) : 1;
  const cumulusOp = s.stig * dag * soyleOp;

  // Strømmene i kretsløpet. Strek skiller dem også uten farge: sjøbris og varm luft heltrukket,
  // strøm i høyden stiplet, landbris prikket (samme i tegnforklaringen).
  type StromData = { punkter: [number, number][]; farge: string; marker: "warm" | "teal" | "fg" | "cold"; bredde?: number; opacity: number; fart?: number; strek?: Strek };
  const stromer: StromData[] = [
    { punkter: [[650, 372], [650, 260], [650, 175]], farge: F.varm, marker: "warm", opacity: s.stig * dag * soyleOp },
    { punkter: [[40, 382], [260, 382], [innTil, 380 - (innTil - 400) * 0.03]], farge: F.sjobris, marker: "teal", bredde: 5, opacity: s.inn * dag },
    { punkter: [[630, 140], [400, 138], [110, 142]], farge: F.retur, marker: "fg", bredde: 3.5, opacity: s.retur * dag, strek: "stiplet" },
    { punkter: [[80, 168], [80, 270], [80, 360]], farge: F.retur, marker: "fg", bredde: 3, opacity: s.retur * dag * 0.9, strek: "stiplet" },
  ];
  // natt: et grunnere, lukket kretsløp (NOAA, u.å.-a): synker over land, landbris ut, stiger over havet,
  // pålandsvind i høyden på ca. y 280 (om dagen går returstrømmen på ca. y 140)
  const nattStromer: StromData[] = [
    { punkter: [[590, NATT_LAND_Y - 8], [400, 390], [130, 392]], farge: F.kald, marker: "cold", bredde: 2.6, opacity: s.natt, fart: 12, strek: "prikket" },
    { punkter: [[108, 386], [108, 336], [108, 292]], farge: F.kald, marker: "cold", bredde: 2.2, opacity: s.natt * 0.85, fart: 10, strek: "prikket" },
    { punkter: [[128, 280], [360, 278], [596, 280]], farge: F.retur, marker: "fg", bredde: 2.2, opacity: s.natt * 0.85, fart: 10, strek: "stiplet" },
    { punkter: [[612, 290], [612, 320], [612, NATT_LAND_Y - 20]], farge: F.retur, marker: "fg", bredde: 2.2, opacity: s.natt * 0.85, fart: 10, strek: "stiplet" },
  ];
  const hinder: Hinder[] = [...stromer, ...nattStromer]
    .filter((h) => h.opacity > 0.1)
    .map((h) => ({ p: h.punkter, b: h.bredde ?? 4, pil: true }));
  // terrengkanten og bølgestripene i havet (Hav: y + 12 + k · 18)
  hinder.push({ p: LAND, b: 1.5 });
  for (let k = 0; k < 4; k++) hinder.push({ p: [[4, HAV_Y + 12 + k * 18], [KYST, HAV_Y + 12 + k * 18]], b: 1.4 });
  if (fase >= 5 && dag > 0.02) hinder.push({ boks: [STASJON - 8, yStasjon - 136, STASJON + 42, yStasjon] });
  if (frontOp > 0.1) {
    hinder.push({ boks: [fx - 70, skyBunn, fx - 4, frontBunn] });
    hinder.push({ boks: [skyX - 50, skyY - 57, skyX + 52, skyBunn] });
  }

  const labels: Lab[] = [];
  const fs = 16;
  const lab = (text: string, x: number, y: number, at: [number, number], color: string, anchor: Lab["anchor"] = "middle") =>
    labels.push({ text, x, y, at, color, anchor, size: fs, weight: 700, halo: F.halo, badge: [x, y - 5] });
  if (fase <= 5) {
    lab("Kjølig hav", 190, 470, [190, 440], F.kald);
    lab("Varmt land", 520, 470, [520, 410], F.varm);
  }
  if (fase >= 2 && fase <= 4) {
    lab("Varm luft stiger", 760, 300, [652, 300], F.varm, "start");
    lab("Termisk lavtrykk", 650, 430, [650, 392], F.varmSterk);
  }
  if (fase >= 3 && fase <= 4) lab("Sjøbris", 220, 360, [220, 382], F.sjobris);
  if (fase === 4) {
    lab("Returstrøm i høyden", 330, 118, [330, 140], F.retur);
    lab("Lite høytrykk i høyden", 560, 92, [560, 126], F.kald);
  }
  if (fase === 5) {
    lab("Sjøbris", 220, 360, [220, 382], F.sjobris);
    // «Sjøbrisfront» peker på foten av fronten ved bakken (grensen mellom sjøluft og landluft) og følger
    // den gjennom hele steget. Teksten står i landet like til høyre for og under foten, med kort leder, så
    // den ikke dekker sky, regn eller termometer. Ved høyre kant stopper teksten, og lederen peker opp til
    // foten. «Byger kan dannes» står til venstre for bygeskya, uten leder.
    // Begge vises først når skya og fronten er tegnet opp, og tones inn (frontOp 0,6 → 0,9) i stedet for å
    // poppe opp. frontOp følger felles avspilling, og ved redusert bevegelse vises sluttbildet direkte.
    if (frontOp >= 0.6) {
      const op = clamp((frontOp - 0.6) / 0.3);
      const bx = skyX - 49 * SKY_S - 12;
      const by = skyY - 8;
      labels.push({ text: "Byger kan dannes", x: bx, y: by, color: F.regn, anchor: "end", size: fs, weight: 700, halo: F.halo, badge: [bx - 20, by - 5], opacity: op });
      const tx = Math.min(fx + 16, 860);
      const ty = hoydeVed(LAND, tx) + 36;
      labels.push({ text: "Sjøbrisfront", x: tx, y: ty, at: [fx, frontBunn], color: F.tekst, anchor: "start", size: fs, weight: 700, halo: F.halo, badge: [tx + 40, ty - 5], opacity: op });
    }
  }
  if (fase === 6) {
    lab("Landbris, som regel svakere", 270, 360, [270, 384], F.kald);
    lab("Pålandsvind i høyden", 330, 248, [330, 276], F.retur);
    lab("Land kjøles raskere", 650, 470, [650, 420], F.kald);
  }

  return (
    <LokaleRamme
      tekst={SJOBRIS_TEKST}
      heading={heading}
      caption={caption}
      tl={tl}
      faser={FASER}
      status={STATUS[fase - 1]}
      svgRef={ref}
      labels={labels}
      data="sjobris"
      etikettRader={7}
      hinder={hinder}
      skiltNokkel={`${fase}|${Math.round(tl.p * 4)}`}
      keys={[
        { text: "Sjøbris ved bakken", color: F.sjobris, kind: "line" },
        { text: "Strøm i høyden", color: F.retur, kind: "dash" },
        { text: "Varm luft som stiger", color: F.varm, kind: "line" },
        { text: "Landbris", color: F.kald, kind: "dot" },
      ]}
    >
      {({ m }) => (
        <>
          <Himmel id={`${uid}-h`} t={1 + 2 * s.natt} />
          <Stjerner opacity={s.natt} />
          <Sol x={150} y={80} opacity={dag} />
          <Maane x={840} y={70} opacity={s.natt} />
          <Hav x0={0} x1={KYST + 4} y={HAV_Y} sek={sek} id={`${uid}-hav`} />
          <Terreng id={`${uid}-land`} profil={LAND} snoUnder={200} />
          <path d={fyltProfil(LAND)} fill={F.varm} opacity={0.22 * s.varme * dag} data-nocheck="" />
          <Traer punkter={PYNT.traer} />
          <Hus punkter={PYNT.hus} />
          {/* stasjon med termometer (steg 5) */}
          {fase >= 5 && dag > 0.02 ? (
            <g opacity={dag}>
              <rect x={STASJON - 2} y={yStasjon - 40} width="4" height="40" fill="#d6dde2" />
              <Termometer x={STASJON + 26} y={yStasjon - 130} h={90} verdi={temp} farge={temp > 0.6 ? F.varmSterk : F.kald} />
            </g>
          ) : null}
          <Sky x={650} y={150} s={0.9} opacity={cumulusOp} byge />
          {/* kretsløpet */}
          {stromer.map((h, i) => (
            <Strom key={`d${i}`} punkter={h.punkter} sek={sek} farge={h.farge} marker={m[h.marker]} bredde={h.bredde} opacity={h.opacity} fart={h.fart} strek={h.strek} />
          ))}
          {/* sjøbrisfronten */}
          {frontOp > 0.02 ? (
            <g opacity={frontOp}>
              <path
                d={`M${fx - 120} ${hoydeVed(LAND, fx - 120)} L${fx} ${frontBunn} C${fx + 10} ${frontBunn - 0.3 * frontH} ${fx + 4} ${frontBunn - 0.7 * frontH} ${fx - 6} ${skyBunn} C${fx - 40} ${skyBunn + 0.3 * frontH} ${fx - 90} ${skyBunn + 0.75 * frontH} ${fx - 120} ${hoydeVed(LAND, fx - 120) - 20} Z`}
                fill="#cfe8f5"
                opacity="0.25"
                data-nocheck=""
              />
              <Sky x={skyX} y={skyY} s={SKY_S} byge mork />
              {regnStriper.map((rx) => (
                <Regn key={rx} x={rx - 3} y={skyBunn + 2} w={6} n={1} h={hoydeVed(LAND, rx - 10) - skyBunn - 2} sek={sek} />
              ))}
            </g>
          ) : null}
          {/* natt: landbris og pålandsvind i høyden */}
          {nattStromer.map((h, i) => (
            <Strom key={`n${i}`} punkter={h.punkter} sek={sek} farge={h.farge} marker={m[h.marker]} bredde={h.bredde} opacity={h.opacity} fart={h.fart} strek={h.strek} />
          ))}
        </>
      )}
    </LokaleRamme>
  );
}

/** Trær og hus på strandflaten, plassert på profilen ved første bruk. */
const hentPynt = lat(() => {
  const L = hentLand();
  return {
    traer: [428, 446, 470, 588, 606, 702, 716].map((x) => [x, hoydeVed(L, x) + 2] as [number, number]),
    hus: [458, 530].map((x) => [x, hoydeVed(L, x) + 1] as [number, number]),
  };
});
