import { PlateTectonicsModel } from "@/components/models/plate-tectonics-model";

export function Modell() {
  return (
    <section className="pt-6 space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight">
        Interaktiv geodynamisk modell: Utforsk plategrensene
      </h2>
      <p>
        Bruk simulatoren under til å eksperimentere med de ulike plategrensene. Juster platehastigheten, slå av og på
        jordskjelvfokus (legg merke til hvordan Wadati-Benioff-sonen tegnes opp i subduksjonsmodus), og studer hvordan
        dekompresjonssmelting skiller seg fra flukssmelting:
      </p>
      <PlateTectonicsModel />
    </section>
  );
}
