"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth, useTheme } from "@payloadcms/ui";
import { logoutReporter } from "@/app/(frontend)/reporter/actions";

export function AdminProfileDropdown() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  const displayName = user?.name || user?.email?.split("@")[0] || "Jurnalis";
  const displayEmail = user?.email || "redaksi@modernnews.id";
  const userRole = (user as { role?: string })?.role;
  const roleLabel =
    userRole === "admin"
      ? "Pemimpin Redaksi / Super Admin"
      : userRole === "editor"
        ? "Editor Pelaksana Redaksi"
        : "Jurnalis / Senior Reporter";

  const initial = displayName.charAt(0).toUpperCase();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Trigger Button Avatar */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={`Akun: ${displayName}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "3px 8px 3px 4px",
          borderRadius: "9999px",
          border: isOpen ? "2px solid #2563eb" : "2px solid rgba(0, 0, 0, 0.08)",
          background: "var(--theme-elevation-100, #f8fafc)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          outline: "none",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb, #1e40af)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "800",
              boxShadow: "0 2px 6px rgba(37, 99, 235, 0.35)",
            }}
          >
            {initial}
          </div>
          {/* Active status pulse dot */}
          <span
            style={{
              position: "absolute",
              bottom: "-1px",
              right: "-1px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              border: "2px solid #ffffff",
            }}
          />
        </div>

        <span
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: "var(--theme-elevation-800, #1e293b)",
            maxWidth: "120px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "none",
          }}
          className="admin-profile-name-text"
        >
          {displayName}
        </span>

        <span
          style={{
            fontSize: "10px",
            color: "var(--theme-elevation-500, #64748b)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          ▼
        </span>
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: 0,
            width: "320px",
            borderRadius: "1rem",
            background: "var(--theme-elevation-50, #ffffff)",
            border: "1px solid var(--theme-elevation-150, rgba(0, 0, 0, 0.08))",
            boxShadow:
              "0 20px 35px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px var(--theme-elevation-150, rgba(0, 0, 0, 0.05))",
            zIndex: 9999,
            overflow: "hidden",
            animation: "nrFadeIn 0.15s ease-out",
          }}
        >
          {/* Header Profile Identity */}
          <div
            style={{
              padding: "1.25rem",
              background: "linear-gradient(135deg, #090d16 0%, #0f172a 100%)",
              color: "#ffffff",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "900",
                  color: "#ffffff",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                {initial}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "2px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "800",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: "rgba(37, 99, 235, 0.3)",
                      color: "#93c5fd",
                      border: "1px solid rgba(96, 165, 250, 0.4)",
                    }}
                  >
                    ID: #MN-2026
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      color: "#34d399",
                    }}
                  >
                    ● Bertugas
                  </span>
                </div>

                <h4
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "800",
                    color: "#ffffff",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={displayName}
                >
                  {displayName}
                </h4>

                <p
                  style={{
                    margin: "2px 0 0 0",
                    fontSize: "11px",
                    color: "#94a3b8",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {displayEmail}
                </p>
              </div>
            </div>

            {/* Role Badge */}
            <div
              style={{
                marginTop: "10px",
                padding: "4px 8px",
                borderRadius: "6px",
                background: "rgba(255, 255, 255, 0.08)",
                fontSize: "11px",
                fontWeight: "600",
                color: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>🛡️ {roleLabel}</span>
              <span style={{ fontSize: "10px", color: "#94a3b8" }}>Biro Jakarta</span>
            </div>
          </div>

          {/* Operational Shift Info */}
          <div
            style={{
              padding: "8px 16px",
              background: "rgba(16, 185, 129, 0.08)",
              borderBottom: "1px solid var(--theme-elevation-150, rgba(0, 0, 0, 0.06))",
              fontSize: "11px",
              color: "#059669",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>🟢 Meja Redaksi Aktif 24 Jam</span>
            <span>Standar Dewan Pers</span>
          </div>

          {/* Essential Features Menu */}
          <div style={{ padding: "8px" }}>
            <Link
              href="/api/admin/my-profile"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--theme-elevation-800, #1e293b)",
                textDecoration: "none",
                transition: "background 0.15s ease",
              }}
              className="nr-dropdown-item"
            >
              <span style={{ fontSize: "15px" }}>👤</span>
              <div style={{ flex: 1 }}>
                <div>Profil & Biodata Penulis</div>
                <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "normal" }}>
                  Kelola foto, takarir & bio yang tampil di portal web
                </div>
              </div>
            </Link>

            <Link
              href="/admin/account"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--theme-elevation-800, #1e293b)",
                textDecoration: "none",
                transition: "background 0.15s ease",
              }}
              className="nr-dropdown-item"
            >
              <span style={{ fontSize: "15px" }}>🔑</span>
              <div style={{ flex: 1 }}>
                <div>Pengaturan Akun & Sandi</div>
                <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "normal" }}>
                  Ganti email, password, dan keamanan akses
                </div>
              </div>
            </Link>

            <Link
              href="/reporter"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--theme-elevation-800, #1e293b)",
                textDecoration: "none",
                transition: "background 0.15s ease",
              }}
              className="nr-dropdown-item"
            >
              <span style={{ fontSize: "15px" }}>📰</span>
              <div style={{ flex: 1 }}>
                <div>Meja Liputan Saya</div>
                <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "normal" }}>
                  Akses ruang draf & statistik pembaca artikel
                </div>
              </div>
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--theme-elevation-800, #1e293b)",
                textDecoration: "none",
                transition: "background 0.15s ease",
              }}
              className="nr-dropdown-item"
            >
              <span style={{ fontSize: "15px" }}>🌐</span>
              <div style={{ flex: 1 }}>
                <div>Buka Portal Berita Live ↗</div>
                <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "normal" }}>
                  Lihat tampilan web portal publik terkini
                </div>
              </div>
            </a>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--theme-elevation-800, #1e293b)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s ease",
              }}
              className="nr-dropdown-item"
            >
              <span style={{ fontSize: "15px" }}>{theme === "dark" ? "☀️" : "🌙"}</span>
              <div style={{ flex: 1 }}>
                <div>Tema: {theme === "dark" ? "Mode Terang" : "Mode Gelap"}</div>
                <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "normal" }}>
                  Klik untuk beralih tampilan {theme === "dark" ? "Light" : "Dark"}
                </div>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "var(--theme-elevation-150, rgba(0, 0, 0, 0.08))",
              margin: "4px 8px",
            }}
          />

          {/* Logout Action in Dropdown */}
          <div style={{ padding: "8px" }}>
            <form action={logoutReporter} style={{ margin: 0 }}>
              <button
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "9px 14px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#ffffff",
                  background: "linear-gradient(135deg, #e11d48, #be123c)",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(225, 29, 72, 0.3)",
                  transition: "transform 0.15s ease, background 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <span>🚪</span>
                <span>Keluar dari Meja Redaksi</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
