import { MeteorologicalBombDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function NorgesStormmaskinPolarfrontenOgEks() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        5. Norges stormmaskin: Polarfronten og eksplosiv syklonegenese («bomber»)
      </h2>
      <p>
        Selv om tropiske orkaner får mest medieoppmerksomhet, rammes Norge nesten utelukkende av en
        helt annen type lavtrykk: <strong>ekstratropiske sykloner</strong> på polarfronten.
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h4 className="font-display text-base font-bold text-amber-400">
            Tropisk syklon (Varmkjerne)
          </h4>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>• Dannes over homogent varmt hav (&gt; 26,5 °C) uten fronter.</li>
            <li>
              • Drives av <em>latent varme</em> fra kondensasjon.
            </li>
            <li>• Varmest i kjernen; trykkgradienten avtar med høyden.</li>
            <li>• Maksimal vind i grenselaget nær bakken (i øyveggen).</li>
            <li>• Symmetrisk sirkulær struktur med skyfritt øye.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h4 className="font-display text-base font-bold text-sky-400">
            Ekstratropisk lavtrykk (Kaldkjerne)
          </h4>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>• Dannes langs kollisjonssoner (polarfronten) med skarpe temperaturkontraster.</li>
            <li>
              • Drives av <em>baroklin instabilitet</em> og potensiell energi.
            </li>
            <li>• Kaldest i kjernen; trykkgradienten øker med høyden opp mot jetstrømmen.</li>
            <li>• Asymmetrisk struktur med distinkte varm-, kald- og okklusjonsfronter.</li>
            <li>• Kan oppnå orkan styrke i vindkastene over Nord-Europa.</li>
          </ul>
        </div>
      </div>

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Eksplosiv syklonegenese («Den meteorologiske bomben»)
      </h3>
      <p>
        Når et ekstratropisk lavtrykk intensiveres med ekstrem hastighet, omtales det internasjonalt
        som en <strong>meteorologisk bombe</strong> (Sanders & Gyakum, 1980). Det vitenskapelige
        kriteriet for en bombe er et sentraltrykkfall på minst{" "}
        <strong>24 hPa i løpet av 24 timer</strong> (korrigert for breddegrad ved formelen 24
        &times; (sin &phi; / sin 60&deg;) hPa).
      </p>
      <p>
        Dette skjer når en dyp atlantisk forstyrrelse treffer den{" "}
        <strong>venstre utgangskvadranten</strong> i en intens jetstreak i polarfrontjeten. Her
        suger storskala divergens i 9–10 km høyde luft ut av luftsøylen raskere enn ny luft klarer å
        strømme til ved bakken. Resultatet er et loddrett trykkras, ekstremt tette isobarer, og at
        vinden på kort tid øker fra laber bris til full storm og orkan langs kysten.
      </p>

      <OrdBoks
        ord="Meteorologisk bombe"
        barn="Et ekstratropisk lavtrykk der lufttrykket i sentrum faller med minst 24 hPa på 24 timer. Gir ekstrem trykkgradient og plutselig orkan langs norskekysten."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Sting jets og historiske norske orkaner
      </h3>
      <p>
        I de mest intense bombene kan det dannes en såkalt <strong>sting jet</strong>. Dette er en
        smal luftstrøm (typisk 20–50 km bred) som oppstår i midtre troposfære nær tuppen av det
        okkluderte skybåndet (som brodden på en skorpion). Når regn og snø fordamper i denne tørre
        luften, avkjøles den brått og akselererer ned mot bakken. Idet sting jeten treffer
        havoverflaten på sørsiden av lavtrykket, kan den utløse vindkast på over{" "}
        <strong>50–65 m/s (180–230 km/t)</strong>!
      </p>
      <p>Norge har opplevd flere historiske bombe-lavtrykk med sting jets:</p>
      <ul className="list-disc space-y-1 text-foreground/90 pl-6">
        <li>
          <strong>Nyttårsorkanen 1. januar 1992:</strong> Det mest beryktede uværet i moderne norsk
          historie. Lavtrykket stupte til 940 hPa, og på Svinøy fyr ble det målt middelvind på 46
          m/s og vindkast på hele <strong>62 m/s (223 km/t)</strong>. Skadene på Vestlandet og i
          Trøndelag beløp seg til milliarder av kroner.
        </li>
        <li>
          <strong>Ekstremværet Dagmar (2011):</strong> Feiet inn over Vestlandet 1. juledag og
          kuttet strøm- og telenettet for hundretusener av innbyggere.
        </li>
        <li>
          <strong>Ekstremværet Ingunn (februar 2024):</strong> Et monsterlavtrykk der det på Kvaløya
          i Sømna ble registrert en offisiell norgesrekord i vindkast på utrolige{" "}
          <strong>62,3 m/s</strong> (Meteorologisk institutt, u.å.-b).
        </li>
      </ul>

      <MeteorologicalBombDiagram />
    </>
  );
}
