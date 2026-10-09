import React from "react";
import Link from "next/link";
import { AdminProfileDropdown } from "./AdminProfileDropdown";

export function AdminHeaderActions() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Link
        href="/admin/collections/articles/create"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px 12px",
          borderRadius: "7px",
          fontSize: "12px",
          fontWeight: "700",
          color: "#ffffff",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          textDecoration: "none",
          boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
        }}
      >
        <span>✍️</span>
        <span>Tulis</span>
      </Link>

      <Link
        href="/reporter"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px 10px",
          borderRadius: "7px",
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--theme-elevation-700, #334155)",
          background: "var(--theme-elevation-100, #f8fafc)",
          border: "1px solid var(--theme-elevation-250, #cbd5e1)",
          textDecoration: "none",
        }}
        title="Meja Redaksi Wartawan"
      >
        <span>📰</span>
        <span>Wartawan</span>
      </Link>

      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px 10px",
          borderRadius: "7px",
          fontSize: "12px",
          fontWeight: "600",
          color: "var(--theme-elevation-700, #334155)",
          background: "var(--theme-elevation-100, #f8fafc)",
          border: "1px solid var(--theme-elevation-250, #cbd5e1)",
          textDecoration: "none",
        }}
        title="Buka portal publik"
      >
        <span>🌐</span>
        <span>Web ↗</span>
      </a>

      {/* Interactive Newsroom Profile Dropdown with Logout */}
      <AdminProfileDropdown />
    </div>
  );
}
