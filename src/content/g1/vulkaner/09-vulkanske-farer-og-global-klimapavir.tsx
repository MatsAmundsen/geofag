import { VolcanicHazardsDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function VulkanskeFarerOgGlobalKlimapavir() {
  return (
    <>
      {/* SEKSJON 5: VULKANSKE FARER OG KLIMAPÅVIRKNING */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Vulkanske farer og global klimapåvirkning
        </h2>
        <p>
          I populærkulturen framstilles glødende lavastrømmer ofte som den fremste trusselen mot mennesker. I virkeligheten
          forårsaker lavastrømmer under 2 % av alle historiske vulkandødsfall, ettersom lava beveger seg langsomt nok
          (typisk få km/t) til at sivilbefolkningen kan evakueres til fots. De virkelige katastrofene skyldes helt andre mekanismer.
        </p>

        <VolcanicHazardsDiagram />

        <div className="space-y-3 pt-2">
          <h3 className="font-display text-xl font-medium tracking-tight text-primary">
            1. Pyroklastiske tetthetsstrømmer (PDC) — Naturens dødeligste storm
          </h3>
          <p>
            Dersom utbruddsraten øker så kraftig at askesøylen blir for tung og kald til å opprettholde konvektiv oppdrift,
            kollapser deler av søylen loddrett ned mot vulkanflanken. Dette genererer en
            <strong className="text-foreground"> pyroklastisk tetthetsstrøm</strong> (PDC, ofte kalt glødende askeskyer
            eller <em>nuée ardente</em>).
          </p>
          <p>
            En PDC er en fluidisert, turbulent lavine av overopphetet gass, pimpstein og pulverisert stein som suser nedover
            fjellsiden i hastigheter mellom <strong>200 og 700 km/t</strong> med temperaturer på <strong>300 til 800 °C</strong>.
            Ingen bil eller person kan rømme fra en slik strøm. Ved utbruddet på Mont Pelée på Martinique i 1902 utslettet en PDC
            byen Saint-Pierre på under to minutter; samtlige av byens 29 000 innbyggere (bortsett fra to overlevende) omkom av
            termisk sjokk og kvelning. Det var også en PDC som forseglet Pompeii i år 79 e.Kr.
          </p>

          <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
            2. Laharer — Vulkanske slamstrømmer med betongkraft
          </h3>
          <p>
            En <em>lahar</em> er en hurtigflytende blanding av vulkansk aske, stein og vann som følger elvedaler bort fra
            vulkanen. De utløses når glohet tefra brått smelter snø og isbreer på toppen av høye vulkaner, eller når tropisk
            styrtregn vasker løs ferske askelag.
          </p>
          <p>
            Med en densitet på opptil 2,0 g/cm³ har en lahar konsistens og destruktiv kraft som flytende våt betong. Den river
            med seg broer, skog og betongbygninger. Tragedien i Armero i Colombia (1985) er det grelleste eksempelet: Et beskjedent
            utbrudd på den snødekte vulkanen Nevado del Ruiz smeltet bare 10 % av isbreen på toppen, men dannet fire enorme laharer
            som raste 50 km nedover dalen og begravde byen Armero. Over 23 000 mennesker mistet livet på under to timer.
          </p>

          <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
            3. Vulkansk vinter: SO₂-aerosoler og global nedkjøling
          </h3>
          <p>
            Eksplosive vulkaner har evnen til å endre jordens globale energibalanse (Robock, 2000). Mens grovkornet aske faller
            ut av atmosfæren på dager og uker, forblir svoveldioksid (SO₂) i stratosfæren. Der reagerer SO₂ med vanndamp og danner
            mikroskopiske aerosoldråper av svovelsyre (H₂SO₄). Disse aerosolene sprer og reflekterer innkommende solstråling
            tilbake til verdensrommet, noe som fører til en markant reduksjon i solinnstrålingen ved jordoverflaten.
          </p>
          <p>
            Da vulkanen Tambora i Indonesia eksploderte i april 1815 (det største utbruddet i dokumentert historie, VEI 7;
            Oppenheimer, 2003), ble 100 millioner tonn svovelaerosoler pumpet inn i stratosfæren. Året etter, 1816, ble kjent
            over hele den nordlige halvkule som <em>«året uten sommer»</em>. Frost og snøvær i juli og august ødela kornavlingene
            i Europa og Nord-Amerika, og utløste den siste store hungersnøden i vestverdenen. Da Pinatubo på Filippinene hadde utbrudd
            i 1991, falt den globale gjennomsnittstemperaturen med om lag 0,5 °C i to sammenhengende år.
          </p>
        </div>

        <OrdBoks
          ord="Pyroklastisk strøm (PDC)"
          barn="En rasende sky av glohet gass (300–800 °C), aske og steinblokker som raser nedover vulkansidene i opptil 700 km/t. Umulig å rømme fra."
        />
        <OrdBoks
          ord="Lahar"
          barn="Vulkansk slamstrøm som oppstår når aske blandes med smeltevann fra breer eller kraftig regn. Har tyngde som våt betong og begraver dalbunner."
        />
        <OrdBoks
          ord="Vulkansk vinter"
          barn="Global nedkjøling forårsaket av mikroskopiske svovelsyreaerosoler i stratosfæren som reflekterer solstråling etter store, eksplosive utbrudd."
        />
      </section>

    </>
  );
}
