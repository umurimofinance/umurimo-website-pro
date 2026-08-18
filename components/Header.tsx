'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const products = [
  { label: 'Loans & credit', href: '/loans/', hint: 'Eight lines, by purpose' },
  { label: 'Savings & deposits', href: '/loans/#savings', hint: 'Term and current accounts' },
  { label: 'Digital banking', href: '/#digital', hint: 'Mobile, eKash, *182*4*2#' },
  { label: 'Charges & fees', href: '/pricing/', hint: 'How costs are disclosed' },
];

const primary = [
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const pathname = usePathname();
  const subRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setOpen(false);
    setSubOpen(false);
  }, [pathname]);

  // Escape closes; click-away closes the dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setSubOpen(false);
      setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (subRef.current && !subRef.current.contains(e.target as Node)) setSubOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, []);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const solid = stuck || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-entrance ${
        solid ? 'bg-white/92 shadow-card backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <Link href="/" aria-label="Umurimo Finance — home" className="shrink-0 rounded">
          <Image
            src={solid ? '/assets/images/logo/umurimo-logo-blue.png' : '/assets/images/logo/umurimo-logo-white.png'}
            alt="Umurimo Finance"
            width={420}
            height={199}
            priority
            className="h-[44px] w-auto transition-opacity duration-300 sm:h-[54px]"
          />
        </Link>

        {/* ------------------------------- Desktop ------------------------------- */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <TopLink href="/" label="Home" solid={solid} active={pathname === '/'} />

            <li ref={subRef} className="relative">
              <button
                type="button"
                onClick={() => setSubOpen((v) => !v)}
                aria-expanded={subOpen}
                aria-haspopup="true"
                className={`${topLinkCls(solid, pathname.startsWith('/loans') || pathname.startsWith('/pricing'))} gap-1.5`}
              >
                Products
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                  className={`transition-transform duration-200 ${subOpen ? 'rotate-180' : ''}`}>
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <div
                className={`absolute left-0 top-full w-[19rem] origin-top-left pt-3 transition-[opacity,transform] duration-200 ease-entrance ${
                  subOpen ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-1'
                }`}
              >
                <ul className="overflow-hidden rounded-card border border-line bg-white p-2 shadow-lift">
                  {products.map((p) => (
                    <li key={p.label}>
                      <Link
                        href={p.href}
                        tabIndex={subOpen ? 0 : -1}
                        className="block rounded-field px-3.5 py-2.5 transition-colors duration-150 hover:bg-brand-50"
                      >
                        <span className="block text-[0.9375rem] font-semibold text-ink">{p.label}</span>
                        <span className="mt-0.5 block text-[0.8125rem] text-ink-muted">{p.hint}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {primary.map((l) => (
              <TopLink key={l.href} {...l} solid={solid} active={pathname === l.href} />
            ))}

            <li className="ml-3">
              <a href="https://app.umurimofinance.com/" className={solid ? 'btn-accent' : 'btn-onbrand'}>
                Open the app
              </a>
            </li>
          </ul>
        </nav>

        {/* ------------------------------- Toggle -------------------------------- */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-field lg:hidden"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-[2px] w-6 rounded-pill transition-all duration-300 ease-entrance ${
                solid ? 'bg-brand-deep' : 'bg-white'
              } ${open && i === 0 ? 'translate-y-[7px] rotate-45' : ''} ${open && i === 1 ? 'scale-x-0 opacity-0' : ''} ${
                open && i === 2 ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          ))}
        </button>
      </div>

      {/* -------------------------------- Mobile -------------------------------- */}
      <div
        id="mobile-nav"
        // The border and background only exist while open — otherwise the closed
        // drawer painted a 1px line across the transparent header over the hero.
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-entrance lg:hidden ${
          open
            ? 'max-h-[80vh] overflow-y-auto border-t border-line bg-white opacity-100'
            : 'max-h-0 border-t-0 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="container-page py-5">
          <ul className="space-y-1">
            <MobileLink href="/" label="Home" active={pathname === '/'} />
            <li className="pt-3">
              <p className="px-1 pb-1 text-label uppercase text-ink-muted">Products</p>
              <ul className="space-y-1">
                {products.map((p) => (
                  <MobileLink key={p.label} href={p.href} label={p.label} hint={p.hint} active={false} />
                ))}
              </ul>
            </li>
            <li className="pt-3">
              <ul className="space-y-1">
                {primary.map((l) => (
                  <MobileLink key={l.href} {...l} active={pathname === l.href} />
                ))}
              </ul>
            </li>
          </ul>
          <a href="https://app.umurimofinance.com/" className="btn-accent mt-5 w-full">
            Open the app
          </a>
        </nav>
      </div>
    </header>
  );
}

/* Underline grows from the left on hover — one small, consistent affordance
   rather than a colour change that is hard to see on the gradient. */
function topLinkCls(solid: boolean, active: boolean) {
  return [
    'relative flex items-center rounded px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-200',
    solid ? 'text-ink hover:text-brand-navy' : 'text-white/85 hover:text-white',
    'after:absolute after:inset-x-3 after:bottom-1 after:h-[2px] after:origin-left after:rounded-pill',
    solid ? 'after:bg-brand-navy' : 'after:bg-white',
    active ? 'after:scale-x-100' : 'after:scale-x-0',
    'after:transition-transform after:duration-200 after:ease-entrance hover:after:scale-x-100',
  ].join(' ');
}

function TopLink({ href, label, solid, active }: { href: string; label: string; solid: boolean; active: boolean }) {
  return (
    <li>
      <Link href={href} className={topLinkCls(solid, active)} aria-current={active ? 'page' : undefined}>
        {label}
      </Link>
    </li>
  );
}

function MobileLink({ href, label, hint, active }: { href: string; label: string; hint?: string; active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        // py-3 keeps the row at a 44px+ touch target.
        className={`block rounded-field px-3 py-3 transition-colors duration-150 ${
          active ? 'bg-brand-50 text-brand-navy' : 'text-ink hover:bg-surface-paper'
        }`}
      >
        <span className="block text-[0.9375rem] font-semibold">{label}</span>
        {hint ? <span className="mt-0.5 block text-[0.8125rem] font-normal text-ink-muted">{hint}</span> : null}
      </Link>
    </li>
  );
}
