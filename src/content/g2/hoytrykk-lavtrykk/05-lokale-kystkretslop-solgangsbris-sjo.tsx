import { SeaBreezeDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function LokaleKystkretslopSolgangsbrisSjo() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Lokale kystkretsløp: Solgangsbris (Sjøbris og landbris)
      </h2>
      <p>
        De samme fysiske prinsippene som styrer globale høytrykk og lavtrykk, utspiller seg i
        miniatyr langs norskekysten på varme sommerdager. Dette kalles <strong>solgangsbris</strong>
        , og det drives av at land og hav har fundamentalt ulik evne til å lagre varme:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Ulik spesifikk varmekapasitet:</strong> Vann har en usedvanlig høy spesifikk
          varmekapasitet (c ≈ 4184 J/(kg·K)) sammenlignet med tørt fjell, sand og jord (c ≈ 800
          J/(kg·K)). Det krever over fire ganger så mye solenergi å varme opp ett kilo vann med én
          grad som ett kilo granitt!
        </li>
        <li>
          <strong>Strålingspenetrering og omrøring:</strong> Solstrålene trenger flere meter ned i
          havet, og bølger blander overflatevannet nedover. På land absorberes solenergien
          utelukkende i det øverste millimetertynne jordlaget.
        </li>
      </ul>

      <p>Dette skaper et karakteristisk døgnkretsløp:</p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-display text-base font-semibold text-amber-400">
            ☀️ Dag: Sjøbris (Pålandsvind)
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Midt på dagen blir svabergene og innlandet glovarme (25–30 °C), mens havoverflaten
            holder kjølige 16–18 °C. Luften over land stiger (termisk lavtrykk ved bakken). Kjølig,
            tung luft over havet strømmer innover land som <strong>sjøbris</strong>. På Sørlandet
            merkes dette som en frisk pålandsvind som demper varmen på kystoddene utover
            ettermiddagen.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-display text-base font-semibold text-sky-400">
            🌙 Natt: Landbris (Fralandsvind)
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Om natten opphører solinnstrålingen, og landjorden avkjøles i et forrykende tempo ved
            varmeutstråling. Havet holder nesten uforandret temperatur. Nå blir luften over land
            kaldere og tettere enn over havet. Det oppstår et lokalt høytrykk over land, og en svak{" "}
            <strong>landbris</strong> blåser fra land og ut mot havet. Landbrisen er svakere enn
            sjøbrisen fordi temperaturforskjellen nattetid er mindre (NOAA, u.å.-c).
          </p>
        </div>
      </div>

      <p>
        <strong>Hvorfor må kretsløpet ha en returstrøm i høyden?</strong> Hvis det bare blåste luft
        inn over land om dagen, ville milliarder av kubikkmeter luft hopet seg opp der. Trykket over
        land ville steget til det stoppet vinden fullstendig. For at kretsløpet skal bestå, danner
        den stigende luften et overtrykk i høyden (ca. 1000–1500 m) og strømmer{" "}
        <strong>motsatt vei tilbake ut over havet</strong>, der den synker ned og forsyner sjøbrisen
        med ny luft.
      </p>

      <OrdBoks
        ord="Returstrøm"
        barn="Horisontal luftstrøm i høyden som går motsatt vei av bakkebeltet for å lukke kretsløpet og hindre opphopning av luftmasse."
      />

      <p>
        Utover ettermiddagen sørger Corioliseffekten for at sjøbrisen gradvis dreier mot høyre. På
        Sørlandskysten starter brisen vinkelrett på kysten (sørlig), men dreier mot sørvest og vest
        utover kvelden. Dette kalles solgangsbris fordi vindretningen følger solens vandring på
        himmelen.
      </p>

      <SeaBreezeDiagram />
    </section>
  );
}
