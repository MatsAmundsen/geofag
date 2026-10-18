import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

/**
 * Ruteren nullstiller rullingen til toppen ved første ferdige visning (onRendered). På lange sider
 * kommer den etter at siden er lastet, så en leser som alt har rullet (eller nettleserens egen
 * gjenoppretting ved omlasting) blir kastet tilbake til toppen. Med redusert bevegelse skjer hoppet
 * momentant, og lat lastede figurer der leseren var, blir aldri sett. Behold leserens posisjon ved
 * første visning; senere navigering oppfører seg som før.
 */
function beholdTidligRulling(router: ReturnType<typeof lagRouter>) {
  if (typeof window === "undefined") return;
  // klientkoden kan starte etter at leseren alt har rullet
  let rullet: number | null = window.scrollY || null;
  const paaRull = () => {
    rullet = window.scrollY;
  };
  window.addEventListener("scroll", paaRull, { passive: true });
  const av = router.subscribe("onRendered", () => {
    av();
    window.removeEventListener("scroll", paaRull);
    const y = rullet;
    if (!y || window.location.hash) return;
    // etter rutens egen nullstilling i samme oppgave, før neste opptegning
    // (instant: med vanlig bevegelse er nullstillingen myk og ville ellers fortsette mot toppen)
    queueMicrotask(() => window.scrollTo({ top: y, left: window.scrollX, behavior: "instant" }));
  });
}

function lagRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultPreload: "intent",
    defaultStaleTime: 60_000,
    defaultPreloadStaleTime: 60_000,
  });
}

export function getRouter() {
  const router = lagRouter();
  beholdTidligRulling(router);
  return router;
}
