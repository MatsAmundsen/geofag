import { OrdBoks } from "@/components/term";

export function SammeFysikkHoyereInnsatsNaturfare() {
  return (
    <>
      <h2 className="font-display text-2xl font-medium tracking-tight">
        1. Samme fysikk, høyere innsats: Naturfare, sårbarhet og risiko
      </h2>
      <p>
        En værkatastrofe bryter ikke med termodynamikkens eller hydrodynamikkens lover. Den er den mest konsentrerte manifestasjonen av trykkgradienter, oppdrift, adiabatisk avkjøling, kondensasjonsvarme, Coriolis og baroklin instabilitet. Forskjellen mellom kuling og katastrofe er energitetthet, konsentrasjon — og om infrastruktur står i skuddlinjen.
      </p>
      <p>
        I geofag skiller vi mellom et <strong>fysisk naturfenomen</strong>, en <strong>naturfare</strong> og en <strong>naturkatastrofe</strong>:
      </p>
      <ul className="list-disc space-y-2 pl-6 text-foreground/90">
        <li><strong>Naturfare (Hazard):</strong> Naturlig prosess med potensial til tap av liv eller infrastruktur (Kategori 5 over åpent hav, steinras i ubebodd dal).</li>
        <li><strong>Sårbarhet (Vulnerability):</strong> Fysiske, sosiale og økonomiske faktorer som avgjør skadeomfang (kvikkleire, flomvern, varsling).</li>
        <li><strong>Naturkatastrofe (Disaster):</strong> Alvorlig forstyrrelse når faren rammer et sårbart område og tapene overstiger det lokalsamfunnet makter.</li>
      </ul>
      <p>Dette formaliseres gjennom risikoligningen:</p>
      <div className="my-4 rounded-xl border border-border bg-card p-4 text-center">
        <span className="font-mono text-lg font-bold text-primary">Risiko = Naturfare × Sårbarhet × Eksponering</span>
      </div>
      <OrdBoks
        ord="Naturfare og risiko"
        barn="Naturfare er den fysiske hendelsen. Risiko er forventet tap: fare × sårbarhet × eksponerte verdier."
      />
    </>
  );
}
