import type { Metadata } from 'next';
import Link from 'next/link';
import Icon, { type IconName } from '@/components/Icon';
import Reveal from '@/components/motion/Reveal';
import Counter from '@/components/motion/Counter';
import { PageHero } from '@/components/Section';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Umurimo Finance is a regulated microfinance institution focused on inclusive savings, responsible lending and practical payment rails.',
};

const paragraphs = [
  'Umurimo Finance is a regulated microfinance institution focused on inclusive savings, responsible lending and practical payment rails — through branch service, *182*4*2# and digital channels such as mobile banking and eKash where offered.',
  'We focus on closing the financing gap for individuals, cooperatives and small to medium enterprises through accessible loan services that support trade, agriculture, transport and other productive sectors.',
  'Our headquarters are in Kamembe, Rusizi, with service points in Kagano Sector, Karengera Sector, Macuba and Bushenge, so customers can apply, follow up and manage loans closer to where they live and work.',
];

const governance = [
  'We serve Rwanda under the statutes and supervisory framework that apply to microfinance institutions authorised to operate locally. Verified licence numbers and supervisory notices are communicated only via official Umurimo correspondence — not through social scraping or impersonation URLs.',
  'Governance packs and audited reports are likewise furnished only on lawful, documented request via those official channels. Never rely on an unsolicited link asking for passwords or one-time codes.',
];

const branches = [
  { name: 'Kamembe, Rusizi', role: 'Head office' },
  { name: 'Kagano Sector', role: 'Service point' },
  { name: 'Karengera Sector', role: 'Service point' },
  { name: 'Macuba', role: 'Service point' },
  { name: 'Bushenge', role: 'Service point' },
];

const officialChannels: { icon: IconName; k: string; v: string; href?: string }[] = [
  { icon: 'ekash', k: 'Email', v: 'info@umurimofinance.com', href: 'mailto:info@umurimofinance.com' },
  { icon: 'mobile', k: 'Phone', v: '+250 783 838 194', href: 'tel:+250783838194' },
  { icon: 'ussd', k: 'USSD', v: '*182*4*2#' },
  { icon: 'location', k: 'Head office', v: 'Amahoro, Kamashangi, Kamembe, Rusizi' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Umurimo Finance"
        lede="Inclusive savings, responsible lending and payment rails that work at a branch counter or on a phone."
      />

      <section className="py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <span className="eyebrow">Who we are</span>
            <h2 className="h-section">Built around the customers we serve</h2>
            <div className="mt-6 max-w-prose space-y-5">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 28)} className="text-body-lg text-ink-soft">{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} variant="scale">
            <aside className="card h-fit bg-surface-paper">
              <h2 className="flex items-center gap-2.5 font-sans text-label uppercase text-brand-blue">
                <Icon name="location" className="h-4 w-4" strokeWidth={1.8} />
                Where to find us
              </h2>

              <p className="mt-5 font-display text-stat font-semibold text-brand-deep">
                <Counter to={5} />
                <span className="ml-2 align-middle font-sans text-[0.9375rem] font-medium text-ink-muted">
                  service points
                </span>
              </p>

              <ul className="mt-6 divide-y divide-line border-y border-line">
                {branches.map((b) => (
                  <li key={b.name} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="text-[0.9375rem] font-medium text-ink">{b.name}</span>
                    <span className="shrink-0 text-[0.8125rem] text-ink-muted">{b.role}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact/" className="btn-outline mt-7 w-full">Contact us</Link>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-sunken py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Governance</span>
              <h2 className="h-section">Regulation and official channels</h2>
              <div className="mt-6 max-w-prose space-y-5">
                {governance.map((p) => (
                  <p key={p.slice(0, 28)} className="text-body-lg text-ink-soft">{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="mt-9 flex flex-wrap gap-3">
              <Link href="/loans/" className="btn-primary">Our loan lines</Link>
              <Link href="/contact/" className="btn-outline">Contact us</Link>
            </Reveal>
          </div>

          {/* The section is about which channels are genuinely ours, so name them
              here rather than leaving the column empty. */}
          <Reveal delay={140} variant="scale">
            <aside className="card h-fit">
              <h2 className="font-sans text-label uppercase text-brand-blue">Our official channels</h2>
              <dl className="mt-5 divide-y divide-line border-y border-line">
                {officialChannels.map((c) => (
                  <div key={c.k} className="flex items-center gap-3 py-3.5">
                    <Icon name={c.icon} className="h-[18px] w-[18px] shrink-0 text-brand-navy" strokeWidth={1.7} />
                    <dt className="sr-only">{c.k}</dt>
                    <dd className="text-[0.9375rem] text-ink">
                      {c.href ? (
                        <a href={c.href} className="font-medium transition-colors hover:text-brand-navy">{c.v}</a>
                      ) : (
                        c.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 flex items-start gap-2.5 rounded-field bg-caution-soft p-3.5 text-[0.9375rem] leading-relaxed text-ink">
                <Icon name="contingency" className="mt-0.5 h-5 w-5 shrink-0 text-caution" strokeWidth={1.7} />
                <span>
                  We will never ask for your PIN, password or one-time code. Anyone who does is not Umurimo.
                </span>
              </p>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
