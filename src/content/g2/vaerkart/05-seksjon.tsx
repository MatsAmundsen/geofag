import { Callout } from "@/components/callout";

export function Seksjon2() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Øvelse: Tolkning av et synoptisk bakkekart i praksis
      </h2>
      <p>
        For å befeste kunnskapen om isobarer, frontsystemer og stasjonsmodeller før vi beveger oss
        opp i høyden til 500 hPa, bør du trene på denne systematiske oppgaven. Dette er en typisk
        eksamensrelevant case for Geofag 2.
      </p>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm space-y-4">
        <h3 className="font-display text-base font-semibold text-primary">
          Casetilfelle: Et hissig høstlavtrykk i Norskehavet
        </h3>
        <p className="text-foreground/90">
          Tenk deg et synoptisk bakkekart fra MET Norway kl. 06:00 UTC. Et kraftig lavtrykkssenter på{" "}
          <strong>972 hPa</strong> er lokalisert ca. 300 km vest for Bodø. Rundt senteret ligger
          isobarene med 4 hPa intervall (976, 980, 984, 988, 992, 996, 1000 hPa).
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-foreground/85">
          <li>En varmfront strekker seg mot sørøst inn over Trøndelag og Møre.</li>
          <li>En skarp kaldfront buer seg sørover mot Nordsjøen og Shetland.</li>
          <li>En okkludert front snor seg inn i selve lavtrykkssenteret vest for Lofoten.</li>
          <li>Over det sentrale Østlandet og Sør-Sverige ligger en høytrykksrygg på 1024 hPa.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl font-medium tracking-tight">
          Arbeidsoppgaver for egen analyse
        </h3>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card/60 p-4 space-y-2">
            <h4 className="font-semibold text-foreground">1. Trykkgradient og vind</h4>
            <p className="text-sm text-foreground/80">
              Hvor på kartet er isobarene tettest, og hvilke vindstyrker forventer du der? Hva sier
              Buys Ballots lov om vindretningen langs kysten av Nordland og Trøndelag?
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card/60 p-4 space-y-2">
            <h4 className="font-semibold text-foreground">2. Varmsektor og temperaturkontrast</h4>
            <p className="text-sm text-foreground/80">
              Beskriv luftmasseegenskapene i den varme sektoren mellom Møre og Shetland sammenlignet
              med luften bak kaldfronten over Norskehavet.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card/60 p-4 space-y-2">
            <h4 className="font-semibold text-foreground">3. Avkoding av stasjonsmodell</h4>
            <p className="text-sm text-foreground/80">
              En kyststasjon på Helgeland viser: Fylt sirkel (8/8), vindpil fra sørøst med én vimpel
              og to streker (70 knop), tall <code>978</code> øverst til høyre, og tendens{" "}
              <code>-48 &#92;</code>. Avkod disse fire observasjonene til fysiske verdier.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card/60 p-4 space-y-2">
            <h4 className="font-semibold text-foreground">4. Værutvikling de neste 12 timene</h4>
            <p className="text-sm text-foreground/80">
              Når kaldfronten passerer kysten utover ettermiddagen, hva vil skje med: a) vindretningen
              (veering), b) vindstyrken, c) lufttemperaturen, og d) nedbørstypen?
            </p>
          </div>
        </div>
      </div>

      <Callout title="Fasit og sjekkliste for øvelsen">
        <ul className="space-y-2 text-sm text-foreground/90">
          <li>
            <strong>Oppgave 1:</strong> Isobarene er tettest like sørvest for lavtrykkssenteret og
            langs kysten der gradienten presses sammen. Dette gir full storm eller orkan. Vinden
            blåser mot klokken rundt lavtrykket med 15–30° innkryssing mot sentrum.
          </li>
          <li>
            <strong>Oppgave 2:</strong> Varmsektoren har mild, fuktig maritim subtropisk luftmasse
            med høy duggpunktstemperatur. Bak kaldfronten strømmer tørrere, kald og ustabil maritim
            polarluft inn.
          </li>
          <li>
            <strong>Oppgave 3:</strong> 8/8 betyr helt overskyet. 70 knop (ca. 36 m/s) betyr orkan.{" "}
            <code>978</code> betyr <strong>997,8 hPa</strong> (siden tallet er &ge; 500 settes 9
            foran). <code>-48</code> betyr et dramatisk trykkfall på 4,8 hPa de siste 3 timene.
          </li>
          <li>
            <strong>Oppgave 4:</strong> Vinden vil dreie med urviseren (veering) fra sørøst/sørvest
            til kraftig nordvest. Temperaturen faller markant (ofte 5–8 °C), og nedbøren skifter fra
            vedvarende silregn til kraftige byger med hagl, torden og plutselige vindkast.
          </li>
        </ul>
      </Callout>
    </section>
  );
}
