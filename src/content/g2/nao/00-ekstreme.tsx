import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function EkstremeNaoVintre() {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-6 rounded-xl border border-sky-500/30 bg-sky-500/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="inline-flex size-2.5 animate-pulse rounded-full bg-sky-400" />
          <span className="font-display text-lg font-medium tracking-tight text-sky-400">
            Ekstreme NAO-vintre — Kuldesjokk, stormer og vannkrise
          </span>
        </span>
        {open ? (
          <ChevronUp className="size-5 shrink-0 text-sky-400" />
        ) : (
          <ChevronDown className="size-5 shrink-0 text-sky-400" />
        )}
      </button>
      {open && (
        <div className="space-y-5 border-t border-sky-500/20 px-5 py-5 text-sm leading-relaxed text-foreground/90">
          <p>
            NAO er ikke bare en teoretisk indeks i meteorologien — den er den suverent viktigste
            enkeltfaktoren som avgjør om en norsk vinter blir mild og stormfull eller iskald og
            knusktørr. De siste tiårene har vi sett dramatiske eksempler på hva som skjer når
            svingningen låser seg i ytterpunktene:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border/80 bg-background/60 p-4">
              <p className="font-semibold text-sky-400">
                Vinteren 2009/2010 — Ekstrem NAO− og sprengkulde
              </p>
              <p className="mt-1 text-xs text-foreground/80 sm:text-sm">
                Den mest ekstreme negative NAO-vinteren registrert siden målingene startet i 1821.
                Et massivt blokkerende høytrykk parkerte over Skandinavia i tre måneder. Oslofjorden
                frøs til is, strømforbruket og strømprisene satte historiske rekorder, og snøkaos
                lammet London og Paris. Samtidig opplevde Vest-Grønland og Nord-Canada temperaturer{" "}
                <strong>5–10 °C over normalen</strong> fordi høytrykket pumpet varmluft nordover på
                sin vestside — den klassiske «seesaw»-effekten.
              </p>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-4">
              <p className="font-semibold text-sky-400">
                Januar 2024 — SSW og arktisk kuldesjokk (-31,1 °C i Oslo)
              </p>
              <p className="mt-1 text-xs text-foreground/80 sm:text-sm">
                I slutten av desember 2023 inntraff en plutselig stratosfærisk oppvarming (SSW) over
                Arktis. Polarvirvelen kollapset, og to uker senere tippet NAO over i dyp negativ
                fase. 6. januar 2024 falt temperaturen i Bjørnholt i Nordmarka til{" "}
                <strong>-31,1 °C</strong> — den laveste temperaturen målt i Oslo kommune i moderne
                tid. Kautokeino målte <strong>-44,0 °C</strong>.
              </p>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-4">
              <p className="font-semibold text-amber-400">
                1989–1995 — Super-NAO+ og historisk brevekst
              </p>
              <p className="mt-1 text-xs text-foreground/80 sm:text-sm">
                En enestående serie med vedvarende positive NAO-vintre. Polarjeten sto som en
                spyletråle mot Vestlandet, noe som utløste den voldsomme{" "}
                <strong>Nyttårsorkanen i 1992</strong> (vindkast over 60 m/s). De enorme snømengdene
                i fjellet førte til at maritime vestlandsbreer (Nigardsbreen og Briksdalsbreen)
                rykket frem flere hundre meter på få år (Nesje et al., 2000).
              </p>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-4">
              <p className="font-semibold text-amber-400">
                Middelhavets tørkekrise under sterk NAO+
              </p>
              <p className="mt-1 text-xs text-foreground/80 sm:text-sm">
                Når NAO+ bringer flom og mildvær til Norge, blokkerer et forsterket Azorhøytrykk
                all atlantisk fuktighet over Sør-Europa. Vintrene 2022 og 2023 var preget av sterk
                positiv NAO, noe som førte til at vannmagasinene i Catalonia og Sør-Spania falt
                under 18 % kapasitet, med restriksjoner på drikkevann og krise for landbruket.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
