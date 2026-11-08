import { useEffect, useRef, useState } from "react";
import { Choice, FigureNote, Lab, Readouts, Slider, Transport } from "./lab";
import { nb, roundFactor } from "./util";
import { clearPaper, fitCanvas, useSimLoop } from "./draw";
import { advance as advanceSWE, column, fillStill, type Column } from "./sim/swe";
import { beachElevation } from "./sim/profiles";
import { leader, skyTo, smoothPath, type Pt } from "./paint";
import { ink } from "./sim/palette";
import { LabelLayout, type Spot } from "./place";
import { runupStatus } from "./a11y";

const N = 640;
const L = 16_000;
const DX = L / N;
const SHORE = 10_000;
const OFFSHORE = 30;
const VIEW0 = 3_000;
const VIEW1 = 12_500;
const GAUGE = 6_000;
const HOUSE = SHORE + 120;
const DT_FRAME = 2;
const T_END = 20 * 60;
const WET = 0.03;

type Beach = "slak" | "bratt";
type Lead = "dal" | "topp";
type Focus = "alle" | "1" | "2" | "3" | "4";

const SLOPE: Record<Beach, number> = { slak: 1 / 60, bratt: 1 / 15 };
const cellOf = (x: number) => Math.min(N - 1, Math.max(0, Math.floor(x / DX)));

export function ModelRunup() {
  const [beach, setBeach] = useState<Beach>("slak");
  const [lead, setLead] = useState<Lead>("dal");
  const [amp, setAmp] = useState(1.5);
  const [focus, setFocus] = useState<Focus>("alle");
  const [playing, setPlaying] = useState(false);
  const [, setTick] = useState(0);
  const [ve, setVe] = useState("1");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sim = useRef<Column>(column(N));
  const maxSurf = useRef(new Float64Array(N));
  const time = useRef(0);
  const m = useRef({ gMax: 0, gMin: 0, limit: -1, house: 0, first: 0 });

  const shoreCell = () => {
    const c = sim.current;
    for (let i = 0; i < N; i++) if (c.b[i] >= 0) return i;
    return N - 1;
  };

  const reset = () => {
    const c = sim.current;
    const slope = SLOPE[beach];
    for (let i = 0; i < N; i++) c.b[i] = beachElevation((i + 0.5) * DX, SHORE, OFFSHORE, slope);
    fillStill(c, 0);
    const sigma = 900;
    const x0 = SHORE - 5000;
    const x1 = x0 + 1800;
    const cc = Math.sqrt(9.81 * OFFSHORE);
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) * DX;
      if (c.b[i] > -OFFSHORE + 0.5) continue;
      const near = Math.exp(-Math.pow((x - x1) / sigma, 2));
      const far = Math.exp(-Math.pow((x - x0) / sigma, 2));
      // Den fremste delen (nærmest land) kommer først.
      const e = lead === "dal" ? amp * (far - 0.6 * near) : amp * (near - 0.6 * far);
      c.h[i] += e;
      c.hu[i] = e * cc;
    }
    maxSurf.current.fill(-Infinity);
    time.current = 0;
    m.current = { gMax: 0, gMin: 0, limit: -1, house: 0, first: 0 };
    setPlaying(false);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beach, lead, amp]);

  const advance = (seconds: number) => {
    const c = sim.current;
    const shore = shoreCell();
    const g = cellOf(GAUGE);
    const hc = cellOf(HOUSE);
    let left = seconds;
    while (left > 0 && time.current < T_END) {
      const dt = Math.min(DT_FRAME, left);
      advanceSWE(c, DX, dt, 0.025);
      time.current += dt;
      left -= dt;
      const eta = c.b[g] + c.h[g];
      m.current.gMax = Math.max(m.current.gMax, eta);
      m.current.gMin = Math.min(m.current.gMin, eta);
      const se = c.h[shore - 1] + c.b[shore - 1];
      if (m.current.first === 0 && Math.abs(se) > 0.1) m.current.first = Math.sign(se);
      // Inntrenging: sammenhengende vått område fra strandlinja og innover.
      let i = shore;
      while (i < N && c.h[i] > WET) i++;
      if (i - 1 > m.current.limit && i > shore) m.current.limit = i - 1;
      if (c.b[hc] >= 0 && c.h[hc] > WET && i > hc)
        m.current.house = Math.max(m.current.house, c.h[hc]);
      for (let k = 0; k < N; k++) {
        if (c.h[k] > WET) {
          const s = c.b[k] + c.h[k];
          if (s > maxSurf.current[k]) maxSurf.current[k] = s;
        }
      }
    }
    return time.current < T_END;
  };

  const frames = useRef(0);
  const { reduce } = useSimLoop(
    canvasRef,
    playing,
    (n) => {
      const more = advance(DT_FRAME * n);
      frames.current += n;
      if (frames.current >= 10 || !more) {
        frames.current = 0;
        setTick((t) => t + 1);
      }
      if (!more) setPlaying(false);
      return more;
    },
    draw,
  );

  const c0 = sim.current;
  const shore = shoreCell();
  const lim = m.current.limit;
  const reached = lim >= shore;
  const runup = reached ? Math.max(0, c0.b[lim]) : 0;
  const reach = reached ? (lim + 1) * DX - SHORE : 0;
  const waveH = m.current.gMax - m.current.gMin;
  const houseDepth = m.current.house;

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = fitCanvas(canvas);
    if (!fit) return;
    const { ctx, w, h } = fit;
    clearPaper(ctx, w, h);
    const c = sim.current;
    const narrow = w < 560;
    const zTop = 22;
    const zBot = -OFFSHORE - 2;
    const top = 36;
    const bottom = h - 8;
    const pxM = (bottom - top) / (zTop - zBot);
    const xOf = (x: number) => ((x - VIEW0) / (VIEW1 - VIEW0)) * w;
    const yZ = (z: number) => top + (zTop - z) * pxM;
    const pxMH = w / (VIEW1 - VIEW0);
    const veS = roundFactor(pxM / pxMH);
    if (veS !== ve) setVe(veS);
    const sea = yZ(0);

    skyTo(ctx, w, sea);
    const i0 = cellOf(VIEW0);
    const i1 = cellOf(VIEW1);

    // Vann: bare der det faktisk står vann.
    ctx.fillStyle = ink.seaLite;
    for (let i = i0; i <= i1; i++) {
      if (c.h[i] <= WET) continue;
      const x = xOf(i * DX);
      const x2 = xOf((i + 1) * DX) + 0.6;
      const ys = yZ(c.b[i] + c.h[i]);
      const yb = yZ(c.b[i]);
      const g = ctx.createLinearGradient(0, ys, 0, yZ(-OFFSHORE));
      g.addColorStop(0, ink.waterTop);
      g.addColorStop(0.15, ink.seaLite);
      g.addColorStop(1, ink.waterMid);
      ctx.fillStyle = g;
      ctx.fillRect(x, ys, x2 - x, Math.max(0, yb - ys));
    }
    // Vannflaten som en glatt linje.
    ctx.strokeStyle = ink.sea;
    ctx.lineWidth = 1.6;
    let run: Pt[] = [];
    const flush = () => {
      if (run.length > 1) {
        ctx.beginPath();
        smoothPath(ctx, run);
        ctx.stroke();
      }
      run = [];
    };
    for (let i = i0; i <= i1; i++) {
      if (c.h[i] > WET) run.push({ x: xOf((i + 0.5) * DX), y: yZ(c.b[i] + c.h[i]) });
      else flush();
    }
    flush();

    // Terreng.
    const ground: Pt[] = [];
    for (let i = i0; i <= i1; i++) ground.push({ x: xOf((i + 0.5) * DX), y: yZ(c.b[i]) });
    ctx.beginPath();
    ctx.moveTo(ground[0].x, bottom);
    smoothPath(ctx, ground, false);
    ctx.lineTo(ground[ground.length - 1].x, bottom);
    ctx.closePath();
    const gg = ctx.createLinearGradient(0, yZ(15), 0, bottom);
    gg.addColorStop(0, ink.land);
    gg.addColorStop(1, ink.landDark);
    ctx.fillStyle = gg;
    ctx.fill();
    ctx.beginPath();
    smoothPath(ctx, ground);
    ctx.strokeStyle = ink.landDark;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Høyeste nådde vannstand, stiplet rød.
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = ink.mark;
    ctx.lineWidth = 1.3;
    run = [];
    for (let i = i0; i <= i1; i++) {
      const v = maxSurf.current[i];
      if (Number.isFinite(v) && v > 0.05) run.push({ x: xOf((i + 0.5) * DX), y: yZ(v) });
      else flush();
    }
    if (run.length > 1) {
      ctx.beginPath();
      smoothPath(ctx, run);
      ctx.stroke();
    }
    run = [];
    ctx.setLineDash([]);

    // Havnivå i ro, referanselinja for alle høydemål.
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = ink.text;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, sea);
    ctx.lineTo(w, sea);
    ctx.stroke();
    ctx.setLineDash([]);

    // Etiketter plasseres i prioritert rekkefølge uten å dekke hverandre.
    const lay = new LabelLayout(ctx, { x0: 6, y0: 4, x1: w - 6, y1: bottom - 2 });
    // Forklaringen øverst til høyre først, med god avstand til den runde kanten.
    lay.place(
      narrow ? "Stiplet rød: høyeste vannstand" : "Stiplet rød: høyeste vannstand så langt",
      [{ x: w - 16, y: 26 }],
      { align: "right", color: ink.mark, weight: "400" },
    );
    lay.place(
      "havnivå i ro",
      [
        { x: 8, y: sea - 8 },
        { x: 8, y: sea + 20 },
      ],
      { weight: "400" },
    );

    // Huset der vanndypet på land leses av.
    const hb = c.b[cellOf(HOUSE)];
    const hx = xOf(HOUSE);
    const hy = yZ(hb);
    ctx.fillStyle = ink.panel;
    ctx.strokeStyle = ink.text;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(hx - 8, hy);
    ctx.lineTo(hx - 8, hy - 10);
    ctx.lineTo(hx, hy - 17);
    ctx.lineTo(hx + 8, hy - 10);
    ctx.lineTo(hx + 8, hy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    lay.reserve({ x0: hx - 9, y0: hy - 18, x1: hx + 9, y1: hy + 1 });

    const show = (k: Focus) => focus === "alle" || focus === k;
    // Pila for vanndypet ved huset tegnes senere, men plassen holdes av nå.
    if (show("3") && houseDepth > 0.02)
      lay.reserve({ x0: hx + 11, y0: yZ(hb + houseDepth) - 1, x1: hx + 21, y1: hy + 1 });
    const tag = (n: string, text: string, spots: Spot[]) => {
      lay.place(narrow ? n : `${n} ${text}`, spots, { color: ink.mark, weight: "700" });
    };
    const vArrow = (x: number, y1: number, y2: number) => {
      ctx.strokeStyle = ink.mark;
      ctx.fillStyle = ink.mark;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.stroke();
      lay.reserve({ x0: x - 5, y0: Math.min(y1, y2) - 1, x1: x + 5, y1: Math.max(y1, y2) + 1 });
      for (const [y, d] of [
        [y1, 1],
        [y2, -1],
      ] as const) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 4, y + d * 7);
        ctx.lineTo(x + 4, y + d * 7);
        ctx.closePath();
        ctx.fill();
      }
    };

    // 1 Bølgehøyde ute i vannet: dal til topp ved måleren.
    const gx = xOf(GAUGE);
    ctx.strokeStyle = ink.text;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(gx, yZ(-OFFSHORE));
    ctx.lineTo(gx, yZ(4));
    ctx.stroke();
    lay.place(
      "måler",
      [
        { x: gx + 5, y: yZ(-OFFSHORE) - 8 },
        { x: gx + 5, y: yZ(-OFFSHORE) - 28 },
      ],
      {
        weight: "400",
        color: ink.panel,
        halo: "rgba(12,48,64,0.55)",
      },
    );
    if (show("1") && waveH > 0.05) {
      vArrow(gx - 10, yZ(m.current.gMax), yZ(m.current.gMin));
      const gy = yZ(m.current.gMax);
      tag("1", "bølgehøyde", [
        { x: gx - 16, y: gy - 10, align: "right" },
        { x: gx + 8, y: gy - 10, align: "left" },
        { x: gx - 16, y: gy - 28, align: "right", to: { x: gx - 10, y: gy - 2 } },
      ]);
    }
    if (reached) {
      const lx = xOf((lim + 1) * DX);
      const sx = xOf(SHORE);
      // 2 Oppskylling: høyden over havnivå der vannet snudde.
      if (show("2")) {
        ctx.setLineDash([2, 3]);
        ctx.strokeStyle = ink.mark;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lx, yZ(runup));
        ctx.lineTo(Math.min(w - 4, lx + 30), yZ(runup));
        ctx.stroke();
        ctx.setLineDash([]);
        vArrow(Math.min(w - 8, lx + 24), sea, yZ(runup));
        const ax = Math.min(w - 8, lx + 24);
        const ry = yZ(runup);
        const to = { x: ax, y: ry - 2 };
        tag("2", "oppskylling", [
          { x: ax + 8, y: ry - 10, align: "left" },
          { x: ax - 8, y: ry - 10, align: "right" },
          { x: ax + 8, y: ry - 30, align: "left", to },
          { x: ax - 8, y: ry - 30, align: "right", to },
          { x: ax + 8, y: ry - 50, align: "left", to },
          { x: ax - 8, y: ry - 50, align: "right", to },
        ]);
      }
      // 4 Inntrenging: vannrett fra strandlinja.
      if (show("4")) {
        const y = sea + 26;
        ctx.strokeStyle = ink.mark;
        ctx.fillStyle = ink.mark;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx, y);
        ctx.lineTo(lx, y);
        ctx.stroke();
        leader(ctx, sx, sea, sx, y + 6, ink.mark);
        leader(ctx, lx, yZ(runup), lx, y + 6, ink.mark);
        const cx = (sx + lx) / 2;
        tag("4", "inntrenging", [
          { x: cx, y: y + 20, align: "center" },
          { x: lx + 8, y: y + 20, align: "left" },
          { x: sx - 8, y: y + 20, align: "right" },
          { x: cx, y: y + 40, align: "center" },
        ]);
      }
    }
    // 3 Oversvømmelsesdybde ved huset: vann over bakken.
    if (show("3") && houseDepth > 0.02) {
      vArrow(hx + 16, hy, yZ(hb + houseDepth));
      const dy = yZ(hb + houseDepth);
      const to = { x: hx + 16, y: dy - 2 };
      tag("3", "vanndyp", [
        { x: hx + 22, y: dy - 8, align: "left" },
        { x: hx - 12, y: dy - 8, align: "right" },
        { x: hx + 22, y: dy + 16, align: "left" },
        { x: hx + 22, y: dy - 28, align: "left", to },
        { x: hx - 12, y: dy - 28, align: "right", to },
        { x: hx + 22, y: dy - 48, align: "left", to },
        { x: hx - 12, y: dy - 48, align: "right", to },
      ]);
    }
  }

  const beachLabel = beach === "bratt" ? "den bratte kysten" : "den slake kysten";
  const conclusion = !reached
    ? m.current.first < 0
      ? "Vannet trekker seg tilbake ved stranda før bølgetoppen kommer. Det betyr ikke at faren er over."
      : `Bølgen har ikke nådd land ennå på ${beachLabel}. Trykk Start og se hvordan de fire målene dukker opp ett etter ett.`
    : `På ${beachLabel} er bølgehøyden ute ${nb(waveH, 1)} m fra dal til topp. Vannet nådde ${nb(runup, 1)} m over havnivået og ${nb(reach)} m inn fra strandlinja. Ved huset sto vannet ${houseDepth > 0.02 ? `${nb(houseDepth, 1)} m over bakken` : "ikke over bakken"}. Samme bølge gir altså fire ulike tall.`;

  const status = runupStatus({
    playing,
    time: time.current,
    end: T_END,
    reached,
    first: m.current.first,
    runup,
    reach,
    house: houseDepth,
  });

  return (
    <Lab
      id="m3"
      index="M3"
      title="Fire mål for samme bølge"
      question="Hvorfor er bølgehøyde, oppskylling, oversvømmelsesdybde og inntrenging fire forskjellige tall for samme bølge?"
      assume="Begrepsmodell langs én tenkt strand, ikke et bestemt sted. Ikke-lineær gruntvannslikning med litt friksjon mot bunnen. Bølgen er en lang bølge fra 30 m dyp, og den kan ikke brekke slik en vindbølge gjør. Alle høyder er målt fra havnivået i ro. Dette er ikke et farekart og gir ikke lokale flomnivåer."
      conclusion={conclusion}
      status={status}
    >
      <div className="flex flex-col gap-2">
        <div className="overflow-hidden rounded-2xl border border-line bg-card">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Snitt fra 30 m dyp inn over en strand og opp på land, med et hus og de fire målene merket med tall. ${status}`}
            aria-describedby="m3-figurmerknad"
            className="h-[340px] w-full sm:h-[400px]"
          />
        </div>
        <FigureNote id="m3-figurmerknad">
          Snitt på {nb((VIEW1 - VIEW0) / 1000, 1)} km. Høyden er forstørret ca. {ve} ganger, så
          stranda ser mye brattere ut enn den er. Tallene i figuren svarer til tallene i boksene
          under.
        </FigureNote>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Choice
          label="Kyst"
          value={beach}
          options={[
            { id: "slak", label: "Slak" },
            { id: "bratt", label: "Bratt" },
          ]}
          onChange={setBeach}
        />
        <Choice
          label="Hva kommer først til land"
          value={lead}
          options={[
            { id: "dal", label: "Dalen" },
            { id: "topp", label: "Toppen" },
          ]}
          onChange={setLead}
        />
        <Slider
          label="Bølgetopp ute"
          value={amp}
          min={0.5}
          max={3}
          step={0.1}
          unit="m"
          onChange={setAmp}
          note="over havnivået i ro"
        />
      </div>
      <Choice
        label="Fremhev"
        value={focus}
        options={[
          { id: "alle", label: "Alle" },
          { id: "1", label: "1 Bølgehøyde" },
          { id: "2", label: "2 Oppskylling" },
          { id: "3", label: "3 Oversvømmelsesdybde" },
          { id: "4", label: "4 Inntrenging" },
        ]}
        onChange={setFocus}
      />
      <Transport
        playing={playing}
        onToggle={() => {
          if (!playing && time.current >= T_END) reset();
          setPlaying((p) => !p);
        }}
        onReset={reset}
        onStep={() => {
          setPlaying(false);
          advance(30);
          setTick((t) => t + 1);
        }}
        stepLabel="Fram 30 sekunder"
        liveTime={false}
        toggleState={false}
        time={`Simulert tid ${nb(time.current / 60, 1)} min${reduce ? "" : " · 1 s avspilling ≈ 2 min"}`}
      />
      <Readouts
        items={[
          { k: "1 Bølgehøyde", v: `${nb(waveH, 1)} m`, hint: "ute i vannet, fra dal til topp" },
          {
            k: "2 Oppskylling",
            v: reached ? `${nb(runup, 1)} m` : "–",
            hint: "høyde over havnivået der vannet snudde",
          },
          {
            k: "3 Oversvømmelsesdybde",
            v: houseDepth > 0.02 ? `${nb(houseDepth, 1)} m` : "0 m",
            hint: `største vanndyp over bakken ved huset, ${nb(HOUSE - SHORE)} m inne`,
          },
          {
            k: "4 Inntrenging",
            v: reached ? `${nb(reach)} m` : "–",
            hint: "vannrett fra strandlinja",
          },
        ]}
      />
    </Lab>
  );
}
