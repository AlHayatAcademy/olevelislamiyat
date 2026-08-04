import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          {/* open book */}
          <path d="M2 5 L9.5 3.6 L9.5 15 L2 16.4 Z" fill="#E6C875" />
          <path d="M18 5 L10.5 3.6 L10.5 15 L18 16.4 Z" fill="#C89B3C" />
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
