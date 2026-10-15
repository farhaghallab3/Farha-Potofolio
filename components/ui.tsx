"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Arrow({ className = "", dir = "ne" }: { className?: string; dir?: "ne" | "down" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {dir === "ne" ? <path d="M4 12 12 4M5 4h7v7" /> : <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" />}
    </svg>
  );
}

/** Fades children in once they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Pulls its content slightly toward the cursor (fine pointers only). */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabled = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <span
      ref={ref}
      className="inline-block transition-transform duration-300 ease-out will-change-transform"
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || !enabled()) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
  download,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  download?: boolean;
  external?: boolean;
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200";
  const look =
    variant === "solid"
      ? "bg-fg text-bg hover:bg-accent hover:text-[var(--accent-ink)]"
      : "border border-[var(--line-strong)] hover:border-fg";
  return (
    <a
      href={href}
      download={download ? "" : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${look} ${className}`}
      data-cursor
    >
      {children}
    </a>
  );
}

export function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  return {
    copied,
    copy: async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        window.location.href = `mailto:${text}`;
      }
    },
  };
}
