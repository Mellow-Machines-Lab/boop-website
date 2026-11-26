"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { submitEmail, type SignupSource } from "@/lib/submit";
import { getPriceCohort } from "@/lib/attribution";
import { trackTikTokSignup } from "@/lib/tiktok";
import { copy } from "@/lib/copy";
import { ctaClass, inputClass } from "@/lib/ui";

/*
  The waitlist form, used in the hero and the footer. It sits on the page, with
  no modal in front of it: most visitors arrive on a phone. On success it goes
  to /welcome with the signup's code, which the optional questions are saved
  against.
*/
export function EmailForm({
  source,
  buttonLabel,
  placeholder,
}: {
  source: SignupSource;
  buttonLabel: string;
  placeholder: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    try {
      const { referralCode } = await submitEmail(email.trim(), source, website);
      track("signup", { source, cohort: getPriceCohort() });
      trackTikTokSignup();
      router.push(`/welcome?code=${encodeURIComponent(referralCode)}`);
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap" noValidate>
      <label className="sr-only" htmlFor={`email-${source}`}>
        {copy.form.emailLabel}
      </label>
      <input
        id={`email-${source}`}
        type="email"
        name="email"
        inputMode="email"
        autoComplete="email"
        required
        placeholder={placeholder}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (state === "error") setState("idle");
        }}
        className={inputClass}
      />
      {/* Honeypot: people never see or reach this field, and form-filling bots
          fill it in. The API quietly drops any signup that has it set. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>
      <button
        type="submit"
        className={ctaClass}
        disabled={state === "loading"}
        data-testid={`${source}-submit`}
      >
        {state === "loading" ? copy.form.loading : buttonLabel}
      </button>
      {state === "error" && (
        <p role="alert" className="text-sm text-ink-soft sm:basis-full">
          {copy.form.error}
        </p>
      )}
    </form>
  );
}
