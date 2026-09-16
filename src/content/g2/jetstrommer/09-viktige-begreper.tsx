import { Term, TermGrid } from "@/components/term";

export function ViktigeBegreper() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Jetstrøm"
          def="Smalt, rørformet belte med ekstrem vestavind i øvre troposfære (150–400 km/t), dannet over store temperaturkontraster."
        />
        <Term
          name="Polarfrontjeten (PFJ)"
          def="Meandrerende jetstrøm over polarfronten (9–11 km høyde, 50°–65°N) som styrer lavtrykkene og stormbanene mot Norge."
        />
        <Term
          name="Subtropisk jet (STJ)"
          def="Stabil jetstrøm nær 30° bredde ved Hadleycellens polgrense (13–16 km høyde), drevet av vinkelmoment fra ekvator."
        />
        <Term
          name="Termisk vind"
          def="Loven om at geostrofisk vind øker oppover så lenge det er en horisontal temperaturkontrast. Brattere trykkflater gir sterkere vind."
        />
        <Term
          name="Rossby-bølger"
          def="Planetære bølger på jetstrømmen skapt av variasjon i Corioliskraft med breddegrad og topografiske barrierer."
        />
        <Term
          name="Zonal strøm"
          def="Rettlinjet vest-øst-strøm langs breddegradene som gir raske lavtrykkspassasjer og mildt, skiftende atlantisk vestavær."
        />
        <Term
          name="Meridional strøm"
          def="Kraftig bølgende jetstrøm nord-sør med dype tråg (polare kuldeutbrudd) og rygger (subtropiske hetebølger)."
        />
        <Term
          name="Jetkjerne (Jet streak)"
          def="Lokalt segment inne i jetstrømmen med maksimal vindhastighet, der aldersofisk vind skaper divergens og konvergens."
        />
        <Term
          name="Venstre utløp (Left exit)"
          def="Kvadranten foran jetkjernen på nordsiden der divergens i høyden suger opp luft og dypner eksplosive lavtrykk ved bakken."
        />
        <Term
          name="Omega-blokk (Ω)"
          def="Atmosfærisk blokkering der et mektig høytrykk deler jetstrømmen i to som en Ω, og låser været i ukevis (tørke eller kulde)."
        />
        <Term
          name="Stormbane"
          def="Hovedsporet som vandrende lavtrykk følger over Nord-Atlanteren, styrt av polarfrontjetens posisjon."
        />
        <Term
          name="NAO (Nordatlantisk oscillasjon)"
          def="Trykksvingning mellom Azorene og Island som bestemmer jetstrømmens styrke og bane over Norge."
        />
      </TermGrid>
    </>
  );
}
