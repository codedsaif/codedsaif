import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Tag } from "@/components/ui";
import type { Project as ProjectData } from "@/lib/data";
import Slider from "./Slider";

type ProjectProps = ProjectData & {
  /** Drives the alternating image/info sides on lg+ and the index numeral. */
  index: number;
};

export default function Project({
  stack,
  name,
  description,
  techStack,
  slider,
  liveLink,
  gitHubLink,
  index,
}: ProjectProps) {
  // Even rows: image left / info right. Odd rows: image right / info left (lg+).
  const imageFirst = index % 2 === 0;
  // The lead project opens the gallery on a larger "hero" beat.
  const featured = index === 0;

  return (
    <article className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/* IMAGE — glassy frame. Slider owns its own hover arrows; the stack badge
          is pointer-events-none so it never blocks them. */}
      <div className={"relative " + (imageFirst ? "lg:order-1" : "lg:order-2")}>
        {/* soft violet bloom behind the frame on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] bg-accent/0 blur-2xl transition-colors duration-500 ease-smooth group-hover:bg-accent/15"
        />
        <div className="relative overflow-hidden rounded-3xl bg-surface-2 shadow-xl shadow-black/10 ring-1 ring-border transition-all duration-500 ease-smooth group-hover:shadow-2xl group-hover:shadow-accent/15 group-hover:ring-accent/40 dark:shadow-black/40">
          <Slider sliderData={slider} />
          <span className="pointer-events-none absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-brand-deep/70 px-3 py-1 text-xs font-semibold tracking-wide text-brand-soft shadow-lg shadow-black/30 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
            {stack}
          </span>
        </div>
      </div>

      {/* INFO */}
      <div
        className={
          "flex flex-col gap-5 " + (imageFirst ? "lg:order-2" : "lg:order-1")
        }
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold tabular-nums tracking-[0.2em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden className="h-px flex-1 bg-border" />
        </div>

        <h3 className="text-2xl font-semibold leading-[1.1] text-fg transition-colors duration-300 ease-smooth group-hover:text-accent sm:text-3xl md:text-4xl">
          {name}
        </h3>

        <p
          className={
            "leading-relaxed text-muted " +
            (featured ? "max-w-2xl text-lg" : "max-w-xl text-base")
          }
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <Tag
              key={t}
              className="bg-accent/10 text-accent dark:bg-accent-bright/10 dark:text-accent-bright"
            >
              {t}
            </Tag>
          ))}
        </div>

        {/* ACTIONS — primary violet "Live" + outline "Code"; each only if present */}
        <div className="mt-1 flex flex-wrap items-center gap-3">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${name} live`}
              className="group/btn inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-brand via-accent to-accent-bright px-6 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-[0.98]"
            >
              Live
              <FiArrowUpRight
                size={16}
                className="shrink-0 transition-transform duration-300 ease-spring group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </a>
          )}
          {gitHubLink && (
            <a
              href={gitHubLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${name} source code`}
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-border bg-surface/60 px-6 text-sm font-semibold text-fg transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-[0.98]"
            >
              <FiGithub size={16} className="shrink-0" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
