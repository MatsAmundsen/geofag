import { Arrow, C, Diagram, L } from "./svg-kit";

/**
 * 1. HurricaneCrossSectionDiagram
 * Fysisk tverrsnitt gjennom en moden tropisk orkan (kat. 4/5) med varmkjerne,
 * øye med tørr subsidens, øyvegg med maksimal oppdrift og vindkast, spiralbånd,
 * samt grafisk profil over lufttrykk p(r) og vindhastighet v(r) under snittet.
 */
export function HurricaneCrossSectionDiagram() {
  return (
    <Diagram
      title="Tverrsnitt av tropisk orkan: Oppbygning, trykkprofil og vindmaksimum"
      heading="Den latente varmemotoren: Øye, øyvegg og vindprofil"
      caption="Tverrsnitt gjennom en moden tropisk orkan. Varmt hav (>26,5 °C) fordamper gigantiske vannmengder. Den fuktige luften suges inn mot sentrum, tvinges opp i den loddrette øyveggen og frigjør latent varme (2,5 MJ/kg) som driver oppdriften til 15 km høyde (tropopausen). I midten synker tørr luft i det skyfrie, vindstille øyet. Den nedre grafen viser hvordan overflatetrykket faller til et dypt minimum (<920 hPa) i sentrum, mens vindhastigheten eksploderer til sitt absolutte maksimum i øyveggen like utenfor."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="dis-ocean-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="dis-warmcore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="dis-eyewall-cloud" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#475569" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Havoverflate nederst i atmosfærebildet (y=320) */}
          <rect x="30" y="320" width="880" height="40" fill="url(#dis-ocean-grad)" rx="4" />
          <line x1="30" y1="320" x2="910" y2="320" stroke="#38bdf8" strokeWidth="2.5" />
          <L x="470" y="342" fill="#bae6fd" size={13} weight={700} anchor="middle">
            Varmt tropisk hav &gt; 26,5 °C (havdyp &gt; 50 m) — Kontinuerlig fordamping mater
            systemet
          </L>

          {/* Tropopause linje øverst (y=60, ~15 km) */}
          <line
            x1="30"
            y1="60"
            x2="910"
            y2="60"
            stroke={C.dim}
            strokeDasharray="5 5"
            strokeWidth="1.5"
          />
          <L x="40" y="52" fill={C.muted} size={11} weight={600}>
            Tropopausen (~15–16 km høyde)
          </L>
          <L x="890" y="52" fill={C.muted} size={11} weight={600} anchor="end">
            Stratosfærisk lokk
          </L>

          {/* Varmkjerne-glød i midtre/øvre troposfære (rundt x=470, y=140) */}
          <ellipse cx="470" cy="140" rx="90" ry="60" fill="url(#dis-warmcore)" />
          <L x="470" y="115" fill="#fca5a5" size={11} weight={700} anchor="middle">
            Varm kjerne (Warm core)
          </L>
          <L x="470" y="130" fill={C.muted} size={10} anchor="middle">
            ΔT: +10 °C til +15 °C vs. omgivelser
          </L>

          {/* ØYET (x=440 til 500) */}
          <rect x="445" y="65" width="50" height="255" fill="#0f172a" opacity="0.85" rx="3" />
          <L x="470" y="175" fill={C.fg} size={16} weight={800} anchor="middle">
            ØYET
          </L>
          <L x="470" y="195" fill={C.muted} size={11} anchor="middle">
            20–50 km bredt
          </L>
          <L x="470" y="215" fill={C.cold} size={11} weight={700} anchor="middle">
            Vindstille
          </L>
          <L x="470" y="235" fill={C.warm} size={11} weight={700} anchor="middle">
            Skyfritt / svakt dis
          </L>
          <L x="470" y="260" fill={C.low} size={13} weight={800} anchor="middle">
            &lt; 920 hPa
          </L>

          {/* Synkende tørr luft i øyet (subsidens) */}
          <Arrow d="M 470 75 L 470 155" marker={m.cold} color={C.cold} width={2.4} />
          <Arrow d="M 470 270 L 470 310" marker={m.cold} color={C.cold} width={2.4} />

          {/* ØYVEGGEN (Eyewall) - Venstre (360-445) og Høyre (495-580) */}
          {/* Venstre øyvegg */}
          <path
            d="M 360 320 L 410 70 L 445 70 L 445 320 Z"
            fill="url(#dis-eyewall-cloud)"
            stroke={C.low}
            strokeWidth="2"
          />
          {/* Høyre øyvegg */}
          <path
            d="M 580 320 L 530 70 L 495 70 L 495 320 Z"
            fill="url(#dis-eyewall-cloud)"
            stroke={C.low}
            strokeWidth="2"
          />

          {/* Oppdriftsvektorer i øyveggen */}
          <Arrow d="M 385 310 L 425 80" marker={m.warm} color={C.warm} width={3.8} />
          <Arrow d="M 555 310 L 515 80" marker={m.warm} color={C.warm} width={3.8} />

          <L x="300" y="160" fill={C.low} size={14} weight={800} anchor="middle">
            Øyvegg (Eyewall)
          </L>
          <L x="300" y="178" fill="#ffffff" size={11} weight={700} anchor="middle">
            Sterkeste vind (&gt; 250 km/t)
          </L>
          <L x="300" y="195" fill={C.rain} size={11} anchor="middle">
            Maksimal oppdrift (&gt; 30 m/s)
          </L>
          <L x="300" y="210" fill={C.warm} size={11} anchor="middle">
            Ekstrem latent varmefrigjøring
          </L>

          <L x="640" y="160" fill={C.low} size={14} weight={800} anchor="middle">
            Øyvegg (Eyewall)
          </L>
          <L x="640" y="178" fill="#ffffff" size={11} weight={700} anchor="middle">
            Sterkeste vind (&gt; 250 km/t)
          </L>
          <L x="640" y="195" fill={C.rain} size={11} anchor="middle">
            Maksimal oppdrift (&gt; 30 m/s)
          </L>
          <L x="640" y="210" fill={C.warm} size={11} anchor="middle">
            Ekstrem latent varmefrigjøring
          </L>

          {/* YTRE SPIRALFORMEDE REGNBÅND */}
          {/* Venstre spiralbånd */}
          <path d="M 120 320 L 160 140 L 220 140 L 200 320 Z" fill="#1e293b" opacity="0.8" />
          <path d="M 230 320 L 260 110 L 320 110 L 300 320 Z" fill="#1e293b" opacity="0.85" />
          <Arrow d="M 170 300 L 195 150" marker={m.rain} color={C.rain} width={2.2} />
          <L x="170" y="125" fill={C.rain} size={11} weight={700} anchor="middle">
            Ytre spiralregnbånd
          </L>

          {/* Høyre spiralbånd */}
          <path d="M 820 320 L 780 140 L 720 140 L 740 320 Z" fill="#1e293b" opacity="0.8" />
          <path d="M 710 320 L 680 110 L 620 110 L 640 320 Z" fill="#1e293b" opacity="0.85" />
          <Arrow d="M 770 300 L 745 150" marker={m.rain} color={C.rain} width={2.2} />
          <L x="770" y="125" fill={C.rain} size={11} weight={700} anchor="middle">
            Ytre spiralregnbånd
          </L>

          {/* Innstrømning ved havflaten (grenselaget) */}
          <Arrow d="M 60 310 L 350 310" marker={m.warm} color={C.warm} width={3.2} />
          <L x="130" y="298" fill={C.warm} size={11} weight={700}>
            Syklonal innstrømning →
          </L>

          <Arrow d="M 880 310 L 590 310" marker={m.warm} color={C.warm} width={3.2} />
          <L x="810" y="298" fill={C.warm} size={11} weight={700} anchor="end">
            ← Syklonal innstrømning
          </L>

          {/* Antisyklonal utstrømning ved tropopausen (divergens) */}
          <path
            d="M 420 68 L 60 68"
            stroke={C.teal}
            strokeWidth="2.8"
            fill="none"
            markerEnd={`url(#${m.teal})`}
          />
          <path
            d="M 520 68 L 880 68"
            stroke={C.teal}
            strokeWidth="2.8"
            fill="none"
            markerEnd={`url(#${m.teal})`}
          />
          <L x="210" y="84" fill={C.teal} size={11} weight={700}>
            ← Antisyklonsk utstrømning (cirrusskjold)
          </L>
          <L x="730" y="84" fill={C.teal} size={11} weight={700} anchor="middle">
            Antisyklonsk utstrømning (cirrusskjold) →
          </L>

          {/* --- NEDRE PROFILGRAF (y=375 til 505): SAMMENLIGNING AV TRYKK OG VIND --- */}
          <rect x="30" y="375" width="880" height="130" fill="#0b1116" stroke={C.dim} rx="6" />

          {/* Akser og skalaer */}
          <line x1="120" y1="390" x2="120" y2="485" stroke={C.dim} strokeWidth="1.2" />
          <line x1="820" y1="390" x2="820" y2="485" stroke={C.dim} strokeWidth="1.2" />
          <line x1="120" y1="485" x2="820" y2="485" stroke={C.dim} strokeWidth="1.2" />

          <L x="110" y="400" fill={C.low} size={11} weight={700} anchor="end">
            Lufttrykk (hPa)
          </L>
          <L x="110" y="415" fill={C.muted} size={10} anchor="end">
            1010
          </L>
          <L x="110" y="450" fill={C.muted} size={10} anchor="end">
            960
          </L>
          <L x="110" y="485" fill={C.low} size={11} weight={700} anchor="end">
            910
          </L>

          <L x="830" y="400" fill={C.warm} size={11} weight={700}>
            Vindhastighet
          </L>
          <L x="830" y="415" fill={C.warm} size={11} weight={700}>
            250 km/t (kat. 5)
          </L>
          <L x="830" y="450" fill={C.muted} size={10}>
            120 km/t (orkan)
          </L>
          <L x="830" y="485" fill={C.muted} size={10}>
            0 km/t
          </L>

          {/* Trykk-kurve (Rød U-form, minimum i midten ved x=470) */}
          <path
            d="M 120 415 C 260 420, 390 435, 430 465 C 450 480, 470 482, 470 482 C 470 482, 490 480, 510 465 C 550 435, 680 420, 820 415"
            fill="none"
            stroke={C.low}
            strokeWidth="3"
          />

          {/* Vind-kurve (Oransje/gul to-puklet kurve, topper i øyveggen ved x=420 og x=520, null i sentrum) */}
          <path
            d="M 120 475 C 240 465, 340 445, 410 415 C 430 410, 450 440, 470 482 C 490 440, 510 410, 530 415 C 600 445, 700 465, 820 475"
            fill="none"
            stroke={C.warm}
            strokeWidth="3"
            strokeDasharray="6 3"
          />

          {/* Sentermarkør for øyet */}
          <line
            x1="470"
            y1="380"
            x2="470"
            y2="485"
            stroke="#ef4444"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          <L x="470" y="500" fill={C.muted} size={11} anchor="middle">
            Orkansenter (Avstand fra øye: 0 km)
          </L>

          <L x="300" y="402" fill={C.low} size={11} weight={700}>
            — Lufttrykk faller bratt mot øyet (min: 915 hPa)
          </L>
          <L x="640" y="402" fill={C.warm} size={11} weight={700}>
            - - Vindmaksimum i øyveggen (0 km/t i selve øyet)
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 2. SupercellAnatomyDiagram
 * Detaljert snitt av tornadoproduserende supercelle med mesosyklon,
 * RFD, FFD, amboltsky, overshooting top, og radar-innfelt med hook echo.
 */
export function SupercellAnatomyDiagram() {
  return (
    <Diagram
      title="Supercellens anatomi: Mesosyklon, RFD/FFD og tornadodannelse"
      heading="Supercellen: Naturens mest ekstreme virvelstorm"
      caption="En supercelle er et tordenvær med en roterende oppdriftskjerne (mesosyklon). Den drives av ekstrem konvektiv instabilitet (høy CAPE) kombinert med kraftig vertikal vindskjæring (vind som endrer både fart og retning med høyden). På baksiden feier den kalde, nedadgående luftstrømmen RFD (Rear Flank Downdraft) rundt mesosyklonen og klemmer rotasjonen sammen mot bakken. Under den regnfrie oppdriftsbasen senkes en veggsky (wall cloud), hvorfra en voldsom traktformet skypumpe eller tornado suger seg ned til bakken. Det innfelte radarkartet viser det klassiske krok-ekkoet (hook echo)."
      viewBox="0 0 940 520"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="dis-supercell-cloud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#334155" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="dis-hail-core" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Bakke / landskap */}
          <rect x="30" y="440" width="880" height="50" fill="#141f17" rx="4" />
          <line x1="30" y1="440" x2="910" y2="440" stroke="#4ade80" strokeWidth="1.8" />
          <L x="80" y="465" fill="#86efac" size={13} weight={700}>
            Bakkenivå (Varm, fuktig luft suges inn fra sørøst)
          </L>

          {/* Tropopause linje (~14 km) */}
          <line x1="30" y1="70" x2="910" y2="70" stroke={C.dim} strokeDasharray="4 4" />
          <L x="40" y="62" fill={C.muted} size={11}>
            Tropopause (~13–15 km)
          </L>

          {/* SUPERCELLENS SKYKROPP (Cumulonimbus incus) */}
          {/* Ambolt (Anvil) strekker seg mot høyre med jetstrømmen */}
          <path
            d="M 220 410 Q 240 250 280 140 Q 330 70 420 55 Q 460 30 500 55 Q 650 65 890 70 L 890 105 Q 650 115 540 160 Q 560 280 620 440 L 480 440 Q 450 380 420 410 Z"
            fill="url(#dis-supercell-cloud)"
            stroke={C.dim}
            strokeWidth="1.8"
          />

          {/* Overshooting top (gjennomtrengende skytopp opp i stratosfæren) */}
          <path d="M 430 55 Q 465 22 500 55 Z" fill="#ffffff" stroke="#f87171" strokeWidth="1.5" />
          <L x="465" y="18" fill="#f87171" size={12} weight={800} anchor="middle">
            Overshooting top
          </L>
          <L x="465" y="32" fill={C.muted} size={10} anchor="middle">
            Oppdrift &gt; 50 m/s stanger inn i stratosfæren
          </L>

          {/* Ambolt (Anvil) merking */}
          <L x="760" y="55" fill={C.teal} size={13} weight={700} anchor="middle">
            Ambolt (Cirrusskjold føres østover av jetstrøm) →
          </L>

          {/* MESOSYKLON: Den roterende oppdriftskjernen (x=380 til 470) */}
          {/* Spiraliserte rotasjonslinjer */}
          <path d="M 330 430 Q 370 300 420 180" fill="none" stroke="#f59e0b" strokeWidth="4" />
          <path
            d="M 400 430 Q 430 310 460 170"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeDasharray="6 4"
          />
          <path d="M 460 430 Q 480 320 490 190" fill="none" stroke="#f59e0b" strokeWidth="3" />
          <Arrow d="M 360 410 Q 410 240 450 120" marker={m.warm} color={C.warm} width={4} />

          <L x="330" y="240" fill={C.warm} size={15} weight={800} anchor="middle">
            MESOSYKLON
          </L>
          <L x="330" y="258" fill="#ffffff" size={11} weight={700} anchor="middle">
            Roterende oppdrift
          </L>
          <L x="330" y="275" fill={C.muted} size={10} anchor="middle">
            Diameter: 3–10 km
          </L>
          <L x="330" y="290" fill={C.warm} size={10} anchor="middle">
            Rotasjon mot klokken
          </L>

          {/* VEGGSKY (Wall cloud) under oppdriftsbasen (x=360-420, y=410-435) */}
          <path
            d="M 350 410 L 420 410 L 410 435 L 360 435 Z"
            fill="#1e293b"
            stroke={C.low}
            strokeWidth="2"
          />
          <L x="385" y="425" fill="#fca5a5" size={11} weight={800} anchor="middle">
            Veggsky (Wall cloud)
          </L>

          {/* TORNADO / KONVENSJONSTRAKT (Fra wall cloud til bakken ved x=385) */}
          <path
            d="M 378 435 Q 380 438 382 440 L 388 440 Q 388 438 392 435 Z"
            fill="#e2e8f0"
            stroke="#ef4444"
            strokeWidth="2"
          />
          {/* Traktens virvelpiler */}
          <ellipse cx="385" cy="440" rx="18" ry="5" fill="#ef4444" opacity="0.6" />
          <L x="385" y="458" fill="#f87171" size={13} weight={800} anchor="middle">
            TORNADO
          </L>
          <L x="385" y="473" fill="#ffffff" size={10} weight={700} anchor="middle">
            Kondensasjonstrakt &amp; ruskvirvel
          </L>
          <L x="385" y="486" fill={C.low} size={10} anchor="middle">
            Trykkfall &gt; 50–100 hPa
          </L>

          {/* REAR FLANK DOWNDRAFT (RFD) - På baksiden (venstre, x=220-330) */}
          <Arrow d="M 260 180 Q 270 320 340 430" marker={m.cold} color={C.cold} width={3.2} />
          <L x="250" y="320" fill={C.cold} size={13} weight={700} anchor="middle">
            RFD (Kald fallvind)
          </L>
          <L x="250" y="336" fill={C.muted} size={10} anchor="middle">
            Klemmer og strekker virvelen
          </L>

          {/* FORWARD FLANK DOWNDRAFT (FFD) OG HAGL - Til høyre (x=500-640) */}
          <rect
            x="520"
            y="240"
            width="110"
            height="200"
            fill="url(#dis-hail-core)"
            opacity="0.7"
            rx="4"
          />
          {/* Hagl og regnstriper */}
          <line
            x1="540"
            y1="280"
            x2="530"
            y2="435"
            stroke={C.rain}
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <line
            x1="570"
            y1="260"
            x2="560"
            y2="435"
            stroke="#bae6fd"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />
          <line
            x1="600"
            y1="270"
            x2="590"
            y2="435"
            stroke={C.rain}
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <Arrow d="M 570 200 L 560 420" marker={m.rain} color={C.rain} width={3.2} />

          <L x="640" y="280" fill={C.rain} size={13} weight={700}>
            FFD (Nedbørsområde)
          </L>
          <L x="640" y="298" fill="#ffffff" size={11} weight={600}>
            Kjempehagl (&gt; 5–10 cm)
          </L>
          <L x="640" y="314" fill={C.muted} size={10}>
            Styrtregn og kraftig fallvind
          </L>

          {/* Varm, fuktig innstrømning ved bakken mot oppdriften */}
          <Arrow d="M 680 435 L 430 425" marker={m.warm} color={C.warm} width={3.4} />
          <L x="560" y="420" fill={C.warm} size={11} weight={700}>
            Varm, fuktig luft mates inn (Inflow) →
          </L>

          {/* RADAR-INNFELT (Doppler hook echo, x=50, y=80 til 220) */}
          <rect
            x="45"
            y="80"
            width="160"
            height="150"
            fill="#020617"
            stroke={C.teal}
            strokeWidth="1.8"
            rx="6"
          />
          <L x="125" y="98" fill={C.teal} size={11} weight={800} anchor="middle">
            Doppler-radar (Reflektivitet)
          </L>

          {/* Krok-ekko form (Hook Echo) */}
          <path
            d="M 80 120 C 130 115, 170 125, 180 150 C 185 170, 155 190, 130 195 C 115 198, 105 185, 115 175"
            fill="none"
            stroke="#ef4444"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 80 120 C 130 115, 170 125, 180 150 C 185 170, 155 190, 130 195 C 115 198, 105 185, 115 175"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* BWER / Tornado senter i kroken */}
          <circle cx="112" cy="180" r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
          <L x="125" y="215" fill="#f87171" size={10} weight={700} anchor="middle">
            Krok-ekko (Hook Echo)
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 3. TornadoGenesisDiagram
 * 3-trinns dannelsesprosess (tornadogenese):
 * 1. Horisontalt virvelrør pga. vertikal vindskjæring
 * 2. Oppdriften tipper virvelen vertikalt (mesosyklon)
 * 3. RFD strekker og komprimerer virvelen til en tornadotrakt (bevaring av spinn)
 */
export function TornadoGenesisDiagram() {
  return (
    <Diagram
      title="Tornadogenese: Fra horisontal vindskjæring til tornado"
      heading="Tornadogensens tre steg: Vindskjæring, vipping og strekking"
      caption="Hvordan dannes en tornado? 1) Vindskjæring: Sørøstlig vind nær bakken møter en sterk vestlig jetstrøm i høyden. Friksjonen og hastighetsforskjellen setter luften i horisontal rotasjon som en roterende kjevle. 2) Vipping (tilting): Den intense oppdriften i et tordenvær suger det roterende røret opp i midten og bøyer det loddrett. Den oppadstigende, roterende virvelen danner en mesosyklon. 3) Strekking (stretching) og spinnbevaring: Kald luft fra baksiden (RFD) presser virvelen mot bakken. Ved bevaring av spinn (angulært moment) eksploderer rotasjonshastigheten når virvelens radius minker, akkurat som en kunstløper som trekker inn armene."
      viewBox="0 0 940 400"
      wide
    >
      {(m) => (
        <>
          {/* Panel 1: Vindskjæring (x=30 til 310) */}
          <rect x="30" y="40" width="280" height="330" fill="#0f172a" stroke={C.dim} rx="6" />
          <L x="170" y="65" fill={C.teal} size={14} weight={800} anchor="middle">
            1. Horisontal vindskjæring
          </L>

          {/* Rask vind i høyden */}
          <Arrow d="M 60 120 L 250 120" marker={m.teal} color={C.teal} width={3.6} />
          <L x="170" y="108" fill={C.teal} size={11} weight={700} anchor="middle">
            Rask vestavind i 5 km høyde (150 km/t)
          </L>

          {/* Sakte vind ved bakken */}
          <Arrow d="M 60 270 L 150 270" marker={m.warm} color={C.warm} width={2.4} />
          <L x="170" y="292" fill={C.warm} size={11} weight={700} anchor="middle">
            Svak sørøstlig vind ved bakken (30 km/t)
          </L>

          {/* Roterende horisontalt rør i midten (y=195) */}
          <ellipse
            cx="170"
            cy="195"
            rx="75"
            ry="30"
            fill="#1e293b"
            stroke="#f59e0b"
            strokeWidth="2.5"
          />
          {/* Roterende piler rundt røret */}
          <path
            d="M 120 180 C 130 155, 210 155, 220 180"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            markerEnd={`url(#${m.warm})`}
          />
          <path
            d="M 220 210 C 210 235, 130 235, 120 210"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            markerEnd={`url(#${m.warm})`}
          />
          <L x="170" y="200" fill="#ffffff" size={11} weight={700} anchor="middle">
            Horisontalt virvelrør
          </L>
          <L x="170" y="340" fill={C.muted} size={11} anchor="middle">
            Friksjon og fartskontrast skaper rulling
          </L>

          {/* Panel 2: Vipping (Tilting) (x=330 til 610) */}
          <rect x="330" y="40" width="280" height="330" fill="#0f172a" stroke={C.dim} rx="6" />
          <L x="470" y="65" fill={C.warm} size={14} weight={800} anchor="middle">
            2. Vipping via oppdrift
          </L>

          {/* Kraftig oppdriftsvektor i midten */}
          <path
            d="M 470 310 L 470 110"
            stroke={C.warm}
            strokeWidth="5"
            markerEnd={`url(#${m.warm})`}
          />
          <L x="470" y="98" fill={C.warm} size={12} weight={800} anchor="middle">
            Intens oppdrift (CAPE &gt; 2000 J/kg)
          </L>

          {/* Det bøyde virvelrøret (hesteskoform som reises opp) */}
          <path
            d="M 390 280 C 400 160, 450 140, 470 140 C 490 140, 540 160, 550 280"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4"
          />
          {/* Rotasjon i oppreist søyle */}
          <path
            d="M 490 200 A 30 15 0 1 0 450 200"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            markerEnd={`url(#${m.fg})`}
          />

          <L x="470" y="240" fill="#fca5a5" size={13} weight={800} anchor="middle">
            MESOSYKLON
          </L>
          <L x="470" y="258" fill={C.muted} size={11} anchor="middle">
            Virvelen reises vertikalt
          </L>
          <L x="470" y="340" fill={C.muted} size={11} anchor="middle">
            Tordenværets oppdrift roterer!
          </L>

          {/* Panel 3: Strekking og spinnbevaring (x=630 til 910) */}
          <rect
            x="630"
            y="40"
            width="280"
            height="330"
            fill="#0f172a"
            stroke="#ef4444"
            strokeWidth="1.8"
            rx="6"
          />
          <L x="770" y="65" fill="#f87171" size={14} weight={800} anchor="middle">
            3. Strekking &amp; Spinn (Tornado)
          </L>

          {/* RFD-press nedover */}
          <Arrow d="M 680 120 L 730 260" marker={m.cold} color={C.cold} width={3} />
          <L x="690" y="105" fill={C.cold} size={10} weight={700}>
            RFD (fallvind)
          </L>

          {/* Innsnevret, strukket trakt */}
          <path
            d="M 740 130 L 800 130 L 780 290 L 760 290 Z"
            fill="#334155"
            stroke="#ef4444"
            strokeWidth="2.2"
          />
          {/* Ekstrem rotasjon i den smale trakten */}
          <path
            d="M 785 220 A 18 8 0 1 0 755 220"
            fill="none"
            stroke="#f87171"
            strokeWidth="2.5"
            markerEnd={`url(#${m.low})`}
          />
          <ellipse cx="770" cy="290" rx="25" ry="6" fill="#ef4444" opacity="0.6" />

          <L x="770" y="160" fill="#ffffff" size={11} weight={700} anchor="middle">
            Radius r krymper
          </L>
          <L x="770" y="180" fill="#f87171" size={14} weight={800} anchor="middle">
            Fart v eksploderer!
          </L>
          <L x="770" y="200" fill={C.warm} size={10} weight={700} anchor="middle">
            L = m · v · r = konstant
          </L>

          <L x="770" y="315" fill="#f87171" size={12} weight={800} anchor="middle">
            Tornado treffer bakken
          </L>
          <L x="770" y="335" fill={C.fg} size={11} weight={600} anchor="middle">
            &gt; 300–450 km/t vind!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 4. StormSurgeDiagram
 * Fysisk tverrsnitt av kyst og hav som illustrerer stormfloens 4 komponenter:
 * 1. Normalt havnivå / astronomisk flo
 * 2. Invers barometereffekt (+1 cm / 1 hPa fall)
 * 3. Vindstuv (vindstress på grunt vann)
 * 4. Bølgeoppstuvning mot oversvømt kystkai
 */
export function StormSurgeDiagram() {
  return (
    <Diagram
      title="Stormfloens fysiske komponenter mot en norsk kystkai"
      heading="Stormflo: Samspillet mellom vindstuv, lavtrykk og tidevann"
      caption="En stormflo er ikke bare en serie store bølger, men en heving av selve havoverflaten. Den består av fire fysiske bidrag: 1) Astronomisk flo: Når månen og solen trekker i samme retning (springflo), er utgangsnivået ekstra høyt. 2) Den inverse barometereffekten: Et dypt lavtrykk på 950 hPa veier mindre enn normal atmosfære (1013 hPa). Havoverflaten suger seg opp med ca. 1 cm per hPa trykkfall (her: +63 cm). 3) Vindstuv: Sterk pålandsvind skyver enorme vannmasser inn mot den grunne kysten og stuver vannet opp mot land. 4) Bølgeoppstuvning: Brenninger og store stormbølger slår over kaien og flommer inn i bebyggelsen."
      viewBox="0 0 940 460"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="dis-surge-ocean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#0369a1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="dis-quay" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          {/* Havbunn skråner opp mot kysten (kontinentalsokkel) */}
          <path
            d="M 30 430 L 620 430 L 670 310 L 910 310 L 910 430 Z"
            fill="#1e293b"
            stroke={C.dim}
            strokeWidth="2"
          />

          {/* Kaianlegg og bebyggelse (x=670 til 910, kaihøyde y=310) */}
          <rect
            x="670"
            y="270"
            width="240"
            height="40"
            fill="url(#dis-quay)"
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <L x="790" y="295" fill="#f8fafc" size={13} weight={800} anchor="middle">
            Brygge / Kai (Normalt tørr)
          </L>

          {/* Sjøbod / bygning på kaien */}
          <rect
            x="740"
            y="190"
            width="90"
            height="80"
            fill="#7f1d1d"
            stroke="#f87171"
            strokeWidth="1.5"
          />
          <polygon
            points="735,190 785,150 835,190"
            fill="#991b1b"
            stroke="#f87171"
            strokeWidth="1.5"
          />
          <L x="785" y="235" fill="#fecaca" size={12} weight={700} anchor="middle">
            Kystbebyggelse
          </L>

          {/* VANNMASSER: Stormfloflaten buer oppover mot kaien */}
          <path
            d="M 30 350 Q 350 340 500 310 Q 600 280 670 260 L 760 260 L 760 310 L 670 310 L 620 430 L 30 430 Z"
            fill="url(#dis-surge-ocean)"
          />
          {/* Stormflo vannlinje (y=260 ved kaien, overskrider kaihøyden på y=270 med 10-15 cm + bølger!) */}
          <path
            d="M 30 350 Q 350 340 500 310 Q 600 280 670 260 L 760 260"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
          />

          {/* Bølgetopper som slår innover kaien */}
          <path
            d="M 640 265 Q 655 245 670 255 Q 685 245 700 258 Q 720 248 740 260"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          <L x="710" y="240" fill="#f87171" size={11} weight={800}>
            ⚠️ Bølger slår over kaia!
          </L>

          {/* NORMAL VANNSTAND (Stiplet linje ved y=350) */}
          <line
            x1="30"
            y1="350"
            x2="670"
            y2="350"
            stroke="#94a3b8"
            strokeDasharray="5 5"
            strokeWidth="1.5"
          />
          <L x="40" y="365" fill="#94a3b8" size={12} weight={600}>
            Normal vannstand (Middelvann)
          </L>

          {/* TIDVANN / SPRINGFLO (y=320) */}
          <line
            x1="30"
            y1="320"
            x2="670"
            y2="320"
            stroke="#38bdf8"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <L x="40" y="312" fill="#38bdf8" size={12} weight={600}>
            Astronomisk springflo (+0,8 m)
          </L>

          {/* DE 4 KOMPONENTENE - ANNOTASJONER */}
          {/* 1. Lavtrykk & Invers barometereffekt (øverst til venstre) */}
          <rect
            x="50"
            y="50"
            width="220"
            height="95"
            fill="#141c22"
            stroke={C.low}
            strokeWidth="1.5"
            rx="6"
          />
          <L x="160" y="72" fill={C.low} size={13} weight={800} anchor="middle">
            1. Dypeste lavtrykk (950 hPa)
          </L>
          <L x="160" y="90" fill="#ffffff" size={11} weight={700} anchor="middle">
            Invers barometereffekt:
          </L>
          <L x="160" y="106" fill={C.muted} size={11} anchor="middle">
            Trykkfall: 1013 - 950 = 63 hPa
          </L>
          <L x="160" y="125" fill="#38bdf8" size={13} weight={800} anchor="middle">
            → Havet suges opp: +63 cm
          </L>
          <Arrow d="M 160 145 L 160 210" marker={m.cold} color={C.cold} width={2.5} />

          {/* 2. Vindstuv (midten) */}
          <Arrow d="M 280 180 Q 450 180 580 230" marker={m.warm} color={C.warm} width={4} />
          <Arrow d="M 320 210 Q 470 210 590 250" marker={m.warm} color={C.warm} width={4} />
          <L x="450" y="170" fill={C.warm} size={13} weight={800} anchor="middle">
            2. Vindstuv (Pålandsvind / orkan)
          </L>
          <L x="450" y="190" fill="#ffffff" size={11} weight={600} anchor="middle">
            Vindstress skyver og stabler vann mot land (+1,0 til +1,8 m)
          </L>

          {/* 3. Måne/Sol (Astronomisk tidvann) */}
          <L x="180" y="333" fill="#38bdf8" size={11} weight={700}>
            3. Springflo (Måne + Sol i linje)
          </L>

          {/* 4. Samlet heving ved kaien */}
          <rect
            x="670"
            y="60"
            width="230"
            height="105"
            fill="#1f1519"
            stroke="#ef4444"
            strokeWidth="2"
            rx="6"
          />
          <L x="785" y="82" fill="#f87171" size={14} weight={800} anchor="middle">
            TOTAL STORMFLO
          </L>
          <L x="785" y="102" fill="#ffffff" size={11} weight={700} anchor="middle">
            Springflo: +0,8 m
          </L>
          <L x="785" y="118" fill="#bae6fd" size={11} weight={700} anchor="middle">
            + Invers barometereffekt: +0,6 m
          </L>
          <L x="785" y="134" fill="#fde047" size={11} weight={700} anchor="middle">
            + Vindstuv &amp; brenning: +1,2 m
          </L>
          <L x="785" y="152" fill="#ef4444" size={13} weight={900} anchor="middle">
            = +2,6 m over sjøkartnull!
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 5. AtmosphericRiverDiagram
 * Fukttog / Atmosfærisk elv fra subtropene mot Norskekysten.
 * Viser massiv vanndampfluks, orografisk heving over Vestlandsfjellene,
 * ekstremnedbør på losiden, fønvind og regnskygge i øst.
 */
export function AtmosphericRiverDiagram() {
  return (
    <Diagram
      title="Atmosfærisk elv mot Norge: Fukttransport og orografisk ekstremnedbør"
      heading="Atmosfæriske elver: Subtropisk fukttog og Vestlandsflom"
      caption="En atmosfærisk elv (Atmospheric River) er et smalt, flere tusen kilometer langt bånd i nedre troposfære som transporterer enorme mengder vanndamp fra subtropene mot våre breddegrader — ofte med en fukttransport som overgår vannføringen i Amazonas-elven! Når dette fukttoget treffer den vestnorske fjellveggen, tvinges luften til brå heving (orografisk løft). Fuktigheten avkjøles og kondenserer til vedvarende ekstremnedbør som utløser flommer og jordskred (f.eks. ekstremværet Hans i 2023). På østsiden synker luften tørradiabatisk og skaper en markant regnskygge."
      viewBox="0 0 940 480"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="dis-river-flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="dis-mountain-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>

          {/* Havflate venstre (Atlanteren, x=30 til 480) */}
          <rect x="30" y="380" width="450" height="60" fill="#0f2636" rx="4" />
          <line x1="30" y1="380" x2="480" y2="380" stroke="#38bdf8" strokeWidth="2" />
          <L x="220" y="405" fill="#38bdf8" size={13} weight={700} anchor="middle">
            Nord-Atlanteren / Norskehavet (Mild, fuktmettet maritim luft)
          </L>

          {/* FJELLPROFIL (Vestlandet til Østlandet, x=480 til 910) */}
          {/* Loside (bratt opp) og leside (slakere ned) */}
          <path
            d="M 480 380 Q 550 360 620 180 Q 640 140 660 140 Q 680 140 730 250 Q 800 360 910 370 L 910 440 L 480 440 Z"
            fill="url(#dis-mountain-grad)"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <L x="660" y="125" fill="#f8fafc" size={14} weight={800} anchor="middle">
            Langfjella / Vestlandsfjellene (~1500–2000 moh.)
          </L>

          {/* ATMOSFÆRISK ELV (FUKTSTRØM) FRA SUBTROPENE */}
          <path
            d="M 30 320 C 150 310, 300 290, 480 270 Q 570 230 630 160"
            fill="none"
            stroke="url(#dis-river-flow)"
            strokeWidth="48"
            strokeLinecap="round"
          />
          <Arrow d="M 60 320 Q 260 290 480 260" marker={m.teal} color="#0284c7" width={4.5} />
          <Arrow d="M 480 260 Q 560 220 620 160" marker={m.rain} color={C.rain} width={4.5} />

          <L x="240" y="245" fill="#bae6fd" size={14} weight={800} anchor="middle">
            ATMOSFÆRISK ELV (Atmospheric River)
          </L>
          <L x="240" y="265" fill="#ffffff" size={11} weight={600} anchor="middle">
            Fukttransport &gt; 1000 kg/(m·s) fra subtropiske Atlanteren
          </L>
          <L x="240" y="282" fill={C.teal} size={11} weight={700} anchor="middle">
            Clausius-Clapeyron: +7 % vanndamp per 1 °C oppvarming
          </L>

          {/* OROGRAFISK SKY OG EKSTREMNEDBØR PÅ LOSIDEN */}
          <ellipse cx="560" cy="180" rx="90" ry="50" fill="#334155" opacity="0.9" />
          <ellipse cx="610" cy="150" rx="70" ry="40" fill="#475569" opacity="0.92" />
          {/* Regnstriper mot fjellet */}
          <line
            x1="510"
            y1="230"
            x2="490"
            y2="375"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <line
            x1="540"
            y1="220"
            x2="520"
            y2="375"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeDasharray="6 4"
          />
          <line
            x1="570"
            y1="210"
            x2="550"
            y2="360"
            stroke="#0284c7"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <line
            x1="600"
            y1="190"
            x2="580"
            y2="300"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          <rect
            x="420"
            y="60"
            width="220"
            height="80"
            fill="#1c1f26"
            stroke="#38bdf8"
            strokeWidth="1.5"
            rx="6"
          />
          <L x="530" y="80" fill="#38bdf8" size={13} weight={800} anchor="middle">
            Orografisk forsterkning (Lo-side)
          </L>
          <L x="530" y="98" fill="#ffffff" size={11} weight={700} anchor="middle">
            Adiabatisk ekspansjonsavkjøling
          </L>
          <L x="530" y="115" fill={C.rain} size={11} anchor="middle">
            &gt; 150–250 mm døgnnedbør
          </L>
          <L x="530" y="130" fill="#f87171" size={11} weight={700} anchor="middle">
            Ekstrem flom- og skredfare!
          </L>

          {/* LESIDE: FØNVIND OG REGNSKYGGE (Østlandet) */}
          <Arrow d="M 670 160 Q 740 260 840 340" marker={m.warm} color={C.warm} width={3.5} />
          <rect
            x="710"
            y="170"
            width="200"
            height="85"
            fill="#1a1c17"
            stroke={C.warm}
            strokeWidth="1.5"
            rx="6"
          />
          <L x="810" y="192" fill={C.warm} size={13} weight={800} anchor="middle">
            Leside (Regnskygge)
          </L>
          <L x="810" y="210" fill="#ffffff" size={11} weight={600} anchor="middle">
            Luften synker og varmes tørradiabatisk
          </L>
          <L x="810" y="226" fill={C.muted} size={11} anchor="middle">
            Fønvind: Varm og knusktørr luft
          </L>
          <L x="810" y="242" fill={C.sand} size={11} weight={700} anchor="middle">
            Minimal nedbør i dalene i øst
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 6. MeteorologicalBombDiagram
 * Eksplosiv syklonegenese («meteorologisk bombe», Sanders & Gyakum: >= 24 hPa/24t).
 * Kollisjon mellom arktisk luft og subtropisk varmluft under jetstreak,
 * ekstrem trykkgradient, og sting jet (orkan i vindkastene, Nyttårsorkanen 1992/Ingunn 2024).
 */
export function MeteorologicalBombDiagram() {
  return (
    <Diagram
      title="Eksplosiv syklonegenese (Meteorologisk bombe) og sting jet"
      heading="Den meteorologiske bomben: Ekstreme stormer på våre breddegrader"
      caption="En meteorologisk bombe oppstår når et lavtrykk på midlere breddegrader dypes eksplosivt — definert meteorologisk som et sentraltrykksfall på minst 24 hPa i løpet av 24 timer. Dette skjer når en skarp baroklin kollisjonssone mellom kald polarluft og mild atlanterhavsluft kobles til den venstre utgangskvadranten i en intens jetstreak i øvre troposfære. Den voldsomme utsugingen i høyden tvinger trykket i bunnen ned mot 940 hPa. På sørsiden av lavtrykkssenteret kan det oppstå en 'sting jet' — en smal stråle av ekstrem luft som raser ned fra midtre troposfære og gir orkan i vindkastene (over 60 m/s), slik vi så under Nyttårsorkanen i 1992 og ekstremværet Ingunn i 2024."
      viewBox="0 0 940 480"
      wide
    >
      {(m) => (
        <>
          <defs>
            <radialGradient id="dis-bomb-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Jetstrøm i høyden (øvre panel / bånd, y=50 til 110) */}
          <rect
            x="30"
            y="40"
            width="880"
            height="70"
            fill="#132435"
            stroke={C.teal}
            strokeWidth="1.5"
            rx="6"
          />
          <Arrow d="M 60 75 L 850 75" marker={m.teal} color={C.teal} width={5} />
          <L x="180" y="62" fill={C.teal} size={14} weight={800}>
            POLARFRONTJETEN (PFJ) &gt; 250 km/t
          </L>
          <L x="520" y="62" fill="#fde047" size={12} weight={800}>
            Jetstreak: Venstre utgangskvadrant (Divergens i høyden)
          </L>
          <L x="520" y="95" fill={C.fg} size={11}>
            Maksimal divergens i høyden suger luft opp fra overflaten som en gigantisk skorstein!
          </L>

          {/* Kollisjonssone: Arktisk kaldluft fra nord mot subtropisk varmluft fra sør */}
          {/* Kald luftmasse nord (blå pil ned) */}
          <rect
            x="60"
            y="140"
            width="260"
            height="90"
            fill="#0f212e"
            stroke={C.cold}
            strokeWidth="1.5"
            rx="6"
          />
          <L x="190" y="165" fill={C.cold} size={13} weight={800} anchor="middle">
            Iskald arktisk polarluft (cP)
          </L>
          <L x="190" y="185" fill="#ffffff" size={11} anchor="middle">
            Tett, tung luft strømmer sørover
          </L>
          <Arrow d="M 190 195 L 190 250" marker={m.cold} color={C.cold} width={3.5} />

          {/* Varm luftmasse sør (oransje pil opp) */}
          <rect
            x="60"
            y="340"
            width="260"
            height="90"
            fill="#241712"
            stroke={C.warm}
            strokeWidth="1.5"
            rx="6"
          />
          <L x="190" y="365" fill={C.warm} size={13} weight={800} anchor="middle">
            Mild, fuktig subtropisk luft (mT)
          </L>
          <L x="190" y="385" fill="#ffffff" size={11} anchor="middle">
            Rik på fukt og potensiell energi
          </L>
          <Arrow d="M 190 335 L 190 280" marker={m.warm} color={C.warm} width={3.5} />

          {/* DET EKSPLOSIVE LAVTRYKKET (Bomben, x=400 til 880, y=140 til 450) */}
          <rect x="360" y="130" width="550" height="320" fill="#0b1116" stroke={C.dim} rx="8" />

          {/* Tette konsentriske isobarer rundt bomben (senter x=620, y=280) */}
          <ellipse
            cx="620"
            cy="280"
            rx="240"
            ry="140"
            fill="none"
            stroke={C.dim}
            strokeWidth="1.4"
          />
          <L x="390" y="270" fill={C.muted} size={11}>
            990 hPa
          </L>

          <ellipse
            cx="620"
            cy="280"
            rx="170"
            ry="100"
            fill="none"
            stroke={C.dim}
            strokeWidth="1.8"
          />
          <L x="465" y="270" fill={C.muted} size={11}>
            970 hPa
          </L>

          <ellipse
            cx="620"
            cy="280"
            rx="105"
            ry="65"
            fill="none"
            stroke={C.low}
            strokeWidth="2.4"
          />
          <L x="530" y="270" fill={C.low} size={11} weight={700}>
            950 hPa
          </L>

          <ellipse
            cx="620"
            cy="280"
            rx="50"
            ry="32"
            fill="url(#dis-bomb-core)"
            stroke="#ef4444"
            strokeWidth="3"
          />
          <L x="620" y="278" fill="#ef4444" size={24} weight={900} anchor="middle">
            L
          </L>
          <L x="620" y="298" fill="#ffffff" size={13} weight={800} anchor="middle">
            938 hPa
          </L>

          {/* Sandes & Gyakum kriterium boks */}
          <rect
            x="380"
            y="145"
            width="240"
            height="55"
            fill="#2d1217"
            stroke="#ef4444"
            strokeWidth="1.5"
            rx="6"
          />
          <L x="500" y="165" fill="#fca5a5" size={12} weight={800} anchor="middle">
            Bombekriteriet (Sanders &amp; Gyakum):
          </L>
          <L x="500" y="184" fill="#ffffff" size={12} weight={700} anchor="middle">
            Trykkfall &gt; 24 hPa på 24 timer!
          </L>

          {/* STING JET (Smal orkanstråle på sørsiden av L, fra x=580, y=230 mot x=740, y=360) */}
          <path
            d="M 590 230 C 650 250, 710 300, 750 360"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <Arrow d="M 720 330 L 760 380" marker={m.warm} color="#f59e0b" width={5} />
          <rect
            x="680"
            y="385"
            width="215"
            height="55"
            fill="#1c160c"
            stroke="#f59e0b"
            strokeWidth="1.5"
            rx="6"
          />
          <L x="787" y="405" fill="#fde047" size={12} weight={900} anchor="middle">
            STING JET (20–50 km bred)
          </L>
          <L x="787" y="423" fill="#ffffff" size={11} weight={700} anchor="middle">
            Vindkast &gt; 60 m/s (Nyttårsorkanen 1992)
          </L>

          {/* Roterende sykloniske piler */}
          <Arrow d="M 680 180 C 790 200, 830 280, 780 330" marker={m.low} color={C.low} width={3} />
          <Arrow
            d="M 540 370 C 460 350, 440 280, 480 210"
            marker={m.cold}
            color={C.cold}
            width={3}
          />
        </>
      )}
    </Diagram>
  );
}

/**
 * 7. PolarLowFormationDiagram
 * Marint arktisk kaldluftsutbrudd (MCAO) over Norskehavet/Barentshavet.
 * Snitt fra iskanten sørover til åpent havvann (+5 °C) med voldsom varmefluks
 * og dannelse av roterende minispiral med skyfritt øye.
 */
export function PolarLowFormationDiagram() {
  return (
    <Diagram
      title="Polart lavtrykk: Kaldluftsutbrudd og arktisk eksplosjon"
      heading="Det polare lavtrykket: Arktis' fryktede mini-orkan"
      caption="Et polart lavtrykk dannes under et marint kaldluftsutbrudd (Marine Cold-Air Outbreak, MCAO). Iskald, stabil luft (-25 °C til -40 °C) blåser fra polarisen og Svalbard ut over det åpne, relativt varme Norskehavet (+4 °C til +7 °C). Den enorme temperaturkontrasten (over 30–40 °C!) skaper voldsomme vertikale varme- og fuktflukser (>600 W/m²). Atmosfæren blir eksplosivt ustabil, og konvektive skygater kveiles raskt sammen til en kompakt virvel med et orkanlignende, skyfritt øye. Lavtrykket er lite (150–300 km), dannes på få timer og fører til plutselig orkan, tett snøfokk (whiteout) og alvorlig ising på skip."
      viewBox="0 0 940 450"
      wide
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="dis-ice-edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="dis-warm-sea" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Venstre side: Fast polaris / Svalbard (x=30 til 320, y=360 til 420) */}
          <rect x="30" y="360" width="290" height="60" fill="url(#dis-ice-edge)" rx="4" />
          <line x1="30" y1="360" x2="320" y2="360" stroke="#38bdf8" strokeWidth="2.5" />
          <L x="175" y="385" fill="#0f172a" size={13} weight={800} anchor="middle">
            Polarisen / Svalbard (Snø og havis)
          </L>
          <L x="175" y="405" fill="#1e293b" size={11} weight={700} anchor="middle">
            Overflatetemperatur: -25 °C til -40 °C
          </L>

          {/* Høyre side: Åpent, varmt hav (Norskehavet, x=320 til 910) */}
          <rect x="320" y="360" width="590" height="60" fill="url(#dis-warm-sea)" rx="4" />
          <line x1="320" y1="360" x2="910" y2="360" stroke="#38bdf8" strokeWidth="2.5" />
          <L x="615" y="385" fill="#ffffff" size={13} weight={800} anchor="middle">
            Åpent Norskehavet / Barentshavet (Atlanterhavsvann +4 °C til +7 °C)
          </L>
          <L x="615" y="405" fill="#bae6fd" size={11} weight={700} anchor="middle">
            Temperaturkontrast hav vs. luft &gt; 35 °C!
          </L>

          {/* Kaldluftsutbrudd (Arktiske piler fra venstre over havet) */}
          <Arrow
            d="M 120 180 C 220 180, 280 240, 360 290"
            marker={m.cold}
            color={C.cold}
            width={4}
          />
          <Arrow
            d="M 180 140 C 280 140, 350 200, 440 260"
            marker={m.cold}
            color={C.cold}
            width={4}
          />
          <L x="200" y="110" fill={C.cold} size={14} weight={800} anchor="middle">
            Marint kaldluftsutbrudd (MCAO) ↓
          </L>
          <L x="200" y="128" fill={C.muted} size={11} anchor="middle">
            Iskald luft raser ut over åpent vann
          </L>

          {/* Massive varmeflukspiler fra havet opp i luften */}
          <Arrow d="M 420 350 L 420 270" marker={m.warm} color={C.warm} width={3} />
          <Arrow d="M 480 350 L 480 250" marker={m.warm} color={C.warm} width={3} />
          <Arrow d="M 540 350 L 540 230" marker={m.warm} color={C.warm} width={3} />
          <L x="480" y="215" fill={C.warm} size={12} weight={800} anchor="middle">
            Varme- og fuktfluks &gt; 600 W/m²!
          </L>

          {/* DET POLARE LAVTRYKKET (Høyre panel, miniatyr-orkan, x=600 til 890) */}
          <rect
            x="620"
            y="50"
            width="280"
            height="280"
            fill="#0e1720"
            stroke={C.low}
            strokeWidth="1.8"
            rx="8"
          />
          <L x="760" y="75" fill={C.low} size={15} weight={800} anchor="middle">
            Polart lavtrykk (Mini-orkan)
          </L>
          <L x="760" y="93" fill={C.muted} size={11} anchor="middle">
            Diameter: 150–300 km · Levetid: 12–36 timer
          </L>

          {/* Roterende kommaspiral */}
          <circle
            cx="760"
            cy="180"
            r="75"
            fill="none"
            stroke="#475569"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
          <circle
            cx="760"
            cy="180"
            r="45"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="4"
            strokeDasharray="6 4"
          />
          {/* Skyfritt øye i midten */}
          <circle cx="760" cy="180" r="14" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" />
          <L x="760" y="185" fill="#f87171" size={13} weight={800} anchor="middle">
            Øye
          </L>

          {/* Rotasjonspiler mot klokken */}
          <Arrow d="M 760 125 Q 690 145 710 215" marker={m.low} color={C.low} width={3} />
          <Arrow d="M 710 215 Q 765 255 825 210" marker={m.low} color={C.low} width={3} />
          <Arrow d="M 825 210 Q 835 145 770 125" marker={m.low} color={C.low} width={3} />

          {/* Faremomenter boks */}
          <rect
            x="635"
            y="260"
            width="250"
            height="60"
            fill="#2d1217"
            stroke="#ef4444"
            strokeWidth="1.2"
            rx="6"
          />
          <L x="760" y="280" fill="#f87171" size={11} weight={800} anchor="middle">
            ⚠️ Akutt fare for fiske og kysttrafikk:
          </L>
          <L x="760" y="296" fill="#ffffff" size={10} anchor="middle">
            • Uvarslet orkan i kastene på under 1 time
          </L>
          <L x="760" y="310" fill="#ffffff" size={10} anchor="middle">
            • Tett snøfokk (whiteout) og ising på fartøy
          </L>
        </>
      )}
    </Diagram>
  );
}

/**
 * 8. ClimateRiskShiftDiagram
 * Statistisk forskyvning av sannsynlighetsfordelingen (Gauss-kurven).
 * Viser hvordan et skifte i middelverdi gir en eksponensiell økning i
 * frekvens og intensitet av ekstremvær i de ekstreme halene.
 */
export function ClimateRiskShiftDiagram() {
  return (
    <Diagram
      title="Statistisk forskyvning av ekstremvær: Hvorfor små endringer gir store katastrofer"
      heading="Klimarisiko i halen: En liten temperaturøkning mangedobler ekstremværet"
      caption="Hvorfor fører en tilsynelatende liten global oppvarming på 1,5–2 °C til en så voldsom eskalering i værkatastrofer? Svaret ligger i sannsynlighetsfordelingen (den statistiske bjellekurven). Når kurvens gjennomsnitt forskyves svakt mot høyre, skjer det to ting: 1) Tidligere 'normale' hetebølger og styrtregn blir dagligdags. 2) I den ytterste høyre halen — der de ekstreme, en-gang-i-århundret-katastrofene befinner seg — øker frekvensen ikke lineært, men eksponensielt! World Weather Attribution (WWA) bruker klimamodeller for å beregne 'Risk Ratio' (hvor mange ganger mer sannsynlig en konkret katastrofe ble som følge av oppvarmingen)."
      viewBox="0 0 940 440"
      wide
    >
      {(_m) => (
        <>
          <defs>
            <linearGradient id="dis-hist-curve" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="dis-new-curve" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Akser */}
          <line x1="80" y1="360" x2="880" y2="360" stroke={C.dim} strokeWidth="2" />
          <line x1="80" y1="360" x2="80" y2="60" stroke={C.dim} strokeWidth="1.5" />
          <L x="80" y="50" fill={C.muted} size={12} weight={700}>
            Sannsynlighet (Frekvens)
          </L>
          <L x="880" y="380" fill={C.muted} size={12} weight={700} anchor="end">
            Temperatur / Nedbørsintensitet →
          </L>

          {/* 1. HISTORISK KLIMAFORDELING (Blå kurve, senter x=380) */}
          <path
            d="M 120 360 C 220 360, 300 110, 380 110 C 460 110, 540 360, 640 360"
            fill="url(#dis-hist-curve)"
            stroke="#38bdf8"
            strokeWidth="3"
          />
          {/* Historisk snitt */}
          <line
            x1="380"
            y1="110"
            x2="380"
            y2="360"
            stroke="#38bdf8"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <L x="380" y="375" fill="#38bdf8" size={12} weight={700} anchor="middle">
            Tidligere snitt
          </L>

          {/* 2. NYTT VARMERE KLIMA (Rød kurve, senter x=480 - forskjøvet mot høyre) */}
          <path
            d="M 220 360 C 320 360, 400 130, 480 130 C 560 130, 640 360, 740 360"
            fill="url(#dis-new-curve)"
            stroke="#ef4444"
            strokeWidth="3.5"
          />
          {/* Nytt snitt */}
          <line
            x1="480"
            y1="130"
            x2="480"
            y2="360"
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <L x="480" y="375" fill="#ef4444" size={12} weight={800} anchor="middle">
            Nytt varmere snitt (+1,5 °C)
          </L>

          {/* Pil for forskyvning i snitt */}
          <path d="M 390 100 Q 430 90 470 100" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <L x="430" y="85" fill="#f59e0b" size={12} weight={800} anchor="middle">
            Liten forskyvning av snitt →
          </L>

          {/* TERSKEL FOR TIDLIGERE EKSTREMVÆR (x=600) */}
          <line
            x1="600"
            y1="60"
            x2="600"
            y2="360"
            stroke="#fde047"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <L x="600" y="52" fill="#fde047" size={12} weight={800} anchor="middle">
            Tidligere ekstremterskel
          </L>

          {/* DEN EKSTREME HALEN: Eksponensiell økning (x=600 til 740) */}
          <rect
            x="620"
            y="100"
            width="260"
            height="110"
            fill="#2d1217"
            stroke="#ef4444"
            strokeWidth="2"
            rx="6"
          />
          <L x="750" y="125" fill="#f87171" size={13} weight={900} anchor="middle">
            EKSPLOSJON I EKSTREMHENDEISER
          </L>
          <L x="750" y="145" fill="#ffffff" size={11} weight={700} anchor="middle">
            • Tidligere ekstremvær blir mye vanligere
          </L>
          <L x="750" y="162" fill="#bae6fd" size={11} weight={600} anchor="middle">
            • Helt nye, uovertrufne rekorder oppstår
          </L>
          <L x="750" y="180" fill="#fde047" size={11} weight={700} anchor="middle">
            • Flerdobling av 100-årsflommer og stormer
          </L>
          <L x="750" y="198" fill="#f87171" size={11} weight={800} anchor="middle">
            WWA Risk Ratio: RR = P(klima) / P(naturlig) &gt; 5–20x!
          </L>

          {/* Område for tidligere kaldt ekstremvær */}
          <L x="160" y="340" fill="#38bdf8" size={11} weight={600}>
            Mindre ekstremkulde
          </L>
        </>
      )}
    </Diagram>
  );
}
