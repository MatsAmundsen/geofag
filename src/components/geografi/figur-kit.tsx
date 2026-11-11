import { useId, useState, type ReactNode } from "react";
import { FigureFrame } from "@/components/figure-frame";
import { cn } from "@/lib/utils";

/**
 * Felles byggeklosser for figurene i Geografi-kapitlene (Vg1).
 * Alle figurer står i <figure> og får dermed de mørke figurfargene i begge tema
 * (se styles.css). Tekst bruker tokens (foreground, muted-foreground, primary),
 * så kontrasten følger temaet. Ingen av klossene er avhengige av JavaScript for å
 * vise innholdet: StegFigur og LagSammenligning viser all tekst i DOM-en.
 */

/** Figurramme med overskrift, figurtekst og en egen kildelinje. */
export function GeoFigur({
  heading,
  caption,
  kilde,
  action,
  children,
}: {
  heading: string;
  caption: ReactNode;
  /** Kreditering, f.eks. «Kart: Natural Earth (public domain). Utforming: geofag.com». */
  kilde?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <FigureFrame
      className="geo-figur"
      heading={heading}
      action={action}
      caption={
        <>
          {caption}
          {kilde ? <span className="mt-1.5 block text-sm text-muted-foreground">{kilde}</span> : null}
        </>
      }
    >
      {children}
    </FigureFrame>
  );
}

/** Knapperad der én verdi er valgt (radiogruppe-semantikk med aria-pressed). */
export function ValgKnapper<T extends string>({
  label,
  valg,
  aktiv,
  onVelg,
}: {
  label: string;
  valg: readonly { id: T; navn: string }[];
  aktiv: T;
  onVelg: (id: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {valg.map((v) => (
        <button
          key={v.id}
          type="button"
          aria-pressed={v.id === aktiv}
          onClick={() => onVelg(v.id)}
          className={cn(
            "min-h-11 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            v.id === aktiv
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-muted text-foreground hover:border-primary",
          )}
        >
          {v.navn}
        </button>
      ))}
    </div>
  );
}

export type Steg = {
  /** Kort tittel på knappen og i lista, f.eks. «Planlegge». */
  tittel: string;
  /** Forklaring som vises under grafikken for valgt steg. */
  tekst: ReactNode;
  /** Grafikk for steget. Utelates når hele figuren er felles (bruk da `felles`). */
  figur?: ReactNode;
};

/**
 * Nummererte trinn med fast perspektiv. Uten JS (SSR) vises trinn 1 og en
 * fullstendig nummerert liste med all tekst, så innholdet er lesbart uansett.
 */
export function StegFigur({
  steg,
  felles,
  label,
  visListe = true,
}: {
  steg: readonly Steg[];
  /** Felles grafikk som får aktivt trinn som argument (alternativ til `figur` per steg). */
  felles?: (aktiv: number) => ReactNode;
  label: string;
  /** Vis alle trinnene som liste under grafikken (tekstalternativ). */
  visListe?: boolean;
}) {
  const [aktiv, setAktiv] = useState(0);
  const id = useId();
  const s = steg[aktiv];
  return (
    <div className="space-y-4">
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {steg.map((t, i) => (
          <button
            key={t.tittel}
            type="button"
            aria-pressed={i === aktiv}
            aria-controls={`${id}-panel`}
            onClick={() => setAktiv(i)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              i === aktiv
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted text-foreground hover:border-primary",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-6 place-items-center rounded-full text-xs font-semibold",
                i === aktiv ? "bg-primary-foreground text-primary" : "bg-card text-foreground",
              )}
            >
              {i + 1}
            </span>
            {t.tittel}
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} aria-live="polite">
        {felles ? felles(aktiv) : s.figur}
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          <span className="font-semibold">
            Trinn {aktiv + 1} av {steg.length}: {s.tittel}.
          </span>{" "}
          {s.tekst}
        </p>
      </div>
      {visListe ? (
        <details className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm">
          <summary className="cursor-pointer py-1 font-medium text-foreground">Alle trinn som tekst</summary>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-muted-foreground">
            {steg.map((t) => (
              <li key={t.tittel}>
                <span className="font-medium text-foreground">{t.tittel}:</span> {t.tekst}
              </li>
            ))}
          </ol>
        </details>
      ) : null}
    </div>
  );
}

export type Lag = { id: string; navn: string; innhold: ReactNode; beskrivelse: ReactNode };

/** Samme sted eller samme data i to–fire framstillinger. Brukeren bytter mellom dem. */
export function LagSammenligning({ lag, label, start }: { lag: readonly Lag[]; label: string; /** Laget som vises først. */ start?: string }) {
  const [aktiv, setAktiv] = useState(start ?? lag[0].id);
  const valgt = lag.find((l) => l.id === aktiv) ?? lag[0];
  return (
    <div className="space-y-4">
      <ValgKnapper label={label} valg={lag} aktiv={aktiv} onVelg={setAktiv} />
      <div aria-live="polite">
        {valgt.innhold}
        <p className="mt-3 text-sm leading-relaxed text-foreground">{valgt.beskrivelse}</p>
      </div>
    </div>
  );
}

/** Tegnforklaring med små symboler. `symbol` er en liten SVG eller farget flate. */
export function Tegnforklaring({
  poster,
  tittel = "Tegnforklaring",
}: {
  poster: readonly { symbol: ReactNode; tekst: string }[];
  tittel?: string;
}) {
  return (
    <div className="mt-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tittel}</p>
      <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-foreground">
        {poster.map((p) => (
          <li key={p.tekst} className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="inline-flex size-5 items-center justify-center">
              {p.symbol}
            </span>
            {p.tekst}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Farget firkant til tegnforklaringer. */
export function Flate({ farge, kant }: { farge: string; kant?: string }) {
  return (
    <span
      className="block size-4 rounded-sm"
      style={{ background: farge, border: `1.5px solid ${kant ?? farge}` }}
    />
  );
}

/** Liten merkelapp «Oppdiktet eksempel» / «Konstruerte tall» som står i selve figuren. */
export function Merkelapp({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-amber-400/60 bg-amber-950/60 px-2 py-0.5 text-xs font-medium text-amber-200">
      {children}
    </span>
  );
}
