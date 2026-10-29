import type { JSX } from "react";
import { EnhetstrappFigur } from "./diagrams/enhetstrapp-figur";

/** Ferdige figurer i pakke A. Nøkkelen er widget-id-en i markdown. */
export const G2_PAKKE_A_FERDIGE: Record<string, () => JSX.Element> = {
  EnhetstrappFigur: () => <EnhetstrappFigur />,
};
