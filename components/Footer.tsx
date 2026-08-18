import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';

const columns = [
  {
    title: 'Products',
    links: [
      { label: 'Loans & credit', href: '/loans/' },
      { label: 'Savings & deposits', href: '/loans/#savings' },
      { label: 'Digital banking', href: '/#digital' },
      { label: 'Charges & fees', href: '/pricing/' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact us', href: '/contact/' },
      { label: 'Find a branch', href: '/contact/' },
      { label: 'Report misconduct', href: '/contact/' },
      { label: 'About Umurimo', href: '/about/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy-policy/' },
      { label: 'Data protection', href: '/data-protection-policy/' },
      { label: 'Service charter', href: '/contact/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-brand-deep text-white">
      <div className="rule-brand" />

      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:py-20">
        <div className="lg:pr-10">
          <Link href="/" aria-label="Umurimo Finance — home" className="inline-block rounded">
            <Image
              src="/assets/images/logo/umurimo-logo-white.png"
              alt="Umurimo Finance"
              width={420}
              height={199}
              className="h-14 w-auto"
            />
          </Link>
          <p className="mt-5 text-body text-white/70">
            Savings, credit and payment services for households, cooperatives and small businesses across Rwanda.
          </p>

          <a
            href="https://app.umurimofinance.com/"
            className="group mt-6 inline-flex items-center gap-2 text-btn text-brand-cyan transition-colors duration-200 hover:text-white"
          >
            Open the app
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-entrance group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-sans text-label uppercase text-white/50">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[0.9375rem] text-white/75 transition-colors duration-200 hover:text-brand-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-[0.875rem] text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; {new Date().getFullYear()} Umurimo Finance Plc. All rights reserved.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <span className="flex items-center gap-2">
              <Icon name="ussd" className="h-4 w-4 text-brand-cyan" strokeWidth={1.8} />
              *182*4*2#
            </span>
            <a href="tel:+250783838194" className="transition-colors hover:text-white">
              +250 783 838 194
            </a>
            <span>Amahoro, Kamashangi, Kamembe, Rusizi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
