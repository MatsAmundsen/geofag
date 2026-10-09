import { useId, type ReactNode } from "react";
import { FigureFrame } from "@/components/figure-frame";

const font = "Source Sans 3, ui-sans-serif, system-ui, sans-serif";
const linkClass =
  "text-primary underline decoration-1 underline-offset-2 hover:decoration-2 break-words";

const COS = Math.cos((66 * Math.PI) / 180);

type Box = { w: number; h: number; lat0: number; lat1: number; lon0: number; lon1: number };

const NORDIC: Box = {
  w: 787,
  h: 774,
  lat0: 82.00833,
  lat1: 50.00833,
  lon0: -39.99167,
  lon1: 40.00833,
};

const ANALYSE: Box = { w: 618, h: 760, lat0: 76, lat1: 58, lon0: -10, lon1: 26 };

const GYDA: Box = { w: 595, h: 780, lat0: 77, lat1: 45, lon0: -30, lon1: 30 };

function xy(box: Box, lon: number, lat: number) {
  const xSpan = (box.lon1 - box.lon0) * COS;
  const ySpan = box.lat0 - box.lat1;
  return {
    x: ((lon - box.lon0) * COS) / xSpan * box.w,
    y: ((box.lat0 - lat) / ySpan) * box.h,
  };
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={linkClass} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Credit({
  who,
  title,
  href,
  license,
  licenseHref,
  changed,
  children,
}: {
  who: string;
  title: string;
  href: string;
  license: string;
  licenseHref: string;
  changed?: string;
  children?: ReactNode;
}) {
  return (
    <span className="mt-2 block">
      {who}. <ExtLink href={href}>{title}</ExtLink>. Lisens: <ExtLink href={licenseHref}>{license}</ExtLink>
      {changed ? `. Endret: ${changed}` : "."}
      {children}
    </span>
  );
}

function ScrollImage({
  src,
  alt,
  minWidth,
}: {
  src: string;
  alt: string;
  minWidth: string;
}) {
  return <img src={src} alt={alt} className={`h-auto w-full max-w-none ${minWidth}`} />;
}

function MapStage({
  src,
  box,
  title,
  children,
  minWidth = "max-sm:min-w-[48rem]",
}: {
  src: string;
  box: Box;
  title: string;
  children: ReactNode;
  minWidth?: string;
}) {
  return (
    <div className={`relative mx-auto w-full ${minWidth}`} style={{ aspectRatio: `${box.w} / ${box.h}` }}>
      <img src={src} alt="" className="absolute inset-0 h-full w-full" />
      <svg
        viewBox={`0 0 ${box.w} ${box.h}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={title}
      >
        <title>{title}</title>
        {children}
      </svg>
    </div>
  );
}

function SeaLabel({
  box,
  lon,
  lat,
  children,
  size = 15,
  fill = "#f7fbfc",
  stroke = "#102028",
}: {
  box: Box;
  lon: number;
  lat: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  stroke?: string;
}) {
  const p = xy(box, lon, lat);
  return (
    <text
      x={p.x}
      y={p.y}
      textAnchor="middle"
      fontFamily={font}
      fontSize={size}
      fontWeight={650}
      fill={fill}
      stroke={stroke}
      strokeWidth={4}
      paintOrder="stroke"
      strokeLinejoin="round"
    >
      {children}
    </text>
  );
}

function Swatches({ items }: { items: Array<{ color: string; label: string }> }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2 text-sm text-foreground">
          <span className="inline-block size-3.5 rounded-sm border border-black/20" style={{ background: item.color }} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

function AnalyseFigure() {
  const low = xy(ANALYSE, 2, 69);
  const mark = xy(ANALYSE, 15, 67.3);
  return (
    <FigureFrame
      heading="Analysekart, forenklet"
      scroll
      caption={
        <>
          Egen figur. Kystlinjen er ETOPO 2022 fra NOAA, som er offentlig eiendom i USA. Lavtrykket
          ligger i Norskehavet, og X ligger på kysten av Nordland. Frontene og isobarene er et
          forenklet skjema av en typisk okklusjon, uten oppgitt lufttrykk. Det udaterte
          analysekartet hos Meteorologisk institutt lot seg ikke identifisere som én arkivfil.
          Kilde for kystlinjen:{" "}
          <ExtLink href="https://www.ncei.noaa.gov/products/etopo-global-relief-model">
            NOAA NCEI, ETOPO 2022
          </ExtLink>
          . Vilkår:{" "}
          <ExtLink href="https://www.ncei.noaa.gov/about/data-disclaimer">NOAA data disclaimer</ExtLink>{" "}
          (offentlig eiendom, fritt bruk med kildehenvisning).
        </>
      }
    >
      <MapStage
        src="/eksamen/v2026/analyse-kyst.png"
        box={ANALYSE}
        title="Forenklet analysekart. Lavtrykk i Norskehavet og punkt X på kysten av Nordland, sør for lavtrykket. Okkludert front, varmfront og kaldfront er tegnet inn uten vindpil."
      >
        <Front pts={[[2, 69], [5.2, 67.4], [8.2, 65.4]]} kind="occluded" />
        <Front pts={[[8.2, 65.4], [12.2, 65.8], [17, 66.1]]} kind="warm" />
        <Front pts={[[8.2, 65.4], [6.6, 63.2], [5.2, 60.6]]} kind="cold" />
        <Isobar rx={4.6} ry={2.1} />
        <Isobar rx={7.4} ry={3.3} />
        <circle cx={low.x} cy={low.y} r={16} fill="#123044" stroke="#f4f7f8" strokeWidth={2} />
        <text x={low.x} y={low.y + 5} textAnchor="middle" fontFamily={font} fontSize={16} fontWeight={700} fill="#f4f7f8">
          L
        </text>
        <line x1={mark.x - 9} y1={mark.y - 9} x2={mark.x + 9} y2={mark.y + 9} stroke="#9f1239" strokeWidth={3} />
        <line x1={mark.x - 9} y1={mark.y + 9} x2={mark.x + 9} y2={mark.y - 9} stroke="#9f1239" strokeWidth={3} />
        <circle cx={mark.x} cy={mark.y} r={14} fill="none" stroke="#9f1239" strokeWidth={2} />
        <SeaLabel box={ANALYSE} lon={15} lat={68.7} size={16} fill="#1c2830" stroke="#f4f7f8">
          X
        </SeaLabel>
        <SeaLabel box={ANALYSE} lon={-2} lat={71.2} size={14} fill="#1c2830" stroke="#f4f7f8">
          Norskehavet
        </SeaLabel>
        <SeaLabel box={ANALYSE} lon={16} lat={63.2} size={14} fill="#1c2830" stroke="#f4f7f8">
          Norge
        </SeaLabel>
      </MapStage>
    </FigureFrame>
  );
}

function Isobar({ rx, ry }: { rx: number; ry: number }) {
  const pts = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    return xy(ANALYSE, 2 + rx * Math.cos(t), 69 + ry * Math.sin(t));
  });
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  return <path d={d} fill="none" stroke="#5c6b73" strokeWidth={1.4} strokeDasharray="7 6" />;
}

function Front({ pts, kind }: { pts: Array<[number, number]>; kind: "warm" | "cold" | "occluded" }) {
  const pix = pts.map(([lon, lat]) => xy(ANALYSE, lon, lat));
  const d = pix.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const color = kind === "warm" ? "#b42318" : kind === "cold" ? "#1d4e89" : "#6d28d9";
  const samples = samplesAlong(pix, 32);
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
      {samples.map((sample, index) => (
        <FrontSymbol key={`${kind}-${index}`} sample={sample} kind={kind} index={index} color={color} />
      ))}
    </g>
  );
}

function samplesAlong(pts: Array<{ x: number; y: number }>, step: number) {
  const out: Array<{ x: number; y: number; angle: number }> = [];
  let remain = step * 0.65;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len === 0) continue;
    const angle = Math.atan2(b.y - a.y, b.x - a.x);
    let walked = 0;
    while (walked + remain <= len) {
      walked += remain;
      const t = walked / len;
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, angle });
      remain = step;
    }
    remain -= len - walked;
  }
  return out;
}

function FrontSymbol({
  sample,
  kind,
  index,
  color,
}: {
  sample: { x: number; y: number; angle: number };
  kind: "warm" | "cold" | "occluded";
  index: number;
  color: string;
}) {
  const useWarm = kind === "warm" || (kind === "occluded" && index % 2 === 0);
  const normal = sample.angle - Math.PI / 2;
  const ox = Math.cos(normal) * 2;
  const oy = Math.sin(normal) * 2;
  if (useWarm) {
    const r = 8;
    const start = sample.angle;
    const end = sample.angle + Math.PI;
    const x1 = sample.x + ox + r * Math.cos(start);
    const y1 = sample.y + oy + r * Math.sin(start);
    const x2 = sample.x + ox + r * Math.cos(end);
    const y2 = sample.y + oy + r * Math.sin(end);
    return <path d={`M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={2} />;
  }
  const tip = 12;
  const base = 6;
  const ax = sample.x + ox + tip * Math.cos(normal);
  const ay = sample.y + oy + tip * Math.sin(normal);
  const left = normal + Math.PI / 2;
  const bx = sample.x + ox + base * Math.cos(left);
  const by = sample.y + oy + base * Math.sin(left);
  const cx = sample.x + ox - base * Math.cos(left);
  const cy = sample.y + oy - base * Math.sin(left);
  return <polygon points={`${ax},${ay} ${bx},${by} ${cx},${cy}`} fill={color} />;
}

function CopernicusFigure() {
  return (
    <FigureFrame
      heading="Marin hetebølge i Middelhavet, august 2024"
      scroll
      caption={
        <>
          Originalfigur med daglig overflatetemperatur i Middelhavet og avviket fra 1991–2020.
          <Credit
            who="Copernicus Climate Change Service (C3S) / ECMWF / DMI"
            title="ESOTC 2024, European Ocean, Figure 11.2"
            href="https://climate.copernicus.eu/esotc/2024/european-ocean"
            license="Licence to Use Copernicus Products"
            licenseHref="https://cds.climate.copernicus.eu/licences/licence-to-use-copernicus-products"
          >
            {" "}
            Generated using Copernicus Climate Change Service information 2024. Neither the European
            Commission nor ECMWF is responsible for any use that may be made of the Copernicus
            information or data it contains.
          </Credit>
        </>
      }
    >
      <ScrollImage
        src="/eksamen/v2026/copernicus-esotc2024-fig11.2.png"
        minWidth="max-sm:min-w-[48rem]"
        alt="To paneler fra Copernicus. Til venstre daglig havoverflatetemperatur i Middelhavet sommeren 2024, med en topp på 28,67 grader 13. august. Til høyre kart over temperaturavvik i august 2024, der deler av havet er varmere enn normalen og andre deler er det ikke."
      />
    </FigureFrame>
  );
}

function GabrielleFigure() {
  return (
    <FigureFrame
      heading="Banen til orkanen Gabrielle, september 2025"
      scroll
      caption={
        <>
          Originalt banekart. Fargene følger Saffir–Simpson-skalaen i tegnforklaringen på bildet.
          <Credit
            who="OreoStar-fait, med bakgrunn fra NASA og banedata fra National Hurricane Center"
            title="Gabrielle 2025 path"
            href="https://commons.wikimedia.org/wiki/File:Gabrielle_2025_path.png"
            license="Offentlig eiendom (public domain)"
            licenseHref="https://commons.wikimedia.org/wiki/File:Gabrielle_2025_path.png"
          />
        </>
      }
    >
      <ScrollImage
        src="/eksamen/v2026/gabrielle-2025-path.png"
        minWidth="max-sm:min-w-[48rem]"
        alt="Banekart for orkanen Gabrielle i 2025. Banen går fra Vest-Afrika mot nordvest, når kategori 4, og svinger deretter nordøstover mot Asorene og Europa mens fargen viser lavere vindstyrke."
      />
    </FigureFrame>
  );
}

function GydaFigures() {
  const low = xy(GYDA, 2.5, 75);
  const high = xy(GYDA, -5, 52.5);
  return (
    <>
      <FigureFrame
        heading="Vanndamp og lufttrykk 12. januar 2022"
        scroll
        caption={
          <>
            Egen figur av nedbørbart vann (farger, millimeter) og lufttrykk ved havnivå (linjer for
            hver 10 hPa fra 980 til 1030). Lavtrykket lengst nord er om lag 965 hPa, og høytrykket
            lenger sør er om lag 1040 hPa. Dette er reanalyse for 12. januar 2022, ikke NRKs
            prognosekart. NRK-kartet er ikke brukt.
            <Credit
              who="NOAA Physical Sciences Laboratory, NCEP/NCAR Reanalysis"
              title="Daglige middelverdier av nedbørbart vann og lufttrykk, 12. januar 2022"
              href="https://psl.noaa.gov/data/gridded/data.ncep.reanalysis.html"
              license="Offentlig eiendom (US government work)"
              licenseHref="https://www.weather.gov/disclaimer"
            />
            <Swatches
              items={[
                { color: "#f7fbff", label: "0 mm" },
                { color: "#c6dbef", label: "om lag 8 mm" },
                { color: "#6baed6", label: "om lag 15 mm" },
                { color: "#2171b5", label: "om lag 22 mm" },
                { color: "#08306b", label: "30 mm" },
              ]}
            />
          </>
        }
      >
        <MapStage
          src="/eksamen/v2026/gyda-nedborbart-vann.png"
          box={GYDA}
          title="Kart over Nord-Atlanteren 12. januar 2022. Mørkere blått er mer nedbørbart vann, med en fuktig tunge inn mot Vestlandet. L markerer lavtrykk nord for Norge og H et høytrykk lenger sør."
        >
          <Marker at={low} text="L" fill="#7f1d1d" />
          <Marker at={high} text="H" fill="#1e3a5f" />
        </MapStage>
      </FigureFrame>
      <FigureFrame
        heading="Farevarsel for regn under ekstremværet Gyda"
        scroll
        caption={
          <>
            Originalfigur fra Meteorologisk institutt. Nyhetssaken beskriver oransje farevarsel for
            kraftig regn i sørlige deler av Trøndelag, Møre og Romsdal, Sogn og Fjordane og
            Innlandet, og lokalt 80–120 mm på 24 timer.
            <Credit
              who="Meteorologisk institutt"
              title="Oransje farevarsel for regn i Trøndelag, Møre og Romsdal, Sogn og Fjordane og Innlandet"
              href="https://www.met.no/nyhetsarkiv/oransje-farevarsel-regn-i-trondelag-more-og-romsdal-sogn-og-fjordane-og-innlandet"
              license="Norsk lisens for offentlige data (NLOD) og Creative Commons Attribution 4.0"
              licenseHref="https://www.met.no/frie-meteorologiske-data/lisensiering-og-kreditering"
            />
          </>
        }
      >
        <ScrollImage
          src="/eksamen/v2026/met-farevarsel-gyda.png"
          minWidth="max-sm:min-w-[40rem]"
          alt="Farevarselkart fra Meteorologisk institutt over Sør-Norge. Trekantvarsler ligger langs Vestlandet og i Trøndelag."
        />
      </FigureFrame>
    </>
  );
}

function Marker({
  at,
  text,
  fill,
}: {
  at: { x: number; y: number };
  text: string;
  fill: string;
}) {
  return (
    <g>
      <circle cx={at.x} cy={at.y} r={15} fill={fill} stroke="#f8fafc" strokeWidth={2} />
      <text x={at.x} y={at.y + 5} textAnchor="middle" fontFamily={font} fontSize={16} fontWeight={700} fill="#f8fafc">
        {text}
      </text>
    </g>
  );
}

function DyeFigure() {
  return (
    <FigureFrame
      heading="To glass med farget smeltevann"
      scroll
      caption={
        <>
          Egen figur av oppsettet i oppgaven: en tesil med farget isbit over hvert glass. I glasset
          til venstre samler fargestoffet seg langs bunnen. I glasset til høyre blir fargestoffet
          liggende nær overflaten. Fotoet fra Universitetet i Bergen er ikke brukt.
        </>
      }
    >
      <svg viewBox="0 0 680 400" className="mx-auto h-auto w-full max-w-3xl max-sm:min-w-[36rem]" role="img" aria-labelledby="dye-title">
        <title id="dye-title">To glass. Til venstre synker fargestoffet til bunnen. Til høyre blir fargestoffet liggende nær overflaten.</title>
        <rect width="680" height="400" fill="#0f171c" rx="12" />
        <Glass x={90} label="Glass til venstre" mode="bottom" />
        <Glass x={390} label="Glass til høyre" mode="top" />
      </svg>
    </FigureFrame>
  );
}

function Glass({ x, label, mode }: { x: number; label: string; mode: "bottom" | "top" }) {
  return (
    <g>
      <text x={x + 100} y={36} textAnchor="middle" fill="#e8eef2" fontFamily={font} fontSize={20} fontWeight={650}>
        {label}
      </text>
      <path d={`M${x + 48} 78 h104 l-16 250 h-72 z`} fill="#16303a" stroke="#8eb4d4" strokeWidth={3} />
      <ellipse cx={x + 100} cy={78} rx={52} ry={10} fill="none" stroke="#8eb4d4" strokeWidth={3} />
      {mode === "bottom" ? (
        <path d={`M${x + 62} 268 h76 l-6 48 h-64 z`} fill="#2f6f9f" />
      ) : (
        <path d={`M${x + 56} 96 h88 l-4 42 h-80 z`} fill="#2f6f9f" />
      )}
      <path d={`M${x + 70} 70 h60 v14 h-8 l-6 18 h-32 l-6 -18 h-8 z`} fill="none" stroke="#e0b48a" strokeWidth={2.5} />
      <rect x={x + 86} y={58} width={28} height={18} rx={3} fill="#d7e6f2" stroke="#e8eef2" strokeWidth={1.5} />
      <text x={x + 100} y={360} textAnchor="middle" fill="#8b9aa6" fontFamily={font} fontSize={15}>
        tesil med farget isbit
      </text>
    </g>
  );
}

function densityKgM3(t: number, s: number) {
  const a0 = 999.842594;
  const a1 = 6.793952e-2;
  const a2 = -9.09529e-3;
  const a3 = 1.001685e-4;
  const a4 = -1.120083e-6;
  const a5 = 6.536332e-9;
  const rhoW = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t + a0;
  const b0 = 0.824493;
  const b1 = -4.0899e-3;
  const b2 = 7.6438e-5;
  const b3 = -8.2467e-7;
  const b4 = 5.3875e-9;
  const c0 = -5.72466e-3;
  const c1 = 1.0227e-4;
  const c2 = -1.6546e-6;
  const d0 = 4.8314e-4;
  return rhoW + ((((b4 * t + b3) * t + b2) * t + b1) * t + b0) * s + ((c2 * t + c1) * t + c0) * s ** 1.5 + d0 * s * s;
}

function freezingPoint(s: number) {
  return -0.0575 * s + 1.710523e-3 * s ** 1.5 - 2.154996e-4 * s * s;
}

function TsFigure() {
  const s0 = 29.2;
  const s1 = 33.2;
  const t0 = -2.2;
  const t1 = 3.4;
  const plot = { l: 78, r: 640, t: 28, b: 430 };
  const sx = (s: number) => plot.l + ((s - s0) / (s1 - s0)) * (plot.r - plot.l);
  const sy = (t: number) => plot.b - ((t - t0) / (t1 - t0)) * (plot.b - plot.t);
  const levels = [1.0235, 1.024, 1.0245, 1.025, 1.0255, 1.026];

  function isopycnal(level: number) {
    const pts: Array<{ x: number; y: number }> = [];
    for (let s = s0; s <= s1 + 1e-6; s += 0.08) {
      let lo = t0;
      let hi = 8;
      const cold = densityKgM3(lo, s) / 1000;
      const warm = densityKgM3(hi, s) / 1000;
      if (level > cold || level < warm) continue;
      for (let i = 0; i < 22; i++) {
        const mid = (lo + hi) / 2;
        if (densityKgM3(mid, s) / 1000 > level) lo = mid;
        else hi = mid;
      }
      const temp = (lo + hi) / 2;
      if (temp < freezingPoint(s) || temp < t0 || temp > t1) continue;
      pts.push({ x: sx(s), y: sy(temp) });
    }
    if (pts.length < 2) return null;
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  }

  const freeze = Array.from({ length: 21 }, (_, i) => {
    const s = s0 + ((s1 - s0) * i) / 20;
    return { x: sx(s), y: sy(freezingPoint(s)) };
  });
  const a = { x: sx(29.7), y: sy(1) };
  const b = { x: sx(29.4), y: sy(-0.8) };

  function xyLabel(level: number) {
    const s = 32.6;
    let lo = t0;
    let hi = 8;
    if (level > densityKgM3(lo, s) / 1000 || level < densityKgM3(hi, s) / 1000) return null;
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      if (densityKgM3(mid, s) / 1000 > level) lo = mid;
      else hi = mid;
    }
    const temp = (lo + hi) / 2;
    if (temp < t0 || temp > t1) return null;
    return { x: sx(s), y: sy(temp) };
  }

  return (
    <FigureFrame
      heading="Vannmasse A og B i et T–S-diagram"
      scroll
      caption={
        <>
          Egen figur. Tabellen er tallene fra oppgaven. Isopyknalene er regnet med UNESCO EOS-80 og
          viser tetthet i kg/dm³. Utsnittet til høyre er det samme området rundt A og B, tegnet
          tettere. Frysepunktlinjen er tegnet nederst. Diagrammet sier ikke hvilken vannmasse som
          er tyngst.
        </>
      }
    >
      <div className="max-sm:min-w-[44rem]">
        <table className="mb-4 w-full max-w-md border-collapse text-left text-sm">
          <caption className="mb-2 text-left font-medium text-foreground">Vannmasse A og B</caption>
          <thead>
            <tr className="border-b border-border">
              <th className="py-1 pr-4 font-medium">Vannmasse</th>
              <th className="py-1 pr-4 font-medium">Temperatur (°C)</th>
              <th className="py-1 font-medium">Salinitet (PSU)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/70">
              <td className="py-1 pr-4">A</td>
              <td className="py-1 pr-4">1</td>
              <td className="py-1">29,7</td>
            </tr>
            <tr>
              <td className="py-1 pr-4">B</td>
              <td className="py-1 pr-4">−0,8</td>
              <td className="py-1">29,4</td>
            </tr>
          </tbody>
        </table>
        <svg viewBox="0 0 720 980" className="h-auto w-full" role="img" aria-labelledby="ts-title">
          <title id="ts-title">Temperatur-salinitetsdiagram med isopyknaler. Punkt A ligger ved 1 grad og 29,7 PSU. Punkt B ligger ved minus 0,8 grader og 29,4 PSU.</title>
          <rect width="720" height="980" fill="#0f171c" rx="12" />
          {levels.map((level) => {
            const d = isopycnal(level);
            if (!d) return null;
            const label = xyLabel(level);
            return (
              <g key={level}>
                <path d={d} fill="none" stroke="#6fb3b8" strokeWidth={1.4} />
                {label ? (
                  <text x={label.x + 6} y={label.y + 4} fill="#8b9aa6" fontFamily={font} fontSize={13}>
                    {level.toFixed(4).replace(".", ",")}
                  </text>
                ) : null}
              </g>
            );
          })}
          <path
            d={freeze.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")}
            fill="none"
            stroke="#e0b48a"
            strokeWidth={2}
          />
          <text x={sx(31.2)} y={sy(freezingPoint(31.2)) - 10} fill="#e0b48a" fontFamily={font} fontSize={14}>
            frysepunkt
          </text>
          <line x1={plot.l} y1={plot.t} x2={plot.l} y2={plot.b} stroke="#8b9aa6" />
          <line x1={plot.l} y1={plot.b} x2={plot.r} y2={plot.b} stroke="#8b9aa6" />
          {[29.5, 30.5, 31.5, 32.5].map((s) => (
            <g key={s}>
              <line x1={sx(s)} y1={plot.b} x2={sx(s)} y2={plot.b + 6} stroke="#8b9aa6" />
              <text x={sx(s)} y={plot.b + 24} textAnchor="middle" fill="#e8eef2" fontFamily={font} fontSize={14}>
                {String(s).replace(".", ",")}
              </text>
            </g>
          ))}
          {[-2, -1, 0, 1, 2, 3].map((t) => (
            <g key={t}>
              <line x1={plot.l - 6} y1={sy(t)} x2={plot.l} y2={sy(t)} stroke="#8b9aa6" />
              <text x={plot.l - 12} y={sy(t) + 5} textAnchor="end" fill="#e8eef2" fontFamily={font} fontSize={14}>
                {t}
              </text>
            </g>
          ))}
          <text x={(plot.l + plot.r) / 2} y={468} textAnchor="middle" fill="#e8eef2" fontFamily={font} fontSize={16}>
            Salinitet (PSU)
          </text>
          <text x={22} y={230} fill="#e8eef2" fontFamily={font} fontSize={16} transform="rotate(-90 22 230)">
            Temperatur (°C)
          </text>
          <circle cx={a.x} cy={a.y} r={6} fill="#e8eef2" />
          <text x={a.x + 12} y={a.y - 12} fill="#e8eef2" fontFamily={font} fontSize={18} fontWeight={700}>
            A
          </text>
          <circle cx={b.x} cy={b.y} r={6} fill="#e0b48a" />
          <text x={b.x - 16} y={b.y + 22} fill="#e0b48a" fontFamily={font} fontSize={18} fontWeight={700}>
            B
          </text>
          <TsInset />
        </svg>
      </div>
    </FigureFrame>
  );
}

function tempOnIsopycnal(level: number, s: number) {
  let lo = -2;
  let hi = 8;
  const cold = densityKgM3(lo, s) / 1000;
  const warm = densityKgM3(hi, s) / 1000;
  if (level > cold || level < warm) return null;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (densityKgM3(mid, s) / 1000 > level) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function TsInset() {
  const s0 = 29.15;
  const s1 = 30.1;
  const t0 = -1.4;
  const t1 = 1.8;
  const plot = { l: 70, r: 520, t: 48, b: 390 };
  const sx = (s: number) => plot.l + ((s - s0) / (s1 - s0)) * (plot.r - plot.l);
  const sy = (t: number) => plot.b - ((t - t0) / (t1 - t0)) * (plot.b - plot.t);
  const levels = [1.0235, 1.0236, 1.0237, 1.0238, 1.0239, 1.024];
  const a = { x: sx(29.7), y: sy(1) };
  const b = { x: sx(29.4), y: sy(-0.8) };
  return (
    <g transform="translate(0 500)">
      <text x={360} y={28} textAnchor="middle" fill="#e8eef2" fontFamily={font} fontSize={18} fontWeight={650}>
        Utsnitt rundt A og B
      </text>
      {levels.map((level) => {
        const pts: string[] = [];
        for (let s = s0; s <= s1 + 1e-9; s += 0.05) {
          const temp = tempOnIsopycnal(level, s);
          if (temp == null || temp < t0 || temp > t1 || temp < freezingPoint(s)) continue;
          pts.push(`${pts.length === 0 ? "M" : "L"}${sx(s).toFixed(1)} ${sy(temp).toFixed(1)}`);
        }
        const labelTemp = tempOnIsopycnal(level, s1);
        if (pts.length < 2 || labelTemp == null) return null;
        return (
          <g key={level}>
            <path d={pts.join(" ")} fill="none" stroke="#6fb3b8" strokeWidth={1.6} />
            <text x={sx(s1) + 8} y={sy(labelTemp) + 4} fill="#c5d5df" fontFamily={font} fontSize={14}>
              {level.toFixed(4).replace(".", ",")}
            </text>
          </g>
        );
      })}
      <line x1={plot.l} y1={plot.t} x2={plot.l} y2={plot.b} stroke="#8b9aa6" />
      <line x1={plot.l} y1={plot.b} x2={plot.r} y2={plot.b} stroke="#8b9aa6" />
      <text x={sx(29.4)} y={plot.b + 28} textAnchor="middle" fill="#e8eef2" fontFamily={font} fontSize={14}>29,4</text>
      <text x={sx(29.7)} y={plot.b + 28} textAnchor="middle" fill="#e8eef2" fontFamily={font} fontSize={14}>29,7</text>
      <text x={plot.l - 10} y={sy(1) + 4} textAnchor="end" fill="#e8eef2" fontFamily={font} fontSize={14}>1</text>
      <text x={plot.l - 10} y={sy(-0.8) + 4} textAnchor="end" fill="#e8eef2" fontFamily={font} fontSize={14}>−0,8</text>
      <circle cx={a.x} cy={a.y} r={6} fill="#e8eef2" />
      <text x={a.x + 10} y={a.y - 10} fill="#e8eef2" fontFamily={font} fontSize={18} fontWeight={700}>A</text>
      <circle cx={b.x} cy={b.y} r={6} fill="#e0b48a" />
      <text x={b.x + 10} y={b.y + 18} fill="#e0b48a" fontFamily={font} fontSize={18} fontWeight={700}>B</text>
    </g>
  );
}

function CtdFigure({ officialUrl }: { officialUrl: string }) {
  return (
    <FigureFrame
      heading="Forenklet skjema av temperatur- og salinitetsprofiler"
      scroll
      caption={
        <>
          Egen figur. Dette er ikke de målte CTD-profilene. Udir har laget grafene selv, og
          rådataene hos PO.DAAC krever innlogging. Profilene er derfor et skjema av de to typene
          oppgaven ber deg skille: ett kaldere og saltere vann med svak sjiktning, og ett vann med
          et varmere og ferskere overflatelag. April og august er ikke merket på figuren.{" "}
          <ExtLink href={officialUrl}>De målte profilene åpnes hos Udir</ExtLink>. Datasettet er OMG
          CTD,{" "}
          <ExtLink href="https://doi.org/10.5067/OMGEV-CTDS1">doi.org/10.5067/OMGEV-CTDS1</ExtLink>.
        </>
      }
    >
      <svg viewBox="0 0 980 460" className="h-auto w-full max-w-none max-sm:min-w-[56rem]" role="img" aria-labelledby="ctd-title">
        <title id="ctd-title">Fire forenklede profiler ned til 175 meter. Temperatur A har et varmt overflatelag. Temperatur B er kald i hele søylen. Salinitet C er høy og jevn. Salinitet D har et ferskere overflatelag.</title>
        <rect width="980" height="460" fill="#0f171c" rx="12" />
        <Profile x={30} title="Temperaturprofil A" axis="−1 til 6 °C" color="#e0b48a" d="M170 70 C 150 100, 100 140, 90 180 L 95 360" />
        <Profile x={270} title="Temperaturprofil B" axis="−2 til 2 °C" color="#8eb4d4" d="M75 70 C 90 140, 110 240, 120 360" />
        <Profile x={510} title="Salinitetsprofil C" axis="33,5 til 35,0" color="#6fb3b8" d="M155 70 C 158 160, 160 250, 162 360" />
        <Profile x={750} title="Salinitetsprofil D" axis="32,5 til 35,0" color="#7eb8c9" d="M70 70 C 140 120, 165 170, 170 360" />
      </svg>
    </FigureFrame>
  );
}

function Profile({ x, title, axis, color, d }: { x: number; title: string; axis: string; color: string; d: string }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <text x={110} y={36} textAnchor="middle" fill="#e8eef2" fontFamily={font} fontSize={18} fontWeight={650}>
        {title}
      </text>
      <line x1={40} y1={70} x2={190} y2={70} stroke="#8b9aa6" />
      <line x1={40} y1={70} x2={40} y2={360} stroke="#8b9aa6" />
      <text x={115} y={392} textAnchor="middle" fill="#8b9aa6" fontFamily={font} fontSize={13}>
        {axis}
      </text>
      <text x={48} y={62} fill="#8b9aa6" fontFamily={font} fontSize={13}>0 m</text>
      <text x={48} y={378} fill="#8b9aa6" fontFamily={font} fontSize={13}>175 m</text>
      <path d={d} fill="none" stroke={color} strokeWidth={3} />
    </g>
  );
}

const PLACES: Array<{ name: string; lon: number; lat: number; size?: number }> = [
  { name: "Grønland", lon: -36, lat: 74, size: 14 },
  { name: "Grønlandshavet", lon: -10, lat: 75.5 },
  { name: "Island", lon: -18.5, lat: 64.8, size: 14 },
  { name: "Islandshavet", lon: -12, lat: 68 },
  { name: "Jan Mayen", lon: -8.2, lat: 71.2, size: 13 },
  { name: "Norskehavet", lon: 4, lat: 67.5 },
  { name: "Svalbard", lon: 18, lat: 78.6, size: 14 },
  { name: "Norge", lon: 14, lat: 64.5, size: 14 },
  { name: "Færøyene", lon: -7, lat: 62.2, size: 13 },
  { name: "Shetland", lon: -1.4, lat: 60.7, size: 13 },
  { name: "Nordsjøen", lon: 3.2, lat: 57.6 },
  { name: "Doggerbank", lon: 3, lat: 55.1, size: 13 },
  { name: "Storbritannia og Irland", lon: -22, lat: 54, size: 13 },
  { name: "Østersjøen", lon: 19.5, lat: 58.2, size: 14 },
  { name: "Nord-Atlanteren", lon: -28, lat: 56 },
];

function BathyFigure() {
  return (
    <FigureFrame
      heading="Batymetri i de nordiske hav"
      scroll
      caption={
        <>
          Egen figur, regnet ut fra ETOPO 2022. Udirs kart er ikke brukt. Fargene viser høyde over
          havet og havdybde. Plasseringen av et punkt er ikke avgjørende i oppgaven.
          <Credit
            who="NOAA National Centers for Environmental Information"
            title="ETOPO 2022 Global Relief Model"
            href="https://www.ncei.noaa.gov/products/etopo-global-relief-model"
            license="Offentlig eiendom (US government work)"
            licenseHref="https://www.ncei.noaa.gov/about/data-disclaimer"
          />
          <Swatches
            items={[
              { color: "#d6cebe", label: "Land" },
              { color: "#bad6d6", label: "0–200 m" },
              { color: "#609eb0", label: "200–1000 m" },
              { color: "#347492", label: "1000–2000 m" },
              { color: "#0e2c48", label: "dypere enn 2000 m" },
            ]}
          />
        </>
      }
    >
      <MapStage
        src="/eksamen/v2026/nordic-bathy.png"
        box={NORDIC}
        minWidth="max-sm:min-w-[52rem]"
        title="Batymetrisk kart over De nordiske hav, Nordsjøen og Nord-Atlanteren, med Grønland, Island, Svalbard, Norge, Færøyene, Shetland, Doggerbank og Østersjøen navngitt."
      >
        {PLACES.map((place) => (
          <SeaLabel key={place.name} box={NORDIC} lon={place.lon} lat={place.lat} size={place.size ?? 15}>
            {place.name}
          </SeaLabel>
        ))}
      </MapStage>
    </FigureFrame>
  );
}

function GjelstrupFigure() {
  return (
    <FigureFrame
      heading="Temperatur og salinitet på Nordøst-Grønlandssokkelen, 1980–2020"
      scroll
      caption={
        <>
          Original figur 6. Panel a og b er 0–20 m, c og d er kjernen av polart vann (T &lt; 0 °C og
          S &lt; 34,4), e og f er kjernen av atlantisk vann (T &gt; 0 °C og S &gt; 34,4).           Grå
          sirkler er gjennomsnitt for juli–september, oransje linje er fem års glidende
          middel, og svarte linjer er observasjoner gjengitt fra Gjelstrup mfl. 2022. Panel g og h
          hører med i originalen og viser dypet til vannmassene. Oppgaven bruker panel a–f.
          <Credit
            who="Gjelstrup, C. V. B. og Stedmon, C. A."
            title="A switch in thermal and haline contributions to stratification in the Greenland Sea during the last four decades. Progress in Oceanography 225, 103283"
            href="https://doi.org/10.1016/j.pocean.2024.103283"
            license="Creative Commons Attribution 4.0"
            licenseHref="https://creativecommons.org/licenses/by/4.0/"
          />
        </>
      }
    >
      <ScrollImage
        src="/eksamen/v2026/gjelstrup-2024-fig6.png"
        minWidth="max-sm:min-w-[64rem]"
        alt="Åtte paneler, a til h, med temperatur og salinitet fra 1980 til 2020. Øverst 0 til 20 meter, så polart vann, så atlantisk vann, og nederst dypet til polarvannskjernen og 0-gradersisotermen. Grå sirkler, oransje glidende middel og svarte observasjoner."
      />
    </FigureFrame>
  );
}

function ChandlerFigure() {
  return (
    <FigureFrame
      heading="Antarktis de siste 800 000 år"
      scroll
      caption={
        <>
          Original figur 1, med temperatur, havpådriv, globalt havnivå og isvolum i kjøringen som
          artikkelen kaller Run C.
          <Credit
            who="Chandler, D. M., Langebroek, P. M., Reese, R. med flere"
            title="Antarctic Ice Sheet tipping in the last 800,000 years warns of future ice loss. Communications Earth & Environment 6, 420"
            href="https://www.nature.com/articles/s43247-025-02366-2"
            license="Creative Commons Attribution 4.0"
            licenseHref="https://creativecommons.org/licenses/by/4.0/"
          />
        </>
      }
    >
      <ScrollImage
        src="/eksamen/v2026/chandler-2025-fig1.png"
        minWidth="max-sm:min-w-[48rem]"
        alt="Fire tidsserier fra 800 000 år siden til i dag: temperaturavvik i lufta, temperaturpådriv fra havet, globalt havnivå og volumet av innlandsisen i Antarktis. Istider og mellomistider er markert."
      />
    </FigureFrame>
  );
}

function PermafrostFigure() {
  return (
    <FigureFrame
      heading="Permafrost i Eurasia og Nord-Amerika, forenklet"
      scroll
      caption={
        <>
          Egen figur, et forenklet skjema. Kurvene er ikke tall fra en modell. Mønsteret følger den
          åpne beskrivelsen hos Willeit og Ganopolski (2015): Eurasia har langt større areal og
          volum enn Nord-Amerika, og arealet i Nord-Amerika er minst da innlandsisen er størst, rundt
          siste istids maksimum. Dagens permafrost på den nordlige halvkule er om lag 15 millioner
          km². Figuren hos Opel mfl. (2024) er utgitt av Elsevier og er ikke brukt.
          <Credit
            who="Willeit, M. og Ganopolski, A."
            title="Coupled Northern Hemisphere permafrost–ice-sheet evolution over the last glacial cycle. Climate of the Past 11, 1165–1180"
            href="https://doi.org/10.5194/cp-11-1165-2015"
            license="Creative Commons Attribution 3.0"
            licenseHref="https://creativecommons.org/licenses/by/3.0/"
          />
        </>
      }
    >
      <svg viewBox="0 0 880 440" className="h-auto w-full max-w-none max-sm:min-w-[44rem]" role="img" aria-labelledby="perm-title">
        <title id="perm-title">To forenklede kurver. Eurasia har større permafrostareal og større volum enn Nord-Amerika. Arealet i Nord-Amerika faller mot et bunnpunkt for om lag 20 000 år siden, der innlandsisen er markert.</title>
        <rect width="880" height="440" fill="#0f171c" rx="12" />
        <Panel x={40} title="Areal" eurasia="M70 250 C 140 240, 200 180, 280 120 C 330 90, 360 130, 400 210" northAmerica="M70 300 C 150 280, 220 260, 300 310 C 340 340, 370 250, 400 230" />
        <Panel x={460} title="Volum" eurasia="M70 260 C 150 250, 220 170, 300 110 C 350 90, 380 150, 400 200" northAmerica="M70 300 C 160 305, 250 290, 330 295 C 360 298, 380 290, 400 292" />
        <g transform="translate(40 400)">
          <line x1={0} y1={0} x2={28} y2={0} stroke="#e0b48a" strokeWidth={3} />
          <text x={36} y={5} fill="#e8eef2" fontFamily={font} fontSize={15}>Eurasia</text>
          <line x1={140} y1={0} x2={168} y2={0} stroke="#8eb4d4" strokeWidth={3} />
          <text x={176} y={5} fill="#e8eef2" fontFamily={font} fontSize={15}>Nord-Amerika</text>
        </g>
      </svg>
    </FigureFrame>
  );
}

function Panel({ x, title, eurasia, northAmerica }: { x: number; title: string; eurasia: string; northAmerica: string }) {
  return (
    <g transform={`translate(${x} 20)`}>
      <text x={200} y={28} textAnchor="middle" fill="#e8eef2" fontFamily={font} fontSize={20} fontWeight={650}>
        {title}
      </text>
      <line x1={70} y1={50} x2={70} y2={340} stroke="#8b9aa6" />
      <line x1={70} y1={340} x2={400} y2={340} stroke="#8b9aa6" />
      <text x={70} y={362} textAnchor="middle" fill="#8b9aa6" fontFamily={font} fontSize={13}>125</text>
      <text x={235} y={362} textAnchor="middle" fill="#8b9aa6" fontFamily={font} fontSize={13}>60</text>
      <text x={360} y={362} textAnchor="middle" fill="#8b9aa6" fontFamily={font} fontSize={13}>20</text>
      <text x={400} y={362} textAnchor="middle" fill="#8b9aa6" fontFamily={font} fontSize={13}>0</text>
      <text x={235} y={386} textAnchor="middle" fill="#e8eef2" fontFamily={font} fontSize={14}>
        tusen år før nåtid
      </text>
      <text x={48} y={180} fill="#8b9aa6" fontFamily={font} fontSize={13} transform="rotate(-90 48 180)">
        større oppover
      </text>
      <path d={eurasia} fill="none" stroke="#e0b48a" strokeWidth={3} />
      <path d={northAmerica} fill="none" stroke="#8eb4d4" strokeWidth={3} />
      <line x1={348} y1={70} x2={348} y2={340} stroke="#d07a7a" strokeDasharray="4 4" />
      <text x={352} y={84} fill="#d07a7a" fontFamily={font} fontSize={12}>
        innlandsis
      </text>
    </g>
  );
}

function NveFigure() {
  return (
    <FigureFrame
      heading="Massebalanse for Ålfotbreen og Hellstugubreen"
      caption={
        <>
          Originalfigurene fra NVE. Blått er vinterbalanse, rødt er sommerbalanse og grått er
          årsbalanse, i meter vannekvivalent. Diagrammene på glacier.nve.no går nå lenger enn
          årstallene som er nevnt i oppgaven. Bruk årene oppgaven ber om.
          <Credit
            who="Norges vassdrags- og energidirektorat (NVE)"
            title="Klimaindikator for Ålfotbreen (2078) og Hellstugubreen (2768)"
            href="https://glacier.nve.no/Glacier/viewer/CI/no/nve/ClimateIndicatorInfo/2078?name=%C3%85lfotbreen"
            license="Bruk med «Kilde: NVE». Åpne data: Norsk lisens for offentlige data (NLOD) 2.0"
            licenseHref="https://www.nve.no/vann-og-vassdrag/vannets-kretsloep/bre/bredata/"
          />
        </>
      }
    >
      <div className="grid gap-6">
        <img
          src="/eksamen/v2026/nve-alfotbreen.png"
          alt="Stolpediagram for Ålfotbreen. Blå stolper oppover er vinterbalanse, røde stolper nedover er sommerbalanse, og grå stolper er årsbalanse, fra 1963 og framover."
          className="mx-auto h-auto w-full max-w-3xl bg-white"
        />
        <img
          src="/eksamen/v2026/nve-hellstugubreen.png"
          alt="Stolpediagram for Hellstugubreen. Blå stolper oppover er vinterbalanse, røde stolper nedover er sommerbalanse, og grå stolper er årsbalanse, fra 1962 og framover."
          className="mx-auto h-auto w-full max-w-3xl bg-white"
        />
      </div>
    </FigureFrame>
  );
}

function FoehnFigure() {
  const markerId = useId().replace(/:/g, "");
  return (
    <FigureFrame
      heading="Fønvind over et fjell på 2000 meter"
      scroll
      caption={
        <>
          Egen figur av situasjonen i oppgaven. Foten ligger ved havnivå, skybasen på losiden er 800
          m, og temperaturen der er 14 °C. Tørradiabatisk gradient er 1 °C per 100 m, og
          våtadiabatisk gradient er 0,5 °C per 100 m. Temperaturen på toppen og på lesiden er ikke
          regnet ut i figuren.
        </>
      }
    >
      <svg viewBox="0 0 760 460" className="h-auto w-full max-w-none max-sm:min-w-[40rem]" role="img" aria-labelledby="foehn-title">
        <title id="foehn-title">Fjell på 2000 meter. Vinden kommer inn fra venstre, skyene starter i 800 meters høyde, og luften synker på lesiden. 14 grader er oppgitt ved havnivå på losiden.</title>
        <rect width="760" height="460" fill="#0f171c" rx="12" />
        <path d="M40 360 L250 150 L380 70 L520 170 L720 360 Z" fill="#24343c" stroke="#c9b896" strokeWidth={2} />
        <line x1={40} y1={360} x2={720} y2={360} stroke="#6fb3b8" strokeWidth={2} />
        <path d="M150 250 C 190 230, 230 210, 280 188 C 320 170, 350 150, 390 120 C 360 150, 330 190, 300 210 C 250 240, 190 250, 150 262 Z" fill="#8eb4d4" opacity={0.85} />
        <path d="M180 230 C 220 214, 260 196, 300 176" fill="none" stroke="#d7e4ee" strokeWidth={6} strokeLinecap="round" />
        <line x1={90} y1={340} x2={250} y2={188} stroke="#e0b48a" strokeWidth={3} markerEnd={`url(#${markerId})`} />
        <line x1={400} y1={110} x2={560} y2={250} stroke="#e0b48a" strokeWidth={3} markerEnd={`url(#${markerId})`} />
        <line x1={590} y1={300} x2={690} y2={340} stroke="#e0b48a" strokeWidth={3} markerEnd={`url(#${markerId})`} />
        <line x1={250} y1={248} x2={430} y2={248} stroke="#8b9aa6" strokeDasharray="5 4" />
        <text x={90} y={400} fill="#e8eef2" fontFamily={font} fontSize={16}>Loside, 0 m</text>
        <text x={90} y={422} fill="#e0b48a" fontFamily={font} fontSize={16}>14 °C</text>
        <text x={500} y={400} fill="#e8eef2" fontFamily={font} fontSize={16}>Leside, 0 m</text>
        <text x={250} y={236} fill="#e8eef2" fontFamily={font} fontSize={15}>Skybase 800 m</text>
        <text x={392} y={58} fill="#e8eef2" fontFamily={font} fontSize={16}>Topp 2000 m</text>
        <text x={70} y={40} fill="#8b9aa6" fontFamily={font} fontSize={15}>Tørradiabatisk 1 °C / 100 m</text>
        <text x={70} y={62} fill="#8eb4d4" fontFamily={font} fontSize={15}>Våtadiabatisk 0,5 °C / 100 m i skyen</text>
        <defs>
          <marker id={markerId} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0 1.5 L11 6 L0 10.5 z" fill="#e0b48a" />
          </marker>
        </defs>
      </svg>
    </FigureFrame>
  );
}

export function V2026TaskFigure({ number, officialUrl }: { number: number; officialUrl: string }) {
  switch (number) {
    case 1:
      return <AnalyseFigure />;
    case 2:
      return <CopernicusFigure />;
    case 4:
      return <GabrielleFigure />;
    case 6:
      return <GydaFigures />;
    case 7:
      return <DyeFigure />;
    case 8:
      return <TsFigure />;
    case 9:
      return <CtdFigure officialUrl={officialUrl} />;
    case 11:
      return <BathyFigure />;
    case 12:
      return <GjelstrupFigure />;
    case 16:
      return <ChandlerFigure />;
    case 17:
      return <PermafrostFigure />;
    case 19:
      return <NveFigure />;
    case 22:
      return <FoehnFigure />;
    default:
      return null;
  }
}
