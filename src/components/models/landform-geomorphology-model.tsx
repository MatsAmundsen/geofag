import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelPanel, ModelTab } from "./model-chrome";

/** Vest–øst-profil etter istidene: fjord (U-dal under havet) og U-dal over havet. */
const U_PROFILE =
  "M 20 120 L 40 120 L 50 45 C 56 95 58 134 64 142 Q 68 146 74 146 L 84 146 Q 90 146 92 140 C 96 124 98 84 100 45 L 108 52 C 111 80 113 104 116 112 Q 119 116 124 116 L 130 116 Q 134 116 136 108 C 138 90 139 70 141 50 L 200 80 L 240 95 L 240 155 L 20 155 Z";

type LandformTab = "glacier" | "river_meander" | "weathering_climate" | "norway_timeline";

export function LandformGeomorphologyModel() {
  const [tab, setTab] = useState<LandformTab>("glacier");

  // --- Fane 1: Glasial erosjon & U-dalsgraving ---
  const [iceThickness, setIceThickness] = useState<number>(1200); // 200 til 2500 m
  const [iceSpeed, setIceSpeed] = useState<number>(150); // 10 til 400 m/år
  const [durationKyr, setDurationKyr] = useState<number>(50); // 5 til 150 tusen år

  // Basaltrykk P = rho * g * h (rho_is = 917 kg/m3)
  const basalPressureMPa = ((917 * 9.81 * iceThickness) / 1000000).toFixed(1);
  // Erosjonsrate E ~ k * v * P (typisk 0.2 til 3 mm/år)
  const erosionRateMmYr = (0.2 + (iceSpeed / 400) * 1.8 + (iceThickness / 2500) * 1.5).toFixed(1);
  // Total utgravd dalbunn (meter)
  const totalErosionMeters = Math.round(parseFloat(erosionRateMmYr) * durationKyr);
  const fjordDepth = Math.max(0, totalErosionMeters - 300);

  // --- Fane 2: Fluvial meander & Hjulstrøm ---
  const [discharge, setDischarge] = useState<number>(250); // 20 til 1500 m3/s
  const [gradient, setGradient] = useState<number>(2.5); // 0.2 til 15 promille
  const [meanderEvolution, setMeanderEvolution] = useState<number>(65); // 0 til 100 % loopiness

  // Hastighet v ~ (Q * S)^0.3
  const meanVelocity = (Math.pow(discharge * (gradient / 1000), 0.35) * 1.8).toFixed(2);
  const outerVelocity = (parseFloat(meanVelocity) * 1.45).toFixed(2);
  const innerVelocity = (parseFloat(meanVelocity) * 0.55).toFixed(2);

  // Hjulstrøms respons
  const evalSedimentTransport = (v: number) => {
    const vCms = v * 100;
    if (vCms > 150) return { action: "Voldsom erosjon av grus, sand og silt", color: "text-rose-400" };
    if (vCms > 40) return { action: "Eroderer sand og frakter grus som bunnlast", color: "text-amber-400" };
    if (vCms > 15) return { action: "Transport i suspensjon (avsetter grus, eroderer finsand)", color: "text-teal-400" };
    return { action: "Sedimentasjon: Sand og grovsilt faller til bunns", color: "text-emerald-400" };
  };

  const outerResp = evalSedimentTransport(parseFloat(outerVelocity));
  const innerResp = evalSedimentTransport(parseFloat(innerVelocity));

  // --- Fane 3: Forvitringsmotor (Peltiers diagram) ---
  const [meanTemp, setMeanTemp] = useState<number>(4); // -15 til +28 °C
  const [annualPrecip, setAnnualPrecip] = useState<number>(1400); // 100 til 3000 mm

  // Beregning av forvitringsintensitet
  const calcWeatheringRegime = () => {
    // Frostsprengning krever vann og svingninger rundt 0 °C (-6 til +3 °C)
    const frostScore = Math.max(0, 10 - Math.abs(meanTemp - (-1)) * 1.4) * (annualPrecip / 1500);
    // Kjemisk forvitring øker eksponentielt med temperatur og nedbør
    const chemScore = Math.max(0, (meanTemp + 5) / 30) * (annualPrecip / 1000) * 10;

    let frostLabel = "Svak";
    if (frostScore > 8) frostLabel = "Ekstremt sterk (Høyfjell / Periglacial)";
    else if (frostScore > 4) frostLabel = "Moderat til sterk";

    const chemShown = Math.min(10, chemScore);
    let chemLabel = "Ubetydelig (kulde eller tørke begrenser)";
    if (chemShown > 7) chemLabel = "Sterk (Tropisk / Subtropisk)";
    else if (chemShown > 4) chemLabel = "Moderat (Fuktig temperert klima)";
    else if (chemShown > 1.5) chemLabel = "Svak";

    let landscapeType = "Norsk kyst- og fjordklima";
    if (meanTemp < -3) landscapeType = "Arktisk / Alpint permafrostlandskap (blokkmark, ur)";
    else if (meanTemp > 18 && annualPrecip > 1800) landscapeType = "Tropisk regnskog (dyp kjemisk forvitringshud / saprolitt)";
    else if (annualPrecip < 300) landscapeType = "Arid / Ørkenlandskap (saltsprengning og vind)";

    return { frostScore: Math.min(10, frostScore).toFixed(1), chemScore: chemShown.toFixed(1), frostLabel, chemLabel, landscapeType };
  };

  const weatheringInfo = calcWeatheringRegime();

  // --- Fane 4: Norges landskapsevolusjon 4D ---
  type NorwayEpoch = 1 | 2 | 3 | 4 | 5;
  const [epoch, setEpoch] = useState<NorwayEpoch>(4);

  const epochData: Record<
    NorwayEpoch,
    { title: string; age: string; desc: string; processes: string; keyForms: string }
  > = {
    1: {
      title: "1. Kaledonidene og Prekambrium",
      age: "1800 – 400 millioner år siden",
      desc: "Kontinentene Baltika og Laurentia kolliderte og dannet den kaledonske fjellkjeden (høy som Himalaya!). Massive skyvedekker ble skjøvet hundrevis av kilometer over grunnfjellet.",
      processes: "Fjellkjedefolding, høygradig regionalmetamorfose, dannelse av båndgneis og glimmerskifer.",
      keyForms: "Roten av fjellkjeden som utgjør mesteparten av Norges faste fjellgrunn.",
    },
    2: {
      title: "2. Den paleiske flaten formes",
      age: "Mesozoikum og tidlig Tertiær (250 – 55 mill. år siden)",
      desc: "Gjennom titalls millioner år med varmt og fuktig klima ble de gigantiske kaledonske fjellene erodert ned til et bølgende slettelandskap (et peneplan).",
      processes: "Dyp kjemisk forvitring og rolige elvesystemer jevnet ut terrenget.",
      keyForms: "Den paleiske overflaten (Hardangervidda, Finnmarksvidda og viddeplatåene i Rondane).",
    },
    3: {
      title: "3. Tertiær landheving",
      age: "Paleogen og Neogen (55 – 2,6 mill. år siden)",
      desc: "Norskehavet og Atlanterhavet åpnet seg ved havbunnsspredning. Den skandinaviske landblokken ble hevet asymmetrisk — opptil 1500–2000 meter i vest, mens østsiden hellet slakt mot Sverige.",
      processes: "Relativ senkning av erosjonsbasis. Elvene fikk enorm fart og skar dype, trange V-daler inn i den hevede paleiske flaten.",
      keyForms: "Vannskillet ble forskjøvet østover; dype elvegjel og canyons i vest.",
    },
    4: {
      title: "4. Kvartære istider",
      age: "2,6 millioner til 11 700 år siden",
      desc: "Cirka 40–50 istider overpreget landskapet. Massive innlandsiser og dalbreer gravde ut de gamle elvedalene til dype U-daler og overfordypede fjorder.",
      processes: "Glasial skuring, plukking, frostforvitring og bølgeerosjon langs kysten.",
      keyForms: "Fjorder (Sognefjorden, Geiranger), U-daler, alpine tinder (Sunnmøre, Lofoten), Ra-morenen og strandflaten.",
    },
    5: {
      title: "5. Holocen & Postglasial tid",
      age: "De siste 11 700 år til i dag",
      desc: "Innlandsisen smeltet bort. Vekten av den opptil 3 km tykke isen forsvant, og jordskorpen spratt opp igjen (isostatisk landheving, opptil 220 meter i Oslofjord-området).",
      processes: "Tidligere havbunn med leire hevet seg til tørt land. Elver eroderte raviner i leira og lagde små V-daler i de store U-dalene.",
      keyForms: "Marin grense, ravinelandskap på Romerike og i Trøndelag, strandvoller og flom- og skredvifter.",
    },
  };

  return (
    <ModelFrame
      kicker="Interaktiv Landform- og Prosessmotor"
      title="Geomorfologi, erosjonsagenter og Norges landskap"
      lead="Simuler hvordan isbreer former dype U-daler og fjorder, følg vannets meandervandring og sedimentfrakt med Hjulstrøms fysikk, utforsk klimastyrt forvitring i Peltiers modell, og reis gjennom Norges 4D-landskapshistorie."
      toolbar={
        <>
          <ModelTab active={tab === "glacier"} onClick={() => setTab("glacier")}>
            1. Glasial U-dal
          </ModelTab>
          <ModelTab active={tab === "river_meander"} onClick={() => setTab("river_meander")}>
            2. Fluvial meander
          </ModelTab>
          <ModelTab active={tab === "weathering_climate"} onClick={() => setTab("weathering_climate")}>
            3. Forvitringsmotor
          </ModelTab>
          <ModelTab active={tab === "norway_timeline"} onClick={() => setTab("norway_timeline")}>
            4. Norges 4D-historie
          </ModelTab>
        </>
      }
    >
      {/* ========================================================================= */}
      {/* FANE 1: GLASIAL U-DAL & FJORDUTGRAVING                                    */}
      {/* ========================================================================= */}
      {tab === "glacier" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="ice-thick">Istykkelse:</label>
                <span className="font-mono text-primary font-bold">{iceThickness} m</span>
              </div>
              <input
                id="ice-thick"
                type="range"
                min={200}
                max={2500}
                step={50}
                value={iceThickness}
                onChange={(e) => setIceThickness(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <span className="text-[10px] text-muted-foreground">Basaltrykk: ~{basalPressureMPa} MPa</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="ice-speed">Isens fart:</label>
                <span className="font-mono text-primary font-bold">{iceSpeed} m/år</span>
              </div>
              <input
                id="ice-speed"
                type="range"
                min={10}
                max={400}
                step={10}
                value={iceSpeed}
                onChange={(e) => setIceSpeed(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <span className="text-[10px] text-muted-foreground">Erosjonsrate: ~{erosionRateMmYr} mm/år</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="ice-time">Tid under is:</label>
                <span className="font-mono text-primary font-bold">{durationKyr} 000 år</span>
              </div>
              <input
                id="ice-time"
                type="range"
                min={5}
                max={150}
                step={5}
                value={durationKyr}
                onChange={(e) => setDurationKyr(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <span className="text-[10px] text-muted-foreground">Utgraving: ~{totalErosionMeters} meter</span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Tverrsnittsgrafikk for dalforvandling */}
            <ModelPanel className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tverrsnittutvikling: Fra elvens V-dal til breens U-dal
              </p>
              <div className="h-56 w-full rounded-lg border border-border bg-[#0f171e] p-3 overflow-hidden">
                <svg viewBox="0 0 300 200" className="h-full w-full">
                  {(() => {
                    // Fast skala: 0,1 px per meter. Elvedalens bunn lå 300 moh. før istiden (modellantakelse).
                    const vBottom = 120;
                    const seaY = vBottom + 300 * 0.1;
                    const depthFactor = Math.min(1, totalErosionMeters / 525);
                    // U-dalbunnen ligger alltid under V-dalens bunn og blir bredere med mer erosjon.
                    const wallY = Math.min(192, vBottom + 8 + totalErosionMeters * 0.1);
                    const flatWidth = 40 + depthFactor * 100;
                    const xL = 150 - flatWidth / 2;
                    const xR = 150 + flatWidth / 2;
                    return (
                      <g>
                        {/* Fjordvann: fast havnivå, fyller bare det som ligger under havet */}
                        {fjordDepth > 0 && (
                          <rect x="15" y={seaY} width="270" height={200 - seaY} fill="#0284c7" opacity="0.7" />
                        )}
                        {/* Fjellmasse etter istiden: U-dalen ligger utenfor og under den gamle V-dalen */}
                        <path
                          d={`M 0 40 L 20 40 C 30 ${wallY * 0.7 + 12}, ${xL - 25} ${wallY}, ${xL} ${wallY} L ${xR} ${wallY} C ${xR + 25} ${wallY}, 270 ${wallY * 0.7 + 12}, 280 40 L 300 40 L 300 200 L 0 200 Z`}
                          fill="#26221c"
                          stroke="#cbd5e1"
                          strokeWidth="1.6"
                        />
                        {/* Opprinnelig V-dal stiplet */}
                        <path d={`M 20 40 L 150 ${vBottom} L 280 40`} fill="none" stroke="#e0b48a" strokeWidth="1.5" strokeDasharray="4 3" />
                        <text x="150" y="22" fill="#e0b48a" fontSize="8" textAnchor="middle">Stiplet: elvens V-dal før istiden</text>
                        {/* Isens overflate under istiden */}
                        <path d="M 22 46 Q 150 36 278 46" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeDasharray="2 3" />
                        <text x="150" y="34" fill="#7dd3fc" fontSize="7" textAnchor="middle">Isens overflate under istiden</text>
                        <line x1="8" y1={seaY} x2="292" y2={seaY} stroke="#7dd3fc" strokeWidth="1" strokeDasharray="5 3" opacity="0.8" />
                        <text x="292" y={seaY - 3} fill="#7dd3fc" fontSize="7" textAnchor="end">Havnivå</text>
                        <text x="150" y={Math.min(wallY - 5, seaY - 5)} fill="#f8fafc" fontSize="8" fontWeight="bold" textAnchor="middle">
                          {fjordDepth > 0 ? `Fjord: bunnen ${fjordDepth} m under havet` : "U-dalbunn over havet"}
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Vertikal erosjon: ~{totalErosionMeters} m</span>
                <span>Fjorddybde: {fjordDepth > 0 ? `${fjordDepth} m under havnivå` : "Over havnivå"}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Modellen antar at elvedalens bunn lå 300 moh. før istiden. Én istid graver bare noen hundre meter. Dype fjorder som Sognefjorden er gravd ut gjennom mange istider.
              </p>
            </ModelPanel>

            {/* Fysisk tolkning og eksempler */}
            <ModelPanel className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Mekanismene bak U-dalen
                </span>
                <h4 className="font-display text-xl font-bold">
                  {fjordDepth > 800 ? "Ekstrem overfordypning (Sognefjord-skala)" : "Klassisk U-dal (Gudvangen / Romsdalen)"}
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="rounded border border-border bg-card/60 p-2.5">
                  <span className="font-bold text-foreground">1. Plukking:</span>
                  <p className="text-muted-foreground mt-0.5">
                    Smeltevann under trykk trenger inn i fjellets sprekker på lesiden av knauser, fryser fast og river løs store steinblokker i takt med at isen glir fremover.
                  </p>
                </div>
                <div className="rounded border border-border bg-card/60 p-2.5">
                  <span className="font-bold text-foreground">2. Skuring (avsliping):</span>
                  <p className="text-muted-foreground mt-0.5">
                    Steinblokkene og grusen i breens såle fungerer som et gigantisk sandpapir under et basaltrykk på {basalPressureMPa} MPa. De riper opp skuringsstriper og polerer svaberg.
                  </p>
                </div>
                <div className="rounded border border-primary/30 bg-primary/10 p-2.5">
                  <span className="font-bold text-primary">Terskelfenomenet:</span>
                  <p className="text-foreground/90 mt-0.5">
                    Breens erosjonsevne var størst der dalen var smalest og isen tykkest. Ytterst ved kysten fløt breen ut og mistet trykk, slik at fjellet ikke ble like dypt utgravd. Derfor har de fleste store norske fjorder en grunnere terskel ytterst.
                  </p>
                </div>
              </div>
            </ModelPanel>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FANE 2: FLUVIAL MEANDER & HJULSTRØMS BALANSE                              */}
      {/* ========================================================================= */}
      {tab === "river_meander" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="river-q">Vannføring (Q):</label>
                <span className="font-mono text-primary font-bold">{discharge} m³/s</span>
              </div>
              <input
                id="river-q"
                type="range"
                min={20}
                max={1500}
                step={20}
                value={discharge}
                onChange={(e) => setDischarge(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="river-s">Elvefall / helning:</label>
                <span className="font-mono text-primary font-bold">{gradient} ‰</span>
              </div>
              <input
                id="river-s"
                type="range"
                min={0.2}
                max={15}
                step={0.2}
                value={gradient}
                onChange={(e) => setGradient(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="river-loop">Meandermodning:</label>
                <span className="font-mono text-primary font-bold">{meanderEvolution} %</span>
              </div>
              <input
                id="river-loop"
                type="range"
                min={10}
                max={100}
                value={meanderEvolution}
                onChange={(e) => setMeanderEvolution(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Meander rendering */}
            <ModelPanel className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Planvisning: Meandersving, strømhastighet og kroksjø
              </p>
              <div className="h-56 w-full rounded-lg border border-border bg-[#10171d] p-3">
                <svg viewBox="0 0 260 160" className="h-full w-full">
                  {/* Flomslette bakgrunn */}
                  <rect x="10" y="10" width="240" height="140" fill="#1b241c" rx="6" />

                  {/* Meandersving geometri som bukter seg mer etter meanderEvolution */}
                  {(() => {
                    const amp = 30 + (meanderEvolution / 100) * 45;
                    const neckDist = Math.max(10, 80 - (meanderEvolution / 100) * 70);
                    const isCutoff = meanderEvolution > 88;

                    return (
                      <g>
                        {/* Elveløp */}
                        <path
                          d={`M 20 40 C ${80} 40, ${80} ${80 - amp}, ${130} ${80 - amp} C ${180} ${80 - amp}, ${180} 80, ${130 + neckDist} 80 C ${90} 80, ${90} ${80 + amp}, ${160} ${80 + amp} C ${210} ${80 + amp}, ${210} 120, ${240} 120`}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="14"
                          strokeLinecap="round"
                        />

                        {/* Yttersving (erosjon rød markering) */}
                        <circle cx={130} cy={80 - amp - 7} r="5" fill="#ef4444" />
                        <text x={130} y={80 - amp - 15} fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">
                          Yttersving: {outerVelocity} m/s
                        </text>

                        {/* Innersving (avsetning grønn markering) */}
                        <ellipse cx={130} cy={80 - amp + 15} rx="18" ry="6" fill="#c9b896" opacity="0.8" />
                        <circle cx={130} cy={80 - amp + 15} r="5" fill="#10b981" />
                        <text x={130} y={80 - amp + 31} fill="#10b981" fontSize="7" fontWeight="bold" textAnchor="middle">
                          Innersving: {innerVelocity} m/s
                        </text>

                        {/* Avsnøring / Kroksjø dersom meanderEvolution > 88 */}
                        {isCutoff && (
                          <g>
                            {/* Snarvei (gjennombrudd) */}
                            <line x1="85" y1="55" x2="160" y2="105" stroke="#38bdf8" strokeWidth="12" strokeLinecap="round" />
                            <text x="190" y="55" fill="#facc15" fontSize="9" fontWeight="bold">
                              Kroksjø dannet!
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Gjennomsnittsfart: {meanVelocity} m/s</span>
                <span>Meanderstatus: {meanderEvolution > 88 ? "Gjennomskåret (kroksjø)" : "Aktiv migrering"}</span>
              </div>
            </ModelPanel>

            {/* Hjulstrøms kobling */}
            <ModelPanel className="space-y-4">
              <h4 className="font-display text-lg font-bold">Sedimentdynamikk (Hjulstrøms respons)</h4>
              
              <div className="space-y-3 text-xs">
                <div className="rounded border border-rose-500/30 bg-rose-950/20 p-2.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-rose-300">Yttersving (Cut bank):</span>
                    <span className="text-rose-400">{outerVelocity} m/s</span>
                  </div>
                  <p className={`mt-1 font-semibold ${outerResp.color}`}>{outerResp.action}</p>
                  <p className="text-muted-foreground mt-0.5">
                    Helikoidal strøm graver i skråningsfoten og utløser utrasinger. Elveløpet eter seg sidelengs ut i terrenget.
                  </p>
                </div>

                <div className="rounded border border-emerald-500/30 bg-emerald-950/20 p-2.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-emerald-300">Innersving (Point bar / sandøre):</span>
                    <span className="text-emerald-400">{innerVelocity} m/s</span>
                  </div>
                  <p className={`mt-1 font-semibold ${innerResp.color}`}>{innerResp.action}</p>
                  <p className="text-muted-foreground mt-0.5">
                    Farten er lavest i innersvingen. Når farten blir for lav til å frakte sand og grus, avsettes de her som lagdelte sandører.
                  </p>
                </div>

                <div className="rounded border border-border bg-card/60 p-2 text-[11px] text-muted-foreground">
                  <strong>Hvorfor meandrerer elver?</strong> Når elva når en slak elveslette (lav gradient), har den lite vertikal gravkraft. Den minste forstyrrelse i elveleiet skaper skjev strømhastighet, som forsterkes selvforsterkende til meandersvinger.
                </div>
              </div>
            </ModelPanel>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FANE 3: FORVITRINGSMOTOR (PELTIERS DIAGRAM)                                */}
      {/* ========================================================================= */}
      {tab === "weathering_climate" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="clim-temp">Årsmiddeltemperatur:</label>
                <span className="font-mono text-primary font-bold">{meanTemp} °C</span>
              </div>
              <input
                id="clim-temp"
                type="range"
                min={-15}
                max={28}
                value={meanTemp}
                onChange={(e) => setMeanTemp(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="clim-precip">Årsnedbør:</label>
                <span className="font-mono text-primary font-bold">{annualPrecip} mm/år</span>
              </div>
              <input
                id="clim-precip"
                type="range"
                min={100}
                max={3000}
                step={50}
                value={annualPrecip}
                onChange={(e) => setAnnualPrecip(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Peltier grafikk */}
            <ModelPanel className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Peltiers forvitringsdiagram (Klimastyring)
              </p>
              <div className="h-56 w-full rounded-lg border border-border bg-[#10171e] p-3">
                <svg viewBox="0 0 240 160" className="h-full w-full">
                  {/* Akser */}
                  <line x1="35" y1="15" x2="35" y2="135" stroke="#334155" strokeWidth="1.5" />
                  <line x1="35" y1="135" x2="225" y2="135" stroke="#334155" strokeWidth="1.5" />
                  <text x="35" y="10" fill="#94a3b8" fontSize="8">Temp (°C) ↑</text>
                  <text x="160" y="150" fill="#94a3b8" fontSize="8">Nedbør (mm) →</text>

                  {/* Soner */}
                  {/* Sterk frostsprengning (Rundt 0 grader, moderat til høy nedbør) */}
                  <rect x="60" y="85" width="85" height="35" fill="#38bdf8" opacity="0.25" rx="4" />
                  <text x="70" y="105" fill="#38bdf8" fontSize="7" fontWeight="bold">Sterk frostsprengning</text>

                  {/* Sterk kjemisk forvitring (Høy temp, høy nedbør) */}
                  <polygon points="110,25 220,25 220,95 140,95" fill="#e11d48" opacity="0.25" />
                  <text x="135" y="55" fill="#f43f5e" fontSize="7" fontWeight="bold">Sterk kjemisk forvitring</text>

                  {/* Arid / Svak forvitring */}
                  <rect x="35" y="25" width="50" height="110" fill="#71717a" opacity="0.15" />
                  <text x="40" y="130" fill="#a1a1aa" fontSize="6">Tørt / Svak</text>

                  {/* Aktiv markør */}
                  {(() => {
                    const mx = 35 + (annualPrecip / 3000) * 185;
                    const my = 135 - ((meanTemp + 15) / 43) * 115;
                    return (
                      <g>
                        <circle cx={mx} cy={my} r="6" fill="#facc15" stroke="#fff" strokeWidth="1.5" />
                        <text x={Math.min(mx + 8, 170)} y={my + 4} fill="#facc15" fontSize="8" fontWeight="bold">
                          {meanTemp}°C, {annualPrecip} mm
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Frostsprengning: {weatheringInfo.frostLabel}</span>
                <span>Kjemisk: {weatheringInfo.chemLabel}</span>
              </div>
            </ModelPanel>

            {/* Tolkning */}
            <ModelPanel className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Forvitringsklima
                </span>
                <h4 className="font-display text-xl font-bold">{weatheringInfo.landscapeType}</h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="rounded border border-border bg-card/60 p-2.5">
                  <span className="font-bold text-sky-400">Mekanisk forvitring (Score {weatheringInfo.frostScore} / 10):</span>
                  <p className="text-muted-foreground mt-0.5">
                    Høyest når temperaturen ofte veksler rundt frysepunktet og det er vann i sprekkene. Islinser vokser best like under frysepunktet, ca. −3 til −6 °C. Ved -25 °C er vannet permanent frosset, så frostsprengningen stopper faktisk opp!
                  </p>
                </div>

                <div className="rounded border border-border bg-card/60 p-2.5">
                  <span className="font-bold text-rose-400">Kjemisk forvitring (Score {weatheringInfo.chemScore} / 10):</span>
                  <p className="text-muted-foreground mt-0.5">
                    Kjemiske reaksjoner (hydrolyse av feltspat og karstoppløsning av kalkstein) dobler hastigheten for hver 10 °C temperaturøkning (van 't Hoffs tommelfingerregel).
                  </p>
                </div>

                <div className="rounded border border-primary/20 bg-primary/10 p-2 text-[11px] text-foreground/90">
                  <strong>Norge i dag vs. i Mesozoikum:</strong> I dag domineres Norge av mekanisk forvitring i fjellet. For 100 millioner år siden var klimaet subtropisk varmt, og dyp kjemisk forvitring dannet den opprinnelige paleiske flaten.
                </div>
              </div>
            </ModelPanel>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FANE 4: NORGES 4D-LANDSKAPSHISTORIE                                        */}
      {/* ========================================================================= */}
      {tab === "norway_timeline" && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {([1, 2, 3, 4, 5] as NorwayEpoch[]).map((ep) => (
              <Button
                key={ep}
                size="sm"
                variant={epoch === ep ? "default" : "secondary"}
                onClick={() => setEpoch(ep)}
                className="text-xs"
              >
                {epochData[ep].title.split(". ")[1]}
              </Button>
            ))}
          </div>

          {epoch === 2 || epoch === 3 ? (
            <p className="rounded-lg border border-border bg-card/60 p-2.5 text-xs text-muted-foreground">
              Steg 2 og 3 viser den klassiske modellen. Hvordan fjellplatåene ble dannet, er omdiskutert: Andre forskere
              mener fjellene har vært høye helt siden Kaledonidene, og at istidene høvlet ned toppene til en jevn høyde
              rundt snøgrensen («glacial buzzsaw»).
            </p>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2">
            <ModelPanel className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Tidsalder: {epochData[epoch].age}
                </span>
                <h4 className="font-display text-2xl font-bold">{epochData[epoch].title}</h4>
              </div>

              <p className="text-sm leading-relaxed text-foreground">{epochData[epoch].desc}</p>

              <div className="rounded-lg border border-border bg-card/60 p-3 text-xs space-y-2">
                <div>
                  <span className="font-bold text-primary">Viktigste prosesser:</span>
                  <p className="text-muted-foreground">{epochData[epoch].processes}</p>
                </div>
                <div>
                  <span className="font-bold text-foreground">Landformer som gjenstår i dag:</span>
                  <p className="text-muted-foreground">{epochData[epoch].keyForms}</p>
                </div>
              </div>
            </ModelPanel>

            {/* Skjematisk profil av tidsalderen */}
            <ModelPanel className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Profilutvikling (Vest → Øst)
              </p>
              <div className="h-56 w-full rounded-lg border border-border bg-[#10171d] p-3">
                <svg viewBox="0 0 260 160" className="h-full w-full">
                  {epoch === 1 && (
                    <g>
                      <text x="130" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle">Kaledonsk fjellkjede (Himalaya-skala)</text>
                      <polygon points="20,130 80,40 140,130" fill="#382e22" stroke="#e0a899" />
                      <polygon points="100,130 170,30 240,130" fill="#2d261e" stroke="#e0a899" />
                      <text x="130" y="145" fill="#64748b" fontSize="8" textAnchor="middle">Kollisjon Baltika - Laurentia</text>
                    </g>
                  )}
                  {epoch === 2 && (
                    <g>
                      <text x="130" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle">Den paleiske overflaten (Nedslitt peneplan)</text>
                      <path d="M 20 90 Q 80 85 140 92 T 240 90 L 240 140 L 20 140 Z" fill="#263228" stroke="#10b981" strokeWidth="2" />
                      <text x="130" y="115" fill="#10b981" fontSize="9" textAnchor="middle">Bølgende viddelandskap under varmt klima</text>
                    </g>
                  )}
                  {epoch === 3 && (
                    <g>
                      <text x="130" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle">Tertiær asymmetrisk landheving</text>
                      <path d="M 20 120 L 70 45 L 240 95 L 240 140 L 20 140 Z" fill="#2d261e" stroke="#f59e0b" strokeWidth="2" />
                      <line x1="40" y1="120" x2="40" y2="60" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                      <text x="45" y="80" fill="#f59e0b" fontSize="8">Heving i vest</text>
                      <text x="170" y="125" fill="#94a3b8" fontSize="8">Slakt fall mot øst</text>
                    </g>
                  )}
                  {epoch === 4 && (
                    <g>
                      <text x="130" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle">Kvartære istider graver fjorder og U-daler</text>
                      {/* Fjordvann under fast havnivå */}
                      <rect x="45" y="123" width="60" height="25" fill="#0284c7" />
                      <path d={U_PROFILE} fill="#23201a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="78" y="136" fill="#fff" fontSize="7" textAnchor="middle">Fjord</text>
                      <text x="126" y="106" fill="#cbd5e1" fontSize="6" textAnchor="middle">U-dal</text>
                      <text x="180" y="75" fill="#f59e0b" fontSize="7">Paleisk vidde</text>
                    </g>
                  )}
                  {epoch === 5 && (
                    <g>
                      <text x="130" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle">Postglasial landheving og marine leiravsetninger</text>
                      <rect x="45" y="123" width="60" height="25" fill="#0284c7" />
                      <path d={U_PROFILE} fill="#23201a" stroke="#cbd5e1" strokeWidth="1.5" />
                      <rect x="180" y="85" width="40" height="20" fill="#0d9488" opacity="0.4" />
                      <text x="200" y="98" fill="#5eead4" fontSize="7" textAnchor="middle">Marin leire</text>
                      <text x="60" y="35" fill="#38bdf8" fontSize="7">Alpine tinder</text>
                      <text x="130" y="40" fill="#f59e0b" fontSize="7">Vidde</text>
                    </g>
                  )}
                </svg>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Steg {epoch} av 5</span>
                <span>{epochData[epoch].title.split(". ")[1]}</span>
              </div>
            </ModelPanel>
          </div>
        </div>
      )}
    </ModelFrame>
  );
}
