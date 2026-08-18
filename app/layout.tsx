import type { Metadata, Viewport } from 'next';
import { Literata, Public_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import MotionGate from '@/components/motion/MotionGate';
import './globals.css';

/**
 * Both faces are downloaded and self-hosted at build time by next/font, so the
 * static export makes zero third-party requests and there is no FOIT on a slow
 * mobile connection.
 */
const display = Literata({
  subsets: ['latin'],
  display: 'swap',
  // 600 is the only display weight the design uses; loading 500/700 shipped two
  // extra files that were preloaded and never painted.
  weight: ['600'],
  variable: '--font-display',
  fallback: ['Georgia', 'Cambria', 'serif'],
  adjustFontFallback: true,
});

const sans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.umurimofinance.com'),
  title: {
    default: 'Umurimo Finance | Savings, credit & banking services',
    template: '%s | Umurimo Finance',
  },
  description:
    'Umurimo Finance Plc — integrated savings, credit, *182*4*2# and digital solutions. Transact at a branch or on your phone.',
  icons: { icon: '/assets/images/logo/umurimo-favicon.png' },
  openGraph: {
    type: 'website',
    siteName: 'Umurimo Finance',
    images: ['/assets/images/logo/umurimo-logo-blue.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A1E42',
  colorScheme: 'light',
};

/**
 * Marks the document as JS-capable before first paint. Scroll-reveal only hides
 * content when this flag is present, so a blocked or failed bundle degrades to a
 * fully readable page instead of a blank one. The timeout is the second belt: if
 * React never hydrates, the gate is lifted and everything shows.
 */
const JS_FLAG = `(function(){var d=document.documentElement;d.dataset.js='on';
setTimeout(function(){if(d.dataset.hydrated!=='1')d.dataset.js='off'},3000)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      // The inline script below stamps data-js before React hydrates; that attribute
      // is ours, not React's, so hydration must be told to leave it alone.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-field focus:bg-white focus:px-5 focus:py-3 focus:text-btn focus:text-brand-navy focus:shadow-lift"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <MotionGate />
      </body>
    </html>
  );
}
