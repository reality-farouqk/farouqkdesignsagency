// Thin wrapper around the global `gtag` function set up in layout.tsx.
// Safe to call anywhere — it's a no-op if GA hasn't loaded yet
// (blocked by an ad blocker, still loading, etc).

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: GtagEventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", eventName, params);
}
