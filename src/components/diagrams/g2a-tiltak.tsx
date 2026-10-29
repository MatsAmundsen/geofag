import { C } from "./svg-kit";
import { Box, Flow, G, G2Figur, T } from "./g2a-kit";

const NB = "\u00a0";

/* ---------- små byggeklosser ---------- */

function Kort({ x, y, w, h, f, tittel, sub }: { x: number; y: number; w: number; h: number; f: string; tittel: string; sub?: string }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} stroke={f} fill={G.panel} sw={1.8} />
      <T x={x + 14} y={y + 26} lines={tittel} size={16} weight={700} fill={f} />
      {sub && <T x={x + 14} y={y + 44} lines={sub} size={14} fill={C.muted} />}
    </g>
  );
}

function Pros({ x, y, w, navn, verdi, f }: { x: number; y: number; w: number; navn: string; verdi: string; f: string }) {
  const p = parseFloat(verdi.replace(/[^0-9,]/g, "").replace(",", "."));
  return (
    <g>
      <T x={x} y={y + 14} lines={navn} size={14} weight={700} fill={C.fg} />
      <T x={x + w} y={y + 14} lines={verdi} size={14} weight={700} fill={f} anchor="end" />
      <rect x={x} y={y + 22} width={w} height={10} rx={5} fill="none" stroke={G.line} strokeWidth={1.2} />
      <rect x={x} y={y + 22} width={(w * p) / 100} height={10} rx={5} fill={f} />
    </g>
  );
}

function Stor({ x, y, tall, tekst, f, lh = 17 }: { x: number; y: number; tall: string; tekst: string[]; f: string; lh?: number }) {
  return (
    <g>
      <T x={x} y={y} lines={tall} size={26} weight={700} fill={f} />
      <T x={x} y={y + 24} lines={tekst} size={14} fill={C.fg} lh={lh} />
    </g>
  );
}

/* ---------- TiltaksstigeFigur ---------- */

export function TiltaksstigeFigur() {
  return (
    <G2Figur
      title="Tiltak sektor for sektor og kostnadstrappen"
      desc="Oversikt over IPCCs tiltak sektor for sektor. For å holde 1,5 grader må utslippene ned 43 prosent innen 2030 og 84 prosent innen 2050 sammenlignet med 2019, da utslippene var 59 milliarder tonn CO₂-ekvivalenter. Energi: i 2050 er bruken av kull, olje og gass uten karbonfangst omtrent 95, 60 og 45 prosent lavere enn i 2019, og fra 2010 til 2019 falt enhetskostnadene for solenergi med 85 prosent, vindenergi med 55 prosent og litiumionbatterier med 85 prosent. Transport: elektriske kjøretøy, biodrivstoff og hydrogen i noen deler. Industri og bygg: elektrifisering og sirkulær materialbruk, og 5 til 30 prosent av utslippene fra sluttbrukersektorene kan unngås innen 2050. Arealbruk: 8 til 14 milliarder tonn CO₂-ekvivalenter i året til under 100 dollar per tonn. Etterspørsel: 40 til 70 prosent lavere utslipp i 2050 enn med politikken vedtatt til 2020. Kostnadstrapp: tiltak under 100 dollar per tonn kan kutte minst halvparten av 2019-nivået innen 2030, og mer enn halvparten av dette koster under 20 dollar per tonn."
      heading="Tiltak sektor for sektor"
      caption={`Skjematisk, ikke i målestokk. Tallene gjelder modellerte baner som holder 1,5 °C. Lengden på stolpene viser prosentene. USD er amerikanske dollar. Kilde: IPCC (2022).`}
      narrow={{ w: 300, h: 1772 }}
      wide={{ w: 720, h: 812 }}
    >
      {({ bred }) => {
        const W = bred ? 700 : 280;
        const bannerH = bred ? 72 : 112;
        const yA = 10 + bannerH + 12;
        /* kort-plassering */
        const eW = bred ? 440 : 280;
        const eH = bred ? 224 : 408;
        const tX = bred ? 462 : 10;
        const tW = bred ? 248 : 280;
        const tY = bred ? yA : yA + eH + 12;
        const tH = bred ? eH : 196;
        const yB = bred ? yA + eH + 12 : tY + tH + 12;
        const cW = bred ? 226 : 280;
        const cH = bred ? 196 : 206;
        const cx = (i: number) => (bred ? 10 + i * 237 : 10);
        const cy = (i: number) => (bred ? yB : yB + i * (cH + 12));
        const kY = bred ? yB + cH + 12 : cy(1) + 170 + 12 + 170 + 12;
        const kW = bred ? 700 : 280;
        const innerW = (kW - 28) * 0.6;
        const fullW = kW - 28;
        const chips = ["Sol- og vindkraft", "Energieffektivisering", "Stanse avskoging", "Kutte metan"];
        const chipW = [150, 176, 144, 108];
        return (
          <>
            {/* mål */}
            <Box x={10} y={10} w={W} h={bannerH} stroke={C.teal} fill={G.panel2} sw={1.8} />
            <Stor x={24} y={44} tall="−43 %" tekst={["innen 2030"]} f={C.teal} />
            <Stor x={bred ? 170 : 160} y={44} tall="−84 %" tekst={["innen 2050"]} f={C.teal} />
            {bred ? (
              <T x={320} y={34} lines={["Utslippene må ned mot 2019-nivået på", "59 Gt CO₂e for å holde 1,5 °C."]} size={14} fill={C.fg} lh={19} />
            ) : (
              <T x={24} y={98} lines="mot 2019-nivået på 59 Gt CO₂e" size={14} fill={C.fg} />
            )}
            {/* energi */}
            <Kort x={10} y={yA} w={eW} h={eH} f={C.warm} tittel="Energi" />
            {(() => {
              const cw = bred ? 190 : 252;
              const c2 = bred ? 10 + 14 + cw + 22 : 24;
              const y2 = bred ? yA + 56 : yA + 56 + 190;
              return (
                <>
                  <T x={24} y={yA + 56} lines="Bruk i 2050 mot 2019" size={14} weight={700} fill={C.fg} />
                  <T x={24} y={yA + 74} lines="uten karbonfangst" size={14} fill={C.muted} />
                  <Pros x={24} y={yA + 90} w={cw} navn="Kull" verdi="−95 %" f={C.low} />
                  <Pros x={24} y={yA + 132} w={cw} navn="Olje" verdi="−60 %" f={C.warm} />
                  <Pros x={24} y={yA + 174} w={cw} navn="Gass" verdi="−45 %" f={C.cold} />
                  <T x={c2} y={y2} lines="Enhetskostnad" size={14} weight={700} fill={C.fg} />
                  <T x={c2} y={y2 + 18} lines="2010–2019" size={14} fill={C.muted} />
                  <Pros x={c2} y={y2 + 34} w={cw} navn="Sol" verdi="−85 %" f={C.warm} />
                  <Pros x={c2} y={y2 + 76} w={cw} navn="Vind" verdi="−55 %" f={C.rain} />
                  <Pros x={c2} y={y2 + 118} w={cw} navn="Litiumionbatterier" verdi="−85 %" f={G.green} />
                </>
              );
            })()}
            {/* transport */}
            <Kort x={tX} y={tY} w={tW} h={tH} f={C.cold} tittel="Transport" />
            <T x={tX + 14} y={tY + 52} lines={["Elektriske kjøretøy med", "lavutslippsstrøm"]} size={14} weight={700} fill={C.fg} lh={18} />
            <T x={tX + 14} y={tY + 100} lines={["Bærekraftig biodrivstoff og", "hydrogen i noen deler av", "transporten"]} size={14} fill={C.fg} lh={18} />
            <T x={tX + 14} y={tY + 166} lines={bred ? ["Utfordringer: lading og", "mineraler til batterier"] : "Utfordring: lading og batterimineraler"} size={14} fill={C.muted} lh={18} />
            {/* industri og bygg */}
            <Kort x={cx(0)} y={cy(0)} w={cW} h={cH} f={C.sand} tittel="Industri og bygg" />
            <T x={cx(0) + 14} y={cy(0) + 50} lines={["Elektrifisering og sirkulær", "materialbruk i industrien"]} size={14} fill={C.fg} lh={18} />
            <Stor x={cx(0) + 14} y={cy(0) + 118} tall="5–30 %" tekst={["av utslippene fra sluttbruker-", "sektorene unngås innen 2050"]} f={C.sand} />
            {/* arealbruk */}
            <Kort x={cx(1)} y={cy(1)} w={cW} h={bred ? cH : 170} f={G.green} tittel="Arealbruk" />
            <T x={cx(1) + 14} y={cy(1) + 50} lines={["Mest fra å bevare skog. Å stanse", "avskoging i tropene gir mest."]} size={14} fill={C.fg} lh={18} />
            <Stor x={cx(1) + 14} y={cy(1) + 118} tall={`8–14 Gt CO₂e`} tekst={bred ? ["i året til under 100 USD per tonn"] : ["i året til under 100 USD per tonn"]} f={G.green} />
            {/* etterspørsel */}
            <Kort x={cx(2)} y={bred ? cy(2) : cy(1) + 170 + 12} w={cW} h={bred ? cH : 170} f={G.violet} tittel="Etterspørsel" />
            {(() => {
              const yy = bred ? cy(2) : cy(1) + 170 + 12;
              return (
                <>
                  <T x={cx(2) + 14} y={yy + 50} lines={["Endrer hva vi bruker og", "hvordan. Størst mulighet for", "dem med høy inntekt."]} size={14} fill={C.fg} lh={18} />
                  <Stor x={cx(2) + 14} y={yy + 124} tall="40–70 %" tekst={["lavere utslipp i 2050 enn", "med politikk vedtatt til 2020"]} f={G.violet} />
                </>
              );
            })()}
            {/* kostnadstrapp */}
            <Kort x={10} y={kY} w={kW} h={bred ? 250 : 410} f={C.teal} tittel="Kostnadstrapp" sub={bred ? "Tiltak under 100 USD per tonn CO₂e kan kutte minst halvparten av 2019-nivået innen 2030." : undefined} />
            {!bred && <T x={24} y={kY + 44} lines={["Tiltak under 100 USD per tonn", "CO₂e kan kutte minst halvparten", "av 2019-nivået innen 2030."]} size={14} fill={C.muted} lh={18} />}
            {(() => {
              const by = kY + (bred ? 84 : 118);
              const bx = 24;
              return (
                <>
                  <rect x={bx} y={by} width={innerW} height={40} rx={6} fill={C.teal} />
                  <T x={bx + 12} y={by + 26} lines={`Under 20 USD`} size={14} weight={700} fill={C.bg} />
                  <rect x={bx + innerW + 2} y={by} width={fullW - innerW - 2} height={40} rx={6} fill={C.sand} />
                  <T x={bx + innerW + 14} y={by + 26} lines="20–100 USD" size={14} weight={700} fill={C.bg} />
                  <line x1={bx + fullW / 2} x2={bx + fullW / 2} y1={by - 8} y2={by + 50} stroke={C.fg} strokeWidth={2} strokeDasharray="5 4" />
                  <T x={bx + fullW / 2} y={by - 14} lines="halvparten" size={14} weight={700} fill={C.fg} anchor="middle" />
                  <T x={bx} y={by + 76} lines={bred ? "Mer enn halvparten av kuttene koster under 20 USD per tonn." : ["Mer enn halvparten av kuttene", "koster under 20 USD per tonn."]} size={14} fill={C.fg} lh={18} />
                  <T x={bx} y={by + (bred ? 108 : 118)} lines="Største bidrag:" size={14} weight={700} fill={C.fg} />
                  {chips.map((c, i) => {
                    const w = chipW[i];
                    const x = bred ? bx + chipW.slice(0, i).reduce((a, b) => a + b + 12, 0) : bx;
                    const y = bred ? by + 120 : by + 130 + i * 38;
                    return (
                      <g key={c}>
                        <rect x={x} y={y} width={w} height={30} rx={15} fill={G.panel2} stroke={C.teal} strokeWidth={1.4} />
                        <T x={x + w / 2} y={y + 20} lines={c} size={14} fill={C.fg} anchor="middle" />
                      </g>
                    );
                  })}
                </>
              );
            })()}
            {void NB}
          </>
        );
      }}
    </G2Figur>
  );
}

/* ---------- CdrSkjemaFigur ---------- */

function Steg({ x, y, w, h, navn, d }: { x: number; y: number; w: number; h: number; navn: string; d: string[] }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} stroke={C.sand} fill={G.panel2} sw={1.4} />
      <T x={x + 10} y={y + 20} lines={navn} size={14} weight={700} fill={C.fg} />
      <T x={x + 10} y={y + 38} lines={d} size={14} fill={C.muted} lh={17} />
    </g>
  );
}

export function CdrSkjemaFigur() {
  return (
    <G2Figur
      title="CCS og CDR: to ulike måter å håndtere CO₂ på"
      desc="Skjema som skiller karbonfangst og lagring, CCS, fra karbonfjerning, CDR. CCS fanger CO₂ ved et utslippspunkt, for eksempel et sementverk, og lagrer den under bakken. Det hindrer nye utslipp, men tar ikke CO₂ ut av lufta. Eksemplet er Northern Lights: CO₂ fra sementfabrikken i Brevik fraktes med skip til Øygarden og pumpes gjennom en rørledning på 100 kilometer til et reservoar 2600 meter under havbunnen, med en kapasitet på 1,5 millioner tonn CO₂ i året i første trinn. Norske utslipp er over 40 millioner tonn CO₂-ekvivalenter i året. CDR tar CO₂ ut av lufta. Skogplanting og jordkarbon koster 45 til 100 dollar per tonn for jordkarbon og lagrer i tiår til århundrer, og kan reverseres av brann, sykdom og endret klima. BECCS fjerner 30 til 780 milliarder tonn CO₂ i modellerte 1,5-gradersbaner for 2020 til 2100. DACCS koster 100 til 300 dollar per tonn, lagrer geologisk i ti tusen år eller mer og fjerner 0 til 310 milliarder tonn CO₂ i de samme banene. CDR kan ikke erstatte kutt i utslipp."
      heading="CCS eller CDR"
      caption="Skjematisk, ikke i målestokk. BECCS er bioenergi med fangst og lagring, og DACCS er direkte fangst fra luft med lagring. Mengdene gjelder modellerte baner som holder 1,5 °C, 2020–2100. Kilder: IPCC (2022) og Equinor (2025). Norske utslipp: SSB (2026)."
      narrow={{ w: 300, h: 1240 }}
      wide={{ w: 720, h: 660 }}
      animated
      name="ccs-cdr-figuren"
    >
      {({ bred, mk }) => {
        const pw = bred ? 340 : 280;
        const ph = 556;
        const x1 = 10;
        const y1 = 10;
        const x2 = bred ? 370 : 10;
        const y2 = bred ? 10 : 10 + ph + 12;
        const cardW = pw - 30;
        /* CDR-kort */
        const kort = [
          { t: "Skogplanting og jordkarbon", l: ["Jordkarbon: 45–100 USD per tonn", "Lagring: tiår til århundrer.", "Kan reverseres av brann,", "sykdom og endret klima."], f: G.green },
          { t: "BECCS", u: "bioenergi med fangst og lagring", l: ["30–780 Gt CO₂ i 1,5 °C-baner,", "2020–2100"], f: C.warm },
          { t: "DACCS", u: "fangst fra luft med lagring", l: ["100–300 USD per tonn", "Geologisk lagring:", "ti tusen år eller mer", "0–310 Gt CO₂ i 1,5 °C-baner"], f: C.cold },
        ];
        const hs = kort.map((k) => 34 + (k.u ? 18 : 0) + k.l.length * 18 + 10);
        let ky = y2 + 138;
        const poss = hs.map((h) => {
          const r = ky;
          ky += h + 10;
          return r;
        });
        const sx = x2 + 22;
        const noteY = 10 + ph + (bred ? 14 : 12 + ph + 14);
        const ccsX = x1;
        const bw = bred ? 130 : 108;
        return (
          <>
            {/* CCS */}
            <Box x={ccsX} y={y1} w={pw} h={ph} stroke={C.sand} fill={G.panel} sw={1.8} />
            <T x={ccsX + 14} y={y1 + 26} lines="CCS: fangst og lagring" size={16} weight={700} fill={C.sand} />
            <T x={ccsX + 14} y={y1 + 46} lines={["Fanger CO₂ ved utslippspunktet", "og lagrer den under bakken."]} size={14} fill={C.fg} lh={18} />
            <rect x={ccsX + 14} y={y1 + 88} width={pw - 28} height={34} rx={6} fill={C.rain} fillOpacity={0.14} stroke={C.rain} strokeWidth={1.4} />
            <T x={ccsX + 26} y={y1 + 110} lines={bred ? "Lufta: CO₂ tas ikke ut" : "Lufta: ingen CO₂ tas ut"} size={14} weight={700} fill={C.fg} />
            <rect x={ccsX + 14} y={y1 + 196} width={pw - 28} height={58} fill={C.sand} fillOpacity={0.12} />
            <line x1={ccsX + 14} x2={ccsX + pw - 14} y1={y1 + 196} y2={y1 + 196} stroke={C.sand} strokeWidth={2} />
            <T x={ccsX + 22} y={y1 + 248} lines="Under bakken" size={14} fill={C.sand} />
            {/* fabrikk */}
            <rect x={ccsX + 26} y={y1 + 156} width={56} height={40} fill={G.panel2} stroke={C.fg} strokeWidth={1.6} />
            <rect x={ccsX + 62} y={y1 + 132} width={12} height={24} fill={G.panel2} stroke={C.fg} strokeWidth={1.6} />
            <Box x={ccsX + 112} y={y1 + 158} w={bred ? 70 : 64} h={36} stroke={C.teal} fill={G.panel2} sw={1.6} />
            <T x={ccsX + 112 + (bred ? 35 : 32)} y={y1 + 181} lines="Fangst" size={14} weight={700} fill={C.teal} anchor="middle" />
            <Flow d={`M${ccsX + 84} ${y1 + 176} L${ccsX + 110} ${y1 + 176}`} color={C.teal} marker={mk.teal} w={2.4} />
            <Flow d={`M${ccsX + 112 + (bred ? 35 : 32)} ${y1 + 196} L${ccsX + 112 + (bred ? 35 : 32)} ${y1 + 226} L${ccsX + pw - 128} ${y1 + 226}`} color={C.teal} marker={mk.teal} w={2.4} />
            <rect x={ccsX + pw - 126} y={y1 + 208} width={104} height={36} rx={6} fill={C.teal} fillOpacity={0.2} stroke={C.teal} strokeWidth={2} className="a a-pulse2" />
            <T x={ccsX + pw - 74} y={y1 + 231} lines="Lagret CO₂" size={14} weight={700} fill={C.fg} anchor="middle" />
            <T x={ccsX + 14} y={y1 + 282} lines={["Hindrer nye utslipp, men tar ikke", "CO₂ ut av lufta."]} size={14} weight={700} fill={C.fg} lh={18} />
            {/* Northern Lights */}
            <line x1={ccsX + 14} x2={ccsX + pw - 14} y1={y1 + 324} y2={y1 + 324} stroke={G.line} strokeWidth={1.4} />
            <T x={ccsX + 14} y={y1 + 350} lines="Eksempel: Northern Lights" size={16} weight={700} fill={C.sand} />
            <Steg x={ccsX + 14} y={y1 + 364} w={bw} h={48} navn="Brevik" d={["sementfabrikk"]} />
            <Steg x={ccsX + pw - 14 - bw} y={y1 + 364} w={bw} h={48} navn="Skip" d={["til Øygarden"]} />
            <Flow d={`M${ccsX + 14 + bw + 5} ${y1 + 388} L${ccsX + pw - 14 - bw - 7} ${y1 + 388}`} color={C.sand} marker={mk.sand} w={2.4} />
            <Steg x={ccsX + pw - 14 - bw} y={y1 + 430} w={bw} h={48} navn="Rørledning" d={["100 km"]} />
            <Flow d={`M${ccsX + pw - 14 - bw / 2} ${y1 + 414} L${ccsX + pw - 14 - bw / 2} ${y1 + 428}`} color={C.sand} marker={mk.sand} w={2.4} />
            <Steg x={ccsX + 14} y={y1 + 430} w={bw} h={66} navn="Reservoar" d={["2600 m under", "havbunnen"]} />
            <Flow d={`M${ccsX + pw - 14 - bw - 5} ${y1 + 454} L${ccsX + 14 + bw + 7} ${y1 + 454}`} color={C.sand} marker={mk.sand} w={2.4} />
            <T x={ccsX + 14} y={y1 + 516} lines={["1,5 millioner tonn CO₂ i året (første trinn).", "Norske utslipp: over 40 Mt i året."]} size={14} fill={C.fg} lh={18} />
            {!bred && null}
            {/* CDR */}
            <Box x={x2} y={y2} w={pw} h={ph} stroke={C.teal} fill={G.panel} sw={1.8} />
            <T x={x2 + 14} y={y2 + 26} lines="CDR: fjerning fra lufta" size={16} weight={700} fill={C.teal} />
            <T x={x2 + 14} y={y2 + 46} lines={["Tar CO₂ ut av lufta og lagrer", "den varig eller lenge,", "avhengig av metode."]} size={14} fill={C.fg} lh={18} />
            <rect x={x2 + 14} y={y2 + 88} width={pw - 28} height={34} rx={6} fill={C.rain} fillOpacity={0.14} stroke={C.rain} strokeWidth={1.4} />
            <T x={x2 + 26} y={y2 + 110} lines="Lufta: CO₂ tas ut" size={14} weight={700} fill={C.fg} />
            <line x1={sx - 4} x2={sx - 4} y1={y2 + 124} y2={poss[2] + 22} stroke={C.teal} strokeWidth={2.4} className="a a-flow" strokeDasharray="6 5" />
            {kort.map((k, i) => (
              <g key={k.t}>
                <Flow d={`M${sx - 4} ${poss[i] + 22} L${x2 + 28} ${poss[i] + 22}`} color={C.teal} marker={mk.teal} w={2.4} />
                <Box x={x2 + 30} y={poss[i]} w={cardW - 14} h={hs[i]} stroke={k.f} fill={G.panel2} sw={1.6} />
                <T x={x2 + 42} y={poss[i] + 24} lines={k.t} size={14} weight={700} fill={k.f} />
                {k.u && <T x={x2 + 42} y={poss[i] + 42} lines={k.u} size={14} fill={C.muted} />}
                <T x={x2 + 42} y={poss[i] + (k.u ? 62 : 44)} lines={k.l} size={14} fill={C.fg} lh={18} />
              </g>
            ))}
            {/* note */}
            <Box x={10} y={noteY} w={bred ? 700 : 280} h={bred ? 62 : 84} stroke={C.low} fill={G.panel2} sw={1.8} />
            <T x={24} y={noteY + 26} lines={bred ? ["CDR kan ikke erstatte kutt i utslipp.", "Den kan kompensere for utslipp som er svært vanskelige å fjerne."] : ["CDR kan ikke erstatte kutt i", "utslipp. Den kan kompensere for", "utslipp som er svært vanskelige", "å fjerne."]} size={14} weight={700} fill={C.fg} lh={19} />
          </>
        );
      }}
    </G2Figur>
  );
}
