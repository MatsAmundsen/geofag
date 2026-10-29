import type { JSX } from "react";
import { Quiz } from "@/components/quiz";
import { G2_PAKKE_A_FERDIGE } from "@/components/g2-pakke-a-figurer";
import { QUIZ_ENERGI_REGNING } from "@/lib/poster-quizzes-pakke-a";
import {
  QUIZ_KLIMAFORSKNING,
  QUIZ_KLIMATILTAK,
  QUIZ_KLIMA_MENNESKE,
} from "@/lib/poster-quizzes-pakke-a-klima";

/**
 * Bestilte figurer til Geofag 2 pakke A. Hver nøkkel er widget-id-en i markdown.
 * DesignBOT tegner figurene (se figurbestillinger-A.md). Til de er levert, viser
 * `FigurBestilt` en tydelig plassholder i utviklingsmodus og ingenting i produksjon.
 * Når en figur er tegnet, bytter du oppføringen mot den ferdige komponenten.
 */
export const FIGURER_BESTILT_A: Record<string, { fil: string; vis: string }> = {
  VindEffektkurve: {
    fil: "src/components/diagrams/vind-effektkurve.tsx",
    vis: "Effektkurve for en moderne vindturbin: kutt-inn 3, største ytelse ca. 13 og kutt-ut 25 m/s",
  },
  AmfidromiskFigur: {
    fil: "src/components/diagrams/amfidromisk-figur.tsx",
    vis: "Tidevannsbølgen som går rundt et amfidromisk punkt, med punktet vest for Egersund",
  },
  SolenergiFigur: {
    fil: "src/components/diagrams/solenergi-figur.tsx",
    vis: "Årlig innstråling 700 til over 2200 kWh per m² (Nord-Europa sjelden over 1000) og de tre bruksmåtene: solvarme, solceller og termisk solkraft",
  },
  SaltkraftFigur: {
    fil: "src/components/diagrams/saltkraft-figur.tsx",
    vis: "Trykkretardert osmose: to kamre, membran, overtrykk og turbin",
  },
  BaerekraftTreFigur: {
    fil: "src/components/diagrams/baerekraft-tre-figur.tsx",
    vis: "Tre dimensjoner av bærekraft med eksempler fra energikapitlet",
  },
  BrukstidFigur: {
    fil: "src/components/diagrams/brukstid-figur.tsx",
    vis: "Brukstid og kapasitetsfaktor: Fosen Vind 3217 t / 36,7 %, Furuseth 914 t / 10,4 %, SNL-eksempel 5000 t / 57,1 %, maks 8760 t",
  },
  KraftsystemetNorgeFigur: {
    fil: "src/components/diagrams/kraftsystemet-norge-figur.tsx",
    vis: "Norsk kraftsystem: vannkraft, vind, sol, varme (Energifakta Norge), magasin 87 TWh, regulerbar i overkant av 75 prosent",
  },
  PrisomraderFigur: {
    fil: "src/components/diagrams/prisomrader-figur.tsx",
    vis: "Kart over budområdene NO1 til NO5 med flaskehalser og utenlandsforbindelser",
  },
  EnergiRegningKalkulator: {
    fil: "src/components/diagrams/energi-regning-kalkulator.tsx",
    vis: "Kalkulator: effekt, tid, energi, brukstid og kapasitetsfaktor",
  },
  // Klima (N2–N4, T2)
  KarbonkretsloepFigur: {
    fil: "src/components/diagrams/karbonkretsloep-figur.tsx",
    vis: "Raskt og langsomt karbonkretsløp, fossile brensler som pil fra berggrunn til luft, og fordelingen 50 % luft, 29 % hav, 21 % land (2015–2024)",
  },
  UtslippSektorFigur: {
    fil: "src/components/diagrams/utslipp-sektor-figur.tsx",
    vis: "Globale klimagassutslipp 2019 (59 Gt CO₂e) per sektor, avrundede prosenter fra IPCC",
  },
  KarbonbudsjettFigur: {
    fil: "src/components/diagrams/karbonbudsjett-figur.tsx",
    vis: "Gjenstående karbonbudsjett for 1,5 og 2,0 °C ved fem sannsynligheter (IPCC 2021), og Global Carbon Project 2026",
  },
  SspScenarioFigur: {
    fil: "src/components/diagrams/ssp-scenario-figur.tsx",
    vis: "De fem SSP-scenariene med oppvarming 2081–2100 og spenn, og stiplede linjer for 3,2 og 2,8 °C",
  },
  NorskeUtslippFigur: {
    fil: "src/components/diagrams/norske-utslipp-figur.tsx",
    vis: "Norske utslipp 1990 og 2025 (foreløpig), klimalovens mål og de fire største kildene",
  },
  TiltaksstigeFigur: {
    fil: "src/components/diagrams/tiltaksstige-figur.tsx",
    vis: "Tiltak i fem sektorer med IPCC-tall, og kostnadstrapp under 20 og 100 USD per tonn",
  },
  CdrSkjemaFigur: {
    fil: "src/components/diagrams/cdr-skjema-figur.tsx",
    vis: "CCS mot CDR: hva som fanges, hvor det lagres, kostnad og lagringstid",
  },
  IpccOrganisasjonFigur: {
    fil: "src/components/diagrams/ipcc-organisasjon-figur.tsx",
    vis: "IPCC: tre arbeidsgrupper, arbeidsstyrken for nasjonale regnskap og de fem trinnene fra utkast til godkjenning",
  },
  KeelingKurveFigur: {
    fil: "src/components/diagrams/keeling-kurve-figur.tsx",
    vis: "Skjematisk Keeling-kurve: stigende trend og årlig sagtann, Mauna Loa fra 1958",
  },
  FanerozoikumTemperaturFigur: {
    fil: "src/components/diagrams/fanerozoikum-temperatur-figur.tsx",
    vis: "Global middeltemperatur siste 485 millioner år (PhanDA, Judd mfl. 2024), spenn ca. 11–36 °C",
  },
};

export function FigurBestilt({ id }: { id: string }): JSX.Element {
  if (!import.meta.env.DEV) return <></>;
  const bestilling = FIGURER_BESTILT_A[id];
  return (
    <aside
      data-figur-bestilt={id}
      className="my-6 rounded-xl border border-dashed border-amber-500/60 bg-amber-500/10 px-4 py-3 text-sm text-foreground"
    >
      <strong>Figur bestilt: {id}</strong>
      {bestilling ? (
        <>
          <br />
          {bestilling.vis}
          <br />
          <code className="text-xs">{bestilling.fil}</code>
        </>
      ) : null}
    </aside>
  );
}

export const G2_PAKKE_A_WIDGETS: Record<string, () => JSX.Element> = {
  ...Object.fromEntries(
    Object.keys(FIGURER_BESTILT_A).map((id) => [id, () => <FigurBestilt id={id} />]),
  ),
  ...G2_PAKKE_A_FERDIGE,
  QuizEnergiRegning: () => (
    <Quiz questions={QUIZ_ENERGI_REGNING} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  QuizKlimaMenneske: () => (
    <Quiz questions={QUIZ_KLIMA_MENNESKE} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  QuizKlimatiltak: () => (
    <Quiz questions={QUIZ_KLIMATILTAK} heading={null} intro="Velg ett svar per spørsmål." />
  ),
  QuizKlimaforskning: () => (
    <Quiz questions={QUIZ_KLIMAFORSKNING} heading={null} intro="Velg ett svar per spørsmål." />
  ),
};
