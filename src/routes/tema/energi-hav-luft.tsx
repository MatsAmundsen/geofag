import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  EnergySourcesDiagram,
  WindPowerTradeoffDiagram,
  OffshoreWindShelfDiagram,
  OtecRankineCycleDiagram,
} from "@/components/diagrams";
import { WindPowerModel } from "@/components/models/wind-power-model";
import { MarineEnergyModel } from "@/components/models/marine-energy-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/energi-hav-luft")!;
const lenke = "text-primary underline-offset-2 hover:underline";

export const Route = createFileRoute("/tema/energi-hav-luft")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/energi-hav-luft",
    }),
  component: EnergiPage,
});

function EnergiPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Ressurser"
      title="Energi fra hav og atmosfære"
      lead="Vind på land, bunnfast og flytende havvind, bølgekraft, tidevann og havets termiske energi (OTEC) rommer enorme fornybare naturkrefter. Men fornybart er ikke automatisk det samme som bærekraftig. LK20 krever at vi drøfter energiressursene helhetlig — i skjæringspunktet mellom fysikk, kontinentalsokkelens geologi, naturinngrep, urfolksrettigheter og Norges rolle i det europeiske kraftsystemet."
      banner="/images/tema-strommer.jpg"
      bannerAlt="Nord-Atlanteren med fargekontrast som minner om en vestlig randstrøm"
      prev={{ to: "/tema/tilpasning", label: "Forrige: Konsekvenser og tilpasning" }}
      next={{ to: "/tema/felt-hav-luft-is", label: "Neste: Feltarbeid" }}
      kilder={KILDER_G2.energi}
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i LK20 (Geofag 2)">
        <p>
          Målet for kapittelet er at eleven skal kunne{" "}
          <em>
            drøfte hvordan energiressurser fra hav og atmosfære kan utnyttes på en bærekraftig måte,
            både nasjonalt og globalt
          </em>{" "}
          (Utdanningsdirektoratet, 2020).
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer og begreper som dekkes:</strong></p>
          <p>• <em>Vindkraftens fysikk:</em> Kubikkloven (P ∝ v³), rotorareal (A = πR²), Betz' grense (59,3 %), kapasitetsfaktor og fullasttimer.</p>
          <p>• <em>Havvind og sokkelgeologi:</em> Bunnfast monopel/jacket på grunn sokkel (&lt;50 m) kontra flytende turbiner (Spar/Semi-sub) over dyp sokkel og Norskerenna (60–350 m).</p>
          <p>• <em>Bølge- og havstrømsenergi:</em> Kinetisk overflateenergi (fetch), oscillerende vannsøyle (OWC), sjøvannets enorme tetthet (1025 kg/m³) og tidevannsturbiner i sund.</p>
          <p>• <em>Termisk energi (OTEC):</em> Utnyttelse av temperaturgradient (ΔT ≥ 20 °C) i tropene, lukket Rankine-syklus og kontinuerlig grunnlast.</p>
          <p>• <em>Helhetlig bærekraftsdrøfting:</em> Avveining mellom klima (utslippskutt), naturmangfold/arealinngrep (myr, reinbeite/Fosen, fugl), fiskeri og forsyningssikkerhet.</p>
        </div>
      </Callout>

      {/* ── 1. VINDKRAFTENS FYSIKK ──────────────────────────────────────── */}
      <CollapsibleSection
        title="1. Vindkraftens fysikk: Kubikkloven, Betz-grensen og rotorareal"
        subtitle="Hvorfor vindhastighet trumfer alt annet, og fysikken bak en moderne vindturbin"
        badge="Fysisk grunnlag"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          Vind er luftmasser i bevegelse, satt i gang av solens ujevne oppvarming av jordkloden og
          opprettholdt av trykkgradientkrefter og{" "}
          <Link to="/tema/coriolis" className={lenke}>
            Corioliseffekten
          </Link>
          . For å hente ut denne energien plasserer vi vindturbiner i luftstrømmen, der de aerodynamiske
          rotorbladene omgjør luftens kinetiske energi til rotasjonsenergi, som deretter omdannes til
          elektrisitet via en generator.
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Kubikkloven: Hvorfor en liten vindøkning gir en gigantisk effektøkning
        </h3>
        <p>
          Den totale kinetiske effekten som strømmer gjennom det sirkulære arealet som turbinbladene
          sveiper (<em>A = π · R²</em>), er gitt av formelen:
        </p>
        <div className="my-3 rounded-lg border border-border/80 bg-card/80 p-3 text-center font-mono text-sm text-foreground">
          P_tot = ½ · ρ · A · v³
        </div>
        <p className="text-xs text-muted-foreground sm:text-sm">
          der <em>ρ</em> (rho) er luftens tetthet (ca. 1,225 kg/m³ ved 15 °C ved havnivå, og opp mot 1,29
          kg/m³ i kald vinterluft), <em>A</em> er rotorarealet i m², og <em>v</em> er vindhastigheten i m/s.
        </p>
        <p>
          Legg merke til at vindhastigheten <em>v</em> er opphøyd i <strong>tredje potens (kubikken)</strong>!
          Dette er den berømte <strong>kubikkloven</strong> i vindkraft:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            Dersom vinden dobles fra 6 m/s til 12 m/s, øker energien i luftstrømmen med hele{" "}
            <strong>2³ = 8 ganger</strong>!
          </li>
          <li>
            Selv en beskjeden økning på 20 % i middelvind (f.eks. fra 8,0 m/s til 9,6 m/s) gir{" "}
            <strong>1,2³ = 1,728</strong>, altså en økning på hele <strong>73 %</strong> i tilgjengelig energi!
          </li>
        </ul>
        <p>
          Dette forklarer hvorfor <em>lokalisering</em> og tårnhøyde betyr alt i vindkraft. Et turbinfelt på
          et forblåst kystplatå eller til havs med jevn middelvind på 10 m/s vil knuse et anlegg i innlandet
          med 7 m/s, selv om innlandsanlegget har dobbelt så mange turbiner.
        </p>

        <OrdBoks
          ord="Kubikkloven"
          barn="Prinsippet om at effekten i en vindstrøm vokser proporsjonalt med kubikken av vindhastigheten (P ∝ v³). En liten økning i vind gir en voldsom økning i produsert energi."
        />

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Betz' lov: Naturens absolutte grense (59,3 %)
        </h3>
        <p>
          Kan en turbin hente ut 100 % av energien i vinden? Svaret er et kontant nei. I 1919 beviste den
          tyske fysikeren Albert Betz at en vindturbin teoretisk maksimalt kan hente ut{" "}
          <strong>16/27 ≈ 59,26 %</strong> av vindens kinetiske energi:
        </p>
        <p>
          Årsaken er ren bevegelsesmengdebevaring: Dersom rotoren bremset ned luften med 100 %, ville
          lufthastigheten bak turbinen blitt null. Men luft som står stille, kan ikke forsvinne; den ville
          dannet en ugjennomtrengelig vegg som blokkerte all ny vind fra å treffe rotoren. For at luften
          skal kunne unnslippe nedstrøms, må den beholde en viss resthastighet. Betz viste at den optimale
          hastigheten bak rotoren er nøyaktig <em>v/3</em>, noe som gir maksimal effektkoeffisient{" "}
          <em>C_p = 16/27</em>.
        </p>

        <OrdBoks
          ord="Betz' lov"
          barn="Den teoretiske maksimale virkningsgraden for en vindturbin i fri luftstrøm, bevist av Albert Betz i 1919. Turbinen kan maksimalt hente ut 16/27 (ca. 59,3 %) av vindens kinetiske energi."
        />

        {/* Interaktiv Turbinkalkulator */}
        <div className="my-6">
          <WindPowerModel />
        </div>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Kapasitetsfaktor og fullasttimer
        </h3>
        <p>
          I den offentlige debatten blandes ofte <strong>installert merkeeffekt (MW)</strong> og{" "}
          <strong>faktisk levert energi (GWh/TWh)</strong>:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>Merkeeffekt:</strong> Turbinens maksimale ytelse når vinden blåser med optimal styrke
            (typisk 12–14 m/s). En 15 MW turbin kan levere 15 MW på en god dag.
          </li>
          <li>
            <strong>Kapasitetsfaktor:</strong> Forholdet mellom den energien turbinen faktisk produserer i
            løpet av et år, og det den teoretisk ville produsert om den gikk for full maskin (100 %) samtlige
            8760 timer i året.
          </li>
          <li>
            Norsk landvind har en typisk kapasitetsfaktor på <strong>32–38 %</strong> (tilsvarende ca. 2800–3300
            fullasttimer). Havvindanlegg har langt jevnere og sterkere vind, og oppnår ofte{" "}
            <strong>48–55 %</strong> kapasitetsfaktor!
          </li>
        </ul>

        <OrdBoks
          ord="Kapasitetsfaktor"
          barn="Faktisk produsert elektrisk energi i løpet av et år delt på den teoretiske maksimale produksjonen dersom anlegget produserte for full merkeeffekt uavbrutt hele året. Uttrykkes i prosent eller fullasttimer."
        />
      </CollapsibleSection>

      {/* ── 2. HAVVIND OG SOKKELGEOLOGI ─────────────────────────────────── */}
      <CollapsibleSection
        title="2. Havvind: Hvorfor sokkeldybden dikterer bunnfast vs. flytende teknologi"
        subtitle="Fra Danmarks grunne sandbanker til Norskerennas dype forkastningsbasseng"
        badge="Geologi & Sokkel"
        badgeVariant="sky"
      >
        <p>
          Havvind er en av verdens raskest voksende fornybare energikilder. Ute på havet møter vinden ingen
          trær, åser eller bygninger. Overflateruheten er minimal, noe som betyr at vindskjæret (fartsøkningen
          med høyden) er jevnere, turbulensen lavere, og middelvindhastigheten typisk 20–30 % høyere enn på
          land.
        </p>
        <p>
          Men når vi skal bygge vindkraft til havs, er det <strong>geologien på havbunnen</strong> som
          bestemmer alt:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <h4 className="font-semibold text-sky-400">Bunnfast havvind (Monopel / Jacket)</h4>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Krever vanndyp under <strong>40–50 meter</strong>. En massiv stålsylinder (monopel) med diameter
              på 8–10 meter bankes flere titalls meter ned i havbunnssedimentene, eller en firbent stålramme
              (jacket) forankres til fast fjell.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Geografisk utbredelse:</strong> Sørlige Nordsjøen, Doggerbank, kysten av Danmark,
              Nederland, Tyskland og Storbritannia. Her er kontinentalsokkelen en grunn sedimentær slette
              etter istidens avsetninger.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-4">
            <h4 className="font-semibold text-amber-400">Flytende havvind (Spar / Semi-submersible)</h4>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Utviklet for dyp fra <strong>60 til over 500 meter</strong>. Turbinen monteres på et flytende
              skrog med tung ballast (for eksempel en 80 meter dyp betong-/stålsylinder som i Spar-konseptet
              Hywind) eller en halvt nedsenkbar trebent plattform, forankret til havbunnen med strekkstag og
              sugeankere.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Geografisk utbredelse:</strong> Norskekysten, Skottland, Portugal, Japan og USAs
              vestkyst, der havbunnen stuper bratt like utenfor kystlinjen.
            </p>
          </div>
        </div>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Norges geologiske særstilling: Norskerenna tvinger frem flytende teknologi
        </h3>
        <p>
          I den offentlige debatten hører man ofte spørsmålet: <em>«Hvorfor bygger ikke Norge bare like mye
          bunnfast havvind som Danmark og Storbritannia?»</em>
        </p>
        <p>
          Svaret finnes i Norges kvartærgeologiske historie: Under istidene gravde en enorm isstrøm ut{" "}
          <strong>Norskerenna</strong>, en 200–350 meter dyp undervannsgrøft som slynger seg rundt hele
          kysten fra Oslofjorden til Stad. Det finnes nesten ingen grunne platåer langs Norskekysten.
          Skal Norge utnytte havvinden i Norskehavet og Nordsjøen, <strong>må</strong> turbinene flyte!
        </p>
        <p>
          Norge har derfor ledet an i utviklingen av flytende havvind. <strong>Hywind Tampen</strong> (88 MW
          fordelt på 11 turbiner på 260–300 m dyp i Nordsjøen) er verdens største flytende vindpark og forsyner
          olje- og gassfeltene Snorre og Gullfaks med fornybar strøm.
        </p>

        <OffshoreWindShelfDiagram />

        <OrdBoks
          ord="Flytende havvind"
          barn="Vindturbiner montert på flytende understell (for eksempel Spar-bøyer eller semi-submersibles) forankret med ankerliner til havbunnen på dyp over 60 meter, der bunnfaste fundamenter er teknisk eller økonomisk umulige."
        />

        <PhotoFigure
          src="/images/fig-passat.jpg"
          alt="Havoverflate med vindbølger under passatvindene som demonstrerer friksjon og energioverføring fra luft til hav"
          heading="Havoverflatens dynamikk: Friksjon, vindskjær og energioverføring"
          caption="Ute over åpent hav er det ingen terrenghindringer. Vinden overfører bevegelsesenergi til overflaten gjennom friksjon, noe som bygger opp bølger samtidig som vindhastigheten i 100–150 meters navhøyde forblir ekstremt kraftig og laminær."
          marks={[
            { x: 30, y: 30, n: "A", text: "Uforstyrret vindstrøm", tone: "warm" },
            { x: 50, y: 60, n: "B", text: "Grensesjikt mot hav", tone: "teal" },
            { x: 75, y: 80, n: "C", text: "Bølgeoppbygging (Fetch)", tone: "cold" },
          ]}
          points={[
            {
              n: "A",
              label:
                "I 100–150 meters høyde (turbinens rotorplan) er vinden vesentlig sterkere fordi friksjonen mot havflaten avtar med høyden.",
            },
            {
              n: "B",
              label:
                "Det marine atmosfæriske grensesjiktet er preget av lavere mekanisk ruhet enn skog og kupert landskap.",
            },
            {
              n: "C",
              label:
                "Når vinden blåser over lange strekninger (fetch), overføres kinetisk energi fra luften til mekaniske overflatebølger.",
            },
          ]}
        />
      </CollapsibleSection>

      {/* ── 3. BØLGEKRAFT OG HAVSTRØMSENERGI ────────────────────────────── */}
      <CollapsibleSection
        title="3. Bølgekraft og havstrømmer: Havets enorme mekaniske energitetthet"
        subtitle="Hvorfor vannets tetthet på 1025 kg/m³ gir ufattelige krefter, og utfordringen med 100-årshavet"
        badge="Hydrodynamikk"
        badgeVariant="primary"
      >
        <p>
          Bølger og havstrømmer er havets mekaniske bevegelser. De skiller seg fra atmosfæren ved én
          helt overveldende fysisk egenskap: <strong>tettheten i mediet</strong>!
        </p>
        <div className="my-3 rounded-lg border border-border/80 bg-card/80 p-3 text-center font-mono text-sm text-foreground">
          ρ_sjøvann ≈ 1025 kg/m³ · mot · ρ_luft ≈ 1,225 kg/m³ → Forhold: 836 til 1!
        </div>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Sjøvann er over <strong>800 ganger mer massivt</strong> enn luft. Siden den kinetiske effekten
          er direkte proporsjonal med tettheten (<em>P = ½ · ρ · A · v³</em>), inneholder en vannstrøm
          på bare <strong>2,5 m/s</strong> (ca. 5 knop) like mye energi per kvadratmeter som en orkanaktig
          vind på over <strong>23 m/s</strong>!
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Bølgeenergi: Konsentrert vind over lang strekning (Fetch)
        </h3>
        <p>
          Bølger dannes når vind blåser over en åpen havflate over lang tid og strekning (<strong>fetch</strong>).
          Energien lagres som en kombinasjon av potensiell energi (vannmasser hevet over havnivå) og
          kinetisk energi (sirkulære partikkelbaner i vannsøylen). Energitettheten per meter bølgefront
          vokser med <strong>kvadratet av bølgehøyden (E ∝ H²)</strong> og bølgeperioden <em>T</em>.
        </p>
        <p>
          Langs den værharde kysten av Vestlandet, Stad og Lofoten kan den årlige midlere bølgeeffekten
          ligge på <strong>40–70 kW per meter bølgefront</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <h4 className="font-semibold text-emerald-400">Teknologi: Svingende vannsøyle (OWC)</h4>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              En hul betong- eller stålstruktur er åpen mot havet under vannflaten. Når bølgene ruller inn,
              stiger og faller vannspeilet inne i kammeret som et gigantisk stempel. Dette presser luft ut
              og suger luft inn gjennom en spesialkonstruert <strong>Wells-turbin</strong>, som roterer
              samme vei uavhengig av om luftstrømmen går opp eller ned!
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-4">
            <h4 className="font-semibold text-rose-400">Hovedutfordringen: 100-årshavet</h4>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Hvorfor har ikke bølgekraft blitt en kommersiell suksess på linje med vindkraft? Svaret er
              den brutale mekaniske påkjenningen i <strong>100-årshavet</strong>. En turbin som er
              optimalisert for å levere strøm i 2–3 meter høye bølger, må overleve monsterbølger på 20–25
              meter under orkan. Kreftene er titalls ganger større, og materialtretthet, saltkorrosjon og
              havarier har felt nesten alle pionerprosjekter (inkludert Toftestallen i Øygarden i 1988).
            </p>
          </div>
        </div>

        {/* Interaktiv Marin Energi-modell */}
        <div className="my-6">
          <MarineEnergyModel />
        </div>
      </CollapsibleSection>

      {/* ── 4. TIDEVANN OG HAVVARMETEKRI (OTEC) ─────────────────────────── */}
      <CollapsibleSection
        title="4. Tidevannskraft og OTEC: Forutsigbar gravitasjon og havets termiske ressurser"
        subtitle="Hvorfor tidevann kan planlegges tiår i forveien, og hvordan tropisk temperaturgradient driver OTEC"
        badge="Termisk & Gravitasjon"
        badgeVariant="amber"
      >
        <p>
          Både vindkraft og bølgekraft er <em>intermitterende</em>: De varierer fra time til time med været
          og krever fleksibel backup. Men i havet finnes det to energikilder som bryter dette mønsteret:
          <strong>tidevannskraft</strong> (100 % forutsigbar) og <strong>havvarmekraft (OTEC)</strong>{" "}
          (kontinuerlig grunnlast 24/7).
        </p>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Tidevannsstrømmer: Gravitasjon i trange sund
        </h3>
        <p>
          Tidevann skyldes ikke vær eller solinnstråling, men gravitasjonskreftene fra <strong>månen og
          solen</strong> i samspill med jordklodens rotasjon. Flo og fjære inntreffer med et intervall på
          ca. 12 timer og 25 minutter.
        </p>
        <p>
          Når tidevannsbølgen presses gjennom trange sund mellom øyer og fastland, oppstår det voldsomme
          tidevannsstrømmer. I Norge finner vi noen av verdens sterkeste strømmer:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>Saltstraumen ved Bodø:</strong> Verdens sterkeste malstrøm, der 400 millioner kubikkmeter
            vann presses gjennom et 150 meter bredt sund med hastigheter opp mot 20 knop (10 m/s).
          </li>
          <li>
            <strong>Rystrømmen ved Tromsø</strong> og <strong>Kvalsundet ved Hammerfest</strong>: Her er det
            blitt installert undervannsturbiner som står på havbunnen og høster kraft fra vannmassene.
          </li>
          <li>
            <strong>Fordelen:</strong> Produksjonen kan beregnes på minuttet 50 år inn i fremtiden via
            tidevannstabeller! Ingen andre fornybare kilder har denne forutsigbarheten.
          </li>
        </ul>

        <OrdBoks
          ord="Tidevannsenergi"
          barn="Energi utvunnet fra havets flo- og fjærebevegelser, drevet av gravitasjonskreftene fra månen og solen. Utnyttes via tidevannsturbiner i trange sund med ekstrem forutsigbarhet."
        />

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          OTEC (Ocean Thermal Energy Conversion): Havvarmekraft
        </h3>
        <p>
          I tropiske havområder (mellom 20°N og 20°S) absorberer de øverste 50–100 meterne av havoverflaten
          enorme mengder solstråling og holder en konstant temperatur på <strong>25–28 °C</strong>. Samtidig
          strømmer iskaldt, arktisk og antarktisk bunnvann langs havbunnen fra polene mot ekvator. På 1000
          meters dyp holder vannet bare <strong>4–5 °C</strong>.
        </p>
        <p>
          Denne permanente temperaturforskjellen på over <strong>20 °C</strong> kalles en{" "}
          <Link to="/tema/havstrommer" className={lenke}>
            termoklin
          </Link>
          , og danner grunnlaget for <strong>OTEC</strong>:
        </p>

        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 my-4 space-y-2">
          <p className="font-semibold text-primary">Slik fungerer en lukket OTEC Rankine-syklus:</p>
          <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-foreground/90">
            <li>Varmt overflatevann (26 °C) pumpes inn i en varmeveksler (fordamper).</li>
            <li>
              Et arbeidsmedium med lavt kokepunkt, typisk <strong>ammoniakk (NH₃)</strong>, fordamper til
              høytrykksgass.
            </li>
            <li>Den ekspanderende gassen driver en turbin koblet til en elektrisk generator.</li>
            <li>
              Iskaldt dypvann (4 °C) pumpes opp fra 1000 meters dyp gjennom et gigantisk glassfiberrør og
              avkjøler gassen i en kondensator, slik at ammoniakken blir flytende igjen og pumpes tilbake
              til fordamperen.
            </li>
          </ol>
        </div>

        <p>
          <strong>Hva begrenser OTEC?</strong> Den termodynamiske virkningsgraden er begrenset av{" "}
          <strong>Carnot-grensen</strong>:
        </p>
        <div className="my-2 rounded-lg bg-card/80 p-3 text-center font-mono text-sm text-foreground border border-border">
          η_Carnot = 1 - (T_kald / T_varm) = 1 - (277 K / 299 K) ≈ 7,36 %
        </div>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Med reelle mekaniske og termiske tap blir den faktiske virkningsgraden bare <strong>3–4 %</strong>.
          Men fordi havet er en gratis, uuttømmelig solfanger, spiller den lave virkningsgraden liten rolle
          for drivstoffkostnaden. Den store fordelen er at OTEC leverer <strong>ren grunnlast døgnet rundt,
          året rundt</strong>, helt uavhengig av om solen skinner eller vinden blåser!
        </p>

        <OtecRankineCycleDiagram />

        <OrdBoks
          ord="OTEC (Havvarmekraft)"
          barn="Ocean Thermal Energy Conversion: Kraftproduksjon som utnytter temperaturgradienten mellom solvarmet overflatevann (ca. 26 °C) og kaldt bunnvann (ca. 4 °C) på 1000 m dyp i tropene via en lukket Rankine-syklus med ammoniakk."
        />
      </CollapsibleSection>

      {/* ── 5. NASJONAL OG GLOBAL DRØFTING AV BÆREKRAFT ────────────────── */}
      <CollapsibleSection
        title="5. Bærekraftig utnyttelse nasjonalt og globalt: Konflikter, areal og Norges rolle"
        subtitle="LK20-drøfting: Klima mot naturmangfold, samiske rettigheter, fiskeri og regulerbar vannkraft"
        badge="LK20 Drøfting"
        badgeVariant="warning"
      >
        <p>
          Læreplanen ber eksplisitt om at eleven skal <strong>drøfte</strong> utnyttelsen av
          energiressursene fra hav og luft på en bærekraftig måte, både i et nasjonalt (norsk) og et globalt
          perspektiv.
        </p>
        <p>
          I geofaglig metode betyr «å drøfte» at man aldri kan gi et ensidig svar som «vindkraft er fornybart,
          derfor er det utelukkende positivt». Man må veie motstridende samfunns- og miljøhensyn opp mot
          hverandre:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-2">
            <h4 className="font-semibold text-emerald-400 text-sm">
              Globalt perspektiv: Pådrivet for utslippskutt
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              For å begrense global oppvarming til under 1,5–2 °C må verdens energisystemer fase ut kull,
              olje og fossil gass i et voldsomt tempo. Havvind og landvind er blant de raskeste og mest
              kostnadseffektive måtene å tilføre hundrevis av terawattimer med utslippsfri kraft.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Uten en massiv global utbygging av havvind vil klimamålene glippe, noe som vil utløse
              katastrofale konsekvenser for havis, havnivåstigning og globale økosystemer (IPCC, 2021).
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-2">
            <h4 className="font-semibold text-amber-300 text-sm">
              Nasjonalt perspektiv: Areal, natur og urfolksrettigheter
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              I Norge har vindkraft på land utløst voldsom samfunnsdebatt: Bit-for-bit-nedbygging av urørt
              natur, sprenging av kilometerlange adkomstveier i fjellterreng, ødeleggelse av karbonrike
              myrområder, og kollisjonsfare for truede rovfugler som havørn og hubro.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <strong>Fosen-saken (Høyesterettsdommen i 2021):</strong> Slo fast at vindkraftutbyggingen på
              Fosen i Trøndelag krenket samiske reindriftssamers rett til kulturutøvelse etter FNs konvensjon
              om sivile og politiske rettigheter (artikkel 27). Dette demonstrerer at et klimatiltak kan
              være et menneskerettsbrudd dersom det ikke planlegges med urfolk!
            </p>
          </div>
        </div>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Marine konflikter ved havvindutbygging
        </h3>
        <p>
          Å flytte turbinene fra land til havs fjerner naboklager om støy og skyggekast, men havet er ikke
          et tomt, ubrukt rom:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-foreground/90">
          <li>
            <strong>Fiskeri og tråling:</strong> Sikkerhetssoner rundt vindturbiner og undervannskabler
            stenger fiskeflåten ute fra rike fangstfelt for tobis, reker og sei. Bunntråling kan skade
            eksportkabler på havbunnen.
          </li>
          <li>
            <strong>Gytefelt og marin støy:</strong> Pæling av bunnfaste monopeler sender trykkbølger på
            over 200 desibel gjennom vannet, noe som kan skade hørselen til hval, niser og fisk under
            gytevandring.
          </li>
          <li>
            <strong>Sjøfugl og trekkruter:</strong> Kollisjonsfare og forstyrrelse av hekkeplasser for lunde,
            krykkje og lomvi som jakter i sokkelhavene.
          </li>
          <li>
            <strong>Forsvars- og radarinterferens:</strong> Roterende turbinblader på 200 meters høyde kan
            forstyrre militære overvåkingsradarer og kystradiosamband.
          </li>
        </ul>

        <h3 className="font-display text-lg font-medium tracking-tight text-primary mt-4">
          Norges unike rolle: Vannkraften som Europas grønne buffer
        </h3>
        <p>
          Norge produserer allerede nesten 90 % av sin strøm fra <strong>regulerbar vannkraft</strong> med
          store vannmagasiner i fjellet (f.eks. Blåsjø). Når det blåser storm over Nordsjøen, produserer
          havvindparkene i Tyskland og Danmark så mye strøm at strømprisene kan bli negative. Da kan Norge
          stenge turbinene i vannkraftverkene og spare vannet i magasinene.
        </p>
        <p>
          Når det derimot er vindstille over Europa (en såkalt <em>dunkelflaute</em>), kan Norge åpne slusene
          og eksportere regulerbar vannkraft til kontinentet via undersjøiske kabler som NordLink og North Sea
          Link. Samspillet mellom norsk vannkraft og europeisk havvind er kanskje det viktigste enkeltelementet
          i et bærekraftig europeisk nullutslippssystem!
        </p>

        <WindPowerTradeoffDiagram />
        <EnergySourcesDiagram />
      </CollapsibleSection>

      {/* ── SAMMENFATNING & BEGREPER ─────────────────────────────────── */}
      <h2 className="font-display text-2xl font-medium tracking-tight pt-4">
        Viktige fagbegreper
      </h2>
      <TermGrid>
        <Term
          name="Kubikkloven"
          def="Effekten i en vindstrøm vokser med kubikken av vindhastigheten (P = ½ · ρ · A · v³). Plassering med god vind trumfer alt."
        />
        <Term
          name="Betz' lov"
          def="Teoretisk maksimal virkningsgrad for en vindturbin i fri luftstrøm er 16/27 ≈ 59,3 %."
        />
        <Term
          name="Kapasitetsfaktor"
          def="Faktisk årsproduksjon delt på maksimal teoretisk produksjon. Havvind (48–55 %) er langt jevnere enn landvind (32–38 %)."
        />
        <Term
          name="Bunnfast vs. flytende"
          def="Bunnfast krever grunn sokkel (<50 m). Dype norske farvann og Norskerenna (200–350 m) krever flytende understell."
        />
        <Term
          name="OTEC (Havvarmekraft)"
          def="Utnytter termoklinen (ΔT ≥ 20 °C) mellom overflate og dyphav i tropene for kontinuerlig 24/7 grunnlast."
        />
        <Term
          name="Bærekraftsdrøfting"
          def="Helhetlig vurdering av klima, naturinngrep, urfolksrettigheter, forsyning og biologisk mangfold."
        />
      </TermGrid>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <Callout title="Til eksamen">
          <p>
            Når du besvarer oppgaver om energi fra hav og luft: Vis alltid at du forstår{" "}
            <strong>kubikkloven</strong> matematisk, og hvorfor kontinentalsokkelens batymetri (dybde)
            bestemmer teknologi- og fundamentvalg.
          </p>
          <p className="mt-1">
            Husk at en sensor forventer en nyansert drøfting av bærekraft: Ta med både globale fordeler
            (klimakutt) og lokale konflikter (reindrift, fiskeri, støy, arealinngrep).
          </p>
        </Callout>

        <Callout title="Vanlige misforståelser">
          <p>
            • Fornybar energi er <strong>ikke</strong> automatisk konfliktfri eller naturvennlig.
          </p>
          <p className="mt-1">
            • Flytende havvind er <strong>ikke</strong> et valg Norge tar fordi det er morsomt, men fordi
            sokkelen vår er for dyp for bunnfaste monopeler.
          </p>
          <p className="mt-1">
            • Tidevann drives <strong>ikke</strong> av solen eller været, men av månen og jordrotasjonens
            gravitasjonskrefter.
          </p>
        </Callout>
      </div>

      {/* ── EKSAMENSQUIZ (LK20) ────────────────────────────────────────── */}
      <h2 className="font-display text-2xl font-medium tracking-tight pt-2">
        Test deg selv: Energi fra hav og atmosfære
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        Disse spørsmålene tester din forståelse av energifysikk, havteknologier, sokkelgeologi og
        bærekraftsdrøfting etter læreplanmålene i Geofag 2.
      </p>

      <Quiz
        questions={[
          {
            prompt:
              "Hvorfor produserer en vindturbin nesten dobbelt så mye energi dersom vindhastigheten øker fra 7,0 m/s til 8,8 m/s?",
            options: [
              "Fordi turbinbladene automatisk blir dobbelt så lange i sterk vind.",
              "Fordi effekten i luftstrømmen er proporsjonal med kubikken av vindhastigheten (P ∝ v³), og 8,8³ / 7,0³ ≈ 681 / 343 ≈ 1,99.",
              "Fordi luftens tetthet dobles når det blåser frisk bris.",
              "Fordi Betz' grense bare gjelder ved lave vindhastigheter.",
            ],
            answer: 1,
            explain:
              "Kubikkloven sier at P = ½ · ρ · A · v³. Øker vindhastigheten med bare ca. 26 %, dobles effekten (1,26³ ≈ 2,0). Dette er grunnen til at lokalisering i områder med høy middelvind er fullstendig avgjørende.",
          },
          {
            prompt:
              "Hva er den geologiske hovedårsaken til at Norge satser tungt på flytende havvind (som Hywind Tampen), mens Danmark primært bygger bunnfast havvind?",
            options: [
              "Danmark har forbudt flytende plattformer på grunn av fiskerilovgivning.",
              "Norskekysten er preget av en dyp kontinentalsokkel og den glasialt eroderte Norskerenna (200–350 m dyp), mens Danmarks sokkel er en grunn sedimentær slette (< 50 m dyp) egnet for monopeler.",
              "Bunnfaste turbiner tåler ikke saltvannet i Norskehavet.",
              "Norge mangler stålproduksjon til å lage bunnfaste rør.",
            ],
            answer: 1,
            explain:
              "Bunnfaste monopeler blir teknisk og økonomisk uforsvarlige på dyp over 50 meter. Utenfor Norskekysten stuper havbunnen rett ned i Norskerenna på 200–350 m, noe som tvinger frem flytende understell forankret med sugeankere.",
          },
          {
            prompt:
              "Hva sier Betz' lov om teoretisk maksimal utnyttelse av kinetisk energi i en vindturbin i fri luftstrøm?",
            options: [
              "En turbin kan maksimalt hente ut 33,3 % fordi friksjonen i generatoren spiser opp resten.",
              "En turbin kan hente ut 100 % dersom bladene lages av karbonfiber.",
              "En turbin kan maksimalt hente ut 16/27 (ca. 59,3 %) fordi luften bak rotoren må beholde 1/3 av hastigheten for å slippe unna og gi plass til ny innkommende luft.",
              "Grensen bestemmes av Carnots virkningsgrad for varmekraftmaskiner.",
            ],
            answer: 2,
            explain:
              "Dersom en turbin stoppet 100 % av vinden, ville lufthastigheten bak rotoren blitt null. Stillestående luft kan ikke fjernes og ville blokkert rotoren. Optimal oppbremsing er v_ut = v_inn / 3, noe som gir en maksimal teoretisk virkningsgrad på 16/27 ≈ 59,26 %.",
          },
          {
            prompt:
              "Hva er den største driftsmessige fordelen med tidevannskraft sammenlignet med vindkraft og bølgekraft?",
            options: [
              "Tidevannskraft fungerer bare når solen skinner fra skyfri himmel.",
              "Tidevannskraft er 100 % forutsigbar tiår frem i tid, fordi den styres av gravitasjonskreftene fra månen og solen, og er helt uavhengig av det lokale været.",
              "Tidevannsturbiner trenger aldri vedlikehold fordi sjøvann smører mekanikken.",
              "Tidevannskraft produserer direkte likestrøm uten behov for generator.",
            ],
            answer: 1,
            explain:
              "Vind og bølger er væravhengige og intermitterende. Tidevannet styres derimot av himmelmekanikk og gravitasjon, og nøyaktig flo, fjære og strømhastighet kan forutsies i tidevannstabeller tiår i forveien.",
          },
          {
            prompt:
              "Hvorfor er havvarmekraft (OTEC) i stand til å levere stabil grunnlast 24 timer i døgnet, selv om Carnot-virkningsgraden er under 8 %?",
            options: [
              "Fordi anlegget brenner naturgass fra havbunnen om natten.",
              "Fordi temperaturforskjellen (ΔT ≥ 20 °C) mellom det solvarmede overflatevannet og det kalde dyphavsvannet (1000 m dyp) er permanent til stede i tropene døgnet rundt.",
              "Fordi ammoniakk genererer varme automatisk når den blandes med sjøvann.",
              "Fordi OTEC-anlegg utelukkende plasseres ved undersjøiske vulkaner.",
            ],
            answer: 1,
            explain:
              "I tropene er den vertikale termoklinen permanent: Solen holder overflatevannet på 25–28 °C, mens arktisk bunnvann holder 4 °C på 1000 m dyp. Havet fungerer som et gigantisk batteri som leverer uavbrutt varmeenergi dag og natt.",
          },
          {
            prompt:
              "I en LK20-drøfting av landbasert vindkraft i Norge: Hvorfor var Fosen-dommen i Norges Høyesterett (2021) et prinsipielt vendepunkt?",
            options: [
              "Den slo fast at vindmøller produserer for lite strøm til å være lønnsomme.",
              "Den fastslo at utbyggingen krenket samiske reindriftssamers rett til kulturutøvelse etter FNs konvensjon om sivile og politiske rettigheter (artikkel 27), og viste at klimatiltak må veies mot urfolksrettigheter.",
              "Den krevde at alle vindturbiner i Norge må males grønne.",
              "Den forbød eksport av fornybar strøm til Tyskland og Storbritannia.",
            ],
            answer: 1,
            explain:
              "Fosen-dommen viste med all tydelighet kjernen i bærekraftsbegrepet: Et prosjekt er ikke automatisk bærekraftig bare fordi det kutter CO₂. Miljø, naturmangfold, samfunn og urfolks rettigheter til sine tradisjonelle beiteområder må ivaretas i den helhetlige vurderingen.",
          },
        ]}
      />
    </TopicLayout>
  );
}
