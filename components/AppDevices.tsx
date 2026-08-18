import Image from 'next/image';

/**
 * The app, shown in a bezel drawn in CSS rather than a baked-in mockup image.
 *
 * Two reasons for the CSS frame: the screenshots stay swappable when the app UI
 * changes, and they stay crisp at any device pixel ratio instead of being resampled
 * twice. Source shots are 540x1044 (WhatsApp already downsized them, and the
 * Android gesture bar is cropped off).
 *
 * Sizing note: the cluster is capped well below its grid column on purpose. The
 * back phone is rotated, so its corners need ~20px of horizontal slack or the
 * hero's overflow-hidden clips them. 1024px is the tightest case.
 */
function PhoneFrame({
  src,
  alt,
  priority = false,
  recede = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  /** Scrim the screen so a partly-hidden device reads as depth, not as text to read. */
  recede?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2.1rem] border-[7px] border-[#061127] bg-[#061127] shadow-lift ring-1 ring-white/20">
      <Image
        src={src}
        alt={alt}
        width={540}
        height={1044}
        priority={priority}
        sizes="(max-width: 1280px) 26vw, 320px"
        className="block h-auto w-full"
      />
      {recede ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-brand-deep/70 via-brand-deep/45 to-brand-deep/20"
        />
      ) : null}
    </div>
  );
}

export default function AppDevices() {
  return (
    <div className="relative mx-auto w-full max-w-[400px] xl:max-w-[500px]">
      {/* Soft glow so the devices separate from the gradient behind them. */}
      <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-brand-cyan/10 blur-3xl" />

      {/* Behind: sign-in, because it carries the "available in Rwanda, MTN or
          Airtel" signal. Decorative here — the dashboard alt text describes the app. */}
      <div className="absolute right-[3%] top-10 z-0 w-[54%] rotate-[5deg]">
        <PhoneFrame src="/assets/images/app/app-signin.webp" alt="" recede />
      </div>

      {/* Front: the dashboard. This is the LCP image on desktop, hence priority. */}
      <div className="relative z-10 w-[64%] -rotate-[2deg]">
        <PhoneFrame
          src="/assets/images/app/app-dashboard.webp"
          alt="The Umurimo Finance app home screen, showing an approved loan limit and shortcuts to pay or request a loan."
          priority
        />
      </div>
    </div>
  );
}
