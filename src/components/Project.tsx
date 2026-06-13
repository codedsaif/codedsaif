import { Tag } from "@/components/ui";
import type { Project as ProjectData } from "@/lib/data";
import Slider from "./Slider";
import ProjectsButtons from "./ProjectsButtons";

export default function Project({
  stack,
  name,
  description,
  techStack,
  slider,
  liveLink,
  gitHubLink,
}: ProjectData) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-xl ring-1 ring-border transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-[240px] bg-surface-2">
        <Slider sliderData={slider} />
      </div>
      <div className="flex grow flex-col gap-3 p-6">
        <p className="text-sm font-extrabold uppercase tracking-wide text-brand dark:text-brand-soft">
          {stack}
        </p>
        <h3 className="text-2xl font-bold text-fg">{name}</h3>
        <p className="text-muted">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <div className="mt-auto p-6 pt-0">
        <ProjectsButtons liveLink={liveLink} gitHubLink={gitHubLink} />
      </div>
    </div>
  );
}
