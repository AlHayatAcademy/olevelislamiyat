/**
 * Original, hand-authored abstract illustration for the homepage hero:
 * an open-book motif overlaid with an interlocking geometric star pattern.
 * Brand colours only, no photography, no figurative imagery.
 */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 320"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hero-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6C875" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C89B3C" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="150" r="150" fill="url(#hero-glow)" />

      {/* Book base */}
      <g transform="translate(60 150)">
        <path d="M0 20 L140 0 L140 130 L0 150 Z" fill="#FFFFFF" opacity="0.08" />
        <path d="M280 20 L140 0 L140 130 L280 150 Z" fill="#FFFFFF" opacity="0.04" />
        <path
          d="M0 20 L140 0 L140 130 L0 150 Z"
          fill="none"
          stroke="#E6C875"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M280 20 L140 0 L140 130 L280 150 Z"
          fill="none"
          stroke="#E6C875"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* page lines */}
        {[28, 44, 60, 76, 92].map((y) => (
          <line key={`l${y}`} x1="18" y1={y} x2="128" y2={y - 4} stroke="#E6C875" strokeWidth="1" opacity="0.5" />
        ))}
        {[28, 44, 60, 76, 92].map((y) => (
          <line key={`r${y}`} x1="152" y1={y - 4} x2="262" y2={y} stroke="#E6C875" strokeWidth="1" opacity="0.5" />
        ))}
      </g>

      {/* Interlocking 8-point star motif above the book */}
      <g transform="translate(200 80)" stroke="#E6C875" strokeWidth="1.5" fill="none" opacity="0.9">
        <rect x="-26" y="-26" width="52" height="52" transform="rotate(0)" />
        <rect x="-26" y="-26" width="52" height="52" transform="rotate(45)" />
        <circle r="6" fill="#C89B3C" stroke="none" />
      </g>

      {/* small corner accents */}
      <g stroke="#E6C875" strokeWidth="1" opacity="0.5">
        <path d="M40 40 L56 40 L56 56" fill="none" />
        <path d="M360 260 L344 260 L344 244" fill="none" />
      </g>
    </svg>
  );
}
