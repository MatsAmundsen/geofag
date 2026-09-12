import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. InsolationDiagram
 * Viser solstrålenes innfallsvinkel mot jordens krumning og strålingsbalansen.
 */
export function InsolationDiagram() {
  return (
    <Diagram
      title="Ujevn solinnstråling og jordens strålingsbalanse"
      heading="Sola treffer jorda med ulik vinkel: Motoren i det globale vindsystemet"
      caption="Solstrålene ankommer jorden i parallelle bunter. Ved ekvator står solen i senit (90° innfallsvinkel), slik at solenergien konsentreres over et lite flateareal. Mot polene treffer strålene på skrå, og nøyaktig samme energimengde fordeles utover et langt større areal. I tillegg må strålene ved polene passere gjennom et mye tykkere lag av atmosfæren, der skyer og partikler reflekterer og sprer strålingen. Resultatet er et permanent strålingsoverskudd i tropene (opp til ca. 38° breddegrad) og et underskudd mot polene. Uten atmosfærens og havstrømmenes varmetransport ville tropene blitt overopphetet og polene ubeboelig kalde."
      viewBox="0 0 860 420"
      wide
    >
      {(m) => (
        <>
          {/* Solstrålebunt fra venstre */}
          {Array.from({ length: 8 }).map((_, i) => {
            const y = 50 + i * 36;
            return (
              <Arrow
                key={i}
                d={`M 40 ${y} L 240 ${y}`}
                marker={m.warm}
                color={C.warm}
                width={i === 4 ? 3.4 : 2.2}
              />
            );
          })}
          <L x="40" y="32" fill={C.warm} size={14} weight={700}>
            Parallell solinnstråling fra rommet
          </L>

          {/* Jordkloden i tverrsnitt */}
          <circle cx="420" cy="180" r="120" fill="#12202a" stroke={C.teal} strokeWidth="2.4" />
          <ellipse
            cx="420"
            cy="180"
            rx="42"
            ry="120"
            fill="none"
            stroke={C.dim}
            strokeDasharray="3 3"
          />
          {/* Ekvatorlinje */}
          <line
            x1="300"
            y1="180"
            x2="540"
            y2="180"
            stroke={C.warm}
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          <L x="420" y="174" fill={C.warm} size={13} weight={800} anchor="middle">
            Ekvator (0°)
          </L>
          <L x="420" y="74" fill={C.cold} size={13} weight={800} anchor="middle">
            Nordpolen (90°N)
          </L>
          <L x="420" y="306" fill={C.cold} size={13} weight={800} anchor="middle">
            Sørpolen (90°S)
          </L>

          {/* Arealrepresentasjon: Ekvator (liten flate) */}
          <path d="M 300 180 L 305 145 L 340 180 Z" fill={C.warm} opacity="0.85" />
          <rect
            x="580"
            y="150"
            width="250"
            height="65"
            rx="6"
            fill="#201814"
            stroke={C.warm}
            strokeWidth="1.4"
          />
          <L x="595" y="172" fill={C.warm} size={13} weight={800}>
            Tropene: Loddrett innstråling
          </L>
          <L x="595" y="190" fill={C.fg} size={11}>
            Konsentrert på lite areal ($A = 1$)
          </L>
          <L x="595" y="205" fill={C.sand} size={11} weight={700}>
            → Permanent ENERGIOVERSKUDD
          </L>

          {/* Arealrepresentasjon: Polarområdet (stor, skrå flate) */}
          <path d="M 340 85 L 380 62 L 398 98 Z" fill={C.cold} opacity="0.75" />
          <rect
            x="580"
            y="65"
            width="250"
            height="65"
            rx="6"
            fill="#141f26"
            stroke={C.cold}
            strokeWidth="1.4"
          />
          <L x="595" y="87" fill={C.cold} size={13} weight={800}>
            Polene: Svært skrå innfallsvinkel
          </L>
          <L x="595" y="105" fill={C.fg} size={11}>
            Spres over mer enn 2,5× større areal
          </L>
          <L x="595" y="120" fill={C.muted} size={11}>
            → Permanent ENERGIUNDERSKUDD
          </L>

          {/* Kurve / forklaring nederst */}
          <rect
            x="40"
            y="335"
            width="780"
            height="65"
            rx="8"
            fill="#141d24"
            stroke={C.dim}
            strokeWidth="1.3"
          />
          <L x="60" y="358" fill={C.sand} size={13} weight={800}>
            Varmetransportens nødvendighet:
          </L>
          <L x="60" y="378" fill={C.fg} size={12}>
            Overskuddsenergien i tropene transporteres mot polene via to enorme maskinerier:
          </L>
          <L x="60" y="394" fill={C.teal} size={12} weight={700}>
            1) Det globale vindsystemet (står for ca. 60 % av transporten) · 2) Havstrømmene (står
            for ca. 40 %).
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. OneVsThreeCellsDiagram
 * Viser George Hadleys 1-celle hypotese vs William Ferrels 3-cellesystem.
 */
export function OneVsThreeCellsDiagram() {
  return (
    <Diagram
      title="Én celle uten rotasjon, tre celler med rotasjon"
      heading="Hvorfor tre celler og ikke én? Corioliskraftens oppsplitting"
      caption="I 1735 foreslo George Hadley at jorden hadde én gigantisk sirkulasjonscelle på hver halvkule: Varm luft stiger ved ekvator, strømmer helt til polen i høyden, synker over polisen og strømmer tilbake langs bakken (venstre kart). Men jorden roterer! Idet luften i høyden beveger seg nordover, avbøyes den kraftig mot høyre av Corioliskraften. Allerede ved 30° breddegrad er luften blitt til en ren vestlig strøm som ikke klarer å trenge lenger nord. Den synker ned og danner de tre cellene vi har i dag (høyre kart): Hadleycellen, Ferrelcellen og Polarcellen."
      viewBox="0 0 860 360"
      wide
    >
      {(m) => (
        <>
          <line
            x1="430"
            y1="40"
            x2="430"
            y2="330"
            stroke={C.dim}
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* VENSTRE: GEORGE HADLEYS HYPOTESE (UTEN ROTASJON) */}
          <L x="215" y="35" size={16} weight={800} anchor="middle" fill={C.warm}>
            Hypotese: Én celle (Uten jordrotasjon)
          </L>
          <L x="215" y="55" size={12} fill={C.muted} anchor="middle">
            George Hadley (1735) · Ren termisk oppdrift
          </L>

          {/* Enkel sirkulasjon */}
          <path
            d="M 80 270 Q 80 90 215 90 Q 350 90 350 270"
            fill="none"
            stroke={C.dim}
            strokeWidth="2"
          />
          <Arrow d="M 90 260 L 90 110" marker={m.warm} color={C.warm} width={3.2} />
          <Arrow d="M 110 90 L 320 90" marker={m.warm} color={C.warm} width={3} />
          <Arrow d="M 340 110 L 340 260" marker={m.cold} color={C.cold} width={3.2} />
          <Arrow d="M 320 270 L 110 270" marker={m.teal} color={C.teal} width={3} />

          <L x="90" y="288" fill={C.warm} size={12} weight={700} anchor="middle">
            0° (Ekvator)
          </L>
          <L x="340" y="288" fill={C.cold} size={12} weight={700} anchor="middle">
            90° (Polen)
          </L>

          <rect
            x="70"
            y="305"
            width="290"
            height="36"
            rx="6"
            fill="#1c1417"
            stroke={C.low}
            strokeWidth="1.2"
          />
          <L x="215" y="327" fill={C.low} size={11.5} weight={700} anchor="middle">
            Urealistisk: Tar ikke hensyn til Corioliseffekten!
          </L>

          {/* HØYRE: WILLIAM FERRELS MODELL (MED ROTASJON) */}
          <L x="645" y="35" size={16} weight={800} anchor="middle" fill={C.teal}>
            Virkeligheten: Tre celler (Med jordrotasjon)
          </L>
          <L x="645" y="55" size={12} fill={C.muted} anchor="middle">
            William Ferrel (1856) · Coriolis splitter strømmen
          </L>

          {/* Tre ellipser */}
          <ellipse cx="500" cy="180" rx="42" ry="75" fill="none" stroke={C.teal} strokeWidth="2" />
          <ellipse
            cx="610"
            cy="180"
            rx="42"
            ry="75"
            fill="none"
            stroke={C.sand}
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          <ellipse cx="720" cy="180" rx="42" ry="75" fill="none" stroke={C.cold} strokeWidth="2" />

          {/* Piler */}
          <Arrow d="M 465 240 L 465 120" marker={m.warm} color={C.warm} width={2.4} />
          <Arrow d="M 535 120 L 535 240" marker={m.sand} color={C.sand} width={2.4} />
          <Arrow d="M 645 240 L 645 120" marker={m.warm} color={C.warm} width={2.4} />
          <Arrow d="M 755 120 L 755 240" marker={m.cold} color={C.cold} width={2.4} />

          <L x="500" y="185" fill={C.teal} size={13} weight={800} anchor="middle">
            Hadley
          </L>
          <L x="610" y="185" fill={C.sand} size={13} weight={800} anchor="middle">
            Ferrel
          </L>
          <L x="720" y="185" fill={C.cold} size={13} weight={800} anchor="middle">
            Polar
          </L>

          <L x="465" y="280" fill={C.fg} size={11} anchor="middle">
            0° (ITCZ)
          </L>
          <L x="535" y="280" fill={C.fg} size={11} anchor="middle">
            30°
          </L>
          <L x="645" y="280" fill={C.fg} size={11} anchor="middle">
            60°
          </L>
          <L x="755" y="280" fill={C.fg} size={11} anchor="middle">
            90°
          </L>

          <rect
            x="490"
            y="305"
            width="310"
            height="36"
            rx="6"
            fill="#112226"
            stroke={C.teal}
            strokeWidth="1.2"
          />
          <L x="645" y="327" fill={C.teal} size={11.5} weight={700} anchor="middle">
            Coriolis tvinger luften ned ved 30° → 3 celler!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. WindCellsDiagram
 * Komplett, pedagogisk tverrsnitt av nordlig halvkule fra 0° til 90°N.
 */
export function WindCellsDiagram() {
  return (
    <Diagram
      title="De tre sirkulasjonscellene på nordlig halvkule"
      heading="De tre cellene: Hadley, Ferrel og Polarcellen i tverrsnitt"
      caption="Sirkulasjonen på nordlig halvkule er delt inn i tre celler: 1) Hadleycellen (0°–30°): Termisk direkte. Varm luft stiger ved den intertropiske konvergenssonen (ITCZ), strømmer nordover i høyden, synker tørr ned ved 30° og returnerer som nordøstpassaten. 2) Ferrelcellen (30°–60°): Termisk indirekte. Drives mekanisk som et tannhjul mellom de to andre cellene av lavtrykksvirvlene langs polarfronten. Ved bakken danner den vestavindsbeltet. 3) Polarcellen (60°–90°): Termisk direkte. Iskald luft synker over polen (polarhøytrykk) og strømmer sørover som polare østavinder. Kollisjonen mellom vestavind og polarluft ved 60° danner polarfronten og polarfrontjeten."
      viewBox="0 0 860 450"
      wide
    >
      {(m) => (
        <>
          {/* Tropopausen (høyest ved ekvator 16–18 km, lavest ved polen 8 km) */}
          <path
            d="M 60 70 L 320 70 Q 340 70 350 110 L 580 110 Q 600 110 610 140 L 800 140"
            fill="none"
            stroke={C.dim}
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <L x="70" y="60" fill={C.muted} size={12}>
            Tropopausen (~16 km ved ekvator)
          </L>
          <L x="790" y="130" fill={C.muted} size={12} anchor="end">
            Tropopausen (~8 km ved polen)
          </L>

          {/* Jordoverflaten nederst */}
          <line x1="60" y1="350" x2="800" y2="350" stroke={C.dim} strokeWidth="2.5" />

          {/* Vertikale breddegradsmarkører */}
          <line
            x1="100"
            y1="70"
            x2="100"
            y2="350"
            stroke={C.dim}
            strokeDasharray="3 3"
            opacity="0.4"
          />
          <line
            x1="330"
            y1="100"
            x2="330"
            y2="350"
            stroke={C.dim}
            strokeDasharray="3 3"
            opacity="0.4"
          />
          <line
            x1="590"
            y1="110"
            x2="590"
            y2="350"
            stroke={C.dim}
            strokeDasharray="3 3"
            opacity="0.4"
          />
          <line
            x1="780"
            y1="140"
            x2="780"
            y2="350"
            stroke={C.dim}
            strokeDasharray="3 3"
            opacity="0.4"
          />

          {/* HADLEYCELLEN (100 til 330) */}
          {/* Oppdrift ved ITCZ */}
          <Arrow d="M 100 320 L 100 100" marker={m.warm} color={C.warm} width={3.6} />
          {/* Øvre strøm polover */}
          <Arrow d="M 120 85 L 300 85" marker={m.warm} color={C.warm} width={2.8} />
          {/* Nedsynking ved 30° */}
          <Arrow d="M 330 115 L 330 315" marker={m.sand} color={C.sand} width={3.4} />
          {/* Nordøstpassaten ved bakken */}
          <Arrow d="M 300 335 L 125 335" marker={m.teal} color={C.teal} width={3.2} />

          <L x="215" y="200" fill={C.teal} size={16} weight={800} anchor="middle">
            HADLEY-CELLEN
          </L>
          <L x="215" y="220" fill={C.muted} size={11} anchor="middle">
            Termisk direkte (0°–30°N)
          </L>
          <L x="215" y="325" fill={C.teal} size={12} weight={700} anchor="middle">
            ← Nordøstpassaten
          </L>

          {/* FERRELCELLEN (330 til 590) */}
          {/* Nedsynking ved 30° delt med Hadley */}
          {/* Bakkestrøm nordover (vestavind) */}
          <Arrow d="M 360 335 L 560 335" marker={m.warm} color={C.warm} width={3.4} />
          {/* Oppdrift ved polarfronten */}
          <Arrow d="M 590 315 L 590 135" marker={m.low} color={C.low} width={3.6} />
          {/* Øvre returstrøm sørover */}
          <Arrow d="M 560 125 L 360 125" marker={m.muted} color={C.muted} width={2.6} />

          <L x="460" y="200" fill={C.sand} size={16} weight={800} anchor="middle">
            FERREL-CELLEN
          </L>
          <L x="460" y="220" fill={C.sand} size={11} weight={700} anchor="middle">
            Termisk indirekte (30°–60°N)
          </L>
          <L x="460" y="325" fill={C.warm} size={13} weight={800} anchor="middle">
            Vestavindsbeltet →
          </L>

          {/* POLARCELLEN (590 til 780) */}
          {/* Oppdrift ved 60° delt med Ferrel */}
          {/* Øvre strøm mot polen */}
          <Arrow d="M 615 155 L 755 155" marker={m.cold} color={C.cold} width={2.6} />
          {/* Nedsynking over polen */}
          <Arrow d="M 780 170 L 780 320" marker={m.cold} color={C.cold} width={3.4} />
          {/* Polare østavinder ved bakken */}
          <Arrow d="M 755 335 L 615 335" marker={m.cold} color={C.cold} width={3} />

          <L x="685" y="200" fill={C.cold} size={16} weight={800} anchor="middle">
            POLAR-CELLEN
          </L>
          <L x="685" y="220" fill={C.muted} size={11} anchor="middle">
            Termisk direkte (60°–90°N)
          </L>
          <L x="685" y="325" fill={C.cold} size={12} weight={700} anchor="middle">
            ← Polare østavinder
          </L>

          {/* JETSTRØMMER MARKERT I TROPOPAUSEN */}
          {/* Subtropisk jet ved 30° */}
          <circle cx="340" cy="90" r="14" fill="#382d1c" stroke={C.sand} strokeWidth="2" />
          <L x="340" y="94" fill={C.sand} size={11} weight={800} anchor="middle">
            STJ
          </L>
          <L x="340" y="65" fill={C.sand} size={11} weight={700} anchor="middle">
            Subtropisk jet
          </L>

          {/* Polarfrontjet ved 60° */}
          <circle cx="600" cy="125" r="14" fill="#301518" stroke={C.low} strokeWidth="2" />
          <L x="600" y="129" fill={C.low} size={11} weight={800} anchor="middle">
            PFJ
          </L>
          <L x="600" y="100" fill={C.low} size={11} weight={700} anchor="middle">
            Polarfrontjet
          </L>

          {/* BAKKEMERKER OG TRYKKSONER */}
          {/* 0° ITCZ */}
          <circle cx="100" cy="370" r="14" fill="#301518" stroke={C.low} strokeWidth="1.8" />
          <L x="100" y="375" fill={C.low} size={13} weight={900} anchor="middle">
            L
          </L>
          <L x="100" y="398" fill={C.low} size={12} weight={800} anchor="middle">
            0° ITCZ
          </L>
          <L x="100" y="414" fill={C.muted} size={10} anchor="middle">
            Ekvatorielt lavtrykk
          </L>

          {/* 30° Subtropisk høytrykk */}
          <circle cx="330" cy="370" r="14" fill="#13272c" stroke={C.teal} strokeWidth="1.8" />
          <L x="330" y="375" fill={C.teal} size={13} weight={900} anchor="middle">
            H
          </L>
          <L x="330" y="398" fill={C.teal} size={12} weight={800} anchor="middle">
            30° Hestebreddegradene
          </L>
          <L x="330" y="414" fill={C.muted} size={10} anchor="middle">
            Subtropisk høytrykk (Sahara)
          </L>

          {/* 60° Polarfronten */}
          <circle cx="590" cy="370" r="14" fill="#301518" stroke={C.low} strokeWidth="1.8" />
          <L x="590" y="375" fill={C.low} size={13} weight={900} anchor="middle">
            L
          </L>
          <L x="590" y="398" fill={C.low} size={12} weight={800} anchor="middle">
            60° Polarfronten
          </L>
          <L x="590" y="414" fill={C.muted} size={10} anchor="middle">
            Subpolart lavtrykk (Norge)
          </L>

          {/* 90° Polarhøytrykk */}
          <circle cx="780" cy="370" r="14" fill="#13272c" stroke={C.teal} strokeWidth="1.8" />
          <L x="780" y="375" fill={C.teal} size={13} weight={900} anchor="middle">
            H
          </L>
          <L x="780" y="398" fill={C.cold} size={12} weight={800} anchor="middle">
            90° Nordpolen
          </L>
          <L x="780" y="414" fill={C.muted} size={10} anchor="middle">
            Polarhøytrykk (Arktis)
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. HadleyCloseupDiagram
 * Nærbilde av Hadleycellen med ITCZ, tordenskyer, nedsynking ved 30° og passatene.
 */
export function HadleyCloseupDiagram() {
  return (
    <Diagram
      title="Hadley-cellen i nærbilde: Fra ITCZ til 30° breddegrad"
      heading="Hadley-cellen: Konveksjon ved ITCZ og ørkendannelse ved 30°"
      caption="Hadleycellen drives av den intense solinnstrålingen i tropene. Ved den intertropiske konvergenssonen (ITCZ) møtes nordøstpassaten og sørøstpassaten. Den varme, fuktige luften tvinges voldsomt til værs i dype konveksjonstårn (Cumulonimbus). Kondensasjonen frigjør enorme mengder latent varme, som løfter luften helt til tropopausen (16 km). I høyden strømmer den tørkede luften polover, avkjøles og synker ned rundt 30° breddegrad (subtropiske høytrykk / hestebreddegradene). Når luften synker, varmes den adiabatisk, og skydråper fordamper. Her ligger verdens store varme ørkener. Nede ved bakken trekkes luften tilbake mot ITCZ som de stødige passatvindene."
      viewBox="0 0 860 380"
      wide
    >
      {(m) => (
        <>
          {/* Hav/land ved bakken */}
          <rect x="40" y="310" width="780" height="25" fill="#16241e" />
          <line x1="40" y1="310" x2="820" y2="310" stroke={C.dim} strokeWidth="2" />
          <L x="55" y="327" fill={C.muted} size={12}>
            Tropisk hav / jordoverflate
          </L>

          {/* ITCZ / Konveksjonssky ved ekvator (venstre) */}
          <path
            d="M 70 300 Q 60 220 90 170 Q 120 90 160 80 Q 200 90 230 170 Q 260 220 250 300 Z"
            fill="#2c3b47"
            stroke={C.dim}
            strokeWidth="1.8"
          />
          {/* Ambolt ved tropopausen */}
          <path d="M 90 85 L 270 85 Q 290 85 270 105 L 110 105 Z" fill="#3a4c5a" opacity="0.75" />

          {/* Regn fra ITCZ */}
          <Arrow d="M 140 280 L 140 310" marker={m.rain} color={C.rain} width={2.2} />
          <Arrow d="M 180 280 L 180 310" marker={m.rain} color={C.rain} width={2.2} />
          <L x="160" y="270" fill={C.rain} size={12} weight={700} anchor="middle">
            Daglige tropiske byger 🌧️
          </L>

          {/* Oppdriftsstrøm */}
          <Arrow d="M 160 300 L 160 120" marker={m.warm} color={C.warm} width={3.6} />
          <L x="160" y="55" fill={C.low} size={15} weight={900} anchor="middle">
            ITCZ (0°)
          </L>
          <L x="160" y="72" fill={C.warm} size={11} weight={700} anchor="middle">
            Intens konveksjon · Latent varme
          </L>

          {/* Øvre utstrømning mot 30° */}
          <Arrow d="M 270 95 L 670 95" marker={m.warm} color={C.warm} width={3.2} />
          <L x="470" y="80" fill={C.warm} size={14} weight={700} anchor="middle">
            Tørr luft strømmer polover i 12–16 km høyde →
          </L>

          {/* Nedsynking ved 30° (høyre) */}
          <Arrow d="M 710 115 L 710 285" marker={m.sand} color={C.sand} width={3.6} />
          <L x="730" y="175" fill={C.sand} size={14} weight={800}>
            Subsidens
          </L>
          <L x="730" y="195" fill={C.fg} size={11}>
            Varmes adiabatisk
          </L>
          <L x="730" y="210" fill={C.muted} size={11}>
            (+1,0 °C / 100 m)
          </L>
          <L x="730" y="228" fill={C.sand} size={11} weight={700}>
            Skyer fordamper!
          </L>

          {/* Ørkenboks ved 30° */}
          <rect
            x="640"
            y="275"
            width="140"
            height="32"
            rx="4"
            fill="#3a2f1b"
            stroke={C.sand}
            strokeWidth="1.4"
          />
          <L x="710" y="296" fill={C.sand} size={13} weight={800} anchor="middle">
            🏜️ Ørkenbelte (30°)
          </L>

          {/* Passatvinden ved bakken */}
          <Arrow d="M 640 295 L 260 295" marker={m.teal} color={C.teal} width={3.6} />
          <L x="450" y="280" fill={C.teal} size={14} weight={800} anchor="middle">
            ← Nordøstpassaten (suges tilbake mot ITCZ)
          </L>

          {/* Nederste breddegrader */}
          <L x="160" y="355" fill={C.low} size={14} weight={800} anchor="middle">
            Ekvator (0°) · Lavtrykk (ITCZ)
          </L>
          <L x="710" y="355" fill={C.teal} size={14} weight={800} anchor="middle">
            30° breddegrad · Subtropisk høytrykk
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. SurfaceWindsDiagram
 * Viser overflatevinder og Corioliskraftens avbøyning på nordlig halvkule.
 */
export function SurfaceWindsDiagram() {
  return (
    <Diagram
      title="De globale overflatevindene på nordlig halvkule"
      heading="De tre vindbeltene ved bakken: Passater, vestavinder og polare østavinder"
      caption="Vindene ved bakken drives av trykkgradienten mellom de globale trykkbeltene, men avbøyes til høyre av Corioliskraften på nordlig halvkule: 1) Nordøstpassaten (0°–30°N): Luften trekkes sørover mot ITCZ, men avbøyes mot høyre og blåser stabilt fra nordøst mot sørvest. 2) Vestavindsbeltet (30°–60°N): Luften trekkes nordover mot lavtrykkene ved polarfronten og avbøyes kraftig mot høyre, slik at den blåser fra sørvest/vest mot nordøst (dette beltet treffer Norge). 3) Polare østavinder (60°–90°N): Kaldluft strømmer sørover fra polarhøytrykket og avbøyes mot vest (blåser fra øst). Husk at vind alltid navngis etter retningen den kommer fra!"
      viewBox="0 0 860 380"
      wide
    >
      {(m) => (
        <>
          <rect x="90" y="40" width="680" height="270" fill="#122026" rx="8" />
          {[40, 130, 220, 310].map((y) => (
            <line key={y} x1="90" y1={y} x2="770" y2={y} stroke={C.dim} strokeWidth="1.5" />
          ))}

          <L x="78" y="46" fill={C.cold} size={13} weight={700} anchor="end">
            90°N (Nordpolen)
          </L>
          <L x="78" y="136" fill={C.low} size={13} weight={700} anchor="end">
            60°N (Polarfronten)
          </L>
          <L x="78" y="226" fill={C.teal} size={13} weight={700} anchor="end">
            30°N (Subtropene)
          </L>
          <L x="78" y="316" fill={C.warm} size={13} weight={700} anchor="end">
            0° (Ekvator / ITCZ)
          </L>

          {/* Polare østavinder (60–90°N): blåser fra nordøst mot sørvest */}
          <Arrow d="M 540 70 L 320 110" marker={m.cold} color={C.cold} width={3} />
          <Arrow d="M 680 70 L 460 110" marker={m.cold} color={C.cold} width={3} />
          <L x="430" y="65" fill={C.cold} size={14} weight={800} anchor="middle">
            ← Polare østavinder (kald arktisk luft avbøyd mot vest)
          </L>

          {/* Vestavindsbeltet (30–60°N): blåser fra sørvest mot nordøst */}
          <Arrow d="M 260 205 L 560 145" marker={m.warm} color={C.warm} width={3.6} />
          <Arrow d="M 400 205 L 700 145" marker={m.warm} color={C.warm} width={3.6} />
          <L x="480" y="185" fill={C.warm} size={15} weight={900} anchor="middle">
            Vestavindsbeltet (Norge ligger her · mot nordøst →)
          </L>

          {/* Nordøstpassaten (0–30°N): blåser fra nordøst mot sørvest */}
          <Arrow d="M 360 240 L 220 295" marker={m.teal} color={C.teal} width={3.2} />
          <Arrow d="M 520 240 L 380 295" marker={m.teal} color={C.teal} width={3.2} />
          <Arrow d="M 680 240 L 540 295" marker={m.teal} color={C.teal} width={3.2} />
          <L x="450" y="255" fill={C.teal} size={14} weight={800} anchor="middle">
            Nordøstpassaten (fra nordøst mot ITCZ ↙)
          </L>

          {/* Forklaring i bunnen */}
          <rect
            x="90"
            y="325"
            width="680"
            height="42"
            rx="6"
            fill="#141d24"
            stroke={C.dim}
            strokeWidth="1.2"
          />
          <L x="430" y="350" fill={C.sand} size={12} weight={700} anchor="middle">
            Meteorologisk regel: Vinden har alltid navn etter retningen den KOMMER FRA, ikke dit den
            blåser!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. GlobalClimateZonesDiagram
 * Erstatter det gamle flate rektangel-diagrammet og viser de reelle globale klimasonene koblet til cellene.
 */
export function GlobalClimateZonesDiagram() {
  return (
    <Diagram
      title="Globale klimasoner og vegetasjonsbelter"
      heading="Klimabeltene: Cellenes opp- og nedsynking skrevet på jordoverflaten"
      caption="De globale klimabeltene og økosystemene er en direkte konsekvens av hvor i cellene luften stiger eller synker: 1) Ved ITCZ (0°) tvinges luften opp: Voldsom nedbør året rundt gir grobunn for de frodige tropiske regnskogene (Amazonas, Kongo, Indonesia). 2) På 10°–20° breddegrad skifter årstidene mellom tørke og regn i takt med ITCZs vandring, noe som skaper savannen. 3) Ved 30° breddegrad synker luften: Skyer fordamper, og vi får jordens mektigste ørkener (Sahara, Kalahari). 4) På 45°–60° ligger vestavindsbeltet med hyppige lavtrykk og frontnedbør, som gir tempererte løvskoger og boreal barskog (taiga). 5) Over polene synker iskald luft i polarhøytrykket og danner tørr, frossen tundra og polarørken."
      viewBox="0 0 860 420"
      wide
    >
      {() => (
        <>
          {/* Klimasoner som bånd med farger og illustrasjoner */}
          {[
            {
              y: 40,
              h: 55,
              bg: "#10232c",
              border: C.cold,
              zone: "Tundra og polarørken (65°–90°N)",
              mech: "Synkende kaldluft i Polarcellen · Ekstremt tørt og kaldt",
              veg: "Lav, mose, permafrost (Svalbard, Grønland)",
            },
            {
              y: 100,
              h: 55,
              bg: "#1b332b",
              border: "#3d785a",
              zone: "Boreal barskog (Taiga) & Temperert lauvskog (45°–65°N)",
              mech: "Stigende luft ved polarfronten & fuktig vestavindsbelte",
              veg: "Gran, furu, bjørk · Mye nedbør (Norge, Canada, Sibir)",
            },
            {
              y: 160,
              h: 55,
              bg: "#382a17",
              border: C.sand,
              zone: "Subtropisk ørkenbeltet (20°–35°N)",
              mech: "Synkende tørr luft ved 30° (Hadley-subsidens) · Skyfritt",
              veg: "Knusktørt, sanddyner, oaser (Sahara, Den arabiske halvøy)",
            },
            {
              y: 220,
              h: 55,
              bg: "#2b341c",
              border: "#829c42",
              zone: "Tropisk savanne (10°–20°N)",
              mech: "Sesongvandring av ITCZ · Markert regntid og tørketid",
              veg: "Gresslette med spredte akasietrær (Serengeti, Sahel)",
            },
            {
              y: 280,
              h: 55,
              bg: "#133827",
              border: C.teal,
              zone: "Tropisk regnskog (0°–10°N/S)",
              mech: "Maksimal oppdrift ved ITCZ · Daglige kraftige regnskyll",
              veg: "Eviggrønn urskog, enormt artsmangfold (Amazonas, Kongo)",
            },
          ].map((z, idx) => (
            <g key={idx}>
              <rect
                x="40"
                y={z.y}
                width="780"
                height={z.h}
                rx="6"
                fill={z.bg}
                stroke={z.border}
                strokeWidth="1.5"
              />
              <L x="60" y={z.y + 22} fill={z.border} size={14} weight={800}>
                {z.zone}
              </L>
              <L x="60" y={z.y + 42} fill={C.fg} size={11.5}>
                {z.mech}
              </L>
              <L x="800" y={z.y + 32} fill={C.muted} size={12} weight={600} anchor="end">
                {z.veg}
              </L>
            </g>
          ))}

          {/* Oppsummering */}
          <rect
            x="40"
            y="350"
            width="780"
            height="50"
            rx="6"
            fill="#141d24"
            stroke={C.dim}
            strokeWidth="1.2"
          />
          <L x="430" y="372" fill={C.fg} size={12} weight={700} anchor="middle">
            Huskeregel for geofagelever:
          </L>
          <L x="430" y="390" fill={C.sand} size={11.5} anchor="middle">
            Der luften i gjennomsnitt stiger (0° og 60°), blir det skyer og frodig vegetasjon. Der
            den synker (30° og 90°), tørker landskapet ut!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 7. PolarFrontNorwayDiagram
 * Viser polarfronten og vestavinden som treffer Norge og Langfjella.
 */
export function PolarFrontNorwayDiagram() {
  return (
    <Diagram
      title="Polarfronten og været i Norge"
      heading="Polarfronten: Der kald arktisk luft møter fuktig atlanterhavsluft"
      caption="Ved ca. 60°N kolliderer to vidt forskjellige luftmasser: Den kalde, tunge polarluften fra nord og den milde, fuktige luften fra subtropene. Grenseflaten mellom dem kalles polarfronten. Temperatur- og tetthetskontrasten gjør fronten ustabil, og det oppstår bølger der lavtrykk (sykloner) fødes på løpende bånd. Vestavinden fører disse lavtrykkene rett inn mot Norge. Når vestavinden treffer kysten, tvinges luften over Langfjella (orografisk heving): Vestlandet får voldsomme nedbørmengder (loside), mens Østlandet og indre daler havner i regnskygge (leside)."
      viewBox="0 0 860 360"
      wide
    >
      {(m) => (
        <>
          {/* Nord: Kald polarluft */}
          <path d="M 40 40 H 820 V 150 Q 520 110 40 150 Z" fill="#162c38" opacity="0.75" />
          <L x="120" y="80" fill={C.cold} size={16} weight={800}>
            Kald arktisk polarluft (fra nord)
          </L>
          <L x="120" y="100" fill={C.muted} size={12}>
            Tung, tørr luft føres sørover av polare østavinder
          </L>

          {/* Sør: Mild atlanterhavsluft */}
          <path d="M 40 150 Q 520 110 820 150 V 300 H 40 Z" fill="#302016" opacity="0.65" />
          <L x="120" y="250" fill={C.warm} size={16} weight={800}>
            Mild, fuktig atlanterhavsluft (fra sør)
          </L>
          <L x="120" y="270" fill={C.muted} size={12}>
            Varm luft føres nordover av vestavindsbeltet
          </L>

          {/* Polarfronten med bølge */}
          <path
            d="M 40 150 Q 180 120 320 160 Q 460 220 600 140 Q 700 95 820 150"
            fill="none"
            stroke={C.low}
            strokeWidth="3.6"
          />
          <L x="430" y="200" fill={C.low} size={15} weight={900} anchor="middle">
            POLARFRONTEN
          </L>

          {/* Lavtrykk på frontbølgen */}
          <circle cx="520" cy="155" r="24" fill="#301518" stroke={C.low} strokeWidth="2.4" />
          <L x="520" y="162" fill={C.low} size={18} weight={900} anchor="middle">
            L
          </L>
          <Arrow d="M 230 165 L 480 155" marker={m.teal} color={C.teal} width={3.2} />
          <L x="355" y="148" fill={C.teal} size={13} weight={800}>
            Vestavinden styrer lavtrykkene mot Norge →
          </L>

          {/* Langfjella profil */}
          <path
            d="M 670 230 L 710 130 L 750 230 Z"
            fill="#2d3f35"
            stroke={C.dim}
            strokeWidth="1.6"
          />
          <L x="710" y="252" fill={C.fg} size={13} weight={800} anchor="middle">
            Langfjella
          </L>
          <L x="650" y="175" fill={C.rain} size={13} weight={800} anchor="end">
            Vestlandet: Loside 🌧️
          </L>
          <L x="650" y="192" fill={C.muted} size={10.5} anchor="end">
            Orografisk nedbør (Brekke)
          </L>

          <L x="770" y="175" fill={C.warm} size={13} weight={800}>
            Østlandet: Leside ☀️
          </L>
          <L x="770" y="192" fill={C.muted} size={10.5}>
            Regnskygge & føn (Skjåk/Hamar)
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 8. RossbyWavesDiagram
 * Viser hvordan polarfrontjeten meandrerer i Rossbybølger og styrer høytrykksrygger og lavtrykkstraug over Norge.
 */
export function RossbyWavesDiagram() {
  return (
    <Diagram
      title="Rossbybølger i polarfrontjeten"
      heading="Rossbybølger: Jetstrømmens meandere som avgjør ukas vær i Norge"
      caption="Polarfrontjeten blåser ikke i en rett linje rundt kloden, men bukter seg i gigantiske planetære meandere som kalles Rossbybølger (oppkalt etter den svensk-amerikanske meteorologen Carl-Gustaf Rossby). En bølgeform består av to nøkkelelementer: 1) Traug (bølgedal mot sør): Her trenger iskald arktisk luft langt sørover, og det dannes urolig lavtrykksvær med byger og storm. 2) Rygg (bølgetopp mot nord): Her presses varm subtropisk luft nordover, noe som gir stabilt høytrykk og tørt klarvær. Hvis en bølge snøres av, oppstår et 'blokkerende høytrykk' som kan låse været i samme spor over Skandinavia i ukevis."
      viewBox="0 0 860 400"
      wide
    >
      {(m) => (
        <>
          {/* Bakgrunnsfelt: Arktis nord, Subtropene sør */}
          <rect x="40" y="40" width="780" height="130" fill="#122430" opacity="0.6" rx="4" />
          <L x="60" y="65" fill={C.cold} size={14} weight={800}>
            Arktisk luftmasse (Kald og tett)
          </L>

          <rect x="40" y="210" width="780" height="130" fill="#2c2016" opacity="0.5" rx="4" />
          <L x="60" y="325" fill={C.warm} size={14} weight={800}>
            Subtropisk luftmasse (Varm og fuktig)
          </L>

          {/* Meandrerende jetstrøm / Rossbybølge */}
          <path
            d="M 60 180 C 160 80, 260 80, 360 210 C 460 340, 560 340, 660 160 C 730 60, 780 140, 820 180"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="16"
            opacity="0.25"
          />
          <path
            d="M 60 180 C 160 80, 260 80, 360 210 C 460 340, 560 340, 660 160 C 730 60, 780 140, 820 180"
            fill="none"
            stroke={C.teal}
            strokeWidth="4"
          />

          {/* Jetstrømpiler */}
          <Arrow d="M 120 125 L 200 85" marker={m.teal} color={C.teal} width={3.2} />
          <Arrow d="M 310 160 L 400 280" marker={m.teal} color={C.teal} width={3.2} />
          <Arrow d="M 520 310 L 610 200" marker={m.teal} color={C.teal} width={3.2} />

          {/* BØLGETOPP (RYGG) TIL VENSTRE */}
          <rect
            x="150"
            y="70"
            width="140"
            height="55"
            rx="6"
            fill="#1e2c22"
            stroke={C.warm}
            strokeWidth="1.5"
          />
          <L x="220" y="92" fill={C.warm} size={13} weight={800} anchor="middle">
            RYGG (Bølgetopp)
          </L>
          <L x="220" y="112" fill={C.fg} size={11} anchor="middle">
            Høytrykk · Mild luft nordover
          </L>

          {/* BØLGEDAL (TRAUG) I MIDTEN */}
          <rect
            x="440"
            y="270"
            width="160"
            height="55"
            rx="6"
            fill="#2c1719"
            stroke={C.low}
            strokeWidth="1.5"
          />
          <L x="520" y="292" fill={C.low} size={13} weight={800} anchor="middle">
            TRAUG (Bølgedal)
          </L>
          <L x="520" y="312" fill={C.fg} size={11} anchor="middle">
            Lavtrykk · Polarluft sørover
          </L>

          {/* Blokkering / Norge-posisjon */}
          <circle cx="680" cy="140" r="22" fill="#13272c" stroke={C.teal} strokeWidth="2.2" />
          <L x="680" y="146" fill={C.teal} size={15} weight={900} anchor="middle">
            H
          </L>
          <L x="680" y="105" fill={C.teal} size={12} weight={800} anchor="middle">
            Blokkerende høytrykk
          </L>
          <L x="680" y="180" fill={C.muted} size={11} anchor="middle">
            (over Skandinavia)
          </L>

          {/* Tekstboks bunn */}
          <rect
            x="40"
            y="348"
            width="780"
            height="42"
            rx="6"
            fill="#141d24"
            stroke={C.dim}
            strokeWidth="1.2"
          />
          <L x="430" y="374" fill={C.sand} size={12} weight={700} anchor="middle">
            Værvarslerens hemmelighet: Ligger Norge i et traug, får vi regn og kulde. Ligger Norge i
            en rygg, får vi sol og varme!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 9. JetStreamDiagram (Beholdt for bakoverkompatibilitet)
 */
export function JetStreamDiagram() {
  return (
    <Diagram
      title="Polarfrontjeten"
      heading="En elv av luft i 8–12 km høyde"
      caption="Der temperaturforskjellen mellom tropene og polene er størst i høyden, blir trykkforskjellen stor. Resultatet er en smal, sterk vestlig jetstrøm. Den styrer hvor lavtrykkene går — og om Norge får milde eller kalde perioder."
      viewBox="0 0 820 280"
    >
      {(m) => (
        <>
          <L x="40" y="36" fill={C.muted} size={13}>
            høyde
          </L>
          <L x="40" y="70" fill={C.muted} size={12}>
            10 km
          </L>
          <line x1="80" y1="74" x2="780" y2="74" stroke={C.dim} strokeDasharray="4 4" />
          <path
            d="M 90 88 C 200 40, 340 40, 430 88 C 520 136, 640 136, 740 88"
            fill="none"
            stroke={C.teal}
            strokeWidth="10"
            opacity="0.35"
          />
          <Arrow
            d="M 120 88 C 220 50, 330 50, 430 88 C 530 126, 640 126, 720 92"
            marker={m.teal}
            color={C.teal}
            width={3.4}
          />
          <L x="430" y="48" fill={C.teal} size={15} anchor="middle">
            polarfrontjet · vest → øst
          </L>
          <line x1="80" y1="220" x2="780" y2="220" stroke={C.teal} strokeWidth="2" />
          <L x="90" y="244" fill={C.warm} size={14}>
            varm luft sør for fronten
          </L>
          <L x="730" y="244" fill={C.cold} size={14} anchor="end">
            kald luft nord for fronten
          </L>
          <L x="430" y="268" fill={C.muted} size={13} anchor="middle">
            overflaten
          </L>
        </>
      )}
    </Diagram>
  );
}

export const ClimateBeltsDiagram = GlobalClimateZonesDiagram;
