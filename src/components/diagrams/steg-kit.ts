/** Hjelpere for stegfigurene (steg-figur.tsx), i egen fil slik at komponentfila bare eksporterer komponenter. */
import { createElement, type ReactNode } from "react";
import { StegFigur, type Bilde, type Def } from "./steg-figur";

export const r1 = (v: number) => Math.round(v * 10) / 10;

export function lagFigur<S extends Bilde>(def: Def<S>) {
  return function Figur({ heading, caption }: { heading?: string; caption?: ReactNode }) {
    return createElement(StegFigur<S>, { def, heading, caption });
  };
}
