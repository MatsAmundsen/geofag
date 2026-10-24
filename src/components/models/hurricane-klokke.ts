/**
 * Klokke og redusert bevegelse for orkanmodellen. Egen fil (ikke komponenter), slik at hurricane-deler.tsx
 * bare eksporterer komponenter. Klokka går bare når figuren er på skjermen, fanen er synlig, brukeren ikke
 * ønsker redusert bevegelse og figuren har tur i den felles avspillingen (én figur spiller om gangen).
 */
import { useEffect, useState } from "react";
import { useFellesAvspilling } from "../diagrams/avspilling";
import { useInView } from "../diagrams/isbre-kit";

export function useRedusertBevegelse() {
  const [r, setR] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
    const f = () => setR(mq.matches);
    mq.addEventListener?.("change", f);
    return () => mq.removeEventListener?.("change", f);
  }, []);
  return r;
}

function useFaneSkjult() {
  const [skjult, setSkjult] = useState(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const f = () => setSkjult(document.hidden);
    f();
    document.addEventListener("visibilitychange", f);
    return () => document.removeEventListener("visibilitychange", f);
  }, []);
  return skjult;
}

/** Sekunder siden start, oppdatert med om lag 30 bilder i sekundet mens `kjor` er sann. */
function useKlokke(kjor: boolean) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!kjor) return;
    let id = 0;
    let forrige = performance.now();
    let akk = 0;
    const steg = (n: number) => {
      akk += Math.min(0.1, (n - forrige) / 1000);
      forrige = n;
      if (akk >= 1 / 30) {
        const d = akk;
        akk = 0;
        setT((v) => v + d);
      }
      id = requestAnimationFrame(steg);
    };
    id = requestAnimationFrame(steg);
    return () => cancelAnimationFrame(id);
  }, [kjor]);
  return t;
}

export function useOrkanKlokke<T extends Element>() {
  const redusert = useRedusertBevegelse();
  const [ref, synlig] = useInView<T>();
  const skjult = useFaneSkjult();
  const av = useFellesAvspilling(synlig && !skjult, ref);
  const t = useKlokke(av.playing && synlig && !skjult && !redusert && !av.reduced);
  return { ref, t, spiller: av.playing, toggle: av.toggle, redusert: redusert || av.reduced };
}
