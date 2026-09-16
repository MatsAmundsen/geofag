import type { ReactNode } from "react";

import { HvaEr } from "./01-hva-er";
import { Utforsk } from "./02-utforsk";
import { Walker } from "./03-walker";
import { Elnino } from "./04-elnino";
import { Lanina } from "./05-lanina";
import { EnsoModell } from "./06-modell";
import { Indekser } from "./07-indekser";
import { Telekoblinger } from "./08-telekoblinger";
import { Varmere } from "./09-varmere";
import { AaretsWrap } from "./10-aarets";
import { Eksamen } from "./11-eksamen";
import { BegreperQuiz } from "./12-begreper-quiz";

export const ENSO_SEKSJONER: Array<() => ReactNode> = [
  HvaEr,
  Utforsk,
  Walker,
  Elnino,
  Lanina,
  EnsoModell,
  Indekser,
  Telekoblinger,
  Varmere,
  AaretsWrap,
  Eksamen,
  BegreperQuiz,
];
