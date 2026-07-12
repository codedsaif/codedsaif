"use client";

// DevTools guard (deterrent, not a security control). Blocks the DevTools /
// view-source shortcuts + right-click and pauses the app while DevTools is open,
// auto-resuming when it's closed. Call initDevToolsGuard() once before rendering.
// Debug bypass: open the site with ?dev=debug (?dev=off to re-arm).

const SIZE_THRESHOLD = 160;
const BYPASS_PARAM = "dev";
const BYPASS_VALUE = "debug";
const BYPASS_FLAG = "__devtools_bypass__";

function debugBypassed(): boolean {
  try {
    const value = new URLSearchParams(window.location.search).get(BYPASS_PARAM);
    if (value === BYPASS_VALUE) sessionStorage.setItem(BYPASS_FLAG, "1");
    else if (value === "off") sessionStorage.removeItem(BYPASS_FLAG);
    return sessionStorage.getItem(BYPASS_FLAG) === "1";
  } catch {
    return false;
  }
}

function isDevToolsShortcut(e: KeyboardEvent): boolean {
  const key = (e.key || "").toLowerCase();
  const mod = e.ctrlKey || e.metaKey; // Ctrl (Win/Linux) or Cmd (macOS)
  if (key === "f12") return true;
  if (mod && (e.shiftKey || e.altKey) && (key === "i" || key === "j" || key === "c")) return true;
  if (mod && (key === "u" || key === "s")) return true;
  return false;
}

function devToolsOpen(): boolean {
  return (
    window.outerWidth - window.innerWidth > SIZE_THRESHOLD ||
    window.outerHeight - window.innerHeight > SIZE_THRESHOLD
  );
}

function paintPausedScreen(): void {
  const html = `
<style>
  .dtg{--bg:#f7f8fa;--glow:rgba(79,70,229,.07);--card:#fff;--bd:#e8eaee;--ring:rgba(79,70,229,.14);
    --tx:#101828;--mut:#667085;--icbg:#f4f3ff;--ic:#5b5bd6;--pill:#f9fafb;--pbd:#edeef1}
  @media (prefers-color-scheme:dark){.dtg{--bg:#0a0d14;--glow:rgba(129,140,248,.12);--card:#12161f;--bd:#1f2632;
    --ring:rgba(129,140,248,.16);--tx:#f4f7fa;--mut:#98a2b3;--icbg:rgba(99,102,241,.14);--ic:#a5b4fc;--pill:#151b24;--pbd:#232a36}}
  @keyframes dtg-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @keyframes dtg-ring{0%{box-shadow:0 0 0 0 var(--ring)}70%{box-shadow:0 0 0 16px transparent}100%{box-shadow:0 0 0 0 transparent}}
  @keyframes dtg-pulse{0%,100%{opacity:1}50%{opacity:.3}}
  .dtg{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:24px;
    background:radial-gradient(620px 320px at 50% 20%,var(--glow),transparent 72%),var(--bg);color:var(--tx);
    font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
  .dtg-card{max-width:420px;width:100%;text-align:center;padding:46px 40px;border-radius:22px;background:var(--card);
    border:1px solid var(--bd);box-shadow:0 1px 2px rgba(16,24,40,.04),0 12px 40px rgba(16,24,40,.08);
    animation:dtg-in .5s cubic-bezier(.2,.7,.2,1)}
  .dtg-ic{width:60px;height:60px;margin:0 auto 22px;border-radius:16px;display:flex;align-items:center;justify-content:center;
    background:var(--icbg);color:var(--ic);animation:dtg-ring 2.8s ease-out infinite}
  .dtg-card h1{margin:0 0 10px;font-size:21px;font-weight:600;letter-spacing:-.3px;line-height:1.3}
  .dtg-card p{margin:0 auto;max-width:340px;font-size:14.5px;line-height:1.62;color:var(--mut)}
  .dtg-st{margin-top:26px;display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:var(--mut);
    padding:8px 15px;border-radius:999px;background:var(--pill);border:1px solid var(--pbd)}
  .dtg-dot{width:6px;height:6px;border-radius:50%;background:var(--ic);animation:dtg-pulse 1.5s ease-in-out infinite}
</style>
<div class="dtg"><div class="dtg-card">
  <div class="dtg-ic">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>
      <circle cx="12" cy="15" r="1.35" fill="currentColor" stroke="none"/>
    </svg>
  </div>
  <h1>Please close developer tools</h1>
  <p>For your security, this app pauses while your browser’s developer tools are open. Close them and it will continue automatically.</p>
  <div class="dtg-st"><span class="dtg-dot"></span> Waiting for developer tools to close…</div>
</div></div>`;
  if (document.body) document.body.innerHTML = html;
  else document.documentElement.innerHTML = `<body>${html}</body>`;
}

export function initDevToolsGuard(): void {
  if (typeof window === "undefined") return; // SSR-safe (Next.js)

  window.addEventListener(
    "keydown",
    (e: KeyboardEvent) => {
      if (isDevToolsShortcut(e)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );
  window.addEventListener(
    "contextmenu",
    (e: MouseEvent) => e.preventDefault(),
    true
  );

  if (debugBypassed()) return;

  const openAtBoot = devToolsOpen();
  const watch = (): void => {
    if (devToolsOpen() !== openAtBoot) window.location.reload();
  };
  window.addEventListener("resize", watch);
  setInterval(watch, 1000);

  if (!openAtBoot) return;

  // Intentional: halts the entry module so the app never renders and no API fires.
  paintPausedScreen();
  if (typeof window.stop === "function") window.stop();
  throw new Error("Application paused: developer tools are open.");
}

/* ----------------------------------------------------------------------------
   MOUNT POINT
   RootLayout is a Server Component, and a Server Component cannot CALL a client
   function — it can only RENDER a client component. So the guard is exposed as
   one; layout.tsx renders <DevToolsGuard />.

   The call sits at MODULE scope (not in a useEffect) on purpose: the guard's
   contract is "halt the entry module so the app never renders". A useEffect runs
   AFTER React has rendered and committed, and paintPausedScreen()'s
   `document.body.innerHTML = ...` would then tear out React's live DOM. A client
   module's body is evaluated as the bundle loads — before React renders the tree.

   PRODUCTION ONLY: the guard repaints <body> and throws, by design. In `next dev`
   that fires every time you work with DevTools open (and the throw trips Next's
   error overlay), fighting the developer it exists to protect against.
   Exercise it locally with: npm run build && npm start
---------------------------------------------------------------------------- */
if (process.env.NODE_ENV === "production") {
  initDevToolsGuard();
}

export function DevToolsGuard(): null {
  return null;
}
