import React from "react";
import Link from "next/link";

export function AdminSidebarHeader() {
  return (
    <div
      style={{
        padding: "0.85rem 1rem 0.5rem 1rem",
        marginBottom: "0.5rem",
        borderBottom: "1px solid var(--theme-elevation-150, rgba(0, 0, 0, 0.08))",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.6rem",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: "800",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--theme-elevation-500, #64748b)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 6px #10b981",
            }}
          />
          Meja Redaksi
        </span>

        <span
          style={{
            fontSize: "9px",
            fontWeight: "700",
            padding: "2px 6px",
            borderRadius: "4px",
            background: "rgba(37, 99, 235, 0.12)",
            color: "#2563eb",
          }}
        >
          WIB
        </span>
      </div>

      <Link
        href="/admin/collections/articles/create"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          width: "100%",
          boxSizing: "border-box",
          padding: "7px 12px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          color: "#ffffff",
          fontSize: "12px",
          fontWeight: "700",
          textDecoration: "none",
          boxShadow: "0 2px 8px rgba(37, 99, 235, 0.3)",
          transition: "transform 0.15s ease",
        }}
      >
        <span>✍️</span>
        <span>+ Tulis Berita</span>
      </Link>
    </div>
  );
}
