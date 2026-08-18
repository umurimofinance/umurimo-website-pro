import type { Metadata } from 'next';
import Link from 'next/link';
import Icon, { type IconName } from '@/components/Icon';
import Reveal from '@/components/motion/Reveal';
import Estimator from '@/components/Estimator';
import { PageHero, SectionHeading } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Loans & credit',
  description:
    'Loan lines organised by the purpose of borrowing — commerce, transport, agriculture, livestock, salary and more.',
};

const loans: { icon: IconName; name: string; rw: string; d: string }[] = [
  { icon: 'commerce', name: 'Commerce', rw: 'Ubucuruzi', d: 'Working capital and stock finance for traders, retailers and wholesalers, with repayment aligned to trading cycles.' },
  { icon: 'transport', name: 'Transport', rw: 'Ubwikorezi', d: 'Facilities tied to mobility and freight — equipment or operations — structured around verifiable earnings from transport activity.' },
  { icon: 'contingency', name: 'Contingency', rw: 'Ingoboka', d: 'Short-term relief when household or enterprise cash flow is interrupted, subject to eligibility and need at application.' },
  { icon: 'agriculture', name: 'Agriculture', rw: 'Ubuhinzi', d: 'Input, crop and farm improvement loans linked to planting and harvest timelines, assessed against capacity.' },
  { icon: 'livestock', name: 'Livestock', rw: 'Ubworozi', d: 'Financing for herds, stocking, feed or expansion, with schedules matched to realistic offtake from the enterprise.' },
  { icon: 'ordinary', name: 'Ordinary', rw: 'Isanzwe', d: 'General-purpose credit for documented household or business needs that do not sit inside a single sector line.' },
  { icon: 'salary', name: 'Salary', rw: 'Umushahara', d: 'Payroll-secured instalments for formally employed borrowers, with deductions or employer confirmation set out in the covenant.' },
  { icon: 'fishing', name: 'Fishing', rw: 'Uburobyi', d: 'Gear, boat-related or working-capital support for fishing operators, assessed on activity and repayment capacity.' },
];

const savings: { icon: IconName; name: string; d: string }[] = [
  { icon: 'deposit', name: 'Term deposit account', d: 'A fixed-term deposit for disciplined growth. Early withdrawal rules are set out on your term certificate.' },
  { icon: 'current', name: 'Current account', d: 'Day-to-day banking for individuals and businesses. Fees and cycles are on your tariff sheet.' },
];

export default function LoansPage() {
  return (
    <>
      <PageHero
        title="Loans & credit"
        lede="Credit that matches how you actually earn — by season, by trading day, or by payslip."
      />

      <section className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Credit lines"
            title="Organised by the purpose of borrowing"
            lede="Head office in Kamembe, Rusizi, with service points at Kagano, Karengera, Macuba and Bushenge. Kinyarwanda names are shown in brackets."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {loans.map((l, i) => (
              <Reveal key={l.name} as="article" delay={(i % 4) * 70}>
                <div className="card-hover group h-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-field bg-brand-50 text-brand-navy transition-[background-color,color] duration-200 group-hover:bg-brand-navy group-hover:text-white">
                    <Icon name={l.icon} className="h-[22px] w-[22px]" />
                  </span>
                  <h3 className="mt-5 font-display text-h3 font-semibold text-brand-deep">
                    {l.name}
                    <span className="ml-1.5 font-sans text-[0.9375rem] font-normal text-ink-muted">({l.rw})</span>
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{l.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mx-auto mt-12 max-w-3xl rounded-card border border-brand-200 bg-brand-50/60 p-7">
            <p className="text-body text-ink-soft">
              Amounts, interest, fees, insurance, tenor, collateral and covenants appear only on your signed offer
              and amortisation schedule — never on a marketing page. See{' '}
              <Link href="/pricing/" className="font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-navy">
                charges &amp; fees
              </Link>{' '}
              for how costs are disclosed before signature.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Estimator repeated here — this is the page where someone is actually
          deciding, so the tool belongs alongside the lines themselves. */}
      <section id="estimate" className="scroll-mt-24 bg-surface-sunken py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Know before you owe"
            title="Work out the monthly instalment"
            lede="An illustration you control — set the rate your officer quoted and see what a month looks like."
          />
          <Reveal delay={100} variant="scale" className="mt-12">
            <Estimator />
          </Reveal>
        </div>
      </section>

      <section id="savings" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Deposit"
            title="Savings & deposits"
            lede="Build stability with deposit options designed for disciplined growth."
          />

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {savings.map((s, i) => (
              <Reveal key={s.name} delay={i * 80}>
                <div className="card-hover h-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-field bg-brand-50 text-brand-navy">
                    <Icon name={s.icon} className="h-[22px] w-[22px]" />
                  </span>
                  <h3 className="mt-5 font-display text-h3-lg font-semibold text-brand-deep">{s.name}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140} className="mt-12 text-center">
            <Link href="/contact/" className="btn-primary">Talk to a branch</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
