import { useEffect, useMemo, useRef, useState } from "react";
import { Choice, Lab, Readouts } from "./lab";
import { fitCanvas } from "./draw";
import { runSlide } from "./sim/fjord";
import { ink } from "./sim/palette";

type Scene = "liten" | "stor";
type Act = "ingen" | "skole" | "rute" | "ikke-bygg";
type Kind = "hus" | "skole" | "kai" | "plan";

type Site = { id: string; name: string; x: number; y: number; kind: Kind };

const W = 168;
const H = 104;
const MAP_M = 840;
const CELL = MAP_M / W;

function shoreX(j: number) {
  return 32 + 5 * Math.sin(j / 13);
}

function elev(i: number, j: number) {
  const s = shoreX(j);
  if (i < s - 0.5) return -10;
  const inland = Math.max(0, i - s);
  const plain = Math.min(2.6, inland * 0.16);
  const bench = 7.2 * Math.exp(-Math.pow((i - 74) / 13, 2) - Math.pow((j - 42) / 15, 2));
  const hill = 30 * Math.exp(-Math.pow((i - 98) / 13, 2) - Math.pow((j - 30) / 13, 2));
  const back = 8 * Math.exp(-Math.pow((j - 90) / 12, 2)) * Math.min(1, inland / 28);
  return plain + bench + hill + back;
}

const SITES: Site[] = [
  { id: "kai", name: "Kai", x: 40, y: 56, kind: "kai" },
  { id: "h1", name: "Hus ved sjøen", x: 50, y: 46, kind: "hus" },
  { id: "h2", name: "Hus", x: 58, y: 68, kind: "hus" },
  { id: "skole", name: "Skole", x: 74, y: 42, kind: "skole" },
  { id: "h3", name: "Hus i lia", x: 92, y: 36, kind: "hus" },
  { id: "plan", name: "Planlagt bygg", x: 52, y: 66, kind: "plan" },
];

const MARKED: [number, number][] = [
  [74, 42],
  [88, 34],
];
const OPEN: [number, number][] = [
  [74, 42],
  [46, 58],
  [44, 74],
  [78, 90],
];

function flood(level: number) {
  const wet = new Uint8Array(W * H);
  const q: number[] = [];
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      if (elev(i, j) < 0) {
        wet[j * W + i] = 1;
        q.push(j * W + i);
      }
    }
  }
  while (q.length) {
    const k = q.pop() as number;
    const i = k % W;
    const j = (k / W) | 0;
    const nbrs = [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1],
    ];
    for (let n = 0; n < nbrs.length; n++) {
      const ii = nbrs[n][0];
      const jj = nbrs[n][1];
      if (ii < 0 || jj < 0 || ii >= W || jj >= H) continue;
      const nk = jj * W + ii;
      if (wet[nk]) continue;
      if (elev(ii, jj) <= level) {
        wet[nk] = 1;
        q.push(nk);
      }
    }
  }
  return wet;
}

function pathLength(pts: [number, number][]) {
  let m = 0;
  for (let i = 1; i < pts.length; i++) {
    m += Math.hypot((pts[i][0] - pts[i - 1][0]) * CELL, (pts[i][1] - pts[i - 1][1]) * CELL);
  }
  return m;
}

function pathCut(pts: [number, number][], level: number) {
  for (let s = 0; s < pts.length - 1; s++) {
    for (let t = 0; t <= 16; t++) {
      const u = t / 16;
      const i = pts[s][0] + (pts[s + 1][0] - pts[s][0]) * u;
      const j = pts[s][1] + (pts[s + 1][1] - pts[s][1]) * u;
      if (elev(i, j) <= level) return true;
    }
  }
  return false;
}

export function ModelRisk() {
  const [scene, setScene] = useState<Scene>("liten");
  const [act, setAct] = useState<Act>("ingen");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sim = useMemo(() => {
    const opts =
      scene === "liten"
        ? { thick: 9, speed: 28, entry: "vann" as const }
        : { thick: 14, speed: 32, entry: "skrent" as const };
    const run = runSlide(opts);
    return { level: Math.max(0.4, run.far), arrival: Math.max(30, run.tFar) };
  }, [scene]);

  const level = Math.min(18, sim.level);
  const wet = useMemo(() => flood(level), [level]);
  const schoolMoved = act === "skole";
  const countPlan = act !== "ikke-bygg";
  const marked = act === "rute";

  const objects = useMemo(() => {
    return SITES.map((b) => {
      const moved = b.kind === "skole" && schoolMoved;
      const x = moved ? 98 : b.x;
      const y = moved ? 30 : b.y;
      const z = Math.round(Math.max(0, elev(x, y)) * 10) / 10;
      const included = b.kind !== "plan" || countPlan;
      const flooded = included && z <= level;
      return { ...b, x, y, z, included, flooded };
    });
  }, [schoolMoved, countPlan, level]);

  const exposed = objects.filter((b) => b.included && b.flooded && b.kind !== "plan");
  const future = countPlan && objects.some((b) => b.kind === "plan" && b.flooded);
  const route = marked ? MARKED : OPEN;
  const metres = pathLength(route);
  const walk = metres / (marked ? 1.6 : 0.75);
  const routeCut = pathCut(route, level);
  const makesIt = !routeCut && walk < sim.arrival;
  const school = objects.find((b) => b.kind === "skole");

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const fit = fitCanvas(node);
    if (!fit) return;
    const { ctx, w, h } = fit;
    ctx.fillStyle = ink.paper;
    ctx.fillRect(0, 0, w, h);
    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;
    const octx = off.getContext("2d");
    if (!octx) return;
    const img = octx.createImageData(W, H);
    const px = img.data;
    for (let j = 0; j < H; j++) {
      for (let i = 0; i < W; i++) {
        const z = elev(i, j);
        const k = j * W + i;
        const dzx = i > 0 ? z - elev(i - 1, j) : 0;
        const dzy = j > 0 ? z - elev(i, j - 1) : 0;
        const light = Math.max(0.45, Math.min(1.15, 0.82 - dzx * 0.22 - dzy * 0.12));
        let r: number;
        let g: number;
        let b: number;
        if (z < 0) {
          const deep = Math.max(0, Math.min(1, -z / 10));
          r = 14 + (1 - deep) * 20;
          g = 50 + (1 - deep) * 30;
          b = 72 + (1 - deep) * 16;
        } else if (wet[k]) {
          const depth = Math.max(0, level - z);
          const t = Math.max(0, Math.min(1, depth / Math.max(level, 0.4)));
          r = 40 + (1 - t) * 90;
          g = 110 + (1 - t) * 50;
          b = 130 + (1 - t) * 30;
        } else {
          const t = Math.max(0, Math.min(1, z / 26));
          r = (196 - t * 70) * light;
          g = (184 - t * 78) * light;
          b = (150 - t * 70) * light;
        }
        const p = k * 4;
        px[p] = r;
        px[p + 1] = g;
        px[p + 2] = b;
        px[p + 3] = 255;
      }
    }
    octx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(off, 0, 0, w, h);
    const cw = w / W;
    const ch = h / H;

    ctx.lineWidth = 2.2;
    ctx.strokeStyle = routeCut ? ink.mark : marked ? ink.safe : ink.route;
    ctx.setLineDash(marked ? [] : [5, 4]);
    ctx.beginPath();
    route.forEach((p, i) => {
      const x = p[0] * cw;
      const y = p[1] * ch;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    const place: Record<string, [number, number]> = {
      kai: [16, 20],
      h1: [16, -2],
      h2: [16, 16],
      skole: [16, -8],
      h3: [14, -6],
      plan: [16, 18],
    };
    ctx.font = "12px Source Sans 3, sans-serif";
    for (const b of objects) {
      if (!b.included) continue;
      const x = b.x * cw;
      const y = b.y * ch;
      ctx.fillStyle = b.flooded ? ink.mark : ink.safe;
      ctx.beginPath();
      ctx.moveTo(x, y + 7);
      ctx.lineTo(x + 6, y);
      ctx.lineTo(x + 12, y + 7);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(x + 2, y + 7, 8, 7);
      const off = place[b.id] ?? [16, 12];
      const tx = x + off[0];
      const ty = y + off[1];
      const text = `${b.name} ${b.z.toFixed(0)} m`;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(251,247,240,0.9)";
      ctx.strokeText(text, tx, ty);
      ctx.fillStyle = ink.text;
      ctx.fillText(text, tx, ty);
    }

    const bar = (200 / CELL) * cw;
    ctx.strokeStyle = ink.text;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(12, h - 16);
    ctx.lineTo(12 + bar, h - 16);
    ctx.moveTo(12, h - 20);
    ctx.lineTo(12, h - 12);
    ctx.moveTo(12 + bar, h - 20);
    ctx.lineTo(12 + bar, h - 12);
    ctx.stroke();
    ctx.fillStyle = ink.text;
    ctx.fillText("200 m", 12, h - 24);
  }, [wet, objects, marked, level, route, routeCut]);

  const conclusion = `${scene === "liten" ? "Mindre" : "Større"} skred setter ${level.toFixed(1)} m ved måleren innerst. ${exposed.length} bygg som finnes i dag ligger på terreng under det nivået. ${
    act === "skole"
      ? "Skolen er flyttet opp på kollen. Det er eksponeringen som er endret. Fjellet er ikke flyttet, og de andre husene står der de sto."
      : act === "rute"
        ? routeCut
          ? "Ruten du merket ligger under vannet i dette scenariet. Merking endrer sårbarheten bare hvis folk rekker fram, og bare hvis ruten selv holder seg tørr."
          : makesIt
            ? `Den merkede ruten er ${Math.round(metres)} m og holder seg over vannet. I øvelsen rekker rask gange fram før bølgen. Det er sårbarheten som er endret, ikke faren.`
            : `Ruten er tørr, men gangen tar ${Math.round(walk)} s og bølgen er der etter ${Math.round(sim.arrival)} s. I en fjord er tiden kort. En rute i modellen er ikke en godkjent evakueringsrute.`
        : act === "ikke-bygg"
          ? "Det planlagte bygget er tatt ut. Det endrer fremtidig eksponering, ikke husene som allerede står der."
          : "Uten tiltak ser du hvilke bygg som ligger under nivået. Drenering av fjellet er ikke med: den ville endret sannsynligheten, og den regnes ikke her."
  }`;

  return (
    <Lab
      id="m7"
      index="M7"
      title="Risiko før bølgen"
      replaces="Erstatter den gamle M7, som telte klosser i et rektangel."
      question="Hvilket ledd i risikoen treffer tiltaket: faren, eksponeringen eller sårbarheten?"
      assume="Nivået er bølgehøyden fra fjordmodellen ved den indre måleren, lagt ut som et sammenhengende vannspeil på et tenkt terreng. Det er ikke oppskylling opp en skråning, ikke en faresone fra NVE, og ikke et evakueringskart. Byggene og stedet er oppdiktet. Gange er 1,6 m/s på merket rute og 0,75 m/s på den umerkede."
      conclusion={conclusion}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas ref={canvasRef} className="h-[440px] w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Choice
          label="Øvelsesscenario"
          value={scene}
          options={[
            { id: "liten", label: "Mindre skred" },
            { id: "stor", label: "Større skred" },
          ]}
          onChange={setScene}
        />
        <Choice
          label="Tiltak"
          value={act}
          options={[
            { id: "ingen", label: "Ingen" },
            { id: "skole", label: "Flytt skolen" },
            { id: "rute", label: "Merk ruten" },
            { id: "ikke-bygg", label: "Ikke bygg mer" },
          ]}
          onChange={setAct}
        />
      </div>
      <Readouts
        items={[
          { k: "Nivå fra måleren", v: `${level.toFixed(1)} m`, hint: "ikke en faresone" },
          { k: "I nivået nå", v: String(exposed.length), hint: future ? "pluss ett planlagt bygg" : "planlagt bygg er ute" },
          { k: "Skole", v: school ? `${school.z.toFixed(0)} m` : "–", hint: school?.flooded ? "i nivået" : "over" },
          {
            k: "Gange mot bølge",
            v: `${Math.round(walk)} s / ${Math.round(sim.arrival)} s`,
            hint: routeCut ? "ruten blir våt" : makesIt ? "rekker i øvelsen" : "for sen",
          },
        ]}
      />
    </Lab>
  );
}
