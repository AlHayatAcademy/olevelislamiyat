/**
 * Subtle, tasteful Islamic geometric pattern used as a decorative background
 * texture. Purely abstract (interlocking star/polygon motif, no figurative
 * or religious iconography) and rendered at low opacity so it never
 * competes with foreground content. Brand colours only.
 */
export function GeometricPattern({
  className = "",
  tone = "light",
  id = "geo-pattern",
}: {
  className?: string;
  tone?: "light" | "dark";
  id?: string;
}) {
  const stroke = tone === "dark" ? "#E6C875" : "#123C2C";

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth="1">
            {/* 8-point star built from two overlapping squares, a common
                abstract girih motif */}
            <rect x="10" y="10" width="40" height="40" transform="rotate(0 30 30)" />
            <rect x="10" y="10" width="40" height="40" transform="rotate(45 30 30)" />
            <circle cx="30" cy="30" r="4" />
            <path d="M70 0 L80 10 L70 20 L60 10 Z" />
            <path d="M70 60 L80 70 L70 80 L60 70 Z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
