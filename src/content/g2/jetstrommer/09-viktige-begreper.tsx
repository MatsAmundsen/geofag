import { Term, TermGrid } from "@/components/term";

export function ViktigeBegreper() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">Viktige begreper</h2>
      <TermGrid>
        <Term name="Jetstrøm" def="Smalt belte med ekstrem vestavind i øvre troposfære over temperaturkontraster." />
        <Term name="Polarfrontjeten (PFJ)" def="Jet over polarfronten (9–11 km, 50°–65°N) som styrer stormbanene mot Norge." />
        <Term name="Subtropisk jet (STJ)" def="Jet nær 30° ved Hadleycellens polgrense (13–16 km)." />
        <Term name="Termisk vind" def="Geostrofisk vind øker med høyden når det er horisontal temperaturkontrast." />
        <Term name="Rossby-bølger" def="Planetære bølger på jetstrømmen fra variasjon i Coriolis med breddegrad." />
        <Term name="Zonal strøm" def="Rett vest–øst-strøm med raske lavtrykkspassasjer." />
        <Term name="Meridional strøm" def="Bølgende jet nord–sør med tråg og rygger." />
        <Term name="Venstre utløp" def="Kvadrant foran jetkjernen på nordsiden der divergens dypner lavtrykk." />
        <Term name="Omega-blokk" def="Høytrykk som deler jetstrømmen og låser været i ukevis." />
        <Term name="NAO" def="Trykksvingning Azorene–Island som styrer jetens bane over Norge." />
      </TermGrid>
    </>
  );
}
