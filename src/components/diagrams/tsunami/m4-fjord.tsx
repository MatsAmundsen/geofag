import { useRef, useState } from "react";
import { FigureNote, Lab, Readouts, Transport } from "./lab";
import { clearPaper, fitCanvas, useSimLoop } from "./draw";
import { arrow, label, leader, paintRock, skyTo, smoothPath } from "./paint";
import { FJORD_END, fjordBed, fjordStage, fjordWave, slideOutline } from "./sim/fjord";
import { ink } from "./sim/palette";

export function ModelFjord() {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const progress = useRef(0);
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
  useSimLoop(
    canvasRef,
    playing,
    (frames) => advance(frames / 240),
    () => {
      const fit = canvasRef.current && fitCanvas(canvasRef.current);
      if (!fit) return;
      const { ctx, w, h } = fit;
      const sea = h * 0.42,
        scale = h * 0.65;
      const xOf = (x: number) => 12 + x * (w - 24);
      const yOf = (y: number) => sea + y * scale;
      const t = progress.current;
      clearPaper(ctx, w, h);
      skyTo(ctx, w, sea);
      const bed = Array.from({ length: 151 }, (_, i) => ({
        x: xOf(i / 150),
        y: yOf(fjordBed(i / 150)),
      }));
      ctx.fillStyle = ink.water;
      ctx.fillRect(12, sea, w - 24, h - sea - 10);
      paintRock(ctx, bed, h - 10);
      // Clip the prescribed surface to water: it never paints across a dry fjordside.
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(w - 12, 0);
      smoothPath(ctx, bed.slice().reverse(), false);
      ctx.closePath();
      ctx.clip();
      ctx.beginPath();
      const surf = Array.from({ length: 151 }, (_, i) => ({
        x: xOf(i / 150),
        y: yOf(-fjordWave(i / 150, t)),
      }));
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
      label(ctx, "Skred", 16, 30);
      leader(ctx, 42, 36, slide[1].x, slide[1].y - 4);
      label(ctx, fjordStage(t), w / 2, 60, { align: "center" });
      if (t < 0.8) {
        label(ctx, "Kildesone", w / 2, sea + 64, { align: "center" });
        leader(ctx, w / 2 - 30, sea + 52, xOf(0.23), sea + 14);
      } else if (t < 1.8) {
        arrow(ctx, xOf(0.38), sea - 40, xOf(0.66), ink.sea);
      } else {
        arrow(ctx, xOf(0.8), sea - 40, xOf(0.57), ink.sea);
      }
      label(ctx, "Tenkt fjordsnitt", w / 2, h - 28, { align: "center" });
    },
  );
  const stage = fjordStage(position);
  return (
    <Lab
      id="m4"
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
              : "Bølgen vender tilbake fra fjordsiden i skissen. Refleksjon gir ikke automatisk større fare overalt."
      }
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Tenkt fjordsnitt: ${stage}. Uregelmessig skred, avrundede fjordsider og en bølge som vender tilbake.`}
          className="h-[340px] w-full"
        />
      </div>
      <FigureNote>
        Skjematisk, ikke i målestokk. Bølgeutslag og skred er visuelt forstørret. Avspillingen viser
        en rekkefølge, ikke virkelig gangtid.
      </FigureNote>
      <Transport
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
          advance(0.75);
        }}
        stepLabel="Neste prosesstrinn"
        time={stage}
      />
      <Readouts
        items={[
          { k: "1 · Kilde", v: "Vannforskyvning", hint: "skredet flytter vann" },
          { k: "2 · Spredning", v: "Utbredelse", hint: "bort fra kildesonen" },
          { k: "3 · Fjordside", v: "Refleksjon", hint: "bølgen vender tilbake" },
        ]}
      />
    </Lab>
  );
}
