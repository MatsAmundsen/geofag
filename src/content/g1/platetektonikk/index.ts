import type { ReactNode } from "react";

import { Kompetansemal } from "./00-kompetansemal";
import { Indre } from "./01-indre";
import { Bevis } from "./02-bevis";
import { Drivkrefter } from "./03-drivkrefter";
import { Smelting } from "./04-smelting";
import { Plategrenser } from "./05-plategrenser";
import { Benioff } from "./06-benioff";
import { Ofiolitt } from "./07-ofiolitt";
import { Modell } from "./08-modell";
import { Wilson } from "./09-wilson";
import { Norge } from "./10-norge";
import { Begreper } from "./11-begreper";
import { QuizDel } from "./12-quiz";

export const PLATE_SEKSJONER: Array<() => ReactNode> = [
  Kompetansemal,
  Indre,
  Bevis,
  Drivkrefter,
  Smelting,
  Plategrenser,
  Benioff,
  Ofiolitt,
  Modell,
  Wilson,
  Norge,
  Begreper,
  QuizDel,
];
