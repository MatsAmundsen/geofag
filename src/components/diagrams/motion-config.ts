/**
 * Felles tempo for steganimasjoner. Øk STEP_TEMPO for roligere animasjoner.
 */
export const STEP_TEMPO = 2;
/** Minste tid (ms) sluttbildet i et steg står stille før neste steg. */
export const MIN_HOLD_MS = 4000;
/** Overgangen mellom steg gjøres litt roligere. */
export const TRANSITION_TEMPO = 1.25;

export function scaledCycleMs(ms: number) {
  return ms * STEP_TEMPO;
}

export function scaledStepClock(stepMs: number, holdMs: number) {
  return {
    stepMs: Math.round(stepMs * TRANSITION_TEMPO),
    holdMs: Math.max(holdMs * STEP_TEMPO, MIN_HOLD_MS),
  };
}

/** Norge–Grønland-tidsskyveren: varighet for hele forløpet og pause på slutten. */
export const NH_DURATION_MS = 18000;
export const NH_END_HOLD_MS = 4000;
