import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Lightweight CSS-only tooltip. Reveals `label` on hover/focus of its child —
 * no JS, no positioning library.
 */
export function Tooltip({
  label,
  children,
  className,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("group relative inline-flex", className)} tabIndex={0}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-max max-w-[200px] -translate-x-1/2 translate-y-1 rounded-lg border border-border bg-surface px-3 py-2 text-center text-fg opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        {label}
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-border bg-surface" />
      </span>
    </span>
  );
}
