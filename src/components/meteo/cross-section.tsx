import { windLevel } from "@/lib/meteo/fagtekst";
import { continentalityAt } from "@/lib/meteo/land";
import {
  clamp,
  evaluate,
  jetHem,
  nb,
  polarId,
  ribbonLat,
  subId,
  temperatureAt,
  type ClimateModes,
  type Hem,
  type JetId,
  type Jets,
  CLIMATE_OFF,
} from "@/lib/meteo/physics";

type Props = {
  jets: Jets;
  month: number;
  lon: number;
  hem: Hem;
  modes?: ClimateModes;
};

function mix(t: number): string {
  const x = clamp(t / 22, -1, 1);
  if (x >= 0) {
    return `color-mix(in oklab, var(--color-foreground) ${Math.round((1 - x) * 70)}%, #d4654a)`;
  }
  return `color-mix(in oklab, var(--color-foreground) ${Math.round((1 + x) * 70)}%, #3e8eae)`;
}

export function CrossSection({ jets, month, lon, hem, modes = CLIMATE_OFF }: Props) {
  const sky = evaluate(jets, month, modes);
  const polar = sky.ribbons[polarId(hem)];
  const sub = sky.ribbons[subId(hem)];
  const left = 36;
  const top = 16;
  const plotW = 300;
  const plotH = 150;
  const absOf = (lat: number) => (hem === "N" ? lat : -lat);
  const xOf = (lat: number) => left + ((absOf(lat) - 12) / 66) * plotW;
  const yOf = (z: number) => top + (1 - z / 16) * plotH;
  const cols = 26;
  const rows = 16;
  const cells: { x: number; y: number; w: number; h: number; fill: string }[] = [];
  for (let c = 0; c < cols; c++) {
    const a0 = 12 + (c / cols) * 66;
    const a1 = 12 + ((c + 1) / cols) * 66;
    const lat0 = hem === "N" ? a0 : -a0;
    const lat1 = hem === "N" ? a1 : -a1;
    const lat = (lat0 + lat1) / 2;
    const surface = temperatureAt(lat, lon, sky, month, continentalityAt(lat, lon));
    for (let r = 0; r < rows; r++) {
      const z0 = (r / rows) * 16;
      const z1 = ((r + 1) / rows) * 16;
      const z = (z0 + z1) / 2;
      const trop = tropopause(lat, ribbonLat(polar, lon), hem);
      const lapse = z <= trop ? surface - 6.4 * z : surface - 6.4 * trop + 1.1 * (z - trop);
      cells.push({
        x: xOf(lat0),
        y: yOf(z1),
        w: Math.max(1, xOf(lat1) - xOf(lat0)),
        h: Math.max(1, yOf(z0) - yOf(z1)),
        fill: mix(lapse),
      });
    }
  }

  const tropPath = Array.from({ length: 40 }, (_, i) => {
    const a = 12 + (i / 39) * 66;
    const lat = hem === "N" ? a : -a;
    const z = tropopause(lat, ribbonLat(polar, lon), hem);
    return `${i === 0 ? "M" : "L"} ${xOf(lat).toFixed(1)} ${yOf(z).toFixed(1)}`;
  }).join(" ");

  const front = (id: JetId, zTop: number) => {
    const lat = ribbonLat(id === polar.id ? polar : sub, lon);
    const sign = hem === "N" ? 1 : -1;
    const x0 = xOf(lat - sign * 5);
    const x1 = xOf(lat);
    return `M ${x0.toFixed(1)} ${yOf(0).toFixed(1)} L ${x1.toFixed(1)} ${yOf(zTop).toFixed(1)}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <svg viewBox="0 0 348 210" className="h-auto w-full" role="img" aria-label="Høydesnitt gjennom atmosfæren">
        <rect x="0" y="0" width="348" height="210" fill="var(--color-background)" />
        {cells.map((cell, index) => (
          <rect key={index} x={cell.x} y={cell.y} width={cell.w} height={cell.h} fill={cell.fill} />
        ))}
        <path d={tropPath} fill="none" stroke="var(--color-foreground)" strokeWidth="1.4" />
        <path d={front(polar.id, 10)} fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
        <path d={front(sub.id, 12)} fill="none" stroke="#3e8eae" strokeWidth="1.25" strokeDasharray="4 3" />
        <ellipse
          cx={xOf(ribbonLat(polar, lon))}
          cy={yOf(10.4)}
          rx="16"
          ry="7"
          fill="var(--color-primary)"
          opacity="0.9"
        />
        <ellipse
          cx={xOf(ribbonLat(sub, lon))}
          cy={yOf(12.2)}
          rx="11"
          ry="5"
          fill="#3e8eae"
          opacity="0.85"
        />
        <text x={xOf(ribbonLat(polar, lon))} y={yOf(10.4) + 3} textAnchor="middle" fill="var(--color-primary-foreground)" fontSize="9">
          {windLevel(polar.speed, "jet").label}
        </text>
        <text x="4" y={yOf(0) - 3} fill="var(--color-muted-foreground)" fontSize="9">
          bakken
        </text>
        <text x="4" y="12" fill="var(--color-muted-foreground)" fontSize="9">
          høyde ↑
        </text>
        <text x={left} y="204" fill="var(--color-muted-foreground)" fontSize="10">
          mot ekvator
        </text>
        <text x={left + plotW} y="204" textAnchor="end" fill="var(--color-muted-foreground)" fontSize="10">
          mot polen
        </text>
        <text x={xOf(ribbonLat(polar, lon))} y={yOf(16) + 12} textAnchor="middle" fill="var(--color-primary)" fontSize="10">
          polarjet
        </text>
      </svg>
      <p className="text-sm text-muted-foreground">
        Temperaturen faller mot polen, så vinden øker med høyden (termalvind) til tropopausen. Der ligger kjernen.
        Fronten heller inn over kaldluften. Snittet følger lengdegraden du har valgt på kartet.
      </p>
    </div>
  );
}

function tropopause(lat: number, jetLat: number, hem: Hem): number {
  const abs = Math.abs(lat);
  const poleward = hem === "N" ? lat - jetLat : jetLat - lat;
  const base = 16.1 - abs * 0.078;
  return clamp(base - 1.8 / (1 + Math.exp(-poleward / 3.2)), 7.4, 16.3);
}

export function sectionHem(lat: number, selected: JetId): Hem {
  if (Math.abs(lat) < 8) return jetHem(selected);
  return lat >= 0 ? "N" : "S";
}
