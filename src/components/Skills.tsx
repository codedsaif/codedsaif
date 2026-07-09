"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { Container, Reveal, SectionHeading, Tooltip } from "@/components/ui";
import { skillCategories, techSkills } from "@/lib/data";

/**
 * Tech Skills — "Interactive spotlight grid" (client).
 *
 * A single refined grid of ALL 18 skill logo tiles, split into subtle category
 * rows. As the pointer moves over the grid, a soft VIOLET radial spotlight
 * follows the cursor (pointer x/y are written into --mx/--my CSS vars on the
 * surface; the spotlight layer — see globals.css .skill-grid-surface — is a
 * radial-gradient using them), so nearby tiles read brighter. Each tile lifts
 * on hover/focus, its border turns accent and the logo pops (ease-spring).
 *
 * Motion is purely interaction-driven (no autoplay); under prefers-reduced-motion
 * the spotlight layer is hidden, leaving a calm static grid. Descriptions ride
 * the CSS-only Tooltip.
 */

type TechSkill = (typeof techSkills)[number];

// One tile: a light logo plate (so colored logos read in BOTH themes) + title,
// with a category caption beneath. The description surfaces via the CSS Tooltip.
function SkillTile({ image, title, description }: TechSkill) {
  return (
    <Tooltip
      label={
        <span className="flex flex-col gap-1 text-left">
          <span className="font-semibold text-fg">{title}</span>
          <span className="text-xs leading-relaxed text-muted">
            {description}
          </span>
        </span>
      }
      className="skill-tile group/tile h-full w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-accent-bright/60"
    >
      <span className="relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface/70 p-4 text-center shadow-sm shadow-black/5 backdrop-blur-sm transition duration-300 ease-smooth group-hover/tile:-translate-y-1.5 group-hover/tile:border-accent/60 group-hover/tile:shadow-lg group-hover/tile:shadow-accent/15 group-focus-within/tile:-translate-y-1.5 group-focus-within/tile:border-accent/60 dark:bg-surface-2/50 dark:shadow-black/20 dark:group-hover/tile:border-accent-bright/60 dark:group-hover/tile:shadow-accent-bright/15 dark:group-focus-within/tile:border-accent-bright/60 sm:p-5">
        {/* Light plate keeps colored logos legible in dark mode too. */}
        <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-inset ring-black/5 sm:h-16 sm:w-16">
          <Image
            src={image}
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 object-contain transition-transform duration-300 ease-spring group-hover/tile:scale-110 group-focus-within/tile:scale-110 sm:h-10 sm:w-10"
          />
        </span>
        <span className="text-sm font-semibold leading-tight text-fg/90 transition-colors duration-300 ease-smooth group-hover/tile:text-accent group-focus-within/tile:text-accent dark:group-hover/tile:text-accent-bright dark:group-focus-within/tile:text-accent-bright">
          {title}
        </span>
      </span>
    </Tooltip>
  );
}

export default function Skills() {
  const surfaceRef = useRef<HTMLDivElement>(null);

  // Write pointer position into CSS custom properties on the grid surface so the
  // radial spotlight can follow the cursor — no React re-renders. Reduced-motion
  // users get the static fallback (the spotlight layer is hidden via CSS).
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const el = surfaceRef.current;
      if (!el) return;
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      el.style.setProperty("--spot-opacity", "1");
    },
    []
  );

  const handlePointerLeave = useCallback(() => {
    surfaceRef.current?.style.setProperty("--spot-opacity", "0");
  }, []);

  return (
    <section id="Tech Skills" className="relative overflow-hidden py-16 md:py-24">
      {/* ambient violet depth — matches the Experience section */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-24 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-16 -z-10 h-96 w-96 rounded-full bg-brand-soft/5 blur-3xl"
      />

      <Container>
        <SectionHeading
          eyebrow="Stack"
          title="Technical"
          accent="Proficiency"
          align="left"
        />
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Move your cursor across the grid — the tools I reach for light up as
          you go. Hover any tile for what it is and where I use it.
        </p>

        {/* SPOTLIGHT SURFACE — pointer x/y feed the radial glow via CSS vars. */}
        <div
          ref={surfaceRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="skill-grid-surface relative mt-10 rounded-3xl border border-border bg-surface/30 p-4 backdrop-blur-sm md:mt-14 md:p-6 dark:bg-surface/20"
        >
          <div className="relative z-10 flex flex-col gap-8 md:gap-10">
            {skillCategories.map((category) => {
              const skills = techSkills.filter((s) => s.category === category);
              if (skills.length === 0) return null;

              const headingId = `skills-${category
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`;

              return (
                <Reveal key={category}>
                  <section aria-labelledby={headingId}>
                    {/* Subtle category divider label */}
                    <div className="mb-4 flex items-center gap-3">
                      <h3
                        id={headingId}
                        className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted"
                      >
                        {category}
                      </h3>
                      <span
                        aria-hidden
                        className="h-px flex-1 bg-linear-to-r from-border to-transparent"
                      />
                      <span
                        aria-label={`${skills.length} skills`}
                        className="text-xs font-semibold tabular-nums text-muted"
                      >
                        {skills.length}
                      </span>
                    </div>

                    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-6">
                      {skills.map((skill) => (
                        <li key={skill.name} className="flex">
                          <SkillTile {...skill} />
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
