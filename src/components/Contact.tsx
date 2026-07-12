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
// Field chrome is split base + state, so an invalid field can turn red without
// duplicating the whole class string. Border/ring/label/icon all shift together.
const inputBase =
  "peer w-full rounded-xl border bg-transparent py-2.5 pl-10 pr-3 text-fg outline-none transition-[border-color,box-shadow] duration-300 ease-smooth placeholder:text-muted/50 focus-visible:ring-4";
const textareaBase =
  "peer w-full resize-y rounded-xl border bg-transparent px-3 py-2.5 text-fg outline-none transition-[border-color,box-shadow] duration-300 ease-smooth placeholder:text-muted/50 focus-visible:ring-4";
const stateOk =
  "border-border/70 hover:border-border focus-visible:border-accent focus-visible:ring-accent/15";
const stateBad =
  "border-red-500 hover:border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20";

// Notched label: sits on the top border (half above / half below), the bg-surface
// chip erases the border segment behind it so the outline reads as a clean notch.
const labelBase =
  "pointer-events-none absolute -top-2 left-3 z-1 bg-surface px-1.5 text-xs font-medium transition-colors duration-300 ease-smooth";
const iconBase =
  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ease-smooth";

const inputCls = (bad: boolean) => `${inputBase} ${bad ? stateBad : stateOk}`;
const textareaCls = (bad: boolean) =>
  `${textareaBase} ${bad ? stateBad : stateOk}`;
const labelCls = (bad: boolean) =>
  `${labelBase} ${bad ? "text-red-500" : "text-muted peer-focus-visible:text-accent"}`;
const iconCls = (bad: boolean) =>
  `${iconBase} ${bad ? "text-red-500" : "text-muted peer-focus-visible:text-accent"}`;

// Trust microcopy shown right beside the CTA — the #1 hesitation-killer.
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

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

// Mirrors the backend's own rules (validators/contact.validator.js: name 1-100,
// valid email, message 10-5000; subject optional) so a visitor is never bounced
// by the server for something we can catch instantly. Subject is intentionally
// unvalidated — it's optional and defaulted in the server action.
function validate(values: typeof EMPTY): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";

  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "That doesn't look like a valid email address.";

  const message = values.message.trim();
  if (!message) errors.message = "Please write a message.";
  else if (message.length < 10)
    errors.message = "Your message needs at least 10 characters.";

  return errors;
}

// Inline error under a field — linked to the input via aria-describedby.
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500"
    >
      <FiAlertCircle size={12} aria-hidden className="shrink-0" />
      {message}
    </p>
  );
}

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
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ContactResult | null>(null);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Typing in a flagged field clears its error immediately: red → normal.
    setErrors((prev) => {
      if (!(name in prev)) return prev; // nothing to clear — skip the re-render
      const next = { ...prev };
      delete next[name as keyof FieldErrors];
      return next;
    });
  };

  const preloadRecaptcha = () => {
    if (RECAPTCHA_SITE_KEY) void loadRecaptcha(RECAPTCHA_SITE_KEY).catch(() => {});
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate first — flag every bad field at once, then focus the first one so
    // keyboard/screen-reader users land on the problem instead of hunting for it.
    const found = validate(form);
    setErrors(found);
    const firstBad = (Object.keys(found) as (keyof FieldErrors)[])[0];
    if (firstBad) {
      setResult(null);
      document.getElementById(firstBad)?.focus();
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      // reCAPTCHA is isolated: if the script is blocked, or this domain isn't in
      // the site key's allowed list, execute() throws. That used to die in the
      // generic catch below with no clue — now it reports itself.
      let recaptchaToken = "";
      try {
        recaptchaToken = await getRecaptchaToken();
      } catch (err) {
        console.error("[contact] reCAPTCHA could not issue a token —", err);
        setResult({
          ok: false,
          message:
            "Couldn't verify you're human — reCAPTCHA failed to load. Please refresh and try again.",
        });
        return;
      }

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
    } catch (err) {
      console.error("[contact] submit failed —", err);
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

            {/* Three grid children so MOBILE order is heading → form → details
                (a phone user reaches the first input without scrolling past
                the whole rail); on lg the form spans both rows on the right. */}
            <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-12">
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

              </div>

              {/* RIGHT — the form is the hero, on the original glassy surface card. */}
              <div className="rounded-3xl border border-white/10 bg-surface p-5 shadow-2xl shadow-black/40 ring-1 ring-black/5 sm:p-6 md:p-7 lg:col-start-2 lg:row-start-1 lg:row-span-2">
                <form
                  onSubmit={onSubmit}
                  onFocus={preloadRecaptcha}
                  aria-busy={loading}
                  // noValidate: we own the invalid UX (red fields + inline
                  // messages). `required`/`minLength` stay for a11y semantics.
                  noValidate
                  className="space-y-4"
                >
                  {/* Honeypot — positioned OFF-SCREEN (not display:none, which
                      bots detect and skip) so bots fill it and get flagged, per
                      the backend's honeypot spec. */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={onChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 opacity-0"
                  />

                  {/* Input first (the `peer`), then the notched label + icon so
                      both react to peer-focus. */}
                  {/* The error sits OUTSIDE the `relative` box on purpose: the
                      icon is centred with top-1/2, so if the error grew the
                      positioned box the icon would drift down off the input. */}
                  <div>
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        placeholder={contact.placeholders.name}
                        value={form.name}
                        onChange={onChange}
                        className={inputCls(!!errors.name)}
                      />
                      <label htmlFor="name" className={labelCls(!!errors.name)}>
                        Your Name
                      </label>
                      <BsPerson className={iconCls(!!errors.name)} />
                    </div>
                    <FieldError id="name-error" message={errors.name} />
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        placeholder={contact.placeholders.email}
                        value={form.email}
                        onChange={onChange}
                        className={inputCls(!!errors.email)}
                      />
                      <label
                        htmlFor="email"
                        className={labelCls(!!errors.email)}
                      >
                        Email
                      </label>
                      <MdOutlineEmail className={iconCls(!!errors.email)} />
                    </div>
                    <FieldError id="email-error" message={errors.email} />
                  </div>

                  <div className="relative">
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder={contact.placeholders.subject}
                      value={form.subject}
                      onChange={onChange}
                      className={inputCls(false)}
                    />
                    <label htmlFor="subject" className={labelCls(false)}>
                      Subject{" "}
                      <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <TbMessage className={iconCls(false)} />
                  </div>

                  <div>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        minLength={10}
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                        placeholder={contact.placeholders.message}
                        value={form.message}
                        onChange={onChange}
                        className={textareaCls(!!errors.message)}
                      />
                      <label
                        htmlFor="message"
                        className={labelCls(!!errors.message)}
                      >
                        Message
                      </label>
                    </div>
                    <FieldError id="message-error" message={errors.message} />
                  </div>

                  {/* Primary CTA — solid, theme-aware text for AA contrast (white on
                      the darker light-mode violet, dark navy on the brighter dark-mode
                      violet). Sheen sweep kept for flair. */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/45 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:brightness-100 dark:text-brand-deep"
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

                  {/* Live region is ALWAYS mounted (sr-only when idle) so screen
                      readers reliably announce the outcome; failures escalate to
                      role="alert" for immediate announcement. */}
                  <p
                    role={result && !result.ok ? "alert" : "status"}
                    className={
                      result
                        ? "flex items-center gap-2 rounded-xl border px-3.5 py-3 text-sm " +
                          (result.ok
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400")
                        : "sr-only"
                    }
                  >
                    {result &&
                      (result.ok ? (
                        <FiCheckCircle className="shrink-0" />
                      ) : (
                        <FiAlertCircle className="shrink-0" />
                      ))}
                    {result?.message}
                  </p>

                  {/* Trust + protection on ONE quiet meta line beside the CTA */}
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <FiLock size={12} aria-hidden className="shrink-0 text-accent" />
                      {PRIVACY_NOTE}
                    </span>
                    {RECAPTCHA_SITE_KEY && <span>Protected by reCAPTCHA.</span>}
                  </div>
                </form>
              </div>

              {/* DETAILS + SOCIALS — direct-reach alternatives; sit under the
                  heading on lg, after the form on mobile. */}
              <div className="lg:col-start-1 lg:row-start-2">
                {/* Details — no boxes, just accent glyph + label with open rhythm */}
                <ul className="space-y-5">
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
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
