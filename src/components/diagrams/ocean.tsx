import { FigureFrame } from "@/components/figure-frame";
import { Arrow, C, Diagram, L } from "./svg-kit";

export function OceanDriversDiagram() {
  return (
    <FigureFrame
      heading="Vind, rotasjon og tetthet"
      caption="Overflaten skyves av vinden og bøyes av coriolis. I dypet er det tetthet som gjelder: kaldt og salt vann synker, varmt og ferskere vann blir liggende oppå. Tidevann rører kysten, men driver ikke de store gyrene."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { n: "1", t: "Vind", d: "Passater og vestavind gir pådrag i overflaten." },
          { n: "2", t: "Coriolis", d: "Bøyer strømmen. Ekman-transport 90° på vinden." },
          { n: "3", t: "Tetthet", d: "Temperatur og salt styrer hva som synker." },
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

export function EkmanDiagram() {
  return (
    <Diagram
      title="Ekman-transport og Ekman-spiralen"
      heading="Vinden peker én vei, vannet flytter seg 90° til høyre"
      caption="Vinden driver det øverste vannlaget, som bøyes ca. 45° til høyre av corioliseffekten på nordlig halvkule. Hvert underliggende lag trekkes med av friksjon, men bremses og bøyes enda lenger til høyre (Ekman-spiralen). Summeres bevegelsen ned gjennom hele laget (ca. 50–100 m dyp), blir nettotransporten nøyaktig 90° til høyre for vindretningen."
      viewBox="0 0 840 370"
    >
      {(m) => (
        <>
          {/* Venstre side: Ekman-spiralen i profil */}
          <L x="210" y="38" fill={C.fg} size={16} weight={700} anchor="middle">
            Ekman-spiralen (lag for lag)
          </L>

          {/* 1. Vinden i overflaten */}
          <Arrow d="M 60 75 L 280 75" marker={m.warm} color={C.warm} width={3.6} />
          <L x="60" y="60" fill={C.warm} size={14} weight={600}>
            Vind (f.eks. vestavind mot øst →)
          </L>

          {/* Felles origo for spiralpilene */}
          <circle cx="120" cy="115" r="5" fill={C.fg} />
          <L x="60" y="120" fill={C.muted} size={12}>
            Overflate:
          </L>

          {/* 2. Overflatestrøm: ca 45° til høyre for vinden */}
          <Arrow d="M 120 115 L 250 200" marker={m.teal} color={C.teal} width={3.2} />
          <L x="262" y="195" fill={C.teal} size={14} weight={700}>
            Overflatestrøm (ca. 45° til høyre)
          </L>

          {/* 3. Dypere lag 1 (~25 m): rotert ca 70°, kortere */}
          <Arrow d="M 120 115 L 205 245" marker={m.cold} color={C.cold} width={2.4} />
          <L x="215" y="248" fill={C.cold} size={12}>
            ~25 m dyp (dreier mer)
          </L>

          {/* 4. Dypere lag 2 (~50 m): rotert 90° */}
          <Arrow d="M 120 115 L 145 265" marker={m.cold} color={C.cold} width={2} />
          <L x="150" y="278" fill={C.muted} size={11}>
            ~50 m dyp (svakere)
          </L>

          {/* 5. Dypere lag 3 (~75 m): nesten motsatt rettet */}
          <Arrow d="M 120 115 L 90 240" marker={m.muted} color={C.muted} width={1.6} />
          <L x="50" y="255" fill={C.muted} size={11}>
            ~75 m dyp
          </L>

          {/* Stiplet spiralbane som binder sammen pilspissene */}
          <path
            d="M 280 75 C 270 140, 250 200, 205 245 C 175 270, 130 275, 90 240"
            fill="none"
            stroke={C.teal}
            strokeWidth="1.4"
            strokeDasharray="4 3"
            opacity="0.6"
          />

          <line x1="410" y1="40" x2="410" y2="330" stroke={C.dim} strokeDasharray="4 4" />

          {/* Høyre side: Netto integrert Ekman-transport */}
          <L x="620" y="38" fill={C.fg} size={16} weight={700} anchor="middle">
            Netto vanntransport
          </L>
          <Arrow d="M 480 75 L 700 75" marker={m.warm} color={C.warm} width={2.8} />
          <L x="590" y="60" fill={C.warm} size={13} anchor="middle">
            Vindretning →
          </L>

          {/* Vinkelbue 90 grader */}
          <path d="M 605 130 L 605 150 L 585 150" fill="none" stroke={C.teal} strokeWidth="1.5" />
          <circle cx="595" cy="140" r="2.5" fill={C.teal} />

          {/* Netto transportpil rett nedover (90 grader til høyre) */}
          <Arrow d="M 585 95 L 585 285" marker={m.teal} color={C.teal} width={4.2} />
          <L x="605" y="200" fill={C.teal} size={16} weight={700}>
            Netto Ekman-transport
          </L>
          <L x="605" y="222" fill={C.fg} size={13} weight={600}>
            Nøyaktig 90° til høyre (NH)
          </L>
          <L x="605" y="242" fill={C.muted} size={12}>
            (90° til venstre på sørlig halvkule)
          </L>
          <L x="605" y="262" fill={C.muted} size={11}>
            Stabler opp vann inne i gyrene $\rightarrow$ forhøyet havflate
          </L>
        </>
      )}
    </Diagram>
  );
}

export function GyreDiagram() {
  return (
    <Diagram
      title="Den nordatlantiske gyren"
      heading="Med klokken, sterk i vest, slapp i øst"
      caption="Fire strømmer lukker kretsen. Golfstrømmen er den vestlige randstrømmen: smal og rask. Kanaristrømmen i øst er bred og treig. Midten — Sargassohavet — har litt høyere vannstand. Coriolis balanserer trykket utover, så strømmen følger «høyden» i havoverflaten."
      viewBox="0 0 840 400"
    >
      {(m) => (
        <>
          <path
            d="M 180 60 L 620 70 L 700 160 L 680 300 L 200 310 L 140 180 Z"
            fill="#16303a"
            stroke={C.dim}
            strokeWidth="2"
          />
          <L x="160" y="50" fill={C.muted} size={13}>
            Nord-Amerika
          </L>
          <L x="640" y="58" fill={C.muted} size={13}>
            Europa
          </L>
          <L x="710" y="200" fill={C.muted} size={13}>
            Afrika
          </L>
          <ellipse cx="400" cy="190" rx="28" ry="20" fill={C.teal} opacity="0.25" />
          <L x="400" y="196" fill={C.teal} size={13} anchor="middle">
            H
          </L>
          <L x="400" y="216" fill={C.muted} size={12} anchor="middle">
            Sargasso
          </L>
          <Arrow d="M 230 250 C 250 140, 280 90, 430 88" marker={m.warm} color={C.warm} width={3.6} />
          <L x="250" y="150" fill={C.warm} size={14}>
            Golfstrømmen
          </L>
          <L x="250" y="168" fill={C.muted} size={12}>
            smal · rask
          </L>
          <Arrow d="M 450 88 C 560 90, 620 120, 640 180" marker={m.teal} color={C.teal} width={2.8} />
          <L x="500" y="78" fill={C.teal} size={14}>
            Nordatlanterhavsstrømmen
          </L>
          <Arrow d="M 640 200 C 630 260, 560 290, 400 300" marker={m.cold} color={C.cold} width={2.4} />
          <L x="560" y="270" fill={C.cold} size={14}>
            Kanaristrømmen
          </L>
          <L x="560" y="288" fill={C.muted} size={12}>
            bred · treig
          </L>
          <Arrow d="M 360 300 C 250 290, 200 240, 210 200" marker={m.muted} color={C.muted} width={2.4} />
          <L x="300" y="328" fill={C.muted} size={13}>
            nordlige ekvatorialstrøm
          </L>
          <L x="420" y="378" fill={C.fg} size={14} anchor="middle">
            gyre med klokken på nordlig halvkule
          </L>
        </>
      )}
    </Diagram>
  );
}

export function GulfVsNacDiagram() {
  return (
    <Diagram
      title="Golfstrømmen og Den nordatlantiske strømmen"
      heading="To navn, to strekninger"
      caption="Golfstrømmen er den sterke vestlige randstrømmen langs USA. Etter Kapp Hatteras løsner den og fortsetter som Den nordatlantiske strømmen mot de nordiske hav. Det er denne grenen som preger norsk kystklima — ikke selve Golfstrømmen utenfor Florida."
      viewBox="0 0 840 320"
    >
      {(m) => (
        <>
          <path d="M 80 40 L 220 50 L 200 280 L 60 250 Z" fill="#1b2a24" />
          <L x="90" y="70" fill={C.muted} size={13}>
            Nord-Amerika
          </L>
          <path d="M 520 40 L 760 60 L 780 200 L 600 90 Z" fill="#1b2a24" />
          <L x="640" y="70" fill={C.muted} size={13}>
            Norge
          </L>
          <Arrow d="M 200 240 C 260 200, 300 160, 340 130" marker={m.warm} color={C.warm} width={3.6} />
          <L x="250" y="228" fill={C.warm} size={14}>
            Golfstrømmen
          </L>
          <circle cx="348" cy="128" r="5" fill={C.fg} />
          <L x="360" y="122" size={13}>
            Kapp Hatteras
          </L>
          <Arrow d="M 360 124 C 480 90, 580 80, 680 88" marker={m.teal} color={C.teal} width={3.2} />
          <L x="500" y="74" fill={C.teal} size={14}>
            Den nordatlantiske strømmen
          </L>
          <L x="420" y="300" fill={C.muted} size={13} anchor="middle">
            varmt vann  →  de nordiske hav
          </L>
        </>
      )}
    </Diagram>
  );
}

export function DensityDiagram() {
  return (
    <Diagram
      title="Hva som gjør vann tettere"
      heading="Kaldt og salt synker, varmt og ferskt flyter"
      caption="Tetthet øker når temperaturen synker og når saltholdigheten stiger. I de nordiske hav mister overflatevannet varme til lufta. Når det dannes havis, blir saltet igjen i vannet. Da blir vannet tungt nok til å synke og mate dyphavet."
      viewBox="0 0 820 300"
    >
      {() => (
        <>
          <rect x="80" y="60" width="260" height="180" rx="8" fill="#3a2a20" />
          <rect x="80" y="60" width="260" height="70" fill={C.warm} opacity="0.55" />
          <L x="210" y="102" fill={C.bg} size={15} anchor="middle" weight={600}>
            varmt · mindre salt
          </L>
          <L x="210" y="168" fill={C.sand} size={14} anchor="middle">
            lav tetthet  ·  flyter
          </L>
          <rect x="480" y="60" width="260" height="180" rx="8" fill="#1a2c38" />
          <rect x="480" y="150" width="260" height="90" fill={C.cold} opacity="0.45" />
          <L x="610" y="120" fill={C.cold} size={15} anchor="middle" weight={600}>
            kaldt · saltere
          </L>
          <L x="610" y="200" fill={C.fg} size={14} anchor="middle">
            høy tetthet  ·  synker
          </L>
          <L x="210" y="270" fill={C.muted} size={13} anchor="middle">
            tropisk overflate
          </L>
          <L x="610" y="270" fill={C.muted} size={13} anchor="middle">
            nordiske hav om vinteren
          </L>
        </>
      )}
    </Diagram>
  );
}

export function AmocDiagram() {
  return (
    <Diagram
      title="AMOC — havets belte i Atlanteren"
      heading="Varmt nordover i toppen, kaldt sørover i dypet"
      caption="Den atlantiske meridionale omveltningen (AMOC) fører varmt, saltere vann nordover i overflaten. I Norskehavet, Grønlandshavet og Labradorhavet synker det som North Atlantic Deep Water og returnerer sørover på dypt vann. En svekket AMOC betyr mindre nordovertransport av varme."
      viewBox="0 0 840 360"
    >
      {(m) => (
        <>
          <L x="60" y="40" fill={C.muted} size={13}>
            sør
          </L>
          <L x="760" y="40" fill={C.muted} size={13} anchor="end">
            nord
          </L>
          <line x1="50" y1="70" x2="790" y2="70" stroke={C.dim} />
          <L x="60" y="64" fill={C.muted} size={12}>
            overflate
          </L>
          <Arrow d="M 80 100 C 240 70, 480 70, 720 96" marker={m.warm} color={C.warm} width={3.4} />
          <L x="360" y="64" fill={C.warm} size={14}>
            varm overflatestrøm nordover
          </L>
          <circle cx="730" cy="110" r="10" fill={C.cold} />
          <L x="748" y="100" fill={C.cold} size={14}>
            synker
          </L>
          <L x="748" y="118" fill={C.muted} size={12}>
            NADW
          </L>
          <line x1="50" y1="210" x2="790" y2="210" stroke={C.dim} strokeDasharray="4 4" />
          <L x="60" y="204" fill={C.muted} size={12}>
            dyphav
          </L>
          <Arrow d="M 720 230 C 500 270, 260 270, 90 240" marker={m.cold} color={C.cold} width={3.2} />
          <L x="360" y="292" fill={C.cold} size={14}>
            kaldt dyphavsvann sørover
          </L>
          <L x="420" y="340" fill={C.muted} size={13} anchor="middle">
            Norskehavet · Grønlandshavet · Labradorhavet
          </L>
        </>
      )}
    </Diagram>
  );
}

export function UpwellingDiagram() {
  return (
    <Diagram
      title="Kystnær oppwelling"
      heading="Vind langs kysten trekker overflatevannet ut — dypvannet fyller igjen"
      caption="Blåser vinden langs kysten slik at Ekman-transporten peker ut fra land, skyves det varme overflatevannet vekk. Kaldt, næringsrikt dypvann stiger opp for å fylle tomrommet. Det er oppwelling — mekanismen bak noen av verdens rikeste fiskefelt, blant annet utenfor Peru og Vest-Afrika."
      viewBox="0 0 820 380"
    >
      {(m) => (
        <>
          <rect x="40" y="20" width="110" height="340" fill="#1b2a24" />
          <L x="95" y="195" fill={C.muted} size={14} anchor="middle">
            Land
          </L>

          <rect x="150" y="20" width="630" height="340" fill="#0f1f2a" />

          <Arrow d="M 185 45 L 185 300" marker={m.warm} color={C.warm} width={3.2} />
          <L x="205" y="55" fill={C.warm} size={13}>
            vind langs kysten
          </L>

          <Arrow d="M 210 110 L 520 96" marker={m.teal} color={C.teal} width={3.2} />
          <L x="215" y="135" fill={C.teal} size={14}>
            Ekman-transport: overflatevann skyves ut
          </L>

          <path
            d="M 200 300 Q 340 175 780 225 L 780 340 L 200 340 Z"
            fill={C.cold}
            opacity="0.16"
          />
          <path
            d="M 200 300 Q 340 175 780 225"
            fill="none"
            stroke={C.cold}
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <L x="480" y="215" fill={C.cold} size={13} anchor="middle">
            termoklinen presses opp mot kysten
          </L>

          <Arrow d="M 195 300 L 195 175" marker={m.cold} color={C.cold} width={3.4} />
          <L x="222" y="235" fill={C.cold} size={14} weight={600}>
            kaldt, næringsrikt
          </L>
          <L x="222" y="256" fill={C.cold} size={14} weight={600}>
            dypvann stiger
          </L>

          <circle cx="330" cy="290" r="4" fill={C.sand} />
          <circle cx="358" cy="305" r="3.5" fill={C.sand} />
          <circle cx="305" cy="312" r="3" fill={C.sand} />
          <L x="375" y="300" fill={C.sand} size={12}>
            næring til plankton og fisk
          </L>

          <L x="500" y="355" fill={C.muted} size={12} anchor="middle">
            varmt overflatevann skyves videre utover
          </L>
        </>
      )}
    </Diagram>
  );
}

export function ClimateContrastDiagram() {
  return (
    <FigureFrame
      heading="Hvorfor Norge ikke er Labrador"
      caption="Bergen og kysten av Labrador ligger nær 60°N. Den nordatlantiske strømmen, AMOC og vestavindsbeltet gir Norge milde vintre og isfrie fjorder. På vestsiden av Atlanteren treffer samme bredde kald luft og kaldt kystvann. Havet er en del av forklaringen — ikke hele."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-primary/40 bg-background px-4 py-5 text-center">
          <p className="text-sm font-medium text-primary">Norskekysten · 60°N</p>
          <p className="mt-2 text-sm text-foreground">milde vintre, isfrie fjorder</p>
          <p className="mt-1 text-sm text-muted-foreground">varmt atlanterhavsvann + vestavind</p>
        </div>
        <div className="rounded-lg border border-border bg-background px-4 py-5 text-center">
          <p className="text-sm font-medium text-muted-foreground">Labrador · 60°N</p>
          <p className="mt-2 text-sm text-foreground">lange, kalde vintre</p>
          <p className="mt-1 text-sm text-muted-foreground">kald strøm, kaldt kontinent</p>
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        samme solhøyde · helt ulikt klimautfall
      </p>
    </FigureFrame>
  );
}
