import { after, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { ATTR_COOKIE, type Attribution } from "@/lib/attribution";
import { sendWaitlistConfirmation } from "@/lib/email";
import { rateLimited } from "@/lib/rate-limit";
import { isBackendReady, submitSignup } from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  email: z.string().email().max(320),
  source: z.enum(["hero", "footer"]),
  // Honeypot: hidden from people, so only a bot fills it in.
  website: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  if (!isBackendReady()) {
    return NextResponse.json({ error: "waitlist unavailable" }, { status: 503 });
  }

  if (await rateLimited(req)) {
    return NextResponse.json({ error: "slow down" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  if (parsed.data.website) {
    // Looks like success to the bot; nothing is stored and no email is sent.
    return NextResponse.json({ position: 1, referralCode: "", created: false });
  }

  const email = parsed.data.email.trim().toLowerCase();

  let attr: Attribution = {};
  const raw = (await cookies()).get(ATTR_COOKIE)?.value;
  if (raw) {
    try {
      attr = JSON.parse(raw) as Attribution;
    } catch {
      // malformed cookie: proceed with no attribution
    }
  }

  try {
    const result = await submitSignup({ email, source: parsed.data.source, attr });
    if (result.created) {
      // Sent after the response. A missing RESEND_API_KEY or a failed send is
      // logged inside sendWaitlistConfirmation and never fails the signup.
      after(async () => {
        await sendWaitlistConfirmation({ to: email, position: result.position });
      });
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error("waitlist submit failed", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
