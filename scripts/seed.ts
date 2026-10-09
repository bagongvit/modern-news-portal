import { getPayload } from "payload";
import configPromise from "../payload/payload.config";

async function seed() {
  console.log("🌱 Starting Modern News Portal Database Seeder...");

  try {
    const payload = await getPayload({ config: configPromise });
    console.log(" Connected to Payload CMS & PostgreSQL.");

    // ==========================================
    // 1. SEED USERS
    // ==========================================
    console.log("\n👤 Seeding Users (Admin, Editor, Reporter)...");

    const usersToCreate = [
      {
        email: "admin@admin.com",
        password: "admin12345",
        role: "admin" as const,
        name: "Super Admin Redaksi",
      },
      {
        email: "admin@modernnews.id",
        password: "admin12345",
        role: "admin" as const,
        name: "Super Administrator",
      },
      {
        email: "editor@modernnews.id",
        password: "editor12345",
        role: "editor" as const,
        name: "Clarissa Wijaya (Managing Editor)",
      },
      {
        email: "reporter@modernnews.id",
        password: "reporter12345",
        role: "author" as const,
        name: "Dr. Raditya Pratama (Senior Reporter)",
      },
      {
        email: "reporter@reporter.com",
        password: "reporter12345",
        role: "author" as const,
        name: "Dr. Raditya Pratama",
      },
    ];

    const seededUsers: Record<string, string> = {};

    for (const userData of usersToCreate) {
      const existing = await payload.find({
        collection: "users",
        where: { email: { equals: userData.email } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length > 0) {
        const u = existing.docs[0];
        console.log(`  Updating existing user: ${userData.email}`);
        const updated = await payload.update({
          collection: "users",
          id: u.id,
          data: {
            name: userData.name,
            role: userData.role,
            password: userData.password,
          },
          overrideAccess: true,
        });
        seededUsers[userData.email] = String(updated.id);
      } else {
        console.log(`  ➕ Creating user: ${userData.email} (${userData.role})`);
        const created = await payload.create({
          collection: "users",
          data: userData,
          overrideAccess: true,
        });
        seededUsers[userData.email] = String(created.id);
      }
    }

    // Fix potential typo account if it was created
    const typoUser = await payload.find({
      collection: "users",
      where: { email: { equals: "reporter@reporter.cpm" } },
      limit: 1,
      overrideAccess: true,
    });
    if (typoUser.docs.length > 0) {
      await payload.update({
        collection: "users",
        id: typoUser.docs[0].id,
        data: {
          role: "author",
          password: "reporter12345",
          name: "Dr. Raditya Pratama (Reporter)",
        },
        overrideAccess: true,
      });
      seededUsers["reporter@reporter.cpm"] = String(typoUser.docs[0].id);
      console.log("  Updated typo user reporter@reporter.cpm with author role and password");
    }

    const primaryReporterId =
      seededUsers["reporter@modernnews.id"] ||
      seededUsers["reporter@reporter.com"] ||
      seededUsers["reporter@reporter.cpm"];
    const editorUserId = seededUsers["editor@modernnews.id"];

    // ==========================================
    // 2. SEED CATEGORIES
    // ==========================================
    console.log("\n🏷️ Seeding Categories...");

    const categoriesData = [
      {
        name: "Teknologi",
        slug: "teknologi",
        description: "Inovasi kecerdasan buatan, komputasi awan, gadget, dan transformasi digital.",
        color: "#2563eb",
      },
      {
        name: "Bisnis & Ekonomi",
        slug: "bisnis",
        description: "Analisis pasar modal, makroekonomi, startup unicorn, dan kebijakan fiskal.",
        color: "#059669",
      },
      {
        name: "Sains & Antariksa",
        slug: "sains",
        description: "Eksplorasi antariksa, transisi energi hijau, bioteknologi, dan riset iklim.",
        color: "#7c3aed",
      },
      {
        name: "Nasional",
        slug: "nasional",
        description: "Kabar kebijakan publik, infrastruktur strategis, dan dinamika kebangsaan.",
        color: "#dc2626",
      },
      {
        name: "Internasional",
        slug: "internasional",
        description: "Geopolitik global, diplomasi internasional, dan tren dunia terintegrasi.",
        color: "#d97706",
      },
      {
        name: "Gaya Hidup",
        slug: "lifestyle",
        description:
          "Kesehatan mental, produktivitas kerja modern, dan tren budaya urban kontemporer.",
        color: "#db2777",
      },
      {
        name: "Opini",
        slug: "opini",
        description:
          "Perspektif independen, gagasan kritis, dan ulasan mendalam para pakar dan jurnalis.",
        color: "#4f46e5",
      },
    ];

    const categoryMap: Record<string, string> = {};

    for (const cat of categoriesData) {
      const existing = await payload.find({
        collection: "categories",
        where: { slug: { equals: cat.slug } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length > 0) {
        console.log(`  Updating category: ${cat.name}`);
        const updated = await payload.update({
          collection: "categories",
          id: existing.docs[0].id,
          data: cat,
          overrideAccess: true,
        });
        categoryMap[cat.slug] = String(updated.id);
      } else {
        console.log(`  ➕ Creating category: ${cat.name}`);
        const created = await payload.create({
          collection: "categories",
          data: cat,
          overrideAccess: true,
        });
        categoryMap[cat.slug] = String(created.id);
      }
    }

    // ==========================================
    // 3. SEED TAGS
    // ==========================================
    console.log("\n🔖 Seeding Tags...");

    const tagsData = [
      { name: "Artificial Intelligence", slug: "artificial-intelligence" },
      { name: "Energi Hijau", slug: "energi-hijau" },
      { name: "Pasar Saham", slug: "pasar-saham" },
      { name: "Semikonduktor", slug: "semikonduktor" },
      { name: "Misi Antariksa", slug: "misi-antariksa" },
      { name: "Kendaraan Listrik", slug: "kendaraan-listrik" },
      { name: "Kebijakan Publik", slug: "kebijakan-publik" },
      { name: "Deep Work", slug: "deep-work" },
    ];

    const tagMap: Record<string, string> = {};

    for (const tag of tagsData) {
      const existing = await payload.find({
        collection: "tags",
        where: { slug: { equals: tag.slug } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length > 0) {
        tagMap[tag.slug] = String(existing.docs[0].id);
      } else {
        console.log(`  ➕ Creating tag: ${tag.name}`);
        const created = await payload.create({
          collection: "tags",
          data: tag,
          overrideAccess: true,
        });
        tagMap[tag.slug] = String(created.id);
      }
    }

    // ==========================================
    // 4. SEED AUTHORS (Linked to Users!)
    // ==========================================
    console.log("\n✍️ Seeding Authors & Linking to Reporter User...");

    const authorsData = [
      {
        name: "Dr. Raditya Pratama",
        slug: "raditya-pratama",
        role: "Editor Utama Teknologi & AI",
        bio: "Peneliti komputasi dan jurnalis teknologi senior dengan lebih dari 12 tahun pengalaman meliput revolusi kecerdasan buatan dan semikonduktor global.",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        email: "raditya@modernnews.id",
        twitter: "@radityapratama",
        linkedin: "raditya-pratama",
        user: primaryReporterId ? Number(primaryReporterId) : undefined,
      },
      {
        name: "Clarissa Wijaya, M.Sc.",
        slug: "clarissa-wijaya",
        role: "Jurnalis Ekonomi & Kebijakan Fiskal",
        bio: "Analis pasar keuangan dan makroekonomi alumni LSE. Rutin menyajikan telaah mendalam terkait disrupsi fintech dan transisi energi terbarukan.",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        email: "clarissa@modernnews.id",
        twitter: "@clarissawijaya",
        linkedin: "clarissa-wijaya",
        user: editorUserId ? Number(editorUserId) : undefined,
      },
      {
        name: "Farhan Hakim",
        slug: "farhan-hakim",
        role: "Koresponden Investigasi Antariksa & Sains",
        bio: "Spesialis liputan astronomi, fisika partikel, dan komputasi kuantum. Berpengalaman meliput fasilitas peluncuran roket dan riset observatorium internasional.",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        email: "farhan@modernnews.id",
        twitter: "@farhanhakim_sci",
        linkedin: "farhan-hakim",
        user: undefined,
      },
    ];

    const authorMap: Record<string, string> = {};

    for (const auth of authorsData) {
      const existing = await payload.find({
        collection: "authors",
        where: { slug: { equals: auth.slug } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length > 0) {
        console.log(`  Updating author: ${auth.name} (Linked user: ${auth.user || "none"})`);
        const updated = await payload.update({
          collection: "authors",
          id: existing.docs[0].id,
          data: auth,
          overrideAccess: true,
        });
        authorMap[auth.slug] = String(updated.id);
      } else {
        console.log(`  ➕ Creating author: ${auth.name} (Linked user: ${auth.user || "none"})`);
        const created = await payload.create({
          collection: "authors",
          data: auth,
          overrideAccess: true,
        });
        authorMap[auth.slug] = String(created.id);
      }
    }

    // ==========================================
    // 5. SEED ARTICLES (Published, Drafts, Archived)
    // ==========================================
    console.log("\n📰 Seeding Articles (Published, Drafts, and Archived)...");

    const reporterUserIdNum = primaryReporterId ? Number(primaryReporterId) : undefined;
    const radityaAuthorIdNum = Number(authorMap["raditya-pratama"]);
    const clarissaAuthorIdNum = Number(authorMap["clarissa-wijaya"]);
    const farhanAuthorIdNum = Number(authorMap["farhan-hakim"]);

    const articlesData = [
      // 1. Main Featured Article
      {
        title:
          "Revolusi Agen AI Otonom: Bagaimana Model Generatif Mengubah Lanskap Rekayasa Perangkat Lunak 2026",
        slug: "revolusi-agen-ai-otonom-rekayasa-perangkat-lunak-2026",
        lead: "Pergeseran paradigma dari copilot interaktif menuju autonomous multi-agent systems mentransformasi kecepatan pengiriman software enterprise hingga sepuluh kali lipat.",
        content: `Kecerdasan buatan kini tidak lagi sekadar menjadi asisten pelengkap kode baris demi baris. Pada paruh pertama 2026, adopsi autonomous AI agent networks telah memasuki fase produksi di ribuan organisasi rekayasa teknologi skala global.

### Dari Coding Assistant Menuju Full Autonomous Workflow

Dalam tiga tahun terakhir, para pengembang terbiasa menggunakan completion autocomplete. Namun, lompatan terbesar terjadi ketika arsitektur penalaran terdistribusi (Distributed Reasoning Architecture) diintegrasikan dengan tooling orchestration real-time.

> "Kami tidak lagi melihat developer menulis fungsi CRUD berulang kali. Kini peran software architect bergeser menjadi konduktor orkestrasi logika bisnis, keamanan, dan verifikasi formal kinerja sistem," ungkap Dr. Raditya Pratama dalam simposium arsitektur perangkat lunak terkini.

#### Tiga Pilar Fundamental Sistem Agen Otonom

1. **Self-Correction & Automated Verification Loop**: Agen mampu menjalankan automated testing suite, mendeteksi regresi performa, dan memverifikasi type-safety secara independen sebelum menyodorkan review pull request.
2. **Deterministic Context Boundaries**: Membatasi konsumsi token dengan strategi selective retrieval, meminimalisir halusinasi hingga di bawah 0,1%.
3. **Continuous Performance Profiling**: Mengintegrasikan APM (Application Performance Monitoring) secara native ke dalam lifecycle pengembangan.

### Dampak Nyata terhadap Efisiensi dan Skalabilitas Tim

Survei terhadap 500 perusahaan teknologi terkemuka mencatat penurunan lead time to changes sebesar 68%, sementara cakupan pengujian unit meningkat rata-rata 45%. Kendati demikian, tantangan tata kelola kode, audit keamanan rantai pasok (supply chain security), dan etika privasi data tetap menjadi pilar utama yang membutuhkan pengawasan manusia secara ketat.

Ke depan, tim rekayasa perangkat lunak yang berhasil memadukan keahlian domain arsitektur tingkat tinggi dengan akselerasi agen otonom akan memimpin laju disrupsi digital dunia.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
        imageCaption:
          "Visualisasi jaringan saraf tiruan dan representasi alur pemrosesan penalaran AI generasi terbaru. (Foto: Unsplash/Guerillabuzz)",
        category: Number(categoryMap["teknologi"]),
        tags: [Number(tagMap["artificial-intelligence"]), Number(tagMap["semikonduktor"])],
        author: radityaAuthorIdNum,
        reporter: reporterUserIdNum,
        status: "published" as const,
        isFeatured: true,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        viewCount: 14230,
      },

      // 2. Business Article
      {
        title:
          "Transisi Energi Hijau dan Gelombang Investasi Infrastruktur Bersih 500 Triliun Rupiah",
        slug: "transisi-energi-hijau-investasi-infrastruktur-bersih",
        lead: "Akselerasi pembangunan pembangkit listrik tenaga surya terapung dan jaringan transmisi cerdas menarik minat investor institusi internasional.",
        content: `Komitmen pencapaian Net Zero Emission kian mewujud nyata melalui peluncuran megaproyek energi terbarukan terpadu. Sektor perbankan dan konsorsium sovereign wealth fund menegaskan alokasi modal hijau berskala raksasa guna membiayai diversifikasi sumber daya energi masa depan.

### Modernisasi Grid Transmisi Nasional

Salah satu tantangan fundamental pembangkit energi terbarukan adalah sifat intermiten dari angin dan surya. Guna mengatasi disparitas beban, implementasi Smart Grid Transmission berbasis IoT dan sistem baterai penyimpanan skala gigawatt (BESS) menjadi fokus utama pembangunan 2026.

- Pembangunan interkoneksi kabel bawah laut antar-pulau.
- Integrasi otomatisasi stasiun distribusi listrik real-time.
- Pembiayaan berbasis green bonds dengan standar sertifikasi global.

Langkah strategis ini diproyeksikan membuka lebih dari 120.000 lapangan kerja terampil baru di bidang rekayasa lingkungan dan teknologi energi bersih.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
        imageCaption:
          "Fasilitas turbin angin dan instalasi panel surya berskala besar. (Foto: Unsplash/Karsten Würth)",
        category: Number(categoryMap["bisnis"]),
        tags: [Number(tagMap["energi-hijau"]), Number(tagMap["pasar-saham"])],
        author: clarissaAuthorIdNum,
        reporter: undefined,
        status: "published" as const,
        isFeatured: true,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        viewCount: 9840,
      },

      // 3. Science Article
      {
        title:
          "Teleskop Antariksa Generasi Baru Deteksi Jejak Uap Air dan Karbon pada Eksoplanet Mirip Bumi",
        slug: "teleskop-antariksa-deteksi-potensi-biosfer-eksoplanet",
        lead: "Spektroskopi presisi tinggi dari observatorium luar angkasa mengungkap komposisi atmosfer yang memicu antusiasme komunitas astrofisika dunia.",
        content: `Observasi terbaru terhadap sistem bintang berjarak 40 tahun cahaya berhasil mengidentifikasi spektrum penyerapan molekul esensial kehidupan di lapisan atmosfer planet terestrial berjuluk Kepler-452c.

Data spektrometri inframerah menunjukkan adanya rasio uap air dan karbon dioksida dalam proporsi yang mendukung stabilitas suhu permukaan untuk air dalam wujud cair. Tim peneliti gabungan saat ini tengah melakukan kalibrasi data lanjutan guna memverifikasi biomarker lainnya seperti metana dan ozon.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        imageCaption:
          "Ilustrasi artistik eksoplanet beratmosfer tipis yang mengorbit bintang induknya. (Foto: NASA/ESA)",
        category: Number(categoryMap["sains"]),
        tags: [Number(tagMap["misi-antariksa"])],
        author: farhanAuthorIdNum,
        reporter: undefined,
        status: "published" as const,
        isFeatured: true,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        viewCount: 18560,
      },

      // 4. National Logistics Article
      {
        title:
          "Infrastruktur Kereta Cepat Lintas Pulau: Mengubah Peta Pertumbuhan Koridor Logistik Nasional",
        slug: "infrastruktur-kereta-cepat-koridor-logistik-nasional",
        lead: "Efisiensi konektivitas jalur rel modern memangkas waktu tempuh antarkota hingga 60%, mendorong desentralisasi sentra industri manufaktur bernilai tambah tinggi.",
        content: `Perluasan jaringan perkeretaapian cepat nasional kini memasuki fase komersialisasi penuh pada koridor aglomerasi utama. Tidak hanya memfasilitasi mobilitas jutaan komuter harian, sistem angkutan logistik ekspres berbasis rel turut menekan biaya distribusi komoditas hingga 30%.

Konektivitas langsung ke pelabuhan peti kemas internasional memastikan waktu dwelling time pelabuhan kian kompetitif bersaing dengan hub logistik Asia Tenggara.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
        imageCaption:
          "Rangkaian kereta modern berkecepatan tinggi melintasi koridor jembatan antarprovinsi. (Foto: Unsplash)",
        category: Number(categoryMap["nasional"]),
        tags: [Number(tagMap["kebijakan-publik"])],
        author: clarissaAuthorIdNum,
        reporter: undefined,
        status: "published" as const,
        isFeatured: false,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        viewCount: 6510,
      },

      // 5. International Chip Treaty
      {
        title:
          "Perjanjian Dagang Multilateral Baru Perkuat Rantai Pasok Semikonduktor Asia-Pasifik",
        slug: "perjanjian-dagang-rantai-pasok-semikonduktor-asia-pasifik",
        lead: "Para menteri perdagangan dari 14 negara menyepakati klausul proteksi ketahanan suplai chip mikro dan transfer riset teknologi manufaktur litografi canggih.",
        content: `Ketergantungan ekonomi global terhadap komponen chip semikonduktor mendorong lahirnya kerangka kerja sama ketahanan pasokan paling komprehensif dalam satu dekade terakhir.

Perjanjian ini mengantisipasi disrupsi logistik melalui pembentukan buffer inventory bersama dan insentif fiskal terkoordinasi bagi pembangunan pabrik wafer fabrikasi di kawasan regional.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        imageCaption:
          "Papan sirkuit terintegrasi dan chip silikon litografi mikron. (Foto: Unsplash/Alexandre Debiève)",
        category: Number(categoryMap["internasional"]),
        tags: [Number(tagMap["semikonduktor"]), Number(tagMap["pasar-saham"])],
        author: radityaAuthorIdNum,
        reporter: reporterUserIdNum,
        status: "published" as const,
        isFeatured: false,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
        viewCount: 8190,
      },

      // 6. Lifestyle & Deep Work
      {
        title:
          "Mendefinisikan Ulang Keseimbangan Kerja: Tren Deep Work dan Batas Komunikasi Asinkron",
        slug: "mendefinisikan-keseimbangan-kerja-tren-deep-work",
        lead: "Studi psikologi organisasi terbaru mengungkap budaya rapat virtual tanpa henti memicu kejenuhan kognitif. Praktik komunikasi asinkron mulai diadopsi perusahaan papan atas.",
        content: `Pergeseran ke model kerja fleksibel menuntut disiplin baru dalam menjaga konsentrasi mendalam (deep work). Alih-alih mengharuskan respons instan di aplikasi pesan kantor, model organisasi modern menetapkan jam fokus tanpa interupsi dan dokumentasi tertulis sebagai standar kolaborasi utama.

Hasil evaluasi menunjukkan peningkatan kualitas pengambilan keputusan strategis dan tingkat kepuasan kerja karyawan yang signifikan.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
        imageCaption:
          "Meja kerja minimalis yang mendukung konsentrasi tinggi dan produktivitas tenang. (Foto: Unsplash)",
        category: Number(categoryMap["lifestyle"]),
        tags: [Number(tagMap["deep-work"])],
        author: clarissaAuthorIdNum,
        reporter: undefined,
        status: "published" as const,
        isFeatured: false,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
        viewCount: 11200,
      },

      // 7. Opinion on AI Regulation
      {
        title: "Menatap Masa Depan Etika AI: Mengapa Regulasi Algoritma Otonom Mendesak Disahkan",
        slug: "menatap-masa-depan-etika-ai-regulasi-algoritma-otonom",
        lead: "Perkembangan pesat sistem kecerdasan buatan otonom membutuhkan payung hukum komprehensif guna melindungi hak cipta intelektual dan keamanan privasi warga.",
        content: `Kecepatan inovasi teknologi acap kali mendahului kesiapan regulasi. Dalam konteks sistem kecerdasan otonom yang kini mampu mengambil keputusan finansial dan medis, ketiadaan standar audit algoritma menimbulkan risiko disrupsi sosial yang tidak terduga.

Pemerintah dan praktisi industri harus segera merumuskan pedoman kepatuhan yang proporsional: melindungi hak konsumen tanpa mematikan inovasi riset para perintis startup teknologi lokal.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Refleksi etika komputasi dalam lanskap kecerdasan artifisial global.",
        category: Number(categoryMap["opini"]),
        tags: [Number(tagMap["artificial-intelligence"]), Number(tagMap["kebijakan-publik"])],
        author: radityaAuthorIdNum,
        reporter: reporterUserIdNum,
        status: "published" as const,
        isFeatured: false,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
        viewCount: 4320,
      },

      // 8. Solid-State EV Batteries
      {
        title:
          "Konsorsium Baterai Solid-State Mulai Uji Coba Massal untuk Kendaraan Listrik Generasi Tiga",
        slug: "konsorsium-baterai-solid-state-uji-coba-massal-kendaraan-listrik",
        lead: "Kepadatan energi baterai meningkat dua kali lipat dengan waktu pengisian daya kurang dari 12 menit, membuka era baru adopsi transportasi elektrifikasi.",
        content: `Terobosan elektrolit padat berhasil menyelesaikan kendala keamanan dendritik yang selama bertahun-tahun membayangi riset baterai lithium konvensional. Prototipe mobil listrik yang menggunakan paket baterai baru ini mencatat jarak tempuh lebih dari 950 kilometer dalam sekali pengisian.

Fasilitas perakitan percontohan dijadwalkan beroperasi komersial pada kuartal keempat tahun ini dengan kapasitas awal 20 gigawatt-hour per tahun.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1558441719-8b489c63f70b?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Instalasi sel baterai generasi terbaru dan modul manajemen daya cerdas.",
        category: Number(categoryMap["teknologi"]),
        tags: [Number(tagMap["kendaraan-listrik"]), Number(tagMap["energi-hijau"])],
        author: radityaAuthorIdNum,
        reporter: reporterUserIdNum,
        status: "published" as const,
        isFeatured: false,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 840).toISOString(),
        viewCount: 7890,
      },

      // ========================================================
      // 9. DRAFT ARTICLE FOR REPORTER DASHBOARD (Status: Draft!)
      // ========================================================
      {
        title:
          "[DRAF] Catatan Investigasi: Mengurai Efisiensi Data Center Berpendingin Cairan di Asia Tenggara",
        slug: "catatan-investigasi-efisiensi-data-center-pendingin-cairan",
        lead: "Peningkatan beban komputasi AI memicu lonjakan konsumsi daya pusat data. Teknologi direct-to-chip liquid cooling menjadi standar mutlak fasilitas hyperscale baru.",
        content: `Artikel draf investigasi mendalam mengenai konsumsi energi dan pemanfaatan air pada fasilitas pusat data modern. Perlu verifikasi angka PUE (Power Usage Effectiveness) dari operator data center regional sebelum publikasi final.

Wawancara dengan asosiasi insinyur pendingin termal telah dirampungkan pada pekan lalu. Menunggu konfirmasi data resmi kementerian ESDM terkait tarif listrik industri hijau.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        imageCaption:
          "Rak server komputasi awan hyperscale dengan sistem pembuangan panas terisolasi.",
        category: Number(categoryMap["teknologi"]),
        tags: [Number(tagMap["artificial-intelligence"]), Number(tagMap["energi-hijau"])],
        author: radityaAuthorIdNum,
        reporter: reporterUserIdNum,
        status: "draft" as const,
        isFeatured: false,
        isBreaking: false,
        publishedAt: new Date().toISOString(),
        viewCount: 0,
      },

      // 10. DRAFT ARTICLE FOR REPORTER DASHBOARD 2 (Status: Draft!)
      {
        title: "[DRAF] Wawancara Khusus: Roadmap Ekosistem Semikonduktor 2nm Menuju 2028",
        slug: "wawancara-khusus-roadmap-semikonduktor-2nm-2028",
        lead: "Catatan wawancara eksklusif bersama pimpinan konsorsium riset mikroelektronika mengenai tantangan litografi High-NA EUV.",
        content: `Transkrip wawancara eksklusif sedang dalam proses penyuntingan dan pengecekan fakta (fact-check). 

Poin-poin utama yang dibahas:
- Biaya mesin litografi generasi terkini yang menembus ratusan juta dolar per unit.
- Kesiapan tenaga ahli rekayasa material nano di kawasan ASEAN.
- Skema pendanaan kemitraan publik-swasta.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Proses fabrikasi mikroelektronika di ruang bersih bersuhu konstan.",
        category: Number(categoryMap["teknologi"]),
        tags: [Number(tagMap["semikonduktor"])],
        author: radityaAuthorIdNum,
        reporter: reporterUserIdNum,
        status: "draft" as const,
        isFeatured: false,
        isBreaking: false,
        publishedAt: new Date().toISOString(),
        viewCount: 0,
      },

      // 11. ARCHIVED ARTICLE FOR REPORTER DASHBOARD (Status: Archived!)
      {
        title: "[ARSIP] Tinjauan Tahunan: Tonggak Sejarah Adopsi Cloud Enterprise 2025",
        slug: "tinjauan-tahunan-tonggak-sejarah-cloud-enterprise-2025",
        lead: "Rangkuman retrospeksi migrasi beban kerja perbankan dan retail ke arsitektur multi-cloud sepanjang tahun 2025.",
        content: `Dokumen arsip komprehensif yang merangkum dinamika industri komputasi awan tahun lalu. Digunakan sebagai rujukan referensi studi kasus dan analisis perbandingan historis redaksi.`,
        featuredImageUrl:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Arsip infografik infrastruktur cloud global.",
        category: Number(categoryMap["teknologi"]),
        tags: [Number(tagMap["artificial-intelligence"])],
        author: radityaAuthorIdNum,
        reporter: reporterUserIdNum,
        status: "archived" as const,
        isFeatured: false,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
        viewCount: 3100,
      },
    ];

    const seededArticles: Record<string, string> = {};

    for (const art of articlesData) {
      const existing = await payload.find({
        collection: "articles",
        where: { slug: { equals: art.slug } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length > 0) {
        console.log(`  Updating article: ${art.title.slice(0, 45)}... [${art.status}]`);
        const updated = await payload.update({
          collection: "articles",
          id: existing.docs[0].id,
          data: art,
          overrideAccess: true,
        });
        seededArticles[art.slug] = String(updated.id);
      } else {
        console.log(`  ➕ Creating article: ${art.title.slice(0, 45)}... [${art.status}]`);
        const created = await payload.create({
          collection: "articles",
          data: art,
          overrideAccess: true,
        });
        seededArticles[art.slug] = String(created.id);
      }
    }

    // ==========================================
    // 6. SEED BREAKING NEWS GLOBAL
    // ==========================================
    console.log("\n⚡ Updating Breaking News Global...");

    await payload.updateGlobal({
      slug: "breaking-news",
      data: {
        isActive: true,
        headline:
          "Konsorsium Riset Global Umumkan Terobosan Komputasi Kuantum Skala Industri 100.000 Qubit",
        url: "/berita/revolusi-agen-ai-otonom-rekayasa-perangkat-lunak-2026",
        badgeText: "BREAKING",
      },
      overrideAccess: true,
    });
    console.log("  Breaking news global updated successfully.");

    // ==========================================
    // 7. SEED COMMENTS
    // ==========================================
    console.log("\n💬 Seeding Reader Comments...");

    const mainArticleId = seededArticles["revolusi-agen-ai-otonom-rekayasa-perangkat-lunak-2026"];

    if (mainArticleId) {
      const commentsToSeed = [
        {
          article: Number(mainArticleId),
          name: "Dimas Suryo",
          email: "dimas.suryo@gmail.com",
          content:
            "Ulasan yang sangat bernas dan komprehensif! Pergeseran peran engineer dari sekadar penulis kode menuju orchestrator logika bisnis memang terasa sangat nyata dalam 6 bulan terakhir.",
          status: "approved" as const,
        },
        {
          article: Number(mainArticleId),
          name: "Anindya Putri, Ph.D.",
          email: "anindya.putri@univ.ac.id",
          content:
            "Poin mengenai 'Deterministic Context Boundaries' sangat krusial. Dalam implementasi nyata, membatasi halusinasi dan memastikan type-safety jauh lebih penting ketimbang sekadar kecepatan generasi token.",
          status: "approved" as const,
        },
        {
          article: Number(mainArticleId),
          name: "Rizky Ramadhan",
          email: "rizky.r@techcompany.id",
          content:
            "Bagaimana dengan aspek regulasi lisensi kode dan audit keamanan dependensi? Apakah ke depannya redaksi bisa mengulas topik ini secara spesifik?",
          status: "approved" as const,
        },
      ];

      for (const com of commentsToSeed) {
        const existing = await payload.find({
          collection: "comments",
          where: {
            and: [{ article: { equals: com.article } }, { email: { equals: com.email } }],
          },
          limit: 1,
          overrideAccess: true,
        });

        if (existing.docs.length === 0) {
          console.log(`  ➕ Adding comment by ${com.name}`);
          await payload.create({
            collection: "comments",
            data: com,
            overrideAccess: true,
          });
        }
      }
    }

    // ==========================================
    // 8. SEED NEWSLETTERS
    // ==========================================
    console.log("\n📬 Seeding Newsletter Subscribers...");

    const newsletters = [
      { email: "reader.pagi@modernnews.id", status: "active" as const },
      { email: "eksekutif.tekno@startup.co.id", status: "active" as const },
      { email: "analis.pasar@investasi.id", status: "active" as const },
    ];

    for (const sub of newsletters) {
      const existing = await payload.find({
        collection: "newsletters",
        where: { email: { equals: sub.email } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length === 0) {
        await payload.create({
          collection: "newsletters",
          data: sub,
          overrideAccess: true,
        });
      }
    }

    console.log("\n========================================================");
    console.log("🎉 SEEDING BERHASIL DISELESAIKAN DENGAN SEMPURNA!");
    console.log("========================================================");
    console.log("Kredensial Akun untuk Anda Coba:");
    console.log("1. ADMIN PANEL (/admin):");
    console.log("   - Email   : admin@modernnews.id (atau admin@admin.com)");
    console.log("   - Password: admin12345");
    console.log(
      "   - Fitur   : Mengelola seluruh koleksi, terbitkan artikel, kelola kategori & user.",
    );
    console.log("\n2. REPORTER DASHBOARD (/reporter):");
    console.log("   - Email   : reporter@modernnews.id (atau reporter@reporter.com)");
    console.log("   - Password: reporter12345");
    console.log(
      "   - Fitur   : Ruang redaksi khusus reporter; pantau draf, tulis artikel, status tulisan.",
    );
    console.log("========================================================\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Fatal Seeding Error:", err);
    process.exit(1);
  }
}

seed();
