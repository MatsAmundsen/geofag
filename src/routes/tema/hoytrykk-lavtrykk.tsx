import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import {
  AtmosphericColumnDiagram,
  FoehnAdiabaticDiagram,
  HighPressureCrossSectionDiagram,
  KatabaticWindDiagram,
  LowPressureCrossSectionDiagram,
  RelativePressureDiagram,
  SeaBreezeDiagram,
  WindForcesBalanceDiagram,
} from "@/components/diagrams";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { GF2_THEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

const tema = GF2_THEMES.find((t) => t.to === "/tema/hoytrykk-lavtrykk")!;

export const Route = createFileRoute("/tema/hoytrykk-lavtrykk")({
  head: () =>
    topicHead({
      title: `${tema.title} · Geofag 2`,
      description: tema.blurb,
      path: "/tema/hoytrykk-lavtrykk",
    }),
  component: TrykkPage,
});

function TrykkPage() {
  return (
    <TopicLayout
      kicker="Atmosfæren"
      title="Høytrykk og lavtrykk"
      lead="Luft har masse, og atmosfærens tyngde hviler konstant over oss. Der luften stiger til værs, faller trykket ved bakken, og vanndampen kondenserer til skyer og nedbør. Der luften synker, stiger trykket, og skyene fordamper til fordel for klar himmel. Mellom disse to vertikale bevegelsene oppstår vinden – luftmasser i bevegelse for å jevne ut trykkforskjellene. Sammen med jordrotasjonens avbøyning danner dette fundamentet for alt vær og klima på jorden."
      banner="/images/banner-trykk.jpg"
      bannerAlt="Kyst i to slags vær: storm og lavtrykk til venstre, klar himmel og høytrykk til høyre"
      next={{ to: "/tema/vindsystemet", label: "Neste: Vindsystemet" }}
      kilder={KILDER.trykk}
    >
      {/* 1. LUFTTRYKK */}
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er egentlig lufttrykk?
      </h2>
      <p>
        Selv om vi sjelden tenker over det i hverdagen, lever vi på bunnen av et hav av luft. Luft
        er en blanding av gasser – hovedsakelig nitrogen (78 %) og oksygen (21 %) – og hvert eneste
        gassmolekyl har masse. Jordens gravitasjonsfelt trekker disse molekylene mot overflaten, og
        lufttrykket i et hvilket som helst punkt er nøyaktig lik{" "}
        <strong>vekten av den overliggende luftsøylen</strong> som strekker seg helt opp til
        verdensrommet (NOAA, u.å.-a).
      </p>
      <p>
        Ved havnivå utøver atmosfæren et gjennomsnittlig trykk på{" "}
        <strong>1013,25 hektopascal (hPa)</strong>, også kalt standardatmosfæren (NOAA, u.å.-a). Én hektopascal
        tilsvarer 100 pascal (1 hPa = 100 N/m²), som betyr at vekten av luften over én enkelt
        kvadratmeter på bakken er om lag 100 000 newton. Dette tilsvarer en masse på hele{" "}
        <strong>10 000 kilo – altså 10 tonn luft over hodet på deg!</strong>
        Grunnen til at vi ikke knuses under denne kolossale vekten, er at væsketrykket i kroppens
        celler og vev utøver et nøyaktig like stort mottrykk innenfra.
      </p>

      <OrdBoks
        ord="Lufttrykk"
        barn="Vekten av den overliggende luftsøylen per arealenhet. Måles meteorologisk i hektopascal (hPa) eller millibar (mbar)."
      />

      <p>
        Fordi luft er en gass, kan den presses sammen. Tyngden fra de øvre luftlagene komprimerer de
        nederste lagene mot bakken. Derfor er lufttettheten størst ved havnivå (ca. 1,2 kg/m³) og
        avtar raskt oppover. Dette fører til at lufttrykket faller eksponensielt med høyden:
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          Nær bakken faller trykket med om lag <strong>1 hPa for hver 8. meter</strong> du beveger
          deg oppover.
        </li>
        <li>
          Ved <strong>5 500 meters høyde</strong> er trykket halvert til ca. 500 hPa. Det betyr at
          50 % av hele atmosfærens masse ligger under denne høyden.
        </li>
        <li>
          På toppen av Mount Everest (8 848 moh.) er trykket falt til rundt 330 hPa – bare en
          tredjedel av trykket ved havnivå.
        </li>
        <li>
          Ved <strong>tropopausen (ca. 11 km)</strong> er trykket nede i om lag 250 hPa, og mer enn
          75 % av atmosfæremassen befinner seg under flyenes marsjhøyde (NOAA, u.å.-b).
        </li>
      </ul>

      <AtmosphericColumnDiagram />

      {/* 2. RELATIVT TRYKK */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Trykk er relativt: Hvorfor 1015 hPa kan bety både storm og sol
      </h2>
      <p>
        En av de vanligste misforståelsene blant geofagelever er troen på at det finnes et fast tall
        som skiller høytrykk fra lavtrykk – for eksempel at verdier over 1013 hPa alltid er
        høytrykk, og verdier under 1013 hPa alltid er lavtrykk. Slik fungerer ikke atmosfæren.
      </p>
      <p>
        Høytrykk og lavtrykk er <strong>alltid relative begreper</strong> (Store norske leksikon,
        u.å.-a; Store norske leksikon, u.å.-b):
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          Et <strong>lavtrykk (L)</strong> er et område der lufttrykket er lavere enn i de{" "}
          <em>omkringliggende</em> luftmassene.
        </li>
        <li>
          Et <strong>høytrykk (H)</strong> er et område der lufttrykket er høyere enn i de{" "}
          <em>omkringliggende</em> luftmassene.
        </li>
      </ul>
      <p>
        Tenk deg et område med et sentralt lufttrykk på 1015 hPa. Hvis dette området er omgitt av
        kraftige høytrykksrygger på 1025 hPa, vil luftmassene strømme inn mot 1015 hPa-senteret.
        Området fungerer da som et
        <strong> lavtrykk</strong> med stigende luft og skydannelse. Befinner nøyaktig samme
        trykkverdi (1015 hPa) seg derimot midt mellom dype atlantiske lavtrykk på 995 hPa, er 1015
        hPa et markant <strong>høytrykk</strong>
        som sender luft utover til sidene og gir tørt klarvær.
      </p>

      <OrdBoks
        ord="Relativt lufttrykk"
        barn="Det avgjørende for været er trykkgradienten (forskjellen over avstand mot naboområdene), aldri det absolutte hPa-tallet alene."
      />

      <p>
        På værkart tegnes linjer som kalles <strong>isobarer</strong> (av gresk <em>isos</em> = lik,
        og <em>baros</em> = tyngde). En isobar binder sammen steder som har samme lufttrykk, regnet
        om til havnivå. Avstanden mellom isobarene viser <strong>trykkgradienten</strong>: Ligger
        isobarene tett sammen, endrer trykket seg raskt over kort avstand, noe som setter luften i
        voldsom bevegelse og gir sterk kuling eller storm. Ligger isobarene langt fra hverandre, er
        gradienten slak og vinden laber.
      </p>

      <RelativePressureDiagram />

      {/* 3. LAVTRYKK */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Lavtrykk: Konvergens, heving og skydannelse
      </h2>
      <p>Hva setter i gang et lavtrykk? I atmosfæren skiller vi mellom to hovedtyper lavtrykk:</p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Termiske lavtrykk:</strong> Dannes ved ulik oppvarming av jordoverflaten. Når
          solen steker på tørt land om sommeren, varmes bakken opp og avgir varme til det nederste
          luftlaget. Varm luft utvider seg, blir lettere (får lavere tetthet) enn den kjøligere
          luften omkring, og stiger til værs som følge av oppdrift. Dette kalles <em>konveksjon</em>
          .
        </li>
        <li>
          <strong>Dynamiske lavtrykk:</strong> Dannes langs <em>polarfronten</em> i Nord-Atlanteren,
          der kald polarluft fra nord kolliderer med mild subtropisk luft fra sør. Her er det
          storskala bølger i polarjetstrømmen i øvre troposfære som suger luft oppover og skaper de
          vandrende lavtrykkene som styrer det meste av norsk ruskevær.
        </li>
      </ol>
      <p>
        Uansett hvordan lavtrykket fødes, er den indre fysikken den samme: Når luften i sentrum
        stiger, oppstår det et masseunderskudd nær bakken. Trykket faller, og luft fra omgivelsene
        trekkes inn mot lavtrykkssenteret. Dette kalles <strong>konvergens</strong> ved bakken.
        Fordi den faste jordoverflaten hindrer luften i å bevege seg nedover, er det bare én vei
        luften kan ta: <strong>oppover</strong>.
      </p>

      <OrdBoks
        ord="Konvergens"
        barn="Horisontal sammentrømning av luftmasser. Nær bakken tvinger konvergens luften til å stige vertikalt."
      />

      <p>Når luftpakken tvinges oppover, skjer det en avgjørende termodynamisk prosess:</p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Adiabatisk ekspansjonsavkjøling:</strong> Omgivelsestrykket avtar med høyden. Når
          luftpakken stiger inn i tynnere lag, utvider den seg. For å utvide seg må luftmolekylene
          skyve på luften rundt, noe som krever mekanisk arbeid. Dette arbeidet henter molekylene
          fra sin egen indre varmeenergi. Temperaturen i luftpakken faller dermed uten at det
          utveksles varme med omgivelsene. Før luften når metning, avkjøles den med{" "}
          <strong>tørradiabatisk temperaturendring (DALR) på 1,0 °C per 100 meter</strong>.
        </li>
        <li>
          <strong>Kondensasjonsnivået (LCL):</strong> Kaldere luft har lavere metningstrykk for
          vanndamp. Når luftpakken er avkjølt til sitt duggpunkt, når den 100 % relativ fuktighet.
          Høyden der dette inntreffer, kalles <em>løftet kondensasjonsnivå</em> (LCL). Her begynner
          vanndampen å kondensere til synlige skydråper – skybasen er dannet.
        </li>
        <li>
          <strong>Latent varme frigjøres som atmosfærisk drivstoff:</strong> Når gassformig vann
          kondenserer til flytende dråper, frigjøres den energien som opprinnelig ble brukt til å
          fordampe vannet: om lag
          <strong> 2,5 millioner joule per kilo vann</strong> (latent varme). Denne varmen overføres
          direkte til luften i skyen. Nå avkjøles luften vesentlig saktere – typisk med{" "}
          <strong>fuktadiabatisk temperaturendring (SALR) på ca. 0,6 °C per 100 meter</strong>.
          Siden skyen hele tiden forblir varmere og lettere enn den tørre luften utenfor, virker den
          latente varmen som en etterbrenner som forsterker oppdriften og bygger tårnhøye bygeskyer
          (<em>Cumulonimbus</em>).
        </li>
      </ul>

      <p>
        Hvor stopper stigningen? Nesten alt vær utspiller seg i <strong>troposfæren</strong>. Ved
        overgangen til
        <strong> stratosfæren</strong> (tropopausen, ca. 8–11 km over Norge) snur
        temperaturprofilen: Ozonlaget absorberer ultrafiolett stråling fra solen og varmer opp
        stratosfæren ovenfra. Stratosfæren har en stabil temperaturinversjon. Idet den stigende
        luften når tropopausen, blir den plutselig kaldere og tyngre enn luften over. Oppdriften
        stanser kontant, og luften tvinges til å spre seg horisontalt ut til sidene i den
        karakteristiske amboltformen (<strong>divergens i høyden</strong>).
      </p>

      <OrdBoks
        ord="Latent varme"
        barn="Varmeenergi som bindes ved fordamping og frigjøres ved kondensasjon. Frigjøringen i skyer holder luften varm og driver vertikal oppdrift i lavtrykk og orkaner."
      />

      <LowPressureCrossSectionDiagram />

      {/* 4. HØYTRYKK */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Høytrykk: Subsidens, oppvarming og oppløsning av skyer
      </h2>
      <p>
        Et høytrykk er lavtrykkets fysiske speilbilde. I et høytrykk strømmer luftmasser sammen i
        den øvre troposfæren (konvergens i høyden). Dette skaper et overskudd av luft oppe i
        atmosfæren, og massen presses langsomt nedover mot jordoverflaten i en prosess som kalles{" "}
        <strong>subsidens</strong> (nedsynking).
      </p>
      <p>
        Subsidensen er en storskala, rolig bevegelse – luften synker med bare noen få centimeter i
        sekundet, men den skjer samtidig over områder på størrelse med hele kontinenter. På vei ned
        presses luften inn i lag med stadig høyere lufttrykk:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Adiabatisk kompresjon og oppvarming:</strong> Det økende omgivelsestrykket klemmer
          luftpakken sammen. Det utføres et kompresjonsarbeid <em>på</em> luftpakken, slik at
          molekylene presses tettere sammen og beveger seg raskere. Temperaturen stiger
          tørradiabatisk med <strong>1,0 °C for hver 100 meter</strong>
          luften synker.
        </li>
        <li>
          <strong>Hvorfor blir himmelen skyfri?</strong> En sky består av milliarder av ørsmå,
          svevende vanndråper. Hvorvidt dråpene fordamper eller overlever, styres av{" "}
          <strong>relativ luftfuktighet</strong>. Varm luft kan inneholde vesentlig mer vanndamp enn
          kald luft før metning inntreffer (ved 20 °C kan luften holde tre ganger så mye damp som
          ved 5 °C). Når luften synker og varmes opp uten at det tilføres ny fuktighet, faller den
          relative fuktigheten drastisk – ofte ned mot 20–30 %.
        </li>
      </ul>
      <p>
        Skydråpene fordamper umiddelbart til usynlig vanndamp.{" "}
        <strong>
          Skyene i et høytrykk blåser ikke bort – de oppløses og forsvinner i den varme, tørre
          nedsynkende luften!
        </strong>
      </p>

      <OrdBoks
        ord="Subsidens"
        barn="Langsom nedsynking av luftmasser over store områder i et høytrykk. Luften komprimeres og varmes adiabatisk, slik at skyer fordamper og himmelen blir klar."
      />

      <p>
        Når den synkende luften treffer bakken, hoper det seg opp et overskudd av luftmolekyler.
        Barometeret stiger, og luften presses utover til alle sider langs bakken. Dette kalles{" "}
        <strong>divergens ved bakken</strong>.
      </p>

      <HighPressureCrossSectionDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Sommerhøytrykk vs. vinterhøytrykk i Norge
      </h3>
      <p>I Norge gir et høytrykk vidt forskjellige værtyper avhengig av årstiden:</p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h4 className="flex items-center gap-2 font-display text-base font-semibold text-amber-400">
            <span>☀️</span> Sommerhøytrykk: Varmebølger og tørke
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Om sommeren står solen høyt på himmelen opptil 18–24 timer i døgnet. Den skyfrie
            himmelen slipper solstrålingen uhindret ned til overflaten. Sammen med den adiabatiske
            nedsynkingsvarmen gir dette høye temperaturer, tørke og stor skogbrannfare. Et stabilt,
            blokkerende høytrykk over Skandinavia kan bli liggende i ukevis og splitte jetstrømmen.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h4 className="flex items-center gap-2 font-display text-base font-semibold text-sky-400">
            <span>❄️</span> Vinterhøytrykk: Bitende kulde og inversjon
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Om vinteren er nettene lange og solen står lavt. Den skyfrie himmelen i et høytrykk gjør
            at bakken taper enorme mengder varme gjennom langbølget stråling ut mot det kalde
            verdensrommet. Bakken og det nederste luftlaget bunnfryser (-20 til -40 °C i innlandet
            som Røros og Finnmarksvidda). Det oppstår en skarp
            <strong> bakkeinversjon</strong>: Luften i dalbunnen blir iskald og tung, mens det er
            mildere lenger opp i fjellet. Forurensning og vedrøyk stenges inne i dalbunnene.
          </p>
        </div>
      </div>

      {/* 5. VINDENS FYSIKK */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Vindens fysikk: De tre kreftene som styrer retningen
      </h2>
      <p>
        Vind er i bunn og grunn luft i bevegelse for å utjevne trykkforskjeller i atmosfæren. Men
        hvorfor blåser ikke vinden bare i rett linje fra det høyeste trykket til det laveste trykket
        på et værkart?
      </p>
      <p>
        Svaret ligger i samspillet mellom <strong>tre fundamentale krefter</strong>:
      </p>
      <ol className="list-decimal space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Trykkgradientkraften (F_pg):</strong> Dette er motoren som setter luften i
          bevegelse. Den peker alltid vinkelrett på isobarene fra høyt mot lavt trykk. Jo brattere
          gradienten er (tettere isobarer), desto kraftigere akselererer luften.
        </li>
        <li>
          <strong>Corioliskraften (F_c):</strong> Idet luften begynner å bevege seg, virker jordens
          rotasjon inn på den. Sett fra vår roterende jordklode avbøyes all horisontal bevegelse mot{" "}
          <strong>høyre på nordlig halvkule</strong>
          (og mot venstre på sørlig halvkule). Corioliskraften virker alltid 90° til høyre for
          vindretningen, og styrken øker med økende vindhastighet og økende breddegrad.
        </li>
        <li>
          <strong>Friksjonskraften (F_f):</strong> Nær bakken gnisser luften mot trær, bygninger,
          fjell og havbølger. Friksjonen virker i det atmosfæriske grenselaget (opp til ca. 1000
          moh.) og peker alltid motsatt vei av bevegelsesretningen for å bremse farten.
        </li>
      </ol>

      <p>
        I den frie atmosfæren – over 1000 meters høyde der friksjonen er tilnærmet lik null –
        oppstår det en ren balanse mellom trykkgradientkraften og Corioliskraften (F_pg = F_c). Når
        luften avbøyes 90° til høyre, ender vinden med å blåse{" "}
        <strong>nøyaktig parallelt med isobarene</strong>! Dette kalles{" "}
        <strong>geostrofisk vind</strong>.
      </p>

      <OrdBoks
        ord="Geostrofisk vind"
        barn="Teoretisk vind i fri atmosfære der trykkgradientkraften og Corioliskraften er i perfekt likevekt. Vinden blåser parallelt med isobarene."
      />

      <p>
        Hva skjer når vi beveger oss ned mot bakken? Her bremser friksjonen vindhastigheten. Fordi
        vindhastigheten reduseres, blir også <strong>Corioliskraften svakere</strong> (Coriolis er
        avhengig av fart). Trykkgradientkraften påvirkes derimot ikke av friksjon, og dermed
        «vinner» trykkgradientkraften drakampen: Vinden trekkes innover på skrå over isobarene
        (typisk 20–30° vinkel over land, 10–15° over hav).
      </p>
      <p>Dette gir de velkjente sirkulasjonsmønstrene på nordlig halvkule:</p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>Rundt et lavtrykk (L):</strong> Vinden blåser i en spiral{" "}
          <strong>mot klokken</strong> (syklonalt) og inn mot sentrum. Denne innstrømmingen tvinger
          luften oppover og skaper skyer og regn.
        </li>
        <li>
          <strong>Rundt et høytrykk (H):</strong> Vinden blåser i en spiral{" "}
          <strong>med klokken</strong> (antisyklonalt) og ut fra sentrum. Denne utstrømmingen
          trekker luft nedover fra høyden og opprettholder klarværet.
        </li>
      </ul>

      <WindForcesBalanceDiagram />

      {/* 6. PÅLANDSVIND OG FRALANDSVIND */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Lokale kystkretsløp: Solgangsbris (Sjøbris og landbris)
      </h2>
      <p>
        De samme fysiske prinsippene som styrer globale høytrykk og lavtrykk, utspiller seg i
        miniatyr langs norskekysten på varme sommerdager. Dette kalles <strong>solgangsbris</strong>
        , og det drives av at land og hav har fundamentalt ulik evne til å lagre varme:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Ulik spesifikk varmekapasitet:</strong> Vann har en usedvanlig høy spesifikk
          varmekapasitet (c ≈ 4184 J/(kg·K)) sammenlignet med tørt fjell, sand og jord (c ≈ 800
          J/(kg·K)). Det krever over fire ganger så mye solenergi å varme opp ett kilo vann med én
          grad som ett kilo granitt!
        </li>
        <li>
          <strong>Strålingspenetrering og omrøring:</strong> Solstrålene trenger flere meter ned i
          havet, og bølger blander overflatevannet nedover. På land absorberes solenergien
          utelukkende i det øverste millimetertynne jordlaget.
        </li>
      </ul>

      <p>Dette skaper et karakteristisk døgnkretsløp:</p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-display text-base font-semibold text-amber-400">
            ☀️ Dag: Sjøbris (Pålandsvind)
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Midt på dagen blir svabergene og innlandet glovarme (25–30 °C), mens havoverflaten
            holder kjølige 16–18 °C. Luften over land stiger (termisk lavtrykk ved bakken). Kjølig,
            tung luft over havet strømmer innover land som <strong>sjøbris</strong>. På Sørlandet
            merkes dette som en frisk pålandsvind som demper varmen på kystoddene utover
            ettermiddagen.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-display text-base font-semibold text-sky-400">
            🌙 Natt: Landbris (Fralandsvind)
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Om natten opphører solinnstrålingen, og landjorden avkjøles i et forrykende tempo ved
            varmeutstråling. Havet holder nesten uforandret temperatur. Nå blir luften over land
            kaldere og tettere enn over havet. Det oppstår et lokalt høytrykk over land, og en svak{" "}
            <strong>landbris</strong> blåser fra land og ut mot havet. Landbrisen er svakere enn
            sjøbrisen fordi temperaturforskjellen nattetid er mindre (NOAA, u.å.-c).
          </p>
        </div>
      </div>

      <p>
        <strong>Hvorfor må kretsløpet ha en returstrøm i høyden?</strong> Hvis det bare blåste luft
        inn over land om dagen, ville milliarder av kubikkmeter luft hopet seg opp der. Trykket over
        land ville steget til det stoppet vinden fullstendig. For at kretsløpet skal bestå, danner
        den stigende luften et overtrykk i høyden (ca. 1000–1500 m) og strømmer{" "}
        <strong>motsatt vei tilbake ut over havet</strong>, der den synker ned og forsyner sjøbrisen
        med ny luft.
      </p>

      <OrdBoks
        ord="Returstrøm"
        barn="Horisontal luftstrøm i høyden som går motsatt vei av bakkebeltet for å lukke kretsløpet og hindre opphopning av luftmasse."
      />

      <p>
        Utover ettermiddagen sørger Corioliseffekten for at sjøbrisen gradvis dreier mot høyre. På
        Sørlandskysten starter brisen vinkelrett på kysten (sørlig), men dreier mot sørvest og vest
        utover kvelden. Dette kalles solgangsbris fordi vindretningen følger solens vandring på
        himmelen.
      </p>

      <SeaBreezeDiagram />

      {/* 7. FØNVIND */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Fønvind: Orografisk regn og lesidevarme
      </h2>
      <p>
        Fønvind er en varm, tørr og ofte turbulent fallvind på lesiden av en fjellkjede. Det
        meteorologiske paradokset med fønvind er at{" "}
        <strong>
          luften som lander i dalen på lesiden er vesentlig varmere og tørrere enn den var da den
          startet på nøyaktig samme høyde på losiden
        </strong>
        . Fjellet har tilsynelatende varmet opp luften (Store norske leksikon, u.å.-c).
      </p>
      <p>
        Forklaringen skyldes regnet som falt på veien over kammen, og forskjellen på tørradiabatisk
        og fuktadiabatisk temperaturendring:
      </p>
      <ol className="list-decimal space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Trinn 1 (Loside 0 m til 1000 m):</strong> Fuktig atlanterhavsluft med en
          temperatur på +12 °C og 75 % relativ fuktighet treffer kysten av Vestlandet og tvinges
          oppover fjellene (orografisk heving). Luften er umettet og avkjøles tørradiabatisk med{" "}
          <strong>1,0 °C per 100 m (DALR)</strong>. Ved 1000 meters høyde er luften avkjølt med 10
          °C til <strong>+2 °C</strong>.
        </li>
        <li>
          <strong>Trinn 2 (Loside 1000 m til 2500 m):</strong> Ved 1000 m når luften sitt
          kondensasjonsnivå (LCL, 100 % RF). Vanndampen kondenserer og danner orografiske skyer. Det
          bøtter ned med kraftig regn. Kondensasjonen frigjør enorme mengder latent varme, som
          motvirker ekspansjonsavkjølingen. Fra 1000 m til fjelltoppen på 2500 m avkjøles luften
          derfor kun fuktadiabatisk med <strong>ca. 0,6 °C per 100 m (SALR)</strong>.
          Temperaturfallet på denne etappen blir bare 15 × 0,6 = 9 °C, slik at luften passerer
          toppen med en temperatur på <strong>-7 °C</strong>.
        </li>
        <li>
          <strong>Byttehandelen på toppen:</strong> Vanndråpene har falt ut av skyen som regn på
          Vestlandet. Men
          <strong> kondensasjonsvarmen som ble frigjort, forblir værende i luften!</strong>{" "}
          Luftpakken har fått en ren termodynamisk varmegevinst.
        </li>
        <li>
          <strong>Trinn 3 (Leside 2500 m til 0 m):</strong> På lesiden (mot Østlandet) synker luften
          ned i dalbunnen. Når luften synker, varmes den opp. Fordi regnet falt ut på losiden,
          finnes det ingen vanndråper igjen som kan fordampe og stjele varme. Luften varmes derfor
          tørradiabatisk med <strong>1,0 °C per 100 m (DALR) hele veien ned</strong>.
          Temperaturstigningen fra toppen til dalbunnen blir 25 × 1,0 = +25 °C.
        </li>
      </ol>
      <p>
        <strong>Sluttregnskapet:</strong> Luften treffer dalbunnen på lesiden med en temperatur på
        -7 + 25 = +18 °C! Luften er altså <strong>6 °C varmere</strong> enn da den startet ved
        havnivå på losiden (+12 °C). I tillegg har den relative fuktigheten stupt til under 30 %,
        noe som gjør luften knusktørr.
      </p>

      <OrdBoks
        ord="Fønvind"
        barn="Varm og knusktørr fallvind på lesiden av fjell. Skyldes at luften mistet fuktighet som regn på losiden (der latent varme ble frigjort), og varmes tørradiabatisk hele veien ned på lesiden."
      />

      <p>
        <strong>Geofaglige konsekvenser i Norge:</strong>
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Vestavind mot Langfjella:</strong> Vestlandet er losiden og mottar Norges største
          nedbørmengder (Brekke i Gulen har over 3 500 mm i året). Østlandsdalene (Gudbrandsdalen,
          Østerdalen og Ottadalen) ligger i regnskyggen og opplever fønvind og tørke. Skjåk i
          Ottadalen har en årsnedbør på under 300 mm (Store norske leksikon, u.å.-d).
        </li>
        <li>
          <strong>Østavind (omvendt situasjon):</strong> Når et lavtrykk over Nordsjøen sender
          kraftig vind fra øst, blir Østlandet loside med gråvær og snø, mens Vestlandsfjorder (som
          Sunndalsøra og Tafjord) får kraftig fønvind. I januar har Sunndalsøra målt utrolige 19,0
          °C midt på vinteren på grunn av føneffekten!
        </li>
        <li>
          <strong>Farer:</strong> Fønvind smelter snø i ekspresstempo om våren (flomfare), tørker ut
          vegetasjon og skaper akutt skogbrannfare. I tillegg opptrer fønvinden ofte i kraftige,
          uforutsigbare fallvindkast.
        </li>
      </ul>

      <FoehnAdiabaticDiagram />

      {/* 8. KATABATISK VIND */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Katabatisk vind: Kaldluftsdrenasje og dannelse av temperaturinversjon
      </h2>
      <p>
        Både fønvind og katabatisk vind kalles ofte «fallvind» i dagligtale, men fysikken bak dem er
        fundamentalt motsatt. Ordet <em>katabatisk</em> kommer fra det greske ordet{" "}
        <em>katabatikos</em>, som betyr «gående nedover».
      </p>
      <p>
        En katabatisk vind oppstår når et stort snø- eller isdekke (som en platåbre eller et
        innlandsisdekke) utsettes for sterk langbølget strålingsavkjøling under en stjerneklar
        nattehimmel. Snøflaten taper varme til verdensrommet, og luftlaget like over fryses ned til
        ekstreme temperaturer.
      </p>
      <p>
        Når luft blir iskald, trekker den seg kraftig sammen og får{" "}
        <strong>svært høy tetthet</strong>. Denne tunge, kompakte luftmassen oppfører seg omtrent
        som rennende vann: <strong>Tyngdekraften trekker den nedover</strong>
        brearmer, gjel og dalsider mot lavlandet.
      </p>

      <OrdBoks
        ord="Katabatisk vind"
        barn="Kald og tung luft som dreneres nedover skråninger og dalsider av tyngdekraften fra snø- og isflater. Dannes uten orografisk nedbør."
      />

      <p>
        Også katabatisk luft varmes litt adiabatisk når den synker (1,0 °C per 100 m). Men fordi den
        aldri har fått tilført latent varme fra kondensasjon, og fordi den startet med en så
        ekstremt lav temperatur over isen, er den
        <strong> fremdeles iskald når den treffer dalbunnen</strong>.
      </p>
      <p>
        Nede i dalbunnen eller innerst i fjorden samler denne tunge kaldluften seg i et dypt{" "}
        <strong>kaldluftsbasseng (kaldluftssjø)</strong>. Dette skaper en markert{" "}
        <strong>temperaturinversjon</strong>: Det er bitende kaldt nede i dalbunnen (-20 °C), mens
        det kan være adskillig mildere oppe i dalsiden (-4 °C). Røyk, eksos og forurensning fra
        bebyggelsen stenges inne under inversjonslokket.
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          <strong>Folgefonna og Svartisen:</strong> På stille sommerkvelder kan man tydelig merke et
          iskaldt gufs, et såkalt «bresnøft», som raser nedover mot fjorden fra bretungen.
        </li>
        <li>
          <strong>Grønland og Antarktis:</strong> Her er de katabatiske vindene beryktede. Enorme
          masser med -50 °C kald luft raser ned fra innlandsisen mot kysten og kan nå orkan styrke
          (over 70 m/s / 250 km/t).
        </li>
      </ul>

      <KatabaticWindDiagram />

      {/* 9. CALLOUT FOR VANLIGE MISFORSTÅELSER */}
      <Callout title="De 4 vanligste eksamensfellene i Geofag 2">
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>
            <strong>1. Tall på værkartet er relative:</strong> 1013,25 hPa er det globale
            gjennomsnittstrykket, men det er
            <em>ikke</em> en fast grense for høytrykk eller lavtrykk. Et lavtrykk er alltid lavere
            enn naboen, og et høytrykk er alltid høyere enn naboen.
          </li>
          <li>
            <strong>2. Skyene i et høytrykk blåser ikke bort:</strong> Skyene forsvinner fordi
            synkende luft varmes adiabatisk med 1,0 °C per 100 m. Varmere luft har høyere
            metningstrykk, relativ luftfuktighet faller, og skydråpene fordamper til usynlig
            vanndamp.
          </li>
          <li>
            <strong>3. Fønvind er ikke luft fra et varmt sted:</strong> Fønvinden henter ikke varmen
            sin fra Syden. Varmen stammer fra den latente varmen som ble frigjort da vanndamp
            kondenserte til regn på losiden. Fordi vannet falt ut som regn, forblir varmeoverskuddet
            i luften når den synker tørradiabatisk ned på lesiden.
          </li>
          <li>
            <strong>4. Føn bryter inversjoner – katabatisk vind bygger dem:</strong> Føn er varm,
            tørr og turbulent og river opp stillestående kuldelokk i dalbunner. Katabatisk vind er
            en drenasje av tung kaldluft som samles i dalbunner og skaper dype, kalde
            temperaturinversjoner.
          </li>
        </ul>
      </Callout>

      {/* 10. VIKTIGE BEGREPER */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Lufttrykk"
          def="Vekten av luftsøylen over et punkt. Standard havnivåtrykk er 1013,25 hPa."
        />
        <Term
          name="Isobar"
          def="Linje på værkartet som binder sammen steder med samme lufttrykk redusert til havnivå."
        />
        <Term
          name="Trykkgradient"
          def="Trykkforskjellen over en gitt avstand. Tette isobarer gir sterk vind."
        />
        <Term
          name="Konvergens"
          def="Luftstrømmer som samler seg horisontalt. Nær bakken tvinges luften da til å stige."
        />
        <Term
          name="Subsidens"
          def="Storskala, langsom nedsynking av luft i et høytrykk. Fører til adiabatisk oppvarming og skyoppløsning."
        />
        <Term
          name="Corioliskraften"
          def="Fiktiv avbøyningskraft som følge av jordrotasjonen. Avbøyer vind mot høyre på nordlig halvkule."
        />
        <Term
          name="Geostrofisk vind"
          def="Vind i fri atmosfære der trykkgradientkraft og Corioliskraft er i likevekt, parallelt med isobarene."
        />
        <Term
          name="Latent varme"
          def="Varmeenergi frigjort under kondensasjon (~2,5 MJ/kg). Fungerer som drivstoff for oppdrift i skyer."
        />
        <Term
          name="Solgangsbris"
          def="Døgnkretsløp langs kysten drevet av ulik varmekapasitet mellom hav og land, med returstrøm i høyden."
        />
        <Term
          name="Fønvind"
          def="Varm, knusktørr fallvind i le av fjellkjeder etter orografisk nedbør på losiden."
        />
        <Term
          name="Katabatisk vind"
          def="Kald, tung fallvind som renner nedover skråninger fra isbreer og snøplatåer drevet av tyngdekraften."
        />
        <Term
          name="Temperaturinversjon"
          def="Atmosfærisk tilstand der temperaturen stiger med høyden, vanlig i dalbunner under vinterhøytrykk."
        />
      </TermGrid>

      {/* 11. QUIZ */}
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Test deg selv: Høytrykk og lavtrykk
      </h2>
      <Quiz
        questions={[
          {
            prompt: "Hva er den fysiske definisjonen på lufttrykk?",
            options: [
              "Vindhastigheten målt i knop på bakken.",
              "Vekten av all overliggende luft i luftsøylen per arealenhet.",
              "Temperaturen til gassmolekylene i troposfæren.",
              "Friksjonskraften mellom jordoverflaten og luften.",
            ],
            answer: 1,
            explain:
              "Lufttrykk er definert som tyngden (vekten) av den luftsøylen som hviler over et bestemt areal. Ved havnivå er vekten om lag 10 tonn per kvadratmeter, noe som gir et standardtrykk på 1013,25 hPa.",
          },
          {
            prompt:
              "Hvorfor kan en verdi på 1015 hPa være et lavtrykk på ett kart og et høytrykk på et annet?",
            options: [
              "Fordi barometeret måler feil ved høy luftfuktighet.",
              "Fordi høytrykk og lavtrykk er relative begreper bestemt av trykket i de omkringliggende luftmassene.",
              "Fordi 1015 hPa bare gjelder over åpent hav, ikke over land.",
              "Fordi Corioliskraften endrer tallverdiene med årstidene.",
            ],
            answer: 1,
            explain:
              "Det finnes ingen absolutt tallgrense. Et lavtrykk har lavere trykk enn omgivelsene, mens et høytrykk har høyere trykk enn omgivelsene. 1015 hPa er et lavtrykk dersom omgivelsene har 1025 hPa, og et høytrykk dersom omgivelsene har 1005 hPa.",
          },
          {
            prompt: "Hva er den egentlige årsaken til at himmelen blir klar i et høytrykk?",
            options: [
              "Vinden blåser alle skyene bort over horisonten.",
              "Luften synker (subsidens), komprimeres og varmes adiabatisk. Dermed faller relativ fuktighet, og skydråpene fordamper.",
              "Solstrålene brenner bort skydråpene fra oversiden.",
              "Det finnes ingen vanndampmolekyler i et høytrykk.",
            ],
            answer: 1,
            explain:
              "I et høytrykk synker luften langsomt (subsidens). På vei ned øker trykket, og luften varmes tørradiabatisk med 1,0 °C per 100 m. Varm luft har høyere metningstrykk, relativ luftfuktighet faller drastisk, og skydråpene fordamper til usynlig vanndamp.",
          },
          {
            prompt:
              "Hvorfor blåser bakkevinden på skrå over isobarene (inn i lavtrykk og ut av høytrykk) i stedet for parallelt med dem?",
            options: [
              "Fordi bakkenivået mangler tyngdekraft.",
              "Fordi bakkefriksjon bremser farten, noe som svekker Corioliskraften slik at trykkgradientkraften trekker luften på skrå mot lavere trykk.",
              "Fordi luftmolekylene kolliderer med vanndråper i skyene.",
              "Fordi solen bare varmer opp den ene siden av isobarene.",
            ],
            answer: 1,
            explain:
              "I fri atmosfære balanserer Corioliskraften og trykkgradientkraften hverandre, og vinden blåser parallelt med isobarene (geostrofisk vind). Nær bakken bremser friksjonen vindhastigheten. Dette svekker Corioliskraften, slik at trykkgradientkraften dominerer og trekker vinden på skrå inn mot lavtrykk og ut av høytrykk.",
          },
          {
            prompt:
              "Hvorfor kommer luften ned på lesiden under fønvind mye varmere enn den var på samme høyde på losiden?",
            options: [
              "Fordi solen skinner mye sterkere på lesiden av fjellet.",
              "Fordi vannet forlot luften som orografisk regn på losiden, mens den frigjorte latente varmen ble værende i luften og beholdes under tørradiabatisk nedsynking.",
              "Fordi fjellet avgir geotermisk varme fra jordens indre til luften.",
              "Fordi friksjonen mot fjellets leside skaper varme.",
            ],
            answer: 1,
            explain:
              "På losiden kondenserte vanndamp til regn og frigjorde latent varme, slik at luften bare avkjølte seg fuktadiabatisk (0,6 °C/100 m). På lesiden synker den tørre luften og varmes tørradiabatisk (1,0 °C/100 m) hele veien ned. Regnet tok vannet, men varmen ble igjen!",
          },
          {
            prompt:
              "Hva er den fundamentale forskjellen mellom fønvind og katabatisk vind i pensum for Geofag 2?",
            options: [
              "Fønvind forekommer bare om sommeren, mens katabatisk vind bare forekommer om vinteren.",
              "Fønvind er varm og tørr (skyldes orografisk nedbør og latent varme), mens katabatisk vind er kald og tung (skyldes overflatekjøling over snø/is og tyngdekraftsdrenasje).",
              "Katabatisk vind er en havstrøm, mens fønvind er en luftstrøm.",
              "Begge er varme fallvinder, men katabatisk vind har høyere fuktighet.",
            ],
            answer: 1,
            explain:
              "Fønvind er varm og tørr og bryter opp temperaturinversjoner. Katabatisk vind oppstår når ekstremt nedkjølt, tung luft over breer eller snøplatåer trekkes nedover skråninger av tyngdekraften, og danner dype temperaturinversjoner i dalbunnene.",
          },
        ]}
      />
    </TopicLayout>
  );
}
