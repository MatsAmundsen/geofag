import { Callout } from "@/components/callout";

export function Seksjon() {
  return (
    <section className="space-y-4">
      <Callout title="De fire vanligste misforståelsene om trykk og vind på eksamen">
        <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/80">
          <li>
            <strong>1. «1013 hPa skiller høytrykk og lavtrykk»:</strong> Nei! 1013,25 hPa er bare et
            globalt statistisk gjennomsnitt. Trykk er alltid relativt til naboområdene.
          </li>
          <li>
            <strong>2. «Høytrykk betyr alltid varmt vær»:</strong> Nei! Om vinteren gir høytrykk
            skyfritt vær med ekstrem strålingsavkjøling, streng kulde og bakkeinversjoner over
            innlandet.
          </li>
          <li>
            <strong>3. «Vinden blåser rett inn mot sentrum av et lavtrykk»:</strong> Nei!
            Corioliskraften avbøyer luften 90° til høyre i fri atmosfære (geostrofisk vind). Bare
            nær bakken gjør friksjonen at vinden krysser isobarene i en beskjeden vinkel på 15–30°.
          </li>
          <li>
            <strong>4. Føn bryter inversjoner – katabatisk vind bygger dem:</strong> Føn er varm,
            tørr og turbulent og river opp stillestående kuldelokk i dalbunner. Katabatisk vind er
            en drenasje av tung kaldluft som samles i dalbunner og skaper dype, kalde
            temperaturinversjoner.
          </li>
        </ul>
      </Callout>
    </section>
  );
}
