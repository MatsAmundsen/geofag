import { useEffect, useId, useState } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { Button } from "@/components/ui/button";
import { DMI_SON, DMI_SON_START } from "@/lib/iod-dmi";
import { Arrow, C, Diagram, L, font } from "./svg-kit";

function N({ n, x, y, fill = C.teal }: { n: string; x: number; y: number; fill?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="12" fill={fill} stroke="#0f171c" strokeWidth="2" />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={C.bg}
        fontSize="12"
        fontWeight={700}
        fontFamily={font}
      >
        {n}
      </text>
    </g>
  );
}

function Cloud({ x, y, rain }: { x: number; y: number; rain?: boolean }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx="30" ry="15" fill="#d7ecef" />
      <ellipse cx={x - 20} cy={y + 5} rx="18" ry="12" fill="#c5e0e6" />
      <ellipse cx={x + 20} cy={y + 5} rx="18" ry="12" fill="#c5e0e6" />
      {rain
        ? [0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={x - 22 + i * 11}
              y1={y + 18}
              x2={x - 27 + i * 11}
              y2={y + 36}
              stroke={C.rain}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          ))
        : null}
    </g>
  );
}

function DryHatch({ id, color = "#d07a7a" }: { id: string; color?: string }) {
  return (
    <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
      <path d="M0 9 L9 0" stroke={color} strokeWidth="1.6" />
    </pattern>
  );
}

function OceanDipole({
  id,
  x,
  y,
  w,
  h,
  west,
  east,
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  west: string;
  east: string;
}) {
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={west} />
          <stop offset="100%" stopColor={east} />
        </linearGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={`url(#${id})`} />
    </g>
  );
}

function ColorKey({
  x,
  y,
  items,
}: {
  x: number;
  y: number;
  items: { c: string; t: string }[];
}) {
  return (
    <g>
      {items.map((it, i) => (
        <g key={it.t} transform={`translate(${x + i * 148}, ${y})`}>
          <rect width="13" height="13" rx="3" fill={it.c} stroke="#0f171c" strokeWidth="0.8" />
          <text x="18" y="11" fill={C.white} fontSize="12" fontFamily={font}>
            {it.t}
          </text>
        </g>
      ))}
    </g>
  );
}

function IndianLand() {
  return (
    <g>
      <path
        d="M 70 70 C 95 78, 118 95, 128 130 C 138 170, 132 210, 118 248 L 78 248 C 68 210, 62 150, 70 70 Z"
        fill={C.sand}
        stroke={C.dim}
      />
      <L x={78} y={128} fill={C.bg} size={12} weight={600}>
        Øst-Afrika
      </L>
      <path
        d="M 148 210 C 162 214, 168 232, 158 248 L 140 248 C 136 230, 138 214, 148 210 Z"
        fill={C.sand}
        stroke={C.dim}
      />
      <path
        d="M 390 58 C 430 62, 448 88, 438 128 C 428 148, 400 158, 378 140 C 368 118, 370 78, 390 58 Z"
        fill={C.sand}
        stroke={C.dim}
      />
      <L x={402} y={98} fill={C.bg} size={12} weight={600}>
        India
      </L>
      <path
        d="M 620 128 C 680 138, 740 148, 768 168 C 750 188, 690 186, 630 168 C 610 156, 604 138, 620 128 Z"
        fill={C.sand}
        stroke={C.dim}
      />
      <L x={678} y={122} fill={C.bg} size={12} weight={600}>
        Indonesia
      </L>
      <path
        d="M 700 198 C 780 204, 830 220, 838 268 L 708 274 C 680 246, 678 214, 700 198 Z"
        fill={C.sand}
        stroke={C.dim}
      />
      <L x={748} y={248} fill={C.bg} size={12} weight={600}>
        Australia
      </L>
    </g>
  );
}

function Equator() {
  return (
    <>
      <line x1="50" y1="168" x2="850" y2="168" stroke={C.white} strokeDasharray="5 6" opacity="0.45" />
      <L x={58} y={160} fill={C.white} size={11}>
        ekvator
      </L>
    </>
  );
}

export function NeutralIodDiagram() {
  return (
    <Diagram
      title="Nøytral IOD: varmt basseng i øst, vestavind langs ekvator, konveksjon og regn over Indonesia"
      heading="Figur 1. Nøytral IOD — der normalen sitter"
      caption="Les kartet først, så snittet under. Oransje i øst og blått i vest er der temperaturen skiller seg — det er dipolens utgangspunkt, ikke en ekstrem hendelse. 1 Oransje basseng: det varme vannet ligger utenfor Indonesia. 2 Blått: vest er kjøligere enn øst. 3 Oransje pil: vestavind stabler varmt vann mot øst. 4 Turkis pil: Indonesian Throughflow. 5 Skyene: konveksjon og regn over det maritime kontinentet — ikke over Øst-Afrika. 6 Snittet: det varme laget er tykkest i øst, så termoklinen ligger dypere der. Når dette mønsteret vipper, får du figur 3 eller figur 7."
      viewBox="0 0 900 470"
    >
      {(m) => (
        <>
          <OceanDipole
            id="iod-f1-ocean"
            x={36}
            y={28}
            w={828}
            h={248}
            west="#2f6f88"
            east="#d4893c"
          />
          <ellipse cx="670" cy="158" rx="128" ry="64" fill="#f0a24a" opacity="0.88" />
          <ellipse cx="210" cy="170" rx="96" ry="54" fill="#2d7aa8" opacity="0.72" />
          <IndianLand />
          <Equator />
          <rect
            x="148"
            y="118"
            width="118"
            height="96"
            fill="none"
            stroke={C.white}
            strokeDasharray="4 3"
            opacity="0.55"
          />
          <rect
            x="598"
            y="148"
            width="118"
            height="58"
            fill="none"
            stroke="#f0c08a"
            strokeDasharray="4 3"
            opacity="0.7"
          />
          <Arrow d="M 250 168 L 560 168" marker={m.warm} color="#f4c48a" width={4} />
          <L x={360} y={154} fill="#f4c48a" size={14} weight={600}>
            vestavind
          </L>
          <Arrow d="M 798 148 L 738 156" marker={m.teal} color="#7ee0d2" width={2.8} />
          <L x={806} y={142} fill="#7ee0d2" size={13} weight={600}>
            ITF
          </L>
          <Cloud x={670} y={64} rain />
          <Arrow d="M 670 128 L 670 92" marker={m.teal} color="#7ee0d2" width={2.2} dash="5 4" />
          <L x={682} y={112} fill="#7ee0d2" size={12}>
            stigende luft
          </L>
          <Arrow d="M 118 108 L 118 148" marker={m.muted} color={C.muted} width={2} dash="5 4" />
          <L x={128} y={128} fill={C.muted} size={12}>
            synkende luft
          </L>
          <N n="1" x={670} y={158} fill="#f0a24a" />
          <N n="2" x={210} y={170} fill="#2d7aa8" />
          <N n="3" x={400} y={168} fill="#e0b48a" />
          <N n="4" x={780} y={132} fill="#7ee0d2" />
          <N n="5" x={710} y={42} fill={C.rain} />
          <ColorKey
            x={48}
            y={250}
            items={[
              { c: "#f0a24a", t: "varmt hav" },
              { c: "#2d7aa8", t: "kjøligere hav" },
              { c: "#7ee0d2", t: "konveksjon / ITF" },
            ]}
          />

          <rect x="36" y="292" width="828" height="140" rx="8" fill="#152028" />
          <path d="M 56 316 L 844 316 L 844 412 L 56 412 Z" fill="#1a3a48" />
          <path d="M 56 316 L 844 316 L 844 358 C 620 352, 280 338, 56 344 Z" fill="#f0a24a" opacity="0.9" />
          <path d="M 56 344 C 280 338, 620 352, 844 358" fill="none" stroke="#7ec4ea" strokeWidth="3.4" />
          <L x={56} y={308} fill={C.muted} size={13}>
            6  termoklin · tverrsnitt vest → øst
          </L>
          <L x={70} y={430} fill="#f0a24a" size={13}>
            vest · tynnere varmt lag
          </L>
          <L x={830} y={430} fill="#f0a24a" size={13} anchor="end">
            øst · tykkere varmt lag
          </L>
        </>
      )}
    </Diagram>
  );
}

export function DmiTimeseriesDiagram() {
  const n = DMI_SON.length;
  const x0 = 64;
  const x1 = 860;
  const y0 = 36;
  const y1 = 268;
  const zero = (y0 + y1) / 2;
  const px = (y1 - y0) / 2 / 1.15;
  const gap = (x1 - x0) / n;
  const w = Math.max(2.2, gap * 0.72);
  const xAt = (i: number) => x0 + i * gap + gap / 2;
  const yAt = (v: number) => zero - v * px;
  const idx = (year: number) => year - DMI_SON_START;
  const marks = [1961, 1980, 1997, 2019, 2024];

  return (
    <Diagram
      title="Dipole Mode Index, september–november, 1961–2024. 1997 og 2019 er blant de sterkeste positive hendelsene."
      heading="Figur 2. DMI: når dipolen slår ut"
      caption="Hver stolpe er september–november-middel av DMI (NOAA PSL, HadISST1.1): vestlig pol minus østlig pol. Oransje stolper er positiv fase, blå er negativ. De røde stolpene 1997 og 2019 er de to høyeste toppene siden 1961 — se også figur 4 og 12b. De stiplede linjene er ±0,4 °C, terskelen Bureau of Meteorology ofte bruker før de kaller det en IOD-hendelse. De fleste år ligger nær null: dipolen er episodisk, ikke en jevn trend."
      viewBox="0 0 900 340"
    >
      {() => (
        <>
          <line x1={x0} y1={zero} x2={x1} y2={zero} stroke={C.dim} />
          <line
            x1={x0}
            y1={yAt(0.4)}
            x2={x1}
            y2={yAt(0.4)}
            stroke={C.warm}
            strokeDasharray="4 5"
            opacity="0.55"
          />
          <line
            x1={x0}
            y1={yAt(-0.4)}
            x2={x1}
            y2={yAt(-0.4)}
            stroke={C.cold}
            strokeDasharray="4 5"
            opacity="0.55"
          />
          {DMI_SON.map((v, i) => {
            const x = xAt(i) - w / 2;
            const y = v >= 0 ? yAt(v) : zero;
            const h = Math.abs(v) * px;
            const hot = i === idx(1997) || i === idx(2019);
            return (
              <rect
                key={DMI_SON_START + i}
                x={x}
                y={y}
                width={w}
                height={Math.max(h, 1.2)}
                rx="0.6"
                fill={hot ? C.low : v >= 0 ? C.warm : C.cold}
                opacity={hot ? 1 : 0.82}
              />
            );
          })}
          {marks.map((year) => (
            <L key={year} x={xAt(idx(year))} y={292} fill={C.muted} size={12} anchor="middle">
              {year}
            </L>
          ))}
          <L x={56} y={32} fill={C.muted} size={12}>
            °C
          </L>
          <L x={872} y={yAt(0.4) + 4} fill={C.warm} size={11} anchor="end">
            +0,4
          </L>
          <L x={872} y={yAt(-0.4) + 4} fill={C.cold} size={11} anchor="end">
            −0,4
          </L>
          <L x={xAt(idx(1997))} y={22} fill={C.low} size={13} anchor="middle" weight={600}>
            1997
          </L>
          <L x={xAt(idx(2019))} y={22} fill={C.low} size={13} anchor="middle" weight={600}>
            2019
          </L>
        </>
      )}
    </Diagram>
  );
}

export function NegativeWalkerDiagram() {
  return (
    <Diagram
      title="Negativ IOD: kaldt og oppvelling i vest, varmt basseng og regn i øst"
      heading="Figur 7. Negativ IOD — Walker-snitt"
      caption="Speilbildet av figur 3. Følg fargene der de skifter: 1 Blått felt utenfor Øst-Afrika er der havet blir kaldere og lufta synker. 2 Oransje felt utenfor Indonesia er der varmt vann stables og det regner. 3 H i vest og L i øst: trykket følger temperaturen. 4 Oransje pil: styrket vestavind. 5 Skyene over det maritime kontinentet. 6 Snittet: termoklinen kommer opp i vest (oppvelling, blå piler) og synker i øst. Øst-Afrika blir tørt fordi lufta synker der — motsatt av figur 10 i positiv fase."
      viewBox="0 0 900 470"
    >
      {(m) => (
        <>
          <defs>
            <DryHatch id="iod-f7-dry" />
          </defs>
          <OceanDipole
            id="iod-f7-ocean"
            x={36}
            y={28}
            w={828}
            h={248}
            west="#1d6a96"
            east="#e08938"
          />
          <ellipse cx="210" cy="168" rx="120" ry="70" fill="#1f7ab0" opacity="0.9" />
          <ellipse cx="670" cy="158" rx="130" ry="68" fill="#f0a24a" opacity="0.9" />
          <IndianLand />
          <ellipse cx="118" cy="150" rx="42" ry="36" fill="url(#iod-f7-dry)" opacity="0.55" />
          <Equator />
          <Arrow d="M 250 168 L 560 168" marker={m.warm} color="#f4c48a" width={4} />
          <L x={348} y={152} fill="#f4c48a" size={14} weight={600}>
            styrket vestavind
          </L>
          <Arrow d="M 210 132 L 620 96" marker={m.muted} color={C.muted} width={1.8} dash="6 5" />
          <L x={360} y={88} fill={C.muted} size={12}>
            retur aloft
          </L>
          <circle cx="210" cy="78" r="20" fill="#6fb3b8" />
          <L x={210} y={84} fill={C.bg} size={16} anchor="middle" weight={700}>
            H
          </L>
          <circle cx="640" cy="78" r="20" fill={C.low} />
          <L x={640} y={84} fill={C.bg} size={16} anchor="middle" weight={700}>
            L
          </L>
          <Cloud x={720} y={52} rain />
          <Arrow d="M 210 118 L 210 148" marker={m.muted} color={C.muted} width={2.2} dash="5 4" />
          <L x={222} y={136} fill={C.muted} size={12}>
            synkende luft · tørt
          </L>
          <Arrow d="M 670 128 L 670 92" marker={m.teal} color="#7ee0d2" width={2.2} dash="5 4" />
          <N n="1" x={210} y={168} fill="#1f7ab0" />
          <N n="2" x={670} y={158} fill="#f0a24a" />
          <N n="3" x={210} y={78} fill="#6fb3b8" />
          <N n="4" x={400} y={168} fill="#e0b48a" />
          <N n="5" x={710} y={36} fill={C.rain} />
          <ColorKey
            x={48}
            y={250}
            items={[
              { c: "#1f7ab0", t: "kaldt / oppvelling" },
              { c: "#f0a24a", t: "varmt / konveksjon" },
              { c: C.low, t: "tørke i vest" },
            ]}
          />

          <rect x="36" y="292" width="828" height="140" rx="8" fill="#152028" />
          <path d="M 56 316 L 844 316 L 844 412 L 56 412 Z" fill="#1a3a48" />
          <path d="M 56 316 L 844 316 L 844 392 C 520 386, 240 338, 56 332 Z" fill="#f0a24a" opacity="0.88" />
          <path d="M 56 332 C 240 338, 520 386, 844 392" fill="none" stroke="#7ec4ea" strokeWidth="3.4" />
          <Arrow d="M 150 398 L 150 340" marker={m.cold} color="#7ec4ea" width={2.8} />
          <L x={162} y={372} fill="#7ec4ea" size={13} weight={600}>
            6 oppvelling
          </L>
          <Arrow d="M 740 338 L 740 396" marker={m.warm} color="#f0a24a" width={2.8} />
          <L x={752} y={368} fill="#f0a24a" size={13} weight={600}>
            nedvelling
          </L>
          <L x={70} y={430} fill="#7ec4ea" size={13}>
            vest · kaldt, termoklin oppe
          </L>
          <L x={830} y={430} fill="#f0a24a" size={13} anchor="end">
            øst · varmt, termoklin nede
          </L>
        </>
      )}
    </Diagram>
  );
}

export function IodEkmanDiagram() {
  return (
    <Diagram
      title="Østlige vinder langs Sumatra. På sørlig halvkule går Ekman-transporten 90 grader til venstre, altså sørover, og kaldt vann veller opp."
      heading="Figur 5. Ekman 90° til venstre — der vannet forsvinner"
      caption="Kartet er den østlige IOD-polen sett ovenfra, sør for ekvator — der det kalde feltet i figur 4 sitter. 1 Gule piler: østlig vind langs Sumatra, mot vest. 2 Turkise piler: Ekman-transport 90° til venstre for vinden, her sørover, bort fra kysten. 3 Det lyseblå beltet med bobler: der overflatevannet spriker, må kaldt dypvann opp. Det er selve endringen — oppvellingen som gjør østpolen kald i positiv IOD. 4 Oransje land: Sumatra i nord, Australia i sør. På nordlig halvkule (havstrømmer-siden) er pila til høyre; her er den til venstre fordi polen sitter sør for ekvator."
      viewBox="0 0 900 440"
    >
      {(m) => (
        <>
          <defs>
            <linearGradient id="iod-f5-ocean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a6a80" />
              <stop offset="45%" stopColor="#3aa0c8" />
              <stop offset="100%" stopColor="#1d4e62" />
            </linearGradient>
          </defs>
          <rect x="48" y="40" width="804" height="300" rx="10" fill="url(#iod-f5-ocean)" />
          <ellipse cx="430" cy="210" rx="300" ry="78" fill="#7ec4ea" opacity="0.55" />
          <ellipse cx="430" cy="198" rx="260" ry="36" fill="#c5eef8" opacity="0.45" />
          <path
            d="M 120 56 C 280 70, 520 78, 700 92 L 720 150 C 500 128, 260 118, 110 128 Z"
            fill={C.sand}
            stroke={C.dim}
          />
          <L x={400} y={88} fill={C.bg} size={15} weight={700} anchor="middle">
            Sumatra / Java
          </L>
          <path
            d="M 560 248 C 700 252, 810 270, 830 330 L 620 338 C 540 300, 530 262, 560 248 Z"
            fill={C.sand}
            stroke={C.dim}
          />
          <L x={700} y={300} fill={C.bg} size={14} weight={700}>
            NW-Australia
          </L>
          <line x1="70" y1="160" x2="820" y2="160" stroke={C.white} strokeDasharray="5 6" opacity="0.4" />
          <L x={78} y={152} fill={C.white} size={12}>
            ekvator
          </L>
          {[0, 1, 2, 3].map((i) => (
            <Arrow
              key={`w-${i}`}
              d={`M ${240 + i * 130} 128 L ${140 + i * 130} 128`}
              marker={m.warm}
              color="#f5d76e"
              width={4}
            />
          ))}
          <L x={300} y={116} fill="#f5d76e" size={14} weight={700}>
            1  østlig vind → mot vest
          </L>
          {[0, 1, 2, 3].map((i) => (
            <Arrow
              key={`e-${i}`}
              d={`M ${200 + i * 130} 148 L ${200 + i * 130} 248`}
              marker={m.teal}
              color="#5ff0d6"
              width={3.4}
            />
          ))}
          <L x={536} y={210} fill="#5ff0d6" size={14} weight={700}>
            2  Ekman sørover
          </L>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle
              key={`b-${i}`}
              cx={220 + i * 70}
              cy={198}
              r={5 + (i % 2)}
              fill="#e8fbff"
              opacity="0.85"
            />
          ))}
          <N n="3" x={430} y={198} fill="#7ec4ea" />
          <L x={448} y={202} fill="#e8fbff" size={14} weight={700}>
            oppvelling — kaldt vann opp
          </L>
          <N n="4" x={160} y={90} fill={C.sand} />
          <ColorKey
            x={64}
            y={314}
            items={[
              { c: "#f5d76e", t: "vind" },
              { c: "#5ff0d6", t: "Ekman-transport" },
              { c: "#7ec4ea", t: "oppvelling" },
            ]}
          />
          <L x={430} y={392} fill={C.muted} size={13} anchor="middle">
            sørlig halvkule: venstre for vinden = sørover, bort fra Sumatra
          </L>
        </>
      )}
    </Diagram>
  );
}

export function IodTeleconnectionDiagram() {
  return (
    <Diagram
      title="Positiv IOD: flom i Øst-Afrika, ofte sterkere indisk sommermonsun, tørke og brannfare i Indonesia og Australia"
      heading="Figur 10. Telekobling: tre kyster, samme vippe"
      caption="Kartet er positiv IOD, samme fortegn som figur 3 og 4. Følg der fargene slår ut. 1 Oransje hav i vest: lavtrykk og de blå regnstrekene mot Øst-Afrika (flom — figur 12a). 2 India: samme fukt kan styrke sommermonsunen. 3 Blått hav i øst: høytrykk, synkende luft og tørke. 4 Røde skråstreker over Australia: tørke og brannfare — det du ser i figur 12b. Negativ IOD snur fargene (figur 7). Figur 11 viser hvorfor det samme tørkemønsteret kan komme fra ENSO samtidig."
      viewBox="0 0 900 390"
    >
      {(m) => (
        <>
          <defs>
            <DryHatch id="iod-f10-dry" />
          </defs>
          <OceanDipole
            id="iod-f10-ocean"
            x={36}
            y={28}
            w={828}
            h={300}
            west="#e08938"
            east="#1d6a96"
          />
          <ellipse cx="210" cy="168" rx="118" ry="68" fill="#f0a24a" opacity="0.92" />
          <ellipse cx="670" cy="160" rx="128" ry="64" fill="#1f7ab0" opacity="0.9" />
          <IndianLand />
          <path
            d="M 700 198 C 780 204, 830 220, 838 268 L 708 274 C 680 246, 678 214, 700 198 Z"
            fill="url(#iod-f10-dry)"
            opacity="0.85"
          />
          <Equator />
          <Cloud x={200} y={78} rain />
          <Cloud x={402} y={52} rain />
          <Arrow d="M 210 130 L 210 100" marker={m.teal} color="#7ee0d2" width={2.8} />
          <Arrow d="M 402 118 L 402 78" marker={m.warm} color="#f4c48a" width={2.6} />
          <Arrow d="M 670 130 L 670 168" marker={m.muted} color={C.muted} width={2.2} dash="5 4" />
          <Arrow d="M 748 200 L 748 248" marker={m.low} color={C.low} width={3} />
          <L x={222} y={64} fill="#9ee7f2" size={14} weight={700}>
            flom
          </L>
          <L x={414} y={42} fill="#f4c48a" size={14} weight={700}>
            monsun
          </L>
          <L x={760} y={268} fill={C.low} size={14} weight={700}>
            tørke / brann
          </L>
          <N n="1" x={210} y={168} fill="#f0a24a" />
          <N n="2" x={402} y={98} fill="#e0b48a" />
          <N n="3" x={670} y={160} fill="#1f7ab0" />
          <N n="4" x={748} y={248} fill={C.low} />
          <ColorKey
            x={48}
            y={304}
            items={[
              { c: "#f0a24a", t: "varmt / flom" },
              { c: "#1f7ab0", t: "kaldt / tørke" },
              { c: C.low, t: "brannfare" },
            ]}
          />
        </>
      )}
    </Diagram>
  );
}

export function IodVsEnsoDiagram() {
  return (
    <Diagram
      wide
      title="Positiv IOD i Indiahavet ved siden av El Niño i Stillehavet: to vipper, to Walker-celler, felles tørke over Indonesia"
      heading="Figur 11. IOD og ENSO side om side"
      caption="Venstre er positiv IOD i tropisk Indiahav. Høyre er El Niño i tropisk Stillehav — den kombinasjonen som rammet i 1997 og 2019 (figur 2). Les hvert kart ovenfra og ned: havfarge → vind → trykk → sky/tørke → termoklin. 1 Oransje: varmt hav og konveksjon. 2 Blått: kaldt hav. 3 Piler ved overflaten: IOD blåser mot vest, El Niño slipper passaten og sender varmt vann mot øst. 4 Skyer: der lufta stiger. 5 H/L: trykket. 6 Stiplede poler: DMI-boksene i vest og øst mot Niño-3.4 i sentrale/østlige Stillehav. 7 Snittene: termoklinen er dyp i vest og grunn i øst under +IOD, men utflatet og dyp i øst under El Niño. Indonesia sitter i midten av begge kart: begge vipper tørker den kysten når de slår ut samtidig. IOD varer ofte 4–6 måneder; ENSO har 2–7 år mellom toppene."
      viewBox="0 0 1040 860"
    >
      {(m) => (
        <>
          <defs>
            <DryHatch id="iod-f11-dry" />
          </defs>
          <OceanDipole
            id="iod-f11-ind"
            x={24}
            y={64}
            w={480}
            h={292}
            west="#e08938"
            east="#1d6a96"
          />
          <OceanDipole
            id="iod-f11-pac"
            x={536}
            y={64}
            w={480}
            h={292}
            west="#2f6f88"
            east="#e08938"
          />

          <rect x="24" y="20" width="480" height="36" rx="8" fill="#c98440" />
          <L x={264} y={44} size={16} anchor="middle" weight={700} fill={C.bg}>
            IOD · tropisk Indiahav · positiv fase
          </L>
          <rect x="536" y="20" width="480" height="36" rx="8" fill="#6fb3b8" />
          <L x={776} y={44} size={16} anchor="middle" weight={700} fill={C.bg}>
            ENSO · tropisk Stillehav · El Niño
          </L>

          <ellipse cx="150" cy="210" rx="92" ry="58" fill="#f0a24a" opacity="0.92" />
          <ellipse cx="390" cy="214" rx="92" ry="58" fill="#1f7ab0" opacity="0.9" />
          <path
            d="M 40 92 C 68 104, 84 130, 90 168 C 96 214, 84 280, 72 340 L 40 340 C 34 250, 32 150, 40 92 Z"
            fill={C.sand}
          />
          <L x={46} y={168} fill={C.bg} size={12} weight={700}>
            Øst-Afrika
          </L>
          <path d="M 210 92 C 248 96, 268 118, 258 148 C 248 164, 220 168, 198 150 C 188 128, 192 100, 210 92 Z" fill={C.sand} />
          <L x={216} y={118} fill={C.bg} size={11} weight={600}>
            India
          </L>
          <path d="M 350 158 C 400 164, 448 178, 468 198 C 448 216, 400 208, 354 194 Z" fill={C.sand} />
          <L x={372} y={154} fill={C.bg} size={11} weight={600}>
            Indonesia
          </L>
          <path d="M 372 236 C 440 244, 488 264, 496 340 L 368 340 C 356 292, 356 250, 372 236 Z" fill={C.sand} />
          <path d="M 372 236 C 440 244, 488 264, 496 340 L 368 340 C 356 292, 356 250, 372 236 Z" fill="url(#iod-f11-dry)" opacity="0.7" />
          <L x={400} y={292} fill={C.bg} size={11} weight={600}>
            Australia
          </L>
          <rect
            x="96"
            y="168"
            width="108"
            height="88"
            fill="none"
            stroke="#f4c48a"
            strokeDasharray="5 4"
            strokeWidth="1.8"
          />
          <L x={100} y={162} fill="#f4c48a" size={11} weight={600}>
            6 DMI vest 50–70°Ø
          </L>
          <rect
            x="336"
            y="188"
            width="108"
            height="70"
            fill="none"
            stroke="#7ec4ea"
            strokeDasharray="5 4"
            strokeWidth="1.8"
          />
          <L x={336} y={182} fill="#7ec4ea" size={11} weight={600}>
            6 DMI øst 90–110°Ø
          </L>
          <line x1="48" y1="214" x2="488" y2="214" stroke={C.white} strokeDasharray="4 5" opacity="0.35" />
          <Arrow d="M 340 214 L 180 214" marker={m.warm} color="#f4c48a" width={3.4} />
          <L x={210} y={204} fill="#f4c48a" size={12} weight={600}>
            3 vind mot vest
          </L>
          <Arrow d="M 170 118 L 360 96" marker={m.muted} color={C.muted} width={1.6} dash="6 5" />
          <L x={232} y={88} fill={C.muted} size={11}>
            retur aloft
          </L>
          <Cloud x={148} y={108} rain />
          <circle cx="92" cy="118" r="15" fill={C.low} />
          <L x={92} y={123} fill={C.bg} size={12} anchor="middle" weight={700}>
            L
          </L>
          <circle cx="400" cy="118" r="15" fill="#6fb3b8" />
          <L x={400} y={123} fill={C.bg} size={12} anchor="middle" weight={700}>
            H
          </L>
          <Arrow d="M 150 168 L 150 138" marker={m.teal} color="#7ee0d2" width={2} dash="4 4" />
          <Arrow d="M 400 138 L 400 168" marker={m.muted} color={C.muted} width={2} dash="4 4" />
          <L x={412} y={248} fill={C.low} size={12} weight={600}>
            tørke
          </L>
          <L x={118} y={98} fill="#9ee7f2" size={12} weight={600}>
            4 flom
          </L>
          <N n="1" x={150} y={214} fill="#f0a24a" />
          <N n="2" x={390} y={214} fill="#1f7ab0" />
          <N n="5" x={92} y={118} fill={C.low} />

          <ellipse cx="900" cy="214" rx="96" ry="60" fill="#f0a24a" opacity="0.92" />
          <ellipse cx="650" cy="214" rx="78" ry="50" fill="#3d8ec0" opacity="0.55" />
          <path d="M 552 158 C 600 164, 638 178, 652 198 C 636 214, 598 208, 556 194 Z" fill={C.sand} />
          <path d="M 552 158 C 600 164, 638 178, 652 198 C 636 214, 598 208, 556 194 Z" fill="url(#iod-f11-dry)" opacity="0.65" />
          <L x={558} y={152} fill={C.bg} size={11} weight={600}>
            Indonesia
          </L>
          <path
            d="M 948 88 C 990 104, 1006 150, 1000 214 C 996 270, 978 330, 956 348 L 932 348 C 952 280, 964 180, 948 88 Z"
            fill={C.sand}
          />
          <L x={932} y={168} fill={C.bg} size={11} weight={600} anchor="end">
            Peru
          </L>
          <rect
            x="720"
            y="176"
            width="140"
            height="78"
            fill="none"
            stroke="#f4c48a"
            strokeDasharray="5 4"
            strokeWidth="1.8"
          />
          <L x={724} y={170} fill="#f4c48a" size={11} weight={600}>
            6 Niño-3.4 (sentralt)
          </L>
          <line x1="552" y1="214" x2="1000" y2="214" stroke={C.white} strokeDasharray="4 5" opacity="0.35" />
          <Arrow d="M 700 214 L 860 214" marker={m.warm} color="#f4c48a" width={3.4} />
          <L x={718} y={204} fill="#f4c48a" size={12} weight={600}>
            3 svekket passat → øst
          </L>
          <Arrow d="M 860 118 L 680 96" marker={m.muted} color={C.muted} width={1.6} dash="6 5" />
          <Cloud x={900} y={108} rain />
          <circle cx="900" cy="118" r="15" fill={C.low} />
          <L x={900} y={123} fill={C.bg} size={12} anchor="middle" weight={700}>
            L
          </L>
          <circle cx="650" cy="118" r="15" fill="#6fb3b8" />
          <L x={650} y={123} fill={C.bg} size={12} anchor="middle" weight={700}>
            H
          </L>
          <Arrow d="M 900 168 L 900 138" marker={m.teal} color="#7ee0d2" width={2} dash="4 4" />
          <Arrow d="M 650 138 L 650 168" marker={m.muted} color={C.muted} width={2} dash="4 4" />
          <L x={558} y={248} fill={C.low} size={12} weight={600}>
            tørke
          </L>
          <L x={868} y={96} fill="#9ee7f2" size={12} weight={600}>
            4 regn Peru
          </L>
          <N n="1" x={900} y={214} fill="#f0a24a" />
          <N n="2" x={650} y={214} fill="#3d8ec0" />
          <N n="5" x={650} y={118} fill="#6fb3b8" />
          <L x={776} y={338} fill={C.white} size={12} anchor="middle">
            Walker-cellen er snudd: stigende luft i øst, synkende over Indonesia
          </L>
          <L x={264} y={338} fill={C.white} size={12} anchor="middle">
            Walker i Indiahavet: stigende luft i vest, synkende i øst
          </L>

          <rect x="24" y="368" width="480" height="148" rx="8" fill="#152028" />
          <path d="M 40 392 L 488 392 L 488 496 L 40 496 Z" fill="#1a3a48" />
          <path d="M 40 392 L 488 392 L 488 412 C 320 422, 160 448, 40 444 Z" fill="#f0a24a" opacity="0.9" />
          <path d="M 40 444 C 160 448, 320 422, 488 412" fill="none" stroke="#7ec4ea" strokeWidth="3" />
          <Arrow d="M 430 488 L 430 420" marker={m.cold} color="#7ec4ea" width={2.4} />
          <L x={40} y={384} fill={C.muted} size={12}>
            7 termoklin +IOD: dyp vest, grunn øst
          </L>
          <L x={48} y={488} fill="#f0a24a" size={12}>
            vest · nedvelling
          </L>
          <L x={480} y={476} fill="#7ec4ea" size={12} anchor="end">
            øst · oppvelling
          </L>

          <rect x="536" y="368" width="480" height="148" rx="8" fill="#152028" />
          <path d="M 552 392 L 1000 392 L 1000 496 L 552 496 Z" fill="#1a3a48" />
          <path d="M 552 392 L 1000 392 L 1000 448 C 820 440, 680 418, 552 412 Z" fill="#f0a24a" opacity="0.9" />
          <path d="M 552 412 C 680 418, 820 440, 1000 448" fill="none" stroke="#7ec4ea" strokeWidth="3" />
          <Arrow d="M 960 420 L 960 484" marker={m.warm} color="#f0a24a" width={2.4} />
          <L x={552} y={384} fill={C.muted} size={12}>
            7 termoklin El Niño: utflatet, varmt og dypt i øst
          </L>
          <L x={560} y={488} fill={C.muted} size={12}>
            Indonesia · grunnere enn normalt
          </L>
          <L x={992} y={476} fill="#f0a24a" size={12} anchor="end">
            Peru · svekket oppvelling
          </L>

          <rect x="24" y="528" width="992" height="40" rx="8" fill="#3a2424" />
          <L x={520} y={554} size={14} anchor="middle" weight={700} fill="#f0c0c0">
            1997 og 2019: Indonesia tørker fra begge sider når +IOD og El Niño treffer samtidig
          </L>

          <rect x="24" y="580" width="992" height="256" rx="8" fill="#152028" />
          <L x={40} y={608} fill={C.fg} size={15} weight={700}>
            Hva du eier i hvert basseng
          </L>
          <L x={360} y={608} fill="#f0a24a" size={14} weight={700}>
            IOD
          </L>
          <L x={700} y={608} fill="#6fb3b8" size={14} weight={700}>
            ENSO
          </L>
          {(
            [
              ["Basseng", "tropisk Indiahav", "tropisk Stillehav"],
              ["Poler", "Øst-Afrika ↔ Indonesia", "Indonesia ↔ Peru"],
              ["Indeks", "DMI = vest minus øst", "Niño-3.4 i sentrale Stillehav"],
              ["Nøytral", "vestavind, varmest i øst (figur 1)", "passat mot vest, varmt basseng i vest"],
              ["Plussfase", "+IOD: varmt vest, kaldt øst", "El Niño: varmt øst, svekket passat"],
              ["Minusfase", "−IOD: kaldt vest, varmt øst (figur 7)", "La Niña: kaldt øst, sterk passat"],
              ["Varighet", "ofte 4–6 måneder, topper SON", "ca. 9–12 måneder, 2–7 år mellom topper"],
              ["Nedbør i pluss", "Øst-Afrika, ofte indisk sommermonsun", "Peru og østlige Stillehav"],
              ["Tørke i pluss", "Indonesia og Australia (figur 10)", "Indonesia og Australia — samme kyst"],
            ] as const
          ).map(([a, b, c], i) => {
            const y = 632 + i * 22;
            return (
              <g key={a}>
                <L x={40} y={y} fill={C.muted} size={13} weight={600}>
                  {a}
                </L>
                <L x={360} y={y} fill={C.fg} size={13}>
                  {b}
                </L>
                <L x={700} y={y} fill={C.fg} size={13}>
                  {c}
                </L>
              </g>
            );
          })}
        </>
      )}
    </Diagram>
  );
}

export function IodPhaseShift() {
  const uid = useId().replace(/:/g, "");
  const [phase, setPhase] = useState<"pos" | "neg">("pos");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setPaused(true);
      return;
    }
    if (paused) return;
    const id = window.setInterval(() => {
      setPhase((p) => (p === "pos" ? "neg" : "pos"));
    }, 3800);
    return () => window.clearInterval(id);
  }, [paused]);

  const pos = phase === "pos";
  const west = pos ? "#f0a24a" : "#1f7ab0";
  const east = pos ? "#1f7ab0" : "#f0a24a";

  return (
    <FigureFrame
      heading="Figur 13. Faseskift: fargene bytter side"
      caption="Skisse, ikke satellittfilm. Følg der fargene hopper: oransje er varmt hav og regn, blått er kaldt hav og tørke. Når fasen snur, bytter vest og øst farge, pilene snur, skyene flytter, og termoklinen vipper den andre veien. Pause og les én fase i ro. Positiv fase matcher figur 3 og 10. Negativ fase matcher figur 6 og 7."
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-3 sm:px-1">
        <p className="text-sm font-medium" aria-live="polite" style={{ color: pos ? "#f0a24a" : "#7ec4ea" }}>
          {pos
            ? "Positiv: oransje vest (flom) · blått øst (tørke)"
            : "Negativ: blått vest (tørke) · oransje øst (regn)"}
        </p>
        <Button type="button" size="sm" variant="secondary" onClick={() => setPaused((v) => !v)}>
          {paused ? "Spill av" : "Pause"}
        </Button>
      </div>
      <svg
        viewBox="0 0 900 460"
        className="mx-auto h-auto w-full max-w-3xl"
        role="img"
        aria-label={pos ? "Positiv IOD-skisse" : "Negativ IOD-skisse"}
      >
        <defs>
          <linearGradient id={`${uid}-ocean`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={west} />
            <stop offset="50%" stopColor="#1a4a5c" />
            <stop offset="100%" stopColor={east} />
          </linearGradient>
          <marker
            id={`${uid}-warm`}
            viewBox="0 0 12 12"
            refX="10"
            refY="6"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M0 1.5 L11 6 L0 10.5 z" fill="#f4c48a" />
          </marker>
          <DryHatch id={`${uid}-dry`} />
        </defs>
        <rect width="100%" height="100%" fill={C.bg} rx="10" />
        <rect x="36" y="24" width="828" height="248" rx="8" fill={`url(#${uid}-ocean)`} />
        <ellipse cx="210" cy="150" rx="118" ry="68" fill={west} opacity="0.92" />
        <ellipse cx="670" cy="150" rx="126" ry="68" fill={east} opacity="0.92" />
        <IndianLand />
        {pos ? (
          <path
            d="M 700 198 C 780 204, 830 220, 838 268 L 708 274 C 680 246, 678 214, 700 198 Z"
            fill={`url(#${uid}-dry)`}
            opacity="0.8"
          />
        ) : (
          <ellipse cx="118" cy="140" rx="40" ry="32" fill={`url(#${uid}-dry)`} opacity="0.7" />
        )}
        <line x1="50" y1="150" x2="850" y2="150" stroke={C.white} strokeDasharray="5 6" opacity="0.4" />
        <path
          d={pos ? "M 560 150 L 250 150" : "M 250 150 L 560 150"}
          fill="none"
          stroke="#f4c48a"
          strokeWidth="3.6"
          strokeLinecap="round"
          markerEnd={`url(#${uid}-warm)`}
        />
        <text x="360" y="136" fill="#f4c48a" fontSize="14" fontWeight={600} fontFamily={font}>
          {pos ? "vind mot vest" : "vind mot øst"}
        </text>
        <Cloud x={pos ? 210 : 670} y={78} rain />
        <circle cx={pos ? 92 : 670} cy={52} r="16" fill={C.low} />
        <text
          x={pos ? 92 : 670}
          y={58}
          textAnchor="middle"
          fill={C.bg}
          fontSize="13"
          fontWeight={700}
          fontFamily={font}
        >
          L
        </text>
        <circle cx={pos ? 670 : 92} cy={52} r="16" fill={C.teal} />
        <text
          x={pos ? 670 : 92}
          y={58}
          textAnchor="middle"
          fill={C.bg}
          fontSize="13"
          fontWeight={700}
          fontFamily={font}
        >
          H
        </text>
        <text
          x={pos ? 230 : 690}
          y={64}
          fill="#9ee7f2"
          fontSize="13"
          fontWeight={700}
          fontFamily={font}
        >
          {pos ? "flom" : "regn"}
        </text>
        <text
          x={pos ? 760 : 70}
          y={268}
          fill={C.low}
          fontSize="13"
          fontWeight={700}
          fontFamily={font}
        >
          tørke
        </text>
        <N n="1" x={210} y={150} fill={west} />
        <N n="2" x={670} y={150} fill={east} />

        <rect x="36" y="288" width="828" height="140" rx="8" fill="#152028" />
        <path d="M 56 308 L 844 308 L 844 400 L 56 400 Z" fill="#1a3a48" />
        <path
          d={
            pos
              ? "M 56 308 L 844 308 L 844 340 C 560 348, 280 384, 56 380 Z"
              : "M 56 308 L 844 308 L 844 384 C 560 380, 280 340, 56 340 Z"
          }
          fill="#f0a24a"
          opacity="0.9"
        />
        <path
          d={pos ? "M 56 380 C 280 384, 560 348, 844 340" : "M 56 340 C 280 340, 560 380, 844 384"}
          fill="none"
          stroke="#7ec4ea"
          strokeWidth="3.2"
        />
        <text x="70" y="424" fill={pos ? "#f0a24a" : "#7ec4ea"} fontSize="13" fontFamily={font}>
          {pos ? "vest: nedvelling" : "vest: oppvelling"}
        </text>
        <text x="830" y="424" fill={pos ? "#7ec4ea" : "#f0a24a"} fontSize="13" textAnchor="end" fontFamily={font}>
          {pos ? "øst: oppvelling" : "øst: nedvelling"}
        </text>
      </svg>
    </FigureFrame>
  );
}

export function IodSstAnomalyDiagram() {
  const uid = useId().replace(/:/g, "");
  return (
    <Diagram
      title="Faktisk havoverflatetemperatur (SST) mot temperaturavvik (SST-anomali)"
      heading="Temperaturkart mot anomalikart: Hvorfor dipolen krever et avvikskart"
      caption="Venstre: Faktisk havoverflatetemperatur i grader Celsius. Hele det ekvatoriale Indiahavet er tropisk varmt (27–30 °C), så dipolen er nesten umulig å se med det blotte øye. Høyre: SST-anomali under positiv IOD (avvik fra normalen). Nå trer dipolen tydelig frem: varmere enn normalt (+1,5 °C) utenfor Øst-Afrika, og markant kjøligere enn normalt (-1,5 °C) utenfor Sumatra/Indonesia."
      viewBox="0 0 860 380"
    >
      {() => (
        <>
          <defs>
            <linearGradient id={`${uid}-sst-grad`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e2583e" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id={`${uid}-sst-anom`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="55%" stopColor="#1e293b" />
              <stop offset="85%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>

          {/* Panel 1: Faktisk SST */}
          <rect x="25" y="45" width="395" height="315" rx="8" fill="#121d24" stroke={C.dim} />
          <rect x="25" y="45" width="395" height="34" rx="8" fill="#1c2c37" />
          <L x={45} y={67} fill={C.fg} size={13} weight={700}>
            Faktisk havtemperatur (SST i °C)
          </L>

          <rect x="45" y="95" width="355" height="175" rx="6" fill={`url(#${uid}-sst-grad)`} opacity={0.85} />

          <line x1="45" y1="180" x2="400" y2="180" stroke={C.white} strokeDasharray="3 3" opacity={0.6} />
          <L x={55} y={175} fill={C.white} size={10}>
            ekvator
          </L>

          <path d="M 50 120 C 65 130, 80 150, 75 180 L 50 180 Z" fill={C.sand} stroke={C.dim} />
          <L x={55} y={145} fill={C.bg} size={9} weight={700}>Afrika</L>
          <path d="M 180 100 C 200 105, 210 120, 200 140 L 175 130 Z" fill={C.sand} stroke={C.dim} />
          <L x={185} y={120} fill={C.bg} size={9} weight={700}>India</L>
          <path d="M 320 160 C 350 165, 370 180, 360 200 L 320 180 Z" fill={C.sand} stroke={C.dim} />
          <L x={325} y={175} fill={C.bg} size={9} weight={700}>Indonesia</L>
          <path d="M 340 220 C 370 225, 390 235, 385 265 L 340 265 Z" fill={C.sand} stroke={C.dim} />
          <L x={350} y={245} fill={C.bg} size={9} weight={700}>Australia</L>

          <L x={120} y={140} fill={C.white} size={13} weight={700}>~ 28,5 °C</L>
          <L x={270} y={140} fill={C.white} size={13} weight={700}>~ 29,5 °C</L>
          <L x={45} y={292} fill={C.muted} size={11}>
            Vannet er varmt overalt i tropene (&gt; 28 °C).
          </L>
          <L x={45} y={310} fill={C.muted} size={11}>
            Forskjellen mellom vest og øst er bare 1 °C i rå tall.
          </L>
          <L x={45} y={335} fill={C.warm} size={12} weight={600}>
            → Vanskelig å se dipolen uten avvikskart.
          </L>

          {/* Panel 2: SST-anomali */}
          <rect x="440" y="45" width="395" height="315" rx="8" fill="#121d24" stroke={C.dim} />
          <rect x="440" y="45" width="395" height="34" rx="8" fill="#1c2c37" />
          <L x={460} y={67} fill={C.teal} size={13} weight={700}>
            Temperaturavvik (SST-anomali i °C)
          </L>

          <rect x="460" y="95" width="355" height="175" rx="6" fill={`url(#${uid}-sst-anom)`} opacity={0.9} />

          <line x1="460" y1="180" x2="815" y2="180" stroke={C.white} strokeDasharray="3 3" opacity={0.6} />
          <L x={470} y={175} fill={C.white} size={10}>
            ekvator
          </L>

          <path d="M 465 120 C 480 130, 495 150, 490 180 L 465 180 Z" fill={C.sand} stroke={C.dim} />
          <L x={470} y={145} fill={C.bg} size={9} weight={700}>Afrika</L>
          <path d="M 595 100 C 615 105, 625 120, 615 140 L 590 130 Z" fill={C.sand} stroke={C.dim} />
          <L x={600} y={120} fill={C.bg} size={9} weight={700}>India</L>
          <path d="M 735 160 C 765 165, 785 180, 775 200 L 735 180 Z" fill={C.sand} stroke={C.dim} />
          <L x={740} y={175} fill={C.bg} size={9} weight={700}>Indonesia</L>
          <path d="M 755 220 C 785 225, 805 235, 800 265 L 755 265 Z" fill={C.sand} stroke={C.dim} />
          <L x={765} y={245} fill={C.bg} size={9} weight={700}>Australia</L>

          <rect x="510" y="125" width="85" height="26" rx="4" fill="#0f171c" opacity={0.8} />
          <L x={552} y={142} fill="#ea580c" size={13} weight={700} anchor="middle">
            +1,5 °C varm
          </L>

          <rect x="705" y="125" width="85" height="26" rx="4" fill="#0f171c" opacity={0.8} />
          <L x={747} y={142} fill="#38bdf8" size={13} weight={700} anchor="middle">
            -1,5 °C kald
          </L>

          <L x={460} y={292} fill={C.fg} size={11}>
            DMI = Vestlig pol (+1,5 °C) minus Østlig pol (-1,5 °C) = +3,0 °C!
          </L>
          <L x={460} y={310} fill={C.muted} size={11}>
            Avvikskartet fjerner bakgrunnsvarmen og isolerer signalet.
          </L>
          <L x={460} y={335} fill={C.teal} size={12} weight={600}>
            → Dipolen blir umiddelbart synlig og kvantifiserbar.
          </L>
        </>
      )}
    </Diagram>
  );
}

export function IodWalkerShiftDiagram() {
  return (
    <Diagram
      title="Walker-sirkulasjonens forskyvning under positiv og negativ IOD"
      heading="Walker-sirkulasjonen: Hvor lufta stiger og hvor den synker"
      caption="Venstre: Positiv IOD forskyver den atmosfæriske Walker-cellen vestover. Varmt hav ved Øst-Afrika gir kraftig oppdrift og nedbør, mens synkende, tørr luft i øst gir tørke og høytrykk over Indonesia og Nordvest-Australia. Termoklinen vipper opp i øst (oppvelling). Høyre: Negativ IOD forsterker Walker-cellen østover, med kraftig nedbør over Indonesia og tørke i Øst-Afrika."
      viewBox="0 0 860 380"
    >
      {(m) => (
        <>
          {/* Panel 1: Positiv IOD Walker-skift */}
          <rect x="25" y="45" width="395" height="315" rx="8" fill="#121d24" stroke={C.dim} />
          <rect x="25" y="45" width="395" height="34" rx="8" fill="#1c2c37" />
          <L x={45} y={67} fill={C.warm} size={13} weight={700}>
            Positiv IOD: Walker-sirkulasjon vestover
          </L>

          <rect x="45" y="240" width="355" height="65" fill="#143444" rx="4" />
          <path d="M 45 285 Q 200 280 400 255" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeDasharray="4 3" />
          <L x={60} y={298} fill="#38bdf8" size={10}>Dyp termoklin (nedvelling)</L>
          <L x={385} y={250} fill="#38bdf8" size={10} anchor="end">Grunn termoklin (oppvelling)</L>

          <rect x="45" y="240" width="160" height="15" fill="#ea580c" opacity={0.6} />
          <rect x="240" y="240" width="160" height="15" fill="#0284c7" opacity={0.6} />
          <L x={60} y={235} fill={C.warm} size={11} weight={600}>Vest: Varmt hav</L>
          <L x={385} y={235} fill={C.cold} size={11} weight={600} anchor="end">Øst: Kaldt hav</L>

          <Arrow d="M 120 220 L 120 130" marker={m.warm} color={C.warm} width={2.5} />
          <Cloud x={120} y={115} rain />
          <L x={120} y={90} fill={C.warm} size={11} weight={700} anchor="middle">Lavtrykk / Flom</L>

          <Arrow d="M 160 110 L 310 110" marker={m.muted} color={C.muted} width={2} />
          <L x={235} y={100} fill={C.muted} size={10} anchor="middle">Høytroposfærisk vind</L>

          <Arrow d="M 330 130 L 330 220" marker={m.cold} color={C.cold} width={2.5} />
          <L x={330} y={150} fill={C.low} size={11} weight={700} anchor="middle">Høytrykk / Tørke</L>

          <Arrow d="M 300 215 L 160 215" marker={m.warm} color="#f59e0b" width={2.2} />
          <L x={230} y={210} fill="#f59e0b" size={10} anchor="middle">Østlige vinder (anomali)</L>

          <L x={45} y={335} fill={C.fg} size={11}>
            Øst-Afrika: Flom og jordras  |  Indonesia/Australia: Tørke og skogbrann
          </L>

          {/* Panel 2: Negativ IOD Walker-skift */}
          <rect x="440" y="45" width="395" height="315" rx="8" fill="#121d24" stroke={C.dim} />
          <rect x="440" y="45" width="395" height="34" rx="8" fill="#1c2c37" />
          <L x={460} y={67} fill={C.teal} size={13} weight={700}>
            Negativ IOD: Walker-sirkulasjon østover
          </L>

          <rect x="460" y="240" width="355" height="65" fill="#143444" rx="4" />
          <path d="M 460 255 Q 660 280 815 285" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeDasharray="4 3" />
          <L x={475} y={250} fill="#38bdf8" size={10}>Grunn (oppvelling)</L>
          <L x={800} y={298} fill="#38bdf8" size={10} anchor="end">Dyp termoklin</L>

          <rect x="460" y="240" width="160" height="15" fill="#0284c7" opacity={0.6} />
          <rect x="655" y="240" width="160" height="15" fill="#ea580c" opacity={0.6} />
          <L x={475} y={235} fill={C.cold} size={11} weight={600}>Vest: Kjølig hav</L>
          <L x={800} y={235} fill={C.warm} size={11} weight={600} anchor="end">Øst: Ekstra varmt</L>

          <Arrow d="M 535 130 L 535 220" marker={m.cold} color={C.cold} width={2.5} />
          <L x={535} y={150} fill={C.low} size={11} weight={700} anchor="middle">Høytrykk / Tørt</L>

          <Arrow d="M 700 110 L 565 110" marker={m.muted} color={C.muted} width={2} />
          <L x={635} y={100} fill={C.muted} size={10} anchor="middle">Høytroposfærisk vind</L>

          <Arrow d="M 740 220 L 740 130" marker={m.warm} color={C.warm} width={2.5} />
          <Cloud x={740} y={115} rain />
          <L x={740} y={90} fill={C.warm} size={11} weight={700} anchor="middle">Lavtrykk / Regn</L>

          <Arrow d="M 560 215 L 705 215" marker={m.warm} color="#f59e0b" width={2.2} />
          <L x={635} y={210} fill="#f59e0b" size={10} anchor="middle">Forsterket vestavind</L>

          <L x={460} y={335} fill={C.fg} size={11}>
            Øst-Afrika: Tørt og kjølig  |  Indonesia/Australia: Ekstremnedbør og flom
          </L>
        </>
      )}
    </Diagram>
  );
}

export function IodJetMeetingDiagram() {
  return (
    <Diagram
      title="Subtropisk jet møter polarjeten under positiv IOD"
      heading="Når subtropisk jet møter polarjeten: Telekonneksjoner til Australia"
      caption="Under en sterk positiv IOD endres oppvarmingsmønsteret og konveksjonen i tropene. Dette forstyrrer den sørlige subtropiske jetstrømmen og tvinger den inn i dypere Rossby-bølger. Sør for Australia kan en slik bølge dykke sørover og smelte sammen med den antarktiske polarjeten. I møtesonen oppstår intense regn- og stormsystemer, mens baksiden av trauet trekker knusktørr og iskald polar luft opp over det sørlige Australia."
      viewBox="0 0 860 380"
    >
      {(m) => (
        <>
          <rect x="25" y="45" width="810" height="315" rx="8" fill="#121d24" stroke={C.dim} />

          {/* Land: Australia */}
          <path
            d="M 500 130 C 580 120, 660 140, 710 180 C 720 220, 690 250, 650 250 C 600 260, 540 250, 500 210 C 480 180, 480 140, 500 130 Z"
            fill="#2c221e"
            stroke={C.dim}
          />
          <L x={585} y={185} fill={C.sand} size={16} weight={700} anchor="middle">
            Australia
          </L>
          <L x={585} y={205} fill={C.muted} size={11} anchor="middle">
            (Tørke og hete i nord)
          </L>

          {/* Det indiske hav og Sørishavet */}
          <L x={180} y={160} fill={C.muted} size={14} weight={600}>
            Det indiske hav
          </L>
          <L x={180} y={320} fill={C.muted} size={12}>
            Sørishavet (Antarktis)
          </L>

          {/* Breddegrader */}
          <line x1="25" y1="120" x2="835" y2="120" stroke={C.white} strokeDasharray="3 4" opacity="0.3" />
          <L x={35} y={115} fill={C.muted} size={10}>20° S (subtropisk høytrykk)</L>

          <line x1="25" y1="230" x2="835" y2="230" stroke={C.white} strokeDasharray="3 4" opacity="0.3" />
          <L x={35} y={225} fill={C.muted} size={10}>40° S</L>

          <line x1="25" y1="310" x2="835" y2="310" stroke={C.white} strokeDasharray="3 4" opacity="0.3" />
          <L x={35} y={295} fill={C.muted} size={10}>60° S (polarfront)</L>

          {/* Subtropisk jet som et meandrerende gult bånd */}
          <path
            d="M 50 140 C 180 140, 320 130, 440 180 C 500 210, 540 270, 600 280 C 660 290, 740 230, 810 210"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="8"
            strokeLinecap="round"
            opacity={0.3}
          />
          <path
            d="M 50 140 C 180 140, 320 130, 440 180 C 500 210, 540 270, 600 280 C 660 290, 740 230, 810 210"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3"
          />
          <L x={260} y={130} fill="#fbbf24" size={12} weight={700}>
            Subtropisk jetstrøm (meandrerende bølge)
          </L>
          <Arrow d="M 330 140 L 390 160" marker={m.warm} color="#fbbf24" width={2.5} />

          {/* Polarjet som et blått bånd */}
          <path
            d="M 50 310 C 220 310, 400 320, 520 300 C 560 290, 600 280, 660 280 C 720 280, 780 295, 810 300"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="8"
            strokeLinecap="round"
            opacity={0.3}
          />
          <path
            d="M 50 310 C 220 310, 400 320, 520 300 C 560 290, 600 280, 660 280 C 720 280, 780 295, 810 300"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
          />
          <L x={260} y={325} fill="#38bdf8" size={12} weight={700}>
            Polarjet (subantarktisk)
          </L>
          <Arrow d="M 450 310 L 510 300" marker={m.cold} color="#38bdf8" width={2.5} />

          {/* Konvergens / Møtesone sør for Australia */}
          <circle cx="610" cy="280" r="28" fill="#f43f5e" opacity={0.25} />
          <circle cx="610" cy="280" r="16" fill="#f43f5e" opacity={0.5} />
          <Cloud x={610} y={260} rain />
          <L x={610} y={325} fill="#f43f5e" size={11} weight={700} anchor="middle">
            Møtesone: Ekstrem nedbør / storm
          </L>

          {/* Kaldluftsutbrudd på baksiden mot Australia */}
          <Arrow d="M 490 280 Q 510 230 530 200" marker={m.cold} color={C.cold} width={2.5} />
          <L x={450} y={235} fill={C.cold} size={11} weight={700}>
            Kald, tørr polarluft trekkes nordover
          </L>
          <L x={440} y={250} fill={C.muted} size={10}>
            (Frostnetter i Sør-Australia)
          </L>
        </>
      )}
    </Diagram>
  );
}

