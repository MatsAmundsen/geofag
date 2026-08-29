import { createFileRoute } from "@tanstack/react-router";
import { Callout } from "@/components/callout";
import { MarineLimitDiagram } from "@/components/diagrams/hydrology";
import { FigurePlaceholder } from "@/components/photo-figure";
import { Quiz } from "@/components/quiz";
import { OrdBoks, Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { gf1Theme } from "@/lib/nav";

const tema = gf1Theme("skred")!;

export const Route = createFileRoute("/geofag-1/skred")({
  component: SkredPage,
});

function SkredPage() {
  return (
    <TopicLayout
      kicker={`Geofag 1 · ${tema.kicker}`}
      title={tema.title}
      lead="Skred er masse som løsner og beveger seg nedover. I geofag 1 holder vi oss til fjell og løsmasse. Snøskred er kryosfære og hører i geofag 2."
      banner="/images/fig-ravine.jpg"
      bannerAlt={tema.alt}
      videoTopic="skred"
      prev={{
        to: "/geofag-1/vann-og-flom",
        label: "Forrige: Vann og flom",
      }}
      next={{
        to: "/geofag-1/geologiske-ressurser",
        label: "Neste: Geologiske ressurser",
      }}
    >
      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">Hva det er</h2>
      <p>
        Skred er masse som løsner og beveger seg nedover. I geofag 1 holder vi oss til fjell og
        løsmasse. Snøskred er kryosfære og hører i geofag 2.
      </p>
      <p>
        Steinskred og steinsprang er blokker som løsner fra sprekker i fjell. De er hyppige langs
        vei og jernbane. Volumet er ofte lite. Farten er høy. Sikring er bolter, nett, overbygg og
        arealplan.
      </p>
      <p>
        Fjellskred er stort volum fjell som løsner. Fjellet kan sige sakte i årevis, så
        akselerere. Treffer det fjord eller innsjø, blir det flodbølge. Norske tsunamier kommer
        nesten alltid fra skred, ikke fra subduksjon.
      </p>
      <Callout title="Åknes og Tafjord">
        <p>
          Åknes ligger på vestsiden av Sunnylvsfjorden i Stranda. NVE overvåker kontinuerlig. Et
          skred kan gi flodbølge i Storfjord-systemet. Sikring av hele fjellet er urealistisk.
          Beredskapen er instrumentering og evakuering.
        </p>
        <p>
          Tafjord 7. april 1934: Langhammaren, om lag 3 millioner m³. 40 omkomne. Bølger inntil 61
          høydemeter. Sprekken var kjent i tiår. Båter ble dratt opp, ikke folkene. Det er
          argumentet for dagens Åknes-beredskap.
        </p>
      </Callout>
      <p>Løsmasseskred går i jord, ikke i fast fjell.</p>
      <p>
        Jordskred går i morene og forvitringsjord ved intens nedbør eller snøsmelting. Bratte
        dalsider, hogstfelt, bekkeløp. Hans 2023 er typeeksempelet: over 700 jord- og flomskred på
        noen døgn.
      </p>
      <p>
        Leireskred går i leire som ikke nødvendigvis er kvikk. Skråningen svikter. Massen glir.
        Kvikkleireskred er noe annet: strukturen kollapser, og massen flyter som væske.
      </p>
      <p>
        Kvikkleire er marin leire avsatt i salt fjord. Vanlig sjøvann har ca. 35 g salt per liter.
        Når porevannet kommer under ca. 2 g/L, kan kvikkleire dannes. Marin grense er høyeste
        havnivå etter siste istid, i Norge 0–220 m, høyest ved Oslo og i Trøndelag. Aktsomhet
        gjelder under marin grense.
      </p>
      <OrdBoks
        ord="Marin grense"
        barn="Høyeste havnivå etter siste istid, i Norge 0–220 m, høyest ved Oslo og i Trøndelag. Aktsomhet gjelder under marin grense."
      />
      <p>
        Uforstyrret er leira fast. Omrøres den, kollapser strukturen. Skredet blir ofte
        retrogressivt: kanten mister støtte og spiser seg bakover.
      </p>
      <OrdBoks
        ord="Kvikkleire"
        barn="Marin leire avsatt i salt fjord. Når porevannet kommer under ca. 2 g/L, kan kvikkleire dannes. Uforstyrret er leira fast. Omrøres den, kollapser strukturen."
      />
      <Callout title="Gjerdrum 2020">
        <p>
          Gjerdrum 30. desember 2020: 11 omkomne, mer enn 1600 evakuert, om lag 1,35 millioner m³.
          Start i skråningen mot Tistilbekken. Årsak: erosjon over år, forsterket av ødelagt
          bekkelukking, urbanisering og terrenginngrep. Utløser: våt, mild høst 2020. Det var ikke
          det største kvikkleireskredet. Rissa 1978 var 5–6 millioner m³. Risikoen i Gjerdrum ble
          katastrofal fordi boliger lå i utløpet.
        </p>
      </Callout>
      <p>
        Havbunnsskred går på kontinentalskråningen. Storegga, ca. 8150 år før nåtid, er det største
        kartlagte skredet på jorda. Mekanismen er retrogressiv, analog til kvikkleire, på helling
        ned mot 0,3°. Tsunamiavsetninger fra Bømlo til Nordkapp, pluss Skottland, Shetland og
        Færøyene. Gassfeltet Ormen Lange ligger under skredgropa. Undersøkelser konkluderte at
        kanten er stabil. Feltet er i produksjon fra 2007.
      </p>
      <MarineLimitDiagram />

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Utløsningsmekanismer
      </h2>
      <p>Steinskred: frost i sprekker, røtter, undergraving i foten.</p>
      <p>
        Fjellskred: grunnvann i sprekker, frost, langsom svekkelse, så akselerasjon. Overvåking
        fanger bevegelsen. Den stopper ikke fjellet.
      </p>
      <p>
        Jordskred: intens nedbør, snøsmelting, mettet mark. Poretrykket stiger. Skjærstyrken
        faller.
      </p>
      <p>
        Kvikkleire: erosjon i skråningsfoten, graving, fylling, rystelse. Skjelv kan være impuls på
        skråningen. I Norge dreper skred og flom langt flere enn skjelv. Rissa ble utløst av
        fylling i strandkanten. Gjerdrum av erosjon i bekken.
      </p>
      <p>
        Havbunnsskred: svake lag, sedimentlast, og i Storegga et glideplan av bløte konturitter.
        Retrogressjon som i kvikkleire.
      </p>
      <p>
        Skill utløser og predisposisjon. Vær og vann er utløser. Leire, fjell og helning ligger der
        fra før.
      </p>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Utfordringer i Norge i dag
      </h2>
      <p>
        Boliger, vei og jernbane ligger i utløp og dalbunn. Et ustabilt fjell uten folk nedenfor er
        høy fare og lav risiko. Gjerdrum viser det omvendte.
      </p>
      <OrdBoks
        ord="Risiko"
        barn="Et ustabilt fjell uten folk nedenfor er høy fare og lav risiko. Gjerdrum viser det omvendte: boliger i utløpet."
      />
      <p>
        Kartene friskmelder ikke omlandet. NVE finner områder der store skred kan gå, ikke all
        kvikkleire. Aktsomhet gjelder overalt under marin grense, også utenfor tegnede soner.
        Bygging i aktsomhetsområde krever detaljert utredning. Blankt kart er ikke trygt.
      </p>
      <p>
        Der sikring av hele fjellet er urealistisk, er tiltaket overvåking og evakuering. Åknes er
        læreboka. Overvåking gir tid. Den stopper ikke skredet. Veslemannen raste delvis ut 5.
        september 2019 etter 16 evakueringer.
      </p>
      <p>
        Mer intens nedbør øker utløsningsfaren for løsmasseskred i mange felt. Store fjellskred
        styres av sprekker, frost og grunnvann over lang tid. NVE er mer forbeholden der. Gjerdrum
        var ikke «et klimaskred» som eneste forklaring. Hovedårsak erosjon og kvikkleire. Våt høst
        var utløser.
      </p>
      <p>
        Varsom viser jordskred og fjellskredovervåking. Kommunen eier arealplanen. Forebygging er
        kart, ikke bygg, erosjonssikring. Tilpasning er varsel og evakuering. Tiltaket skal matche
        faren.
      </p>
      <div className="grid gap-0 sm:grid-cols-3 sm:gap-4">
        <FigurePlaceholder
          heading="Fjellskred mot fjord"
          caption="Flodbølge i fjord, Åknes-type."
          label="Plassholder for fjellskred mot fjord og flodbølge, Åknes-type"
        />
        <FigurePlaceholder
          heading="Steinsprang mot vei"
          caption="Blokker som løsner fra sprekker. Hyppige langs vei og jernbane."
          label="Plassholder for steinsprang mot vei"
        />
        <FigurePlaceholder
          heading="Jordskred i dalside"
          caption="Jordskred i morene og forvitringsjord. Bratte dalsider, hogstfelt, bekkeløp."
          label="Plassholder for jordskred i dalside"
        />
      </div>

      <Callout title="Kompetansemål">
        <p>{tema.maal}</p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Ord å eie</h2>
      <TermGrid>
        <Term
          name="kvikkleire"
          def="Marin leire avsatt i salt fjord. Når porevannet kommer under ca. 2 g/L, kan kvikkleire dannes. Uforstyrret er leira fast. Omrøres den, kollapser strukturen."
        />
        <Term
          name="marin grense"
          def="Høyeste havnivå etter siste istid, i Norge 0–220 m, høyest ved Oslo og i Trøndelag. Aktsomhet gjelder under marin grense."
        />
        <Term
          name="risiko"
          def="Et ustabilt fjell uten folk nedenfor er høy fare og lav risiko. Gjerdrum viser det omvendte: boliger i utløpet."
        />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Når kan kvikkleire dannes i marin leire?",
            options: [
              "Når porevannet har ca. 35 g salt per liter.",
              "Når porevannet kommer under ca. 2 g/L. Vanlig sjøvann har ca. 35 g salt per liter.",
              "Bare over marin grense.",
              "Når snøskred går i geofag 1.",
            ],
            answer: 1,
            explain:
              "Kvikkleire er marin leire avsatt i salt fjord. Uforstyrret er leira fast. Omrøres den, kollapser strukturen.",
          },
          {
            prompt: "Hva betyr et blankt faresonekart under marin grense?",
            options: [
              "Området er friskmeldt.",
              "Blankt kart er ikke trygt. Aktsomhet gjelder overalt under marin grense, også utenfor tegnede soner.",
              "NVE har kartlagt all kvikkleire.",
              "Det kan ikke gå skred der.",
            ],
            answer: 1,
            explain:
              "Kartene friskmelder ikke omlandet. NVE finner områder der store skred kan gå, ikke all kvikkleire.",
          },
          {
            prompt: "Hva gjør overvåking ved Åknes?",
            options: [
              "Den sikrer hele fjellet.",
              "Overvåking fanger bevegelsen. Den stopper ikke fjellet.",
              "Den stopper skredet.",
              "Den gjør evakuering unødvendig.",
            ],
            answer: 1,
            explain:
              "Sikring av hele fjellet er urealistisk. Beredskapen er instrumentering og evakuering. Overvåking gir tid.",
          },
          {
            prompt: "Var Gjerdrum 2020 det største kvikkleireskredet?",
            options: [
              "Ja. Gjerdrum var det største.",
              "Nei. Rissa 1978 var 5–6 millioner m³. Gjerdrum var om lag 1,35 millioner m³.",
              "Ja, og det var et snøskred.",
              "Storegga på land var større og nyere.",
            ],
            answer: 1,
            explain:
              "Risikoen i Gjerdrum ble katastrofal fordi boliger lå i utløpet. Det var ikke det største kvikkleireskredet.",
          },
        ]}
      />
    </TopicLayout>
  );
}
