'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

/**
 * "Know before you owe" — the site's signature element.
 *
 * The homepage already promised "we walk you through a sample schedule before
 * you sign"; until now that was a heading and a dead button. This makes the
 * promise real.
 *
 * IMPORTANT — it computes a FLAT-interest illustration, which is the product
 * the platform actually books (applyFlatLoan / apply_flat_loan). The rate is an
 * input the customer sets from what their officer quoted; the site never quotes
 * one. Every output is stamped as indicative, because the binding figures live
 * on the signed offer and amortisation schedule.
 */

const RWF = new Intl.NumberFormat('en-RW', { maximumFractionDigits: 0 });

/** Tweens a number so the figure slides rather than snapping on every input tick. */
function useTween(target: number, ms = 420) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  const raf = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(target);
      return;
    }
    const start = performance.now();
    const a = from.current;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = a + (target - a) * eased;
      setV(next);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else from.current = target;
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, ms]);

  return v;
}

const AMOUNT = { min: 50_000, max: 5_000_000, step: 50_000 };
const MONTHS = { min: 3, max: 36, step: 1 };
const RATE = { min: 8, max: 30, step: 0.5 };

export default function Estimator() {
  const [amount, setAmount] = useState(600_000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(16);

  // Flat interest: charged on the original principal for the whole tenor.
  const interest = amount * (rate / 100) * (months / 12);
  const total = amount + interest;
  const monthly = total / months;
  const interestShare = total > 0 ? (interest / total) * 100 : 0;

  const aMonthly = useTween(monthly);
  const aInterest = useTween(interest);
  const aTotal = useTween(total);
  const aShare = useTween(interestShare);

  return (
    <div className="overflow-hidden rounded-card border border-line bg-white shadow-lift">
      <div className="rule-brand" />

      <div className="grid gap-0 lg:grid-cols-[1fr_0.95fr]">
        {/* ---------------- Inputs ---------------- */}
        <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <h3 className="font-display text-h3-lg font-semibold text-brand-deep">Shape the loan</h3>
          <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
            Move the sliders to see what a month would look like.
          </p>

          <div className="mt-7 space-y-7">
            <Slider
              id="est-amount"
              label="Amount you need"
              display={`RWF ${RWF.format(amount)}`}
              hint={`RWF ${RWF.format(AMOUNT.min)} – ${RWF.format(AMOUNT.max)}`}
              range={AMOUNT}
              value={amount}
              onChange={setAmount}
              valueText={`${RWF.format(amount)} Rwandan francs`}
            />

            <Slider
              id="est-months"
              label="Repayment period"
              display={`${months} ${months === 1 ? 'month' : 'months'}`}
              hint={`${MONTHS.min} – ${MONTHS.max} months`}
              range={MONTHS}
              value={months}
              onChange={setMonths}
            />

            <Slider
              id="est-rate"
              label="Annual flat rate you were quoted"
              display={`${rate}%`}
              hint="Ask your officer — we do not set this figure here"
              range={RATE}
              value={rate}
              onChange={setRate}
              valueText={`${rate} percent`}
            />
          </div>
        </div>

        {/* ---------------- Result ---------------- */}
        <div className="bg-surface-paper p-6 sm:p-8">
          <p className="text-label uppercase text-brand-blue">Indicative monthly instalment</p>
          <p
            className="tabular mt-2 font-display text-stat font-semibold text-brand-deep sm:text-[3rem]"
            aria-live="polite"
          >
            <span className="align-middle text-[0.45em] font-sans font-semibold text-ink-muted">RWF </span>
            {RWF.format(Math.round(aMonthly))}
          </p>
          <p className="mt-1 text-[0.9375rem] text-ink-muted">
            &times; {months} {months === 1 ? 'month' : 'months'}
          </p>

          {/* Principal vs cost of credit — the one thing first-time borrowers
              most often cannot see before they sign. */}
          <div className="mt-7">
            <div className="flex h-3 w-full overflow-hidden rounded-pill bg-brand-100">
              <div
                className="h-full bg-brand-navy transition-[width] duration-500 ease-entrance"
                style={{ width: `${100 - aShare}%` }}
              />
              <div
                className="h-full bg-brand-bright transition-[width] duration-500 ease-entrance"
                style={{ width: `${aShare}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1.5 text-[0.9375rem]">
              <span className="flex items-center gap-2 text-ink-soft">
                <i className="h-2.5 w-2.5 shrink-0 rounded-pill bg-brand-navy" aria-hidden="true" />
                What you receive
                <b className="tabular font-semibold text-ink">{RWF.format(amount)}</b>
              </span>
              <span className="flex items-center gap-2 text-ink-soft">
                <i className="h-2.5 w-2.5 shrink-0 rounded-pill bg-brand-bright" aria-hidden="true" />
                Cost of credit
                <b className="tabular font-semibold text-ink">{RWF.format(Math.round(aInterest))}</b>
              </span>
            </div>
          </div>

          <dl className="mt-7 divide-y divide-line border-y border-line">
            <Row k="Total you repay" v={`RWF ${RWF.format(Math.round(aTotal))}`} strong />
            <Row k="Cost as % of what you receive" v={`${((interest / amount) * 100).toFixed(1)}%`} />
          </dl>

          <div className="mt-6 flex gap-3 rounded-field border border-caution/25 bg-caution-soft p-4">
            <Icon name="contingency" className="mt-0.5 h-5 w-5 shrink-0 text-caution" strokeWidth={1.7} />
            <p className="text-[0.9375rem] leading-relaxed text-ink">
              <b className="font-semibold">Illustration only.</b> This is not an offer and not a quote. Your
              binding amount, interest, fees, insurance and dates appear on your signed offer and amortisation
              schedule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Native range input with the filled portion drawn behind it. The browser's own
 * track is made transparent so the fill can carry the brand gradient and animate
 * on change, while keyboard, screen-reader and touch behaviour stay native.
 */
function Slider({
  id, label, display, hint, range, value, onChange, valueText,
}: {
  id: string;
  label: string;
  display: string;
  hint: string;
  range: { min: number; max: number; step: number };
  value: number;
  onChange: (n: number) => void;
  valueText?: string;
}) {
  const pct = ((value - range.min) / (range.max - range.min)) * 100;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-[0.9375rem] font-semibold text-ink">
          {label}
        </label>
        <output htmlFor={id} className="tabular font-display text-h3 font-semibold text-brand-navy">
          {display}
        </output>
      </div>

      <div className="relative mt-3 flex h-6 items-center">
        <span aria-hidden="true" className="absolute inset-x-0 h-1.5 rounded-pill bg-brand-100" />
        <span
          aria-hidden="true"
          className="absolute left-0 h-1.5 rounded-pill bg-rule-gradient transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
        <input
          id={id}
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          aria-valuetext={valueText}
          className={
            'relative w-full appearance-none bg-transparent ' +
            '[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:bg-transparent ' +
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-[9px] ' +
            '[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-pill ' +
            '[&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white ' +
            '[&::-webkit-slider-thumb]:bg-brand-navy [&::-webkit-slider-thumb]:shadow-card ' +
            '[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 ' +
            'hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-95 ' +
            '[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:bg-transparent ' +
            '[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-pill ' +
            '[&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white ' +
            '[&::-moz-range-thumb]:bg-brand-navy'
          }
        />
      </div>

      <p className="mt-2 text-[0.8125rem] text-ink-muted">{hint}</p>
    </div>
  );
}

function Row({ k, v, strong = false }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-[0.9375rem] text-ink-soft">{k}</dt>
      <dd className={`tabular text-[0.9375rem] ${strong ? 'font-semibold text-brand-deep' : 'text-ink'}`}>{v}</dd>
    </div>
  );
}
