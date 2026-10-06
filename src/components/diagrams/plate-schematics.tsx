import { useId, type ReactNode } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { C, L } from "./svg-kit";

/**
 * Skjematiske figurer som erstatter raster med innbrent tekst på Platetektonikk.
 * Bredde 400 i viewBox og max-w-xl holder skriften lesbar på en ~390 px skjerm.
 */

function Schematic({
  title,
  heading,
  caption,
  viewBox,
  children,
}: {
  title: string;
  heading: string;
  caption: string;
  viewBox: string;
  children: ReactNode;
}) {
  const uid = useId().replace(/:/g, "");
  return (
    <FigureFrame heading={heading} caption={caption}>
      <svg
        viewBox={viewBox}
        className="mx-auto h-auto w-full max-w-xl"
        role="img"
        aria-labelledby={`${uid}-title`}
      >
        <title id={`${uid}-title`}>{title}</title>
        <rect width="100%" height="100%" fill={C.bg} rx="10" />
        {children}
      </svg>
    </FigureFrame>
  );
}

function Band({
  x,
  y,
  w,
  h,
  fill,
  stroke = "#1e2e38",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth="1" />;
}

export function EarthShellDiagram() {
  return (
    <Schematic
      title="Jordens skall. Kontinentalskorpe 30 til 50 kilometer, havbunnsskorpe 5 til 8 kilometer, astenosfære omtrent 100 til 350 kilometer dyp og 1300 til 1400 grader. Ikke i målestokk."
      heading="Jordens skall: Fra fast indre kjerne til bevegelige litosfæreplater"
      caption="Skissen er ikke i målestokk: skorpen er tegnet tykkere enn den er, slik at havbunn og kontinent kan sammenlignes. Kontinentalskorpe er vanligvis 30–50 km tykk, opptil 70–80 km under høye fjell. Havbunnsskorpe er 5–8 km. Litosfæren (skorpe og stiv mantel, i snitt ca. 100 km, opptil ca. 200 km under gamle kontinenter, ca. 1250 °C i den stive mantelen) glir på astenosfæren (ca. 100–350 km dyp, ca. 1300–1400 °C). Under den ligger nedre mantel, flytende ytre kjerne (2900–5150 km) og fast indre kjerne (5150–6371 km, ca. 5000 °C)."
      viewBox="0 0 400 700"
    >
      <L x="200" y="28" fill={C.muted} size={15} anchor="middle">
        Ikke i målestokk
      </L>

      {/* Kontinent: tykk skorpe */}
      <Band x={16} y={44} w={180} h={168} fill="#101920" />
      <Band x={28} y={56} w={156} h={112} fill="#5c6b60" stroke="#2f4236" />
      <L x="106" y="82" fill={C.fg} size={15} weight={700} anchor="middle">
        Kontinentalskorpe
      </L>
      <L x="106" y="106" fill={C.sand} size={15} anchor="middle">
        30–50 km
      </L>
      <L x="106" y="130" fill={C.fg} size={14} anchor="middle">
        opptil 70–80 km
      </L>
      <L x="106" y="154" fill={C.muted} size={14} anchor="middle">
        under høye fjell
      </L>
      <line x1="28" y1="168" x2="184" y2="168" stroke={C.low} strokeWidth="2" />
      <L x="106" y="190" fill={C.low} size={14} weight={650} anchor="middle">
        Moho
      </L>

      {/* Hav: tynnere skorpe, fortsatt tykkere enn sann målestokk */}
      <Band x={204} y={44} w={180} h={168} fill="#101920" />
      <Band x={216} y={56} w={156} h={36} fill="#143044" stroke="#1d4e6a" />
      <L x="294" y="80" fill={C.cold} size={16} weight={650} anchor="middle">
        Hav
      </L>
      <Band x={216} y={92} w={156} h={64} fill="#245c45" stroke="#163828" />
      <L x="294" y="118" fill={C.fg} size={15} weight={700} anchor="middle">
        Havbunnsskorpe
      </L>
      <L x="294" y="142" fill={C.teal} size={15} anchor="middle">
        5–8 km
      </L>
      <line x1="216" y1="156" x2="372" y2="156" stroke={C.low} strokeWidth="2" />
      <L x="294" y="178" fill={C.low} size={14} weight={650} anchor="middle">
        Moho
      </L>

      <Band x={16} y={220} w={368} h={52} fill="#1b2a33" />
      <L x="200" y="242" fill={C.warm} size={15} weight={650} anchor="middle">
        Stiv mantel · ca. 1250 °C
      </L>
      <L x="200" y="264" fill={C.sand} size={14} anchor="middle">
        Litosfære · i snitt ca. 100 km
      </L>

      <Band x={16} y={276} w={368} h={116} fill="#16343c" stroke={C.teal} />
      <L x="200" y="312" fill={C.teal} size={18} weight={700} anchor="middle">
        Astenosfære
      </L>
      <L x="200" y="336" fill={C.fg} size={16} anchor="middle">
        ca. 100–350 km dyp
      </L>
      <L x="200" y="360" fill={C.warm} size={16} anchor="middle">
        ca. 1300–1400 °C
      </L>
      <L x="200" y="382" fill={C.muted} size={14} anchor="middle">
        fast peridotitt, seig over tid
      </L>

      <Band x={16} y={404} w={368} h={72} fill="#3a2a22" />
      <L x="200" y="436" fill={C.sand} size={17} weight={700} anchor="middle">
        Nedre mantel
      </L>
      <L x="200" y="458" fill={C.muted} size={15} anchor="middle">
        fast silikatbergart
      </L>

      <Band x={16} y={488} w={368} h={80} fill="#9a3412" />
      <L x="200" y="522" fill="#fff7ed" size={17} weight={700} anchor="middle">
        Ytre kjerne (flytende)
      </L>
      <L x="200" y="546" fill="#ffedd5" size={16} anchor="middle">
        2900–5150 km
      </L>

      <Band x={16} y={580} w={368} h={100} fill="#f59e0b" stroke="#b45309" />
      <L x="200" y="618" fill="#1c1408" size={17} weight={700} anchor="middle">
        Indre kjerne (fast)
      </L>
      <L x="200" y="642" fill="#1c1408" size={16} anchor="middle">
        5150–6371 km
      </L>
      <L x="200" y="664" fill="#1c1408" size={15} anchor="middle">
        ca. 5000 °C
      </L>
    </Schematic>
  );
}

export function RidgeAnatomyDiagram() {
  return (
    <Schematic
      title="Midthavsrygg med putelava, plateformede ganger, gabbro, magmakammer, litosfærisk mantel, dekompresjonssmelting og svart skorstein."
      heading="Midthavsryggens anatomi: Dekompresjonssmelting og hydrotermale skorsteiner"
      caption="Når to litosfæreplater trekkes fra hverandre, stiger astenosfærisk peridotitt uten å tape nevneverdig varme. Trykkfallet gir dekompresjonssmelting og basaltisk magma. På havbunnen størkner lavaen som putelava (pillow basalt). Sjøvann varmes til 350–400 °C og kommer ut i svarte skorsteiner (black smokers). Havdypet ved aksen er ca. 2500 m."
      viewBox="0 0 400 640"
    >
      <L x="200" y="24" fill={C.fg} size={16} weight={700} anchor="middle">
        Midthavsrygg (mid-ocean ridge)
      </L>

      {/* Astenosfæren stiger under aksen, så den litosfæriske mantelen blir tynn der */}
      <path
        d="M16 468 L120 468 L200 368 L280 468 L384 468 L384 624 L16 624 Z"
        fill="#16343c"
        stroke={C.teal}
      />
      <path
        d="M16 356 L152 356 L200 340 L248 356 L384 356 L384 468 L280 468 L200 368 L120 468 L16 468 Z"
        fill="#1b2a33"
      />
      <path d="M16 356 L152 356 L200 340 L248 356 L384 356" fill="none" stroke={C.low} strokeWidth="2.5" />

      <L x="72" y="404" fill={C.cold} size={14} weight={650} anchor="middle">
        Litosfærisk
      </L>
      <L x="72" y="430" fill={C.cold} size={14} weight={650} anchor="middle">
        mantel
      </L>
      <L x="328" y="342" fill={C.low} size={14} weight={700} anchor="middle">
        Moho
      </L>

      <path d="M16 268 H384 V356 H248 L200 340 L152 356 H16 Z" fill="#3f3a34" />
      <L x="78" y="308" fill={C.fg} size={16} weight={700} anchor="middle">
        Gabbro
      </L>
      <ellipse cx="200" cy="308" rx="52" ry="18" fill="#9a3412" />
      <L x="200" y="313" fill="#fff7ed" size={13} weight={700} anchor="middle">
        Magmakammer
      </L>

      <path d="M16 188 H176 L200 214 L224 188 H384 V268 H16 Z" fill="#1e3a4c" />
      {[40, 56, 72].map((x) => (
        <line key={x} x1={x} y1="192" x2={x} y2="264" stroke="#163044" strokeWidth="3" />
      ))}
      <L x="290" y="224" fill={C.fg} size={15} weight={700} anchor="middle">
        Plateformede ganger
      </L>
      <L x="290" y="246" fill={C.cold} size={14} anchor="middle">
        (sheeted dikes)
      </L>

      <path
        d="M16 108 L132 96 L164 128 L200 144 L236 128 L268 96 L384 108 L384 188 L224 188 L200 214 L176 188 L16 188 Z"
        fill="#2f6f52"
        stroke="#1e4634"
      />
      <circle cx="48" cy="156" r="11" fill="#1f4d38" />
      <circle cx="70" cy="150" r="8" fill="#1a4030" />
      <L x="324" y="152" fill={C.fg} size={14} weight={700} anchor="middle">
        Putelava
      </L>
      <L x="324" y="176" fill={C.sand} size={13} anchor="middle">
        (pillow basalt)
      </L>

      <path
        d="M16 40 H384 V108 L268 96 L236 128 L200 144 L164 128 L132 96 L16 108 Z"
        fill="#143044"
      />
      <L x="58" y="62" fill={C.cold} size={16} weight={650} anchor="middle">
        Hav
      </L>
      <L x="58" y="86" fill={C.fg} size={15} anchor="middle">
        ca. 2500 m
      </L>
      <L x="168" y="68" fill={C.fg} size={14} weight={650} anchor="middle">
        Aksedal
      </L>
      <L x="168" y="92" fill={C.muted} size={13} anchor="middle">
        (axial valley)
      </L>

      {/* Skorsteinen står på havbunnen i høyre vegg av aksedalen.
          Bunnen (x 228–236) treffer havbunnen ved y ≈ 130. */}
      <rect x="228" y="104" width="8" height="28" fill="#4b5563" />
      <rect x="220" y="98" width="24" height="8" fill="#374151" />
      <path d="M232 98 C238 84, 246 74, 252 62" fill="none" stroke="#9ca3af" strokeWidth="3" />
      <L x="258" y="56" fill={C.warm} size={14} weight={650}>
        Svart skorstein
      </L>
      <L x="258" y="80" fill={C.sand} size={13}>
        (black smoker)
      </L>
      <L x="258" y="104" fill={C.warm} size={14}>
        350–400 °C
      </L>

      <L x="68" y="508" fill={C.teal} size={16} weight={700} anchor="middle">
        Astenosfære
      </L>
      <line x1="146" y1="536" x2="186" y2="334" stroke={C.warm} strokeWidth="2.5" />
      <path d="M186 334 L178 348 L194 344 Z" fill={C.warm} />
      <line x1="254" y1="536" x2="214" y2="334" stroke={C.warm} strokeWidth="2.5" />
      <path d="M214 334 L206 348 L222 344 Z" fill={C.warm} />
      <L x="200" y="566" fill={C.fg} size={15} weight={650} anchor="middle">
        Dekompresjonssmelting
      </L>
      <L x="200" y="592" fill={C.warm} size={15} anchor="middle">
        Peridotitt stiger
      </L>
    </Schematic>
  );
}

export function SubductionAnatomyDiagram() {
  return (
    <Schematic
      title="Subduksjonssone med dyphavsgrop, akkresjonskile, havbunnsskorpe 5 til 8 kilometer, kontinentalskorpe 30 til 50 kilometer, dehydrering og flukssmelting."
      heading="Anatomi av en subduksjonssone: Dehydrering, flukssmelting og akkresjonskile"
      caption="En havbunnsplate bøyer ned i mantelen ved dyphavsgropen (trench). Havbunnsskorpen er 5–8 km tykk, kontinentalskorpen 30–50 km. Sedimenter skrapes av som en akkresjonskile på kontinentets side. Vann fra den synkende platen stiger inn i mantelkilen (dehydrering) og setter i gang flukssmelting. Smelten stiger gjennom skorpen og mater vulkanbuen (volcanic arc)."
      viewBox="0 0 400 640"
    >
      {/* Astenosfæren ligger under begge platene */}
      <rect x="0" y="216" width="400" height="424" fill="#16343c" />

      {/* Én sammenhengende havbunnsplate: litosfæren bøyer ved gropen og dukker under kontinentet.
          Skorpen er det samme polygonets toppflate, ikke en egen boks. */}
      <path d="M8 96 H150 L178 184 L330 468 L263 504 L111 220 H8 Z" fill="#1b2a33" />
      <path d="M8 96 H150 L178 184 L330 468 L308 480 L156 196 L140 158 H8 Z" fill="#245c45" />

      {/* Mantelkilen fyller fra den synkende platen opp til undersiden av den kontinentale litosfæren */}
      <path
        d="M176 176 L392 176 L392 300 L360 390 L318 440 L274 358 L246 300 L218 248 L190 198 L176 176 Z"
        fill="#1a4550"
      />
      {/* Kontinentalskorpen ligger på kontinental litosfære */}
      <path d="M292 176 H392 V216 H292 Z" fill="#243038" />

      <path d="M292 40 H392 V176 H292 Z" fill="#5c6b60" stroke="#2f4236" />
      <path d="M278 40 L296 14 L314 40 Z" fill="#7f1d1d" />

      {/* Havet dekker havbunnsplaten og stopper ved gropen og kilen, ikke over kontinentet */}
      <path d="M8 52 H292 L292 90 L206 98 L176 176 L150 96 H8 Z" fill="#143044" />
      {/* Liten sedimentkile i gropen, ikke dypere enn kontinentalskorpens underside */}
      <path d="M176 176 L206 98 L292 86 L292 176 Z" fill={C.sand} />

      <L x="72" y="22" fill={C.cold} size={14} weight={700} anchor="middle">
        Dyphavsgrop
      </L>
      <L x="72" y="46" fill={C.muted} size={13} anchor="middle">
        (trench)
      </L>
      <L x="64" y="78" fill={C.cold} size={16} weight={650} anchor="middle">
        Hav
      </L>
      <L x="70" y="120" fill={C.fg} size={13} weight={700} anchor="middle">
        Havbunnsskorpe
      </L>
      <L x="70" y="146" fill={C.teal} size={13} anchor="middle">
        5–8 km
      </L>
      <L x="62" y="178" fill={C.cold} size={14} weight={650} anchor="middle">
        Havbunns-
      </L>
      <L x="62" y="204" fill={C.cold} size={14} weight={650} anchor="middle">
        litosfære
      </L>

      <L x="248" y="132" fill="#1c1408" size={13} weight={700} anchor="middle">
        Akkresjonskile
      </L>

      <L x="392" y="22" fill={C.low} size={14} weight={700} anchor="end">
        Vulkanbue
      </L>
      <L x="392" y="46" fill={C.sand} size={13} anchor="end">
        (volcanic arc)
      </L>
      <L x="354" y="78" fill={C.fg} size={14} weight={700} anchor="middle">
        Kontinental
      </L>
      <L x="354" y="104" fill={C.fg} size={14} weight={700} anchor="middle">
        skorpe
      </L>
      <L x="354" y="130" fill={C.sand} size={14} anchor="middle">
        30–50 km
      </L>
      <L x="360" y="202" fill={C.cold} size={13} weight={650} anchor="middle">
        Litosfære
      </L>

      <L x="348" y="246" fill={C.teal} size={14} weight={700} anchor="middle">
        Mantelkile
      </L>

      <L x="200" y="300" fill={C.fg} size={14} weight={650} anchor="middle">
        Synkende
      </L>
      <L x="200" y="326" fill={C.fg} size={14} weight={650} anchor="middle">
        plate
      </L>

      {/* Dehydrering: korte piler fra platen i dypet, opp i mantelkilen */}
      <line x1="242" y1="408" x2="270" y2="336" stroke={C.warm} strokeWidth="2.5" />
      <path d="M270 336 L262 348 L278 346 Z" fill={C.warm} />
      <line x1="278" y1="452" x2="298" y2="376" stroke={C.warm} strokeWidth="2.5" />
      <path d="M298 376 L290 388 L306 386 Z" fill={C.warm} />
      <L x="318" y="362" fill={C.warm} size={13} weight={650} anchor="middle">
        Dehydrering
      </L>

      {/* Flukssmelting i mantelkilen, deretter opp gjennom skorpen til vulkanbuen */}
      <ellipse cx="296" cy="332" rx="15" ry="10" fill="#c2410c" />
      <line x1="296" y1="326" x2="296" y2="40" stroke={C.low} strokeWidth="2.5" />
      <path d="M296 40 L288 54 L304 54 Z" fill={C.low} />
      <L x="348" y="286" fill={C.low} size={12} weight={650} anchor="middle">
        Flukssmelting
      </L>

      <L x="78" y="560" fill={C.teal} size={16} weight={700} anchor="middle">
        Astenosfære
      </L>
    </Schematic>
  );
}

function StageRow({
  y,
  n,
  title,
  line,
  example,
  children,
}: {
  y: number;
  n: string;
  title: string;
  line: string;
  example: string;
  children: ReactNode;
}) {
  return (
    <g>
      <rect x="12" y={y} width="376" height="112" rx="8" fill="#101920" stroke="#1e2e38" />
      <rect x="24" y={y + 18} width="128" height="76" rx="6" fill="#0c1820" />
      {children}
      <L x="164" y={y + 40} fill={C.fg} size={16} weight={700}>
        {n}. {title}
      </L>
      <L x="164" y={y + 64} fill={C.cold} size={15}>
        {line}
      </L>
      <L x="164" y={y + 86} fill={C.muted} size={14}>
        {example}
      </L>
    </g>
  );
}

export function WilsonStagesDiagram() {
  return (
    <Schematic
      title="Wilsonsyklusens seks stadier: rifting, ungt hav, modent hav, subduksjon, lukking og kollisjon."
      heading="Wilsonsyklusens 6 stadier: Superkontinentenes kretsløp i 3D"
      caption="J. Tuzo Wilsons modell beskriver hvordan havbassenger fødes, utvides, lukkes og forsvinner i en syklus på 400–600 millioner år (Wilson, 1966). 1: Rifting, kontinental riftdal (f.eks. Øst-Afrika). 2: Ungt hav med midthavsrygg (mid-ocean ridge), f.eks. Rødehavet. 3: Modent hav med passive marginer, f.eks. Atlanterhavet. 4: Subduksjon (subduction), f.eks. Stillehavet. 5: Lukking, f.eks. Middelhavet. 6: Kollisjon og sutur, f.eks. Himalaya."
      viewBox="0 0 400 780"
    >
      <StageRow y={12} n="1" title="Rifting" line="Kontinentet sprekker" example="f.eks. Øst-Afrika">
        <rect x="36" y="46" width="38" height="28" fill="#5c6b60" />
        <rect x="102" y="46" width="38" height="28" fill="#5c6b60" />
        <path d="M74 46 L90 66 L106 46" fill="#3f2a24" />
      </StageRow>
      <StageRow y={136} n="2" title="Ungt hav" line="Midthavsrygg starter" example="f.eks. Rødehavet">
        <rect x="36" y="176" width="104" height="22" fill="#143044" />
        <path d="M76 176 L88 160 L100 176" fill="#245c45" />
      </StageRow>
      <StageRow y={260} n="3" title="Modent hav" line="Passive marginer" example="f.eks. Atlanterhavet">
        <rect x="34" y="300" width="26" height="24" fill="#5c6b60" />
        <rect x="60" y="308" width="56" height="16" fill="#143044" />
        <path d="M82 308 L88 296 L94 308" fill="#245c45" />
        <rect x="116" y="300" width="26" height="24" fill="#5c6b60" />
      </StageRow>
      <StageRow y={384} n="4" title="Subduksjon" line="Havbunnen synker" example="f.eks. Stillehavet">
        <path d="M40 438 H96 L118 462 H68 Z" fill="#1b2a33" />
        <path d="M108 430 L122 412 L136 430 Z" fill="#7f1d1d" />
      </StageRow>
      <StageRow y={508} n="5" title="Lukking" line="Havet blir smalt" example="f.eks. Middelhavet">
        <rect x="34" y="548" width="34" height="24" fill="#5c6b60" />
        <rect x="68" y="556" width="36" height="16" fill="#143044" />
        <rect x="104" y="548" width="34" height="24" fill="#5c6b60" />
      </StageRow>
      <StageRow y={632} n="6" title="Kollisjon" line="Fjellkjede og sutur" example="f.eks. Himalaya">
        <path d="M40 692 L68 658 L96 680 L124 654 L148 692 Z" fill="#6b7c70" />
      </StageRow>
    </Schematic>
  );
}

export function LekaOphioliteDiagram() {
  return (
    <Schematic
      title="Ofiolittsøyle fra Leka: sediment og chert, putelava, plateformede ganger, gabbro, Moho og mantelperidotitt."
      heading="Norges geologiske nasjonalmonument: Leka ofiolittkompleks"
      caption="På Leka i Trøndelag er et stykke havbunn skjøvet opp på land (ofiolitt). Søylen viser lagene slik de ligger i havbunnsskorpen, ikke i målestokk. Øverst: dyphavssediment og chert, putelava (pillow lava), plateformede ganger (sheeted dikes) og lagdelt gabbro. Moho er grensen ned til mantelen (peridotitt, harzburgitt og dunitt). På Leka er søylen vippet, så lagene kan gås til fots."
      viewBox="0 0 400 640"
    >
      <L x="200" y="28" fill={C.muted} size={15} anchor="middle">
        Ikke i målestokk · Leka, Norge
      </L>

      <Band x={60} y={44} w={280} h={76} fill="#8a7048" stroke="#5c4a30" />
      <L x="200" y="76" fill="#1c1408" size={16} weight={700} anchor="middle">
        Sediment og chert
      </L>
      <L x="200" y="100" fill="#1c1408" size={15} anchor="middle">
        dyphavssediment
      </L>

      <Band x={60} y={120} w={280} h={84} fill="#2f6f52" stroke="#1e4634" />
      <circle cx="100" cy="162" r="16" fill="#1f4d38" />
      <circle cx="128" cy="170" r="12" fill="#1a4030" />
      <L x="230" y="156" fill={C.fg} size={16} weight={700} anchor="middle">
        Putelava
      </L>
      <L x="230" y="178" fill={C.sand} size={15} anchor="middle">
        (pillow lava)
      </L>

      <Band x={60} y={204} w={280} h={84} fill="#1e3a4c" />
      {[88, 104, 120].map((x) => (
        <line key={x} x1={x} y1="208" x2={x} y2="284" stroke="#163044" strokeWidth="4" />
      ))}
      <L x="230" y="240" fill={C.fg} size={16} weight={700} anchor="middle">
        Plateformede ganger
      </L>
      <L x="230" y="264" fill={C.cold} size={15} anchor="middle">
        (sheeted dikes)
      </L>

      <Band x={60} y={288} w={280} h={84} fill="#4a453e" />
      {[308, 322, 336, 350].map((y) => (
        <line key={y} x1="72" y1={y} x2="150" y2={y} stroke="#2c2824" strokeWidth="3" />
      ))}
      <L x="230" y="324" fill={C.fg} size={16} weight={700} anchor="middle">
        Lagdelt gabbro
      </L>
      <L x="230" y="348" fill={C.muted} size={15} anchor="middle">
        magmakammer
      </L>

      <line x1="60" y1="372" x2="340" y2="372" stroke={C.low} strokeWidth="3" />
      <L x="200" y="394" fill={C.low} size={16} weight={700} anchor="middle">
        Moho
      </L>

      <Band x={60} y={408} w={280} h={208} fill="#6b4a2a" stroke="#4a321c" />
      <L x="200" y="468" fill="#1c1408" size={18} weight={700} anchor="middle">
        Mantel
      </L>
      <L x="200" y="496" fill="#1c1408" size={16} anchor="middle">
        peridotitt
      </L>
      <L x="200" y="524" fill="#1c1408" size={16} anchor="middle">
        harzburgitt og dunitt
      </L>
      <L x="200" y="560" fill="#3f2a18" size={15} anchor="middle">
        ultramafisk, fast bergart
      </L>
    </Schematic>
  );
}

const SCHEMATICS: Record<string, () => ReactNode> = {
  "/images/geo-jordens-indre-lagdeling-3d.jpg": () => <EarthShellDiagram />,
  "/images/geo-midthavsrygg-hydrotermal.jpg": () => <RidgeAnatomyDiagram />,
  "/images/geo-subduksjon-3d.jpg": () => <SubductionAnatomyDiagram />,
  "/images/geo-wilsonsyklus-3d.jpg": () => <WilsonStagesDiagram />,
  "/images/geo-ofiolitt-leka.jpg": () => <LekaOphioliteDiagram />,
};

/** SVG i stedet for rasteret når poster-markdown peker på det gamle bildet. */
export function plateSchematicFor(src: string | undefined): ReactNode | null {
  if (!src) return null;
  const render = SCHEMATICS[src];
  return render ? render() : null;
}
