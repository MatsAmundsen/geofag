/**
 * Felles animasjon for figurene i «Lokale og regionale værsystemer» (katabatisk vind, føn og
 * temperaturinversjon). Animasjonen er et eget lag oppå den faste figuren: alle etiketter, tall og
 * forklaringer står uendret, og figuren er komplett også når animasjonen står stille.
 *
 * - SMIL (animateMotion/animate) gjør jobben i nettleseren uten React-render per bilde. Når figuren
 *   er pauset eller utenfor skjermen, kalles svg.pauseAnimations(), så CPU-bruken i ro er null.
 * - Deltar i felles avspilling (én figur spiller om gangen, Pause betyr pause, WCAG 2.2.2).
 * - prefers-reduced-motion: står stille til brukeren trykker Start. Partiklene (.lv-p) skjules da i CSS.
 */

const s = (v: number) => `${Math.round(v * 1000) / 1000}s`;

/** n partikler som følger samme bane, jevnt forskjøvet i tid. */
export function Flyt({
  path,
  dur,
  n,
  r = 3,
  fill,
  opacity = 0.8,
  grow,
  fills,
  fillTimes,
  ry,
}: {
  path: string;
  dur: number;
  n: number;
  r?: number;
  fill: string;
  opacity?: number;
  /** Radius ved slutten av banen (røyk som utvider seg). */
  grow?: number;
  /** Fargeforløp langs banen, f.eks. kald → varm. */
  fills?: string;
  /** keyTimes for fills (samme antall som verdiene). */
  fillTimes?: string;
  /** Ellipse i stedet for sirkel (rx = r). */
  ry?: number;
}) {
  return (
    <g className="lv-p" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const begin = s(-(i * dur) / n);
        const kids = (
          <>
            <animateMotion path={path} dur={s(dur)} begin={begin} repeatCount="indefinite" />
            <animate
              attributeName="opacity"
              values={`0;${opacity};${opacity};0`}
              keyTimes="0;0.12;0.82;1"
              dur={s(dur)}
              begin={begin}
              repeatCount="indefinite"
            />
            {fills ? (
              <animate attributeName="fill" values={fills} keyTimes={fillTimes} dur={s(dur)} begin={begin} repeatCount="indefinite" />
            ) : null}
          </>
        );
        if (ry != null)
          return (
            <ellipse key={i} cx={0} cy={0} rx={r} ry={ry} fill={fill} opacity={0}>
              {kids}
              {grow ? (
                <animate attributeName="rx" values={`${r};${grow}`} dur={s(dur)} begin={begin} repeatCount="indefinite" />
              ) : null}
            </ellipse>
          );
        return (
          <circle key={i} cx={0} cy={0} r={r} fill={fill} opacity={0}>
            {kids}
            {grow ? (
              <animate attributeName="r" values={`${r};${grow}`} dur={s(dur)} begin={begin} repeatCount="indefinite" />
            ) : null}
          </circle>
        );
      })}
    </g>
  );
}

/** Strømlinje: en stiplet linje der strekene vandrer langs banen. */
export function Strom({
  d,
  color,
  width = 2,
  dash = "6 10",
  dur = 2,
  opacity = 0.7,
  reverse,
}: {
  d: string;
  color: string;
  width?: number;
  dash?: string;
  dur?: number;
  opacity?: number;
  reverse?: boolean;
}) {
  const sum = dash.split(/\s+/).reduce((a, b) => a + Number(b), 0);
  return (
    <path
      className="lv-p"
      aria-hidden="true"
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dash}
      strokeLinecap="round"
      opacity={opacity}
    >
      <animate
        attributeName="stroke-dashoffset"
        values={reverse ? `0;${sum}` : `${sum};0`}
        dur={s(dur)}
        repeatCount="indefinite"
      />
    </path>
  );
}

/** Blinking/pulsering av opasitet. */
export function Puls({ min, max, dur, begin = 0 }: { min: number; max: number; dur: number; begin?: number }) {
  return (
    <animate
      attributeName="opacity"
      values={`${max};${min};${max}`}
      dur={s(dur)}
      begin={s(-begin)}
      repeatCount="indefinite"
    />
  );
}
