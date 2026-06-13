import { Container, Reveal, SectionHeading } from "@/components/ui";
import { aboutParagraphs } from "@/lib/data";

export default function About() {
  const [lead, ...rest] = aboutParagraphs;

  return (
    <section id="About" className="py-12 md:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-16 dark:bg-brand-deep sm:px-10 md:px-16 md:py-24">
            {/* ambient accent glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-soft/10 blur-3xl" />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
              <SectionHeading title="About" accent="Me" onDark />

              <p className="text-center text-lg leading-relaxed text-brand-soft/85">
                {lead}
              </p>

              {rest.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-left leading-relaxed text-brand-soft/70"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
