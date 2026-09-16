import { Term, TermGrid } from "@/components/term";

export function ViktigeFagligeBegreper() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Viktige faglige begreper</h2>
      <TermGrid>
        <Term name="viskositet" def="en væskes indre friksjon og motstand mot å flyte; øker dramatisk med silikatinnhold (SiO₂) og synker med temperatur" />
        <Term name="stratovulkan" def="bratt, lagdelt vulkankjegle bygd opp av vekslende lag av viskøs andesittisk lava og tefra" />
        <Term name="skjoldvulkan" def="stor, slak vulkanbygning dannet av tyntflytende basaltisk lava" />
        <Term name="kaldera" def="kolossal sirkulær innsynkningsstruktur dannet når taket over et delvis tømt magmakammer raser sammen" />
        <Term name="pyroklastisk strøm (PDC)" def="overopphetet lavine av gass, aske og stein (300–800 °C) som raser nedover vulkansider" />
        <Term name="lahar" def="vulkansk slamstrøm når fersk tefra blandes med smeltevann eller kraftig nedbør" />
        <Term name="freatomagmatisme" def="eksplosivt utbrudd ved kontakt mellom stigende magma og vann eller is" />
        <Term name="VEI" def="Volcanic Explosivity Index (0–8); logaritmisk skala for utbruddsstyrke" />
        <Term name="harmonisk tremor" def="kontinuerlig lavfrekvent seismisk resonans (1–5 Hz) fra turbulent magma- og gassstrøm" />
        <Term name="eksolusjon" def="utskilling av oppløst gass fra magma som bobler når trykket synker" />
      </TermGrid>
    </>
  );
}
