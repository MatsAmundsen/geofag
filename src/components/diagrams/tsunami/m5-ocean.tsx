import { useEffect, useRef, useState } from "react";
import { Choice, Lab, Readouts, Transport } from "./lab";
import { INDIA_RINGS, PACIFIC_RINGS } from "./sim/coasts";
import { makeOcean, stepOcean, type Ocean, type Ring } from "./sim/oceanmap";
import { ink } from "./sim/palette";

function fmt(sec: number) {
  if (sec < 0) return "ikke ennå";
  if (sec === 0) return "i kilden";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h <= 0) return `${m} min`;
  return `${h} t ${m} min`;
}

function ringsFor(id: Ocean["id"]): readonly Ring[] {
  return id === "india" ? INDIA_RINGS : PACIFIC_RINGS;
}

/** Positive η (høyere vann) går mot rust, negativ mot dyp blå. Metning rundt ±0,4 m. */
function paintCell(depth: number, eta: number, out: Uint8ClampedArray, p: number) {
  const shall = Math.max(0, Math.min(1, 1 - depth / 5200));
  let r = 16 + shall * 46;
  let g = 58 + shall * 48;
  let b = 84 + shall * 28;
  const t = Math.tanh(eta / 0.4);
  if (t >= 0) {
    r += t * 175;
    g += t * 55;
    b += t * 20;
  } else {
    const a = -t;
    r = r * (1 - a) + 18 * a;
    g = g * (1 - a) + 42 * a;
    b = b * (1 - a) + 92 * a;
  }
  out[p] = r;
  out[p + 1] = g;
  out[p + 2] = b;
  out[p + 3] = 255;
}

export function ModelOcean() {
  const [id, setId] = useState<Ocean["id"]>("india");
  const [playing, setPlaying] = useState(false);
  const [stamp, setStamp] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);
  const ocean = useRef<Ocean>(makeOcean("india"));
  const play = useRef(false);
  const idRef = useRef<Ocean["id"]>("india");
  play.current = playing;
  idRef.current = id;

  const reset = (next = idRef.current) => {
    ocean.current = makeOcean(next);
    setPlaying(false);
    setStamp((s) => s + 1);
  };

  useEffect(() => {
    reset(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    let frame = 0;
    let acc = 0;
    let last = performance.now();
    let bank = 0;
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const wall = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (play.current) {
        bank += wall;
        while (bank >= 0.09) {
          bank -= 0.09;
          stepOcean(ocean.current, 1);
        }
        acc++;
        if (acc % 6 === 0) setStamp((s) => s + 1);
      }
      draw();
    };
    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const bw = Math.max(1, Math.round(rect.width * dpr));
      const bh = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width;
      const h = rect.height;
      const o = ocean.current;
      ctx.fillStyle = ink.paper;
      ctx.fillRect(0, 0, w, h);

      const mid = ((o.lat0 + o.lat1) / 2) * (Math.PI / 180);
      const geoW = (o.lon1 - o.lon0) * Math.cos(mid);
      const geoH = o.lat1 - o.lat0;
      const aspect = geoW / geoH;
      const margin = 16;
      let mw = w - margin * 2;
      let mh = h - margin * 2 - 28;
      if (mw / mh > aspect) mw = mh * aspect;
      else mh = mw / aspect;
      const ox = (w - mw) / 2;
      const oy = margin;

      let off = offRef.current;
      if (!off || off.width !== o.nx || off.height !== o.ny) {
        off = document.createElement("canvas");
        off.width = o.nx;
        off.height = o.ny;
        offRef.current = off;
      }
      const octx = off.getContext("2d");
      if (!octx) return;
      const img = octx.createImageData(o.nx, o.ny);
      for (let k = 0; k < o.nx * o.ny; k++) {
        const p = k * 4;
        if (o.land[k]) {
          img.data[p] = 201;
          img.data[p + 1] = 180;
          img.data[p + 2] = 149;
          img.data[p + 3] = 255;
        } else paintCell(o.H[k], o.eta[k], img.data, p);
      }
      octx.putImageData(img, 0, 0);
      ctx.save();
      ctx.beginPath();
      ctx.rect(ox, oy, mw, mh);
      ctx.clip();
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(off, ox, oy, mw, mh);

      const xOf = (lon: number) => ox + ((lon - o.lon0) / (o.lon1 - o.lon0)) * mw;
      const yOf = (lat: number) => oy + ((o.lat1 - lat) / (o.lat1 - o.lat0)) * mh;
      ctx.beginPath();
      for (const ring of ringsFor(o.id)) {
        for (let i = 0; i < ring.length; i++) {
          const x = xOf(ring[i][0]);
          const y = yOf(ring[i][1]);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
      }
      ctx.fillStyle = ink.land;
      ctx.fill("evenodd");
      ctx.strokeStyle = ink.landDark;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = ink.line;
      ctx.strokeRect(ox + 0.5, oy + 0.5, mw - 1, mh - 1);

      ctx.font = "12px Source Sans 3, sans-serif";
      for (const g of o.gauges) {
        const lon = o.lon0 + ((g.i + 0.5) / o.nx) * (o.lon1 - o.lon0);
        const lat = o.lat1 - ((g.j + 0.5) / o.ny) * (o.lat1 - o.lat0);
        const x = xOf(lon);
        const y = yOf(lat);
        const labelLeft = g.name === "Chennai" || g.name === "California" || g.name === "Utenfor Tokyo";
        const tx = labelLeft ? x - 8 : x + 7;
        ctx.fillStyle = g.first >= 0 ? ink.mark : ink.sea;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(251,247,240,0.9)";
        ctx.textAlign = labelLeft ? "right" : "left";
        ctx.strokeText(g.name, tx, y - 6);
        ctx.fillStyle = ink.text;
        ctx.fillText(g.name, tx, y - 6);
        ctx.textAlign = "left";
      }

      ctx.fillStyle = "rgba(251,247,240,0.92)";
      ctx.fillRect(ox, oy + mh + 6, Math.min(mw, 520), 22);
      ctx.fillStyle = ink.text;
      ctx.fillText(
        `${o.id === "india" ? "Indiahavet, desember 2004" : "Stillehavet, mars 2011"} · ${fmt(o.t)} · åpent hav`,
        ox + 4,
        oy + mh + 21,
      );

      const lx = ox + mw - 148;
      const ly = oy + 8;
      ctx.fillStyle = "rgba(251,247,240,0.92)";
      ctx.fillRect(lx, ly, 140, 52);
      const grad = ctx.createLinearGradient(lx + 8, 0, lx + 132, 0);
      grad.addColorStop(0, ink.low);
      grad.addColorStop(0.5, "#2a6d86");
      grad.addColorStop(1, ink.high);
      ctx.fillStyle = grad;
      ctx.fillRect(lx + 8, ly + 8, 124, 8);
      ctx.fillStyle = ink.muted;
      ctx.font = "11px Source Sans 3, sans-serif";
      ctx.fillText("lavere vann", lx + 8, ly + 30);
      ctx.fillText("høyere vann", lx + 72, ly + 30);
      ctx.fillText("fargen mettes rundt ±0,4 m", lx + 8, ly + 44);
    }
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const o = ocean.current;
  const arrived = o.gauges.filter((g) => g.first > 0).slice().sort((a, b) => a.first - b.first);
  const first = arrived[0];
  const conclusion = first
    ? `${first.name} er først ute blant målerne som ikke står i selve kilden, etter ${fmt(first.first)}. ${
        first.sign < 0 ? "Første utslag der er en senkning." : "Første utslag der er en heving."
      } Tallet ${first.max.toFixed(2)} m er høyden i åpent hav ved måleren, ikke oppskylling og ikke et historisk dødstall.`
    : "Bølgen ligger fortsatt ved bruddet. De to kartene har samme type kilde. Det som skiller dem, er hvor kysten ligger i forhold til bruddet, og hvor dypt havet er på veien.";

  return (
    <Lab
      id="m5"
      index="M5"
      title="To hav, to ankomster"
      replaces="Erstatter den gamle M5, et rutenett på 200 km uten kart og uten bølge."
      question="Hvorfor kan to skjelv av samme størrelsesorden gi helt ulik tid på kysten du står på?"
      assume="Lineær gruntvannsbølge. Kysten er Natural Earth i målestokk 1:110 millioner, ikke et sjøkart. Sokkelen er smalere enn den virkelige, så nærfeltet kan komme for tidlig. Målerne ligger i sjøen like utenfor stedene. Fargen mettes rundt ±0,4 m slik at fronten synes også når kilden er høyere. Randen dempes så bølgen ikke kommer tilbake fra kartkanten. Ikke oppskylling og ikke et dødstall."
      conclusion={conclusion}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas ref={canvasRef} className="h-[460px] w-full" />
      </div>
      <Choice
        label="Hendelse"
        value={id}
        options={[
          { id: "india", label: "Indiahavet 2004" },
          { id: "tohoku", label: "Tohoku 2011" },
        ]}
        onChange={setId}
      />
      <Transport playing={playing} onToggle={() => setPlaying((p) => !p)} onReset={() => reset()} time={fmt(o.t)} />
      <Readouts
        items={o.gauges.map((g) => ({
          k: g.name,
          v: fmt(g.first),
          hint: g.inSource
            ? "for nær bruddet til å kalle det reisetid"
            : g.max > 0.01
              ? `${g.max.toFixed(2)} m i åpent hav${g.sign < 0 ? " · dal først" : g.sign > 0 ? " · topp først" : ""}`
              : "venter",
        }))}
      />
      <p className="sr-only">{stamp}</p>
    </Lab>
  );
}
