import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Callout } from "@/components/callout";
import { GeminiFigure } from "@/components/gemini-figure";
import { Quiz } from "@/components/quiz";
import { Term, TermGrid } from "@/components/term";
import { TopicLayout } from "@/components/topic-layout";
import { GEMINI } from "@/lib/gemini-slots";
import { KILDER } from "@/lib/kilder";
import { KLIMA_SUBTHEMES } from "@/lib/nav";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/tema/klima/")({
  head: () =>
    topicHead({
      title: "Klima og klimasystemer · Geofag 2",
      description:
        "Klimasystemet og hav-atmosfære-svingningene: Klimasystemet, ENSO, IOD, NAO og AMOC. Drivhuseffekt, telekoblinger og Norges klima.",
      path: "/tema/klima",
    }),
  component: KlimaHubPage,
});

function KlimaHubPage() {
  return (
    <TopicLayout
      kicker="Jordsystemet"
      title="Klima og klimasystemer"
      lead="Vær er dager, klima er tiår. Men mellom den daglige værmeldingen og årtusenenes istider finner vi havets og atmosfærens egne rytmer: ENSO, IOD, NAO og AMOC. Her fordyper du deg i mekanismene som styrer jordas klimasystem."
      banner="/images/banner-klima.jpg"
      bannerAlt="Grønlands innlandsis mot mørkt polarhav"
      prev={{ to: "/tema/havstrommer", label: "Forrige: Havstrømmer" }}
      next={{ to: "/tema/kryosfare", label: "Neste: Kryosfæren" }}
      kilder={KILDER.klima}
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Inn og ut — med tall
      </h2>
      <p>
        Forståelsen av klimaet krever både den store helheten — hvordan energi flyter inn og ut av
        planeten — og de koblete hav-atmosfære-svingningene. Globalt middel i toppen av atmosfæren er
        omtrent 340 W/m² inn. Rundt 30 prosent kastes tilbake (albedo). Resten tas opp. Ut går som
        langbølge. Drivhusgasser bremser ut. Foto av jordkloden viser stemning. Tallene viser budsjettet.
      </p>
      <GeminiFigure {...GEMINI.klimaStraling} />

      <h2 className="font-display text-2xl font-medium tracking-tight">
        Velg emne i klimasystemet
      </h2>
      <p>
        Velg en underkategori under for å utforske mekanismene i dybden.
      </p>

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
              Les fordypning
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Hvorfor studerer vi klimamoduser og svingninger?
      </h2>
      <p>
        Atmosfæren og havet er ikke to adskilte beholdere; de er mekanisk og termisk låst til
        hverandre. Vinden dytter på havoverflaten og stabler opp varmt vann, mens havtemperaturen
        bestemmer hvor lufta stiger og danner skyer og nedbør.
      </p>
      <p>
        Når dette samspillet svinger frem og tilbake, oppstår det <em>klimamoduser</em>. En svingning i
        tropisk Stillehav (ENSO) kan utløse tørke i Australia og flom i Peru. I Nord-Atlanteren avgjør
        NAO norske vintre, mens AMOC frakter varme fra tropene til Norden.
      </p>

      <Callout title="Til eksamen">
        <p>
          Skill mellom <strong>naturlig variabilitet</strong> (ENSO, IOD, NAO) og{" "}
          <strong>antropogent pådriv</strong>. De naturlige svingningene rir oppå den langsiktige trenden.
        </p>
      </Callout>

      <Callout title="Vanlige misforståelser">
        <p>
          El Niño eller en positiv NAO er ikke et resultat av klimaendringer. De er eldgamle, naturlige
          svingninger. Forskningen ser på hvordan oppvarming kan endre frekvens, intensitet eller konsekvens.
        </p>
      </Callout>

      <h2 className="font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Klimasystemet" def="Atmosfæren, hydrosfæren, kryosfæren, litosfæren og biosfæren." />
        <Term name="Klimamodus" def="Et regelmessig romlig og tidsmessig mønster i hav og atmosfære." />
        <Term name="ENSO" def="El Niño–Sørlige oscillasjon i det tropiske Stillehavet." />
        <Term name="IOD" def="Den indiske hav-dipolen; temperaturgradient i Det indiske hav." />
        <Term name="NAO" def="Den nordatlantiske oscillasjon; trykkforskjell mellom Asorene og Island." />
        <Term name="AMOC" def="Den atlantiske omveltningssirkulasjonen; havets store transportbånd." />
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
        ]}
      />
    </TopicLayout>
  );
}
