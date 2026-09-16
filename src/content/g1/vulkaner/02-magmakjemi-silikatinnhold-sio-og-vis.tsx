import { OrdBoks } from "@/components/term";

export function MagmakjemiSilikatinnholdSioOgVis() {
  return (
    <>
      {/* SEKSJON 2: MAGMAKJEMI OG VISKOSITET */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Magmakjemi, silikatinnhold (SiO₂) og viskositet: Nøkkelen til eksplosivitet
        </h2>
        <p>
          Hva avgjør om et vulkanutbrudd blir en rolig strøm av flytende stein (effusivt) eller en altødeleggende
          eksplosjon som mørklegger himmelen i månedsvis? Svaret ligger i to sammenkoblede faktorer:
          <strong className="text-foreground"> magmaens viskositet</strong> og dens
          <strong className="text-foreground"> innhold av oppløste gasser</strong>.
        </p>

        <h3 className="font-display text-xl font-medium tracking-tight text-primary">
          Silikatpolymerisering og væskens indre friksjon
        </h3>
        <p>
          Viskositet er et mål på en væskes motstand mot å flyte. I en silikatsmelte er det grunnleggende byggeelementet
          silikat-tetraederet [SiO₄]⁴⁻, der et sentralt silisiumatom er kovalent bundet til fire oksygenatomer.
          Når silisiuminnholdet i magmaen øker, begynner tetraedrene å dele oksygenatomer i hjørnene og danner lange,
          forgrenede polymerkjeder og tredimensjonale nettverk. Dette øker væskens indre friksjon kolossalt:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border bg-card/60 p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-2 font-semibold">Magmatype</th>
                <th className="pb-2 font-semibold">SiO₂-innhold</th>
                <th className="pb-2 font-semibold">Temperatur</th>
                <th className="pb-2 font-semibold">Viskositet (Pa·s)</th>
                <th className="pb-2 font-semibold">Utbruddsstil</th>
                <th className="pb-2 font-semibold">Typisk miljø</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-muted-foreground">
              <tr>
                <td className="py-2.5 font-medium text-emerald-400">Basaltisk (mafisk)</td>
                <td className="py-2.5">45–52 %</td>
                <td className="py-2.5">1050–1200 °C</td>
                <td className="py-2.5 font-mono">10¹–10² (tyntflytende)</td>
                <td className="py-2.5">Effusiv (lavastrømmer, fontener)</td>
                <td className="py-2.5">Midthavsrygg, Island, Hawaiiske hotspoter</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-teal-400">Andesittisk (intermediær)</td>
                <td className="py-2.5">52–63 %</td>
                <td className="py-2.5">850–1050 °C</td>
                <td className="py-2.5 font-mono">10³–10⁵ (moderat seig)</td>
                <td className="py-2.5">Eksplosiv til sammensatt</td>
                <td className="py-2.5">Subduksjonssoner (vulkanbuer)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-rose-400">Ryolittisk / Dasittisk (felsisk)</td>
                <td className="py-2.5">&gt;63 % (opptil 75 %)</td>
                <td className="py-2.5">700–850 °C</td>
                <td className="py-2.5 font-mono">10⁷–10¹¹ (ekstremt seig)</td>
                <td className="py-2.5">Svært eksplosiv (pliniansk, kaldera)</td>
                <td className="py-2.5">Kontinental skorpesmelting, supervulkaner</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Henrys lov og gassutskilling (eksolusjon)
        </h3>
        <p>
          Dypt nede i jordskorpen står magmakammeret under et enormt lithostatisk overlagstrykk. Ifølge
          <strong className="text-foreground"> Henrys lov</strong> er løseligheten av en gass i en væske direkte
          proporsjonal med partielt trykk. I dypet kan magmaen derfor holde mange vektprosent flyktige stoffer
          (særlig H₂O-damp, CO₂, SO₂, H₂S og HCl) fullstendig oppløst i smelten.
        </p>
        <p>
          Når magmaen stiger oppover i tilførselskanalen, synker omgivelsestrykket. Løselighetsgrensen overskrides,
          og gassene begynner å felle seg ut som bittesmå gassbobler (en prosess kalt <em>vesikulasjon</em> eller
          <em> eksolusjon</em>; Sparks, 1978).
        </p>
        <p>
          Her inntreffer det avgjørende kjemiske veiskillet:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-emerald-400 text-sm">I basaltisk magma (lav viskositet)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              De oppløste gassboblene stiger raskt til toppen og unnslipper lett gjennom den tyntflytende smelten.
              Gassen forlater vulkanen kontinuerlig i form av damp og rolige gassoppstøt. Utbruddet blir
              <strong> effusivt</strong>: rødglødende lavastrømmer flyter rolig nedover fjellsiden, eller danner
              spektakulære, men ufarlige lavafontener.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-rose-400 text-sm">I ryolittisk magma (høy viskositet)</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Den ekstreme viskositeten og de stive silikatnettverkene hindrer boblene i å migrere. Boblene fanges
              i smelten mens trykket inni dem øker voldsomt under dekompresjon. Smelten omdannes til et skum med
              ekstremt innestengt gasspotensial. Når gassvolumet overstiger om lag 75 %, sprenges smelten i stykker
              ved fragmenteringsnivået — resultatet er en katastrofal <strong>eksplosjon</strong>.
            </p>
          </div>
        </div>

        <OrdBoks
          ord="Viskositet"
          barn="Et mål på hvor seig eller tyntflytende en væske er. Basaltisk lava er tyntflytende som varm sirup; ryolittisk lava er så seig at den knapt kan bevege seg uten å sprekke opp."
        />
        <OrdBoks
          ord="Eksolusjon"
          barn="Utskilling av oppløst gass som bobler (vesikler) fra en væske når trykket faller, tilsvarende det som skjer når du åpner en ristet brusflaske."
        />
      </section>

    </>
  );
}
