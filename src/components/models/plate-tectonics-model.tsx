import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

type BoundaryType =
  | "ridge"
  | "subduction_continent"
  | "subduction_island"
  | "collision"
  | "rift"
  | "transform"
  | "hotspot"
  | "paleomag";

export function PlateTectonicsModel() {
  const [boundary, setBoundary] = useState<BoundaryType>("subduction_continent");
  const [activeTransformMode, setActiveTransformMode] = useState<"fault" | "fracture_zone">("fault");
  const [activePolarity, setActivePolarity] = useState<"normal" | "reversed">("normal");
  const [rate, setRate] = useState<number>(6); // cm/år
  const [showQuakes, setShowQuakes] = useState<boolean>(true);
  const [showMelting, setShowMelting] = useState<boolean>(true);
  const [showForces, setShowForces] = useState<boolean>(true);
  const [animating, setAnimating] = useState<boolean>(true);

  // Informasjon om de ulike plategrensene
  const boundaryData = {
    ridge: {
      title: "Midthavsrygg (Divergerende grense)",
      kicker: "Havbunnsspredning & Dekompresjon",
      typicalRate: "2–16 cm/år (f.eks. 2,5 cm/år i Atlanteren, 15 cm/år i Stillehavet)",
      rockTypes: "Basalt (putelava), basaltganger, gabbro, serpentinisert peridotitt",
      quaketype: "Bare grunne jordskjelv (< 20 km dyp), normalforkastninger",
      meltingMechanism: "Dekompresjonssmelting: Mantelen stiger og krysser solidus uten tilførsel av varme.",
      realExample: "Den midtatlantiske ryggen (Island, Jan Mayen), Øst-Stillehavsryggen",
      description:
        "Litosfæreplatene glir fra hverandre. I sprekken synker trykket på den underliggende mantelen. Varm peridotitt stiger opp, og fordi trykket faller raskere enn temperaturen, smelter om lag 10–20 % av mantelen. Den basaltiske smelten stiger og bygger ny havbunnsskorpe.",
    },
    subduction_continent: {
      title: "Subduksjon hav mot kontinent (Konvergerende grense)",
      kicker: "Plateneddykking & flukssmelting",
      typicalRate: "5–10 cm/år (f.eks. Nazcaplaten under Sør-Amerika ~7 cm/år)",
      rockTypes: "Andesitt, dasitt, granodioritt (i dypet), eklogitt (i den synkende slabben)",
      quaketype: "Jordskjelv langs plategrensen. Dybdefordeling eier kapittelet Jordskjelv.",
      meltingMechanism: "Flukssmelting: Vann fra den synkende havbunnen senker smeltepunktet i mantelkilen over.",
      realExample: "Andesfjellene (Sør-Amerika), Kaskadefjellene (USA)",
      description:
        "Tett, kald oseanisk litosfære bøyes ned under den lettere kontinentalskorpen. Hydratiserte mineraler i havbunnen (serpentin m.fl.) presses under enormt trykk og avgir overkritisk vann. Dette vannet stiger inn i den varme mantelkilen over og senker peridotittens smeltepunkt. Magmaen stiger til en eksplosiv vulkanbue.",
    },
    subduction_island: {
      title: "Subduksjon hav mot hav (Konvergerende grense)",
      kicker: "Vulkanøybue & Dyphavsgrop",
      typicalRate: "6–12 cm/år (f.eks. Stillehavsplaten under Filippinerplaten)",
      rockTypes: "Basaltisk andesitt, tefra, vulkanske tuffer, dype pelagiske sedimenter",
      quaketype: "Jordskjelv langs subduksjonsgrensen. Dybde og tsunamifysikk eier kapittelet Jordskjelv.",
      meltingMechanism: "Flukssmelting i mantelkilen under øybuen, med mulig bakbue-spredning.",
      realExample: "Marianene, Japan, Aleutene, De små antiller",
      description:
        "Når to havbunnsplater møtes, er det den eldste, kaldeste og dermed tetteste platen som tvinges ned i mantelen. Foran subduksjonssonen oppstår ekstreme dyphavsgroper (f.eks. Marianegropen, 11 034 m). Magmaen som dannes via flukssmelting stiger opp gjennom havbunnen og bygger buer av vulkanske øyer.",
    },
    collision: {
      title: "Kontinentalkollisjon (Konvergerende grense)",
      kicker: "Orogenese & Skyvedekker",
      typicalRate: "3–5 cm/år (India krasjer inn i Asia med ~4 cm/år)",
      rockTypes: "Gneis, glimmerskifer, amfibolitt, granitt (anatekse), omdannet kalkstein (marmor)",
      quaketype: "Svært ødeleggende grunne og intermediære jordskjelv over et enormt areal",
      meltingMechanism: "Svært begrenset mantel-vulkanisme. Skorpesmelting (anatekse) kan danne granitter.",
      realExample: "Himalaya og Tibet-platået i dag; Kaledonidene i Norge for 400 mill. år siden",
      description:
        "Fordi begge kontinentalplatene har lav tetthet (granittisk, ~2,7 g/cm³), kan ingen av dem subdueres dypt i mantelen. Resultatet er kolossal skorpeforkorting, stabling av gigantiske skyvedekker (nappes), og dannelse av en opptil 70–80 km dyp jordskorperot som flyter isostatisk i mantelen.",
    },
    rift: {
      title: "Kontinental rift (Divergerende grense på land)",
      kicker: "Oppsprekking & Gryende hav",
      typicalRate: "0,5–3 cm/år (Øst-Afrika rifting ~0,5–1 cm/år)",
      rockTypes: "Alkalisk basalt, ryolitt, innsjøsedimenter, evaporitter",
      quaketype: "Hyppige, grunne jordskjelv langs steile forkastninger",
      meltingMechanism: "Dekompresjonssmelting av astenosfære under uttynnet kontinentallitosfære.",
      realExample: "Den østafrikanske riftdalen; Oslofeltet i perm (død paleorift)",
      description:
        "Tektonisk strekk trekker kontinentet fra hverandre. Skorpen sprekker opp langs normale forkastninger, og sentrale blokker synker inn som grabener (innsynkningsdaler). Hvis riftingen fortsetter over millioner av år, flommer havet inn og danner en lineær sjø (som Rødehavet), før det utvikler seg til et fullt verdenshav.",
    },
    transform: {
      title: "Transformforkastning (Konservativ grense)",
      kicker: "Sidelengs glidning & Friksjonslås",
      typicalRate: "3–6 cm/år (San Andreas ~3,5–5 cm/år)",
      rockTypes: "Forkastningsbreksje, mylonitt, oppknust bergart (kataklasitt)",
      quaketype: "Grunne, men ekstremt kraftige jordskjelv når låste forkastningssegmenter brister",
      meltingMechanism: "Ingen aktiv smelting! Skorpe verken lages eller ødelegges.",
      realExample: "San Andreas-forkastningen (California), Jan Mayen-bruddsonen (Norskehavet)",
      description:
        "Platene glir horisontalt forbi hverandre. Fordi det ikke skjer heving eller nedsynking av mantel, forekommer det praktisk talt ingen vulkanisme. Friksjonen mellom bergartene gjør at platene henger seg opp i tiår eller århundrer mens spenning akkumuleres elastisk, inntil forkastningen plutselig slipper i et ødeleggende jordskjelv.",
    },
    hotspot: {
      title: "Hotspot / Mantelplym (Intraplate-vulkanisme)",
      kicker: "Dyp varmestrøm & Vulkankjeder",
      typicalRate: "Platen beveger seg over den stasjonære plymen i 5–10 cm/år",
      rockTypes: "Tholeiittisk basalt, pikritt, alkalisk basalt, peridotitt",
      quaketype: "Vulkanrelaterte småskjelv og harmonisk skjelving under magmaopptrengning",
      meltingMechanism: "Ekstraordinær termisk oppvarming fra kjerne-mantel-grensen (D''-laget).",
      realExample: "Hawaii, Yellowstone, Island (hotspot plassert midt på midthavsrygg)",
      description:
        "En smal søyle av overopphetet bergart (en mantelplym) stiger opp fra kjerne-mantel-grensen (2900 km dyp). Fordi plymen er forankret dypt i mantelen, står den nesten stille mens litosfæreplaten glir sakte forbi over den. Dette brenner en perlerad av vulkaner inn i platen, der alderen øker jevnt i retningen platen beveger seg.",
    },
    paleomag: {
      title: "Paleomagnetisk «båndopptaker» (Vine-Matthews-Morley 1963)",
      kicker: "Geomagnetiske reverseringer & symmetrisk havbunn",
      typicalRate: "Symmetrisk spredning (f.eks. 2,5 cm/år totalt, 1,25 cm/år per plate)",
      rockTypes: "Basalt med magnetittmineraler frosset under Curie-temperaturen (580 °C)",
      quaketype: "Grunne riftdalskjelv i spredningsaksen",
      meltingMechanism: "Dekompresjonssmelting av astenosfæren under spredningsryggen",
      realExample: "Reykjanesryggen sør for Island, Stillehavs-antarktiske rygg",
      description:
        "Når basaltisk magma stiger opp og størkner ved midthavsryggen, orienterer mikroskopiske krystaller av mineralet magnetitt seg parallelt med jordens gjeldende magnetfelt. Når temperaturen synker under 580 °C (Curie-temperaturen), låses magnetiseringen permanent. Fordi jordens magnetfelt reverserer med ujevne mellomrom, danner den symmetriske havbunnsspredningen et speilvendt magnetisk mønster på hver side av ryggaksen – det ugjendrivelige beviset på at havbunnen sprer seg!",
    },
  };

  const current = boundaryData[boundary];

  return (
    <ModelFrame
      kicker="Interaktiv geodynamisk simulator"
      title="Platetektonisk Bevegelses- og Grensemodell"
      lead="Utforsk hvordan platene beveger seg, hvorfor magma oppstår ved dekompresjon og flukssmelting, og hvorfor transformforkastninger skiller seg fra bruddsoner. Seismisitet og ofiolitter eier egne kapitler."
      toolbar={
        <div className="flex flex-wrap gap-1.5">
          <ModelTab active={boundary === "subduction_continent"} onClick={() => setBoundary("subduction_continent")}>
            Subduksjon (Andes)
          </ModelTab>
          <ModelTab active={boundary === "ridge"} onClick={() => setBoundary("ridge")}>
            Midthavsrygg
          </ModelTab>
          <ModelTab active={boundary === "subduction_island"} onClick={() => setBoundary("subduction_island")}>
            Øybue (Marianene)
          </ModelTab>
          <ModelTab active={boundary === "collision"} onClick={() => setBoundary("collision")}>
            Kollisjon (Himalaya)
          </ModelTab>
          <ModelTab active={boundary === "rift"} onClick={() => setBoundary("rift")}>
            Rift (Øst-Afrika/Oslo)
          </ModelTab>
          <ModelTab active={boundary === "transform"} onClick={() => setBoundary("transform")}>
            Transform & Bruddsone
          </ModelTab>
          <ModelTab active={boundary === "hotspot"} onClick={() => setBoundary("hotspot")}>
            Hotspot (Hawaii)
          </ModelTab>
          <ModelTab active={boundary === "paleomag"} onClick={() => setBoundary("paleomag")}>
            Båndopptaker (Paleomag)
          </ModelTab>
        </div>
      }
    >
      <ModelMarkers />

      {/* Kontrollpanel */}
      <div className="mb-6 grid gap-4 rounded-xl border border-border bg-background/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>Relativ platehastighet:</span>
            <span className="text-primary font-mono">{rate} cm/år</span>
          </div>
          <input
            type="range"
            min={1}
            max={16}
            step={1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full accent-primary cursor-pointer"
          />
          <span className="text-[10px] text-muted-foreground">
            {rate <= 3 ? "Treg spredning (Atlanteren)" : rate <= 9 ? "Middels fart (Nazca/Andes)" : "Rask plate (Øst-Stillehavet)"}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-foreground">Visningslag:</span>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={showQuakes ? "default" : "secondary"}
              className="h-7 text-xs"
              onClick={() => setShowQuakes((q) => !q)}
            >
              {showQuakes ? "✓ Jordskjelv (fokus)" : "+ Jordskjelv"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant={showMelting ? "default" : "secondary"}
              className="h-7 text-xs"
              onClick={() => setShowMelting((m) => !m)}
            >
              {showMelting ? "✓ Smeltesoner" : "+ Smeltesoner"}
            </Button>
            {boundary === "paleomag" && (
              <Button
                type="button"
                size="sm"
                variant="default"
                className={`h-7 text-xs font-semibold ${
                  activePolarity === "normal"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                }`}
                onClick={() =>
                  setActivePolarity((p) => (p === "normal" ? "reversed" : "normal"))
                }
              >
                {activePolarity === "normal"
                  ? "Felt: Normal (N) ⇄ Snu"
                  : "Felt: Revers (R) ⇄ Snu"}
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-foreground">Fysiske krefter:</span>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={showForces ? "default" : "secondary"}
              className="h-7 text-xs"
              onClick={() => setShowForces((f) => !f)}
            >
              {showForces ? "✓ Drivkrefter (vektorer)" : "+ Drivkrefter"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant={animating ? "secondary" : "ghost"}
              className="h-7 text-xs"
              onClick={() => setAnimating((a) => !a)}
            >
              {animating ? "⏸ Pause animasjon" : "▶ Start animasjon"}
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-muted/40 p-2.5 text-xs">
          <span className="font-semibold text-primary block">{current.kicker}</span>
          <span className="text-muted-foreground line-clamp-2 mt-0.5">{current.typicalRate}</span>
        </div>
      </div>

      {/* SVG-simulatorkjerne */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-[#0a1118]">
        {/* CSS animasjoner for strømmer og partikler */}
        <style>{`
          @keyframes mantle-flow-left {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -40; }
          }
          @keyframes mantle-flow-right {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 40; }
          }
          @keyframes magma-rise {
            0% { transform: translateY(0px) scale(0.95); opacity: 0.7; }
            50% { transform: translateY(-8px) scale(1.05); opacity: 1; }
            100% { transform: translateY(0px) scale(0.95); opacity: 0.7; }
          }
          @keyframes quake-pulse {
            0% { r: 3; opacity: 0.9; }
            70% { r: 8; opacity: 0; }
            100% { r: 3; opacity: 0.9; }
          }
          .mantle-anim-left {
            animation: mantle-flow-left ${24 / (rate * 0.5)}s linear infinite;
          }
          .mantle-anim-right {
            animation: mantle-flow-right ${24 / (rate * 0.5)}s linear infinite;
          }
          .magma-pulse {
            animation: magma-rise 3s ease-in-out infinite;
          }
          .quake-ring {
            animation: quake-pulse 2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
          }
        `}</style>

        <svg
          viewBox="0 0 920 480"
          className="w-full h-auto select-none"
          role="img"
          aria-label={current.title}
        >
          <defs>
            {/* Bakgrunnsgradient for himmel og overflate */}
            <linearGradient id="pt-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b1622" />
              <stop offset="100%" stopColor="#142638" />
            </linearGradient>

            {/* Havgradient */}
            <linearGradient id="pt-ocean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f2b3e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0a1d2c" stopOpacity="0.95" />
            </linearGradient>

            {/* Astenosfære-gradient */}
            <linearGradient id="pt-astheno" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a2e3b" />
              <stop offset="50%" stopColor="#22201e" />
              <stop offset="100%" stopColor="#321e16" />
            </linearGradient>

            {/* Magmasmelt-glød */}
            <radialGradient id="pt-magma-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff7b24" stopOpacity="1" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
            </radialGradient>

            {/* Flukssmelting vann-dråpe gradient */}
            <radialGradient id="pt-flux-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </radialGradient>

            {/* Pil-markører */}
            <marker id="arrow-slab" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-ridge" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="#f59e0b" />
            </marker>
            <marker id="arrow-magma" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="#ef4444" />
            </marker>
          </defs>

          {/* Himmel overflate */}
          <rect x="0" y="0" width="920" height="150" fill="url(#pt-sky)" />

          {/* Astenosfære bunnlag (150–480) */}
          <rect x="0" y="150" width="920" height="330" fill="url(#pt-astheno)" />

          {/* Dybdeskala til venstre */}
          <g opacity="0.6" className="text-[10px] font-mono" fill="#7ba3be">
            <line x1="38" y1="90" x2="38" y2="460" stroke="#334e68" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="34" y1="90" x2="42" y2="90" stroke="#334e68" strokeWidth="1" />
            <text x="30" y="94" textAnchor="end">0 km</text>
            <line x1="34" y1="150" x2="42" y2="150" stroke="#334e68" strokeWidth="1" />
            <text x="30" y="154" textAnchor="end">50 km</text>
            <line x1="34" y1="230" x2="42" y2="230" stroke="#334e68" strokeWidth="1" />
            <text x="30" y="234" textAnchor="end">150 km</text>
            <line x1="34" y1="350" x2="42" y2="350" stroke="#334e68" strokeWidth="1" />
            <text x="30" y="354" textAnchor="end">350 km</text>
            <line x1="34" y1="450" x2="42" y2="450" stroke="#334e68" strokeWidth="1" />
            <text x="30" y="454" textAnchor="end">670 km</text>
            <text x="25" y="280" textAnchor="middle" transform="rotate(-90 25 280)" fill="#6488a0" fontSize="10">
              DYP (KM)
            </text>
          </g>

          {/* ============================================================ */}
          {/* SCENE 1: SUBDUKSJON HAV MOT KONTINENT                        */}
          {/* ============================================================ */}
          {boundary === "subduction_continent" && (
            <g>
              {/* Havbasseng over havbunn (venstre side) */}
              <polygon points="50,90 440,90 400,125 50,110" fill="url(#pt-ocean)" />
              <text x="180" y="102" fill="#38bdf8" fontSize="11" opacity="0.8">
                Stillehavet / Havvann (ca. 4 km)
              </text>

              {/* Subduksjonssone dyphavsgrop (trench) */}
              <path d="M 370 90 L 405 125 L 435 90" fill="#06121c" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />
              <text x="405" y="82" fill="#38bdf8" fontSize="10.5" fontWeight="600" textAnchor="middle">
                Dyphavsgrop (Trench)
              </text>

              {/* Akkresjonskile (sedimentprisme foran buen) */}
              <polygon points="405,125 460,95 440,90 405,125" fill="#3d493f" stroke="#2c3a30" strokeWidth="1" />
              <text x="435" y="112" fill="#94a3b8" fontSize="9" textAnchor="middle">Kile</text>

              {/* Kontinentalskorpe med Andes-fjellkjede (høyre side) */}
              {/* Fjellprofil på overflaten */}
              <path
                d="M 460 95 L 490 85 L 530 65 L 565 80 L 610 50 L 650 78 L 700 70 L 780 85 L 900 85 L 900 160 L 460 160 Z"
                fill="#4b5d52"
                stroke="#2d3d34"
                strokeWidth="1.5"
              />
              <path d="M 600 50 L 610 40 L 620 50 Z" fill="#ffffff" opacity="0.8" />
              <path d="M 525 65 L 530 58 L 535 65 Z" fill="#ffffff" opacity="0.8" />
              <text x="610" y="32" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">
                Vulkansk bue (Andesfjellene)
              </text>
              <text x="740" y="125" fill="#d1d5db" fontSize="12" fontWeight="600">
                Kontinentalskorpe (granittisk, 40–60 km)
              </text>

              {/* Kontinental litosfærisk stiv mantel under skorpen */}
              <polygon points="460,160 900,160 900,225 510,225" fill="#243742" stroke="#1b2a33" strokeWidth="1" />
              <text x="750" y="195" fill="#94a3b8" fontSize="11" textAnchor="middle">
                Litosfærisk mantel (kald, stiv)
              </text>

              {/* Den subduserende oseaniske platen (litosfære som dykker i ~35-45 graders vinkel) */}
              {/* Oseanisk skorpe (basaltisk øverste lag, 7 km) */}
              <path
                d="M 50 110 L 400 125 L 680 430 L 635 445 L 380 145 L 50 125 Z"
                fill="#2e4238"
                stroke="#1c2d25"
                strokeWidth="1.2"
              />
              {/* Oseanisk litosfærisk mantel under skorpen */}
              <path
                d="M 50 125 L 380 145 L 635 445 L 565 470 L 340 185 L 50 170 Z"
                fill="#1c2f3a"
                stroke="#122028"
                strokeWidth="1.2"
              />
              <text x="210" y="152" fill="#94a3b8" fontSize="11" fontWeight="600">
                Oseanisk litosfære (Nazcaplaten) →
              </text>

              {/* Mantelkilen (wedge) mellom slabben og overliggende kontinent */}
              <polygon points="430,140 510,225 650,400 480,240" fill="#1b2e25" opacity="0.3" />
              <text x="540" y="270" fill="#4ade80" fontSize="11" fontWeight="600" textAnchor="middle">
                Mantelkile (peridotitt)
              </text>

              {/* FLUKSSMELTING: Vannutslipp (dehydrering) og stigende magma */}
              {showMelting && (
                <g>
                  {/* Dehydrering fra slab (blå vanndråper/piler) */}
                  <g opacity="0.9" fill="#38bdf8">
                    <circle cx="500" cy="245" r="3" />
                    <circle cx="530" cy="280" r="3.5" />
                    <circle cx="560" cy="315" r="4" />
                    <circle cx="590" cy="350" r="3.5" />
                    <path d="M 500 240 L 515 210" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                    <path d="M 530 275 L 545 240" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                    <path d="M 560 310 L 575 275" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                    <text x="590" y="325" fill="#38bdf8" fontSize="10.5" fontWeight="600">
                      H₂O frigjøres fra amfibol/serpentin
                    </text>
                  </g>

                  {/* Smeltesone i mantelkilen */}
                  <ellipse cx="560" cy="230" rx="45" ry="25" fill="url(#pt-magma-glow)" className={animating ? "magma-pulse" : ""} />
                  <text x="560" y="234" fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">
                    Flukssmelting (senket solidus)
                  </text>

                  {/* Magmaplier som stiger mot vulkanen */}
                  <path
                    d="M 560 215 C 570 170, 595 120, 610 60"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                    markerEnd="url(#arrow-magma)"
                  />
                  {/* Magmakammer under vulkanen */}
                  <ellipse cx="605" cy="115" rx="22" ry="14" fill="#ef4444" opacity="0.9" />
                  <text x="605" y="119" fill="#fff" fontSize="9" fontWeight="700" textAnchor="middle">
                    Magmakammer
                  </text>
                  {/* Utbrudd/damp fra krateret */}
                  <path d="M 610 40 L 602 18 L 618 15 L 610 40" fill="#f97316" opacity="0.9" />
                  <circle cx="610" cy="12" r="7" fill="#cbd5e1" opacity="0.6" />
                  <circle cx="620" cy="8" r="9" fill="#cbd5e1" opacity="0.4" />
                </g>
              )}

              {/* Jordskjelv langs plategrensen */}
              {showQuakes && (
                <g>
                  <circle cx="410" cy="120" r="4.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="430" cy="135" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="455" cy="155" r="5.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="475" cy="175" r="4.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="510" cy="220" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="540" cy="260" r="5.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <path d="M 410 120 L 540 260" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.45" />
                  <g transform="translate(680, 330)">
                    <rect x="0" y="0" width="200" height="52" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1.2" opacity="0.95" />
                    <text x="10" y="20" fill="#ef4444" fontSize="11" fontWeight="700">Jordskjelv langs slabben</text>
                    <text x="10" y="38" fill="#94a3b8" fontSize="10">Dybdefordeling eier Jordskjelv.</text>
                  </g>
                </g>
              )}

              {/* KRAFTVEKTORER (SLAB PULL & TRENCH SUCTION) */}
              {showForces && (
                <g>
                  {/* Slab pull kraftvektor som trekker platen ned */}
                  <g transform="translate(630, 410)">
                    <line x1="0" y1="0" x2="45" y2="55" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow-slab)" />
                    <text x="50" y="70" fill="#38bdf8" fontSize="12" fontWeight="800">
                      SLAB PULL (~90 % av drivkraften)
                    </text>
                    <text x="50" y="85" fill="#94a3b8" fontSize="10">
                      Tett eklogitt synker under egen vekt
                    </text>
                  </g>
                  {/* Konvergens-pil ved overflaten */}
                  <g transform="translate(180, 80)">
                    <line x1="0" y1="0" x2="60" y2="0" stroke="#38bdf8" strokeWidth="3.5" markerEnd="url(#arrow-slab)" />
                    <text x="30" y="-8" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
                      {rate} cm/år
                    </text>
                  </g>
                </g>
              )}
            </g>
          )}

          {/* ============================================================ */}
          {/* SCENE 2: MIDTHAVSRYGG OG HAVBUNNSSPREDNING                   */}
          {/* ============================================================ */}
          {boundary === "ridge" && (
            <g>
              {/* Havvann */}
              <rect x="50" y="85" width="820" height="75" fill="url(#pt-ocean)" />
              <text x="120" y="105" fill="#38bdf8" fontSize="11" opacity="0.8">
                Atlanterhavet (vannsøyle 2–4 km)
              </text>

              {/* Midthavsrygg tverrsnitt (høyest på midten ved x=460) */}
              {/* Havbunnsskorpe venstre og høyre flanke */}
              <path
                d="M 50 160 L 380 120 L 440 108 L 452 118 L 468 118 L 480 108 L 540 120 L 870 160 L 870 185 L 540 145 L 480 133 L 440 133 L 380 145 L 50 185 Z"
                fill="#2d3d34"
                stroke="#1e2c24"
                strokeWidth="1.5"
              />
              {/* Sentral riftdal i aksen */}
              <text x="460" y="98" fill="#f59e0b" fontSize="11" fontWeight="700" textAnchor="middle">
                Sentral riftdal (rift axis)
              </text>

              {/* Litosfærisk mantel under skorpen (tykner bort fra ryggen med sqrt(alder)) */}
              <path
                d="M 50 185 L 380 145 L 440 133 L 452 138 L 468 138 L 480 133 L 540 145 L 870 185 L 870 280 L 580 210 L 480 160 L 440 160 L 340 210 L 50 280 Z"
                fill="#1b2e38"
                stroke="#122028"
                strokeWidth="1.2"
              />
              <text x="180" y="240" fill="#94a3b8" fontSize="11">
                Litosfæren avkjøles og tykner utover →
              </text>
              <text x="740" y="240" fill="#94a3b8" fontSize="11" textAnchor="end">
                ← Eldre og tyngre havbunn
              </text>

              {/* Varm oppstigende astenosfære i midten */}
              <path
                d="M 380 470 C 420 350, 435 220, 450 138 L 470 138 C 485 220, 500 350, 540 470 Z"
                fill="#361f18"
                opacity="0.85"
              />

              {/* DEKOMPRESJONSSMELTING OG MAGMA */}
              {showMelting && (
                <g>
                  {/* Smeltesone under ryggen */}
                  <ellipse cx="460" cy="170" rx="35" ry="25" fill="url(#pt-magma-glow)" className={animating ? "magma-pulse" : ""} />
                  <text x="460" y="174" fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">
                    Dekompresjonssmelting (10–20 %)
                  </text>
                  <text x="460" y="188" fill="#fed7aa" fontSize="9" textAnchor="middle">
                    Solidus krysses pga. trykkfall
                  </text>

                  {/* Magmatilførsel til overflaten */}
                  <path d="M 460 155 L 460 118" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow-magma)" />

                  {/* Hydrotermale skorsteiner ("Black smokers") i riftdalen */}
                  <g transform="translate(448, 108)">
                    <rect x="0" y="0" width="4" height="9" fill="#475569" />
                    <line x1="2" y1="0" x2="2" y2="-16" stroke="#000" strokeWidth="2.5" opacity="0.8" />
                    <circle cx="2" cy="-18" r="4" fill="#64748b" opacity="0.5" />
                  </g>
                  <g transform="translate(468, 108)">
                    <rect x="0" y="0" width="4" height="9" fill="#475569" />
                    <line x1="2" y1="0" x2="2" y2="-16" stroke="#000" strokeWidth="2.5" opacity="0.8" />
                    <circle cx="2" cy="-18" r="4" fill="#64748b" opacity="0.5" />
                  </g>
                  <text x="515" y="85" fill="#94a3b8" fontSize="9.5">
                    Hydrotermale skorsteiner (350 °C)
                  </text>
                </g>
              )}

              {/* ANIMERTE MANTELKONVEKSJONSSTRØMMER */}
              {animating && (
                <g stroke="#f97316" strokeWidth="2" fill="none" opacity="0.6">
                  <path
                    d="M 440 450 C 440 320, 420 220, 320 220 L 150 240"
                    strokeDasharray="6 6"
                    className="mantle-anim-left"
                  />
                  <path
                    d="M 480 450 C 480 320, 500 220, 600 220 L 770 240"
                    strokeDasharray="6 6"
                    className="mantle-anim-right"
                  />
                </g>
              )}

              {/* JORDSKJELV VED MIDTHAVSRYGG (KUN GRUNNE) */}
              {showQuakes && (
                <g>
                  <circle cx="452" cy="120" r="4.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="460" cy="115" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="468" cy="120" r="4.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="435" cy="130" r="4" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="485" cy="130" r="4" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <text x="460" y="65" fill="#ef4444" fontSize="10.5" fontWeight="600" textAnchor="middle">
                    Bare grunne skjelv (&lt; 15 km dyp) i spredningsaksen!
                  </text>
                </g>
              )}

              {/* KRAFTVEKTORER: RIDGE PUSH */}
              {showForces && (
                <g>
                  {/* Ridge push piler som sklir ned ryggskråningen */}
                  <g transform="translate(360, 130)">
                    <line x1="0" y1="0" x2="-60" y2="16" stroke="#f59e0b" strokeWidth="3.5" markerEnd="url(#arrow-ridge)" />
                    <text x="-30" y="-8" fill="#f59e0b" fontSize="11" fontWeight="700">
                      RIDGE PUSH (gravitasjonsglidning)
                    </text>
                  </g>
                  <g transform="translate(560, 130)">
                    <line x1="0" y1="0" x2="60" y2="16" stroke="#f59e0b" strokeWidth="3.5" markerEnd="url(#arrow-ridge)" />
                    <text x="30" y="-8" fill="#f59e0b" fontSize="11" fontWeight="700">
                      RIDGE PUSH
                    </text>
                  </g>
                  {/* Spredningsrate etikett */}
                  <text x="220" y="145" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
                    ← {rate / 2} cm/år
                  </text>
                  <text x="700" y="145" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
                    {rate / 2} cm/år →
                  </text>
                </g>
              )}
            </g>
          )}

          {/* ============================================================ */}
          {/* SCENE 3: SUBDUKSJON HAV MOT HAV (ØYBUE & DYPHAVSGROP)       */}
          {boundary === "subduction_island" && (
            <g>
              {/* Hav over hele flaten */}
              <rect x="50" y="85" width="820" height="55" fill="url(#pt-ocean)" />
              <text x="120" y="105" fill="#38bdf8" fontSize="11">
                Stillehavet (f.eks. Marianegropen og Filippinerhavet)
              </text>

              {/* Ekstrem dyphavsgrop ved x=390 */}
              <path d="M 330 85 L 390 145 L 430 85" fill="#040b12" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="390" y="75" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
                Dyphavsgrop (~11 000 m, f.eks. Challengerdypet)
              </text>

              {/* Vulkanøy som stikker opp av havet ved x=550 */}
              <path d="M 480 85 L 540 50 L 560 50 L 620 85 Z" fill="#3b4d42" stroke="#25352c" strokeWidth="1.5" />
              <text x="550" y="40" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">
                Vulkanøybue (f.eks. Japan, Marianene)
              </text>

              {/* Subduserende eldre, kaldere havbunn (dykker mot høyre) */}
              <path
                d="M 50 120 L 380 145 L 640 440 L 580 460 L 330 170 L 50 140 Z"
                fill="#1f332a"
                stroke="#12201a"
                strokeWidth="1.5"
              />
              <path
                d="M 50 140 L 330 170 L 580 460 L 500 480 L 280 200 L 50 180 Z"
                fill="#152630"
                stroke="#0e1920"
                strokeWidth="1.2"
              />
              <text x="160" y="165" fill="#94a3b8" fontSize="11" fontWeight="600">
                Eldste og tetteste havbunn synker →
              </text>

              {/* Overliggende yngre havbunnsplate og bakbuebasseng (til høyre) */}
              <path
                d="M 430 120 L 480 85 L 620 85 L 680 120 L 870 120 L 870 160 L 470 160 Z"
                fill="#2c3e34"
                stroke="#1b2a22"
                strokeWidth="1.2"
              />
              <text x="760" y="105" fill="#94a3b8" fontSize="10.5">
                Bakbuebasseng (Back-arc basin)
              </text>

              {/* Flukssmelting under øybuen */}
              {showMelting && (
                <g>
                  <ellipse cx="530" cy="220" rx="35" ry="20" fill="url(#pt-magma-glow)" className={animating ? "magma-pulse" : ""} />
                  <path d="M 535 205 L 550 55" stroke="#ef4444" strokeWidth="3" strokeDasharray="5 3" markerEnd="url(#arrow-magma)" />
                  <text x="530" y="248" fill="#fca5a5" fontSize="10" textAnchor="middle">
                    Flukssmelting i mantelkilen
                  </text>
                </g>
              )}

              {/* Jordskjelv langs plategrensen */}
              {showQuakes && (
                <g>
                  <circle cx="395" cy="145" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="430" cy="180" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="475" cy="235" r="5.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                </g>
              )}
            </g>
          )}

          {/* ============================================================ */}
          {/* SCENE 4: KONTINENTALKOLLISJON (HIMALAYA & KALEDONIDENE)      */}
          {boundary === "collision" && (
            <g>
              {/* Kolossalt fjellmassiv i midten (Himalaya og Tibet-platået) */}
              <path
                d="M 50 110 L 260 110 L 330 65 L 390 40 L 450 30 L 520 45 L 580 55 L 660 110 L 870 110 L 870 170 L 680 230 L 460 260 L 280 230 L 50 170 Z"
                fill="#4b5e52"
                stroke="#2a3a30"
                strokeWidth="1.8"
              />
              {/* Snødekte fjelltinder */}
              <polygon points="440,45 450,30 460,45" fill="#fff" />
              <polygon points="380,52 390,40 400,52" fill="#fff" />
              <polygon points="510,58 520,45 530,58" fill="#fff" />
              <text x="450" y="20" fill="#f8fafc" fontSize="13" fontWeight="800" textAnchor="middle">
                Himalaya (Mt. Everest 8848 moh. / Kaledonidene)
              </text>

              {/* Skyvedekker (nappes) som er overskjøvet langs forkastninger */}
              <path d="M 280 150 C 340 120, 420 85, 480 80" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
              <path d="M 320 180 C 400 150, 490 110, 560 100" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
              <text x="320" y="115" fill="#f59e0b" fontSize="10.5" fontWeight="700">
                Skyvedekker (overskjøvet bergart)
              </text>

              {/* Kjemperot (Moho er presset ned til 70–80 km dyp!) */}
              <path
                d="M 50 170 L 280 230 L 460 260 L 680 230 L 870 170 L 870 210 L 720 270 L 460 310 L 240 270 L 50 210 Z"
                fill="#243740"
                stroke="#15242b"
                strokeWidth="1.2"
              />
              <text x="460" y="290" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
                Skorperot: Moho nedtrykt til ~75 km dyp!
              </text>
              <text x="460" y="306" fill="#94a3b8" fontSize="9.5" textAnchor="middle">
                Isostatisk likevekt: Høye fjell krever dype røtter (som isfjell)
              </text>

              {/* Kollisjonspiler fra begge sider */}
              {showForces && (
                <g>
                  <g transform="translate(140, 95)">
                    <line x1="0" y1="0" x2="60" y2="0" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow-magma)" />
                    <text x="30" y="-8" fill="#ef4444" fontSize="11" fontWeight="700" textAnchor="middle">
                      Indiaplaten ({rate} cm/år)
                    </text>
                  </g>
                  <g transform="translate(780, 95)">
                    <line x1="0" y1="0" x2="-60" y2="0" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow-magma)" />
                    <text x="-30" y="-8" fill="#ef4444" fontSize="11" fontWeight="700" textAnchor="middle">
                      Eurasiske plate
                    </text>
                  </g>
                </g>
              )}

              {/* Jordskjelv over et bredt belte */}
              {showQuakes && (
                <g>
                  <circle cx="310" cy="110" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="360" cy="90" r="6" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="430" cy="75" r="5.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="490" cy="85" r="6" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="560" cy="100" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                  <circle cx="410" cy="160" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
                  <circle cx="480" cy="170" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
                  <text x="460" y="345" fill="#ef4444" fontSize="11" fontWeight="600" textAnchor="middle">
                    Ingen subduksjon = ingen dype mantelskjelv (&gt; 300 km), men voldsomme grunne jordskjelv!
                  </text>
                </g>
              )}
            </g>
          )}

          {/* ============================================================ */}
          {/* SCENE 5: KONTINENTAL RIFT (ØST-AFRIKA / OSLOFELTET)          */}
          {boundary === "rift" && (
            <g>
              {/* Landoverflate med sentral riftdal (graben) */}
              <path
                d="M 50 90 L 320 90 L 370 140 L 530 140 L 580 90 L 870 90 L 870 170 L 590 180 L 520 160 L 380 160 L 310 180 L 50 170 Z"
                fill="#544c3d"
                stroke="#332c20"
                strokeWidth="1.5"
              />
              {/* Steile forkastningsskrenter (horst og graben) */}
              <line x1="320" y1="90" x2="370" y2="140" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="580" y1="90" x2="530" y2="140" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="450" y="125" fill="#f59e0b" fontSize="12" fontWeight="700" textAnchor="middle">
                Graben (Innsunket riftdal)
              </text>
              <text x="220" y="80" fill="#cbd5e1" fontSize="11" fontWeight="600">
                Horst (Riftskulder)
              </text>
              <text x="680" y="80" fill="#cbd5e1" fontSize="11" fontWeight="600">
                Horst (Riftskulder)
              </text>

              {/* Vann/innsjø i bunnen av riftdalen (som Tanganyika/Malawisjøen) */}
              <rect x="400" y="132" width="100" height="8" fill="#0284c7" opacity="0.85" />
              <text x="450" y="152" fill="#38bdf8" fontSize="9.5" textAnchor="middle">
                Riftsjø (f.eks. Tanganyikasjøen)
              </text>

              {/* Manteloppstigning under den tynnede skorpen */}
              <path
                d="M 350 470 C 390 320, 420 220, 440 160 L 460 160 C 480 220, 510 320, 550 470 Z"
                fill="#3a1e16"
                opacity="0.8"
              />

              {/* Dekompresjon og vulkanisme i riftdalen */}
              {showMelting && (
                <g>
                  <ellipse cx="450" cy="200" rx="35" ry="20" fill="url(#pt-magma-glow)" className={animating ? "magma-pulse" : ""} />
                  <path d="M 450 185 L 430 135" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-magma)" />
                  <polygon points="420,135 430,120 440,135" fill="#dc2626" />
                  <text x="450" y="235" fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">
                    Dekompresjon pga. skorpetynning
                  </text>
                  <text x="450" y="250" fill="#fed7aa" fontSize="9" textAnchor="middle">
                    (Oslofeltets vulkaner i perm)
                  </text>
                </g>
              )}

              {/* Strekkpiler */}
              {showForces && (
                <g>
                  <g transform="translate(240, 105)">
                    <line x1="0" y1="0" x2="-50" y2="0" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
                    <text x="-25" y="-8" fill="#f59e0b" fontSize="11" fontWeight="700">Strekk</text>
                  </g>
                  <g transform="translate(660, 105)">
                    <line x1="0" y1="0" x2="50" y2="0" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
                    <text x="25" y="-8" fill="#f59e0b" fontSize="11" fontWeight="700">Strekk</text>
                  </g>
                </g>
              )}
            </g>
          )}

          {/* ============================================================ */}
          {/* SCENE 6: TRANSFORMGRENSE & BRUDDSONE                         */}
          {boundary === "transform" && (
            <g>
              {/* Havbunnsoverflate */}
              <rect x="50" y="30" width="820" height="420" rx="8" fill="#0d1b26" stroke="#1b2a36" />

              <g transform="translate(70, 55)">
                <text x="0" y="0" fill="#f8fafc" fontSize="14" fontWeight="800">
                  Transformforkastning vs. Inaktiv Bruddsone (Fracture Zone)
                </text>
                <text x="0" y="18" fill="#94a3b8" fontSize="11">
                  Hvorfor forekommer jordskjelv KUN mellom midthavsryggsegmentene?
                </text>
              </g>

              {/* Nordlig Midthavsrygg-akse (x=260, y=90 til 220) */}
              <rect x="252" y="90" width="16" height="130" fill="#f59e0b" opacity="0.9" rx="3" />
              <text x="260" y="80" fill="#f59e0b" fontSize="11" fontWeight="700" textAnchor="middle">
                Nordlig Ryggsegment
              </text>
              {/* Spredningspiler for nordlig rygg */}
              <line x1="240" y1="155" x2="160" y2="155" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
              <text x="200" y="145" fill="#38bdf8" fontSize="10" fontWeight="700" textAnchor="middle">Vestover ←</text>
              <line x1="280" y1="155" x2="360" y2="155" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
              <text x="320" y="145" fill="#f59e0b" fontSize="10" fontWeight="700" textAnchor="middle">→ Østover</text>

              {/* Sørlig Midthavsrygg-akse (x=620, y=240 til 370) */}
              <rect x="612" y="240" width="16" height="130" fill="#f59e0b" opacity="0.9" rx="3" />
              <text x="620" y="390" fill="#f59e0b" fontSize="11" fontWeight="700" textAnchor="middle">
                Sørlig Ryggsegment
              </text>
              {/* Spredningspiler for sørlig rygg */}
              <line x1="600" y1="305" x2="520" y2="305" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-slab)" />
              <text x="560" y="295" fill="#38bdf8" fontSize="10" fontWeight="700" textAnchor="middle">Vestover ←</text>
              <line x1="640" y1="305" x2="720" y2="305" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
              <text x="680" y="295" fill="#f59e0b" fontSize="10" fontWeight="700" textAnchor="middle">→ Østover</text>

              {/* Vestre inaktive bruddsone (x=70 til 252 ved y=230) */}
              <line x1="70" y1="230" x2="252" y2="230" stroke="#64748b" strokeWidth="2.5" strokeDasharray="6 4" />
              <rect x="80" y="238" width="160" height="22" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="160" y="253" fill="#94a3b8" fontSize="9.5" fontWeight="600" textAnchor="middle">
                Inaktiv bruddsone (samme retning ← ←)
              </text>

              {/* AKTIV TRANSFORMFORKASTNING (x=268 til 612 ved y=230) */}
              <line x1="268" y1="230" x2="612" y2="230" stroke="#ef4444" strokeWidth="5" />
              <rect x="330" y="205" width="220" height="24" rx="4" fill="#7f1d1d" stroke="#ef4444" />
              <text x="440" y="221" fill="#fff" fontSize="11" fontWeight="800" textAnchor="middle">
                AKTIV TRANSFORMFORKASTNING
              </text>
              <text x="440" y="244" fill="#fca5a5" fontSize="10" fontWeight="700" textAnchor="middle">
                Motsatt bevegelse: Nordside → mot Sørside ← (SEISMISK AKTIV!)
              </text>

              {/* Jordskjelv langs den aktive sonen */}
              {showQuakes && (
                <g>
                  <circle cx="310" cy="230" r="12" fill="#ef4444" opacity="0.4" className={animating ? "quake-ring" : ""} />
                  <circle cx="310" cy="230" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.2" />
                  <circle cx="390" cy="230" r="14" fill="#ef4444" opacity="0.4" className={animating ? "quake-ring" : ""} />
                  <circle cx="390" cy="230" r="6" fill="#ef4444" stroke="#fff" strokeWidth="1.2" />
                  <circle cx="480" cy="230" r="12" fill="#ef4444" opacity="0.4" className={animating ? "quake-ring" : ""} />
                  <circle cx="480" cy="230" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.2" />
                  <circle cx="560" cy="230" r="16" fill="#ef4444" opacity="0.4" className={animating ? "quake-ring" : ""} />
                  <circle cx="560" cy="230" r="6.5" fill="#ef4444" stroke="#fff" strokeWidth="1.2" />
                </g>
              )}

              {/* Østre inaktive bruddsone (x=628 til 850) */}
              <line x1="628" y1="230" x2="850" y2="230" stroke="#64748b" strokeWidth="2.5" strokeDasharray="6 4" />
              <rect x="650" y="202" width="160" height="22" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="730" y="217" fill="#94a3b8" fontSize="9.5" fontWeight="600" textAnchor="middle">
                Inaktiv bruddsone (samme retning → →)
              </text>

              {/* Forklarende infoboks nede i SVG */}
              <rect x="100" y="395" width="720" height="42" rx="6" fill="#0f172a" stroke="#1e293b" />
              <text x="460" y="413" fill="#cbd5e1" fontSize="10.5" textAnchor="middle">
                Utenfor ryggaksene glir begge sider av sprekken i SAMME retning med SAMME fart. Ingen relativ forskyvning = INGEN jordskjelv!
              </text>
              <text x="460" y="427" fill="#f59e0b" fontSize="10" fontWeight="700" textAnchor="middle">
                Kun mellom de to spredningsryggene beveger blokkene seg forbi hverandre: Derfor er transformsonen seismisk aktiv (Jan Mayen-bruddsonen).
              </text>
            </g>
          )}

          {/* ============================================================ */}
          {/* SCENE 7: HOTSPOT / MANTELPLYM (HAWAII)                        */}
          {boundary === "hotspot" && (
            <g>
              {/* Havvann */}
              <rect x="50" y="90" width="820" height="60" fill="url(#pt-ocean)" />
              <text x="100" y="110" fill="#38bdf8" fontSize="11">
                Stillehavet
              </text>

              {/* Oseanisk litosfære som glir mot venstre */}
              <rect x="50" y="150" width="820" height="40" fill="#1b2e25" stroke="#122018" strokeWidth="1.2" />
              <rect x="50" y="190" width="820" height="60" fill="#152630" stroke="#0f1a20" strokeWidth="1" />

              {/* Perlerad av vulkaner over platen (Hawaii-øykjeden) */}
              {/* Aktiv vulkan over plymen (Kilauea/Mauna Loa) ved x=650 */}
              <path d="M 580 150 L 650 70 L 720 150 Z" fill="#3f3b33" stroke="#26241f" strokeWidth="1.5" />
              <path d="M 650 70 L 650 60" stroke="#ef4444" strokeWidth="3" />
              <text x="650" y="55" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle">
                Hawaii (Nå: Aktiv vulkan)
              </text>

              {/* Eldre eroderte vulkanøyer lenger mot venstre (Maui, Oahu, Kauai) */}
              <path d="M 440 150 L 490 95 L 540 150 Z" fill="#333833" stroke="#222522" strokeWidth="1.2" />
              <text x="490" y="85" fill="#cbd5e1" fontSize="10.5" textAnchor="middle">
                Maui (1 mill. år)
              </text>

              <path d="M 310 150 L 350 115 L 390 150 Z" fill="#2d332d" stroke="#1e221e" strokeWidth="1.2" />
              <text x="350" y="105" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                Oahu (3 mill. år)
              </text>

              <path d="M 180 150 L 210 130 L 240 150 Z" fill="#262b26" stroke="#181b18" strokeWidth="1" />
              <text x="210" y="122" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">
                Kauai (5 mill. år)
              </text>

              {/* Sunke undersjøiske guyoter / seamounts */}
              <path d="M 70 150 L 95 145 L 120 150 Z" fill="#1e241e" />
              <text x="95" y="138" fill="#94a3b8" fontSize="9" textAnchor="middle">
                Guyot (30 mill. år)
              </text>

              {/* MANTELPLYM FRA DYPET (STASJONÆR VED x=650) */}
              <path
                d="M 635 480 L 635 240 C 620 200, 600 170, 640 155 L 660 155 C 700 170, 680 200, 665 240 L 665 480 Z"
                fill="#ea580c"
                opacity="0.9"
              />
              <ellipse cx="650" cy="165" rx="35" ry="18" fill="url(#pt-magma-glow)" className={animating ? "magma-pulse" : ""} />
              <text x="650" y="270" fill="#fff" fontSize="11" fontWeight="800" textAnchor="middle">
                MANTELPLYM (Hotspot)
              </text>
              <text x="650" y="285" fill="#fed7aa" fontSize="9.5" textAnchor="middle">
                Forankret dypt ved D''-laget (2900 km)
              </text>

              {/* Platebevegelses-pil mot venstre */}
              <g transform="translate(480, 180)">
                <line x1="60" y1="0" x2="-60" y2="0" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow-slab)" />
                <text x="0" y="-10" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
                  Stillehavsplatens bevegelse ({rate} cm/år) ←
                </text>
              </g>
            </g>
          )}

          {/* ============================================================ */}
          {/* SCENE 8: PALEOMAGNETISK BÅNDOPPTAKER (VINE-MATTHEWS-MORLEY)  */}
          {/* ============================================================ */}
          {boundary === "paleomag" && (
            <g>
              {/* Havvann og havoverflate */}
              <rect x="50" y="55" width="820" height="95" fill="url(#pt-ocean)" />
              <line x1="50" y1="55" x2="870" y2="55" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.4" />
              <text x="60" y="50" fill="#7dd3fc" fontSize="10" fontWeight="600">
                Havoverflate (Atlanterhavet / Stillehavet)
              </text>

              {/* Marin-geofysisk forskningsskip med proton-magnetometer */}
              <g transform="translate(560, 32)">
                <path d="M 0 16 L 10 24 L 55 24 L 62 16 L 45 16 L 45 8 L 35 8 L 35 16 Z" fill="#f8fafc" stroke="#334155" strokeWidth="1" />
                <rect x="22" y="11" width="10" height="5" fill="#38bdf8" />
                <line x1="30" y1="8" x2="30" y2="2" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="70" y="18" fill="#e2e8f0" fontSize="9.5" fontWeight="700">
                  Forskningsskip m/ proton-magnetometer
                </text>
                {/* Slepekabel og magnetometer "fisk" */}
                <path d="M 0 22 C -30 28, -70 38, -100 42" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
                <ellipse cx="-102" cy="43" rx="5" ry="2.5" fill="#f59e0b" />
              </g>

              {/* OSCILLOSKOP / MAGNETOMETER-MÅLING (MÅLT ANOMALI ΔB) */}
              <g transform="translate(60, 68)">
                <rect x="0" y="0" width="800" height="66" rx="6" fill="#071018" stroke="#1e293b" strokeWidth="1.5" />
                <text x="12" y="15" fill="#38bdf8" fontSize="10" fontWeight="800">
                  MARIN MAGNETISK PROFIL (ΔB = Totalt målt magnetfelt − Jordas referansefelt)
                </text>
                <text x="640" y="15" fill="#94a3b8" fontSize="9" textAnchor="end">
                  Symmetrisk om midthavsryggens spredningsakse (x = 0 km)
                </text>

                {/* Null-referanselinje (0 nT) */}
                <line x1="20" y1="38" x2="780" y2="38" stroke="#334155" strokeWidth="1" strokeDasharray="4 3" />
                <text x="784" y="41" fill="#64748b" fontSize="8" fontFamily="monospace">0 nT</text>
                <text x="784" y="24" fill="#38bdf8" fontSize="8" fontFamily="monospace">+400</text>
                <text x="784" y="56" fill="#f43f5e" fontSize="8" fontFamily="monospace">-400</text>

                {/* Magnetisk anomalikurve (symmetrisk speiling) */}
                {/* Midten er ved x = 400 (tilsvarer x = 460 i svg) */}
                <path
                  d={`
                    M 20 38
                    L 40 22 L 65 22 L 85 38
                    L 100 54 L 140 54 L 155 38
                    L 170 24 L 210 24 L 230 38
                    L 245 52 L 280 52 L 290 38
                    L 295 28 L 305 28 L 310 38
                    L 315 52 L 340 52 L 350 38
                    L 370 ${activePolarity === "normal" ? "18" : "58"}
                    L 400 ${activePolarity === "normal" ? "16" : "60"}
                    L 430 ${activePolarity === "normal" ? "18" : "58"}
                    L 450 38 L 460 52 L 485 52 L 490 38
                    L 495 28 L 505 28 L 510 38
                    L 520 52 L 555 52 L 570 38
                    L 590 24 L 630 24 L 645 38
                    L 660 54 L 700 54 L 715 38
                    L 735 22 L 760 22 L 780 38
                  `}
                  fill="none"
                  stroke={activePolarity === "normal" ? "#38bdf8" : "#f43f5e"}
                  strokeWidth="2.2"
                />

                {/* Små etiketter for positiv/negativ anomali */}
                <text x="400" y={activePolarity === "normal" ? "28" : "52"} fill={activePolarity === "normal" ? "#38bdf8" : "#f43f5e"} fontSize="9" fontWeight="800" textAnchor="middle">
                  {activePolarity === "normal" ? "+ΔB Brunhes (Normal)" : "-ΔB (Reversert nydanning)"}
                </text>
                <text x="270" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">-ΔB (Matuyama)</text>
                <text x="530" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">-ΔB (Matuyama)</text>
                <text x="200" y="20" fill="#38bdf8" fontSize="8" textAnchor="middle">+ΔB (Gauss)</text>
                <text x="600" y="20" fill="#38bdf8" fontSize="8" textAnchor="middle">+ΔB (Gauss)</text>
              </g>

              {/* HAVBUNNSSKORPE MED MAGNETISKE STRIPER (BÅNDOPPTAKER) */}
              {/* Spredningssenter ved x = 460. Høyde: y = 145 til y = 210 */}
              <g>
                {/* Brunhes Chron (0 - 0.78 Ma, Normal i dag) */}
                {/* Ytre Brunhes striper */}
                <rect x="410" y="145" width="40" height="65" fill="#1d4ed8" stroke="#172554" strokeWidth="1" />
                <text x="430" y="178" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">↑ N</text>

                {/* Nyeste nydannet basalt i selve spredningsaksen (påvirket av activePolarity) */}
                <rect
                  x="450"
                  y="142"
                  width="20"
                  height="68"
                  fill={activePolarity === "normal" ? "#2563eb" : "#475569"}
                  stroke={activePolarity === "normal" ? "#60a5fa" : "#cbd5e1"}
                  strokeWidth={animating ? 2 : 1}
                  className={animating ? "pulse-border" : ""}
                />
                <text x="460" y="178" fill="#ffffff" fontSize="10" fontWeight="800" textAnchor="middle">
                  {activePolarity === "normal" ? "↑ N" : "↓ S"}
                </text>

                <rect x="470" y="145" width="40" height="65" fill="#1d4ed8" stroke="#172554" strokeWidth="1" />
                <text x="490" y="178" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">↑ N</text>

                {/* Matuyama Chron (0.78 - 2.58 Ma, Reversert) */}
                {/* Venstre side */}
                <rect x="305" y="147" width="105" height="65" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                <text x="330" y="178" fill="#cbd5e1" fontSize="10" fontWeight="700" textAnchor="middle">↓ S</text>
                <text x="390" y="178" fill="#cbd5e1" fontSize="10" fontWeight="700" textAnchor="middle">↓ S</text>
                {/* Jaramillo normal subchron (1.0 Ma) */}
                <rect x="350" y="147" width="15" height="65" fill="#1d4ed8" stroke="#172554" strokeWidth="0.8" />
                <text x="357.5" y="176" fill="#fff" fontSize="7.5" fontWeight="700" textAnchor="middle">↑</text>

                {/* Høyre side */}
                <rect x="510" y="147" width="105" height="65" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                <text x="535" y="178" fill="#cbd5e1" fontSize="10" fontWeight="700" textAnchor="middle">↓ S</text>
                <text x="595" y="178" fill="#cbd5e1" fontSize="10" fontWeight="700" textAnchor="middle">↓ S</text>
                {/* Jaramillo normal subchron (1.0 Ma) */}
                <rect x="555" y="147" width="15" height="65" fill="#1d4ed8" stroke="#172554" strokeWidth="0.8" />
                <text x="562.5" y="176" fill="#fff" fontSize="7.5" fontWeight="700" textAnchor="middle">↑</text>

                {/* Gauss Chron (2.58 - 3.58 Ma, Normal) */}
                {/* Venstre side */}
                <rect x="215" y="150" width="90" height="65" fill="#1d4ed8" stroke="#172554" strokeWidth="1" />
                <text x="260" y="180" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">↑ N</text>

                {/* Høyre side */}
                <rect x="615" y="150" width="90" height="65" fill="#1d4ed8" stroke="#172554" strokeWidth="1" />
                <text x="660" y="180" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">↑ N</text>

                {/* Gilbert Chron (3.58 - 5.3 Ma, Reversert) */}
                {/* Venstre side */}
                <rect x="125" y="153" width="90" height="65" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                <text x="170" y="182" fill="#cbd5e1" fontSize="10" fontWeight="700" textAnchor="middle">↓ S</text>

                {/* Høyre side */}
                <rect x="705" y="153" width="90" height="65" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                <text x="750" y="182" fill="#cbd5e1" fontSize="10" fontWeight="700" textAnchor="middle">↓ S</text>

                {/* Eldre havbunn (> 5.3 Ma) */}
                <rect x="50" y="156" width="75" height="65" fill="#1d4ed8" stroke="#172554" strokeWidth="1" />
                <text x="85" y="184" fill="#ffffff" fontSize="9" fontWeight="600" textAnchor="middle">Kron 5 (N)</text>

                <rect x="795" y="156" width="75" height="65" fill="#1d4ed8" stroke="#172554" strokeWidth="1" />
                <text x="835" y="184" fill="#ffffff" fontSize="9" fontWeight="600" textAnchor="middle">Kron 5 (N)</text>
              </g>

              {/* Tidslinje under havbunnen med million år (Ma) */}
              <g transform="translate(0, 218)">
                <line x1="50" y1="0" x2="870" y2="0" stroke="#475569" strokeWidth="1" />
                {/* Ticks og etiketter */}
                <line x1="460" y1="-3" x2="460" y2="5" stroke="#f59e0b" strokeWidth="2" />
                <text x="460" y="15" fill="#f59e0b" fontSize="9.5" fontWeight="800" textAnchor="middle">0 Ma (Aksen)</text>

                <line x1="410" y1="-3" x2="410" y2="4" stroke="#94a3b8" strokeWidth="1" />
                <line x1="510" y1="-3" x2="510" y2="4" stroke="#94a3b8" strokeWidth="1" />
                <text x="410" y="14" fill="#94a3b8" fontSize="8" textAnchor="middle">0.78 Ma</text>
                <text x="510" y="14" fill="#94a3b8" fontSize="8" textAnchor="middle">0.78 Ma</text>

                <line x1="305" y1="-3" x2="305" y2="4" stroke="#94a3b8" strokeWidth="1" />
                <line x1="615" y1="-3" x2="615" y2="4" stroke="#94a3b8" strokeWidth="1" />
                <text x="305" y="14" fill="#94a3b8" fontSize="8" textAnchor="middle">2.58 Ma</text>
                <text x="615" y="14" fill="#94a3b8" fontSize="8" textAnchor="middle">2.58 Ma</text>

                <line x1="215" y1="-3" x2="215" y2="4" stroke="#94a3b8" strokeWidth="1" />
                <line x1="705" y1="-3" x2="705" y2="4" stroke="#94a3b8" strokeWidth="1" />
                <text x="215" y="14" fill="#94a3b8" fontSize="8" textAnchor="middle">3.58 Ma</text>
                <text x="705" y="14" fill="#94a3b8" fontSize="8" textAnchor="middle">3.58 Ma</text>

                <line x1="125" y1="-3" x2="125" y2="4" stroke="#94a3b8" strokeWidth="1" />
                <line x1="795" y1="-3" x2="795" y2="4" stroke="#94a3b8" strokeWidth="1" />
                <text x="125" y="14" fill="#94a3b8" fontSize="8" textAnchor="middle">5.3 Ma</text>
                <text x="795" y="14" fill="#94a3b8" fontSize="8" textAnchor="middle">5.3 Ma</text>

                <text x="70" y="14" fill="#64748b" fontSize="8" textAnchor="middle">← Eldre skorpe</text>
                <text x="850" y="14" fill="#64748b" fontSize="8" textAnchor="middle">Eldre skorpe →</text>
              </g>

              {/* SPREDNINGSVETORER OG CURIE-TEMPERATUR */}
              {/* Spredningspiler */}
              <g>
                <path d="M 430 135 L 360 135" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
                <text x="395" y="130" fill="#f59e0b" fontSize="9.5" fontWeight="700" textAnchor="middle">
                  {(rate / 2).toFixed(1)} cm/år (vest)
                </text>

                <path d="M 490 135 L 560 135" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-ridge)" />
                <text x="525" y="130" fill="#f59e0b" fontSize="9.5" fontWeight="700" textAnchor="middle">
                  {(rate / 2).toFixed(1)} cm/år (øst)
                </text>
              </g>

              {/* LITOSFÆRISK MANTEL OG CURIE-ISOTERM (580 °C) */}
              <g transform="translate(0, 238)">
                {/* Litosfærisk mantel bunn */}
                <path
                  d="M 50 20 L 400 0 L 440 -10 L 480 -10 L 520 0 L 870 20 L 870 70 L 540 60 L 480 30 L 440 30 L 380 60 L 50 70 Z"
                  fill="#152631"
                  stroke="#1e3a4c"
                  strokeWidth="1"
                />

                {/* Curie-isomet stiplet linje (580 °C) */}
                <path
                  d="M 120 15 C 300 12, 420 -5, 460 -12 C 500 -5, 620 12, 800 15"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.8"
                  strokeDasharray="5 3"
                />
                <text x="460" y="-16" fill="#f87171" fontSize="9.5" fontWeight="800" textAnchor="middle">
                  Curie-isoterm (580 °C) – Magnetittkorn fryses i feltets retning!
                </text>

                {/* Aksialt magmakammer under riften */}
                <ellipse cx="460" cy="40" rx="35" ry="20" fill="url(#pt-magma-glow)" className={animating ? "magma-pulse" : ""} />
                <text x="460" y="44" fill="#ffffff" fontSize="9.5" fontWeight="800" textAnchor="middle">
                  Aksialt magmakammer (1200 °C)
                </text>
                <text x="460" y="55" fill="#fde68a" fontSize="8" textAnchor="middle">
                  Over Curie-punktet: Uordnet/paramagnetisk
                </text>
              </g>

              {/* OPPSUMMERENDE FORKLARINGSBOKSER NEDE I MODELLEN */}
              <g transform="translate(60, 340)">
                <rect x="0" y="0" width="380" height="98" rx="8" fill="#0b1520" stroke="#1e293b" strokeWidth="1.2" />
                <text x="14" y="20" fill="#38bdf8" fontSize="11" fontWeight="800">
                  Vine-Matthews-Morley-hypotesen (1963):
                </text>
                <foreignObject x="14" y="26" width="352" height="66">
                  <p style={{ color: "#cbd5e1", fontSize: "10.5px", lineHeight: "1.45" }}>
                    Fred Vine, Drummond Matthews og Lawrence Morley innså at midthavsryggen fungerer som et gigantisk, tosidig magnetbånd. Når ny basalt strømmer opp og kjøles under <strong>580 °C (Curie-temperaturen)</strong>, blir magnetittkrystallene låst i retning mot datidens magnetiske nordpol (TRM).
                  </p>
                </foreignObject>
              </g>

              <g transform="translate(460, 340)">
                <rect
                  x="0"
                  y="0"
                  width="400"
                  height="98"
                  rx="8"
                  fill="#0b1520"
                  stroke={activePolarity === "normal" ? "#2563eb" : "#f43f5e"}
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="18" r="6" fill={activePolarity === "normal" ? "#2563eb" : "#f43f5e"} />
                <text x="34" y="22" fill="#f8fafc" fontSize="11" fontWeight="800">
                  Aktiv geomagnetisk tilstand: {activePolarity === "normal" ? "Normal polaritet" : "Reversert polaritet"}
                </text>
                <foreignObject x="14" y="28" width="372" height="64">
                  <p style={{ color: "#e2e8f0", fontSize: "10.5px", lineHeight: "1.45" }}>
                    {activePolarity === "normal"
                      ? "Feltet peker mot nord (som i dag). Ny basalt forsterker det lokale magnetfeltet og gir en positiv magnetisk anomali (+ΔB). Brunhes-kronen har vart i 780 000 år."
                      : "Feltet er snudd (polvending)! Magnetisk nord var på sydpolen. Ny basalt motvirker dagens felt og gir en negativ magnetisk anomali (−ΔB) når det måles i dag."}
                    <br />
                    <span style={{ color: "#38bdf8", fontWeight: 700 }}>
                      Bruk «Felt: Normal/Revers ⇄ Snu» i verktøylinjen for å teste en polvending!
                    </span>
                  </p>
                </foreignObject>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Detaljert faktaboks under modellen */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ModelPanel>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Plategrensens fysikk</p>
          <p className="mt-1 text-base font-semibold text-foreground">{current.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{current.description}</p>
        </ModelPanel>

        <ModelPanel>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">Magma & Smelteprosess</p>
          <p className="mt-1 text-sm font-medium text-foreground">{current.meltingMechanism}</p>
          <div className="mt-3 border-t border-border/50 pt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Bergarter som dannes:</span> {current.rockTypes}
          </div>
        </ModelPanel>

        <ModelPanel className="sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-500">Jordskjelv ved grensen</p>
          <p className="mt-1 text-sm text-foreground">{current.quaketype}</p>
          <div className="mt-3 border-t border-border/50 pt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Kjente eksempler:</span> {current.realExample}
          </div>
        </ModelPanel>
      </div>

      <div className="mt-4 space-y-4">
        <ModelNote title="Egne kapitler" tone="teal">
          <p>
            Seismisitet og Wadati-Benioff-sonen ligger i{" "}
            <Link to="/geofag-1/jordskjelv" className="font-medium text-primary underline underline-offset-2">
              Jordskjelv og tsunamier
            </Link>
            . Ofiolittkomplekset på Leka ligger i{" "}
            <Link to="/geofag-1/norges-geologi" className="font-medium text-primary underline underline-offset-2">
              Norges geologiske historie
            </Link>
            .
          </p>
        </ModelNote>
        <ModelNote title="Eksamenstips (LK20 Geofag 1)" tone="warm">
          <p>
            Husk alltid skillet mellom de tre hovedveiene til magma:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1 text-xs">
            <li>
              <strong>Dekompresjonssmelting (midthavsrygg & kontinental rift):</strong> Mantelen stiger, overliggende trykk faller bratt, og peridotitt krysser solidus uten ekstra varme.
            </li>
            <li>
              <strong>Flukssmelting (subduksjonssone):</strong> Vann fra den synkende havbunnsskorpen senker solidus-temperaturen i mantelkilen over platen.
            </li>
            <li>
              <strong>Termisk oppvarming / mantelplym (hotspot):</strong> Ekstraordinær varme fra kjerne-mantel-grensen løfter temperaturen over solidus uavhengig av plategrenser.
            </li>
          </ul>
        </ModelNote>
      </div>
    </ModelFrame>
  );
}
