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
          background: "linear-gradient(160deg, #0c0e14 0%, #05060a 100%)",
          color: "#f3f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
          RAF <span style={{ color: "#2b6bff", marginLeft: 20 }}>SHOP</span>
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#a6afc0" }}>
          La sélection technologique de confiance
        </div>
      </div>
    ),
    { ...size },
  );
}
