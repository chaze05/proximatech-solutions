"use client";

import { useState, type FormEvent } from "react";
import { validateContact, type ContactInput } from "@/lib/validation";
import { Field } from "@/components/ui/Field";

const emptyForm: ContactInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactInput>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: keyof ContactInput) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateContact(form);
    setErrors(result as Record<string, string>);
    if (Object.keys(result).length > 0) return;

    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 900);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-panel/60 p-8 text-center sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <h2 className="mt-6 font-display text-2xl uppercase tracking-wide">
          Thanks — we&apos;ll be in touch.
        </h2>
        <p className="mt-2 text-sm text-secondary">
          Our team usually replies within one business day. For urgent
          concerns, call us directly.
        </p>
        <p className="mt-4 rounded-xl border border-white/10 bg-night/50 px-4 py-3 text-xs text-muted">
          This demo form simulates delivery — no message was actually sent.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm(emptyForm);
            setErrors({});
          }}
          className="mt-6 min-h-11 rounded-full border border-white/15 px-6 py-2.5 text-sm font-bold text-ink transition-colors hover:border-signal/60"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-white/10 bg-panel/60 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="First name"
          name="firstName"
          value={form.firstName}
          onChange={setField("firstName")}
          error={errors.firstName}
          autoComplete="given-name"
          required
        />
        <Field
          label="Last name"
          name="lastName"
          value={form.lastName}
          onChange={setField("lastName")}
          error={errors.lastName}
          autoComplete="family-name"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={setField("email")}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Field
          label="Phone / mobile"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={setField("phone")}
          error={errors.phone}
          autoComplete="tel"
          required
        />
        <div className="sm:col-span-2">
          <Field
            label="Subject / concerns"
            name="subject"
            value={form.subject}
            onChange={setField("subject")}
            error={errors.subject}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Your message"
            name="message"
            as="textarea"
            value={form.message}
            onChange={setField("message")}
            error={errors.message}
            rows={6}
            required
          />
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-signal px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-signal-hover disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
          Demo form — delivery is simulated.
        </p>
      </div>
    </form>
  );
}
