import { Article, Category, Author, Tag, BreakingNewsItem } from "@/types/news";

export const initialCategories: Category[] = [
  {
    id: "cat-tekno",
    name: "Teknologi",
    slug: "teknologi",
    description: "Inovasi kecerdasan buatan, komputasi awan, gadget, dan transformasi digital.",
    color: "#2563eb", // blue-600
  },
  {
    id: "cat-bisnis",
    name: "Bisnis & Ekonomi",
    slug: "bisnis",
    description: "Analisis pasar modal, makroekonomi, startup unicorn, dan kebijakan fiskal.",
    color: "#059669", // emerald-600
  },
  {
    id: "cat-sains",
    name: "Sains & Antariksa",
    slug: "sains",
    description: "Eksplorasi antariksa, transisi energi hijau, bioteknologi, dan riset iklim.",
    color: "#7c3aed", // violet-600
  },
  {
    id: "cat-nasional",
    name: "Nasional",
    slug: "nasional",
    description: "Kabar kebijakan publik, infrastruktur strategis, dan dinamika kebangsaan.",
    color: "#dc2626", // red-600
  },
  {
    id: "cat-internasional",
    name: "Internasional",
    slug: "internasional",
    description: "Geopolitik global, diplomasi internasional, dan tren dunia terintegrasi.",
    color: "#d97706", // amber-600
  },
  {
    id: "cat-lifestyle",
    name: "Gaya Hidup",
    slug: "lifestyle",
    description: "Kesehatan mental, produktivitas kerja modern, dan tren budaya urban kontemporer.",
    color: "#db2777", // pink-600
  },
];

export const initialAuthors: Author[] = [
  {
    id: "auth-1",
    name: "Dr. Raditya Pratama",
    slug: "raditya-pratama",
    role: "Editor Utama Teknologi & AI",
    bio: "Peneliti komputasi dan jurnalis teknologi senior dengan lebih dari 12 tahun pengalaman meliput revolusi kecerdasan buatan dan semikonduktor global.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    email: "raditya@modernnews.id",
    twitter: "@radityapratama",
    linkedin: "raditya-pratama",
  },
  {
    id: "auth-2",
    name: "Clarissa Wijaya, M.Sc.",
    slug: "clarissa-wijaya",
    role: "Jurnalis Ekonomi & Kebijakan Fiskal",
    bio: "Analis pasar keuangan dan makroekonomi alumni LSE. Rutin menyajikan telaah mendalam terkait disrupsi fintech dan transisi energi terbarukan.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    email: "clarissa@modernnews.id",
    twitter: "@clarissawijaya",
    linkedin: "clarissa-wijaya",
  },
  {
    id: "auth-3",
    name: "Farhan Hakim",
    slug: "farhan-hakim",
    role: "Koresponden Investigasi Antariksa & Sains",
    bio: "Spesialis liputan astronomi, fisika partikel, dan komputasi kuantum. Berpengalaman meliput fasilitas peluncuran roket dan riset observatorium internasional.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    email: "farhan@modernnews.id",
    twitter: "@farhanhakim_sci",
    linkedin: "farhan-hakim",
  },
];

export const initialTags: Tag[] = [
  { id: "tag-ai", name: "Artificial Intelligence", slug: "artificial-intelligence" },
  { id: "tag-energi", name: "Energi Hijau", slug: "energi-hijau" },
  { id: "tag-investasi", name: "Pasar Saham", slug: "pasar-saham" },
  { id: "tag-semikonduktor", name: "Semikonduktor", slug: "semikonduktor" },
  { id: "tag-antariksa", name: "Misi Antariksa", slug: "misi-antariksa" },
  { id: "tag-ev", name: "Kendaraan Listrik", slug: "kendaraan-listrik" },
];

export const initialBreakingNews: BreakingNewsItem[] = [
  {
    id: "brk-1",
    headline:
      "Konsorsium Riset Global Umumkan Terobosan Komputasi Kuantum Skala Industri 100.000 Qubit",
    url: "/berita/terobosan-komputasi-kuantum-skala-industri",
    badgeText: "BREAKING",
    publishedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "brk-2",
    headline:
      "Indeks Bursa Regional Menguat 2,4% Didorong Sentimen Positif Kebijakan Suku Bunga Global",
    url: "/berita/analisis-pergerakan-modal-investasi-hijau-2026",
    badgeText: "TERKINI",
    publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "brk-3",
    headline:
      "Observatorium Antariksa Deteksi Sinyal Atmosfer Baru pada Eksoplanet Berjarak 40 Tahun Cahaya",
    url: "/berita/teleskop-antariksa-deteksi-potensi-biosfer-eksoplanet",
    badgeText: "SAINS",
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
];

export const initialArticles: Article[] = [
  {
    id: "art-1",
    title:
      "Revolusi Agen AI Otonom: Bagaimana Model Generatif Mengubah Lanskap Rekayasa Perangkat Lunak 2026",
    slug: "revolusi-agen-ai-otonom-rekayasa-perangkat-lunak-2026",
    lead: "Pergeseran paradigma dari copilot interaktif menuju autonomous multi-agent systems mentransformasi kecepatan pengiriman software enterprise hingga sepuluh kali lipat.",
    content: `
Kecerdasan buatan kini tidak lagi sekadar menjadi asisten pelengkap kode baris demi baris. Pada paruh pertama 2026, adopsi *autonomous AI agent networks* telah memasuki fase produksi di ribuan organisasi rekayasa teknologi skala global.

### Dari Coding Assistant Menuju Full Autonomous Workflow

Dalam tiga tahun terakhir, para pengembang terbiasa menggunakan completion autocomplete. Namun, lompatan terbesar terjadi ketika arsitektur penalaran terdistribusi (Distributed Reasoning Architecture) diintegrasikan dengan tooling orchestration real-time.

> "Kami tidak lagi melihat developer menulis fungsi CRUD berulang kali. Kini peran software architect bergeser menjadi konduktor orkestrasi logika bisnis, keamanan, dan verifikasi formal kinerja sistem," ungkap Dr. Raditya Pratama dalam simposium arsitektur perangkat lunak terkini.

#### Tiga Pilar Fundamental Sistem Agen Otonom

1. **Self-Correction & Automated Verification Loop**: Agen mampu menjalankan automated testing suite, mendeteksi regresi performa, dan memverifikasi type-safety secara independen sebelum menyodorkan review pull request.
2. **Deterministic Context Boundaries**: Membatasi konsumsi token dengan strategi selective retrieval, meminimalisir halusinasi hingga di bawah 0,1%.
3. **Continuous Performance Profiling**: Mengintegrasikan APM (Application Performance Monitoring) secara native ke dalam lifecycle pengembangan.

### Dampak Nyata terhadap Efisiensi dan Skalabilitas Tim

Survei terhadap 500 perusahaan teknologi terkemuka mencatat penurunan *lead time to changes* sebesar 68%, sementara cakupan pengujian unit meningkat rata-rata 45%. Kendati demikian, tantangan tata kelola kode, audit keamanan rantai pasok (supply chain security), dan etika privasi data tetap menjadi pilar utama yang membutuhkan pengawasan manusia secara ketat.

Ke depan, tim rekayasa perangkat lunak yang berhasil memadukan keahlian domain arsitektur tingkat tinggi dengan akselerasi agen otonom akan memimpin laju disrupsi digital dunia.
    `,
    featuredImageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
    imageCaption:
      "Visualisasi jaringan saraf tiruan dan representasi alur pemrosesan penalaran AI generasi terbaru. (Foto: Unsplash/Guerillabuzz)",
    category: initialCategories[0], // Teknologi
    tags: [initialTags[0], initialTags[3]],
    author: initialAuthors[0],
    status: "published",
    isFeatured: true,
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    readingTimeMinutes: 5,
    viewCount: 14230,
  },
  {
    id: "art-2",
    title: "Transisi Energi Hijau dan Gelombang Investasi Infrastruktur Bersih 500 Triliun Rupiah",
    slug: "transisi-energi-hijau-investasi-infrastruktur-bersih",
    lead: "Akselerasi pembangunan pembangkit listrik tenaga surya terapung dan jaringan transmisi cerdas menarik minat investor institusi internasional.",
    content: `
Komitmen pencapaian *Net Zero Emission* kian mewujud nyata melalui peluncuran megaproyek energi terbarukan terpadu. Sektor perbankan dan konsorsium sovereign wealth fund menegaskan alokasi modal hijau berskala raksasa guna membiayai diversifikasi sumber daya energi masa depan.

### Modernisasi Grid Transmisi Nasional

Salah satu tantangan fundamental pembangkit energi terbarukan adalah sifat intermiten dari angin dan surya. Guna mengatasi disparitas beban, implementasi *Smart Grid Transmission* berbasis IoT dan sistem baterai penyimpanan skala gigawatt (BESS) menjadi fokus utama pembangunan 2026.

- Pembangunan interkoneksi kabel bawah laut antar-pulau.
- Integrasi otomatisasi stasiun distribusi listrik real-time.
- Pembiayaan berbasis green bonds dengan standar sertifikasi global.

Langkah strategis ini diproyeksikan membuka lebih dari 120.000 lapangan kerja terampil baru di bidang rekayasa lingkungan dan teknologi energi bersih.

### Transformasi Lanskap Kawasan: Sebelum dan Sesudah

[compare-visual before="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80" after="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80" beforeLabel="2021: Lahan Terbuka Pra-Proyek" afterLabel="2026: Sentra Pembangkit Hibrida Surya-Angin" caption="Transformasi Lanskap Energi Terbarukan Nasional (Geser slider untuk melihat perbandingan visual)" credit="Citra Satelit & Visualisasi Redaksi Modern News Portal"]

Keberhasilan proyek percontohan ini akan dijadikan cetak biru (*blueprint*) bagi percepatan elektrifikasi hijau di 10 koridor kepulauan lainnya.
    `,
    featuredImageUrl:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Fasilitas turbin angin dan instalasi panel surya berskala besar. (Foto: Unsplash/Karsten Würth)",
    category: initialCategories[1], // Bisnis
    tags: [initialTags[1], initialTags[2]],
    author: initialAuthors[1],
    status: "published",
    isFeatured: true,
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    readingTimeMinutes: 4,
    viewCount: 9840,
  },
  {
    id: "art-3",
    title:
      "Teleskop Antariksa Generasi Baru Deteksi Jejak Uap Air dan Karbon pada Eksoplanet Mirip Bumi",
    slug: "teleskop-antariksa-deteksi-potensi-biosfer-eksoplanet",
    lead: "Spektroskopi presisi tinggi dari observatorium luar angkasa mengungkap komposisi atmosfer yang memicu antusiasme komunitas astrofisika dunia.",
    content: `
Observasi terbaru terhadap sistem bintang berjarak 40 tahun cahaya berhasil mengidentifikasi spektrum penyerapan molekul esensial kehidupan di lapisan atmosfer planet terestrial berjuluk Kepler-452c.

Data spektrometri inframerah menunjukkan adanya rasio uap air dan karbon dioksida dalam proporsi yang mendukung stabilitas suhu permukaan untuk air dalam wujud cair. Tim peneliti gabungan saat ini tengah melakukan kalibrasi data lanjutan guna memverifikasi biomarker lainnya seperti metana dan ozon.
    `,
    featuredImageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Ilustrasi artistik eksoplanet beratmosfer tipis yang mengorbit bintang induknya. (Foto: NASA/ESA)",
    category: initialCategories[2], // Sains
    tags: [initialTags[4]],
    author: initialAuthors[2],
    status: "published",
    isFeatured: true,
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    readingTimeMinutes: 4,
    viewCount: 18560,
  },
  {
    id: "art-4",
    title:
      "Infrastruktur Kereta Cepat Lintas Pulau: Mengubah Peta Pertumbuhan Koridor Logistik Nasional",
    slug: "infrastruktur-kereta-cepat-koridor-logistik-nasional",
    lead: "Efisiensi konektivitas jalur rel modern memangkas waktu tempuh antarkota hingga 60%, mendorong desentralisasi sentra industri manufaktur bernilai tambah tinggi.",
    content: `
Perluasan jaringan perkeretaapian cepat nasional kini memasuki fase komersialisasi penuh pada koridor aglomerasi utama. Tidak hanya memfasilitasi mobilitas jutaan komuter harian, sistem angkutan logistik ekspres berbasis rel turut menekan biaya distribusi komoditas hingga 30%.

Konektivitas langsung ke pelabuhan peti kemas internasional memastikan waktu *dwelling time* pelabuhan kian kompetitif bersaing dengan hub logistik Asia Tenggara.
    `,
    featuredImageUrl:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Rangkaian kereta modern berkecepatan tinggi melintasi koridor jembatan antarprovinsi. (Foto: Unsplash)",
    category: initialCategories[3], // Nasional
    tags: [initialTags[2]],
    author: initialAuthors[1],
    status: "published",
    isFeatured: false,
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    readingTimeMinutes: 3,
    viewCount: 6510,
  },
  {
    id: "art-5",
    title: "Perjanjian Dagang Multilateral Baru Perkuat Rantai Pasok Semikonduktor Asia-Pasifik",
    slug: "perjanjian-dagang-rantai-pasok-semikonduktor-asia-pasifik",
    lead: "Para menteri perdagangan dari 14 negara menyepakati klausul proteksi ketahanan suplai chip mikro dan transfer riset teknologi manufaktur litografi canggih.",
    content: `
Ketergantungan ekonomi global terhadap komponen chip semikonduktor mendorong lahirnya kerangka kerja sama ketahanan pasokan paling komprehensif dalam satu dekade terakhir. 

Perjanjian ini mengantisipasi disrupsi logistik melalui pembentukan buffer inventory bersama dan insentif fiskal terkoordinasi bagi pembangunan pabrik wafer fabrikasi di kawasan regional.
    `,
    featuredImageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Papan sirkuit terintegrasi dan chip silikon litografi mikron. (Foto: Unsplash/Alexandre Debiève)",
    category: initialCategories[4], // Internasional
    tags: [initialTags[3], initialTags[2]],
    author: initialAuthors[0],
    status: "published",
    isFeatured: false,
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    readingTimeMinutes: 4,
    viewCount: 8190,
  },
  {
    id: "art-6",
    title: "Mendefinisikan Ulang Keseimbangan Kerja: Tren Deep Work dan Batas Komunikasi Asinkron",
    slug: "mendefinisikan-keseimbangan-kerja-tren-deep-work",
    lead: "Studi psikologi organisasi terbaru mengungkap budaya rapat virtual tanpa henti memicu kejenuhan kognitif. Praktik komunikasi asinkron mulai diadopsi perusahaan papan atas.",
    content: `
Pergeseran ke model kerja fleksibel menuntut disiplin baru dalam menjaga konsentrasi mendalam (*deep work*). Alih-alih mengharuskan respons instan di aplikasi pesan kantor, model organisasi modern menetapkan jam fokus tanpa interupsi dan dokumentasi tertulis sebagai standar kolaborasi utama.

Hasil evaluasi menunjukkan peningkatan kualitas pengambilan keputusan strategis dan tingkat kepuasan kerja karyawan yang signifikan.
    `,
    featuredImageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Meja kerja minimalis yang mendukung konsentrasi tinggi dan produktivitas tenang. (Foto: Unsplash)",
    category: initialCategories[5], // Lifestyle
    tags: [initialTags[0]],
    author: initialAuthors[1],
    status: "published",
    isFeatured: false,
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    readingTimeMinutes: 3,
    viewCount: 11200,
  },
];
