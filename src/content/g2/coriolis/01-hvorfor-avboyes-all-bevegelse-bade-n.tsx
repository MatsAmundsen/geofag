import { GlobalDeflectionDiagram, ZonalCentrifugalDiagram } from "@/components/diagrams";

export function HvorforAvboyesAllBevegelseBadeN() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Hvorfor avbøyes all bevegelse? Både nord–sør og øst–vest!
      </h2>
      <p>
        I mange elementære lærebøker forklares Corioliseffekten utelukkende ved at ekvator roterer
        raskere enn polene. Selv om dette er helt sant for luft som beveger seg nordover eller
        sørover, forklarer det ikke hvorfor vind som blåser <strong>rett mot øst eller vest</strong>{" "}
        også bøyes av! I atmosfæren er Corioliseffekten fullstendig uavhengig av kompasskursen. La oss
        se på de to fysiske mekanismene:
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-sky-300">
            <span>🌐</span> 1. Nord–sør-bevegelse: Forskjell i omkretsfart
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Jorden er en kule med en omkrets på ca. 40 000 km ved ekvator. Alle punkter på kloden bruker
            nøyaktig 24 timer på en omdreining. Dette betyr at bakken ved ekvator suser mot øst med en
            periferihastighet på hele <strong>1670 km/t</strong> (465 m/s). Ved 60°N (Oslo/Bergen) er
            omkretsen halvert, og farten er bare <strong>ca. 840 km/t</strong>. På selve Nordpolen er
            farten <strong>0 km/t</strong>!
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>
              • <strong>Luft som går nordover fra ekvator:</strong> Beholder sin østlige startfart på
              1670 km/t. Lenger nord roterer bakken saktere (f.eks. 1200 km/t). Luftpakken «tar igjen»
              jorden og sklir <em>østover</em> — altså mot <strong>høyre</strong>!
            </li>
            <li>
              • <strong>Luft som går sørover mot ekvator:</strong> Kommer fra et område med lav
              rotasjonsfart til et område der bakken raser unna mot øst. Luftpakken «blir hengende
              etter» mot <em>vest</em> — som også er mot <strong>høyre</strong> når du ser i fartsretningen
              sørover!
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-amber-300">
            <span>⚖️</span> 2. Øst–vest-bevegelse: Sentrifugalkraft (Eötvös-effekten)
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Hva skjer når en luftpakke blåser nøyaktig langs en breddegrad (øst eller vest)? Her endres
            ikke avstanden til polen med det første. Årsaken til avbøyningen er i stedet endringen i{" "}
            <strong>sentrifugalkraft rundt jordens rotasjonsakse</strong>:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>
              • <strong>Vind mot ØST (med jordrotasjonen):</strong> Luftpakken roterer raskere enn
              planeten. Vinkelhastigheten øker (Ω + Δω). Den utadrettede sentrifugalkraften øker
              (F_cf = m·ω²·r). På en kuleflate har denne utoverslyngingen en komponent som peker mot{" "}
              <strong>ekvator</strong>. For en vind som blåser østover på nordlig halvkule, er ekvator
              til <strong>høyre</strong>!
            </li>
            <li>
              • <strong>Vind mot VEST (mot jordrotasjonen):</strong> Luftpakken roterer saktere enn
              planeten. Sentrifugalkraften minker. Nå dominerer jordens gravitasjon og trekker pakken
              nærmere jordaksen. Dette gir en overflatekomponent rettet mot <strong>polen</strong>. For en
              vind som blåser vestover i nord, er polen også til <strong>høyre</strong>!
            </li>
          </ul>
        </div>
      </div>

      <ZonalCentrifugalDiagram />

      <p>
        Konklusjonen er universell: Enten luften blåser mot nord, sør, øst, vest eller i en skrå
        kompasskurs, tvinger Newtons lover og jordrotasjonen bevegelsen til å bøye av{" "}
        <strong>mot høyre på nordlig halvkule</strong> og <strong>mot venstre på sørlig halvkule</strong>!
      </p>

      <GlobalDeflectionDiagram />
    </>
  );
}
