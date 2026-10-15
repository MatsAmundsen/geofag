/**
 * Prosess-kit-figurene lastes lat: modulene (og teksturene deres) lastes først når en side faktisk
 * viser figuren, ikke på alle sider som importerer poster-body. Serverrenderingen venter på modulen,
 * så HTML-en inneholder figuren som før.
 */
import { lazy, Suspense, type ComponentProps, type ComponentType, type JSX } from "react";

function lat<P extends object>(last: () => Promise<ComponentType<P>>) {
  const Komponent = lazy(async () => ({ default: await last() }));
  return function LatFigur(props: P): JSX.Element {
    return (
      <Suspense fallback={<div className="min-h-[28rem]" aria-hidden="true" />}>
        <Komponent {...(props as P & JSX.IntrinsicAttributes)} />
      </Suspense>
    );
  };
}

export const DiageneseFigurLat = lat<ComponentProps<typeof import("./diagenese-figur").DiageneseFigur>>(() =>
  import("./diagenese-figur").then((m) => m.DiageneseFigur),
);

export const KontaktRegionalV2FigurLat = lat<ComponentProps<typeof import("./kontakt-regional-v2").KontaktRegionalV2Figur>>(() =>
  import("./kontakt-regional-v2").then((m) => m.KontaktRegionalV2Figur),
);
