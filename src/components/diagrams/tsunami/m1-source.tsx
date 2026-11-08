import { useEffect, useRef, useState } from "react";
import { Choice, FigureNote, Lab, Readouts, Slider, Transport } from "./lab";
import { nb, roundFactor } from "./util";
import { clearPaper, fitCanvas, useSimLoop } from "./draw";
import { seafloorUz, type FaultParams } from "./sim/fault";
import { advanceLinear, makeLinear, type Linear1D } from "./sim/linear";
import { subductionElevation } from "./sim/profiles";
import { arrow, paintRock, paintWaterColumn, skyTo, smoothPath, type Pt } from "./paint";
import { ink } from "./sim/palette";
import { LabelLayout } from "./place";

/** Snittet er 680 km bredt og 25 km dypt. */
const N = 420;
const L = 680_000;
const TRENCH = 0.3;
const COAST = 0.8;
const Z_BOTTOM = 25_000;
/** Simulert tid per vanlig skjermbilde (s). 60 bilder i sekundet gir om lag 6 minutter per sekund. */
const DT_FRAME = 6;
const T_END = 50 * 60;

type Kind = "skyv" | "side" | "normal";
const RAKE: Record<Kind, number> = { skyv: 90, side: 0, normal: -90 };
const PRESET: Record<Kind, { slip: number; dip: number; width: number; depth: number }> = {
  skyv: { slip: 12, dip: 14, width: 100, depth: 5 },
  side: { slip: 12, dip: 14, width: 100, depth: 5 },
  normal: { slip: 6, dip: 45, width: 40, depth: 5 },
};

const elevation = (x: number) => subductionElevation(x, L, TRENCH, COAST);

function faultFor(
  kind: Kind,
  slip: number,
  dip: number,
  width: number,
  depth: number,
): FaultParams {
  const d = Math.max(depth, 0.5) * 1000;
  const tan = Math.tan((dip * Math.PI) / 180);
  // Bruddet ligger på plategrensa: øvre kant `depth` km under havbunnen ved grøfta.
  return {
    slip,
    dipDeg: dip,
    rakeDeg: RAKE[kind],
    width: width * 1000,
    depth: d,
    xTop: L * TRENCH + d / tan,
  };
}

function load(sim: Linear1D, bedDisp: Float64Array, p: FaultParams, deformed: boolean) {
  for (let i = 0; i < N; i++) {
    const x = (i + 0.5) * sim.dx;
    const z = elevation(x);
    const d = Math.max(0, -z);
    sim.d[i] = d;
    sim.u[i] = 0;
    const uz = d > 20 && deformed ? seafloorUz(x, p) : 0;
    bedDisp[i] = uz;
    // Vannet følger havbunnen med én gang (lang kilde sammenlignet med dypet).
    sim.eta[i] = uz;
  }
  sim.u[N] = 0;
}

export function ModelSource() {
  const [kind, setKind] = useState<Kind>("skyv");
  const [slip, setSlip] = useState(PRESET.skyv.slip);
  const [dip, setDip] = useState(PRESET.skyv.dip);
  const [width, setWidth] = useState(PRESET.skyv.width);
  const [depth, setDepth] = useState(PRESET.skyv.depth);
  const [stage, setStage] = useState<"før" | "etter">("før");
  const [playing, setPlaying] = useState(false);
  const [, setTick] = useState(0);
  const [scales, setScales] = useState({ ve: "1", we: "1" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sim = useRef<Linear1D>(makeLinear(N, L / N));
  const bedDisp = useRef(new Float64Array(N));
  const potential = useRef(new Float64Array(N));
  const maxCoast = useRef({ first: 0, value: 0 });
  const time = useRef(0);
  const waveScale = useRef(4);

  const fault = () => faultFor(kind, slip, dip, width, depth);

  const coastIndex = () => {
    const s = sim.current;
    let ci = 0;
    for (let i = 0; i < N; i++) if (s.d[i] > 30) ci = i;
    return ci;
  };

  const reset = (to: "før" | "etter" = "før") => {
    time.current = 0;
    const p = fault();
    load(sim.current, bedDisp.current, p, to === "etter");
    // Skalaen for løft og bølge settes av det mulige løftet, så den ikke endrer seg underveis.
    let peak = 0.5;
    for (let i = 0; i < N; i++) {
      const v = Math.abs(seafloorUz((i + 0.5) * sim.current.dx, p));
      potential.current[i] = v;
      if (sim.current.d[i] > 20) peak = Math.max(peak, v);
    }
    waveScale.current = 24 / peak;
    maxCoast.current = { first: 0, value: 0 };
    setStage(to);
    setPlaying(false);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    reset("før");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, slip, dip, width, depth]);

  const advance = (seconds: number) => {
    const s = sim.current;
    let left = seconds;
    while (left > 0 && time.current < T_END) {
      const dt = Math.min(DT_FRAME, left);
      advanceLinear(s, dt);
      time.current += dt;
      left -= dt;
      const e = s.eta[coastIndex()];
      if (maxCoast.current.first === 0 && Math.abs(e) > 0.05) maxCoast.current.first = Math.sign(e);
      maxCoast.current.value = Math.max(maxCoast.current.value, Math.abs(e));
    }
    return time.current < T_END;
  };

  const start = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (stage === "før") reset("etter");
    if (time.current >= T_END) reset("etter");
    setPlaying(true);
  };

  const step = () => {
    setPlaying(false);
    if (stage === "før") {
      reset("etter");
      return;
    }
    advance(120);
    setTick((t) => t + 1);
  };

  const frames = useRef(0);
  const { reduce } = useSimLoop(
    canvasRef,
    playing,
    (n) => {
      const more = advance(DT_FRAME * n);
      frames.current += n;
      if (frames.current >= 8 || !more) {
        frames.current = 0;
        setTick((t) => t + 1);
      }
      if (!more) setPlaying(false);
      return more;
    },
    draw,
  );

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = fitCanvas(canvas);
    if (!fit) return;
    const { ctx, w, h } = fit;
    clearPaper(ctx, w, h);
    const s = sim.current;
    const disp = bedDisp.current;
    const narrow = w < 560;
    const padX = 0;
    const top = narrow ? 44 : 40;
    const sea = top + 30;
    const bottom = h - 4;
    const pxM = (bottom - sea) / Z_BOTTOM;
    const pxKmH = (w - padX * 2) / (L / 1000);
    const ve = (pxM * 1000) / pxKmH;
    const wScale = waveScale.current;
    const we = (wScale * 1000) / pxKmH;
    const veS = roundFactor(ve);
    const weS = roundFactor(we);
    if (veS !== scales.ve || weS !== scales.we) setScales({ ve: veS, we: weS });

    const xOf = (x: number) => padX + (x / L) * (w - padX * 2);
    const yZ = (z: number) => sea - z * pxM;

    skyTo(ctx, w, sea + 2);

    // Havbunn og land, deformert havbunn der den er løftet eller senket.
    const bed: Pt[] = [];
    const bed0: Pt[] = [];
    const surf: Pt[] = [];
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) * s.dx;
      const z = elevation(x);
      const X = xOf(x);
      const wet = s.d[i] > 1;
      const yb = yZ(z) - disp[i] * wScale;
      bed0.push({ x: X, y: yZ(z) });
      bed.push({ x: X, y: yb });
      surf.push({ x: X, y: wet ? sea - s.eta[i] * wScale : yb });
    }
    bed.unshift({ x: 0, y: bed[0].y });
    bed.push({ x: w, y: yZ(elevation(L)) });
    bed0.unshift({ x: 0, y: bed0[0].y });
    bed0.push({ x: w, y: bed[bed.length - 1].y });
    surf.unshift({ x: 0, y: surf[0].y });
    surf.push({ x: w, y: surf[surf.length - 1].y });

    // vannsøyle bare der det er hav
    const wetEnd = coastIndex() + 2;
    paintWaterColumn(ctx, surf.slice(0, wetEnd), bed.slice(0, wetEnd));
    paintRock(ctx, bed, bottom);

    // Havbunnsplata under plategrensa: litt mørkere tone.
    const tanD = Math.tan((dip * Math.PI) / 180);
    const xT = L * TRENCH;
    const zT = elevation(xT);
    const slab: Pt[] = [];
    for (let i = 0; i <= 60; i++) {
      const x = (i / 60) * xT;
      slab.push({ x: xOf(x), y: yZ(elevation(x)) + 14 });
    }
    const xDeep = xT + (Z_BOTTOM + zT) / tanD;
    slab.push({ x: xOf(xT), y: yZ(zT) + 2 });
    slab.push({ x: xOf(Math.min(xDeep, L * 1.5)), y: yZ(-Z_BOTTOM) });
    ctx.beginPath();
    ctx.moveTo(0, bottom);
    for (const p of slab) ctx.lineTo(p.x, p.y);
    ctx.lineTo(xOf(Math.min(xDeep, L * 1.5)), bottom);
    ctx.closePath();
    ctx.fillStyle = "rgba(60,52,46,0.28)";
    ctx.fill();

    // Plategrensa (stiplet) og bruddflaten (heltrukket).
    const p = fault();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = ink.text;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(xOf(xT), yZ(zT));
    ctx.lineTo(xOf(xDeep), yZ(-Z_BOTTOM));
    ctx.stroke();
    ctx.setLineDash([]);
    const dU = p.depth;
    const dL = dU + p.width * Math.sin((dip * Math.PI) / 180);
    const xU = xT + dU / tanD;
    const zU = zT - dU;
    const zL = Math.max(-Z_BOTTOM, zT - dL);
    const xLc = xT + (zT - zL) / tanD;
    ctx.strokeStyle = ink.mark;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(xOf(xU), yZ(zU));
    ctx.lineTo(xOf(xLc), yZ(zL));
    ctx.stroke();

    // Bevegelsen langs bruddet: én liten pil på hver side, bare for skyv og normal.
    if (RAKE[kind] !== 0 && stage === "etter") {
      const ax = xOf(xU);
      const ay = yZ(zU);
      const bx = xOf(xLc);
      const by = yZ(zL);
      const len = Math.hypot(bx - ax, by - ay) || 1;
      const ux = (bx - ax) / len;
      const uy = (by - ay) / len;
      const nx = uy;
      const ny = -ux;
      const cx = (ax + bx) / 2;
      const cy = (ay + by) / 2;
      const sgn = RAKE[kind] > 0 ? 1 : -1;
      const seg = (side: number, dir: number) => {
        const ox = cx + side * nx * 10;
        const oy = cy + side * ny * 10;
        const sx = ox - dir * ux * 13;
        const sy = oy - dir * uy * 13;
        const ex = ox + dir * ux * 13;
        const ey = oy + dir * uy * 13;
        ctx.strokeStyle = ink.panel;
        ctx.fillStyle = ink.panel;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex - dir * ux * 7 + nx * 4, ey - dir * uy * 7 + ny * 4);
        ctx.lineTo(ex - dir * ux * 7 - nx * 4, ey - dir * uy * 7 - ny * 4);
        ctx.closePath();
        ctx.fill();
      };
      // Ved skyv går den overliggende plata opp langs bruddet, mot grøfta.
      seg(1, -sgn);
      seg(-1, sgn);
    }

    // Opprinnelig havbunn stiplet der den er flyttet, og fargebånd for løft og senkning.
    if (stage === "etter") {
      for (let i = 1; i < bed.length - 1; i++) {
        const k = i - 1;
        if (k < 1 || k >= N || s.d[k] < 30) continue;
        const v = disp[k];
        if (Math.abs(v) < 0.03) continue;
        ctx.beginPath();
        ctx.moveTo(bed0[i - 1].x, bed0[i - 1].y);
        ctx.lineTo(bed0[i].x, bed0[i].y);
        ctx.lineTo(bed[i].x, bed[i].y);
        ctx.lineTo(bed[i - 1].x, bed[i - 1].y);
        ctx.closePath();
        ctx.fillStyle = v > 0 ? ink.uplift : ink.sink;
        ctx.fill();
      }
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = ink.text;
      ctx.lineWidth = 1;
      ctx.beginPath();
      smoothPath(ctx, bed0.slice(0, wetEnd));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Stille havflate som referanse.
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = ink.muted;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, sea);
    ctx.lineTo(xOf(L * COAST), sea);
    ctx.stroke();
    ctx.setLineDash([]);

    // Etiketter, få og korte. Plasseres i prioritert rekkefølge uten å dekke hverandre.
    const big = narrow ? 14 : 15;
    const lay = new LabelLayout(ctx, { x0: 4, y0: 2, x1: w - 4, y1: bottom - 2 });

    // Retning: når bølgen har delt seg, én pil hver vei over vannflaten.
    const split = stage === "etter" && time.current > 240;
    if (split) {
      let iL = 0;
      let iR = 0;
      const mid = Math.round(p.xTop / s.dx);
      let eL = 0;
      let eR = 0;
      for (let i = 0; i < N; i++) {
        const e = Math.abs(s.eta[i]);
        if (i < mid && e > eL) {
          eL = e;
          iL = i;
        }
        if (i >= mid && s.d[i] > 30 && e > eR) {
          eR = e;
          iR = i;
        }
      }
      const y = top - 6;
      if (eL > 0.05 && iL > 8) {
        const X = xOf((iL + 0.5) * s.dx);
        arrow(ctx, X + 20, y, X - 22, ink.seaMid, 2);
        lay.reserve({ x0: X - 24, y0: y - 6, x1: X + 22, y1: y + 6 });
      }
      if (eR > 0.05) {
        const X = xOf((iR + 0.5) * s.dx);
        arrow(ctx, X - 20, y, X + 22, ink.seaMid, 2);
        lay.reserve({ x0: X - 22, y0: y - 6, x1: X + 24, y1: y + 6 });
      }
    }
    const headline = split
      ? "bølgen brer seg begge veier"
      : stage === "før"
        ? "Før skjelvet: plategrensa er låst"
        : "Rett etter skjelvet";
    lay.place(headline, [{ x: w / 2, y: 18 }], { align: "center", color: ink.sea });

    // Pilene langs bruddet er tegnet allerede; hold etikettene unna dem.
    const fax = xOf(xU);
    const fay = yZ(zU);
    const fbx = xOf(xLc);
    const fby = yZ(zL);
    const fx = (fax + fbx) / 2;
    const fy = (fay + fby) / 2;
    if (RAKE[kind] !== 0 && stage === "etter")
      lay.reserve({ x0: fx - 22, y0: fy - 22, x1: fx + 22, y1: fy + 22 });

    lay.place(
      "havnivå i ro",
      [
        { x: 6, y: sea - 8 },
        { x: 6, y: sea - 26 },
      ],
      { color: ink.muted, weight: "400" },
    );
    const landX = xOf(L * 0.9);
    const landY = yZ(elevation(L * 0.9));
    lay.place(
      "land",
      [
        { x: landX, y: landY - 10 },
        { x: landX, y: landY - 28 },
        { x: w - 6, y: landY - 10, align: "right" },
      ],
      {
        align: "center",
      },
    );
    const gX = xOf(xT);
    const gY = yZ(zT);
    lay.place(
      "grøft",
      [
        { x: gX, y: gY + 22 },
        { x: gX + 10, y: gY + 26, align: "left", to: { x: gX, y: gY + 4 } },
        { x: gX - 10, y: gY + 26, align: "right", to: { x: gX, y: gY + 4 } },
        { x: gX + 14, y: gY + 44, align: "left", to: { x: gX, y: gY + 4 } },
      ],
      { align: "center", size: big },
    );
    if (!narrow) {
      const shX = xOf(L * (COAST - 0.04));
      lay.place(
        "sokkel",
        [
          { x: shX, y: sea + 22 },
          { x: shX, y: sea + 40 },
        ],
        { align: "center" },
      );
    }

    if (stage === "etter") {
      let iUp = 0;
      let iDn = 0;
      for (let i = 0; i < N; i++) {
        if (disp[i] > disp[iUp]) iUp = i;
        if (disp[i] < disp[iDn]) iDn = i;
      }
      if (disp[iUp] > 0.1) {
        const X = xOf((iUp + 0.5) * s.dx);
        const Y = bed[iUp + 1].y - 2;
        const to = { x: X, y: Y };
        lay.place(
          "løft",
          [
            { x: X - 30, y: Y - 30, align: "right", to },
            { x: X + 30, y: Y - 30, align: "left", to },
            { x: X - 30, y: Y - 50, align: "right", to },
            { x: X + 30, y: Y - 50, align: "left", to },
            { x: X - 34, y: Y + 30, align: "right", to },
          ],
          { color: ink.uplift, weight: "600" },
        );
      }
      if (disp[iDn] < -0.1) {
        const X = xOf((iDn + 0.5) * s.dx);
        const Y = bed[iDn + 1].y - 2;
        const to = { x: X, y: Y };
        lay.place(
          "senkning",
          [
            { x: X + 28, y: Y - 28, align: "left", to },
            { x: X - 28, y: Y - 28, align: "right", to },
            { x: X + 28, y: Y - 48, align: "left", to },
            { x: X - 28, y: Y - 48, align: "right", to },
            { x: X + 30, y: Y + 34, align: "left", to },
          ],
          { color: ink.sink, weight: "600" },
        );
      }
    }

    const plateX = xOf(L * 0.1);
    const plateY = yZ(elevation(L * 0.1));
    lay.place(
      "havbunnsplate",
      [
        { x: plateX, y: plateY + 42 },
        { x: 8, y: plateY + 42 },
        { x: plateX, y: plateY + 64 },
        { x: 8, y: plateY + 86 },
      ],
      { color: ink.panel, halo: "rgba(60,52,46,0.6)" },
    );
    const opX = xOf(L * (narrow ? 0.62 : 0.7));
    lay.place(
      "overliggende plate",
      [
        { x: opX, y: yZ(-15_500) },
        { x: opX, y: yZ(-10_000) },
        { x: opX, y: yZ(-20_000) },
        { x: w - 8, y: yZ(-15_500), align: "right" },
      ],
      { color: ink.panel, halo: "rgba(60,52,46,0.6)", align: "center" },
    );

    // Bruddflaten kan gå dypere enn snittet. Den er klippet ved bunnen av rammen,
    // og etiketten sier da fra om at den fortsetter.
    const clipped = zT - dL < -Z_BOTTOM;
    const long = clipped ? "bruddflate, fortsetter dypere" : "bruddflate";
    const to = { x: fx, y: fy };
    const fopts = { color: ink.panel, halo: "rgba(120,40,30,0.7)", weight: "600" } as const;
    const spots = (t: string) => [
      { x: fx + 12, y: fy + 26, text: t },
      { x: fx + 26, y: fy + 5, text: t },
      { x: fx - 26, y: fy + 5, align: "right" as const, text: t },
      { x: fbx + 14, y: bottom - 10, text: t, to },
      { x: fbx - 14, y: bottom - 10, align: "right" as const, text: t, to },
      { x: fx + 26, y: fy - 22, text: t, to },
    ];
    lay.place(long, clipped ? [...spots(long), ...spots("bruddflate")] : spots(long), fopts);
  }

  const s = sim.current;
  let up = 0;
  let down = 0;
  const p0 = fault();
  for (let i = 0; i < N; i++) {
    if (s.d[i] < 20) continue;
    const v = seafloorUz((i + 0.5) * s.dx, p0);
    up = Math.max(up, v);
    down = Math.min(down, v);
  }
  const coastEta = s.eta[coastIndex()];
  const minutes = time.current / 60;
  const vertical = Math.abs(slip * Math.sin((RAKE[kind] * Math.PI) / 180));

  const conclusion =
    kind === "side"
      ? "Når berget bare flytter seg sidelengs langs en lang forkastning, løftes ikke havbunnen. Da får vannet ingen loddrett dytt, og det blir nesten ingen bølge, selv om skjelvet kan være stort."
      : stage === "før"
        ? "Før skjelvet er havet i ro. Trykk Start eller Fram ett steg for å la bruddet gå."
        : time.current < 60
          ? `Havbunnen løftes opptil ${nb(up, 1)} m og senkes opptil ${nb(Math.abs(down), 1)} m. Vannflaten over får nesten samme form med én gang, fordi hele vannsøylen over havbunnen flyttes.`
          : maxCoast.current.first < 0
            ? "Mot land kom dalen først her, så havet trekker seg tilbake før vannet stiger. Det følger av at senkningen ligger nærmest land i dette tilfellet. Ved andre kilder kan toppen komme først."
            : maxCoast.current.first > 0
              ? "Mot land kom toppen først her. Havet trekker seg altså ikke alltid tilbake før vannet stiger."
              : "Vannflaten søker tilbake mot likevekt, og bølgen deler seg i en del som går ut mot havet og en del som går inn mot land.";

  const scaleText = `Dybder og plater: høyden er forstørret ca. ${scales.ve} ganger. Havbunnens løft og senkning og vannflaten: høyden er forstørret ca. ${scales.we} ganger, ellers ville de ikke synes.`;

  return (
    <Lab
      id="m1"
      index="M1"
      title="Havbunnen flytter vannet"
      question="Hva må skjelvet gjøre med havbunnen for at det skal bli en tsunami?"
      assume={`Tenkt subduksjonssone, ikke et bestemt jordskjelv. Bruddet ligger på plategrensa og er uendelig langt langs grøfta. Løft og senkning er en forenklet elastisk form med like stort areal opp og ned, ikke en full beregning. Vannet følger havbunnen med én gang og brer seg deretter som en lang bølge med fart √(g · d). Bølgen stopper ved kysten i modellen. Oppskylling på land er ikke med.`}
      conclusion={conclusion}
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="overflow-hidden rounded-2xl border border-line bg-card">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label={`Snitt fra dyphavet over grøfta til kysten. ${conclusion}`}
              className="h-[360px] w-full sm:h-[440px]"
            />
          </div>
          <FigureNote>
            Snitt på {nb(L / 1000)} km fra havet til land, {nb(Z_BOTTOM / 1000)} km dypt.{" "}
            {scaleText}
          </FigureNote>
        </div>
        <div className="flex flex-col gap-3">
          <Choice
            label="Bevegelse i skjelvet"
            value={kind}
            options={[
              { id: "skyv", label: "Skyv" },
              { id: "side", label: "Sidelengs" },
              { id: "normal", label: "Normal" },
            ]}
            onChange={(id0) => {
              setKind(id0);
              const pr = PRESET[id0];
              setSlip(pr.slip);
              setDip(pr.dip);
              setWidth(pr.width);
              setDepth(pr.depth);
            }}
          />
          <Slider
            label="Forskyvning langs bruddet"
            value={slip}
            min={1}
            max={30}
            step={1}
            unit="m"
            onChange={setSlip}
          />
          <Slider
            label="Helning på bruddet"
            value={dip}
            min={8}
            max={60}
            step={1}
            unit="°"
            onChange={setDip}
          />
          <Slider
            label="Bredde på bruddet"
            value={width}
            min={20}
            max={160}
            step={5}
            unit="km"
            onChange={setWidth}
          />
          <Slider
            label="Dyp til øvre kant"
            value={depth}
            min={0}
            max={20}
            step={1}
            unit="km"
            onChange={setDepth}
            note="under havbunnen ved grøfta"
          />
        </div>
      </div>
      <Transport
        playing={playing}
        onToggle={start}
        onReset={() => reset("før")}
        onStep={step}
        stepLabel={stage === "før" ? "Utløs skjelvet" : "Fram 2 minutter"}
        time={`Simulert tid ${nb(minutes, 1)} min${reduce ? "" : " · 1 s avspilling ≈ 6 min"}`}
      />
      <Readouts
        items={[
          { k: "Største løft", v: `${nb(up, 1)} m` },
          { k: "Største senkning", v: `${nb(Math.abs(down), 1)} m` },
          {
            k: "Loddrett del av forskyvningen",
            v: `${nb(vertical, 1)} m`,
            hint: "det som kan løfte vannet",
          },
          {
            k: "Vannflaten ved kysten nå",
            v: `${nb(coastEta, 2)} m`,
            hint:
              maxCoast.current.first < 0
                ? "dalen kom først"
                : maxCoast.current.first > 0
                  ? "toppen kom først"
                  : "ikke kommet ennå",
          },
        ]}
      />
    </Lab>
  );
}
