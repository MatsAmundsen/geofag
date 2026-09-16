import { Term, TermGrid } from "@/components/term";

export function ViktigeFagligeBegreper() {
  return (
    <>
      {/* BEGREPSREGISTER */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Viktige faglige begreper</h2>
      <TermGrid>
        <Term
          name="elastisk tilbakefjæring"
          def="Reids teori for jordskjelv der bergarter bøyes elastisk langs en låst forkastning inntil friksjonslåsen brister og fjellet spretter tilbake"
        />
        <Term
          name="hyposenter (fokus)"
          def="det eksakte bruddpunktet i jordskorpen der jordskjelvets seismiske energi først utløses"
        />
        <Term
          name="episenter"
          def="punktet på jordoverflaten som ligger loddrett over jordskjelvets hyposenter"
        />
        <Term
          name="P-bølge"
          def="primær kompresjonsbølge (lengdebølge); raskeste seismiske bølge (~6–8 km/s) som kan gå gjennom både fast stoff og væske"
        />
        <Term
          name="S-bølge"
          def="sekundær skjærbølge (tverrbølge); krever skjærstivhet (μ > 0) og kan derfor IKKE forplante seg gjennom væsker"
        />
        <Term
          name="momentmagnitude (Mw)"
          def="det moderne fysiske målet på jordskjelvenergi, beregnet direkte fra forkastningsareal, forskyvning og bergartens stivhet"
        />
        <Term
          name="Wadati-Benioff-sone"
          def="en skrå sone av dype jordskjelv (helt ned til 700 km dyp) i en subduksjonssone der en kald havbunnsplate presses ned i mantelen"
        />
        <Term
          name="intraplate-jordskjelv"
          def="jordskjelv som oppstår inne på en litosfæreplate langt unna aktive plategrenser (som jordskjelv i Norge)"
        />
        <Term
          name="shoaling"
          def="bølgeoppstuing: når en tsunami nærmer seg kysten, synker farten, bølgelengden krymper, og høyden vokser dramatisk"
        />
        <Term
          name="Eurokode 8"
          def="europeisk byggestandard (NS-EN 1998-1) med krav til seismisk dimensjonering og jordskjelvsikring av byggverk"
        />
        <Term
          name="baseisolering"
          def="seismisk sikringsmetode der byggverk frikoples fra bakkerystelser ved hjelp av fleksible gummilagre under fundamentet"
        />
        <Term
          name="jordlikvifaksjon"
          def="fenomen der vannmettet sand/silt mister all skjærstyrke og oppfører seg som flytende væske under seismisk rystelse"
        />
        <Term
          name="seismisk fare"
          def="den fysiske sannsynligheten og styrken av jordskjelv i et område, uavhengig av menneskelig eksponering"
        />
        <Term
          name="seismisk risiko"
          def="kombinasjonen av seismisk fare, sårbarhet i bebyggelse/infrastruktur og eksponering av befolkning og verdier"
        />
      </TermGrid>

    </>
  );
}
