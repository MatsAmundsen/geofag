import { Pause, Play } from "lucide-react";
import { MapChrome, WorldMap } from "@/components/meteo/world-map";
import { RegionZoom } from "@/components/meteo/region-zoom";
import { SidePanel } from "@/components/meteo/side-panel";
import { worldHeadline } from "@/lib/meteo/diagnose";
import { monthName, nb } from "@/lib/meteo/physics";
import { useJetStore } from "@/lib/meteo/store";
import { ControlSlider } from "@/components/meteo/control-slider";

export function JetModel() {
  const month = useJetStore((s) => s.month);
  const jets = useJetStore((s) => s.jets);
  const playing = useJetStore((s) => s.playing);
  const setMonth = useJetStore((s) => s.setMonth);
  const togglePlay = useJetStore((s) => s.togglePlay);
  const mapLarge = useJetStore((s) => s.mapLarge);
  const enso = useJetStore((s) => s.enso);
  const iod = useJetStore((s) => s.iod);
  const headline = worldHeadline(jets, month, { enso, iod });

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card text-foreground lg:h-[48rem]">
      <header className="flex shrink-0 flex-col gap-3 border-b border-border px-4 py-3 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Undervisningsmodell</p>
            <h2 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">Jetstrømmer og atmosfæriske elver</h2>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
            onClick={togglePlay}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            {playing ? "Pause" : "Beveg bølgene"}
          </button>
        </div>
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
        <p className="text-sm text-pretty text-foreground">
          <span className="font-medium">{headline.title}.</span> {headline.detail}
        </p>
      </header>
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className={mapLarge ? "jet-map-stage is-large" : "jet-map-stage min-w-0 lg:flex-1"}>
          <WorldMap />
          <MapChrome />
        </div>
        <aside className={mapLarge ? "hidden" : "border-t border-border lg:w-96 lg:shrink-0 lg:overflow-y-auto lg:border-t-0 lg:border-l"}>
          <SidePanel />
        </aside>
      </div>
      <p className="sr-only">Avvikene på kartet er i forhold til en rett jetstrøm samme måned. {nb(month, 0)}</p>
      <RegionZoom />
    </div>
  );
}
