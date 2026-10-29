import type { JSX } from "react";

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

export const G2_PAKKE_A_WIDGETS: Record<string, () => JSX.Element> = Object.fromEntries(
  Object.keys(FIGURER_BESTILT_A).map((id) => [id, () => <FigurBestilt id={id} />]),
);
