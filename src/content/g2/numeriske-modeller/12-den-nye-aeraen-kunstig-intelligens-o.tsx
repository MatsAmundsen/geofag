export function DenNyeAeraenKunstigIntelligensO() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Den nye æraen: Kunstig intelligens og nevrale værmodeller
      </h2>
      <p>
        Mellom 2022 og 2026 har meteorologien opplevd sin største revolusjon på et halvt århundre:{" "}
        <strong>datadrevne AI-værmodeller</strong>. Modeller som <em>GraphCast</em> (Google DeepMind),{" "}
        <em>Pangu-Weather</em> (Huawei) og ECMWFs egen <em>AIFS</em> (Artificial Intelligence
        Forecasting System) har vist at dype nevrale nettverk kan forutse det globale været med en
        treffsikkerhet som er fullt på høyde med – og på noen områder overgår – de tradisjonelle
        fysikkbaserte modellene.
      </p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-sky-300">
            Klassisk numerisk modell (IFS / MEPS)
          </h3>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            <li>
              <strong>Metode:</strong> Løser eksakte fysiske differensialligninger (Navier-Stokes) trinn
              for trinn med tidssteg Δt.
            </li>
            <li>
              <strong>Datakraft:</strong> Krever gigantiske superdatamaskiner med hundretusenvis av
              CPU-er og timer med regnetid per prognose.
            </li>
            <li>
              <strong>Styrke:</strong> Fysisk konsistent, universell og strengt bevarende (masse og
              energi går aldri tapt).
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
          <h3 className="font-display text-base font-semibold text-purple-300">
            AI-værmodell (ECMWF AIFS / GraphCast)
          </h3>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            <li>
              <strong>Metode:</strong> Løser ingen differensialligninger. Et dypt nevralt nettverk har
              trent på 40 år med historiske reanalysedata (ERA5) og lært mønstrene direkte.
            </li>
            <li>
              <strong>Datakraft:</strong> Ekstremt rask! Kan regne et fullt 10-dagers globalt varsel på
              under ett minutt på én enkelt kommersiell databrikke (GPU/TPU).
            </li>
            <li>
              <strong>Styrke:</strong> Svært nøyaktig sporing av tropiske orkaner og store atlantiske
              lavtrykk med en brøkdel av strømforbruket.
            </li>
          </ul>
        </div>
      </div>
      <p>
        Betyr dette at de klassiske fysiske modellene er blitt overflødige? Absolutt ikke. AI-modellene
        er helt avhengige av fysikkmodellene:
      </p>
      <ul className="list-disc space-y-1.5 pl-6 text-foreground/90">
        <li>
          AI-modellene kan bare trenes fordi vi har 40 år med perfekte <em>reanalyser</em> produsert av
          fysikkmodeller og dataassimilering.
        </li>
        <li>
          Uten fysikkbasert dataassimilering ville ikke AI-modellen hatt noen fersk starttilstand å
          starte fra i dag.
        </li>
        <li>
          AI-modeller kan slite med å forutsi ekstreme værrekorder som aldri før har funnet sted i
          historien (f.eks. som følge av akselererende global oppvarming), fordi mønsteret mangler i
          treningsdataene.
        </li>
      </ul>
      <p className="font-semibold text-teal-400">
        Fremtiden tilhører hybride systemer: Fysikkbaserte modeller sikrer strenge bevaringslover og
        assimilering av nye målinger, mens AI-modeller akselererer ensemblekjøringer og gir raskere
        farevarsler til befolkningen.
      </p>
    </>
  );
}
