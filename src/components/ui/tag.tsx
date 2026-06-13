import type { ReactNode } from "react";
import { FaHashtag } from "react-icons/fa";
import { cn } from "@/lib/cn";

/** Small hashtag pill used for tech-stack chips. */
export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300",
        className
      )}
    >
      <FaHashtag className="text-[0.65em]" />
      {children}
    </span>
  );
}
