/**
 * Original abstract illustration: a geometric medallion/badge motif used to
 * accent the founder and final-CTA sections. Brand colours only.
 */
export function StudyBadgeIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="92" fill="none" stroke="#E6C875" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#E6C875" strokeWidth="1" opacity="0.6" />
      <g stroke="#E6C875" strokeWidth="1.5" fill="none">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          const x = 100 + Math.cos(angle) * 70;
          const y = 100 + Math.sin(angle) * 70;
          return <circle key={i} cx={x} cy={y} r="3" fill="#E6C875" stroke="none" />;
        })}
      </g>
      <g transform="translate(100 100)" stroke="#E6C875" strokeWidth="2" fill="none">
        <rect x="-34" y="-34" width="68" height="68" />
        <rect x="-34" y="-34" width="68" height="68" transform="rotate(45)" />
      </g>
      <circle cx="100" cy="100" r="10" fill="#C89B3C" />
    </svg>
  );
}
