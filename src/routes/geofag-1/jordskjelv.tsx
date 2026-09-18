import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  BoundaryQuakesDiagram,
  EarthquakeWavePhysicsDiagram,
  ElasticReboundDiagram,
  NorwayEarthquakesDiagram,
  SeismogramDiagram,
} from "@/components/diagrams";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { gf1Theme } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = gf1Theme("jordskjelv")!;

export const Route = createFileRoute("/geofag-1/jordskjelv")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 1`,
      description: tema.blurb,
      path: "/geofag-1/jordskjelv",
    }),
  component: JordskjelvPage,
});

const lenke =
  "text-primary font-semibold underline-offset-2 hover:underline";

function JordskjelvPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="18. april 1906 skaket San Francisco i 45 sekunder og la store deler av byen i ruiner. Hendelsen hjalp oss forstå hva jordskjelv faktisk er: elastisk spenning som bygges opp langs låste forkastninger i tiår eller århundrer — og frigjøres i ett brøkdels sekund. Her ser vi på fysikken bak, seismiske bølger, hvordan vi måler og lokaliserer skjelv, og hva som gjør Norge seismisk aktivt til tross for at vi ikke er i nærheten av en subduksjonssone."
      banner={tema.image}
      bannerAlt={tema.alt}
      prev={{
        to: "/geofag-1/vulkaner",
        label: "Forrige: Vulkaner",
      }}
      next={{
        to: "/geofag-1/bergarter",
        label: "Neste: Bergarter og mineraler",
      }}
      kilder={KILDER.jordskjelv}
    >
      <Callout title="Kompetansemål i Geofag 1 (LK20)">
        <p>{tema.maal}</p>
        <div className="mt-2 text-xs text-muted-foreground space-y-1 border-t border-border/50 pt-2">
          <p><strong>Kjerneelementer som dekkes i dette kapittelet:</strong></p>
          <p>• <em>Jordens oppbygning og indre prosesser:</em> Elastisk tilbakefjæring og seismisk bølgeforplantning.</p>
          <p>• <em>Geofarer og samfunnssikkerhet:</em> Jordskjelvrisiko, tsunamier, Eurokode 8, baseisolering og norsk seismisitet.</p>
          <p>• <em>Naturvitenskapelige metoder:</em> Seismogramanalyse, triangulering av episenter og bruk av seismiske skyggesoner til å avbilde jordens indre lag.</p>
        </div>
      </Callout>

      {/* SEKSJON 1: ELASTISK TILBAKEFJÆRING */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Jordskjelvfysikk: Harry Fielding Reids elastiske tilbakefjæring
        </h2>
        <p>
          Frem til begynnelsen av 1900-tallet trodde mange forskere at forkastninger i jordskorpen var et sekundært resultat
          av mystiske eksplosjoner dypt nede i jorden. Den sanne fysiske forklaringen ble først avdekket etter det store
          jordskjelvet i San Francisco 18. april 1906.
        </p>
        <p>
          Den amerikanske geofysikeren Harry Fielding Reid (1910) analyserte nitidige landmålinger av vei- og gjerdelinjer
          som krysset San Andreas-forkastningen før og etter skjelvet. Han la merke til at gjerder som opprinnelig var snorrette,
          hadde blitt gradvis bøyd til en svak S-kurve i tiårene forut for katastrofen, før de plutselig ble kuttet tvert av med
          en permanent forskyvning på opptil 6 meter under selve skjelvet.
        </p>

        <ElasticReboundDiagram />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Den seismiske syklusen trinn for trinn
        </h3>
        <div className="space-y-2 text-muted-foreground">
          <p>
            Reids teori om <strong>elastisk tilbakefjæring (elastic rebound theory)</strong> danner i dag fundamentet for all
            moderne jordskjelvforskning og forklarer den periodiske <em>seismiske syklusen</em>:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li>
              <strong className="text-foreground">Tektonisk spenningsoppbygging:</strong> Platetektoniske krefter driver to jordskorpeblokker
              i motsatte retninger med noen centimeter per år. Langs forkastningsflaten hindrer imidlertid
              enorm friksjon og rugositeter (asperiteter) blokkene i å gli jevnt forbi hverandre. Forkastningen er <em>låst</em>.
            </li>
            <li>
              <strong className="text-foreground">Elastisk deformasjon:</strong> Fordi bergartene ikke kan gli, begynner fjellmassene
              på hver side av forkastningen å bøyes og tøyes elastisk, akkurat som en stålfjær eller en spent pil og bue.
              Mekanisk potensiell energi akkumuleres over tiår, århundrer eller årtusener.
            </li>
            <li>
              <strong className="text-foreground">Spenningsbrudd:</strong> Når den oppbygde skjærspenningen (τ) til slutt overstiger
              bergartens skjærfasthet eller friksjonslåsens motstand, svikter asperitetene brått.
            </li>
            <li>
              <strong className="text-foreground">Tilbakefjæring og bølgeutstråling:</strong> I løpet av brøkdeler av et sekund spretter
              de elastisk deformerte bergartene tilbake til sin opprinnelige, ubelastede form. Den frigjorte elastiske energien omdannes
              til varme og <strong>seismiske sjokkbølger</strong> som stråler ut i alle retninger fra bruddstedet (hyposenteret).
            </li>
          </ol>
        </div>

        <OrdBoks
          ord="Elastisk tilbakefjæring"
          barn="Prinsippet der bergarter spennes opp som en fjær langs en låst forkastning. Når friksjonen ryker, spretter fjellet tilbake og utløser jordskjelv."
        />
        <OrdBoks
          ord="Hyposenter (fokus)"
          barn="Det nøyaktige punktet dypt nede i jordskorpen der forkastningsbruddet starter og den seismiske energien utløses."
        />
        <OrdBoks
          ord="Episenter"
          barn="Punktet på jordoverflaten som ligger loddrett over hyposenteret."
        />
      </section>

      {/* SEKSJON 2: SEISMISKE BØLGER OG JORDENS INDRE */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Seismiske bølger og oppdagelsen av jordens flytende kjerne
        </h2>
        <p>
          Når en forkastning brister, forplanter energien seg gjennom jorden i form av elastiske deformasjonsbølger.
          Vi deler dem inn i to hovedgrupper: <strong>romlige bølger (body waves)</strong>, som reiser gjennom jordens indre,
          og <strong>overflatebølger (surface waves)</strong>, som er bundet til jordens overflate.
        </p>

        <EarthquakeWavePhysicsDiagram />

        <PhotoFigure
          src="/images/geo-jordskjelv-bolger-3d.jpg"
          alt="3D-snitt av forkastningsbrudd, hyposenter, episenter og utbredelse av P-, S-, Rayleigh- og Love-bølger"
          heading="3D-seismologi: Fra forkastningsbrudd til overflatebølger"
          caption="Når en forkastning brister, frigjøres elastisk spenningsenergi fra hyposenteret (fokus). Energien forplanter seg innover i jorden som romlige bølger (raske P-kompresjonsbølger og langsommere S-skjærbølger). Når bølgene treffer jordoverflaten ved episenteret, omdannes de til overflatebølger: Love-bølger (horisontal sideveis skjærbevegelse) og Rayleigh-bølger (rullende elliptisk bevegelse). Det er overflatebølgenes store amplitude som forårsaker de største strukturelle skadene på bygninger."
          marks={[
            { x: 38, y: 75, n: "1", text: "Hyposenter (fokus)", tone: "warm" },
            { x: 55, y: 62, n: "2", text: "P-bølge (kompresjon)", tone: "cold" },
            { x: 25, y: 55, n: "3", text: "S-bølge (skjær)", tone: "warm" },
            { x: 42, y: 22, n: "4", text: "Episenter & overflatebølger", tone: "cold" },
          ]}
          points={[
            { n: "1", label: "Hyposenter (fokus): Det eksakte bruddpunktet på den låste forkastningsflaten der spenningen overstiger bergartens skjærfasthet." },
            { n: "2", label: "P-bølger (primære): Longitudinelle bølger med vekslende kompresjon og strekk; raskest (~6–8 km/s) og kan gå gjennom både fast stoff og væske." },
            { n: "3", label: "S-bølger (sekundære): Transversale skjærbølger (~3,5–4,5 km/s); kan KUN forplante seg i fast stoff — stoppes momentant av jordens flytende ytre kjerne." },
            { n: "4", label: "Overflatebølger (Rayleigh & Love): Beveger seg langs jordoverflaten med størst amplitude og lavest frekvens; raserer bygninger og broer." },
          ]}
        />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Bølgefysikk og elastisitetsmoduler
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-teal text-sm">P-bølger (primære kompresjonsbølger)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              P-bølger er <em>longitudinelle bølger</em>: Partiklene svinger frem og tilbake parallelt med
              bølgens utbredelsesretning.
            </p>
            <p className="mt-1 font-mono text-xs text-teal">
              v_p = √((K + 4/3 μ) / ρ) ≈ 6,0–8,0 km/s (i skorpen)
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Fordi kompresjonsmodulen K aldri er null, kan P-bølger forplante seg gjennom <strong>både faste bergarter,
              væsker og gasser</strong>. De ankommer alltid først til en seismisk stasjon.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-warm text-sm">S-bølger (sekundære skjærbølger)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              S-bølger er <em>transversale bølger</em>: Partiklene svinger vinkelrett på bølgens
              forplantningsretning.
            </p>
            <p className="mt-1 font-mono text-xs text-warm">
              v_s = √(μ / ρ) ≈ 3,5–4,5 km/s (i skorpen)
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Væsker og gasser har ingen skjærstivhet (μ = 0). Derfor er{" "}
              <strong> v_s = 0 i væsker</strong> — S-bølger kan overhodet ikke forplante seg gjennom flytende medier!
            </p>
          </div>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Overflatebølger: Rayleigh og Love
        </h3>
        <p>
          Når P- og S-bølgene treffer jordoverflaten, reflekteres og interfererer de med grenseflaten mot atmosfæren.
          Dette genererer to typer <strong>overflatebølger</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Rayleigh-bølger:</strong> Rullende bølgebevegelse i vertikalplanet (retrograd elliptisk),
            tilsvarende dønninger på havet.
          </li>
          <li>
            <strong className="text-foreground">Love-bølger:</strong> Rent horisontal skjærbevegelse på tvers av bølgeretningen.
            Det er Love- og Rayleigh-bølgene som forårsaker de suverent største ødeleggelsene på bygninger og infrastruktur!
          </li>
        </ul>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Oldhams oppdagelse (1906): S-bølgenes skyggesone
        </h3>
        <p>
          I 1906 publiserte den britiske geologen Richard Dixon Oldham en banebrytende oppdagelse: Seismografer plassert i en
          vinkelavstand på mellom <strong>103° og 180°</strong> fra et jordskjelvs episenter registrerte aldri direkte S-bølger
          (Oldham, 1906).
        </p>
        <p>
          Fordi S-bølger ikke kan gå gjennom væske, innså Oldham at jordens sentrum måtte bestå av en
          gigantisk flytende kjerne! P-bølgene ble dessuten kraftig avbøyd (refraktert) innover på grunn av en brå nedgang i
          lydhastigheten, noe som også skapte en P-bølge-skyggesone mellom 103° og 142°. I 1936 viste den danske seismologen
          Inge Lehmann at svake P-bølger likevel dukket opp i skyggesonen, og beviste dermed eksistensen av en fast, indre kjerne.
        </p>
      </section>

      {/* SEKSJON 3: SEISMOGRAM OG TRIANGULERING */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Måling av jordskjelv: Seismogram, tidsdifferanse og magnitude
        </h2>
        <p>
          Et <em>seismometer</em> registrerer bakkebevegelse i tre ortogonale dimensjoner (nord-sør, øst-vest og vertikalt)
          ved hjelp av en opphengt treghetsmasse som forblir i ro mens jorden ryster rundt den. Den digitale utskriften kalles
          et <strong>seismogram</strong>.
        </p>

        <SeismogramDiagram />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Lokalisering via sirkeltriangulering
        </h3>
        <p>
          Fordi P-bølgene beveger seg omtrent 1,7 ganger raskere enn S-bølgene, vil avstanden mellom de to bølgetogene øke
          jo lenger de reiser. Tidsdifferansen mellom første P-bølgeankomst og første S-bølgeankomst kalles
          <strong className="text-foreground"> Δt = t_S - t_P</strong>.
        </p>
        <div className="rounded-xl border border-border bg-card/60 p-4 font-mono text-sm text-primary">
          d = Δt · (v_p · v_s) / (v_p - v_s) ≈ Δt · 8,0 km/s (i typisk kontinentalskorpe)
        </div>
        <p className="text-sm text-muted-foreground">
          Én stasjon gir oss avstandsradien som en sirkel. To stasjoner gir to sirkler som skjærer hverandre i to punkter.
          Først med en <strong>tredje uavhengig seismisk stasjon</strong> krysser sirklene i et unikt, felles punkt:{" "}
          <strong>jordskjelvets episenter</strong>!
        </p>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Magnitude: Hvor mye energi slapp skjelvet?
        </h3>
        <p>
          Historisk ble jordskjelv målt med Charles Richters <em>lokalmagnitude (M_L)</em> fra 1935. Richters skala har imidlertid
          en alvorlig fysisk begrensning: Ved svært store jordskjelv «mettes» seismometeret, slik at et skjelv på magnitude 8
          og et på magnitude 9,5 kan gi tilnærmet samme utslag.
        </p>
        <p>
          I moderne geofag brukes derfor utelukkende <strong className="text-foreground">momentmagnitude (M_w)</strong>,
          introdusert av Hiroo Kanamori og Thomas Hanks. Momentmagnituden er direkte forankret i skjelvets fysiske
          parametere via det <em>seismiske momentet (M₀)</em>:
        </p>
        <div className="rounded-xl border border-border bg-card/60 p-4 font-mono text-sm text-primary">
          M₀ = μ · A · D
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Hvor:</p>
          <p>• <strong>μ</strong> = bergartens skjærstivhet (typisk ~30 GPa i jordskorpen)</p>
          <p>• <strong>A</strong> = arealet av forkastningsflaten som brast (lengde × bredde i m²)</p>
          <p>• <strong>D</strong> = gjennomsnittlig forskyvning langs bruddflaten (i meter)</p>
        </div>
        <p>
          Momentmagnituden beregnes deretter logaritmisk: M_w = ⅔ log₁₀(M₀) - 6,07.
        </p>
        <Callout title="Viktig eksamenspoeng: Den logaritmiske energiskalaen">
          <p>
            En økning på <strong>1 enhet i magnitude</strong> betyr at den frigjorte seismiske energien øker med en faktor
            på 10^(1,5) ≈ <strong>31,6 ganger</strong>!
          </p>
          <p className="mt-1">
            En økning på <strong>2 enheter</strong> (f.eks. fra M 5 til M 7) betyr at skjelvet frigjør nøyaktig
            31,6 × 31,6 = <strong>1000 ganger mer energi</strong>! Det kraftigste skjelvet som noensinne er målt,
            Valdivia-skjelvet i Chile i 1960 (M_w 9,5), frigjorde mer seismisk energi enn titusenvis av Hiroshima-atombomber.
          </p>
        </Callout>
      </section>

      {/* SEKSJON 4: PLATEGRENSER OG DYPE SKJELV */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Plategrenser og dype skjelv: Wadati-Benioff-sonen
        </h2>
        <p>
          Jordskjelv forekommer ikke tilfeldig fordelt utover kloden. De tegner opp de globale plategrensene med
          forbløffende presisjon. Men fokaldybden (hvor dypt hyposenteret befinner seg) varierer dramatisk med tektonisk regime.
        </p>

        <BoundaryQuakesDiagram />

        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-teal text-sm">Spredningsrygger og transformforkastninger</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Her er litosfæren tynn og astenosfæren varm. Bergarter deformeres plastisk uten sprøe brudd.
              Jordskjelv er utelukkende grunne <strong>(&lt; 20–25 km dype)</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-rose-400 text-sm">Subduksjonssoner (Wadati-Benioff-sonen)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Her tvinges en kald, stiv oseanisk litosfæreplate dypt ned. Fordi platen er så kald,
              forblir kjernen sprø helt ned til <strong>670–700 kilometers dyp</strong>! Under 700 km opphører skjelvene
              fordi mineralene rekrystalliserer til tette faser som deformeres plastisk.
            </p>
          </div>
        </div>

        <OrdBoks
          ord="Wadati-Benioff-sone"
          barn="En skrå sone av dype jordskjelv (helt ned til 700 km) som oppstår inne i en kald havbunnsplate idet den subdueres ned i mantelen under en annen plate."
        />
      </section>

      {/* SEKSJON 5: NORSK SEISMISITET */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Norsk seismisitet og geofarer: Hvorfor skjelver Norge?
        </h2>
        <p>
          Mange tror at Norge er fullstendig skjermet mot jordskjelv fordi vi ligger langt inne på den eurasiske kontinentalplaten.
          Det stemmer at Norge er et <em>intraplate-område</em> uten aktive subduksjonssoner. Likevel er Norge blant de{" "}
          <strong>mest seismisk aktive områdene i hele Nord-Europa</strong>!
        </p>

        <Callout title="Seismisk fare vs. seismisk risiko">
          <p>
            Det er viktig å skille mellom to begreper i LK20-kompetansemålene om naturfarer:
          </p>
          <ul className="mt-2 space-y-1 text-sm list-disc pl-4">
            <li>
              <strong>Seismisk fare</strong> er den fysiske hendelsen — styrken og hyppigheten av jordskjelv i et område.
              Norge har moderat fare, særlig langs kysten og i Oslofjordområdet.
            </li>
            <li>
              <strong>Seismisk risiko</strong> = fare × sårbarhet × eksponering. Et kraftig skjelv i et øde fjellstrøk
              er høy fare, men lav risiko. Et svakt skjelv under Oslo med gammel bygningsmasse er lav fare, men høy risiko.
            </li>
          </ul>
        </Callout>

        <NorwayEarthquakesDiagram />

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          To dominerende spenningskilder i norsk jordskorpe
        </h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Ryggtrykk («Ridge push»):</strong> Den midtatlantiske ryggen i vest utvider seg
            kontinuerlig med 2–2,5 cm per år. Den gravitasjonelle tyngden av ryggen presser det eurasiske kontinentet østover
            og setter den norske kontinentalskorpen under et regionalt, nordvest–sørøst-rettet kompresjonstrykk.
          </li>
          <li>
            <strong className="text-foreground">Postglasial landheving (isostasi):</strong> Under siste istid (Weichsel) var
            Skandinavia tynget ned av en opptil 3 kilometer tykk iskappe. Da isen smeltet for 10 000 år siden, begynte jordskorpen
            å heve seg elastisk og viskøst tilbake mot isostatisk likevekt. Innlandet hever seg fortsatt med opptil 8–9 mm per år
            rundt Bottenviken. Denne skjeve hevingen reaktiverer eldgamle svakhetssoner i fjellet.
          </li>
        </ol>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Historiske kjempeskjelv i Norge
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong className="text-foreground">Lurøyskjelvet 31. august 1819 (M ≈ 5,8):</strong> Det største kjente jordskjelvet
              i Nord-Europa i historisk tid. Episenteret lå på Helgelandskysten i Nordland. Rystelsene forårsaket store fjellskred,
              jordlikvifaksjon og ble merket til Stockholm og Kola.
            </li>
            <li>
              <strong className="text-foreground">Oslofjordskjelvet 23. oktober 1904 (M 5,4):</strong> Det største skjelvet i moderne
              tid på Østlandet. Episenteret lå i Skagerrak/Kattegat, ca. 25 km sør for Hvaler. Ble følt over 800 000 km²
              (Bungum et al., 2009).
            </li>
            <li>
              <strong className="text-foreground">Storfjordskjelvet på Svalbard 21. februar 2008 (M_w 6,0):</strong> Det kraftigste
              instrumentelt registrerte jordskjelvet på norsk territorium i moderne tid.
            </li>
          </ul>
        </div>
      </section>

      {/* SEKSJON 6: TSUNAMIFYSIKK */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Tsunamifysikk: Bølgehastighet, oppstuing (shoaling) og Greens lov
        </h2>
        <p>
          En <em>tsunami</em> er ikke en vanlig vindbølge, men en serie gravitasjonelle sjøbølger utløst av en plutselig,
          storskala vertikal forskyvning av vannsøylen. Fordi bølgelengden (λ) typisk er mellom 100 og 300 kilometer,
          oppfyller tsunamier kriteriet for <strong>grunntvannsbølger</strong> (λ ≫ d) selv over de dypeste
          havslettene på 4000 til 6000 meters dyp!
        </p>

        <PhotoFigure
          src="/images/geo-tsunami-shoaling.jpg"
          alt="Tsunami fra dyphavsforplantning i 800 km/t til kystoppstuing (shoaling) og tilbaketrekning"
          heading="Tsunamifysikk: Fra dypvannsbølge til kystoppstuing (shoaling)"
          caption="På 4000 meters dyp beveger tsunamien seg med jetflyfart (v = √(gd) ≈ 700–800 km/t) med en bølgehøyde på under én meter. Når bølgen nærmer seg land og dypet faller, bremser bunnfriksjonen bølgefronten. Energibevaring og Greens lov (H₂ = H₁ · (d₁/d₂)¼) tvinger bølgelengden til å komprimeres og vannet opp i en livsfarlig flodbølge."
          marks={[
            { x: 15, y: 78, n: "1", text: "Vertikalt forkastningssprang", tone: "warm" },
            { x: 38, y: 45, n: "2", text: "Dypvannsbølge (800 km/t)", tone: "cold" },
            { x: 68, y: 55, n: "3", text: "Tilbaketrekning (drawback)", tone: "warm" },
            { x: 84, y: 38, n: "4", text: "Shoaling & oppskylling", tone: "warm" },
          ]}
          points={[
            { n: "1", label: "Havbunnsforskyvning: Megathrust-jordskjelv eller undersjøisk skred løfter momentant kubikkilometere med vannmasser." },
            { n: "2", label: "Dypvannsforplantning: Fart v = √(g·d) ≈ 200 m/s (720 km/t). Bølgen passerer umerkelig under skip på åpent hav." },
            { n: "3", label: "Tilbaketrekning (drawback): Når bølgedalen ankommer først, suges vannet ut fra strendene og tørrlegger havbunnen minutter før bølgetoppen slår inn." },
            { n: "4", label: "Shoaling: Fronten bremses mens hekken raser på med høyere fart; bølgen komprimeres horisontalt og tvinges opp i en massiv vannvegg." },
          ]}
        />

        <div className="space-y-2 text-sm text-muted-foreground pt-2">
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong className="text-foreground">Fart i dypet (v = √(g · d)):</strong> På 4000 meters dyp
              er farten v = √(9,81 m/s² × 4000 m) ≈ 198 m/s ≈ 713 km/t.
              Tsunamien krysser hele Atlanterhavet på under 7 timer.
            </li>
            <li>
              <strong className="text-foreground">Greens lov og Shoaling (H₂ = H₁ · (d₁ / d₂)¼):</strong> Når
              dypet avtar fra 4000 til 10 meter nær land, synker hastigheten fra 713 km/t til 36 km/t. Bølgehøyden
              ganges med (4000 / 10)^0,25 ≈ 4,5 — eller over 10–20 ganger i trange viker og V-formede fjorder.
            </li>
          </ul>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Tsunamirisiko i Norge: Fjellskred fremfor subduksjon
        </h3>
        <p>
          I Stillehavet utløses katastrofale tsunamier av gigantiske megathrust-jordskjelv i subduksjonssoner.
          I Norge er situasjonen en helt annen: Norske tsunamier forårsakes nesten utelukkende av{" "}
          <strong className="text-foreground"> gravitasjonelle skred</strong>!
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Fjellskred i trange fjorder:</strong> Historiske ulykker som Tafjord (1934, 40 døde,
            opptil 62 m flodbølgehøyde) og Loen (1905 og 1936, 135 døde) skyldtes ustabile fjellpartier som raste rett i fjorden.
            I dag overvåker NVE det ustabile partiet <em>Åknes</em> i Storfjorden døgnkontinuerlig.
          </li>
          <li>
            <strong className="text-foreground">Ubåt-skred på sokkelskråningen:</strong> Det gigantiske <em>Storeggaskredet</em> for
            om lag 8150 år siden var et enormt undersjøisk sedimentras på 3000 km³ utenfor Møre. Skredet utløste en
            tsunami med opptil 10–12 meters oppskyllingshøyde langs norskekysten og over 20 meter på Shetland.
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Les mer om skredmekanismer, stabilitetsberegninger og overvåking i vårt dedikerte{" "}
          <Link to="/geofag-1/skred" className={lenke}>
            kapittel om skred og massesukkessjon
          </Link>
          .
        </p>
      </section>

      {/* SEKSJON 7: JORDSKJELVSIKRING */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Jordskjelvsikring og konstruksjonsteknikk: Eurokode 8 og baseisolering
        </h2>
        <p className="text-sm text-muted-foreground">
          Det er et velkjent geofaglig ordtak at <em>«jordskjelv dreper ikke mennesker — det er kollapsende bygninger som gjør det»</em>.
          Moderne seismisk ingeniørkunst har utviklet metoder for å beskytte samfunnet:
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-sky-400 text-sm">Eurokode 8 (NS-EN 1998-1)</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Den europeiske standarden for prosjektering av konstruksjoner for seismisk påvirkning, lovpålagt i Norge.
              Krever at samfunnskritisk infrastruktur dimensjoneres for å motstå forventede spissakselerasjoner i grunnen (PGA)
              uten total kollaps (Standard Norge, 2021).
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-emerald-400 text-sm">Baseisolering (Seismiske dempere)</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              I stedet for å bolte bygget stivt til fjellet, plasseres fundamentet på fleksible bly-gummi-lagre
              (elastomeric bearings) eller friksjonspendellagre. Når bakken ryster horisontalt, glir
              fundamentet på demperne mens selve bygget forblir tilnærmet i ro.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-amber-400 text-sm">Svingningsdempere (Tuned Mass Dampers)</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              I skyskrapere som Taipei 101 henger en 660 tonns tung stålkule i toppen av tårnet. Under jordskjelv svinger
              kulen i motfase med bygningens resonansfrekvens og absorberer opptil 40 % av svingningsenergien.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-rose-400 text-sm">Jordlikvifaksjon (Jordflyt)</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              I vannmettet, løst sand- og siltjord fører gjentatt seismisk risting til at poretrykket i vannet stiger dramatisk.
              Vannet presser sandkornene fra hverandre, friksjonen forsvinner, og fast grunn forvandles momentant til en
              flytende kvikksandsuppe (som under Niigata 1964 og Lurøyskjelvet 1819).
            </p>
          </div>
        </div>
      </section>

      {/* BEGREPSREGISTER */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Viktige faglige begreper</h2>
      <TermGrid>
        <Term
          name="elastisk tilbakefjæring"
          def="Reids teori for jordskjelv der bergarter bøyes elastisk langs en låst forkastning inntil friksjonslåsen brister og fjellet spretter tilbake"
        />
        <Term
          name="hyposenter (fokus)"
          def="det eksakte bruddpunktet i jordskorpen der jordskjelvets seismiske energi først utløses"
        />
        <Term
          name="episenter"
          def="punktet på jordoverflaten som ligger loddrett over jordskjelvets hyposenter"
        />
        <Term
          name="P-bølge"
          def="primær kompresjonsbølge (lengdebølge); raskeste seismiske bølge (~6–8 km/s) som kan gå gjennom både fast stoff og væske"
        />
        <Term
          name="S-bølge"
          def="sekundær skjærbølge (tverrbølge); krever skjærstivhet (μ > 0) og kan derfor IKKE forplante seg gjennom væsker"
        />
        <Term
          name="momentmagnitude (Mw)"
          def="det moderne fysiske målet på jordskjelvenergi, beregnet direkte fra forkastningsareal, forskyvning og bergartens stivhet"
        />
        <Term
          name="Wadati-Benioff-sone"
          def="en skrå sone av dype jordskjelv (helt ned til 700 km dyp) i en subduksjonssone der en kald havbunnsplate presses ned i mantelen"
        />
        <Term
          name="intraplate-jordskjelv"
          def="jordskjelv som oppstår inne på en litosfæreplate langt unna aktive plategrenser (som jordskjelv i Norge)"
        />
        <Term
          name="shoaling"
          def="bølgeoppstuing: når en tsunami nærmer seg kysten, synker farten, bølgelengden krymper, og høyden vokser dramatisk"
        />
        <Term
          name="Eurokode 8"
          def="europeisk byggestandard (NS-EN 1998-1) med krav til seismisk dimensjonering og jordskjelvsikring av byggverk"
        />
        <Term
          name="baseisolering"
          def="seismisk sikringsmetode der byggverk frikoples fra bakkerystelser ved hjelp av fleksible gummilagre under fundamentet"
        />
        <Term
          name="jordlikvifaksjon"
          def="fenomen der vannmettet sand/silt mister all skjærstyrke og oppfører seg som flytende væske under seismisk rystelse"
        />
        <Term
          name="seismisk fare"
          def="den fysiske sannsynligheten og styrken av jordskjelv i et område, uavhengig av menneskelig eksponering"
        />
        <Term
          name="seismisk risiko"
          def="kombinasjonen av seismisk fare, sårbarhet i bebyggelse/infrastruktur og eksponering av befolkning og verdier"
        />
      </TermGrid>

      {/* QUIZ */}
      <div className="pt-4">
        <Quiz
          questions={[
            {
              prompt:
                "Hva var Richard Dixon Oldhams (1906) avgjørende bevis for at jordens ytre kjerne er flytende?",
              options: [
                "P-bølger reflekteres ikke fra jordens overflate.",
                "S-bølger (transversale skjærbølger) mangler fullstendig på seismiske målestasjoner i vinkelavstanden mellom 103° og 180° fra episenteret.",
                "Borehull i Russland nådde flytende magma på 12 kilometers dyp.",
                "Rayleigh-bølger forplanter seg raskere gjennom havet enn gjennom kontinenter.",
              ],
              answer: 1,
              explain:
                "Riktig! S-bølger er transversale skjærbølger med hastighet Vs = √(μ/ρ). Fordi væsker mangler skjærstivhet (μ = 0), kan ikke S-bølger eksistere eller forplante seg i en væske. Oldhams påvisning av S-bølgenes skyggesone mellom 103° og 180° beviste ugjendrivelig at jordens kjerne har et flytende ytre lag.",
            },
            {
              prompt:
                "Dersom et jordskjelv øker fra magnitude 5,0 til magnitude 7,0 på momentmagnitudeskalaen (Mw), hvor mange ganger mer seismisk energi frigjøres?",
              options: [
                "2 ganger mer energi.",
                "20 ganger mer energi.",
                "Omtrent 100 ganger mer energi.",
                "Nøyaktig 1000 ganger mer energi (31,6² ≈ 1000).",
              ],
              answer: 3,
              explain:
                "Riktig! Magnitudeskalaen er logaritmisk med grunntall 10^(1,5) for energi. Én enhet opp tilsvarer ca. 31,6 ganger mer frigjort seismisk energi. To enheter opp tilsvarer 10^(1,5 × 2) = 10³ = 1000 ganger mer energi!",
            },
            {
              prompt:
                "Hva skjer fysisk med en tsunami når den forplanter seg fra dyphavet (4000 m) og inn mot kysten (10 m dyp)?",
              options: [
                "Bølgens hastighet øker kraftig, mens bølgehøyden avtar til null.",
                "Bølgehastigheten synker dramatisk fra ~700 km/t til ~36 km/t, bølgelengden komprimeres, og bølgehøyden presses opp etter Greens lov (shoaling).",
                "Bølgen forvandles fra en tverrbølge til en lengdebølge.",
                "Ingenting endrer seg; tsunamier har konstant hastighet og høyde overalt.",
              ],
              answer: 1,
              explain:
                "Riktig! Fordi v = √(g·d), fører det grunnere vannet til at bølgefronten bremses kraftig opp. For at den totale energifluksen skal bevares, må bølgelengden krympe og vannsøylen heve seg oppover i en massiv vannvegg (shoaling).",
            },
            {
              prompt:
                "Hva er de to viktigste geofysiske drivkreftene bak jordskjelv i Norge, til tross for at landet er et intraplate-område?",
              options: [
                "Subduksjon av Nordsjøen under Vestlandet og vulkanisme i Oslofeltet.",
                "Ryggtrykk («ridge push») fra Den midtatlantiske ryggen i vest og postglasial landheving (isostasi) etter istiden.",
                "Tidevannskrefter fra månen og sentrifugalkraft fra jordrotasjonen.",
                "Oljeboring i Nordsjøen og smelting av permafrost i Finnmark.",
              ],
              answer: 1,
              explain:
                "Riktig! Norge utsettes for kompresjonsspenninger rettet mot øst-sørøst på grunn av ryggtrykk fra den ekspanderende Midtatlantiske ryggen, kombinert med differensiell heving (opptil 8–9 mm/år) etter at den 3 km tykke iskappen smeltet. Dette reaktiverer gamle forkastningssoner.",
            },
            {
              prompt:
                "Hva er den fundamentale forskjellen på opprinnelsen til tsunamier i Stillehavet sammenlignet med historiske tsunamier i Norge?",
              options: [
                "I Stillehavet skyldes tsunamier store megathrust-jordskjelv ved subduksjonssoner; i Norge skyldes de nesten utelukkende skred i fjorder eller på sokkelskråningen (f.eks. Tafjord og Storegga).",
                "Norske tsunamier skapes av tropiske orkaner i Nordsjøen.",
                "Stillehavstsunamier er forårsaket av tidevann, mens norske tsunamier er forårsaket av Beerenberg på Jan Mayen.",
                "Det er ingen forskjell; begge typer dannes ved at litosfæreplater kolliderer langs kystlinjen.",
              ],
              answer: 0,
              explain:
                "Riktig! Norge har ingen aktive subduksjonssoner som kan heve havbunnen over store områder. Norske tsunamier oppstår når store stein- og sedimentvolumer raser ned i vannmassene — enten som fjellskred i trange vestlandsfjorder (Tafjord 1934, Loen, Åknes) eller som massive undervannsskred på kontinentalskråningen (Storeggaskredet for 8150 år siden).",
            },
            {
              prompt:
                "Hva er seismisk baseisolering, og hva er prinsippet bak (Eurokode 8)?",
              options: [
                "Bygningen boltes fast til fjellet med gigantiske stålstag for å hindre all bevegelse.",
                "Bygningen monteres på fleksible elastomere gummilagre eller glidependler, slik at bakken kan ryste under bygget mens selve strukturen forblir tilnærmet i ro.",
                "Bygningen kles med blyplater for å stoppe seismisk stråling.",
                "Fundamentet fylles med vann for å absorbere P-bølger.",
              ],
              answer: 1,
              explain:
                "Riktig! Baseisolering frikopler bygningens overbygning fra bakkeakselerasjonene ved hjelp av fleksible bly-gummi-lagre. Dette reduserer horisontale skjærkrefter på bygningskroppen med opptil 70–80 %.",
            },
            {
              prompt:
                "Hva er forskjellen på seismisk fare og seismisk risiko?",
              options: [
                "Det er det samme begrepet; bare ulikt norsk og engelsk uttrykk.",
                "Seismisk fare er den fysiske sannsynligheten for jordskjelv i et område, mens seismisk risiko kombinerer fare med sårbarhet og eksponering av befolkning og bebyggelse.",
                "Seismisk risiko gjelder bare tsunamier, mens seismisk fare gjelder jordskjelv på land.",
                "Seismisk fare måles i magnitude, mens seismisk risiko måles i intensitet.",
              ],
              answer: 1,
              explain:
                "Riktig! Et kraftig skjelv i øde fjellandskap er høy fare, men lav risiko fordi ingen er eksponert. Et svakt skjelv under en tett befolket by med gammel bygningsstock er lav fare, men potensielt høy risiko på grunn av sårbar infrastruktur og stor eksponering.",
            },
            {
              prompt:
                "Hvorfor er den seismiske Wadati-Benioff-sonen et bevis på at en kald havbunnsplate subdueres nedover i mantelen?",
              options: [
                "Fordi jordskjelv i sonen oppstår fordi magmaen smelter og eksploderer.",
                "Fordi den kalde, stive havbunnsplaten er sprø ned til 700 km dyp og kan lagre og frigjøre elastisk spenning langs et skrått plan av fokuspunkter som sporer nøyaktig plategeometrien.",
                "Fordi seismiske bølger reflekteres av plategrenseflaten og danner tydelige signaler.",
                "Fordi subduksjon produserer varme som får bergartene til å kollapse og utløse skjelv.",
              ],
              answer: 1,
              explain:
                "Riktig! Det skrå planet av jordskjelv (0–700 km dyp) i subduksjonssoner følger nøyaktig den kalde, sprø platen som tvinges ned i den varme, plastiske astenosfæren. Under 700 km er trykk og temperatur så høyt at bergartene deformeres plastisk — og ingen jordskjelv oppstår.",
            },
          ]}
        />
      </div>
    </TopicLayout>
  );
}
