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

    const res = await fetch(`${API_BASE}/api/v1/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(clientIp
          ? { "X-Forwarded-For": clientIp, "X-Real-IP": clientIp }
          : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = (await res.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!res.ok) {
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
  } catch {
    return {
      ok: false,
      message: "Unable to reach the server. Please try again later.",
    };
  }
}
