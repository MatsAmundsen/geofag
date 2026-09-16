import { ThermalWindDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function FysikkenBakJetstrommenTermiskVin() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Fysikken bak jetstrømmen: Termisk vind og trykkflaters helling
      </h2>
      <p>
        Hvordan kan en temperaturforskjell langs bakken forvandle seg til en vanvittig vestavind
        ti kilometer oppe i luften? Forklaringen er en av meteorologiens mest elegante fysiske lover:{" "}
        <strong>termisk vind</strong>.
      </p>
      <p>
        La oss bygge mekanismen trinn for trinn fra termodynamiske prinsipper:
      </p>
      <ol className="list-decimal space-y-3 pl-6 text-foreground/90">
        <li>
          <strong>Hypsometrisk søyletykkelse:</strong> Luft er en gass som adlyder ideell gasslov.
          Varm luft har lavere tetthet og tar større plass; en varm luftsøyle er derfor{" "}
          <strong>høy og romslig</strong>. Kald luft trekker seg sammen og er tung; en kald luftsøyle
          er <strong>komprimert og lav</strong>.
        </li>
        <li>
          <strong>Trykkfall med høyden:</strong> Tenk deg at lufttrykket ved bakken er helt likt
          (1013 hPa) både i subtropene og over Arktis. I den kalde, tette luften faller trykket
          ekstremt raskt med høyden. I den varme, tynne luften faller trykket adskillig saktere.
        </li>
        <li>
          <strong>Trykkflatene heller brattere og brattere:</strong> Hvis vi tegner opp flaten der
          trykket er 500 hPa, ligger denne flaten rundt 5 700 meter over havet i subtropene, men bare
          5 200 meter over havet i Arktis. Fortsetter vi opp til 250 hPa (tropopausen), er
          høydeforskjellen blitt over 1 200 meter! Trykkflatene heller altså kraftigere og kraftigere
          nedover mot polen for hvert trinn vi stiger.
        </li>
        <li>
          <strong>Eksplosiv trykkgradientkraft i høyden:</strong> Hellingen på trykkflatene betyr at
          det oppstår et kolossalt overtrykk i høyden over tropene, og et tilsvarende undertrykk i
          høyden over Arktis. <strong>Trykkgradientkraften (F_pg) peker rett mot polen</strong>, og
          den blir sterkere jo høyere opp vi kommer.
        </li>
        <li>
          <strong>Coriolis fullfører verket:</strong> Idet luften akselererer mot polen i 10
          kilometers høyde, finnes det ingen bakkefriksjon som bremser farten. Corioliskraften
          avbøyer luftstrømmen 90° til høyre (på nordlig halvkule). Når trykkgradientkraften og
          Corioliskraften er i balanse (geostrofisk vind), blåser vinden nøyaktig parallelt med
          isobarene – <strong>rett fra vest mot øst som en jetstrøm!</strong>
        </li>
      </ol>

      <OrdBoks
        ord="Termisk vind"
        barn="Den vertikale endringen i geostrofisk vindhastighet som skyldes en horisontal temperaturgradient. Sterkere temperaturforskjell mellom pol og ekvator gir raskere jetstrøm i høyden."
      />

      <p>
        <strong>Hvorfor er vinden sterkest akkurat ved tropopausen?</strong>
        Så lenge vi befinner oss i troposfæren, er det varmest i sør og kaldest i nord. Dermed
        blir gradienten brattere og vinden sterkere for hver meter vi klatrer. Men over
        tropopausen – inne i stratosfæren – snur dette! Der absorberer ozonlaget solstråling, og den
        tropiske tropopausen er faktisk mye kaldere (-75 °C) enn den polare (-50 °C). Den horisontale
        temperaturgradienten snur, trykkflatenes helling flater ut, og vindhastigheten avtar igjen.
        Toppunktet for hastighet inntreffer dermed nøyaktig i overgangssonen: <strong>i jetkjernen</strong>.
      </p>

      <ThermalWindDiagram />
    </>
  );
}
