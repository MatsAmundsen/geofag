import { Arrow, C, Diagram, L } from "./svg-kit";

export function SynopticMapDiagram() {
  return (
    <Diagram
      title="Skjematisk værkart over Nord-Atlanteren og Norge med isobarer, L, H og fronter"
      heading="Slik leser du et synoptisk kart"
      caption="Isobarer er linjer med samme lufttrykk. Tette linjer = sterk vind. L og H er relative. Varmfront: varm luft klatrer over kald. Kaldfront: kald luft graver under varm. Okklusjon: kaldfronten har tatt igjen varmfronten."
      viewBox="0 0 900 460"
      wide
    >
      {(m) => (
        <>
          <ellipse cx="250" cy="210" rx="210" ry="160" fill="none" stroke={C.dim} strokeWidth="1.2" />
          <ellipse cx="250" cy="210" rx="160" ry="118" fill="none" stroke={C.dim} strokeWidth="1.2" />
          <ellipse cx="250" cy="210" rx="110" ry="78" fill="none" stroke={C.low} strokeWidth="1.6" />
          <ellipse cx="250" cy="210" rx="60" ry="42" fill="none" stroke={C.low} strokeWidth="1.8" />
          <L x="250" y="218" fill={C.low} size={28} weight={700} anchor="middle">L</L>
          <L x="250" y="240" fill={C.muted} size={12} anchor="middle">976 hPa</L>
          <ellipse cx="720" cy="120" rx="90" ry="62" fill="none" stroke={C.warm} strokeWidth="1.6" />
          <ellipse cx="720" cy="120" rx="50" ry="34" fill="none" stroke={C.warm} strokeWidth="1.6" />
          <L x="720" y="126" fill={C.warm} size={24} weight={700} anchor="middle">H</L>
          <L x="720" y="148" fill={C.muted} size={12} anchor="middle">1032</L>
          <path d="M 250 210 C 340 170 430 150 520 168 C 600 184 650 210 690 250" fill="none" stroke={C.low} strokeWidth="3.2" />
          <L x="540" y="154" fill={C.low} size={13}>kaldfront</L>
          <path d="M 250 210 C 330 250 420 300 530 318 C 620 332 700 310 760 270" fill="none" stroke={C.warm} strokeWidth="3.2" />
          <L x="560" y="348" fill={C.warm} size={13}>varmfront</L>
          <path d="M 250 210 C 200 140 170 90 150 50" fill="none" stroke={C.fg} strokeWidth="3" strokeDasharray="8 5" />
          <L x="80" y="48" fill={C.fg} size={13}>okklusjon</L>
          <Arrow d="M 310 120 L 390 96" marker={m.teal} color={C.teal} width={2.2} />
          <Arrow d="M 180 120 L 110 150" marker={m.teal} color={C.teal} width={2.2} />
          <Arrow d="M 140 250 L 170 320" marker={m.teal} color={C.teal} width={2.2} />
          <rect x="24" y="392" width="852" height="50" rx="8" fill="#152028" />
          <L x="44" y="422" fill={C.muted} size={13}>Leserekkefølge: L/H, tette isobarer, fronter, flytt 24 t med vestavinden</L>
        </>
      )}
    </Diagram>
  );
}

export function TwentyFourHourDiagram() {
  return (
    <Diagram title="Samme lavtrykk nå og om 24 timer" heading="Hva skjer de neste 24 timene?" caption="Polarfrontsykloner driver typisk mot nordøst med vestavinden. Frontene følger." viewBox="0 0 900 280" wide>
      {(m) => (
        <>
          <L x="170" y="36" size={16} weight={600} anchor="middle">Nå</L>
          <circle cx="170" cy="150" r="54" fill="none" stroke={C.low} strokeWidth="2" />
          <L x="170" y="156" fill={C.low} size={22} weight={700} anchor="middle">L</L>
          <Arrow d="M 250 150 L 620 110" marker={m.teal} color={C.teal} width={3} />
          <L x="730" y="36" size={16} weight={600} anchor="middle">+24 t</L>
          <circle cx="730" cy="118" r="54" fill="none" stroke={C.low} strokeWidth="2" />
          <L x="730" y="124" fill={C.low} size={22} weight={700} anchor="middle">L</L>
        </>
      )}
    </Diagram>
  );
}

export function PolarFrontCycloneSteps() {
  return (
    <Diagram title="Fire steg i en polarfrontsyklon" heading="Polarfrontsyklon, steg for steg" caption="Bølge, varm sektor, okklusjon, utfylling." viewBox="0 0 900 240" wide>
      {(m) => (
        <>
          <L x="140" y="36" size={15} weight={600} anchor="middle">1 Bølge</L>
          <L x="360" y="36" size={15} weight={600} anchor="middle">2 Varm sektor</L>
          <L x="560" y="36" size={15} weight={600} anchor="middle">3 Okklusjon</L>
          <L x="780" y="36" size={15} weight={600} anchor="middle">4 Utfylling</L>
          <path d="M 50 160 L 180 160 L 180 90 L 230 90" fill="none" stroke={C.warm} strokeWidth="2.4" />
          <path d="M 50 160 L 180 160 L 180 210" fill="none" stroke={C.cold} strokeWidth="2.4" />
          <L x="140" y="148" fill={C.low} size={16} weight={700}>L</L>
          <path d="M 280 170 L 360 170 L 400 90 L 460 90" fill="none" stroke={C.warm} strokeWidth="2.4" />
          <path d="M 280 170 L 360 170 L 400 220" fill="none" stroke={C.cold} strokeWidth="2.4" />
          <L x="348" y="158" fill={C.low} size={16} weight={700}>L</L>
          <path d="M 500 170 L 560 170 L 590 80 L 670 110" fill="none" stroke={C.fg} strokeWidth="2.4" />
          <circle cx="780" cy="160" r="36" fill="none" stroke={C.muted} strokeWidth="1.6" strokeDasharray="5 4" />
          <L x="780" y="166" fill={C.muted} size={16} weight={700} anchor="middle">L</L>
          <Arrow d="M 816 160 L 860 160" marker={m.muted} color={C.muted} width={1.8} />
        </>
      )}
    </Diagram>
  );
}

export function ValleyWindDiagram() {
  return (
    <Diagram title="Dalvind og fjellvind" heading="Dalvind og fjellvind" caption="Dag: opp dalen. Natt: ned dalen." viewBox="0 0 820 260">
      {(m) => (
        <>
          <path d="M 20 230 L 140 80 L 200 120 L 320 40 L 400 230 Z" fill="#1e2c25" />
          <path d="M 420 230 L 500 90 L 580 140 L 700 50 L 800 230 Z" fill="#1e2c25" />
          <Arrow d="M 90 200 L 150 120" marker={m.warm} color={C.warm} width={2.6} />
          <Arrow d="M 250 200 L 300 100" marker={m.warm} color={C.warm} width={2.6} />
          <Arrow d="M 530 100 L 470 200" marker={m.cold} color={C.cold} width={2.6} />
          <Arrow d="M 680 90 L 740 200" marker={m.cold} color={C.cold} width={2.6} />
        </>
      )}
    </Diagram>
  );
}
