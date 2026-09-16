import { Link } from "@tanstack/react-router";
import { CollapsibleSection } from "@/components/collapsible-section";
import { NaoDomainDiagram } from "@/components/diagrams";

export function Motor() {
  return (
    <>
      <CollapsibleSection
        title="1. Normaltilstanden og den geostrofiske motoren"
        subtitle="Hadley-cellen, polarfronten og den geostrofiske balansen som driver vestavindsbeltet"
        badge="Fysisk grunnlag"
        badgeVariant="teal"
        defaultOpen={true}
      >
        <p>
          For å forstå hvorfor NAO svinger og hvilke krefter som settes i sving, må vi se på
          fysikken bak atmosfæresirkulasjonen over Atlanteren. NAO er ikke en frittstående hendelse,
          men den variable manifestasjonen av{" "}
          <Link to="/tema/vindsystemet" className="text-primary underline-offset-2 hover:underline">
            det globale vindsystemet
          </Link>
          .
        </p>

        <NaoDomainDiagram />

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              De to trykksentrene: Hvorfor oppstår de?
            </h4>
            <ul className="mt-1 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>
                <strong>Azorhøytrykket:</strong> Er en direkte konsekvens av den termiske{" "}
                <strong>Hadley-cellen</strong>. Luft som stiger opp i tropene ved ekvator (ITCZ),
                avkjøles i høyden og synker ned igjen rundt 30°N. Den nedsynkende luften komprimeres,
                varmes adiabatisk og danner et stabilt, varmt høytrykksbelte med lite skyer og tørt
                klima.
              </li>
              <li>
                <strong>Islandslavtrykket:</strong> Er et <em>dynamisk</em> lavtrykkssenter. Det
                dannes ikke av lokal oppvarming, men av kontinuerlig dannelse og oppsamling av
                ekstratropiske sykloner langs <strong>polarfronten</strong>, der kald, tung arktisk
                luft møter mild, fuktig subtropisk luftmasse.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">
              Den geostrofiske vindbalansen
            </h4>
            <p className="mt-1 text-sm sm:text-base">
              Hvorfor blåser vinden fra vest mot øst, og ikke rett fra høytrykket ved Azorene nordover
              til lavtrykket ved Island? Svaret ligger i{" "}
              <Link to="/tema/coriolis" className="text-primary underline-offset-2 hover:underline">
                Coriolis-kraften
              </Link>
              . Luft som settes i bevegelse av den nordgående trykkgradientkraften (
              <em>pressure gradient force</em>), avbøyes mot høyre på den nordlige halvkule.
            </p>
            <p className="mt-2 text-sm sm:text-base">
              I den frie troposfæren (over friksjonssjiktet) oppstår det en tilnærmet likevekt mellom
              trykkgradientkraften og Coriolis-kraften — den <strong>geostrofiske balansen</strong>:
            </p>
            <div className="my-3 rounded-lg border border-border/80 bg-card/80 p-3 text-center font-mono text-sm text-foreground">
              u_g = - (1 / (ρ · f)) · (∂P / ∂y)
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">
              der <em>u_g</em> er den sonale vestavinden, <em>ρ</em> er luftens tetthet, <em>f</em> er
              Coriolis-parameteren (<em>f = 2Ω sin φ</em>), og <em>∂P/∂y</em> er trykkgradienten i
              nord–sør-retning. Formelen viser direkte at jo brattere trykkforskjell (større{" "}
              <em>∂P/∂y</em>) det er mellom Azorene og Island, desto kraftigere <strong>må</strong>{" "}
              den sonale vestavinden <em>u_g</em> bli!
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
