'use client';

import { useState } from 'react';
import Icon from './Icon';

/**
 * The original site's form had action="#", so it silently discarded every
 * message. With no backend on a static export this composes a mail draft
 * instead — same fields, but the message actually reaches someone.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name:  ${f.get('name')}`,
      `Email: ${f.get('email')}`,
      `Phone: ${f.get('phone')}`,
      '',
      String(f.get('message') ?? ''),
    ].join('\n');
    window.location.href = `mailto:info@umurimofinance.com?subject=${encodeURIComponent(
      `Website enquiry from ${f.get('name')}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <h2 className="font-display text-h3-lg font-semibold text-brand-deep">Send us a note</h2>

      <p className="mt-3 flex items-start gap-2.5 rounded-field bg-surface-paper p-3.5 text-[0.9375rem] text-ink-soft">
        <Icon name="contingency" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" strokeWidth={1.7} />
        <span>
          Never send a PIN, password or one-time code — not here and not to anyone claiming to be Umurimo.
        </span>
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="field-label">Full name</span>
          <input name="name" required autoComplete="name" className="field" placeholder="Your full name" />
        </label>
        <label className="block">
          <span className="field-label">Email</span>
          <input name="email" type="email" required autoComplete="email" inputMode="email" className="field" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="field-label">Phone</span>
          <input name="phone" required autoComplete="tel" inputMode="tel" className="field" placeholder="+250 7.. ... ..." />
        </label>
        <label className="block sm:col-span-2">
          <span className="field-label">Message</span>
          <textarea name="message" required rows={5} className="field resize-y" placeholder="How can we help?" />
        </label>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Send message
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`mt-4 text-[0.9375rem] text-ink-soft transition-opacity duration-300 ${sent ? 'opacity-100' : 'sr-only opacity-0'}`}
      >
        {sent ? (
          <>
            Your mail app should have opened with the message ready to send. If it did not, write to{' '}
            <a
              href="mailto:info@umurimofinance.com"
              className="font-semibold text-brand-blue underline underline-offset-2"
            >
              info@umurimofinance.com
            </a>
            .
          </>
        ) : null}
      </p>
    </form>
  );
}
