import type { ReactNode } from "react";

import { HvaEr } from "./01-hva-er";
import { Utforsk } from "./02-utforsk";
import { Motor } from "./03-motor";
import { Positiv } from "./04-positiv";
import { Negativ } from "./05-negativ";
import { Simulator } from "./06-simulator";
import { Indeks } from "./07-indeks";
import { Stratosfare } from "./08-stratosfare";
import { Varmere } from "./09-varmere";
import { EkstremeWrap } from "./10-ekstreme";
import { Eksamen } from "./11-eksamen";
import { BegreperQuiz } from "./12-begreper-quiz";

export const NAO_SEKSJONER: Array<() => ReactNode> = [
  HvaEr,
  Utforsk,
  Motor,
  Positiv,
  Negativ,
  Simulator,
  Indeks,
  Stratosfare,
  Varmere,
  EkstremeWrap,
  Eksamen,
  BegreperQuiz,
];
