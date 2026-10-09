import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/shared/InfoPage";

export const metadata: Metadata = {
  title: "Standar Etika & Independensi Jurnalistik",
  description:
    "Standar Editorial, Independensi, dan Etika Jurnalistik yang diterapkan di Modern News Portal.",
};

export default function StandarEditorialPage() {
  return (
    <InfoPage
      eyebrow="Integritas Redaksi"
      title="Standar Etika & Independensi Jurnalistik"
      intro="Modern News Portal beroperasi berlandaskan komitmen teguh terhadap fakta objektif, kejujuran intelektual, dan independensi penuh dari kepentingan partisan, politik kekuasaan, maupun tekanan komersial."
    >
      <h2>1. Prinsip Utama Jurnalisme Kami</h2>
      <p>
        Setiap jurnalis, editor, dan kontributor Modern News Portal terikat oleh Kode Etik
        Jurnalistik Indonesia dan standar etika pers internasional. Kami mengedepankan akurasi
        faktual, keterbukaan sumber, dan kehati-hatian dalam setiap peliputan peristiwa.
      </p>

      <h2>2. Independensi Editorial</h2>
      <p>
        Pemberitaan kami sepenuhnya independen dan dipisahkan secara tegas dari kepentingan bisnis
        atau periklanan. Pengiklan tidak memiliki hak intervensi, veto, atau pengaruh atas sudut
        pandang artikel investigasi dan liputan redaksi kami.
      </p>

      <h2>3. Verifikasi & Pengecekan Fakta (Fact-Checking)</h2>
      <p>
        Informasi dari sumber sekunder atau media sosial diverifikasi silang dengan dokumen resmi,
        data primer, atau saksi mata tepercaya sebelum ditayangkan. Spekulasi atau rumor yang belum
        terkonfirmasi tidak akan disajikan sebagai fakta.
      </p>

      <h2>4. Kebijakan Konflik Kepentingan</h2>
      <p>
        Jurnalis kami dilarang menerima amplop, hadiah, fasilitas, atau kompensasi materiil dalam
        bentuk apa pun yang berpotensi mempengaruhi objektivitas liputan.
      </p>

      <h2>5. Hak Jawab dan Klarifikasi</h2>
      <p>
        Kami menjunjung tinggi hak jawab bagi pihak yang merasa dirugikan oleh pemberitaan. Segala
        sanggahan akan ditelaah oleh Dewan Redaksi secara profesional dan dimuat sesuai proporsi
        yang adil. Sampaikan tanggapan Anda melalui{" "}
        <Link
          href="/kontak"
          className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          Kontak Redaksi
        </Link>
        .
      </p>
    </InfoPage>
  );
}
