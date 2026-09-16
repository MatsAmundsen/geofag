import { Term, TermGrid } from "@/components/term";

export function ViktigeBegreper() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Lufttrykk" def="Vekten av luftsøylen over et punkt. Standard havnivåtrykk er 1013,25 hPa." />
        <Term name="Isobar" def="Linje som binder steder med samme lufttrykk redusert til havnivå." />
        <Term name="Trykkgradient" def="Trykkforskjell over avstand. Tette isobarer gir sterk vind." />
        <Term name="Konvergens" def="Luft samles horisontalt og tvinges til å stige nær bakken." />
        <Term name="Subsidens" def="Nedsynking i høytrykk. Adiabatisk oppvarming og skyoppløsning." />
        <Term name="Geostrofisk vind" def="Trykkgradient og Coriolis i likevekt, parallelt med isobarene." />
        <Term name="Latent varme" def="Varme frigjort ved kondensasjon (~2,5 MJ/kg)." />
        <Term name="Solgangsbris" def="Døgnkretsløp langs kysten drevet av ulik varmekapasitet hav/land." />
        <Term name="Fønvind" def="Varm, tørr fallvind i le etter orografisk nedbør på losiden." />
        <Term name="Katabatisk vind" def="Kald fallvind fra isbreer og snøplatåer drevet av tyngdekraft." />
      </TermGrid>
    </>
  );
}
