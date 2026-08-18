import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Icon, { type IconName } from '@/components/Icon';
import Reveal from '@/components/motion/Reveal';
import { PageHero } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Speak to Umurimo Finance — branch address, phone, email and how to reach customer support.',
};

const details: { icon: IconName; t: string; lines: string[]; href?: string }[] = [
  { icon: 'ordinary', t: 'Postal', lines: ['Amahoro, Kamashangi,', 'Kamembe, Rusizi'] },
  { icon: 'assess', t: 'GPS', lines: ['GWF5+PQQ Cyangugu', '2°28′32.4″S 28°54′34.1″E'] },
  { icon: 'mobile', t: 'Phone', lines: ['+250 783 838 194'], href: 'tel:+250783838194' },
  { icon: 'ekash', t: 'Email', lines: ['info@umurimofinance.com'], href: 'mailto:info@umurimofinance.com' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Umurimo Finance" lede="Speak to us — we are here to help." />

      <section className="py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <span className="eyebrow">Hello</span>
            <h2 className="h-section">Speak to us</h2>
            <p className="lede">
              Head office is in Kamembe, Rusizi. Service points at Kagano, Karengera, Macuba and Bushenge can help
              with applications and follow-ups.
            </p>

            <dl className="mt-9 space-y-5">
              {details.map((d) => (
                <div key={d.t} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-field bg-brand-50 text-brand-navy">
                    <Icon name={d.icon} className="h-[21px] w-[21px]" />
                  </span>
                  <div>
                    <dt className="text-label uppercase text-brand-blue">{d.t}</dt>
                    <dd className="mt-1 space-y-0.5 text-body-lg text-ink-soft">
                      {d.href ? (
                        <a href={d.href} className="font-medium text-ink transition-colors hover:text-brand-navy">
                          {d.lines[0]}
                        </a>
                      ) : (
                        d.lines.map((l) => <p key={l}>{l}</p>)
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} variant="scale">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-sunken py-16 lg:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-h2 font-semibold text-brand-deep">Head office on the map</h2>
            <p className="lede">Amahoro, Kamashangi, Kamembe, Rusizi.</p>
            <div className="mt-7 overflow-hidden rounded-card border border-line shadow-card">
              <iframe
                title="Umurimo Finance headquarters location"
                src="https://www.google.com/maps?q=GWF5%2BPQQ%20Cyangugu&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[400px] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
