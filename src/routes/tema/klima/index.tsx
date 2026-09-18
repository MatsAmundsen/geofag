import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Callout } from "@/components/callout";
import { Quiz } from "@/components/quiz";
import { Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { KILDER } from "@/lib/kilder";
import { KLIMA_SUBTHEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/")({
  head: () =>
    topicHead({
      title: "Klima og klimasystemer · Geofag 2",
      description:
        "Kart over klimasystemet: oversikt med stråling og tilbakekobling, deretter ENSO, IOD, NAO og AMOC.",
      path: "/tema/klima",
    }),
  component: KlimaHubPage,
});

function KlimaHubPage() {
  return (
    <TopicLayout
      kicker="Jordsystemet"
      title="Klima og klimasystemer"
      lead="Denne siden er kartet. Oversikten eier stråling, pådriv og tilbakekobling. ENSO, IOD, NAO og AMOC eier hver sin svingning. Kryosfæren eier isen som jobber i år."
      banner="/images/banner-klima.jpg"
      bannerAlt="Grønlands innlandsis mot mørkt polarhav"
      prev={{ to: "/tema/havstrommer", label: "Forrige: Havstrømmer" }}
      next={{ to: "/tema/klima/oversikt", label: "Neste: Klimasystemet (oversikt)" }}
      kilder={KILDER.klima}
    >
      <Callout title="Kompetansemål">
        <p>
          Gjøre rede for klimasystemet og hvordan menneskelig aktivitet kan påvirke det. Her: kartet.
          Tallene og tilbakekoblingene ligger i oversikt. Modusene har egne sider (Utdanningsdirektoratet,
          2020).
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">To slags spørsmål</h2>
      <p>
        Vær er dager. Klima er tiår. Mellom dem ligger to ulike spørsmål. Det første: hvordan energi
        går inn og ut av planeten, og hva som forsterker eller demper et dytt. Det eier{" "}
        <Link to="/tema/klima/oversikt" className="text-primary underline-offset-2 hover:underline">
          klimasystemet (oversikt)
        </Link>
        . Det andre: hvordan hav og luft flytter varme og nedbør uten å endre jordas totale
        energibalanse vesentlig. Det eier de fire modusene under.
      </p>

      <Callout title="Leserekkefølge">
        <p>
          Oversikt → ENSO → IOD → NAO → AMOC. Deretter videre til kryosfæren. Hopp ikke til en modus
          før du kan skille pådriv fra svingning.
        </p>
      </Callout>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Velg emne i klimasystemet
      </h2>
      <div className="my-8 grid gap-4 sm:grid-cols-2">
        {KLIMA_SUBTHEMES.map((sub) => (
          <Link
            key={sub.to}
            to={sub.to}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {sub.kicker}
              </p>
              <h3 className="mt-1 font-display text-xl font-medium tracking-tight group-hover:text-primary">
                {sub.title}
              </h3>
              {"subtitle" in sub && sub.subtitle && (
                <p className="text-xs text-muted-foreground">{sub.subtitle}</p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sub.blurb}</p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Åpne
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <h2 className="pt-2 font-display text-2xl font-medium tracking-tight">
        Hvorfor egne sider for svingningene?
      </h2>
      <p>
        Vinden dytter på havet. Havtemperaturen styrer hvor lufta stiger. Når det samspillet svinger,
        flyttes tørke og flom. ENSO i Stillehavet. IOD i Det indiske hav. NAO over Nord-Atlanteren inn
        mot norske vintre. AMOC som tregt belte, ikke som en bryter. Mekanikken står på sidene. Ikke
        her.
      </p>

      <Callout title="Til eksamen">
        <p>
          Skill <strong>naturlig variabilitet</strong> (ENSO, IOD, NAO) fra{" "}
          <strong>antropogent pådriv</strong>. Svingningene rir oppå trenden. De er ikke trenden.
        </p>
      </Callout>
      <Callout title="Vanlige misforståelser">
        <p>
          El Niño eller en positiv NAO er ikke et resultat av klimaendringer. De er gamle, naturlige
          svingninger. Forskningen spør om oppvarming endrer frekvens, intensitet eller konsekvens —
          ikke om de ble oppfunnet av CO₂.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Klimasystemet" def="Atmosfæren, hydrosfæren, kryosfæren, litosfæren og biosfæren. Oversikten eier samspillet." />
        <Term name="Pådriv" def="Et dytt som forskyver strålingsbalansen. Sol, vulkan, drivhusgass." />
        <Term name="Klimamodus" def="Et regelmessig mønster i hav og luft som omfordeler energi, ikke et nytt budsjett." />
        <Term name="ENSO" def="El Niño–Sørlige oscillasjon i det tropiske Stillehavet." />
        <Term name="IOD" def="Den indiske hav-dipolen." />
        <Term name="NAO" def="Den nordatlantiske oscillasjon. Nærmest norsk vintervær." />
        <Term name="AMOC" def="Den atlantiske omveltningssirkulasjonen. Tregere enn været." />
      </TermGrid>

      <Quiz
        questions={[
          {
            prompt: "Hva er den viktigste forskjellen mellom en klimamodus (f.eks. ENSO/NAO) og global oppvarming?",
            options: [
              "Klimamoduser gjelder bare lufttrykk, ikke temperatur.",
              "Klimamoduser er naturlige svingninger som omfordeler energi i systemet, mens global oppvarming skyldes et ytre netto strålingspådriv.",
              "Global oppvarming skjer bare i atmosfæren, mens moduser kun skjer i havet.",
              "Det er ingen forskjell, begge begrep betyr det samme.",
            ],
            answer: 1,
            explain:
              "ENSO og NAO flytter varme og nedbør uten å endre jordas totale energibalanse vesentlig, mens økt drivhuseffekt holder igjen mer energi totalt.",
          },
          {
            prompt: "Hvilken hav-atmosfære-svingning har størst direkte innflytelse på vinterværet inn mot Norge?",
            options: [
              "Den indiske hav-dipolen (IOD)",
              "Den nordatlantiske oscillasjon (NAO)",
              "El Niño–Sørlige oscillasjon (ENSO)",
              "Den antarktiske oscillasjon (SAM)",
            ],
            answer: 1,
            explain:
              "NAO styrer trykkgradienten i Nord-Atlanteren og stormbanen inn mot Norge.",
          },
          {
            prompt: "Hvor hører strålingsbudsjettet og tilbakekoblingene hjemme i dette kapitlet?",
            options: [
              "På ENSO-siden, fordi El Niño endrer jordas energibalanse mest.",
              "På oversiktssiden. Hubben er kartet. Modusene eier svingningene.",
              "Bare i paleoklima.",
              "Bare i numeriske modeller.",
            ],
            answer: 1,
            explain:
              "Oversikten eier inn og ut, pådriv og tilbakekobling. Modusene eier omfordeling.",
          },
        ]}
      />
    </TopicLayout>
  );
}
