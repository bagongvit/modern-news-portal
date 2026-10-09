import React from "react";

export function AdminBrandIcon() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)",
        color: "#ffffff",
        fontWeight: "900",
        fontSize: "12px",
        letterSpacing: "-0.05em",
        boxShadow: "0 2px 8px rgba(37, 99, 235, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        userSelect: "none",
      }}
    >
      <span style={{ color: "#ffffff" }}>M</span>
      <span style={{ color: "#ef4444" }}>N</span>
    </div>
  );
}
