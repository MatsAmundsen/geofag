import { Callout } from "@/components/callout";

export function Eksamen() {
  return (
    <>
      <Callout title="Til eksamen">
        <p>
          På eksamen i Geofag 2 må du kunne gjøre rede for den fullstendige årsakskjeden for begge
          faser av NAO:
        </p>
        <p className="mt-2">
          <strong>Årsakskjede for Positiv NAO (NAO+):</strong>
          <br />
          <strong>
            1. Dypt Islandslavtrykk + kraftig Azorhøytrykk → 2. Bratt trykkgradient (stor ΔP) →
            3. Sterk geostrofisk balanse gir rask, rett og sonal polarjet (~60°N) → 4. Stormbanen
            peker direkte mot Norskehavet og Vestlandet → 5. Milde, fuktige atlantiske luftmasser gir
            orografisk forsterket regn ved kysten, store snømengder i fjellet og vekst på maritime
            breer → 6. Sør-Europa og Middelhavet blokkeres og opplever vintertørke.
          </strong>
        </p>
        <p className="mt-2">
          <strong>Årsakskjede for Negativ NAO (NAO−):</strong>
          <br />
          <strong>
            1. Svakt Islandslavtrykk + svakt Azorhøytrykk → 2. Slak trykkgradient (liten ΔP) →
            3. Svekket vestavind gjør polarjeten ustabil, den meandrerer i store Rossby-bølger →
            4. Kvasistasjonært blokkerende høytrykk (Omega-blokkering) legger seg over Skandinavia →
            5. Kald, tørr arktisk/sibirsk kontinentalluft trekkes inn over Norge (streng kulde,
            klarvær, inversjon og strømkrise) → 6. Stormbanen presses sørover og gir milde lavtrykk
            og flom i Middelhavet.
          </strong>
        </p>
        <p className="mt-2">
          <strong>Sensorfavoritter:</strong>
          <br />
          • Forklar <em>«seesaw»-effekten</em>: Hvorfor opplever Vest-Grønland unormal varme når
          Norge har sprengkulde under NAO−? (Fordi høytrykket over Norden pumper mild atlantisk luft
          nordover på sin vestside mot Davisstredet).
          <br />
          • Forklar rollen til <em>SSW (Sudden Stratospheric Warming)</em>: Hvorfor kan en
          oppvarming i stratosfæren 30 km over Nordpolen varsle sprengkulde i Norge 2–4 uker senere?
        </p>
      </Callout>
      <Callout title="Vanlige misforståelser">
        <p>
          <em>NAO er ikke en havstrøm!</em> En svært vanlig elevfeil er å forveksle NAO med
          Golfstrømmen eller AMOC. NAO er et <strong>atmosfærisk trykkmønster</strong> (vind og lufttrykk).
          Atmosfæren og havstrømmene påvirker hverandre gjensidig, men NAO er ikke vann i bevegelse.
        </p>
        <p>
          <em>Positiv NAO betyr ikke varmere vær over hele Europa.</em> NAO+ gir mildt vær i
          Nordvest-Europa, men kjøligere og tørrere forhold i Middelhavsområdet.
        </p>
        <p>
          <em>NAO-indeksen måler trykkforskjell, ikke temperatur.</em> Selv om den styrer temperatur
          og nedbør i Norge, er selve indeksen definert av <strong>lufttrykket ved havnivå</strong>{" "}
          (hPa) mellom to geografiske punkter.
        </p>
        <p>
          <em>Telekoblinger er statistiske tendenser, ikke bastante garantier.</em> Selv om El Niño
          øker sannsynligheten for NAO−, kan kaotiske lokale værforstyrrelser i Atlanteren overstyre
          signalet i enkeltmåneder.
        </p>
      </Callout>
    </>
  );
}
