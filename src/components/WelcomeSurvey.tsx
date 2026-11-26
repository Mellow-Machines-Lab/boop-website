"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { copy } from "@/lib/copy";
import { inputClass } from "@/lib/ui";

type Field = "video_source" | "price_expectation";

/*
  The two optional questions on /welcome. Each saves on its own, against the
  signup's code. The video question comes first: while the TikTok bio link is
  not clickable, it is the only way to tell which videos bring people here.
*/
function Question({
  code,
  field,
  event,
  question,
  placeholder,
  maxLength,
}: {
  code: string;
  field: Field;
  event: "video_source" | "price_expectation";
  question: string;
  placeholder: string;
  maxLength: number;
}) {
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"idle" | "pending" | "done" | "error">("idle");
  const id = `survey-${field}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!answer.trim() || state === "pending") return;
    setState("pending");
    try {
      const res = await fetch("/api/waitlist/answer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code, field, answer }),
      });
      if (!res.ok) throw new Error("request failed");
      track(event, {});
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="text-left">
      <label htmlFor={id} className="font-display text-lg font-semibold">
        {question}
      </label>
      {state === "done" ? (
        <p className="mt-2 text-ink-soft" data-testid={`${field}-thanks`}>
          {copy.welcome.survey.thanks}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-2 flex gap-2">
          <input
            id={id}
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`${inputClass} !px-5 !py-3`}
          />
          <button
            type="submit"
            disabled={state === "pending"}
            data-testid={`${field}-send`}
            className="shrink-0 rounded-full border-2 border-ink/15 bg-white px-5 py-3 font-display font-semibold transition-colors hover:border-slime-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {copy.welcome.survey.submitLabel}
          </button>
        </form>
      )}
      {state === "error" && (
        <p role="alert" className="mt-2 text-sm text-ink-soft">
          {copy.form.error}
        </p>
      )}
    </div>
  );
}

export function WelcomeSurvey({ code }: { code: string }) {
  const survey = copy.welcome.survey;
  return (
    <section className="mt-10 flex w-full max-w-md flex-col gap-7">
      <p className="text-center text-sm text-ink-soft">{survey.label}</p>
      <Question
        code={code}
        field="video_source"
        event="video_source"
        question={survey.video.question}
        placeholder={survey.video.placeholder}
        maxLength={500}
      />
      <Question
        code={code}
        field="price_expectation"
        event="price_expectation"
        question={survey.price.question}
        placeholder={survey.price.placeholder}
        maxLength={64}
      />
    </section>
  );
}
