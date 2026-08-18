import type { Config } from 'tailwindcss';

/**
 * Umurimo Finance design system.
 *
 * Palette is grounded in two real things, not taste:
 *  1. The official logo sheet — sampled at #0A3FAB / #0696F3 / #07E7F5, i.e. the
 *     navy → blue → cyan run that already is the brand.
 *  2. Where the institution actually sits: Kamembe, Rusizi, on Lake Kivu. The logo
 *     gradient reads as deep water to shallow, so the surfaces follow it down.
 * Growth/Caution are Rwanda-flag green and gold, darkened until they pass AA as text.
 *
 * Every colour used for TEXT is >= 4.5:1 on white, paper and sunken. `bright` and
 * `cyan` fail that test (2.76:1 / 1.50:1) and are therefore decorative only —
 * gradients, rules and glyphs on dark. Never set them as a text colour.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1740A6',   // primary — straight off the logo. 9.05:1 on white
          blue: '#0069A8',   // text-safe signal blue. 5.86:1 on white
          bright: '#00A5ED', // logo mid — DECORATIVE ONLY
          cyan: '#00EAEF',   // logo tip — DECORATIVE ONLY
          deep: '#0A1E42',   // deep Kivu — footer, hero base. 16.4:1 on white
          50: '#EFF5FE',
          100: '#DCEAFC',
          200: '#BBD5F8',
          300: '#8AB6F1',
          400: '#5090E4',
          500: '#2A6BD2',
          600: '#1740A6',
          700: '#143791',
          800: '#122E76',
          900: '#0A1E42',
        },
        ink: {
          DEFAULT: '#132238', // body copy. 15.99:1
          soft: '#48566E',    // secondary copy. 7.42:1
          muted: '#5D6E88',   // captions — still AA on sunken (4.55:1)
        },
        line: { DEFAULT: '#DDE6F2', strong: '#C2D2E6' },
        surface: {
          DEFAULT: '#FFFFFF',
          paper: '#F4F7FB',  // default page ground — cool, not cream
          sunken: '#EAF1F9',
        },
        // States: "approved" / "pending" / "declined" on a lender's site.
        grow: { DEFAULT: '#0A7047', soft: '#E3F5EC' },
        caution: { DEFAULT: '#8A6104', soft: '#FBF0DA' },
        stop: { DEFAULT: '#B32036', soft: '#FBE7EA' },
      },

      fontFamily: {
        // Literata: engineered for e-ink and low-quality screens — the exact
        // condition this audience reads in. Display sizes only.
        display: ['var(--font-display)', 'Georgia', 'Cambria', 'serif'],
        // Public Sans: drawn for public-service UI legibility. Body and UI.
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },

      // Explicit scale. Body never drops below 16px — first-time applicants read
      // this on small, bright, low-density screens.
      fontSize: {
        label:   ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
        btn:     ['0.9375rem', { lineHeight: '1',    letterSpacing: '0.01em', fontWeight: '600' }],
        body:    ['1rem',      { lineHeight: '1.7' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.7' }],
        lede:    ['1.0625rem', { lineHeight: '1.65' }],
        'lede-lg': ['1.1875rem', { lineHeight: '1.65' }],
        h3:      ['1.125rem',  { lineHeight: '1.3',  letterSpacing: '-0.005em', fontWeight: '650' }],
        'h3-lg': ['1.25rem',   { lineHeight: '1.3',  letterSpacing: '-0.005em', fontWeight: '650' }],
        h2:      ['1.75rem',   { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h2-lg': ['2.5rem',    { lineHeight: '1.12', letterSpacing: '-0.018em' }],
        h1:      ['2.25rem',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h1-lg': ['3.75rem',   { lineHeight: '1.06', letterSpacing: '-0.024em' }],
        stat:    ['2.5rem',    { lineHeight: '1',    letterSpacing: '-0.02em' }],
        'stat-lg': ['3.5rem',  { lineHeight: '1',    letterSpacing: '-0.025em' }],
      },

      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0A1E42 0%, #1740A6 42%, #0089D6 78%, #00C6E8 100%)',
        'brand-gradient-soft': 'linear-gradient(140deg, #F4F7FB 0%, #E6F2FC 100%)',
        'rule-gradient': 'linear-gradient(90deg, #1740A6 0%, #00A5ED 55%, #00EAEF 100%)',
      },

      // One shared elevation language: same radius family, same shadow ramp.
      borderRadius: { card: '14px', field: '10px', pill: '999px' },
      boxShadow: {
        card: '0 1px 2px rgba(10,30,66,.05), 0 10px 28px -16px rgba(10,30,66,.18)',
        lift: '0 2px 6px rgba(10,30,66,.06), 0 22px 48px -22px rgba(23,64,166,.36)',
        field: 'inset 0 1px 2px rgba(10,30,66,.05)',
      },

      // Full 1% opacity ramp so /12, /45, /92 etc. resolve inside @apply too.
      opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, String(i / 100)])),

      maxWidth: { content: '1180px', prose: '68ch' },

      transitionTimingFunction: {
        // Eased, not bouncy — a bank should not spring.
        entrance: 'cubic-bezier(.22,.61,.36,1)',
      },

      keyframes: {
        'rise-in': { from: { opacity: '0', transform: 'translate3d(0,16px,0)' }, to: { opacity: '1', transform: 'none' } },
        'sweep-in': { from: { opacity: '0', transform: 'translate3d(-12px,0,0)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        'rise-in': 'rise-in .42s cubic-bezier(.22,.61,.36,1) both',
        'sweep-in': 'sweep-in .42s cubic-bezier(.22,.61,.36,1) both',
      },
    },
  },
  plugins: [],
};
export default config;
