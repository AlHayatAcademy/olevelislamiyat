/**
 * Original abstract illustration used on the Paper 1 / Paper 2 homepage
 * cards: a stacked-document motif with a geometric rosette accent.
 * Brand colours only.
 */
export function PaperIllustration({
  className = "",
  variant = "one",
}: {
  className?: string;
  variant?: "one" | "two";
}) {
  const accent = variant === "one" ? "#123C2C" : "#C89B3C";

  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* stacked pages */}
      <rect x="30" y="34" width="90" height="112" rx="8" fill="#F3F0E8" stroke="#DDD8CB" />
      <rect x="20" y="24" width="90" height="112" rx="8" fill="#FFFFFF" stroke="#DDD8CB" />
      <rect x="20" y="24" width="90" height="112" rx="8" fill="none" stroke={accent} strokeWidth="2" />

      {/* text lines */}
      {[46, 58, 70, 82].map((y) => (
        <line key={y} x1="34" y1={y} x2="96" y2={y} stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.25" />
      ))}
      <line x1="34" y1="94" x2="76" y2="94" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.25" />

      {/* rosette accent, badge-style */}
      <g transform="translate(112 112)">
        <circle r="22" fill={accent} opacity="0.12" />
        <g stroke={accent} strokeWidth="1.5" fill="none">
          <rect x="-11" y="-11" width="22" height="22" />
          <rect x="-11" y="-11" width="22" height="22" transform="rotate(45)" />
        </g>
      </g>
    </svg>
  );
}
