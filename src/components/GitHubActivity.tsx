import { Container, Reveal, SectionHeading } from "@/components/ui";
import { githubStats } from "@/lib/data";

export default function GitHubActivity() {
  return (
    <section id="Statistics" className="py-12 md:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-16 dark:bg-brand-deep sm:px-10 md:px-16 md:py-24">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-soft/10 blur-3xl" />
            <div className="relative flex flex-col items-center gap-10">
              <SectionHeading title="GitHub Commit" accent="History" onDark />
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                {githubStats.map((stat, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={stat.src}
                    alt={stat.alt}
                    loading="lazy"
                    decoding="async"
                    className={
                      "w-full rounded-lg object-cover" +
                      (stat.full ? " md:col-span-2" : "")
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
