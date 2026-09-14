export const NAV_HUB = [
  { to: "/", label: "Forside" },
  { to: "/geofag-1", label: "Geofag 1" },
  { to: "/geofag-2", label: "Geofag 2" },
] as const;

export const NAV_GF1 = [
  { to: "/", label: "Forside" },
  { to: "/geofag-1", label: "Oversikt" },
  { to: "/geofag-1/jordsystemene", label: "Sfærer" },
  { to: "/geofag-1/platetektonikk", label: "Plater" },
  { to: "/geofag-1/vulkaner-og-jordskjelv", label: "Vulkan" },
  { to: "/geofag-1/bergarter-og-landformer", label: "Berg" },
  { to: "/geofag-1/vann-og-flom", label: "Vann" },
  { to: "/geofag-1/skred", label: "Skred" },
  { to: "/geofag-1/geologiske-ressurser", label: "Ressurs" },
  { to: "/geofag-1/feltarbeid", label: "Felt" },
] as const;

export const NAV_GF2 = [
  { to: "/", label: "Forside" },
  { to: "/geofag-2", label: "Oversikt" },
  { to: "/eksamen", label: "Eksamen" },
  { to: "/tema/hoytrykk-lavtrykk", label: "Trykk" },
  { to: "/tema/vindsystemet", label: "Vind" },
  { to: "/tema/vaerkart", label: "Værkart" },
  { to: "/tema/lokale-vaersystemer", label: "Lokalt" },
  { to: "/tema/jetstrommer", label: "Jet" },
  { to: "/tema/coriolis", label: "Coriolis" },
  { to: "/tema/havstrommer", label: "Hav" },
  { to: "/tema/klima", label: "Klima" },
  { to: "/tema/kryosfaeren", label: "Is" },
  { to: "/tema/numeriske-modeller", label: "Modeller" },
  { to: "/tema/paleoklima", label: "Paleo" },
  { to: "/tema/milankovitch", label: "Istider" },
  { to: "/tema/vaerkatastrofer", label: "Farer" },
  { to: "/tema/tilpasning", label: "Tilpasning" },
  { to: "/tema/energi-hav-luft", label: "Energi" },
  { to: "/tema/felt-hav-luft-is", label: "Felt" },
] as const;

/** @deprecated use NAV_GF2 — kept so older imports still typecheck during the move */
export const NAV = NAV_GF2;

export function navForPath(pathname: string) {
  if (pathname === "/") return NAV_HUB;
  if (pathname.startsWith("/geofag-1")) return NAV_GF1;
  return NAV_GF2;
}

export function brandForPath(pathname: string) {
  if (pathname.startsWith("/geofag-1")) {
    return { title: "Geofag 1", sub: "Jorda under oss" };
  }
  if (
    pathname.startsWith("/geofag-2") ||
    pathname.startsWith("/tema") ||
    pathname.startsWith("/eksamen")
  ) {
    return { title: "Geofag 2", sub: "Hav, luft og klima" };
  }
  return { title: "Geofag", sub: "Naturfarer, vær og klima" };
}
