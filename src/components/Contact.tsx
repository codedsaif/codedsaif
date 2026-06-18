"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsPerson, BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { TbMessage } from "react-icons/tb";
import { FiCheckCircle, FiAlertCircle, FiSend } from "react-icons/fi";
import { Container, SectionHeading } from "@/components/ui";
import { contact } from "@/lib/data";
import { submitContact, type ContactResult } from "@/app/actions/contact";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// Refined input on the glassy form card: icon-left padding, clear violet focus ring.
const inputClasses =
  "peer w-full rounded-xl border border-border/70 bg-surface-2/60 py-3 pl-11 pr-3.5 text-fg outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-smooth placeholder:text-muted/80 hover:border-border focus-visible:border-accent focus-visible:bg-surface focus-visible:ring-4 focus-visible:ring-accent/20";
const fieldIconClasses =
  "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors duration-300 ease-smooth peer-focus-visible:text-accent";
const labelClasses =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted";

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
    <section id="Contact" className="py-12 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand px-4 py-6 ring-1 ring-white/5 dark:bg-brand-deep sm:px-10 sm:py-14 md:px-16 md:py-20">
          {/* ambient accent glows */}
          <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-soft/10 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright/5 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-start lg:gap-16">
            {/* LEFT: heading, intro, details, socials */}
            <div className="flex flex-col gap-8">
              <div>
                <SectionHeading
                  eyebrow="Contact"
                  title="Get in"
                  accent="Touch"
                  align="left"
                  onDark
                />
                <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-soft/70">
                  {contact.intro}
                </p>
              </div>

              {/* contact-detail rows as refined mini cards */}
              <div className="flex flex-col gap-3">
                {details.map(({ icon: Icon, label, href }) => {
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent-bright ring-1 ring-white/10 transition-all duration-300 ease-smooth group-hover:bg-accent-bright/15 group-hover:ring-accent-bright/40">
                        <Icon size={20} />
                      </span>
                      <span className="truncate text-brand-soft/90 transition-colors duration-300 ease-smooth group-hover:text-brand-soft">
                        {label}
                      </span>
                    </>
                  );
                  const shell =
                    "group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/3 px-4 py-3 transition-all duration-300 ease-smooth";
                  return href ? (
                    <a
                      key={label}
                      href={href}
                      className={`${shell} hover:-translate-y-0.5 hover:border-accent-bright/30 hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand dark:focus-visible:ring-offset-brand-deep`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={label} className={shell}>
                      {inner}
                    </div>
                  );
                })}
              </div>

              {/* socials as elegant chips */}
              <div className="flex flex-wrap gap-2.5">
                {socialChips.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm font-medium text-brand-soft/80 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent-bright/40 hover:bg-accent-bright/10 hover:text-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand dark:focus-visible:ring-offset-brand-deep"
                  >
                    <Icon
                      size={17}
                      className="text-accent-bright transition-transform duration-300 ease-spring group-hover:scale-110"
                    />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT: glassy raised form card */}
            <div className="rounded-3xl border border-white/10 bg-surface/95 p-5 shadow-2xl shadow-black/40 ring-1 ring-black/5 backdrop-blur-xl sm:p-8">
              <form
                onSubmit={onSubmit}
                onFocus={preloadRecaptcha}
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

                {/* Name + Email side-by-side to keep the form short & inviting */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Your Name
                    </label>
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
                      <BsPerson className={fieldIconClasses} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email
                    </label>
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
                      <MdOutlineEmail className={fieldIconClasses} />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClasses}>
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      minLength={3}
                      placeholder={contact.placeholders.subject}
                      value={form.subject}
                      onChange={onChange}
                      className={inputClasses}
                    />
                    <TbMessage className={fieldIconClasses} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClasses}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    placeholder={contact.placeholders.message}
                    value={form.message}
                    onChange={onChange}
                    className="w-full resize-y rounded-xl border border-border/70 bg-surface-2/60 px-3.5 py-3 text-fg outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-smooth placeholder:text-muted/80 hover:border-border focus-visible:border-accent focus-visible:bg-surface focus-visible:ring-4 focus-visible:ring-accent/20"
                  />
                </div>

                {/* Full-width violet gradient CTA with sheen */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-brand via-accent to-accent-bright font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 ease-smooth hover:shadow-xl hover:shadow-accent/40 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-smooth group-hover:translate-x-full" />
                  <FiSend
                    size={18}
                    className={
                      "shrink-0 transition-transform duration-300 ease-spring " +
                      (loading
                        ? ""
                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5")
                    }
                  />
                  {loading ? "Sending..." : "Send Message"}
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
      </Container>
    </section>
  );
}
