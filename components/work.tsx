"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { archive, projects, type Project } from "@/lib/data";
import { Arrow, Reveal } from "./ui";

function host(url: string) {
  return new URL(url).host;
}

/** Browser frame. Renders the real screenshot once `image` is set, otherwise a labelled placeholder. */
function Visual({ p, aspect }: { p: Project; aspect: string }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--line)] bg-card shadow-[var(--shadow)]"
      data-cursor
    >
      <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2 rounded-full bg-[var(--line-strong)]" />
          <i className="size-2 rounded-full bg-[var(--line-strong)]" />
          <i className="size-2 rounded-full bg-[var(--line-strong)]" />
        </span>
        <span className="mx-auto max-w-[70%] truncate rounded-full bg-bg2 px-3 py-1 font-mono text-[11px] text-muted">
          {host(p.live)}
        </span>
        <span className="w-9" aria-hidden />
      </div>
      <div className={`relative overflow-hidden ${aspect}`}>
        {p.image ? (
          <Image
            src={p.image}
            alt={`${p.name} interface screenshot`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04] group-hover:-translate-y-2"
          />
        ) : (
          <div
            role="img"
            aria-label={`${p.name} screenshot placeholder`}
            className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
            style={{
              background:
                "radial-gradient(120% 90% at 20% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%), linear-gradient(180deg, var(--bg-2), var(--card))",
            }}
          >
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage: "radial-gradient(circle at 50% 50%, #000, transparent 75%)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <div>
                <p className="eyebrow">Screenshot placeholder</p>
                <p className="mt-2 font-mono text-xs text-muted">
                  /public/projects/{p.imageHint}
                </p>
                {p.rtl && (
                  <p lang="ar" dir="rtl" className="mt-4 text-3xl">
                    مُذَكِّر
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11.5px] text-muted">
      {tags.map((t) => (
        <li key={t} className="whitespace-nowrap">
          {t}
        </li>
      ))}
    </ul>
  );
}

function CaseStudy({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-bg transition-colors hover:bg-accent hover:text-[var(--accent-ink)]"
          data-cursor
        >
          Live demo <Arrow />
          <span className="sr-only"> for {p.name} (opens in new tab)</span>
        </a>
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ulink inline-flex items-center gap-1.5 pb-0.5"
          >
            GitHub <Arrow />
          </a>
        )}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="ulink inline-flex items-center gap-2 pb-0.5"
        >
          Case study
          <span
            aria-hidden
            className={`inline-block transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            +
          </span>
        </button>
      </div>
      <div id={id} className="disclosure" data-open={open}>
        <div className="overflow-hidden">
          <ul className="mt-6 grid gap-3 border-t border-[var(--line)] pt-6 text-sm leading-relaxed sm:grid-cols-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Strip({ p }: { p: Project }) {
  if (!p.strip) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-[var(--line)] px-4 py-3">
      <span className="eyebrow mr-1">{p.strip.label}</span>
      {p.strip.items.map((it, i, a) => (
        <span key={it} className="flex items-center gap-3 text-sm">
          {it}
          {i < a.length - 1 && (
            <span aria-hidden className="text-muted">
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function Meta({ p, large }: { p: Project; large?: boolean }) {
  return (
    <div>
      <p className="eyebrow flex items-center gap-3">
        <span>{p.index}</span>
        <span aria-hidden className="h-px w-8 bg-[var(--line-strong)]" />
        <span>{p.kind}</span>
      </p>
      <h3
        className={`mt-4 tracking-tight ${
          large ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl"
        } font-medium leading-[1.02]`}
      >
        {p.name}
        <span className="serif block text-muted">{p.title}</span>
      </h3>
      <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-muted">{p.summary}</p>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex gap-4">
          <dt className="eyebrow w-12 shrink-0 pt-0.5">Role</dt>
          <dd>{p.role}</dd>
        </div>
        <div className="flex gap-4">
          <dt className="eyebrow w-12 shrink-0 pt-0.5">Stack</dt>
          <dd>
            <Tags tags={p.tags} />
          </dd>
        </div>
      </dl>
      <CaseStudy p={p} />
    </div>
  );
}

export function Work() {
  const [crm, muz, nabta] = projects;
  return (
    <section id="work" className="py-24 md:py-36">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Selected Work</p>
          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="display max-w-[12ch] !text-[clamp(2.4rem,6vw,5.2rem)]">
              Selected <span className="serif text-accent">work</span>
            </h2>
            <p className="max-w-sm text-muted">
              A selection of products I&rsquo;ve designed, built and shipped.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
          {/* 01: full-bleed showcase */}
          <Reveal>
            <article className="group">
              <Visual p={crm} aspect="aspect-[2/1]" />
              <Strip p={crm} />
              <div className="mt-10 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <Meta p={crm} large />
                </div>
                <aside className="lg:col-span-4 lg:col-start-9 lg:pt-10">
                  <p className="serif text-2xl leading-snug sm:text-3xl">
                    From first lead to closed deal.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    One workspace for leads, viewings, the pipeline and commissions, backed by a
                    Django API and a PostgreSQL database in production.
                  </p>
                </aside>
              </div>
            </article>
          </Reveal>

          {/* 02 + 03: bento pair */}
          <div className="grid gap-x-8 gap-y-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <article className="group">
                <Visual p={muz} aspect="aspect-[2/1]" />
                <Strip p={muz} />
                <div className="mt-8">
                  <Meta p={muz} />
                </div>
              </article>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:mt-24" delay={120}>
              <article className="group">
                <Visual p={nabta} aspect="aspect-[2/1]" />
                <div className="mt-8">
                  <Meta p={nabta} />
                </div>
              </article>
            </Reveal>
          </div>

          {/* STRUCT is hidden for now. To show it again, restore it in lib/data.ts and uncomment:
          <Reveal>
            <article className="group grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="order-2 lg:order-1 lg:col-span-5">
                <Meta p={struct} />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-7">
                <Visual p={struct} aspect="aspect-[2/1]" />
                <Strip p={struct} />
              </div>
            </article>
          </Reveal>
          */}
        </div>

        <MoreWork />
      </div>
    </section>
  );
}

function MoreWork() {
  const cats = ["All", ...Array.from(new Set(archive.map((a) => a.category)))];
  const [cat, setCat] = useState("All");
  const rows = archive.filter((a) => cat === "All" || a.category === cat);

  return (
    <div className="mt-28 md:mt-40">
      <Reveal className="flex flex-col justify-between gap-6 border-b border-[var(--line)] pb-6 md:flex-row md:items-end">
        <h3 className="text-3xl font-medium tracking-tight sm:text-4xl">
          More <span className="serif">work</span>
        </h3>
        <div role="group" aria-label="Filter archive" className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                cat === c
                  ? "border-fg bg-fg text-bg"
                  : "border-[var(--line-strong)] text-muted hover:border-fg hover:text-fg"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Reveal>
      <ul>
        {rows.map((r) => (
          <li
            key={r.title}
            className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-[var(--line)] py-5 transition-colors hover:bg-[color-mix(in_srgb,var(--fg)_3%,transparent)] md:grid-cols-[4rem_1.2fr_1.6fr_1fr_auto] md:px-2"
          >
            <span className="eyebrow hidden md:block">{r.year}</span>
            <span className="text-lg tracking-tight transition-transform duration-300 group-hover:translate-x-1">
              {r.title}
            </span>
            <span className="col-span-2 text-sm text-muted md:col-span-1">{r.note}</span>
            <span className="eyebrow md:text-right">{r.stack}</span>
            <span className="hidden text-muted md:block">
              <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
