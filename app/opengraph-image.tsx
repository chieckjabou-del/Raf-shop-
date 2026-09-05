import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #ffffff 0%, #fbf8f5 100%)",
          color: "#1b2430",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
          RAF <span style={{ color: "#c2410c", marginLeft: 20 }}>SHOP</span>
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#78716c" }}>
          La sélection technologique de confiance
        </div>
      </div>
    ),
    { ...size },
  );
}
