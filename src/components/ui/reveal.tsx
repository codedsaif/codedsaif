import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-reveal wrapper. This is a SERVER component — the fade/slide-in is 100%
 * CSS (`animation-timeline: view()` in globals.css), so it ships no JS and each
 * item naturally staggers as it scrolls into view.
 */
export function Reveal({ className, ...rest }: ComponentProps<"div">) {
  return <div className={cn("reveal", className)} {...rest} />;
}
