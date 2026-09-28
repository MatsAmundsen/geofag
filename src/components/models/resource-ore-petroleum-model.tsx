import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelPanel, ModelTab, ModelNote } from "./model-chrome";

export function OreFormationModel() {
  type OreMode = "hydrothermal" | "magmatic" | "sedimentary";
  const [mode, setMode] = useState<OreMode>("hydrothermal");

  // Hydrotermal-kontroller
  const [fluidTempC, setFluidTempC] = useState<number>(380); // 150 til 450 °C
  const [fracturePermeability, setFracturePermeability] = useState<number>(75); // %
  const [depthKm, setDepthKm] = useState<number>(2.5); // 1 til 5 km

  // Magmatisk-kontroller
  const [magmaComposition, setMagmaComposition] = useState<"ultramafic" | "mafic" | "felsic">("mafic");
  const [coolingRate, setCoolingRate] = useState<number>(50); // %

  // Beregninger for hydrotermal utfelling
  const precipitationZone = fluidTempC > 320 ? "Dyp kobber-jern-sone (Kalkopyritt + Pyritt)"
    : fluidTempC > 200 ? "Intermediær sink-bly-sone (Sfaleritt + Galenitt)"
    : "Grunn lavtemperatur-sone (Gull, sølv, kvartsårer, barytt)";

  const precipitationEfficiency = Math.round((fluidTempC / 450) * (fracturePermeability / 100) * 100);

  return (
    <ModelFrame
      kicker="Interaktiv malmgeologisk simulator"
      title="Malmdannende prosesser: Fra havbunnens varme kilder til dype magmakamre"
      lead="Malm er en bergart med metallinnhold høyt nok til at utvinning kan gi økonomisk overskudd. Malmdannelse krever tre faktorer: en metallkilde, et transportmedium (magma eller vandige oppløsninger) og en kjemisk eller fysisk utfellingsfelle."
      toolbar={
        <>
          <ModelTab active={mode === "hydrothermal"} onClick={() => setMode("hydrothermal")}>
            Hydrotermal malm (VMS / Black Smoker)
          </ModelTab>
          <ModelTab active={mode === "magmatic"} onClick={() => setMode("magmatic")}>
            Magmatisk fraksjonering (Kumulater)
          </ModelTab>
          <ModelTab active={mode === "sedimentary"} onClick={() => setMode("sedimentary")}>
            Sedimentær & Residual anriking (BIF)
          </ModelTab>
        </>
      }
    >
      {mode === "hydrothermal" && (
        <div className="space-y-6">
          <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Hydrotermal sirkulasjon og metallsulfider
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Langs midthavsrygger og vulkanske øybuer trenger sjøvann kilometervis ned i den oppsprukne havbunnsskorpen.
                Nær magmakammeret varmes vannet til over 350–400 °C under enormt trykk. Det superkritiske vannet blir ekstremt
                surt og løser ut metaller (Cu, Zn, Fe, Pb, Au) fra basaltsteinen.
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div>
                  <div className="flex justify-between font-medium">
                    <span>Hydrotermal væsketemperatur:</span>
                    <span className="font-mono text-amber-400 font-bold">{fluidTempC} °C</span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={420}
                    step={10}
                    value={fluidTempC}
                    onChange={(e) => setFluidTempC(Number(e.target.value))}
                    className="w-full accent-amber-500"
                    aria-label="Væsketemperatur"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>150 °C (Epitermalt)</span>
                    <span>300 °C (Hvit røyker)</span>
                    <span>420 °C (Sort røyker)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium">
                    <span>Sprekketetthet & permeabilitet:</span>
                    <span className="font-mono text-teal-400 font-bold">{fracturePermeability} %</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    step={5}
                    value={fracturePermeability}
                    onChange={(e) => setFracturePermeability(Number(e.target.value))}
                    className="w-full accent-teal-500"
                    aria-label="Sprekketetthet"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium">
                    <span>Infiltrasjonsdybde mot magmakammer:</span>
                    <span className="font-mono text-sky-400 font-bold">{depthKm} km</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.5}
                    value={depthKm}
                    onChange={(e) => setDepthKm(Number(e.target.value))}
                    className="w-full accent-sky-500"
                    aria-label="Infiltrasjonsdybde"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-3 space-y-1.5 text-xs">
                <span className="font-semibold text-foreground">Aktiv utfellingssone:</span>
                <p className="font-mono text-amber-300 font-medium">{precipitationZone}</p>
                <p className="text-[11px] text-muted-foreground pt-1">
                  Typisk norsk forekomst: <strong>Løkken (Trøndelag)</strong>, <strong>Røros</strong> og <strong>Sulitjelma</strong>
                  – opprinnelige VMS-forekomster fra Iapetushavets bunn, skjøvet inn over Norge under den kaledonske kollisjonen.
                </p>
              </div>
            </div>

            {/* Hydrotermal SVG */}
            <div className="flex flex-col justify-center rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-7">
              <svg viewBox="0 0 520 320" className="w-full h-auto select-none" aria-label="Black smoker snitt">
                {/* Havvann */}
                <rect x="20" y="20" width="480" height="90" fill="#0c1e2c" rx="4" />
                <text x="35" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">HAVBASSENG (Iskaldt bunnvann ~2 °C)</text>

                {/* Havbunnsskorpe */}
                <rect x="20" y="110" width="480" height="150" fill="#1e242b" stroke="#334155" />
                <text x="35" y="130" fill="#94a3b8" fontSize="11" fontWeight="bold">OCEANISK SKORPE (Basalt & gabbro)</text>

                {/* Magmakammer på dypet */}
                <ellipse cx="260" cy="300" rx="190" ry="45" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                <text x="260" y="295" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">
                  MAGMAKAMMER (Varmereservoar ~1100 °C)
                </text>

                {/* Nedtrengende kaldt sjøvann */}
                <path d="M 90 100 L 110 240 L 170 260" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeDasharray="4 2" />
                <text x="65" y="170" fill="#38bdf8" fontSize="10" fontWeight="bold">Kaldt sjøvann siver ned</text>

                <path d="M 430 100 L 410 240 L 350 260" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeDasharray="4 2" />

                {/* Oppadstigende skoldende metalløsning */}
                <path d="M 230 260 L 250 140 L 260 110" stroke="#f59e0b" strokeWidth="4" fill="none" />
                <path d="M 290 260 L 270 140 L 260 110" stroke="#ef4444" strokeWidth="3" fill="none" />
                <text x="280" y="190" fill="#fbbf24" fontSize="10" fontWeight="bold">
                  Metallspekket væske ({fluidTempC} °C)
                </text>

                {/* Black Smoker skorstein */}
                <polygon points="252,110 268,110 265,85 255,85" fill="#475569" stroke="#94a3b8" />
                {/* Askesky / sulfatsky */}
                <ellipse cx="260" cy="65" rx="35" ry="18" fill="#18181b" opacity="0.85" />
                <ellipse cx="260" cy="45" rx="55" ry="22" fill="#27272a" opacity="0.65" />
                <text x="260" y="68" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                  «Black Smoker»
                </text>

                {/* Massive sulfider utfelling */}
                <ellipse cx="260" cy="112" rx="35" ry="10" fill="#d97706" />
                <text x="260" y="128" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">
                  Massiv sulfidmalm (Cu, Zn, FeS₂)
                </text>
              </svg>
            </div>
          </ModelPanel>
        </div>
      )}

      {mode === "magmatic" && (
        <div className="space-y-6">
          <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Magmatisk differensiering og krystallisasjon
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Når store magmakamre i dypet kjøles langsomt ned, krystalliserer mineraler med høyt smeltepunkt først
                (ifølge Bowens reaksjonsserie). Tunge mineraler som kromitt (FeCr₂O₄), magnetitt (Fe₃O₄) og ublandbare
                tunge sulfiddråper synker ned mot kammerets bunn ved hjelp av tyngdekraften og danner konsentrerte
                kumulatlag.
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div>
                  <span className="font-medium">Magmatype:</span>
                  <div className="mt-1 grid grid-cols-3 gap-1">
                    <Button
                      size="sm"
                      variant={magmaComposition === "ultramafic" ? "default" : "secondary"}
                      className="text-xs h-7 px-1"
                      onClick={() => setMagmaComposition("ultramafic")}
                    >
                      Ultramafisk
                    </Button>
                    <Button
                      size="sm"
                      variant={magmaComposition === "mafic" ? "default" : "secondary"}
                      className="text-xs h-7 px-1"
                      onClick={() => setMagmaComposition("mafic")}
                    >
                      Mafisk (Basalt)
                    </Button>
                    <Button
                      size="sm"
                      variant={magmaComposition === "felsic" ? "default" : "secondary"}
                      className="text-xs h-7 px-1"
                      onClick={() => setMagmaComposition("felsic")}
                    >
                      Felsisk (Granitt)
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium">
                    <span>Avkjølingsgrad / Differensiering:</span>
                    <span className="font-mono text-amber-400 font-bold">{coolingRate} %</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={coolingRate}
                    onChange={(e) => setCoolingRate(Number(e.target.value))}
                    className="w-full accent-amber-500"
                    aria-label="Avkjølingsgrad"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-3 text-xs space-y-1">
                <span className="font-semibold text-foreground">Typiske malmressurser:</span>
                {magmaComposition === "ultramafic" && (
                  <p className="text-emerald-400">Kromitt (Cr), platina (PGE) og peridotitt/dunitt (olivin på Åheim).</p>
                )}
                {magmaComposition === "mafic" && (
                  <p className="text-amber-400">Titanomagnetitt (Fe-Ti), ilmenitt (Ti i Tellnes i Rogaland) og Ni-Cu sulfider.</p>
                )}
                {magmaComposition === "felsic" && (
                  <p className="text-rose-400">Inkompatible elementer i restsmelter: Pegmatitter med litium, feltspat, kvarts og sjeldne jordarter (REE).</p>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-7">
              <svg viewBox="0 0 520 280" className="w-full h-auto select-none" aria-label="Magmatisk kammer">
                {/* Magmakammeromriss */}
                <ellipse cx="260" cy="140" rx="230" ry="110" fill="#3b1111" stroke="#f87171" strokeWidth="1.5" />
                <text x="260" y="60" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">
                  DIFFENSIERT MAGMAKAMMER
                </text>

                {/* Restsmelte i toppen */}
                <path d="M 60 110 Q 260 80 460 110 Q 420 70 260 50 Q 100 70 60 110 Z" fill="#7f1d1d" opacity="0.6" />
                <text x="260" y="95" textAnchor="middle" fill="#fecaca" fontSize="10">
                  Lett, silikarik restsmelte (felsisk topp)
                </text>

                {/* Synkende krystaller */}
                <circle cx="160" cy="130" r="3" fill="#fbbf24" />
                <circle cx="210" cy="145" r="3" fill="#fbbf24" />
                <circle cx="290" cy="135" r="3" fill="#fbbf24" />
                <circle cx="350" cy="145" r="3" fill="#fbbf24" />
                <text x="260" y="160" textAnchor="middle" fill="#fef08a" fontSize="10">
                  Tunge krystaller synker (gravitasjonsdifferensiering)
                </text>

                {/* Bunnlag / Kumulatlag */}
                <path d="M 55 160 Q 260 210 465 160 Q 410 240 260 245 Q 110 240 55 160 Z" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="260" y="215" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                  Kumulatlag: Massiv kromitt-, titan- og magnetittmalm
                </text>
              </svg>
            </div>
          </ModelPanel>
        </div>
      )}

      {mode === "sedimentary" && (
        <div className="space-y-6">
          <ModelPanel className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">
              Sedimentære og residuale malmforekomster: BIF og Placer
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sedimentære prosesser konsentrerer mineraler gjennom kjemisk forvitring, løsning og fysisk sortering.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="rounded-xl border border-sky-500/30 bg-sky-950/15 p-4 text-xs">
                <span className="font-semibold text-sky-300">1. Båndet jernmalm (BIF - Banded Iron Formation)</span>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  I urhavet for 2,5–1,8 milliarder år siden fantes det ikke fritt oksygen. Havet var mettet med toverdig,
                  oppløst jern (Fe²⁺). Da fotosyntetiserende cyanobakterier begynte å frigjøre O₂, oksiderte jernet momentant
                  til treverdig jern (Fe³⁺) og regnet ned på havbunnen som vekslende striper av magnetitt/hematitt og rød jaspis (kvarts).
                </p>
                <p className="mt-2 text-primary font-medium">Norsk eksempel: Sydvaranger gruve i Kirkenes.</p>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-4 text-xs">
                <span className="font-semibold text-amber-300">2. Placer-forekomster (Tungmineralanriking)</span>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Når gull, platina, kassiteritt (tinn) eller rutil eroderes ut av fast fjell, føres kornene med elver.
                  Fordi disse mineralene er ekstremt tette og kjemisk motstandsdyktige mot forvitring, felles de ut i
                  elvebunner, jettegryter og innersvinger der vannhastigheten avtar.
                </p>
                <p className="mt-2 text-amber-300 font-medium">Norsk eksempel: Gullvasking i elvene i Karasjok og Kautokeino.</p>
              </div>
            </div>
          </ModelPanel>
        </div>
      )}
    </ModelFrame>
  );
}

export function PetroleumTrapModel() {
  type TrapType = "anticline" | "fault" | "salt_dome" | "stratigraphic";
  const [trapType, setTrapType] = useState<TrapType>("anticline");

  const [gasFraction, setGasFraction] = useState<number>(30); // % gass
  const [oilColumnMeters, setOilColumnMeters] = useState<number>(120); // 20 til 250 m
  const [sealIntegrity, setSealIntegrity] = useState<number>(90); // % takbergartens tetningsevne

  const isLeaking = sealIntegrity < 40;

  return (
    <ModelFrame
      kicker="Interaktiv petroleumsmodell"
      title="Petroleumsfeller, reservoarmekanikk og tetningskapasitet"
      lead="Et petroleumssystem krever fem komponenter: kildebergart, modning/migrasjon, reservoarbergart, felle og impermeabel takbergart. Petroleumen migrerer oppover på grunn av oppdrift inntil den fanges i en felle og lagdeles etter tetthet."
      toolbar={
        <>
          <ModelTab active={trapType === "anticline"} onClick={() => setTrapType("anticline")}>
            Antiklinalfelle
          </ModelTab>
          <ModelTab active={trapType === "fault"} onClick={() => setTrapType("fault")}>
            Forkastningsfelle
          </ModelTab>
          <ModelTab active={trapType === "salt_dome"} onClick={() => setTrapType("salt_dome")}>
            Saltdiapir / Saltkuppel
          </ModelTab>
          <ModelTab active={trapType === "stratigraphic"} onClick={() => setTrapType("stratigraphic")}>
            Stratigrafisk utkniping
          </ModelTab>
        </>
      }
    >
      <div className="space-y-6">
        <ModelPanel className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Kontroller */}
          <div className="space-y-4 lg:col-span-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
              Fellegeometri og fluiddynamikk
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-medium">
                  <span>Hydrokarbonkolonne (Reservoarmengde):</span>
                  <span className="font-mono text-amber-400 font-bold">{oilColumnMeters} meter</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={220}
                  step={10}
                  value={oilColumnMeters}
                  onChange={(e) => setOilColumnMeters(Number(e.target.value))}
                  className="w-full accent-amber-500"
                  aria-label="Oljekolonne"
                />
              </div>

              <div>
                <div className="flex justify-between font-medium">
                  <span>Gass-til-olje-forhold (GOR):</span>
                  <span className="font-mono text-rose-400 font-bold">{gasFraction} % gasskappe</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={5}
                  value={gasFraction}
                  onChange={(e) => setGasFraction(Number(e.target.value))}
                  className="w-full accent-rose-500"
                  aria-label="Gassandel"
                />
              </div>

              <div>
                <div className="flex justify-between font-medium">
                  <span>Takbergartens integritet (Kapillært trykk):</span>
                  <span className={`font-mono font-bold ${isLeaking ? "text-rose-400" : "text-emerald-400"}`}>
                    {sealIntegrity} % {isLeaking ? "(LEKKASJE!)" : "(Tett segl)"}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={sealIntegrity}
                  onChange={(e) => setSealIntegrity(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                  aria-label="Takbergartens integritet"
                />
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5 text-xs">
              <span className="font-semibold text-foreground">Fellebeskrivelse:</span>
              {trapType === "anticline" && (
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Antiklinal:</strong> Bergartslagene er brettet i en konveks hvelving. Petroleumen stiger mot toppen
                  av buen og sperres inne av den konkave takbergarten over. Eksempel: Ekofiskfeltet i Nordsjøen.
                </p>
              )}
              {trapType === "fault" && (
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Forkastningsfelle:</strong> Tektonisk forkastningsbevegelse har forskjøvet en porøs sandstein
                  slik at den butter mot en ugjennomtrengelig leirskifer på motsatt side av forkastningsplanet. Eksempel: Statfjord og Gullfaks.
                </p>
              )}
              {trapType === "salt_dome" && (
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Saltdiapir:</strong> Plastisk bergsalt med lav tetthet flyter oppover og bøyer omliggende
                  sedimentlag bratt oppover. Saltet er fullstendig ugjennomtrengelig og forsegler reservoaret.
                </p>
              )}
              {trapType === "stratigraphic" && (
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Stratigrafisk pinch-out:</strong> En sandkropp (gammelt elvedelta eller undersjøisk vifte)
                  tynnes gradvis ut og forsvinner inn i omgivende tette leirskifere uten behov for forkastninger.
                </p>
              )}
            </div>
          </div>

          {/* SVG Felleprofil */}
          <div className="flex flex-col justify-center rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-7">
            <svg viewBox="0 0 540 320" className="w-full h-auto select-none" aria-label="Petroleumsfelle tverrsnitt">
              {/* Bakgrunnsgeologi */}
              {/* Overdekning */}
              <rect x="20" y="20" width="500" height="60" fill="#1e293b" />
              <text x="35" y="45" fill="#94a3b8" fontSize="10">Overdekning (Ungere sedimenter / kritt og tertiær)</text>

              {/* Takbergart (Cap rock - leirskifer) */}
              {trapType === "anticline" && (
                <path
                  d="M 20 130 Q 270 50 520 130 L 520 155 Q 270 85 20 155 Z"
                  fill="#334155"
                  stroke="#475569"
                />
              )}
              {trapType === "fault" && (
                <g>
                  <polygon points="20,110 240,110 280,180 20,180" fill="#334155" />
                  <polygon points="280,140 520,140 520,210 280,210" fill="#334155" />
                  <line x1="240" y1="90" x2="300" y2="250" stroke="#f87171" strokeWidth="2" strokeDasharray="3 2" />
                </g>
              )}
              {trapType === "salt_dome" && (
                <g>
                  {/* Saltdiapir */}
                  <path d="M 210 280 C 210 100 230 70 270 70 C 310 70 330 100 330 280 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
                  <text x="270" y="160" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">SALT (Diapir)</text>
                  <path d="M 20 140 C 120 140 180 120 215 100 L 215 125 C 180 145 120 165 20 165 Z" fill="#334155" />
                </g>
              )}
              {trapType === "stratigraphic" && (
                <path d="M 20 110 L 520 110 L 520 140 L 20 140 Z" fill="#334155" />
              )}

              <text x="35" y="100" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                TAKBERGART: Tett leirskifer (Mudderstein)
              </text>

              {/* Reservoarbergart med hydrokarbonlagdeling */}
              {/* Gasslag øverst */}
              <ellipse cx="270" cy={110 + (200 - oilColumnMeters) * 0.15} rx="80" ry={gasFraction * 0.35} fill="#ef4444" opacity="0.85" />
              <text x="270" y={112 + (200 - oilColumnMeters) * 0.15} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                GASSKAPPE (Tetthet ~0.2 g/cm³)
              </text>

              {/* Oljelag i midten */}
              <ellipse cx="270" cy={135 + (200 - oilColumnMeters) * 0.15} rx="120" ry="22" fill="#d97706" opacity="0.9" />
              <text x="270" y={139 + (200 - oilColumnMeters) * 0.15} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                OLJEKOLONNE (Tetthet ~0.8 g/cm³)
              </text>

              {/* Vannmettet reservoar nederst */}
              <ellipse cx="270" cy={175 + (200 - oilColumnMeters) * 0.15} rx="160" ry="24" fill="#0284c7" opacity="0.4" />
              <text x="270" y={180 + (200 - oilColumnMeters) * 0.15} textAnchor="middle" fill="#7dd3fc" fontSize="10">
                Formasjonsvann (Saltvann, tetthet ~1.1 g/cm³)
              </text>

              {/* Grenseflater */}
              <text x="440" y={125 + (200 - oilColumnMeters) * 0.15} fill="#fca5a5" fontSize="9">
                ← GOC (Gass-olje-kontakt)
              </text>
              <text x="440" y={150 + (200 - oilColumnMeters) * 0.15} fill="#fde68a" fontSize="9">
                ← OWC (Olje-vann-kontakt)
              </text>

              {/* Lekkasjepiler hvis takbergarten er brutt */}
              {isLeaking && (
                <g>
                  <path d="M 270 95 L 270 30" stroke="#f43f5e" strokeWidth="3" strokeDasharray="3 3" />
                  <polygon points="266,30 274,30 270,20" fill="#f43f5e" />
                  <text x="280" y="45" fill="#f43f5e" fontSize="11" fontWeight="bold">
                    LEKKASJE TIL OVERFLATEN!
                  </text>
                </g>
              )}

              {/* Kildebergart i bunnen */}
              <rect x="20" y="270" width="500" height="35" fill="#090d16" stroke="#1e293b" />
              <text x="35" y="292" fill="#94a3b8" fontSize="10" fontWeight="bold">
                KILDEBERGART: Organisk rik svart skifer (Draupneformasjonen, 80–120 °C)
              </text>
            </svg>

            <div className="mt-2 text-[11px] text-muted-foreground flex justify-between">
              <span>Oppdrift: Hydrokarboner flyter på formasjonsvannet</span>
              <span>Kritisk overflytpunkt: Spill point</span>
            </div>
          </div>
        </ModelPanel>
      </div>
    </ModelFrame>
  );
}
