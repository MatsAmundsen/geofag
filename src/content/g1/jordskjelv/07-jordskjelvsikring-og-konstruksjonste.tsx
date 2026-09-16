

export function JordskjelvsikringOgKonstruksjonste() {
  return (
    <>
      {/* SEKSJON 7: JORDSKJELVSIKRING */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Jordskjelvsikring og konstruksjonsteknikk: Eurokode 8 og baseisolering
        </h2>
        <p className="text-sm text-muted-foreground">
          Det er et velkjent geofaglig ordtak at <em>«jordskjelv dreper ikke mennesker — det er kollapsende bygninger som gjør det»</em>.
          Moderne seismisk ingeniørkunst har utviklet metoder for å beskytte samfunnet:
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-sky-400 text-sm">Eurokode 8 (NS-EN 1998-1)</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Den europeiske standarden for prosjektering av konstruksjoner for seismisk påvirkning, lovpålagt i Norge.
              Krever at samfunnskritisk infrastruktur dimensjoneres for å motstå forventede spissakselerasjoner i grunnen (PGA)
              uten total kollaps (Standard Norge, 2021).
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-emerald-400 text-sm">Baseisolering (Seismiske dempere)</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              I stedet for å bolte bygget stivt til fjellet, plasseres fundamentet på fleksible bly-gummi-lagre
              (elastomeric bearings) eller friksjonspendellagre. Når bakken ryster horisontalt, glir
              fundamentet på demperne mens selve bygget forblir tilnærmet i ro.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-amber-400 text-sm">Svingningsdempere (Tuned Mass Dampers)</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              I skyskrapere som Taipei 101 henger en 660 tonns tung stålkule i toppen av tårnet. Under jordskjelv svinger
              kulen i motfase med bygningens resonansfrekvens og absorberer opptil 40 % av svingningsenergien.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-rose-400 text-sm">Jordlikvifaksjon (Jordflyt)</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              I vannmettet, løst sand- og siltjord fører gjentatt seismisk risting til at poretrykket i vannet stiger dramatisk.
              Vannet presser sandkornene fra hverandre, friksjonen forsvinner, og fast grunn forvandles momentant til en
              flytende kvikksandsuppe (som under Niigata 1964 og Lurøyskjelvet 1819).
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
