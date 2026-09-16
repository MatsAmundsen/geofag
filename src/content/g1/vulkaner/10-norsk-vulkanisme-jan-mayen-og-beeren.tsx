import { VolcanoModel } from "@/components/models/volcano-model";

export function NorskVulkanismeJanMayenOgBeeren() {
  return (
    <>
      {/* SEKSJON 6: INTERAKTIV MODELL */}
      <section className="pt-6">
        <VolcanoModel />
      </section>

      {/* SEKSJON 7: NORSK VULKANISME */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Norsk vulkanisme: Jan Mayen og Beerenberg
        </h2>
        <p>
          Det norske fastlandet har ingen aktive vulkaner i dag. Den berømte magmatismen i Oslofeltet — med rombeporfyr,
          larvikitt og basaltiske lavadekker — er en utdødd paleorift fra permtiden for nær 300 millioner år siden.
        </p>
        <p>
          Kongeriket Norge har imidlertid én aktiv vulkan over havoverflaten:{" "}
          <strong className="text-foreground">Beerenberg på Jan Mayen</strong>{" "}
          (2277 moh.). Jan Mayen ligger på en mikrokontinentalflik like ved Den midtatlantiske spredningsryggen og
          Jan Mayen-bruddsonen i Norskehavet. Beerenberg er en massiv, isbredekket{" "}
          <strong>stratovulkan</strong> som sist hadde store utbrudd i september 1970 og januar 1985, der basaltisk lava
          strømmet ut i havet og utvidet øyas landareal.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-sky-400 text-sm">Beerenberg — fakta</h4>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-4">
              <li>Høyde: 2 277 moh. — Nordeuropas høyeste aktive vulkan</li>
              <li>Type: Stratovulkan (basaltisk-hawaiisk til strombolsk utbruddsstil)</li>
              <li>Siste utbrudd: September 1970 og januar 1985</li>
              <li>Dekket av flere aktive isbreer (Weyprechtbreen, Kronprins Olavs bre)</li>
              <li>Ligger på Jan Mayen-bruddsonen ved Den midtatlantiske ryggen</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-amber-400 text-sm">Tektonisk sammenheng</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Jan Mayen befinner seg på en isolert mikroplate fanget mellom Den midtatlantiske ryggen (Kolbeinsey-ryggen
              i sør og Mohnsryggen i nord) og Jan Mayen-transformbruddsonen. Den tektoniske settingen gir en unik kombinasjon
              av havbunnsspredning og en lokal manteldiapir (hotspot) som ennå debatteres blant geofysikere
              (Norsk Polarinstitutt, u.å.).
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
