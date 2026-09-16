import { ModelHierarchyNorwayDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function NorgesOperativeModellhierarkiFra() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Norges operative modellhierarki: Fra global ECMWF til MEPS og Norkyst
      </h2>
      <p>
        I et lite land som Norge, preget av stupbratte vestlandsfjorder, ville fjellplatåer og et
        enormt kystområde mot Norskehavet og Barentshavet, er det umulig å dekke alle behov med én
        enkelt modell. Meteorologisk institutt og Yr benytter derfor en elegant teknikk kalt{" "}
        <strong>nesting</strong> (arving av randbetingelser):
      </p>

      <ModelHierarchyNorwayDiagram />

      <p>Hierarkiet fungerer som en stafett fra global til lokal skala:</p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>1. ECMWF IFS (Global modell, ~9 km, 51 medlemmer):</strong> Kjøres ved det europeiske
          værsenteret i Bologna. Modellen dekker hele planeten og regner ut stormbaner, jetstrømmer og
          storskala høytrykk ut til 15 dager fram i tid.
        </li>
        <li>
          <strong>2. MEPS (Regional værmodell for Norden, 2,5 km, 30 medlemmer):</strong> Drives i et
          nordisk samarbeid (MetCoOp) mellom Norge, Sverige, Finland og Estland. MEPS kutter ut resten
          av kloden og fokuserer all regnekraft på Norden. Modellen henter storskala værdata langs sine
          yttergrenser (randbetingelser) fra ECMWF, men beregner det lokale været med 2,5 km
          oppløsning ut til 66 timer (Yr time-for-time). Med 2,5 km fanger MEPS opp fjordkanalisering
          av vind og konvektive byger eksplisitt (MET, u.å.-a).
        </li>
        <li>
          <strong>3. AROME-Arctic (Arktisk spesialmodell, 2,5 km):</strong> Dekker Svalbard,
          Barentshavet og havområdene opp mot Nordpolen. Modellen er spesialprogrammert for å håndtere
          grenselag over sjøis, ekstrem kulde og utviklingen av livsfarlige <em>polare lavtrykk</em>.
        </li>
        <li>
          <strong>4. Norkyst-800 (Kyst- og fjordhavmodell, 800 m):</strong> Henter time-for-time vind
          og lufttrykk fra MEPS og elvevannføring fra NVE. Simulerer strøm, overflatetemperatur,
          bølger og tidevann langs hele norskekysten med 800 meters oppløsning.
        </li>
      </ul>

      <OrdBoks
        ord="Nesting"
        barn="En modellteknikk der en finoppløst regional modell legges inni en grovere global modell og kontinuerlig mates med storskala vær langs yttergrensene (randbetingelser)."
      />
    </>
  );
}
