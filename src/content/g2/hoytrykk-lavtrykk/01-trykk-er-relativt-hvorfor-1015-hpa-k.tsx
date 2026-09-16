import { RelativePressureDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function TrykkErRelativtHvorforHpaK() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Trykk er relativt: Hvorfor 1015 hPa kan bety både storm og sol
      </h2>
      <p>
        En av de vanligste misforståelsene blant geofagelever er troen på at det finnes et fast tall
        som skiller høytrykk fra lavtrykk – for eksempel at verdier over 1013 hPa alltid er
        høytrykk, og verdier under 1013 hPa alltid er lavtrykk. Slik fungerer ikke atmosfæren.
      </p>
      <p>
        Høytrykk og lavtrykk er <strong>alltid relative begreper</strong> (Store norske leksikon,
        u.å.-a; Store norske leksikon, u.å.-b):
      </p>
      <ul className="list-disc space-y-1 pl-6 text-foreground/90">
        <li>
          Et <strong>lavtrykk (L)</strong> er et område der lufttrykket er lavere enn i de{" "}
          <em>omkringliggende</em> luftmassene.
        </li>
        <li>
          Et <strong>høytrykk (H)</strong> er et område der lufttrykket er høyere enn i de{" "}
          <em>omkringliggende</em> luftmassene.
        </li>
      </ul>
      <p>
        Tenk deg et område med et sentralt lufttrykk på 1015 hPa. Hvis dette området er omgitt av
        kraftige høytrykksrygger på 1025 hPa, vil luftmassene strømme inn mot 1015 hPa-senteret.
        Området fungerer da som et
        <strong> lavtrykk</strong> med stigende luft og skydannelse. Befinner nøyaktig samme
        trykkverdi (1015 hPa) seg derimot midt mellom dype atlantiske lavtrykk på 995 hPa, er 1015
        hPa et markant <strong>høytrykk</strong>
        som sender luft utover til sidene og gir tørt klarvær.
      </p>

      <OrdBoks
        ord="Relativt lufttrykk"
        barn="Det avgjørende for været er trykkgradienten (forskjellen over avstand mot naboområdene), aldri det absolutte hPa-tallet alene."
      />

      <p>
        På værkart tegnes linjer som kalles <strong>isobarer</strong> (av gresk <em>isos</em> = lik,
        og <em>baros</em> = tyngde). En isobar binder sammen steder som har samme lufttrykk, regnet
        om til havnivå. Avstanden mellom isobarene viser <strong>trykkgradienten</strong>: Ligger
        isobarene tett sammen, endrer trykket seg raskt over kort avstand, noe som setter luften i
        voldsom bevegelse og gir sterk kuling eller storm. Ligger isobarene langt fra hverandre, er
        gradienten slak og vinden laber.
      </p>

      <RelativePressureDiagram />
    </section>
  );
}
