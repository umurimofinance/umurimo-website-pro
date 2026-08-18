/**
 * Purpose-drawn icon set for Umurimo's loan lines and channels.
 *
 * Replaces the LineIcons webfont the template shipped with (5 font files, none
 * of them actually referenced). These are inline SVG on a single 24px grid with
 * one stroke language — 1.6 width, round caps, no fills — so a row of them reads
 * as one family rather than clip-art.
 */
export type IconName =
  | 'commerce' | 'transport' | 'contingency' | 'agriculture'
  | 'livestock' | 'ordinary' | 'salary' | 'fishing'
  | 'deposit' | 'current' | 'mobile' | 'ekash' | 'ussd' | 'location'
  | 'apply' | 'assess' | 'sign' | 'disburse' | 'repay';

const paths: Record<IconName, React.ReactNode> = {
  // ---- Loan lines -------------------------------------------------------
  commerce: ( // market stall
    <>
      <path d="M3.5 9.5 5 4.5h14l1.5 5" />
      <path d="M3.5 9.5a2.2 2.2 0 0 0 4.15 0 2.2 2.2 0 0 0 4.15 0 2.2 2.2 0 0 0 4.15 0 2.2 2.2 0 0 0 4.15 0" />
      <path d="M5 11.4V19.5h14v-8.1" />
      <path d="M9.5 19.5v-4.6h5v4.6" />
    </>
  ),
  transport: ( // goods truck
    <>
      <path d="M2.75 6.5h10.5v9.25H2.75z" />
      <path d="M13.25 9.75h3.6l3.4 3.3v2.7h-7z" />
      <circle cx="7" cy="18" r="1.85" />
      <circle cx="16.75" cy="18" r="1.85" />
      <path d="M8.85 18h6.05M2.75 15.75h2.4" />
    </>
  ),
  contingency: ( // shield + lifeline
    <>
      <path d="M12 3.25 4.75 6.2v5.35c0 4.05 2.9 7.5 7.25 9.2 4.35-1.7 7.25-5.15 7.25-9.2V6.2z" />
      <path d="M12 9v6M9 12h6" />
    </>
  ),
  agriculture: ( // sprout over furrows
    <>
      <path d="M12 20V10.5" />
      <path d="M12 12.5c-3 0-4.75-1.75-4.75-4.75C10.25 7.75 12 9.5 12 12.5z" />
      <path d="M12 11c0-3 1.75-4.75 4.75-4.75C16.75 9.25 15 11 12 11z" />
      <path d="M4 20h16" />
    </>
  ),
  livestock: ( // cow head
    <>
      <path d="M4.5 5.5c2.4 0 3.6 1.2 4.1 2.6M19.5 5.5c-2.4 0-3.6 1.2-4.1 2.6" />
      <path d="M8.6 8.1h6.8a3 3 0 0 1 3 3v1.6a6.4 6.4 0 0 1-12.8 0v-1.6a3 3 0 0 1 3-3z" />
      <path d="M9.75 12.4h.01M14.25 12.4h.01" />
      <path d="M10.5 16.75h3" />
    </>
  ),
  ordinary: ( // signed document
    <>
      <path d="M6 3.25h8.5L18.5 7v13.75h-12.5z" />
      <path d="M14.25 3.4V7.1h3.9" />
      <path d="M8.75 12h6.5M8.75 15.5h4.25" />
    </>
  ),
  salary: ( // payslip with figure
    <>
      <path d="M3.5 6.25h17v11.5h-17z" />
      <circle cx="9" cy="12" r="2.35" />
      <path d="M15.25 10.25h2.5M15.25 13.75h2.5" />
    </>
  ),
  fishing: ( // fish over water
    <>
      <path d="M3.5 11.75c3.2-4 8.6-4 12.1 0-3.5 4-8.9 4-12.1 0z" />
      <path d="M15.6 11.75 20.5 8v7.5z" />
      <path d="M7.2 10.3h.01" />
      <path d="M3 19c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0" />
    </>
  ),

  // ---- Deposits & channels ---------------------------------------------
  deposit: ( // coins into a vault slot
    <>
      <ellipse cx="12" cy="6.5" rx="6.5" ry="2.5" />
      <path d="M5.5 6.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" />
      <path d="M5.5 11.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" />
    </>
  ),
  current: ( // account card
    <>
      <path d="M2.75 5.75h18.5v12.5H2.75z" />
      <path d="M2.75 9.75h18.5" />
      <path d="M6 14.5h4M15 14.5h3" />
    </>
  ),
  mobile: ( // handset
    <>
      <path d="M7.25 2.75h9.5v18.5h-9.5z" />
      <path d="M10.5 5.5h3M10.75 18.4h2.5" />
      <path d="M9.75 9.5h4.5M9.75 12.5h4.5" />
    </>
  ),
  ekash: ( // wallet with outgoing arrow
    <>
      <path d="M3.25 6.75h14.5v12.5H3.25z" />
      <path d="M3.25 6.75 15 3.25v3.5" />
      <path d="M14 13h4.25" />
      <path d="M16.75 11.25 18.75 13l-2 1.75" />
    </>
  ),
  location: ( // map pin
    <>
      <path d="M12 21.25c4.2-4.1 6.3-7.55 6.3-10.35a6.3 6.3 0 1 0-12.6 0c0 2.8 2.1 6.25 6.3 10.35z" />
      <circle cx="12" cy="10.6" r="2.5" />
    </>
  ),
  ussd: ( // keypad
    <>
      <path d="M4.5 3.75h15v16.5h-15z" />
      <path d="M8.5 8h.01M12 8h.01M15.5 8h.01M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
    </>
  ),

  // ---- How it works ------------------------------------------------------
  apply: (
    <>
      <path d="M5.75 3.75h9L18.25 7.5v12.75H5.75z" />
      <path d="M14.5 3.9V7.6h3.65" />
      <path d="M9 13h6M9 16.25h3.5" />
    </>
  ),
  assess: (
    <>
      <circle cx="10.75" cy="10.75" r="6.5" />
      <path d="M15.5 15.5 20.25 20.25" />
      <path d="M8 11.25l2 2 3.5-4" />
    </>
  ),
  sign: (
    <>
      <path d="M3.5 19.5c2.5 0 3-2.5 4.5-7.5s3-6.5 4-6.5 1.4 1 1 3c-.6 3-3.5 6-6.5 7.5" />
      <path d="M13 14.5c1.5 0 2.5 1.5 4 1.5s2.5-1 3.5-2" />
    </>
  ),
  disburse: (
    <>
      <path d="M8.25 2.75h7.5v18.5h-7.5z" />
      <path d="M12 7.25v7" />
      <path d="M9.5 11.75 12 14.25l2.5-2.5" />
      <path d="M10.75 18.5h2.5" />
    </>
  ),
  repay: (
    <>
      <path d="M20.25 12a8.25 8.25 0 1 1-2.6-6" />
      <path d="M20.5 3.5v4.25h-4.25" />
      <path d="M12 8.25v4.25l2.75 1.6" />
    </>
  ),
};

export default function Icon({
  name,
  className = 'h-6 w-6',
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
