import { Container, Reveal, SectionHeading } from "@/components/ui";
import { projects } from "@/lib/data";
import Project from "./Project";

export default function Projects() {
  return (
    <section id="Projects" className="py-12 md:py-20">
      <Container>
        <SectionHeading title="Project" accent="Gallery" align="center" />
        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Reveal key={p.name}>
              <Project {...p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
