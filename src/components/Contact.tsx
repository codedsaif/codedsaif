"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsPerson, BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { TbMessage } from "react-icons/tb";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Container, SectionHeading } from "@/components/ui";
import { contact } from "@/lib/data";
import { submitContact, type ContactResult } from "@/app/actions/contact";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const socialIconClasses =
  "inline-flex h-12 w-12 items-center justify-center rounded-full text-brand-soft transition-colors hover:bg-brand-soft hover:text-brand";
const inputClasses =
  "w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-3 text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

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
        <div className="flex flex-col gap-10 overflow-hidden rounded-3xl bg-brand px-6 py-16 dark:bg-brand-deep sm:px-10 md:flex-row md:items-center md:justify-between md:gap-12 md:px-16 md:py-24">
          {/* Left: heading + contact details */}
          <div className="flex flex-col gap-8">
            <div>
              <SectionHeading title="Get in" accent="Touch" align="left" onDark />
              <p className="mt-4 text-muted">{contact.intro}</p>

              <div className="mt-8 flex gap-3">
                <a
                  href={contact.socials.github}
                  aria-label="github"
                  className={socialIconClasses}
                >
                  <BsGithub size={28} />
                </a>
                <a
                  href={contact.socials.leetcode}
                  aria-label="Leetcode"
                  className={socialIconClasses}
                >
                  <SiLeetcode size={28} />
                </a>
                <a
                  href={contact.socials.linkedin}
                  aria-label="Linkedin"
                  className={socialIconClasses}
                >
                  <BsLinkedin size={28} />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <a
                href={contact.phone.href}
                className="inline-flex h-12 items-center gap-3 rounded-lg border border-transparent px-3 text-brand-soft transition-colors hover:border-brand-soft"
              >
                <MdPhone size={20} />
                {contact.phone.label}
              </a>
              <a
                href={contact.email.href}
                className="inline-flex h-12 items-center gap-3 rounded-lg border border-transparent px-3 text-brand-soft transition-colors hover:border-brand-soft"
              >
                <MdEmail size={20} />
                {contact.email.label}
              </a>
              <span className="inline-flex h-12 items-center gap-3 rounded-lg border border-transparent px-3 text-brand-soft">
                <MdLocationOn size={20} />
                {contact.location}
              </span>
            </div>
          </div>

          {/* Right: form */}
          <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl sm:p-8">
            <form onSubmit={onSubmit} onFocus={preloadRecaptcha} className="space-y-5">
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

              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Your Name
                </label>
                <div className="relative">
                  <BsPerson className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
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
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <MdOutlineEmail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
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
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
                  Subject
                </label>
                <div className="relative">
                  <TbMessage className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
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
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  minLength={10}
                  placeholder={contact.placeholders.message}
                  value={form.message}
                  onChange={onChange}
                  className="w-full resize-y rounded-lg border border-border bg-surface px-3 py-2.5 text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-brand px-6 font-medium text-brand-soft transition-colors hover:bg-brand-deep disabled:opacity-60 dark:bg-brand-deep dark:hover:brightness-110"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {result && (
                <p
                  className={
                    "flex items-center gap-2 text-sm " +
                    (result.ok ? "text-emerald-600" : "text-red-600")
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
                <p className="text-xs text-muted">
                  Protected by reCAPTCHA.
                </p>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
