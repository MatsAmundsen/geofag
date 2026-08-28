import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { ModelGridDiagram } from "@/components/diagrams/models";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";

export const Route = createFileRoute("/tema/numeriske-modeller")({
  component: NumeriskeModellerPage,
});

function NumeriskeModellerPage() {
  return (
    <TopicLayout
      kicker="Geofag 2 · Modeller"
      title="Numeriske modeller"
      lead="En numerisk modell i geofag er ikke et værkart på en datamaskin. Den er fysikk regnet på et rutenett. Bevegelse, masse, energi og fuktighet løses i celler, steg for steg. Cellene har en størrelse. Prosessene inne i cellen må forenkles. Starttilstanden er aldri perfekt kjent. Likevel gir modellene nyttig informasjon, til ulike formål på ulike tidsskalaer."
      banner="/images/banner-klima.jpg"
      bannerAlt="Polar is og mørkt hav som står for jordsystemet modellene beskriver"
      videoTopic="numeriske modeller"
      prev={{ to: "/tema/klima", label: "Forrige: Klima" }}
      next={{ to: "/tema/paleoklima", label: "Neste: Paleoklima" }}
    >
      <ModelGridDiagram />

      <h2 className="font-display text-2xl font-medium tracking-tight">Tre bruk</h2>
      <p>
        Værvarsling er et initialverdiproblem. Tidsskalaen er timer til om lag to uker. Små feil i
        starttilstanden vokser raskt. Det kalles kaos. Derfor investerer varslingssentre mer i
        observasjoner og assimilering enn i å bare kjøre modellen lenger.
      </p>
      <p>
        Havmodellering styres sterkt av randen fra atmosfæren, og av tetthet: temperatur og
        saltholdighet. Tidsskalaen er timer til uker, men også sesong og klima. Vann er tregere enn
        luft. Et feilaktig blandelag kan sitte i uker.
      </p>
      <p>
        Klimaforskning er et randverdiproblem. Tidsskalaen er tiår til århundrer. Pådriv styrer:
        drivhusgasser, aerosoler, sol, vulkaner. Prediksjonen er statistikken: middel, varians,
        ekstremfordelinger. Ikke været 12. juni 2087. Vi kan si noe robust om klimaet i 2080 uten å
        varsle været den 3. mars 2080.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Grid og parametrisering
      </h2>
      <p>
        Atmosfæren og havet deles i et tredimensjonalt rutenett. Avstanden mellom punktene er
        oppløsningen. En prosess som er mindre enn et par gridceller, kan ikke løses eksplisitt. Den
        må parametriseres: en forenklet beskrivelse av det som er for lite eller for komplekst, som
        funksjon av det modellen faktisk løser. Skyer, konveksjon, turbulens og stråling i skyer er
        slike ledd.
      </p>
      <OrdBoks
        ord="grid"
        barn="avstand mellom beregningspunktene; finere gir mer detalj, koster mer regnekraft"
      />
      <OrdBoks
        ord="parametrisering"
        barn="forenklet beskrivelse av prosesser som er for små eller for komplekse til å løses eksplisitt"
      />
      <p>
        Operasjonell oppløsning i dag: ECMWF ca. 9 km. MEPS og AROME-Arctic 2,5 km. Norkyst 800 m.
        Finere rutenett løser ikke alt. Det gir bedre topografi, kystlinje og konveksjon, men krever
        bedre initialdata, bedre fysikk og langt mer regnekraft. En halvering av gridavstand gir
        omtrent åtte ganger mer regning i 3D, pluss kortere tidssteg.
      </p>
      <p>
        Når oppløsningen blir fin nok til at dyp konveksjon løses eksplisitt, som i MEPS, skrus den
        konvektive parametriseringen av eller kraftig ned. Bedre grid gir annen fysikk, nye
        feilkilder og ny validering.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Dataassimilering og ensemble
      </h2>
      <p>
        Observasjoner er ujevnt fordelt. De har ulike feil, og kommer fra satellitt, radar, fly,
        skip, bøyer, radiosonder og bakkestasjoner. Dataassimilering blander observasjonene inn i
        modellen, vektet etter hvor mye vi stoler på hver av dem. Uten assimilering ville et
        værvarsel glemme virkeligheten i løpet av dager. Med assimilering blir hver ny syklus en
        korreksjon. Derfor kan korttidsvarsler oppdateres hver time.
      </p>
      <OrdBoks
        ord="dataassimilering"
        barn="observasjoner blandes inn for en bedre starttilstand"
      />
      <p>
        Atmosfæren er deterministisk og kaotisk. To starttilstander som er umulig å skille med
        dagens observasjoner, kan gi vesentlig ulikt vær etter en uke. Ett deterministisk varsel gir
        falsk presisjon.
      </p>
      <p>
        Et ensemble er mange nesten like kjøringer. Spredningen kartlegger usikkerheten. Ligger
        medlemmene tett: høy tillit. Spriker de: lav tillit, for eksempel et lavtrykk som kan ta
        sørlig eller nordlig bane. «30 % sjanse for mer enn 20 mm» er andelen ensemblemedlemmer over
        en terskel, ofte kalibrert mot historikk. Ikke gjetting.
      </p>
      <OrdBoks
        ord="ensemble"
        barn="mange nesten like kjøringer som kartlegger usikkerhet"
      />
      <p>
        Den praktiske prediksjonsgrensen for synoptisk vær er typisk 7–10 døgn, i gode tilfeller mot
        15. Klima er ikke langtidsvær. Klima er fordelingen av vær over 30 år. Pådrivet forskyver
        den fordelingen.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Norge</h2>
      <p>
        MEPS er den regionale modellen for Norden, 2,5 km, 30 medlemmer, ut til ca. 66 timer.
        AROME-Arctic er 2,5 km over Arktis, brukt for Svalbard og nordlige havområder. ECMWF er det
        globale systemet, ca. 9 km, ut til 15 døgn. Norkyst er kysthavmodellen, 800 m, 40 lag,
        120-timers varsel.
      </p>
      <p>
        På yr.no dekkes de første ca. 60 timene over Norden av MEPS, Arktis av AROME-Arctic, og 2–10
        døgn av ECMWF-ensemble. Når varslet svinger fra dag til dag på dag 7–9, er det ensemblets
        spredning du ser.
      </p>
      <p>
        Norkyst drives av vind og trykk fra den regionale atmosfæremodellen. Bruk: oljevern,
        search-and-rescue, lakselus, skipstrafikk. Havet er både kilde til prediktabilitet på
        sesong, og kilde til usikkerhet i klima.
      </p>
      <p>AR6, ikke AR7. Syvende hovedrapport er ikke publisert. Tall og vurderinger bygger på AR6.</p>

      <Callout title="Kompetansemål">
        <p>
          Gjøre rede for hvordan numeriske modeller i geofag bygges opp og videreutvikles, og
          beskrive hvordan modellene brukes innenfor værvarsling, havmodellering og klimaforskning.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="grid"
          def="avstand mellom beregningspunktene; finere gir mer detalj, koster mer regnekraft"
        />
        <Term
          name="parametrisering"
          def="forenklet beskrivelse av prosesser som er for små eller for komplekse til å løses eksplisitt"
        />
        <Term name="dataassimilering" def="observasjoner blandes inn for en bedre starttilstand" />
        <Term name="ensemble" def="mange nesten like kjøringer som kartlegger usikkerhet" />
      </TermGrid>
    </TopicLayout>
  );
}
