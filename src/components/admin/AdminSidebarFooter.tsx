import React from "react";
import Link from "next/link";

export function AdminSidebarFooter() {
  return (
    <div
      style={{
        padding: "0.75rem 1rem",
        marginTop: "1rem",
        borderTop: "1px solid var(--theme-elevation-150, rgba(0, 0, 0, 0.08))",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <Link
        href="/reporter"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 10px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--theme-elevation-700, #334155)",
          textDecoration: "none",
          background: "var(--theme-elevation-100, #f8fafc)",
          border: "1px solid var(--theme-elevation-200, #e2e8f0)",
          transition: "all 0.15s ease",
        }}
      >
        <span>📰</span>
        <span>Meja Wartawan</span>
      </Link>

      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 10px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--theme-elevation-700, #334155)",
          textDecoration: "none",
          background: "var(--theme-elevation-100, #f8fafc)",
          border: "1px solid var(--theme-elevation-200, #e2e8f0)",
          transition: "all 0.15s ease",
        }}
      >
        <span>🌐</span>
        <span>Pratinjau Web ↗</span>
      </a>

      <div
        style={{
          marginTop: "6px",
          padding: "6px 8px",
          borderRadius: "6px",
          background: "rgba(16, 185, 129, 0.08)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          fontSize: "10px",
          color: "#059669",
          fontWeight: "600",
          lineHeight: 1.3,
          textAlign: "center",
        }}
      >
        ⚖️ Standar Dewan Pers Indonesia
      </div>
    </div>
  );
}
