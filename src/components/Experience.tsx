"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import { FiBriefcase, FiCalendar, FiChevronDown, FiMapPin } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { Container, SectionHeading, Tag } from "@/components/ui";
import { experience, type TimelineEntry, type TimelineRole } from "@/lib/data";

const STEP = 3;

// A role/period that runs to "Present" is ongoing → gets the live "Current" cue.
const isCurrent = (period: string) => /present/i.test(period);

// Company/school monogram fallback when no logo is supplied (e.g. "TechNova
// Solutions" -> "TS"). Keeps the node looking intentional without an asset.
const initials = (org: string) =>
  org
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();

// Per-kind presentation: the kind icon + a "Work / Education" badge.
const KIND: Record<TimelineEntry["kind"], { icon: IconType; label: string }> = {
  work: { icon: FiBriefcase, label: "Work" },
  education: { icon: LuGraduationCap, label: "Education" },
};

// Small legend chip decoding the briefcase / cap glyphs up front.
function LegendItem({ icon: Icon, label }: { icon: IconType; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-sm font-medium text-fg/90">
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/10 text-accent dark:bg-accent-bright/10 dark:text-accent-bright">
        <Icon size={13} aria-hidden />
      </span>
      {label}
    </span>
  );
}

// "Current" live badge — a pinging accent dot (reduced-motion safe via globals).
function CurrentBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-[0.7rem] font-semibold text-accent dark:bg-accent-bright/10 dark:text-accent-bright">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 dark:bg-accent-bright" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent dark:bg-accent-bright" />
      </span>
      Current
    </span>
  );
}

// The rail node — company/school logo, or a monogram tile when no logo is set.
function OrgNode({ entry, current }: { entry: TimelineEntry; current: boolean }) {
  return (
    <span
      aria-hidden
      className={
        "absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border shadow-sm ring-4 ring-bg transition-colors duration-300 ease-smooth group-hover:border-accent/50 sm:h-12 sm:w-12 " +
        (current ? "border-accent/60 " : "border-border ") +
        (entry.logo ? "bg-white" : "bg-accent/10 dark:bg-accent-bright/10")
      }
    >
      {entry.logo ? (
        <Image
          src={entry.logo}
          alt={`${entry.org} logo`}
          fill
          sizes="48px"
          className="object-contain p-1.5"
        />
      ) : (
        <span className="text-sm font-bold text-accent dark:text-accent-bright">
          {initials(entry.org)}
        </span>
      )}
    </span>
  );
}

// Summary + highlights + tech for a single role (shared by flat & nested layouts).
function RoleBody({ role }: { role: TimelineRole }) {
  return (
    <>
      {role.summary && (
        <p className="mt-2 text-sm leading-relaxed text-muted">{role.summary}</p>
      )}

      {role.highlights.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {role.highlights.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-fg/90"
            >
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent dark:bg-accent-bright"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {role.tech && role.tech.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {role.tech.map((t) => (
            <li key={t}>
              <Tag className="bg-accent/10 text-accent dark:bg-accent-bright/10 dark:text-accent-bright">
                {t}
              </Tag>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// One org on the rail. Single-role orgs render flat; multi-role orgs nest their
// roles under a sub-rail (LinkedIn-style: Intern -> Engineer -> Team Lead).
function TimelineItem({
  entry,
  hidden,
}: {
  entry: TimelineEntry;
  hidden?: boolean;
}) {
  const { icon: Icon, label } = KIND[entry.kind];
  const multiRole = entry.roles.length > 1;
  const orgIsCurrent = entry.roles.some((r) => isCurrent(r.period));

  return (
    <li
      className={
        "reveal group relative pl-14 sm:pl-20" + (hidden ? " hidden" : "")
      }
    >
      <OrgNode entry={entry} current={orgIsCurrent} />

      {/* GLASSY CARD */}
      <article
        tabIndex={-1}
        className="relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-5 shadow-sm shadow-black/5 backdrop-blur-sm transition-all duration-300 ease-smooth group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-xl group-hover:shadow-accent/10 group-hover:ring-1 group-hover:ring-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 dark:bg-surface/60 dark:shadow-black/20 dark:group-hover:shadow-accent-bright/10 dark:group-hover:ring-accent-bright/30 sm:p-6"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 ease-smooth group-hover:bg-accent/10 dark:group-hover:bg-accent-bright/10"
        />

        {/* META — overall period pill + kind badge (+ Current for flat entries) */}
        <div className="relative flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold tabular-nums tracking-wide text-accent dark:bg-accent-bright/10 dark:text-accent-bright">
            <FiCalendar size={12} className="shrink-0" aria-hidden />
            {entry.period}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface-2/70 px-2.5 py-1 text-[0.7rem] font-medium text-muted">
            <Icon className="h-3 w-3" aria-hidden />
            {label}
          </span>
          {!multiRole && isCurrent(entry.roles[0].period) && <CurrentBadge />}
        </div>

        {multiRole ? (
          <>
            {/* COMPANY HEADER */}
            <h3 className="relative mt-3 text-lg font-semibold leading-snug text-fg transition-colors duration-300 ease-smooth group-hover:text-accent dark:group-hover:text-accent-bright sm:text-xl">
              {entry.org}
            </h3>
            <div className="relative mt-1.5 inline-flex items-center gap-1 text-sm text-muted">
              <FiMapPin size={13} className="shrink-0" aria-hidden />
              {entry.location}
            </div>

            {/* NESTED ROLES — sub-rail with small nodes per role */}
            <ol className="relative mt-5 flex flex-col gap-5">
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-2 left-[3px] top-2 w-px bg-border"
              />
              {entry.roles.map((role) => (
                <li key={role.title} className="relative pl-6">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-accent ring-4 ring-surface dark:bg-accent-bright"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h4 className="text-base font-semibold text-fg">
                      {role.title}
                    </h4>
                    <span className="inline-flex items-center gap-2">
                      {isCurrent(role.period) && <CurrentBadge />}
                      <span className="text-xs font-medium tabular-nums text-accent dark:text-accent-bright">
                        {role.period}
                      </span>
                    </span>
                  </div>
                  <RoleBody role={role} />
                </li>
              ))}
            </ol>
          </>
        ) : (
          <>
            {/* SINGLE ROLE — role as the title, org + location beneath */}
            <h3 className="relative mt-3 text-lg font-semibold leading-snug text-fg transition-colors duration-300 ease-smooth group-hover:text-accent dark:group-hover:text-accent-bright sm:text-xl">
              {entry.roles[0].title}
            </h3>
            <div className="relative mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-medium text-accent dark:text-accent-bright">
                {entry.org}
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1 text-muted">
                <FiMapPin size={13} className="shrink-0" aria-hidden />
                {entry.location}
              </span>
            </div>
            <RoleBody role={entry.roles[0]} />
          </>
        )}
      </article>
    </li>
  );
}

export default function Experience() {
  const [visible, setVisible] = useState(STEP);
  const listRef = useRef<HTMLOListElement>(null);
  const focusFrom = useRef<number | null>(null);

  const hasMore = visible < experience.length;
  const remaining = experience.length - visible;

  const loadMore = () => {
    focusFrom.current = visible; // first newly revealed entry
    setVisible((v) => Math.min(v + STEP, experience.length));
  };

  // After revealing more entries, bring the first new one into view + focus it,
  // so the page doesn't anchor-jump to the bottom.
  useEffect(() => {
    const idx = focusFrom.current;
    if (idx === null) return;
    focusFrom.current = null;
    const row = listRef.current?.children[idx] as HTMLElement | undefined;
    if (!row) return;
    row.scrollIntoView({ behavior: "smooth", block: "start" });
    row.querySelector<HTMLElement>("article")?.focus({ preventScroll: true });
  }, [visible]);

  return (
    <section id="Experience" className="relative overflow-hidden py-16 md:py-24">
      {/* ambient violet depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-32 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-24 -z-10 h-96 w-96 rounded-full bg-brand-soft/5 blur-3xl"
      />

      <Container>
        <SectionHeading
          eyebrow="Career"
          title="Experience"
          accent="& Education"
          align="left"
        />
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          A chronological look at where I&apos;ve worked and studied.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <LegendItem icon={FiBriefcase} label="Work" />
          <LegendItem icon={LuGraduationCap} label="Education" />
        </div>

        {/* THE RAIL — one vertical line (uniform colour); cards sit to its right. */}
        <div className="relative mt-10 md:mt-14">
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-2 left-5 top-2 w-px bg-linear-to-b from-accent/40 via-border to-border sm:left-6"
          />

          <ol ref={listRef} className="flex flex-col gap-8 md:gap-10">
            {experience.map((entry, i) => (
              <TimelineItem
                key={entry.org}
                entry={entry}
                hidden={i >= visible}
              />
            ))}
          </ol>
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
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
