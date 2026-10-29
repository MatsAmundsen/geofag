import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import {
  brandForPath,
  NAV_GF1,
  NAV_GF1_ROWS,
  NAV_GF2,
  NAV_GF2_ROWS,
  navForPath,
  navGroupsForPath,
} from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiteSearch } from "@/components/sok/site-search";

function isItemActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || (to !== "/geofag-2" && pathname.startsWith(`${to}/`));
}

// Lastet med #anker: ruterens første scrollIntoView skal ikke arve scroll-behavior: smooth fra styles.css
// (da glir siden forbi målet før rettingen). Settes før hydreringen og fjernes i stopp() nedenfor, så
// klikk på ankre på samme side glir som før.
// Ekte brukerinndata registreres allerede når modulen lastes (før hydreringen og før effekten under kjører),
// så rulling i de første par hundre millisekundene aldri blir «rettet» tilbake til ankeret.
const INNDATA = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
let brukerHarRullet = false;
let fjernTidligLytter = () => {};
if (typeof window !== "undefined" && window.location.hash.length > 1) {
  document.documentElement.style.scrollBehavior = "auto";
  const merk = () => {
    brukerHarRullet = true;
    fjernTidligLytter();
  };
  fjernTidligLytter = () => {
    for (const h of INNDATA) window.removeEventListener(h, merk, true);
    fjernTidligLytter = () => {};
  };
  for (const h of INNDATA) window.addEventListener(h, merk, { passive: true, capture: true });
}

function rullTilHashEtterMaaling(finnHeader: () => HTMLElement | null) {
  const root = document.documentElement;
  let id = "";
  try {
    id = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    id = "";
  }
  if (!id) {
    root.style.removeProperty("scroll-behavior");
    return () => {};
  }
  fjernTidligLytter();
  if (brukerHarRullet) {
    root.style.removeProperty("scroll-behavior");
    return () => {};
  }
  let forrigeY = Number.NaN;
  // Posisjonen siden sist ble godtatt eller rettet til. Flytter siden seg bort derfra uten at denne logikken
  // rullet (skjermleserens bla-modus, «finn på siden», skript), overtar brukeren: stopp, ikke rull tilbake.
  // NaN til første stille ramme: nettleserens egen hash-rulling og ruterens scrollIntoView rett etter
  // hydreringen skal ikke regnes som «flyttet av andre». Ekte inndata stopper uansett med en gang.
  let egenY = Number.NaN;
  let stoppet = false;
  let ramme = 0;
  const start = performance.now();
  const flyttetAvAndre = () => !Number.isNaN(egenY) && Math.abs(window.scrollY - egenY) > 2;
  // Sjekkes hver ramme (ikke hvert 150. ms), så en layoutendring rettes i neste ramme i stedet for å stå feil
  // i flere hundre millisekunder. «Stille» = samme scrollY to rammer på rad.
  const sjekk = () => {
    ramme = 0;
    if (stoppet) return;
    if (brukerHarRullet || flyttetAvAndre()) return stopp();
    if (performance.now() - start > 3000) return stopp();
    const y = window.scrollY;
    const stille = y === forrigeY;
    forrigeY = y;
    if (stille) {
      const mal = document.getElementById(id);
      const header = finnHeader();
      if (mal && header) {
        const bunn = header.getBoundingClientRect().bottom;
        const top = mal.getBoundingClientRect().top;
        const nederst = y >= root.scrollHeight - window.innerHeight - 1;
        if ((top < bunn + 8 || top > bunn + 24) && !(nederst && top > bunn)) {
          mal.scrollIntoView({ block: "start", behavior: "instant" });
          forrigeY = Number.NaN;
        }
      }
      egenY = window.scrollY;
    }
    ramme = window.requestAnimationFrame(sjekk);
  };
  const vedInndata = () => {
    brukerHarRullet = true;
    stopp();
  };
  const vedRulling = () => {
    if (flyttetAvAndre()) stopp();
  };
  // Layoutendringer (figurer, plassholdere, skrift) utløser en sjekk i samme ramme.
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
    if (!stoppet && !ramme) ramme = window.requestAnimationFrame(sjekk);
  }) : null;
  ro?.observe(document.body);
  function stopp() {
    if (stoppet) return;
    stoppet = true;
    if (ramme) window.cancelAnimationFrame(ramme);
    ro?.disconnect();
    for (const h of INNDATA) window.removeEventListener(h, vedInndata, true);
    window.removeEventListener("scroll", vedRulling);
    root.style.removeProperty("scroll-behavior");
  }
  for (const h of INNDATA) window.addEventListener(h, vedInndata, { passive: true, capture: true });
  window.addEventListener("scroll", vedRulling, { passive: true });
  ramme = window.requestAnimationFrame(sjekk);
  return stopp;
}

// Rettingen starter allerede når modulen lastes (før hydreringen), ikke først i effekten: ellers kan
// ankeret stå feil i flere hundre millisekunder mens hydreringen pågår. Effekten tar over stopp-funksjonen.
const HEADER_VELGER = "body header.sticky";
let tidligStopp: (() => void) | null =
  typeof window !== "undefined" && window.location.hash.length > 1
    ? rullTilHashEtterMaaling(() => document.querySelector<HTMLElement>(HEADER_VELGER))
    : null;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  // Rulleposisjonen da menyen ble åpnet. Når toppmenyen vokser, flytter nettleseren siden (scroll anchoring),
  // så vi setter den tilbake ved lukking uten sidebytte.
  const rullFor = useRef<{ y: number; sti: string } | null>(null);
  const veksleMeny = () => {
    if (!open) rullFor.current = { y: window.scrollY, sti: window.location.pathname };
    setOpen((v) => !v);
  };
  const menyId = useId();

  // Den klebrige toppmenyen må ikke skjule fokus eller ankermål (WCAG 2.4.11). Høyden måles og gis til
  // html som --site-header-h, som scroll-padding-top i styles.css bruker (CSS-reserven gjelder før dette).
  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof ResizeObserver === "undefined") return;
    const root = document.documentElement;
    const apply = () =>
      root.style.setProperty(
        "--site-header-h",
        `${Math.ceil(header.getBoundingClientRect().height)}px`,
      );
    apply();
    // Lastet med #anker: nettleseren ruller før målingen (med CSS-reserven), myk rulling kan avbrytes
    // under hydreringen, og målet kan dukke opp først etter hydreringen. I opptil 3 s etter innlasting:
    // når rullingen står stille og målet ikke står rett under menyen, rull dit med målt høyde. Stopper
    // ved første brukerinndata, og når noe annet enn denne logikken flytter siden.
    const stopp =
      tidligStopp ??
      rullTilHashEtterMaaling(() => (header.isConnected ? header : document.querySelector(HEADER_VELGER)));
    tidligStopp = null;
    const ro = new ResizeObserver(apply);
    ro.observe(header);
    return () => {
      stopp();
      ro.disconnect();
      root.style.removeProperty("--site-header-h");
    };
  }, []);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = navForPath(pathname);
  const brand = brandForPath(pathname);

  const isGf1 = pathname.startsWith("/geofag-1");
  const isGf2 =
    pathname.startsWith("/geofag-2") ||
    pathname.startsWith("/tema") ||
    pathname.startsWith("/eksamen");
  const isHome = pathname === "/";
  const menuRows = items === NAV_GF2 ? NAV_GF2_ROWS : items === NAV_GF1 ? NAV_GF1_ROWS : null;
  const groups = navGroupsForPath(pathname);

  // Mobilmenyen (under md): siden bak ligger låst mens menyen er åpen, Escape lukker og gir fokus tilbake
  // til knappen, og Tab går rundt i toppmenyen (fokus-felle). Under md får toppmenyen max-height 100dvh,
  // og selve lista ruller (se className på mobilmenyen under).
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    // Bare html (visningsflaten) låses. Låses body også, mister siden rulleposisjonen og den klebrige
    // toppmenyen følger med oppover.
    const forrige = html.style.overflow;
    html.style.overflow = "hidden";
    const bred = window.matchMedia("(min-width: 768px)");
    const vedBredde = () => {
      if (bred.matches) setOpen(false);
    };
    bred.addEventListener("change", vedBredde);
    const fokuserbare = () => {
      const header = headerRef.current;
      if (!header) return [] as HTMLElement[];
      return Array.from(
        header.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.getClientRects().length > 0);
    };
    const vedTast = (e: KeyboardEvent) => {
      const header = headerRef.current;
      if (!header) return;
      // Søkedialogen har sin egen Escape og sin egen fokus-felle.
      if (document.querySelector('[role="dialog"]')) return;
      if (e.key === "Escape" && !e.defaultPrevented) {
        e.preventDefault();
        setOpen(false);
        header.querySelector<HTMLElement>('button[aria-controls="mobilmeny"]')?.focus();
        return;
      }
      if (e.key !== "Tab" || !(e.target instanceof Node) || !header.contains(e.target)) return;
      const liste = fokuserbare();
      const forste = liste[0];
      const siste = liste[liste.length - 1];
      if (!forste || !siste) return;
      if (e.shiftKey && document.activeElement === forste) {
        e.preventDefault();
        siste.focus();
      } else if (!e.shiftKey && document.activeElement === siste) {
        e.preventDefault();
        forste.focus();
      }
    };
    document.addEventListener("keydown", vedTast);
    return () => {
      html.style.overflow = forrige;
      const lagret = rullFor.current;
      rullFor.current = null;
      if (lagret && lagret.sti === window.location.pathname) {
        window.scrollTo({ top: lagret.y, behavior: "instant" });
      }
      bred.removeEventListener("change", vedBredde);
      document.removeEventListener("keydown", vedTast);
    };
  }, [open]);

  // Ny side: menyen skal være lukket.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md",
        open && "max-md:flex max-md:max-h-dvh max-md:flex-col",
      )}
    >
      {menuRows ? (
        <div className="mx-auto w-full max-w-6xl shrink-0 px-4 sm:px-6">
          <div className="flex min-h-14 items-center justify-between gap-3 py-2">
            <BrandCluster
              brand={brand}
              isHome={isHome}
              isGf1={isGf1}
              isGf2={isGf2}
              onNavigate={() => setOpen(false)}
            />
            <div className="flex shrink-0 items-center gap-2">
              <SiteSearch />
              <MenuButton open={open} onClick={veksleMeny} />
            </div>
          </div>
          <nav
            className="hidden w-full min-w-0 gap-0.5 border-t border-border/70 py-1.5 md:flex md:flex-col"
            aria-label="Hovedmeny"
          >
            {menuRows.map((row) => (
              <div key={row[0]?.to} className="flex w-full min-w-0 flex-wrap items-center gap-1">
                {row.map((item) => (
                  <NavLink key={item.to} item={item} pathname={pathname} />
                ))}
              </div>
            ))}
          </nav>
        </div>
      ) : (
        <div className="mx-auto flex h-16 w-full max-w-6xl shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-h-11 items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-muted"
              onClick={() => setOpen(false)}
              aria-label="Gå til hovedforsiden"
            >
              <div className="grid size-8 place-items-center rounded-md border border-border bg-card text-primary">
                <GlobeMark />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-sm font-semibold tracking-tight text-foreground">
                  Geofag
                </span>
                <span className="text-[10px] text-muted-foreground">Forside</span>
              </div>
            </Link>

            {!isHome && (
              <>
                <span className="text-border select-none" aria-hidden="true">
                  /
                </span>
                <Link
                  to={isGf1 ? "/geofag-1" : isGf2 ? "/geofag-2" : "/"}
                  className="leading-tight"
                  onClick={() => setOpen(false)}
                >
                  <span className="block font-display text-sm font-medium tracking-tight text-foreground">
                    {brand.title}
                  </span>
                  <span className="hidden text-xs text-muted-foreground sm:block">{brand.sub}</span>
                </Link>
              </>
            )}

            {/* Quick Subject Switcher on larger screens */}
            {isGf1 && (
              <Link
                to="/geofag-2"
                className="ml-2 hidden items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card hover:text-foreground lg:inline-flex"
              >
                <span>Geofag 2</span>
                <ArrowRight className="size-3" />
              </Link>
            )}
            {isGf2 && (
              <Link
                to="/geofag-1"
                className="ml-2 hidden items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-lava/50 hover:bg-card hover:text-foreground lg:inline-flex"
              >
                <ArrowLeft className="size-3" />
                <span>Geofag 1</span>
              </Link>
            )}
          </div>

          <nav className="hidden items-center gap-1 md:ml-auto md:flex" aria-label="Hovedmeny">
            {items.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to ||
                    (item.to !== "/geofag-2" && pathname.startsWith(`${item.to}/`));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center rounded-md px-2 text-sm transition-colors",
                    active
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            {isGf1 && (
              <Link
                to="/geofag-2"
                className="ml-2 inline-flex h-9 items-center gap-1 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
              >
                <span>Geofag 2</span>
                <ArrowRight className="size-3" />
              </Link>
            )}
            {isGf2 && (
              <Link
                to="/geofag-1"
                className="ml-2 inline-flex h-9 items-center gap-1 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-foreground transition-colors hover:border-lava hover:text-lava lg:hidden"
              >
                <ArrowLeft className="size-3" />
                <span>Geofag 1</span>
              </Link>
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <SiteSearch />
            <Button
              variant="ghost"
              size="sm"
              className="max-md:h-11 max-md:min-w-11 md:hidden"
              aria-expanded={open}
              aria-controls="mobilmeny"
              onClick={veksleMeny}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">{open ? "Lukk meny" : "Åpne meny"}</span>
            </Button>
          </div>
        </div>
      )}

      {open ? (
        <nav
          id="mobilmeny"
          className="min-h-0 overflow-y-auto overscroll-contain border-t border-border bg-background px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
          aria-label="Mobilmeny"
        >
          <div className="mb-3 grid grid-cols-3 gap-2 border-b border-border pb-3 text-center">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={cn(
                "flex min-h-11 items-center justify-center rounded-md border p-2 text-xs font-medium",
                pathname === "/"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground",
              )}
            >
              Forside
            </Link>
            <Link
              to="/geofag-1"
              onClick={() => setOpen(false)}
              className={cn(
                "flex min-h-11 items-center justify-center rounded-md border p-2 text-xs font-medium",
                isGf1
                  ? "border-lava bg-lava/10 font-semibold text-foreground"
                  : "border-border text-muted-foreground",
              )}
            >
              Geofag 1
            </Link>
            <Link
              to="/geofag-2"
              onClick={() => setOpen(false)}
              className={cn(
                "flex min-h-11 items-center justify-center rounded-md border p-2 text-xs font-medium",
                isGf2
                  ? "border-primary bg-primary/10 font-semibold text-foreground"
                  : "border-border text-muted-foreground",
              )}
            >
              Geofag 2
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {groups.map((group, i) => {
              const headingId = `${menyId}-gruppe-${i}`;
              return (
                <div
                  key={group.label ?? "alle"}
                  role="group"
                  aria-labelledby={group.label ? headingId : undefined}
                >
                  {group.label ? (
                    <p
                      id={headingId}
                      className="mb-1 border-b border-border/70 px-3 pb-1 text-xs font-medium uppercase tracking-wider text-primary"
                    >
                      {group.label}
                    </p>
                  ) : null}
                  <ul className="flex flex-col gap-1">
                    {group.items.map((item) => {
                      const active = item.to === "/" ? pathname === "/" : pathname === item.to;
                      return (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex min-h-11 items-center rounded-md px-3 text-sm",
                              active
                                ? "bg-muted font-medium text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </nav>
      ) : null}
      {open ? (
        // Mørk flate under menyen: trykk utenfor lukker. Absolutt (ikke fixed), fordi backdrop-blur på
        // headeren ellers gjør headeren til holder for fixed-barn.
        <div
          className="absolute inset-x-0 top-full h-dvh touch-none bg-black/60 md:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}

function BrandCluster({
  brand,
  isHome,
  isGf1,
  isGf2,
  onNavigate,
}: {
  brand: { title: string; sub: string };
  isHome: boolean;
  isGf1: boolean;
  isGf2: boolean;
  onNavigate: () => void;
}) {
  const pill =
    "ml-2 hidden items-center gap-1 whitespace-nowrap rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground md:inline-flex";

  return (
    <div className="flex min-h-11 min-w-0 items-center gap-3">
      <Link
        to="/"
        className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-muted"
        onClick={onNavigate}
        aria-label="Gå til hovedforsiden"
      >
        <div className="grid size-8 place-items-center rounded-md border border-border bg-card text-primary">
          <GlobeMark />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-display text-sm font-semibold tracking-tight text-foreground">
            Geofag
          </span>
          <span className="text-[10px] text-muted-foreground">Forside</span>
        </div>
      </Link>

      {!isHome && (
        <nav aria-label="Brødsmule" className="flex min-w-0 items-center gap-3">
          <span className="text-border select-none" aria-hidden="true">
            /
          </span>
          <Link
            to={isGf1 ? "/geofag-1" : isGf2 ? "/geofag-2" : "/"}
            className="leading-tight max-md:flex max-md:min-h-11 max-md:items-center"
            onClick={onNavigate}
          >
            <span className="block whitespace-nowrap font-display text-sm font-medium tracking-tight text-foreground">
              {brand.title}
            </span>
            <span className="hidden whitespace-nowrap text-xs text-muted-foreground sm:block">
              {brand.sub}
            </span>
          </Link>
        </nav>
      )}

      {isGf1 && (
        <Link to="/geofag-2" className={cn(pill, "hover:border-primary/40")}>
          <span>Geofag 2</span>
          <ArrowRight className="size-3" />
        </Link>
      )}
      {isGf2 && !isGf1 && (
        <Link to="/geofag-1" className={cn(pill, "hover:border-lava/50")}>
          <ArrowLeft className="size-3" />
          <span>Geofag 1</span>
        </Link>
      )}
    </div>
  );
}

function NavLink({ item, pathname }: { item: { to: string; label: string }; pathname: string }) {
  const active = isItemActive(pathname, item.to);
  return (
    <Link
      to={item.to}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-md px-2 text-sm transition-colors",
        active
          ? "bg-muted font-medium text-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {item.label}
    </Link>
  );
}

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="shrink-0 max-md:h-11 max-md:min-w-11 md:hidden"
      aria-expanded={open}
      aria-controls="mobilmeny"
      onClick={onClick}
    >
      {open ? <X className="size-5" /> : <Menu className="size-5" />}
      <span className="sr-only">{open ? "Lukk meny" : "Åpne meny"}</span>
    </Button>
  );
}

function GlobeMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 12h18M5.5 7.5h13M5.5 16.5h13" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
