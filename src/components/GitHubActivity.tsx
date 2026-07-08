import {
  FiGitCommit,
  FiTrendingUp,
  FiBarChart2,
  FiZap,
  FiCode,
  FiArrowUpRight,
} from "react-icons/fi";
import { BsGithub } from "react-icons/bs";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { githubStats, contact } from "@/lib/data";

// "GitHub bento" — a sibling of the About dashboard. The re-themed (transparent-bg
// + violet) widgets sit in glass tiles on the navy card so they finally blend.
// `full: true` items are the WIDE graphs (contribution calendar + activity graph),
// shown as full-width heroes; the rest are square-ish stat widgets in a 3-up row.
const graphs = githubStats.filter((s) => s.full);
const panels = githubStats.filter((s) => !s.full);

// Header (icon + label + caption) for each wide graph, by order.
const graphMeta = [
  { icon: FiGitCommit, label: "Contribution graph", caption: "Last 12 months" },
  { icon: FiTrendingUp, label: "Activity graph", caption: "This year" },
] as const;

// Header for each stat tile — generic, NO invented numbers. The widget image is
// the data; these just title each glance.
const panelMeta = [
  { icon: FiBarChart2, label: "Stats overview" },
  { icon: FiZap, label: "Contribution streak" },
  { icon: FiCode, label: "Top languages" },
] as const;

// Shared tile chrome — mirrors About's bento tiles so the two read as related.
const tile =
  "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent-bright/40 hover:bg-white/[0.07]";

// One subtle glass frame per transparent-bg widget — framed ONCE so we never
// double-box and fight the widget's own card.
const widgetFrame =
  "rounded-2xl border border-white/10 bg-white/5 p-2.5 transition-colors duration-300 ease-smooth group-hover:border-accent-bright/30 sm:p-4";

function TileLabel({
  icon: Icon,
  children,
}: {
  icon: typeof FiBarChart2;
  children: string;
}) {
  return (
    <h3 className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-soft/70">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-bright/10 text-accent-bright ring-1 ring-white/10">
        <Icon size={14} aria-hidden />
      </span>
      {children}
    </h3>
  );
}

export default function GitHubActivity() {
  return (
    <section id="Statistics" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand px-4 py-6 ring-1 ring-white/5 dark:bg-brand-deep sm:px-8 sm:py-14 md:px-12 md:py-16">
            {/* ambient accent glows — matches the Contact / About treatment */}
            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-soft/10 blur-3xl" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright/5 blur-3xl" />

            <div className="relative flex flex-col gap-8">
              {/* heading + generic supporting line (no invented stats) */}
              <div className="flex flex-col gap-4">
                <SectionHeading
                  eyebrow="Open source"
                  title="GitHub Commit"
                  accent="History"
                  align="left"
                  onDark
                />
                <p className="max-w-xl text-lg leading-relaxed text-brand-soft/70">
                  A year of open-source commits and counting — a live glance at my
                  activity, streak, and the languages I build with.
                </p>
              </div>

              {/* ── BENTO GRID — full-width graph heroes, a 3-up stat row, full CTA ── */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
                {/* WIDE GRAPHS — contribution calendar + activity graph, full width */}
                {graphs.map((g, i) => {
                  const meta = graphMeta[i] ?? graphMeta[0];
                  const Icon = meta.icon;
                  return (
                    <div
                      key={i}
                      className={`${tile} flex flex-col gap-4 p-4 sm:p-6 md:col-span-6`}
                    >
                      {/* faint dotted-grid texture, echoing About's lead tile */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.14)_1px,transparent_1px)] bg-size-[22px_22px]"
                      />
                      {/* soft violet bloom for depth behind the graph */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full bg-accent-bright/10 blur-3xl"
                      />
                      <div className="relative z-10 flex items-center justify-between gap-4">
                        <TileLabel icon={Icon}>{meta.label}</TileLabel>
                        <span className="hidden shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brand-soft/60 sm:inline-block">
                          {meta.caption}
                        </span>
                      </div>
                      {/* horizontal scroll keeps the dense graph readable on mobile */}
                      <div
                        className={`relative z-10 overflow-x-auto ${widgetFrame}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={g.src}
                          alt={g.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-auto w-full min-w-136"
                        />
                      </div>
                    </div>
                  );
                })}

                {/* STAT TILES — equal 3-up row; widgets centered + capped so the
                    transparent images never stretch awkwardly. */}
                {panels.map((stat, i) => {
                  const meta = panelMeta[i] ?? panelMeta[0];
                  return (
                    <div
                      key={i}
                      className={`${tile} flex flex-col gap-4 p-4 sm:p-6 md:col-span-2`}
                    >
                      <TileLabel icon={meta.icon}>{meta.label}</TileLabel>
                      <div
                        className={`flex flex-1 items-center justify-center ${widgetFrame}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={stat.src}
                          alt={stat.alt}
                          loading="lazy"
                          decoding="async"
                          className="mx-auto h-auto w-full max-w-md"
                        />
                      </div>
                    </div>
                  );
                })}

                {/* CTA — full-width "View GitHub profile" card */}
                {/* <a
                  href={contact.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View GitHub profile (opens in a new tab)"
                  className={`${tile} flex items-center justify-between gap-4 p-5 sm:p-6 md:col-span-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand dark:focus-visible:ring-offset-brand-deep`}
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-bright/10 text-accent-bright ring-1 ring-white/10 transition-all duration-300 ease-smooth group-hover:bg-accent-bright/20 group-hover:ring-accent-bright/40">
                      <BsGithub size={22} aria-hidden />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-lg font-semibold text-brand-soft">
                        View GitHub profile
                      </span>
                      <span className="truncate text-sm text-brand-soft/60">
                        See every repository, commit, and contribution
                      </span>
                    </span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-accent-bright ring-1 ring-white/10 transition-all duration-300 ease-spring group-hover:bg-accent-bright/15 group-hover:ring-accent-bright/40">
                    <FiArrowUpRight
                      size={20}
                      aria-hidden
                      className="transition-transform duration-300 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </a> */}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
