export function TrinnsMetodeForAAnalysereEtVae() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        7. 5-trinns metode for å analysere et værkart på eksamen
      </h2>
      <p>
        På eksamen i Geofag 2 får elevene ofte utlevert et synoptisk kart med isobarer, fronter og
        stasjonsplott, og blir bedt om å beskrive nåværende vær på et bestemt sted og vurdere
        værutviklingen det neste døgnet.
      </p>
      <p>
        Følger du denne 5-trinns oppskriften slavisk, unngår du panikk og sikrer en fullstendig,
        faglig forankret besvarelse:
      </p>

      <div className="my-4 space-y-3">
        <div className="rounded-lg border border-border bg-card/60 p-4">
          <h4 className="font-display font-medium text-foreground">
            Trinn 1: Lokaliser trykksentrene (L og H)
          </h4>
          <p className="mt-1 text-sm text-foreground/85">
            Finn de lukkede isobarsirklingene. Hvor ligger lavtrykkene, og hva er sentertrykket
            (f.eks. et dypt høstlavtrykk på 968 hPa vest for Lofoten)? Hvor ligger høytrykket (f.eks.
            et blokkerende 1028 hPa høytrykk over Russland)?
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-4">
          <h4 className="font-display font-medium text-foreground">
            Trinn 2: Evaluer trykkgradienten og bestem vindfeltet
          </h4>
          <p className="mt-1 text-sm text-foreground/85">
            Sjekk avstanden mellom isobarene. Ligger de tett over Nordsjøen og Vestlandet? Da blir det
            sterk vind! Bruk <strong>Buys Ballots lov</strong>: Still deg med ryggen mot vinden på
            nordlig halvkule, og du har lavtrykket skrått foran deg til venstre. Husk at vinden blåser
            mot klokka rundt L, og krysser isobarene 15–30° inn mot sentrum nær bakken.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-4">
          <h4 className="font-display font-medium text-foreground">
            Trinn 3: Kartlegg frontene og identifiser luftmassene
          </h4>
          <p className="mt-1 text-sm text-foreground/85">
            Hvor ligger varmfronten, varmsektoren, kaldfronten og okklusjonen i forhold til studiestedet?
            Ligger Norge i kald arktisk luftmasse, i den milde atlantiske varmsektoren, eller midt i en
            aktiv frontsone?
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-4">
          <h4 className="font-display font-medium text-foreground">
            Trinn 4: Verifiser med stasjonsplottene
          </h4>
          <p className="mt-1 text-sm text-foreground/85">
            Les av nærmeste stasjoner. Dekod det tre-sifrede trykket (f.eks. 024 = 1002,4 hPa). Se på
            trykktendensen (faller barometeret med mer enn 3 hPa på 3 timer, er fronten like rundt
            hjørnet). Sjekk skydekket (oktas), værtypen (prikker for regn, trekanter for byger) og
            duggpunktsdepresjonen.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-4">
          <h4 className="font-display font-medium text-foreground">
            Trinn 5: Ekstrapoler værutviklingen 12–24 timer fram
          </h4>
          <p className="mt-1 text-sm text-foreground/85">
            Lavtrykk i våre bredder driver mot øst-nordøst med vestavindsbeltet og 500 hPa
            styrestrømmen (typisk 30–60 km/t). Flytt hele systemet framover på kartet: Hvis en
            varmfront ligger over Nordsjøen kl. 00, vil den treffe Vestlandet ved lunsjtider (+12t) og
            være etterfulgt av en kaldfront med vinddreining og byger innen neste morgen (+24t).
          </p>
        </div>
      </div>
    </section>
  );
}
