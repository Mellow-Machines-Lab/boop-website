import { WAITLIST_CONFIRMATION_TEMPLATE } from "./email-templates.ts";

type RenderInput = {
  position: number;
};

type SendInput = RenderInput & {
  to: string;
};

export type SendWaitlistConfirmationResult =
  | { status: "skipped"; reason: string }
  | { status: "sent"; id?: string }
  | { status: "error"; error: string };

const template = WAITLIST_CONFIRMATION_TEMPLATE;

/*
  The HTML version uses the landing page's colours (globals.css): peach
  #fff1e4, ink #0b2a4a, ink-soft #4b6078 and the slime's blue #1a66bd. Zero
  images and no tracking pixel: deliverability and the privacy page both
  depend on that staying true.

  Replies go to hello@adoptaboop.com, which forwards to the team inbox. The
  sending domain is verified in Resend (the `send` MX and SPF records).
*/
const SITE_URL = "https://adoptaboop.com";

function substitute(value: string, input: RenderInput): string {
  return value.replaceAll("{{position}}", String(input.position));
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function linkifySite(escaped: string): string {
  return escaped.replaceAll(
    "adoptaboop.com",
    `<a href="${SITE_URL}" style="color:#1a66bd;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;">adoptaboop.com</a>`,
  );
}

function renderBodyParagraph(paragraph: string, isSignoff: boolean): string {
  const escaped = linkifySite(escapeHtml(paragraph).replaceAll("\n", "<br>"));
  // The last paragraph is the sign-off; it becomes the quiet footer.
  if (isSignoff) {
    return `<p style="margin:36px 0 0;font-size:14px;line-height:1.7;color:#4b6078;">${escaped}</p>`;
  }
  return `<p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#0b2a4a;">${escaped}</p>`;
}

function renderHtml(input: RenderInput): string {
  const heading = escapeHtml(substitute(template.heading, input));
  const subline = escapeHtml(substitute(template.subline, input));
  const parts = substitute(template.body, input).trimEnd().split(/\n{2,}/);
  const paragraphs = parts
    .map((paragraph, i) => renderBodyParagraph(paragraph, i === parts.length - 1))
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#fff1e4;">
    <div style="max-width:520px;margin:0 auto;padding:56px 28px 48px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0b2a4a;">
      <p style="margin:0 0 32px;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#4b6078;">Boop &middot; waitlist</p>
      <h1 style="margin:0 0 14px;font-size:34px;line-height:1.1;letter-spacing:-0.02em;font-weight:600;color:#0b2a4a;">${heading}</h1>
      <p style="margin:0 0 28px;font-size:17px;line-height:1.6;color:#4b6078;">${subline}</p>
      <div style="height:3px;width:44px;border-radius:2px;background:#2e8eea;margin:0 0 28px;"></div>
      ${paragraphs}
    </div>
  </body>
</html>`;
}

export function renderWaitlistConfirmation(input: RenderInput): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = substitute(template.subject, input);
  const text = [template.heading, template.subline, template.body.trimEnd()]
    .filter(Boolean)
    .map((part) => substitute(part, input))
    .join("\n\n");

  return {
    subject,
    text,
    html: renderHtml(input),
  };
}

export async function sendWaitlistConfirmation(
  input: SendInput,
): Promise<SendWaitlistConfirmationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Logged at warn so it shows in Vercel's logs. The signup itself has
    // already succeeded by the time this runs.
    console.warn("waitlist confirmation email skipped: RESEND_API_KEY is not set");
    return { status: "skipped", reason: "RESEND_API_KEY is not set" };
  }

  try {
    const rendered = renderWaitlistConfirmation(input);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: template.from,
        reply_to: template.replyTo,
        to: input.to,
        subject: rendered.subject,
        text: rendered.text,
        html: rendered.html,
      }),
    });

    const payload = (await response.json().catch(() => null)) as { id?: string; message?: string } | null;
    if (!response.ok) {
      const message = payload?.message ?? `Resend returned ${response.status}`;
      console.error("waitlist confirmation email failed", message);
      return { status: "error", error: message };
    }

    return { status: "sent", id: payload?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("waitlist confirmation email failed", err);
    return { status: "error", error: message };
  }
}
