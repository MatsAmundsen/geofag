/**
 * Felles avspilling for animerte figurer:
 *
 * - Én requestAnimationFrame-løkke for alle figurer som bruker den (prosess-kit-tidslinjer og
 *   `useStepClock`), i stedet for én løkke per figur.
 * - Bare én «konkurrerende» figur spiller om gangen: den brukeren sist startet, ellers den som er
 *   mest synlig. De andre venter (vises som pauset) til de får tur.
 * - Pause betyr pause (WCAG 2.2.2): når brukeren pauser en figur, starter ingen annen figur av seg
 *   selv før brukeren starter en figur igjen.
 *
 * Modulen har ingen avhengigheter til figurkoden, så både isbre-kit og prosess-kit kan bruke den.
 */
import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";
import { useAnimationPlaying } from "./use-motion";

type Deltaker = {
  /** Konkurrerer om å være den ene som spiller. Ellers tikker den fritt når den har en tick. */
  konkurrerer: boolean;
  vilSpille: boolean;
  element?: RefObject<Element | null>;
  tick: ((now: number) => void) | null;
};

const deltakere = new Map<number, Deltaker>();
const lyttere = new Set<() => void>();
let nesteId = 1;
let aktivId = 0;
/** Den brukeren sist startet. Får spille så lenge den vil og er på skjermen. */
let foretrukket = 0;
/** Brukeren har pauset: ingen figur får spille før brukeren starter en igjen. */
let brukerPauset = false;
let raf = 0;
let sistVurdert = 0;

/** Andel av figuren som er innenfor vinduet (0 … 1), med avstand fra midten som tie-break. */
function synligAndel(d: Deltaker) {
  const el = d.element?.current;
  if (!el || typeof window === "undefined") return 0;
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const over = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
  const andel = over / Math.max(1, Math.min(r.height, vh));
  const midt = Math.abs((r.top + r.bottom) / 2 - vh / 2) / vh;
  return andel - midt * 0.01;
}

function vurder() {
  let best = 0;
  const fav = foretrukket ? deltakere.get(foretrukket) : undefined;
  if (fav?.konkurrerer && fav.vilSpille) best = foretrukket;
  else if (!brukerPauset) {
    let score = -Infinity;
    for (const [id, d] of deltakere) {
      if (!d.konkurrerer || !d.vilSpille) continue;
      const s = synligAndel(d);
      if (s > score) {
        score = s;
        best = id;
      }
    }
  }
  if (best !== aktivId) {
    aktivId = best;
    for (const l of lyttere) l();
  }
  start();
}

function harArbeid() {
  for (const [id, d] of deltakere) if (d.tick && (!d.konkurrerer || id === aktivId)) return true;
  return false;
}

function start() {
  if (!raf && typeof requestAnimationFrame !== "undefined" && harArbeid()) raf = requestAnimationFrame(loop);
}

function loop(now: number) {
  raf = 0;
  // hvem som er mest synlig, vurderes et par ganger i sekundet, ikke hver bilderute
  if (now - sistVurdert > 400) {
    sistVurdert = now;
    vurder();
  }
  for (const [id, d] of deltakere) if (d.tick && (!d.konkurrerer || id === aktivId)) d.tick(now);
  if (!raf) start();
}

function lytt(l: () => void) {
  lyttere.add(l);
  return () => {
    lyttere.delete(l);
  };
}

/** Til tester og feilsøking. */
export function avspillingStatus() {
  return {
    deltakere: deltakere.size,
    aktiv: aktivId,
    foretrukket,
    brukerPauset,
    loepende: raf !== 0,
  };
}

/** Registrerer en deltaker. `aktiv` er alltid sann for deltakere som ikke konkurrerer. */
export function useDeltaker({
  konkurrerer,
  vilSpille,
  element,
}: {
  konkurrerer: boolean;
  vilSpille: boolean;
  element?: RefObject<Element | null>;
}) {
  const idRef = useRef(0);
  if (!idRef.current) idRef.current = nesteId++;
  const id = idRef.current;
  useEffect(() => {
    deltakere.set(id, { konkurrerer, vilSpille: false, element, tick: null });
    return () => {
      deltakere.delete(id);
      if (foretrukket === id) foretrukket = 0;
      vurder();
    };
  }, [id, konkurrerer, element]);
  useEffect(() => {
    const d = deltakere.get(id);
    if (!d) return;
    d.vilSpille = vilSpille;
    vurder();
  }, [id, vilSpille]);
  const aktiv = useSyncExternalStore(
    lytt,
    () => aktivId === id,
    () => false,
  );
  return { id, aktiv: konkurrerer ? aktiv : true };
}

/** Kobler en tick-funksjon til den felles løkken (null kobler fra). */
export function settTick(id: number, tick: ((now: number) => void) | null) {
  const d = deltakere.get(id);
  if (!d) return;
  if (tick === null && d.tick === null) return;
  d.tick = tick;
  if (tick) start();
}

/** Brukeren startet denne: den spiller, de andre venter. */
export function taOver(id: number) {
  foretrukket = id;
  brukerPauset = false;
  vurder();
}

/**
 * Brukeren pauset denne: ingen figur spiller videre av seg selv, heller ikke en figur brukeren startet
 * tidligere. Neste avspilling starter når brukeren trykker «Start» på en figur.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- id beholdes i signaturen for kallestedene
export function slipp(id: number) {
  foretrukket = 0;
  brukerPauset = true;
  vurder();
}

/**
 * Erstatning for `useAnimationPlaying` i eldre figurer: samme form, men figuren deltar i
 * «én spiller om gangen». En figur som venter, får `playing: false` (står stille med sluttbildet og
 * viser «Start»), og «Start» lar den ta over.
 */
export function useFellesAvspilling(synlig: boolean, element?: RefObject<Element | null>) {
  const motion = useAnimationPlaying();
  const vil = motion.playing && synlig;
  const { id, aktiv } = useDeltaker({ konkurrerer: true, vilSpille: vil, element });
  const venter = vil && !aktiv;
  const playing = motion.playing && !venter;
  return {
    playing,
    reduced: motion.reduced,
    motionClass: playing ? motion.motionClass : "",
    toggle: () => {
      if (venter) {
        taOver(id);
        return;
      }
      if (motion.playing) slipp(id);
      else taOver(id);
      motion.toggle();
    },
  };
}
