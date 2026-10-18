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

const DEBOUNCE_MS = 120;
const RADER_FORST = 3;
const SETNING_MAKS = 240;

function gjeldendeSlug(pathname: string): string | undefined {
  const poster = /^\/poster\/([^/]+)\/?$/.exec(pathname);
  if (poster) return decodeURIComponent(poster[1]!);
  return posterSlugForPath(pathname);
}

function erSkrivefelt(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
}

/** Søkeknapp i toppmenyen. Åpner søket som en dialog (også med / eller Ctrl/⌘ + K). */
export function SiteSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.defaultPrevented) return;
      const ctrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      const slash =
        e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey && !erSkrivefelt(e.target);
      if (ctrlK || slash) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Start hentingen allerede når pekeren eller fokus er på knappen.
  const forvarm = () => {
    void lastSokIndeks().catch(() => {});
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          onPointerEnter={forvarm}
          onFocus={forvarm}
          className={cn(
            "inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground",
            className,
          )}
          aria-label="Søk i Geofag 1 og Geofag 2"
          aria-keyshortcuts="/ Control+K Meta+K"
        >
          <Search className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Søk</span>
        </button>
      </Dialog.Trigger>
      {open ? <SokDialog onClose={() => setOpen(false)} /> : null}
    </Dialog.Root>
  );
}

function SokDialog({ onClose }: { onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const slug = gjeldendeSlug(pathname);
  const [tekst, setTekst] = useState("");
  const [utsatt, setUtsatt] = useState("");
  const [indeks, setIndeks] = useState<ForberedtIndeks | null>(() => lastetIndeks());
  const [feil, setFeil] = useState<string | null>(null);
  const [bareKapittel, setBareKapittel] = useState(false);
  const navigertRef = useRef(false);
  const resultaterRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const statusId = useId();

  const last = useCallback(() => {
    setFeil(null);
    lastSokIndeks()
      .then(setIndeks)
      .catch((err) => {
        console.error("[sok] indeksen kunne ikke lastes", err);
        setFeil("Søket kunne ikke lastes. Sjekk nettet og prøv igjen.");
      });
  }, []);

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
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
      <Dialog.Content
        className="fixed inset-x-0 top-0 z-50 flex h-dvh flex-col border-border bg-card text-card-foreground shadow-2xl sm:inset-x-auto sm:left-1/2 sm:top-[8vh] sm:h-auto sm:max-h-[84vh] sm:w-[min(42rem,calc(100vw-2rem))] sm:-translate-x-1/2 sm:rounded-xl sm:border"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          document.getElementById(inputId)?.focus();
        }}
        onCloseAutoFocus={(e) => {
          // Etter et hopp får avsnittet i kapitlet fokus, ikke søkeknappen.
          if (navigertRef.current) e.preventDefault();
        }}
      >
        <div className="border-b border-border px-4 pb-3 pt-4 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <Dialog.Title className="font-display text-lg font-medium tracking-tight">
              Søk i Geofag 1 og 2
            </Dialog.Title>
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Lukk søket"
            >
              <X className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Søk etter ord i kapitteltekstene. Treffene vises med setningen ordet står i. Velg ordet
            for å gå rett dit i kapitlet. Bruk piltastene for å flytte mellom treffene.
          </Dialog.Description>
          <div className="relative mt-2">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor={inputId} className="sr-only">
              Søkeord
            </label>
            <input
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
              placeholder="Skriv et ord, for eksempel isbre"
              aria-describedby={statusId}
              aria-controls={`${inputId}-res`}
              className="flex h-12 w-full rounded-md border border-border bg-background pl-9 pr-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            />
          </div>
          {harKapittel ? (
            <fieldset className="mt-3">
              <legend className="sr-only">Hvor vil du søke?</legend>
              <div className="flex flex-wrap gap-2 text-sm">
                <OmfangValg
                  name={`${inputId}-omfang`}
                  checked={!bareKapittel}
                  onChange={() => setBareKapittel(false)}
                  label="Hele Geofag"
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
          <p
            id={statusId}
            role="status"
            aria-live="polite"
            className="mt-2 min-h-5 text-sm text-muted-foreground"
          >
            {status}
            {feil ? (
              <button
                type="button"
                onClick={last}
                className="ml-2 text-primary underline underline-offset-2"
              >
                Prøv igjen
              </button>
            ) : null}
          </p>
        </div>

        <div
          id={`${inputId}-res`}
          ref={resultaterRef}
          onKeyDown={onResultKey}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-5"
        >
          {resultat && resultat.antall > 0 ? (
            <Resultater resultat={resultat} sokTekst={utsatt.trim()} onValgt={valgtTreff} />
          ) : !utsatt.trim() ? (
            <p className="py-2 text-sm text-muted-foreground">
              Søket går gjennom teksten i alle kapitlene i Geofag 1 og Geofag 2.
              {harKapittel ? " Treff i kapitlet du står i, vises først." : ""}
            </p>
          ) : null}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function OmfangValg({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
        checked
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="accent-[var(--color-primary)]"
      />
      <span>{label}</span>
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
  return (
    <li className="text-sm leading-relaxed text-foreground/90">
      {rad.overskrift ? (
        <span className="mb-0.5 block text-xs text-muted-foreground">{rad.overskrift}</span>
      ) : null}
      <span className={rad.erOverskrift ? "font-medium" : undefined}>
        {fra > 0 ? "… " : null}
        {deler.map((d, i) =>
          typeof d === "string" ? (
            <span key={i}>{d}</span>
          ) : (
            <Link
              key={i}
              data-sok-lenke=""
              to={kt.kapittel.p as "/"}
              search={{ sok: sokTekst, treff: d.nr } as never}
              onClick={onValgt}
              className="rounded-sm bg-lava/20 px-0.5 font-semibold text-foreground underline decoration-lava decoration-2 underline-offset-2 hover:bg-lava/35"
              aria-label={`${d.tekst}, treff ${d.nr} av ${kt.antall} i ${kt.kapittel.t}`}
            >
              {d.tekst}
            </Link>
          ),
        )}
        {til < rad.setning.length ? " …" : null}
      </span>
    </li>
  );
}
