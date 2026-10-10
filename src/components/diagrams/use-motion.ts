import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function reducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function reducedMotionServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, reducedMotionSnapshot, reducedMotionServerSnapshot);
}

/**
 * Plays by default. If the user prefers reduced motion, stays paused until they press start.
 * `motionClass` opts that subtree out of the global reduced-motion freeze after an explicit start.
 */
export function useAnimationPlaying() {
  const reduced = usePrefersReducedMotion();
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? !reduced;
  return {
    playing,
    reduced,
    toggle: () => setChoice(!playing),
    motionClass: playing ? "motion-unlocked" : "",
  };
}

/**
 * Status region stays `aria-live=polite` after a user choice, including while
 * the animation is still playing. Playback turns the region off again.
 * The choice is applied after the region has become polite, so the new text is announced.
 */
export function useChoiceAnnouncement(playing: boolean) {
  const [hold, setHold] = useState(false);
  const [tick, setTick] = useState(0);
  const queued = useRef<(() => void) | null>(null);
  useEffect(() => {
    if (!hold) return;
    const apply = queued.current;
    queued.current = null;
    apply?.();
    const id = window.setTimeout(() => setHold(false), 1600);
    return () => window.clearTimeout(id);
  }, [hold, tick]);
  return {
    livePlaying: playing && !hold,
    choose(apply: () => void) {
      if (!playing) {
        apply();
        return;
      }
      queued.current = apply;
      setTick((current) => current + 1);
      setHold(true);
    },
    toggle(togglePlaying: () => void) {
      if (!playing) setHold(false);
      togglePlaying();
    },
  };
}

export function useStepCycle(count: number, playing: boolean, ms = 2800) {
  const [step, setStep] = useState(1);
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStep((current) => (current >= count ? 1 : current + 1));
    }, ms);
    return () => window.clearInterval(id);
  }, [count, ms, playing]);
  return [step, setStep] as const;
}
