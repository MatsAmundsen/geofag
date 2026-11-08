import { useEffect, useRef, useState } from "react";
import { FigureNote, Lab, Transport } from "./lab";
import { clearPaper, fitCanvas, useSimLoop } from "./draw";
import { arrow, label, leader, paintRock, skyTo, smoothPath, textWidth } from "./paint";
import {
  fjordPlaybackTick,
  fjordStatus,
  FJORD_LEFT_SHORE,
  FJORD_RIGHT_SHORE,
  nextFjordStep,
  FJORD_CONTACT,
  FJORD_END,
  fjordBed,
  fjordStage,
  slideOutline,
  fjordSurface,
  fjordSlideLabel,
} from "./sim/fjord";
import { ink } from "./sim/palette";

export function ModelFjord() {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const progress = useRef(0);
  const previousTick = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const advance = (amount: number) => {
    progress.current = Math.min(FJORD_END, progress.current + amount);
    setPosition(progress.current);
    if (progress.current >= FJORD_END) {
      setPlaying(false);
      return false;
    }
  };
  const reset = () => {
    progress.current = 0;
    setPosition(0);
    setPlaying(false);
  };
  const playback = useSimLoop(
    canvasRef,
    playing,
    () => {
      const next = fjordPlaybackTick(progress.current, previousTick.current, performance.now());
      previousTick.current = next.timestamp;
      progress.current = next.position;
      setPosition(next.position);
      if (!next.more) setPlaying(false);
      return next.more;
    },
    () => {
      const fit = canvasRef.current && fitCanvas(canvasRef.current);
      if (!fit) return;
      const { ctx, w, h } = fit;
      const sea = h * 0.42,
        scale = h * 0.65;
      const xOf = (x: number) => x * w;
      const yOf = (y: number) => sea + y * scale;
      const t = progress.current;
      clearPaper(ctx, w, h);
      skyTo(ctx, w, sea);
      const bed = Array.from({ length: 151 }, (_, i) => ({
        x: xOf(i / 150),
        y: yOf(fjordBed(i / 150)),
      }));
      ctx.fillStyle = ink.water;
      ctx.fillRect(0, sea, w, h - sea);
      paintRock(ctx, bed, h);
      // Clip the prescribed surface to water: it never paints across a dry fjordside.
      ctx.save();
      // The air-above-bed clip alone includes dry hillside. Intersect it with the
      // actual wet section: a positive crest must never run up a dry shoulder.
      ctx.beginPath();
      ctx.rect(xOf(FJORD_LEFT_SHORE), 0, xOf(FJORD_RIGHT_SHORE - FJORD_LEFT_SHORE), h);
      ctx.clip();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w, 0);
      smoothPath(ctx, bed.slice().reverse(), false);
      ctx.closePath();
      ctx.clip();
      ctx.beginPath();
      const surf = fjordSurface(t).map((p) => ({ x: xOf(p.x), y: yOf(p.y) }));
      smoothPath(ctx, surf);
      ctx.strokeStyle = ink.sea;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
      const slide = slideOutline(t).map((p) => ({ x: xOf(p.x), y: yOf(p.y) }));
      ctx.beginPath();
      smoothPath(ctx, slide);
      ctx.closePath();
      ctx.fillStyle = ink.rock;
      ctx.fill();
      ctx.strokeStyle = ink.text;
      ctx.lineWidth = 1;
      ctx.stroke();
      const massName = t < 0.8 ? "Skred" : "Avsatt masse";
      const note = fjordSlideLabel(t, w, h, textWidth(ctx, massName));
      label(ctx, massName, note.x, note.baseline, { align: "center" });
      leader(ctx, note.x, note.baseline + 4, note.anchor.x, note.anchor.y - 3);
      label(ctx, fjordStage(t), w / 2, 40, { align: "center" });
      if (t >= 0.8 && t < FJORD_CONTACT) {
        arrow(ctx, xOf(0.38), sea - 40, xOf(0.66), ink.sea);
      } else if (t >= FJORD_CONTACT) {
        arrow(ctx, xOf(0.8), sea - 40, xOf(0.57), ink.sea);
      }
      label(ctx, "Tenkt fjordsnitt", w / 2, h - 28, { align: "center" });
    },
  );
  useEffect(() => {
    previousTick.current = null;
  }, [playing, playback.inView, playback.reduce]);
  const stage = fjordStage(position);
  return (
    <Lab
      id="m4"
      status={fjordStatus(position, playing)}
      index="M4"
      title="Skred i en stilisert fjord"
      question="Hva skjer i kildesonen, og hva skjer når bølgen når den andre siden?"
      assume="Dette er en kvalitativ prosessmodell. Skredkontur og bølgepuls er foreskrevet, ikke beregnet med en validert skredmodell. Langbølgeformelen validerer ikke selve nedslaget. Modellen gjenskaper ikke Tafjord eller Loen og beregner ikke oppskylling."
      conclusion={
        position === 0
          ? "Følg vannforskyvning, utbredelse og refleksjon med trinnknappen. Skredet ligger klart i den tenkte skrenten."
          : stage === "Vannforskyvning"
            ? "Skredmassen flytter vann i kildesonen. Den tegnete pulsen er bare et prinsipp, ikke en beregnet nedslagsbølge."
            : stage === "Bølgeutbredelse"
              ? "Forstyrrelsen brer seg bort fra kildesonen. Bølgeretning er ikke det samme som vannets forflytning."
              : "Pulsen møter fjordsiden, og en reflektert del brer seg tilbake i skissen. Refleksjonen starter ved kontakt, før hele pulsen har vendt. Det gir ikke automatisk større fare overalt."
      }
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas
          ref={canvasRef}
          role="img"
          aria-describedby="m4-beskrivelse"
          aria-label={`Tenkt fjordsnitt: ${stage}. Uregelmessig skred, avrundede fjordsider og en bølge som vender tilbake.`}
          className="h-[340px] w-full"
        />
      </div>
      <div id="m4-beskrivelse">
        <FigureNote>
          Skjematisk, ikke i målestokk. Bølgeutslag og skred er visuelt forstørret. Avspillingen viser
          en rekkefølge, ikke virkelig gangtid. Avslutningen ved land er en visningsforenkling, ikke beregnet oppskylling.
        </FigureNote>
      </div>
      <Transport
        liveTime={false}
        toggleState={false}
        playing={playing}
        onToggle={() => {
          if (progress.current >= FJORD_END) {
            progress.current = 0;
            setPosition(0);
          }
          setPlaying((p) => !p);
        }}
        onReset={reset}
        onStep={() => {
          setPlaying(false);
          const next = nextFjordStep(progress.current);
          advance(next - progress.current);
        }}
        stepLabel="Neste prosesstrinn"
        time={stage}
      />
      <ol className="grid gap-2 sm:grid-cols-3" aria-label="Prosessfaser">
        {[
          { name: "Vannforskyvning", hint: "Skredet flytter vann" },
          { name: "Bølgeutbredelse", hint: "Bort fra kildesonen" },
          { name: "Refleksjon", hint: "Kontakt med fjordsiden og retur" },
        ].map((phase, i) => {
          const active = phase.name === stage;
          return (
            <li
              key={phase.name}
              aria-current={active ? "step" : undefined}
              className="rounded-xl px-3 py-2 text-sm"
              style={{
                backgroundColor: active ? "#143e52" : "#f7f3ea",
                color: active ? "#ffffff" : "#4f5963",
                border: active ? "3px solid #143e52" : "1px solid #d9d0c3",
              }}
            >
              <p className="font-medium">
                {i + 1} · {phase.name}
              </p>
              <p>
                {active
                  ? "▶ Aktiv fase"
                  : i < (stage === "Refleksjon" ? 2 : stage === "Bølgeutbredelse" ? 1 : 0)
                    ? "Vist tidligere"
                    : "Kommer senere"}
              </p>
              <p>{phase.hint}</p>
            </li>
          );
        })}
      </ol>
    </Lab>
  );
}
