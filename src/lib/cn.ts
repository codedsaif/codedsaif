export type ClassValue = string | number | false | null | undefined;

/** Minimal classnames joiner — no dependency, keeps the bundle lean. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
