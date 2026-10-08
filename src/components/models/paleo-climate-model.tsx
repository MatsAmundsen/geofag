import { useState } from "react";
import {
  Clock,
  Droplets,
  Flame,
  Info,
  Layers,
  RotateCcw,
  Snowflake,
  Thermometer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel } from "./model-chrome";

export function PaleoClimateIsotopeModel() {
  type Tab = "isotope_thermometer" | "timescale_explorer" | "proxy_matrix";
  const [tab, setTab] = useState<Tab>("isotope_thermometer");

  // Isotope slider: Temperature anomaly relative to pre-industrial (1850-1900) in °C
  const [tempAnomaly, setTempAnomaly] = useState<number>(-4); // default: Young Dryas / cool period

  // Timescale explorer state
  type TimescaleWindow = "800k" | "20k" | "petm";
  const [timescaleWindow, setTimescaleWindow] = useState<TimescaleWindow>("20k");
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(2); // Young Dryas by default

  // Proxy matrix selection
  type ProxyId = "ice_gas" | "ice_isotopes" | "foram_isotopes" | "varves" | "pollen" | "tree_rings";
  const [selectedProxy, setSelectedProxy] = useState<ProxyId>("ice_isotopes");

  // Calculations for isotope thermometer
  // In ice (precipitation archive): colder = more negative delta18O
  // Greenland empirical: delta18O_ice ≈ -34.8 + 0.67 * tempAnomaly (VSMOW)
  // Antarctic empirical: delta18O_ice ≈ -53.5 + 0.55 * tempAnomaly (VSMOW)
  const d18O_greenland = (-34.8 + 0.67 * tempAnomaly).toFixed(1);
  const d18O_antarctica = (-53.5 + 0.55 * tempAnomaly).toFixed(1);

  // In benthic foraminifera calcite (deep sea archive):
  // 1) Ice volume effect: ~0.011 ‰ per meter of sea level drop (LGM sea level ~ -125 m at dT = -6 °C)
  // 2) Deep ocean temperature effect: ~ -0.22 ‰ per °C warming
  // At dT = 0 (pre-industrial): benthic d18O ≈ +3.2 ‰ (VPDB)
  // At dT = -6 (LGM): sea level drops ~125m (+1.35 ‰) and deep water cools ~2°C (+0.45 ‰) -> d18O ≈ +5.0 ‰
  const seaLevelMeters = Math.min(10, Math.round(tempAnomaly * 20.8)); // meters relative to present
  const d18O_benthic = (3.23 - 0.29 * tempAnomaly).toFixed(2);

  // CO2 proxy estimation based on ice core correlations
  // Ice age: ~185 ppm, Interglacial: ~280 ppm, Present day: 425+ ppm
  let co2EstimatePpm: number;
  if (tempAnomaly < -5.5) {
    co2EstimatePpm = 185;
  } else if (tempAnomaly < 0) {
    co2EstimatePpm = Math.round(185 + ((tempAnomaly + 6) / 6) * 95);
  } else if (tempAnomaly <= 1.5) {
    co2EstimatePpm = Math.round(280 + (tempAnomaly / 1.5) * 145);
  } else {
    co2EstimatePpm = Math.round(425 + (tempAnomaly - 1.5) * 200);
  }

  // Preset buttons
  const applyPreset = (t: number) => {
    setTempAnomaly(t);
  };

  // Timeline events for the 20k window
  const timeline20k = [
    {
      age: "21 000 år før nå",
      name: "Siste istidsmaksimum (LGM)",
      dt: -6.5,
      co2: 185,
      d18O_ice: -42.5,
      d18O_sea: +5.1,
      seaLevel: -125,
      desc: "Skandinavia og Nord-Amerika dekket av 3 km tykk is. Havnivået var 125 meter lavere, og Nordsjøen var tørt land (Nordsjøfastlandet / Doggerland).",
    },
    {
      age: "14 500 år før nå",
      name: "Bølling-Allerød varmeperiode",
      dt: -1.5,
      co2: 240,
      d18O_ice: -36.2,
      d18O_sea: +4.2,
      seaLevel: -80,
      desc: "Rask smelting av isdekket. Bjørk og reinrose etablerte seg langs kysten av Norge. Smeltevannet begynte å fylle forsenkninger.",
    },
    {
      age: "12 800–11 700 år før nå",
      name: "Yngre Dryas (kuldehopp)",
      dt: -4.5,
      co2: 235,
      d18O_ice: -40.1,
      d18O_sea: +4.8,
      seaLevel: -65,
      desc: "Lake Agassiz tømte enorme ferskvannsmasser i Nord-Atlanteren. AMOC bremset opp. Temperaturen stupte 8–10 °C i Norge på få tiår, og isbreene rykket fram til Raet.",
    },
    {
      age: "8 200 år før nå",
      name: "8,2 ka-kuldehendelsen",
      dt: -1.8,
      co2: 260,
      d18O_ice: -36.8,
      d18O_sea: +3.7,
      seaLevel: -15,
      desc: "Siste rest av bresjøene i Nord-Amerika tømte seg. Rask, men kortvarig kuldeperiode registrert i Grønlandsisen og norske innsjøsedimenter.",
    },
    {
      age: "7 000–5 000 år før nå",
      name: "Holocens klimaoptimum",
      dt: +1.2,
      co2: 275,
      d18O_ice: -33.9,
      d18O_sea: +3.2,
      seaLevel: 0,
      desc: "Jordens aksehelning ga sterk sommersol på 65 °N. Varmekjære løvtrær (alm, lind, eik) vokste høyt til fjells i Norge, og Hardangerjøkulen var nesten smeltet bort.",
    },
    {
      age: "1400–1850 e.Kr.",
      name: "Den lille istid (LIA)",
      dt: -0.8,
      co2: 280,
      d18O_ice: -35.5,
      d18O_sea: +3.4,
      seaLevel: 0,
      desc: "Svakere solinnstråling og vulkanutbrudd ga kalde somre. Norske isbreer rykket fram til sine historiske maksimum (Nigardsbreen knuste gårder i 1743).",
    },
    {
      age: "1850–i dag",
      name: "Moderne industriell oppvarming",
      dt: +1.3,
      co2: 425,
      d18O_ice: -33.8,
      d18O_sea: +3.1,
      seaLevel: +0.2,
      desc: "Menneskeskapt $CO_2$ har steget fra 280 til over 425 ppm på 170 år. Oppvarmingsfarten overgår alle naturlige svingninger de siste 2000 årene.",
    },
  ];

  // 800k Milankovitch cycles milestones
  const timeline800k = [
    {
      mis: "MIS 1 (Holocen, nå)",
      age: "0–11,7 ka",
      co2: "280 → 425 ppm",
      temp: "+0 °C til +1,3 °C",
      state: "Mellomistid",
      desc: "Dagens mellomistid med stabilt havnivå og framvekst av jordbruk og sivilisasjon.",
    },
    {
      mis: "MIS 2 (Weichsel LGM)",
      age: "18–24 ka",
      co2: "185 ppm",
      temp: "-6 °C til -8 °C",
      state: "Maksimal istid",
      desc: "Maksimalt isdekke over Skandinavia og Nord-Amerika. Havnivå -125 meter.",
    },
    {
      mis: "MIS 5e (Eem-mellomistiden)",
      age: "115–130 ka",
      co2: "290 ppm",
      temp: "+1,5 °C til +2,5 °C",
      state: "Varm mellomistid",
      desc: "Arktis var delvis isfritt om sommeren, Grønlandsisen krympet, havnivået var 4–6 meter høyere enn i dag.",
    },
    {
      mis: "MIS 6 (Saale-istiden)",
      age: "135–190 ka",
      co2: "190 ppm",
      temp: "-7 °C",
      state: "Svært streng istid",
      desc: "Massivt isdekke som strakte seg helt ned til Berlin og Moskva.",
    },
    {
      mis: "MIS 11 (Holstein)",
      age: "390–425 ka",
      co2: "285 ppm",
      temp: "+1,0 °C",
      state: "Langvarig mellomistid",
      desc: "En uvanlig lang og stabil mellomistid med svak eksentrisitet, en viktig analogi til Holocens fremtid uten menneskeskapte pådriv.",
    },
    {
      mis: "MIS 19 (Matuyama-Brunhes)",
      age: "760–790 ka",
      co2: "260 ppm",
      temp: "Mellomistid",
      state: "Magnetisk polreversering",
      desc: "Jordens magnetfelt reverserte polaritet (Brunhes/Matuyama-grensen), synkronisert med sediment- og iskjernedatering.",
    },
  ];

  const proxyCatalog = {
    ice_gas: {
      name: "Luftbobler i iskjerner (CO₂, CH₄, N₂O)",
      category: "Kryosfære · Direkte gassprøve",
      archive: "Innlandsisen i Antarktis (EPICA, Vostok) og Grønland (NGRIP)",
      span: "Opptil 800 000 år i Antarktis (123 000 år på Grønland)",
      resolution: "Måneder til tiår i toppen; århundrer i dybden",
      isDirect: true,
      whatItMeasures:
        "Faktisk atmosfærisk sammensetning. Dette er IKKE en proxy, men en fysisk innelukket gassprøve som måles direkte med massespektrometri og lasergasskromatografi.",
      limitation:
        "Gassalder (Δage): Snøen komprimeres langsomt over 50–100 meter før porene forsegles hermetisk. Gassen i boblene er derfor 500 til 5000 år yngre enn den omkringliggende isen.",
      examPoint:
        "Eksamen krever at du skiller mellom gassen (direkte måling av atmosfæren) og selve isen (isotop-proxy for vanntemperatur da snøen falt).",
    },
    ice_isotopes: {
      name: "Oksygenisotoper (δ¹⁸O) og Deuterium (δD) i is",
      category: "Kryosfære · Termometer",
      archive: "Brevannmolekyler (H₂¹⁶O, H₂¹⁸O, HD¹⁶O)",
      span: "Opptil 800 000 år (Antarktis)",
      resolution: "Årlig lagvis telling i øvre halvdel; tiårsgjennomsnitt nederst",
      isDirect: false,
      whatItMeasures:
        "Lokal kondensasjonstemperatur da snøen falt over breen. Jo kaldere klima, desto mer negativ blir δ¹⁸O (Rayleigh-fraksjonering).",
      limitation:
        "Avhenger også av fuktighetskildens beliggenhet, fordampningstemperatur i subtropene og sesongfordeling av snøfall.",
      examPoint:
        "Husk regelen: I iskjernen betyr LAV (sterkt negativ) δ¹⁸O KALDT KLIMA (istid).",
    },
    foram_isotopes: {
      name: "Bentiske foraminiferer (δ¹⁸O i CaCO₃-kalkskall)",
      category: "Havsedimenter · Globalt isvolum",
      archive: "Dyphavssedimenter (borekjerner fra IODP / ODP)",
      span: "Titusenvis til over 100 millioner år",
      resolution: "Århundrer til tusenår (begrenset av sedimentasjonsrate og bioturbasjon)",
      isDirect: false,
      whatItMeasures:
        "Kombinasjon av globalt kontinentalt isvolum (havets isotopsammensetning) og bunnvannstemperatur da kalsittskallet krystalliserte.",
      limitation:
        "Bioturbasjon (ormer og krepsdyr som rører rundt i havbunnen) visker ut brå hopp på under 500–1000 år. Krever artsspesifikk plukking (f.eks. Cibicidoides wuellerstorfi).",
      examPoint:
        "SPEILVENDING: I havbunnen betyr HØY (positiv) δ¹⁸O MYE IS PÅ LAND (istid) fordi lett ¹⁶O er låst inne i innlandsisen!",
    },
    varves: {
      name: "Innsjøvarver (lagdelte årssedimenter)",
      category: "Lakustrine sedimenter · Årssedimenter",
      archive: "Brevannspåvirkede innsjøer og dype fjorder",
      span: "Opptil 15 000–20 000 år",
      resolution: "Nøyaktig 1 år (som årringer)",
      isDirect: false,
      whatItMeasures:
        "Bremengde og erosjonsintensitet. Lyst, mineralrikt lag avsettes under vårens voldsomme smeltevannsflom; mørkt, organisk slam avsettes sakte under vinterisen.",
      limitation:
        "Krever oksygenfattig bunnvann uten gravende bunndyr som forstyrrer lagene. Erosjonshendelser kan noen ganger avsette doble flomlag i ett og samme år.",
      examPoint:
        "Brukes til å gi presis absolutt kalibrering for C-14 dateringskurver og fange raske klimarykk som Yngre Dryas.",
    },
    pollen: {
      name: "Pollenanalyse (Palynologi)",
      category: "Biologiske arkiver · Vegetasjonshistorie",
      archive: "Oksygenfattige torvmyrer, myrhull og innsjøbunn",
      span: "Holocen og senglasial tid (15 000 år i Norge)",
      resolution: "50–200 år avhengig av torvvekst",
      isDirect: false,
      whatItMeasures:
        "Vegetasjonstype og sommerens middeltemperatur. Pollenkorn har skall av sporopollenin, naturens mest motstandsdyktige organiske polymer.",
      limitation:
        "Planter produserer svært ulike mengder pollen (furu produserer enorme mengder vindspredt pollen, mens urter produserer lite). Innvandringsforsinkelser (treslag må spre seg geografisk).",
      examPoint:
        "Lennart von Post (1916). Norges suksesjon: Reinrose (Dryas) → Bjørk/furu → Edelløvskog (varmetid) → Gran (innvandret østfra for ca. 1500–2500 år siden).",
    },
    tree_rings: {
      name: "Dendrokronologi (Årringer i trær)",
      category: "Biologiske arkiver · Årlig temperatur/nedbør",
      archive: "Fossil furu i myrer (subfossilt tømmer), gamle furuer og eik",
      span: "Kontinuerlige kurver dekker de siste 12 000–14 000 årene",
      resolution: "Eksakt 1 år (sesong: tidligved vs. seinved)",
      isDirect: false,
      whatItMeasures:
        "Vekstsesongens sommertemperatur (ved den alpine eller polare tregrensen) eller tørkestress/nedbør (i tørre strøk). Densitometri måler vedtetthet.",
      limitation:
        "Gjelder bare landområder med trær. Trær har en biologisk alderskurve som må fjernes matematisk (detrending).",
      examPoint:
        "Kryssdatering (overlapping av mønstre fra levende trær, historiske laftehus og myrtømmer) gir den mest presise dateringen i paleoklima.",
    },
  };

  return (
    <ModelFrame
      kicker="Interaktiv paleoklimatisk simulator"
      title="Tidsskalaer, klimaproxyer og isotop-termometer"
      lead="Hvordan kan vi vite hva temperaturen var for 20 000 eller 800 000 år siden? Eksperimenter med oksygenisotopen δ¹⁸O, utforsk istidskronologien og sammenlign naturens arkiver."
      toolbar={
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            size="sm"
            variant={tab === "isotope_thermometer" ? "default" : "secondary"}
            onClick={() => setTab("isotope_thermometer")}
            className="text-xs"
          >
            <Thermometer className="mr-1.5 size-3.5" />
            δ¹⁸O-termometer
          </Button>
          <Button
            size="sm"
            variant={tab === "timescale_explorer" ? "default" : "secondary"}
            onClick={() => setTab("timescale_explorer")}
            className="text-xs"
          >
            <Clock className="mr-1.5 size-3.5" />
            Tidsskalavelger
          </Button>
          <Button
            size="sm"
            variant={tab === "proxy_matrix" ? "default" : "secondary"}
            onClick={() => setTab("proxy_matrix")}
            className="text-xs"
          >
            <Layers className="mr-1.5 size-3.5" />
            Proxy-matrisen
          </Button>
        </div>
      }
    >
      <ModelMarkers />

      {/* ================= TAB 1: ISOTOPE THERMOMETER ================= */}
      {tab === "isotope_thermometer" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Column: Sliders & Controls */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <ModelPanel className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">
                      Global temperaturavvik (ΔT relativt til 1850):
                    </span>
                    <span
                      className={`font-mono text-sm font-bold ${
                        tempAnomaly < 0
                          ? "text-sky-400"
                          : tempAnomaly === 0
                            ? "text-emerald-400"
                            : "text-amber-400"
                      }`}
                    >
                      {tempAnomaly > 0 ? `+${tempAnomaly.toFixed(1)}` : tempAnomaly.toFixed(1)} °C
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-8}
                    max={6}
                    step={0.5}
                    value={tempAnomaly}
                    onChange={(e) => setTempAnomaly(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                    aria-label="Temperaturavvik i grader celsius"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>-8 °C (Dyp istid)</span>
                    <span>0 °C (1850)</span>
                    <span>+6 °C (PETM / superdrivhus)</span>
                  </div>
                </div>

                {/* Preset quick buttons */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Hopp til historiske klimamilepæler:
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-xs h-7 px-2"
                      onClick={() => applyPreset(-6.5)}
                    >
                      <Snowflake className="mr-1 size-3 text-sky-400" />
                      LGM (-6,5 °C)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-xs h-7 px-2"
                      onClick={() => applyPreset(-4.5)}
                    >
                      Yngre Dryas (-4,5 °C)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-xs h-7 px-2"
                      onClick={() => applyPreset(0)}
                    >
                      1850 (0,0 °C)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-xs h-7 px-2"
                      onClick={() => applyPreset(1.2)}
                    >
                      Holocen (+1,2 °C)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-xs h-7 px-2"
                      onClick={() => applyPreset(1.3)}
                    >
                      I dag (+1,3 °C)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="text-xs h-7 px-2"
                      onClick={() => applyPreset(6.0)}
                    >
                      <Flame className="mr-1 size-3 text-rose-400" />
                      PETM (+6,0 °C)
                    </Button>
                  </div>
                </div>

                {/* Calculated Values Summary */}
                <div className="space-y-2 rounded-xl border border-border/80 bg-card/60 p-3 text-xs">
                  <div className="flex justify-between items-center pb-1.5 border-b border-border/60">
                    <span className="text-muted-foreground">Beregnet atmosfærisk CO₂:</span>
                    <span className="font-mono font-bold text-foreground">
                      ~{co2EstimatePpm} ppm
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-1.5 border-b border-border/60">
                    <span className="text-muted-foreground">Globalt havnivå (isvolum):</span>
                    <span
                      className={`font-mono font-bold ${
                        seaLevelMeters < 0 ? "text-sky-400" : "text-amber-400"
                      }`}
                    >
                      {seaLevelMeters > 0 ? `+${seaLevelMeters}` : seaLevelMeters} m
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Rayleigh-utarming:</span>
                    <span className="font-semibold text-primary">
                      {tempAnomaly < -3 ? "Ekstremt sterk" : tempAnomaly < 0 ? "Moderat" : "Svak"}
                    </span>
                  </div>
                </div>
              </ModelPanel>

              <ModelNote
                title="Eksamensregel: Hvorfor er kurvene speilvendt?"
                tone="warm"
              >
                <p>
                  Vannmolekylet med lett oksygen (H₂¹⁶O) fordamper lettere fra havene enn tungt
                  (H₂¹⁸O). Under en istid blir store mengder lett H₂¹⁶O lagret på land som
                  kilometertykk is.
                </p>
                <p>
                  <strong>Resultat:</strong> Resthavet og foraminiferenes skall blir beriket med
                  tungt ¹⁸O (høy δ¹⁸O). Samtidig mister skyene nesten alt tungt ¹⁸O før de når
                  polene, slik at isen får svært lav δ¹⁸O!
                </p>
              </ModelNote>
            </div>

            {/* Right Column: Side-by-side Isotope Comparison Visualizer */}
            <div className="flex flex-col gap-4 lg:col-span-7">
              <ModelPanel className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-base font-medium tracking-tight text-foreground">
                    Isotopspeilet: Iskjerne vs. Havbunnssediment
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    Enhet: ‰ (promille avvik fra VSMOW / VPDB)
                  </span>
                </div>

                {/* SVG Visualizer */}
                <div className="relative overflow-hidden rounded-xl border border-border/70 bg-[#07131e] p-3">
                  <svg viewBox="0 0 600 320" className="w-full h-auto select-none" aria-label="Isotoptermometer diagram">
                    {/* Bakgrunnsrutenett */}
                    <line x1="50" y1="40" x2="550" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="50" y1="160" x2="550" y2="160" stroke="#334155" strokeWidth="1.2" />
                    <line x1="50" y1="280" x2="550" y2="280" stroke="#1e293b" strokeDasharray="3 3" />

                    {/* SØYLE 1: ISKJERNE (Nedbørsarkiv på polene) */}
                    <g transform="translate(110, 30)">
                      <rect x="0" y="0" width="160" height="240" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="80" y="24" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">
                        1. ISKJERNE (Is)
                      </text>
                      <text x="80" y="38" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Nedbørsarkiv (Grønland/Antarktis)
                      </text>

                      {/* Termometersøyle i is */}
                      <rect x="30" y="55" width="22" height="150" rx="11" fill="#1e293b" />
                      {/* Fill inside thermometer: higher temp = less negative = rises higher */}
                      {/* Min -8 C -> height 20; Max +6 C -> height 140 */}
                      {(() => {
                        const h = Math.max(15, Math.min(145, 65 + (tempAnomaly + 4) * 8));
                        const y = 205 - h;
                        return (
                          <rect
                            x="32"
                            y={y}
                            width="18"
                            height={h}
                            rx="9"
                            fill="url(#iceGrad)"
                          />
                        );
                      })()}

                      {/* Verdi-etikett */}
                      <text x="65" y="85" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                        δ¹⁸O (Grønland):
                      </text>
                      <text x="65" y="105" fill="#38bdf8" fontSize="16" fontWeight="bold" fontFamily="monospace">
                        {d18O_greenland} ‰
                      </text>

                      <text x="65" y="135" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                        δ¹⁸O (Dome C):
                      </text>
                      <text x="65" y="153" fill="#7dd3fc" fontSize="15" fontWeight="bold" fontFamily="monospace">
                        {d18O_antarctica} ‰
                      </text>

                      {/* Tolkning under */}
                      <rect x="15" y="178" width="130" height="48" rx="6" fill="#1e293b" opacity="0.8" />
                      <text x="80" y="196" textAnchor="middle" fill={tempAnomaly < 0 ? "#7dd3fc" : "#fbbf24"} fontSize="11" fontWeight="bold">
                        {tempAnomaly < -2 ? "Kald istidsnedbør" : tempAnomaly < 1 ? "Mellomistidsnedbør" : "Varmt drivhusregn"}
                      </text>
                      <text x="80" y="214" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        {tempAnomaly < 0 ? "Kraftig utarmet på ¹⁸O" : "Mindre fraksjonert"}
                      </text>
                    </g>

                    {/* SØYLE 2: HAVBUNNSSEDIMENTER (Bentiske foraminiferer) */}
                    <g transform="translate(330, 30)">
                      <rect x="0" y="0" width="160" height="240" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="80" y="24" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">
                        2. HAVBUNN (Kalkskall)
                      </text>
                      <text x="80" y="38" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Bentiske foraminiferer (Dypvann)
                      </text>

                      {/* Termometersøyle i kalkskall (SPEILVENDT: colder = higher d18O = rises higher!) */}
                      <rect x="30" y="55" width="22" height="150" rx="11" fill="#1e293b" />
                      {(() => {
                        // Cold -> d18O up to 5.0 -> height 140
                        // Warm -> d18O down to 2.5 -> height 30
                        const h = Math.max(15, Math.min(145, 85 - tempAnomaly * 10));
                        const y = 205 - h;
                        return (
                          <rect
                            x="32"
                            y={y}
                            width="18"
                            height={h}
                            rx="9"
                            fill="url(#benthicGrad)"
                          />
                        );
                      })()}

                      {/* Verdi-etikett */}
                      <text x="65" y="85" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                        δ¹⁸O (kalsitt):
                      </text>
                      <text x="65" y="105" fill="#fbbf24" fontSize="16" fontWeight="bold" fontFamily="monospace">
                        +{d18O_benthic} ‰
                      </text>

                      <text x="65" y="135" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                        Isvolum på land:
                      </text>
                      <text x="65" y="153" fill={seaLevelMeters < -50 ? "#38bdf8" : "#fcd34d"} fontSize="14" fontWeight="bold">
                        {seaLevelMeters < -50 ? "Enorme innlandsiser" : seaLevelMeters < 0 ? "Middels breer" : "Smeltet isdekke"}
                      </text>

                      {/* Tolkning under */}
                      <rect x="15" y="178" width="130" height="48" rx="6" fill="#1e293b" opacity="0.8" />
                      <text x="80" y="196" textAnchor="middle" fill={tempAnomaly < 0 ? "#38bdf8" : "#fbbf24"} fontSize="11" fontWeight="bold">
                        {tempAnomaly < -2 ? "HØY δ¹⁸O = Istid!" : tempAnomaly < 1 ? "Middels δ¹⁸O = Mellomistid" : "LAV δ¹⁸O = Lite is på land"}
                      </text>
                      <text x="80" y="214" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Havet anrikes på tungt ¹⁸O
                      </text>
                    </g>

                    {/* Defs for gradients */}
                    <defs>
                      <linearGradient id="iceGrad" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#0284c7" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                      <linearGradient id="benthicGrad" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#b45309" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                    </defs>

                    {/* Piler og pedagogisk tekst mellom søylene */}
                    <path d="M 280 120 L 320 120" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arr-teal)" />
                    <text x="300" y="105" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">
                      SPEILVENDT
                    </text>
                  </svg>
                </div>

                {/* Forklaring av Rayleigh-fraksjonering */}
                <div className="rounded-xl border border-border/80 bg-card p-3 text-xs leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Fysisk mekanisme (Rayleigh-fraksjonering):</strong>{" "}
                  Når fuktighet fordamper ved ekvator (ca. 25 °C), fordamper det lette vannet (H₂¹⁶O) raskest. Skyen
                  starter med ca. -10 ‰ δ¹⁸O. På vei mot polene kjøles luften ned og kondenserer. Det tunge vannet
                  (H₂¹⁸O) regner ut først. Jo lenger og kaldere reisen er mot Grønland eller Antarktis, desto mer
                  utarmet blir skyen — ved -40 °C på polplatået er nedbøren tappet ned til mellom -35 ‰ og -55 ‰!
                </div>
              </ModelPanel>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: TIMESCALE EXPLORER ================= */}
      {tab === "timescale_explorer" && (
        <div className="space-y-6">
          <ModelPanel className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-3">
              <div>
                <h4 className="font-display text-base font-medium text-foreground">
                  Tidsskalavelger: Fra dyp tid til menneskeskapt oppvarming
                </h4>
                <p className="text-xs text-muted-foreground">
                  Velg geologisk tidsvindu for å undersøke hendelser og arkivenes datering.
                </p>
              </div>

              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant={timescaleWindow === "20k" ? "default" : "secondary"}
                  onClick={() => setTimescaleWindow("20k")}
                  className="text-xs"
                >
                  Siste 20 000 år (Holocen)
                </Button>
                <Button
                  size="sm"
                  variant={timescaleWindow === "800k" ? "default" : "secondary"}
                  onClick={() => setTimescaleWindow("800k")}
                  className="text-xs"
                >
                  Siste 800 000 år (EPICA)
                </Button>
                <Button
                  size="sm"
                  variant={timescaleWindow === "petm" ? "default" : "secondary"}
                  onClick={() => setTimescaleWindow("petm")}
                  className="text-xs"
                >
                  56 mill. år (PETM)
                </Button>
              </div>
            </div>

            {/* Window 1: 20k years (Deglaciation to modern) */}
            {timescaleWindow === "20k" && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  De siste 20 000 årene spenner fra maksimal istid (LGM) via brå terskelhopp
                  (Yngre Dryas) til det usedvanlig stabile Holocen og dagens industrielle oppvarming.
                </p>

                {/* Interactive timeline selector */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                  {timeline20k.map((item, idx) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setSelectedPointIndex(idx)}
                      className={`flex flex-col items-start rounded-lg border p-2 text-left transition-all ${
                        selectedPointIndex === idx
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border/60 bg-card/60 hover:bg-card"
                      }`}
                    >
                      <span className="text-[10px] font-semibold text-primary">{item.age}</span>
                      <span className="mt-1 line-clamp-2 text-xs font-medium text-foreground">
                        {item.name}
                      </span>
                      <span
                        className={`mt-1 font-mono text-[11px] ${
                          item.dt < 0 ? "text-sky-400" : "text-amber-400"
                        }`}
                      >
                        {item.dt > 0 ? `+${item.dt}` : item.dt} °C
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected event detail card */}
                {(() => {
                  const ev = timeline20k[selectedPointIndex];
                  return (
                    <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-primary/20 pb-2">
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            {ev.age}
                          </span>
                          <h5 className="font-display text-lg font-medium text-foreground">
                            {ev.name}
                          </h5>
                        </div>
                        <div className="flex gap-3 text-xs">
                          <span className="rounded bg-card/80 px-2 py-1 border border-border">
                            Global ΔT: <strong>{ev.dt > 0 ? `+${ev.dt}` : ev.dt} °C</strong>
                          </span>
                          <span className="rounded bg-card/80 px-2 py-1 border border-border">
                            CO₂: <strong>{ev.co2} ppm</strong>
                          </span>
                          <span className="rounded bg-card/80 px-2 py-1 border border-border">
                            Havnivå: <strong>{ev.seaLevel > 0 ? `+${ev.seaLevel}` : ev.seaLevel} m</strong>
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                        {ev.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground pt-1">
                        <div className="rounded-lg bg-card/60 p-2.5 border border-border/60">
                          <strong className="text-foreground">Iskjerne-avtrykk:</strong> δ¹⁸O i is
                          var ca. <span className="font-mono text-sky-400 font-bold">{ev.d18O_ice} ‰</span>.
                        </div>
                        <div className="rounded-lg bg-card/60 p-2.5 border border-border/60">
                          <strong className="text-foreground">Havbunns-avtrykk:</strong> Bentisk δ¹⁸O
                          var ca. <span className="font-mono text-amber-400 font-bold">+{ev.d18O_sea} ‰</span>.
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Window 2: 800k years (EPICA Milankovitch cycles) */}
            {timescaleWindow === "800k" && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  EPICA Dome C-kjernen i Antarktis boret 3270 meter ned i isen og avdekket 8
                  fullstendige istidssykluser over 800 000 år. Hver syklus varer ca. 100 000 år,
                  styrt av eksentrisiteten i jordbanen.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {timeline800k.map((m) => (
                    <div
                      key={m.mis}
                      className="rounded-xl border border-border bg-card/70 p-3.5 space-y-2 text-xs"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-primary">{m.mis}</span>
                          <p className="text-[11px] text-muted-foreground">{m.age}</p>
                        </div>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                            m.state.includes("istid") && !m.state.includes("Mellom")
                              ? "bg-sky-500/15 text-sky-300"
                              : "bg-amber-500/15 text-amber-300"
                          }`}
                        >
                          {m.state}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] py-1 border-y border-border/50">
                        <div>
                          CO₂: <strong className="text-foreground font-mono">{m.co2}</strong>
                        </div>
                        <div>
                          Temperatur: <strong className="text-foreground font-mono">{m.temp}</strong>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-[11px] leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
                  <strong>Det store sagtanmønsteret:</strong> Istidene bygger seg opp langsomt over
                  80 000 til 90 000 år etter hvert som innlandsisene vokser og reflekterer mer sollys
                  (is-albedo). Avsmeltingen (terminasjonen) skjer derimot eksplosivt på bare 5000–10 000 år
                  når sommersola på 65 °N når sitt maksimum.
                </div>
              </div>
            )}

            {/* Window 3: 56 million years (PETM) */}
            {timescaleWindow === "petm" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-rose-500/30 bg-rose-950/15 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Flame className="size-5 text-rose-400" />
                    <h5 className="font-display text-base font-semibold text-rose-300">
                      PETM (Paleocen-eocen-temperaturmaksimum) for 56 millioner år siden
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                    PETM er den beste geologiske analogen vi har for en massiv drivhusgassinjeksjon i
                    atmosfæren. På ca. 5000 år ble 3000–7000 gigatonn karbon frigjort (trolig fra
                    vulkansk oppvarming av organiske sedimenter i Norskehavet og smelting av metanhydrater).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div className="rounded-lg bg-card/80 p-3 border border-border">
                      <span className="text-muted-foreground">Global oppvarming:</span>
                      <p className="font-mono text-base font-bold text-rose-400 mt-0.5">+5 til +8 °C</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Palmetrær og krokodiller levde i Arktis.</p>
                    </div>
                    <div className="rounded-lg bg-card/80 p-3 border border-border">
                      <span className="text-muted-foreground">Havforsuring:</span>
                      <p className="font-mono text-base font-bold text-amber-400 mt-0.5">Kalsittkollaps</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Stort artsutdøing blant bentiske foraminiferer.</p>
                    </div>
                    <div className="rounded-lg bg-card/80 p-3 border border-border">
                      <span className="text-muted-foreground">Varighet til gjenoppretting:</span>
                      <p className="font-mono text-base font-bold text-emerald-400 mt-0.5">~150 000 år</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Silikatforvitring trakk langsomt CO₂ ut av havet.</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-card p-3 border border-rose-500/20 text-xs">
                    <strong className="text-rose-300">Viktigste forskjell til i dag (Utslippsfart):</strong>
                    <p className="mt-1 text-muted-foreground">
                      Under PETM var den årlige karbonutslippstakten omtrent <strong>0,3–1,0 Gt C per år</strong>.
                      I dag slipper menneskeheten ut over <strong>10 Gt C per år</strong>. Dagens utslippshastighet
                      er altså mer enn <strong>ti ganger raskere</strong> enn under en av jordens mest dramatiske
                      naturlige klimakatastrofer!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </ModelPanel>
        </div>
      )}

      {/* ================= TAB 3: PROXY MATRIX ================= */}
      {tab === "proxy_matrix" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left list of proxies */}
            <div className="flex flex-col gap-2 lg:col-span-5">
              {(Object.keys(proxyCatalog) as ProxyId[]).map((pid) => {
                const p = proxyCatalog[pid];
                const active = selectedProxy === pid;
                return (
                  <button
                    key={pid}
                    type="button"
                    onClick={() => setSelectedProxy(pid)}
                    className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                      active
                        ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary/20"
                        : "border-border/70 bg-card/60 hover:bg-card"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">{p.name}</span>
                      {p.isDirect ? (
                        <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
                          Direkte prøve
                        </span>
                      ) : (
                        <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-sky-300 uppercase">
                          Proxy
                        </span>
                      )}
                    </div>
                    <span className="mt-1 text-[11px] text-muted-foreground">{p.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Right details of selected proxy */}
            <div className="flex flex-col gap-4 lg:col-span-7">
              {(() => {
                const p = proxyCatalog[selectedProxy];
                return (
                  <ModelPanel className="space-y-4">
                    <div className="border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-lg font-medium text-foreground">
                          {p.name}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{p.category}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="rounded-lg bg-card/60 p-2.5 border border-border/50">
                        <span className="text-muted-foreground">Naturlig arkiv:</span>
                        <p className="font-medium text-foreground mt-0.5">{p.archive}</p>
                      </div>
                      <div className="rounded-lg bg-card/60 p-2.5 border border-border/50">
                        <span className="text-muted-foreground">Tidsrekkevidde:</span>
                        <p className="font-medium text-foreground mt-0.5">{p.span}</p>
                      </div>
                      <div className="rounded-lg bg-card/60 p-2.5 border border-border/50 sm:col-span-2">
                        <span className="text-muted-foreground">Tidsoppløsning:</span>
                        <p className="font-medium text-foreground mt-0.5">{p.resolution}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <strong className="text-foreground">Hva sporet måler:</strong>
                        <p className="mt-0.5 text-muted-foreground leading-relaxed">
                          {p.whatItMeasures}
                        </p>
                      </div>
                      <div>
                        <strong className="text-foreground">Begrensninger og feilkilder:</strong>
                        <p className="mt-0.5 text-muted-foreground leading-relaxed">
                          {p.limitation}
                        </p>
                      </div>
                    </div>

                    <ModelNote title="Til eksamen" tone="teal">
                      <p>{p.examPoint}</p>
                    </ModelNote>
                  </ModelPanel>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </ModelFrame>
  );
}
