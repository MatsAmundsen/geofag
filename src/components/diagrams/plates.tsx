import { FigureFrame } from "@/components/figure-frame";
import { Arrow, C, Diagram, L } from "./svg-kit";

export function EarthLayersDiagram() {
  return (
    <Diagram
      title="Jordas skall: litosfære og astenosfære"
      heading="Platene er litosfære — ikke bare skorpe"
      caption="Litosfæren er skorpe pluss den øvre, stive mantelen. Under ligger astenosfæren: fast berg, men mykere slik at platene kan gli. Astenosfæren er ikke et magmaha. Kjernen er metall, ikke silikatmantel."
      viewBox="0 0 820 400"
    >
      {() => (
        <>
          <rect x="40" y="36" width="740" height="44" fill="#4d5c55" />
          <L x="56" y="64" fill={C.fg} size={15} weight={600}>
            kontinentalskorpe · 30–50 km · lav tetthet
          </L>
          <rect x="40" y="80" width="740" height="28" fill={C.sand} />
          <L x="56" y="100" fill={C.bg} size={14} weight={600}>
            havbunnsskorpe · 5–7 km · tettere
          </L>
          <rect x="40" y="108" width="740" height="70" fill="#2a3943" />
          <L x="56" y="140" fill={C.cold} size={15} weight={600}>
            stiv øvre mantel
          </L>
          <L x="56" y="162" fill={C.muted} size={13}>
            inngår i platen
          </L>
          <rect x="40" y="178" width="740" height="88" fill="#1a3038" />
          <L x="56" y="214" fill={C.teal} size={15} weight={600}>
            astenosfære
          </L>
          <L x="56" y="236" fill={C.muted} size={13}>
            fast, men duktilt · platene glir her
          </L>
          <rect x="40" y="266" width="740" height="56" fill="#152028" />
          <L x="56" y="300" fill={C.muted} size={14}>
            dypere mantel
          </L>
          <rect x="40" y="322" width="370" height="48" fill="#3a2a20" />
          <L x="56" y="352" fill={C.warm} size={14}>
            ytre kjerne · flytende jern
          </L>
          <rect x="410" y="322" width="370" height="48" fill="#2a2218" />
          <L x="426" y="352" fill={C.sand} size={14}>
            indre kjerne · fast jern
          </L>
          <line x1="620" y1="36" x2="620" y2="178" stroke={C.warm} strokeWidth="2" />
          <L x="632" y="108" fill={C.warm} size={14} weight={600}>
            litosfære = platen
          </L>
        </>
      )}
    </Diagram>
  );
}

export function ConvectionDiagram() {
  return (
    <Diagram
      title="Manteldynamikk: oppdrift, slab pull og ryggtrykk"
      heading="Varmen driver strømmen. Platene drives mest av det som synker."
      caption="Varm mantel stiger, kald synker. Ved ryggen er litosfæren tynn og høy — den sklir utover (ryggtrykk). Ved subduksjon synker kald, tett havbunn og trekker platen (slab pull). Slab pull er vanligvis den største kraften ved konvergens."
      viewBox="0 0 840 400"
    >
      {(m) => (
        <>
          <rect x="40" y="48" width="760" height="36" fill="#16303a" opacity="0.85" />
          <L x="56" y="72" fill={C.muted} size={13}>
            hav
          </L>
          <path d="M 40 84 H 250 L 300 58 L 350 84 H 790 V 128 H 40 Z" fill="#3a3428" />
          <path d="M 40 84 H 250 L 300 58 L 350 84 H 430 L 620 300 H 40 Z" fill="#2a3943" />
          <path d="M 620 300 L 430 84 H 790 V 128 L 700 128 L 620 300 Z" fill="#3a3428" />
          <rect x="40" y="300" width="760" height="64" fill="#152028" />
          <Arrow d="M 300 290 C 300 210, 300 150, 300 78" marker={m.warm} color={C.warm} width={3.2} />
          <Arrow d="M 220 118 L 90 118" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 380 118 L 500 118" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 520 140 L 600 260" marker={m.low} color={C.low} width={3.2} />
          <Arrow d="M 200 320 C 280 340, 420 340, 560 310" marker={m.cold} color={C.cold} width={2.2} />
          <L x="312" y="200" fill={C.warm} size={14} weight={600}>
            varm opp
          </L>
          <L x="88" y="148" fill={C.teal} size={13}>
            ryggtrykk
          </L>
          <L x="448" y="148" fill={C.teal} size={13}>
            plate glir
          </L>
          <L x="500" y="230" fill={C.low} size={14} weight={600}>
            slab pull
          </L>
          <L x="56" y="338" fill={C.muted} size={13}>
            kald retur i mantelen
          </L>
          <L x="268" y="48" fill={C.warm} size={14}>
            midthavsrygg
          </L>
          <L x="640" y="70" fill={C.low} size={14}>
            subduksjon
          </L>
        </>
      )}
    </Diagram>
  );
}

export function SolidusDiagram() {
  return (
    <Diagram
      title="Solidus og adiabat: hvorfor trykkfall gir smelte"
      heading="Smeltepunktet synker raskere enn temperaturen når berg stiger"
      caption="Solidus er temperaturen der berg begynner å smelte. Den stiger med trykk. En mantelpakke som stiger, følger nesten en adiabat: T faller lite. Ved grunt nok dyp krysser banen solidus — delvis smelte uten at noe er blitt varmere."
      viewBox="0 0 820 400"
    >
      {() => (
        <>
          <line x1="90" y1="340" x2="760" y2="340" stroke={C.dim} strokeWidth="2" />
          <line x1="90" y1="340" x2="90" y2="40" stroke={C.dim} strokeWidth="2" />
          <L x="400" y="372" fill={C.muted} size={14} anchor="middle">
            temperatur →
          </L>
          <L x="36" y="200" fill={C.muted} size={14}>
            dyp
          </L>
          <L x="36" y="218" fill={C.muted} size={13}>
            trykk
          </L>
          <path d="M 210 320 L 620 70" fill="none" stroke={C.low} strokeWidth="3" />
          <L x="630" y="78" fill={C.low} size={14} weight={600}>
            tørr solidus
          </L>
          <path d="M 280 320 L 340 70" fill="none" stroke={C.warm} strokeWidth="3" />
          <L x="348" y="88" fill={C.warm} size={14} weight={600}>
            adiabat
          </L>
          <circle cx="318" cy="168" r="7" fill={C.warm} />
          <L x="332" y="158" fill={C.fg} size={14} weight={600}>
            kryssing: smelte starter
          </L>
          <L x="120" y="300" fill={C.muted} size={13}>
            fast
          </L>
          <L x="520" y="280" fill={C.muted} size={13}>
            delvis smelte
          </L>
          <L x="120" y="54" fill={C.muted} size={13}>
            grunt
          </L>
          <L x="120" y="328" fill={C.muted} size={13}>
            dypt
          </L>
        </>
      )}
    </Diagram>
  );
}

export function DecompressionMeltingDiagram() {
  return (
    <Diagram
      title="Tynnere skorpe senker trykket i mantelen under"
      heading="Tykkelsendring i skorpen: samme berg, lavere trykk, smelte"
      caption="Tykk skorpe og litosfære holder mantelen nede. Når skorpen tynnes — rift eller rygg — stiger mantelen. Overliggende vekt synker, trykket faller, og peridotitt krysser solidus. Det er dekompresjonssmelting. Vann ved subduksjon er en annen mekanisme."
      viewBox="0 0 840 380"
    >
      {(m) => (
        <>
          <rect x="40" y="40" width="360" height="70" fill="#4d5c55" />
          <L x="220" y="72" fill={C.fg} size={14} anchor="middle" weight={600}>
            tykk skorpe
          </L>
          <L x="220" y="92" fill={C.muted} size={12} anchor="middle">
            høyt overtrykk
          </L>
          <rect x="40" y="110" width="360" height="50" fill="#2a3943" />
          <L x="56" y="140" fill={C.cold} size={13}>
            tykk litosfære
          </L>
          <rect x="40" y="160" width="360" height="150" fill="#1a3038" />
          <L x="220" y="230" fill={C.teal} size={14} anchor="middle">
            mantel fast
          </L>
          <L x="220" y="250" fill={C.muted} size={13} anchor="middle">
            under solidus
          </L>
          <rect x="440" y="70" width="360" height="40" fill="#4d5c55" />
          <L x="620" y="96" fill={C.fg} size={14} anchor="middle" weight={600}>
            tynn skorpe
          </L>
          <path d="M 560 70 L 620 40 L 680 70 Z" fill="#3a3428" />
          <rect x="440" y="110" width="360" height="28" fill="#2a3943" />
          <rect x="440" y="138" width="360" height="172" fill="#1a3038" />
          <ellipse cx="620" cy="200" rx="46" ry="28" fill={C.warm} opacity="0.9" />
          <Arrow d="M 620 280 L 620 214" marker={m.warm} color={C.warm} width={3} />
          <L x="670" y="204" fill={C.warm} size={14} weight={600}>
            delvis smelte
          </L>
          <L x="620" y="338" fill={C.muted} size={13} anchor="middle">
            mantel stiger · trykk faller
          </L>
          <L x="220" y="338" fill={C.muted} size={13} anchor="middle">
            før tynning
          </L>
        </>
      )}
    </Diagram>
  );
}

export function BoundaryOverviewDiagram() {
  return (
    <FigureFrame
      heading="Tre bevegelser, seks vanlige møter"
      caption="Divergerende: fra hverandre. Konvergerende: mot hverandre. Transform: sidelengs. Innenfor konvergens og divergens avgjør det om det er havbunn eller kontinent hvilket landskap og hvilken smelte som kommer."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { n: "1", t: "Divergerende", d: "Rygg eller rift. Ny skorpe. Dekompresjonssmelting." },
          { n: "2", t: "Konvergerende", d: "Subduksjon eller kollisjon. Fjell, bue, dype skjelv." },
          { n: "3", t: "Transform", d: "Sidelengs. Ingen ny skorpe, ingen ødelagt skorpe." },
        ].map((b) => (
          <div
            key={b.n}
            className="rounded-lg border border-border bg-background px-4 py-4 text-center"
          >
            <p className="text-sm font-medium text-primary">
              {b.n} {b.t}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
          </div>
        ))}
      </div>
    </FigureFrame>
  );
}

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
      title="Divergerende grense i havet. Magma stiger, avkjøles og blir basaltisk havbunn."
      heading="Havbunnsspredning"
      caption="Platene glir fra hverandre. Astenosfære stiger inn i gapet. Trykkfall gir dekompresjonssmelting. Smelten er basaltisk og bygger ny havbunnsskorpe. Eldst skorpe ligger lengst fra ryggen."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          <rect x="40" y="248" width="740" height="72" fill="#152028" />
          <L x="56" y="292" fill={C.muted} size={14}>
            astenosfære stiger
          </L>
          <path d="M 40 168 H 330 L 410 128 L 490 168 H 780 V 248 H 40 Z" fill="#3a3428" />
          <path d="M 40 148 H 330 L 410 112 L 490 148 H 780 V 172 H 490 L 410 136 L 330 172 H 40 Z" fill={C.sand} />
          <path d="M 40 70 H 780 V 148 H 490 L 410 112 L 330 148 H 40 Z" fill="#16303a" opacity="0.85" />
          <path d="M 378 248 L 410 118 L 442 248 Z" fill={C.warm} opacity="0.92" />
          <Arrow d="M 410 240 L 410 122" marker={m.warm} color={C.warm} width={3} />
          <Arrow d="M 300 158 L 160 158" marker={m.teal} color={C.teal} width={2.8} />
          <Arrow d="M 520 158 L 660 158" marker={m.teal} color={C.teal} width={2.8} />
          <L x="455" y="200" fill={C.warm} size={15} weight={600}>
            magma
          </L>
          <L x="150" y="142" fill={C.sand} size={14}>
            ny basalt
          </L>
          <L x="670" y="142" fill={C.sand} size={14} anchor="end">
            eldre basalt
          </L>
          <L x="56" y="198" fill={C.muted} size={14}>
            litosfære
          </L>
          <L x="380" y="58" fill={C.teal} size={13}>
            ryggakse
          </L>
        </>
      )}
    </Diagram>
  );
}

export function ContinentalRiftDiagram() {
  return (
    <Diagram
      title="Kontinental rift: skorpen tynnes før havet kommer"
      heading="Divergerende grense på kontinent"
      caption="Strekk tynner kontinentet. Midten synker som graben. Mantel stiger inn under den tynne skorpen, trykket faller, og basaltisk magma kan nå overflaten. Fortsetter riften, kan det bli nytt hav — som Atlanteren etter Pangea. Oslofeltet er en død rift."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          <path d="M 40 70 H 260 L 320 150 H 500 L 560 70 H 780 V 150 H 40 Z" fill="#4d5c55" />
          <path d="M 260 150 H 320 L 360 118 L 460 118 L 500 150 H 560 V 210 H 260 Z" fill="#3a3428" />
          <rect x="40" y="150" width="220" height="70" fill="#2a3943" />
          <rect x="560" y="150" width="220" height="70" fill="#2a3943" />
          <rect x="40" y="220" width="740" height="100" fill="#1a3038" />
          <ellipse cx="410" cy="200" rx="40" ry="22" fill={C.warm} opacity="0.9" />
          <Arrow d="M 410 280 L 410 214" marker={m.warm} color={C.warm} width={3} />
          <Arrow d="M 200 130 L 80 130" marker={m.teal} color={C.teal} width={2.6} />
          <Arrow d="M 620 130 L 740 130" marker={m.teal} color={C.teal} width={2.6} />
          <L x="90" y="108" fill={C.fg} size={14}>
            kontinent
          </L>
          <L x="680" y="108" fill={C.fg} size={14} anchor="end">
            kontinent
          </L>
          <L x="410" y="108" fill={C.sand} size={14} anchor="middle" weight={600}>
            graben / riftdal
          </L>
          <L x="430" y="204" fill={C.warm} size={13}>
            dekompresjon
          </L>
          <L x="56" y="280" fill={C.muted} size={13}>
            mantel stiger under tynn skorpe
          </L>
        </>
      )}
    </Diagram>
  );
}

export function SubductionDiagram() {
  return (
    <Diagram
      title="Konvergerende grense, hav mot kontinent. Tettere havbunn synker."
      heading="Hav mot kontinent"
      caption="Havbunnen er tettere og synker i en renne. Vann presses ut av platen og senker smeltepunktet i mantelkilen over — flukssmelting. Magma stiger til en vulkanbue inne på kontinentet, ikke i selve rennen. Dype skjelv følger den synkende platen."
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
          <L x="250" y="188" fill={C.low} size={14}>
            renne + slab
          </L>
          <L x="500" y="218" fill={C.warm} size={14} anchor="end">
            H₂O senker solidus
          </L>
          <L x="650" y="58" fill={C.low} size={15}>
            vulkanbue
          </L>
        </>
      )}
    </Diagram>
  );
}

export function OceanOceanSubductionDiagram() {
  return (
    <Diagram
      title="Hav mot hav: den eldste, tetteste platen synker"
      heading="Hav mot hav"
      caption="To havbunnsplater møtes. Den eldre er kaldere og tettere og synker. Over den synkende platen vokser en øybue — Japan, Marianene, Aleutene. Samme logikk som Andes, men buen står i havet, ikke på et kontinent."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          <path d="M 40 70 H 780 V 150 H 40 Z" fill="#16303a" opacity="0.9" />
          <path d="M 40 150 H 360 L 560 320 H 40 Z" fill="#2a3943" />
          <path d="M 40 132 H 360 L 390 150 H 40 Z" fill={C.sand} />
          <path d="M 360 150 L 560 320 L 640 320 L 780 150 Z" fill="#3a3428" />
          <path d="M 360 132 H 780 V 150 H 390 Z" fill={C.sand} />
          <ellipse cx="500" cy="210" rx="26" ry="16" fill={C.warm} opacity="0.9" />
          <Arrow d="M 160 140 L 360 140 L 500 260" marker={m.low} color={C.low} width={3} />
          <Arrow d="M 500 200 L 560 118" marker={m.warm} color={C.warm} width={2.6} />
          <path d="M 548 78 L 568 118 L 588 78 Z" fill={C.low} />
          <circle cx="568" cy="70" r="10" fill="#4d5c55" />
          <L x="100" y="108" fill={C.cold} size={14}>
            eldre havbunn
          </L>
          <L x="700" y="108" fill={C.teal} size={14} anchor="end">
            yngre havbunn
          </L>
          <L x="580" y="58" fill={C.low} size={14}>
            øybue
          </L>
          <L x="430" y="214" fill={C.warm} size={13} anchor="end">
            magma
          </L>
          <L x="56" y="300" fill={C.muted} size={13}>
            den kalde platen synker
          </L>
        </>
      )}
    </Diagram>
  );
}

export function CollisionDiagram() {
  return (
    <Diagram
      title="Kontinent mot kontinent: ingen av platene vil synke"
      heading="Kontinent mot kontinent"
      caption="Kontinental skorpe er for lett til å subdueres i stor dybde. Platene stanser, skorpen tykkes, og fjellkjeden får en dyp rot. Himalaya er typeeksempelet. Kaledonidene er Norges fossile versjon. Lite magma, mye foldning og skyvedekker."
      viewBox="0 0 820 360"
    >
      {(m) => (
        <>
          <path
            d="M 40 210 H 250 L 320 90 L 410 40 L 500 90 L 570 210 H 780 V 250 H 40 Z"
            fill="#4d5c55"
          />
          <path d="M 40 250 H 780 V 300 H 40 Z" fill="#2a3943" />
          <path d="M 250 250 L 410 300 L 570 250" fill="#3a3428" />
          <rect x="40" y="300" width="740" height="40" fill="#152028" />
          <Arrow d="M 160 180 L 300 180" marker={m.low} color={C.low} width={3} />
          <Arrow d="M 660 180 L 520 180" marker={m.low} color={C.low} width={3} />
          <L x="80" y="168" fill={C.fg} size={14}>
            kontinent
          </L>
          <L x="740" y="168" fill={C.fg} size={14} anchor="end">
            kontinent
          </L>
          <L x="410" y="78" fill={C.sand} size={15} anchor="middle" weight={600}>
            fjellkjede
          </L>
          <L x="410" y="280" fill={C.muted} size={13} anchor="middle">
            tykk rot
          </L>
          <L x="410" y="338" fill={C.muted} size={13} anchor="middle">
            ingen av platene synker unna
          </L>
        </>
      )}
    </Diagram>
  );
}

export function TransformDiagram() {
  return (
    <Diagram
      title="Transformgrense: platene glir sidelengs"
      heading="Transform"
      caption="Bevegelsen er parallell med grensen. Det lages ikke ny skorpe, og det ødelegges ikke skorpe. San Andreas er typeeksempelet på land. På havbunn kutter transformforkastninger ryggen i sikksakk. Jordskjelv, lite vulkanisme."
      viewBox="0 0 820 340"
    >
      {(m) => (
        <>
          <rect x="40" y="70" width="740" height="90" fill="#2a3943" />
          <rect x="40" y="160" width="740" height="90" fill="#3a3428" />
          <line x1="40" y1="160" x2="780" y2="160" stroke={C.low} strokeWidth="4" />
          <Arrow d="M 160 110 L 360 110" marker={m.teal} color={C.teal} width={3} />
          <Arrow d="M 660 210 L 460 210" marker={m.warm} color={C.warm} width={3} />
          <L x="80" y="100" fill={C.teal} size={14}>
            plate A →
          </L>
          <L x="620" y="236" fill={C.warm} size={14} anchor="end">
            ← plate B
          </L>
          <L x="410" y="154" fill={C.low} size={14} anchor="middle" weight={600}>
            sidelengs brudd
          </L>
          <L x="410" y="292" fill={C.muted} size={13} anchor="middle">
            skorpe verken lages eller ødelegges
          </L>
        </>
      )}
    </Diagram>
  );
}
