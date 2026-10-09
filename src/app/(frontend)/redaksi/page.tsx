import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/shared/InfoPage";

export const metadata: Metadata = {
  title: "Redaksi",
  description: "Peran dan tanggung jawab redaksi Modern News Portal.",
};

export default function RedaksiPage() {
  return (
    <InfoPage
      eyebrow="Redaksi"
      title="Tim redaksi"
      intro="Redaksi bertanggung jawab menjaga mutu, akurasi, dan kepatuhan setiap materi yang diterbitkan di Modern News Portal."
    >
      <h2>Proses editorial</h2>
      <p>
        Materi ditinjau melalui proses penyuntingan sebelum terbit. Redaksi memeriksa kejelasan
        sumber, konteks, dan penggunaan bahasa, serta melakukan pembaruan bila informasi berubah.
      </p>
      <h2>Hubungi redaksi</h2>
      <p>
        Untuk mengirim tanggapan atau koreksi terkait pemberitaan, silakan kunjungi halaman{" "}
        <Link href="/kontak">Kontak</Link>. Mohon sertakan tautan artikel dan penjelasan yang
        membantu kami meninjau laporan Anda.
      </p>
    </InfoPage>
  );
}
