"use client";

import { useRef } from "react";
import { site } from "@/lib/data";
import { Arrow, ButtonLink, Magnetic } from "./ui";

const socials = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
];

/** Abstract product fragments that drift with the cursor. Deliberately not a fake UI. */
function Fragments() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div
        data-depth="14"
        className="absolute right-[3%] top-[11%] w-60 rounded-2xl border border-[var(--line)] bg-card p-4 shadow-[var(--shadow)] transition-transform duration-300 ease-out"
      >
        <p className="eyebrow">Request</p>
        <p className="mt-2 font-mono text-[13px]">
          POST <span className="text-muted">/api/bookings</span>
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="size-1.5 rounded-full bg-accent" />
          201 Created · 48ms
        </div>
      </div>
      <div
        data-depth="-10"
        className="absolute right-[18%] top-[46%] w-72 rounded-2xl border border-[var(--line)] bg-card p-4 shadow-[var(--shadow)] transition-transform duration-300 ease-out"
      >
        <p className="eyebrow">Pipeline</p>
        <ol className="mt-3 flex items-center gap-2 text-[12px]">
          {["Next.js", "DRF", "Postgres", "Nginx"].map((s, i, a) => (
            <li key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-[var(--line-strong)] px-2.5 py-1">{s}</span>
              {i < a.length - 1 && <span className="text-muted">→</span>}
            </li>
          ))}
        </ol>
      </div>
      <div
        data-depth="20"
        className="absolute right-[3%] top-[66%] flex items-center gap-3 rounded-full border border-[var(--line)] bg-card py-2 pl-2 pr-4 text-xs shadow-[var(--shadow)] transition-transform duration-300 ease-out"
      >
        <span className="grid size-7 place-items-center rounded-full bg-accent font-mono text-[10px] text-[var(--accent-ink)]">
          AI
        </span>
        Follow-up drafted for review
      </div>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = root.current;
    if (!el || e.pointerType !== "mouse") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.querySelectorAll<HTMLElement>("[data-depth]").forEach((n) => {
      const d = Number(n.dataset.depth);
      n.style.transform = `translate(${(px - 0.5) * d * 2}px, ${(py - 0.5) * d * 2}px)`;
    });
  };

  return (
    <section
      id="home"
      ref={root}
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-32 md:pb-14"
    >
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <Fragments />

      <div className="wrap">
        <p className="eyebrow rise" style={{ "--d": "80ms" } as React.CSSProperties}>
          Full-Stack Software Developer · Alexandria, Egypt
        </p>

        <h1
          className="display rise mt-6 max-w-[16ch]"
          style={{ "--d": "180ms" } as React.CSSProperties}
        >
          I build digital products from <span className="serif text-accent">interface</span> to{" "}
          <span className="serif">infrastructure.</span>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
          <p
            className="rise max-w-xl text-base leading-relaxed text-muted md:col-span-6 md:text-lg"
            style={{ "--d": "320ms" } as React.CSSProperties}
          >
            I&rsquo;m <span className="text-fg">Farha Ghallab</span>, a Full-Stack Software Developer
            working across React, Next.js, Django and production infrastructure. I build responsive
            interfaces, scalable APIs and AI-powered product experiences.
          </p>

          <div
            className="rise flex flex-col gap-6 md:col-span-6 md:items-end"
            style={{ "--d": "440ms" } as React.CSSProperties}
          >
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <ButtonLink href="#work">
                  Explore my work <Arrow dir="down" />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href={site.cv} download variant="outline">
                Download CV
              </ButtonLink>
            </div>
            <p className="flex items-center gap-2.5 text-sm text-muted">
              <span className="relative flex size-2">
                <span className="pulse-dot absolute inset-0 rounded-full bg-accent" />
              </span>
              Available for opportunities · Open to relocation
            </p>
          </div>
        </div>

        <ul
          className="rise mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--line)] pt-6 text-sm"
          style={{ "--d": "560ms" } as React.CSSProperties}
        >
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="ulink inline-flex items-center gap-1.5 pb-0.5"
              >
                {s.label} <Arrow className="text-muted" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
