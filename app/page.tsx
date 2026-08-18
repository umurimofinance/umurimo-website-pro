import Link from 'next/link';
import Icon, { type IconName } from '@/components/Icon';
import Estimator from '@/components/Estimator';
import AppDevices from '@/components/AppDevices';
import Reveal from '@/components/motion/Reveal';
import Counter from '@/components/motion/Counter';
import { SectionHeading, HeroWash } from '@/components/Section';

const products: { icon: IconName; tag: string; title: string; blurb: string; items: string[]; href: string; featured?: boolean }[] = [
  {
    icon: 'commerce',
    tag: 'Credit',
    title: 'Loans',
    blurb: 'Eight credit lines organised by what you are actually borrowing for.',
    items: ['Commerce, transport, agriculture', 'Livestock, fishing, salary', 'Contingency and ordinary'],
    href: '/loans/',
    featured: true,
  },
  {
    icon: 'deposit',
    tag: 'Deposit',
    title: 'Savings',
    blurb: 'Deposit options for households and businesses building a buffer.',
    items: ['Term deposit account', 'Current account'],
    href: '/loans/#savings',
  },
  {
    icon: 'mobile',
    tag: 'Digital',
    title: 'Digital banking',
    blurb: 'Balances, transfers and payments without joining a queue.',
    items: ['Mobile banking', 'eKash payment'],
    href: '/#digital',
  },
  {
    icon: 'ussd',
    tag: 'Any phone',
    title: 'Phone banking',
    blurb: 'Works on a basic handset — no smartphone, no data bundle.',
    items: ['*182*4*2#', 'Push & pull transfers'],
    href: '/contact/',
  },
];

const steps: { icon: IconName; t: string; d: string }[] = [
  { icon: 'apply', t: 'Apply', d: 'Start in the app or at any of our five service points with your ID and the details of what you need.' },
  { icon: 'assess', t: 'We assess', d: 'We look at your repayment capacity and the purpose of the loan, then come back to you with a decision.' },
  { icon: 'sign', t: 'You sign', d: 'Your offer and amortisation schedule spell out every figure — amount, interest, fees, insurance, dates.' },
  { icon: 'disburse', t: 'We disburse', d: 'Approved funds are sent to your mobile money account, so you can use them the same day.' },
  { icon: 'repay', t: 'You repay', d: 'Pay each instalment from your phone on *182*4*2# or in the app, and watch the balance come down.' },
];

// Counted from what this site actually publishes. Replace with audited
// disbursement or customer figures only once Finance signs them off.
const stats = [
  { n: 5, label: 'Service points in Rusizi and Nyamasheke', suffix: '' },
  { n: 8, label: 'Loan lines, matched to how you earn', suffix: '' },
  { n: 2, label: 'Deposit accounts to save into', suffix: '' },
];

const channels: { icon: IconName; t: string; d: string }[] = [
  { icon: 'mobile', t: 'Mobile banking', d: 'Check balances, move money and see every instalment you have paid, from the handset in your pocket.' },
  { icon: 'ekash', t: 'eKash payment', d: 'Send and receive payments against your account, linked to the wallet you already use every day.' },
  { icon: 'ussd', t: '*182*4*2#', d: 'The same core services on any phone at all — no smartphone and no internet connection required.' },
];

const faqs = [
  {
    q: 'What do I need to become a customer?',
    a: 'Your ID, proof of address and our account form. Registered businesses and cooperatives also bring their registry documents and the list of signatories. Any branch will give you the full checklist.',
  },
  {
    q: 'Can I open an account online?',
    a: 'You can start the process digitally. Some steps still have to be completed in person because the regulator requires them — we will tell you exactly which ones before you travel.',
  },
  {
    q: 'How do I know what a loan will really cost me?',
    a: 'Every figure that binds you is on your signed offer and amortisation schedule — amount, interest, fees, insurance and dates. Anything on this website is an illustration, never a quote.',
  },
  {
    q: 'Will Umurimo ever ask me for my PIN?',
    a: 'No. We will never ask for your PIN, password or one-time code — not by phone, not by SMS and not by email. If someone does, they are not us.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============================== Hero ============================== */}
      <section className="relative overflow-hidden bg-brand-gradient pt-28 pb-20 sm:pt-40 sm:pb-28 xl:pt-32 xl:pb-20">
        <HeroWash />

        <div className="container-page relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] xl:grid-cols-[1fr_1.05fr]">
            <div className="max-w-3xl">
              <p className="animate-sweep-in inline-flex items-center gap-2 rounded-pill border border-white/25 bg-white/10 px-4 py-1.5 text-label uppercase text-white/90 backdrop-blur-sm">
                Kamembe &middot; Rusizi &middot; Rwanda
              </p>

              <h1 className="animate-rise-in h-hero mt-6 text-white [animation-delay:80ms]">
                Money that moves at the speed of your work
              </h1>

              <p className="animate-rise-in text-lede-lg mt-6 max-w-2xl text-white/85 [animation-delay:170ms]">
                Savings, credit and payments built around how people here actually earn — seasonal harvests,
                trading days, monthly payroll. Bank at a counter, on a smartphone, or on any handset with{' '}
                <span className="whitespace-nowrap font-semibold text-white">*182*4*2#</span>.
              </p>

              <div className="animate-rise-in mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:260ms]">
                <Link href="#estimate" className="btn-onbrand">
                  See what a month costs
                </Link>
                <Link href="/loans/" className="btn-ghost">
                  Browse loan lines
                </Link>
              </div>
            </div>

            {/* Only shown at lg, where the two-column layout gives it a real
                column. Below that the hero is single-column, so a stacked device
                cluster would push the CTAs and stats a long way down — and the
                reader is already holding the phone. It also keeps LCP on the
                headline (text) for every small screen. */}
            <div className="animate-rise-in hidden lg:block [animation-delay:320ms]">
              <AppDevices />
            </div>
          </div>

          {/* Stats read as facts about the institution, not marketing. */}
          <div className="animate-rise-in mt-14 grid gap-px overflow-hidden rounded-card border border-white/15 bg-white/15 sm:grid-cols-3 xl:mt-10 [animation-delay:340ms]">
            {stats.map((s) => (
              <div key={s.label} className="bg-brand-deep/35 p-6 backdrop-blur-sm">
                <p className="font-display text-stat font-semibold text-white">
                  <Counter to={s.n} />
                  {s.suffix}
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-snug text-white/75">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rule-brand absolute inset-x-0 bottom-0" />
      </section>

      {/* ============================ Products ============================ */}
      <section id="products" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we offer"
            title="Four ways to bank with us"
            lede="Pick the one that fits how you earn and how you like to transact."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.title} as="article" delay={i * 70} className="h-full">
                <Link
                  href={p.href}
                  className={`card-hover group flex h-full flex-col focus-ring-none focus-visible:border-brand-navy focus-visible:shadow-[0_0_0_3px_rgba(23,64,166,.18)] ${
                    p.featured ? 'border-brand-200 bg-brand-50/50' : ''
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-field bg-brand-navy text-white transition-transform duration-200 ease-entrance group-hover:scale-105">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>

                  <span className="mt-5 block text-label uppercase text-brand-blue">{p.tag}</span>
                  <h3 className="mt-1.5 font-display text-h3-lg font-semibold text-brand-deep">{p.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{p.blurb}</p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
                        <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-pill bg-brand-bright" />
                        {it}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-btn text-brand-navy">
                    Learn more
                    <span aria-hidden="true" className="transition-transform duration-200 ease-entrance group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== Signature: estimator ====================== */}
      <section id="estimate" className="scroll-mt-24 bg-surface-sunken py-20 lg:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="eyebrow-plain">Know before you owe</span>
              <h2 className="h-section">See the whole cost, before anyone asks for a signature</h2>
              <p className="lede">
                Most people find out what a loan really costs after they have already committed. Move the sliders
                and see the monthly instalment, the total, and how much of it is the cost of credit.
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">
                Set the rate to whatever your loan officer quoted you. We deliberately do not fill one in — a rate on
                a marketing page is not a rate you have been offered.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} variant="scale" className="mt-12">
            <Estimator />
          </Reveal>
        </div>
      </section>

      {/* =========================== How it works ========================= */}
      <section id="how" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="Five steps, start to finish"
            lede="The same process whether you begin in a branch or on your phone."
          />

          <ol className="relative mt-14 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            {/* Connector rail, desktop only — fades at both ends so it reads as
                intentional at any container width. */}
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent lg:block"
            />
            {steps.map((s, i) => (
              <Reveal key={s.t} as="li" delay={i * 90} className="relative">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-pill border border-line bg-white text-brand-navy shadow-card">
                  <Icon name={s.icon} className="h-[22px] w-[22px]" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-pill bg-brand-navy text-[11px] font-semibold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 font-display text-h3 font-semibold text-brand-deep">{s.t}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{s.d}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200} className="mt-14 text-center">
            <Link href="/contact/" className="btn-primary">
              Start an application
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================= Digital ============================ */}
      <section id="digital" className="relative scroll-mt-24 bg-brand-deep py-20 text-white lg:py-28">
        <div className="rule-brand absolute inset-x-0 top-0" aria-hidden="true" />
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Channels</span>
            <h2 className="mt-3 font-display text-h2 font-semibold text-white lg:text-h2-lg">
              Whatever phone you have, it works
            </h2>
            <p className="text-lede-lg mt-4 text-white/75">
              A smartphone is not a requirement for banking with us. Every core service is reachable from a basic
              handset.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <div className="group h-full rounded-card border border-white/12 bg-white/[0.06] p-7 transition-[background-color,border-color,transform] duration-200 ease-entrance hover:-translate-y-1 hover:border-brand-cyan/40 hover:bg-white/[0.1]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-field bg-brand-cyan/15 text-brand-cyan">
                    <Icon name={c.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-h3-lg font-semibold text-white">{c.t}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/70">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =============================== FAQ ============================== */}
      <section id="faq" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title="What people ask us first" />

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

      {/* ============================= Contact ============================ */}
      <section className="bg-surface-sunken py-20 lg:py-24">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-card border border-line bg-white shadow-card">
            <div className="rule-brand" />
            <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_auto] lg:items-center lg:p-12">
              <div>
                <span className="eyebrow">Come and see us</span>
                <h2 className="mt-3 font-display text-h2 font-semibold text-brand-deep">
                  There is a desk near you
                </h2>
                <p className="lede">
                  Head office in Kamembe, Rusizi, with service points at Kagano, Karengera, Macuba and Bushenge.
                  Bring your ID and we will take it from there.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
                  <a href="tel:+250783838194" className="font-semibold text-brand-blue hover:text-brand-navy">
                    +250 783 838 194
                  </a>
                  <a href="mailto:info@umurimofinance.com" className="font-semibold text-brand-blue hover:text-brand-navy">
                    info@umurimofinance.com
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/contact/" className="btn-primary">Contact us</Link>
                <Link href="/about/" className="btn-outline">About Umurimo</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
