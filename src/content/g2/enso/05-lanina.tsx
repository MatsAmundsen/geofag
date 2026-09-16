import { CollapsibleSection } from "@/components/collapsible-section";
import { PhotoFigure } from "@/components/photo-figure";

export function Lanina() {
  return (
    <CollapsibleSection
      title="3. La Niña (Kald fase — Den forsterkede normalen)"
      subtitle="Super-passater · Ekspandert varmtvannsbasseng · Intens oppvelling ved Peru · Flom i Australia/Asia"
      badge="Kald fase"
      badgeVariant="sky"
    >
      <p>
        La Niña er den motsatte ekstremfasen. Passatvindene blåser sterkere
        enn normalt. Det varme overflatevannet skyves enda hardere mot vest, og
        oppvellingen i øst blir ekstra kraftig. Havoverflaten i det sentrale og
        østlige Stillehavet blir 1–3 °C kaldere enn gjennomsnittet (NOAA,
        u.å.).
      </p>
      <p>
        En El Niño-episode etterfølges ofte av en eller to La Niña-sesonger,
        fordi systemet «overskyves» og svinger tilbake med ekstra styrke — som
        en pendel.
      </p>
      <PhotoFigure
        src="/images/fig-enso-lanina.jpg"
        alt="Tverrsnitt av La Niña: ekstra sterke passatvinder, utvidet varmtvannsbaseng i vest, intens oppvelling ved Peru"
        heading="Figur 4. La Niña-tilstanden"
        caption="Passatvindene forsterkes. Det vestlige varmebassenget ekspanderer og presses lenger vest og nord. Oppvellingen ved Peru er usedvanlig kraftig. Havoverflaten i øst er 1–3 °C kaldere enn normalt. Tørke i Peru og Karibia. Kraftige monsunregn og sykloner i Australia og Sørøst-Asia."
        fit="contain"
        points={[
          { n: "1", label: "Ekstra sterke passatvinder presser varmt vann lenger vest enn normalt." },
          { n: "2", label: "Intens oppvelling i øst. Havoverflaten ved Peru 1–3 °C kaldere enn normalt." },
          { n: "3", label: "Kraftige monsunregn, sykloner og flom i Australia, Sørøst-Asia og Øst-Afrika." },
        ]}
      />
      <div className="rounded-lg border border-border/70 bg-card/70 p-4 sm:p-5">
        <h4 className="font-display text-base font-semibold tracking-tight text-primary">
          Regionale konsekvenser av La Niña
        </h4>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm sm:text-base">
          <li>
            <strong>Australia og Sørøst-Asia:</strong> Ekstreme monsunregn,
            flom og kraftige tropiske sykloner (f.eks. Queensland 2010/11).
          </li>
          <li>
            <strong>Øst-Afrika (Horn of Africa):</strong> Kraftig regnperiode og flomfare.
          </li>
          <li>
            <strong>Peru og Karibia:</strong> Forsterket tørke.
          </li>
          <li>
            <strong>Sørvest-USA:</strong> Tørrere enn normalt, økt skogbrannfare.
          </li>
        </ul>
      </div>
    </CollapsibleSection>
  );
}
