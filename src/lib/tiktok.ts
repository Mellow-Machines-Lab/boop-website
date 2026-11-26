/*
  TikTok Pixel helpers. The pixel loads only when NEXT_PUBLIC_TIKTOK_PIXEL_ID
  is set at build time (see components/TikTokPixel.tsx). With no ID, every call
  here does nothing. /privacy says the pixel is used: keep the two in step.
*/
type Ttq = {
  page: () => void;
  track: (event: string, params?: Record<string, unknown>) => void;
};

/** The configured pixel ID, or "" when unset or not a plausible ID. */
export function tiktokPixelId(): string {
  const id = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "";
  return /^[A-Za-z0-9]{8,40}$/.test(id) ? id : "";
}

function ttq(): Ttq | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { ttq?: Ttq }).ttq ?? null;
}

export function trackTikTokPage(): void {
  ttq()?.page();
}

/** A successful waitlist signup. No email or other personal data is sent. */
export function trackTikTokSignup(): void {
  ttq()?.track("CompleteRegistration");
}
