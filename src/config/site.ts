import { SiteConfig } from "@/types/news";

export const siteConfig: SiteConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Modern News Portal",
  tagline: "Jurnalisme Terpercaya, Cepat, dan Mendalam",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Portal berita modern, terpercaya, dan independen menyajikan liputan mendalam seputar teknologi, ekonomi, sains, dan peristiwa global secara akurat.",
  contactEmail: "redaksi@modernnews.id",
  mainNav: [
    { label: "Beranda", href: "/" },
    { label: "Terbaru", href: "/#terbaru" },
    { label: "Populer", href: "/#populer" },
    { label: "Opini", href: "/kategori/opini" },
    { label: "Redaksi", href: "/redaksi" },
  ],
  categoriesNav: [
    { label: "Teknologi", href: "/kategori/teknologi" },
    { label: "Bisnis & Ekonomi", href: "/kategori/bisnis" },
    { label: "Sains", href: "/kategori/sains" },
    { label: "Nasional", href: "/kategori/nasional" },
    { label: "Internasional", href: "/kategori/internasional" },
    { label: "Gaya Hidup", href: "/kategori/lifestyle" },
  ],
  socialLinks: [
    { platform: "Twitter / X", url: "https://twitter.com" },
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "YouTube", url: "https://youtube.com" },
  ],
};
