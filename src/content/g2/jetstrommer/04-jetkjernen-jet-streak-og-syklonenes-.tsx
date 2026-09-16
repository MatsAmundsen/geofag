import { JetStreakDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function JetkjernenJetStreakOgSyklonenes() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Jetkjernen (Jet streak) og syklonenes fødsel: 4-kvadrant-modellen
      </h2>
      <p>
        I lærebøker heter det ofte at «jetstrømmen styrer lavtrykkene». Men jetstrømmen gjør mye mer
        enn å bare være en passiv reisevei: <strong>Jetstrømmen skaper og forsterker lavtrykkene aktivt!</strong>
      </p>
      <p>
        Inne i jetstrømmen finnes det soner der vinden er lokalt mye sterkere enn i områdene rundt.
        En slik lomme med topphastighet kalles en <strong>jetkjerne</strong> (engelsk: <em>jet streak</em>).
        Når luftmolekylene strømmer gjennom denne kjernen, utsettes de for voldsom akselerasjon og
        bremsing:
      </p>

      <ol className="list-decimal space-y-2.5 pl-6 text-foreground/90">
        <li>
          <strong>Innløpet (Entrance region):</strong> Luften strømmer inn i kjernen og må{" "}
          <strong>akselerere</strong> fra f.eks. 150 km/t til 300 km/t. I akselerasjonsfasen henger
          Corioliskraften litt etter trykkgradientkraften. Luften tvinges på tvers av jeten mot lavt
          trykk (mot nord).
        </li>
        <li>
          <strong>Utløpet (Exit region):</strong> Luften forlater kjernen og må{" "}
          <strong>bremse ned</strong> igjen. Nå er farten høyere enn den lokale trykkgradienten
          tilsier, og Corioliskraften «vinner» drakampen. Luften kastes på tvers av jeten mot høyre
          (mot sør).
        </li>
      </ol>

      <p>
        Denne tverrgående bevegelsen deler jetkjernen inn i <strong>fire distinkte kvadranter</strong>:
      </p>

      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-red-400">
            <span>🌀</span> Venstre utløp (Left exit): Lavtrykksmotoren!
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I den venstre delen av utløpet sprer luften seg vifteformet fra hverandre. Her oppstår det{" "}
            <strong>maksimal divergens i høyden</strong>. Det fjernes bokstavelig talt luftmasse fra
            toppen av atmosfæren! Tyngden av luftsøylen minker, og barometeret på bakken stuper. For
            å tette masseunderskuddet suges luft opp fra bakken i en kraftig oppdrift. Luften avkjøles
            adiabatisk, danner tette skyer, og et <strong>dypgående lavtrykk (syklon)</strong> fødes
            med voldsomt regnvær og kuling!
          </p>
        </div>
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-sky-400">
            <span>☀️</span> Høyre utløp (Right exit): Nedsynking og høytrykk
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I den høyre delen av utløpet hoper luftmassene seg opp. Her oppstår det{" "}
            <strong>konvergens i høyden</strong>. Vekten av luftsøylen øker, og overskuddsmassen
            presses nedover mot bakken i en storskala subsidens. Luften komprimeres og varmes
            adiabatisk, skydråpene fordamper, og på bakken dannes det et stabilt{" "}
            <strong>høytrykk</strong> med klar himmel og rolige vinder.
          </p>
        </div>
      </div>

      <OrdBoks
        ord="Divergens i høyden"
        barn="Horisontal spredning av luftmasser i øvre troposfære (særlig i venstre utløp av en jetkjerne). Fjerner luftmasse fra søylen slik at bakketrykket faller og lavtrykk dypner."
      />

      <p>
        I tillegg gir den horisontale temperaturkontrasten langs polarfronten næring til en prosess
        som kalles <strong>baroklin ustabilitet</strong>: Bølgen på bakken kan hente potensiell energi
        fra temperaturforskjellen og omdanne den til rotasjonsenergi i syklonen. Hvert nytt lavtrykk
        dannes, forsterkes og feier østover like under jetkjernene. Dette sporet kalles{" "}
        <strong>stormbanen</strong>.
      </p>

      <JetStreakDiagram />
    </>
  );
}
