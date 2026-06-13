import { Container, Reveal, SectionHeading } from "@/components/ui";
import { techSkills } from "@/lib/data";
import Skill from "./Skill";

export default function Skills() {
  return (
    <section id="Tech Skills" className="py-12 md:py-20">
      <Container>
        <SectionHeading title="Technical" accent="Proficiency" align="center" />
        <div className="mt-10 grid grid-cols-2 place-items-center gap-3 sm:grid-cols-3 md:mt-12 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
          {techSkills.map((item) => (
            <Reveal key={item.name} className="flex justify-center">
              <Skill
                image={item.image}
                title={item.title}
                description={item.description}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
