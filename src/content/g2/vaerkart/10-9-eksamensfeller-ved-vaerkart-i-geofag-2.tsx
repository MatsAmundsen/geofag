import { Callout } from "@/components/callout";

export function EksamensfellerVedVaerkartIGeofag() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        9. Eksamensfeller ved værkart i Geofag 2
      </h2>
      <Callout title="De 4 vanligste eksamensfellene – Dette trekker sensor for!">
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-rose-600 dark:text-rose-400">
              Felle 1: Å tro at et lavtrykk per definisjon må være under 1013 hPa.
            </strong>
            <p className="text-foreground/80">
              Sensorer ser ofte elever som skriver at «dette er et høytrykk fordi trykket er 1016 hPa».
              Dette er feil! Lufttrykk er <em>relativt</em>. Hvis et trykksenter på 1016 hPa er omgitt
              av isobarer på 1024 og 1028 hPa, er senteret et <strong>lavtrykk</strong>. Det er
              trykkforskjellen til omgivelsene, ikke det absolutte tallet, som avgjør om luft konvergerer
              eller divergerer.
            </p>
          </div>
          <div>
            <strong className="text-rose-600 dark:text-rose-400">
              Felle 2: Å tro at vinden blåser vinkelrett rett inn i lavtrykket.
            </strong>
            <p className="text-foreground/80">
              Mange glemmer Corioliseffekten og tegner piler som går rett inn i L som eiker i et hjul.
              Husk: Vinden blåser <em>nesten parallelt</em> med isobarene! Bakkefriksjon gjør bare at
              vinden krysser isobarene med en beskjeden vinkel på 15–30° mot lavtrykket.
            </p>
          </div>
          <div>
            <strong className="text-rose-600 dark:text-rose-400">
              Felle 3: Å blande sammen varmfrontens og kaldfrontens nedbørskarakter.
            </strong>
            <p className="text-foreground/80">
              En varmfront gir <em>aldri</em> korte tordenbyger. Den slake helningen (1:150) gir dagesvis
              med stratiformt, jevnt silregn fra nimbostratus. Det er kaldfronten med sin bratte
              brøytekant (1:50) som kaster luften opp og skaper eksplosiv konveksjon, hagl og torden
              fra cumulonimbus.
            </p>
          </div>
          <div>
            <strong className="text-rose-600 dark:text-rose-400">
              Felle 4: Feillesing av det 3-sifrede trykktallet på stasjonsmodellen.
            </strong>
            <p className="text-foreground/80">
              Dersom koden viser <code>042</code>, må du ikke skrive 42 hPa eller 1042 hPa! Tallet er
              under 500, og betyr derfor <strong>1004,2 hPa</strong>. Viser koden <code>978</code>, betyr
              det <strong>997,8 hPa</strong>. Å mestre denne regelen viser sensor at du behersker ekte
              meteorologisk kodespråk.
            </p>
          </div>
        </div>
      </Callout>
    </section>
  );
}
