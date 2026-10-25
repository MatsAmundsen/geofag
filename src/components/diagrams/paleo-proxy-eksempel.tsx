import { C, Diagram, L } from "./svg-kit";

/**
 * Multi-panel proxy-pakke (A–E) over ca. siste 25 000 år.
 * Forenklet illustrasjon til Collapsible-eksempelet PaleoProxyEksempel.
 * Panel-ID låst med Fjord: A δ¹⁸O-is · B CO₂-bobler · C pollen · D alder · E støy.
 * Tall etter kapitlets kilder (LGM ca. 185 ppm, holocen 11 700, lav δ¹⁸O = kaldt i is).
 * Ikke kopi av Udir-figurer.
 */
export function PaleoProxyEksempelFigur() {
  const caption =
    "Forenklet figurpakke over ca. siste 25 000 år. Panel A–D er relevante for ulike spørsmål; panel E er bevisst støy. Panel C er forenklet pollendiagram (urt / bjørk / furu), ikke en bestemt norsk innsjø. Panel E er moderne værstasjons-T (støy). Tall er illustrasjon etter kapitlets kilder (Lüthi mfl., 2008; Walker mfl., 2009; Mangerud, 2025b–e; NOAA GML, 2026).";

  return (
    <Diagram
      title="Proxy-pakke: δ¹⁸O-is, CO₂-bobler, pollen, alder og støy over samme tidsakse"
      heading="Fem paneler — samme tidsakse, ulike spørsmål"
      caption={caption}
      viewBox="0 0 920 820"
      wide
      scroll
    >
      {() => {
        const x0 = 118;
        const x1 = 880;
        const w = x1 - x0;
        // ka: 25 (venstre) → 0 (høyre)
        const toX = (ka: number) => x0 + ((25 - ka) / 25) * w;

        const events = [
          { ka: 21, label: "LGM" },
          { ka: 12.8, label: "YD start" },
          { ka: 12.1, label: "Vedde" },
          { ka: 11.7, label: "Holocen" },
        ];

        // Shared vertical guides for key ages
        const guides = (
          <g aria-hidden="true">
            {events.map((e) => (
              <line
                key={e.ka}
                x1={toX(e.ka)}
                y1={48}
                x2={toX(e.ka)}
                y2={760}
                stroke={C.dim}
                strokeDasharray="3 5"
                opacity={0.7}
              />
            ))}
          </g>
        );

        // Panel A: δ18O ice — low = cold. Values as relative height 0..1 (higher = warmer / less negative)
        // Approximate path: LGM cold, Bølling warmish, YD cold, Holocene warm
        const d18oPts: [number, number][] = [
          [25, 0.18],
          [22, 0.12],
          [21, 0.1],
          [19, 0.22],
          [14.7, 0.72],
          [13.5, 0.78],
          [12.8, 0.55],
          [12.1, 0.28],
          [11.7, 0.35],
          [11.0, 0.82],
          [8, 0.88],
          [4, 0.9],
          [0, 0.9],
        ];
        const panelATop = 56;
        const panelAH = 118;
        const pathA = d18oPts
          .map(([ka, v], i) => {
            const x = toX(ka).toFixed(1);
            const y = (panelATop + panelAH - 10 - v * (panelAH - 24)).toFixed(1);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ");

        // Panel B: CO2 ppm — LGM ~185, deglaciation rise, Holocene ~265–280
        const co2Pts: [number, number][] = [
          [25, 190],
          [22, 185],
          [19, 188],
          [15, 210],
          [12.8, 235],
          [11.7, 250],
          [10, 265],
          [5, 270],
          [0, 275],
        ];
        const panelBTop = 196;
        const panelBH = 118;
        const co2Min = 160;
        const co2Max = 300;
        const toYCo2 = (ppm: number) =>
          panelBTop + panelBH - 10 - ((ppm - co2Min) / (co2Max - co2Min)) * (panelBH - 24);
        const pathB = co2Pts
          .map(([ka, ppm], i) => {
            const x = toX(ka).toFixed(1);
            const y = toYCo2(ppm).toFixed(1);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ");

        // Panel C: pollen — stacked areas urt / bjørk / furu (simplified fractions summing ~1)
        // During YD: high urt; Holocene: more birch then pine
        const pollenAges = [25, 21, 15, 12.8, 12.1, 11.7, 10, 7, 3, 0];
        const pollen = pollenAges.map((ka) => {
          let urt: number;
          let bjork: number;
          let furu: number;
          if (ka >= 19) {
            urt = 0.72;
            bjork = 0.2;
            furu = 0.08;
          } else if (ka >= 12.8) {
            urt = 0.35;
            bjork = 0.45;
            furu = 0.2;
          } else if (ka >= 11.7) {
            // YD
            urt = 0.78;
            bjork = 0.15;
            furu = 0.07;
          } else if (ka >= 8) {
            urt = 0.25;
            bjork = 0.5;
            furu = 0.25;
          } else {
            urt = 0.15;
            bjork = 0.35;
            furu = 0.5;
          }
          return { ka, urt, bjork, furu };
        });
        const panelCTop = 336;
        const panelCH = 130;
        const stackY = (fracFromTop: number) =>
          panelCTop + 8 + fracFromTop * (panelCH - 20);

        const areaPath = (
          bottom: (p: (typeof pollen)[0]) => number,
          top: (p: (typeof pollen)[0]) => number,
        ) => {
          const forward = pollen
            .map((p, i) => {
              const x = toX(p.ka).toFixed(1);
              const y = stackY(top(p)).toFixed(1);
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ");
          const back = [...pollen]
            .reverse()
            .map((p) => {
              const x = toX(p.ka).toFixed(1);
              const y = stackY(bottom(p)).toFixed(1);
              return `L ${x} ${y}`;
            })
            .join(" ");
          return `${forward} ${back} Z`;
        };
        const urtTop = (p: (typeof pollen)[0]) => 0;
        const urtBot = (p: (typeof pollen)[0]) => p.urt;
        const bjorkTop = (p: (typeof pollen)[0]) => p.urt;
        const bjorkBot = (p: (typeof pollen)[0]) => p.urt + p.bjork;
        const furuTop = (p: (typeof pollen)[0]) => p.urt + p.bjork;
        const furuBot = (_p: (typeof pollen)[0]) => 1;

        // Panel D: age tools — markers only
        const panelDTop = 488;
        const panelDH = 110;

        // Panel E: noise — modern station T only near 0
        const panelETop = 618;
        const panelEH = 100;
        const modernAges = [0.08, 0.06, 0.04, 0.02, 0.01, 0];
        const modernT = [0.4, 0.55, 0.35, 0.7, 0.5, 0.65];
        const pathE = modernAges
          .map((ka, i) => {
            const x = toX(ka).toFixed(1);
            const y = (
              panelETop +
              panelEH -
              14 -
              modernT[i]! * (panelEH - 28)
            ).toFixed(1);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ");

        const panelBox = (y: number, h: number, letter: string, title: string, tone: string) => (
          <g>
            <rect
              x={x0}
              y={y}
              width={w}
              height={h}
              fill="#0d1820"
              stroke={C.dim}
              strokeWidth="1.2"
            />
            <rect x={18} y={y} width={92} height={h} fill="#142028" stroke={C.dim} />
            <L x={64} y={y + 28} fill={tone} size={22} weight={700} anchor="middle">
              {letter}
            </L>
            <L x={64} y={y + 50} fill={C.fg} size={11} weight={600} anchor="middle">
              {title}
            </L>
          </g>
        );

        return (
          <>
            <L x={460} y={28} fill={C.muted} size={12} anchor="middle">
              Ca. siste 25 000 år (forenklet illustrasjon — ikke rådata)
            </L>

            {guides}

            {/* ===== A: δ18O ===== */}
            {panelBox(panelATop, panelAH, "A", "δ¹⁸O i is", C.cold)}
            <L x={x0 - 6} y={panelATop + 22} fill={C.muted} size={10} anchor="end">
              varmere
            </L>
            <L x={x0 - 6} y={panelATop + panelAH - 8} fill={C.muted} size={10} anchor="end">
              kaldere
            </L>
            <path
              d={pathA}
              fill="none"
              stroke={C.cold}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <L x={toX(21) + 4} y={panelATop + panelAH - 18} fill={C.cold} size={10}>
              lav δ¹⁸O = kaldt
            </L>
            <L x={64} y={panelATop + 72} fill={C.muted} size={10} anchor="middle">
              Grønland-aktig
            </L>
            <L x={64} y={panelATop + 88} fill={C.muted} size={10} anchor="middle">
              temperaturproxy
            </L>

            {/* ===== B: CO2 ===== */}
            {panelBox(panelBTop, panelBH, "B", "CO₂ bobler", C.warm)}
            <L x={x0 - 6} y={toYCo2(280) + 4} fill={C.warm} size={10} anchor="end">
              280
            </L>
            <L x={x0 - 6} y={toYCo2(185) + 4} fill={C.warm} size={10} anchor="end">
              185
            </L>
            <path
              d={pathB}
              fill="none"
              stroke={C.warm}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={toX(21)} cy={toYCo2(185)} r={4} fill={C.warm} />
            <L x={toX(21) + 8} y={toYCo2(185) + 4} fill={C.warm} size={11} weight={600}>
              ca. 185 ppm (LGM)
            </L>
            <L x={64} y={panelBTop + 72} fill={C.muted} size={10} anchor="middle">
              Antarktis-aktig
            </L>
            <L x={64} y={panelBTop + 88} fill={C.muted} size={10} anchor="middle">
              direkte prøve
            </L>

            {/* ===== C: pollen ===== */}
            {panelBox(panelCTop, panelCH, "C", "Pollen", C.teal)}
            <path d={areaPath(urtBot, urtTop)} fill="#8a6b4a" opacity={0.85} />
            <path d={areaPath(bjorkBot, bjorkTop)} fill="#6a9a6e" opacity={0.85} />
            <path d={areaPath(furuBot, furuTop)} fill="#3d6b4f" opacity={0.9} />
            {/* YD highlight band */}
            <rect
              x={toX(12.8)}
              y={panelCTop}
              width={toX(11.7) - toX(12.8)}
              height={panelCH}
              fill={C.cold}
              opacity={0.12}
            />
            <L x={(toX(12.8) + toX(11.7)) / 2} y={panelCTop + 18} fill={C.cold} size={10} anchor="middle">
              yngre dryas
            </L>
            {/* legend */}
            <rect x={x0 + 12} y={panelCTop + panelCH - 28} width={10} height={10} fill="#8a6b4a" />
            <L x={x0 + 26} y={panelCTop + panelCH - 19} fill={C.muted} size={10}>
              urt
            </L>
            <rect x={x0 + 62} y={panelCTop + panelCH - 28} width={10} height={10} fill="#6a9a6e" />
            <L x={x0 + 76} y={panelCTop + panelCH - 19} fill={C.muted} size={10}>
              bjørk
            </L>
            <rect x={x0 + 122} y={panelCTop + panelCH - 28} width={10} height={10} fill="#3d6b4f" />
            <L x={x0 + 136} y={panelCTop + panelCH - 19} fill={C.muted} size={10}>
              furu
            </L>
            <L x={64} y={panelCTop + 72} fill={C.muted} size={10} anchor="middle">
              vegetasjon /
            </L>
            <L x={64} y={panelCTop + 88} fill={C.muted} size={10} anchor="middle">
              miljø
            </L>

            {/* ===== D: age ===== */}
            {panelBox(panelDTop, panelDH, "D", "Alder", C.sand)}
            {/* Layer counting band */}
            <rect
              x={x0 + 4}
              y={panelDTop + 22}
              width={w - 8}
              height={18}
              fill="#1a2830"
              stroke={C.dim}
            />
            {Array.from({ length: 26 }, (_, i) => (
              <line
                key={`lag-${i}`}
                x1={toX(25 - i)}
                y1={panelDTop + 22}
                x2={toX(25 - i)}
                y2={panelDTop + 40}
                stroke={C.teal}
                strokeWidth={i % 5 === 0 ? 1.6 : 0.8}
                opacity={0.7}
              />
            ))}
            <L x={x0 + 10} y={panelDTop + 36} fill={C.teal} size={10}>
              lagtelling (skjematisk)
            </L>

            {/* C-14 sample ticks */}
            {[22, 16, 13, 10, 6, 2].map((ka) => (
              <g key={`c14-${ka}`}>
                <rect
                  x={toX(ka) - 5}
                  y={panelDTop + 52}
                  width={10}
                  height={14}
                  rx={2}
                  fill={C.warm}
                  opacity={0.85}
                />
              </g>
            ))}
            <L x={toX(16) + 12} y={panelDTop + 63} fill={C.warm} size={10}>
              C-14-prøver
            </L>

            {/* Vedde tephra */}
            <line
              x1={toX(12.1)}
              y1={panelDTop + 8}
              x2={toX(12.1)}
              y2={panelDTop + panelDH - 8}
              stroke={C.low}
              strokeWidth={2.4}
            />
            <L x={toX(12.1) + 6} y={panelDTop + 88} fill={C.low} size={11} weight={600}>
              Vedde-asken · ca. 12 100
            </L>

            {/* Holocene start marker */}
            <circle cx={toX(11.7)} cy={panelDTop + 78} r={5} fill={C.sand} />
            <L x={toX(11.7) + 8} y={panelDTop + 102} fill={C.sand} size={11} weight={600}>
              holocen-start · ca. 11 700
            </L>
            <L x={64} y={panelDTop + 72} fill={C.muted} size={10} anchor="middle">
              C-14 / tefra /
            </L>
            <L x={64} y={panelDTop + 88} fill={C.muted} size={10} anchor="middle">
              lagtelling
            </L>

            {/* ===== E: noise ===== */}
            {panelBox(panelETop, panelEH, "E", "Værstasjon", C.low)}
            <rect
              x={x0}
              y={panelETop}
              width={w * 0.92}
              height={panelEH}
              fill="#1a1214"
              opacity={0.55}
            />
            <L x={x0 + w * 0.35} y={panelETop + panelEH / 2} fill={C.muted} size={12} anchor="middle">
              ingen paleodata her
            </L>
            <path
              d={pathE}
              fill="none"
              stroke={C.low}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <L x={toX(0) - 8} y={panelETop + 22} fill={C.low} size={10} anchor="end">
              Moderne værstasjon (°C)
            </L>
            <L x={toX(0) - 8} y={panelETop + 38} fill={C.muted} size={10} anchor="end">
              (siste tiår — feil tidsskala)
            </L>
            <L x={64} y={panelETop + 72} fill={C.muted} size={10} anchor="middle">
              distraktor
            </L>
            <L x={64} y={panelETop + 88} fill={C.muted} size={10} anchor="middle">
              ikke nødvendig
            </L>

            {/* Shared time axis */}
            <line x1={x0} y1={748} x2={x1} y2={748} stroke={C.fg} strokeWidth="1.4" />
            {[25, 20, 15, 12.8, 11.7, 10, 5, 0].map((ka) => (
              <g key={`t-${ka}`}>
                <line
                  x1={toX(ka)}
                  y1={748}
                  x2={toX(ka)}
                  y2={756}
                  stroke={C.fg}
                  strokeWidth="1.2"
                />
                <L x={toX(ka)} y={772} fill={C.muted} size={11} anchor="middle">
                  {ka === 0 ? "nå" : ka === 12.8 ? "12,8" : ka === 11.7 ? "11,7" : String(ka)}
                </L>
              </g>
            ))}
            <L x={(x0 + x1) / 2} y={798} fill={C.muted} size={12} anchor="middle">
              Tid (tusen år før nå)
            </L>

            {/* Event labels along top of A */}
            {events.map((e) => (
              <L
                key={`el-${e.ka}`}
                x={toX(e.ka)}
                y={48}
                fill={C.muted}
                size={10}
                anchor="middle"
              >
                {e.label}
              </L>
            ))}
          </>
        );
      }}
    </Diagram>
  );
}
