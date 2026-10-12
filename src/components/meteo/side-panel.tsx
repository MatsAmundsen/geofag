import { RotateCcw } from "lucide-react";
import { CrossSection, sectionHem } from "@/components/meteo/cross-section";
import { DispersionChart } from "@/components/meteo/dispersion-chart";
import { ControlSlider } from "@/components/meteo/control-slider";
import { jetLabel, reportAt, focusSites, placeWeather } from "@/lib/meteo/diagnose";
import { EXPLAIN, rainLevel, tempLevel, windLevel } from "@/lib/meteo/fagtekst";
import { RelScale } from "@/components/meteo/rel-scale";
import { PRESETS } from "@/lib/meteo/presets";
import {
  baseSpeed,
  climLat,
  jetSpeed,
  nb,
  phaseSpeed,
  type JetId,
} from "@/lib/meteo/physics";
import { useClimateModes, useJetStore } from "@/lib/meteo/store";

const JETS: JetId[] = ["npj", "nstj", "spj", "sstj"];

const LAYERS = [
  ["anomaly", "Temperaturavvik"],
  ["precip", "Nedbør"],
  ["systems", "Lavtrykk"],
  ["highs", "Høytrykk og blokkering"],
  ["rivers", "Atmosfæriske elver"],
  ["normal", "Normalbane"],
  ["arrows", "Vindpiler"],
] as const;

export function SidePanel() {
  const month = useJetStore((s) => s.month);
  const jets = useJetStore((s) => s.jets);
  const selected = useJetStore((s) => s.selected);
  const layers = useJetStore((s) => s.layers);
  const probe = useJetStore((s) => s.probe);
  const landTick = useJetStore((s) => s.landTick);
  const setSelected = useJetStore((s) => s.setSelected);
  const patchJet = useJetStore((s) => s.patchJet);
  const clearBend = useJetStore((s) => s.clearBend);
  const applyPreset = useJetStore((s) => s.applyPreset);
  const toggleLayer = useJetStore((s) => s.toggleLayer);
  const setProbe = useJetStore((s) => s.setProbe);
  const setFocus = useJetStore((s) => s.setFocus);
  const modes = useClimateModes();
  const areas = focusSites(jets, month, undefined, modes);

  const jet = jets[selected];
  const info = reportAt(probe.lat, probe.lon, jets, month, undefined, modes);
  const cards = placeWeather({ lat: probe.lat, lon: probe.lon, name: info.title, role: "" }, jets, month, modes);
  const speed = jetSpeed(jet, selected, month);
  const c = phaseSpeed(jet, selected, month);
  const bend = Math.max(...jet.offsets.map((value) => Math.abs(value)));
  void landTick;

  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-3 border-b border-border px-4 py-4">
        <h2 className="font-display text-xl text-foreground">Dette stedet</h2>
        <p className="text-sm text-muted-foreground">
          {info.title} · {info.coords}
        </p>
        <p className="font-display text-2xl text-foreground">{info.weather}</p>
        <div className="flex flex-col gap-1.5" data-testid="dette-stedet-skala">
          <RelScale kind="Temperatur" level={tempLevel(info.anomaly)} />
          <RelScale kind="Nedbør" level={rainLevel(info.precip, info.normalPrecip)} />
          <RelScale kind="Vind nær bakken" level={{ ...windLevel(info.windSurface, "bakke"), label: `${windLevel(info.windSurface, "bakke").label} vind` }} />
        </div>
        <p className="text-xs text-muted-foreground">Sammenlignet med en rett, klimatologisk jetstrøm og nøytral ENSO og IOD.</p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ["Banen du tegnet", "Slik strekene ligger nå", cards.now],
              ["Polarjeten over", "Hvis banen bøyes hit", cards.polar],
              ["Subtropisk jet over", "Hvis banen bøyes hit", cards.sub],
              ["Begge møtes her", "Hvis banen bøyes hit", cards.meet],
            ] as const
          ).map(([title, note, report]) => (
            <div key={title} className="rounded-lg border border-border bg-card px-3 py-2">
              <p className="text-sm font-medium text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground">{note}</p>
              <p className="mt-1 text-sm text-foreground">{report.weather}</p>
              <div className="mt-1 flex flex-col gap-1">
                <RelScale compact kind="Temperatur" level={tempLevel(report.anomaly)} />
                <RelScale compact kind="Nedbør" level={rainLevel(report.precip, report.normalPrecip)} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {areas.map((site, index) => (
            <button
              key={site.id}
              type="button"
              className="rounded-2xl border border-border bg-card px-3 py-2 text-left text-sm text-foreground"
              onClick={() => {
                setProbe({ lat: site.lat, lon: site.lon });
                setFocus({ name: site.name, lat: site.lat, lon: site.lon, jet: site.jet, role: site.role });
              }}
            >
              <span className="block">
                {index + 1} {site.name}
              </span>
              <span className="block text-xs text-muted-foreground">{site.tag}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 border-b border-border px-4 py-4">
        <h2 className="font-display text-xl text-foreground">Styr banen</h2>
        <div className="grid grid-cols-2 gap-2">
          {JETS.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={selected === id}
              className={
                selected === id
                  ? "h-11 rounded-lg bg-primary px-2 text-sm text-primary-foreground"
                  : "h-11 rounded-lg border border-border bg-card px-2 text-sm text-foreground"
              }
              onClick={() => setSelected(id)}
            >
              {jetLabel(id)}
            </button>
          ))}
        </div>
        <ControlSlider
          label="Rett til bølgete"
          min={0}
          max={18}
          step={0.5}
          value={jet.amp}
          display={jet.amp < 0.5 ? "rett" : `${nb(jet.amp, 1)}°`}
          low="Rett, sonal"
          high="Dype tråg og rygger"
          onChange={(amp) => patchJet(selected, { amp })}
        />
        <ControlSlider
          label="Bølgetall"
          min={3}
          max={7}
          step={1}
          value={jet.wave}
          display={`${jet.wave} rundt jorden`}
          low="Lange, trege bølger"
          high="Korte, raske bølger"
          onChange={(wave) => patchJet(selected, { wave })}
        />
        <ControlSlider
          label="Flytt mønsteret"
          min={0}
          max={360}
          step={1}
          value={(jet.phase * 180) / Math.PI}
          display={`${nb((jet.phase * 180) / Math.PI, 0)}°`}
          low="Vest"
          high="Øst"
          onChange={(deg) => patchJet(selected, { phase: (deg * Math.PI) / 180 })}
        />
        <ControlSlider
          label="Hele banen nord eller sør"
          min={-14}
          max={14}
          step={0.5}
          value={jet.latShift}
          display={`${jet.latShift > 0 ? "+" : ""}${nb(jet.latShift, 1)}°`}
          low="Mot ekvator"
          high="Mot polen"
          onChange={(latShift) => patchJet(selected, { latShift })}
        />
        <ControlSlider
          label="Styrke"
          min={0.65}
          max={1.45}
          step={0.05}
          value={jet.speedMul}
          display={`${windLevel(speed, "jet").label} vind`}
          low="Svakere enn årstiden"
          high="Sterkere"
          onChange={(speedMul) => patchJet(selected, { speedMul })}
        />
        <p className="text-sm text-muted-foreground">
          Klimatologisk kjerne i {monthNameOnly(month)} ligger nær {nb(Math.abs(climLat(selected, month)), 0)}°
          {climLat(selected, month) >= 0 ? " N" : " S"}, med {windLevel(baseSpeed(selected, month), "jet").label} vind som typisk.
          {" "}
          {Math.abs(c) < 3 ? "Bølgemønsteret står nesten stille." : c > 0 ? "Bølgemønsteret driver østover." : "Bølgemønsteret driver vestover."}
          {" "}
          {bend > 0.5 ? "Banen er bøyd for hånd." : ""}
        </p>
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border text-sm text-foreground"
          onClick={() => clearBend(selected)}
        >
          <RotateCcw className="size-4" />
          Fjern fri bane
        </button>
      </section>

      <section className="flex flex-col gap-3 border-b border-border px-4 py-4">
        <h2 className="font-display text-xl text-foreground">{EXPLAIN.jetPresetsTitle}</h2>
        <div className="flex flex-col gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="rounded-lg border border-border bg-card px-3 py-3 text-left"
              onClick={() => applyPreset(preset)}
            >
              <span className="block text-sm font-medium text-foreground">{preset.name}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{preset.blurb}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3 border-b border-border px-4 py-4">
        <h2 className="font-display text-xl text-foreground">Lag på kartet</h2>
        <div className="flex flex-wrap gap-2">
          {LAYERS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={layers[key]}
              className={
                layers[key]
                  ? "h-10 rounded-full bg-primary px-3 text-sm text-primary-foreground"
                  : "h-10 rounded-full border border-border px-3 text-sm text-foreground"
              }
              onClick={() => toggleLayer(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>


      <section className="flex flex-col gap-3 border-b border-border px-4 py-4">
        <h2 className="font-display text-xl text-foreground">{EXPLAIN.whyTitle}</h2>
        {EXPLAIN.why.map((text) => (
          <p key={text} className="text-sm text-pretty text-foreground">
            {text}
          </p>
        ))}
        <DispersionChart jets={jets} id={selected} month={month} />
      </section>

      <section className="flex flex-col gap-3 border-b border-border px-4 py-4">
        <h2 className="font-display text-xl text-foreground">{EXPLAIN.arTitle}</h2>
        {EXPLAIN.ar.map((text) => (
          <p key={text} className="text-sm text-pretty text-foreground">
            {text}
          </p>
        ))}
      </section>

      <section className="flex flex-col gap-3 border-b border-border px-4 py-4">
        <h2 className="font-display text-xl text-foreground">{EXPLAIN.sectionTitle}</h2>
        <CrossSection jets={jets} month={month} lon={probe.lon} hem={sectionHem(probe.lat, selected)} modes={modes} />
      </section>
    </div>
  );
}

function monthNameOnly(month: number): string {
  return [
    "januar",
    "februar",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "desember",
  ][month] ?? "januar";
}
