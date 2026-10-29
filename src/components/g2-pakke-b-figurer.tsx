import type { JSX } from "react";
import { FigSkyerNivaaer, FigNedborTyper, FigKlimadiagramKystInnland } from "./diagrams/g2b-skyer";
import { FigKoppenNorge } from "./diagrams/g2b-koppen";
import { FigNaturligTidsskalaer, FigSolflekker, FigTektonikkKarbon, FigNaturligVsMenneskelig } from "./diagrams/g2b-n6";
import { FigHavbunnenProfil, FigVannmasserAtlanterhavet } from "./diagrams/g2b-hav";
import { FigSaffirSimpsonSkala, FigBlokkering, FigEkstremerOppvarming } from "./diagrams/g2b-vaer";
import { FigNorgeFramskrivninger, FigTilpasningsgrenser } from "./diagrams/g2b-t7";

/** Ferdige figurer i pakke B. Nøkkelen er widget-id-en i markdown. */
export const G2_PAKKE_B_FERDIGE: Record<string, () => JSX.Element> = {
  FigSkyerNivaaer: () => <FigSkyerNivaaer />,
  FigNedborTyper: () => <FigNedborTyper />,
  FigKlimadiagramKystInnland: () => <FigKlimadiagramKystInnland />,
  FigKoppenNorge: () => <FigKoppenNorge />,
  FigNaturligTidsskalaer: () => <FigNaturligTidsskalaer />,
  FigSolflekker: () => <FigSolflekker />,
  FigTektonikkKarbon: () => <FigTektonikkKarbon />,
  FigNaturligVsMenneskelig: () => <FigNaturligVsMenneskelig />,
  FigHavbunnenProfil: () => <FigHavbunnenProfil />,
  FigVannmasserAtlanterhavet: () => <FigVannmasserAtlanterhavet />,
  FigSaffirSimpsonSkala: () => <FigSaffirSimpsonSkala />,
  FigBlokkering: () => <FigBlokkering />,
  FigEkstremerOppvarming: () => <FigEkstremerOppvarming />,
  FigNorgeFramskrivninger: () => <FigNorgeFramskrivninger />,
  FigTilpasningsgrenser: () => <FigTilpasningsgrenser />,
};
