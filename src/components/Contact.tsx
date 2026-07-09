"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsPerson, BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { TbMessage } from "react-icons/tb";
import { FiCheckCircle, FiAlertCircle, FiSend, FiLock } from "react-icons/fi";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { contact } from "@/lib/data";
import { submitContact, type ContactResult } from "@/app/actions/contact";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// Outlined inputs with a notched label that straddles the top border. The label
// is a `bg-surface` chip so it cleanly cuts the border (matches the solid card).
const inputClasses =
  "peer w-full rounded-xl border border-border/70 bg-transparent py-3.5 pl-11 pr-3.5 text-fg outline-none transition-[border-color,box-shadow] duration-300 ease-smooth placeholder:text-muted/50 hover:border-border focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/15";
const textareaClasses =
  "peer w-full resize-y rounded-xl border border-border/70 bg-transparent px-3.5 py-3.5 text-fg outline-none transition-[border-color,box-shadow] duration-300 ease-smooth placeholder:text-muted/50 hover:border-border focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/15";
const fieldIconClasses =
  "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors duration-300 ease-smooth peer-focus-visible:text-accent";
// Notched label: sits on the top border (half above / half below), the bg-surface
// chip erases the border segment behind it so the outline reads as a clean notch.
const labelClasses =
  "pointer-events-none absolute -top-2 left-3 z-1 bg-surface px-1.5 text-xs font-medium text-muted transition-colors duration-300 ease-smooth peer-focus-visible:text-accent";

// Trust microcopy shown right before the CTA — the #1 hesitation-killer.
// Edit this one line to tune the privacy reassurance.
const PRIVACY_NOTE = "Your details stay private — never shared.";

// Lazily inject the reCAPTCHA v3 script — keeps it off the critical path so the
// page stays fast; it only loads when the visitor touches the form.
function loadRecaptcha(siteKey: string): Promise<void> {
  if (typeof window === "undefined" || window.grecaptcha) {
    return Promise.resolve();
  }
  if (document.getElementById("recaptcha-v3")) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = "recaptcha-v3";
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.head.appendChild(script);
  });
}

async function getRecaptchaToken(): Promise<string> {
  if (!RECAPTCHA_SITE_KEY) return "";
  await loadRecaptcha(RECAPTCHA_SITE_KEY);
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) return "";
  await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));
  return grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "contact" });
}

const EMPTY = { name: "", email: "", subject: "", message: "", website: "" };

// Contact-detail rows + social chips — derived from data, kept declarative.
const details = [
  { icon: MdEmail, label: contact.email.label, href: contact.email.href },
  { icon: MdPhone, label: contact.phone.label, href: contact.phone.href },
  { icon: MdLocationOn, label: contact.location, href: null },
] as const;

const socialChips = [
  { icon: BsGithub, label: "GitHub", href: contact.socials.github },
  { icon: SiLeetcode, label: "LeetCode", href: contact.socials.leetcode },
  { icon: BsLinkedin, label: "LinkedIn", href: contact.socials.linkedin },
] as const;

export default function Contact() {
  const mountedAt = useRef(Date.now());
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ContactResult | null>(null);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const preloadRecaptcha = () => {
    if (RECAPTCHA_SITE_KEY) void loadRecaptcha(RECAPTCHA_SITE_KEY).catch(() => {});
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const recaptchaToken = await getRecaptchaToken();
      const res = await submitContact({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        website: form.website,
        recaptchaToken,
        metadata: {
          timeOnPage: Date.now() - mountedAt.current,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      });
      setResult(res);
      if (res.ok) setForm(EMPTY);
    } catch {
      setResult({
        ok: false,
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Contact" className="py-16 md:py-24">
      <Container>
        <Reveal>
          {/* Rich navy panel (the original treatment) wrapping a two-column split:
              quiet details rail on the left, the glassy form card on the right. */}
          <div className="relative overflow-hidden rounded-3xl bg-brand px-4 py-8 ring-1 ring-white/5 dark:bg-brand-deep sm:px-8 sm:py-14 md:px-12 md:py-16">
            {/* ambient accent glows */}
            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-soft/10 blur-3xl" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright/5 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
              {/* LEFT RAIL — quiet on the navy panel: heading, one-line lead,
                  hairless details, icon-only socials. */}
              <div>
                <SectionHeading
                  eyebrow="Contact"
                  title="Get in"
                  accent="Touch"
                  align="left"
                  onDark
                />
                <p className="mt-5 max-w-md text-base leading-relaxed text-brand-soft/70 sm:text-lg">
                  {contact.intro}
                </p>

                {/* Details — no boxes, just accent glyph + label with open rhythm */}
                <ul className="mt-10 space-y-5">
                  {details.map(({ icon: Icon, label, href }) => {
                    const inner = (
                      <>
                        <Icon size={18} className="shrink-0 text-accent-bright" />
                        <span className="min-w-0 truncate">{label}</span>
                      </>
                    );
                    return (
                      <li key={label} className="min-w-0">
                        {href ? (
                          <a
                            href={href}
                            className="flex min-w-0 items-center gap-3 rounded-md text-base text-brand-soft/85 transition-colors duration-300 ease-smooth hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand dark:focus-visible:ring-offset-brand-deep"
                          >
                            {inner}
                          </a>
                        ) : (
                          <span className="flex min-w-0 items-center gap-3 text-base text-brand-soft/85">
                            {inner}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Socials — minimal icon-only row, matching the hero's round buttons */}
                <ul className="mt-10 flex items-center gap-2.5">
                  {socialChips.map(({ icon: Icon, label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-accent-bright transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent-bright/40 hover:bg-accent-bright/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand dark:focus-visible:ring-offset-brand-deep"
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Trust line — quiet privacy reassurance closing the rail */}
                <p className="mt-8 flex items-center gap-2 text-sm text-brand-soft/60">
                  <FiLock size={14} aria-hidden className="shrink-0 text-accent-bright" />
                  {PRIVACY_NOTE}
                </p>
              </div>

              {/* RIGHT — the form is the hero, on the original glassy surface card. */}
              <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-2xl shadow-black/40 ring-1 ring-black/5 sm:p-8 md:p-10">
                <form
                  onSubmit={onSubmit}
                  onFocus={preloadRecaptcha}
                  aria-busy={loading}
                  className="space-y-5"
                >
                  {/* Honeypot — hidden from humans, tempting to bots */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={onChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  {/* Input first (the `peer`), then the notched label + icon so
                      both react to peer-focus. */}
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={contact.placeholders.name}
                      value={form.name}
                      onChange={onChange}
                      className={inputClasses}
                    />
                    <label htmlFor="name" className={labelClasses}>
                      Your Name
                    </label>
                    <BsPerson className={fieldIconClasses} />
                  </div>

                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={contact.placeholders.email}
                      value={form.email}
                      onChange={onChange}
                      className={inputClasses}
                    />
                    <label htmlFor="email" className={labelClasses}>
                      Email
                    </label>
                    <MdOutlineEmail className={fieldIconClasses} />
                  </div>

                  <div className="relative">
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder={contact.placeholders.subject}
                      value={form.subject}
                      onChange={onChange}
                      className={inputClasses}
                    />
                    <label htmlFor="subject" className={labelClasses}>
                      Subject{" "}
                      <span className="font-normal text-muted/60">(optional)</span>
                    </label>
                    <TbMessage className={fieldIconClasses} />
                  </div>

                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      minLength={10}
                      placeholder={contact.placeholders.message}
                      value={form.message}
                      onChange={onChange}
                      className={textareaClasses}
                    />
                    <label htmlFor="message" className={labelClasses}>
                      Message
                    </label>
                  </div>

                  {/* Primary CTA — solid, theme-aware text for AA contrast (white on
                      the darker light-mode violet, dark navy on the brighter dark-mode
                      violet). Sheen sweep kept for flair. */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/45 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:brightness-100 dark:text-brand-deep"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-smooth group-hover:translate-x-full" />
                    {loading ? (
                      <span
                        aria-hidden
                        className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
                      />
                    ) : (
                      <FiSend
                        size={18}
                        className="shrink-0 transition-transform duration-300 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                    {loading ? "Sending…" : "Send Message"}
                  </button>

                  {result && (
                    <p
                      className={
                        "flex items-center gap-2 rounded-xl border px-3.5 py-3 text-sm " +
                        (result.ok
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400")
                      }
                      role="status"
                    >
                      {result.ok ? (
                        <FiCheckCircle className="shrink-0" />
                      ) : (
                        <FiAlertCircle className="shrink-0" />
                      )}
                      {result.message}
                    </p>
                  )}

                  {RECAPTCHA_SITE_KEY && (
                    <p className="text-center text-xs text-muted">
                      Protected by reCAPTCHA.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
