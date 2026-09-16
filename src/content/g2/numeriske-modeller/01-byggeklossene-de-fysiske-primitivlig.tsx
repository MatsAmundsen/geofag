import { PrimitiveEquationsDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function ByggeklosseneDeFysiskePrimitivlig() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Byggeklossene: De fysiske primitivligningene og tidssteg
      </h2>
      <p>
        En utbredt misforståelse blant elever er troen på at værvarsler lages ved at en datamaskin
        leter etter «lignende historiske værkart» i et arkiv. Slik fungerer ikke fysikkbaserte
        modeller. En numerisk modell løser et sett med eksakte, universelle fysiske bevaringslover,
        kjent som <strong>primitivligningene</strong> (ECMWF, u.å.; MET, u.å.-a):
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Bevegelsesligningen (Navier-Stokes / Newtons 2. lov):</strong> Beskriver
          akselerasjonen til luft- og vannpakker (F = m · a). Summen av kreftene per
          masseenhet – trykkgradientkraften, Corioliskraften, gravitasjonen og molekylær/turbulent
          bakkefriksjon – bestemmer hvordan vindens fart og retning (u, v, w) endrer seg.
        </li>
        <li>
          <strong>Kontinuitetsligningen (Massebevaring):</strong> Masse kan verken oppstå fra
          ingenting eller forsvinne i luften. Hvis luft strømmer sammen horisontalt i et lavtrykk
          (konvergens), <em>må</em> luften presses vertikalt oppover for at den totale massen skal
          bevares.
        </li>
        <li>
          <strong>Termodynamikkens 1. lov (Energibevaring):</strong> Endring i en luftpakkes
          temperatur styres av to prosesser: <em>adiabatiske prosesser</em> (oppvarming ved
          nedsynking og kompresjon, avkjøling ved heving og ekspansjon) og <em>diabatiske prosesser</em>{" "}
          (opptak eller tap av varmeenergi fra solstråling, langbølget stråling eller latent varme
          frigjort når vanndamp kondenserer til skydråper).
        </li>
        <li>
          <strong>Tilstandsligningen (Ideell gasslov):</strong> Knytter lufttrykk (p), tetthet
          (ρ) og absolutt temperatur (T) sammen gjennom formelen p = ρ R T, der R er den
          spesifikke gasskonstanten for luft.
        </li>
        <li>
          <strong>Den hydrostatiske ligningen:</strong> I storskala vær er det tilnærmet balanse
          mellom den oppoverrettede vertikale trykkgradientkraften og den nedoverrettede
          tyngdekraften (∂p / ∂z = -ρ g). Dette betyr at lufttrykket i enhver
          høyde nøyaktig tilsvarer vekten av den overliggende luftsøylen.
        </li>
        <li>
          <strong>Fuktighetsligningen (Massebevaring for vann):</strong> Sporer mengden vanndamp (q),
          flytende skydråper (q_c), iskrystaller (q_i) og nedbørspartikler (regn, snø, hagl), samt
          faseskiftene mellom dem.
        </li>
      </ol>

      <PrimitiveEquationsDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Tidsstegintegrasjon og CFL-stabilitetskriteriet
      </h3>
      <p>
        Fordi disse ligningene er <em>ikke-lineære</em> (vinden frakter luftmasser som selv har en
        hastighet som påvirker vinden videre), finnes det ingen matematisk formel som gir en eksakt,
        analytisk løsning for fremtiden. Løsningen må <strong>integreres numerisk fremover i tid</strong>{" "}
        ved hjelp av små tidssteg (Δt):
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          Ved starttidspunktet t₀ kjenner modellen tilstanden i alle rutenettpunkter (u, v, w, T,
          p, q).
        </li>
        <li>
          Superdatamaskinen setter disse verdiene inn i primitivligningene og regner ut den momentane
          endringsraten – tendensen – for hver variabel (∂u / ∂t, ∂T / ∂t, osv.).
        </li>
        <li>
          Ny tilstand etter ett tidssteg regnes ut ved enkel fremskrivning:{" "}
          <em>ny tilstand = gammel tilstand + (tendens · Δt)</em>.
        </li>
        <li>
          Prosessen gjentas hundretusenvis av ganger: fra 1 minutt til 2 minutter, videre til 3
          minutter, helt til et fullt 10-dagers varsel er fullført.
        </li>
      </ul>
      <p>
        Hvorfor kan vi ikke bare ta kjempeskritt i tid, for eksempel 12 timer per tidssteg, for å spare
        regnekraft? Svaret ligger i <strong>Courant-Friedrichs-Lewy (CFL)-kriteriet</strong>: For at
        beregningene skal være numerisk stabile, kan ikke informasjonen (vindhastigheten u eller
        akustiske/gravitasjonsbølger) forflytte seg lenger enn én enkelt rutenettcelle (Δx) i
        løpet av ett tidssteg (C = u · Δt / Δx ≤ 1). Hvis tidssteget er for langt,
        rekker informasjonen å «hoppe over» en hel celle uten å bli beregnet. Da oppstår vill numerisk
        resonans, feilene eksploderer mot uendelig på sekunder, og superdatamaskinens modell krasjer!
      </p>

      <OrdBoks
        ord="CFL-kriteriet (Courant-Friedrichs-Lewy)"
        barn="Et matematisk krav til numerisk stabilitet: Tidssteget Δt må være kortere enn tiden det tar for en luftpakke eller bølge å krysse én rutenettcelle Δx (u·Δt/Δx ≤ 1)."
      />
    </>
  );
}
