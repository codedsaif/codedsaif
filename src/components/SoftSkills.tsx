import { FcAssistant, FcManager, FcPositiveDynamic } from "react-icons/fc";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { softSkills } from "@/lib/data";

const icons = [FcPositiveDynamic, FcAssistant, FcManager];

export default function SoftSkills() {
  return (
    <section id="Soft Skills" className="py-12 md:py-20">
      <Container>
        <div className="mb-10 md:mb-12">
          <SectionHeading title="Soft" accent="Skills" align="center" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {softSkills.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.title}>
                <div className="flex h-full flex-col items-center gap-3 rounded-2xl bg-brand p-6 text-center shadow-lg shadow-brand/20 transition hover:-translate-y-1 dark:bg-brand-deep">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-soft">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-soft">{s.title}</h3>
                  <p className="leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
