import type { ReactNode } from "react";

import { Seksjon } from "./00-seksjon-0";
import { JordskjelvfysikkHarryFieldingReid } from "./01-jordskjelvfysikk-harry-fielding-reid";
import { SeismiskeBolgerOgOppdagelsenAvJ } from "./02-seismiske-bolger-og-oppdagelsen-av-j";
import { MalingAvJordskjelvSeismogramTids } from "./03-maling-av-jordskjelv-seismogram-tids";
import { PlategrenserOgDypeSkjelvWadatiB } from "./04-plategrenser-og-dype-skjelv-wadati-b";
import { NorskSeismisitetOgGeofarerHvorfo } from "./05-norsk-seismisitet-og-geofarer-hvorfo";
import { TsunamifysikkBolgehastighetOppstui } from "./06-tsunamifysikk-bolgehastighet-oppstui";
import { JordskjelvsikringOgKonstruksjonste } from "./07-jordskjelvsikring-og-konstruksjonste";
import { ViktigeFagligeBegreper } from "./08-viktige-faglige-begreper";
import { Seksjon2 } from "./09-seksjon-9";

export const JORDSKJELV_SEKSJONER: Array<() => ReactNode> = [
  Seksjon,
  JordskjelvfysikkHarryFieldingReid,
  SeismiskeBolgerOgOppdagelsenAvJ,
  MalingAvJordskjelvSeismogramTids,
  PlategrenserOgDypeSkjelvWadatiB,
  NorskSeismisitetOgGeofarerHvorfo,
  TsunamifysikkBolgehastighetOppstui,
  JordskjelvsikringOgKonstruksjonste,
  ViktigeFagligeBegreper,
  Seksjon2,
];
