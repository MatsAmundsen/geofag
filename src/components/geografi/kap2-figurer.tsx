import { useState, type JSX, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Camera, Eye, Hash, MapPin, MessageCircle, Thermometer } from "lucide-react";
import {
  GeoFigur,
  LagSammenligning,
  Merkelapp,
  StegFigur,
  Tegnforklaring,
  ValgKnapper,
} from "@/components/geografi/figur-kit";

/**
 * Figurer til Geografi kapittel 2 (feltarbeid). Lastes lazy fra poster-widget-renderer.
 * Alle skoleområder er oppdiktede, og alle tall er de konstruerte øvingstallene fra
 * kapitteltekstene (A: 10,0/10,2/10,4 °C, B: 11,0/11,2/11,4 °C). Ingen eksterne kartdata.
 */

const FG = "#e8eef2";
const MUTED = "#8b9aa6";
const PRIM = "#6fb3b8";
const EGEN = "Egen skisse av geofag.com over et oppdiktet skoleområde.";

/** Oppdiktet skolegård, 400 × 280. Delområdene «ved bygningen» og «ved trærne» fra kapittelkroken. */
function Skolegard({ children, label }: { children?: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 400 280" className="h-auto w-full rounded-lg" role="img" aria-label={label}>
      <rect width="400" height="280" fill="#d6d3cb" />
      <rect x={14} y={14} width={150} height={78} fill="#64748b" stroke="#1e293b" strokeWidth={2} />
      <text x={89} y={58} fontSize={15} fill="#ffffff" textAnchor="middle" fontWeight={600}>Skolebygning</text>
      <rect x={176} y={14} width={210} height={252} fill="#a3c585" />
      {[[210, 50], [250, 80], [300, 40], [350, 90], [220, 130], [280, 150], [340, 170], [230, 220], [300, 230], [360, 240]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={13} fill="#3f6212" stroke="#1a2e05" strokeWidth={1.5} />
      ))}
      <text x={281} y={204} fontSize={15} fill="#1a2e05" textAnchor="middle" fontWeight={600}>Område ved trærne</text>
      <text x={89} y={186} fontSize={15} fill="#1e293b" textAnchor="middle" fontWeight={600}>Asfalt ved bygningen</text>
      {children}
    </svg>
  );
}

function Punkt({ x, y, farge = "#be123c", tekst }: { x: number; y: number; farge?: string; tekst?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={tekst ? 13 : 7} fill={farge} stroke="#ffffff" strokeWidth={2} />
      {tekst ? (
        <text x={x} y={y + 5.5} fontSize={15} fill="#ffffff" textAnchor="middle" fontWeight={700}>{tekst}</text>
      ) : null}
    </g>
  );
}

/* 2.0 Utvalg av målepunkter */
type Utvalg = "ett" | "transekt" | "tilfeldig" | "delomrader";
// Tilfeldige punkter trukket én gang med en fast startverdi, så figuren er lik for alle.
const TILFELDIG = [[36, 130], [120, 230], [258, 32], [330, 120], [76, 210], [200, 180], [150, 120], [368, 210]];

function UtvalgFigur() {
  const [u, setU] = useState<Utvalg>("ett");
  const tekst: Record<Utvalg, string> = {
    ett: "Ett punkt i ett hjørne: raskt, men sier nesten ingenting om resten av skolegården.",
    transekt: "Systematisk utvalg langs en transekt: punkter med like avstander på en linje tvers over området.",
    tilfeldig: "Tilfeldig utvalg: åtte punkter trukket tilfeldig innenfor hele skolegården. Noen områder kan likevel bli dårlig dekket.",
    delomrader: "To delområder med like mange punkter i hvert. Det er et sammenlikningsopplegg, ikke et bilde av hele skolegården.",
  };
  return (
    <GeoFigur
      heading="Figur 2.0 – Mønsterkart: hvor skal vi måle?"
      caption="Velg utvalgsmetode og se hvilke deler av skolegården som blir med. Hvor mange og hvilke punkter trengs før vi kan si noe om et mønster?"
      kilde={EGEN}
      action={<Merkelapp>Oppdiktet skolegård</Merkelapp>}
    >
      <div className="space-y-3">
        <ValgKnapper
          label="Utvalgsmetode"
          aktiv={u}
          onVelg={setU}
          valg={[
            { id: "ett", navn: "Ett punkt" },
            { id: "transekt", navn: "Transekt" },
            { id: "tilfeldig", navn: "Tilfeldig" },
            { id: "delomrader", navn: "To delområder" },
          ] as const}
        />
        <Skolegard label={`Oppdiktet skolegård med skolebygning, asfalt og et område med trær. ${tekst[u]}`}>
          {u === "ett" ? <Punkt x={30} y={262} /> : null}
          {u === "transekt" ? (
            <g>
              <line x1={20} y1={140} x2={380} y2={140} stroke="#1d4ed8" strokeWidth={3} strokeDasharray="8 5" />
              {[30, 90, 150, 210, 270, 330, 380].map((x) => <Punkt key={x} x={Math.min(x, 376)} y={140} />)}
            </g>
          ) : null}
          {u === "tilfeldig" ? TILFELDIG.map(([x, y]) => <Punkt key={`${x}-${y}`} x={x} y={y} />) : null}
          {u === "delomrader" ? (
            <g>
              <rect x={20} y={104} width={146} height={160} fill="none" stroke="#1d4ed8" strokeWidth={3} strokeDasharray="6 4" />
              <rect x={184} y={22} width={194} height={236} fill="none" stroke="#1d4ed8" strokeWidth={3} strokeDasharray="6 4" />
              {[[50, 130], [130, 140], [60, 240], [140, 230]].map(([x, y]) => <Punkt key={`${x}${y}`} x={x} y={y} />)}
              {[[230, 70], [330, 60], [240, 170], [350, 200]].map(([x, y]) => <Punkt key={`${x}${y}`} x={x} y={y} />)}
            </g>
          ) : null}
        </Skolegard>
        <p className="text-sm leading-relaxed text-foreground" aria-live="polite">{tekst[u]}</p>
      </div>
    </GeoFigur>
  );
}

/* 2.1 Fire steg */
const STEG4 = ["Planlegge", "Samle", "Bearbeide", "Presentere og vurdere"] as const;

function StegSirkel({ aktiv }: { aktiv: number }) {
  const pos = [[104, 60], [296, 60], [296, 190], [104, 190]];
  return (
    <svg viewBox="0 0 400 250" className="h-auto w-full" role="img" aria-label={`Fire steg i en ring: planlegge, samle, bearbeide, presentere og vurdere. Steg ${aktiv + 1}, ${STEG4[aktiv].toLowerCase()}, er uthevet. En stiplet pil går tilbake fra vurderingen til planen.`}>
      <defs>
        <marker id="pil-steg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={MUTED} />
        </marker>
      </defs>
      <g stroke={MUTED} strokeWidth={2.5} fill="none" markerEnd="url(#pil-steg)">
        <path d="M194 60 H206" />
        <path d="M296 92 V158" />
        <path d="M206 190 H194" />
      </g>
      <path d="M70 158 V92" stroke={PRIM} strokeWidth={2.5} strokeDasharray="6 5" fill="none" markerEnd="url(#pil-steg)" />
      <text x={80} y={130} fontSize={15} fill={PRIM}>juster</text>
      {pos.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 88} y={y - 30} width={176} height={60} rx={14} fill={i === aktiv ? PRIM : "#1b262e"} stroke={i === aktiv ? PRIM : "#2a3943"} strokeWidth={2} />
          <text x={x} y={y - 4} fontSize={15} textAnchor="middle" fill={i === aktiv ? "#0b1014" : MUTED} fontWeight={600}>Steg {i + 1}</text>
          <text x={x} y={y + 16} fontSize={15} textAnchor="middle" fill={i === aktiv ? "#0b1014" : FG} fontWeight={700}>{STEG4[i]}</text>
        </g>
      ))}
    </svg>
  );
}

function FireSteg() {
  return (
    <GeoFigur
      heading="Figur 2.1 – Feltarbeid i fire steg"
      caption="Kapitlets arbeidsmodell. Pilen tilbake viser at vi kan justere spørsmål og metode underveis, men da skriver vi ned hva vi endret og hvorfor."
      kilde="Egen figur av geofag.com."
    >
      <StegFigur
        label="Steg i feltarbeidet"
        felles={(a) => <StegSirkel aktiv={a} />}
        steg={[
          { tittel: "Planlegge", tekst: "Problemstilling, utvalg, metode, utstyr, sikkerhet og etikk avklares før vi går ut." },
          { tittel: "Samle", tekst: "Vi registrerer data i felt og fører feltlogg med punkt-ID, sted, tid og metode." },
          { tittel: "Bearbeide", tekst: "Vi kontrollerer rådata, lager tabeller, diagrammer og kart og ser etter feilkilder." },
          { tittel: "Presentere og vurdere", tekst: "Vi viser funnene og forklarer hva dataene støtter, og hva de ikke kan svare på." },
        ]}
      />
    </GeoFigur>
  );
}

/* 2.2 Planleggingsmal */
const PLAN = [
  ["Spørsmål", "Hva undersøker vi, hvor og når?"],
  ["Antakelse", "Hypotese, og hva som kan motsi den"],
  ["Utvalg", "Hvilke steder eller tidspunkt, og hvorfor"],
  ["Metode", "Hva registreres, med hvilken enhet"],
  ["Utstyr og roller", "Hva trengs, og hvem gjør hva"],
  ["Sikkerhet", "Farer, tiltak, ansvarlig voksen"],
  ["Etikk", "Hvem berøres, og hvordan håndteres data"],
  ["Etterarbeid", "Bearbeiding, vurdering og presentasjon"],
] as const;

function Planmal() {
  return (
    <GeoFigur
      heading="Figur 2.2 – Planleggingsmal for feltarbeid"
      caption="Åtte felt som må være fylt ut før dere går ut. Du kan skrive rett i feltene for å øve, men teksten lagres ikke. Bruk CSV-malen under for å ta vare på planen."
      kilde="Egen mal av geofag.com. Samme innhold som tabellen og CSV-filen i teksten."
    >
      <ol className="grid gap-3 sm:grid-cols-2">
        {PLAN.map(([navn, hjelp], i) => (
          <li key={navn} className="rounded-xl border border-border bg-muted/50 p-3">
            <label className="block">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">{i + 1}</span>
                {navn}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{hjelp}</span>
              <textarea rows={2} className="mt-2 w-full rounded-md border border-border bg-card px-2 py-1.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary" />
            </label>
          </li>
        ))}
      </ol>
    </GeoFigur>
  );
}

/* 2.3 Metoder */
const METODER: { navn: string; ikon: ReactNode; gir: string; eks: string; husk: string }[] = [
  { navn: "Observasjon", ikon: <Eye />, gir: "Kategorier eller beskrivelser", eks: "Arealbruk langs en avtalt gangrute", husk: "Bli enige om kategoriene før dere deler dere" },
  { navn: "Telling", ikon: <Hash />, gir: "Tall (kvantitativt)", eks: "Passeringer ved et punkt i 10 minutter", husk: "Definer enhet og tidsrom" },
  { navn: "Måling", ikon: <Thermometer />, gir: "Måleverdier med enhet", eks: "Lufttemperatur i °C", husk: "Skjerm sensoren mot sol og noter plasseringen" },
  { navn: "Intervju", ikon: <MessageCircle />, gir: "Tekst (kvalitativt)", eks: "Hvordan et møteområde oppleves", husk: "Frivillig, uten navn og private opplysninger" },
  { navn: "Foto", ikon: <Camera />, gir: "Bilder som dokumentasjon", eks: "Overflater og terreng ved hvert punkt", husk: "Ingen gjenkjennelige personer" },
  { navn: "Posisjon", ikon: <MapPin />, gir: "Stedfesting", eks: "Koordinater for hvert målepunkt", husk: "Noter koordinatsystem og kontroller mot kart" },
];

function Metoder() {
  return (
    <GeoFigur
      heading="Figur 2.3 – Seks metoder i felt"
      caption="Hver metode gir en bestemt type data. Ofte kombinerer vi to eller flere: et tall sier hvor mange, mens et intervju kan si hvordan stedet oppleves."
      kilde="Egen oversikt av geofag.com, bygd på kapitteltekstens metodeavsnitt."
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {METODER.map((m) => (
          <li key={m.navn} className="rounded-xl border border-border bg-muted/50 p-3">
            <p className="flex items-center gap-2 font-semibold text-foreground">
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary [&>svg]:size-5">{m.ikon}</span>
              {m.navn}
            </p>
            <dl className="mt-2 space-y-1 text-sm">
              <div><dt className="inline font-medium text-foreground">Gir: </dt><dd className="inline text-muted-foreground">{m.gir}</dd></div>
              <div><dt className="inline font-medium text-foreground">Eksempel: </dt><dd className="inline text-muted-foreground">{m.eks}</dd></div>
              <div><dt className="inline font-medium text-foreground">Husk: </dt><dd className="inline text-muted-foreground">{m.husk}</dd></div>
            </dl>
          </li>
        ))}
      </ul>
    </GeoFigur>
  );
}

/* 2.5 Punktkart */
function Punktkart() {
  const [spor, setSpor] = useState<"punkter" | "spor">("punkter");
  const punkter: [string, number, number, string][] = [
    ["A", 250, 110, "Under trærne, midt i området"],
    ["B", 60, 140, "Asfalt, 2 m fra veggen"],
    ["C", 60, 230, "Asfalt, åpent mot sør"],
    ["D", 330, 230, "Gress ved trærne"],
  ];
  return (
    <GeoFigur
      heading="Figur 2.5 – Målepunkter på kartet"
      caption="Samme punkt-ID står på kartet, i feltloggen og i filnavnene til bildene. Et helt GPS-spor viser hvor gruppa gikk; ofte er det nok å registrere bare de avtalte målepunktene. Ingen private posisjoner tas med."
      kilde={EGEN}
      action={<Merkelapp>Oppdiktet skolegård</Merkelapp>}
    >
      <div className="space-y-3">
        <ValgKnapper
          label="Hva vises"
          aktiv={spor}
          onVelg={setSpor}
          valg={[{ id: "punkter", navn: "Bare målepunkter" }, { id: "spor", navn: "Med spor" }] as const}
        />
        <Skolegard label={`Oppdiktet skolegård med målepunktene A, B, C og D${spor === "spor" ? " og et stiplet spor som går fra inngangen innom alle fire punktene" : ""}.`}>
          {spor === "spor" ? (
            <path d="M90 96 L60 140 L60 230 L330 230 L250 110" fill="none" stroke="#1d4ed8" strokeWidth={3} strokeDasharray="7 5" />
          ) : null}
          {punkter.map(([id, x, y]) => <Punkt key={id} x={x} y={y} tekst={id} />)}
        </Skolegard>
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Målepunkter</caption>
          <thead><tr className="text-muted-foreground"><th className="py-1 pr-3 font-medium">Punkt-ID</th><th className="py-1 font-medium">Stedsbeskrivelse</th></tr></thead>
          <tbody>
            {punkter.map(([id, , , beskr]) => (
              <tr key={id} className="border-t border-border"><td className="py-1 pr-3 font-semibold text-foreground">{id}</td><td className="py-1 text-foreground">{beskr}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </GeoFigur>
  );
}

/* Konstruerte øvingstall fra kapitlet */
const DATA = { A: [10.0, 10.2, 10.4], B: [11.0, 11.2, 11.4] } as const;
const SNITT = { A: 10.2, B: 11.2 } as const;
const komma = (v: number) => v.toFixed(1).replace(".", ",");

function Soyler() {
  const y = (v: number) => 210 - v * 15;
  return (
    <svg viewBox="0 0 400 250" className="h-auto w-full" role="img" aria-label="Søylediagram over gjennomsnittlig lufttemperatur: punkt A 10,2 grader, punkt B 11,2 grader. Konstruerte øvingstall.">
      {[0, 2, 4, 6, 8, 10, 12].map((v) => (
        <g key={v}>
          <line x1={56} x2={380} y1={y(v)} y2={y(v)} stroke={MUTED} strokeOpacity={0.35} />
          <text x={48} y={y(v) + 5} fontSize={15} fill={FG} textAnchor="end">{v}</text>
        </g>
      ))}
      {/* Enheten står til høyre for aksen, så den ikke berører «12» når teksten er 18 px under 390 px. */}
      <text x={64} y={24} fontSize={15} fill={FG}>°C</text>
      {(["A", "B"] as const).map((k, i) => (
        <g key={k}>
          <rect x={110 + i * 150} y={y(SNITT[k])} width={80} height={210 - y(SNITT[k])} fill={i ? "#f59e0b" : PRIM} rx={4} />
          <text x={150 + i * 150} y={y(SNITT[k]) - 8} fontSize={15} fill={FG} textAnchor="middle" fontWeight={700}>{komma(SNITT[k])}</text>
          <text x={150 + i * 150} y={234} fontSize={15} fill={FG} textAnchor="middle">Punkt {k}</text>
        </g>
      ))}
    </svg>
  );
}

function Diagram() {
  const tabell = (
    <table className="w-full text-left text-sm">
      <caption className="sr-only">Konstruerte øvingstall for lufttemperatur</caption>
      <thead><tr className="text-muted-foreground"><th className="py-1 pr-2 font-medium">Punkt</th><th className="py-1 pr-2 font-medium">Reg. 1</th><th className="py-1 pr-2 font-medium">Reg. 2</th><th className="py-1 pr-2 font-medium">Reg. 3</th><th className="py-1 font-medium">Snitt, °C</th></tr></thead>
      <tbody>
        {(["A", "B"] as const).map((k) => (
          <tr key={k} className="border-t border-border text-foreground">
            <td className="py-1.5 pr-2 font-semibold">{k}</td>
            {DATA[k].map((v, i) => <td key={i} className="py-1.5 pr-2">{komma(v)}</td>)}
            <td className="py-1.5 font-semibold">{komma(SNITT[k])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const kart = (
    <Skolegard label="Kartskisse: punkt A i området ved trærne med 10,2 grader og punkt B på asfalten med 11,2 grader i gjennomsnitt. Konstruerte øvingstall.">
      <Punkt x={250} y={110} tekst="A" farge="#0e7490" />
      <rect x={266} y={94} width={74} height={30} rx={6} fill="#111827" />
      <text x={303} y={115} fontSize={15} fill="#ffffff" textAnchor="middle" fontWeight={700}>10,2 °C</text>
      <Punkt x={60} y={140} tekst="B" farge="#b45309" />
      <rect x={76} y={124} width={74} height={30} rx={6} fill="#111827" />
      <text x={113} y={145} fontSize={15} fill="#ffffff" textAnchor="middle" fontWeight={700}>11,2 °C</text>
    </Skolegard>
  );
  return (
    <GeoFigur
      heading="Figur 2.7 – Fra feltlogg til tabell, diagram og kart"
      caption="De samme tallene i tre framstillinger. Tabellen viser alle registreringene, diagrammet sammenlikner gjennomsnittene, og kartet viser hvor de ble målt. Skriv alltid om figuren viser enkeltregistreringer eller oppsummerte verdier."
      kilde="Egen figur av geofag.com med kapitlets konstruerte øvingstall."
      action={<Merkelapp>Konstruerte tall</Merkelapp>}
    >
      <LagSammenligning
        label="Velg framstilling"
        lag={[
          { id: "tabell", navn: "Tabell", innhold: tabell, beskrivelse: "Tabellen er originalen: tre registreringer per punkt og gjennomsnittet." },
          { id: "diagram", navn: "Søylediagram", innhold: <Soyler />, beskrivelse: "Diagrammet viser bare gjennomsnittene, 10,2 og 11,2 °C." },
          { id: "kart", navn: "Kart", innhold: kart, beskrivelse: "Kartet knytter gjennomsnittene til målepunktene." },
        ]}
      />
    </GeoFigur>
  );
}

/* 2.8 Feilkilder (plassholder 2.7) */
const FEIL = [
  {
    navn: "Sol på sensoren",
    type: "Systematisk feil",
    virkning: "Målingene blir for høye i én retning",
    tiltak: "Skjerm sensoren og noter plasseringen",
    grense: "Uten skjerming vet vi ikke om forskjellen gjelder lufta eller sola",
  },
  {
    navn: "Avlesning varierer",
    type: "Tilfeldig feil",
    virkning: "Tallene spriker litt mellom gjentakelser",
    tiltak: "Gjenta målingen og regn gjennomsnitt",
    grense: "Små forskjeller kan skyldes tilfeldigheter",
  },
  {
    navn: "Teller passeringer, vil vite hva folk mener",
    type: "Lav gyldighet",
    virkning: "Korrekte tall, men om noe annet enn spørsmålet",
    tiltak: "Legg til korte intervjuer eller endre problemstillingen",
    grense: "Tellingen sier ikke hva menneskene mener om stedet",
  },
];

function Feilkilder() {
  const kol = ["Feilkilde", "Mulig virkning", "Forbedring", "Begrensning for konklusjonen"] as const;
  return (
    <GeoFigur
      heading="Figur 2.8 – Fra feilkilde til forbedring"
      caption="Les hver rad fra venstre mot høyre, eller ovenfra og ned på mobil. Pålitelighet handler om like resultater under like forhold. Gyldighet handler om at vi faktisk måler det problemstillingen spør om."
      kilde="Egen figur av geofag.com, eksemplene er hentet fra kapitteltekstene."
    >
      <div className="space-y-4">
        {FEIL.map((f) => {
          const celler = [
            <><span className="block text-xs font-semibold uppercase tracking-wider text-primary">{f.type}</span>{f.navn}</>,
            f.virkning,
            f.tiltak,
            f.grense,
          ];
          return (
            <ol key={f.navn} className="grid gap-1 rounded-xl border border-border bg-muted/40 p-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-stretch">
              {celler.map((c, i) => (
                <li key={i} className="contents">
                  <div className="rounded-lg bg-card p-2.5 text-sm text-foreground">
                    <span className="block text-xs text-muted-foreground">{kol[i]}</span>
                    {c}
                  </div>
                  {i < 3 ? (
                    <span aria-hidden="true" className="flex items-center justify-center text-muted-foreground">
                      <ArrowDown className="size-4 sm:hidden" />
                      <ArrowRight className="hidden size-4 sm:block" />
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          );
        })}
      </div>
    </GeoFigur>
  );
}

/* 2.6 Sikkerhet og etikk (plassholder 2.8) */
function Sikkerhet() {
  const sikker = [
    ["Vurder", "Hva kan skade noen her?"],
    ["Tiltak", "Ett konkret tiltak per fare, og hvem som sjekker det"],
    ["Følg med", "Forholdene kan endre seg underveis"],
    ["Stopp eller bytt", "Trekk dere tilbake, kontakt lærer, bruk alternativet"],
  ];
  const etikk = [
    "Deltakelse er frivillig, og nei er et svar",
    "Ingen navn, kontaktopplysninger eller private opplysninger",
    "Ingen gjenkjennelige personer på bilder",
    "Avklar lagring, tilgang og sletting med læreren",
    "Observer og dokumenter, ikke grav eller ta prøver",
  ];
  return (
    <GeoFigur
      heading="Figur 2.6 – Sikkerhet og etikk på én side"
      caption="Oppsummeringen er en støtte til samtalen med læreren. Den gir ingen poengsum og er ingen sikkerhetsgodkjenning. Læreren avgjør om et arbeidssted er forsvarlig."
      kilde="Egen oppsummering av geofag.com, bygd på kapitteltekstene."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <section aria-label="Sikkerhet">
          <p className="text-sm font-semibold text-foreground">Sikkerhet: en sløyfe, ikke et skjema</p>
          <ol className="mt-2 space-y-2">
            {sikker.map(([t, d], i) => (
              <li key={t} className="flex gap-3 rounded-lg bg-muted/50 p-2.5 text-sm">
                <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{i + 1}</span>
                <span><span className="font-semibold text-foreground">{t}.</span> <span className="text-muted-foreground">{d}</span></span>
              </li>
            ))}
          </ol>
        </section>
        <section aria-label="Etikk og personvern">
          <p className="text-sm font-semibold text-foreground">Etikk og personvern</p>
          <ul className="mt-2 space-y-2">
            {etikk.map((e) => (
              <li key={e} className="rounded-lg border-l-4 border-primary bg-muted/50 p-2.5 text-sm text-foreground">{e}</li>
            ))}
          </ul>
        </section>
      </div>
    </GeoFigur>
  );
}

/* 2.9 Mikroklima */
function Mikroklima() {
  const y = (v: number) => 220 - (v - 9.6) * 90;
  return (
    <GeoFigur
      heading="Figur 2.9 – Innblikk: mikroklima i en oppdiktet skolegård"
      caption="Skissen viser hvor punktene A og B ligger. Grafen viser hver av de tre registreringene som en prikk og gjennomsnittet som en strek. Spredningen er 0,4 grader ved begge punkter. Tallene er konstruert til regneøving og er ikke målt i en virkelig skolegård."
      kilde="Egen figur av geofag.com med kapitlets konstruerte øvingstall."
      action={<Merkelapp>Konstruerte tall</Merkelapp>}
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:items-center">
        <Skolegard label="Oppdiktet skolegård med punkt A i området ved trærne og punkt B på asfalten ved bygningen.">
          <Punkt x={250} y={110} tekst="A" farge="#0e7490" />
          <Punkt x={60} y={140} tekst="B" farge="#b45309" />
        </Skolegard>
        <svg viewBox="0 0 400 280" className="h-auto w-full" role="img" aria-label="Prikkdiagram. Punkt A: 10,0, 10,2 og 10,4 grader, gjennomsnitt 10,2. Punkt B: 11,0, 11,2 og 11,4 grader, gjennomsnitt 11,2.">
          {[10, 10.5, 11, 11.5].map((v) => (
            <g key={v}>
              <line x1={64} x2={384} y1={y(v)} y2={y(v)} stroke={MUTED} strokeOpacity={0.35} />
              <text x={56} y={y(v) + 5} fontSize={15} fill={FG} textAnchor="end">{komma(v)}</text>
            </g>
          ))}
          <text x={8} y={22} fontSize={15} fill={FG}>°C</text>
          {(["A", "B"] as const).map((k, i) => {
            const cx = 150 + i * 150;
            return (
              <g key={k}>
                {DATA[k].map((v, j) => (
                  <circle key={j} cx={cx - 24 + j * 24} cy={y(v)} r={7} fill={i ? "#f59e0b" : PRIM} stroke="#0b1014" strokeWidth={1.5} />
                ))}
                <line x1={cx - 48} x2={cx + 48} y1={y(SNITT[k])} y2={y(SNITT[k])} stroke={FG} strokeWidth={2.5} />
                <text x={cx} y={262} fontSize={15} fill={FG} textAnchor="middle">Punkt {k}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <Tegnforklaring
        poster={[
          { symbol: <span className="block size-3.5 rounded-full" style={{ background: PRIM }} />, tekst: "Registrering, A" },
          { symbol: <span className="block size-3.5 rounded-full" style={{ background: "#f59e0b" }} />, tekst: "Registrering, B" },
          { symbol: <span className="block h-0.5 w-5" style={{ background: FG }} />, tekst: "Gjennomsnitt" },
                  ]}
      />
    </GeoFigur>
  );
}

const KAP2: Record<string, () => JSX.Element> = {
  GeoFeltUtvalg: UtvalgFigur,
  GeoFeltProsess: FireSteg,
  GeoFeltPlanmal: Planmal,
  GeoFeltMetodevalg: Metoder,
  GeoFeltMaalepunkter: Punktkart,
  GeoFeltEtikk: Sikkerhet,
  GeoFeltBearbeiding: Diagram,
  GeoFeltFeilkilder: Feilkilder,
  GeoFeltMikroklimaEget: Mikroklima,
};

export const GEOGRAFI_KAP2_FIGUR_IDER = Object.keys(KAP2);

/** Inngang for registeret: én lazy modul, figuren velges med id. */
export function GeografiKap2Figur({ id }: { id: string }) {
  const Figur = KAP2[id];
  return Figur ? <Figur /> : <p className="text-sm text-muted-foreground">Ukjent figur «{id}».</p>;
}
