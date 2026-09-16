import type { ReactNode } from "react";

import { Seksjon } from "./00-seksjon-0";
import { JordensIndreTermiskeMotorOgDyna } from "./01-jordens-indre-termiske-motor-og-dyna";
import { MagmakjemiSilikatinnholdSioOgVis } from "./02-magmakjemi-silikatinnhold-sio-og-vis";
import { VulkantyperOgGeomorfologiHvordan } from "./03-vulkantyper-og-geomorfologi-hvordan-";
import { AnatomiAvEtPlinianskUtbruddFra } from "./04-anatomi-av-et-pliniansk-utbrudd-fra-";
import { Seksjon2 } from "./05-seksjon-5";
import { Seksjon3 } from "./06-seksjon-6";
import { Seksjon4 } from "./07-seksjon-7";
import { Seksjon5 } from "./08-seksjon-8";
import { VulkanskeFarerOgGlobalKlimapavir } from "./09-vulkanske-farer-og-global-klimapavir";
import { NorskVulkanismeJanMayenOgBeeren } from "./10-norsk-vulkanisme-jan-mayen-og-beeren";
import { ViktigeFagligeBegreper } from "./11-viktige-faglige-begreper";
import { TestDegSelv } from "./12-test-deg-selv";

export const VULKANER_SEKSJONER: Array<() => ReactNode> = [
  Seksjon,
  JordensIndreTermiskeMotorOgDyna,
  MagmakjemiSilikatinnholdSioOgVis,
  VulkantyperOgGeomorfologiHvordan,
  AnatomiAvEtPlinianskUtbruddFra,
  Seksjon2,
  Seksjon3,
  Seksjon4,
  Seksjon5,
  VulkanskeFarerOgGlobalKlimapavir,
  NorskVulkanismeJanMayenOgBeeren,
  ViktigeFagligeBegreper,
  TestDegSelv,
];
