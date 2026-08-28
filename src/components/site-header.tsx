import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { brandForPath, navForPath } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = navForPath(pathname);
  const brand = brandForPath(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-h-11 items-center gap-3">
          <Link
            to="/"
            className="grid size-8 place-items-center rounded-md border border-border bg-card text-primary"
            onClick={() => setOpen(false)}
            aria-label="Til Geofag-forsiden"
          >
            <GlobeMark />
          </Link>
          <Link
            to={
              pathname.startsWith("/geofag-1")
                ? "/geofag-1"
                : pathname.startsWith("/geofag-2") || pathname.startsWith("/tema")
                  ? "/geofag-2"
                  : "/"
            }
            className="leading-tight"
            onClick={() => setOpen(false)}
          >
            <span className="block font-display text-base font-medium tracking-tight">{brand.title}</span>
            <span className="block text-xs text-muted-foreground">{brand.sub}</span>
          </Link>
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
                className={cn(
                  "inline-flex h-11 items-center rounded-md px-2 text-sm transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
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
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center rounded-md px-3 text-sm",
                      active ? "bg-muted text-foreground" : "text-muted-foreground",
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
