import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { ModelFrame } from "@/components/models/model-chrome";
import { usePrefersReducedMotion } from "./use-motion";
import { useInView, useNarrow } from "./isbre-kit";

const LOOP_S = 16;

export function useTsunamiTid() {
  const reduced = usePrefersReducedMotion();
  const narrow = useNarrow();
  const [ref, visible] = useInView<HTMLDivElement>();
  const [wantPlay, setWantPlay] = useState<boolean | null>(null);
  const [tid, setTid] = useState(0);
  const intent = wantPlay ?? !reduced;

  useEffect(() => {
    if (!intent || !visible || reduced) return;
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setTid((current) => (current + dt / LOOP_S) % 1);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [intent, reduced, visible]);

  const playing = intent && visible && !reduced;
  return {
    ref,
    narrow,
    reduced,
    tid,
    playing,
    wantPlay: intent,
    toggle: () => {
      setWantPlay(!intent);
    },
    reset: () => {
      setWantPlay(false);
      setTid(0);
    },
    setTid: (next: number) => {
      setWantPlay(false);
      setTid(Math.min(1, Math.max(0, next)));
    },
  };
}

export function TsunamiRamme({
  nodeRef,
  kicker,
  title,
  lead,
  kildeHref,
  antakelser,
  konklusjon,
  tidMerkelapp = "Tid",
  tid,
  playing,
  reduced,
  onToggle,
  onReset,
  onTid,
  controls,
  scene,
  tall,
}: {
  nodeRef: RefObject<HTMLDivElement | null>;
  kicker: string;
  title: string;
  lead: string;
  kildeHref: string;
  antakelser: string;
  konklusjon: string;
  tidMerkelapp?: string;
  tid: number;
  playing: boolean;
  reduced: boolean;
  onToggle: () => void;
  onReset: () => void;
  onTid: (tid: number) => void;
  controls: ReactNode;
  scene: ReactNode;
  tall: ReactNode;
}) {
  return (
    <div ref={nodeRef}>
      <ModelFrame
        kicker={kicker}
        title={title}
        lead={lead}
        stackHeader
        toolbar={
          <>
            <button type="button" className="min-h-11 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground" onClick={onToggle} aria-pressed={playing}>
              {playing ? "Pause" : "Start"}
            </button>
            <button type="button" className="min-h-11 rounded-md border border-border px-3 text-sm" onClick={onReset}>
              Nullstill
            </button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">
          Hva forventer du før du flytter på noe? Sammenlign så to valg på samme skala.
          {reduced ? " Bevegelse er slått av. Bruk tidslinjen og trinnene." : ""}
          <span className={playing ? "invisible" : undefined} aria-hidden={playing}>
            {" "}
            Avspillingen står.
          </span>
        </p>
        <div className="mt-4 flex flex-col gap-4">{controls}</div>
        <label className="mt-4 block text-sm">
          <span className="font-medium">{tidMerkelapp}</span>
          <input
            className="mt-1 w-full accent-primary"
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(tid * 100)}
            aria-valuetext={`${Math.round(tid * 100)} prosent av forløpet`}
            onChange={(event) => onTid(Number(event.target.value) / 100)}
          />
        </label>
        <div className="mt-4">{scene}</div>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-border p-3 text-sm">{tall}</div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Antakelser. </span>
              {antakelser}
            </p>
            <p>
              <span className="font-medium text-foreground">Konklusjon. </span>
              {konklusjon}
            </p>
            <p>
              <a className="text-primary underline" href={kildeHref} target="_blank" rel="noreferrer">
                Kilde
              </a>
            </p>
          </div>
        </div>
      </ModelFrame>
    </div>
  );
}

export function Valg({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.id)}
              className={`min-h-11 rounded-full border px-3 text-sm ${active ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Skyv({
  label,
  min,
  max,
  step,
  value,
  unit,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium">
        {label}: {value} {unit}
      </span>
      <span className="ml-2 text-muted-foreground">valgt modellverdi</span>
      <input
        className="mt-1 w-full accent-primary"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={`${value} ${unit}`}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function Merke() {
  return (
    <p className="text-sm font-medium">Pedagogisk modell. Ikke et farekart eller et evakueringsråd.</p>
  );
}
