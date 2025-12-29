/**
 * Cookie Consent Management
 * Production-grade utility for managing cookie consent preferences
 */

const COOKIE_CONSENT_KEY = "cookie-consent";
const COOKIE_CONSENT_VERSION = "1.0"; // Increment when consent requirements change

export interface CookiePreferences {
  necessary: boolean; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentData {
  preferences: CookiePreferences;
  timestamp: string;
  version: string;
}

/**
 * Get current consent preferences from localStorage
 * Returns null if no consent has been given
 */
export function getConsentData(): ConsentData | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored) as ConsentData;

    // If version mismatch, consent needs to be re-collected
    if (data.version !== COOKIE_CONSENT_VERSION) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

/**
 * Check if user has given consent (any response counts as consent given)
 */
export function hasGivenConsent(): boolean {
  return getConsentData() !== null;
}

/**
 * Check if a specific cookie category is allowed
 */
export function isCookieAllowed(category: keyof CookiePreferences): boolean {
  const data = getConsentData();
  if (!data) return category === "necessary"; // Only necessary allowed without consent
  return data.preferences[category];
}

/**
 * Check if analytics cookies are allowed
 */
export function isAnalyticsAllowed(): boolean {
  return isCookieAllowed("analytics");
}

/**
 * Check if marketing cookies are allowed
 */
export function isMarketingAllowed(): boolean {
  return isCookieAllowed("marketing");
}

/**
 * Save consent preferences to localStorage
 */
export function saveConsentPreferences(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;

  const data: ConsentData = {
    preferences: {
      ...preferences,
      necessary: true, // Always force necessary to true
    },
    timestamp: new Date().toISOString(),
    version: COOKIE_CONSENT_VERSION,
  };

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(data));

  // Dispatch custom event for other scripts to listen to
  window.dispatchEvent(
    new CustomEvent("cookieConsentChanged", {
      detail: data,
    })
  );

  // Handle analytics consent
  if (preferences.analytics) {
    enableAnalytics();
  } else {
    disableAnalytics();
  }

  // Handle marketing consent
  if (preferences.marketing) {
    enableMarketing();
  } else {
    disableMarketing();
  }
}

/**
 * Revoke all consent and clear stored preferences
 */
export function revokeConsent(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(COOKIE_CONSENT_KEY);
  disableAnalytics();
  disableMarketing();

  window.dispatchEvent(new CustomEvent("cookieConsentRevoked"));
}

/**
 * Enable analytics tracking
 * Add your analytics initialization here (e.g., Google Analytics, Plausible)
 */
function enableAnalytics(): void {
  // Example: Enable Google Analytics
  // window.gtag?.('consent', 'update', { analytics_storage: 'granted' });

  // Example: Enable other analytics
  // initializeAnalytics();

  console.log("[Cookie Consent] Analytics enabled");
}

/**
 * Disable analytics tracking
 */
function disableAnalytics(): void {
  // Example: Disable Google Analytics
  // window.gtag?.('consent', 'update', { analytics_storage: 'denied' });

  // Clear analytics cookies if needed
  // document.cookie.split(';').forEach(c => {
  //   if (c.includes('_ga') || c.includes('_gid')) {
  //     document.cookie = c.replace(/^ +/, '').split('=')[0] +
  //       '=;expires=' + new Date(0).toUTCString() + ';path=/';
  //   }
  // });

  console.log("[Cookie Consent] Analytics disabled");
}

/**
 * Enable marketing/advertising tracking
 */
function enableMarketing(): void {
  // Example: Enable Google Ads
  // window.gtag?.('consent', 'update', { ad_storage: 'granted' });

  // Example: Enable Facebook Pixel
  // window.fbq?.('consent', 'grant');

  console.log("[Cookie Consent] Marketing enabled");
}

/**
 * Disable marketing/advertising tracking
 */
function disableMarketing(): void {
  // Example: Disable Google Ads
  // window.gtag?.('consent', 'update', { ad_storage: 'denied' });

  // Example: Disable Facebook Pixel
  // window.fbq?.('consent', 'revoke');

  console.log("[Cookie Consent] Marketing disabled");
}

/**
 * Hook to listen for consent changes
 * Usage: useEffect(() => onConsentChange(handler), [])
 */
export function onConsentChange(
  handler: (data: ConsentData) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<ConsentData>;
    handler(customEvent.detail);
  };

  window.addEventListener("cookieConsentChanged", listener);
  return () => window.removeEventListener("cookieConsentChanged", listener);
}
