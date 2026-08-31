import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Callout } from "@/components/callout";
import { Kildeliste } from "@/components/kildeliste";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { EXAM_SETS, SOLUTIONS } from "@/lib/eksamen";
import { KILDER } from "@/lib/kilder";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/eksamen/")({
  head: () =>
    topicHead({
      title: "Eksamen · Geofag 2",
      description:
        "Geofag 2 (REA3043) per 2026: gjennomføring i sikker nettleser, regler, hjelpemidler, kildeføring og løsningsforslag til tidligere sett.",
      path: "/eksamen",
    }),
  component: EksamenIndex,
});

function EksamenIndex() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Geofag 2 · REA3043
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Eksamen
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/90 sm:text-lg">
              Skriftlig, sentral gitt, fem timer. Fra 2026 gjennomføres faget i sikker nettleser.
              Under: hvordan dagen ser ut, hva som er lov, hvordan du fører kilder — og knapper til
              oppgavene med løsningsforslag.
            </p>
            <div className="mt-6">
              <Button asChild variant="secondary">
                <a href="#sett">Til eksamenssettene</a>
              </Button>
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <section>
            <h2 className="font-display text-3xl font-medium tracking-tight">
              Gjennomføring per 2026
            </h2>
            <p className="mt-4 text-foreground/90">
              Geofag 2 er trekkfag for elever og obligatorisk for privatister. Eksamen er skriftlig,
              utarbeidet og sensurert sentralt, og varer fem timer. Neste høsttermin er 18. november
              2026 kl. 09.00–14.00 norsk tid. Det er ingen forberedelsesdag (Utdanningsdirektoratet,
              u.å.-a, u.å.-b).
            </p>
            <p className="mt-3 text-foreground/90">
              Du tar med egen maskin du kjenner, med oppdatert nettleser. Det er ikke mulig å levere
              på papir. Eksamen åpnes i Safe Exam Browser: et lukket vindu der du svarer i
              oppgavesettet — flervalg og klikk, og skriveoppgaver i tekstboks. Word, egne filer og
              det åpne internettet er stengt. Inne i den samme sikre nettleseren ligger likevel
              lenker til Store norske leksikon, Lovdata og ordbokene.no — de tre er hjelpemidler du
              skal bruke underveis (Utdanningsdirektoratet, u.å.-a, u.å.-c).
            </p>
            <p className="mt-3 text-foreground/90">
              Last ned riktig versjon av Safe Exam Browser og test den på maskinen før dagen. Udir
              anbefaler Chrome eller Edge; Safari er ikke støttet i eksamenssystemene. Du kan logge
              inn før start og vente. Kommer du etter 09.00 men før 10.00, mister du den tapte
              tiden. Etter 10.00 får du ikke gjennomføre. Skriv ikke navnet ditt i besvarelsen —
              den skal være anonym. Dagen etter kan du se det du leverte, med Feide eller ID-porten
              (Utdanningsdirektoratet, u.å.-a, u.å.-d).
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-3xl font-medium tracking-tight">Regler</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/90">
              <li>Ingen kommunikasjon med andre underveis.</li>
              <li>
                Ingen kunstig intelligens som genererer innhold i svaret (Utdanningsdirektoratet,
                u.å.-d).
              </li>
              <li>Bare hjelpemidlene som er tillatt i faget — se under.</li>
              <li>Les eksamensveiledningen før dagen. Den sier hvordan besvarelsen vurderes.</li>
              <li>
                Juks kan gi annullert eksamen, tapt standpunkt og tidligst ny eksamen etter ett år
                (Utdanningsdirektoratet, u.å.-d).
              </li>
            </ul>
            <p className="mt-4 text-foreground/90">
              Trenger du lese- og skrivestøtte (for eksempel IntoWords eller Lingdys), søker skolen
              om særskilt tilrettelegging. Da kan du unntas fra sikker nettleser
              (Utdanningsdirektoratet, u.å.-c).
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-3xl font-medium tracking-tight">Hjelpemidler</h2>
            <p className="mt-4 text-foreground/90">
              To spor: papir du tar med, og tre nettsteder du åpner inne i Safe Exam Browser. De er
              ikke «åpent internett» — de er tillatte lenker i det låste eksamensvinduet.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-display text-xl font-medium tracking-tight">På papir</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Bøker, oppslagsverk, egne notater og liknende. Det du trenger digitalt fra
                  undervisningen, må altså være skrevet ut. Ingenting på C: eller i skyen er
                  tilgjengelig når nettleseren er låst (Utdanningsdirektoratet, u.å.-a).
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-display text-xl font-medium tracking-tight">
                  Inne i Safe Exam Browser
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Stavekontroll i hovedmålet ditt, pluss lenker i oppgavesettet til{" "}
                  <span className="text-foreground">snl.no</span>,{" "}
                  <span className="text-foreground">Lovdata.no</span> og{" "}
                  <span className="text-foreground">ordbokene.no</span>. Ikke Word, ikke egne
                  digitale notater, ikke søkemotorer eller andre nettsteder.
                </p>
              </div>
            </div>
            <Callout title="Bruk SNL aktivt — det er derfor lenken ligger der">
              <p>
                Store norske leksikon er det viktigste digitale oppslagsverket du har på
                eksamensdagen. Søket fungerer inne i Safe Exam Browser. Når en oppgave nevner et
                geologisk eller meteorologisk fenomen du er usikker på — jetstrøm, fønvind, AMOC,
                permafrost, albedo, tropisk syklon, Ekmantransport — slå det opp på snl.no, les
                forklaringen, og skriv svaret med egne ord.
              </p>
              <p>
                Lovdata er til lover og forskrifter. Ordbokene.no er språkhjelp. Alle tre åpnes fra
                settet, i den sikre nettleseren. Før kilden hvis du henter innhold derfra.
              </p>
            </Callout>
            <p className="mt-4 text-sm text-muted-foreground">
              Sjekk alltid den gjeldende eksamensveiledningen. Udir kan justere de nettbaserte
              lenkene.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-3xl font-medium tracking-tight">Kildeføring</h2>
            <p className="mt-4 text-foreground/90">
              Alle kilder i besvarelsen skal oppgis slik at sensor kan finne dem
              (Utdanningsdirektoratet, u.å.-d). I Geofag 2 betyr det to ting: henvisning i teksten,
              og en kort liste til slutt. Sensoren skal se hva som er dine setninger, og hva som er
              hentet.
            </p>
            <p className="mt-3 text-foreground/90">
              I teksten holder det med forfatter (eller etat), år og sidetall når du har det:
              (Meteorologisk institutt, 2024) eller (Ahrens & Henson, 2019, s. 214). Figurer som
              ligger i oppgavesettet, henviser du til som figur i settet — ikke som om du fant dem
              selv: (figur 2 i oppgavesettet). Bruker du Store norske leksikon via den tillatte
              lenken: (Store norske leksikon, u.å., «Golfstrømmen»).
            </p>
            <p className="mt-3 text-foreground/90">
              Bakerst: forfatter. (år). <em>Tittel</em>. Utgiver eller URL. Vær konsekvent. APA 7 er
              et godt mønster, men Udir krever ikke en bestemt mal — de krever at kilden er
              gjenfinnbar. Oppgi ikke denne nettsiden som hjelpemiddel på eksamen. Geofag.com er
              stengt i sikker nettleser.
            </p>
            <Callout title="Tre vanlige trekk">
              <p>Å sitere en figur uten å si at den kommer fra oppgavesettet.</p>
              <p>Å bruke et tall eller et kart og late som det er allmennkunnskap.</p>
              <p>Å lime inn SNL-setninger uten henvisning. Sensor leser det som juks.</p>
            </Callout>
          </section>

          <Callout title="Passord og figurer">
            <p>
              Udir låser settene fordi mange figurer er tredjepartsverk. Passord får du fra skolen
              eller eksamenskontoret. Åpne settet hos Udir, se figuren, kom tilbake og les
              løsningsforslaget.
            </p>
            <p>
              Løsningsforslagene her er skrevet om med egne ord. Der Udir har lagt ut fasit, følger
              vi den. De erstatter ikke den offisielle sensorveiledningen.
            </p>
          </Callout>

          <section id="sett" className="mt-14 scroll-mt-24">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              Eksamenssett og løsningsforslag
            </h2>
            <p className="mt-3 text-muted-foreground">
              Hvert sett har egne knapper til oppgavene og til løsningsforslag. Figurene hos Udir
              åpner du i det offisielle settet.
            </p>

            <ul className="mt-8 space-y-4">
              {EXAM_SETS.map((set) => {
                const n = Object.keys(SOLUTIONS[set.slug] ?? {}).length;
                return (
                  <li
                    key={set.slug}
                    className="rounded-2xl border border-border bg-card p-5 sm:p-6"
                  >
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {set.kind === "eksempel" ? "Eksempel" : "Eksamen"} · {set.tasks.length}{" "}
                      oppgaver · {n} løsningsforslag
                      {set.complete ? "" : " · ufullstendig uttrekk"}
                      {set.fasitSource === "udir" ? " · sjekket mot Udir-fasit" : " · eget forslag"}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-medium tracking-tight">
                      {set.label}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{set.themes.join(" · ")}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button asChild>
                        <Link to="/eksamen/$slug" params={{ slug: set.slug }}>
                          Oppgaver
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="secondary">
                        <Link
                          to="/eksamen/$slug"
                          params={{ slug: set.slug }}
                          search={{ vis: "losningsforslag" }}
                        >
                          Løsningsforslag
                        </Link>
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <p className="mt-10 text-sm text-muted-foreground">
            Offisiell oversikt:{" "}
            <a
              className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
              href="https://kandidat.udir.no/eksamensinfo/REA3043"
              target="_blank"
              rel="noreferrer"
            >
              kandidat.udir.no/eksamensinfo/REA3043
              <ExternalLink className="size-3.5" />
            </a>
          </p>

          <Kildeliste kilder={KILDER.eksamen} />
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
