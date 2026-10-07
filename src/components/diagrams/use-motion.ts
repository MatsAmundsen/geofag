import { useEffect, useState, useSyncExternalStore } from "react";

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
