import { useState, type JSX, type ReactNode } from "react";
import {
  Flate,
  GeoFigur,
  LagSammenligning,
  Merkelapp,
  StegFigur,
  Tegnforklaring,
  ValgKnapper,
} from "@/components/geografi/figur-kit";

/**
 * Figurer til Geografi kapittel 1 (verktøy). Lastes lazy fra poster-widget-renderer.
 * Kartbakgrunnene er egne SVG-filer i /public/images/geografi/, generert fra
 * Natural Earth (public domain). Fotografiene er public domain via Wikimedia Commons.
 */

const NE = "Natural Earth (public domain)";
const FG = "#e8eef2";
const MUTED = "#8b9aa6";
const PRIM = "#6fb3b8";

function Bilde({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className ?? "h-auto w-full rounded-lg"}
    />
  );
}

/* 1.0 Mønsterkart uten landegrenser */
function Monsterkart() {
  return (
    <GeoFigur
      heading="Mønsterkart: verden uten landegrenser"
      caption="Kartet har ingen landegrenser og ingen navn. Prikkene er store byer, og jo større prikk, desto flere innbyggere. Hvor ligger byene tett, og hvor er det nesten ingen? Hvilke forklaringer kan du foreslå, og hvilke opplysninger ville du trengt for å prøve dem?"
      kilde={`Kartdata: ${NE}, landflater og befolkede steder (1:110 mill.), innbyggertall slik datasettet oppgir dem. Projeksjon: plate carrée. Utforming: geofag.com.`}
    >
      <Bilde
        src="/images/geografi/monsterkart-byer.svg"
        width={1000}
        height={394}
        alt="Verdenskart uten landegrenser med rundt 240 store byer som prikker. Prikkene samler seg i Sør- og Øst-Asia, Europa, Vest-Afrika og langs kystene i Amerika. Store områder i Nord-Afrika, Sentral-Asia, Nord-Canada, Sibir, Amazonas og Australias indre har få eller ingen prikker."
      />
      <Tegnforklaring
        poster={[
          { symbol: <Flate farge="#8aa37f" />, tekst: "Land" },
          { symbol: <Flate farge="#cfe2ec" />, tekst: "Hav og store innsjøer" },
          {
            symbol: <span className="block size-3.5 rounded-full" style={{ background: "#9a3412" }} />,
            tekst: "By (størrelse etter innbyggertall)",
          },
        ]}
      />
    </GeoFigur>
  );
}

const TISSOT_TEGN = [
  { symbol: <span className="block size-3.5 rounded-full bg-[#b91c1c]/80 ring-1 ring-[#7f1d1d]" />, tekst: "Like store sirkler på jordkloden" },
  { symbol: <Flate farge="#c2410c" />, tekst: "Grønland" },
  { symbol: <Flate farge="#0f766e" />, tekst: "Afrika" },
] as const;

const MERCATOR_ALT =
  "Verdenskart i Mercators projeksjon. Røde sirkler som er like store på jordkloden, blir stadig større mot nord og sør. Grønland (oransje) ser nesten like stort ut som Afrika (grønnblått).";
const GALL_ALT =
  "Verdenskart i Gall–Peters' projeksjon. De røde sirklene har samme areal overalt, men blir flate ovaler mot polene. Grønland (oransje) er mye mindre enn Afrika (grønnblått), og kontinentene ser strukket ut på høykant nær ekvator.";

/* 1.1 Mercator */
function Mercator() {
  return (
    <GeoFigur
      heading="Mercators projeksjon med like store sirkler"
      caption="Alle de røde sirklene er like store på jordkloden. I Mercators projeksjon blir de større jo lenger fra ekvator de ligger. Sammenlikn Grønland og Afrika: Hvorfor kan vi ikke bruke størrelsen på dette kartet til å sammenlikne arealer?"
      kilde={`Kartdata: ${NE}. Sirklene har radius 6° og er beregnet av geofag.com. Kartet er kuttet ved 80° nord og sør.`}
    >
      <Bilde src="/images/geografi/mercator-tissot.svg" width={1000} height={775} alt={MERCATOR_ALT} />
      <Tegnforklaring poster={TISSOT_TEGN} />
    </GeoFigur>
  );
}

/* 1.2 Mercator mot Gall–Peters */
function GallPeters() {
  return (
    <GeoFigur
      heading="Samme sirkler i to projeksjoner"
      caption="Bytt mellom kartene. I Gall–Peters' projeksjon har sirklene samme areal overalt, men formen endres: mot polene blir de flate. Et flateriktig kart egner seg til å sammenlikne arealer, mens Mercator bevarer vinkler og former i små områder."
      kilde={`Kartdata: ${NE}. Egen utforming av geofag.com med egne beregnede sirkler (radius 6°). Ikke kopiert fra andre kart.`}
    >
      <LagSammenligning
        label="Velg projeksjon"
        lag={[
          {
            id: "mercator",
            navn: "Mercator (vinkelriktig)",
            innhold: <Bilde src="/images/geografi/mercator-tissot.svg" width={1000} height={775} alt={MERCATOR_ALT} />,
            beskrivelse: "Mercator: sirklene beholder formen, men arealet vokser sterkt mot polene.",
          },
          {
            id: "gall",
            navn: "Gall–Peters (flateriktig)",
            innhold: <Bilde src="/images/geografi/gall-peters-tissot.svg" width={1000} height={637} alt={GALL_ALT} />,
            beskrivelse: "Gall–Peters: sirklene har samme areal, men formen blir forvrengt mot polene.",
          },
        ]}
      />
      <Tegnforklaring poster={TISSOT_TEGN} />
    </GeoFigur>
  );
}

/* 1.3 Gradnett og koordinater (Norden, egen projeksjon: plate carrée med standardparallell 62°) */
const NK = 0.46947156278589086;
const NS = 39.93852127855335;
const nx = (lon: number) => (lon + 12) * NK * NS;
const ny = (lat: number) => (72 - lat) * NS;

function Gradnett({ aktiv }: { aktiv: number }) {
  const lats = [55, 60, 65, 70];
  const lons = [-10, -5, 0, 5, 10, 15, 20, 25, 30, 35];
  const fs = 34;
  return (
    <svg viewBox="0 0 900 799" className="h-auto w-full rounded-lg" role="img" aria-label={
      ["Kart over Norden med gradnett for hver femte grad.",
        "Breddesirkelen 60 grader nord er uthevet. Den går gjennom Sør-Norge, Sverige og Finland.",
        "Meridianen 10 grader øst er uthevet. Den går fra nord til sør gjennom Sør-Norge.",
        "Punktet der 60 grader nord og 10 grader øst møtes, er markert i Sør-Norge."][aktiv]
    }>
      <image href="/images/geografi/norden-land.svg" width="900" height="799" />
      <g stroke="#ffffff" strokeOpacity={0.55} strokeWidth={1.5}>
        {lats.map((la) => <line key={la} x1={0} x2={900} y1={ny(la)} y2={ny(la)} />)}
        {lons.map((lo) => <line key={lo} y1={0} y2={799} x1={nx(lo)} x2={nx(lo)} />)}
      </g>
      {aktiv >= 1 ? <line x1={0} x2={900} y1={ny(60)} y2={ny(60)} stroke="#b45309" strokeWidth={7} /> : null}
      {aktiv >= 2 ? <line y1={0} y2={799} x1={nx(10)} x2={nx(10)} stroke="#1d4ed8" strokeWidth={7} /> : null}
      {aktiv >= 3 ? (
        <g>
          <circle cx={nx(10)} cy={ny(60)} r={18} fill="#ffffff" stroke="#111827" strokeWidth={6} />
          <rect x={nx(10) + 26} y={ny(60) - 70} width={330} height={52} rx={10} fill="#111827" fillOpacity={0.88} />
          <text x={nx(10) + 40} y={ny(60) - 34} fontSize={fs} fill="#ffffff" fontWeight={600}>60,0° N, 10,0° Ø</text>
        </g>
      ) : null}
      <g fontSize={fs} fontWeight={600}>
        {lats.map((la) => (
          <g key={la}>
            <rect x={4} y={ny(la) - 40} width={104} height={40} rx={6} fill="#111827" fillOpacity={0.78} />
            <text x={12} y={ny(la) - 12} fill={la === 60 && aktiv >= 1 ? "#fdba74" : "#ffffff"}>{la}° N</text>
          </g>
        ))}
        {[0, 10, 20, 30].map((lo) => (
          <g key={lo}>
            <rect x={nx(lo) + 4} y={6} width={lo === 0 ? 52 : 94} height={40} rx={6} fill="#111827" fillOpacity={0.78} />
            <text x={nx(lo) + 10} y={34} fill={lo === 10 && aktiv >= 2 ? "#93c5fd" : "#ffffff"}>{lo === 0 ? "0°" : `${lo}° Ø`}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function Koordinater() {
  return (
    <GeoFigur
      heading="Finn øvingspunktet 60,0° nord og 10,0° øst"
      caption="Gå gjennom trinnene. Breddesirklene går øst–vest og angir grader nord for ekvator. Meridianene går nord–sør og angir grader øst for nullmeridianen. Punktet er valgt til øving og viser ikke en bestemt bygning."
      kilde={`Kartdata: ${NE}, landflater (1:50 mill.). Gradnett for hver femte grad. Utforming: geofag.com.`}
    >
      <StegFigur
        label="Trinn for å finne punktet"
        felles={(a) => <Gradnett aktiv={a} />}
        steg={[
          { tittel: "Gradnettet", tekst: "Linjene som går på tvers, er breddesirkler. Linjene som går på langs, er meridianer. Her er det fem grader mellom linjene." },
          { tittel: "60° nord", tekst: "Finn breddesirkelen merket 60° N. Alle punkter på denne linja ligger 60 grader nord for ekvator." },
          { tittel: "10° øst", tekst: "Finn meridianen merket 10° Ø. Alle punkter på denne linja ligger 10 grader øst for Greenwich." },
          { tittel: "Punktet", tekst: "Punktet ligger der de to linjene krysser hverandre, i Sør-Norge. Skriv alltid hvilket koordinatsystem du bruker." },
        ]}
      />
    </GeoFigur>
  );
}

/* 1.4 Høydekurver – oppdiktet øvingsås, ekvidistanse 20 m */
const KURVER = [100, 120, 140, 160].map((h, k) => ({ h, cx: 206 + k * 28, rx: 150 - k * 40, ry: 92 - k * 20 }));

function Hoydekart({ aktiv }: { aktiv: number }) {
  const cy = 120;
  return (
    <svg viewBox="0 0 400 380" className="h-auto w-full rounded-lg bg-[#f4efe1]" role="img" aria-label={
      ["Oppdiktet øvingskart med fire høydekurver rundt en ås. På vestsiden ligger kurvene langt fra hverandre, på østsiden ligger de tett.",
        "Kurvene er merket 100, 120, 140 og 160 meter. Ekvidistansen er 20 meter. Fra 100 til 160 meter er det tre mellomrom, altså 60 meter.",
        "Høydeprofil langs linja A–B: slak stigning fra vest og bratt fall mot øst, der kurvene ligger tettest."][aktiv]
    }>
      <rect width="400" height="240" fill="#f4efe1" />
      {KURVER.map((c, i) => (
        <ellipse key={c.h} cx={c.cx} cy={cy} rx={c.rx} ry={c.ry} fill={i === 3 ? "#e9dcc0" : "none"} stroke="#9a5b1e" strokeWidth={i === 0 ? 2.4 : 1.6} />
      ))}
      {KURVER.map((c) => (
        <g key={`l${c.h}`}>
          <rect x={c.cx - c.rx + 2} y={cy - 32 - (c.h - 100) / 5} width={34} height={18} rx={3} fill="#f4efe1" />
          <text x={c.cx - c.rx + 5} y={cy - 18 - (c.h - 100) / 5} fontSize={15} fill="#6b3a10" fontWeight={600}>{c.h}</text>
        </g>
      ))}
      <path d="M297 116 l5 -9 l5 9 z" fill="#6b3a10" />
      <text x={288} y={140} fontSize={15} fill="#6b3a10">topp</text>
      <line x1={14} y1={cy} x2={386} y2={cy} stroke="#1e3a8a" strokeWidth={2} strokeDasharray={aktiv === 2 ? "0" : "6 4"} />
      <text x={6} y={cy - 6} fontSize={15} fill="#1e3a8a" fontWeight={700}>A</text>
      <text x={384} y={cy - 6} fontSize={15} fill="#1e3a8a" fontWeight={700} textAnchor="end">B</text>
      {aktiv === 1 ? (
        <g>
          <rect x={14} y={200} width={250} height={30} rx={6} fill="#111827" />
          <text x={24} y={220} fontSize={15} fill="#ffffff">Ekvidistanse 20 m · 3 mellomrom = 60 m</text>
          <text x={308} y={64} fontSize={15} fill="#7f1d1d" fontWeight={600}>tett = bratt</text>
          <text x={60} y={64} fontSize={15} fill="#14532d" fontWeight={600}>glissent = slakt</text>
        </g>
      ) : null}
      {/* Profil */}
      <g transform="translate(0 250)">
        <rect width="400" height="130" fill="#141c22" />
        {[100, 120, 140, 160].map((h) => {
          const y = 112 - (h - 90) * 1.25;
          return (
            <g key={h}>
              <line x1={52} x2={392} y1={y} y2={y} stroke={MUTED} strokeOpacity={0.4} />
              <text x={6} y={y + 5} fontSize={15} fill={FG}>{h} m</text>
            </g>
          );
        })}
        {aktiv === 2 ? (
          <path
            d={`M56 ${112 - 10 * 1.25} L124 ${112 - 30 * 1.25} L192 ${112 - 50 * 1.25} L260 ${112 - 70 * 1.25}
               Q296 ${112 - 82 * 1.25} 320 ${112 - 70 * 1.25} L332 ${112 - 50 * 1.25} L344 ${112 - 30 * 1.25} L356 ${112 - 10 * 1.25} L390 ${112 - 6 * 1.25}`}
            fill="none" stroke={PRIM} strokeWidth={3}
          />
        ) : (
          <text x={200} y={70} fontSize={15} fill={MUTED} textAnchor="middle">Høydeprofil A–B vises i trinn 3</text>
        )}
        <text x={392} y={126} fontSize={15} fill={MUTED} textAnchor="end">A → B</text>
      </g>
    </svg>
  );
}

function Hoydekurver() {
  return (
    <GeoFigur
      heading="Fra høydekurver til terreng"
      caption="Øvingskartet viser en oppdiktet ås med ekvidistanse 20 meter. Tell mellomrommene, ikke kurvene: fra 100 til 160 meter er det tre mellomrom og 60 meter. Høydeprofilen viser at terrenget er brattest der kurvene ligger tettest."
      kilde="Egen skisse av geofag.com. Ikke et utsnitt av et virkelig kart, og uten målestokk."
      action={<Merkelapp>Oppdiktet øvingskart</Merkelapp>}
    >
      <StegFigur
        label="Trinn for å lese høydekurvene"
        felles={(a) => <Hoydekart aktiv={a} />}
        steg={[
          { tittel: "Kurvene", tekst: "Hver kurve binder sammen punkter som ligger like høyt. Åsen har toppen der den innerste kurven er." },
          { tittel: "Ekvidistansen", tekst: "Kurvene står for 100, 120, 140 og 160 meter. Høydeforskjellen mellom nabokurver er 20 meter." },
          { tittel: "Profilen", tekst: "Profilen langs A–B stiger slakt fra vest og faller bratt mot øst, der kurvene ligger tett." },
        ]}
      />
    </GeoFigur>
  );
}

/* Felles oppdiktet område for 1.5 og 1.10 */
function Grunnlag({ dempet = false, children }: { dempet?: boolean; children?: ReactNode }) {
  const o = dempet ? 0.45 : 1;
  return (
    <>
      <rect width="400" height="260" fill="#eef2e6" />
      <path d="M262 30 C300 16 352 30 360 64 C368 98 330 116 296 104 C268 94 244 52 262 30 Z" fill="#9cc7de" opacity={o} />
      <path d="M0 196 C80 186 150 150 214 150 C276 150 330 176 400 168" fill="none" stroke="#6b7280" strokeWidth={7} opacity={o} />
      <path d="M150 0 C156 60 168 110 214 150" fill="none" stroke="#6b7280" strokeWidth={5} opacity={o} />
      <rect x={168} y={170} width={56} height={34} fill="#9ca3af" stroke="#374151" opacity={o} />
      <rect x={244} y={190} width={70} height={46} fill="#c7e1b6" stroke="#4d7c0f" opacity={o} />
      {children}
    </>
  );
}

function Temakart() {
  const topo = (
    <svg viewBox="0 0 400 260" className="h-auto w-full rounded-lg" role="img" aria-label="Topografisk kart over et oppdiktet område med høydekurver, et vann, to veier, skolebygningen, en ballbane og skog.">
      <Grunnlag>
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={80} cy={70} rx={70 - i * 20} ry={46 - i * 13} fill="none" stroke="#9a5b1e" strokeWidth={1.5} />
        ))}
        {[[40, 120], [60, 140], [30, 150], [100, 120], [330, 140], [360, 130], [350, 220], [372, 236]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r={6} fill="#4d7c0f" />
        ))}
        <text x={172} y={222} fontSize={15} fill="#111827">skole</text>
        <text x={248} y={252} fontSize={15} fill="#111827">ballbane</text>
        <text x={286} y={70} fontSize={15} fill="#1e3a8a">vann</text>
      </Grunnlag>
    </svg>
  );
  const tema = (
    <svg viewBox="0 0 400 260" className="h-auto w-full rounded-lg" role="img" aria-label="Temakart over samme område. Bare arealbruk er vist med farger: bebyggelse rundt skolen, skog i vest og øst, jordbruk i nord og vann.">
      <rect width="400" height="260" fill="#eef2e6" />
      <path d="M0 100 L150 90 L170 160 L120 200 L0 210 Z" fill="#4d7c0f" />
      <path d="M150 0 L262 0 L250 90 L150 90 Z" fill="#d9b44a" />
      <path d="M140 160 L330 150 L340 260 L120 260 Z" fill="#b45309" />
      <path d="M330 110 L400 100 L400 260 L340 260 Z" fill="#4d7c0f" />
      <path d="M262 30 C300 16 352 30 360 64 C368 98 330 116 296 104 C268 94 244 52 262 30 Z" fill="#2563eb" />
      <path d="M0 196 C80 186 150 150 214 150 C276 150 330 176 400 168" fill="none" stroke="#ffffff" strokeWidth={2} opacity={0.6} />
    </svg>
  );
  return (
    <GeoFigur
      heading="Samme sted: topografisk kart og temakart"
      caption="Bytt mellom kartene. Det topografiske kartet viser mange slags trekk samtidig. Temakartet viser bare ett tema, arealbruk, og utelater resten. Hvilket kart ville du valgt for å planlegge en tur, og hvilket for å undersøke arealbruken?"
      kilde="Egen skisse av geofag.com over et oppdiktet område."
      action={<Merkelapp>Oppdiktet område</Merkelapp>}
    >
      <LagSammenligning
        label="Velg karttype"
        lag={[
          {
            id: "topo",
            navn: "Topografisk kart",
            innhold: topo,
            beskrivelse: "Topografisk kart: høydekurver, vann, veier, bygning, ballbane og skog i samme bilde.",
          },
          {
            id: "tema",
            navn: "Temakart: arealbruk",
            innhold: (
              <>
                {tema}
                <Tegnforklaring
                  poster={[
                    { symbol: <Flate farge="#b45309" />, tekst: "Bebyggelse" },
                    { symbol: <Flate farge="#4d7c0f" />, tekst: "Skog" },
                    { symbol: <Flate farge="#d9b44a" />, tekst: "Jordbruk" },
                    { symbol: <Flate farge="#2563eb" />, tekst: "Vann" },
                  ]}
                />
              </>
            ),
            beskrivelse: "Temakart: bare arealbruk er tatt med. Høydekurver og navn er utelatt.",
          },
        ]}
      />
    </GeoFigur>
  );
}

/* 1.6 Mentalt kart – to håndtegnede skisser */
function Skisse({ variant }: { variant: "a" | "b" }) {
  const hand = { fill: "none", stroke: "#e8eef2", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const tekst = { fontSize: 15, fill: "#fde68a", fontStyle: "italic" as const };
  return variant === "a" ? (
    <svg viewBox="0 0 300 220" className="h-auto w-full rounded-lg bg-[#1b262e]" role="img" aria-label="Skisse A: en nesten rett vei fra hjem til skole, med kiosken og fotballbanen tegnet stort og busstoppet lite.">
      <path {...hand} d="M30 190 C80 180 140 150 200 120 C230 104 250 70 262 40" />
      <rect {...hand} x={240} y={14} width={46} height={30} />
      <text {...tekst} x={226} y={64}>skolen</text>
      <path {...hand} d="M20 196 l14 -14 l14 14 v14 h-28 z" />
      <text {...tekst} x={16} y={180}>hjem</text>
      <rect {...hand} x={110} y={110} width={64} height={40} />
      <text {...tekst} x={116} y={136}>kiosken!</text>
      <ellipse {...hand} cx={70} cy={70} rx={52} ry={30} />
      <text {...tekst} x={36} y={76}>fotballbanen</text>
      <circle {...hand} cx={206} cy={148} r={5} />
      <text {...tekst} x={214} y={170} fontSize={15}>buss</text>
    </svg>
  ) : (
    <svg viewBox="0 0 300 220" className="h-auto w-full rounded-lg bg-[#1b262e]" role="img" aria-label="Skisse B: en svingete vei med en snarvei gjennom skogen, en farlig kryssing markert og skolen tegnet stort. Kiosken er ikke med.">
      <path {...hand} d="M30 190 C40 140 90 150 110 110 C130 70 190 90 230 60" />
      <path {...hand} strokeDasharray="4 7" d="M40 180 C120 190 190 150 236 74" />
      <text {...tekst} x={120} y={190}>snarvei</text>
      <rect {...hand} x={214} y={10} width={74} height={50} />
      <text {...tekst} x={226} y={40}>SKOLEN</text>
      <path {...hand} d="M20 196 l14 -14 l14 14 v14 h-28 z" />
      <text {...tekst} x={52} y={208}>hjem</text>
      <path {...hand} d="M100 104 l20 20 M120 104 l-20 20" stroke="#fca5a5" />
      <text {...tekst} x={128} y={120} fill="#fca5a5">farlig kryss</text>
      {[60, 80, 150, 170].map((x, i) => (
        <path key={x} {...hand} d={`M${x} ${150 + (i % 2) * 8} l8 -16 l8 16 z`} />
      ))}
    </svg>
  );
}

function MentaltKart() {
  return (
    <GeoFigur
      heading="To mentale kart over den samme skoleveien"
      caption="To elever har tegnet den samme veien fra hukommelsen. Skissene har ingen målestokk og viser hva hver av dem legger merke til: kiosken og fotballbanen hos den ene, snarveien og et farlig kryss hos den andre. Forskjellene sier noe om erfaringer, ikke om hvem som tegner riktigst."
      kilde="Egne skisser av geofag.com. Oppdiktet eksempel."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-sm font-medium text-foreground">Elev A</p>
          <Skisse variant="a" />
        </div>
        <div>
          <p className="mb-1.5 text-sm font-medium text-foreground">Elev B</p>
          <Skisse variant="b" />
        </div>
      </div>
    </GeoFigur>
  );
}

/* 1.7 Blue Marble */
function BlueMarble() {
  return (
    <GeoFigur
      heading="Jorda sett fra satellitt: en sammensatt mosaikk"
      caption="Bildet ser ut som ett fotografi, men er satt sammen av mange satellittopptak tatt over flere måneder, slik at skyene er fjernet. Det er altså bearbeidede data. Hva kan bildet fortelle om vegetasjon og ørken, og hva kan det ikke fortelle?"
      kilde={
        <>
          «Blue Marble» (2002), NASA Goddard Space Flight Center, MODIS-data fra Terra-satellitten, via{" "}
          <a className="underline" href="https://commons.wikimedia.org/wiki/File:Blue_Marble_2002.jpg">Wikimedia Commons</a>. Public domain (NASA).
        </>
      }
    >
      <Bilde
        src="/images/geografi/blue-marble-2002.webp"
        width={1600}
        height={800}
        alt="Satellittmosaikk av hele jordoverflaten uten skyer, flatt utbrettet. Ørkenene i Nord-Afrika, Midtøsten og Australia er lysbrune, regnskogene i Amazonas, Kongo og Sørøst-Asia er mørkegrønne, og polområdene er hvite."
      />
    </GeoFigur>
  );
}

/* 1.8 GIS lag på lag */
type GisLag = "hoyde" | "areal" | "vei" | "steder";
const GIS_LAG: { id: GisLag; navn: string; type: string }[] = [
  { id: "steder", navn: "Steder", type: "vektor: punkter" },
  { id: "vei", navn: "Veier", type: "vektor: linjer" },
  { id: "areal", navn: "Arealbruk", type: "vektor: flater" },
  { id: "hoyde", navn: "Høyde", type: "raster: celler" },
];

function GisInnhold({ id }: { id: GisLag }) {
  if (id === "hoyde") {
    const cells = [];
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
        const v = Math.max(0, 1 - Math.hypot(i - 2, j - 2) / 7);
        const l = 22 + v * 52;
        cells.push(<rect key={`${i}-${j}`} x={i * 25} y={j * 25} width={25} height={25} fill={`hsl(30 35% ${l}%)`} stroke="#00000022" />);
      }
    return <g>{cells}</g>;
  }
  if (id === "areal")
    return (
      <g>
        <path d="M0 0 H110 V90 H0 Z" fill="#4d7c0f" fillOpacity={0.85} />
        <path d="M110 0 H200 V70 H110 Z" fill="#d9b44a" fillOpacity={0.85} />
        <path d="M60 110 H200 V200 H60 Z" fill="#b45309" fillOpacity={0.85} />
        <ellipse cx={150} cy={95} rx={30} ry={18} fill="#2563eb" />
      </g>
    );
  if (id === "vei")
    return (
      <g fill="none" stroke="#f8fafc" strokeWidth={5} strokeLinecap="round">
        <path d="M0 160 C60 150 120 120 200 130" />
        <path d="M90 200 C90 150 100 80 130 0" />
      </g>
    );
  return (
    <g fill="#f43f5e" stroke="#ffffff" strokeWidth={2}>
      <circle cx={100} cy={150} r={7} />
      <circle cx={160} cy={170} r={7} />
      <circle cx={40} cy={40} r={7} />
    </g>
  );
}

function GisModell() {
  const [vis, setVis] = useState<Record<GisLag, boolean>>({ hoyde: true, areal: true, vei: true, steder: true });
  const [modus, setModus] = useState<"stablet" | "samlet">("stablet");
  const synlige = GIS_LAG.filter((l) => vis[l.id]);
  return (
    <GeoFigur
      heading="GIS: lag på lag over samme sted"
      caption="Hvert lag viser ett slags innhold om det samme området. Slå lagene av og på, og bytt mellom stablet og samlet visning. I et GIS kan vi sammenholde lagene, for eksempel for å se hvilke steder som ligger nær vei og i lavt terreng."
      kilde="Egen modell av geofag.com over et oppdiktet område."
      action={<Merkelapp>Oppdiktet område</Merkelapp>}
    >
      <div className="space-y-3">
        <ValgKnapper
          label="Visning"
          valg={[{ id: "stablet", navn: "Stablet" }, { id: "samlet", navn: "Samlet kart" }] as const}
          aktiv={modus}
          onVelg={setModus}
        />
        <fieldset className="flex flex-wrap gap-x-4 gap-y-2">
          <legend className="sr-only">Kartlag som vises</legend>
          {GIS_LAG.map((l) => (
            <label key={l.id} className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                className="size-5 accent-[var(--color-primary)]"
                checked={vis[l.id]}
                onChange={(e) => setVis({ ...vis, [l.id]: e.target.checked })}
              />
              {l.navn} <span className="text-muted-foreground">({l.type})</span>
            </label>
          ))}
        </fieldset>
        <svg
          viewBox={modus === "stablet" ? "0 0 400 410" : "0 0 400 260"}
          className="h-auto w-full"
          role="img"
          aria-label={`${modus === "stablet" ? "Stablede" : "Samlede"} kartlag: ${synlige.map((l) => l.navn).join(", ") || "ingen lag valgt"}.`}
        >
          {modus === "stablet" ? (
            [...GIS_LAG].reverse().map((l, idx) => {
              const ty = 330 - idx * 86;
              return (
                <g key={l.id} opacity={vis[l.id] ? 1 : 0.18}>
                  <g transform={`matrix(0.7 0.3 -0.7 0.3 146 ${ty - 60})`}>
                    <rect width={200} height={200} fill="#1b262e" stroke={PRIM} strokeWidth={2.5} />
                    <GisInnhold id={l.id} />
                  </g>
                  <text x={345} y={ty + 2} fontSize={15} fill={FG} fontWeight={600} textAnchor="middle">{l.navn}</text>
                  <text x={345} y={ty + 20} fontSize={15} fill={MUTED} textAnchor="middle">{l.type}</text>
                </g>
              );
            })
          ) : (
            <g transform="translate(70 10) scale(1.2)">
              <rect width={200} height={200} fill="#1b262e" stroke={PRIM} strokeWidth={2} />
              {[...GIS_LAG].reverse().map((l) => (vis[l.id] ? <GisInnhold key={l.id} id={l.id} /> : null))}
            </g>
          )}
        </svg>
        <details className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm">
          <summary className="cursor-pointer py-1 font-medium text-foreground">Lagene som tekst</summary>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Høyde (raster): et rutenett av celler, lyse celler er høyt terreng i nordvest.</li>
            <li>Arealbruk (vektor, flater): skog i vest, jordbruk i nord, bebyggelse i sørøst og et lite vann.</li>
            <li>Veier (vektor, linjer): én vei øst–vest og én nord–sør.</li>
            <li>Steder (vektor, punkter): tre registrerte steder.</li>
          </ul>
        </details>
      </div>
    </GeoFigur>
  );
}

/* 1.9 John Snow */
function SnowKart() {
  return (
    <GeoFigur
      heading="John Snows kart over kolerautbruddet i Soho, London 1854"
      caption="De svarte strekene langs husveggene er registrerte dødsfall, og PUMP markerer vannpumper. Utsnittet viser området rundt pumpen i Broad Street, der strekene ligger tettest. Kartet ble trykt i Snows bok i 1855, året etter utbruddet. Det støttet en hypotese Snow allerede hadde, og var ikke et bevis alene."
      kilde={
        <>
          John Snow (1855), <i>On the Mode of Communication of Cholera</i>, 2. utg., kart 1. Via{" "}
          <a className="underline" href="https://commons.wikimedia.org/wiki/File:Snow-cholera-map-1.jpg">Wikimedia Commons</a>. Public domain.
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-[3fr_2fr] sm:items-start">
        <div>
          <p className="mb-1.5 text-sm font-medium text-foreground">Hele kartet</p>
          <Bilde
            src="/images/geografi/snow-kolerakart-1854.webp"
            width={1600}
            height={1501}
            className="h-auto w-full rounded-lg bg-white"
            alt="Svart-hvitt gatekart over Soho i London fra 1850-årene med gatenavn, kvartaler og vannpumper. Små svarte streker langs husene viser dødsfall, og de samler seg midt på kartet."
          />
        </div>
        <div>
          <p className="mb-1.5 text-sm font-medium text-foreground">Utsnitt: Broad Street</p>
          <Bilde
            src="/images/geografi/snow-kolerakart-broad-street.webp"
            width={1100}
            height={936}
            className="h-auto w-full rounded-lg bg-white"
            alt="Forstørret utsnitt rundt Broad Street. Mange svarte streker ligger stablet langs husene nær pumpen midt i gata."
          />
        </div>
      </div>
    </GeoFigur>
  );
}

/* 1.10 To kart, samme sted */
function ToKart() {
  const moteplasser = (
    <svg viewBox="0 0 400 260" className="h-auto w-full rounded-lg" role="img" aria-label="Kart 1, møteplasser: fire gule sirkler ved ballbanen, ved vannet, ved skoleinngangen og i skogkanten.">
      <Grunnlag dempet>
        {[[280, 212], [300, 112], [196, 166], [120, 130]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={14} fill="#facc15" stroke="#713f12" strokeWidth={2.5} />
            <text x={x} y={y + 5} fontSize={15} textAnchor="middle" fill="#422006" fontWeight={700}>{i + 1}</text>
          </g>
        ))}
      </Grunnlag>
      <rect x={8} y={8} width={196} height={26} rx={5} fill="#111827" fillOpacity={0.85} />
      <text x={16} y={26} fontSize={15} fill="#ffffff">Kart 1: Møteplasser</text>
    </svg>
  );
  const veier = (
    <svg viewBox="0 0 400 260" className="h-auto w-full rounded-lg" role="img" aria-label="Kart 2, veier vi vil undersøke: to veistrekninger er markert med tykke blå streker, én langs hovedveien og én sti fra skolen mot vannet.">
      <Grunnlag dempet>
        <path d="M60 188 C120 176 170 152 214 150" fill="none" stroke="#1d4ed8" strokeWidth={8} strokeLinecap="round" />
        <path d="M210 168 C230 140 250 120 278 98" fill="none" stroke="#1d4ed8" strokeWidth={8} strokeDasharray="12 8" strokeLinecap="round" />
      </Grunnlag>
      <rect x={8} y={8} width={268} height={26} rx={5} fill="#111827" fillOpacity={0.85} />
      <text x={16} y={26} fontSize={15} fill="#ffffff">Kart 2: Veier vi vil undersøke</text>
    </svg>
  );
  return (
    <GeoFigur
      heading="Innblikk: to kart over det samme oppdiktede området"
      caption="Begge kartene bruker samme bakgrunn, men formålet bestemmer hva som er framhevet. Kart 1 viser hvor elever møtes. Kart 2 viser hvilke strekninger klassen vil undersøke nærmere. Ingen av kartene sier noe om fare. Hva kan du ikke slutte fra kartene?"
      kilde="Egne skisser av geofag.com over et oppdiktet område."
      action={<Merkelapp>Oppdiktet område</Merkelapp>}
    >
      <LagSammenligning
        label="Velg kart"
        lag={[
          { id: "mote", navn: "Kart 1: Møteplasser", innhold: moteplasser, beskrivelse: "Fire nummererte møteplasser: ved ballbanen, ved vannet, ved inngangen og i skogkanten." },
          { id: "veier", navn: "Kart 2: Veier å undersøke", innhold: veier, beskrivelse: "To strekninger klassen vil undersøke: langs hovedveien (heltrukket) og stien mot vannet (stiplet)." },
        ]}
      />
    </GeoFigur>
  );
}

const KAP1: Record<string, () => JSX.Element> = {
  GeoKart1Monster: Monsterkart,
  GeoKart1Mercator: Mercator,
  GeoKart1GallPeters: GallPeters,
  GeoKart1Gradnett: Koordinater,
  GeoKart1Hoydekurver: Hoydekurver,
  GeoKart1Temakart: Temakart,
  GeoKart1Mentalt: MentaltKart,
  GeoKart1BlueMarble: BlueMarble,
  GeoKart1GisLag: GisModell,
  GeoKart1Snow: SnowKart,
  GeoKart1ToKart: ToKart,
};

export const GEOGRAFI_KAP1_FIGUR_IDER = Object.keys(KAP1);

/** Inngang for registeret: én lazy modul, figuren velges med id. */
export function GeografiKap1Figur({ id }: { id: string }) {
  const Figur = KAP1[id];
  return Figur ? <Figur /> : <p className="text-sm text-muted-foreground">Ukjent figur «{id}».</p>;
}
