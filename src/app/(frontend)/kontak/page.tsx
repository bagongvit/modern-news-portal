import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { InfoPage } from "@/components/shared/InfoPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi redaksi Modern News Portal.",
};

export default function KontakPage() {
  return (
    <InfoPage
      eyebrow="Kontak"
      title="Sampaikan pertanyaan atau koreksi"
      intro="Redaksi menerima masukan pembaca, permintaan informasi, dan koreksi atas pemberitaan melalui alamat berikut."
    >
      <div className="not-prose rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <a
            className="font-semibold text-blue-700 hover:underline dark:text-blue-300"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            {siteConfig.contactEmail}
          </a>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Agar laporan dapat ditinjau, sertakan tautan artikel dan rincian informasi yang perlu kami
          periksa.
        </p>
      </div>
    </InfoPage>
  );
}
