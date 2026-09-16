import { NaoDiagram } from "@/components/diagrams";

export function KlimasvingningerOgStormbanerNaoO() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Klimasvingninger og stormbaner: NAO og arktisk forsterkning
      </h2>
      <p>
        Hvorfor er noen norske vintre milde, stormfulle og klissvåte, mens andre er knusktørre og
        iskalde fra desember til mars? Svaret ligger i hvordan storskala klimasvingninger flytter
        jetstrømmen over Nord-Atlanteren.
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        NAO: Sjefen for det norske vinterværet
      </h3>
      <p>
        Den viktigste klimaindeksen for Norge er <strong>Den nordatlantiske oscillasjon (NAO)</strong>{" "}
        (NOAA, u.å.-b). NAO måler trykkforskjellen mellom det subtropiske <strong>Azorhøytrykket</strong>{" "}
        og det subpolare <strong>Islandslavtrykket</strong>:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Positiv NAO-fase (+NAO):</strong> Både Azorhøytrykket og Islandslavtrykket er
          uvanlig kraftige. Trykkgradienten over Nord-Atlanteren er bratt, og polarfrontjeten blir
          ekstremt sterk og rettlinjet (zonal). Stormbanen legges i en rett motorvei rett inn mot
          Vestlandet og Midt-Norge. Resultatet er en klassisk <strong>mild, våt og stormfull norsk vinter</strong>,
          mens Middelhavet opplever tørke.
        </li>
        <li>
          <strong>Negativ NAO-fase (-NAO):</strong> Både Azorhøytrykket og Islandslavtrykket er
          svake. Trykkgradienten flater ut, og polarfrontjeten svekkes og begynner å meandrere i store
          Rossby-bølger eller blokkeres fullstendig. Stormbanen forskyves sørover mot Storbritannia og
          Middelhavet. Norge og Skandinavia havner i le eller under et polart tråg, noe som gir en{" "}
          <strong>bitende kald, tørr og stabil vinter</strong> med lite snø i lavlandet.
        </li>
      </ul>

      <NaoDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Endrer jetstrømmen seg med global oppvarming?
      </h3>
      <p>
        Et av de heteste forskningstemaene i moderne meteorologi er koblingen mellom global
        oppvarming og jetstrømmens oppførsel. Her må du som geofagelev være faglig nyansert og
        skille mellom hypoteser og etablert vitenskap:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Hypotesen om arktisk forsterkning (Francis &amp; Vavrus):</strong> Arktis varmes opp
          tre til fire ganger raskere enn det globale gjennomsnittet (blant annet fordi hvit sjøis
          smelter og erstattes av mørkt hav med lavere albedo). Hypotesen sier at når Arktis varmes mest,
          krymper temperaturgradienten mot tropene nær bakken. Ifølge loven om termisk vind skal da
          polarfrontjeten svekkes. En slappere jetstrøm meandrerer lettere i dype Rossby-bølger, noe
          som skulle gi flere fastlåste blokkeringer, lengre tørkeperioder og flere arktiske kuldeutbrudd.
        </li>
        <li>
          <strong>Hva sier FNs klimapanel (IPCC AR6)?</strong> IPCCs sjette hovedrapport vurderer
          denne hypotesen med <strong>lav konfidens</strong> for Nord-Atlanteren om vinteren (IPCC, 2021).
          Hvorfor? Fordi atmosfæren har to motstridende krefter: Samtidig som Arktis varmes ved bakken,
          varmes den tropiske <em>øvre troposfæren</em> opp kraftig som følge av økt fuktkonveksjon.
          Dermed <em>øker</em> temperaturgradienten i høyden! Disse to effektene drar jetstrømmen hver
          sin vei.
        </li>
        <li>
          <strong>Mindre blocking over Grønland i modellene:</strong> Klimamodellene viser faktisk at
          atmosfærisk blokkering over Grønland og Nord-Stillehavet forventes å <em>avta</em> i frekvens
          i scenarier med høye utslipp (middels konfidens). Det er derfor faglig feilaktig å påstå
          skråsikkert at «klimaendringene gir mer blokkering overalt».
        </li>
      </ul>
    </>
  );
}
