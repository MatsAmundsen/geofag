import type { JSX } from "react";
import { EnhetstrappFigur } from "./diagrams/enhetstrapp-figur";
import { BrukstidFigur } from "./diagrams/g2a-energi";
import { KraftsystemetNorgeFigur } from "./diagrams/g2a-energi";
import { PrisomraderFigur } from "./diagrams/g2a-energi";
import { EnergiRegningKalkulator } from "./diagrams/g2a-kalkulator";
import { VindEffektkurve } from "./diagrams/g2a-vind-tidevann";
import { AmfidromiskFigur } from "./diagrams/g2a-vind-tidevann";
import { SolenergiFigur } from "./diagrams/g2a-sol-salt";
import { SaltkraftFigur } from "./diagrams/g2a-sol-salt";
import { BaerekraftTreFigur } from "./diagrams/g2a-sol-salt";
import { KarbonkretsloepFigur } from "./diagrams/g2a-klima";
import { UtslippSektorFigur } from "./diagrams/g2a-klima";
import { KarbonbudsjettFigur } from "./diagrams/g2a-klima";
import { SspScenarioFigur } from "./diagrams/g2a-klima";
import { NorskeUtslippFigur } from "./diagrams/g2a-klima";
import { TiltaksstigeFigur } from "./diagrams/g2a-tiltak";
import { CdrSkjemaFigur } from "./diagrams/g2a-tiltak";
import { IpccOrganisasjonFigur } from "./diagrams/g2a-forskning";
import { KeelingKurveFigur } from "./diagrams/g2a-forskning";
import { FanerozoikumTemperaturFigur } from "./diagrams/g2a-fanerozoikum";

/** Ferdige figurer i pakke A. Nøkkelen er widget-id-en i markdown. */
export const G2_PAKKE_A_FERDIGE: Record<string, () => JSX.Element> = {
  EnhetstrappFigur: () => <EnhetstrappFigur />,
  BrukstidFigur: () => <BrukstidFigur />,
  KraftsystemetNorgeFigur: () => <KraftsystemetNorgeFigur />,
  PrisomraderFigur: () => <PrisomraderFigur />,
  EnergiRegningKalkulator: () => <EnergiRegningKalkulator />,
  VindEffektkurve: () => <VindEffektkurve />,
  AmfidromiskFigur: () => <AmfidromiskFigur />,
  SolenergiFigur: () => <SolenergiFigur />,
  SaltkraftFigur: () => <SaltkraftFigur />,
  BaerekraftTreFigur: () => <BaerekraftTreFigur />,
  KarbonkretsloepFigur: () => <KarbonkretsloepFigur />,
  UtslippSektorFigur: () => <UtslippSektorFigur />,
  KarbonbudsjettFigur: () => <KarbonbudsjettFigur />,
  SspScenarioFigur: () => <SspScenarioFigur />,
  NorskeUtslippFigur: () => <NorskeUtslippFigur />,
  TiltaksstigeFigur: () => <TiltaksstigeFigur />,
  CdrSkjemaFigur: () => <CdrSkjemaFigur />,
  IpccOrganisasjonFigur: () => <IpccOrganisasjonFigur />,
  KeelingKurveFigur: () => <KeelingKurveFigur />,
  FanerozoikumTemperaturFigur: () => <FanerozoikumTemperaturFigur />,
};
