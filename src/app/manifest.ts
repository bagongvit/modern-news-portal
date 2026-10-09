import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Modern News Portal — Jurnalisme Independen & Terpercaya",
    short_name: "Modern News",
    description:
      "Portal berita digital terdepan dengan liputan mendalam, verifikasi fakta independen, dan analisis isu terkini.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#2563eb",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
