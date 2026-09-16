import type { ReactNode } from "react";

import { HvaErEgentligCorioliseffektenFys } from "./00-hva-er-egentlig-corioliseffekten-fys";
import { HvorforAvboyesAllBevegelseBadeN } from "./01-hvorfor-avboyes-all-bevegelse-bade-n";
import { CoriolisparameterenOgBreddegradF } from "./02-coriolisparameteren-og-breddegrad-f-";
import { KlassiskeKraftbalanserIAtmosfaere } from "./03-klassiske-kraftbalanser-i-atmosfaere";
import { SkalaOgRossbyTalletRoDetEndeli } from "./04-skala-og-rossby-tallet-ro-det-endeli";
import { CoriolisIVerdenshaveneEkmanSpira } from "./05-coriolis-i-verdenshavene-ekman-spira";
import { UtforskSelvInteraktivtCoriolisLa } from "./06-utforsk-selv-interaktivt-coriolis-la";
import { Seksjon } from "./07-seksjon-7";
import { ViktigeBegreper } from "./08-viktige-begreper";
import { TestDegSelvCorioliseffekten } from "./09-test-deg-selv-corioliseffekten";

export const CORIOLIS_SEKSJONER: Array<() => ReactNode> = [
  HvaErEgentligCorioliseffektenFys,
  HvorforAvboyesAllBevegelseBadeN,
  CoriolisparameterenOgBreddegradF,
  KlassiskeKraftbalanserIAtmosfaere,
  SkalaOgRossbyTalletRoDetEndeli,
  CoriolisIVerdenshaveneEkmanSpira,
  UtforskSelvInteraktivtCoriolisLa,
  Seksjon,
  ViktigeBegreper,
  TestDegSelvCorioliseffekten,
];
