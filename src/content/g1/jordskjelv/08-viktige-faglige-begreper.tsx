import { Term, TermGrid } from "@/components/term";

export function ViktigeFagligeBegreper() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">Viktige faglige begreper</h2>
      <TermGrid>
        <Term name="elastisk tilbakefjæring" def="Reid: bergarter bøyes langs låst forkastning til låsen brister." />
        <Term name="hyposenter" def="Bruddpunktet i skorpen der energien først utløses." />
        <Term name="episenter" def="Punkt på overflaten loddrett over hyposenteret." />
        <Term name="P-bølge" def="Kompresjonsbølge, ~6–8 km/s, går gjennom fast stoff og væske." />
        <Term name="S-bølge" def="Skjærbølge. Går ikke gjennom væske." />
        <Term name="momentmagnitude (Mw)" def="Energi fra forkastningsareal, forskyvning og stivhet." />
        <Term name="Wadati-Benioff-sone" def="Dype skjelv i en kald subduksjonsplate, ned til 700 km." />
        <Term name="intraplate-jordskjelv" def="Skjelv inne på en plate, som i Norge." />
      </TermGrid>
    </>
  );
}
