import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { GeminiFigure } from "@/components/gemini-figure";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { GEMINI } from "@/lib/gemini-slots";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/nao")({
  head: () =>
    topicHead({
      title: "NAO: Den nordatlantiske oscillasjon · Geofag 2",
      description:
        "Den nordatlantiske oscillasjon (NAO): trykkforskjell mellom Azorene og Island, polarvirvel, Rossby-bølger, ENSO og konsekvenser for vinterværet i Europa og Norge.",
      path: "/tema/klima/nao",
    }),
  component: NaoPage,
});

function NaoPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Nord-Atlanteren"
      title="NAO: Den nordatlantiske oscillasjon"
      lead="Den nordatlantiske oscillasjon er svingningen i trykkforskjellen mellom det subtropiske høytrykket ved Azorene og lavtrykket over Island. Den styrer vestavinden, stormbanene og om den norske vinteren blir mild og våt — eller kald og tørr."
      banner="/images/fig-nao-faser.svg"
      bannerAlt="To jordkloder: negativ NAO til venstre med svak gradient, positiv NAO til høyre med sterk gradient og vestavind inn mot Europa"
      prev={{ to: "/tema/klima/iod", label: "Forrige: IOD" }}
      next={{ to: "/tema/klima/amoc", label: "Neste: AMOC" }}
      kilder={KILDER.nao}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">Hva NAO er</h2>
      <p>
        <strong>Den nordatlantiske oscillasjon (NAO)</strong> er et klima- og værfenomen på den
        nordlige halvkule. Den påvirker værmønstrene over Atlanterhavet, Europa og deler av
        Nord-Amerika.
      </p>
      <p>
        NAO beskriver svingninger i trykkforskjellen mellom to semi-permanente systemer: det
        subtropiske høytrykket ved Azorene (Azorhøytrykket) og lavtrykket over Island
        (Islandslavtrykket). Variasjonene styrer vind, stormbaner, temperatur og nedbør i regionen
        (Hurrell et al., 2003; Meteorologisk institutt, u.å.).
      </p>
      <p>
        Fasene kalles positiv og negativ, etter om trykkforskjellen Azorene–Island er stor eller
        liten. Figur 1 viser begge på en gang: venstre kule er negativ fase, høyre er positiv.
      </p>

      <PhotoFigure
        src="/images/fig-nao-faser.svg"
        alt="To jordkloder over Atlanteren. Venstre: negativ NAO med svakt L og H. Høyre: positiv NAO med dypt L, sterkt H og vestavind mot Europa."
        heading="Figur 1. Positiv og negativ NAO"
        caption="Venstre: negativ fase — svakere Islandslavtrykk og Azorhøytrykk, slak gradient. Høyre: positiv fase — dypere L, sterkere H og en tydelig vestavind inn mot Nord-Europa. Rødt og blått viser typiske temperaturavvik."
        fit="contain"
        points={[
          { n: "1", label: "Venstre kule: negativ NAO. Liten trykkforskjell, svak vestavind." },
          { n: "2", label: "Høyre kule: positiv NAO. Stor trykkforskjell, sterk vestavind." },
        ]}
      />

      <OrdBoks
        ord="NAO (North Atlantic Oscillation)"
        barn="Svingning i lufttrykksforskjellen mellom Azorhøytrykket og Islandslavtrykket. Stor forskjell: sterk jet og stormbane langt nord. Liten forskjell: svak, bølget jet og mer blocking."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hvorfor trykket endrer seg mellom Azorene og Island
      </h2>
      <p>
        Azorhøytrykket og Islandslavtrykket er semi-permanente. De kommer av den globale
        sirkulasjonen og de lokale forholdene i Nord-Atlanteren. For å forstå dem må du kjenne{" "}
        <Link to="/tema/vindsystemet" className="text-primary underline-offset-2 hover:underline">
          det globale vindsystemet
        </Link>
        .
      </p>
      <PhotoFigure
        src="/images/fig-nao-omrade.svg"
        alt="Kart over Nord-Atlanteren med Island, Norge, Azorene-området sørvest for Portugal, og østkysten av Nord-Amerika"
        heading="Figur 2. Geografisk område der NAO oppstår"
        caption="NAO sitter mellom Island i nord og Azorene/subtropene i sør. Norge ligger i utløpet av vestavindsbeltet, derfor merkes fasene så tydelig her."
        fit="contain"
      />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        Azorhøytrykket
      </h3>
      <p>
        Dette høytrykket er en del av det subtropiske høytrykksbeltet. Det dannes av synkende luft i
        Hadley-cellen. Luften har mistet fukt etter å ha steget ved ekvator. Resultatet er høytrykk
        og stabilt vær.
      </p>
      <p>
        Styrken varierer med havtemperatur i subtropene og hvor mye varme som går fra hav til
        atmosfære. Høytrykket er mest markant om sommeren, men det finnes hele året.
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        Islandslavtrykket
      </h3>
      <p>
        Lavtrykket oppstår ved polarfronten, der kald polarluft møter varm tropeluft fra Atlanteren.
        Temperaturkontrasten driver sterke vinder og sykloner.
      </p>
      <p>
        Lavtrykket blir kraftigere om vinteren, når kontrasten mellom Arktis og subtropene er størst.
        Derfor er NAO sterkest — og mest avgjørende for Norge — om vinteren.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hva som endrer trykkforskjellen
      </h2>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        Temperaturgradienten pol–subtropene
      </h3>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Når temperaturforskjellen mellom Arktis og subtropene øker, blir polarfronten kraftigere,
          og lavtrykket ved Island intensiveres.
        </li>
        <li>
          Når forskjellen minker (for eksempel ved oppvarming i Arktis), svekkes polarfronten og
          lavtrykket.
        </li>
      </ul>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        Havoverflatetemperatur (SST)
      </h3>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          SST i Nord-Atlanteren styrer hvor mye varme og fukt som tilføres atmosfæren. Varmt vann
          kan forsterke Islandslavtrykket ved å gi systemet mer energi.
        </li>
        <li>
          Endringer i{" "}
          <Link to="/tema/havstrommer" className="text-primary underline-offset-2 hover:underline">
            Golfstrømmen og Den nordatlantiske strømmen
          </Link>{" "}
          flytter varmen i havet og dermed trykksystemene.
        </li>
      </ul>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        Polarvirvelen
      </h3>
      <p>
        Polarvirvelen er et sterkt lavtrykk — en syklon — som ligger over Arktis om vinteren (det
        finnes en tilsvarende over Antarktis, men det er den arktiske som hører til NAO). Kald luft
        holdes samlet av rask vestlig sirkulasjon.
      </p>
      <p>
        Stor temperaturforskjell mellom Arktis og områdene sørfor gir en stabil, nesten sirkulær
        virvel. Mindre forskjell — varmere Arktis — gir forstyrrelser. Den sirkulære formen brytes
        opp og blir mer bølget.
      </p>
      <p>
        Forstyrrelser i polarvirvelen i stratosfæren kan forplante seg nedover og enten styrke eller
        svekke Islandslavtrykket. En svak polarvirvel (ofte negativ fase av den arktiske
        oscillasjonen, AO) henger sammen med svakere lavtrykk ved Island.
      </p>
      <PhotoFigure
        src="/images/fig-nao-polarvirvel.svg"
        alt="To-panel: stabil polarvirvel med rett jet langt nord, og forstyrret polarvirvel med bølget jet og kald luft sørover"
        heading="Figur 3. Polarvirvel og polar jet under stabile og ustabile forhold"
        caption="Venstre: stabil virvel, kald luft holdt nord, sterk vest–øst-strøm. Høyre: forstyrret virvel, kald luft sørover, varm luft nordover, bølget jet lenger sør. NOAA Climate.gov (2021)."
        fit="contain"
        points={[
          { n: "1", label: "Stabil virvel: rett jet, kulda blir i Arktis, oftere positiv NAO." },
          { n: "2", label: "Ustabil virvel: bølget jet, kuldeutbrudd sør, oftere negativ NAO." },
        ]}
      />
      <p>
        Når polarvirvelen er sterk og intakt, er NAO nesten alltid positiv. Hvis virvelen sprekker
        (en plutselig stratosfærisk oppvarming, SSW), kan NAO falle inn i en dyp negativ fase. Kulda
        i Norge kommer gjerne 2–4 uker etterpå.
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        Eksterne klimapåvirkninger — ENSO
      </h3>
      <p>
        Fenomener som{" "}
        <Link to="/tema/klima/enso" className="text-primary underline-offset-2 hover:underline">
          ENSO
        </Link>{" "}
        kan påvirke NAO via atmosfæriske bølger. El Niño kan svekke subtropiske høytrykk. La Niña
        kjøler tropisk Stillehav, forskyver jetene der, og sender Rossby-bølger videre mot
        Nord-Atlanteren.
      </p>
      <p>
        Under La Niña-vintre er det oftere større sjanse for positiv NAO, med sterk og rett polar
        jet. La Niña kan styrke temperaturgradienten mellom Arktis og subtropene og dermed
        vestavinden.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>El Niño:</strong> varmere tropisk Stillehav, mer energioverføring til atmosfæren.
          Kan forstyrre polarvirvelen ved å forsterke Rossby-bølger.
        </li>
        <li>
          <strong>La Niña:</strong> kaldere tropisk Stillehav, færre forstyrrelser, oftere mer
          stabil polarvirvel.
        </li>
      </ul>
      <GeminiFigure {...GEMINI.naoEnsoTele} />

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        Rossby-bølger
      </h3>
      <p>
        Rossby-bølger er planetære bølger som dannes fordi jordrotasjonen (Coriolis) påvirker luft-
        og vannmasser. De er langsomme og særlig viktige på midlere breddegrader. Se også{" "}
        <Link to="/tema/jetstrommer" className="text-primary underline-offset-2 hover:underline">
          jetstrømmer
        </Link>{" "}
        og{" "}
        <Link to="/tema/coriolis" className="text-primary underline-offset-2 hover:underline">
          Coriolis
        </Link>
        .
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>De beveger seg i vest–øst-retning, men svinger også nord og sør.</li>
        <li>Rygger og daler tilsvarer høytrykk og lavtrykk.</li>
        <li>De er de langsomme meanderne i jetstrømmene.</li>
        <li>
          Sterke Rossby-bølger: jetene blir veldig bølgete. Svake Rossby-bølger: jetene ligger
          rettere.
        </li>
      </ul>
      <p>
        Når Rossby-bølgene i troposfæren er svake, forstyrres ikke polarvirvelen. Den forblir stabil
        og sterk. Når bølgene forsterkes, kan de sende energi oppover, deformere eller splitte
        virvelen.
      </p>
      <GeminiFigure {...GEMINI.naoRossby} />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Positiv NAO: sterkere jet og nordlig bane
      </h2>
      <p>
        I positiv fase er trykkforskjellen mellom Azorhøytrykket og Islandslavtrykket stor. Begge
        systemene forsterkes.
      </p>
      <PhotoFigure
        src="/images/fig-nao-positiv.svg"
        alt="Kart over positiv NAO: dypt L ved Island, sterkt H ved Azorene, rett jet, mildt og vått i Nord-Europa, kaldt og tørt i Sør-Europa"
        heading="Figur 4. Positiv NAO"
        caption="Sterkt L, sterkt H, varmere hav midt i Nord-Atlanteren. Jetstrømmen går rett og langt nord. Nord-Europa: mildt og vått. Middelhavet: kaldt og tørt. Figuren merker også positiv AO — de to indeksene følger ofte hverandre."
        fit="contain"
        points={[
          { n: "1", label: "Dypt Islandslavtrykk og sterkt Azorhøytrykk = stor gradient." },
          { n: "2", label: "Rett, nordlig jet. Stormbanen peker mot Nordvest-Europa og Norge." },
          { n: "3", label: "Mildt og vått i Nord-Europa. Kaldt og tørt i Sør-Europa." },
        ]}
      />
      <ul className="list-disc space-y-2 pl-6">
        <li>Trykkforskjellen skaper kraftige vinder over Nord-Atlanteren.</li>
        <li>Mildere og våtere vintre i Nord-Europa.</li>
        <li>Tørrere og kaldere vintre i Sør-Europa og Middelhavet.</li>
        <li>Stormbaner lenger nord. Nord-Atlanteren får mer vind og storm.</li>
      </ul>
      <p>
        Jetstrømmen tar med seg varm, fuktig atlanterluft mot Nord-Europa. Sør for jeten ligger
        kjøligere hav og det sterke Azorhøytrykket, som blokkerer lavtrykk. Middelhavet kan i tillegg
        få kald luft fra Øst-Europa eller Arktis.
      </p>
      <p>
        Den sterke temperaturgradienten forsterker jeten. Den blir mer stabil og går rett vest–øst,
        trukket nordover av det dype Islandslavtrykket. Lavtrykkene føres raskt mot Nord-Europa.
      </p>
      <p>
        For Norge: milde, vindfulle og nedbørrike vintre. På kysten ofte regn, i fjellet store
        snømengder. Under den sterke positive perioden på 1990-tallet vokste vestlandsbreer som
        Nigardsbreen på grunn av ekstrem vinterakkumulasjon.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Negativ NAO: svakere jet og sørlig bane
      </h2>
      <p>I negativ fase svekkes både Azorhøytrykket og Islandslavtrykket.</p>
      <PhotoFigure
        src="/images/fig-nao-negativ.svg"
        alt="Kart over negativ NAO: svakt L og H, bølget jet, kaldt og tørt i Nord-Europa, mildt og vått i Sør-Europa"
        heading="Figur 5. Negativ NAO"
        caption="Svakt L, svakt H. Varmere vann lenger nord. Jetstrømmen meandrerer. Nord-Europa: kaldt og tørt. Sør-Europa: mildt og vått. Speilbildet av figur 4."
        fit="contain"
        points={[
          { n: "1", label: "Liten trykkgradient. Vestavinden slakker." },
          { n: "2", label: "Bølget jet. Store Rossby-bølger. Stormbanen går sør." },
          { n: "3", label: "Kald polarluft inn over Nord-Europa. Regn til Middelhavet." },
        ]}
      />
      <p>
        Under negativ NAO er temperaturforskjellen mellom subtropene og Arktis mindre. Jetstrømmen
        drives av den kontrasten. Når kontrasten svekkes, svekkes jeten.
      </p>
      <p>En svingete jet oppstår når gradienten er svak. Det gir:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Lavere trykkgradient mellom Azorene og Island.</li>
        <li>Svakere vestavinder og mer ustabil jet.</li>
        <li>Store Rossby-bølger og svinger i jetstrømmen.</li>
      </ul>
      <p>
        Årsaker til svak gradient: oppvarming i Arktis, svekket polarfront, mindre kontrast mellom
        luftmassene. Når jeten svekkes, blir den mer utsatt for forstyrrelser. Luftmassene begynner
        å bølge, som en langsom elv. Hindere som fjellkjeder og temperaturkontraster kan forsterke
        bølgene.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Nord-Europa:</strong> Når jeten bøyer seg sørover, kan kald polarluft strømme inn.
          Kaldere og tørrere vintre. Ofte blokkerende høytrykk over Skandinavia. Vintrene 2009/2010
          og januar 2024 er typiske eksempler.
        </li>
        <li>
          <strong>Sør-Europa:</strong> Jeten trekker sørover og tar lavtrykkene med seg. Våte og
          milde vintre.
        </li>
      </ul>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Hvorfor NAO varierer</h2>
      <p>
        NAO drives i stor grad av intern variasjon. Den er kaotisk og vanskelig å predikere på kort
        sikt. Små forstyrrelser i atmosfære eller hav kan forplante seg og gi store utslag.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>NAO er sterkest om vinteren, når kontrasten tropeluft–polarluft er størst.</li>
        <li>
          Tilbakekoblinger kan forsterke eller svekke svingningen: havtemperatur endrer atmosfæren,
          som igjen endrer havet. ENSO kan inngå i slike forsterkninger.
        </li>
      </ul>
      <p>
        Meteorologer følger{" "}
        <strong>NAO-indeksen</strong>: normalisert lufttrykk i sør (Ponta Delgada eller Lisboa) minus
        lufttrykk i nord (Reykjavík eller Stykkishólmur) (Walker & Bliss, 1932).
      </p>
      <GeminiFigure {...GEMINI.naoIndeks} />

      <Callout title="Til eksamen">
        <p>
          <strong>NAO+ =</strong> dyp Island-L + sterk Azor-H → stor gradient → sterk, rett jet
          langt nord → mild og våt vinter i Norge, tørrere i Middelhavet.
        </p>
        <p>
          <strong>NAO− =</strong> svak Island-L + svak Azor-H → liten gradient → svak, bølget jet →
          blocking og kald, tørr vinter i Norge, vått i Middelhavet.
        </p>
        <p>
          Polarvirvelen som hører til NAO ligger over <em>Arktis</em>, ikke Antarktis. SSW kan
          velte NAO over i negativ fase et par uker senere.
        </p>
      </Callout>
      <Callout title="Vanlige misforståelser">
        <p>
          Positiv NAO betyr ikke varmere vær over hele Europa. Nord blir mildt og vått. Sør blir
          oftere tørt og kjøligere enn normalt.
        </p>
        <p>
          NAO er ikke det samme som Golfstrømmen eller AMOC. NAO er atmosfærens trykkvippe.
          Havstrømmene kan påvirke den, og omvendt, men de er ulike systemer.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="NAO-indeks" def="Normalisert trykkforskjell mellom Azorene og Island." />
        <Term name="NAO+" def="Stor gradient. Sterk vestavind. Mild og våt vinter i Norge." />
        <Term name="NAO−" def="Liten gradient. Svak vestavind. Kald og tørr vinter i Norge." />
        <Term name="Stormbane" def="Hovedsporet lavtrykkene følger over Atlanteren." />
        <Term
          name="Polarvirvel"
          def="Sirkumpolar vinterlavtrykk over Arktis (og et tilsvarende over Antarktis)."
        />
        <Term
          name="Rossby-bølge"
          def="Planetær bølge i jetstrømmen. Sterk bølge = meandrerende jet."
        />
        <Term
          name="Blokkerende høytrykk"
          def="Stasjonært høytrykk som tvinger jet og lavtrykk utenom."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hvilket vintervær er typisk i Norge når NAO-indeksen er sterkt positiv?",
            options: [
              "Milde temperaturer, kraftig vestavind og mye nedbør.",
              "Knusktørt, vindstille og streng kulde fra øst.",
              "Tropiske hetebølger.",
              "Vindstille og tett tåke over hele landet.",
            ],
            answer: 0,
            explain:
              "Stor trykkgradient driver vestavind med mild, fuktig atlanterluft rett inn over Norge.",
          },
          {
            prompt: "Hva kjennetegner trykkforholdene under negativ NAO?",
            options: [
              "Både Islandslavtrykket og Azorhøytrykket er svakere enn normalt.",
              "Trykket over Island er det laveste som er målt.",
              "Lufttrykket forsvinner fra atmosfæren.",
              "Azorhøytrykket flytter seg til Sydpolen.",
            ],
            answer: 0,
            explain: "Begge de semi-permanente sentrene svekkes. Gradient og vestavind slakker.",
          },
          {
            prompt: "Hvilken polarvirvel hører til NAO?",
            options: [
              "Den arktiske. Forstyrrelser der kan svekke Islandslavtrykket.",
              "Den antarktiske. Den styrer Azorhøytrykket direkte.",
              "Ingen. Polarvirvel og NAO er uten sammenheng.",
              "Bare virvelen i troposfæren over Sahara.",
            ],
            answer: 0,
            explain:
              "NAO sitter i Nord-Atlanteren. Det er den arktiske virvelen — og AO — som koples til Islandslavtrykket.",
          },
        ]}
      />
    </TopicLayout>
  );
}
