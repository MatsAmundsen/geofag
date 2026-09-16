import { Term, TermGrid } from "@/components/term";

export function ViktigeBegreper() {
  return (
    <>
      <h2 className="pt-8 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term
          name="Corioliseffekten"
          def="Fiktiv treghetskraft som oppstår fordi vi observerer bevegelse fra en roterende jordklode. Avbøyer mot høyre på NH, mot venstre på SH, og er null ved ekvator."
        />
        <Term
          name="Coriolisparameteren (f)"
          def="f = 2Ω sin φ. Matematisk faktor for jordrotasjonens styrke ved en gitt breddegrad φ. Er 0 ved ekvator og 1,26 × 10⁻⁴ s⁻¹ i Norge."
        />
        <Term
          name="Treghetssystem (Inertialramme)"
          def="Referansesystem i ro eller med konstant rettlinjet hastighet (f.eks. stjernene/rommet), der Newtons bevegelseslover gjelder uten fiktive krefter."
        />
        <Term
          name="Geostrofisk vind"
          def="Vind i fri atmosfære der trykkgradientkraften og Corioliskraften er i perfekt balanse. Vinden blåser parallelt med isobarene."
        />
        <Term
          name="Buys Ballots lov"
          def="Regel: Står du med ryggen mot vinden på nordlig halvkule, har du lavtrykket til venstre for deg."
        />
        <Term
          name="Atmosfærisk grenselag"
          def="De nederste 1000 meterne av atmosfæren der bakkefriksjon bremser farten, svekker Coriolis og vrir vinden på skrå inn mot lavtrykk."
        />
        <Term
          name="Bakkekonvergens"
          def="Innstrømming av luft mot sentrum av et lavtrykk nær bakken, som tvinger luften til å stige og danner skyer og nedbør."
        />
        <Term
          name="Bakkedivergens"
          def="Utstrømming av luft fra sentrum av et høytrykk nær bakken, som suger tørr luft ned fra høyden (subsidens) og gir klarvær."
        />
        <Term
          name="Rossby-tallet (Ro)"
          def="Dimensjonsløst tall Ro = U / (f·L). Viser om et fenomen styres av Coriolis (Ro << 1, f.eks. stormer) eller treghet (Ro >> 1, f.eks. vasker)."
        />
        <Term
          name="Ekman-spiral"
          def="Strukturen i havets overflatelag der strømretningen dreier dypere nedover i en spiral som følge av vindstress og Corioliskraften."
        />
        <Term
          name="Ekman-transport"
          def="Netto vanntransport gjennom hele Ekman-laget, rettet 90° til høyre for vinden på nordlig halvkule."
        />
        <Term
          name="Kystoppvelling (Upwelling)"
          def="Oppstigning av kaldt, ekstremt næringsrikt dypvann langs kysten når vind og Ekman-transport skyver overflatevannet vekk fra land."
        />
      </TermGrid>
    </>
  );
}
