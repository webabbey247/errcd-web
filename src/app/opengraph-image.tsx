import { ImageResponse } from "next/og";

export const alt = "ERRCD Forum — independent academic publishing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default OG card for every route without its own image. Built from the live brand
 * tokens (CHECKLIST.md §0): --ink ground, --deepblue / --burgundy on the brand rule,
 * Georgia serif heading. ERRCD has no hero photograph, so this is generated, not
 * a static asset.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#18324b",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 8,
              height: 74,
              display: "flex",
              background: "linear-gradient(to bottom, #235d91 0 68%, #d47b55 68% 100%)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Satori requires explicit display on any node with >1 child. */}
            <div
              style={{
                display: "flex",
                fontSize: 44,
                color: "#f4f7f8",
                letterSpacing: "-0.035em",
              }}
            >
              <span style={{ fontFamily: "Arial", fontWeight: 800 }}>ERRCD</span>
              <span>&nbsp;Forum</span>
            </div>
            <div
              style={{
                fontFamily: "Arial",
                fontSize: 15,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9fcce2",
              }}
            >
              A premier academic publishing house
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.05,
            color: "#f4f7f8",
            letterSpacing: "-0.04em",
            maxWidth: 940,
          }}
        >
          Publishing research that moves knowledge forward.
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Arial",
            fontSize: 20,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#d47b55",
          }}
        >
          Independent · Peer-reviewed · Open access
        </div>
      </div>
    ),
    size,
  );
}
