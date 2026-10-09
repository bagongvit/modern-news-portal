import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/shared/InfoPage";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali Modern News Portal dan prinsip pemberitaannya.",
};

export default function TentangPage() {
  return (
    <InfoPage
      eyebrow="Tentang"
      title="Informasi yang membantu publik memahami peristiwa"
      intro="Modern News Portal menyajikan berita dan analisis dengan bahasa yang jelas agar pembaca dapat mengikuti isu penting dengan konteks yang memadai."
    >
      <h2>Prinsip pemberitaan</h2>
      <p>
        Kami mengutamakan akurasi, keberimbangan, dan pemisahan yang jelas antara fakta dan opini.
        Informasi diperiksa sebelum diterbitkan dan diperbarui ketika ada perkembangan yang relevan.
      </p>
      <h2>Koreksi dan masukan</h2>
      <p>
        Pembaca dapat menyampaikan koreksi, pertanyaan, atau masukan melalui halaman{" "}
        <Link href="/kontak">Kontak</Link>. Setiap laporan akan ditinjau oleh redaksi.
      </p>
    </InfoPage>
  );
}
