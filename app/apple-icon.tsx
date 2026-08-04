import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#123C2C",
          borderRadius: 40,
        }}
      >
        <svg width="112" height="112" viewBox="0 0 20 20">
          {/* open book */}
          <path d="M2 5 L9.5 3.6 L9.5 15 L2 16.4 Z" fill="#E6C875" />
          <path d="M18 5 L10.5 3.6 L10.5 15 L18 16.4 Z" fill="#C89B3C" />
          {/* spine lines for legibility at large size */}
          <path d="M3.2 6.3 L8.5 5.3" stroke="#123C2C" strokeWidth="0.35" opacity="0.5" />
          <path d="M3.2 8.6 L8.5 7.6" stroke="#123C2C" strokeWidth="0.35" opacity="0.5" />
          <path d="M3.2 10.9 L8.5 9.9" stroke="#123C2C" strokeWidth="0.35" opacity="0.5" />
          <path d="M11.5 7.6 L16.8 8.6" stroke="#123C2C" strokeWidth="0.35" opacity="0.5" />
          <path d="M11.5 9.9 L16.8 10.9" stroke="#123C2C" strokeWidth="0.35" opacity="0.5" />
          {/* crescent */}
          <path
            d="M15.4 3.2 A2.6 2.6 0 1 0 15.9 8 A3.4 3.4 0 1 1 15.4 3.2 Z"
            fill="#FAF8F2"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
