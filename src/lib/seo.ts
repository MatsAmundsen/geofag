/**
 * Per-side SEO-helper for TanStack Start `head()`.
 *
 * Kalles fra hver rute sitt `head()`. Barnets `meta`/`links` vinner over
 * rot-titteltn/beskrivelsen i `src/routes/__root.tsx` fordi TanStack Router
 * bygger head-taggene fra det dypeste matchet og oppover, og hopper over
 * duplikate `name`/`property`-attributter og en allerede satt tittel.
 */

export const SITE_NAME = "Geofag";
export const SITE_URL = "https://geofag.com";

type Breadcrumb = { name: string; path: string };

function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

function breadcrumbsForPath(path: string, title: string): Breadcrumb[] {
  const crumbs: Breadcrumb[] = [{ name: "Forside", path: "/" }];

  if (path === "/") return crumbs;

  if (path === "/geofag-1" || path === "/geofag-2") {
    crumbs.push({ name: title, path });
    return crumbs;
  }

  if (path.startsWith("/geofag-1")) {
    crumbs.push({ name: "Geofag 1", path: "/geofag-1" });
    crumbs.push({ name: title, path });
    return crumbs;
  }

  if (path.startsWith("/tema") || path.startsWith("/geofag-2")) {
    crumbs.push({ name: "Geofag 2", path: "/geofag-2" });
    crumbs.push({ name: title, path });
    return crumbs;
  }

  crumbs.push({ name: title, path });
  return crumbs;
}

export function topicHead({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const canonical = absoluteUrl(path);
  const isFront = path === "/";

  const jsonLd: Record<string, unknown> = isFront
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "nb-NO",
        description,
      }
    : {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: title,
        description,
        url: canonical,
        inLanguage: "nb-NO",
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
        },
      };

  const breadcrumbList = !isFront
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbsForPath(path, title).map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: absoluteUrl(crumb.path),
        })),
      }
    : null;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: isFront ? "website" : "article" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { "script:ld+json": jsonLd },
      ...(breadcrumbList ? [{ "script:ld+json": breadcrumbList }] : []),
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
