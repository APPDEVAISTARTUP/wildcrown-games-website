import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      theme: "auto";
    },
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const scriptUrl = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>("script[data-wishlist-turnstile]");
      const script = existing ?? document.createElement("script");
      script.addEventListener("load", () => window.turnstile ? resolve() : reject(new Error("Turnstile did not initialize.")), { once: true });
      script.addEventListener("error", () => {
        script.remove();
        reject(new Error("Turnstile failed to load."));
      }, { once: true });
      if (!existing) {
        script.src = scriptUrl;
        script.async = true;
        script.defer = true;
        script.dataset["wishlistTurnstile"] = "true";
        document.head.appendChild(script);
      }
    }).catch((error: unknown) => {
      scriptPromise = null;
      throw error;
    });
  }
  return scriptPromise ?? Promise.reject(new Error("Turnstile loader was not initialized."));
}

export function TurnstileWidget({
  siteKey,
  onToken,
  onError,
}: {
  siteKey: string;
  onToken: (token: string) => void;
  onError: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ onToken, onError });
  callbacks.current = { onToken, onError };

  useEffect(() => {
    let active = true;
    let widgetId: string | null = null;
    void loadTurnstile().then(() => {
      if (!active || !containerRef.current || !window.turnstile) return;
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "kaalvan_wishlist",
        callback: (token) => callbacks.current.onToken(token),
        "expired-callback": () => callbacks.current.onToken(""),
        "error-callback": () => callbacks.current.onError(),
        theme: "auto",
      });
    }).catch(() => {
      if (active) callbacks.current.onError();
    });
    return () => {
      active = false;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [siteKey]);

  return <div ref={containerRef} aria-label="Bot protection challenge" />;
}
