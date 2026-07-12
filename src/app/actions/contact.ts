"use server";

import { headers } from "next/headers";

// Server Action: proxies the contact form to the micro.service backend
// (POST /api/v1/contacts). The backend base URL stays server-side only.

export type ContactResult = { ok: boolean; message: string };

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  website?: string; // honeypot — must stay empty
  recaptchaToken: string;
  metadata?: Record<string, unknown>;
};

// Set CONTACT_API_URL in prod (e.g. https://api.developersdrills.com).
// Fallback = the port micro.service actually listens on locally (8080).
const API_BASE = process.env.CONTACT_API_URL ?? "http://localhost:8080";

export async function submitContact(
  payload: ContactPayload
): Promise<ContactResult> {
  try {
    // Forward the real visitor IP so the backend rate-limits / logs per user,
    // not per (single) Next.js server IP.
    const h = await headers();
    const clientIp =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      h.get("x-real-ip") ||
      "";

    // The backend REQUIRES subject (3–255 chars); the form makes it optional,
    // so default an empty subject rather than let the server 400 the visitor.
    const body = {
      ...payload,
      subject: payload.subject?.trim() || "New enquiry via portfolio",
    };

    const res = await fetch(`${API_BASE}/api/v1/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(clientIp
          ? { "X-Forwarded-For": clientIp, "X-Real-IP": clientIp }
          : {}),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = (await res.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!res.ok) {
      // Targeted logging: the backend rejected us — surface WHY in the terminal.
      console.error(
        `[contact] ${res.status} from ${API_BASE}/api/v1/contacts —`,
        data
      );
      return {
        ok: false,
        message:
          data?.message ?? "Something went wrong. Please try again later.",
      };
    }

    return {
      ok: true,
      message: data?.message ?? "Your message has been sent successfully.",
    };
  } catch (err) {
    // Targeted logging: we never reached the backend (bad URL / not running /
    // DNS). Logs the resolved base URL so a misconfigured CONTACT_API_URL is
    // obvious instead of silent.
    console.error(
      `[contact] request to ${API_BASE}/api/v1/contacts failed —`,
      err
    );
    return {
      ok: false,
      message: "Unable to reach the server. Please try again later.",
    };
  }
}
