import type { JSX } from "react";
import { EnhetstrappFigur } from "./diagrams/enhetstrapp-figur";
import { BrukstidFigur } from "./diagrams/g2a-energi";
import { KraftsystemetNorgeFigur } from "./diagrams/g2a-energi";
import { PrisomraderFigur } from "./diagrams/g2a-energi";
import { EnergiRegningKalkulator } from "./diagrams/g2a-kalkulator";

/** Ferdige figurer i pakke A. Nøkkelen er widget-id-en i markdown. */
export const G2_PAKKE_A_FERDIGE: Record<string, () => JSX.Element> = {
  EnhetstrappFigur: () => <EnhetstrappFigur />,
  BrukstidFigur: () => <BrukstidFigur />,
  KraftsystemetNorgeFigur: () => <KraftsystemetNorgeFigur />,
  PrisomraderFigur: () => <PrisomraderFigur />,
  EnergiRegningKalkulator: () => <EnergiRegningKalkulator />,
};
