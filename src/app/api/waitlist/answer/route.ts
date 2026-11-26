import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimited } from "@/lib/rate-limit";
import { isBackendReady, saveAnswer } from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/*
  Saves one optional /welcome answer on the signup row that owns `code`:
    - video_source: "Which video brought you here?" Free text or a link. While
      the TikTok bio link is not clickable, this is the only way to tell which
      videos drive signups.
    - price_expectation: what a ready-made Boop should cost.
*/
const Body = z.object({
  code: z.string().trim().min(1).max(32),
  field: z.enum(["video_source", "price_expectation"]),
  answer: z.string().trim().min(1).max(500),
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
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  try {
    await saveAnswer(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist answer failed", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
