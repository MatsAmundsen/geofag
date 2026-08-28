import { Arrow, C, Diagram, L } from "./svg-kit";

function Sphere({
  cx,
  cy,
  r,
  stroke,
  fill,
  name,
  role,
}: {
  cx: number;
  cy: number;
  r: number;
  stroke: string;
  fill: string;
  name: string;
  role: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth="2.2" />
      <L x={cx} y={cy - 4} fill={C.fg} size={14} anchor="middle" weight={600}>
        {name}
      </L>
      <L x={cx} y={cy + 14} fill={C.muted} size={12} anchor="middle">
        {role}
      </L>
    </g>
  );
}

export function SpheresDiagram() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Diagram
        title="Fem sfærer med piler inn mot berg, jord, elv og grunnvann. Atmosfære, kryosfære og biosfære er drivere. Geosfære og hydrosfære er mottakere."
        heading="Drivere og mottakere"
        caption="Atmosfære, kryosfære og biosfære graver, løser og avsetter. Geosfære og hydrosfære er mottakerne i geofag 1."
        viewBox="0 0 440 530"
      >
        {(m) => (
          <>
            <L x="220" y="28" fill={C.muted} size={13} anchor="middle">
              drivere
            </L>
            <Sphere
              cx={70}
              cy={92}
              r={48}
              stroke={C.cold}
              fill="#16303a"
              name="atmosfære"
              role="driver"
            />
            <Sphere
              cx={220}
              cy={92}
              r={48}
              stroke={C.white}
              fill="#1a2832"
              name="kryosfære"
              role="driver"
            />
            <Sphere
              cx={370}
              cy={92}
              r={48}
              stroke={C.teal}
              fill="#1a3038"
              name="biosfære"
              role="driver"
            />

            <Arrow d="M 70 142 L 150 208" marker={m.cold} color={C.cold} width={2.2} />
            <Arrow d="M 220 142 L 220 208" marker={m.fg} color={C.white} width={2.2} />
            <Arrow d="M 370 142 L 290 208" marker={m.teal} color={C.teal} width={2.2} />

            <rect
              x="88"
              y="210"
              width="264"
              height="118"
              rx="12"
              fill="#152028"
              stroke={C.sand}
              strokeWidth="1.8"
            />
            <L x="154" y="256" fill={C.sand} size={16} anchor="middle" weight={600}>
              berg
            </L>
            <L x="286" y="256" fill={C.sand} size={16} anchor="middle" weight={600}>
              jord
            </L>
            <L x="154" y="300" fill={C.rain} size={16} anchor="middle" weight={600}>
              elv
            </L>
            <L x="286" y="300" fill={C.rain} size={16} anchor="middle" weight={600}>
              grunnvann
            </L>

            <Arrow d="M 125 378 L 160 334" marker={m.warm} color={C.sand} width={2.2} />
            <Arrow d="M 315 378 L 280 334" marker={m.cold} color={C.rain} width={2.2} />

            <Sphere
              cx={125}
              cy={428}
              r={50}
              stroke={C.sand}
              fill="#2a241c"
              name="geosfære"
              role="mottaker"
            />
            <Sphere
              cx={315}
              cy={428}
              r={50}
              stroke={C.rain}
              fill="#163038"
              name="hydrosfære"
              role="mottaker"
            />
            <L x="220" y="508" fill={C.muted} size={13} anchor="middle">
              mottakere
            </L>
          </>
        )}
      </Diagram>
    </div>
  );
}
