import { OrdBoks } from "@/components/term";
import { JetBlockingDiagram } from "@/components/diagrams";

export function AtmosfaeriskBlokkeringOmegaBlokk() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Atmosfærisk blokkering: Omega-blokk og Rex-blokk
      </h2>
      <p>
        En blokkering er et høytrykk som stanser jetstrømmen. I en Omega-blokk deler jeten seg rundt
        høytrykket som bokstaven Ω. Sommer: hete og tørke. Vinter: inversjon og sprengkulde.
      </p>
      <OrdBoks
        ord="Omega-blokk (Ω)"
        barn="Kvasistasjonær blokkering der en høytrykksrygg deler jetstrømmen og låser været i ukesvis."
      />
      <JetBlockingDiagram />
    </>
  );
}
