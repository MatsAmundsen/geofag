import { Term, TermGrid } from "@/components/term";

export function Nokkelbegreper() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        10. Nøkkelbegreper
      </h2>
      <p>
        Disse tolv begrepene utgjør kjernen i læreplanens krav til tolkning av værkart og
        værsystemer i Geofag 2:
      </p>
      <TermGrid>
        <Term
          name="Synoptisk kart"
          def="Værkart som viser samtidige meteorologiske observasjoner ved standardiserte UTC-terminer over et stort geografisk område."
        />
        <Term
          name="Isobar"
          def="Linje gjennom punkter med samme lufttrykk redusert til havnivå (MSLP). Tette isobarer indikerer sterk vind."
        />
        <Term
          name="Trykkgradient"
          def="Endring i lufttrykk per horisontale distanseenhet. Den fundamentale drivkraften bak all horisontal vindbevegelse."
        />
        <Term
          name="Varmfront"
          def="Front der lett varmluft glir slakt (1:150) opp over tilbaketrekkende kaldluft, kjennetegnet av Ci → Cs → As → Ns og jevn nedbør."
        />
        <Term
          name="Kaldfront"
          def="Front der tung kaldluft brøyter seg aggressivt (1:50) under varmluft, med cumulonimbus-skyer, kraftige byger og brått temperaturfall."
        />
        <Term
          name="Okklusjon"
          def="Frontstadium der den raskere kaldfronten tar igjen varmfronten og løfter den varme sektoren helt bort fra bakken."
        />
        <Term
          name="Varm sektor"
          def="Området med mild og fuktig luft mellom varmfronten og kaldfronten i en moden polarfrontsyklon."
        />
        <Term
          name="WMO-stasjonsmodell"
          def="Internasjonal koding av lokale observasjoner (oktas, vindpiler, temperatur, duggpunkt, trykk og tendens) i en samlet figur."
        />
        <Term
          name="Isohypse"
          def="Høydekote på et konstanttrykk-kart (f.eks. 500 hPa) som angir geopotensiell høyde i gpm."
        />
        <Term
          name="Styrestrøm"
          def="Den storskala vindstrømmen i midtre troposfære (500 hPa) som styrer forflytningen av bakkens lavtrykk med om lag halv hastighet."
        />
        <Term
          name="Reflektivitet (dBZ)"
          def="Logaritmisk måleenhet for radarsignal reflektert fra nedbørspartikler. Høy dBZ indikerer styrtregn, torden eller hagl."
        />
        <Term
          name="Veering (vinddreining)"
          def="Skifte av vindretning med urviseren (f.eks. fra sør til sørvest og nordvest), typisk på nordlig halvkule når lavtrykk passerer nord for stasjonen."
        />
      </TermGrid>
    </section>
  );
}
