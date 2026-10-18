import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

/*
 * Coriolis-laboratoriet. Etter fagsjekken til Fagredaktør Geo (F6, 18.10.2026) viser modellen bare det
 * coriolis.md sier: avbøyningen etter halvkule og breddegrad (null ved ekvator, øker mot polene, uten tall
 * og formel), vinkelen mot isobarene ved bakken (0–20° over havet, 20–40° over land) og en kort fane 3 med
 * vaskemyten og tropiske sykloner (ca. 5°, om lag 500 km). Tekst i SVG er minst 17 enheter (≥ 9 px ved 390).
 */

type Tab = "globe" | "friction" | "myth";
type Hemisphere = "north" | "south";
type Latitude = 0 | 30 | 60 | 90;
type Direction = "north" | "south" | "east" | "west";

const FS = 17;

export function CoriolisModel() {
  const [activeTab, setActiveTab] = useState<Tab>("globe");
  const [hemisphere, setHemisphere] = useState<Hemisphere>("north");
  const [latitude, setLatitude] = useState<Latitude>(60);
  const [direction, setDirection] = useState<Direction>("north");
  const [frictionMode, setFrictionMode] = useState<"free" | "ocean" | "land">("free");
  const [myth, setMyth] = useState<"sink" | "cyclone">("sink");

  const parameter = latitude === 0 ? "null" : hemisphere === "north" ? "positiv" : "negativ";

  return (
    <ModelFrame
      kicker="Interaktiv simulator"
      title="Coriolis-laboratoriet"
      lead="Utforsk hvordan avbøyningen avhenger av halvkule, breddegrad og fartsretning, og hvordan friksjonen ved bakken endrer vinkelen mellom vinden og isobarene."
      toolbar={
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">LK20 Geofag 2</span>
        </div>
      }
    >
      <div>
        <ModelMarkers />

        <div className="mb-5 flex flex-wrap gap-2">
          <ModelTab active={activeTab === "globe"} onClick={() => setActiveTab("globe")}>
            1. Avbøyning etter breddegrad og retning
          </ModelTab>
          <ModelTab active={activeTab === "friction"} onClick={() => setActiveTab("friction")}>
            2. Vinden ved bakken og friksjon
          </ModelTab>
          <ModelTab active={activeTab === "myth"} onClick={() => setActiveTab("myth")}>
            3. Vasken og tropiske sykloner
          </ModelTab>
        </div>

        {/* ─── FANE 1: AVBØYNING ─── */}
        {activeTab === "globe" && (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <ModelPanel className="lg:col-span-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Bane sett ovenfra
                </span>
                <span className="rounded bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
                  Coriolisparameteren: {parameter}
                </span>
              </div>

              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground">Halvkule:</span>
                  <div className="mt-1 flex gap-1">
                    <Button size="sm" variant={hemisphere === "north" ? "default" : "secondary"} onClick={() => setHemisphere("north")} className="w-full text-xs">
                      Nordlig
                    </Button>
                    <Button size="sm" variant={hemisphere === "south" ? "default" : "secondary"} onClick={() => setHemisphere("south")} className="w-full text-xs">
                      Sørlig
                    </Button>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground">Breddegrad:</span>
                  <div className="mt-1 flex gap-1">
                    {([0, 30, 60, 90] as Latitude[]).map((lat) => (
                      <Button key={lat} size="sm" variant={latitude === lat ? "default" : "secondary"} onClick={() => setLatitude(lat)} className="w-full font-mono text-xs">
                        {lat}°
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground">Retning:</span>
                  <div className="mt-1 flex gap-1">
                    {(["north", "south", "east", "west"] as Direction[]).map((d) => (
                      <Button
                        key={d}
                        size="sm"
                        variant={direction === d ? "default" : "secondary"}
                        onClick={() => setDirection(d)}
                        className="w-full text-xs"
                        aria-label={d === "north" ? "Nord" : d === "south" ? "Sør" : d === "east" ? "Øst" : "Vest"}
                      >
                        {d === "north" ? "N" : d === "south" ? "S" : d === "east" ? "Ø" : "V"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-slate-950 p-4">
                <svg viewBox="0 0 540 340" className="mx-auto h-auto w-full max-w-[500px] select-none" role="img" aria-label="Banen sett ovenfra. Stiplet linje er banen uten avbøyning, den blå er banen med avbøyning.">
                  <rect x="10" y="10" width="520" height="320" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  <line x1="270" y1="20" x2="270" y2="320" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="20" y1="170" x2="520" y2="170" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="270" y="40" fill="#cbd5e1" fontSize={FS} fontWeight="800" textAnchor="middle">NORD</text>
                  <text x="270" y="318" fill="#cbd5e1" fontSize={FS} fontWeight="800" textAnchor="middle">SØR</text>
                  <text x="515" y="164" fill="#cbd5e1" fontSize={FS} fontWeight="800" textAnchor="end">ØST</text>
                  <text x="25" y="164" fill="#cbd5e1" fontSize={FS} fontWeight="800">VEST</text>

                  {direction === "north" && <line x1="270" y1="170" x2="270" y2="55" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />}
                  {direction === "south" && <line x1="270" y1="170" x2="270" y2="285" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />}
                  {direction === "east" && <line x1="270" y1="170" x2="465" y2="170" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />}
                  {direction === "west" && <line x1="270" y1="170" x2="75" y2="170" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />}

                  {(() => {
                    // Skjematisk: null ved ekvator og større mot polene (md l. 75), uten tall og uten kurveform.
                    const krum = (latitude / 90) * (hemisphere === "north" ? 1 : -1) * 65;
                    let pathD = "";
                    let endX = 270;
                    let endY = 170;
                    if (direction === "north") {
                      endX = 270 + krum;
                      endY = 55;
                      pathD = `M 270 170 Q ${270 + krum * 0.4} 110, ${endX} ${endY}`;
                    } else if (direction === "south") {
                      endX = 270 - krum;
                      endY = 285;
                      pathD = `M 270 170 Q ${270 - krum * 0.4} 230, ${endX} ${endY}`;
                    } else if (direction === "east") {
                      endX = 465;
                      endY = 170 + krum;
                      pathD = `M 270 170 Q 370 ${170 + krum * 0.4}, ${endX} ${endY}`;
                    } else {
                      endX = 75;
                      endY = 170 - krum;
                      pathD = `M 270 170 Q 170 ${170 - krum * 0.4}, ${endX} ${endY}`;
                    }
                    return (
                      <>
                        <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="3.8" />
                        <circle cx={endX} cy={endY} r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                      </>
                    );
                  })()}

                  <circle cx="270" cy="170" r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
                  <text x="290" y="205" fill="#fef08a" fontSize={FS} fontWeight="800">
                    Start ({latitude}°)
                  </text>
                </svg>
              </div>
            </ModelPanel>

            <div className="space-y-4 lg:col-span-4">
              <ModelNote title="Hva skjer?" tone={latitude === 0 ? "warm" : "teal"}>
                {latitude === 0 ? (
                  <p>
                    <strong>Ved ekvator</strong> er coriolisparameteren null, så der skjer det ingen avbøyning. Banen går rett fram.
                  </p>
                ) : hemisphere === "north" ? (
                  <p>
                    <strong>Nordlige halvkule:</strong> Parameteren er positiv, og banen bøyes til høyre for fartsretningen,
                    uansett om den går mot nord, sør, øst eller vest. Effekten øker mot polene.
                  </p>
                ) : (
                  <p>
                    <strong>Sørlige halvkule:</strong> Parameteren er negativ, og banen bøyes til venstre for fartsretningen.
                    Effekten øker mot polene.
                  </p>
                )}
              </ModelNote>
              <ModelNote title="Hvorfor?" tone="teal">
                <p className="text-xs leading-relaxed">
                  Grunnen er at referansesystemet roterer. Avbøyningen gjelder ikke bare luft som går nord–sør, men alle
                  retninger. Banen er skjematisk.
                </p>
              </ModelNote>
            </div>
          </div>
        )}

        {/* ─── FANE 2: VINDEN VED BAKKEN ─── */}
        {activeTab === "friction" && (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <ModelPanel className="lg:col-span-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vinkel mellom vinden og isobarene</span>
                <span className="rounded bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
                  {frictionMode === "free" ? "Uten friksjon" : frictionMode === "ocean" ? "Over havet: 0–20°" : "Over land: 20–40°"}
                </span>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                <Button size="sm" variant={frictionMode === "free" ? "default" : "secondary"} onClick={() => setFrictionMode("free")} className="text-xs">
                  1. Uten friksjon
                </Button>
                <Button size="sm" variant={frictionMode === "ocean" ? "default" : "secondary"} onClick={() => setFrictionMode("ocean")} className="text-xs">
                  2. Over havet (0–20°)
                </Button>
                <Button size="sm" variant={frictionMode === "land" ? "default" : "secondary"} onClick={() => setFrictionMode("land")} className="text-xs">
                  3. Over land (20–40°)
                </Button>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-slate-950 p-4">
                {(() => {
                  const [fra, til] = frictionMode === "free" ? [0, 0] : frictionMode === "ocean" ? [0, 20] : [20, 40];
                  const v = ((fra + til) / 2) * (Math.PI / 180);
                  const o = { x: 250, y: 165 };
                  const r = 170;
                  const pkt = (a: number) => {
                    const b = (a * Math.PI) / 180;
                    return `${(o.x + r * Math.cos(b)).toFixed(1)} ${(o.y - r * Math.sin(b)).toFixed(1)}`;
                  };
                  const ex = o.x + 200 * Math.cos(v);
                  const ey = o.y - 200 * Math.sin(v);
                  const sx = o.x - 170 * Math.cos(v);
                  const sy = o.y + 170 * Math.sin(v);
                  const farge = frictionMode === "land" ? "#f59e0b" : frictionMode === "ocean" ? "#38bdf8" : "#e2e8f0";
                  return (
                    <svg
                      viewBox="0 0 540 320"
                      className="mx-auto h-auto w-full max-w-[500px] select-none"
                      role="img"
                      aria-label="Rette isobarer sett ovenfra med lavere trykk i nord. Uten friksjon går vinden langs isobarene. Nær bakken krysser den isobarene mot lavere trykk, 0–20° over havet og 20–40° over land."
                    >
                      <rect x="10" y="10" width="520" height="300" rx="8" fill={frictionMode === "land" ? "#2b2a1c" : frictionMode === "ocean" ? "#0c2a3d" : "#0f172a"} />
                      <line x1="20" y1="70" x2="520" y2="70" stroke="#ef4444" strokeWidth="2" />
                      <text x="30" y="56" fill="#fca5a5" fontSize={FS} fontWeight="800">Lavere trykk</text>
                      <line x1="20" y1="165" x2="520" y2="165" stroke="#64748b" strokeWidth="1.5" strokeDasharray="6 4" />
                      <text x="510" y="155" fill="#cbd5e1" fontSize={FS} textAnchor="end">isobar</text>
                      <line x1="20" y1="260" x2="520" y2="260" stroke="#38bdf8" strokeWidth="2" />
                      <text x="30" y="290" fill="#93c5fd" fontSize={FS} fontWeight="800">Høyere trykk</text>
                      {til > 0 ? <path d={`M${o.x} ${o.y} L${pkt(fra)} A ${r} ${r} 0 0 0 ${pkt(til)} Z`} fill={farge} opacity={0.25} /> : null}
                      <line x1={sx.toFixed(1)} y1={sy.toFixed(1)} x2={ex.toFixed(1)} y2={ey.toFixed(1)} stroke={farge} strokeWidth="5" markerEnd="url(#mdl-yellow)" />
                      <text x="430" y={frictionMode === "free" ? 200 : 120} fill={farge} fontSize={FS} fontWeight="800" textAnchor="middle">
                        vind
                      </text>
                    </svg>
                  );
                })()}
              </div>
            </ModelPanel>

            <div className="space-y-4 lg:col-span-4">
              <ModelNote title="Hva forteller modellen?" tone="teal">
                {frictionMode === "free" ? (
                  <p>
                    <strong>Uten friksjon</strong> går vinden til slutt langs isobarene. Corioliskraften setter ikke lufta i gang.
                    Trykkforskjellen gjør det, og rotasjonen bare avbøyer.
                  </p>
                ) : (
                  <p>
                    <strong>Nær bakken</strong> går vinden ikke nødvendigvis langs isobarene. Vinkelen er 0–20° over havet og
                    20–40° over land, fordi friksjonen er større over land.
                  </p>
                )}
              </ModelNote>
              <ModelNote title="Merk" tone="warm">
                <p className="text-xs leading-relaxed">Nordlige halvkule, sett ovenfra med nord opp. Vinkelen vises som midten av intervallet.</p>
              </ModelNote>
            </div>
          </div>
        )}

        {/* ─── FANE 3: VASKEN OG TROPISKE SYKLONER (kortet ned, Geo F6) ─── */}
        {activeTab === "myth" && (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <ModelPanel className="lg:col-span-8">
              <div className="mb-5 flex flex-wrap gap-2">
                <Button size="sm" variant={myth === "sink" ? "default" : "secondary"} onClick={() => setMyth("sink")} className="text-xs">
                  Vannet i vasken
                </Button>
                <Button size="sm" variant={myth === "cyclone" ? "default" : "secondary"} onClick={() => setMyth("cyclone")} className="text-xs">
                  Tropiske sykloner
                </Button>
              </div>
              <div className="rounded-xl border border-border bg-slate-950 p-5">
                {myth === "sink" ? (
                  <>
                    <h3 className="text-lg font-bold text-white">Vannet i vasken</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      Mange sier at vannet i vasken virvler motsatt vei i Australia, på grunn av corioliseffekten. Det stemmer
                      ikke. Vannet i vasken styres ikke av corioliseffekten. Jordrotasjonen merkes i hverdagen nesten ikke,
                      unntatt i havstrømmer og vind.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-white">Tropiske sykloner</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      Rotasjonen er en forutsetning for at tropiske sykloner kan dannes. Ved ekvator er det ingen avbøyning, så
                      rotasjonen kommer ikke i gang der. Derfor dannes tropiske sykloner sjelden nærmere ekvator enn ca. 5°, om
                      lag 500 km.
                    </p>
                  </>
                )}
              </div>
            </ModelPanel>
            <div className="space-y-4 lg:col-span-4">
              <ModelNote title="Kilder" tone="teal">
                <p className="text-xs leading-relaxed">
                  {myth === "sink" ? "Store norske leksikon (u.å.-c)." : "Store norske leksikon (u.å.-a; u.å.-b) og NOAA AOML (u.å.)."}
                </p>
              </ModelNote>
            </div>
          </div>
        )}
      </div>
    </ModelFrame>
  );
}
