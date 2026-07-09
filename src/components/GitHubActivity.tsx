import { FiArrowUpRight } from "react-icons/fi";
import { BsGithub } from "react-icons/bs";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { githubStats, contact, type GitHubStat } from "@/lib/data";

// Dense bento: all SIX live GitHub widgets in ONE asymmetric 6-column grid with
// minimal chrome — one hairline frame per widget, tight gutters, a single glow.
//   Row 1 — contribution calendar (hero, full width, scrolls on mobile)
//   Row 2 — activity graph + profile-summary card (two half-width tiles)
//   Row 3 — stats · streak · languages (three third-width tiles)
// Five widgets are light-on-transparent → translucent glass tiles on this dark
// card. The profile-summary ("boxed") ships its own opaque tokyonight box
// (#1a1b27 ≈ this card); its frame padding is that SAME colour, so no white mat
// shows around it — it reads as a sibling of the glass tiles, not a box-in-a-box.
const SPAN: Record<GitHubStat["kind"], string> = {
  hero: "md:col-span-6",
  wide: "md:col-span-3",
  boxed: "md:col-span-3",
  compact: "md:col-span-2",
};

// One shared hairline shell; the fill differs (glass vs the profile's own navy).
const tileBase = "rounded-2xl p-3 ring-1 ring-white/10 sm:p-4";

export default function GitHubActivity() {
  return (
    <section id="Statistics" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand px-4 py-8 ring-1 ring-white/5 dark:bg-brand-deep sm:px-8 sm:py-12 md:px-10">
            {/* one soft accent glow — no clutter */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative flex flex-col gap-8">
              {/* heading + compact "view profile" chip (no CTA card) */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  eyebrow="Open source"
                  title="GitHub Commit"
                  accent="History"
                  align="left"
                  onDark
                />
                <a
                  href={contact.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View GitHub profile (opens in a new tab)"
                  className="group inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-soft/80 transition-all duration-300 ease-smooth hover:border-accent-bright/40 hover:bg-accent-bright/10 hover:text-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand dark:focus-visible:ring-offset-brand-deep"
                >
                  <BsGithub size={15} aria-hidden />
                  View profile
                  <FiArrowUpRight
                    size={14}
                    aria-hidden
                    className="transition-transform duration-300 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              {/* dense bento — every widget visible, tight gutters, minimal chrome */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-6">
                {githubStats.map((stat) => {
                  // Wide time-series (calendar + activity graph): scroll on narrow
                  // screens so the dense cells / month axis stay legible.
                  if (stat.kind === "hero" || stat.kind === "wide") {
                    return (
                      <div
                        key={stat.src}
                        className={`${SPAN[stat.kind]} bg-white/5 ${tileBase}`}
                      >
                        <div className="overflow-x-auto">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={stat.src}
                            alt={stat.alt}
                            loading="lazy"
                            decoding="async"
                            className={
                              stat.kind === "hero"
                                ? "h-auto w-full min-w-136"
                                : "h-auto w-full"
                            }
                          />
                        </div>
                      </div>
                    );
                  }

                  // Profile summary: its own opaque tokyonight box. Frame fill =
                  // #1a1b27 (the box's own colour) so the padding is invisible and
                  // there's no panel-in-panel; it matches the glass tiles' inset.
                  if (stat.kind === "boxed") {
                    return (
                      <div
                        key={stat.src}
                        className={`${SPAN.boxed} flex items-center justify-center bg-[#1a1b27] ${tileBase}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={stat.src}
                          alt={stat.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-auto w-full"
                        />
                      </div>
                    );
                  }

                  // Compact transparent stat cards (stats · streak · languages).
                  return (
                    <div
                      key={stat.src}
                      className={`${SPAN.compact} flex items-center justify-center bg-white/5 ${tileBase}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={stat.src}
                        alt={stat.alt}
                        loading="lazy"
                        decoding="async"
                        className="mx-auto h-auto w-full"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
