import { HighPressureCrossSectionDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function HoytrykkSubsidensOppvarmingOgOpp() {
  return (
    <section className="space-y-4">
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Høytrykk: Subsidens, oppvarming og oppløsning av skyer
      </h2>
      <p>
        Et høytrykk er lavtrykkets fysiske speilbilde. I et høytrykk strømmer luftmasser sammen i
        den øvre troposfæren (konvergens i høyden). Dette skaper et overskudd av luft oppe i
        atmosfæren, og massen presses langsomt nedover mot jordoverflaten i en prosess som kalles{" "}
        <strong>subsidens</strong> (nedsynking).
      </p>
      <p>
        Subsidensen er en storskala, rolig bevegelse – luften synker med bare noen få centimeter i
        sekundet, men den skjer samtidig over områder på størrelse med hele kontinenter. På vei ned
        presses luften inn i lag med stadig høyere lufttrykk:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <strong>Adiabatisk kompresjon og oppvarming:</strong> Det økende omgivelsestrykket klemmer
          luftpakken sammen. Det utføres et kompresjonsarbeid <em>på</em> luftpakken, slik at
          molekylene presses tettere sammen og beveger seg raskere. Temperaturen stiger
          tørradiabatisk med <strong>1,0 °C for hver 100 meter</strong>
          luften synker.
        </li>
        <li>
          <strong>Hvorfor blir himmelen skyfri?</strong> En sky består av milliarder av ørsmå,
          svevende vanndråper. Hvorvidt dråpene fordamper eller overlever, styres av{" "}
          <strong>relativ luftfuktighet</strong>. Varm luft kan inneholde vesentlig mer vanndamp enn
          kald luft før metning inntreffer (ved 20 °C kan luften holde tre ganger så mye damp som
          ved 5 °C). Når luften synker og varmes opp uten at det tilføres ny fuktighet, faller den
          relative fuktigheten drastisk – ofte ned mot 20–30 %.
        </li>
      </ul>
      <p>
        Skydråpene fordamper umiddelbart til usynlig vanndamp.{" "}
        <strong>
          Skyene i et høytrykk blåser ikke bort – de oppløses og forsvinner i den varme, tørre
          nedsynkende luften!
        </strong>
      </p>

      <OrdBoks
        ord="Subsidens"
        barn="Langsom nedsynking av luftmasser over store områder i et høytrykk. Luften komprimeres og varmes adiabatisk, slik at skyer fordamper og himmelen blir klar."
      />

      <p>
        Når den synkende luften treffer bakken, hoper det seg opp et overskudd av luftmolekyler.
        Barometeret stiger, og luften presses utover til alle sider langs bakken. Dette kalles{" "}
        <strong>divergens ved bakken</strong>.
      </p>

      <HighPressureCrossSectionDiagram />

      <h3 className="pt-2 font-display text-xl font-medium tracking-tight">
        Sommerhøytrykk vs. vinterhøytrykk i Norge
      </h3>
      <p>I Norge gir et høytrykk vidt forskjellige værtyper avhengig av årstiden:</p>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h4 className="flex items-center gap-2 font-display text-base font-semibold text-amber-400">
            <span>☀️</span> Sommerhøytrykk: Varmebølger og tørke
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Om sommeren står solen høyt på himmelen opptil 18–24 timer i døgnet. Den skyfrie
            himmelen slipper solstrålingen uhindret ned til overflaten. Sammen med den adiabatiske
            nedsynkingsvarmen gir dette høye temperaturer, tørke og stor skogbrannfare. Et stabilt,
            blokkerende høytrykk over Skandinavia kan bli liggende i ukevis og splitte jetstrømmen.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h4 className="flex items-center gap-2 font-display text-base font-semibold text-sky-400">
            <span>❄️</span> Vinterhøytrykk: Bitende kulde og inversjon
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Om vinteren er nettene lange og solen står lavt. Den skyfrie himmelen i et høytrykk gjør
            at bakken taper enorme mengder varme gjennom langbølget stråling ut mot det kalde
            verdensrommet. Bakken og det nederste luftlaget bunnfryser (-20 til -40 °C i innlandet
            som Røros og Finnmarksvidda). Det oppstår en skarp
            <strong> bakkeinversjon</strong>: Luften i dalbunnen blir iskald og tung, mens det er
            mildere lenger opp i fjellet. Forurensning og vedrøyk stenges inne i dalbunnene.
          </p>
        </div>
      </div>
    </section>
  );
}
