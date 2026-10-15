"use client";

import { capabilities, certifications, education, experience, site } from "@/lib/data";
import { Arrow, ButtonLink, Magnetic, Reveal, useCopy } from "./ui";

export function Capabilities() {
  return (
    <section aria-labelledby="cap-h" className="border-y border-[var(--line)] bg-bg2 py-24 md:py-32">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Capabilities</p>
          <h2 id="cap-h" className="display mt-5 max-w-[14ch] !text-[clamp(2.2rem,5.5vw,4.6rem)]">
            What I work <span className="serif text-accent">across</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
          {capabilities.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className="bg-card p-7 sm:p-9">
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-medium tracking-tight">{g.title}</h3>
                <span className="eyebrow">{g.layer}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{g.blurb}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[var(--line-strong)] px-3.5 py-1.5 text-[13px] transition-colors hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const cefr = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function About() {
  return (
    <section id="about" className="py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">About</p>
          <h2 className="display mt-5 !text-[clamp(2rem,4.6vw,4rem)] !leading-[1.05]">
            Building the whole product taught me to think{" "}
            <span className="serif text-accent">beyond the code.</span>
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-[17px] leading-relaxed text-muted">
            <p>
              I enjoy working where frontend, backend and product decisions meet. My work ranges
              from responsive React interfaces and Django APIs to AI integrations and production
              deployments.
            </p>
            <p>
              I care about interfaces that feel simple to use, systems that remain maintainable,
              and products that solve an actual problem.
            </p>
          </div>
          <div className="mt-10">
            <ButtonLink href={site.cv} download variant="outline">
              Download CV <Arrow dir="down" />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
          <dl className="divide-y divide-[var(--line)] rounded-3xl border border-[var(--line)] bg-card px-6 shadow-[var(--shadow)]">
            <div className="py-5">
              <dt className="eyebrow">Based in</dt>
              <dd className="mt-1.5 text-xl tracking-tight">Alexandria, Egypt</dd>
              <dd className="mt-1 text-sm text-muted">31.2°N · 29.9°E</dd>
            </div>
            <div className="py-5">
              <dt className="eyebrow">Arabic</dt>
              <dd className="mt-1.5 text-xl tracking-tight">Native</dd>
            </div>
            <div className="py-5">
              <dt className="eyebrow">English</dt>
              <dd className="mt-1.5 flex items-center justify-between">
                <span className="text-xl tracking-tight">B1</span>
                <span className="flex gap-1" aria-hidden>
                  {cefr.map((l) => (
                    <span
                      key={l}
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        l === "B1" ? "bg-accent text-[var(--accent-ink)]" : "text-muted"
                      }`}
                    >
                      {l}
                    </span>
                  ))}
                </span>
              </dd>
            </div>
            <div className="py-5">
              <dt className="eyebrow">Availability</dt>
              <dd className="mt-1.5 flex items-center gap-2.5 text-xl tracking-tight">
                <span className="pulse-dot size-2 rounded-full bg-accent" />
                Open to relocation
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="border-t border-[var(--line)] py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Experience</p>
            <h2 className="display mt-5 !text-[clamp(2.2rem,4.5vw,3.8rem)]">
              The <span className="serif text-accent">path</span> so far
            </h2>
            <div className="mt-8 hidden lg:block">
              <ButtonLink href={site.cv} download variant="outline">
                Download CV <Arrow dir="down" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <ol className="relative ml-2 border-l border-[var(--line-strong)] pl-8 sm:pl-12">
            {experience.map((e, i) => (
              <Reveal as="li" key={e.role} delay={i * 80} className="relative pb-14 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-[37px] top-2 size-2.5 rounded-full sm:-left-[53px] ${
                    i === 0 ? "bg-accent ring-4 ring-[color-mix(in_srgb,var(--accent)_25%,transparent)]" : "bg-fg"
                  }`}
                />
                <p className="eyebrow">{e.period}</p>
                <h3 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">{e.role}</h3>
                <p className="mt-1 text-sm text-muted">{e.org}</p>
                <p className="mt-5 max-w-prose leading-relaxed text-muted">{e.summary}</p>
                {e.points.length > 0 && (
                  <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </ol>

          <div className="mt-20 grid gap-10 border-t border-[var(--line)] pt-12 md:grid-cols-2">
            <Reveal>
              <p className="eyebrow">Education</p>
              <h3 className="mt-3 text-xl font-medium tracking-tight">{education.degree}</h3>
              <p className="mt-1 text-sm text-muted">
                {education.school} · {education.year}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                <span className="text-fg">Graduation project.</span> {education.project}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow">Certifications &amp; activities</p>
              <ul className="mt-3 divide-y divide-[var(--line)]">
                {certifications.map((c) => (
                  <li key={c.title} className="py-3 first:pt-0">
                    <p className="text-[15px]">{c.title}</p>
                    <p className="text-sm text-muted">
                      {c.note} · {c.period}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-12 lg:hidden">
            <ButtonLink href={site.cv} download variant="outline">
              Download CV <Arrow dir="down" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { copied, copy } = useCopy(site.email);
  return (
    <section id="contact" className="border-t border-[var(--line)] py-24 md:py-36">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="display mt-5 max-w-[14ch]">
            Have something worth <span className="serif text-accent">building?</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" delay={80}>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              I&rsquo;m open to software engineering opportunities, freelance projects and
              interesting product collaborations.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <ButtonLink href={`mailto:${site.email}`} className="!px-7 !py-4 !text-base">
                  Let&rsquo;s talk <Arrow />
                </ButtonLink>
              </Magnetic>
              <button
                onClick={copy}
                className="rounded-full border border-[var(--line-strong)] px-5 py-4 text-sm transition-colors hover:border-fg"
                aria-live="polite"
              >
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={160}>
            <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {[
                { k: "Email", v: site.email, href: `mailto:${site.email}` },
                { k: "LinkedIn", v: "in/farhaghallab", href: site.linkedin },
                { k: "GitHub", v: "farhaghallab3", href: site.github },
              ].map((l) => (
                <li key={l.k}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center justify-between gap-4 py-5 sm:py-6"
                    data-cursor
                  >
                    <span className="eyebrow w-20 shrink-0">{l.k}</span>
                    <span className="min-w-0 flex-1 truncate text-lg tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                      {l.v}
                    </span>
                    <Arrow className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-[var(--line)] pb-6 pt-16">
      <div className="wrap">
        <p
          aria-hidden
          className="select-none whitespace-nowrap text-center font-medium leading-[0.85] tracking-[-0.06em]"
          style={{ fontSize: "clamp(3rem, 15.2vw, 15rem)" }}
        >
          Farha Ghallab
        </p>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[var(--line)] pt-5 text-sm text-muted sm:flex-row">
          <p>Designed &amp; built with care.</p>
          <p>
            © {new Date().getFullYear()} Farha Ghallab · Alexandria, Egypt
          </p>
        </div>
      </div>
    </footer>
  );
}
