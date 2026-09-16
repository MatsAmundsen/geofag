import { SubgridParametrizationDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function ParametriseringFysikkenSomGjemmer() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Parametrisering: Fysikken som gjemmer seg under rutenettet
      </h2>
      <p>
        Uansett hvor kraftig superdatamaskin vi bygger, vil rutenettet alltid ha en nedre grense.
        Prosesser som foregår på en romlig skala som er mindre enn noen få rutenettceller, kalles{" "}
        <strong>sub-grid prosesser</strong> (inquiry-prosesser). Disse prosessene er fullstendig
        usynlige for de primære bevegelsesligningene.
      </p>
      <p>
        Ta en typisk tordensky (<em>Cumulonimbus</em>). Den kan være bare 2–4 km i tverrsnitt. I en
        global modell med 9 km oppløsning finnes det ikke et eneste punkt som kan «se» skyen. For
        modellen er rutenettcellen bare én enkelt homogen luftkube med ett gjennomsnittlig tall for
        temperatur og trykk. Likevel kan denne lille skyen transportere millioner av tonn med vanndamp
        fra bakken til 11 kilometers høyde, frigjøre gigantiske mengder latent varme og utløse lokalt
        styrtregn og lynnedslag!
      </p>
      <p>
        Løsningen er <strong>parametrisering</strong>: I stedet for å beregne skyen direkte,
        programmeres statistiske og fysiske hjelpeligninger som estimerer skyens samlede nettoeffekt på
        cellens gjennomsnittstilstand basert på storskala fuktighet og stabilitet.
      </p>

      <SubgridParametrizationDiagram />

      <p>I moderne værmodeller finnes det fire sentrale parametriseringsskjemaer:</p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-sky-300">1. Konveksjonsskjema</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Beregner oppdrift i ustabil luft, vertikal omrøring av varme og fuktighet, og frigjøring av
            latent varme (~2,5 MJ per kg kondensert vann). Hindrer at modellen bygger opp kunstig
            ekstrem ustabilitet. I konveksjonsløsende modeller (som MEPS 2,5 km) skrus dyp konveksjon
            av fordi gridet er fint nok til å løse skyene eksplisitt.
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-amber-300">2. Strålingsskjema</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Beregner hvordan innkommende kortbølget solstråling reflekteres fra skytopper (albedo) eller
            absorberes i bakken, samt hvordan langbølget infrarød stråling sendes ut og fanges opp av
            drivhusgasser (CO₂, H₂O, metan) og skybunn. Kjøres ofte hvert 15.–60. minutt for å spare
            regnekraft.
          </p>
        </div>
        <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-teal-300">3. Sky-mikrofysikk</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Beskriver de mikroskopiske prosessene inni skyen: hvordan vanndamp fester seg på
            aerosolkjerner (skydråpedannelse), dråpevekst ved koalesens (kollisjon), frysning til
            iskrystaller og vekst via Bergeron-prosessen i underkjølt luft, samt dannelse og smelting
            av snø og hagl på vei ned mot bakken.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-emerald-300">
            4. Grenselag og overflateprosesser
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Det nederste luftlaget (planetært grenselag / PBL, 0–2 km) er fylt med mekanisk og termisk
            turbulens. Her beregnes friksjonen mot ulikt terreng (skog, byer, åker, havbølger),
            fordampning fra vegetasjon og fuktig jord, samt varmeutveksling med snødekke og sjøis.
          </p>
        </div>
      </div>

      <OrdBoks
        ord="Parametrisering"
        barn="Forenklet matematisk representasjon av fysiske prosesser som foregår på en skala som er mindre enn rutenettets oppløsning (sub-grid prosesser)."
      />
    </>
  );
}
