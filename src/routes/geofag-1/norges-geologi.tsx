import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { NorwayTectonicsHistoryDiagram } from "@/components/diagrams";
import { GeoMap } from "@/components/geo-map";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("norges-geologi")!;
const lenke = "text-primary font-semibold underline-offset-2 hover:underline";

export const Route = createFileRoute("/geofag-1/norges-geologi")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/norges-geologi",
    }),
  component: NorgesGeologiPage,
});

function NorgesGeologiPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Fra urtid og Iapetushavets bunn eksponert på Leka, via den voldsomme kaledonske kollisjonen og Oslofeltets permiske riftdal, til Atlanterhavets åpning og landhevingen etter istiden: Norges landskap og berggrunn er et enestående geologisk arkiv over en halv milliard år med global platedynamikk."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/bergarter",
        label: "Forrige: Bergarter og mineraler",
      }}
      next={{
        to: "/geofag-1/landformer",
        label: "Neste: Landformer og geomorfologi",
      }}
      kilder={KILDER["norges-geologi"]}
    >
      <Callout title="Kompetansemål i LK20 (Geofag 1)">
        <p>{tema.maal}</p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>Ofiolitter og havbunn på land:</em> Leka ofiolittkompleks, Penrose-stratigrafi og obduksjon.</p>
          <p>• <em>Orogenese og kontinentkollisjon:</em> Den kaledonske fjellkjedefoldingen, Iapetushavet, Baltika og skyvedekker.</p>
          <p>• <em>Kontinental rifting i Norge:</em> Oslo-graben i perm, rombeporfyr og larvikitt.</p>
          <p>• <em>Marginutvikling og isostasi:</em> Norskehavets åpning, sokkelens bassenger, og postglasial landheving med marin grense.</p>
        </div>
      </Callout>

      {/* SEKSJON 1: OFIOLITTKOMPLEKSET PÅ LEKA */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Ofiolittkomplekset på Leka: Havbunn og mantel på tørt land
        </h2>
        <p>
          Hvordan kan vi vite nøyaktig hvordan havbunnsskorpen og den øverste mantelen er bygd opp når havbunnen
          befinner seg under tusenvis av meter med stummende mørkt vann?
        </p>
        <p>
          Svaret ligger i <strong>ofiolitter</strong>: sjeldne geologiske hendelser der biter av havbunnsskorpe og
          øvre mantel ikke har blitt subdusert og ødelagt i dypet, men derimot skjøvet opp på tørt land under en
          fjellkjedekollisjon (et fenomen kalt <strong>obduksjon</strong>, Furnes et al., 1988). En ofiolitt er med andre ord
          et komplett, fossilt stykke havbunn som er hevet på land og veltet over ende, slik at geologer i dag kan spasere
          tvers gjennom hele lagdelingen – fra dyphavssedimenter ned til selve mantelen – til fots!
        </p>
        <p>
          Ved Penrose-konferansen i 1972 definerte geologene den klassiske <strong>ofiolitt-stratigrafien</strong>,
          som representerer et komplett vertikalt tverrsnitt gjennom oseanisk litosfære:
        </p>

        <ol className="list-decimal space-y-2 pl-6 text-foreground/90 text-sm">
          <li>
            <strong>Pelagiske sedimenter (øverst):</strong> Tynne lag av dyphavsleire, kalkslam og kiselholdig radiolaritt
            (dannet av mikroskopiske kiselalger i urhavet).
          </li>
          <li>
            <strong>Putelava (pillow basalt):</strong> 0,5–1,5 km tykt lag med glassaktige lavaputer som vitner om vulkanske
            utbrudd direkte under vann i en midthavsrygg.
          </li>
          <li>
            <strong>Plateformede basaltganger (sheeted dykes):</strong> Et unikt 1–2 km tykt kompleks av loddrette, parallelle
            basaltganger («gang-i-gang») som viser hvordan midthavsryggen kontinuerlig sprakk opp og ble fylt med ny magma.
          </li>
          <li>
            <strong>Gabbro (isotrop og lagdelt):</strong> 2–4 km tykt lag av grovkornet mafisk dypbergart dannet i det aksiale
            magmakammeret. Nederst danner tunge krystaller rytmiske lag (lagdelt gabbro).
          </li>
          <li>
            <strong>Petrologisk Moho:</strong> Selve grenseflaten mellom jordskorpen (gabbro) og den underliggende mantelen (peridotitt).
          </li>
          <li>
            <strong>Mantel-litosfære (nederst):</strong> Rester av øvre mantel bestående av <strong>peridotitt</strong> (dunitt og
            harzburgitt) som er utsmeltet for basaltkomponenter. Ved kontakt med sjøvann omdannes peridotitt til den karakteristiske
            grønne eller gyllenbrune bergarten <strong>serpentinitt</strong>.
          </li>
        </ol>

        <PhotoFigure
          src="/images/geo-ofiolitt-leka.jpg"
          alt="Leka ofiolittkompleks med karakteristisk gulbrun dunitt og peridotitt fra jordens mantel"
          heading="Norges geologiske nasjonalmonument: Leka ofiolittkompleks"
          caption="På øya Leka i Trøndelag ligger et av verdens best bevarte ofiolittkomplekser (Furnes et al., 1988; NGU). Da Iapetushavet lukket seg for 420 millioner år siden under Den kaledonske fjellkjedefoldingen, ble et helt stykke havbunn vippet 90 grader på høykant og skjøvet opp på land. Her på Leka kan man gå tørrskodd fra jordens mantel (karakteristisk gulbrun dunitt og harzburgitt), krysse Moho-grensen til fots, og fortsette opp gjennom lagdelt gabbro, basaltganger og putelava!"
          marks={[
            { x: 22, y: 72, n: "1", text: "Mantelperidotitt", tone: "warm" },
            { x: 42, y: 55, n: "2", text: "Moho-grensen", tone: "cold" },
            { x: 62, y: 42, n: "3", text: "Lagdelt gabbro", tone: "warm" },
            { x: 80, y: 24, n: "4", text: "Putelava", tone: "cold" },
          ]}
          points={[
            { n: "1", label: "Gulbrun forvitret dunitt og harzburgitt: Dette er selve jordens øvre mantel eksponert i dagslys!" },
            { n: "2", label: "Petrologisk Moho: Overgangen mellom ultramafisk mantel og mafisk gabbroid jordskorpe." },
            { n: "3", label: "Lagdelt gabbro: Krystallisasjonsprodukter fra havbunnens aksiale magmakammer for 497 millioner år siden." },
            { n: "4", label: "Plateformede ganger og putelava som en gang utgjorde havbunnen i Iapetushavet." },
          ]}
        />

        <OrdBoks
          ord="Ofiolitt"
          barn="Et komplett tverrsnitt av havbunnsskorpe og underliggende mantel som ved en tektonisk kollisjon er skjøvet opp på land (obdusert) i stedet for å synke i en subduksjonssone."
        />
      </section>

      {/* SEKSJON 2: DEN KALEDONSKE FJELLKJEDEFOLDINGEN */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          1. Den kaledonske fjellkjedefoldingen (430–400 mill. år siden)
        </h2>
        <p>
          Norges ryggrad av høye fjell og forrevne kystlandskap har sine dypeste røtter i den paleozoiske tidsalderen.
          I silur og devon lukket det opprinnelige Atlanterhavet – <strong>Iapetushavet</strong> – seg i henhold til
          Wilsonsyklusen. Vårt urgamle kontinent <strong>Baltika</strong> (Skandinavia og Vest-Russland) kolliderte
          frontalt med det nordamerikanske og grønlandske kontinentet (<strong>Laurentia</strong>).
        </p>
        <p>
          Kollisjonen var av samme kaliber som dagens kollisjon mellom India og Asia, og skapte en Himalaya-lignende
          fjellkjede med tinder på over 8000–9000 meter – <strong>Kaledonidene</strong>.
        </p>

        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3">
          <h3 className="font-display text-lg font-bold text-primary">Skyvedekker (nappes) i Jotunheimen</h3>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Fordi kontinental jordskorpe er for lett til å subdueres ned i mantelen, oppsto det enorm skorpeforkorting.
            Kolossale bergflak fra havbunn, øybuer og kontinentalrender ble høvlet av og skjøvet hundrevis av kilometer
            østover inn over det baltiske grunnfjellet som <strong>skyvedekker (nappes)</strong>.
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">
            De karakteristiske høye tindene i <strong>Jotunheimen</strong> (som Galdhøpiggen og Glittertind), Rondane og
            Trollheimen består av harde, motstandsdyktige bergarter (særlig gabbro, anortositt og granulitt) som hører til
            Jotundekket – overskjøvet under kollisjonen med Laurentia!
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Under kollisjonen ble bergartene nede i kollisjonssonen utsatt for ekstremt trykk og høy temperatur.
          Leirskifer og sandstein ble omvandlet til glimmerskifer, amfibolitt og gneis gjennom regional metamorfose.
        </p>
      </section>

      {/* SEKSJON 3: OSLOFELTETS RIFTDAL */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          2. Oslofeltets dramatiske riftdal i perm (300–250 mill. år siden)
        </h2>
        <p>
          I karbon og perm holdt superkontinentet Pangea på å sprekke opp. En gren av denne oppsprekkingen skar rett inn
          gjennom det sørøstlige Norge fra Langesund i sør til Brumunddal og Mjøsa i nord.
        </p>
        <p>
          Jordskorpen ble strukket og tynnet ut, og store forkastningsblokker sank inn som en dyp riftdal kalt en{" "}
          <strong>graben (Oslo-graben)</strong>. Innsynkningen ble ledsaget av voldsom magmatisk og vulkansk aktivitet:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="font-display text-base font-bold text-amber-500">Rombeporfyr (sjelden lava)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enorme sprekkevulkaner spydde ut tykke lavadekker av <strong>rombeporfyr</strong> – en lavabergart med store,
              båtlignende (rombeformede) feltspatkrystaller i en finkornet grunnmasse. Rombeporfyr finnes i dag bare tre steder
              i hele verden: i Oslofeltet, på Mount Erebus i Antarktis og i Den østafrikanske riftdalen!
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="font-display text-base font-bold text-sky-400">Larvikitt (Norges nasjonalbergart)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dypt nede under vulkanene størknet gigantiske magmakamre langsomt. Her krystalliserte den vakre, blåskimrende
              dypbergarten <strong>larvikitt</strong>. Larvikitt brytes i dag som eksklusiv fasadestein og eksporteres over
              hele kloden. I 2007 ble den kåret til Norges offisielle nasjonalbergart.
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Riftingen stoppet opp før kontinentet rakk å dele seg helt; Oslofeltet forble en «fossil rift». Likevel styrer de
          permiske forkastningslinjene den dag i dag geografien på Østlandet, inkludert Oslofjordens forløp.
        </p>
      </section>

      {/* SEKSJON 4: ÅPNINGEN AV NORSKEHAVET */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          3. Åpningen av Norskehavet og Jan Mayen (55 mill. år til i dag)
        </h2>
        <p>
          I tidlig tertiærtid (eocen, for ca. 55 millioner år siden) revnet litosfæren mellom Norge og Grønland fullstendig.
          Nord-Atlanteren åpnet seg ved aktiv havbunnsspredning langs Den midtatlantiske ryggen.
        </p>
        <p>
          Dette ga Norge en <strong>passiv kontinentalmargin</strong> i vest – en kystsone uten subduksjonssoner eller
          kraftige plategrenseskjelv:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-foreground/90 text-sm">
          <li>
            <strong>Sedimentasjonsbassengene på sokkelen:</strong> Elver og senere isbreer fra det norske fastlandet eroderte
            ned fjellene og avsatte kilometertykke lag med sand, leire og organisk materiale på kontinentalsokkelen. Disse
            sedimentære lagene utgjør i dag kilde-, reservoar- og takbergartene for Norges olje- og gassressurser.
          </li>
          <li>
            <strong>Jan Mayen – Norges aktive vulkan:</strong> Ute i Norskehavet, på spredningsryggen nord for Island, ligger
            den isolerte vulkanøya Jan Mayen. Her troner <strong>Beerenberg (2277 moh.)</strong> – Norges eneste aktive
            vulkan over havnivå, med siste utbrudd i 1985.
          </li>
        </ul>
      </section>

      {/* SEKSJON 5: GLASIAL ISOSTASI */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          4. Glasial isostasi: Landet som reiser seg etter isen
        </h2>
        <p>
          Under siste istid (Weichsel) hvilte en opptil 3 kilometer tykk innlandsis over Skandinavia. Isens kolossale
          vekt presset den faste litosfæren ned i den seigtflytende astenosfæren med opptil 800 meter!
        </p>
        <p>
          Da isen smeltet bort for ca. 10 000 år siden, begynte litosfæren å sprette langsomt opp igjen i henhold til{" "}
          <strong>isostasi</strong> (Archimedes&apos; lov for jordskorpen):
        </p>

        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="font-semibold text-emerald-400 text-sm">Marin grense og leirbygdene</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Rett etter istiden flommet havet inn over det nedtrykte landet og avsatte saltvannsleire. Etter hvert som landet
              hevet seg, ble denne gamle havbunnen løftet tørt – opptil <strong>220 meter over dagens havnivå</strong> på
              Østlandet (<strong>marin grense</strong>). Dette dannet de fruktbare jordbruksbygdene på Romerike og i Trøndelag,
              men ga også opphav til faren for{" "}
              <Link to="/geofag-1/skred" className={lenke}>
                kvikkleireskred
              </Link>{" "}
              når saltet vaskes ut av grunnvannet.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="font-semibold text-sky-400 text-sm">Postglasiale intraplate-jordskjelv</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Landet hever seg fremdeles med 4–9 mm per år rundt Oslofjorden og Bottenviken. Spenningene etter den asymmetriske
              landhevingen, kombinert med ryggtrykk (ridge push) fra Atlanterhavsryggen, reaktiverer eldgamle forkastninger og
              utløser jevnlig{" "}
              <Link to="/geofag-1/jordskjelv" className={lenke}>
                intraplate-jordskjelv
              </Link>{" "}
              i Rana, på Vestlandet og i Oslofjorden.
            </p>
          </div>
        </div>

        <OrdBoks
          ord="Isostasi (og postglasial landheving)"
          barn="Litosfærens gravitasjonelle flytelikevekt oppå den seigtflytende astenosfæren. Når en tung last (som 3 km innlandsis) forsvinner, hever jordskorpen seg langsomt tilbake mot likevekt over titusener av år."
        />
      </section>

      {/* SEKSJON 6: OVERSIKTSDIAGRAM OG KART */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Norges geologiske tidslinje og nøkkellokaliteter
        </h2>
        <p>
          Diagrammet og kartet under gir en helhetlig oversikt over Norges fascinerende reise gjennom geologisk tid – fra
          Iapetushavets dype havbunn til dagens hevede kystlandskap:
        </p>

        <NorwayTectonicsHistoryDiagram />

        <GeoMap
          center={[65, -3]}
          zoom={4}
          markers={[
            {
              lat: 65.08,
              lng: 11.62,
              label: "Leka – Norges geologiske nasjonalmonument; komplett ofiolittkompleks eksponert på land",
            },
            {
              lat: 61.63,
              lng: 8.31,
              label: "Jotunheimen – Kaledonsk skyvedekke (Jotundekket) skjøvet over Baltika for 420 Ma",
            },
            {
              lat: 59.91,
              lng: 10.75,
              label: "Oslofeltet – Permisk innsunket riftdal med rombeporfyr og larvikitt",
            },
            {
              lat: 71.0,
              lng: -8.5,
              label: "Jan Mayen (Beerenberg) – Norges eneste aktive vulkan på den midtatlantiske spredningsryggen",
            },
            {
              lat: 66.31,
              lng: 14.14,
              label: "Rana – Område med historiske intraplate-jordskjelv utløst av postglasial landheving",
            },
          ]}
          heading="Norges geodynamiske nøkkelsteder"
          caption="Kartet viser Norges mest berømte geologiske steder: Ofiolitten på Leka, skyvedekkene i Jotunheimen, den permiske riftdalen i Oslofeltet, Jan Mayens vulkanisme og seismiske soner i Rana."
        />
      </section>

      {/* FAGVOKABULAR */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Sentralt fagvokabular</h2>
      <TermGrid>
        <Term name="ofiolitt" def="komplett tverrsnitt av havbunnsskorpe og øvre mantel obdusert på land (f.eks. Leka)" />
        <Term name="obduksjon" def="geologisk prosess der oseanisk litosfære unntaksvis skyves opp på kontinental skorpe i en kollisjonssone" />
        <Term name="Iapetushavet" def="urtidens verdenshav mellom Baltika og Laurentia som lukket seg i silur og dannet Kaledonidene" />
        <Term name="Baltika" def="urgammelt kontinent bestående av Skandinavia og Vest-Russland fram til den kaledonske kollisjonen" />
        <Term name="Laurentia" def="urgammelt kontinent bestående av Nord-Amerika og Grønland som kolliderte med Baltika" />
        <Term name="skyvedekke (nappe)" def="enorme flak av jordskorpen som er revet løs og skjøvet titalls til hundrevis av kilometer innover land under en kontinentkollisjon" />
        <Term name="graben" def="langstrakt innsynkningsdal i jordskorpen avgrenset av parallelle normalforkastninger (f.eks. Oslo-graben)" />
        <Term name="rombeporfyr" def="svært sjelden lavabergart med karakteristiske rombeformede feltspatkrystaller, typisk for Oslofeltet" />
        <Term name="larvikitt" def="Norges nasjonalbergart; monzonittisk dypbergart i Oslofeltet med karakteristisk blålig labradorescens" />
        <Term name="passiv margin" def="kontinentalmargin som ligger inne på en tektonisk plate uten subduksjon eller vulkanisme (f.eks. norskekysten)" />
        <Term name="isostasi" def="litosfærens flytelikevekt på den seige astenosfæren; forklarer heving etter at innlandsisen smeltet" />
        <Term name="marin grense" def="det høyeste nivået havet nådde på land etter at innlandsisen smeltet bort (opptil 220 moh. på Østlandet)" />
      </TermGrid>

      {/* TEST DEG SELV */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Test deg selv</h2>
      <Quiz
        questions={[
          {
            prompt: "Hvorfor er Leka i Trøndelag kåret til Norges geologiske nasjonalmonument?",
            options: [
              "Fordi Norges eldste meteorittkrater ligger der.",
              "Fordi et komplett stykke av Iapetushavets bunn og øvre mantel ble skjøvet på land under Kaledonidene (ofiolitt), slik at hele lagdelingen ned til Moho kan studeres til fots.",
              "Fordi det er landets eneste aktive vulkanområde.",
              "Fordi Norges største gullforekomst ble funnet i bergartene der.",
            ],
            answer: 1,
            explain:
              "Riktig! Leka ofiolittkompleks er et geologisk verdensfenomen der obduksjon bevarte hele lagrekken fra mantelperidotitt, over Moho, og opp til lagdelt gabbro, basaltganger og putelava.",
          },
          {
            prompt: "Hva forårsaket Den kaledonske fjellkjedefoldingen for 430–400 millioner år siden?",
            options: [
              "En oppsprekking av jordskorpen da Oslofeltet sank inn i perm.",
              "En voldsom kontinent-kontinent-kollisjon der urkontinentene Baltika og Laurentia støtte sammen og lukket Iapetushavet.",
              "En gigantisk istid som skuret ned grunnfjellet.",
              "At Atlanterhavet åpnet seg og dyttet Norge østover.",
            ],
            answer: 1,
            explain:
              "Riktig! Kaledonidene oppsto da Iapetushavet lukket seg og Baltika kolliderte frontalt med Laurentia (Grønland/Nord-Amerika). Dette skapte en mektig fjellkjede og skjøv store skyvedekker over Norge.",
          },
          {
            prompt: "Hva er et skyvedekke (nappe), slik vi ser i Jotunheimen?",
            options: [
              "Et lag med morenegrus avsatt under siste istid.",
              "Et gigantisk flak av berggrunnen som under kontinentkollisjon er høvlet av og skjøvet titalls til hundrevis av kilometer inn over underlaget.",
              "En lavastrøm som har lagt seg flatt over sedimentære bergarter.",
              "En innsunket blokk i en riftdal.",
            ],
            answer: 1,
            explain:
              "Riktig! Under Kaledonidene ble enorme flak av skorpe og eldre bergarter skjøvet østover over Baltika. De høyeste toppene i Jotunheimen består av erosjonsrester fra disse overskjøvne dekkene.",
          },
          {
            prompt: "Hva er Oslofeltet i en geologisk sammenheng?",
            options: [
              "En kaledonsk subduksjonssone med dype havgraver.",
              "En permisk innsunket riftdal (graben) dannet under oppsprekking av Pangea, preget av sjelden vulkanisme (rombeporfyr) og dypbergarter (larvikitt).",
              "Et glasialt sedimentbasseng dannet av smeltevannselver under istiden.",
              "En passiv kontinentalmargin dannet i eocen.",
            ],
            answer: 1,
            explain:
              "Riktig! Oslofeltet er en fossil rift fra perm der skorpen sank inn som en graben ledsaget av unik magmatisme (rombeporfyrlava og dypbergarten larvikitt).",
          },
          {
            prompt: "Hva er marin grense, og hvorfor finner vi marin leire høyt over dagens havnivå?",
            options: [
              "Marin grense er grensen for hvor langt tsunamibølger kan skylle inn på land.",
              "Marin grense er det høyeste nivået havet nådde etter istiden; den 3 km tykke isen presset jordskorpen ned, og da isen forsvant, hevet landet seg opptil 220 meter (glasial isostasi).",
              "Marin grense markerer skillet mellom ferskvannsfisk og saltvannsfisk i elvene.",
              "Marin grense viser hvor høyt havet sto under perm-trias-oppvarmingen.",
            ],
            answer: 1,
            explain:
              "Riktig! Glasial isostasi: Isens enorme vekt trykket litosfæren ned i astenosfæren. Da isen smeltet, flommet havet først inn, før landet langsomt hevet seg tilbake og etterlot gammel havbunn som tørt land.",
          },
          {
            prompt: "Hvorfor opplever Norge fortsatt intraplate-jordskjelv i dag?",
            options: [
              "Fordi Norge ligger rett over en aktiv subduksjonssone.",
              "Kombinasjonen av pågående postglasial landheving (4–9 mm/år) og ryggtrykk (ridge push) fra Den midtatlantiske ryggen reaktiverer gamle forkastningssoner.",
              "Fordi vulkanene i Oslofeltet er i ferd med å våkne til liv.",
              "Fordi tidevannet trekker kontinentet vestover.",
            ],
            answer: 1,
            explain:
              "Riktig! Selv om Norge ligger langt inne på en plate (intraplate), utsettes skorpen for kompresjonskrefter fra spredningsryggen i vest og spenninger fra den pågående landhevingen etter istiden.",
          },
        ]}
      />

      <Callout title="Oppsummering: Norges geologiske reise">
        <ul className="space-y-1.5 text-sm list-disc pl-4">
          <li><strong>Leka ofiolitt:</strong> Et enestående vindu til Iapetushavets bunn og øvre mantel, skjøvet på land ved obduksjon for ca. 420 millioner år siden.</li>
          <li><strong>Kaledonidene:</strong> Frontalkollisjon mellom Baltika og Laurentia for 430–400 Ma som bygget en Himalaya-høy fjellkjede og skjøv mektige skyvedekker over Norge.</li>
          <li><strong>Oslofeltets riftdal:</strong> Pangeas oppsprekking i perm skapte en innsunket graben med sjelden rombeporfyrlava og larvikitt.</li>
          <li><strong>Nord-Atlanterens åpning:</strong> For 55 Ma siden skilte Norge og Grønland lag; Norge fikk en passiv margin med rike sedimentbassenger på sokkelen.</li>
          <li><strong>Glasial isostasi:</strong> Da innlandsisen smeltet for 10 000 år siden, hevet landet seg opptil 220 meter og skapte dagens fruktbare leirbygder og hevede strandlinjer.</li>
        </ul>
      </Callout>
    </TopicLayout>
  );
}
