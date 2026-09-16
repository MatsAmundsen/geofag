import { JetProfileDiagram } from "@/components/diagrams";

export function KlodensToJetbelterPolarfrontjeten() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Klodens to jetbelter: Polarfrontjeten og Den subtropiske jetstrømmen
      </h2>
      <p>
        I dagligtale snakker vi ofte om «jetstrømmen» i entall, men på hver halvkule finnes det{" "}
        <strong>to permanente jetbelter</strong> i troposfæren. De oppstår i helt ulike soner og
        drives av forskjellige mekanismer:
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-sky-300">
            <span>🌊</span> 1. Polarfrontjeten (PFJ)
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong>Posisjon:</strong> Ca. 50°–65°N, rett over <em>polarfronten</em>.
            </li>
            <li>
              <strong>Høyde:</strong> Typisk <strong>9–11 km</strong> (polar tropopause).
            </li>
            <li>
              <strong>Drivkraft:</strong> Den voldsomme horisontale temperaturkontrasten mellom
              iskald arktisk polarluft og mild subtropisk luft.
            </li>
            <li>
              <strong>Karakter:</strong> Ekstremt meandrerende og dynamisk. Det er denne jetstrømmen
              som <strong>styrer lavtrykkene, stormene og ruskeværet inn mot Norge</strong>!
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-amber-300">
            <span>☀️</span> 2. Den subtropiske jetstrømmen (STJ)
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong>Posisjon:</strong> Ca. 30°N/S, ved polgrensen til Hadleycellen.
            </li>
            <li>
              <strong>Høyde:</strong> Typisk <strong>13–16 km</strong> (tropisk tropopause).
            </li>
            <li>
              <strong>Drivkraft:</strong> Bevaring av vinkelmoment (spinn) fra luften som stiger ved
              ekvator og strømmer mot polene i høyden.
            </li>
            <li>
              <strong>Karakter:</strong> Betydelig mer stabil og rettlinjet. Ligger over jordens store
              ørkenbelter og hestebreddegrader; styrer monsuner og subtropisk vær.
            </li>
          </ul>
        </div>
      </div>

      <p>
        <strong>Hvorfor ligger de i forskjellig høyde? Tropopausens trappetrinn!</strong>
        Dette er en klassisk geofaglig observasjon: Fordi luften i tropene er gjennomvarm, utvider
        den seg og løfter den tropiske tropopausen helt opp til <strong>16–17 kilometers høyde</strong>.
        I Arktis er luften derimot iskald og sammentrykt, slik at den polare tropopausen bare ligger{" "}
        <strong>8–9 kilometer over bakken</strong>.
      </p>
      <p>
        I overgangssonene mellom sirkulasjonscellene oppstår det brå trappetrinn i tropopausen:
        Både polarfrontjeten og den subtropiske jeten sitter nøyaktig i disse «tropopausebruddene»!
      </p>

      <JetProfileDiagram />

      <p className="text-sm text-muted-foreground">
        <em>Merk skillet til polar natt-jet:</em> I stratosfæren over Arktis og Antarktis finnes det
        om vinteren en tredje jetstrøm, <em>polar natt-jeten</em> (Polar Night Jet). Den oppholder
        seg i 25–40 kilometers høyde over mørkelagte polare stratosfærelag og er koblet til
        polarvirvelen og ozonkjemi. Den må ikke forveksles med troposfærens jetstrømmer som styrer
        norsk vær.
      </p>
    </>
  );
}
