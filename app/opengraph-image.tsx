import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const alt = `${siteConfig.siteName} — Cambridge O Level 2058 / IGCSE 0493`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#123C2C",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(230,200,117,0.18) 0%, rgba(18,60,44,0) 55%), radial-gradient(circle at 10% 90%, rgba(200,155,60,0.15) 0%, rgba(18,60,44,0) 50%)",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 64,
            right: 64,
            bottom: 56,
            border: "2px solid #C89B3C",
            borderRadius: 24,
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: "50%",
            border: "3px solid #E6C875",
            color: "#E6C875",
            fontSize: 44,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          ☾
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#FAF8F2",
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          O Level Islamiyat
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 28,
            color: "#E6C875",
            textAlign: "center",
            maxWidth: 880,
          }}
        >
          Understand Islam. Master the Syllabus. Excel in the Examination.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 24,
            color: "#FAF8F2",
            letterSpacing: 4,
            border: "1px solid rgba(250,248,242,0.35)",
            borderRadius: 999,
            padding: "10px 32px",
          }}
        >
          CAMBRIDGE 2058 / 0493
        </div>
      </div>
    ),
    { ...size },
  );
}
