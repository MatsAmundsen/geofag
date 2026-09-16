import { Link } from "@tanstack/react-router";
import { CollapsibleSection } from "@/components/collapsible-section";
import {
  NaoDomainDiagram,
} from "@/components/diagrams";

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
          For å forstå hvorfor NAO svinger og hvilke krefter som settes i sving, må vi se på fysikken bak atmosfæresirkulasjonen over Atlanteren. NAO er den variable manifestasjonen av{" "}
          <Link to="/tema/vindsystemet" className="text-primary underline-offset-2 hover:underline">det globale vindsystemet</Link>.
        </p>

        <NaoDomainDiagram />

        <div className="space-y-4">
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">De to trykksentrene: Hvorfor oppstår de?</h4>
            <ul className="mt-1 list-disc space-y-1.5 pl-5 text-sm sm:text-base">
              <li>
                <strong>Azorhøytrykket:</strong> Konsekvens av <strong>Hadley-cellen</strong>. Luft stiger ved ekvator (ITCZ), avkjøles i høyden og synker rundt 30°N. Nedsynkende luft komprimeres, varmes adiabatisk og danner et stabilt høytrykksbelte med lite skyer og tørt klima.
              </li>
              <li>
                <strong>Islandslavtrykket:</strong> Et <em>dynamisk</em> lavtrykk. Det dannes av ekstratropiske sykloner langs <strong>polarfronten</strong>, der kald arktisk luft møter mild, fuktig subtropisk luftmasse.
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-medium tracking-tight text-primary">Den geostrofiske vindbalansen</h4>
            <p className="mt-1 text-sm sm:text-base">
              Vinden blåser vest–øst, ikke rett fra Azorene til Island, på grunn av{" "}
              <Link to="/tema/coriolis" className="text-primary underline-offset-2 hover:underline">Coriolis-kraften</Link>.
              Trykkgradientkraften nordover avbøyes mot høyre på den nordlige halvkule.
            </p>
            <p className="mt-2 text-sm sm:text-base">
              I den frie troposfæren oppstår tilnærmet likevekt mellom trykkgradient og Coriolis — den <strong>geostrofiske balansen</strong>:
            </p>
            <div className="my-3 rounded-lg border border-border/80 bg-card/80 p-3 text-center font-mono text-sm text-foreground">
              u_g = - (1 / (ρ · f)) · (∂P / ∂y)
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">
              <em>u_g</em> er sonal vestavind, <em>ρ</em> tetthet, <em>f = 2Ω sin φ</em>, <em>∂P/∂y</em> trykkgradient nord–sør. Jo brattere gradient mellom Azorene og Island, desto sterkere <em>må</em> vestavinden bli.
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
