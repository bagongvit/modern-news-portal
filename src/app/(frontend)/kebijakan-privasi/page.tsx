import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/shared/InfoPage";

export const metadata: Metadata = {
  title: "Kebijakan Privasi Data",
  description: "Kebijakan Privasi dan Perlindungan Data Pengguna di Modern News Portal.",
};

export default function KebijakanPrivasiPage() {
  return (
    <InfoPage
      eyebrow="Privasi & Keamanan"
      title="Kebijakan Privasi Data"
      intro="Modern News Portal menghormati dan berkomitmen untuk melindungi privasi setiap pembaca dan kontributor kami. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda."
    >
      <h2>1. Informasi yang Kami Kumpulkan</h2>
      <p>
        Kami dapat mengumpulkan data yang Anda berikan secara langsung, seperti nama dan alamat
        email saat mendaftar buletin berita (newsletter), mengirimkan komentar pada artikel, atau
        menghubungi tim redaksi melalui form kontak.
      </p>

      <h2>2. Penggunaan Informasi</h2>
      <p>Informasi yang kami kumpulkan digunakan untuk:</p>
      <ul>
        <li>Mengirimkan buletin berita berkala yang Anda langgani.</li>
        <li>Melakukan verifikasi dan moderasi komentar demi menjaga ruang publik yang sehat.</li>
        <li>Menjawab pertanyaan, koreksi berita, atau laporan hak jawab dari Anda.</li>
        <li>Menganalisis performa portal berita demi meningkatkan kenyamanan membaca.</li>
      </ul>

      <h2>3. Perlindungan & Kerahasiaan Data</h2>
      <p>
        Kami tidak menjual, menyewakan, atau memberikan data pribadi Anda kepada pihak ketiga untuk
        kepentingan pemasaran tanpa persetujuan eksplisit dari Anda, kecuali diwajibkan oleh
        ketentuan hukum dan peraturan perundang-undangan yang berlaku.
      </p>

      <h2>4. Penggunaan Cookies</h2>
      <p>
        Kami menggunakan cookies dan teknologi pelacakan serupa untuk mengingat preferensi Anda
        (seperti mode tampilan terang/gelap) serta menyajikan statistik lalu lintas situs secara
        anonim.
      </p>

      <h2>5. Hak Anda atas Data Pribadi</h2>
      <p>
        Anda berhak meminta penghapusan langganan buletin (unsubscribe) kapan saja melalui tautan di
        bagian bawah setiap email buletin, atau meminta penghapusan riwayat komentar dengan
        menghubungi kami di{" "}
        <Link
          href="/kontak"
          className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          Halaman Kontak
        </Link>
        .
      </p>
    </InfoPage>
  );
}
