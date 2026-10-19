/**
 * OppvellingDiagram: kystoppvelling i ett snitt sett fra sør (nordlig halvkule, land i øst).
 * Følger «Hva er oppvelling?» i havstrommer.md (l. 98–100) og l. 110 (nordavind langs vestkysten).
 * Bare snitt, ingen ovenfra-visning. Vinden langs kysten vises med ⊙ (blåser mot deg).
 * Tall bare fra teksten: omtrent 10 m per døgn og 15–150 km (Barthel, 2021b).
 */
import { useId } from "react";
import { clamp, lerp } from "./isbre-kit";
import { tidslinjeVerdi } from "./prosess-kit";
import { OPPVELLING_TEKST } from "./hav-tekst";
import { NARROW_FIGURE_PX } from "./isbre-figur";
import { F, Hav, Himmel, LokaleRamme, Strom, medKilde, useLokaleTidslinje, useSvgBredde, type Hinder, type Lab } from "./lokale-kit";

const FASER = ["Vind langs kysten", "Ekmantransport", "Vann nedenfra", "Næring i lyset"];

const STATUS = [
  medKilde("Sterk nordavind blåser lenge langs en vestkyst på den nordlige halvkulen. I snittet blåser den mot deg.", "Barthel, 2021b"),
  medKilde("Ekmantransporten går 90 grader til høyre for vinden på den nordlige halvkulen. Her fører den overflatevannet ut fra kysten.", "Barthel, 2021a"),
  medKilde("Vannet som forsvinner, erstattes av kaldere vann nedenfra. Vannet stiger typisk omtrent 10 meter per døgn.", "Barthel, 2021b"),
  medKilde("Oppvellingssonen er 15–150 km bred. Vannet fra dypet er rikt på næringssalter, og når det kommer opp i lyset, vokser planteplanktonet godt.", "Barthel, 2021b"),
];

/** Tilstand ved slutten av hver fase (indeks = p). */
const BILDER = [
  { vind: 0, ekman: 0, opp: 0, plankton: 0 },
  { vind: 1, ekman: 0, opp: 0, plankton: 0 },
  { vind: 1, ekman: 1, opp: 0, plankton: 0 },
  { vind: 1, ekman: 1, opp: 1, plankton: 0 },
  { vind: 1, ekman: 1, opp: 1, plankton: 1 },
];

const HAV_Y = 170; // havoverflaten
const KYST = 780; // kystlinja i overflaten
const VIND_X = 700;
const VIND_Y = 92;
/** Utsnitt på smal skjerm: høyere flate nær kysten, som skisse 1b (x 390–930, y 40–540). */
const SMAL_UTSNITT = "390 40 540 500";

/** Land i øst: kyst, kontinentalsokkel og havbunn som stiger mot land (fast sti). */
const LAND = `M${KYST} ${HAV_Y} L${KYST + 10} ${HAV_Y - 26} L960 ${HAV_Y - 40} L960 540 L560 540 C 640 520, 700 470, 740 380 C 760 320, 772 240, ${KYST} ${HAV_Y} Z`;
const LAND_KANT: [number, number][] = [[560, 540], [700, 470], [740, 380], [772, 240], [KYST, HAV_Y], [KYST + 10, HAV_Y - 26], [960, HAV_Y - 40]];

/** Grensen mot dypere vann: flat før oppvellingen, løftet mot kysten etterpå. */
function grense(opp: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 12; i++) {
    const x = (i / 12) * 740;
    const t = clamp((x - 220) / 520);
    const flat = 360;
    // bare løftet inn mot kysten; langt ute ligger grensen der den lå
    const loftet = flat - 150 * t * t * (3 - 2 * t);
    pts.push([x, lerp(flat, loftet, opp)]);
  }
  return pts;
}

const PLANKTON: [number, number][] = Array.from({ length: 22 }, (_, i) => [530 + ((i * 53) % 230), HAV_Y + 10 + ((i * 29) % 34)]);

export function OppvellingFigur({ heading, caption }: { heading?: string; caption?: React.ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const { ref, tl } = useLokaleTidslinje(FASER.length);
  // samme grense som LokaleRamme: på smal skjerm blir hver etikett ett nummerskilt
  const bredde = useSvgBredde(ref);
  const smal = bredde > 0 && bredde < NARROW_FIGURE_PX;
  const s = tidslinjeVerdi(BILDER, tl.p);
  const fase = tl.fase;
  const sek = tl.sek;
  const g = grense(s.opp);
  const gSti = `M${g.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")}`;
  // ⊙: vinden kommer mot leseren. Ringen pulserer svakt under avspilling (står stille når pauset).
  const puls = tl.playing ? 1 + 0.08 * Math.sin(sek * 3) : 1;

  // på smal skjerm slutter pilen inne i utsnittet
  const ekmanBane: [number, number][] = smal
    ? [[KYST - 30, HAV_Y + 22], [600, HAV_Y + 22], [430, HAV_Y + 24]]
    : [[KYST - 30, HAV_Y + 22], [520, HAV_Y + 22], [300, HAV_Y + 24], [150, HAV_Y + 26]];
  const oppBaner: [number, number][][] = [
    [[600, 520], [660, 430], [720, 300], [742, HAV_Y + 44]],
    [[520, 520], [600, 440], [680, 330], [704, HAV_Y + 50]],
  ];
  const hinder: Hinder[] = [
    { p: ekmanBane, b: 6, pil: true },
    ...oppBaner.map((p) => ({ p, b: 4, pil: true })),
    { p: LAND_KANT, b: 1.5 },
    { p: g, b: 2 },
    // ⊙ har r 22; på smal skjerm holdes skiltene minst ca. 6 px unna
    { ellipse: (smal ? [VIND_X, VIND_Y, 40, 40] : [VIND_X, VIND_Y, 26, 26]) as [number, number, number, number] },
    // bølgestripene i Hav og klammen over oppvellingssonen
    ...[0, 1, 2, 3].map((k) => ({ p: [[0, HAV_Y + 12 + k * 18], [KYST, HAV_Y + 12 + k * 18]] as [number, number][], b: 1 })),
    { p: [[520, HAV_Y - 8], [520, HAV_Y - 2], [KYST - 10, HAV_Y - 2], [KYST - 10, HAV_Y - 8]], b: 2 },
  ];

  const labels: Lab[] = [];
  const fs = 17;
  const lab = (text: string, x: number, y: number, at: [number, number] | undefined, color: string, anchor: Lab["anchor"] = "middle", opacity = 1) =>
    labels.push({ text, x, y, at, color, anchor, size: fs, weight: 700, halo: F.halo, opacity });
  lab("Vest", 24, 34, undefined, F.tekst, "start");
  labels[labels.length - 1].narrowHide = true;
  lab("Øst", 936, 34, undefined, F.tekst, "end");
  labels[labels.length - 1].narrowHide = true;
  lab("Land", 880, 300, undefined, F.tekst);
  labels[labels.length - 1].narrowHide = true;
  if (s.vind > 0.3) lab("Nordavind langs kysten, blåser mot deg", VIND_X - 40, VIND_Y + 6, [VIND_X - 28, VIND_Y], F.tekst, "end", clamp((s.vind - 0.3) / 0.4));
  if (s.ekman > 0.3) lab("Ekmantransport 90° til høyre for vinden: ut fra kysten", 24, HAV_Y - 18, smal ? [500, HAV_Y + 22] : [300, HAV_Y + 20], F.sjobris, "start", clamp((s.ekman - 0.3) / 0.4));
  if (s.opp > 0.3) {
    const op = clamp((s.opp - 0.3) / 0.4);
    lab("Kaldere vann nedenfra", 420, 470, [600, 440], F.kald, "middle", op);
    lab("omtrent 10 m per døgn", 420, 496, undefined, F.kald, "middle", op);
    labels[labels.length - 1].narrowHide = true;
  }
  if (s.plankton > 0.3) {
    const op = clamp((s.plankton - 0.3) / 0.4);
    lab("Oppvellingssonen, 15–150 km bred", 640, HAV_Y - 26, [640, HAV_Y - 6], "#a8e08f", "middle", op);
    if (smal) {
      // ett skilt med hele setningen; lista under figuren bryter den selv
      lab("Næringssaltene kommer opp i lyset, og planteplanktonet vokser godt", 110, HAV_Y + 84, [600, HAV_Y + 26], "#a8e08f", "start", op);
    } else {
      lab("Næringssaltene kommer opp i lyset,", 110, HAV_Y + 84, [540, HAV_Y + 30], "#a8e08f", "start", op);
      lab("og planteplanktonet vokser godt", 110, HAV_Y + 108, undefined, "#a8e08f", "start", op);
    }
  }

  return (
    <LokaleRamme
      tekst={OPPVELLING_TEKST}
      heading={heading}
      caption={caption}
      tl={tl}
      faser={FASER}
      status={STATUS[fase - 1]}
      svgRef={ref}
      labels={labels}
      data="oppvelling"
      narrowViewBox={SMAL_UTSNITT}
      etikettRader={5}
      hinder={hinder}
      skiltNokkel={`${fase}|${Math.round(tl.p * 4)}`}
      notes={["⊙ blåser mot deg. Snitt sett fra sør: vest til venstre, øst til høyre. Nordlig halvkule. Skjematisk, ikke i målestokk."]}
      keys={[
        { text: "Ekmantransport", color: F.sjobris, kind: "line" },
        { text: "Kaldere vann nedenfra", color: F.kald, kind: "line" },
      ]}
    >
      {({ m }) => (
        <>
          <Himmel id={`${uid}-h`} t={1} h={HAV_Y + 2} />
          <Hav x0={0} x1={KYST + 2} y={HAV_Y} sek={sek} id={`${uid}-hav`} />
          {/* dypere, kaldere vann under grensen */}
          <path d={`${gSti} L800 ${g[g.length - 1][1].toFixed(1)} L800 540 L0 540 Z`} fill="#0a2333" opacity="0.85" data-nocheck="" />
          <path d={gSti} fill="none" stroke="#8ec5e8" strokeWidth="2.2" strokeDasharray="10 7" opacity="0.8" data-nocheck="" />
          <path d={LAND} fill={F.land} stroke={F.landMork} strokeWidth="1.5" data-nocheck="" />
          {/* planteplankton i overflaten nær kysten */}
          {s.plankton > 0.02 ? (
            <g opacity={s.plankton} data-nocheck="">
              {PLANKTON.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i % 3 ? 3 : 4.2} fill="#8fd16f" opacity="0.85" />
              ))}
              <path d={`M520 ${HAV_Y - 8} L520 ${HAV_Y - 2} L${KYST - 10} ${HAV_Y - 2} L${KYST - 10} ${HAV_Y - 8}`} fill="none" stroke="#a8e08f" strokeWidth="2.5" />
            </g>
          ) : null}
          {/* vinden: ⊙ i lufta over kysten */}
          {s.vind > 0.02 ? (
            <g opacity={s.vind} transform={`translate(${VIND_X} ${VIND_Y}) scale(${puls})`}>
              <circle r="22" fill="#0f171c" fillOpacity="0.35" stroke={F.tekst} strokeWidth="3.5" />
              <circle r="6" fill={F.tekst} />
            </g>
          ) : null}
          <Strom punkter={ekmanBane} sek={sek} farge={F.sjobris} marker={m.teal} bredde={6} opacity={s.ekman} />
          {oppBaner.map((p, i) => (
            <Strom key={i} punkter={p} sek={sek} farge={F.kald} marker={m.cold} bredde={4} opacity={s.opp} fart={10} />
          ))}
        </>
      )}
    </LokaleRamme>
  );
}
