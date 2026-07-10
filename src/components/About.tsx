import { Container, Reveal, SectionHeading, Tooltip } from "@/components/ui";
import {
  aboutParagraphs,
  softSkills,
  projects,
  techSkills,
  experience,
} from "@/lib/data";

/* ----------------------------------------------------------------------------
   Content arrangement — prose is NEVER rewritten, only arranged. The first
   paragraph is the editorial lead; the remaining three become numbered
   chapters below the fold line.
---------------------------------------------------------------------------- */
const [lead, ...story] = aboutParagraphs;

const chapterLabels = [
  "Across the stack",
  "Always learning",
  "Beyond the code",
];

// Derived count — computed from data so it stays correct as the site grows.
const workCount = experience.filter((e) => e.kind === "work").length;

/* ----------------------------------------------------------------------------
   THE ANCHOR — `saif.ts`: an identity card rendered as real TypeScript.
   Every value is verbatim from @/lib/data or a derived count. Syntax colours
   use existing tokens only (accent for keywords + numbers, emerald for
   strings — echoing the hero's availability badge; light mode stays at
   emerald-700 for AA contrast at this size).
---------------------------------------------------------------------------- */
type TokenKind = "kw" | "id" | "key" | "str" | "num" | "punc" | "comment";

type Token = {
  text: string;
  kind: TokenKind;
  /** One-sentence excerpt revealed on hover/focus (soft skills only). */
  tip?: string;
};

const kw = (text: string): Token => ({ text, kind: "kw" });
const id = (text: string): Token => ({ text, kind: "id" });
const key = (text: string): Token => ({ text, kind: "key" });
const num = (value: number): Token => ({ text: String(value), kind: "num" });
const punc = (text: string): Token => ({ text, kind: "punc" });
const comment = (text: string): Token => ({ text, kind: "comment" });
const str = (text: string, tip?: string): Token => ({
  text: `"${text}"`,
  kind: "str",
  tip,
});

// Compact reveal: only the FIRST sentence of each soft-skill text — no walls.
const firstSentence = (text: string) => `${text.split(". ")[0]}.`;

// NOTE: the trait tooltips render inside the card's overflow-hidden body and
// open UPWARD — keep the traits in the lower half of codeLines or the popup
// will be clipped by the card edge.
// Only facts NOT already stated in the surrounding prose live here — the lead
// beside the card covers role/experience; chapters 02/03 cover learning and
// life beyond code. The card carries the derived counts + the trait tooltips.
const codeLines: Token[][] = [
  [comment("// sourced from site data")],
  [kw("const"), id(" saif"), punc(" = {")],
  [key("  projects"), punc(": "), num(projects.length), punc(",")],
  [key("  technologies"), punc(": "), num(techSkills.length), punc(",")],
  [key("  companies"), punc(": "), num(workCount), punc(",")],
  [key("  traits"), punc(": [")],
  ...softSkills.map((skill) => [
    punc("    "),
    str(skill.title, firstSentence(skill.text)),
    punc(","),
  ]),
  [punc("  ],")],
  [punc("}"), kw(" as const"), punc(";")],
];

const tokenClass: Record<TokenKind, string> = {
  kw: "text-accent",
  id: "font-medium text-fg",
  key: "text-fg/85",
  str: "text-emerald-700 dark:text-emerald-400",
  num: "font-semibold text-accent",
  punc: "text-muted",
  comment: "italic text-muted",
};

function CodeToken({ token }: { token: Token }) {
  if (!token.tip) {
    return <span className={tokenClass[token.kind]}>{token.text}</span>;
  }
  // Soft-skill strings get a CSS-only excerpt reveal (hover + keyboard focus).
  return (
    <Tooltip
      className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      label={
        <span className="block whitespace-normal font-sans text-xs font-normal not-italic leading-relaxed">
          {token.tip}
        </span>
      }
    >
      <span
        className={`${tokenClass[token.kind]} cursor-help underline decoration-accent/40 decoration-dotted decoration-1 underline-offset-4 transition-colors duration-300 ease-smooth hover:text-accent`}
      >
        {token.text}
      </span>
    </Tooltip>
  );
}

function IdentityCard() {
  return (
    <div className="relative">
      {/* violet halo — marks the card as the section's single focal point */}
      <div
        aria-hidden
        className="absolute -inset-5 -z-10 rounded-4xl bg-accent/15 blur-2xl dark:bg-accent/10"
      />
      {/* hairline gradient ring — accent at the top, fading into the border */}
      <div className="rounded-2xl bg-linear-to-b from-accent/50 via-border to-border p-px shadow-xl shadow-brand/5 dark:shadow-black/40">
        <div className="overflow-hidden rounded-[calc(1rem-1px)] bg-surface">
          {/* editor chrome — monochrome dots, filename, honest "read-only" */}
          <div className="flex items-center gap-1.5 border-b border-border bg-surface-2/40 px-4 py-3 sm:px-5">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                aria-hidden
                className="h-2.5 w-2.5 rounded-full bg-border"
              />
            ))}
            <span className="ml-2.5 font-mono text-xs font-medium text-muted">
              saif.ts
            </span>
            <span className="ml-auto font-mono text-xs text-muted/60">
              read-only
            </span>
          </div>

          {/* code body — static, real data only. Rows get an editor-style
              hover highlight (pure CSS, inert on touch). */}
          <div className="px-3 py-4 font-mono text-xs leading-5 sm:px-4 sm:py-5 sm:text-sm sm:leading-6">
            {codeLines.map((tokens, line) => (
              <div
                key={line}
                className="flex rounded px-1 transition-colors duration-200 hover:bg-surface-2/60 sm:px-2"
              >
                <span
                  aria-hidden
                  className="w-8 shrink-0 select-none pr-3 text-right text-muted/40"
                >
                  {line + 1}
                </span>
                <span className="whitespace-pre">
                  {tokens.map((token, i) => (
                    <CodeToken key={i} token={token} />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="About" className="relative overflow-hidden pt-10 pb-16 md:pt-12 md:pb-24">
      {/* ambient violet depth — matches the sibling sections */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-brand-soft/5 blur-3xl dark:bg-accent-bright/5" />
      </div>

      <Container>
        {/* section-boundary hairline — same faded rule the Footer uses */}
        <div
          aria-hidden
          className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent"
        />

        {/* ── ROW 1: editorial lead left · saif.ts identity card right ───── */}
        <Reveal className="mt-10 md:mt-14">
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Who I am"
                title="About"
                accent="Me"
                align="left"
              />
              {/* LEAD — first paragraph, verbatim, set in the display face so
                  it ties to the Space Grotesk heading above it */}
              <p className="mt-6 max-w-xl text-pretty border-l-2 border-accent/60 pl-5 font-display text-xl font-medium leading-snug tracking-[-0.01em] text-fg/90 sm:text-2xl">
                {lead}
              </p>
            </div>

            <IdentityCard />
          </div>
        </Reveal>

        {/* ── ROW 2: the story — three numbered chapters, flat + editorial ── */}
        <Reveal className="mt-14 md:mt-20">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8 xl:gap-12">
            {story.map((paragraph, i) => (
              <article
                key={i}
                className="max-w-2xl border-t border-border pt-6 lg:max-w-none"
              >
                <h3 className="flex items-baseline gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em]">
                  <span aria-hidden className="text-accent">
                    {`0${i + 1}`}
                  </span>
                  <span className="text-muted">
                    {chapterLabels[i] ?? "More"}
                  </span>
                </h3>
                <p className="mt-3.5 text-pretty leading-relaxed text-muted">
                  {paragraph}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
