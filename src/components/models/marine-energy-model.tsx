import { useState } from "react";
import { Anchor, Waves, Wind, Compass, Zap, CheckCircle2, AlertOctagon, Globe } from "lucide-react";
import { ModelFrame, ModelMarkers, ModelNote, ModelPanel, ModelTab } from "./model-chrome";

type MarineTech = "bottom_fixed" | "floating_wind" | "wave" | "tidal" | "otec";

interface TechDetails {
  id: MarineTech;
  title: string;
  badge: string;
  depthRange: string;
  densityMedium: string;
  capacityFactor: string;
  trl: string;
  energySource: string;
  description: string;
  advantages: string[];
  challenges: string[];
  norwayRelevance: string;
  diagram: React.ReactNode;
}

export function MarineEnergyModel() {
  const [activeTech, setActiveTech] = useState<MarineTech>("bottom_fixed");

  const TECH_DATA: Record<MarineTech, TechDetails> = {
    bottom_fixed: {
      id: "bottom_fixed",
      title: "Bunnfast havvind (Monopel & Jacket)",
      badge: "Utprøvd & kommersiell",
      depthRange: "0–50 meter (Sokkelsletter)",
      densityMedium: "Luft: 1,225 kg/m³",
      capacityFactor: "45–52 % (Høyere enn landvind)",
      trl: "TRL 9 (Kommersiell stordrift)",
      energySource: "Kinetisk energi i vind over hav",
      description:
        "Turbintårnet forankres direkte i havbunnen ved hjelp av en gigantisk stålmonopel banket ned i sedimentene, eller en fagverkskonstruksjon (jacket) pælet til grunnfjellet. Teknologien er dominerende i den grunne sørlige Nordsjøen utenfor Danmark, Storbritannia og Nederland.",
      advantages: [
        "Veldig moden teknologi med lavest utbyggingskostnad (LCOE) til havs.",
        "Ekstremt stabil plattform som tåler kraftige bølger uten vugging.",
        "Jevnere og 20–30 % sterkere vindfelt enn på landjorden.",
      ],
      challenges: [
        "Begrenset til grunne sokkelområder (< 50 m dyp).",
        "Pæling medfører kraftig undervannsstøy som kan skade hval og nise.",
        "Konflikter med bunntråling, sandbankeøkosystemer og kystnært fugleliv.",
      ],
      norwayRelevance:
        "Lite anvendelig langs det meste av Norskekysten fordi kontinentalsokkelen stuper bratt ned i Norskerenna (200–350 m dyp). Sørlige Nordsjø II er et av få egnede norske områder.",
      diagram: (
        <svg viewBox="0 0 520 280" className="w-full h-auto select-none" aria-label="Bunnfast havvind skisse">
          {/* Himmel og hav */}
          <rect x="0" y="0" width="520" height="150" fill="#0f172a" />
          <rect x="0" y="150" width="520" height="130" fill="#0d2838" />
          {/* Havbunn (sand/sediment) */}
          <rect x="0" y="240" width="520" height="40" fill="#332c1e" />
          <line x1="0" y1="240" x2="520" y2="240" stroke="#785934" strokeWidth="2" />
          <text x="20" y="265" fill="#a89078" fontSize="11">Grunn havbunn (&lt;45 m)</text>

          {/* Havoverflate bølger */}
          <path d="M 0 150 Q 30 146 60 150 T 120 150 T 180 150 T 240 150 T 300 150 T 360 150 T 420 150 T 480 150 L 520 150" fill="none" stroke="#38bdf8" strokeWidth="2" />

          {/* Monopel pælet ned i sediment */}
          <rect x="250" y="120" width="20" height="150" fill="#64748b" stroke="#334155" />
          <text x="280" y="210" fill="#94a3b8" fontSize="10">Monopel pælet i bunn</text>

          {/* Turbintårn og rotor */}
          <rect x="254" y="30" width="12" height="90" fill="#e2e8f0" />
          <circle cx="260" cy="30" r="8" fill="#cbd5e1" />
          {/* Rotorblader */}
          <line x1="260" y1="30" x2="260" y2="-10" stroke="#f1f5f9" strokeWidth="3" />
          <line x1="260" y1="30" x2="295" y2="50" stroke="#f1f5f9" strokeWidth="3" />
          <line x1="260" y1="30" x2="225" y2="50" stroke="#f1f5f9" strokeWidth="3" />
          <circle cx="260" cy="30" r="40" fill="none" stroke="#38bdf8" strokeDasharray="3 3" opacity="0.4" />

          {/* Sjøkabel mot land */}
          <path d="M 260 240 C 230 250 150 255 40 260" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
          <text x="90" y="250" fill="#fbbf24" fontSize="9">Eksportkabel til land</text>
        </svg>
      ),
    },

    floating_wind: {
      id: "floating_wind",
      title: "Flytende havvind (Spar & Semi-submersible)",
      badge: "Norges spydspiss",
      depthRange: "60–800+ meter (Dyp sokkel)",
      densityMedium: "Luft: 1,225 kg/m³",
      capacityFactor: "50–58 % (Jevneste vindfelt)",
      trl: "TRL 7–8 (Hywind Tampen i drift)",
      energySource: "Kinetisk energi i åpent havvindfelt",
      description:
        "Turbinen monteres på et flytende skrog (for eksempel en dyp sylindrisk Spar-bøye med ballast eller en trebent halvt nedsenkbar plattform) som holdes på plass av 3–4 oppspente ankerliner forankret til sugeankere i havbunnen.",
      advantages: [
        "Kan plasseres på dyp der over 80 % av verdens havvindressurser befinner seg.",
        "Kan taues til havs ferdig montert fra verft uten behov for spesialiserte jekk-opp-fartøy.",
        "Plasseres langt til havs, helt ute av syne fra kysten, med minimal visuell konflikt.",
      ],
      challenges: [
        "Betydelig høyere investeringskostnad enn bunnfast havvind.",
        "Dynamiske sjøkabler og strekkstag utsettes for kontinuerlig bølgebelastning og materialtretthet.",
        "Avstand til land krever kostbare høyspent-likestrømskabler (HVDC).",
      ],
      norwayRelevance:
        "Perfekt match for Norges geografi! Norskerenna (250–350 m) og store dype havområder (Utsira Nord). Norge leder an globalt med Hywind Tampen (88 MW som forsyner Gullfaks og Snorre).",
      diagram: (
        <svg viewBox="0 0 520 280" className="w-full h-auto select-none" aria-label="Flytende havvind skisse">
          {/* Dypvannsbakgrunn */}
          <rect x="0" y="0" width="520" height="110" fill="#0f172a" />
          <rect x="0" y="110" width="520" height="170" fill="#081b29" />
          <rect x="0" y="260" width="520" height="20" fill="#1e2229" />
          <text x="20" y="275" fill="#64748b" fontSize="10">Dyphavsbunn (&gt;200 m)</text>

          {/* Havoverflate */}
          <path d="M 0 110 Q 30 106 60 110 T 120 110 T 180 110 T 240 110 T 300 110 T 360 110 T 420 110 T 480 110 L 520 110" fill="none" stroke="#38bdf8" strokeWidth="2" />

          {/* Spar sylinderskrog med ballast */}
          <rect x="250" y="90" width="20" height="90" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="252" y="150" width="16" height="26" fill="#334155" />
          <text x="275" y="145" fill="#7dd3fc" fontSize="9">Tung ballast (Spar)</text>

          {/* Turbintårn */}
          <rect x="254" y="20" width="12" height="70" fill="#f1f5f9" />
          <circle cx="260" cy="20" r="7" fill="#cbd5e1" />
          <line x1="260" y1="20" x2="260" y2="-15" stroke="#f1f5f9" strokeWidth="3" />
          <line x1="260" y1="20" x2="292" y2="40" stroke="#f1f5f9" strokeWidth="3" />
          <line x1="260" y1="20" x2="228" y2="40" stroke="#f1f5f9" strokeWidth="3" />

          {/* Forankringsliner til sugeanker */}
          <path d="M 252 140 C 200 180 140 230 90 260" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 268 140 C 320 180 380 230 430 260" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
          {/* Sugeankere */}
          <rect x="85" y="255" width="10" height="15" fill="#f59e0b" />
          <rect x="425" y="255" width="10" height="15" fill="#f59e0b" />
          <text x="100" y="250" fill="#fbbf24" fontSize="9">Sugeanker</text>
        </svg>
      ),
    },

    wave: {
      id: "wave",
      title: "Bølgekraft (OWC & Punktabsorbator)",
      badge: "Høy energitetthet",
      depthRange: "Kystnært til dyphav",
      densityMedium: "Vann: 1025 kg/m³",
      capacityFactor: "25–40 % (Styrt av dønninger)",
      trl: "TRL 5–7 (Pilotprosjekter)",
      energySource: "Konsentrert vindenergi i havoverflaten",
      description:
        "Bølger dannes når vind blåser over store havstrekninger (fetch). Energien transporteres som mekaniske overflatebølger med energitetthet proporsjonal med kvadratet av bølgehøyden (E ∝ H²). En svingende vannsøyle (OWC) lar bølgene heve og senke vannivået i et luftkammer, slik at toveis luftstrøm driver en spesialdesignet Wells-turbin.",
      advantages: [
        "Ekstrem energitetthet: Bølgefronten langs Nordsjøkysten kan bære 40–70 kW per meter bølgerygg.",
        "Dønninger fortsetter å levere energi i timevis etter at vinden har lagt seg.",
        "Liten synlig profil over vannflaten.",
      ],
      challenges: [
        "100-årshavet: Innretningen må overleve ekstreme monsterbølger og orkaner som er 10–20 ganger sterkere enn normal drift.",
        "Ekstrem mekanisk slitasje, korrosjon og marin begroing (skjell og tang).",
        "Historisk høy havari- og konkursrate blant teknologiselskaper.",
      ],
      norwayRelevance:
        "Vestlandskysten og Stad har blant verdens beste bølgeklima. Norge var tidlig ute med pilotsenteret på Toftestallen i Øygarden (1985), men stormhavari bremset kommersialiseringen.",
      diagram: (
        <svg viewBox="0 0 520 280" className="w-full h-auto select-none" aria-label="Bølgekraft OWC skisse">
          {/* Bølgekammer profil */}
          <rect x="0" y="0" width="520" height="280" fill="#081822" />
          {/* Betongstruktur på land/skjær */}
          <polygon points="180,60 240,60 240,240 180,240" fill="#475569" stroke="#334155" />
          <polygon points="280,60 340,60 340,180 280,180" fill="#475569" stroke="#334155" />

          {/* Luftkammer mellom veggene */}
          <rect x="240" y="60" width="40" height="90" fill="#1e293b" />
          {/* Wells-turbin på toppen */}
          <circle cx="260" cy="70" r="14" fill="#f59e0b" />
          <text x="285" y="74" fill="#fbbf24" fontSize="10" fontWeight="bold">Wells-turbin</text>

          {/* Vannsøyle som hever seg i kammeret */}
          <path d="M 0 190 Q 60 160 120 190 T 240 180 L 280 180 Q 320 200 400 180 L 520 180 L 520 280 L 0 280 Z" fill="#0284c7" opacity="0.8" />
          <path d="M 0 190 Q 60 160 120 190 T 240 180 L 280 180 Q 320 200 400 180 L 520 180" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

          {/* Toveis luftstrøm opp/ned */}
          <path d="M 260 120 L 260 85" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 2" />
          <text x="260" y="140" fill="#94a3b8" fontSize="9" textAnchor="middle">Luft komprimeres</text>
        </svg>
      ),
    },

    tidal: {
      id: "tidal",
      title: "Tidevannskraft (Tidevannsturbiner i sund)",
      badge: "100 % forutsigbar",
      depthRange: "15–60 meter (Trange sund og estuarer)",
      densityMedium: "Sjøvann: 1025 kg/m³ (830x tettere enn luft!)",
      capacityFactor: "35–45 % (Klokkeklar døgnvariasjon)",
      trl: "TRL 7–8 (Kvalsund, Pentland Firth)",
      energySource: "Gravitasjon fra måne og sol + jordrotasjon",
      description:
        "I motsetning til vind og vær, styres tidevannet av himmelmekanikk. I trange fjordsund og estuarer tvinges enorme vannmasser gjennom flaskehalser ved flo og fjære. Siden sjøvann har en tetthet på 1025 kg/m³ (over 800 ganger luftens tetthet), har en vannstrøm på 2–3 m/s like stor energitetthet som en stormfull vind på 20–25 m/s!",
      advantages: [
        "100 % forutsigbar kraftproduksjon tiår inn i fremtiden via tidevannstabeller.",
        "Kompakte turbiner: En undervannsrotor på bare 15–20 meter leverer like mye effekt som en kjempevindturbin.",
        "Helt usynlig fra overflaten og ingen støy for mennesker på land.",
      ],
      challenges: [
        "Syklisk produksjon: Kraften varierer med 4 strømtopper per døgn og månefaser (springflo/nippflo).",
        "Krevende installasjon og vedlikehold i ekstreme strømhvirvler.",
        "Kan påvirke fiskebestander og sjøpattedyr som vandrer gjennom trange sund.",
      ],
      norwayRelevance:
        "Nord-Norge har noen av verdens kraftigste tidevannsstrømmer: Saltstraumen, Rystrømmen ved Tromsø og Kvalsundet ved Hammerfest (hvor en av verdens første tidevannsturbiner ble testet i 2003).",
      diagram: (
        <svg viewBox="0 0 520 280" className="w-full h-auto select-none" aria-label="Tidevannsturbin skisse">
          {/* Sund og vannsøyle */}
          <rect x="0" y="0" width="520" height="280" fill="#082230" />
          <rect x="0" y="240" width="520" height="40" fill="#1e293b" />
          <text x="20" y="265" fill="#64748b" fontSize="10">Klippebunn i tidevannssund</text>

          {/* Tidevannsstrøm vannlinje */}
          <line x1="0" y1="50" x2="520" y2="50" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
          <text x="20" y="40" fill="#7dd3fc" fontSize="10">Overflate (Flo / Fjære)</text>

          {/* Undervannsturbin på gravitasjonsfundament */}
          <rect x="235" y="210" width="50" height="30" rx="4" fill="#334155" stroke="#475569" />
          <rect x="255" y="110" width="10" height="100" fill="#64748b" />
          <circle cx="260" cy="110" r="12" fill="#0284c7" />

          {/* Blader */}
          <line x1="260" y1="110" x2="260" y2="55" stroke="#f1f5f9" strokeWidth="4" />
          <line x1="260" y1="110" x2="215" y2="135" stroke="#f1f5f9" strokeWidth="4" />
          <line x1="260" y1="110" x2="305" y2="135" stroke="#f1f5f9" strokeWidth="4" />

          {/* Strømningspiler for vannmasser (tetthet = 1025 kg/m³) */}
          <path d="M 60 110 L 190 110" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowCold)" />
          <path d="M 60 80 L 170 80" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowCold)" />
          <path d="M 60 140 L 170 140" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowCold)" />
          <text x="120" y="100" fill="#7dd3fc" fontSize="11" fontWeight="bold">Strøm: 2,5 m/s</text>
          <text x="120" y="160" fill="#94a3b8" fontSize="9">ρ = 1025 kg/m³ (Enorm energitetthet)</text>
        </svg>
      ),
    },

    otec: {
      id: "otec",
      title: "Havvarmekraft (OTEC: Ocean Thermal Energy)",
      badge: "Kontinuerlig grunnlast",
      depthRange: "0–1000 meter (Termoklin i tropene)",
      densityMedium: "Temperaturgradient: ΔT ≥ 20 °C",
      capacityFactor: "85–92 % (Kontinuerlig 24/7/365)",
      trl: "TRL 6–7 (Piloter på Hawaii og Japan)",
      energySource: "Solabsorpsjon i overflatevann vs. arktisk bunnvann",
      description:
        "OTEC utnytter den naturlige temperaturforskjellen mellom solvarmet overflatevann (25–28 °C i tropene) og iskaldt dyphavsvann (4–5 °C på 1000 m dyp). Varmen fra overflatevannet fordamper et arbeidsmedium med lavt kokepunkt (som ammoniakk, NH₃). Gassen driver en turbin, før den kondenseres tilbake til væske ved hjelp av det opppumpede dypvannet i en lukket Rankine-syklus.",
      advantages: [
        "Uslåelig forsyningssikkerhet: Leverer stabil grunnlast døgnet rundt, uavhengig av vind og vær.",
        "Biprodukter: Avsalting gir store mengder ferskvann, og opppumpet dypvann er rikt på næringssalter for akvakultur.",
        "Ingen drivstoffkostnader eller CO₂-utslipp under drift.",
      ],
      challenges: [
        "Lav termodynamisk virkningsgrad: Fordi temperaturforskjellen er bare ca. 20 °C, begrenser Carnots teoretiske virkningsgrad anlegget til under 6–8 %.",
        "Krever enorme vannmengder og gigantiske rørledninger (flere meter i diameter) ned til 1000 meters dyp.",
        "Høy investeringskostnad per installert kilowatt.",
      ],
      norwayRelevance:
        "Ikke egnet i norske kystfarvann fordi overflatetemperaturen er for lav til å gi nødvendig ΔT ≥ 20 °C. Men norsk offshorekompetanse innen dypvannsrør, flytende plattformer og marint ingeniørarbeid er en stor eksportvare til tropiske øystater.",
      diagram: (
        <svg viewBox="0 0 520 280" className="w-full h-auto select-none" aria-label="OTEC Rankine syklus skisse">
          {/* Overflate og dyphav */}
          <rect x="0" y="0" width="520" height="100" fill="#1e3a47" />
          <rect x="0" y="100" width="520" height="180" fill="#05121e" />

          <text x="20" y="30" fill="#fde68a" fontSize="12" fontWeight="bold">Varm overflate: 26 °C</text>
          <text x="20" y="260" fill="#7dd3fc" fontSize="12" fontWeight="bold">Kaldt dyphav (1000 m): 4 °C · ΔT = 22 °C</text>

          {/* OTEC Kraftverk */}
          <rect x="220" y="30" width="130" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" />
          <text x="285" y="50" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">OTEC-anlegg</text>

          {/* Ammoniakksyklus i midten */}
          <rect x="240" y="60" width="90" height="40" rx="4" fill="#0f172a" stroke="#f59e0b" />
          <text x="285" y="78" fill="#fbbf24" fontSize="9" textAnchor="middle">Ammoniakk NH₃</text>
          <text x="285" y="92" fill="#34d399" fontSize="9" textAnchor="middle">Turbin &amp; Generator</text>

          {/* Varmtvannsrør inn/ut */}
          <path d="M 160 50 L 220 50" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowWarm)" />
          <text x="180" y="42" fill="#fbbf24" fontSize="8">Varmt vann inn</text>

          {/* Kjemperør ned til 1000m */}
          <rect x="280" y="110" width="12" height="150" fill="#0284c7" stroke="#38bdf8" />
          <path d="M 286 260 L 286 115" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
          <text x="300" y="190" fill="#7dd3fc" fontSize="9">Kaldtvannsrør (1000 m)</text>
        </svg>
      ),
    },
  };

  const current = TECH_DATA[activeTech];

  return (
    <ModelFrame
      kicker="Interaktiv teknologisammenligning"
      title="Havets energiformer: Fra havvind til OTEC"
      lead="Havet rommer enorme mekaniske og termiske energiressurser. Klikk deg gjennom de fem teknologiene for å sammenligne dybdekrav, virkningsgrad, forutsigbarhet, miljøkonflikter og relevans for Norge."
    >
      <div>
        <ModelMarkers />

        {/* Fanevelger */}
        <div className="mb-5 flex flex-wrap gap-2">
          <ModelTab active={activeTech === "bottom_fixed"} onClick={() => setActiveTech("bottom_fixed")}>
            1. Bunnfast havvind
          </ModelTab>
          <ModelTab active={activeTech === "floating_wind"} onClick={() => setActiveTech("floating_wind")}>
            2. Flytende havvind
          </ModelTab>
          <ModelTab active={activeTech === "wave"} onClick={() => setActiveTech("wave")}>
            3. Bølgekraft
          </ModelTab>
          <ModelTab active={activeTech === "tidal"} onClick={() => setActiveTech("tidal")}>
            4. Tidevannskraft
          </ModelTab>
          <ModelTab active={activeTech === "otec"} onClick={() => setActiveTech("otec")}>
            5. OTEC (Havvarmekraft)
          </ModelTab>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Venstre panel: Skisse og parametere */}
          <ModelPanel className="lg:col-span-6 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-2">
              <span className="font-semibold text-foreground text-sm">{current.title}</span>
              <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {current.badge}
              </span>
            </div>

            {/* Illustrasjon */}
            <div className="overflow-hidden rounded-lg border border-border bg-[#0a1218]">
              {current.diagram}
            </div>

            {/* Tekniske nøkkeltall grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg border border-border bg-card/60 p-2.5">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                  Vanndyp / Sone
                </span>
                <strong className="text-foreground">{current.depthRange}</strong>
              </div>
              <div className="rounded-lg border border-border bg-card/60 p-2.5">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                  Tetthet i medium
                </span>
                <strong className="text-foreground">{current.densityMedium}</strong>
              </div>
              <div className="rounded-lg border border-border bg-card/60 p-2.5">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                  Kapasitetsfaktor
                </span>
                <strong className="text-primary">{current.capacityFactor}</strong>
              </div>
              <div className="rounded-lg border border-border bg-card/60 p-2.5">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                  Modningsgrad
                </span>
                <strong className="text-amber-400">{current.trl}</strong>
              </div>
              <div className="col-span-2 rounded-lg border border-border bg-card/60 p-2.5">
                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                  Primær energikilde
                </span>
                <strong className="text-foreground">{current.energySource}</strong>
              </div>
            </div>
          </ModelPanel>

          {/* Høyre panel: Beskrivelse, fordeler, utfordringer og norsk relevans */}
          <div className="flex flex-col gap-3.5 lg:col-span-6">
            <div className="rounded-xl border border-border bg-card/60 p-4 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Fysisk og teknologisk prinsipp</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-1.5">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 shrink-0" />
                  Hovedfordeler
                </span>
                <ul className="space-y-1 text-muted-foreground">
                  {current.advantages.map((adv, idx) => (
                    <li key={idx} className="flex gap-1.5">
                      <span>•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 space-y-1.5">
                <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <AlertOctagon className="size-4 shrink-0" />
                  Tekniske flaskehalser &amp; konflikter
                </span>
                <ul className="space-y-1 text-muted-foreground">
                  {current.challenges.map((ch, idx) => (
                    <li key={idx} className="flex gap-1.5">
                      <span>•</span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ModelNote title="Geofaglig relevans for Norge" tone="warm">
              <p className="text-xs sm:text-sm leading-relaxed">{current.norwayRelevance}</p>
            </ModelNote>
          </div>
        </div>
      </div>
    </ModelFrame>
  );
}
