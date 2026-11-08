import { useRef, useState } from "react";
import { Choice, FigureNote, Lab, Readouts, Transport } from "./lab";
import { clearPaper, fitCanvas, useSimLoop } from "./draw";
import { label } from "./paint";
import { warningStatus } from "./sim/fjord";
import { ink } from "./sim/palette";

type Source = "skjelv" | "skred";
export const WARNING_STAGES = [
  {
    title: "Seismisk registrering",
    detail: "Rask, foreløpig vurdering",
    requiresWater: false,
    mayUseWater: false,
  },
  {
    title: "Foreløpig varsel",
    detail: "Kan sendes før vannmåling",
    requiresWater: false,
    mayUseWater: false,
  },
  {
    title: "Bøye og kystmåler",
    detail: "Kan gi senere måledata",
    requiresWater: false,
    mayUseWater: true,
  },
  {
    title: "Oppdatert varsel",
    detail: "Flere data, fortsatt usikkerhet",
    requiresWater: false,
    mayUseWater: true,
  },
] as const;
export const SKRED_WARNING_STAGES = [
  { title: "Skred setter vann i bevegelse", detail: "Kan mangle seismisk varsel" },
  { title: "Mulig lokalt varsel", detail: "Lokalt varsel er ikke garantert" },
  { title: "Eventuelle målinger", detail: "Et manglende signal avkrefter ikke" },
  { title: "Mer kunnskap hvis data kommer", detail: "Flere data, fortsatt usikkerhet" },
] as const;
export function ModelWarning() {
  const [source, setSource] = useState<Source>("skjelv");
  const [playing, setPlaying] = useState(false),
    [step, setStep] = useState(0);
  const clock = useRef(0),
    canvasRef = useRef<HTMLCanvasElement>(null);
  const reset = () => {
    clock.current = 0;
    setStep(0);
    setPlaying(false);
  };
  const advance = (amount: number) => {
    clock.current = Math.min(3, clock.current + amount);
    setStep(Math.floor(clock.current));
    if (clock.current >= 3) {
      setPlaying(false);
      return false;
    }
  };
  const stages = source === "skjelv" ? WARNING_STAGES : SKRED_WARNING_STAGES;
  useSimLoop(
    canvasRef,
    playing,
    (frames) => advance(frames / 180),
    () => {
      const fit = canvasRef.current && fitCanvas(canvasRef.current);
      if (!fit) return;
      const { ctx, w, h } = fit;
      clearPaper(ctx, w, h);
      const left = 12,
        width = w - 24,
        row = 84;
      stages.forEach((stage, i) => {
        const y = 20 + i * row,
          active = i <= Math.floor(clock.current);
        ctx.fillStyle = active ? ink.water : ink.panel;
        ctx.fillRect(left, y, width, 64);
        ctx.strokeStyle = active ? ink.sea : ink.muted;
        ctx.lineWidth = active ? 2 : 1;
        ctx.strokeRect(left, y, width, 64);
        label(ctx, `${i + 1} · ${stage.title}`, left + 10, y + 24, { weight: "600" });
        label(ctx, stage.detail, left + 10, y + 47);
        if (i < 3) {
          ctx.strokeStyle = ink.sea;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(w / 2, y + 65);
          ctx.lineTo(w / 2, y + 79);
          ctx.moveTo(w / 2 - 4, y + 75);
          ctx.lineTo(w / 2, y + 79);
          ctx.lineTo(w / 2 + 4, y + 75);
          ctx.stroke();
        }
      });
      label(ctx, "Rekkefølge, ikke tidsmålestokk", w / 2, h - 12, { align: "center" });
    },
  );
  return (
    <Lab
      id="m6"
      status={warningStatus(source, step, `${stages[step].title}. ${stages[step].detail}`)}
      index="M6"
      title="Varslingskjeden og dens grenser"
      question="Må første varsel vente på at bølgen er målt?"
      assume="Dette er en prinsippskisse, ikke en klokke for et bestemt varslingssystem. Tid og rekkefølge kan variere. Målinger kan oppdatere et seismisk førstevarsel, men er ikke et krav før det sendes. Skred kan mangle seismisk førstevarsel."
      conclusion={
        source === "skred"
          ? "Seismisk varsling dekker ikke nødvendigvis et skred. Overvåking og lokale varslingsordninger må vurderes særskilt. Skissen lover ingen tid til evakuering."
          : step < 2
            ? "Et foreløpig varsel kan bygge på seismiske data før bølgen er målt. Ikke vent på en måling dersom du oppfatter naturlige tegn nær kilden."
            : "Vannmålinger kan forbedre vurderingen. Fravær av signal betyr ikke at faren er avkreftet. Heller ikke et oppdatert varsel gir en garantert evakueringsmargin."
      }
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas
          ref={canvasRef}
          role="img"
          aria-describedby="m6-beskrivelse m6-naturlige-tegn"
          aria-label={`${source === "skjelv" ? "Seismisk vurdering, foreløpig varsel, senere vannmålinger og oppdatert varsel" : "Skred kan mangle seismisk varsel"}. Framhevet trinn: ${step + 1}.`}
          className="h-[380px] w-full"
        />
      </div>
      <div id="m6-beskrivelse">
        <FigureNote>
          Skjematisk rekkefølge, ikke i målestokk i tid. Bøye og kystmåler er mulige datakilder, ikke
          en garanti for at data kommer før bølgen. Ingen trygghetsgaranti.
        </FigureNote>
      </div>
      <p id="m6-naturlige-tegn" className="rounded-xl border border-line bg-paper p-3 text-sm text-ink">
        <strong>Naturlige tegn og restusikkerhet.</strong> Kraftig eller langvarig risting, brå
        endring i havnivå eller uvanlig lyd fra havet kan være naturlige tegn. Nær kilden kan tiden
        være kort. Ikke vent på bøye eller kystmåling for å reagere på slike tegn. Følg lokale råd
        og myndighetenes beskjeder.
      </p>
      <Choice
        label="Kildetype"
        value={source}
        options={[
          { id: "skjelv", label: "Jordskjelv" },
          { id: "skred", label: "Skred" },
        ]}
        onChange={(next) => {
          reset();
          setSource(next);
        }}
      />
      <Transport
        liveTime={false}
        toggleState={false}
        playing={playing}
        onToggle={() => {
          if (clock.current >= 3) {
            clock.current = 0;
            setStep(0);
          }
          setPlaying((p) => !p);
        }}
        onReset={reset}
        onStep={() => {
          setPlaying(false);
          advance(1);
        }}
        stepLabel="Neste ledd"
        time={`Ledd ${step + 1} av 4`}
      />
      <Readouts
        items={[
          {
            k: "Første varsel",
            v: source === "skjelv" ? "Kan være seismisk" : "Ikke garantert",
            hint: "ikke krav om vannmåling",
          },
          {
            k: "Senere målinger",
            v: "Oppdaterer vurderingen",
            hint: "manglende signal avkrefter ikke",
          },
          { k: "Tilgjengelig tid", v: "Usikker", hint: "ingen sikker evakueringsmargin" },
        ]}
      />
    </Lab>
  );
}
