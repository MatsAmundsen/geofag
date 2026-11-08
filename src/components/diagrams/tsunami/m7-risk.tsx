import { useMemo, useRef, useState } from "react";
import { Choice, FigureNote, Lab, Readouts } from "./lab";
import { clearPaper, fitCanvas, useSimLoop } from "./draw";
import { label, leader, paintRock, skyTo, textWidth } from "./paint";
import { townHeight, riskStatus, townScenario, townGlyphLayout, townScreenX, townView, TOWN_N } from "./sim/fjord";
import { ink } from "./sim/palette";

type Scene = "lav" | "hoy";
type Act = "ingen" | "flytt" | "stans" | "overvak";
export const TOWN_SITES = [
  { name: "Hus", x: 0.46 },
  { name: "Skole", x: 0.55 },
  { name: "Nytt bygg", x: 0.49 },
] as const;
export function ModelRisk() {
  const [scene, setScene] = useState<Scene>("hoy"),
    [act, setAct] = useState<Act>("ingen");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Independent, chosen water levels: never infer run-up from an offshore wave amplitude.
  const level = scene === "lav" ? 0.16 : 0.27;
  const scenario = useMemo(() => townScenario(level), [level]);
  const sites = (after: boolean) =>
    TOWN_SITES.map((b) => ({
      ...b,
      x: after && act === "flytt" && b.name === "Skole" ? 0.73 : b.x,
      included: !(after && act === "stans" && b.name === "Nytt bygg"),
    })).map((b) => ({ ...b, wet: Boolean(scenario.wet[Math.round(b.x * (TOWN_N - 1))]) }));
  const count = (after: boolean) => sites(after).filter((b) => b.included && b.wet).length;
  useSimLoop(
    canvasRef,
    false,
    () => false,
    () => {
      const fit = canvasRef.current && fitCanvas(canvasRef.current);
      if (!fit) return;
      const { ctx, w, h } = fit;
      clearPaper(ctx, w, h);
      // Always stack before and after: full-width labels stay 14 CSS px even on a narrow phone.
      for (let panel = 0; panel < 2; panel++) {
        const top = (panel * h) / 2,
          ph = h / 2 - 14,
          xOf = (x: number) => townScreenX(x, w);
        const yOf = (z: number) => top + ph * 0.7 - z * ph;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, top, w, ph);
        ctx.clip();
        skyTo(ctx, w, top + ph);
        const bed = scenario.heights.map((z, i) => ({ x: xOf(i / (TOWN_N - 1)), y: yOf(z) }));
        paintRock(ctx, bed, top + ph);
        // Fill only the sea-connected sublevel component, with the exact terrain as its base.
        let start = -1;
        const fill = (end: number) => {
          if (start < 0) return;
          ctx.beginPath();
          ctx.moveTo(xOf(start / (TOWN_N - 1)), yOf(level));
          ctx.lineTo(xOf(end / (TOWN_N - 1)), yOf(level));
          for (let i = end; i >= start; i--) ctx.lineTo(bed[i].x, bed[i].y);
          ctx.closePath();
          ctx.fillStyle = ink.water;
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(xOf(start / (TOWN_N - 1)), yOf(level));
          ctx.lineTo(xOf(end / (TOWN_N - 1)), yOf(level));
          ctx.strokeStyle = ink.sea;
          ctx.lineWidth = 1.6;
          ctx.stroke();
          start = -1;
        };
        for (let i = 0; i < TOWN_N; i++) {
          if (scenario.wet[i] && start < 0) start = i;
          if (!scenario.wet[i] && start >= 0) fill(i - 1);
        }
        fill(TOWN_N - 1);
        label(ctx, panel === 0 ? "Før tiltak" : "Etter tiltak · samme vannivå", 14, top + 20, {
          weight: "600",
        });
        const view = townView(w), seaX = view.from + 0.08 * view.span;
        label(ctx, "Sjø", xOf(seaX), (yOf(level) + yOf(townHeight(seaX))) / 2 + 4);
        const included = sites(panel === 1).filter((b) => b.included);
        const widths = Object.fromEntries(included.map((b) => [b.name, textWidth(ctx, b.name)]));
        const glyphs = townGlyphLayout(w, ph, level, included, widths);
        // The whole profile is zoomed on small screens. Icons stand on their true sites,
        // using exactly the same mapping as terrain and water, never display proxies.
        for (const b of glyphs) {
          const y = top + b.symbolY;
          ctx.beginPath();
          ctx.moveTo(b.symbolX - b.half, y);
          ctx.lineTo(b.symbolX - b.half, y - b.height * 0.65);
          ctx.lineTo(b.symbolX, y - b.height);
          ctx.lineTo(b.symbolX + b.half, y - b.height * 0.65);
          ctx.lineTo(b.symbolX + b.half, y);
          ctx.closePath();
          ctx.fillStyle = ink.panel;
          ctx.fill();
          ctx.strokeStyle = ink.text;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          // A small door reinforces the house silhouette at the minimum 14×18 px size.
          ctx.beginPath();
          ctx.moveTo(b.symbolX - 1.5, y);
          ctx.lineTo(b.symbolX - 1.5, y - 5);
          ctx.lineTo(b.symbolX + 1.5, y - 5);
          ctx.lineTo(b.symbolX + 1.5, y);
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
        for (const b of glyphs) {
          const box = b.box;
          // A quiet solid text field also masks the thin water/terrain strokes behind glyph halos.
          ctx.fillStyle = ink.panel;
          ctx.fillRect(box.x, top + box.y, box.width, box.height);
          label(ctx, b.name, b.tx, top + b.baseline, { align: b.align });
          leader(ctx, b.x, top + b.y + 2, b.x, top + box.y - 3);
        }
        ctx.restore();
      }
    },
  );
  const explanation: Record<Act, string> = {
    ingen: "Ingen tiltak. Før- og etterbildet har samme terreng, vannivå og bygg.",
    flytt:
      "Skolen er flyttet opp i terrenget. Det endrer eksponeringen, ikke bølgen eller kilden. Andre bygg blir stående.",
    stans:
      "Det nye bygget er tatt ut av etterbildet. Det begrenser framtidig eksponering, men beskytter ikke bygg som allerede står der.",
    overvak:
      "Overvåking kan gi kunnskap og støtte beredskap. Kilden flyttes ikke, og vannivået og eksponeringen er uendret i skissen. Ingen varslingstid beregnes.",
  };
  return (
    <Lab
      id="m7"
      status={riskStatus(scene, act, count(false), count(true))}
      index="M7"
      title="Fare, eksponering og sårbarhet"
      question="Hvilket ledd endrer tiltaket når det samme scenariet sammenlignes før og etter?"
      assume="Terreng, bygg og to vannivåer er oppdiktet. Vannet fylles statisk bare fra sjøen gjennom sammenhengende lave områder. Dette er ikke bølgedynamikk eller en beregning av oppskylling. Ingen sannsynlighet, sårbarhetsgrad eller risikoprosent beregnes."
      conclusion={explanation[act]}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <canvas
          ref={canvasRef}
          role="img"
          aria-describedby="m7-beskrivelse m7-avgrensning"
          aria-label={`To tenkte terrengsnitt før og etter tiltak. ${explanation[act]} ${count(false)} bygg berørt før og ${count(true)} etter i det valgte statiske scenariet.`}
          className="h-[470px] w-full"
        />
      </div>
      <div id="m7-beskrivelse">
        <FigureNote>
          Tenkt terreng, skjematisk og ikke i målestokk. Terrenghøyder, bygg og vannflate har ulike
          visuelle skalaer. Ingen steder er avbildet. Byggene har direkte etiketter med korte
          ledelinjer. På smale skjermer zoomes terrengutsnittet rundt byggene. Alle bygg står på sine uendrede steder i profilen; etikettene står på land med linjer til byggestedene.
        </FigureNote>
      </div>
      <p id="m7-avgrensning" className="text-sm text-ink">
        Vannflaten er <strong>ikke en faresone</strong>. Figuren viser{" "}
        <strong>ikke en godkjent evakueringsrute</strong>. Bruk offisielt kartgrunnlag i
        elevundersøkelsen.
      </p>
      <Choice
        label="Tenkt vannivå"
        value={scene}
        options={[
          { id: "lav", label: "Lavere nivå" },
          { id: "hoy", label: "Høyere nivå" },
        ]}
        onChange={setScene}
      />
      <Choice
        label="Tiltak i etterbildet"
        value={act}
        options={[
          { id: "ingen", label: "Ingen" },
          { id: "flytt", label: "Flytt skolen" },
          { id: "stans", label: "Stans nytt bygg" },
          { id: "overvak", label: "Overvåking" },
        ]}
        onChange={setAct}
      />
      <button
        type="button"
        onClick={() => {
          setScene("hoy");
          setAct("ingen");
        }}
        className="min-h-11 self-start rounded-full border border-line bg-card px-4 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Nullstill sammenligning
      </button>
      <Readouts
        items={[
          { k: "Berørte bygg før", v: String(count(false)), hint: "kun i tenkt vannflate" },
          { k: "Berørte bygg etter", v: String(count(true)), hint: "samme scenario" },
          { k: "Bølge og kilde", v: "Uendret", hint: "tiltakene her flytter ikke kilden" },
        ]}
      />
      <p className="text-sm text-muted">
        Stillestående sammenligning uten animasjon. Bytt tiltak med tastaturet eller velg «Ingen»
        for å nullstille sammenligningen.
      </p>
    </Lab>
  );
}
