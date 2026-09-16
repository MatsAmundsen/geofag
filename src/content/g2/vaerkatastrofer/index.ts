import type { ReactNode } from "react";

import { SammeFysikkHoyereInnsatsNaturfare } from "./00-1-samme-fysikk-hoyere-innsats-naturfare-";
import { TropiskeSyklonerHavetsLatenteVarme } from "./01-2-tropiske-sykloner-havets-latente-varme";
import { OrkanensAnatomiOgDestruksjonskrefte } from "./02-3-orkanens-anatomi-og-destruksjonskrefte";
import { TornadoerOgSupercellerNaturensMest } from "./03-4-tornadoer-og-superceller-naturens-mest";
import { NorgesStormmaskinPolarfrontenOgEks } from "./04-5-norges-stormmaskin-polarfronten-og-eks";
import { PolareLavtrykkArktiskeMiniOrkaner } from "./05-6-polare-lavtrykk-arktiske-mini-orkaner";
import { EkstremnedborAtmosfaeriskeElverOgO } from "./06-7-ekstremnedbor-atmosfaeriske-elver-og-o";
import { StormfloNarHavetHevesOgStablesMo } from "./07-8-stormflo-nar-havet-heves-og-stables-mo";
import { KlimaendringerTilskrivingOgBeredska } from "./08-9-klimaendringer-tilskriving-og-beredska";
import { Seksjon } from "./09-seksjon";
import { ViktigeBegreper } from "./10-viktige-begreper";
import { TestDegSelvVaerkatastrofer } from "./11-test-deg-selv-vaerkatastrofer";

export const KATASTROFER_SEKSJONER: Array<() => ReactNode> = [
  SammeFysikkHoyereInnsatsNaturfare,
  TropiskeSyklonerHavetsLatenteVarme,
  OrkanensAnatomiOgDestruksjonskrefte,
  TornadoerOgSupercellerNaturensMest,
  NorgesStormmaskinPolarfrontenOgEks,
  PolareLavtrykkArktiskeMiniOrkaner,
  EkstremnedborAtmosfaeriskeElverOgO,
  StormfloNarHavetHevesOgStablesMo,
  KlimaendringerTilskrivingOgBeredska,
  Seksjon,
  ViktigeBegreper,
  TestDegSelvVaerkatastrofer,
];
