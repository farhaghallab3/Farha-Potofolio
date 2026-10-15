"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/data";
import { Arrow, ButtonLink } from "./ui";

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark =
      root.dataset.theme === "dark" ||
      (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="grid size-10 place-items-center rounded-full border border-[var(--line-strong)] transition-colors hover:border-fg"
      data-cursor
    >
      <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 2a6 6 0 0 0 0 12z" fill="currentColor" />
      </svg>
    </button>
  );
}

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState({ x: 0, w: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = linkRefs.current[active];
    if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="absolute left-4 top-3 -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm text-bg focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#home" className="text-[15px] font-medium tracking-tight" data-cursor>
          Farha Ghallab<span className="text-accent">.</span>
        </a>

        <nav aria-label="Primary" className="relative hidden items-center md:flex">
          <span
            aria-hidden
            className="absolute bottom-0 h-px bg-accent transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
            style={{ left: pill.x, width: pill.w }}
          />
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              ref={(el) => {
                linkRefs.current[n.id] = el;
              }}
              aria-current={active === n.id ? "true" : undefined}
              className={`px-4 py-2 text-sm transition-colors ${
                active === n.id ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href={site.cv} download className="!px-4 !py-2.5">
            Download CV <Arrow dir="down" />
          </ButtonLink>
          <button
            className="grid size-10 place-items-center rounded-full border border-[var(--line-strong)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="wrap h-[calc(100dvh-4rem)] overflow-y-auto pb-10 pt-8 md:hidden"
      >
        <ul className="flex flex-col">
          {nav.map((n, i) => (
            <li key={n.id} className="border-b border-[var(--line)]">
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-5 text-4xl tracking-tight"
              >
                <span>{n.label}</span>
                <span className="eyebrow">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <ButtonLink href={site.cv} download className="mt-8 w-full justify-center">
          Download CV <Arrow dir="down" />
        </ButtonLink>
      </div>
    </header>
  );
}
