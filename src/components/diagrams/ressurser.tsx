import { useId } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { Arrow, C, Diagram, L, font } from "./svg-kit";

function Box({
  x,
  y,
  w,
  h = 72,
  stroke,
  fill,
  title,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  stroke: string;
  fill: string;
  title: string;
  sub?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.8"
      />
      <L
        x={x + w / 2}
        y={sub ? y + 30 : y + 44}
        fill={C.fg}
        size={15}
        anchor="middle"
        weight={600}
      >
        {title}
      </L>
      {sub ? (
        <L x={x + w / 2} y={y + 52} fill={stroke} size={13} anchor="middle">
          {sub}
        </L>
      ) : null}
    </g>
  );
}

export function FraBergartTilBruddDiagram() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Diagram
        title="Tre spor: magma til magmatisk malm og naturstein, sprekk til hydrotermal malm, løsmasse til sedimentær malm, pukk og grus."
        heading="Fra bergart til brudd"
        caption="Magma, sprekk og løsmasse til malm, naturstein og pukk."
        viewBox="0 0 440 560"
      >
        {(m) => (
          <>
            <rect x="12" y="16" width="416" height="176" rx="12" fill="#1a1814" />
            <rect x="12" y="204" width="416" height="152" rx="12" fill="#152028" />
            <rect x="12" y="368" width="416" height="176" rx="12" fill="#181c16" />

            <L x="28" y="38" fill={C.warm} size={13} weight={600}>
              magma
            </L>
            <Box
              x={28}
              y={50}
              w={168}
              stroke={C.warm}
              fill="#3a3428"
              title="magma"
              sub="avkjøling"
            />
            <Box
              x={244}
              y={50}
              w={168}
              stroke={C.warm}
              fill="#3a3428"
              title="magmatisk malm"
              sub="tunge krystaller"
            />
            <Arrow d="M 204 86 L 236 86" marker={m.warm} color={C.warm} width={2.2} />
            <Arrow d="M 112 122 L 112 132" marker={m.muted} color={C.sand} width={2} />
            <Box
              x={28}
              y={136}
              w={168}
              stroke={C.sand}
              fill="#2a3428"
              title="dypbergart"
              sub="larvikitt"
            />
            <Box
              x={244}
              y={136}
              w={168}
              stroke={C.sand}
              fill="#2a3428"
              title="naturstein"
              sub="sages · spaltes"
            />
            <Arrow d="M 204 172 L 236 172" marker={m.muted} color={C.sand} width={2.2} />

            <L x="28" y="226" fill={C.teal} size={13} weight={600}>
              sprekk
            </L>
            <Box
              x={28}
              y={238}
              w={168}
              h={88}
              stroke={C.teal}
              fill="#1a3038"
              title="hydrotermal"
              sub="væske i sprekk"
            />
            <Box
              x={244}
              y={238}
              w={168}
              h={88}
              stroke={C.teal}
              fill="#1a3038"
              title="hydrotermal malm"
              sub="kobber · sink"
            />
            <Arrow d="M 204 282 L 236 282" marker={m.teal} color={C.teal} width={2.2} />

            <L x="28" y="390" fill={C.sand} size={13} weight={600}>
              løsmasse
            </L>
            <Box
              x={28}
              y={402}
              w={168}
              h={88}
              stroke={C.sand}
              fill="#2a3428"
              title="løsmasse"
              sub="forvitring"
            />
            <Box
              x={244}
              y={402}
              w={168}
              stroke={C.sand}
              fill="#2a3428"
              title="sedimentær malm"
            />
            <Box
              x={244}
              y={486}
              w={168}
              stroke={C.muted}
              fill="#1a2832"
              title="pukk og grus"
            />
            <Arrow d="M 204 430 L 236 430" marker={m.muted} color={C.sand} width={2.2} />
            <Arrow d="M 204 458 L 236 510" marker={m.muted} color={C.muted} width={2.2} />
          </>
        )}
      </Diagram>
    </div>
  );
}

function FeltCell({
  x,
  y,
  w,
  h,
  label,
  value,
  header,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  value?: string;
  header?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={header ? "#1a2832" : "#152028"}
        stroke={C.dim}
        strokeWidth="1.2"
      />
      {header && label ? (
        <L x={x + 12} y={y + 26} fill={C.muted} size={14} weight={600}>
          {label}
        </L>
      ) : null}
      {value ? (
        <L x={x + 12} y={y + 28} fill={C.fg} size={15} weight={500}>
          {value}
        </L>
      ) : null}
    </g>
  );
}

export function FeltbokDiagram() {
  const uid = useId().replace(/:/g, "");
  const cols = [
    { label: "ID", value: "R-01", w: 88 },
    { label: "tid", value: "12. mai 10:14", w: 168 },
    { label: "koordinater", value: "59,248° N  10,412° Ø", w: 236 },
    { label: "måling", value: "korn 2–4 mm", w: 150 },
    { label: "usikkerhet", value: "± 3 m", w: 118 },
  ];
  let x = 20;
  const headers = cols.map((c) => {
    const cell = { ...c, x };
    x += c.w;
    return cell;
  });

  return (
    <FigureFrame
      heading="Feltbok · eksempel"
      caption="Feltbok med GPS-punkt. Én rad: ID, tid, koordinater, måling, usikkerhet."
    >
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 220"
          className="mx-auto h-auto w-full min-w-[36rem] max-w-3xl"
          role="img"
          aria-labelledby={`${uid}-title`}
        >
          <title id={`${uid}-title`}>
            Eksempel på feltbokrad: R-01, 12. mai 10:14, 59,248° N 10,412° Ø, korn 2–4
            mm, usikkerhet ± 3 m.
          </title>
          <rect width="100%" height="100%" fill={C.bg} rx="10" />
          <L x="32" y="36" fill={C.teal} size={14} weight={600}>
            eksempel · skolefelt
          </L>
          <L x="32" y="58" fill={C.muted} size={13}>
            GPS-punkt. Mobil-GPS holder til noen meter.
          </L>
          {headers.map((c) => (
            <FeltCell key={`h-${c.label}`} x={c.x} y={78} w={c.w} h={44} label={c.label} header />
          ))}
          {headers.map((c) => (
            <FeltCell key={`v-${c.label}`} x={c.x} y={122} w={c.w} h={52} value={c.value} />
          ))}
          <text
            x="32"
            y="200"
            fill={C.muted}
            fontSize={13}
            fontFamily={font}
            fontWeight={500}
          >
            Primærkilde: feltboka. Foto og GPS supplerer.
          </text>
        </svg>
      </div>
    </FigureFrame>
  );
}
