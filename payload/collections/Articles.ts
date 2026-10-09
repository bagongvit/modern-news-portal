import type { CollectionConfig } from "payload";
import { populateReadingTime } from "../hooks/populateReadingTime";
import { assignReporterArticle } from "../hooks/assignReporterArticle";
import { syncFeaturedImageUrl } from "../hooks/syncFeaturedImageUrl";
import { autoGenerateSlug } from "../hooks/formatSlug";
import { revalidateArticle } from "../hooks/revalidateArticle";
import {
  canAccessAdminPanel,
  canAssignArticleReporter,
  canCreateArticles,
  canManageArticles,
  canReadArticles,
  canReadArticleReporter,
  isEditorOrAdminField,
} from "../access/roles";

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: {
    singular: "Artikel Berita",
    plural: "Artikel Berita",
  },
  admin: {
    useAsTitle: "title",
    description:
      "Ruang redaksi untuk menulis, menyunting, dan mempublikasikan artikel berita portal",
    defaultColumns: [
      "title",
      "category",
      "author",
      "status",
      "publishedAt",
      "isFeatured",
      "isBreaking",
      "viewCount",
    ],
  },
  access: {
    admin: canAccessAdminPanel,
    read: canReadArticles,
    create: canCreateArticles,
    update: canManageArticles,
    delete: canManageArticles,
  },
  hooks: {
    beforeValidate: [autoGenerateSlug],
    beforeChange: [assignReporterArticle, populateReadingTime, syncFeaturedImageUrl],
    afterChange: [revalidateArticle],
  },
  fields: [
    // -------------------------------------------------------------------------
    // 1. MAIN EDITORIAL WORKSTATION (TABS)
    // -------------------------------------------------------------------------
    {
      type: "tabs",
      tabs: [
        {
          label: "📝 Naskah Berita",
          description: "Tulis judul, teras berita (lead 5W+1H), dan isi naskah lengkap",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              index: true,
              label: "Judul Berita",
              admin: {
                placeholder:
                  "Masukkan judul berita yang menarik & akurat (misal: Presiden Resmikan Tol Baru Trans Jawa)...",
                description:
                  "Tulis judul berita yang jelas, padat, dan mencerminkan inti peristiwa (disarankan 60-80 karakter).",
              },
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              label: "Slug URL Berita",
              admin: {
                placeholder:
                  "Dibuat otomatis dari judul berita jika dikosongkan (contoh: presiden-resmikan-tol-baru-trans-jawa)",
                description:
                  "Alamat URL ramah mesin pencari (SEO). Dibuat otomatis saat Anda menulis judul jika kolom ini dikosongkan.",
              },
            },
            {
              name: "lead",
              type: "textarea",
              required: true,
              label: "Teras Berita (Lead / Ringkasan Pembuka)",
              admin: {
                rows: 3,
                placeholder:
                  "Tulis ringkasan pembuka (5W+1H: Siapa, Apa, Kapan, Di mana, Mengapa, Bagaimana) dalam 1-2 kalimat padat...",
                description:
                  "Teras berita akan ditampilkan di kartu berita beranda, cuplikan media sosial, dan meta deskripsi Google SEO.",
              },
            },
            {
              name: "content",
              type: "textarea",
              required: true,
              label: "Isi Naskah Berita Lengkap",
              admin: {
                rows: 16,
                placeholder:
                  'Tulis isi naskah berita lengkap di sini...\n\nPanduan Format Penulisan:\n• Gunakan ## untuk Subjudul bab berita\n• Gunakan tanda kutip "..." untuk kutipan langsung pernyataan narasumber\n• Gunakan tanda hubung (-) untuk daftar poin ringkas',
                description:
                  "Naskah lengkap berita. Mendukung format teks paragraf, subjudul (##), kutipan narasumber, dan tautan.",
              },
            },
          ],
        },
        {
          label: "📸 Foto & Takarir",
          description: "Foto sampul utama dan takarir hak cipta berita",
          fields: [
            {
              name: "featuredImage",
              type: "upload",
              relationTo: "media",
              label: "Foto Utama Berita (Cover Image)",
              admin: {
                description:
                  "Pilih atau unggah foto sampul beresolusi tinggi (disarankan lanskap rasio 16:9). Di ponsel, Anda dapat memilih langsung dari kamera atau galeri.",
              },
            },
            {
              name: "imageCaption",
              type: "text",
              label: "Takarir & Hak Cipta Foto (Caption)",
              admin: {
                placeholder:
                  "Contoh: Suasana peresmian jalur kereta api cepat di Stasiun Halim, Jakarta, Senin (2/10). (Foto: ANTARA / Dok. Humas)",
                description:
                  "Keterangan isi foto beserta atribusi fotografer atau kantor berita sesuai standar Kode Etik Jurnalistik Dewan Pers.",
              },
            },
            {
              name: "featuredImageUrl",
              type: "text",
              admin: {
                hidden: true,
                description: "URL gambar turunan untuk kompatibilitas artikel lama dan frontend.",
              },
            },
          ],
        },
        {
          label: "🏷️ Rubrik & Topik",
          description: "Klasifikasi rubrik berita dan kata kunci pencarian",
          fields: [
            {
              name: "category",
              type: "relationship",
              relationTo: "categories",
              required: true,
              label: "Rubrik Utama Berita",
              admin: {
                description:
                  "Pilih rubrik utama yang paling sesuai (misal: Nasional, Ekonomi, Politik, Tekno, Olahraga, Hiburan).",
              },
            },
            {
              name: "tags",
              type: "relationship",
              relationTo: "tags",
              hasMany: true,
              label: "Topik & Tagar Terkait",
              admin: {
                description:
                  "Tambahkan tagar atau kata kunci topik untuk mempermudah pembaca menemukan berita terkait.",
              },
            },
          ],
        },
      ],
    },

    // -------------------------------------------------------------------------
    // 2. SIDEBAR CONTROLS (Publication, Author, Schedule & Spotlight)
    // -------------------------------------------------------------------------
    {
      name: "status",
      type: "select",
      label: "Status Publikasi",
      options: [
        { label: "📝 Simpan Draft (Belum Tayang)", value: "draft" },
        { label: "🚀 Terbitkan Langsung (Published)", value: "published" },
        { label: "📦 Arsip (Archived)", value: "archived" },
      ],
      defaultValue: "draft",
      required: true,
      index: true,
      admin: {
        position: "sidebar",
        description:
          "Pilih 'Draft' jika masih dalam penulisan, atau 'Terbitkan Langsung' untuk menayangkan artikel ke publik.",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: true,
      label: "Penulis / Reporter",
      admin: {
        position: "sidebar",
        description: "Identitas jurnalis atau reporter yang menulis berita ini.",
      },
      defaultValue: async ({ user, req }) => {
        if (!user) return undefined;
        try {
          const authorDocs = await req.payload.find({
            collection: "authors",
            where: { user: { equals: user.id } },
            limit: 1,
            depth: 0,
            overrideAccess: true,
          });
          return authorDocs.docs[0]?.id;
        } catch {
          return undefined;
        }
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Tanggal & Jam Tayang",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description: "Jadwal tanggal dan waktu artikel mulai ditayangkan ke publik.",
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: "isFeatured",
      type: "checkbox",
      label: "⭐ Sorotan Utama (Headline)",
      defaultValue: false,
      access: { create: isEditorOrAdminField, update: isEditorOrAdminField },
      admin: {
        position: "sidebar",
        description:
          "Tampilkan di slot Berita Utama / Headline teratas beranda (Khusus Editor/Admin).",
      },
    },
    {
      name: "isBreaking",
      type: "checkbox",
      label: "🔴 Breaking News (Berita Kilat)",
      defaultValue: false,
      access: { create: isEditorOrAdminField, update: isEditorOrAdminField },
      admin: {
        position: "sidebar",
        description:
          "Tampilkan di running text berita kilat dan banner darurat teratas situs (Khusus Editor/Admin).",
      },
    },
    {
      name: "readingTimeMinutes",
      type: "number",
      label: "Estimasi Waktu Baca (Menit)",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Dihitung otomatis oleh sistem berdasarkan panjang naskah berita.",
      },
    },
    {
      name: "viewCount",
      type: "number",
      label: "Total Pembaca (Views)",
      defaultValue: 0,
      access: { create: isEditorOrAdminField, update: isEditorOrAdminField },
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Total akumulasi pembaca artikel berita ini di situs publik.",
      },
    },
    {
      name: "reporter",
      type: "relationship",
      relationTo: "users",
      index: true,
      admin: { hidden: true },
      access: {
        read: canReadArticleReporter,
        create: canAssignArticleReporter,
        update: canAssignArticleReporter,
      },
    },
  ],
};
