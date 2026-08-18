import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import Icon from '@/components/Icon';
import { PageHero, SectionHeading } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Charges & fees',
  description: 'How Umurimo Finance discloses interest, charges and fees before you sign.',
};

const groups = [
  {
    title: 'Savings & deposits',
    points: [
      'Fees and cycles are on your tariff sheet.',
      'Early withdrawal rules are on your term certificate.',
      'Dormancy notices are sent before any legal step.',
    ],
  },
  {
    title: 'Credit products',
    points: [
      'Total loan cost includes interest, fees and any required insurance.',
      'Salary loans follow the payroll timing in your covenant.',
      'Penalties apply only after the agreed grace window.',
    ],
    note: true,
  },
  {
    title: 'Payments corridor',
    points: [
      '*182*4*2# and partner-channel fees as disclosed at signup.',
      'Forex spreads per the published desk board.',
      'Outage refunds per scheme rules and ticket references.',
    ],
  },
];

const faqs = [
  { q: 'Where is the authoritative interest figure?', a: 'On your signed loan worksheet and amortisation schedule. Nothing on this website overrides those documents.' },
  { q: 'Can fees shift overnight?', a: 'Only with the notice the rules require. A contract you have already signed stays as signed until renewal.' },
  { q: 'What if I see a debit I do not recognise?', a: 'Bring the date, the channel and the narration. We trace it and revert it per policy.' },
  { q: 'Can I get historical tariff sheets?', a: 'Yes — on request, for audit or legal use.' },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Charges, interest & transparency"
        lede="What a product costs is disclosed on your signed documents. Here is how, and where."
      />

      <section className="py-20 lg:py-28">
        <div className="container-page">
          <Reveal className="mx-auto mb-14 flex max-w-3xl items-start gap-4 rounded-card border border-caution/25 bg-caution-soft p-6">
            <Icon name="contingency" className="mt-0.5 h-6 w-6 shrink-0 text-caution" strokeWidth={1.7} />
            <p className="text-body text-ink">
              <b className="font-semibold">We do not publish rates on this page.</b> A number printed on a website is
              not a number you have been offered. Your binding figures live on the offer you sign.
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {groups.map((g, i) => (
              <Reveal key={g.title} as="article" delay={i * 80}>
                <div className="card-hover flex h-full flex-col">
                  <h2 className="font-display text-h3-lg font-semibold text-brand-deep">{g.title}</h2>
                  <ul className="mt-5 flex-1 space-y-3">
                    {g.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                        <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-pill bg-brand-bright" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {g.note ? (
                    <p className="mt-5 border-t border-line pt-4 text-[0.9375rem] text-ink-soft">
                      How our loan lines map to your activity is on the{' '}
                      <Link href="/loans/" className="font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-navy">
                        loans page
                      </Link>
                      .
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-sunken py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="FAQ" title="Fees customers ask about first" />

          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group overflow-hidden rounded-card border border-line bg-white shadow-card transition-[border-color,box-shadow] duration-200 open:border-brand-200 open:shadow-lift">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-[1.0625rem] font-semibold text-brand-deep transition-colors duration-150 hover:text-brand-navy">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-pill border border-line text-brand-navy transition-[transform,background-color,border-color] duration-300 ease-entrance group-open:rotate-[135deg] group-open:border-brand-navy group-open:bg-brand-navy group-open:text-white"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-body text-ink-soft">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
