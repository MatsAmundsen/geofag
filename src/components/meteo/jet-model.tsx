import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { ClimateControls } from "@/components/meteo/climate-controls";
import { ControlSlider } from "@/components/meteo/control-slider";
import { MapChrome, MOIST, TROP, WorldMap } from "@/components/meteo/world-map";
import { RegionZoom } from "@/components/meteo/region-zoom";
import { SidePanel } from "@/components/meteo/side-panel";
import { worldHeadline } from "@/lib/meteo/diagnose";
import { FLOW_TEXT, LEGEND_TEXT, MODEL_DISCLAIMER } from "@/lib/meteo/fagtekst";
import { activeFlows } from "@/lib/meteo/moisture-flows";
import { ensoAmp, iodAmp, monthName } from "@/lib/meteo/physics";
import { useClimateModes, useJetStore } from "@/lib/meteo/store";

const AMBER = "#e4a23c";
const STEEL = "#7eb6cc";

function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setV(value), ms);
    return () => window.clearTimeout(id);
  }, [value, ms]);
  return v;
}

function Legend({ overlay }: { overlay: boolean }) {
  const items: [string, React.ReactNode][] = [
    [LEGEND_TEXT.polar, <line key="p" x1="1" y1="5" x2="27" y2="5" stroke={AMBER} strokeWidth="2.4" strokeLinecap="round" />],
    [LEGEND_TEXT.sub, <line key="s" x1="1" y1="5" x2="27" y2="5" stroke={STEEL} strokeWidth="1.5" strokeLinecap="round" />],
    [
      LEGEND_TEXT.ar,
      <g key="a">
        <path d="M1 4 L22 2 L22 8 L1 6 Z" fill={MOIST} fillOpacity="0.45" stroke={MOIST} strokeDasharray="2 2" strokeWidth="1" />
        <path d="M22 2 L27 5 L22 8" fill="none" stroke={MOIST} strokeWidth="1.5" />
      </g>,
    ],
    [
      LEGEND_TEXT.tropical,
      <path key="t" d="M1 2.5 H18 V0.5 L27 5 L18 9.5 V7.5 H1 Z" fill={TROP} fillOpacity="0.7" stroke={TROP} strokeWidth="1" />,
    ],
  ];
  return (
    <ul
      className={
        overlay
          ? "pointer-events-none absolute bottom-3 left-3 hidden flex-col gap-1 rounded-lg bg-card/85 px-3 py-2 text-xs text-foreground backdrop-blur-sm lg:flex"
          : "flex flex-wrap gap-x-4 gap-y-1 border-b border-border px-4 py-2 text-xs text-foreground lg:hidden"
      }
      aria-label="Tegnforklaring"
    >
      {items.map(([label, icon]) => (
        <li key={label} className="flex items-center gap-2">
          <svg width="28" height="10" viewBox="0 0 28 10" aria-hidden="true">
            {icon}
          </svg>
          {label}
        </li>
      ))}
    </ul>
  );
}

export function JetModel() {
  const month = useJetStore((s) => s.month);
  const jets = useJetStore((s) => s.jets);
  const playing = useJetStore((s) => s.playing);
  const setMonth = useJetStore((s) => s.setMonth);
  const togglePlay = useJetStore((s) => s.togglePlay);
  const mapLarge = useJetStore((s) => s.mapLarge);
  const modes = useClimateModes();
  const headline = worldHeadline(jets, month, modes);
  const live = useDebounced(`${headline.title}. ${headline.detail}`, 300);
  const flows = activeFlows(ensoAmp(modes), iodAmp(modes), month);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card text-foreground" data-testid="jet-model">
      <header className="flex shrink-0 flex-col gap-3 border-b border-border px-4 py-3 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Undervisningsmodell</p>
            <h2 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">Jetstrømmer og atmosfæriske elver</h2>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            onClick={togglePlay}
            aria-pressed={playing}
          >
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
            {playing ? "Pause" : "Beveg bølgene"}
          </button>
        </div>
        <p className="text-xs text-pretty text-muted-foreground">{MODEL_DISCLAIMER}</p>
        <ControlSlider
          label="Årstid"
          min={0}
          max={11}
          step={1}
          value={month}
          display={monthName(month)}
          low="Januar"
          high="Desember"
          onChange={(value) => setMonth(value)}
        />
        <p className="text-sm text-pretty text-foreground" aria-hidden="true">
          <span className="font-medium">{headline.title}.</span> {headline.detail}
        </p>
        <p className="sr-only" aria-live={playing ? "off" : "polite"}>
          {live}
        </p>
      </header>
      <div className={mapLarge ? "jet-map-stage is-large" : "jet-map-stage"}>
        <WorldMap />
        <MapChrome />
        <Legend overlay />
      </div>
      <Legend overlay={false} />
      <ul id="jet-map-desc" className="sr-only">
        <li>{headline.title}.</li>
        {flows.map(({ flow }) => (
          <li key={flow.id}>{FLOW_TEXT[flow.id].name}.</li>
        ))}
      </ul>
      <div className={mapLarge ? "hidden" : "grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-[2fr_1fr] lg:gap-x-0"}>
        <div className="min-w-0 lg:border-r lg:border-border">
          <ClimateControls />
        </div>
        <aside className="min-w-0">
          <SidePanel />
        </aside>
      </div>
      <RegionZoom />
    </div>
  );
}
