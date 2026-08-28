import { Arrow, C, Diagram, L } from "./svg-kit";

export function PlatesMapDiagram() {
  return (
    <Diagram
      title="Norge ligger inne på den eurasiske platen. Plategrensen er midthavsryggen vest for oss."
      heading="Plater"
      caption="Norge ligger inne på den eurasiske platen. Plategrensen er midthavsryggen vest for oss."
      viewBox="0 0 820 400"
    >
      {(m) => (
        <>
          <path
            d="M 70 70 C 55 140 70 210 90 255 C 75 310 115 365 165 372 C 210 368 230 325 205 275 C 195 230 210 185 220 145 C 235 95 200 58 155 52 C 110 48 82 52 70 70 Z"
            fill="#1a3038"
            stroke={C.dim}
            strokeWidth="1.5"
          />
          <path
            d="M 248 42 C 268 38 292 48 302 72 C 308 98 292 118 268 122 C 244 118 232 92 236 68 C 238 54 242 44 248 42 Z"
            fill="#1a3038"
            stroke={C.dim}
            strokeWidth="1.5"
          />
          <path
            d="M 430 48 C 520 32 640 40 730 78 C 775 118 768 175 720 198 C 655 215 585 198 530 188 C 500 205 478 168 458 128 C 442 92 418 62 430 48 Z"
            fill="#1c3330"
            stroke={C.teal}
            strokeWidth="1.8"
          />
          <path
            d="M 478 214 C 515 210 555 232 572 285 C 562 340 508 358 478 340 C 448 305 450 242 478 214 Z"
            fill="#1a3038"
            stroke={C.dim}
            strokeWidth="1.5"
          />
          <path
            d="M 318 58 L 328 95 L 312 140 L 332 185 L 318 230 L 338 275 L 322 322 L 340 358"
            fill="none"
            stroke={C.teal}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Arrow d="M 332 118 L 272 118" marker={m.cold} color={C.cold} width={2.4} />
          <Arrow d="M 332 118 L 392 118" marker={m.teal} color={C.teal} width={2.4} />
          <Arrow d="M 328 168 L 268 168" marker={m.cold} color={C.cold} width={2.2} />
          <Arrow d="M 328 168 L 388 168" marker={m.teal} color={C.teal} width={2.2} />
          <circle cx="468" cy="108" r="8" fill={C.warm} />
          <L x="478" y="92" fill={C.warm} size={16} weight={600}>
            Norge
          </L>
          <L x="560" y="130" fill={C.teal} size={15} weight={600}>
            den eurasiske platen
          </L>
          <L x="248" y="248" fill={C.teal} size={14}>
            midthavsrygg
          </L>
          <L x="248" y="268" fill={C.muted} size={13}>
            vest for oss
          </L>
        </>
      )}
    </Diagram>
  );
}

export function SpreadingDiagram() {
  return (
    <Diagram
      title="Divergerende grense. Magma stiger, avkjøles og blir basaltisk havbunn."
      heading="Spredning"
      caption="Divergerende grense. Magma stiger, avkjøles og blir basaltisk havbunn."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          <rect x="40" y="248" width="740" height="72" fill="#152028" />
          <L x="56" y="292" fill={C.muted} size={14}>
            astenosfære
          </L>
          <path d="M 40 168 H 330 L 410 128 L 490 168 H 780 V 248 H 40 Z" fill="#3a3428" />
          <path d="M 40 148 H 330 L 410 112 L 490 148 H 780 V 172 H 490 L 410 136 L 330 172 H 40 Z" fill={C.sand} />
          <path d="M 40 70 H 780 V 148 H 40 Z" fill="#16303a" opacity="0.85" />
          <path d="M 370 248 L 410 168 L 450 248 Z" fill={C.warm} opacity="0.9" />
          <Arrow d="M 410 236 L 410 150" marker={m.warm} color={C.warm} width={3} />
          <Arrow d="M 300 158 L 160 158" marker={m.teal} color={C.teal} width={2.8} />
          <Arrow d="M 520 158 L 660 158" marker={m.teal} color={C.teal} width={2.8} />
          <L x="410" y="88" fill={C.fg} size={15} anchor="middle" weight={600}>
            magma
          </L>
          <L x="150" y="138" fill={C.sand} size={14}>
            basaltisk havbunn
          </L>
          <L x="670" y="138" fill={C.sand} size={14} anchor="end">
            basaltisk havbunn
          </L>
          <L x="56" y="198" fill={C.muted} size={14}>
            litosfære
          </L>
        </>
      )}
    </Diagram>
  );
}

export function SubductionDiagram() {
  return (
    <Diagram
      title="Konvergerende grense, hav mot kontinent. Tettere havbunn synker. Magma kan stige til en vulkanbue."
      heading="Subduksjon"
      caption="Konvergerende grense, hav mot kontinent. Tettere havbunn synker. Magma kan stige til en vulkanbue."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          <rect x="40" y="268" width="740" height="52" fill="#152028" />
          <path d="M 40 150 H 430 L 620 330 H 40 Z" fill="#2a3943" />
          <path d="M 40 132 H 430 L 455 150 H 40 Z" fill={C.sand} />
          <path d="M 430 150 L 620 330 L 700 330 L 780 150 Z" fill="#3a3428" />
          <path
            d="M 430 70 L 470 118 L 520 92 L 580 128 L 640 88 L 700 122 L 780 70 V 150 H 430 Z"
            fill="#4d5c55"
          />
          <path d="M 40 70 H 430 V 132 H 40 Z" fill="#16303a" opacity="0.9" />
          <Arrow d="M 180 140 L 430 140 L 560 270" marker={m.low} color={C.low} width={3} />
          <ellipse cx="560" cy="210" rx="28" ry="18" fill={C.warm} opacity="0.85" />
          <Arrow d="M 560 200 L 600 118" marker={m.warm} color={C.warm} width={2.6} />
          <path d="M 588 70 L 612 118 L 636 70 Z" fill={C.low} />
          <L x="120" y="108" fill={C.cold} size={15}>
            havbunn
          </L>
          <L x="700" y="108" fill={C.fg} size={15} anchor="end">
            kontinent
          </L>
          <L x="430" y="188" fill={C.low} size={14}>
            subduksjon
          </L>
          <L x="500" y="218" fill={C.warm} size={14} anchor="end">
            magma
          </L>
          <L x="650" y="58" fill={C.low} size={15}>
            vulkanbue
          </L>
        </>
      )}
    </Diagram>
  );
}
