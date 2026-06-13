import { Container } from "@/components/ui";
import { socials } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div
      id="Footer"
      className="mx-auto max-w-7xl rounded-2xl border border-border bg-surface"
    >
      <Container className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="text-fg/80">© {year} developersdrills. All rights reserved</p>
        <div className="flex flex-wrap justify-center gap-3">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.href}
                href={s.href}
                aria-label={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-fg transition-colors hover:bg-accent hover:text-white"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
