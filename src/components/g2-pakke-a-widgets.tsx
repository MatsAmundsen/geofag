import type { JSX } from "react";
import { Quiz } from "@/components/quiz";
import { QUIZ_ENERGI_REGNING } from "@/lib/poster-quizzes-pakke-a";

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
    vis: "Solinnstråling ved yttergrensen, ved bakken og som årsmiddel, og de tre bruksmåtene",
  },
  SaltkraftFigur: {
    fil: "src/components/diagrams/saltkraft-figur.tsx",
    vis: "Trykkretardert osmose: to kamre, membran, overtrykk og turbin",
  },
  BaerekraftTreFigur: {
    fil: "src/components/diagrams/baerekraft-tre-figur.tsx",
    vis: "Tre dimensjoner av bærekraft med eksempler fra energikapitlet",
  },
  EnhetstrappFigur: {
    fil: "src/components/diagrams/enhetstrapp-figur.tsx",
    vis: "Enhetstrapp: Wh, kWh, MWh, GWh, TWh i faktor 1000, med J og Sm³ o.e. som sidekart",
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
  QuizEnergiRegning: () => (
    <Quiz questions={QUIZ_ENERGI_REGNING} heading={null} intro="Velg ett svar per spørsmål." />
  ),
};
