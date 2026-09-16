import { NaoPhasesComparisonDiagram } from "@/components/diagrams";
import { OrdBoks } from "@/components/term";

export function HvaEr() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">Hva NAO er</h2>
      <p>
        <strong>Den nordatlantiske oscillasjon (NAO)</strong> er det dominerende moduset for
        naturlig klimavariasjon i Nord-Atlanteren og Europa (Hurrell, 1995; Walker & Bliss, 1932).
        Den beskriver storskala svingninger i lufttrykket ved havnivå mellom to semi-permanente
        atmosfæriske trykksystemer:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Azorhøytrykket:</strong> Et subtropisk høytrykkssenter rundt 30°–40°N dannet av
          nedsynkende luft i Hadley-cellen.
        </li>
        <li>
          <strong>Islandslavtrykket:</strong> Et subpolart lavtrykkssenter rundt 60°–65°N dannet av
          kontinuerlig syklonaktivitet langs polarfronten.
        </li>
      </ul>
      <p>
        Akkurat som ENSO i Stillehavet har NAO to motsatte faser — <strong>positiv (NAO+)</strong>{" "}
        og <strong>negativ (NAO−)</strong> — definert av hvor stor trykkforskjellen mellom disse to
        sentrene er. Denne trykkgradienten fungerer som en kraftig motor for vestavindsbeltet.
      </p>
      <NaoPhasesComparisonDiagram />
      <OrdBoks
        ord="NAO (North Atlantic Oscillation)"
        barn="Svingning i lufttrykksforskjellen mellom Azorhøytrykket og Islandslavtrykket. Stor trykkforskjell (NAO+) gir sterk, sonal polarjet og milde, våte vintre i Norge. Liten trykkforskjell (NAO−) gir meandrerende jet, atmosfærisk blokkering og kalde, tørre vintre i Norge."
      />
    </>
  );
}
