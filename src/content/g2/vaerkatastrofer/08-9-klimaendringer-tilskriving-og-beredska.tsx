import { ClimateRiskShiftDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function KlimaendringerTilskrivingOgBeredska() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        9. Klimaendringer, tilskriving og beredskap
      </h2>
      <p>
        Et av de vanligste spørsmålene elever stiller i geofag er:{" "}
        <em>«Skyldes denne orkanen eller denne flommen global oppvarming?»</em>
      </p>
      <p>
        Det vitenskapelige svaret er verken et enkelt ja eller et enkelt nei. Været oppstår i et
        kaotisk system, og vi har alltid hatt stormer, flommer og tørke. Men klimaendringene endrer
        selve de fysiske rammene systemet opererer innenfor. Bildelig talt har vi{" "}
        <strong>ladet terningen</strong>: Terningen har fortsatt seks sider, men sekseren faller
        oftere, og terningen har fått et nytt, uventet tall i den ekstreme enden (IPCC, 2021).
      </p>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Forskyvning av sannsynlighetsfordelingen
      </h3>
      <p>
        Diagrammet nedenfor illustrerer den statistiske mekanismen: En beskjeden økning i
        gjennomsnittstemperaturen forskyver hele den statistiske Gauss-fordelingen (bjellekurven)
        svakt mot høyre. Legg merke til hva som skjer i den ytterste høyre <strong>halen</strong>:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          Sannsynligheten for det som tidligere var «en-gang-i-århundret-ekstremvær» øker ikke med
          noen få prosent, men <strong>mangedobles</strong>!
        </li>
        <li>
          Terskelen brytes for helt nye, tidligere umulige ekstremrekorder i temperatur, tørke og
          nedbørsintensitet.
        </li>
      </ul>

      <ClimateRiskShiftDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Tilskrivingsforskning (Event Attribution)
      </h3>
      <p>
        Tidligere kunne klimaforskere bare uttale seg om langsiktige trender. I dag har
        forskningsfeltet <strong>tilskrivingsforskning (Attribution Science)</strong>, ledet an av
        nettverk som <em>World Weather Attribution (WWA)</em>, gjort det mulig å kvantifisere
        klimaendringenes konkrete fingeravtrykk på individuelle ekstremhendelser få dager etter at
        de inntreffer (WWA, u.å.).
      </p>
      <p>Metodikken fungerer slik:</p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>Forskerne definerer hendelsen (f.eks. 3-døgns nedbørsmengde under flommen «Hans»).</li>
        <li>
          De kjører tusenvis av simuleringer i høyoppløselige klimamodeller i to parallelle
          verdener:
          <br />
          A) <em>Dagens faktiske verden:</em> Med observerte nivåer av CO₂ og andre klimagasser
          (~425 ppm).
          <br />
          B) <em>En hypotetisk verden som kunne ha vært:</em> Samme atmosfære, men uten
          menneskeskapte klimagassutslipp (førindustrielt nivå ~280 ppm).
        </li>
        <li>
          Ved å sammenligne sannsynligheten i de to verdenene, beregnes en{" "}
          <strong>Risk Ratio (RR)</strong>:
          <br />
          <span className="font-mono font-bold text-primary">
            {"RR = P(med klimaendring) / P(uten klimaendring)"}
          </span>
          <br />
          Dersom RR = 4, betyr det at den konkrete hetebølgen eller ekstremnedbøren ble gjort fire
          ganger mer sannsynlig som følge av menneskeskapt oppvarming.
        </li>
      </ol>

      <OrdBoks
        ord="Tilskrivingsforskning (Event Attribution)"
        barn="Vitenskapelig metode som bruker klimamodeller og observasjoner til å beregne hvor mye mer sannsynlig eller intens en konkret ekstremværhendelse ble som følge av menneskeskapte klimaendringer."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Varsling, beredskap og klimatilpasning i Norge
      </h3>
      <p>
        Siden vi ikke kan stoppe naturkreftene, må samfunnet redusere sin <strong>sårbarhet</strong>{" "}
        og øke sin beredskap:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Fargekodede farevarsler (MET og NVE):</strong> Værvarslene i Norge graderes etter
          konsekvens:
          <ul className="list-disc pl-6 space-y-1 mt-1 text-sm text-muted-foreground">
            <li>
              <strong className="text-amber-400">Gult nivå:</strong> Moderat fare; vær oppmerksom.
            </li>
            <li>
              <strong className="text-orange-400">Oransje nivå:</strong> Stor fare; vær forberedt på
              alvorlige skader og stengte veier.
            </li>
            <li>
              <strong className="text-red-500">Rødt nivå (Ekstremvær):</strong> Ekstrem fare;
              omfattende ødeleggelser, livsfare og nasjonal beredskap. Ekstremværet får eget navn.
            </li>
          </ul>
        </li>
        <li>
          <strong>Arealplanlegging og TEK17:</strong> Plan- og bygningsloven forbyr bygging i 100-
          og 200-års flomsoner og skredutsatt terreng uten sikringstiltak.
        </li>
        <li>
          <strong>Klimatilpasning:</strong> Byer må åpne bekker i rør (gjenåpning), etablere regnbed
          og fordrøyningsbassenger for å ta unna styrtregn, og bygge høyere flomvoller og
          stormflomurer langs utsatte havner.
        </li>
      </ul>
    </>
  );
}
