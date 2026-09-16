import { Term, TermGrid } from "@/components/term";

export function ViktigeBegreper() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Tropisk syklon"
          def="Varmkjerne-lavtrykk over tropisk hav (>26,5 °C) drevet av kondensasjonsvarme og formet av Coriolis. Fellesbetegnelse for orkan, tyfon og syklon."
        />
        <Term
          name="Øyveggen (Eyewall)"
          def="Loddrett ring av cumulonimbusskyer rundt orkanens øye, der vindhastighet, oppdrift og nedbør når sitt absolutte maksimum."
        />
        <Term
          name="Saffir-Simpson-skalaen"
          def="Klassifiseringsskala for tropiske orkaner fra Kategori 1 (119 km/t) til Kategori 5 (≥252 km/t) basert på 1-minutts vedvarende vind."
        />
        <Term
          name="Supercelle"
          def="Et spesielt organisert, langlivet tordenvær med en kontinuerlig roterende oppdriftskjerne (mesosyklon), opphavet til de mest voldsomme tornadoene."
        />
        <Term
          name="Mesosyklon"
          def="Roterende oppdriftskjerne i en supercelle (3–10 km bred) dannet ved at vertikal vindskjæring vippes opp i vertikalplanet."
        />
        <Term
          name="Enhanced Fujita-skalaen"
          def="Skala for klassifisering av tornadoer fra EF0 (105 km/t) til EF5 (>322 km/t) basert på detaljert skadeanalyse av 28 indikatorer."
        />
        <Term
          name="Meteorologisk bombe"
          def="Et ekstratropisk lavtrykk med eksplosiv dypning, definert ved et sentraltrykkfall på minst 24 hPa på 24 timer."
        />
        <Term
          name="Sting jet"
          def="En smal stråle av ekstrem luft som akselererer ned fra midtre troposfære på sørsiden av en meteorologisk bombe, og gir vindkast over 60 m/s."
        />
        <Term
          name="Polart lavtrykk"
          def="Kompakt, intenst arktisk lavtrykk (150–300 km) som oppstår når kald polarluft strømmer over åpent, varmt havvann (kaldluftsutbrudd)."
        />
        <Term
          name="Atmosfærisk elv (AR)"
          def="Smalt, langstrakt fukttog i nedre troposfære som frakter enorme mengder subtropisk vanndamp mot våre breddegrader."
        />
        <Term
          name="Orografisk nedbør"
          def="Nedbør som utløses når fuktig luft tvinges oppover av en fjellkjede, med adiabatisk avkjøling og kondensasjon på losiden."
        />
        <Term
          name="Stormflo"
          def="Unormal heving av havoverflaten forårsaket av samspillet mellom astronomisk springflo, invers barometereffekt, vindstuv og bølgeoppstuvning."
        />
        <Term
          name="Invers barometereffekt"
          def="Prinsippet om at havoverflaten heves med ca. 1 cm for hver 1 hPa lufttrykket faller under standardatmosfæren (1013,25 hPa)."
        />
        <Term
          name="Tilskrivingsforskning"
          def="Vitenskapelig metodikk (bl.a. World Weather Attribution) for å beregne hvor mye klimaendringene endret sannsynligheten for en konkret ekstremhendelse."
        />
      </TermGrid>
    </>
  );
}
