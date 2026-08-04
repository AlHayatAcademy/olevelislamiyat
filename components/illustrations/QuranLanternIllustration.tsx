/**
 * Original, hand-authored abstract illustration for the homepage hero:
 * an open book on a low stand beside a lantern, with a flat mosque-skyline
 * silhouette in the background. Warm gold/cream/green brand palette,
 * geometric-flat style — no photography, no figurative or religious
 * imagery, consistent with the site's other illustration components.
 */
export function QuranLanternIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 360"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="qli-glow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#E6C875" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E6C875" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="qli-lantern" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E6C875" />
          <stop offset="100%" stopColor="#C89B3C" />
        </linearGradient>
      </defs>

      <circle cx="240" cy="210" r="170" fill="url(#qli-glow)" />

      {/* Mosque-skyline silhouette, background */}
      <g fill="#FFFFFF" opacity="0.07">
        <rect x="20" y="230" width="440" height="70" />
        <rect x="60" y="190" width="34" height="40" />
        <circle cx="77" cy="182" r="17" />
        <rect x="140" y="160" width="40" height="70" />
        <path d="M140 160 Q160 120 180 160 Z" />
        <rect x="156" y="120" width="8" height="30" />
        <rect x="300" y="170" width="40" height="60" />
        <path d="M300 170 Q320 132 340 170 Z" />
        <rect x="390" y="195" width="30" height="35" />
        <circle cx="405" cy="188" r="14" />
      </g>

      {/* Qur'an stand (rihal) */}
      <g transform="translate(120 210)">
        <path d="M0 60 L90 90 L180 60 L180 72 L90 102 L0 72 Z" fill="#0B2A1E" opacity="0.9" />
        <path d="M30 60 L90 40 L150 60 L90 80 Z" fill="#123C2C" />
      </g>

      {/* Open book resting on the stand */}
      <g transform="translate(112 176)">
        <path d="M0 24 L88 0 L88 46 L0 70 Z" fill="#FAF8F2" />
        <path d="M176 24 L88 0 L88 46 L176 70 Z" fill="#F3F0E8" />
        <path d="M0 24 L88 0 L88 46 L0 70 Z" fill="none" stroke="#C89B3C" strokeWidth="2" strokeLinejoin="round" />
        <path d="M176 24 L88 0 L88 46 L176 70 Z" fill="none" stroke="#C89B3C" strokeWidth="2" strokeLinejoin="round" />
        {[10, 22, 34, 46].map((y) => (
          <line key={`l${y}`} x1={14} y1={y + 8} x2={78} y2={y} stroke="#C89B3C" strokeWidth="1" opacity="0.55" />
        ))}
        {[10, 22, 34, 46].map((y) => (
          <line key={`r${y}`} x1={98} y1={y} x2={162} y2={y + 8} stroke="#C89B3C" strokeWidth="1" opacity="0.55" />
        ))}
      </g>

      {/* Lantern */}
      <g transform="translate(320 130)">
        <path d="M20 0 L40 0 L40 10 L20 10 Z" fill="#C89B3C" />
        <path d="M14 10 L46 10 L38 30 L22 30 Z" fill="url(#qli-lantern)" />
        <rect x="10" y="30" width="40" height="60" rx="6" fill="url(#qli-lantern)" />
        <rect x="16" y="38" width="28" height="44" rx="3" fill="#123C2C" opacity="0.85" />
        <circle cx="30" cy="60" r="9" fill="#E6C875" opacity="0.9" />
        <path d="M14 90 L46 90 L38 110 L22 110 Z" fill="url(#qli-lantern)" />
        <rect x="24" y="110" width="12" height="10" fill="#C89B3C" />
        {/* warm light glow */}
        <circle cx="30" cy="60" r="30" fill="#E6C875" opacity="0.18" />
      </g>

      {/* subtle geometric accent */}
      <g transform="translate(410 250)" stroke="#E6C875" strokeWidth="1.2" fill="none" opacity="0.5">
        <rect x="-14" y="-14" width="28" height="28" transform="rotate(0)" />
        <rect x="-14" y="-14" width="28" height="28" transform="rotate(45)" />
      </g>
    </svg>
  );
}
