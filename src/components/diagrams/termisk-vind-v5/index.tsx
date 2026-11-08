import { useEffect, useId, useRef, type CSSProperties } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { NOKKEL, STEG, SW, TV5_BILDETEKST, TV5_INGRESS, TV5_SVG_TITTEL, TV5_TITTEL } from "./data";
import { monterTermiskVind } from "./motor";
import "./termisk-vind-v5.css";

const stil = (css: string): CSSProperties => {
  const i = css.indexOf(":");
  return { [css.slice(0, i)]: css.slice(i + 1) } as CSSProperties;
};

/** Modellen «Termisk vind» fra godkjent frittstående v5, som native React-komponent (ThermalWind på /tema/jetstrommer). */
export function TermiskVindV5() {
  const rot = useRef<HTMLDivElement>(null);
  const p = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  useEffect(() => {
    if (!rot.current) return;
    const m = monterTermiskVind(rot.current);
    return () => m.rydd();
  }, []);
  const id = (n: string) => `${p}-${n}`;
  const u = (n: string) => `url(#${id(n)})`;
  return (
    <FigureFrame
      heading={TV5_TITTEL}
      caption={
        <>
          <b>Termisk vind.</b> <em>{TV5_BILDETEKST}</em>
        </>
      }
    >
      <div className="tv5" ref={rot} data-figur="termisk-vind-v5">
        <div className="tv5-innhold">
          <p className="ingress">{TV5_INGRESS}</p>
          <div className="ctrl">
            <button type="button" className="hoved" data-tv="spill">
              Spill av
            </button>
            <button type="button" data-tv="forrige" disabled>
              Forrige steg
            </button>
            <button type="button" data-tv="neste">
              Neste steg
            </button>
            <button type="button" data-tv="nullstill">
              Start på nytt
            </button>
          </div>
          <ol className="steg" aria-label="Steg i modellen" data-tv="stegliste">
            {STEG.map((S, i) => (
              <li key={i}>
                <button type="button" aria-current={i === 0 ? "step" : undefined}>{`${i + 1}. ${S.n}`}</button>
              </li>
            ))}
          </ol>
          <div className="ramme">
            <svg className="tv5-band" data-tv="bandTopp" viewBox="0 0 960 150" aria-hidden="true" />
            <svg data-tv="svg" viewBox="0 0 960 560" role="img" aria-labelledby={`${id("t")} ${id("d")}`}>
              <title id={id("t")}>{TV5_SVG_TITTEL}</title>
              <desc id={id("d")} data-tv="svgD">{`Steg 1: ${STEG[0].t}. ${STEG[0].x}`}</desc>
              <defs>
                <linearGradient id={id("tempgrad")} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#f0a98f" stopOpacity=".75" />
                  <stop offset=".38" stopColor="#f6cdb9" stopOpacity=".6" />
                  <stop offset=".62" stopColor="#d4e9f6" stopOpacity=".7" />
                  <stop offset="1" stopColor="#bde0f5" stopOpacity=".9" />
                </linearGradient>
                <marker id={id("pR")} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0L10 5L0 10z" fill="#c2311f" />
                </marker>
                <marker id={id("pB")} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0L10 5L0 10z" fill="#1d6fa5" />
                </marker>
                <linearGradient id={id("stratograd")} x1="0" x2="1">
                  <stop offset="0" stopColor="#bde0f5" stopOpacity=".55" />
                  <stop offset="1" stopColor="#f0a98f" stopOpacity=".45" />
                </linearGradient>
                <clipPath id={id("strato")}>
                  <path data-tv="stratoClip" />
                </clipPath>
                <clipPath id={id("tropo")}>
                  <path data-tv="tropoClip" />
                </clipPath>
              </defs>
              <rect x="60" y="20" width="840" height="450" fill="#f4f8fb" />
              <g clipPath={u("tropo")}>
                <rect x="60" y="20" width="840" height="450" fill="#ece8e2" />
                <rect data-tv="temp" x="60" y="20" width="840" height="450" fill={u("tempgrad")} opacity="0" />
              </g>
              <g clipPath={u("strato")}>
                <rect data-tv="stratoTemp" x="60" y="20" width="840" height="450" fill={u("stratograd")} opacity="0" />
              </g>
              <path data-tv="flate4" fill="none" stroke="#1f2a33" strokeWidth="2" strokeDasharray="14 5" />
              <path data-tv="trop" fill="none" stroke="#5b6b77" strokeWidth="2.4" strokeDasharray="9 6" />
              <g data-tv="flater" fill="none" stroke="#1f2a33" strokeWidth="2" />
              <g data-tv="hoyde" opacity="0">
                <line x1="250" x2="710" stroke="#5b6b77" strokeWidth="2" strokeDasharray="3 6" data-tv="hLinje" />
              </g>
              <g data-tv="krefter" opacity="0">
                <line data-tv="pgf" stroke="#c2311f" strokeWidth="5" markerEnd={u("pR")} />
                <line data-tv="cor" stroke="#1d6fa5" strokeWidth="5" markerEnd={u("pB")} opacity="0" />
              </g>
              <g data-tv="vind" />
              <line x1="60" x2="900" y1="470" y2="470" stroke="#6b5a45" strokeWidth="3" />
              <rect x="60" y="472" width="840" height="14" fill="#d9a56b" opacity=".55" />
              <g data-tv="merkeLedere" className="mob" />
              <g data-tv="etiketter" className="desk" fontSize="18" fontWeight="600" />
              <g fontSize="18" fontWeight="700" fill="#4a5a66" className="desk">
                <text x="66" y="518">Sør (mot ekvator)</text>
                <text x="894" y="518" textAnchor="end">
                  Nord (mot polen)
                </text>
              </g>
            </svg>
            <svg className="tv5-band" data-tv="bandBunn" viewBox="0 0 960 150" aria-hidden="true" />
            {/* Mobil: Sør/Nord som HTML under tegneflaten, så teksten ikke skaleres ned med SVG-en og ikke ligger tett på bakkefeltet. */}
            <div className="mob-akse" aria-hidden="true">
              <span>Sør</span>
              <span>Nord</span>
            </div>
          </div>
          <div className="stabel" data-tv="nokkelstabel" aria-hidden="true">
            {NOKKEL.map((rader, s) => (
              <ol key={s} className={s === 0 ? "nokkel aktiv" : "nokkel"}>
                {rader.map(([b, sw, t], i) => (
                  <li key={i}>
                    {b ? <b className="mob">{b}</b> : null}
                    <i style={stil(SW[sw])} />
                    {t}
                  </li>
                ))}
              </ol>
            ))}
          </div>
          <div className="stabel forklaring" data-tv="forklaring">
            {STEG.map((S, i) => (
              <div key={i} className={i === 0 ? "aktiv" : undefined}>
                <strong>{`Steg ${i + 1} av ${STEG.length}: ${S.t}`}</strong>
                <span>{S.x}</span>
              </div>
            ))}
          </div>
          <p className="sr" aria-live="polite" data-tv="live" />
          <ul className="tegn" aria-hidden="true">
            <li><i style={{ background: "#f0a98f" }} />varmere luft</li>
            <li><i style={{ background: "#bde0f5" }} />kaldere luft</li>
            <li><i style={{ background: "linear-gradient(#1f2a33,#1f2a33) center/100% 2px no-repeat" }} />trykkflate</li>
            <li><i style={{ background: "repeating-linear-gradient(90deg,#5b6b77 0 6px,transparent 6px 10px) center/100% 3px no-repeat" }} />tropopause</li>
            <li><i style={{ background: "radial-gradient(circle,#1f2a33 25%,#fff 30%,#fff 55%,#1f2a33 60%,#1f2a33 70%,transparent 72%)" }} />vind ut av arket, mot øst (større symbol = sterkere vind)</li>
          </ul>
        </div>
      </div>
    </FigureFrame>
  );
}
