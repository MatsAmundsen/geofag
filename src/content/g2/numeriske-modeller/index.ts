import type { ReactNode } from "react";

import { HvaErEnNumeriskModellFraVisjon } from "./00-hva-er-en-numerisk-modell-fra-visjon";
import { ByggeklosseneDeFysiskePrimitivlig } from "./01-byggeklossene-de-fysiske-primitivlig";
import { RutenettGridOgOpplosningI3d } from "./02-rutenett-grid-og-opplosning-i-3d";
import { ParametriseringFysikkenSomGjemmer } from "./03-parametrisering-fysikken-som-gjemmer";
import { DataassimileringAForankreModellen } from "./04-dataassimilering-a-forankre-modellen";
import { KaosLorenzTeoriOgAtmosfaerensPr } from "./05-kaos-lorenz-teori-og-atmosfaerens-pr";
import { FraDeterminismeTilEnsemblevarslin } from "./06-fra-determinisme-til-ensemblevarslin";
import { TreBruksomraderIGeofagVaervarsli } from "./07-tre-bruksomrader-i-geofag-vaervarsli";
import { Seksjon } from "./08-seksjon";
import { Seksjon2 } from "./09-seksjon";
import { Seksjon3 } from "./10-seksjon";
import { NorgesOperativeModellhierarkiFra } from "./11-norges-operative-modellhierarki-fra-";
import { DenNyeAeraenKunstigIntelligensO } from "./12-den-nye-aeraen-kunstig-intelligens-o";
import { Seksjon4 } from "./13-seksjon";
import { ViktigeBegreperINumeriskModeller } from "./14-viktige-begreper-i-numerisk-modeller";
import { TestDegSelvNumeriskeModeller } from "./15-test-deg-selv-numeriske-modeller";

export const MODELLER_SEKSJONER: Array<() => ReactNode> = [
  HvaErEnNumeriskModellFraVisjon,
  ByggeklosseneDeFysiskePrimitivlig,
  RutenettGridOgOpplosningI3d,
  ParametriseringFysikkenSomGjemmer,
  DataassimileringAForankreModellen,
  KaosLorenzTeoriOgAtmosfaerensPr,
  FraDeterminismeTilEnsemblevarslin,
  TreBruksomraderIGeofagVaervarsli,
  Seksjon,
  Seksjon2,
  Seksjon3,
  NorgesOperativeModellhierarkiFra,
  DenNyeAeraenKunstigIntelligensO,
  Seksjon4,
  ViktigeBegreperINumeriskModeller,
  TestDegSelvNumeriskeModeller,
];
