import type { ReactNode } from "react";

import { Seksjon } from "./00-seksjon";
import { DetSynoptiskeBakkekartetAtmosfaeren } from "./01-1-det-synoptiske-bakkekartet-atmosfaeren";
import { BergensskolenOgPolarfrontensAnatomi } from "./02-2-bergensskolen-og-polarfrontens-anatomi";
import { VertikalstrukturOgSkysekvensOver } from "./03-3-vertikalstruktur-og-skysekvens-over-15";
import { WmoStasjonsmodellenSlikAvkoderDuO } from "./04-4-wmo-stasjonsmodellen-slik-avkoder-du-o";
import { Seksjon2 } from "./05-seksjon";
import { HoydekartOgStyrestromAtmosfaerenI } from "./06-5-hoydekart-og-styrestrom-atmosfaeren-i-";
import { NowcastingVaerradarSatellittOgFare } from "./07-6-nowcasting-vaerradar-satellitt-og-fare";
import { TrinnsMetodeForAAnalysereEtVae } from "./08-7-5-trinns-metode-for-a-analysere-et-vae";
import { CasestudieEnKlassiskAtlantiskHosts } from "./09-8-casestudie-en-klassisk-atlantisk-hosts";
import { EksamensfellerVedVaerkartIGeofag } from "./10-9-eksamensfeller-ved-vaerkart-i-geofag-2";
import { Nokkelbegreper } from "./11-10-nokkelbegreper";
import { TestDegSelvVaerkartOgVaerutvikli } from "./12-11-test-deg-selv-vaerkart-og-vaerutvikli";
import { Seksjon3 } from "./13-seksjon";

export const VAERKART_SEKSJONER: Array<() => ReactNode> = [
  Seksjon,
  DetSynoptiskeBakkekartetAtmosfaeren,
  BergensskolenOgPolarfrontensAnatomi,
  VertikalstrukturOgSkysekvensOver,
  WmoStasjonsmodellenSlikAvkoderDuO,
  Seksjon2,
  HoydekartOgStyrestromAtmosfaerenI,
  NowcastingVaerradarSatellittOgFare,
  TrinnsMetodeForAAnalysereEtVae,
  CasestudieEnKlassiskAtlantiskHosts,
  EksamensfellerVedVaerkartIGeofag,
  Nokkelbegreper,
  TestDegSelvVaerkartOgVaerutvikli,
  Seksjon3,
];
