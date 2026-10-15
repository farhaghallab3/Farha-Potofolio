"use client";

import { useEffect, useRef } from "react";

/** A soft ring that trails the pointer and swells over [data-cursor] targets. Desktop only. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || calm || !el) return;

    let x = 0,
      y = 0,
      tx = 0,
      ty = 0,
      raf = 0;
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.active = "true";
      el.dataset.hover = String(!!(e.target as Element).closest?.("a, button, [data-cursor]"));
    };
    const leave = () => (el.dataset.active = "false");
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden />;
}
