import { Term, TermGrid } from "@/components/term";

export function ViktigeBegreper() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Lufttrykk"
          def="Vekten av luftsøylen over et punkt. Standard havnivåtrykk er 1013,25 hPa."
        />
        <Term
          name="Isobar"
          def="Linje på værkartet som binder sammen steder med samme lufttrykk redusert til havnivå."
        />
        <Term
          name="Trykkgradient"
          def="Trykkforskjellen over en gitt avstand. Tette isobarer gir sterk vind."
        />
        <Term
          name="Konvergens"
          def="Luftstrømmer som samler seg horisontalt. Nær bakken tvinges luften da til å stige."
        />
        <Term
          name="Subsidens"
          def="Storskala, langsom nedsynking av luft i et høytrykk. Fører til adiabatisk oppvarming og skyoppløsning."
        />
        <Term
          name="Corioliskraften"
          def="Fiktiv avbøyningskraft som følge av jordrotasjonen. Avbøyer vind mot høyre på nordlig halvkule."
        />
        <Term
          name="Geostrofisk vind"
          def="Vind i fri atmosfære der trykkgradientkraft og Corioliskraft er i likevekt, parallelt med isobarene."
        />
        <Term
          name="Latent varme"
          def="Varmeenergi frigjort under kondensasjon (~2,5 MJ/kg). Fungerer som drivstoff for oppdrift i skyer."
        />
        <Term
          name="Solgangsbris"
          def="Døgnkretsløp langs kysten drevet av ulik varmekapasitet mellom hav og land, med returstrøm i høyden."
        />
        <Term
          name="Fønvind"
          def="Varm, knusktørr fallvind i le av fjellkjeder etter orografisk nedbør på losiden."
        />
        <Term
          name="Katabatisk vind"
          def="Kald, tung fallvind som renner nedover skråninger fra isbreer og snøplatåer drevet av tyngdekraften."
        />
        <Term
          name="Temperaturinversjon"
          def="Atmosfærisk tilstand der temperaturen stiger med høyden, vanlig i dalbunner under vinterhøytrykk."
        />
      </TermGrid>
    </section>
  );
}
