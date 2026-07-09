import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Leading part of the title, rendered in the base foreground colour. */
  title: ReactNode;
  /** Highlighted trailing word(s), rendered in the accent colour. */
  accent?: ReactNode;
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  align?: "center" | "left";
  /** Use on dark (navy) backgrounds to force light text. */
  onDark?: boolean;
  className?: string;
};

export function SectionHeading({
  title,
  accent,
  eyebrow,
  align = "center",
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em]",
            onDark ? "text-brand-soft/70" : "text-muted"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              onDark ? "bg-accent-bright" : "bg-accent"
            )}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-[1.1] tracking-[-0.015em] sm:text-4xl md:text-5xl",
          onDark ? "text-brand-soft" : "text-fg"
        )}
      >
        {title}
        {accent != null && (
          <>
            {" "}
            <span className={onDark ? "text-accent-bright" : "text-accent"}>
              {accent}
            </span>
          </>
        )}
      </h2>
    </div>
  );
}
