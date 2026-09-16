import type { ReactNode } from "react";

import { HvaErEnJetstromAtmosfaerensHoyh } from "./00-hva-er-en-jetstrom-atmosfaerens-hoyh";
import { KlodensToJetbelterPolarfrontjeten } from "./01-klodens-to-jetbelter-polarfrontjeten";
import { FysikkenBakJetstrommenTermiskVin } from "./02-fysikken-bak-jetstrommen-termisk-vin";
import { ZonalOgMeridionalFormRossbybolge } from "./03-zonal-og-meridional-form-rossbybolge";
import { JetkjernenJetStreakOgSyklonenes } from "./04-jetkjernen-jet-streak-og-syklonenes-";
import { AtmosfaeriskBlokkeringOmegaBlokk } from "./05-atmosfaerisk-blokkering-omega-blokk-";
import { ArstidsvariasjonVinterjetVsSommer } from "./06-arstidsvariasjon-vinterjet-vs-sommer";
import { KlimasvingningerOgStormbanerNaoO } from "./07-klimasvingninger-og-stormbaner-nao-o";
import { Seksjon } from "./08-seksjon-8";
import { ViktigeBegreper } from "./09-viktige-begreper";
import { TestDegSelvJetstrommerOgStormba } from "./10-test-deg-selv-jetstrommer-og-stormba";

export const JET_SEKSJONER: Array<() => ReactNode> = [
  HvaErEnJetstromAtmosfaerensHoyh,
  KlodensToJetbelterPolarfrontjeten,
  FysikkenBakJetstrommenTermiskVin,
  ZonalOgMeridionalFormRossbybolge,
  JetkjernenJetStreakOgSyklonenes,
  AtmosfaeriskBlokkeringOmegaBlokk,
  ArstidsvariasjonVinterjetVsSommer,
  KlimasvingningerOgStormbanerNaoO,
  Seksjon,
  ViktigeBegreper,
  TestDegSelvJetstrommerOgStormba,
];
