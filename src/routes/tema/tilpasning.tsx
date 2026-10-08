import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  AdaptationExamFrameworkDiagram,
  ImpactLevelsDiagram,
} from "@/components/diagrams";
import { StormwaterAdaptationModel } from "@/components/models/stormwater-adaptation-model";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER_G2 } from "@/lib/kilder-g2";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/tilpasning")!;

export const Route = createFileRoute("/tema/tilpasning")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/tilpasning",
    }),
  component: TilpasningPage,
});

function TilpasningPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Samfunn"
      title="Konsekvenser og tilpasning"
      lead="Klimaendringer er geofysikk; konsekvenser er hva fysikken gjør med mennesker, infrastruktur, matproduksjon og sårbare økosystemer. Tilpasning handler om å beskytte samfunnet mot været som allerede er uunngåelig. Utslippskutt handler om å sette et tak på den framtidige skaden. Kompetansemålet i LK20 krever at du drøfter begge deler — og analyserer hvem som bærer risikoen og hvem som betaler regningen."
      banner="/images/tema-katastrofer.jpg"
      bannerAlt="En atlantisk orkan sett fra verdensrommet, med tydelig øye"
      prev={{ to: "/tema/vaerkatastrofer", label: "Forrige: Værkatastrofer" }}
      next={{ to: "/tema/energi-hav-luft", label: "Neste: Energi fra hav og luft" }}
      kilder={KILDER_G2.tilpasning}
      bodyMode="coded"
    >
      <Callout title="Kompetansemål i Geofag 2 (LK20)">
        <p>
          Drøfte konsekvenser av klimaendringer for enkeltmennesker, samfunn og økosystem, og
          vurdere bærekraftige løsninger for hvordan enkeltmennesker og samfunn kan redusere og
          tilpasse seg klimaendringer i nåtid og framtid.
        </p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Sentrale kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>IPCCs risikorammeverk:</em> Samspillet mellom Fare (Hazard), Eksponering (Exposure) og Sårbarhet (Vulnerability).</p>
          <p>• <em>Urban overvannshåndtering:</em> Byhydrologi, den rasjonelle formelen (Q = C · I · A) og Treleddsstrategien (LOD).</p>
          <p>• <em>Flomvern og vassdragsforvaltning:</em> Grå vs. blågrønn infrastruktur, NVEs flomsonekart og erfaringene fra ekstremværet Hans.</p>
          <p>• <em>Kyst og havnivå:</em> Global havnivåstigning mot isostatisk landheving, stormfloens fysikk og TEK17 sikkerhetsklasser.</p>
          <p>• <em>Samfunnssikkerhet og etikk:</em> ROS-analyser i plan- og bygningsloven, maltilpasning og klimarettferdighet.</p>
        </div>
      </Callout>

      <p>
        Målet inneholder <strong>to verb</strong> som ikke betyr det samme: <em>Redusere (klimatiltak / mitigation)</em>{" "}
        betyr å bremse selve pådrivet ved å kutte utslipp av CO₂ og metan. <em>Tilpasse (tilpasning / adaptation)</em>{" "}
        betyr å bygge samfunnet slik at vi unngår skade fra ekstremværet som allerede er «bestilt» av klimasystemets
        treghet.
      </p>

      {/* ================= SEKSJON 1: SÅRBARHET & RAMMEVERK ================= */}
      <CollapsibleSection
        title="1. Klimasårbarhet, risiko og IPCC-rammeverket: To verb og tre nivåer"
        subtitle="Fare, eksponering og sårbarhet — hvorfor kutt og tilpasning må virke sammen"
        badge="Risiko & sårbarhet"
        badgeVariant="primary"
        defaultOpen={true}
      >
        <p>
          Et ekstremt værfenomen skaper ikke en katastrofe alene. Ifølge FNs klimapanel (IPCC, 2022)
          er klimarisiko produktet av tre overlappende faktorer:
        </p>

        <div className="grid gap-3 sm:grid-cols-3 pt-2 text-xs">
          <div className="rounded-xl border border-sky-500/30 bg-sky-950/15 p-3.5 space-y-1">
            <span className="font-semibold text-sky-300 text-sm">1. Fare (Hazard)</span>
            <p className="text-muted-foreground leading-relaxed">
              Selve den fysiske naturhendelsen forårsaket av atmosfære- eller havfysikk: et 100-års styrtregn,
              en stormflo på 2,3 meter, en tørkebølge i tre måneder eller et jordskred.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-3.5 space-y-1">
            <span className="font-semibold text-amber-300 text-sm">2. Eksponering (Exposure)</span>
            <p className="text-muted-foreground leading-relaxed">
              Hvem og hva som fysisk befinner seg i faresonen: bolighus i en flomslette, et sykehus
              under en ustabil fjellside, jernbanespor langs en elvebredd eller befolkning i lavt kystland.
            </p>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-rose-950/15 p-3.5 space-y-1">
            <span className="font-semibold text-rose-300 text-sm">3. Sårbarhet (Vulnerability)</span>
            <p className="text-muted-foreground leading-relaxed">
              Tilbøyeligheten til å bli skadet og evnen til å tåle og håndtere krisen: bygningsstandard
              (har huset kjeller?), beredskapsvarsling, avløpskapasitet, økonomisk kapital og helse.
            </p>
          </div>
        </div>

        <div className="my-2 rounded-xl border border-border bg-card p-3 text-center text-xs sm:text-sm font-semibold text-primary">
          Risiko = Fare (Hazard) × Eksponering (Exposure) × Sårbarhet (Vulnerability)
        </div>

        <p className="text-foreground/90">
          Dette forklarer hvorfor to kystbyer som treffes av nøyaktig samme stormflo kan oppleve to helt ulike
          utfall. By A har bygd flomporter, forhøyet kaikanten og har automatiske nødvarsler på mobilen (lav sårbarhet).
          By B har tette flater, kjellerboliger i gammel havbunn og mangelfull varsling (høy sårbarhet). Faren er
          identisk, men katastrofen rammer bare den ene.
        </p>

        <h4 className="font-display text-lg font-medium tracking-tight text-primary pt-3">
          De tre nivåene: Enkeltmenneske, samfunn og økosystem
        </h4>
        <p className="text-foreground/90">
          En eksamenstekst som bare beskriver enkeltpersonen i kjelleren, eller som bare nevner korallrev,
          har bare besvart en brøkdel av kompetansemålet. Samme hetebølge eller styrtregn har tre parallelle historier:
        </p>

        <ImpactLevelsDiagram />

        <ul className="list-disc space-y-2 pl-6 text-foreground/90 text-sm">
          <li>
            <strong>1. Enkeltmennesket:</strong> Fysisk og psykisk helse, bolig og privatøkonomi. Eldre i
            loftsetasjer uten kjøling under hetebølger, en familie som får kloakk inn i kjellerstuen, eller
            en bonde som mister årets kornavling i en tørkesommer.
          </li>
          <li>
            <strong>2. Samfunnet:</strong> Kritisk infrastruktur, forsyningssikkerhet og offentlige budsjetter.
            Når Dovrebanen eller E6 stenges av flom og skred, bryter varetransporten sammen. Kommuner må bruke
            millioner på reparasjon av vann- og avløpsnett, og forsikringspremiene for alle innbyggere skyter i været.
          </li>
          <li>
            <strong>3. Økosystemet:</strong> Tap av biologisk mangfold og økologisk ubalanse. Havoppvarming fører
            til korallbleking og tvinger torskebestanden i Nordsjøen nordover mot Barentshavet. Fjellreven presses
            oppover mot snaufjellet av rødrev, og tørke tømmer myrer slik at de slutter å være karbonlagre og
            i stedet avgir CO₂ til atmosfæren.
          </li>
        </ul>

        {/* MALTILPASNING */}
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/15 p-4 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-rose-300 text-sm">Advarsel mot maltilpasning (Maladaptation)</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Et klimatilpasningstiltak kan virke genialt på kort sikt, men vise seg å gjøre samfunnet mer sårbart
            på lang sikt, eller forverre situasjonen for andre. Dette kalles <strong>maltilpasning</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>
              <strong>Flomvoll-paradokset:</strong> Man bygger en flomvoll langs elven. Innbyggerne føler seg
              helt trygge og kommunen tillater fortetting med nye boligfelt rett bak vollen. Når en ekstremflom
              som overskrider vollhøyden inntreffer, blir skadene mangedoblet.
            </li>
            <li>
              <strong>Harde sjømurer foran stranden:</strong> Betongmuren reflekterer bølgeenergien og vasker
              bort sand og beskyttende tareskog foran muren, slik at erosjonen eksploderer hos naboene lenger bort.
            </li>
            <li>
              <strong>Uhemmet bruk av aircondition:</strong> Kjøler ned enkeltrom under hetebølger, men blåser
              varmen ut i bygatene (øker urban varmeøy-effekt) og øker strømforbruket.
            </li>
          </ul>
        </div>

        <OrdBoks
          ord="Sårbarhet"
          barn="Hvor mottakelig et menneske, bygg eller samfunn er for skade når det utsettes for en naturfare, og hvor god evne det har til å tilpasse seg og gjenopprette funksjon."
        />
        <OrdBoks
          ord="Maltilpasning"
          barn="Tiltak ment for klimatilpasning som utilsiktet øker sårbarheten på sikt, låser samfunnet til uholdbare løsninger eller forskyver risikoen over på naboer og framtidige generasjoner."
        />
      </CollapsibleSection>

      {/* ================= SEKSJON 2: OVERVANN & TRELEDDSSTRATEGIEN ================= */}
      <CollapsibleSection
        title="2. Overvannshåndtering i byer: Byhydrologi og Treleddsstrategien"
        subtitle="Tette flater, dimensjonerende avrenning (Q = C · I · A) og LOD (Lokal overvannsdisponering)"
        badge="Overvann"
        badgeVariant="sky"
      >
        <p>
          I naturen fungerer skogbunn, myrer og jordsmonn som gigantiske svamper. Når regnet faller over et
          uberørt skogsområde, infiltreres <strong>80–90 %</strong> av vannet direkte ned i markvannssonen
          og grunnvannet. Bare en ørliten brøkdel renner av på overflaten.
        </p>
        <p>
          Når vi bygger byer, asfalterer vi veier, legger betongheller og bygger tette hustak. De naturlige
          infiltrasjonsveiene sperres. Resultatet er <strong>overvann</strong>: overflateavrenning av regn og
          smeltevann som ikke finner veien ned i grunnen.
        </p>

        <PhotoFigure
          src="/images/fig-ekstremnedbor.jpg"
          alt="Oversvømt bygate der overvann flommer over fortau og inn mot kjellervinduer"
          heading="Byhydrologisk overbelastning: Når regnet ikke finner veien ned"
          caption="Illustrasjon. Et urbant bymiljø under et kraftig styrtregn. Tradisjonelle sluk og rørledninger under bakken er dimensjonert for fortidens klima (typisk 10–20-årsregn). Når nedbørsintensiteten overstiger rørnettets kapasitet, oppstår tilbakeslag, kumlokk presses opp av trykket, og vannet flommer inn i kjellere og næringsbygg."
          marks={[
            { x: 18, y: 35, n: "1", text: "Tett asfalt og tak (C ≈ 0,90)", tone: "low" },
            { x: 52, y: 68, n: "2", text: "Overbelastet sluk / rørnett", tone: "warm" },
            { x: 82, y: 78, n: "3", text: "Innsig i kjelleretasjer", tone: "warm" },
            { x: 35, y: 88, n: "4", text: "Nødvendig flomvei (forsenket gate)", tone: "teal" },
          ]}
          points={[
            {
              n: "1",
              label:
                "Tette flater: Asfalt og tak har avrenningskoeffisient C ≈ 0,90. 90 % av nedbøren omdannes umiddelbart til overflateavrenning i løpet av sekunder.",
            },
            {
              n: "2",
              label:
                "Kapasitetsbrudd i rør: Rørnettet fylles opp til randen. Vannet kan ikke lenger renne ned i slukene, og overskuddsvannet samler seg på overflaten.",
            },
            {
              n: "3",
              label:
                "Kjellerinnsig: Vannet søker laveste punkt og trenger inn gjennom kjellervinduer, lyskasser og tilbakeslag i avløpsrør (en av de dyreste forsikringspostene i Norge).",
            },
            {
              n: "4",
              label:
                "Flomvei: Ved å utforme kantsteiner og gateløp med forsenkninger, kan vannet ledes trygt på overflaten ned til sjø, fjord eller en park tilrettelagt for midlertidig oversvømmelse.",
            },
          ]}
        />

        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Den rasjonelle formelen for overvann: Q = C · I · A
          </h4>
          <p>
            For å dimensjonere overvannstiltak i et byområde bruker geofagfolk og ingeniører den{" "}
            <strong>rasjonelle formelen</strong>:
          </p>

          <div className="rounded-xl border border-border bg-card/60 p-4 space-y-2 text-xs">
            <div className="font-mono text-sm font-bold text-sky-400">
              Q = (C · I · A) / 3,6  [liter per sekund, l/s]
            </div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Q:</strong> Dimensjonerende maksimal vannføring (avrenning) i liter per sekund (l/s).
              </li>
              <li>
                <strong>C:</strong> Avrenningskoeffisient (dimensjonsløs verdi mellom 0 og 1) som forteller
                hvor stor andel av regnet som renner av på overflaten.
              </li>
              <li>
                <strong>I:</strong> Nedbørsintensitet i millimeter per time (mm/t) for en valgt varighet og
                gjentaksintervall (fra IVF-kurver, Intensitet-Varighet-Frekvens).
              </li>
              <li>
                <strong>A:</strong> Nedbørsfeltets areal i hektar (1 hektar = 10 000 m²).
              </li>
            </ul>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card/70 p-3 pt-2 text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-1.5 font-semibold">Overflatetype</th>
                  <th className="pb-1.5 font-semibold">Avrenningskoeffisient (C)</th>
                  <th className="pb-1.5 font-semibold">Hva skjer med regnet?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-muted-foreground">
                <tr>
                  <td className="py-2 font-medium text-rose-400">Asfalt, betong og tette tak</td>
                  <td className="py-2 font-mono font-bold">0,85–0,95</td>
                  <td className="py-2">90 % renner av umiddelbart; nesten null infiltrasjon.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-teal-400">Blågrønne tak (sedum og fordrøyningstak)</td>
                  <td className="py-2 font-mono font-bold">0,30–0,50</td>
                  <td className="py-2">Sedummatter og lettvektsjord suger opp vann og fordamper det.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-sky-400">Permeabel belegningsstein / grusdekker</td>
                  <td className="py-2 font-mono font-bold">0,20–0,30</td>
                  <td className="py-2">Vannet siver ned gjennom åpne fuger til underliggende pukk.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-emerald-400">Gressplener, parker og regnbed</td>
                  <td className="py-2 font-mono font-bold">0,05–0,15</td>
                  <td className="py-2">Jordsmonn og planterøtter infiltrerer nesten all nedbør lokalt.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TRELEDDSSTRATEGIEN */}
        <div className="rounded-xl border border-sky-500/40 bg-sky-950/20 p-4 space-y-3">
          <h4 className="font-display text-base font-semibold text-sky-300">
            Treleddsstrategien for overvannshåndtering (LOD - Lokal Overvannsdisponering)
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Statlige planretningslinjer (Miljødirektoratet og NVE) krever at all ny arealutvikling skal følge{" "}
            <strong>Treleddsstrategien</strong>. Målet er å gjenskape naturens egen hydrologiske balanse:
          </p>

          <div className="grid gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1">
              <span className="font-semibold text-emerald-400">Trinn 1: Fange opp og infiltrere</span>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Hverdagsregn (opptil ca. 15–20 mm):</strong> Håndteres der det faller via regnbed,
                infiltrasjonsgrøfter, permeable belegningssteiner og grønne tak. Ingen belastning på rørnettet.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-1">
              <span className="font-semibold text-amber-400">Trinn 2: Forsinke og fordrøye</span>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Større regnskyll (20–50 mm):</strong> Vannmengder som overstiger infiltrasjonsevnen,
                forsinkes i åpne fordrøyningsbassenger, dammer eller underjordiske fordrøyningskassetter,
                og slippes ut med kontrollert struping.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-1">
              <span className="font-semibold text-rose-400">Trinn 3: Sikre trygge flomveier</span>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Ekstremt styrtregn (over 50–70 mm):</strong> Vann som overstiger rør og magasiner,
                ledes kontrollert på overflaten langs forsenkede gateløp, kanaler eller grøntdrag bort fra
                hus og ned til sjø eller elv.
              </p>
            </div>
          </div>
        </div>

        <OrdBoks
          ord="Treleddsstrategien"
          barn="Prinsipp for overvannshåndtering: 1) Infiltrere hverdagsregn lokalt, 2) Forsinke og fordrøye større nedbør i bassenger, og 3) Lede ekstremt overskuddsvann trygt i planlagte flomveier på overflaten."
        />
        <OrdBoks
          ord="Avrenningskoeffisient (C)"
          barn="Andelen av nedbøren som renner av på overflaten. Nær 0,9 for asfalt og tette tak; nær 0,1 for skogbunn og gressplener."
        />
      </CollapsibleSection>

      {/* ================= INTERAKTIV MODELL ================= */}
      <section className="my-8">
        <StormwaterAdaptationModel />
      </section>

      {/* ================= SEKSJON 3: FLOMVERN & NATURBASERTE LØSNINGER ================= */}
      <CollapsibleSection
        title="3. Flomvern, elvesikring og naturbaserte løsninger: Grå vs. blågrønn infrastruktur"
        subtitle="Flomsonekartlegging, gjenåpning av vassdrag og leksene fra ekstremværet Hans"
        badge="Flomvern"
        badgeVariant="teal"
      >
        <p>
          I Norge er vassdragsflom en av de største naturfarene som truer samfunnssikkerheten. Flommen kan
          være en langvarig vårflom drevet av snøsmelting, eller en lynrask regnflom om høsten og sommeren.
          Når klimaet blir varmere og atmosfæren holder mer vanndamp (ca. 7 % mer per grad ifølge{" "}
          <strong>Clausius-Clapeyron-likningen</strong>), øker frekvensen av styrtregn og flomtopper.
        </p>

        <PhotoFigure
          src="/images/fig-erosjonssikring.jpg"
          alt="Elveløp der elvebredden er sikret med grov sprengstein (plastring) og bevart vegetasjon"
          heading="Elvesikring og flomvern: Kombinasjon av grå og naturbasert sikring"
          caption="Illustrasjon. Et flomutsatt elveavsnitt sikret mot erosjon og oversvømmelse. NVE krever i dag at flomsikring i størst mulig grad skal bevare elvens naturlige dynamikk og økologiske funksjoner, samtidig som bebyggelse skjermes med tilstrekkelig fribord over dimensjonerende 200-årsflom."
          marks={[
            { x: 25, y: 40, n: "1", text: "Plastring med sprengstein (grå)", tone: "teal" },
            { x: 70, y: 30, n: "2", text: "Elveslette & kantvegetasjon (NBS)", tone: "cold" },
            { x: 45, y: 75, n: "3", text: "Flomvoll med sikkerhetsmargin", tone: "warm" },
          ]}
          points={[
            {
              n: "1",
              label:
                "Plastring med grov sprengstein: Beskytter yttersvinger mot bunnerosjon og graving under store flommer, og hindrer at elven undergraver veier og husfundamenter.",
            },
            {
              n: "2",
              label:
                "Kantvegetasjon og naturlig flomslette: Røttene binder jordsmonnet mekanisk, mens trærne bremser vannets strømhastighet og gir naturlig fordrøyning.",
            },
            {
              n: "3",
              label:
                "Flomvoll med fribord: Bygges med toppen minst 0,5 meter over beregnet 200-års flomvannstand inkludert klimapåslag, for å tåle bølgeoppskyll og drivgods.",
            },
          ]}
        />

        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Grå infrastruktur vs. Naturbaserte løsninger (Blågrønn struktur)
          </h4>
          <p>
            Historisk sett forsøkte ingeniører å temme elvene med <em>grå infrastruktur</em>: rette ut
            meandere, bygge lukkede betongkanaler (kulverter) og reise høye flomvoller. Denne strategien
            viser seg i dag ofte å være uhensiktsmessig:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              <span className="font-semibold text-amber-400 text-sm">Tradisjonell grå infrastruktur</span>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Ulemper:</strong> Betongkulverter har en fast diameter. Når nedbøren overstiger
                rørets kapasitet, oppstår det propper av drivtømmer og stein foran inntaket, og vannet
                tar nye, ukontrollerte veier gjennom bebyggelsen. Retting av elver øker strømhastigheten
                og skyver flombølgen med voldsom kraft nedstrøms til nabokommunen.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              <span className="font-semibold text-emerald-400 text-sm">Blågrønne og naturbaserte løsninger (NBS)</span>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Fordeler:</strong> Gjenåpning av lukkede bybekker (som Hovinbekken og Alna i Oslo,
                og Ilabekken i Trondheim) gir elven plass til å oversvømme trygge grøntarealer. Bevaring av
                myrer og flomsletter kutter flomtoppen naturlig, renser vannet og gjenoppretter habitater
                for fisk og insekter.
              </p>
            </div>
          </div>
        </div>

        {/* NVE FLOMSONEKART */}
        <div className="rounded-xl border border-border bg-card/70 p-4 space-y-2 text-xs">
          <h5 className="font-semibold text-foreground text-sm">
            Norges vassdrags- og energidirektorat (NVE) og flomsonekartlegging
          </h5>
          <p className="text-muted-foreground leading-relaxed">
            NVE utarbeider detaljerte <strong>flomsonekart</strong> for alle utsatte vassdrag i Norge.
            Kartene viser beregnet oversvømmelsesareal og vanndybde for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li><strong>20-årsflom (Q20):</strong> Statistisk sannsynlighet på 5 % hvert år.</li>
            <li><strong>100-årsflom (Q100):</strong> Statistisk sannsynlighet på 1 % hvert år.</li>
            <li><strong>200-årsflom (Q200):</strong> Statistisk sannsynlighet på 0,5 % hvert år. Dette er det lovfestede sikkerhetskravet for nye bolighus i TEK17.</li>
          </ul>
          <p className="text-muted-foreground pt-1">
            <strong>Klimapåslag:</strong> NVE legger nå inn et standard klimapåslag på{" "}
            <strong>20 % til 40 % økning i vannføring</strong> i flomberegningene fram mot år 2100,
            avhengig av om nedbørsfeltet domineres av regnflom eller snøsmelteflom.
          </p>
        </div>

        <OrdBoks
          ord="Flomsonekart"
          barn="Temakart fra NVE som viser arealer som oversvømmes ved flommer med ulike gjentaksintervaller (20, 100 og 200 år). Danner det juridiske grunnlaget for arealplaner etter plan- og bygningsloven."
        />
        <OrdBoks
          ord="Naturbaserte løsninger (NBS)"
          barn="Tiltak som bruker naturens egne økosystemer og egenskaper (våtmarker, flomsletter, gjenåpnede bekker og tareskog) til å dempe flom- og erosjonsrisiko."
        />
      </CollapsibleSection>

      {/* ================= SEKSJON 4: HAVNIVÅ & STORMFLO ================= */}
      <CollapsibleSection
        title="4. Havnivåstigning, stormflo og kysttilpasning: Havets trykk mot land"
        subtitle="Termisk ekspansjon, bresmelting, stormfloens fysikk og Norges isostatiske landheving"
        badge="Kyst & hav"
        badgeVariant="amber"
      >
        <p>
          Langs Norges langstrakte kystlinje møtes to motstridende geofysiske krefter:{" "}
          <strong>global havnivåstigning</strong> som løfter vannflaten, og{" "}
          <strong>isostatisk landheving</strong> som løfter berggrunnen under føttene våre.
        </p>


        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Hvorfor stiger havet globalt?
          </h4>
          <p>
            Den globale havnivåstigningen drives av to fundamentale termodynamiske prosesser:
          </p>
          <ol className="list-decimal space-y-2 pl-6 text-sm">
            <li>
              <strong>Termisk ekspansjon av sjøvann (~40 % av observert stigning):</strong> Når
              verdenshavene absorberer over 90 % av den ekstra varmen fra drivhuseffekten, utvider
              vannmolekylene seg. Varmt vann tar mer plass enn kaldt vann.
            </li>
            <li>
              <strong>Smelting av landbasert is (~60 % av observert stigning):</strong> Smelting av
              innlandsisen på Grønland, innlandsisen i Antarktis og tusenvis av fjellbreer over hele kloden
              tilfører nytt fysisk vannvolum til havet. (Havis som smelter i Polhavet øker derimot ikke
              havnivået, akkurat som isbiter som smelter i et glass vann!).
            </li>
          </ol>
        </div>

        {/* NORSK LANDHEVING VS HAVNIVÅ */}
        <div className="rounded-xl border border-border bg-card/60 p-4 space-y-3">
          <h5 className="font-semibold text-foreground text-sm">
            Geografisk ulikhet i Norge: Landheving mot havnivåstigning
          </h5>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Under siste istid (Weichsel) var innlandsisen på sitt tykkeste over Bottenviken og
            Østlandet. Jordskorpen ble presset hundrevis av meter ned i den seige mantelen. Da isen
            smeltet for om lag 10 000 år siden, begynte landet å sprette tilbake:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-lg bg-card p-3 border border-border">
              <span className="font-semibold text-emerald-400">Østlandet og Oslofjorden (+4–5 mm/år):</span>
              <p className="mt-1 text-muted-foreground">
                Her er landhevingen så kraftig at den har holdt tritt med den historiske havnivåstigningen.
                Først mot slutten av dette århundret vil global stigning ta igjen landhevingen i Oslo.
              </p>
            </div>
            <div className="rounded-lg bg-card p-3 border border-border">
              <span className="font-semibold text-rose-400">Vestlandet og Sørlandet (+1–2 mm/år):</span>
              <p className="mt-1 text-muted-foreground">
                I Bergen, Stavanger, Kristiansand og Lofoten var isen tynnere, og hevingen er svak.
                Her overstiger den globale havnivåstigningen landhevingen allerede i dag! Kystbyene i
                vest og sør må forberede seg på en netto havnivåstigning på <strong>0,5 til 0,8 meter</strong>{" "}
                fram mot år 2100.
              </p>
            </div>
          </div>
        </div>

        <OrdBoks
          ord="Stormflo"
          barn="Ekstremt høy vannstand langs kysten forårsaket av en kombinasjon av lavtrykk (invers barometereffekt), kraftig pålandsvind (vindstuing) og astronomisk springflo."
        />
        <OrdBoks
          ord="Invers barometereffekt"
          barn="Fysisk heving av havoverflaten under et lavtrykk fordi atmosfæren presser mindre ned på vannet. 1 hPa trykkfall gir omtrent 1 cm stigning i vannspeilet."
        />
      </CollapsibleSection>

      {/* ================= SEKSJON 5: SAMFUNNSSIKKERHET & LOVVERK ================= */}
      <CollapsibleSection
        title="5. Samfunnssikkerhet, lovverk og beredskap: Fra NVE til kommunal arealplan"
        subtitle="Plan- og bygningsloven, TEK17 sikkerhetsklasser, ROS-analyser og klimafremskrivninger"
        badge="Beredskap"
        badgeVariant="warning"
      >
        <p>
          Klimatilpasning er ikke bare en teoretisk øvelse for forskere; det er et strengt lovfestet
          ansvar for norske kommuner, utbyggere og statlige etater. Det viktigste verktøyet vi har for å
          unngå framtidige flom- og skredkatastrofer er <strong>arealplanlegging</strong>.
        </p>

        <AdaptationExamFrameworkDiagram />

        <div className="space-y-3 pt-2 text-foreground/90">
          <h4 className="font-display text-lg font-medium tracking-tight text-primary">
            Plan- og bygningsloven (PBL) og ROS-analyser
          </h4>
          <p>
            Ifølge <strong>Plan- og bygningsloven § 28-1</strong> kan grunn bare bebygges dersom det foreligger
            tilstrekkelig sikkerhet mot naturpåkjenninger som flom, stormflo, kvikkleireskred og steinsprang.
            Før et nytt område kan reguleres til boliger, næring eller skole, krever loven at kommunen eller
            utbygger gjennomfører en <strong>ROS-analyse (Risiko- og sårbarhetsanalyse)</strong>.
          </p>
          <p>
            ROS-analysen må ta inn over seg <strong>klimafremskrivninger mot år 2100</strong> fra Norsk
            klimaservicesenter (KSS), inkludert økt styrtregnintensitet, høyere flomvannstander og økt fare
            for våte jordskred i bratt terreng.
          </p>
        </div>

        {/* TEK17 SIKKERHETSKLASSER */}
        <div className="rounded-xl border border-border bg-card/60 p-4 space-y-3">
          <h5 className="font-semibold text-foreground text-sm">
            TEK17 (Byggteknisk forskrift) — Sikkerhetsklasser for flom og stormflo (§ 7-2)
          </h5>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Bygninger deles inn i tre sikkerhetsklasser etter hvor alvorlige konsekvensene er for liv,
            helse og samfunnsfunksjoner dersom bygget rammes av flom eller stormflo:
          </p>

          <div className="grid gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1">
              <span className="font-semibold text-sky-400 text-sm">Sikkerhetsklasse F1</span>
              <p className="font-medium text-foreground">Gjentaksintervall: 1/20 år</p>
              <p className="text-muted-foreground leading-relaxed">
                Bygg med <strong>liten konsekvens</strong> ved flom: garasjer, båtnaust, uisolerte boder
                og mindre lagerbygg der ingen mennesker bor eller oppholder seg fast.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-1">
              <span className="font-semibold text-amber-400 text-sm">Sikkerhetsklasse F2</span>
              <p className="font-medium text-foreground">Gjentaksintervall: 1/200 år</p>
              <p className="text-muted-foreground leading-relaxed">
                Bygg med <strong>middels konsekvens</strong>: vanlige bolighus, leilighetsbygg, skoler,
                barnehager, kontorbygg og hoteller. Må tåle 200-årsflom inkludert klimapåslag!
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-1">
              <span className="font-semibold text-rose-400 text-sm">Sikkerhetsklasse F3</span>
              <p className="font-medium text-foreground">Gjentaksintervall: 1/1000 år</p>
              <p className="text-muted-foreground leading-relaxed">
                Bygg med <strong>stor konsekvens</strong>: sykehus, legevakt, brannstasjoner, beredskapssentre,
                og anlegg for giftig eller brannfarlig avfall som aldri må settes under vann.
              </p>
            </div>
          </div>
        </div>

        {/* NORSK NATURSKADEORDNING */}
        <div className="rounded-xl border border-border bg-card/70 p-4 space-y-2 text-xs">
          <h5 className="font-semibold text-foreground text-sm">
            Norsk Naturskadeordning og forsikring: Hvem betaler regningen?
          </h5>
          <p className="text-muted-foreground leading-relaxed">
            I Norge er vi unike i verden med <strong>Naturskadeloven</strong>: Alle bygninger som har
            brannforsikring, er automatisk forsikret mot naturkatastrofer (flom, storm, stormflo, skred
            og jordskjelv) gjennom Norsk Naturskadepool.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Men forsikringsordningen har en grense: Den dekker skader etter at ulykken har skjedd, men
            dekker <em>ikke</em> forebyggende klimatilpasning. Hvis en kommune tillater bygging i en kjent
            flomsone i strid med NVEs råd, kan forsikringsselskapene i framtiden nekte å utbetale erstatning.
            Klimatilpasning er derfor ofte en lønnsom investering.
          </p>
        </div>

        <OrdBoks
          ord="ROS-analyse"
          barn="Risiko- og sårbarhetsanalyse. En lovpålagt kartlegging etter plan- og bygningsloven for å avdekke alle farer (flom, skred, havnivåstigning) før et område kan bygges ut."
        />
        <OrdBoks
          ord="TEK17 Sikkerhetsklasse F2"
          barn="Kravet om at vanlige bolighus og skoler må prosjekteres og sikres mot oversvømmelse fra en 200-årsflom (0,5 % årlig sannsynlighet), inkludert framtidig klimapåslag."
        />
      </CollapsibleSection>

      {/* ================= ORDLISTE / BEGREPER ================= */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Viktige fagbegreper i tilpasning og samfunnssikkerhet
      </h2>
      <TermGrid>
        <Term
          name="Tilpasning (Adaptation)"
          def="Tiltak som reduserer skaden fra klimaendringer og ekstremvær som allerede er uunngåelige. Varsling, flomveier, voller og byggestandarder."
        />
        <Term
          name="Utslippskutt (Mitigation)"
          def="Tiltak som reduserer det fysiske pådrivet ved å kutte utslipp av drivhusgasser eller øke karbonfangst. Setter et tak på oppvarmingen."
        />
        <Term
          name="Klimasårbarhet"
          def="Hvor hardt et system (menneske, samfunn, økosystem) rammes av en naturfare, gitt dets eksponering og evne til å motstå og hente seg inn."
        />
        <Term
          name="Maltilpasning"
          def="Tiltak som reduserer risiko på kort sikt, men som øker sårbarheten senere eller forskyver skaden over på andre."
        />
        <Term
          name="Treleddsstrategien"
          def="LOD-strategi: 1) Fange opp og infiltrere hverdagsregn lokalt, 2) Forsinke og fordrøye større regn i bassenger, 3) Trygge flomveier for ekstremnedbør."
        />
        <Term
          name="Avrenningskoeffisient (C)"
          def="Forholdet mellom overflateavrenning og nedbør. 0,90 for tett asfalt; 0,10 for skogsbunn og regnbed."
        />
        <Term
          name="Blågrønn infrastruktur"
          def="Naturbaserte overvannsløsninger som regnbed, grønne tak, åpne bybekker og fordrøyningsdammer som kombinerer flomsikring og trivsel."
        />
        <Term
          name="Isostatisk landheving"
          def="Jordskorpens heving etter at den tunge innlandsisen fra forrige istid smeltet bort. Høy i Oslo (+4 mm/år); lav i Bergen (+1,6 mm/år)."
        />
        <Term
          name="Stormflo"
          def="Ekstrem kystvannstand skapt av invers barometereffekt fra lavtrykk, kraftig pålandsvind (vindstuing) og springflo."
        />
        <Term
          name="TEK17 Sikkerhetsklasse F2"
          def="Lovkrav om at bolighus og skoler må sikres mot 200-årsflom og 200-års stormflo, tillagt klimapåslag og fribord."
        />
      </TermGrid>

      {/* ================= EKSAMENSQUIZ ================= */}
      <Quiz
        questions={[
          {
            prompt: "Hvorfor er en massiv flomvoll alene et ufullstendig og potensielt risikabelt tiltak mot økende nedbør og flom?",
            options: [
              "Fordi flomvoller er ulovlige ifølge norsk lovverk.",
              "Fordi en voll bare tilpasser uten å kutte pådrivet, kan skape falsk trygghet som fører til farlig fortetting bak vollen (maltilpasning), og øker flomfarten for naboene nedstrøms.",
              "Fordi flomvoller fører til at grunnvannet forsvinner helt fra jordskorpen.",
              "Fordi flomvoller bare fungerer i ørkenområder.",
            ],
            answer: 1,
            explain:
              "Kompetansemålet krever vurdering av både kutt og tilpasning. Flomvoller kan gi falsk trygghet (flomvoll-paradokset) og flytter vannet raskere nedstrøms til naboene.",
          },
          {
            prompt: "Hva er den fundamentale forskjellen mellom Fare (Hazard) og Sårbarhet (Vulnerability) i IPCCs risikodefinisjon?",
            options: [
              "Det er ingen forskjell; de betyr nøyaktig det samme.",
              "Fare er selve naturhendelsen (f.eks. et 100-års styrtregn), mens sårbarhet handler om hvor mottakelig samfunnet eller bygget er for å bli skadet av hendelsen.",
              "Fare gjelder bare i tropene, mens sårbarhet gjelder i Arktis.",
              "Sårbarhet måles i millimeter nedbør, mens fare måles i kroner og øre.",
            ],
            answer: 1,
            explain:
              "Risiko er produktet av Fare × Eksponering × Sårbarhet. Faren er det fysiske været; sårbarheten bestemmes av hvordan vi bygger, varsler og forbereder oss.",
          },
          {
            prompt: "Hvordan lyder Treleddsstrategien for lokal overvannshåndtering (LOD) i norske byer?",
            options: [
              "1) Pumpe vannet til naboen, 2) Legge all nedbør i lukkede rør, 3) Bygge diker.",
              "1) Fange opp og infiltrere hverdagsregn lokalt, 2) Forsinke og fordrøye større nedbør i bassenger, 3) Sikre trygge flomveier for ekstremnedbør på overflaten.",
              "1) Asfaltere alle grøntområder, 2) Rense slukene, 3) Evakuere byen.",
              "1) Stenge kjellervinduer, 2) Salte veiene, 3) Åpne slusene i kraftverkene.",
            ],
            answer: 1,
            explain:
              "Treleddsstrategien gjenskaper naturens hydrologi: småregn infiltreres lokalt (trinn 1), større byger fordrøyes (trinn 2), og ekstreme skybrudd ledes trygt på overflaten via flomveier (trinn 3).",
          },
          {
            prompt: "Hva skjer med den dimensjonerende overvannsavrenningen (Q) når et skogsområde (C = 0,10) bygges ut til et asfaltert kjøpesenter med tak og parkeringsplasser (C = 0,90)?",
            options: [
              "Avrenningen mangedobles (øker nesten tidoblet) fordi tette flater hindrer naturlig infiltrasjon.",
              "Avrenningen forblir uendret fordi det regner like mye over begge flatene.",
              "Avrenningen synker fordi asfalten absorberer vannmolekylene.",
              "Avrenningen halveres på grunn av økt fordampning fra mørk asfalt.",
            ],
            answer: 0,
            explain:
              "Ifølge den rasjonelle formelen Q = C · I · A er avrenningen direkte proporsjonal med avrenningskoeffisienten C. Å øke C fra 0,10 til 0,90 gir en voldsom økning i flomtoppen.",
          },
          {
            prompt: "Hvorfor er Vestlandet og Sørlandet (f.eks. Bergen og Stavanger) vesentlig mer sårbare for framtidig havnivåstigning enn Oslo og indre Østlandet?",
            options: [
              "Fordi havet bare stiger på den nordlige halvkule.",
              "Fordi isostatiske landheving etter istiden er mye lavere på Vestlandet og Sørlandet (~1–2 mm/år) enn i Oslofjorden (~4–5 mm/år), slik at den globale havnivåstigningen overgår landhevingen.",
              "Fordi det blåser mer vind i Oslo enn i Bergen.",
              "Fordi Golfstrømmen stopper opp utenfor Oslofjorden.",
            ],
            answer: 1,
            explain:
              "Under istiden var isen tykkest over Østlandet/Bottenviken, og landhevingen er derfor størst der. På Vestlandet og Sørlandet hever landet seg knapt, og netto relativ havnivåstigning blir stor.",
          },
          {
            prompt: "Hvilket krav stiller byggteknisk forskrift (TEK17) til sikkerhet mot flom og stormflo for nye bolighus (Sikkerhetsklasse F2)?",
            options: [
              "Bolighus kan bygges hvor som helst så lenge de har pumpe i kjelleren.",
              "Bygningen må prosjekteres og plasseres slik at den er sikret mot oversvømmelse fra en 200-årsflom (0,5 % årlig sannsynlighet), inkludert klimapåslag og fribord.",
              "Bolighus må tåle en 10 000-årsflom.",
              "TEK17 har ingen krav til flomsikring; det er opp til forsikringsselskapet.",
            ],
            answer: 1,
            explain:
              "TEK17 § 7-2 fastsetter at sikkerhetsklasse F2 (boliger og skoler) skal dimensjoneres for 200-årsflom/stormflo, mens F1 (garasjer) krever 20-års og F3 (sykehus) krever 1000-års sikkerhet.",
          },
          {
            prompt: "Hva er den fysiske forklaringen bak stormflo?",
            options: [
              "Jordskjelv på havbunnen som genererer en tsunami.",
              "Sammenfall av et dypt lavtrykk (invers barometereffekt hever havspeilet ~1 cm per hPa trykkfall), kraftig pålandsvind (vindstuing) og astronomisk springflo.",
              "At isfjell fra Arktis smelter momentant i Nordsjøen.",
              "At månen forlater sin bane rundt jorden i noen timer.",
            ],
            answer: 1,
            explain:
              "Stormflo er en meteorologisk og astronomisk superposisjon: Lavt lufttrykk suger opp havflaten, stormvind presser vannmassene mot kysten, og springflo løfter tidevannet maksimalt.",
          },
          {
            prompt: "Hvilken situasjon er et klassisk eksempel på maltilpasning (maladaptation)?",
            options: [
              "Å etablere regnbed og permeable dekker i en bygate for å infiltrere overvann.",
              "Å gjenåpne en lukket bybekk slik at den får meandrere i en offentlig park.",
              "Å installere snøkanoner som drives med fossil energi og tømmer lokalt grunnvann for å redde et lavtliggende skisted i milde vintre.",
              "Å innføre byggeforbud i en 200-års flomsone etter en ROS-analyse.",
            ],
            answer: 2,
            explain:
              "Kunstsnø krever enorme mengder vann og strøm. Hvis energien er fossil, øker tiltaket selve klimapådrivet som smelter snøen, samtidig som det tømmer grunnvannet for lokalmiljøet.",
          },
        ]}
      />
    </TopicLayout>
  );
}
