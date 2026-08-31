import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { brandForPath, navForPath } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = navForPath(pathname);
  const brand = brandForPath(pathname);

  const isGf1 = pathname.startsWith("/geofag-1");
  const isGf2 =
    pathname.startsWith("/geofag-2") ||
    pathname.startsWith("/tema") ||
    pathname.startsWith("/eksamen");
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
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

        <nav className="hidden items-center gap-1 md:flex" aria-label="Hovedmeny">
          {items.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || (item.to !== "/geofag-2" && pathname.startsWith(`${item.to}/`));
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

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobilmeny"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">{open ? "Lukk meny" : "Åpne meny"}</span>
        </Button>
      </div>

      {open ? (
        <nav
          id="mobilmeny"
          className="border-t border-border bg-background px-4 py-3 md:hidden"
          aria-label="Mobilmeny"
        >
          <div className="mb-3 grid grid-cols-3 gap-2 border-b border-border pb-3 text-center">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md border p-2 text-xs font-medium",
                pathname === "/" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground",
              )}
            >
              Forside
            </Link>
            <Link
              to="/geofag-1"
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md border p-2 text-xs font-medium",
                isGf1 ? "border-lava bg-lava/10 font-semibold text-foreground" : "border-border text-muted-foreground",
              )}
            >
              Geofag 1
            </Link>
            <Link
              to="/geofag-2"
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md border p-2 text-xs font-medium",
                isGf2 ? "border-primary bg-primary/10 font-semibold text-foreground" : "border-border text-muted-foreground",
              )}
            >
              Geofag 2
            </Link>
          </div>

          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center rounded-md px-3 text-sm",
                      active ? "bg-muted font-medium text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
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
