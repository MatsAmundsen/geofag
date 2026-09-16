import { Term, TermGrid } from "@/components/term";

export function ViktigeFagligeBegreper() {
  return (
    <>
      {/* BEGREPSREGISTER */}
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Viktige faglige begreper</h2>
      <TermGrid>
        <Term name="viskositet" def="en væskes indre friksjon og motstand mot å flyte; øker dramatisk med silikatinnhold (SiO₂) og synker med temperatur" />
        <Term name="stratovulkan" def="bratt, lagdelt vulkankjegle bygd opp av vekslende lag av viskøs andesittisk lava og tefra fra eksplosive utbrudd" />
        <Term name="skjoldvulkan" def="stor, slak vulkanbygning dannet av tyntflytende basaltisk lava som flyter over store avstander før den størkner" />
        <Term name="kaldera" def="kolossal sirkulær innsynkningsstruktur i jordskorpen dannet ved at taket over et delvis tømt magmakammer raser sammen" />
        <Term name="pyroklastisk strøm (PDC)" def="overopphetet lavine av gass, aske og stein (300–800 °C) som raser nedover vulkansider med hastigheter opptil 700 km/t" />
        <Term name="lahar" def="vulkansk slamstrøm dannet når fersk tefra blandes med smeltevann fra isbreer eller kraftig nedbør; flyter som våt betong" />
        <Term name="freatomagmatisme" def="eksplosivt utbrudd forårsaket av direkte kontakt mellom stigende magma og vann eller is (f.eks. Eyjafjallajökull)" />
        <Term name="VEI" def="Volcanic Explosivity Index (0–8); logaritmisk skala for utbruddsstyrke basert på utkastet tefravolum og søylehøyde" />
        <Term name="harmonisk tremor" def="kontinuerlig lavfrekvent seismisk resonans (1–5 Hz) skapt av turbulent strømning av magma og gass i sprekker" />
        <Term name="eksolusjon" def="utskilling av oppløst gass fra magma som bittesmå bobler (vesikler) når trykket synker under oppstigning" />
      </TermGrid>

    </>
  );
}
