import React from "react";

export function AdminBrandLogo() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        userSelect: "none",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)",
          color: "#ffffff",
          fontWeight: "900",
          fontSize: "13px",
          letterSpacing: "-0.05em",
          boxShadow: "0 2px 8px rgba(37, 99, 235, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <span style={{ color: "#ffffff" }}>M</span>
        <span style={{ color: "#ef4444" }}>N</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span
          style={{
            fontSize: "14px",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            color: "inherit",
          }}
        >
          MODERN NEWS
        </span>
        <span
          style={{
            fontSize: "9px",
            fontWeight: "700",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ef4444",
          }}
        >
          Pusat Redaksi
        </span>
      </div>
    </div>
  );
}
