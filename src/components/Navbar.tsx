import { IoMenu, IoClose } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { Container, ThemeToggle } from "@/components/ui";
import { navLinks, accounts, AVATAR_URL } from "@/lib/data";
import { cn } from "@/lib/cn";

const SUMMARY_RESET =
  "list-none cursor-pointer [&::-webkit-details-marker]:hidden";
const ITEM =
  "block rounded-lg px-3 py-2 text-sm text-fg/80 transition-colors hover:bg-surface-2 hover:text-fg";

/**
 * Server component. All menus are CSS-only (<details> + group-hover), so the
 * only client JavaScript the navbar ships is the small <ThemeToggle/> island.
 */
export default function Navbar() {
  return (
    <div className="fixed inset-x-0 top-2 z-1000 px-2 sm:px-4">
      <Container className="rounded-2xl border border-border bg-surface/80 px-4 shadow-lg shadow-black/5 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Left: mobile menu + logo + desktop nav */}
          <div className="flex items-center gap-2 md:gap-8">
            {/* Mobile menu (CSS-only disclosure) */}
            <details className="group relative md:hidden">
              <summary
                aria-label="Open menu"
                className={cn(
                  SUMMARY_RESET,
                  "inline-flex h-10 w-10 items-center justify-center rounded-lg text-fg hover:bg-surface-2"
                )}
              >
                <IoMenu size={22} className="group-open:hidden" />
                <IoClose size={22} className="hidden group-open:block" />
              </summary>
              <nav className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-2xl">
                {navLinks.map((link) =>
                  "children" in link ? (
                    <div key={link.label}>
                      <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">
                        {link.label}
                      </p>
                      {link.children.map((child) => (
                        <a key={child.label} href={child.href} className={ITEM}>
                          {child.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a key={link.label} href={link.href} className={ITEM}>
                      {link.label}
                    </a>
                  )
                )}
              </nav>
            </details>

            <a
              href="#Profile"
              className="logo-neon text-2xl font-bold sm:text-3xl"
            >
              Saif Ali
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) =>
                "children" in link ? (
                  <div key={link.label} className="group/sk relative">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-fg/80 transition-colors hover:bg-surface-2 hover:text-fg"
                    >
                      {link.label}
                      <TiArrowSortedDown />
                    </button>
                    <div className="invisible absolute left-0 top-full z-50 min-w-48 translate-y-1 pt-2 opacity-0 transition-all group-hover/sk:visible group-hover/sk:translate-y-0 group-hover/sk:opacity-100 group-focus-within/sk:visible group-focus-within/sk:translate-y-0 group-focus-within/sk:opacity-100">
                      <div className="overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-xl">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className={ITEM}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-fg/80 transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Right: theme toggle + avatar menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <details className="relative">
              <summary
                aria-label="Open profile menu"
                className={cn(
                  SUMMARY_RESET,
                  "block rounded-full ring-2 ring-transparent transition hover:ring-accent/60"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={AVATAR_URL}
                  alt="Saif Ali"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              </summary>
              <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-2xl">
                <div className="flex flex-col items-center gap-2 px-2 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={AVATAR_URL}
                    alt="Saif Ali"
                    width={72}
                    height={72}
                    className="h-18 w-18 rounded-full object-cover"
                  />
                  <p className="font-semibold">Saif Ali</p>
                </div>
                <div className="my-1 h-px bg-border" />
                {accounts.map((account) => (
                  <a
                    key={account.label}
                    href={account.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-fg/80 transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    {account.label}
                    <FaExternalLinkAlt className="text-xs text-muted" />
                  </a>
                ))}
              </div>
            </details>
          </div>
        </div>
      </Container>
    </div>
  );
}
