import type { IconType } from "react-icons";
import {
  FiMapPin,
  FiCode,
  FiZap,
  FiMessageCircle,
  FiUsers,
  FiArrowUpRight,
  FiFolder,
  FiLayers,
  FiBriefcase,
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
// lead in the dominant tile; the rest become a calm, two-column "story" tile so
// the bio never reads as a single wall of text.
const [lead, ...story] = aboutParagraphs;

// `profile.role` ships with a trailing "!" — trim it for chip / focus use.
const focus = profile.role.replace(/!+$/, "");

// Role / location chips — small monochrome accent icons.
type Fact = { icon: IconType; label: string };

const facts: Fact[] = [
  { icon: FiCode, label: focus },
  { icon: FiMapPin, label: contact.location },
];

// Derived, no-invented-claims stats — counts come straight from data so they
// stay correct as the portfolio grows.
const workCount = experience.filter((e) => e.kind === "work").length;

type Stat = { value: string; label: string; icon: IconType };

const stats: Stat[] = [
  { value: `${projects.length}`, label: "Projects", icon: FiFolder },
  { value: `${techSkills.length}`, label: "Technologies", icon: FiLayers },
  { value: `${workCount}`, label: "Companies", icon: FiBriefcase },
];

// Soft skills folded in on-brand with accent-tinted MONOCHROME icons (by title).
const traitIcons: Record<string, IconType> = {
  Adaptability: FiZap,
  Communication: FiMessageCircle,
  Teamwork: FiUsers,
};

// Shared tile chrome — glass surface on the navy panel, exaggerated rounding,
// subtle hover lift. One source of truth so every tile feels cohesive.
const tile =
  "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent-bright/40 hover:bg-white/[0.07]";

export default function About() {
  return (
    <section id="About" className="py-12 md:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand px-4 py-6 ring-1 ring-white/5 dark:bg-brand-deep sm:px-8 sm:py-14 md:px-12 md:py-16">
            {/* ambient accent glows — matches the Contact / Profile treatment */}
            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-soft/10 blur-3xl" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright/5 blur-3xl" />

            {/* BENTO GRID — asymmetric, one dominant tile, generous gutters.
                Collapses cleanly to a single column on mobile. */}
            <div className="relative grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
              {/* ── DOMINANT LEAD TILE (2x wide, 2x tall on desktop) ─────── */}
              <div
                className={`${tile} p-5 sm:p-7 md:p-9 md:col-span-4 md:row-span-2`}
              >
                {/* faint dotted-grid texture */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.16)_1px,transparent_1px)] bg-size-[22px_22px]"
                />
                {/* soft violet bloom behind the signature mark */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 h-44 w-44 rounded-full bg-accent-bright/10 blur-3xl"
                />
                {/* code-comment "SA" signature monogram — the non-photo visual hook,
                    reusing the hero's text-shine so the two sections feel related. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-5 top-5 select-none text-right"
                >
                  <span className="block font-mono text-[0.7rem] tracking-tight text-accent-bright/70">
                    {"/* "}
                    <span className="text-brand-soft/40">about</span>
                    {" */"}
                  </span>
                  <span className="text-shine block font-mono text-4xl font-bold leading-none tracking-tighter sm:text-5xl">
                    SA
                  </span>
                  <span className="block font-mono text-[0.7rem] tracking-wide text-brand-soft/40">
                    {"<"}
                    <span className="text-accent-bright/70">developer</span>
                    {" />"}
                  </span>
                </div>

                {/* content sits above the decorative motifs */}
                <div className="relative z-10 flex h-full flex-col gap-6">
                  <SectionHeading
                    eyebrow="Who I am"
                    title="About"
                    accent="Me"
                    align="left"
                    onDark
                  />

                  {/* role / location chips */}
                  <ul className="flex flex-wrap gap-2.5">
                    {facts.map(({ icon: Icon, label }) => (
                      <li
                        key={label}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-brand-soft/85"
                      >
                        <Icon
                          size={15}
                          aria-hidden
                          className="text-accent-bright"
                        />
                        {label}
                      </li>
                    ))}
                  </ul>

                  {/* prominent LEAD paragraph (first bio paragraph, verbatim) —
                      an accent edge gives it weight without being a text wall. */}
                  <p className="max-w-2xl text-balance border-l-2 border-accent-bright/50 pl-5 text-xl font-medium leading-relaxed text-brand-soft/95 sm:text-2xl">
                    {lead}
                  </p>

                  <div className="mt-auto pt-1">
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
              </div>

              {/* ── STATS TILE (tall, beside the lead) ───────────────────── */}
              <div
                className={`${tile} flex flex-col justify-center gap-5 p-5 sm:p-7 md:col-span-2 md:row-span-2`}
              >
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-soft/70">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-accent-bright"
                  />
                  By the numbers
                </h3>
                <dl className="flex flex-col gap-5">
                  {stats.map(({ value, label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-bright/10 text-accent-bright ring-1 ring-white/10 transition-all duration-300 ease-smooth group-hover:ring-accent-bright/30">
                        <Icon size={20} aria-hidden />
                      </span>
                      <div className="flex flex-col">
                        <dt className="text-4xl font-semibold tabular-nums leading-none text-accent-bright">
                          {value}
                        </dt>
                        <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-soft/60">
                          {label}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {/* ── SOFT-SKILL TRAIT TILES (the "How I work" trio) ───────── */}
              {softSkills.map((skill) => {
                const Icon = traitIcons[skill.title] ?? FiZap;
                return (
                  <div
                    key={skill.title}
                    className={`${tile} flex flex-col gap-4 p-5 sm:p-6 md:col-span-2`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-bright/10 text-accent-bright ring-1 ring-white/10 transition-all duration-300 ease-smooth group-hover:bg-accent-bright/20 group-hover:ring-accent-bright/40">
                      <Icon size={22} aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-brand-soft">
                      {skill.title}
                    </h3>
                    <p className="leading-relaxed text-brand-soft/70">
                      {skill.text}
                    </p>
                  </div>
                );
              })}

              {/* ── STORY TILE — remaining bio paragraphs, calm & chunked ── */}
              <div
                className={`${tile} flex flex-col gap-6 p-5 sm:p-7 md:p-9 md:col-span-6`}
              >
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-soft/70">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-accent-bright"
                  />
                  My story
                </h3>
                {/* two comfortable columns on wide screens so it never reads as a
                    tall wall of text; single column on mobile. (verbatim) */}
                <div className="grid gap-x-12 gap-y-6 lg:grid-cols-2">
                  {story.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-pretty leading-relaxed text-brand-soft/75"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
