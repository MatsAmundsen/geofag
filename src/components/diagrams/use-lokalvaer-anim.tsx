/** Avspilling for lokalvaer-anim: se kommentaren der. */
import { useEffect, useRef, useState } from "react";
import { useFellesAvspilling } from "./avspilling";
import { PlayPauseToggle } from "./svg-kit";

export function useLokalAnim(name: string) {
  const ref = useRef<SVGGElement | null>(null);
  const [synlig, setSynlig] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSynlig(true);
      return;
    }
    const io = new IntersectionObserver((e) => setSynlig(e.some((x) => x.isIntersecting)), {
      rootMargin: "80px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const anim = useFellesAvspilling(synlig, ref);
  const kjoerer = anim.playing && synlig;
  useEffect(() => {
    const svg = ref.current?.ownerSVGElement;
    if (!svg) return;
    if (kjoerer) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [kjoerer]);
  const knapp = <PlayPauseToggle isPlaying={anim.playing} pulserer={kjoerer} onToggle={anim.toggle} name={name} />;
  const gClass = `lv-anim ${anim.motionClass}`.trim();
  return { ref, knapp, gClass };
}
