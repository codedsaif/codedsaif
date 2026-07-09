import type { IconType } from "react-icons";
import {
  FiMapPin,
  FiCode,
  FiFolder,
  FiLayers,
  FiBriefcase,
  FiGitBranch,
  FiBookOpen,
  FiActivity,
  FiAward,
  FiZap,
  FiMessageCircle,
  FiUsers,
  FiArrowUpRight,
} from "react-icons/fi";
import { Container, Reveal, SectionHeading, Button } from "@/components/ui";
import {
  aboutParagraphs,
  softSkills,
  contact,
  profile,
  projects,
  techSkills,
  experience,
  RESUME,
} from "@/lib/data";

// Prose is NEVER rewritten — only arranged. The first paragraph is the prominent
// lead; the rest become labelled "story" chapters so the bio reads as scannable
// cards instead of one wall of text.
const [lead, ...story] = aboutParagraphs;

// `profile.role` ships with a trailing "!" — trim it for chip use.
const focus = profile.role.replace(/!+$/, "");

// Derived proof — counts come straight from data so they stay correct as the
// portfolio grows. No invented claims.
const workCount = experience.filter((e) => e.kind === "work").length;

type Stat = { value: string; label: string; icon: IconType };
const stats: Stat[] = [
  { value: `${projects.length}`, label: "Projects", icon: FiFolder },
  { value: `${techSkills.length}`, label: "Technologies", icon: FiLayers },
  { value: `${workCount}`, label: "Companies", icon: FiBriefcase },
];

// Structural labels for the remaining bio paragraphs — arranged, not rewritten.
// (Falls back gracefully if a paragraph is ever added.)
const storyMeta: { label: string; icon: IconType }[] = [
  { label: "My journey", icon: FiGitBranch },
  { label: "Always learning", icon: FiBookOpen },
  { label: "Beyond the code", icon: FiActivity },
  { label: "Education", icon: FiAward },
];

// Soft skills → compact "how I work" chips (icon by title).
const traitIcons: Record<string, IconType> = {
  Adaptability: FiZap,
  Communication: FiMessageCircle,
  Teamwork: FiUsers,
};

// Shared card chrome — subtle surface tile on the page background, matching the
// Skills / Experience sections so the whole mid-page reads as one system.
const card =
  "rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/5 dark:shadow-black/20 sm:p-7";

export default function About() {
  return (
    <section id="About" className="relative overflow-hidden py-16 md:py-24">
      {/* ambient violet depth — matches the Skills / Experience sections */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-brand-soft/5 blur-3xl dark:bg-accent-bright/5" />
      </div>

      <Container>
        <Reveal>
          {/* ── ROW 1: narrative left, at-a-glance card right ─────────── */}
          <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
            <div className="flex flex-col">
              <SectionHeading
                eyebrow="Who I am"
                title="About"
                accent="Me"
                align="left"
              />
              {/* LEAD — first paragraph, verbatim, with an editorial accent rule */}
              <p className="mt-6 max-w-xl text-pretty border-l-2 border-accent/60 pl-5 text-xl font-medium leading-relaxed text-fg/90 sm:text-2xl">
                {lead}
              </p>
              <div className="mt-8">
                <Button
                  href={RESUME.view}
                  target="_blank"
                  variant="soft"
                  size="lg"
                  aria-label="View resume (opens in a new tab)"
                  className="group/cta"
                >
                  View Resume
                  <FiArrowUpRight
                    size={18}
                    aria-hidden
                    className="transition-transform duration-300 ease-spring group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  />
                </Button>
              </div>
            </div>

            {/* AT A GLANCE — stats + role/location: the section's visual anchor */}
            <div className={`${card} flex flex-col justify-center`}>
              <h3 className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                At a glance
              </h3>
              <dl className="mt-6 grid grid-cols-3 gap-4">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <Icon size={16} aria-hidden className="text-accent" />
                    <dt className="text-3xl font-semibold tabular-nums leading-none text-fg sm:text-4xl">
                      {value}
                    </dt>
                    <dd className="text-xs font-medium uppercase tracking-wide text-muted">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                <p className="flex items-center gap-2.5 text-sm text-muted">
                  <FiCode size={16} aria-hidden className="shrink-0 text-accent" />
                  {focus}
                </p>
                <p className="flex items-center gap-2.5 text-sm text-muted">
                  <FiMapPin size={16} aria-hidden className="shrink-0 text-accent" />
                  {contact.location}
                </p>
              </div>
            </div>
          </div>

          {/* ── ROW 2: the story — labelled chapters, scannable ───────── */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-14">
            {story.map((paragraph, i) => {
              const meta = storyMeta[i] ?? { label: "More", icon: FiCode };
              const Icon = meta.icon;
              return (
                <div
                  key={i}
                  className={`group ${card} transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent/40`}
                >
                  <h3 className="flex items-center gap-3 text-sm font-semibold text-fg">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 transition-colors duration-300 ease-smooth group-hover:bg-accent/15">
                      <Icon size={17} aria-hidden />
                    </span>
                    {meta.label}
                  </h3>
                  <p className="mt-4 text-pretty leading-relaxed text-muted">
                    {paragraph}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ── ROW 3: how I work — soft skills as compact chips ──────── */}
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">
              How I work
            </span>
            <span aria-hidden className="hidden h-px flex-1 bg-border sm:block" />
            <ul className="flex flex-wrap gap-2.5">
              {softSkills.map((skill) => {
                const Icon = traitIcons[skill.title] ?? FiZap;
                return (
                  <li
                    key={skill.title}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg/80"
                  >
                    <Icon size={15} aria-hidden className="text-accent" />
                    {skill.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
