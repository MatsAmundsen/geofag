import { Arrow, C, Diagram, L } from "./svg-kit";

const SEA = "#13202a";
const LAND = "#1e2c25";

function Surface({ ox }: { ox: number }) {
  return (
    <>
      <rect x={ox + 10} y="280" width="160" height="64" fill={SEA} />
      <path
        d={`M ${ox + 170} 280 L ${ox + 240} 266 L ${ox + 310} 262 L ${ox + 380} 254 L ${ox + 380} 344 L ${ox + 170} 344 Z`}
        fill={LAND}
      />
      <line x1={ox + 10} y1="280" x2={ox + 170} y2="280" stroke={C.dim} strokeWidth="1.5" />
    </>
  );
}

export function SeaBreezeDiagram() {
  return (
    <Diagram
      title="Sjøbris om dagen og landbris om natten"
      heading="Pålandsvind og fralandsvind"
      caption="Samme kretsløp to ganger, med motsatt fortegn. Om dagen varmes land fortere enn hav: luften over land stiger, det blir termisk lavtrykk ved bakken, og sjøbrisen blåser inn fra havet. Om natten avkjøles land fortere: luften over land synker, trykket ved bakken stiger, og landbrisen blåser ut mot havet. Følg pilene rundt: returstrømmen oppe går motsatt vei av vinden nede. Den må være der — ellers ville luft hopet seg opp der vinden blåser inn, og brisen ville stanset seg selv."
      viewBox="0 0 820 380"
    >
      {(m) => (
        <>
          <line x1="405" y1="58" x2="405" y2="352" stroke={C.dim} />

          <L x="195" y="30" size={16} anchor="middle" weight={600}>
            Dag · sjøbris
          </L>
          <L x="195" y="50" fill={C.muted} size={13} anchor="middle">
            land varmes fortere enn hav
          </L>
          <Surface ox={0} />
          <Arrow d="M 300 250 L 300 118" marker={m.warm} color={C.warm} width={2.8} />
          <Arrow d="M 278 102 L 88 102" marker={m.muted} color={C.muted} width={2.2} />
          <Arrow d="M 58 118 L 58 240" marker={m.cold} color={C.cold} width={2.2} />
          <Arrow d="M 70 264 L 246 264" marker={m.teal} color={C.teal} width={2.8} />
          <L x="312" y="184" fill={C.warm} size={12}>
            stiger
          </L>
          <L x="183" y="90" fill={C.muted} size={12} anchor="middle">
            returstrøm: tilbake i høyden
          </L>
          <L x="180" y="140" fill={C.muted} size={11} anchor="middle">
            det som går inn nede, må ut oppe
          </L>
          <L x="46" y="184" fill={C.cold} size={12} anchor="end">
            synker
          </L>
          <L x="158" y="254" fill={C.teal} size={12} anchor="middle">
            pålandsvind
          </L>
          <L x="90" y="306" fill={C.warm} size={18} anchor="middle" weight={700}>
            H
          </L>
          <L x="90" y="324" fill={C.muted} size={11} anchor="middle">
            høyere trykk
          </L>
          <L x="300" y="306" fill={C.low} size={18} anchor="middle" weight={700}>
            L
          </L>
          <L x="300" y="324" fill={C.muted} size={11} anchor="middle">
            termisk lavtrykk
          </L>
          <L x="40" y="338" fill={C.muted} size={12}>
            hav
          </L>
          <L x="356" y="338" fill={C.muted} size={12} anchor="end">
            land
          </L>

          <L x="615" y="30" size={16} anchor="middle" weight={600}>
            Natt · landbris
          </L>
          <L x="615" y="50" fill={C.muted} size={13} anchor="middle">
            land avkjøles fortere enn hav
          </L>
          <Surface ox={420} />
          <Arrow d="M 478 250 L 478 118" marker={m.warm} color={C.warm} width={2.2} />
          <Arrow d="M 500 102 L 690 102" marker={m.muted} color={C.muted} width={1.8} />
          <Arrow d="M 720 118 L 720 240" marker={m.cold} color={C.cold} width={2.2} />
          <Arrow d="M 666 264 L 490 264" marker={m.teal} color={C.teal} width={2.2} />
          <L x="466" y="184" fill={C.warm} size={12} anchor="end">
            stiger
          </L>
          <L x="595" y="90" fill={C.muted} size={12} anchor="middle">
            returstrøm: motsatt vei
          </L>
          <L x="598" y="140" fill={C.muted} size={11} anchor="middle">
            samme kretsløp, speilvendt
          </L>
          <L x="732" y="184" fill={C.cold} size={12}>
            synker
          </L>
          <L x="578" y="254" fill={C.teal} size={12} anchor="middle">
            fralandsvind
          </L>
          <L x="510" y="306" fill={C.low} size={18} anchor="middle" weight={700}>
            L
          </L>
          <L x="510" y="324" fill={C.muted} size={11} anchor="middle">
            lavere trykk
          </L>
          <L x="720" y="306" fill={C.warm} size={18} anchor="middle" weight={700}>
            H
          </L>
          <L x="720" y="324" fill={C.muted} size={11} anchor="middle">
            kald, tettere luft
          </L>
          <L x="460" y="338" fill={C.muted} size={12}>
            hav
          </L>
          <L x="776" y="338" fill={C.muted} size={12} anchor="end">
            land
          </L>
          <L x="615" y="370" fill={C.muted} size={12} anchor="middle">
            svakere enn sjøbrisen
          </L>
        </>
      )}
    </Diagram>
  );
}
