import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

type RockTab = "cycle" | "bowen" | "thin_section" | "geochronology";

export function RockPetrologyModel() {
  const [tab, setTab] = useState<RockTab>("cycle");

  // --- Fane 1: Bergartssyklus-simulator ---
  type RockId = "granitt" | "basalt" | "sandstein" | "kalkstein" | "leirskifer" | "gneis" | "marmor";
  const [selectedRock, setSelectedRock] = useState<RockId>("granitt");
  const [lastProcess, setLastProcess] = useState<string>("Utgangsbergart valgt");

  const rockData: Record<
    RockId,
    {
      name: string;
      group: "Magmatisk" | "Sedimentær" | "Metamorf";
      texture: string;
      minerals: string;
      color: string;
      pt: { p: number; t: number }; // kbar, degC
      origin: string;
      norway: string;
    }
  > = {
    granitt: {
      name: "Granitt",
      group: "Magmatisk",
      texture: "Fanerittisk (grovkornet, krystaller 2–8 mm)",
      minerals: "Kvarts (20–40 %), kalifeltspat (rosa), plagioklas, biotitt/muskovitt",
      color: "#e0a899",
      pt: { p: 4, t: 720 },
      origin: "Langsom størkning av felsisk smelte dypt i jordskorpa (pluton/batolitt).",
      norway: "Iddefjordsgranitt (Østfold), Fevikgranitt, Bindalsbatolitten.",
    },
    basalt: {
      name: "Basalt",
      group: "Magmatisk",
      texture: "Afanittisk (finkornet) til vesikulær (gassblærer)",
      minerals: "Kalsiumrik plagioklas, pyroksen (augitt), olivin",
      color: "#52525b",
      pt: { p: 0.1, t: 1150 },
      origin: "Rask avkjøling av tyntflytende mafisk lava på overflaten eller havbunnen.",
      norway: "Midthavsryggen (Jan Mayen, Mohnsryggen), Oslofeltets lavaer ved Krokskogen.",
    },
    sandstein: {
      name: "Sandstein",
      group: "Sedimentær",
      texture: "Klastisk (avrundede korn 0,063–2 mm kittet sammen)",
      minerals: "Domineres av kvarts (>80 %), feltspatkorn og silika-/kalsittsement",
      color: "#d97706",
      pt: { p: 0.8, t: 120 },
      origin: "Avsetning av sand på elveflater, ørkener eller strender; diagenese og sementering.",
      norway: "Brumunddalsandstein, Ringerikesandstein (Devon-alder rød sandstein).",
    },
    kalkstein: {
      name: "Kalkstein",
      group: "Sedimentær",
      texture: "Kjemisk utfelt eller bioklastisk (fossilbærende)",
      minerals: "Kalsitt (CaCO₃, >90 %), dolomitt, fossiler av koraller og brachiopoder",
      color: "#94a3b8",
      pt: { p: 0.5, t: 60 },
      origin: "Utfelling av kalk i varme, grunne hav eller opphopning av kalkskall.",
      norway: "Kambrosilur i Oslofeltet (bruser kraftig med 10 % saltsyre HCl).",
    },
    leirskifer: {
      name: "Leirskifer (shale)",
      group: "Sedimentær",
      texture: "Svært finkornet klastisk (<0,002 mm), tynn lagdeling",
      minerals: "Leirmineraler (illitt, kaolinitt), kvartsstøv, organisk materiale",
      color: "#475569",
      pt: { p: 1.2, t: 180 },
      origin: "Rolig sedimentasjon av leire på dypt hav eller i innsjøer, etterfulgt av kompaksjon.",
      norway: "Alunskifer i Oslofeltet (uran- og radonrik kambro-ordovisisk bergart).",
    },
    gneis: {
      name: "Båndgneis",
      group: "Metamorf",
      texture: "Gneistekstur (foliasjon: vekslende lyse og mørke bånd)",
      minerals: "Kvarts + feltspat (lyse bånd), biotitt + amfibol (mørke bånd)",
      color: "#64748b",
      pt: { p: 7.5, t: 650 },
      origin: "Høygradig regionalmetamorfose (amfibolittfacies) under fjellkjedefolding.",
      norway: "Norges vanligste bergart: Prekambrisk grunnfjell (1,8–1,0 mrd år gamle i hele Sør- og Nord-Norge).",
    },
    marmor: {
      name: "Marmor",
      group: "Metamorf",
      texture: "Kornig / granoblastisk (sammenvokste sukkeraktige krystaller)",
      minerals: "Rekrystallisert kalsitt (CaCO₃, ren hvit til årete farget)",
      color: "#cbd5e1",
      pt: { p: 5.0, t: 550 },
      origin: "Omdanning av kalkstein ved kontakt- eller regionalmetamorfose uten foliasjon.",
      norway: "Fauskemarmor (Nordland), brytes kommersielt til fasadestein.",
    },
  };

  const applyCycleAction = (action: string) => {
    switch (action) {
      case "forvitring":
        setLastProcess("Forvitring, erosjon og transport: Fjellet brytes ned og fraktes til et basseng.");
        setSelectedRock("sandstein");
        break;
      case "diagenese":
        setLastProcess("Diagenese: Kompaksjon under 2 km sedimentlag og mineralutfelling sementerer kornene.");
        setSelectedRock(selectedRock === "kalkstein" ? "kalkstein" : "sandstein");
        break;
      case "regional_metamorfose":
        setLastProcess("Regionalmetamorfose (orogenese): Trykk og varme skaper foliasjon i fast tilstand.");
        if (selectedRock === "kalkstein") setSelectedRock("marmor");
        else setSelectedRock("gneis");
        break;
      case "smelting":
        setLastProcess("Full oppsmelting (anateksis): Bergarten passerer solidus (>750 °C) og blir til flytende magma!");
        setSelectedRock("granitt");
        break;
      case "vulkanisme":
        setLastProcess("Vulkanutbrudd: Rask avkjøling på overflaten danner finkornet mafisk dagbergart.");
        setSelectedRock("basalt");
        break;
    }
  };

  // --- Fane 2: Bowens krystallisasjonsreaksjon ---
  const [bowenTemp, setBowenTemp] = useState<number>(950); // 1200 til 600 °C

  // Beregnede parametere for smelte
  const calcBowenState = (t: number) => {
    // SiO2 øker fra 48 % til 72 %
    const frac = (1200 - t) / 600; // 0 til 1
    const sio2 = Math.round(48 + frac * 24.5);
    let rockType = "Gabbro / Basalt (Mafisk)";
    let rockColor = "text-zinc-400";
    if (sio2 >= 53 && sio2 < 63) {
      rockType = "Dioritt / Andesitt (Intermediær)";
      rockColor = "text-teal-400";
    } else if (sio2 >= 63) {
      rockType = "Granitt / Ryolitt (Felsisk / sur)";
      rockColor = "text-rose-400";
    }

    const olivine = t > 1050;
    const augite = t <= 1120 && t > 900;
    const hornblende = t <= 950 && t > 750;
    const biotite = t <= 800;
    const plagioclaseCa = t > 1000 ? "Kalsiumrik (Anortitt)" : t > 800 ? "Ca-Na plagioklas" : "Natriumrik (Albitt)";
    const kFeldspar = t <= 720;
    const quartz = t <= 650;

    return { sio2, rockType, rockColor, olivine, augite, hornblende, biotite, plagioclaseCa, kFeldspar, quartz };
  };

  const bowenState = calcBowenState(bowenTemp);

  // --- Fane 3: Virtuelt polarisasjonsmikroskop ---
  type ThinSectionSample = "larvikitt" | "rombeporfyr" | "sandstein" | "gneis";
  const [sample, setSample] = useState<ThinSectionSample>("larvikitt");
  const [isXPL, setIsXPL] = useState<boolean>(true);
  const [stageAngle, setStageAngle] = useState<number>(30); // 0 til 90 grader

  const sampleDescriptions: Record<
    ThinSectionSample,
    { title: string; desc: string; mineralsPPL: string; mineralsXPL: string; norwaySignificance: string }
  > = {
    larvikitt: {
      title: "Larvikitt (Monzonitt / Syenitt)",
      desc: "Norges nasjonalbergart. Karakteristisk blått fargespill (labradorescens) forårsaket av mikroskopiske sub-mikron avblandingslameller av kryptoperthitt (kalifeltspat og albitt).",
      mineralsPPL: "Fargeløse til grålige feltspatkorn, mørkebrune biotittflak, titanaugitt og magnetitt.",
      mineralsXPL: "Praktfulle perthittiske avblandingslameller med tvillingstriper. Utslukker ved skrå vinkel.",
      norwaySignificance: "Dannes i Larvik-plutonen i Oslofeltets riftfase for ca. 290 millioner år siden.",
    },
    rombeporfyr: {
      title: "Rombeporfyr (Lava)",
      desc: "Ekstremt sjelden lavabergart på verdensbasis. Karakteriseres av båtformede/rombiske feltspat-fenokrystaller i en finkornet grunnmasse.",
      mineralsPPL: "Store, lyse rombeformede krystaller (plagioklas/anortoklas) omsluttet av rødbrun mikrokrystallinsk grunnmasse.",
      mineralsXPL: "Sammensatte tvillinger i rombene. Grunnmasse viser mikro-strømlinjer (trakyttisk tekstur).",
      norwaySignificance: "Verdenskjent signaturbergart for Oslofeltet. Finnes ellers kun på Mount Erebus (Antarktis) og Riftdalen (Kenya).",
    },
    sandstein: {
      title: "Kvarts-sandstein (Klastisk)",
      desc: "Sedimentær bergart med avrundede sandkorn kittet sammen av sekundær silika (kvartsement) eller kalsitt.",
      mineralsPPL: "Avrundede, optisk klare kvartskorn med synlige støvlinjer langs de opprinnelige kornkantene.",
      mineralsXPL: "1. ordens grå og hvite interferensfarger i kvarts. Kvartskornene har optisk kontinuerlig overvekst av kvartssement.",
      norwaySignificance: "Brumunddal og Ringerike; avsatt av elver og sanddyner under Devon da den kaledonske fjellkjede eroderte.",
    },
    gneis: {
      title: "Båndgneis (Metamorf)",
      desc: "Metamorf bergart med utpreget foliasjon. Mineralene har segregert i vekslende kvarts-feltspatrike (felsiske) og glimmer-amfibolrike (mafiske) lag.",
      mineralsPPL: "Orientert mørk pleokroittisk biotitt (skifter mellom blekgul og mørkebrun ved rotasjon), fargeløs kvarts og feltspat.",
      mineralsXPL: "Voldsomme interferensfarger: Biotitt med 3. ordens farger (glorete fugleøye-tekstur), kvarts med bølgende utslukning (undulerende ekcstinksjon som beviser tektonisk spenning).",
      norwaySignificance: "Danner ryggraden i Norges prekambriske grunnfjellsskjold, omdannet dypt under jordas overflate under Svekonorvegisk orogenese.",
    },
  };

  // --- Fane 4: Geokronologi & Isotopkalkulator ---
  type SystemId = "c14" | "upb" | "kar";
  const [isoSystem, setIsoSystem] = useState<SystemId>("upb");
  const [parentPercent, setParentPercent] = useState<number>(64); // % gjenværende morisotop

  const isoParams: Record<
    SystemId,
    { name: string; halfLife: number; unit: string; parent: string; daughter: string; scope: string; norwayExample: string }
  > = {
    c14: {
      name: "Karbon-14 (¹⁴C → ¹⁴N)",
      halfLife: 5730,
      unit: "år",
      parent: "¹⁴C",
      daughter: "¹⁴N",
      scope: "Daterer KUN organisk materiale (tre, skjell, bein) opp til ca. 50 000 år.",
      norwayExample: "Tidfesting av Ra-morenen, mammuttenner i Gudbrandsdalen og postglasial landheving.",
    },
    upb: {
      name: "Uran-Bly (²³⁸U → ²⁰⁶Pb i zirkon)",
      halfLife: 4468000000,
      unit: "år (4,47 mrd år)",
      parent: "²³⁸U",
      daughter: "²⁰⁶Pb",
      scope: "Gullstandarden for magmatiske og metamorfe bergarter. Zirkon tar inn U, men avviser bly ved krystallisasjon.",
      norwayExample: "Datering av Norges eldste bergarter: Gneiser i Lofoten og Finnmark (2,8 mrd år gamle).",
    },
    kar: {
      name: "Kalium-Argon (⁴⁰K → ⁴⁰Ar)",
      halfLife: 1250000000,
      unit: "år (1,25 mrd år)",
      parent: "⁴⁰K",
      daughter: "⁴⁰Ar",
      scope: "Daterer biotitt, muskovitt og amfibol. Argon-gass lekker ut inntil mineralet kjøles under lukketemperaturen.",
      norwayExample: "Daterer avkjøling og heving av den Kaledonske fjellkjede (420–390 millioner år siden).",
    },
  };

  const curIso = isoParams[isoSystem];
  // n halveringstider = -log2(P / 100)
  const halfLivesElapsed = -Math.log2(parentPercent / 100);
  const calculatedAge = Math.round(halfLivesElapsed * curIso.halfLife);
  const daughterPercent = 100 - parentPercent;

  return (
    <ModelFrame
      kicker="Interaktiv Laboratoriemodell"
      title="Petrologi, krystallisasjon og geokronologi"
      lead="Utforsk bergartssyklusens faser, simuler fraksjonell krystallisasjon i Bowens reaksjonsserie, studer tynnsnitt under virtuelt polarisasjonsmikroskop, og beregn absolutte aldre med isotopgeokronologi."
      toolbar={
        <>
          <ModelTab active={tab === "cycle"} onClick={() => setTab("cycle")}>
            1. Bergartssyklus
          </ModelTab>
          <ModelTab active={tab === "bowen"} onClick={() => setTab("bowen")}>
            2. Bowens serie
          </ModelTab>
          <ModelTab active={tab === "thin_section"} onClick={() => setTab("thin_section")}>
            3. Polarisasjonsmikroskop
          </ModelTab>
          <ModelTab active={tab === "geochronology"} onClick={() => setTab("geochronology")}>
            4. Aldersdatering
          </ModelTab>
        </>
      }
    >
      {/* ========================================================================= */}
      {/* FANE 1: BERGARTSSYKLUS                                                    */}
      {/* ========================================================================= */}
      {tab === "cycle" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Velg aktiv bergart
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(Object.keys(rockData) as RockId[]).map((r) => (
                  <Button
                    key={r}
                    size="sm"
                    variant={selectedRock === r ? "default" : "secondary"}
                    onClick={() => {
                      setSelectedRock(r);
                      setLastProcess(`Valgte ${rockData[r].name}`);
                    }}
                  >
                    {rockData[r].name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Påfør geologisk prosess
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button size="sm" variant="secondary" onClick={() => applyCycleAction("forvitring")}>
                  🌧️ Heving &amp; forvitring
                </Button>
                <Button size="sm" variant="secondary" onClick={() => applyCycleAction("diagenese")}>
                  🧱 Diagenese (sementering)
                </Button>
                <Button size="sm" variant="secondary" onClick={() => applyCycleAction("regional_metamorfose")}>
                  🏔️ Regional metamorfose
                </Button>
                <Button size="sm" variant="secondary" onClick={() => applyCycleAction("smelting")}>
                  🔥 Smelting til magma
                </Button>
                <Button size="sm" variant="secondary" onClick={() => applyCycleAction("vulkanisme")}>
                  🌋 Vulkansk utbrudd
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Kort med aktiv bergart info */}
            <ModelPanel className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                    {rockData[selectedRock].group} bergart
                  </span>
                  <h4 className="font-display text-2xl font-bold">{rockData[selectedRock].name}</h4>
                </div>
                <div
                  className="size-10 rounded-full border-2 border-border shadow-inner"
                  style={{ backgroundColor: rockData[selectedRock].color }}
                />
              </div>

              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground">Tekstur:</span>
                  <p className="font-medium text-foreground">{rockData[selectedRock].texture}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground">Mineraler:</span>
                  <p className="font-medium text-foreground">{rockData[selectedRock].minerals}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground">Dannelsesmiljø:</span>
                  <p className="text-muted-foreground">{rockData[selectedRock].origin}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground">Eksempler i Norge:</span>
                  <p className="text-muted-foreground">{rockData[selectedRock].norway}</p>
                </div>
              </div>

              <div className="rounded-lg bg-card/60 p-3 border border-border/80">
                <span className="text-xs font-semibold text-primary">Siste hendelse i kretsløpet:</span>
                <p className="text-sm italic text-foreground mt-0.5">{lastProcess}</p>
              </div>
            </ModelPanel>

            {/* P-T Diagram visualisering */}
            <ModelPanel className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Dannelsesforhold i jordskorpa
              </p>
              <div className="relative h-44 rounded-lg border border-border bg-[#10171d] p-3">
                <svg viewBox="0 0 200 160" className="h-full w-full">
                  {/* Akser */}
                  <line x1="25" y1="10" x2="25" y2="135" stroke="#334155" strokeWidth="1.5" />
                  <line x1="25" y1="135" x2="190" y2="135" stroke="#334155" strokeWidth="1.5" />
                  <text x="30" y="18" fill="#94a3b8" fontSize="8">Dyp / P (kbar)</text>
                  <text x="140" y="150" fill="#94a3b8" fontSize="8">Temp (°C)</text>

                  {/* Soner */}
                  {/* Sedimentær */}
                  <rect x="25" y="115" width="45" height="20" fill="#d97706" opacity="0.25" />
                  <text x="30" y="128" fill="#d97706" fontSize="7">Sediment</text>

                  {/* Metamorf */}
                  <polygon points="45,115 110,60 140,110 70,135" fill="#0d9488" opacity="0.3" />
                  <text x="75" y="95" fill="#0d9488" fontSize="8">Metamorfose</text>

                  {/* Magmatisk / Smelte */}
                  <polygon points="110,60 190,60 190,135 140,110" fill="#e11d48" opacity="0.25" />
                  <text x="145" y="90" fill="#e11d48" fontSize="8">Smelte (magma)</text>

                  {/* Aktiv bergart prikk */}
                  {(() => {
                    const d = rockData[selectedRock];
                    const px = 25 + (d.pt.t / 1000) * 155;
                    const py = 135 - (d.pt.p / 10) * 115;
                    return (
                      <g>
                        <circle cx={px} cy={py} r="6" fill={d.color} stroke="#fff" strokeWidth="1.5" />
                        <text x={px + 8} y={py + 3} fill="#fff" fontSize="8" fontWeight="bold">
                          {d.name}
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Trykk: ~{rockData[selectedRock].pt.p} kbar</span>
                <span>Temp: ~{rockData[selectedRock].pt.t} °C</span>
              </div>
            </ModelPanel>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FANE 2: BOWENS REAKSJONSSERIE & MAGMADIFERENSIASJON                       */}
      {/* ========================================================================= */}
      {tab === "bowen" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="bowen-temp" className="text-sm font-semibold text-foreground">
                Magmakammerets temperatur: <span className="font-mono text-primary font-bold">{bowenTemp} °C</span>
              </label>
              <span className={`text-sm font-bold ${bowenState.rockColor}`}>
                {bowenState.rockType}
              </span>
            </div>
            <input
              id="bowen-temp"
              type="range"
              min={600}
              max={1200}
              step={10}
              value={bowenTemp}
              onChange={(e) => setBowenTemp(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>600 °C (Felsisk / granittisk granittsmelte)</span>
              <span>900 °C (Andesittisk)</span>
              <span>1200 °C (Ultrabasiske / mafiske smelter)</span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <ModelPanel className="space-y-4">
              <h4 className="font-display text-lg font-bold">Krystallisasjonsstatus ved {bowenTemp} °C</h4>
              
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Diskontinuerlig gren (Jern- og magnesiumsilikater):
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2 rounded border ${bowenState.olivine ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 font-semibold" : "border-border/40 text-muted-foreground"}`}>
                    Olivin (Mg,Fe)₂SiO₄ {bowenState.olivine ? "✓ Utkrystallisert" : "— Ikke dannet"}
                  </div>
                  <div className={`p-2 rounded border ${bowenState.augite ? "border-teal-500/50 bg-teal-950/20 text-teal-300 font-semibold" : "border-border/40 text-muted-foreground"}`}>
                    Pyroksen (Augitt) {bowenState.augite ? "✓ Utkrystallisert" : "— Ikke dannet"}
                  </div>
                  <div className={`p-2 rounded border ${bowenState.hornblende ? "border-sky-500/50 bg-sky-950/20 text-sky-300 font-semibold" : "border-border/40 text-muted-foreground"}`}>
                    Amfibol (Hornblende) {bowenState.hornblende ? "✓ Utkrystallisert" : "— Ikke dannet"}
                  </div>
                  <div className={`p-2 rounded border ${bowenState.biotite ? "border-amber-500/50 bg-amber-950/20 text-amber-300 font-semibold" : "border-border/40 text-muted-foreground"}`}>
                    Biotitt (mørk glimmer) {bowenState.biotite ? "✓ Utkrystallisert" : "— Ikke dannet"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Kontinuerlig gren (Plagioklas / feltspater):
                </p>
                <div className="p-2 rounded border border-primary/40 bg-primary/10 text-xs font-medium text-foreground">
                  Aktiv plagioklas: <span className="font-bold text-primary">{bowenState.plagioclaseCa}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Lavtemperatursmineraler (Felles bunn):
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2 rounded border ${bowenState.kFeldspar ? "border-rose-500/50 bg-rose-950/20 text-rose-300 font-semibold" : "border-border/40 text-muted-foreground"}`}>
                    Kalifeltspat {bowenState.kFeldspar ? "✓ Krystallisert" : "— Fortsatt i smelte"}
                  </div>
                  <div className={`p-2 rounded border ${bowenState.quartz ? "border-violet-500/50 bg-violet-950/20 text-violet-300 font-semibold" : "border-border/40 text-muted-foreground"}`}>
                    Kvarts (SiO₂) {bowenState.quartz ? "✓ Krystallisert" : "— Fortsatt i smelte"}
                  </div>
                </div>
              </div>
            </ModelPanel>

            <ModelPanel className="space-y-4">
              <h4 className="font-display text-lg font-bold">Magmakjemisk evolusjon</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Silikainnhold i restsmelten (SiO₂):</span>
                  <span className="text-primary font-bold">{bowenState.sio2} %</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-300"
                    style={{ width: `${((bowenState.sio2 - 45) / 35) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Når tunge, magnesium- og jernrike mineraler krystalliserer først og synker til bunns i magmakammeret (krystall-kumulat), berikes restsmelten kontinuerlig på silika, natrium og kalium.
                </p>
              </div>

              <div className="rounded-lg bg-card/60 p-3 border border-border text-xs space-y-1.5">
                <p className="font-semibold text-primary">Goldichs forvitringsstabilitet (det omvendte prinsippet):</p>
                <p className="text-muted-foreground">
                  Mineraler som dannes ved høyest temperatur (f.eks. olivin ved 1200 °C) er minst stabile på jordoverflaten, fordi overflatetrykk og -temperatur avviker mest fra likevektsforholdene. Kvarts, som krystalliserer sist ved 600 °C, er derimot ekstremt resistent mot kjemisk forvitring!
                </p>
              </div>
            </ModelPanel>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FANE 3: VIRTUELT POLARISASJONSMIKROSKOP                                   */}
      {/* ========================================================================= */}
      {tab === "thin_section" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(["larvikitt", "rombeporfyr", "sandstein", "gneis"] as ThinSectionSample[]).map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={sample === s ? "default" : "secondary"}
                  onClick={() => setSample(s)}
                >
                  {sampleDescriptions[s].title.split(" ")[0]}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={isXPL ? "default" : "secondary"}
                onClick={() => setIsXPL(!isXPL)}
              >
                {isXPL ? "Kryssede nicoler (XPL)" : "Plan-polarisert lys (PPL)"}
              </Button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Mikroskop-visningsokular */}
            <ModelPanel className="flex flex-col items-center justify-center space-y-4">
              <div className="relative size-64 rounded-full border-4 border-muted/80 bg-[#090e12] overflow-hidden shadow-2xl flex items-center justify-center">
                {/* Hårkors */}
                <line x1="128" y1="0" x2="128" y2="256" stroke="#475569" strokeWidth="0.8" opacity="0.6" />
                <line x1="0" y1="128" x2="256" y2="128" stroke="#475569" strokeWidth="0.8" opacity="0.6" />

                {/* Simulert tynnsnitt-rendering */}
                <svg
                  viewBox="0 0 200 200"
                  className="h-full w-full transition-transform duration-200"
                  style={{ transform: `rotate(${stageAngle}deg)` }}
                >
                  {sample === "larvikitt" && (
                    <g>
                      {/* Store sammenvokste feltspater med tvillingstriper */}
                      <polygon points="20,20 120,40 100,140 30,120" fill={isXPL ? "#254060" : "#d8dce2"} stroke="#1e293b" />
                      <polygon points="120,40 180,30 170,150 100,140" fill={isXPL ? "#4a78a6" : "#caced6"} stroke="#1e293b" />
                      <polygon points="30,120 100,140 80,180 10,170" fill={isXPL ? "#1c324a" : "#cbd5e1"} stroke="#1e293b" />
                      <polygon points="100,140 170,150 160,190 80,180" fill={isXPL ? "#3b6288" : "#d8dce2"} stroke="#1e293b" />
                      {/* Biotitt korn */}
                      <ellipse cx="60" cy="80" rx="18" ry="10" fill={isXPL ? "#d97706" : "#78350f"} />
                      <ellipse cx="140" cy="110" rx="15" ry="8" fill={isXPL ? "#b45309" : "#78350f"} />
                      {/* Perthitt striper */}
                      {isXPL && (
                        <>
                          <line x1="40" y1="35" x2="90" y2="130" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
                          <line x1="55" y1="35" x2="105" y2="130" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
                          <line x1="130" y1="45" x2="160" y2="140" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="4 2" />
                        </>
                      )}
                    </g>
                  )}

                  {sample === "rombeporfyr" && (
                    <g>
                      {/* Finkornet grunnmasse */}
                      <rect x="0" y="0" width="200" height="200" fill={isXPL ? "#1e1b24" : "#683b38"} />
                      {/* Rombeformede feltspatkrystaller */}
                      <polygon points="100,50 145,100 100,150 55,100" fill={isXPL ? "#818cf8" : "#f1f5f9"} stroke="#312e81" strokeWidth="1.5" />
                      <polygon points="150,130 180,160 150,190 120,160" fill={isXPL ? "#6366f1" : "#f8fafc"} stroke="#312e81" strokeWidth="1.2" />
                      <polygon points="40,20 70,50 40,80 10,50" fill={isXPL ? "#4f46e5" : "#f1f5f9"} stroke="#312e81" strokeWidth="1.2" />
                      {/* Rombe-senter sonering */}
                      {isXPL && (
                        <polygon points="100,70 125,100 100,130 75,100" fill="#a5b4fc" opacity="0.7" />
                      )}
                    </g>
                  )}

                  {sample === "sandstein" && (
                    <g>
                      {/* Avrundede kvartskorn */}
                      <circle cx="50" cy="50" r="28" fill={isXPL ? "#94a3b8" : "#f1f5f9"} stroke="#475569" />
                      <circle cx="110" cy="45" r="26" fill={isXPL ? "#cbd5e1" : "#f8fafc"} stroke="#475569" />
                      <circle cx="160" cy="65" r="24" fill={isXPL ? "#64748b" : "#f1f5f9"} stroke="#475569" />
                      <circle cx="70" cy="110" r="30" fill={isXPL ? "#e2e8f0" : "#ffffff"} stroke="#475569" />
                      <circle cx="135" cy="115" r="32" fill={isXPL ? "#475569" : "#f1f5f9"} stroke="#475569" />
                      <circle cx="55" cy="165" r="25" fill={isXPL ? "#94a3b8" : "#f8fafc"} stroke="#475569" />
                      <circle cx="115" cy="170" r="28" fill={isXPL ? "#cbd5e1" : "#f1f5f9"} stroke="#475569" />
                      {/* Porer / Sement */}
                      <path d="M 75 75 L 85 85" stroke={isXPL ? "#38bdf8" : "#94a3b8"} strokeWidth="4" />
                    </g>
                  )}

                  {sample === "gneis" && (
                    <g>
                      {/* Bånding / Foliasjon på skrå */}
                      <path d="M 0 30 Q 100 50 200 20 L 200 60 Q 100 90 0 70 Z" fill={isXPL ? "#e2e8f0" : "#f8fafc"} />
                      <path d="M 0 70 Q 100 90 200 60 L 200 110 Q 100 130 0 110 Z" fill={isXPL ? "#b45309" : "#78350f"} />
                      <path d="M 0 110 Q 100 130 200 110 L 200 160 Q 100 180 0 150 Z" fill={isXPL ? "#cbd5e1" : "#ffffff"} />
                      <path d="M 0 150 Q 100 180 200 160 L 200 200 L 0 200 Z" fill={isXPL ? "#d97706" : "#78350f"} />
                      {/* Granat porfyroblast */}
                      <circle cx="120" cy="100" r="16" fill={isXPL ? "#1e1e1e" : "#ef4444"} stroke="#991b1b" strokeWidth="1.5" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Rotasjonsslider */}
              <div className="w-full max-w-xs space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Roter mikroskopbordet:</span>
                  <span className="font-mono text-foreground font-semibold">{stageAngle}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={90}
                  value={stageAngle}
                  onChange={(e) => setStageAngle(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </ModelPanel>

            {/* Forklaring og optisk analyse */}
            <ModelPanel className="space-y-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Tynnsnittanalyse
                </span>
                <h4 className="font-display text-xl font-bold">{sampleDescriptions[sample].title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{sampleDescriptions[sample].desc}</p>
              </div>

              <div className="rounded-lg bg-card/60 p-2.5 border border-border text-xs space-y-1">
                <span className="font-semibold text-foreground">Under {isXPL ? "XPL (kryssede nicoler)" : "PPL (plan-polarisert lys)"}:</span>
                <p className="text-muted-foreground">
                  {isXPL ? sampleDescriptions[sample].mineralsXPL : sampleDescriptions[sample].mineralsPPL}
                </p>
              </div>

              <div className="rounded-lg bg-primary/10 p-2.5 border border-primary/20 text-xs space-y-1">
                <span className="font-semibold text-primary">Geologisk betydning i Norge:</span>
                <p className="text-foreground/90">{sampleDescriptions[sample].norwaySignificance}</p>
              </div>

              <p className="text-[11px] text-muted-foreground italic">
                Tips: Prøv å veksle mellom PPL og XPL og rotere bordet for å observere hvordan anisotrope mineraler (som kvarts og feltspat) gjennomgår utslukning hver 90. grad når krystallaksen faller sammen med polarisatorens svingeplan.
              </p>
            </ModelPanel>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FANE 4: GEOKRONOLOGI & ISOTOPKALKULATOR                                   */}
      {/* ========================================================================= */}
      {tab === "geochronology" && (
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {(["upb", "c14", "kar"] as SystemId[]).map((sys) => (
              <Button
                key={sys}
                size="sm"
                variant={isoSystem === sys ? "default" : "secondary"}
                onClick={() => setIsoSystem(sys)}
                className="text-xs"
              >
                {isoParams[sys].name}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="iso-parent" className="text-sm font-semibold text-foreground">
                Gjenværende morisotop ({curIso.parent}):{" "}
                <span className="font-mono text-primary font-bold">{parentPercent} %</span>
              </label>
              <span className="text-sm text-muted-foreground">
                Datterisotop ({curIso.daughter}): <strong className="text-foreground">{daughterPercent} %</strong>
              </span>
            </div>
            <input
              id="iso-parent"
              type="range"
              min={1}
              max={99}
              value={parentPercent}
              onChange={(e) => setParentPercent(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Beregningsresultat */}
            <ModelPanel className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Beregnet absolutt alder
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-extrabold text-foreground">
                    {calculatedAge.toLocaleString("no-NO")}
                  </span>
                  <span className="text-sm text-muted-foreground">{curIso.unit}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Tilsvarer <strong>{halfLivesElapsed.toFixed(2)}</strong> halveringstider for {curIso.name}.
                </p>
              </div>

              <div className="rounded-lg bg-card/60 p-3 border border-border text-xs space-y-1.5">
                <p className="font-semibold text-primary">Isotopens bruksområde &amp; begrensning:</p>
                <p className="text-foreground/90">{curIso.scope}</p>
                <p className="text-muted-foreground pt-1 border-t border-border/60">
                  <strong>Norsk geologisk relevans:</strong> {curIso.norwayExample}
                </p>
              </div>

              {isoSystem === "c14" && (
                <div className="rounded bg-rose-500/10 p-2.5 border border-rose-500/30 text-xs text-rose-300">
                  ⚠️ <strong>Eksamensfelle:</strong> Karbon-14 kan IKKE brukes til å datere gneis, granitt eller dinosaurer! Halveringstiden (5730 år) er for kort til å måle noe som er eldre enn ~50 000 år, og mineraler inneholder ikke karbon fra fotosyntese.
                </div>
              )}
            </ModelPanel>

            {/* Eksponentiell nedbrytningskurve */}
            <ModelPanel className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Eksponentiell nedbrytningskurve: N(t) = N₀ · (1/2)^(t / T½)
              </p>
              <div className="h-44 w-full rounded-lg border border-border bg-[#10171d] p-3">
                <svg viewBox="0 0 240 140" className="h-full w-full">
                  {/* Akser */}
                  <line x1="30" y1="10" x2="30" y2="115" stroke="#334155" strokeWidth="1.5" />
                  <line x1="30" y1="115" x2="230" y2="115" stroke="#334155" strokeWidth="1.5" />
                  <text x="35" y="18" fill="#94a3b8" fontSize="8">Morisotop (%)</text>
                  <text x="180" y="130" fill="#94a3b8" fontSize="8">Antall T½ →</text>

                  {/* Nivålinjer */}
                  <line x1="26" y1="20" x2="230" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
                  <text x="12" y="23" fill="#64748b" fontSize="7">100</text>
                  <line x1="26" y1="67.5" x2="230" y2="67.5" stroke="#1e293b" strokeDasharray="3 3" />
                  <text x="16" y="70" fill="#64748b" fontSize="7">50</text>
                  <line x1="26" y1="91" x2="230" y2="91" stroke="#1e293b" strokeDasharray="3 3" />
                  <text x="16" y="94" fill="#64748b" fontSize="7">25</text>

                  {/* Kurve: 0 to 4 T½ */}
                  <path
                    d="M 30 20 Q 80 67.5 130 91 T 230 110"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />

                  {/* Aktiv prøve markør */}
                  {(() => {
                    const cx = 30 + (halfLivesElapsed / 4) * 160;
                    const cy = 115 - (parentPercent / 100) * 95;
                    return (
                      <g>
                        <line x1={cx} y1="115" x2={cx} y2={cy} stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx={cx} cy={cy} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                        <text x={Math.min(cx + 8, 170)} y={cy - 5} fill="#f59e0b" fontSize="8" fontWeight="bold">
                          {parentPercent}% ({halfLivesElapsed.toFixed(1)} T½)
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 halveringstider (100 %)</span>
                <span>1 T½ (50 %)</span>
                <span>2 T½ (25 %)</span>
                <span>3 T½ (12,5 %)</span>
              </div>
            </ModelPanel>
          </div>
        </div>
      )}
    </ModelFrame>
  );
}
