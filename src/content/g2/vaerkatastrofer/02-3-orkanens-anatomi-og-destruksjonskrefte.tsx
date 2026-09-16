import { OrdBoks } from "@/components/term";
import { HurricaneSpinModel } from "@/components/models/hurricane-spin-model";

export function OrkanensAnatomiOgDestruksjonskrefte() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        3. Orkanens anatomi og destruksjonskrefter
      </h2>
      <p>
        En fullt utviklet orkan er et mesterverk av atmosfærisk organisering. Systemet kjennetegnes av tre hovedsoner:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>1. Øyet (The Eye):</strong> Orkanens rolige senter, vanligvis 20–50 km i diameter.
          Her er lufttrykket på sitt absolutte minimum (i ekstreme tilfeller under 900 hPa). Likevel
          er det nesten vindstille, og himmelen er ofte delvis skyfri. Årsaken er at luften i øyet
          synker langsomt (subsidens). På vei ned varmes luften adiabatisk, den relative
          luftfuktigheten stuper, og skydråpene fordamper.
        </li>
        <li>
          <strong>2. Øyveggen (The Eyewall):</strong> Den loddrette ringen av ruvende
          cumulonimbus-skyer som omkranser øyet. Her raser orkanens sterkeste vedvarende vinder, de
          kraftigste vindkastene og den mest voldsomme oppdriften. Det er i øyveggen den latente
          energien frigjøres med maksimal styrke. I de kraftigste orkanene oppstår ofte{" "}
          <em>øyveggsutskiftninger</em> (eyewall replacement cycles), der en ytre ring av regnbånd
          snurper seg sammen og kveler den opprinnelige øyveggen, noe som fører til midlertidig
          svekkelse etterfulgt av ny intensivering.
        </li>
        <li>
          <strong>3. Spiralformede regnbånd (Spiral Rainbands):</strong> Buede bånd av tordenskyer
          som kveiler seg inn mot øyveggen. Båndene bringer skiftende perioder med styrtregn og
          kuling, og kan ofte generere lokale, kortvarige tornadoer når orkanen treffer land.
        </li>
      </ul>

      <OrdBoks
        ord="Øyet og øyveggen"
        barn="Øyet er orkanens sentrale kjerne med synkende luft, lavt trykk og vindstille. Øyveggen er den loddrette skyringen rundt øyet der oppdriften, nedbøren og vindhastigheten når sitt absolutte maksimum."
      />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        De tre destruktive kreftene
      </h3>
      <p>
        Når en orkan gjør landkjenning (landfall), rammes kysten av tre parallelle
        ødeleggelsesmekanismer:
      </p>
      <ol className="list-decimal space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Stormflo (Storm Surge):</strong> Havet heves og presses inn over land. Dette er
          den historisk desidert dødeligste faktoren i tropiske orkaner (over 85 % av dødsfallene i
          orkanen Katrina i 2005 skyldtes drukning som følge av stormflo og brudd på dikene).
        </li>
        <li>
          <strong>Ekstrem ferskvannsflom (Inland Flooding):</strong> Tropiske sykloner bærer
          kolossale vannmengder. Når en orkan bremser opp over land, kan regnbåndene dumpe over
          500–1000 mm nedbør på få døgn (som under orkanen Harvey over Texas i 2017).
        </li>
        <li>
          <strong>Ekstremvind og prosjektiler:</strong> Vindens mekaniske trykk mot bygninger øker
          med kvadratet av vindhastigheten (P ∝ v²), mens den kinetiske energioverføringen
          øker med kuben (E ∝ v³). En orkan med 250 km/t vind utøver derfor opptil fire
          ganger større vindtrykk mot vegger og tak enn en orkan med 125 km/t!
        </li>
      </ol>

      <HurricaneSpinModel />
    </>
  );
}
