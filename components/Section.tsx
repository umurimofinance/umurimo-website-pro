import Reveal from './motion/Reveal';

export function SectionHeading({
  eyebrow,
  title,
  lede,
  center = true,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <span className={center ? 'eyebrow-plain' : 'eyebrow'}>{eyebrow}</span>
      <h2 className="h-section">{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
    </Reveal>
  );
}

/**
 * Shared hero for interior pages. The heading and lede stagger in on load
 * (2 steps, ~470ms total) — one orchestrated entrance, then the page is still.
 */
export function PageHero({ title, lede }: { title: string; lede?: string }) {
  return (
    <section className="relative overflow-hidden bg-brand-gradient pt-32 pb-16 sm:pt-40 sm:pb-20">
      <HeroWash />
      <div className="container-page relative max-w-3xl text-center">
        <h1 className="animate-rise-in text-h1 font-semibold text-white lg:text-[3rem]">{title}</h1>
        {lede ? (
          <p className="animate-rise-in text-lede-lg mt-5 text-white/85 [animation-delay:90ms]">{lede}</p>
        ) : null}
      </div>
      <div className="rule-brand absolute inset-x-0 bottom-0" />
    </section>
  );
}

/**
 * Static depth for the gradient sections — a soft light source plus a faint
 * contour field. Deliberately not animated: nothing should loop behind reading.
 */
export function HeroWash() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-32 -top-40 h-[560px] w-[560px] rounded-full bg-brand-cyan/15 blur-3xl" />
      <div className="absolute -left-40 -bottom-20 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.10]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 400"
        fill="none"
      >
        {/* Contour lines — a nod to Lake Kivu's shoreline, which is where the
            head office actually sits. Cheap, static, no motion. */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M-50 ${120 + i * 46} C 220 ${70 + i * 46}, 420 ${190 + i * 46}, 660 ${140 + i * 46} S 1080 ${60 + i * 46}, 1260 ${130 + i * 46}`}
            stroke="white"
            strokeWidth="1.25"
          />
        ))}
      </svg>
    </div>
  );
}
