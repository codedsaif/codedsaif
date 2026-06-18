import Image from "next/image";
import type { IconType } from "react-icons";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { Button, Container, Reveal } from "@/components/ui";
import { profile, contact, softSkills, RESUME } from "@/lib/data";
import portrait from "@/assets/Saif_Ali_Professional_Picture.png";

// `profile.firstName` ships as "Saif Ali," — drop the trailing comma for the
// oversized display headline (the data itself is kept untouched).
const displayName = profile.firstName.replace(/,+$/, "");

// Social row — derived straight from contact.socials so the links stay correct.
type SocialLink = { label: string; href: string; icon: IconType };

const socialLinks: SocialLink[] = [
  { label: "GitHub", href: contact.socials.github, icon: BsGithub },
  { label: "LeetCode", href: contact.socials.leetcode, icon: SiLeetcode },
  { label: "LinkedIn", href: contact.socials.linkedin, icon: BsLinkedin },
];

// Floating organic blob behind the portrait (same path as the original hero).
// `animate-float` is paused under prefers-reduced-motion (handled in globals).
function Blob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Profile() {
  return (
    <section
      id="Profile"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Ambient aurora glows — same palette family as the Contact / About cards. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-8%] h-136 w-136 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute left-[-10%] top-1/3 h-104 w-104 rounded-full bg-brand-soft/10 blur-3xl dark:bg-accent-bright/10" />
      </div>

      <Container>
        <Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:gap-16">
            {/* LEFT — eyebrow, oversized name, kinetic role, value prop, status, CTAs, socials */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* greeting eyebrow + "available for work" status pill */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-muted">
                  <span
                    aria-hidden
                    className="h-px w-8 bg-linear-to-r from-accent to-transparent"
                  />
                  Hi, I&apos;m
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  Available for work
                </span>
              </div>

              {/* OVERSIZED name + kinetic role headline */}
              <h1 className="mt-5 text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                <span className="relative inline-block">
                  <span className="relative z-10 text-fg">{displayName}</span>
                  {/* refined indigo→violet highlight sweep behind the name */}
                  <span
                    aria-hidden
                    className="absolute inset-x-[-0.08em] bottom-[0.08em] z-0 h-[0.34em] -skew-y-1 rounded-lg bg-linear-to-r from-brand via-accent to-accent-bright opacity-90 dark:from-brand-deep dark:via-accent/80 dark:to-accent-bright"
                  />
                </span>
                <span className="mt-1.5 block text-shine">{profile.role}</span>
              </h1>

              {/* VALUE PROP — profile.description, verbatim, as the supporting subline */}
              <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {profile.description}
              </p>

              {/* location microcopy */}
              <p className="mt-4 text-sm font-medium text-muted">
                <span className="text-accent">{"// "}</span>
                {contact.location}
              </p>

              {/* soft-skill traits — folded in from the removed Soft Skills section */}
              <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                {softSkills.map((s) => (
                  <li
                    key={s.title}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted"
                  >
                    <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                    {s.title}
                  </li>
                ))}
              </ul>

              {/* CTAs — ONE dominant primary (View Work) + secondary Resume */}
              <div className="mt-8 flex w-full flex-col items-stretch gap-3.5 sm:w-auto sm:flex-row sm:items-center">
                {/* Primary CTA — solid, theme-aware text for AA contrast (white on the
                    darker light-mode violet, dark navy on the brighter dark-mode violet),
                    with the sheen sweep kept for the premium feel. */}
                <a
                  href="#Projects"
                  className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-7 text-base font-medium text-white shadow-lg shadow-accent/30 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/45 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:text-brand-deep"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-smooth group-hover:translate-x-full"
                  />
                  View My Work
                  <FiArrowDownRight
                    size={18}
                    aria-hidden
                    className="transition-transform duration-300 ease-spring group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </a>
                <Button
                  href={RESUME.view}
                  target="_blank"
                  variant="outline"
                  size="lg"
                  aria-label="View resume (opens in a new tab)"
                  className="group"
                >
                  Resume
                  <FiArrowUpRight
                    size={18}
                    aria-hidden
                    className="transition-transform duration-300 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>
              </div>

              {/* SOCIAL row — easy contact */}
              <div className="mt-8 flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted/80">
                  Find me
                </span>
                <span aria-hidden className="h-px w-6 bg-border" />
                <ul className="flex items-center gap-2.5">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/60 text-muted transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      >
                        <Icon
                          size={19}
                          className="transition-transform duration-300 ease-spring group-hover:scale-110"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT — premium glassy, accent-ringed portrait with the floating blob behind */}
            <div className="relative mx-auto flex w-full max-w-104 items-center justify-center lg:max-w-none">
              {/* floating organic blob behind the frame */}
              <Blob className="absolute top-[-14%] left-1/2 -z-10 h-[150%] w-[125%] -translate-x-1/2 animate-float text-brand opacity-90 dark:text-brand-deep" />
              {/* soft violet halo — same accent bloom as the About portrait */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.5rem] bg-accent-bright/20 blur-2xl"
              />

              <div className="group relative w-full overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-500 ease-smooth hover:ring-accent-bright/40">
                <div className="relative overflow-hidden rounded-3xl">
                  <Image
                    src={portrait}
                    alt="Portrait of Saif Ali"
                    priority
                    placeholder="blur"
                    sizes="(max-width: 1024px) 80vw, 26rem"
                    className="h-auto w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                  />
                  {/* gradient scrim grounds the photo into the dark frame */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-brand-deep/70 to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
