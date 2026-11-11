import { useId } from "react";

/** Figur 1.5 fra main (Grok Bot), uendret: Mats valgte det ekte Kartverket-kartet 10.11.2026. */
export function GeografiKartSammenlikning() {
  const id = useId();
  return (
    <figure aria-labelledby={id} className="my-8 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 1.5 – Samme utsnitt, ulikt innhold
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4>Topografisk rasterkart</h4>
          <img
            src="/images/geografi/gjende-toporaster.png"
            alt="Gjende og Bessheim med vann, kurver, stier og veier"
            loading="lazy"
            width="512"
            height="512"
          />
        </div>
        <div>
          <h4>Tematisk uttrekk av blå karttegn</h4>
          <img
            src="/images/geografi/gjende-bla-karttegn.png"
            alt="Bare kartets blå karttegn er framhevet i samme utsnitt"
            loading="lazy"
            width="512"
            height="512"
          />
        </div>
      </div>
      <figcaption className="text-sm text-muted-foreground">
        © Kartverket, CC BY 4.0. Samme utsnitt og nordretning som figur 1.4, zoom 11. Eget
        pikseluttrekk beholder blå karttegn og demper resten. Blått omfatter også navn og symboler.
        Det er ikke et eget datasett over vannforekomster, en ny feltmåling eller en faresone.
        Fargeregelen er dokumentert i redaksjonsnotatet.
      </figcaption>
    </figure>
  );
}
