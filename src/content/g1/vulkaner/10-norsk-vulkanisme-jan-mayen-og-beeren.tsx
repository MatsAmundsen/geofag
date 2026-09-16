import { VolcanoModel } from "@/components/models/volcano-model";

export function NorskVulkanismeJanMayenOgBeeren() {
  return (
    <>
      <section className="pt-6">
        <VolcanoModel />
      </section>
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Norsk vulkanisme: Jan Mayen og Beerenberg
        </h2>
        <p>
          Det norske fastlandet har ingen aktive vulkaner i dag. Oslofeltets magmatisme er en utdødd paleorift
          fra permtiden. Kongeriket har én aktiv vulkan over havet:{" "}
          <strong>Beerenberg på Jan Mayen</strong> (2277 moh.), en isbredekket stratovulkan med utbrudd i
          1970 og 1985.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-sky-400 text-sm">Beerenberg — fakta</h4>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-4">
              <li>Høyde: 2 277 moh. — Nordeuropas høyeste aktive vulkan</li>
              <li>Type: Stratovulkan (basaltisk-hawaiisk til strombolsk)</li>
              <li>Siste utbrudd: september 1970 og januar 1985</li>
              <li>Ligger på Jan Mayen-bruddsonen ved Den midtatlantiske ryggen</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="font-semibold text-amber-400 text-sm">Tektonisk sammenheng</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Jan Mayen ligger på en mikroplate mellom Kolbeinsey-ryggen og Mohnsryggen og
              Jan Mayen-transformbruddsonen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
