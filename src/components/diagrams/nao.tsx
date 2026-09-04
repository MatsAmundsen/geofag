import { Arrow, C, Diagram, L, font } from "./svg-kit";

/**
 * NaoRossbyDiagram:
 * Pedagogisk kart over Nord-Atlanteren som viser Rossby-bølger i polarjeten:
 * rygger (høytrykk) med varmluftstransport nordover, og daler (lavtrykkstrau)
 * med kaldluftsutbrudd sørover.
 */
export function NaoRossbyDiagram() {
  return (
    <Diagram
      title="Rossby-bølger over Nord-Atlanteren og Europa"
      heading="Rossby-bølger: rygger, daler og luftmasse-transport"
      caption="Polarjeten danner store planetære bølger (Rossby-bølger). En rygg bøyer nordover og bringer varm subtropisk luft mot Arktis, mens en dal (trau) graver sørover og fører med seg iskald arktisk luft. Sterke bølger bremser forflytningen og gir langvarige blokkerende værsituasjoner (typisk for NAO−). En rett jet uten store bølger gir derimot rask vestavind (NAO+)."
      viewBox="0 0 840 380"
    >
      {(m) => (
        <>
          {/* Bakgrunnsflater for landmasser (stiliserte) */}
          {/* Nord-Amerika */}
          <path
            d="M 40 120 C 70 110, 110 130, 120 180 C 130 230, 100 280, 50 310 L 30 310 Z"
            fill="#18242e"
            stroke={C.dim}
          />
          <L x={75} y={210} fill={C.muted} size={12} weight={600}>
            Nord-Amerika
          </L>

          {/* Grønland */}
          <path
            d="M 230 70 C 270 65, 300 80, 310 115 C 290 145, 250 145, 230 130 Z"
            fill="#1e2c38"
            stroke={C.dim}
          />
          <L x={265} y={105} fill={C.muted} size={11} weight={600} anchor="middle">
            Grønland
          </L>

          {/* Storbritannia & Skandinavia */}
          <path
            d="M 490 190 C 510 185, 520 200, 515 225 C 500 230, 490 215, 490 190 Z"
            fill="#18242e"
            stroke={C.dim}
          />
          <path
            d="M 550 90 C 580 80, 610 100, 630 140 C 600 170, 580 180, 560 160 C 550 140, 545 110, 550 90 Z"
            fill="#18242e"
            stroke={C.dim}
          />
          <L x={590} y={135} fill={C.muted} size={12} weight={600}>
            Norge
          </L>

          {/* Sør-Europa / Middelhavet */}
          <path
            d="M 500 270 C 560 260, 640 270, 690 300 L 480 300 Z"
            fill="#18242e"
            stroke={C.dim}
          />
          <L x={560} y={290} fill={C.muted} size={11} weight={600}>
            Middelhavet
          </L>

          {/* Varm luft- og kald luft-soner bak jetstrømmen */}
          {/* Kald luft i dal 1 (Canada/V-Atlanteren) */}
          <path
            d="M 90 90 C 140 120, 180 230, 240 250 C 180 250, 120 230, 90 90 Z"
            fill={C.cold}
            opacity={0.12}
          />
          {/* Varm luft i rygg (Sentral-Atlanteren) */}
          <path
            d="M 240 250 C 310 260, 370 120, 440 100 C 420 180, 360 250, 240 250 Z"
            fill={C.warm}
            opacity={0.15}
          />
          {/* Kald luft i dal 2 (Norge/Skandinavia) */}
          <path
            d="M 440 100 C 510 90, 570 240, 640 250 C 580 260, 520 230, 440 100 Z"
            fill={C.cold}
            opacity={0.12}
          />

          {/* Jetstrømmen som bølgende elv (Rossby-bølge) */}
          <path
            d="M 50 140 C 120 170, 180 260, 240 260 C 320 260, 380 90, 450 90 C 520 90, 580 260, 650 260 C 720 260, 770 160, 810 140"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="12"
            strokeLinecap="round"
            opacity={0.25}
          />
          <path
            d="M 50 140 C 120 170, 180 260, 240 260 C 320 260, 380 90, 450 90 C 520 90, 580 260, 650 260 C 720 260, 770 160, 810 140"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="4"
            strokeDasharray="10 5"
          />

          {/* Pilmarkører for jetretning */}
          <Arrow d="M 170 245 L 215 260" marker={m.warm} color="#fbbf24" width={3} />
          <Arrow d="M 330 180 L 365 140" marker={m.warm} color="#fbbf24" width={3} />
          <Arrow d="M 500 140 L 535 180" marker={m.warm} color="#fbbf24" width={3} />
          <Arrow d="M 680 240 L 725 210" marker={m.warm} color="#fbbf24" width={3} />

          {/* Etiketter: Rygg (H) og Dal (L) */}
          {/* Dal 1 */}
          <circle cx="200" cy="210" r="22" fill="#0f171c" stroke={C.low} strokeWidth="2.2" />
          <L x={200} y={217} fill={C.low} size={16} weight={700} anchor="middle">
            L
          </L>
          <L x={200} y={248} fill={C.low} size={11} weight={600} anchor="middle">
            Trau (Dal)
          </L>

          {/* Rygg */}
          <circle cx="410" cy="130" r="22" fill="#0f171c" stroke={C.teal} strokeWidth="2.2" />
          <L x={410} y={137} fill={C.teal} size={16} weight={700} anchor="middle">
            H
          </L>
          <L x={410} y={168} fill={C.teal} size={11} weight={600} anchor="middle">
            Rygg
          </L>

          {/* Dal 2 */}
          <circle cx="610" cy="210" r="22" fill="#0f171c" stroke={C.low} strokeWidth="2.2" />
          <L x={610} y={217} fill={C.low} size={16} weight={700} anchor="middle">
            L
          </L>
          <L x={610} y={248} fill={C.low} size={11} weight={600} anchor="middle">
            Trau (Dal)
          </L>

          {/* Lufttransport-piler */}
          {/* Varm luft opp i ryggen */}
          <Arrow d="M 360 270 Q 380 200 420 170" marker={m.warm} color={C.warm} width={2.4} />
          <L x={350} y={240} fill={C.warm} size={11} weight={600}>
            Varm subtropisk luft nordover
          </L>

          {/* Kald luft ned i dalen over Europa */}
          <Arrow d="M 520 70 Q 560 140 590 190" marker={m.cold} color={C.cold} width={2.4} />
          <L x={555} y={90} fill={C.cold} size={11} weight={600}>
            Kald polarluft sørover
          </L>

          {/* Forklarende boks nederst */}
          <rect x="50" y="325" width="740" height="42" rx="6" fill="#152028" stroke={C.dim} />
          <L x={70} y={345} fill={C.fg} size={12} weight={600}>
            Sonal jet (NAO+):
          </L>
          <L x={185} y={345} fill={C.muted} size={12}>
            Rette bølger, sterk vestavind rett mot Norge, milde stormer.
          </L>
          <L x={70} y={360} fill={C.fg} size={12} weight={600}>
            Meridional jet (NAO−):
          </L>
          <L x={205} y={360} fill={C.muted} size={12}>
            Dype bølger, blokkerende høytrykk, kuldeutbrudd eller fastlåst tørke.
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * NaoEnsoTeleconnectionDiagram:
 * To-panel sammenligning som forklarer Rossby-broen (telekonneksjon)
 * fra ENSO i Stillehavet til NAO i Nord-Atlanteren.
 */
export function NaoEnsoTeleconnectionDiagram() {
  return (
    <Diagram
      title="Fra ENSO til NAO: Den atmosfæriske broen"
      heading="Telekonneksjoner: Hvordan Stillehavet snakker med Atlanteren"
      caption="Tropisk konveksjon under El Niño og La Niña sender ut planetære bølgetog (PNA-mønster) over Nord-Amerika. El Niño forstyrrer ofte den arktiske polarvirvelen i stratosfæren, noe som forplanter seg ned og øker sannsynligheten for en negativ NAO (kaldere vintre). La Niña gir oftere en sterk, stabil polarvirvel og en rett polarjet mot Nord-Europa (NAO+)."
      viewBox="0 0 860 380"
    >
      {(m) => (
        <>
          {/* Panel 1: El Niño -> NAO- tendens */}
          <rect x="25" y="45" width="395" height="315" rx="8" fill="#121d24" stroke={C.dim} />
          <rect x="25" y="45" width="395" height="34" rx="8" fill="#1c2c37" />
          <L x={45} y={67} fill={C.warm} size={14} weight={700}>
            El Niño → Tendens mot NAO−
          </L>

          {/* Stillehavet vest */}
          <rect x="45" y="95" width="90" height="45" rx="5" fill="#3a1c1c" stroke={C.warm} />
          <L x={90} y={114} fill={C.warm} size={11} weight={600} anchor="middle">
            Varmt hav
          </L>
          <L x={90} y={128} fill={C.muted} size={10} anchor="middle">
            Tropisk Stillehav
          </L>

          {/* Bølgetog over Nord-Amerika */}
          <Arrow d="M 140 115 Q 185 85 220 120" marker={m.warm} color={C.warm} width={2.2} />
          <Arrow d="M 220 120 Q 255 155 295 110" marker={m.warm} color={C.warm} width={2.2} />
          <L x={220} y={80} fill={C.muted} size={11} anchor="middle">
            Rossby-bølgetog (PNA)
          </L>

          {/* Stratosfærisk polarvirvel forstyrret */}
          <rect x="270" y="90" width="130" height="50" rx="5" fill="#241926" stroke="#c084fc" />
          <L x={335} y={110} fill="#d8b4fe" size={11} weight={700} anchor="middle">
            Svekket polarvirvel
          </L>
          <L x={335} y={126} fill={C.muted} size={10} anchor="middle">
            Stratosfærisk oppvarming (SSW)
          </L>

          {/* Kobling ned til Atlanteren */}
          <Arrow d="M 335 145 L 335 185" marker={m.cold} color="#d8b4fe" width={2.5} />
          <L x={345} y={170} fill="#d8b4fe" size={10}>
            Nedkobling
          </L>

          {/* NAO- situasjon */}
          <rect x="45" y="195" width="355" height="150" rx="6" fill="#16222b" />
          <L x={60} y={218} fill={C.fg} size={13} weight={600}>
            Utfall i Nord-Atlanteren:
          </L>
          <circle cx="85" cy="245" r="14" fill="#0f171c" stroke={C.low} strokeWidth="1.8" />
          <L x={85} y={250} fill={C.low} size={12} weight={700} anchor="middle">
            L
          </L>
          <L x={110} y={250} fill={C.muted} size={11}>
            Svekket Islandslavtrykk
          </L>

          <circle cx="85" cy="278" r="14" fill="#0f171c" stroke={C.teal} strokeWidth="1.8" />
          <L x={85} y={283} fill={C.teal} size={12} weight={700} anchor="middle">
            H
          </L>
          <L x={110} y={283} fill={C.muted} size={11}>
            Svekket Azorhøytrykk
          </L>

          {/* Jetbølge */}
          <path d="M 230 270 Q 280 230 330 280 Q 370 300 385 270" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
          <L x={310} y={245} fill="#fbbf24" size={10} weight={600} anchor="middle">
            Bølget jet
          </L>
          <L x={60} y={325} fill={C.cold} size={12} weight={600}>
            Resultat: Ofte kald, tørr blokkeringsvinter i Norge.
          </L>

          {/* Panel 2: La Niña -> NAO+ tendens */}
          <rect x="440" y="45" width="395" height="315" rx="8" fill="#121d24" stroke={C.dim} />
          <rect x="440" y="45" width="395" height="34" rx="8" fill="#1c2c37" />
          <L x={460} y={67} fill={C.teal} size={14} weight={700}>
            La Niña → Tendens mot NAO+
          </L>

          {/* Stillehavet vest */}
          <rect x="460" y="95" width="90" height="45" rx="5" fill="#152b36" stroke={C.teal} />
          <L x={505} y={114} fill={C.teal} size={11} weight={600} anchor="middle">
            Kjølig hav
          </L>
          <L x={505} y={128} fill={C.muted} size={10} anchor="middle">
            Øst-Stillehavet
          </L>

          {/* Rettere bølgetog */}
          <Arrow d="M 555 118 L 675 118" marker={m.teal} color={C.teal} width={2.2} />
          <L x={615} y={105} fill={C.muted} size={11} anchor="middle">
            Svakere forstyrrelser
          </L>

          {/* Polarvirvel sterk */}
          <rect x="685" y="90" width="130" height="50" rx="5" fill="#162e3b" stroke={C.teal} />
          <L x={750} y={110} fill={C.teal} size={11} weight={700} anchor="middle">
            Sterk polarvirvel
          </L>
          <L x={750} y={126} fill={C.muted} size={10} anchor="middle">
            Kald, stabil kjerne
          </L>

          {/* Nedstrøms kobling */}
          <Arrow d="M 750 145 L 750 185" marker={m.teal} color={C.teal} width={2.5} />
          <L x={760} y={170} fill={C.teal} size={10}>
            Støtter zonalt drag
          </L>

          {/* NAO+ situasjon */}
          <rect x="460" y="195" width="355" height="150" rx="6" fill="#16222b" />
          <L x={475} y={218} fill={C.fg} size={13} weight={600}>
            Utfall i Nord-Atlanteren:
          </L>
          <circle cx="500" cy="245" r="14" fill="#0f171c" stroke={C.low} strokeWidth="1.8" />
          <L x={500} y={250} fill={C.low} size={12} weight={700} anchor="middle">
            L
          </L>
          <L x={525} y={250} fill={C.muted} size={11}>
            Dypt Islandslavtrykk
          </L>

          <circle cx="500" cy="278" r="14" fill="#0f171c" stroke={C.teal} strokeWidth="1.8" />
          <L x={500} y={283} fill={C.teal} size={12} weight={700} anchor="middle">
            H
          </L>
          <L x={525} y={283} fill={C.muted} size={11}>
            Kraftig Azorhøytrykk
          </L>

          {/* Rett jet */}
          <Arrow d="M 645 260 L 785 260" marker={m.warm} color="#fbbf24" width={3.5} />
          <L x={715} y={250} fill="#fbbf24" size={10} weight={600} anchor="middle">
            Rett, sterk jet
          </L>
          <L x={475} y={325} fill={C.warm} size={12} weight={600}>
            Resultat: Milde, fuktige atlanterhavsstormer mot Norge.
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * NaoIndexStationsDiagram:
 * Pedagogisk kart over stasjonene Ponta Delgada (Azorene) / Lisboa
 * og Reykjavík (Island) som brukes til å definere NAO-indeksen.
 */
export function NaoIndexStationsDiagram() {
  return (
    <Diagram
      title="NAO-indeksen: Målestasjonene og trykkdifferansen"
      heading="NAO-indeksen: To målestasjoner som definerer vippa"
      caption="NAO-indeksen beregnes ved å måle normalisert lufttrykk i sør (Ponta Delgada på Azorene eller Lisboa) minus lufttrykk i nord (Reykjavík eller Stykkishólmur på Island). Stor differanse (NAO+) betyr kraftig trykkgradient og sterk vestavind mot Norge. Liten differanse (NAO−) betyr svak vestavind og ofte blokkerende kulde."
      viewBox="0 0 860 380"
    >
      {(m) => (
        <>
          {/* Venstre side: Kart over Atlanteren med stasjonene */}
          <rect x="25" y="45" width="500" height="315" rx="8" fill="#121d24" stroke={C.dim} />

          {/* Omriss av kyster */}
          {/* Grønland */}
          <path d="M 60 70 C 110 65, 140 85, 140 120 C 100 135, 70 120, 60 70 Z" fill="#18242e" stroke={C.dim} />
          <L x={95} y={95} fill={C.muted} size={10} weight={600} anchor="middle">
            Grønland
          </L>

          {/* Island */}
          <path d="M 210 100 C 235 95, 255 105, 250 125 C 230 135, 210 125, 210 100 Z" fill="#203240" stroke={C.teal} strokeWidth="1.2" />
          
          {/* Norge / Skandinavia */}
          <path d="M 370 70 C 400 65, 430 90, 440 140 C 410 160, 390 140, 375 110 Z" fill="#18242e" stroke={C.dim} />
          <L x={405} y={110} fill={C.muted} size={11} weight={600}>
            Norge
          </L>

          {/* De britiske øyer */}
          <path d="M 320 145 C 340 140, 350 160, 345 180 C 330 185, 320 170, 320 145 Z" fill="#18242e" stroke={C.dim} />

          {/* Den iberiske halvøy (Portugal/Spania) */}
          <path d="M 330 240 C 380 235, 410 250, 400 295 L 340 295 Z" fill="#18242e" stroke={C.dim} />

          {/* Målestasjon Nord: Reykjavík */}
          <circle cx="230" cy="115" r="7" fill={C.low} stroke="#0f171c" strokeWidth="2" />
          <circle cx="230" cy="115" r="16" fill="none" stroke={C.low} strokeWidth="1.2" strokeDasharray="3 3" />
          <L x={230} y={92} fill={C.low} size={13} weight={700} anchor="middle">
            Reykjavík (Island)
          </L>
          <L x={230} y={145} fill={C.muted} size={10} anchor="middle">
            64,1° N · Islandslavtrykket
          </L>

          {/* Målestasjon Sør 1: Ponta Delgada (Azorene) */}
          <circle cx="170" cy="255" r="7" fill={C.teal} stroke="#0f171c" strokeWidth="2" />
          <circle cx="170" cy="255" r="16" fill="none" stroke={C.teal} strokeWidth="1.2" strokeDasharray="3 3" />
          <L x={170} y={282} fill={C.teal} size={12} weight={700} anchor="middle">
            Ponta Delgada (Azorene)
          </L>
          <L x={170} y={298} fill={C.muted} size={10} anchor="middle">
            37,7° N · Azorhøytrykket
          </L>

          {/* Målestasjon Sør 2: Lisboa */}
          <circle cx="342" cy="265" r="5" fill={C.teal} stroke="#0f171c" strokeWidth="1.5" />
          <L x={354} y={270} fill={C.teal} size={11} weight={600}>
            Lisboa
          </L>

          {/* Trykkakse mellom dem */}
          <line x1="175" y1="240" x2="225" y2="130" stroke={C.white} strokeDasharray="4 4" strokeWidth="1.6" opacity="0.6" />
          <Arrow d="M 185 210 L 215 150" marker={m.warm} color="#fbbf24" width={2} />
          <L x={215} y={185} fill="#fbbf24" size={11} weight={600}>
            Trykkgradient (ΔP)
          </L>

          {/* Høyre side: Indekstolper og formel */}
          <rect x="545" y="45" width="290" height="315" rx="8" fill="#121d24" stroke={C.dim} />
          <L x={565} y={75} fill={C.fg} size={14} weight={700}>
            Hvordan indeksen tolkes
          </L>

          {/* Formelboks */}
          <rect x="565" y="90" width="250" height="42" rx="5" fill="#18242e" stroke={C.dim} />
          <L x={690} y={116} fill={C.teal} size={13} weight={600} anchor="middle">
            NAO = P(sør) − P(nord)
          </L>

          {/* NAO+ stolpe */}
          <rect x="565" y="150" width="250" height="85" rx="6" fill="#17282b" stroke={C.teal} strokeWidth="1.5" />
          <L x={580} y={172} fill={C.teal} size={13} weight={700}>
            Positiv NAO (NAO+ &gt; 0)
          </L>
          <L x={580} y={192} fill={C.fg} size={11}>
            • Dypere Island-L og sterkere Azor-H
          </L>
          <L x={580} y={208} fill={C.fg} size={11}>
            • Stor trykkgradient → kraftig vestavind
          </L>
          <L x={580} y={224} fill={C.warm} size={11} weight={600}>
            → Mild, våt og vindfull vinter i Norge
          </L>

          {/* NAO- stolpe */}
          <rect x="565" y="250" width="250" height="85" rx="6" fill="#251b22" stroke={C.cold} strokeWidth="1.5" />
          <L x={580} y={272} fill={C.cold} size={13} weight={700}>
            Negativ NAO (NAO− &lt; 0)
          </L>
          <L x={580} y={292} fill={C.fg} size={11}>
            • Både Island-L og Azor-H er svake
          </L>
          <L x={580} y={308} fill={C.fg} size={11}>
            • Liten gradient → svak, bølget jetstrøm
          </L>
          <L x={580} y={324} fill={C.cold} size={11} weight={600}>
            → Kald, tørr vinter i Norge (blokkering)
          </L>
        </>
      )}
    </Diagram>
  );
}
