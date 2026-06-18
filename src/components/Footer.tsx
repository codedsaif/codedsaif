import { Container } from "@/components/ui";
import { socials } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div id="Footer">
      <Container>
        {/* faded hairline — anchors the row without a boxy border */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

        <div className="flex flex-col items-center justify-between gap-5 py-8 sm:flex-row md:py-10">
          <p className="text-sm text-muted">
            © {year} developersdrills. All rights reserved
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-1.5">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label + s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </div>
  );
}
