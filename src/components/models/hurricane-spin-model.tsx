import { ModelFrame, ModelMarkers, ModelNote, ModelPanel } from "./model-chrome";

function HurricaneSvg({
  hemisphere,
}: {
  hemisphere: "north" | "south";
}) {
  const ccw = hemisphere === "north";
  return (
    <svg viewBox="0 0 360 360" className="mx-auto my-2 h-auto w-full max-w-[320px] select-none">
      <circle cx="180" cy="180" r="160" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <circle cx="180" cy="180" r="140" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="180" cy="180" r="100" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="180" cy="180" r="60" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

      <text x="180" y="32" fill="#94a3b8" fontSize="9" textAnchor="middle">
        1008 hPa rundt
      </text>
      <text x="180" y="72" fill="#94a3b8" fontSize="9" textAnchor="middle">
        980 hPa
      </text>
      <text x="180" y="112" fill="#94a3b8" fontSize="9" textAnchor="middle">
        940 hPa
      </text>

      {ccw ? (
        <>
          <path d="M 180 40 Q 170 110 110 145" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mdl-yellow)" />
          <path d="M 320 180 Q 250 170 215 110" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mdl-yellow)" />
          <path d="M 180 320 Q 190 250 250 215" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mdl-yellow)" />
          <path d="M 40 180 Q 110 190 145 250" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mdl-yellow)" />
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 180 180" to="-360 180 180" dur="8s" repeatCount="indefinite" />
            <path d="M 180 180 C 220 120, 280 110, 310 140 C 270 140, 230 160, 180 180" fill="#ef4444" opacity="0.8" />
            <path d="M 180 180 C 140 220, 110 280, 140 310 C 140 270, 160 230, 180 180" fill="#ef4444" opacity="0.8" />
            <path d="M 180 180 C 120 140, 80 150, 50 120 C 90 120, 130 140, 180 180" fill="#f97316" opacity="0.8" />
            <path d="M 180 180 C 220 240, 250 220, 280 250 C 240 250, 200 230, 180 180" fill="#f97316" opacity="0.8" />
            <path d="M 300 180 A 120 120 0 0 0 180 60" fill="none" stroke="#facc15" strokeWidth="3.5" markerEnd="url(#mdl-yellow)" />
            <path d="M 60 180 A 120 120 0 0 0 180 300" fill="none" stroke="#facc15" strokeWidth="3.5" markerEnd="url(#mdl-yellow)" />
          </g>
        </>
      ) : (
        <>
          <path d="M 180 40 Q 190 110 250 145" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mdl-yellow)" />
          <path d="M 320 180 Q 250 190 215 250" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mdl-yellow)" />
          <path d="M 180 320 Q 170 250 110 215" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mdl-yellow)" />
          <path d="M 40 180 Q 110 170 145 110" fill="none" stroke="#ffffff" strokeWidth="2.5" markerEnd="url(#mdl-yellow)" />
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 180 180" to="360 180 180" dur="8s" repeatCount="indefinite" />
            <path d="M 180 180 C 140 120, 80 110, 50 140 C 90 140, 130 160, 180 180" fill="#ef4444" opacity="0.8" />
            <path d="M 180 180 C 220 220, 250 280, 220 310 C 220 270, 200 230, 180 180" fill="#ef4444" opacity="0.8" />
            <path d="M 180 180 C 240 140, 280 150, 310 120 C 270 120, 230 140, 180 180" fill="#f97316" opacity="0.8" />
            <path d="M 180 180 C 140 240, 110 220, 80 250 C 120 250, 160 230, 180 180" fill="#f97316" opacity="0.8" />
            <path d="M 60 180 A 120 120 0 0 0 180 60" fill="none" stroke="#facc15" strokeWidth="3.5" markerEnd="url(#mdl-yellow)" />
            <path d="M 300 180 A 120 120 0 0 0 180 300" fill="none" stroke="#facc15" strokeWidth="3.5" markerEnd="url(#mdl-yellow)" />
          </g>
        </>
      )}

      <circle cx="180" cy="180" r="18" fill="#020617" stroke="#ef4444" strokeWidth="2.5" />
      <text x="180" y="185" fill="#f8fafc" fontSize="14" fontWeight="700" textAnchor="middle">
        L
      </text>
      <text x="180" y="210" fill="#f87171" fontSize="9" fontWeight="700" textAnchor="middle">
        Øyet
      </text>
    </svg>
  );
}

export function HurricaneBody() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ModelPanel className="flex flex-col items-center">
        <div className="mb-3 flex w-full items-center justify-between gap-2">
          <span className="text-sm font-medium text-[#e08a8a]">Nordlig halvkule</span>
          <span className="rounded-md bg-[#e08a8a]/15 px-2 py-0.5 text-xs text-[#e08a8a]">
            Mot klokken
          </span>
        </div>
        <HurricaneSvg hemisphere="north" />
        <div className="mt-4 w-full space-y-1 rounded-xl border border-border bg-card p-3 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Hvorfor den spinner slik</p>
          <p>1. Luft trekkes inn mot lavtrykket (L).</p>
          <p>
            2. Coriolis bøyer innstrømningen mot <strong className="text-foreground">høyre</strong>.
          </p>
          <p>
            3. Hele systemet roterer <strong className="text-foreground">mot klokken</strong>.
          </p>
        </div>
      </ModelPanel>

      <ModelPanel className="flex flex-col items-center">
        <div className="mb-3 flex w-full items-center justify-between gap-2">
          <span className="text-sm font-medium text-[#e08a8a]">Sørlig halvkule</span>
          <span className="rounded-md bg-[#e08a8a]/15 px-2 py-0.5 text-xs text-[#e08a8a]">
            Med klokken
          </span>
        </div>
        <HurricaneSvg hemisphere="south" />
        <div className="mt-4 w-full space-y-1 rounded-xl border border-border bg-card p-3 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Hvorfor den spinner slik</p>
          <p>1. Luft trekkes inn mot lavtrykket (L).</p>
          <p>
            2. Coriolis bøyer innstrømningen mot <strong className="text-foreground">venstre</strong>.
          </p>
          <p>
            3. Hele systemet roterer <strong className="text-foreground">med klokken</strong>.
          </p>
        </div>
      </ModelPanel>
    </div>
  );
}

export function HurricaneSpinModel({ embedded = false }: { embedded?: boolean }) {
  const body = (
    <>
      {!embedded ? <ModelMarkers /> : null}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Innstrømmende luft bøyes av coriolis. I nord blir det mot klokken. I sør med klokken.
        </p>
        <p className="shrink-0 rounded-md border border-[#e08a8a]/35 bg-[#e08a8a]/10 px-3 py-1 text-xs text-[#e08a8a]">
          Luft suges inn mot L
        </p>
      </div>
      <HurricaneBody />
      {!embedded ? (
        <div className="mt-5">
          <ModelNote title="Ikke på ekvator" tone="low">
            <p>
              På ekvator er coriolis for svak. Derfor fødes ikke tropiske sykloner der — selv om
              havet er varmt.
            </p>
          </ModelNote>
        </div>
      ) : null}
    </>
  );

  if (embedded) return body;

  return (
    <ModelFrame
      kicker="Interaktiv modell"
      title="Orkanens rotasjon"
      lead="Samme lavtrykk, speilvendt avbøyning. Nord spinner mot klokken. Sør spinner med klokken."
    >
      {body}
    </ModelFrame>
  );
}
