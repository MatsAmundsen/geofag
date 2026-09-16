import { CoriolisLatitudeDiagram } from "@/components/diagrams";
import { PhotoFigure } from "@/components/photo-figure";
import { Link } from "@tanstack/react-router";

export function CoriolisparameterenOgBreddegradF() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Coriolisparameteren og breddegrad: f = 2Ω sin φ
      </h2>
      <p>
        Hvor kraftig er denne avbøyningen? Styrken til Corioliskraften på en enhetsmasse luft regnes
        ut ved hjelp av en matematisk formel som alle geofag-elever må kjenne til (American
        Meteorological Society [AMS], u.å.):
      </p>
      <div className="my-4 rounded-xl border border-primary/30 bg-card p-5 text-center">
        <p className="font-mono text-xl font-bold tracking-wide text-primary sm:text-2xl">
          F_c = 2 · m · v · Ω · sin(φ)
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          der <strong>m</strong> er massen, <strong>v</strong> er vindhastigheten, <strong>Ω</strong> er
          jordens vinkelhastighet, og <strong>φ</strong> er breddegraden.
        </p>
      </div>

      <p>
        I meteorologi samler vi konstantene og breddegraden i én felles faktor som kalles{" "}
        <strong>Coriolisparameteren (f)</strong>:
      </p>
      <div className="my-3 rounded-lg bg-slate-900/80 p-3 text-center font-mono text-base font-semibold text-sky-400">
        f = 2 · Ω · sin(φ)
      </div>

      <p>
        Jordens vinkelhastighet er konstant: Jorden roterer 2π radianer (360°) på ett stjernedøgn
        (86 164 sekunder):
      </p>
      <div className="my-2 text-center font-mono text-sm text-muted-foreground">
        Ω = 2π / 86 164 s ≈ 7,2921 × 10⁻⁵ rad/s
      </div>

      <p>
        Siden Ω er et fast tall, er det utelukkende <strong>sinus til breddegraden (sin φ)</strong> som
        bestemmer hvor sterk Corioliseffekten er på et gitt sted på kloden:
      </p>

      <div className="my-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 font-display text-xs uppercase tracking-wider text-muted-foreground">
              <th className="p-3">Sted / Sone</th>
              <th className="p-3">Breddegrad (φ)</th>
              <th className="p-3">sin(φ)</th>
              <th className="p-3">Coriolisparameter (f)</th>
              <th className="p-3">Effekt på atmosfæren</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-3 font-medium text-foreground">Ekvator</td>
              <td className="p-3 font-mono">0°</td>
              <td className="p-3 font-mono">0,000</td>
              <td className="p-3 font-mono font-bold text-emerald-400">0,00 × 10⁻⁴ s⁻¹</td>
              <td className="p-3 text-xs text-muted-foreground">Ingen horisontal avbøyning. Orkaner kan aldri dannes her.</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-foreground">Subtropene (Sahara/Florida)</td>
              <td className="p-3 font-mono">30°N</td>
              <td className="p-3 font-mono">0,500</td>
              <td className="p-3 font-mono font-bold text-sky-400">0,73 × 10⁻⁴ s⁻¹</td>
              <td className="p-3 text-xs text-muted-foreground">Moderat avbøyning. Driver passatvindene og orkanbaner.</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-foreground">Sør-Norge (Oslo/Bergen)</td>
              <td className="p-3 font-mono">60°N</td>
              <td className="p-3 font-mono">0,866</td>
              <td className="p-3 font-mono font-bold text-sky-300">1,26 × 10⁻⁴ s⁻¹</td>
              <td className="p-3 text-xs text-muted-foreground">Svært sterk avbøyning (87 % av polarmaks). Kraftig lavtrykksrotasjon.</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-foreground">Nordpolen / Sørpolen</td>
              <td className="p-3 font-mono">90°</td>
              <td className="p-3 font-mono">1,000</td>
              <td className="p-3 font-mono font-bold text-amber-400">1,46 × 10⁻⁴ s⁻¹</td>
              <td className="p-3 text-xs text-muted-foreground">Maksimal avbøyningskraft. Vertikal rotasjonsakse er loddrett på bakken.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CoriolisLatitudeDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Hvorfor dannes det aldri tropiske orkaner på ekvator?
      </h3>
      <p>
        For at en tropisk storm skal kunne vokse til en monsterorkan, kreves det enorme mengder varmt
        havvann (over 26,5 °C). Havet ved ekvator er det varmeste på planeten (ofte 29–30 °C). Likevel
        har meteorologer aldri observert en orkan som oppstår mellom 0° og 5° breddegrad!
      </p>
      <p>
        Forklaringen er ren Coriolis-fysikk: Ved ekvator er <strong>f ≈ 0</strong>. Når fuktig luft
        stiger i kraftige tordenbyger og skaper et lokalt lavtrykk ved havflaten, raser luften rundt
        rett inn mot sentrum i en snorrett linje for å tette trykkgapet. Uten Corioliskraften finnes det
        ingen sideveis avbøyning som kan sette luftmassene i rotasjon. Trykket fylles opp og utlignes
        umiddelbart, og stormen kveler seg selv før den rekker å organisere en virvel!
      </p>
      <p>
        Først når vi beveger oss minst <strong>500 kilometer (5 grader) vekk fra ekvator</strong>, er
        Coriolisparameteren sterk nok til å vri luftstrømmene til side og spinne i gang den
        fryktinngytende orkanvirvelen (NOAA, u.å.-a).
      </p>

      <PhotoFigure
        src="/images/fig-syklon.jpg"
        alt="Satellittbilde av en fullt utviklet tropisk orkan med spiralbånd og øye"
        heading="Orkanens motor: Avhengig av Coriolis for å rotere"
        caption="En orkan er et konsentrert roterende lavtrykk. Luften som suges inn mot det ekstremt lave trykket i øyet, bøyes kontinuerlig mot høyre av Corioliskraften, slik at hele systemet spinner mot klokken på nordlig halvkule."
        arrows={[
          { d: "M 38 16 Q 22 28 30 46", tone: "low", width: 1.5 },
          { d: "M 30 46 Q 48 58 70 46", tone: "low", width: 1.5 },
          { d: "M 70 46 Q 78 28 58 16", tone: "low", width: 1.5 },
        ]}
        marks={[
          { x: 48, y: 36, n: "L", text: "Orkanens øye (Lavt trykk)", tone: "low" },
          { x: 12, y: 15, n: "1", text: "Syklonal spiral innover", tone: "warm" },
        ]}
        points={[
          { n: "L", label: "Orkanens øye: Ekstremt lavt lufttrykk (ofte under 920 hPa)." },
          { n: "1", label: "Rotasjonsretning: Innstrømmende luft bøyes mot høyre, og danner spiral mot klokken i nord." },
        ]}
      />

      <p className="pt-2 text-sm text-muted-foreground">
        <em>Merk koblingen til Rossby-bølger:</em> Fordi Coriolisparameteren endrer seg med breddegraden
        (en effekt som kalles <strong>Beta-effekten</strong>, β = ∂f/∂y), oppstår
        det en naturlig gjenopprettende kraft når jetstrømmen bukter seg nord–sør. Dette skaper de
        gigantiske planetære meandrene som styrer stormbanene over Atlanteren, og som vi behandler i
        kapittelet om{" "}
        <Link to="/tema/jetstrommer" className="text-primary underline">
          jetstrømmer
        </Link>
        .
      </p>
    </>
  );
}
