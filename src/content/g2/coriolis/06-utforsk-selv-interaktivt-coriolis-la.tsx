import { CoriolisModel } from "@/components/models/coriolis-model";

export function UtforskSelvInteraktivtCoriolisLa() {
  return (
    <>
      <h2 className="pt-6 font-display text-2xl font-medium tracking-tight">
        Utforsk selv: Interaktivt Coriolis-laboratorium
      </h2>
      <p>
        Bruk simulatoren under til å eksperimentere med utskytning på ulike breddegrader, observere
        overgangen fra ren geostrofisk vind til friksjonsbremset bakkevind, og beregne Rossby-tallet
        for alt fra badekaret til Golfstrømmen:
      </p>
      <CoriolisModel />
    </>
  );
}
