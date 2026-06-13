// Google reCAPTCHA v3 (loaded lazily, on demand, by the contact form).
interface Grecaptcha {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

interface Window {
  grecaptcha?: Grecaptcha;
}
