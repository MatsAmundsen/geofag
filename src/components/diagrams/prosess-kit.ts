/**
 * Prosess-kit (logikk): felles byggeklosser for animerte prosessmodeller (Bergarter og senere andre kapitler).
 *
 * - `useTidslinje`: kontinuerlig tidslinje over N faser, med pause på slutten av hver fase,
 *   scrubbing og stegvalg. Alle tidslinjer deler én requestAnimationFrame-løkke, og bare én modell
 *   spiller om gangen: den brukeren sist startet, ellers den som er mest synlig. De andre venter
 *   (vises som pauset) til de får tur. Respekterer prefers-reduced-motion via
 *   `useAnimationPlaying` (starter pauset, steg viser sluttbilde).
 * Komponentene ligger i prosess-figur.tsx.
 * - `TidslinjeKontroller`: stegknapper (synkronisert med statusteksten) + scrubber (native range,
 *   tastaturstyrt, aria-valuetext).
 * - `tidslinjeVerdi`: interpolerer nøkkelbilder langs tidslinjen.
 * - `Zoomlinse`: rund linse med kobling til punktet den forstørrer.
 * - `lagKornTekstur` / `KornLag`: deterministisk (seedet) korntekstur, SSR-trygg og billig.
 * - `Maalere`: HTML-målere (dyp, temperatur, trykk, tid, porøsitet), relative eller med tekst.
 */
import { useEffect, useRef, useState, type RefObject } from "react";
import { settTick, slipp, taOver, useDeltaker } from "./avspilling";
import { clamp, lerp, smooth, smoothPath } from "./isbre-kit";
import { scaledStepClock } from "./motion-config";
import { useAnimationPlaying, useChoiceAnnouncement } from "./use-motion";

/* ---------- tidslinje ---------- */

export type Tidslinje = {
  /** Posisjon på tidslinjen, 0 … antall faser. Fase k går fra k−1 til k. */
  p: number;
  /**
   * Aktiv fase, 1-basert. Under avspilling er det fasen som spilles (p i (k−1, k] gir k).
   * Står tidslinjen stille, er det nærmeste sluttbilde, så et lite skyv fra et parkert steg ikke bytter steg.
   */
  fase: number;
  /** Fremdrift i aktiv fase, 0 … 1 (lineær). */
  lokal: number;
  /** Sekunder animasjonen har spilt (for partikler). Står stille når pauset. */
  sek: number;
  antall: number;
  playing: boolean;
  /** Til IsbreFigur `playing`: av under avspilling, men polite i opplesingsholdet etter et valg. */
  livePlaying: boolean;
  reduced: boolean;
  toggle: () => void;
  /**
   * Brukervalg som endrer bildet (f.eks. en bryter): pauser avspillingen og leser opp ny status.
   * Under avspilling settes statusfeltet til polite først, og valget brukes i neste rendering.
   */
  valg: (apply: () => void) => void;
  /** Hopp til slutten av fase n (sluttbildet) og pause. */
  velgFase: (n: number) => void;
  /** Sett posisjon (scrubber) og pause. */
  settP: (p: number) => void;
};

export function faseAv(p: number, antall: number, parkert = false) {
  if (parkert) return clamp(Math.round(p), 1, antall);
  return clamp(p <= 0 ? 1 : Math.ceil(p - 1e-9), 1, antall);
}

/** Regnes ut ved første bruk (ikke når modulen lastes), og bare én gang. */
export function lat<T>(lag: () => T): () => T {
  let verdi: T | undefined;
  let ferdig = false;
  return () => {
    if (!ferdig) {
      verdi = lag();
      ferdig = true;
    }
    return verdi as T;
  };
}

/**
 * Kontinuerlig tidslinje. Hver fase spilles på `faseMs` og står så stille i `holdMs`
 * (begge skaleres med felles tempo i motion-config). Etter siste fase starter den på nytt fra 0.
 * Første gang figuren spiller (uten at brukeren har valgt noe), starter den fra 0, ellers vises
 * sluttbildet av fase 1, også ved serverrendering.
 */
export function useTidslinje({
  antall,
  synlig,
  faseMs = 3400,
  holdMs = 1600,
  element,
}: {
  antall: number;
  /** Figuren er på skjermen. Utenfor skjermen går det ingen requestAnimationFrame. */
  synlig: boolean;
  faseMs?: number;
  holdMs?: number;
  /** Figurens element. Brukes til å velge den mest synlige modellen når flere er på skjermen. */
  element?: RefObject<Element | null>;
}): Tidslinje {
  const motion = useAnimationPlaying();
  const announce = useChoiceAnnouncement(motion.playing);
  const { stepMs, holdMs: hold } = scaledStepClock(faseMs, holdMs);
  const [state, setState] = useState({ p: 1, sek: 0 });
  const live = useRef({ p: 1, sek: 0, holdLeft: 0, fresh: true, kjor: false });

  // registrering i den felles avspillingen
  const vilSpille = motion.playing && synlig;
  const { id, aktiv } = useDeltaker({ konkurrerer: true, vilSpille, element });
  // spiller, men en annen modell er valgt: står stille og vises som pauset til den får tur
  const venter = vilSpille && !aktiv;
  const running = vilSpille && aktiv;

  useEffect(() => {
    if (!running) return;
    const r = live.current;
    r.kjor = true;
    if (r.fresh) {
      r.fresh = false;
      r.p = 0;
      r.holdLeft = 0;
    } else if (r.p >= antall) {
      r.p = 0;
      r.holdLeft = 0;
    }
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      if (!r.kjor) return;
      const dt = Math.min(100, now - last);
      last = now;
      r.sek += dt / 1000;
      if (r.holdLeft > 0) {
        r.holdLeft -= dt;
        if (r.holdLeft <= 0 && r.p >= antall) r.p = 0;
      } else {
        const next = r.p + dt / stepMs;
        const boundary = Math.floor(r.p + 1e-9) + 1;
        if (next >= boundary) {
          r.p = boundary;
          r.holdLeft = hold;
        } else r.p = next;
      }
      acc += dt;
      // ca. 30 bilder i sekundet er nok for skjematiske figurer og sparer CPU
      if (acc >= 33) {
        acc = 0;
        setState({ p: r.p, sek: r.sek });
      }
    };
    settTick(id, loop);
    return () => {
      r.kjor = false;
      settTick(id, null);
    };
  }, [running, antall, stepMs, hold, id]);

  const playing = motion.playing && !venter;
  const pause = () => {
    // stopp løkken med en gang, så den ikke flytter p før pausen er rendret
    live.current.kjor = false;
    live.current.fresh = false;
    slipp(id);
    if (motion.playing) motion.toggle();
  };
  const valg = (apply: () => void) =>
    announce.choose(() => {
      apply();
      pause();
    });
  const sett = (p: number) =>
    valg(() => {
      const r = live.current;
      r.p = clamp(p, 0, antall);
      r.holdLeft = Number.isInteger(r.p) ? hold : 0;
      setState({ p: r.p, sek: r.sek });
    });

  const p = state.p;
  // en ventende modell står midt i en fase og vises som under avspilling (ikke avrundet)
  const fase = faseAv(p, antall, !motion.playing);
  return {
    p,
    fase,
    lokal: clamp(p - (faseAv(p, antall) - 1)),
    sek: state.sek,
    antall,
    playing,
    livePlaying: announce.livePlaying && !venter,
    reduced: motion.reduced,
    toggle: () => {
      live.current.fresh = false;
      if (venter) {
        // «Spill av» på en ventende modell: den tar over, de andre venter
        taOver(id);
        return;
      }
      if (motion.playing) slipp(id);
      else taOver(id);
      announce.toggle(motion.toggle);
    },
    valg,
    velgFase: (n: number) => sett(n),
    settP: sett,
  };
}

/**
 * Interpolerer nøkkelbilder langs tidslinjen. `bilder[k]` er tilstanden ved p = k
 * (bilder.length = antall + 1). Overgangen i hver fase er myk (smoothstep).
 */
export function tidslinjeVerdi<T extends Record<string, number>>(bilder: T[], p: number): T {
  const last = bilder.length - 1;
  const pc = clamp(p, 0, last);
  const k = Math.min(last - 1, Math.floor(pc));
  const t = smooth(pc - k);
  const a = bilder[k];
  const b = bilder[k + 1];
  const out = {} as Record<string, number>;
  for (const key of Object.keys(a)) out[key] = lerp(a[key], b[key], t);
  return out as T;
}

/* ---------- korntekstur ---------- */

/** Liten deterministisk PRNG (mulberry32). Samme seed gir samme tekstur på server og klient. */
export function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Korn = {
  /** Sentrum i enhetskoordinater (linsen er enhetssirkelen). */
  x: number;
  y: number;
  r: number;
  /** Omriss relativt til sentrum, i enhetskoordinater. Skaleres med `KornLag`. */
  form: [number, number][];
  type: number;
  /** 0 … 1, til forsinkelser og variasjon. */
  frø: number;
};

const teksturCache = new Map<string, Korn[]>();

function kornForm(
  rnd: () => number,
  r: number,
  kanter: number,
  strekkSpenn: [number, number] = [0.8, 1.1],
  roter = true,
): [number, number][] {
  const vriTall = rnd() * Math.PI * 2;
  const vri = roter ? vriTall : 0;
  const strekk = lerp(strekkSpenn[0], strekkSpenn[1], rnd());
  const form: [number, number][] = [];
  for (let i = 0; i < kanter; i++) {
    const a = (i / kanter) * Math.PI * 2;
    const rr = r * (0.86 + rnd() * 0.16);
    const lx = Math.cos(a) * rr;
    const ly = Math.sin(a) * rr * strekk;
    form.push([lx * Math.cos(vri) - ly * Math.sin(vri), lx * Math.sin(vri) + ly * Math.cos(vri)]);
  }
  return form;
}

/**
 * Korntekstur uten overlapp: kornene ligger på et rystet sekskantgitter med varierende størrelse,
 * og små korn fyller noen av hullene mellom tre naboer. Lineær tid (ingen forkastingsløkke),
 * så serveren bruker under ett millisekund. Resultatet caches per parametersett.
 *
 * Koordinatene er enhetskoordinater. `inni(x, y, r)` velger hvilke korn som tas med (f.eks. bare
 * de som kan bli synlige i en linse), så det ikke ligger skjulte stier i figuren.
 */
export function lagKornTekstur({
  seed,
  avstand,
  bredde = 2.3,
  hoyde = 2.3,
  storrelse = [0.6, 1],
  fyllHull = 0.6,
  typer = 2,
  kanter = 9,
  inni,
  nokkel = "",
  strekk = [0.8, 1.1],
  roter = true,
}: {
  seed: number;
  /** Gitteravstand mellom kornsentre. Største korn får radius ≈ avstand/2. */
  avstand: number;
  bredde?: number;
  hoyde?: number;
  /** Radius som andel av halv gitteravstand: [min, maks]. */
  storrelse?: [number, number];
  /** Sannsynlighet for et lite korn i hvert hull mellom tre naboer. */
  fyllHull?: number;
  typer?: number;
  kanter?: number;
  inni?: (x: number, y: number, r: number) => boolean;
  /** Skiller cache-oppføringer når `inni` varierer. */
  nokkel?: string;
  /** Forhold mellom kort og lang akse: [min, maks]. Lave verdier gir avlange korn. */
  strekk?: [number, number];
  /** Tilfeldig retning per korn. Av: lang akse langs x, så figuren kan rotere kornet selv. */
  roter?: boolean;
}): Korn[] {
  const key = [seed, avstand, bredde, hoyde, storrelse.join(","), fyllHull, typer, kanter, nokkel, strekk.join(","), roter].join("|");
  const hit = teksturCache.get(key);
  if (hit) return hit;
  const rnd = prng(seed);
  const d = avstand;
  const rowH = (d * Math.sqrt(3)) / 2;
  const cols = Math.ceil(bredde / d) + 2;
  const rows = Math.ceil(hoyde / rowH) + 2;
  const gitter: Korn[][] = [];
  const alle: Korn[] = [];
  for (let j = 0; j < rows; j++) {
    const rad: Korn[] = [];
    for (let i = 0; i < cols; i++) {
      const bx = -bredde / 2 + i * d + (j % 2 ? d / 2 : 0);
      const by = -hoyde / 2 + j * rowH;
      const r = (d / 2) * lerp(storrelse[0], storrelse[1], rnd()) * 0.97;
      const slakk = Math.max(0, d / 2 - r) * 0.9;
      const a = rnd() * Math.PI * 2;
      const x = bx + Math.cos(a) * slakk * rnd();
      const y = by + Math.sin(a) * slakk * rnd();
      const k: Korn = { x, y, r, form: kornForm(rnd, r, kanter, strekk, roter), type: Math.floor(rnd() * typer), frø: rnd() };
      rad.push(k);
      alle.push(k);
    }
    gitter.push(rad);
  }
  // små korn i hull mellom tre naboer
  for (let j = 0; j + 1 < rows; j++) {
    for (let i = 0; i + 1 < cols; i++) {
      const a = gitter[j][i];
      const b = gitter[j][i + 1];
      const c = gitter[j + 1][j % 2 ? i + 1 : i];
      if (!c || rnd() > fyllHull) continue;
      const mx = (a.x + b.x + c.x) / 3;
      const my = (a.y + b.y + c.y) / 3;
      const plass = Math.min(...[a, b, c].map((n) => Math.hypot(n.x - mx, n.y - my) - n.r)) - d * 0.02;
      if (plass < d * 0.12) continue;
      const r = plass * 0.85;
      alle.push({ x: mx, y: my, r, form: kornForm(rnd, r, kanter, strekk, roter), type: Math.floor(rnd() * typer), frø: rnd() });
    }
  }
  const korn = inni ? alle.filter((k) => inni(k.x, k.y, k.r)) : alle;
  teksturCache.set(key, korn);
  return korn;
}

/** Omrisset til et korn som SVG-sti, skalert til linseradius `s`. */
export function kornSti(k: Korn, s: number) {
  return smoothPath(
    k.form.map(([x, y]) => [x * s, y * s]),
    true,
  );
}

/* ---------- målere ---------- */

export type Maaler = {
  navn: string;
  /** 0 … 1 */
  verdi: number;
  /** Ord for lav og høy ende, f.eks. ["grunt", "dypt"]. */
  ender: [string, string];
  farge: string;
  /** Overstyrer nivåordet (lav/middels/høy). Bruk bare tall som står i fagteksten. */
  tekst?: string;
};

export function nivaa(v: number, [lav, hoy]: [string, string]) {
  if (v < 0.2) return lav;
  if (v > 0.8) return hoy;
  return "middels";
}

