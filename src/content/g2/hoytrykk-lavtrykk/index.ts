import type { ReactNode } from "react";

import { HvaErEgentligLufttrykk } from "./00-hva-er-egentlig-lufttrykk";
import { TrykkErRelativtHvorforHpaK } from "./01-trykk-er-relativt-hvorfor-1015-hpa-k";
import { LavtrykkKonvergensHevingOgSkydan } from "./02-lavtrykk-konvergens-heving-og-skydan";
import { HoytrykkSubsidensOppvarmingOgOpp } from "./03-hoytrykk-subsidens-oppvarming-og-opp";
import { VindensFysikkDeTreKrefteneSomS } from "./04-vindens-fysikk-de-tre-kreftene-som-s";
import { LokaleKystkretslopSolgangsbrisSjo } from "./05-lokale-kystkretslop-solgangsbris-sjo";
import { FonvindOrografiskRegnOgLesidevar } from "./06-fonvind-orografisk-regn-og-lesidevar";
import { KatabatiskVindKaldluftsdrenasjeOg } from "./07-katabatisk-vind-kaldluftsdrenasje-og";
import { Seksjon } from "./08-seksjon-8";
import { ViktigeBegreper } from "./09-viktige-begreper";
import { TestDegSelvHoytrykkOgLavtrykk } from "./10-test-deg-selv-hoytrykk-og-lavtrykk";

export const TRYKK_SEKSJONER: Array<() => ReactNode> = [
  HvaErEgentligLufttrykk,
  TrykkErRelativtHvorforHpaK,
  LavtrykkKonvergensHevingOgSkydan,
  HoytrykkSubsidensOppvarmingOgOpp,
  VindensFysikkDeTreKrefteneSomS,
  LokaleKystkretslopSolgangsbrisSjo,
  FonvindOrografiskRegnOgLesidevar,
  KatabatiskVindKaldluftsdrenasjeOg,
  Seksjon,
  ViktigeBegreper,
  TestDegSelvHoytrykkOgLavtrykk,
];
