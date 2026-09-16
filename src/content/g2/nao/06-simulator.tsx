import { CollapsibleSection } from "@/components/collapsible-section";
import { NaoInteractiveSimulator } from "@/components/diagrams";

export function Simulator() {
  return (
    <CollapsibleSection
      title="4. Sammenlign fasene (Interaktiv simulator)"
      subtitle="Utforsk og animer trykksystemer, polarjet, stormbaner og vær i sanntid"
      badge="Interaktiv modell"
      badgeVariant="primary"
    >
      <p className="text-sm sm:text-base text-foreground/90">
        Bruk knappene øverst i simuleringen for å veksle direkte mellom <strong>NAO+</strong>,{" "}
        <strong>Nøytral</strong> og <strong>NAO−</strong>. Legg merke til hvordan:
      </p>
      <ul className="mt-2 mb-4 list-disc space-y-1 pl-5 text-xs text-muted-foreground sm:text-sm">
        <li>Trykksentrene roterer (mot klokken rundt L ved Island, med klokken rundt H ved Azorene).</li>
        <li>Partiklene i polarjeten suser raskt og sonalt mot Norge i NAO+, men meandrerer sørover mot Middelhavet i NAO−.</li>
        <li>Stormbanen og lavtrykkene forskyver seg tusenvis av kilometer mellom fasene.</li>
      </ul>
      <NaoInteractiveSimulator />
    </CollapsibleSection>
  );
}
