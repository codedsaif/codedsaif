"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { projects } from "@/lib/data";
import Project from "./Project";

const STEP = 3;

export default function Projects() {
  const [visible, setVisible] = useState(STEP);
  const listRef = useRef<HTMLDivElement>(null);
  const focusFrom = useRef<number | null>(null);

  const hasMore = visible < projects.length;
  const remaining = projects.length - visible;

  const loadMore = () => {
    focusFrom.current = visible; // index of the first newly revealed row
    setVisible((v) => Math.min(v + STEP, projects.length));
  };

  // After the new rows render, bring the FIRST new project into view and focus it
  // (keyboard / screen-reader friendly) — otherwise the browser's scroll-anchoring
  // keeps the button in view and the page appears to jump to the bottom.
  useEffect(() => {
    const idx = focusFrom.current;
    if (idx === null) return;
    focusFrom.current = null;
    const row = listRef.current?.children[idx] as HTMLElement | undefined;
    if (!row) return;
    row.scrollIntoView({ behavior: "smooth", block: "start" });
    row
      .querySelector<HTMLElement>("a[href], button")
      ?.focus({ preventScroll: true });
  }, [visible]);

  return (
    <section id="Projects" className="relative overflow-hidden pt-10 pb-16 md:pt-12 md:pb-24">
      {/* ambient violet depth — seats the case-study rows in the Indigo Noir field */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-24 -z-10 h-96 w-96 rounded-full bg-brand-soft/5 blur-3xl"
      />

      <Container>
        {/* section-boundary hairline — same faded rule the Footer uses */}
        <div
          aria-hidden
          className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent"
        />

        <SectionHeading
          eyebrow="Selected Work"
          title="Project"
          accent="Gallery"
          align="left"
          className="mt-10 md:mt-14"
        />

        {/* All projects render to the DOM (crawlable); rows past `visible` are
            CSS-hidden so their images stay lazy and there's no layout flash. */}
        <div
          ref={listRef}
          className="mt-10 flex flex-col divide-y divide-border/60 md:mt-14"
        >
          {projects.map((p, i) => (
            <Reveal
              key={p.name}
              className={
                "py-10 first:pt-0 md:py-14" + (i >= visible ? " hidden" : "")
              }
            >
              <Project {...p} index={i} />
            </Reveal>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center md:mt-14">
            <button
              type="button"
              onClick={loadMore}
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface/60 px-7 text-sm font-semibold text-fg transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Load more
              <span className="text-muted transition-colors duration-300 ease-smooth group-hover:text-accent">
                ({remaining})
              </span>
              <FiChevronDown
                size={18}
                className="shrink-0 transition-transform duration-300 ease-spring group-hover:translate-y-0.5"
              />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
