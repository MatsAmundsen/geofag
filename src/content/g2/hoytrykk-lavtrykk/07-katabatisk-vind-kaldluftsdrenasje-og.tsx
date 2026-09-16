import { OrdBoks } from "@/components/term";
import { KatabaticWindDiagram } from "@/components/diagrams";

export function KatabatiskVindKaldluftsdrenasjeOg() {
  return (
    <>
      <h2 className="pt-4 font-display text-2xl font-medium tracking-tight">
        Katabatisk vind: Kaldluftsdrenasje og temperaturinversjon
      </h2>
      <p>
        Katabatisk vind oppstår når snø eller is strålingskjøles. Luften blir tett og renner nedover
        som vann. Den er fremdeles iskald i dalbunnen og lager kaldluftssjø og inversjon.
      </p>
      <OrdBoks
        ord="Katabatisk vind"
        barn="Kald, tung luft som dreneres nedover av tyngdekraften fra snø- og isflater."
      />
      <ul className="list-disc space-y-1 pl-6">
        <li>Folgefonna og Svartisen: «bresnøft» mot fjorden.</li>
        <li>Grønland og Antarktis: katabatisk vind kan nå over 70 m/s.</li>
      </ul>
      <KatabaticWindDiagram />
    </>
  );
}
