import Link from 'next/link';
import { HeroWash } from '@/components/Section';

export default function NotFound() {
  return (
    // Dark hero on purpose: the header renders transparent above the fold, so a
    // light background here would leave the white logo invisible.
    <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-brand-gradient pt-32 pb-20">
      <HeroWash />
      <div className="container-page relative max-w-xl text-center">
        <p className="animate-rise-in font-display text-[4.5rem] font-semibold leading-none text-white/35 sm:text-[6rem]">
          404
        </p>
        <h1 className="animate-rise-in mt-4 font-display text-h2 font-semibold text-white lg:text-h2-lg [animation-delay:80ms]">
          We could not find that page
        </h1>
        <p className="animate-rise-in text-lede-lg mt-5 text-white/80 [animation-delay:160ms]">
          It may have moved. Try our loan lines, or get in touch and we will point you the right way.
        </p>
        <div className="animate-rise-in mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row [animation-delay:240ms]">
          <Link href="/" className="btn-onbrand">Back to home</Link>
          <Link href="/contact/" className="btn-ghost">Contact us</Link>
        </div>
      </div>
      <div className="rule-brand absolute inset-x-0 bottom-0" />
    </section>
  );
}
