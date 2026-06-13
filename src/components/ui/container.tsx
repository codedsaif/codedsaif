import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Centered, max-w-7xl content well used by every section. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
