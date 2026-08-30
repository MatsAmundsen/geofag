import { createFileRoute, Link } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { PhotoFigure } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/nao")({
  head: () =>
    topicHead({
      title: "NAO: Den nordatlantiske oscillasjon · Geofag 2",
      description:
        "Den nordatlantiske oscillasjon (NAO): Trykkforskjell mellom Asorene og Island, positiv og negativ fase, vestavindsbeltet og konsekvenser for Norges vintervær.",
      path: "/tema/klima/nao",
    }),
  component: NaoPage,
});

function NaoPage() {
  return (
    <TopicLayout
      kicker="Klimasystemet · Nord-Atlanteren"
      title="NAO: Den nordatlantiske oscillasjon"
      lead="Hvorfor kan én norsk vinter by på mildt vestlandsregn og rekordmye snø i fjellet, mens den neste er beinkald og knusktørr? Svaret ligger i trykkgradienten over Nord-Atlanteren: Den nordatlantiske oscillasjon."
      banner="/images/fig-nao.jpg"
      bannerAlt="Satellittoversikt over Nord-Atlanteren med lavtrykk som roterer inn mot Skandinavia"
      prev={{ to: "/tema/klima/iod", label: "Forrige: IOD" }}
      next={{ to: "/tema/klima/amoc", label: "Neste: AMOC" }}
      kilder={KILDER.nao}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Hva er NAO?
      </h2>
      <p>
        <strong>Den nordatlantiske oscillasjon (NAO)</strong> er det dominerende moduset for
        atmosfærisk variasjon over Nord-Atlanteren (Hurrell et al., 2003).
      </p>
      <p>
        NAO beskriver den storskala svingningen i lufttrykkforskjellen mellom to faste trykksystemer:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Det islandske lavtrykket:</strong> Det subpolare lavtrykksområdet rundt Island og
          Norskehavet.
        </li>
        <li>
          <strong>Det asoriske høytrykket:</strong> Det subtropiske høytrykksområdet rundt Asorene og
          Bermuda.
        </li>
      </ul>
      <p>
        Trykkforskjellen mellom disse to systemene fungerer som «motoren» som pumper vestavinden og
        atlantiske lavtrykk inn over Europa (Meteorologisk institutt, u.å.).
      </p>

      <OrdBoks
        ord="NAO (North Atlantic Oscillation)"
        barn="Svingning i lufttrykksforskjellen mellom lavtrykket ved Island og høytrykket ved Asorene. Styrer styrken og banen til vestavinden og stormene inn mot Europa og Norge."
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        De to fasene: NAO+ og NAO-
      </h2>
      <p>
        NAO svinger uregelmessig fra uke til uke, måned til måned og vinter til vinter. Det er særlig om
        <strong> vinteren</strong> at effekten på det norske været er dramatisk.
      </p>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        Positiv fase (NAO+) — Den atlantiske ekspressen
      </h3>
      <p>
        I en positiv fase er <strong>både Island-lavtrykket dypere enn normalt og Asor-høytrykket sterkere
        enn normalt</strong>. Dette gir en svært <em>stor trykkgradient</em> over Nord-Atlanteren.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Vind og stormbane:</strong> Den sterke trykkgradienten akselererer vestavindsbeltet og
          polarfrontjetstrømmen. Stormbanen rettes rett inn mot Nordvest-Europa og Norge.
        </li>
        <li>
          <strong>Været i Norge:</strong> Milde atlantiske luftmasser skyves inn over landet. Vintrene blir
          uvanlig <em>milde, vindfulle og nedbørsrike</em>. På kysten og i lavlandet kommer nedbøren som
          regn, mens fjellet på Vestlandet og i Nord-Norge kan få enorme mengder snø. (Under den sterke
          positive NAO-perioden på 1990-tallet opplevde vestlandsbreene som Nigardsbreen rekordvekst pga.
          ekstreme vinterakkumulasjoner).
        </li>
        <li>
          <strong>Været i Middelhavet:</strong> Det sterke Asor-høytrykket strekker seg inn over Sør-Europa
          og gir tørt og stabilt vær der.
        </li>
      </ul>

      <h3 className="pt-3 font-display text-xl font-medium tracking-tight text-primary">
        Negativ fase (NAO-) — Den kalde blokkeringen
      </h3>
      <p>
        I en negativ fase er <strong>både Island-lavtrykket og Asor-høytrykket svakere enn normalt</strong>,
        noe som gir en <em>liten trykkgradient</em>.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Vind og stormbane:</strong> Vestavinden svekkes kraftig og blir mer buktende (meandrerende).
          Stormbanen forskyves sørover mot Middelhavet og Sør-Europa.
        </li>
        <li>
          <strong>Været i Norge:</strong> Når vestavinden stopper opp, etablerer det seg ofte stabile,
          blokkerende høytrykk over Skandinavia og Russland. Iskald, tørr kontinentalluft trekkes inn fra
          øst. Vintrene blir <em>svært kalde, tørre og stille</em> (slik som de beryktede kalde vintrene i
          2009/2010 og januar 2024).
        </li>
        <li>
          <strong>Været i Middelhavet:</strong> Sør-Europa og Nord-Afrika får lavtrykkene og opplever en våt
          og stormfull vinter.
        </li>
      </ul>

      <PhotoFigure
        src="/images/fig-nao.jpg"
        alt="Kartskisse over NAO-faser med lavtrykk over Island og høytrykk over Asorene"
        heading="NAO-faser og stormbaner over Atlanterhavet"
        caption="Positiv NAO (venstre): Stor trykkgradient sender milde og våte stormer rett mot Norge. Negativ NAO (høyre): Svak gradient tillater kuldeblokkeringer over Skandinavia mens regnet går til Middelhavet."
        marks={[
          { x: 15, y: 22, n: "1", text: "Islands-lavtrykk", tone: "cold" },
          { x: 20, y: 70, n: "2", text: "Asor-høytrykk", tone: "warm" },
          { x: 75, y: 30, n: "3", text: "Norge & Skandinavia", tone: "teal" },
        ]}
        points={[
          { n: "1", label: "Stort lavtrykk forsterker rotasjon og innsug av polar og maritim luft." },
          { n: "2", label: "Subtropisk høytrykk blokkerer sørlige stormer under NAO+." },
          { n: "3", label: "Norge får mildvær under NAO+, sprengkulde under NAO-." },
        ]}
      />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        NAO-indeksen og kobling til polarvirvelen
      </h2>
      <p>
        Meteorologer overvåker NAO ved hjelp av <strong>NAO-indeksen</strong>, som beregnes ved å
        sammenligne normalisert lufttrykk målt ved stasjoner i sør (f.eks. Ponta Delgada eller Lisboa)
        mot stasjoner i nord (Reykjavik eller Stykkisholmur på Island) (Walker & Bliss, 1932).
      </p>
      <p>
        NAO henger også tett sammen med <strong>Den arktiske oscillasjon (AO)</strong> og tilstanden til
        <strong> polarvirvelen</strong> i stratosfæren. Når polarvirvelen er sterk og intakt om vinteren,
        er NAO nesten alltid positiv. Hvis polarvirvelen forstyrres og sprekker opp (en plutselig stratosfærisk
        oppvarming, SSW), kollapser NAO ofte inn i en dyp negativ fase, noe som kan gi uker med intens kulde i
        Norge 2–4 uker etterpå.
      </p>

      <Callout title="Til eksamen">
        <p>
          En typisk eksamensoppgave ber deg forklare hvorfor en vinter i Norge ble rekordmild eller
          rekordkald. Nøkkelen er:
          <br />
          <strong>NAO+ = dyp Island-L + sterk Asor-H → sterk vestavind → mild og våt vinter i Norge.</strong>
          <br />
          <strong>NAO- = svak Island-L + svak Asor-H → svak vestavind → blokkerende høytrykk og kald vinter i Norge.</strong>
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          En vanlig misforståelse er å tro at «positiv NAO» betyr at det er varmere overalt i Europa.
          Under NAO+ er det mildt i Nord-Europa og Skandinavia, men tørrere og ofte kjøligere enn normalt i
          Middelhavsområdet.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="NAO-indeks" def="Tallverdi for differansen i lufttrykk mellom Asorene og Island." />
        <Term name="NAO+ (positiv)" def="Stor trykkforskjell; sterk vestavind, mild og våt vinter i Norge." />
        <Term name="NAO- (negativ)" def="Liten trykkforskjell; svak vestavind, kald og tørr vinter i Norge." />
        <Term name="Stormbane" def="Hovedsporet som lavtrykkene følger på tvers av Atlanterhavet." />
        <Term name="Blokkerende høytrykk" def="Stasjonært høytrykk som tvinger lavtrykk og jetstrøm utenom et område." />
        <Term name="Polarvirvel (Polar vortex)" def="Storskala sirkumpolar virvel over polområdet om vinteren." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hvilket vintervær opplever Norge typisk når NAO-indeksen er sterkt positiv (NAO+)?",
            options: [
              "Milde temperaturer, kraftig vestavind og store nedbørsmengder.",
              "Knusktørt, vindstille og ekstrem streng kulde fra Sibir.",
              "Tropiske hetebølger og ørkenstøv.",
              "Konstant vindstille og tett tåke over hele landet.",
            ],
            answer: 0,
            explain:
              "En sterk trykkgradient (NAO+) driver en kraftig vestavind med milde, fuktige atlantiske luftmasser rett inn over Norge.",
          },
          {
            prompt: "Hva kjennetegner trykkforholdene under en negativ NAO-fase (NAO-)?",
            options: [
              "Både Islands-lavtrykket og Asor-høytrykket er svakere enn normalt, slik at trykkgradienten blir liten.",
              "Trykket over Island er det laveste som noensinne er målt.",
              "Lufttrykket forsvinner helt fra atmosfæren.",
              "Asor-høytrykket flytter seg til Sydpolen.",
            ],
            answer: 0,
            explain:
              "Under NAO- svekkes begge de semi-permanente trykksentrene, noe som gir en svak trykkgradient og svekket vestavind.",
          },
        ]}
      />
    </TopicLayout>
  );
}
