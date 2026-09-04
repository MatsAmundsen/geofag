import { Arrow, C, Diagram, L } from "./svg-kit";

export function GlacierMassBalanceDiagram() {
  return (
    <Diagram
      title="Massebalanse på en bre: akkumulasjonsområde, likevektslinje (ELA) og ablasjonsområde"
      heading="Massebalanse på en isbre"
      caption="Massebalanse er netto tilvekst eller tap av is over et hydrologisk år: akkumulasjon (snøfall) minus ablasjon (smelting og kalving). Likevektslinjen (ELA) skiller områder med netto overskudd fra områder med netto underskudd."
      viewBox="0 0 900 440"
      wide
    >
      {(m) => (
        <>
          {/* Fjellprofil under breen */}
          <path d="M 50 140 L 220 80 L 450 160 L 680 280 L 850 360 L 850 400 L 50 400 Z" fill="#141a20" stroke={C.dim} strokeWidth="1.5" />

          {/* Isbremasse (Tverrsnitt) */}
          <path
            d="M 120 120 C 220 70, 360 110, 480 180 C 580 240, 680 270, 750 320 L 730 330 C 660 290, 560 250, 450 190 C 350 140, 230 110, 120 120 Z"
            fill="#1e3442"
            stroke={C.cold}
            strokeWidth="2"
          />

          {/* Akkumulasjonsområde - snølag øverst */}
          <path
            d="M 120 120 C 220 70, 320 95, 430 150 L 425 170 C 320 115, 220 90, 120 120 Z"
            fill="#45677d"
            opacity="0.8"
          />
          <L x="260" y="70" fill={C.fg} size={16} weight={700} anchor="middle">Akkumulasjonsområde</L>
          <L x="260" y="90" fill={C.teal} size={13} anchor="middle">Vintersnø overlever sommeren (Netto overskudd: b &gt; 0)</L>
          {/* Snøfallpiler */}
          <Arrow d="M 200 30 L 200 65" marker={m.teal} color={C.teal} width={2.2} />
          <Arrow d="M 280 25 L 280 60" marker={m.teal} color={C.teal} width={2.2} />
          <Arrow d="M 360 40 L 360 80" marker={m.teal} color={C.teal} width={2.2} />

          {/* Likevektslinje ELA (Equilibrium Line Altitude) */}
          <line x1="390" y1="110" x2="490" y2="230" stroke={C.warm} strokeWidth="2.5" strokeDasharray="6 4" />
          <circle cx="435" cy="165" r="5" fill={C.warm} />
          <L x="455" y="145" fill={C.warm} size={15} weight={700}>Likevektslinje (ELA)</L>
          <L x="455" y="165" fill={C.fg} size={12}>Akkumulasjon = Ablasjon</L>
          <L x="455" y="182" fill={C.muted} size={11}>Årlig netto massebalanse = 0</L>

          {/* Ablasjonsområde - smelting nederst */}
          <L x="640" y="235" fill={C.low} size={16} weight={700}>Ablasjonsområde</L>
          <L x="640" y="255" fill={C.fg} size={13}>Smelting og kalving &gt; vintersnø (Netto tap: b &lt; 0)</L>
          {/* Smeltevann/sol-indikator */}
          <Arrow d="M 620 270 L 640 295" marker={m.low} color={C.low} width={2} />
          <Arrow d="M 680 290 L 700 315" marker={m.low} color={C.low} width={2} />

          {/* Breelv ved brefronten */}
          <path d="M 740 330 C 770 345, 810 360, 850 375" fill="none" stroke={C.rain} strokeWidth="4" />
          <L x="800" y="350" fill={C.rain} size={13} weight={600}>Breelv / smeltevann</L>

          {/* Isstrømning inne i breen */}
          <Arrow d="M 280 120 C 400 160, 520 220, 650 280" marker={m.cold} color={C.cold} width={3.2} />
          <L x="500" y="240" fill={C.cold} size={12} weight={600}>Plastisk isbevegelse under tyngdekraft</L>

          {/* Forklarende formelboks i bunn */}
          <rect x="50" y="360" width="480" height="65" rx="8" fill="#13232c" stroke={C.teal} strokeWidth="1.4" />
          <L x="70" y="385" fill={C.teal} size={14} weight={700}>Massebalanselikningen:</L>
          <L x="235" y="385" fill={C.fg} size={14} weight={600}>b = c - a</L>
          <L x="70" y="407" fill={C.muted} size={12}>b: netto balanse · c: akkumulasjon (tilvekst) · a: ablasjon (tap). Hvis b &lt; 0 over tid, trekker breen seg tilbake.</L>
        </>
      )}
    </Diagram>
  );
}

export function PermafrostDiagram() {
  return (
    <Diagram
      title="Permafrostprofil: aktivt lag, permafrostbord, permafrost og talik under innsjø"
      heading="Permafrost og aktivt lag"
      caption="Permafrost er definert som grunn som holder under 0 °C i minst to sammenhengende år. Det øverste laget tiner om sommeren og kalles det aktive laget. Dype innsjøer kan ha en ufrosset sone under seg, kalt talik."
      viewBox="0 0 900 420"
      wide
    >
      {() => (
        <>
          {/* Overflate og vegetasjon */}
          <rect x="50" y="40" width="800" height="340" rx="10" fill="#11181e" stroke={C.dim} strokeWidth="1.5" />

          {/* Aktivt lag (øverste 1-2 meter) */}
          <path d="M 50 60 L 400 60 C 440 60, 480 90, 530 90 C 580 90, 610 60, 650 60 L 850 60 L 850 110 L 50 110 Z" fill="#2d281e" />
          <L x="80" y="88" fill={C.sand} size={15} weight={700}>Aktivt lag (tiner om sommeren, 0,5 – 2 m)</L>
          <L x="80" y="104" fill={C.muted} size={11}>Sesongtining, mettet av smeltevann, utsatt for solifluksjon (jordsig)</L>

          {/* Innsjø overflate */}
          <path d="M 430 60 C 470 60, 490 85, 540 85 C 590 85, 600 60, 640 60 Z" fill={C.rain} opacity="0.8" />
          <L x="535" y="75" fill="#0b1720" size={13} weight={700} anchor="middle">Arktisk innsjø (&gt;2 m dyp)</L>

          {/* Permafrostbordet (stiplet linje) */}
          <line x1="50" y1="110" x2="850" y2="110" stroke={C.cold} strokeWidth="2" strokeDasharray="6 4" />
          <L x="750" y="104" fill={C.cold} size={12} weight={700} anchor="end">Permafrostbordet (0 °C isoterm)</L>

          {/* Kontinuerlig permafrost */}
          <path
            d="M 50 110 L 420 110 C 450 160, 470 240, 540 240 C 610 240, 630 160, 660 110 L 850 110 L 850 340 L 50 340 Z"
            fill="#182c38"
            stroke={C.teal}
            strokeWidth="1.2"
          />
          <L x="120" y="170" fill={C.teal} size={17} weight={700}>Permafrost (T &lt; 0 °C i &gt; 2 år)</L>
          <L x="120" y="195" fill={C.fg} size={13}>Fastfrosset porevann danner iskiler og sementerer løsmassene.</L>
          <L x="120" y="215" fill={C.muted} size={12}>Tykkelse i Norge: opptil 500 m på Svalbard, flekkvis i høyfjellet (Jotunheimen, Dovre).</L>

          {/* Talik (ufrosset lomme under innsjøen) */}
          <path d="M 420 110 C 450 160, 470 240, 540 240 C 610 240, 630 160, 660 110 Z" fill="#2d2218" stroke={C.warm} strokeWidth="1.6" />
          <L x="540" y="160" fill={C.warm} size={15} weight={700} anchor="middle">Talik</L>
          <L x="540" y="180" fill={C.fg} size={12} anchor="middle">Ufrosset sone</L>
          <L x="540" y="196" fill={C.muted} size={11} anchor="middle">Innsjøen bunnfryser ikke</L>

          {/* Bunn av permafrost og geotermisk varme */}
          <line x1="50" y1="340" x2="850" y2="340" stroke={C.warm} strokeWidth="2" strokeDasharray="4 4" />
          <L x="80" y="365" fill={C.warm} size={13} weight={600}>Jordas indre varme (geotermisk gradient) tiner permafrosten nedenfra.</L>
        </>
      )}
    </Diagram>
  );
}

export function SeaIceAlbedoFeedbackDiagram() {
  return (
    <Diagram
      title="Havis og albedo-tilbakekobling: 80 % refleksjon fra is vs 90 % absorpsjon i åpent hav"
      heading="Havis og den positive albedo-tilbakekoblingen"
      caption="Når kloden varmes opp, smelter havisen. Den hvite, reflekterende overflaten (høy albedo) erstattes av mørkt, åpent hav (lav albedo) som absorberer langt mer solvarme. Dette fører til ytterligere oppvarming og mer smelting."
      viewBox="0 0 900 420"
      wide
    >
      {(m) => (
        <>
          {/* Venstre panel: Havis (Høy albedo) */}
          <g>
            <rect x="40" y="30" width="380" height="230" rx="10" fill="#131e26" stroke={C.teal} strokeWidth="1.5" />
            <L x="60" y="60" fill={C.teal} size={16} weight={700}>Hvit havis og snødekke</L>
            <L x="60" y="80" fill={C.muted} size={13}>Høy albedo: α ≈ 0,60 – 0,85</L>

            {/* Islag og hav */}
            <rect x="50" y="160" width="360" height="30" fill="#d9e9f2" rx="4" />
            <rect x="50" y="190" width="360" height="60" fill="#172b38" rx="4" />
            <L x="230" y="180" fill="#111b22" size={13} weight={700} anchor="middle">Kompakt havis / snø</L>
            <L x="230" y="225" fill={C.cold} size={12} anchor="middle">Kaldt havvann isolert under isen</L>

            {/* Innkommende solstråle */}
            <Arrow d="M 120 90 L 170 155" marker={m.warm} color={C.warm} width={3.2} />
            <L x="100" y="115" fill={C.warm} size={13} weight={600}>Solinnstråling</L>

            {/* Sterk reflektert stråle (80%) */}
            <Arrow d="M 170 155 L 220 90" marker={m.teal} color={C.teal} width={3.6} />
            <L x="210" y="115" fill={C.teal} size={14} weight={700}>~80 % reflekteres</L>
            <L x="210" y="132" fill={C.muted} size={11}>Lite varme tas opp i systemet</L>
          </g>

          {/* Høyre panel: Åpent hav (Lav albedo) */}
          <g>
            <rect x="480" y="30" width="380" height="230" rx="10" fill="#131e26" stroke={C.low} strokeWidth="1.5" />
            <L x="500" y="60" fill={C.low} size={16} weight={700}>Mørkt åpent polhav</L>
            <L x="500" y="80" fill={C.muted} size={13}>Lav albedo: α ≈ 0,06 – 0,10</L>

            {/* Bare havvann */}
            <rect x="490" y="160" width="360" height="90" fill="#0d1e2b" rx="4" />
            <L x="670" y="210" fill={C.cold} size={14} weight={700} anchor="middle">Mørkt havvann absorberer solvarme</L>

            {/* Innkommende solstråle */}
            <Arrow d="M 560 90 L 610 155" marker={m.warm} color={C.warm} width={3.2} />
            <L x="540" y="115" fill={C.warm} size={13} weight={600}>Samme solinnstråling</L>

            {/* Svak refleksjon (bare 10%) */}
            <Arrow d="M 610 155 L 635 125" marker={m.muted} color={C.muted} width={1.6} />
            <L x="645" y="125" fill={C.muted} size={12}>~10 % reflekteres</L>

            {/* Mye varme absorbert ned i havet */}
            <Arrow d="M 610 160 L 610 215" marker={m.low} color={C.low} width={3.8} />
            <L x="625" y="185" fill={C.low} size={14} weight={700}>~90 % absorberes</L>
          </g>

          {/* Nederst: Tilbakekoblingssløyfen (Positiv feedback) */}
          <g>
            <rect x="40" y="280" width="820" height="120" rx="10" fill="#18232c" stroke={C.dim} strokeWidth="1.5" />
            <L x="450" y="308" fill={C.warm} size={15} weight={700} anchor="middle">
              Selvforsterkende (positiv) tilbakekoblingsmekanisme
            </L>

            {/* 4 noder i en sirkel / linje */}
            <rect x="60" y="325" width="160" height="60" rx="6" fill="#1b2a34" stroke={C.warm} strokeWidth="1" />
            <L x="140" y="348" fill={C.warm} size={12} weight={700} anchor="middle">Global oppvarming</L>
            <L x="140" y="366" fill={C.muted} size={11} anchor="middle">Høyere luft- og havtemp</L>

            <Arrow d="M 225 355 L 265 355" marker={m.warm} color={C.warm} width={2.2} />

            <rect x="270" y="325" width="160" height="60" rx="6" fill="#1b2a34" stroke={C.teal} strokeWidth="1" />
            <L x="350" y="348" fill={C.teal} size={12} weight={700} anchor="middle">Havis smelter</L>
            <L x="350" y="366" fill={C.muted} size={11} anchor="middle">Mindre hvit isflate</L>

            <Arrow d="M 435 355 L 475 355" marker={m.teal} color={C.teal} width={2.2} />

            <rect x="480" y="325" width="160" height="60" rx="6" fill="#1b2a34" stroke={C.low} strokeWidth="1" />
            <L x="560" y="348" fill={C.low} size={12} weight={700} anchor="middle">Albedo synker</L>
            <L x="560" y="366" fill={C.muted} size={11} anchor="middle">Mer mørkt hav eksponeres</L>

            <Arrow d="M 645 355 L 685 355" marker={m.low} color={C.low} width={2.2} />

            <rect x="690" y="325" width="155" height="60" rx="6" fill="#1b2a34" stroke={C.low} strokeWidth="1" />
            <L x="767" y="348" fill={C.low} size={12} weight={700} anchor="middle">Mer varme tas opp</L>
            <L x="767" y="366" fill={C.muted} size={11} anchor="middle">Forsterker oppvarmingen</L>
          </g>
        </>
      )}
    </Diagram>
  );
}

export function SlabAvalancheDiagram() {
  return (
    <Diagram
      title="Flakskred anatomi: flak over svakt lag i helling over 30 grader med bruddkant og utløser"
      heading="Flakskred: anatomi og utløsningsmekanisme"
      caption="Flakskred krever fire elementer: helning over 30°, et sammenhengende snøflak, et svakt lag under, og en utløser (skiløper, skuter eller nysnøvekt). Når det svake laget kollapser, forplanter bruddet seg lynhurtig."
      viewBox="0 0 900 440"
      wide
    >
      {(m) => (
        <>
          {/* Fjellside bakgrunn (skrår 35 grader) */}
          <path d="M 50 80 L 320 80 L 850 360 L 50 360 Z" fill="#131b20" stroke={C.dim} strokeWidth="1.5" />

          {/* Gammelt fast underlag */}
          <path d="M 180 180 L 800 360 L 50 360 L 50 180 Z" fill="#1a252d" />
          <L x="260" y="310" fill={C.muted} size={13}>Gammelt, hardt snødekke / skare</L>

          {/* Det svake laget (kantkorn / overflaterim) */}
          <line x1="280" y1="130" x2="800" y2="330" stroke={C.low} strokeWidth="5" strokeDasharray="6 4" />
          <L x="590" y="235" fill={C.low} size={15} weight={700}>Svakt lag (begerkrystaller / rim)</L>
          <L x="590" y="255" fill={C.muted} size={11}>Kollapser under skjærspenning</L>

          {/* Det stive snøflaket over */}
          <polygon points="300,105 520,190 490,215 270,130" fill="#324754" stroke={C.teal} strokeWidth="1.8" />
          <L x="390" y="145" fill={C.teal} size={15} weight={700}>Sammenhengende snøflak</L>
          <L x="390" y="165" fill={C.fg} size={11}>Vindpakket snø med strekkfasthet</L>

          {/* Bruddkanten (Crown / toppsprekk) */}
          <line x1="270" y1="130" x2="300" y2="105" stroke={C.low} strokeWidth="4" />
          <L x="250" y="105" fill={C.low} size={14} weight={700} anchor="end">Toppbrudd (krone)</L>

          {/* Utløser (f.eks. skiløper / ekstra belastning) */}
          <circle cx="440" cy="140" r="10" fill={C.warm} />
          <line x1="440" y1="150" x2="440" y2="168" stroke={C.warm} strokeWidth="2.5" />
          <Arrow d="M 440 170 L 440 185" marker={m.low} color={C.low} width={3} />
          <L x="458" y="145" fill={C.warm} size={13} weight={700}>Ekstern utløser</L>
          <L x="458" y="162" fill={C.fg} size={11}>Menneskelig vekt gir initiell kollaps</L>

          {/* Skredbevegelse */}
          <Arrow d="M 510 205 L 680 270" marker={m.low} color={C.low} width={4} />
          <L x="660" y="295" fill={C.low} size={15} weight={700}>Skredbanen sklir ut</L>

          {/* Vinkelbue for 35 graders helling */}
          <path d="M 720 360 A 80 80 0 0 0 760 338" fill="none" stroke={C.warm} strokeWidth="2.5" />
          <L x="790" y="350" fill={C.warm} size={15} weight={700}>Helling: 35°</L>
          <L x="790" y="366" fill={C.muted} size={11}>Kritisk sone: 30° – 45°</L>

          {/* 4 forutsetninger boks */}
          <rect x="50" y="375" width="800" height="50" rx="8" fill="#15212a" stroke={C.teal} strokeWidth="1.2" />
          <L x="70" y="405" fill={C.teal} size={13} weight={700}>Varsom.no 4 vilkår:</L>
          <L x="210" y="405" fill={C.fg} size={13}>1. Terreng &gt; 30° · 2. Bundet snøflak · 3. Svakt lag under · 4. Belastning / trigger.</L>
        </>
      )}
    </Diagram>
  );
}
