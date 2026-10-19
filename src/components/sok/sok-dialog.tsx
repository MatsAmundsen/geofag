import * as Dialog from "@radix-ui/react-dialog";
import { Link, useRouterState } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { posterSlugForPath } from "@/lib/chapter-posts";
import {
  type ForberedtIndeks,
  type KapittelTreff,
  lastetIndeks,
  lastSokIndeks,
  sok,
  type SokResultat,
  type TreffRad,
} from "@/lib/sok/klient";
import { cn } from "@/lib/utils";
import {
  SOK_FELT,
  SOK_IKON,
  SOK_INNHOLD,
  SOK_INTRO,
  SOK_LUKK,
  SOK_OVERLAY,
  SOK_PLASSHOLDER,
  SOK_RESULTATER,
  SOK_STATUS,
  SOK_TITTEL,
  SOK_TOPP,
  type SokUtkast,
} from "./sok-stil";

/*
 * Selve søkedialogen. Lastes lat (React.lazy i site-search.tsx), så Radix
 * Dialog og resultatvisningen ikke ligger i bunten på hver side.
 */

const DEBOUNCE_MS = 120;
const RADER_FORST = 3;
const SETNING_MAKS = 240;

function gjeldendeSlug(pathname: string): string | undefined {
  const poster = /^\/poster\/([^/]+)\/?$/.exec(pathname);
  if (poster) return decodeURIComponent(poster[1]!);
  return posterSlugForPath(pathname);
}

export default function SokDialog({
  onClose,
  knappRef,
  inputId,
  utkastRef,
}: {
  onClose: () => void;
  /** søkeknappen, som får fokus tilbake når dialogen lukkes uten hopp */
  knappRef: RefObject<HTMLButtonElement | null>;
  /** id på søkefeltet (samme som i skallet som vises mens dialogen lastes) */
  inputId: string;
  /** det som ble skrevet i skallet før dialogen var klar */
  utkastRef?: RefObject<SokUtkast>;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const slug = gjeldendeSlug(pathname);
  // Leses ved første tegning: det som er skrevet i skallet fram til nå.
  const [utkast] = useState<SokUtkast | undefined>(() => utkastRef?.current);
  const [tekst, setTekst] = useState(() => utkast?.verdi ?? "");
  const [utsatt, setUtsatt] = useState(() => utkast?.verdi ?? "");
  const [indeks, setIndeks] = useState<ForberedtIndeks | null>(() => lastetIndeks());
  const [feil, setFeil] = useState<string | null>(null);
  const [bareKapittel, setBareKapittel] = useState(false);
  const navigertRef = useRef(false);
  const resultaterRef = useRef<HTMLDivElement>(null);
  const statusId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  // Fokus i feltet i det øyeblikket det kommer i DOM-en, med teksten og
  // markøren fra skallet. Radix tegner portalen i en ekstra omgang, så dette
  // gjøres i ref-callbacken og ikke i en effekt (ellers kan tastetrykk gå tapt).
  const overfortRef = useRef(false);
  const settInput = useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el;
      if (!el || overfortRef.current) return;
      overfortRef.current = true;
      // Skallet kan ha fått flere tastetrykk mens dialogen ble tegnet: bruk det nyeste.
      const siste = utkastRef?.current ?? utkast;
      if (siste && siste.verdi !== el.value) {
        el.value = siste.verdi;
        setTekst(siste.verdi);
        setUtsatt(siste.verdi);
      }
      el.focus({ preventScroll: true });
      if (siste && siste.start !== null)
        el.setSelectionRange(siste.start, siste.slutt ?? siste.start);
    },
    [utkastRef, utkast],
  );

  const last = useCallback(() => {
    setFeil(null);
    lastSokIndeks()
      .then(setIndeks)
      .catch((err) => {
        console.error("[sok] indeksen kunne ikke lastes", err);
        setFeil("Søket kunne ikke lastes. Sjekk nettet og prøv igjen.");
      });
  }, []);

  // Hent indeksen med en gang (den er som regel allerede på vei fra knappen).
  useEffect(() => {
    if (!lastetIndeks()) last();
  }, [last]);

  useEffect(() => {
    const t = window.setTimeout(() => setUtsatt(tekst), DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [tekst]);

  const kapittelTittel = useMemo(() => indeks?.k.find((k) => k.s === slug)?.t, [indeks, slug]);
  const harKapittel = Boolean(slug && kapittelTittel);

  const resultat: SokResultat | null = useMemo(() => {
    if (!indeks || !utsatt.trim()) return null;
    return sok(indeks, utsatt, {
      gjeldendeSlug: harKapittel ? slug : undefined,
      bareGjeldende: harKapittel && bareKapittel,
    });
  }, [indeks, utsatt, slug, harKapittel, bareKapittel]);

  const status = feil
    ? feil
    : !indeks
      ? tekst.trim()
        ? "Laster søket …"
        : ""
      : !utsatt.trim()
        ? ""
        : !resultat
          ? "Skriv minst to bokstaver."
          : resultat.antall === 0
            ? `Ingen treff for «${resultat.sporring.visning}»${bareKapittel && harKapittel ? " i dette kapitlet" : ""}.`
            : `${resultat.antall} treff i ${resultat.kapitler} ${resultat.kapitler === 1 ? "kapittel" : "kapitler"}.`;

  const valgtTreff = () => {
    navigertRef.current = true;
    performance.mark("sok-klikk");
    onClose();
  };

  const lenker = () =>
    Array.from(resultaterRef.current?.querySelectorAll<HTMLElement>("a[data-sok-lenke]") ?? []);

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      const first = lenker()[0];
      if (first) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === "Enter") {
      const first = lenker()[0];
      if (first) {
        e.preventDefault();
        first.click();
      }
    }
  };

  const onResultKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const alle = lenker();
    const i = alle.indexOf(document.activeElement as HTMLElement);
    if (i < 0) return;
    e.preventDefault();
    if (e.key === "ArrowDown") alle[Math.min(i + 1, alle.length - 1)]?.focus();
    else if (i === 0) document.getElementById(inputId)?.focus();
    else alle[i - 1]?.focus();
  };

  return (
    <Dialog.Root
      open
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={SOK_OVERLAY} />
        <Dialog.Content
          className={SOK_INNHOLD}
          onOpenAutoFocus={(e) => {
            // Feltet har allerede fokus (ref-callbacken); ikke flytt markøren.
            e.preventDefault();
            if (document.activeElement !== inputRef.current) inputRef.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            // Etter et hopp får avsnittet i kapitlet fokus, ikke søkeknappen.
            e.preventDefault();
            if (!navigertRef.current) knappRef.current?.focus();
          }}
        >
          <div className={SOK_TOPP}>
            <div className="flex items-center justify-between gap-3">
              <Dialog.Title className={SOK_TITTEL}>Søk i Geofag 1 og 2</Dialog.Title>
              <Dialog.Close className={SOK_LUKK} aria-label="Lukk søket">
                <X className="size-5" aria-hidden="true" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              Søk etter ord i kapitteltekstene. Treffene vises med setningen ordet står i. Velg
              ordet for å gå rett dit i kapitlet. Bruk piltastene for å flytte mellom treffene.
            </Dialog.Description>
            <div className="relative mt-2">
              <Search className={SOK_IKON} aria-hidden="true" />
              <label htmlFor={inputId} className="sr-only">
                Søkeord
              </label>
              <input
                ref={settInput}
                id={inputId}
                type="search"
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                value={tekst}
                onChange={(e) => setTekst(e.target.value)}
                onFocus={() => {
                  if (!indeks) last();
                }}
                onKeyDown={onInputKey}
                placeholder={SOK_PLASSHOLDER}
                aria-describedby={statusId}
                aria-controls={`${inputId}-res`}
                className={SOK_FELT}
              />
            </div>
            {harKapittel ? (
              <fieldset className="mt-3 min-w-0">
                <legend className="sr-only">Hvor vil du søke?</legend>
                <div className="flex min-w-0 gap-2 text-sm">
                  <OmfangValg
                    name={`${inputId}-omfang`}
                    checked={!bareKapittel}
                    onChange={() => setBareKapittel(false)}
                    label="Hele Geofag"
                    className="shrink-0"
                  />
                  <OmfangValg
                    name={`${inputId}-omfang`}
                    checked={bareKapittel}
                    onChange={() => setBareKapittel(true)}
                    label={`Bare ${kapittelTittel}`}
                  />
                </div>
              </fieldset>
            ) : null}
            <p id={statusId} role="status" aria-live="polite" className={SOK_STATUS}>
              {status}
            </p>
            {feil ? (
              <button
                type="button"
                onClick={() => {
                  last();
                  // Knappen forsvinner når vi prøver igjen; fokus tilbake til feltet.
                  inputRef.current?.focus();
                }}
                className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-2"
              >
                Prøv igjen
              </button>
            ) : null}
          </div>

          <div
            id={`${inputId}-res`}
            ref={resultaterRef}
            onKeyDown={onResultKey}
            className={SOK_RESULTATER}
          >
            {resultat && resultat.antall > 0 ? (
              <Resultater resultat={resultat} sokTekst={utsatt.trim()} onValgt={valgtTreff} />
            ) : !utsatt.trim() ? (
              <p className="py-2 text-sm text-muted-foreground">
                {SOK_INTRO}
                {harKapittel ? " Treff i kapitlet du står i, vises først." : ""}
              </p>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function OmfangValg({
  name,
  checked,
  onChange,
  label,
  className,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  className?: string;
}) {
  return (
    <label
      title={label}
      className={cn(
        "inline-flex min-h-11 min-w-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
        checked
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="accent-[var(--color-primary)]"
      />
      <span className="truncate">{label}</span>
    </label>
  );
}

function Resultater({
  resultat,
  sokTekst,
  onValgt,
}: {
  resultat: SokResultat;
  sokTekst: string;
  onValgt: () => void;
}) {
  const sum = (liste: KapittelTreff[]) => liste.reduce((n, k) => n + k.antall, 0);
  return (
    <div className="space-y-6">
      {resultat.gjeldende ? (
        <section aria-labelledby="sok-gjeldende">
          <h2
            id="sok-gjeldende"
            className="text-xs font-semibold uppercase tracking-wider text-primary"
          >
            I dette kapitlet
          </h2>
          <ul className="mt-2 space-y-3">
            <KapittelBlokk kt={resultat.gjeldende} sokTekst={sokTekst} onValgt={onValgt} aapen />
          </ul>
        </section>
      ) : null}
      {(
        [
          ["g1", "Geofag 1", resultat.g1],
          ["g2", "Geofag 2", resultat.g2],
        ] as const
      ).map(([id, navn, liste]) =>
        liste.length ? (
          <section key={id} aria-labelledby={`sok-${id}`}>
            <h2
              id={`sok-${id}`}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {navn}
              <span className="ml-2 font-normal normal-case tracking-normal">
                {sum(liste)} treff i {liste.length} {liste.length === 1 ? "kapittel" : "kapitler"}
              </span>
            </h2>
            <ul className="mt-2 space-y-3">
              {liste.map((kt) => (
                <KapittelBlokk key={kt.kapittel.s} kt={kt} sokTekst={sokTekst} onValgt={onValgt} />
              ))}
            </ul>
          </section>
        ) : null,
      )}
    </div>
  );
}

function KapittelBlokk({
  kt,
  sokTekst,
  onValgt,
  aapen = false,
}: {
  kt: KapittelTreff;
  sokTekst: string;
  onValgt: () => void;
  aapen?: boolean;
}) {
  const [visAlle, setVisAlle] = useState(false);
  const forst = aapen ? 5 : RADER_FORST;
  const rader = visAlle ? kt.rader : kt.rader.slice(0, forst);
  const skjulte = kt.rader.length - rader.length;
  const listeId = useId();
  return (
    <li className="rounded-lg border border-border bg-background/60 p-3">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-medium tracking-tight text-foreground">
          {kt.kapittel.t}
        </h3>
        <span className="shrink-0 text-xs text-muted-foreground">{kt.antall} treff</span>
      </div>
      <ul id={listeId} className="mt-2 space-y-2">
        {rader.map((rad, i) => (
          <TreffLinje key={i} rad={rad} kt={kt} sokTekst={sokTekst} onValgt={onValgt} />
        ))}
      </ul>
      {kt.rader.length > forst ? (
        <button
          type="button"
          onClick={() => setVisAlle((v) => !v)}
          aria-expanded={visAlle}
          aria-controls={listeId}
          className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-2 hover:underline"
        >
          {visAlle ? "Vis færre" : `Vis ${skjulte} setninger til`}
        </button>
      ) : null}
    </li>
  );
}

/** Kutter lange setninger rundt første treff. */
function utsnitt(rad: TreffRad): { fra: number; til: number } {
  const len = rad.setning.length;
  if (len <= SETNING_MAKS) return { fra: 0, til: len };
  const forste = rad.treff[0]!;
  let fra = Math.max(0, forste.start - 80);
  let til = Math.min(len, fra + SETNING_MAKS);
  fra = Math.max(0, til - SETNING_MAKS);
  // Ikke kutt midt i et ord.
  if (fra > 0) {
    const mellom = rad.setning.indexOf(" ", fra);
    if (mellom > 0 && mellom < forste.start) fra = mellom + 1;
  }
  if (til < len) {
    const mellom = rad.setning.lastIndexOf(" ", til);
    if (mellom > (rad.treff.at(-1)?.slutt ?? 0)) til = mellom;
  }
  return { fra, til };
}

function TreffLinje({
  rad,
  kt,
  sokTekst,
  onValgt,
}: {
  rad: TreffRad;
  kt: KapittelTreff;
  sokTekst: string;
  onValgt: () => void;
}) {
  const beskrivelseId = useId();
  const { fra, til } = utsnitt(rad);
  const deler: Array<string | { tekst: string; nr: number }> = [];
  let pos = fra;
  for (const t of rad.treff) {
    if (t.start < fra || t.slutt > til) continue;
    if (t.start > pos) deler.push(rad.setning.slice(pos, t.start));
    deler.push({ tekst: rad.setning.slice(t.start, t.slutt), nr: t.nr });
    pos = t.slutt;
  }
  if (pos < til) deler.push(rad.setning.slice(pos, til));
  const utdrag = `${fra > 0 ? "… " : ""}${rad.setning.slice(fra, til)}${til < rad.setning.length ? " …" : ""}`;
  let forsteLenke = true;
  return (
    // Hele raden er klikkbar: første treff i raden strekker seg over raden
    // (::after), og de andre treffene ligger over den. Et klikk utenfor et
    // ord går derfor til første treff i setningen, samme ord som lenken.
    <li className="relative -mx-2 min-h-11 rounded-md px-2 py-1.5 text-sm leading-relaxed text-foreground/90 hover:bg-accent/50">
      {rad.overskrift ? (
        <span className="mb-0.5 block text-xs text-muted-foreground">{rad.overskrift}</span>
      ) : null}
      <span className={rad.erOverskrift ? "font-medium" : undefined}>
        {fra > 0 ? "… " : null}
        {deler.map((d, i) => {
          if (typeof d === "string") return <span key={i}>{d}</span>;
          const strekk = forsteLenke;
          forsteLenke = false;
          return (
            <Link
              key={i}
              data-sok-lenke=""
              to={kt.kapittel.p as "/"}
              search={{ sok: sokTekst, treff: d.nr } as never}
              onClick={onValgt}
              aria-describedby={`${beskrivelseId}-${d.nr}`}
              className={cn(
                "rounded-sm bg-lava/20 px-0.5 font-semibold text-foreground underline decoration-lava decoration-2 underline-offset-2 hover:bg-lava/35",
                strekk ? "after:absolute after:inset-0 after:rounded-md" : "relative z-10",
              )}
            >
              {d.tekst}
            </Link>
          );
        })}
        {til < rad.setning.length ? " …" : null}
      </span>
      {deler.map((d) =>
        typeof d === "string" ? null : (
          <span key={d.nr} id={`${beskrivelseId}-${d.nr}`} hidden>
            {`Treff ${d.nr} av ${kt.antall} i ${kt.kapittel.t}: ${utdrag}`}
          </span>
        ),
      )}
    </li>
  );
}
