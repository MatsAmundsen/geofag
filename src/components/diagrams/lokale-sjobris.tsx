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
  type Lab,
} from "./lokale-kit";

const FASER = ["Land varmes", "Termisk lavtrykk", "Sjøbris", "Returstrøm", "Sjøbrisfronten", "Natt: landbris"];

const STATUS = [
  medKilde("Havet har stor varmekapasitet og tar lang tid å varme opp. På solrike dager varmes land raskere.", "SNL, u.å.-e"),
  medKilde("Den varme lufta over land stiger, og det dannes et termisk lavtrykk.", "SNL, u.å.-b; SNL, u.å.-e"),
  medKilde("Kjøligere luft fra havet strømmer inn ved bakken. Det er sjøbris.", "SNL, u.å.-b; SNL, u.å.-e"),
  medKilde("I høyden, ofte mellom 1000 og 1500 meter, dannes et lite høytrykk, og lufta strømmer tilbake mot havet.", "NOAA, u.å.-a"),
  medKilde(
    "Forkanten kalles en sjøbrisfront og virker omtrent som en kaldfront: temperaturen kan falle 8–11 °C når den passerer, himmelen klarner, og fuktigheten øker. Det kan dannes byger langs fronten.",
    "NOAA, u.å.-a",
  ),
  medKilde(
    "Om natten kjøles landet raskere enn havet, og det blåser fra land. Landbrisen er som regel vesentlig svakere enn sjøbrisen. I høyden er det pålandsvind.",
    "SNL, u.å.-e; SNL, u.å.-f",
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
  const sek = tl.sek;
  const dag = 1 - s.natt;
  const fase = tl.fase;

  // sjøbrisfronten: fra kysten og innover land i steg 5
  const fx = lerp(470, 900, s.front);
  const frontOp = fase === 5 ? clamp(s.front * 4) : fase === 6 ? 1 - s.natt : 0;
  const yStasjon = hoydeVed(LAND, STASJON);
  const passert = clamp((fx - STASJON + 20) / 40);
  const temp = fase >= 5 ? lerp(0.85, 0.35, passert) : 0.4 + 0.45 * s.varme;
  const innTil = fase >= 5 ? Math.max(560, fx - 10) : 560;
  const cumulusOp = s.stig * dag * (fase >= 5 ? 1 - passert : 1);

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
    lab("Lite høytrykk i høyden", 720, 110, [655, 132], F.kald, "start");
  }
  if (fase === 5) {
    lab("Sjøbrisfront", 720, 96, [744, 150], F.tekst);
    lab("Sjøbris", 220, 360, [220, 382], F.sjobris);
    lab("Byger kan dannes", 560, 220, [600, 240], F.regn, "end");
  }
  if (fase === 6) {
    lab("Landbris, som regel svakere", 270, 360, [270, 384], F.kald);
    lab("Pålandsvind i høyden", 330, 150, [330, 172], F.retur);
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
      keys={[
        { text: "Sjøbris ved bakken", color: F.sjobris, kind: "line" },
        { text: "Strøm i høyden", color: F.retur, kind: "line" },
        { text: "Varm luft som stiger", color: F.varm, kind: "line" },
        { text: "Landbris", color: F.kald, kind: "line" },
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
          <Strom punkter={[[650, 372], [650, 260], [650, 175]]} sek={sek} farge={F.varm} marker={m.warm} opacity={s.stig * dag} />
          <Strom
            punkter={[[40, 382], [260, 382], [innTil, 380 - (innTil - 400) * 0.03]]}
            sek={sek}
            farge={F.sjobris}
            marker={m.teal}
            bredde={5}
            opacity={s.inn * dag}
          />
          <Strom punkter={[[630, 140], [400, 138], [110, 142]]} sek={sek} farge={F.retur} marker={m.fg} bredde={3.5} opacity={s.retur * dag} />
          <Strom punkter={[[80, 168], [80, 270], [80, 360]]} sek={sek} farge={F.retur} marker={m.fg} bredde={3} opacity={s.retur * dag * 0.9} />
          {/* sjøbrisfronten */}
          {frontOp > 0.02 ? (
            <g opacity={frontOp}>
              <path
                d={`M${fx - 120} ${hoydeVed(LAND, fx - 120)} L${fx} ${hoydeVed(LAND, fx)} C${fx + 10} 300 ${fx + 4} 230 ${fx - 6} 190 C${fx - 40} 230 ${fx - 90} 300 ${fx - 120} ${hoydeVed(LAND, fx - 120) - 20} Z`}
                fill="#cfe8f5"
                opacity="0.25"
                data-nocheck=""
              />
              <Sky x={fx - 10} y={180} s={1.05} byge mork />
              <Regn x={fx - 50} y={210} w={70} h={Math.max(40, hoydeVed(LAND, fx) - 220)} sek={sek} />
            </g>
          ) : null}
          {/* natt: landbris og pålandsvind i høyden */}
          <Strom punkter={[[600, 388], [400, 392], [120, 392]]} sek={sek} farge={F.kald} marker={m.cold} bredde={2.6} opacity={s.natt} fart={12} />
          <Strom punkter={[[110, 172], [360, 170], [600, 172]]} sek={sek} farge={F.retur} marker={m.fg} bredde={2.2} opacity={s.natt * 0.85} fart={10} />
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
