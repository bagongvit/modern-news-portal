import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/shared/InfoPage";

export const metadata: Metadata = {
  title: "Pedoman Pemberitaan Media Siber",
  description:
    "Pedoman Pemberitaan Media Siber Modern News Portal berdasarkan ketentuan Dewan Pers.",
};

export default function PedomanMediaSiberPage() {
  return (
    <InfoPage
      eyebrow="Kode Etik & Regulasi"
      title="Pedoman Pemberitaan Media Siber"
      intro="Kemerdekaan berpendapat dan kemerdekaan pers adalah hak asasi manusia yang dilindungi oleh Pancasila, UUD 1945, dan Deklarasi Universal Hak Asasi Manusia PBB. Modern News Portal mematuhi Pedoman Pemberitaan Media Siber yang ditetapkan oleh Dewan Pers."
    >
      <h2>1. Ruang Lingkup</h2>
      <p>
        Media Siber adalah segala bentuk media yang menggunakan wahana internet dan melaksanakan
        kegiatan jurnalistik, serta memenuhi persyaratan Undang-Undang Pokok Pers dan Standar
        Perusahaan Pers yang ditetapkan Dewan Pers.
      </p>
      <p>
        Isi Buatan Pengguna (User Generated Content) adalah segala isi yang dibuat dan atau
        dipublikasikan oleh pengguna media siber, antara lain komentar, blog, forum diskusi, dan
        bentuk lainnya.
      </p>

      <h2>2. Verifikasi dan Keberimbangan Berita</h2>
      <p>
        Setiap berita harus melalui proses verifikasi fakta dan konfirmasi kepada pihak-pihak
        terkait. Berita yang berpotensi merugikan pihak lain harus memuat konfirmasi secara
        berimbang (cover both sides) demi memenuhi prinsip keadilan jurnalistik.
      </p>

      <h2>3. Isi Buatan Pengguna (User Generated Content)</h2>
      <p>
        Modern News Portal menerapkan mekanisme moderasi terhadap isi buatan pengguna. Kami berhak
        menyunting atau menghapus isi buatan pengguna yang mengandung fitnah, ujaran kebencian
        berbau SARA, pornografi, atau hasutan kekerasan.
      </p>

      <h2>4. Ralat, Koreksi, dan Hak Jawab</h2>
      <p>
        Ralat, koreksi, dan hak jawab mengacu pada Undang-Undang Pers, Kode Etik Jurnalistik, dan
        Pedoman Pemberitaan Media Siber. Koreksi atau ralat akan ditautkan pada berita yang
        bersangkutan secara transparan.
      </p>
      <p>
        Bila Anda menemukan informasi yang keliru atau bermaksud mengajukan hak jawab, silakan
        sampaikan melalui halaman{" "}
        <Link
          href="/kontak"
          className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          Kontak Redaksi
        </Link>
        .
      </p>

      <h2>5. Pencabutan Berita</h2>
      <p>
        Berita yang telah dipublikasikan tidak dapat dicabut karena alasan penyensoran oleh pihak
        luar, kecuali terkait masalah SARA, kesusilaan, masa depan anak korban kejahatan, atau atas
        pertimbangan khusus yang disepakati Dewan Pers.
      </p>
    </InfoPage>
  );
}
