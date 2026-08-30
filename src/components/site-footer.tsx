import { Link, useRouterState } from "@tanstack/react-router";

export function SiteFooter() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>Geofag — læringsstoff etter LK20, VG-nivå med utblikk mot førsteårs universitet.</p>
        <p>
          Kompetansemål fra{" "}
          <a
            href="https://www.udir.no/lk20/gfg01-03"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Udir GFG01-03
          </a>
          .{" "}
          <Link
            to="/eksamen"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Eksamen
          </Link>
          .{" "}
          <Link
            to="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className="text-foreground underline-offset-4 hover:underline"
          >
            Til forsiden
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
