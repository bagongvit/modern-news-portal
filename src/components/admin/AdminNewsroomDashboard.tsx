import React from "react";
import Link from "next/link";
import type { Payload, User } from "payload";
import { getPayloadClient } from "@/lib/cms/payload";
import { formatRelativeTime } from "@/lib/utils";
import "./AdminNewsroomDashboard.css";

interface AdminNewsroomDashboardProps {
  payload?: Payload;
  user?: User;
}

interface ArticleDoc {
  id: string | number;
  title: string;
  slug: string;
  status: "published" | "draft" | "archived";
  updatedAt: string;
  publishedAt?: string;
  viewCount?: number;
  category?: { id?: string | number; name?: string; slug?: string } | null;
  author?: { id?: string | number; name?: string } | null;
}

export async function AdminNewsroomDashboard({
  payload: payloadProp,
  user,
}: AdminNewsroomDashboardProps) {
  const payload = payloadProp || (await getPayloadClient());

  let publishedCount = 0;
  let draftCount = 0;
  let archivedCount = 0;
  let commentsTotal = 0;
  let commentsPending = 0;
  let authorsCount = 0;
  let subscribersCount = 0;
  let breakingNews = {
    isActive: false,
    headline: "Tidak ada breaking news aktif saat ini",
    badgeText: "BREAKING",
    url: "/",
  };
  let recentArticles: ArticleDoc[] = [];

  if (payload) {
    try {
      const [
        pubRes,
        draftRes,
        archRes,
        commTotalRes,
        commPendingRes,
        authRes,
        subRes,
        breakingRes,
        recentArtRes,
      ] = await Promise.all([
        payload.count({ collection: "articles", where: { status: { equals: "published" } } }),
        payload.count({ collection: "articles", where: { status: { equals: "draft" } } }),
        payload.count({ collection: "articles", where: { status: { equals: "archived" } } }),
        payload.count({ collection: "comments" }),
        payload.count({ collection: "comments", where: { status: { equals: "pending" } } }),
        payload.count({ collection: "authors" }),
        payload.count({ collection: "newsletters", where: { status: { equals: "active" } } }),
        payload.findGlobal({ slug: "breaking-news" }).catch(() => null),
        payload.find({
          collection: "articles",
          sort: "-updatedAt",
          limit: 6,
          depth: 1,
        }),
      ]);

      publishedCount = pubRes.totalDocs;
      draftCount = draftRes.totalDocs;
      archivedCount = archRes.totalDocs;
      commentsTotal = commTotalRes.totalDocs;
      commentsPending = commPendingRes.totalDocs;
      authorsCount = authRes.totalDocs;
      subscribersCount = subRes.totalDocs;
      if (breakingRes) {
        breakingNews = {
          isActive: Boolean(breakingRes.isActive),
          headline: breakingRes.headline || "Tidak ada breaking news aktif",
          badgeText: breakingRes.badgeText || "BREAKING",
          url: breakingRes.url || "/",
        };
      }
      recentArticles = recentArtRes.docs as unknown as ArticleDoc[];
    } catch (e) {
      console.error("Gagal memuat analitik newsroom dashboard:", e);
    }
  }

  const totalArticles = publishedCount + draftCount + archivedCount;
  const roleName =
    user?.role === "admin"
      ? "Pemimpin Redaksi / Super Admin"
      : user?.role === "editor"
        ? "Editor Pelaksana"
        : "Jurnalis / Kontributor";

  const todayStr = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date());

  return (
    <div className="nr-mission-control">
      {/* ===================================================================
          1. HERO EXECUTIVE BANNER & HIGH-FREQUENCY ACTION BAR
          =================================================================== */}
      <section className="nr-hero-banner">
        <div className="nr-hero-content">
          <div>
            <div className="nr-status-badge">
              <span className="nr-pulse-dot" />
              <span>Pusat Komando Redaksi • Operasional 24/7</span>
            </div>

            <h1 className="nr-hero-title">
              <span>Selamat bertugas, {user?.name || user?.email || "Redaktur"}</span>
            </h1>

            <p className="nr-hero-subtitle">
              <span className="nr-role-pill">🛡️ {roleName}</span>
              <span>📅 {todayStr} (WIB)</span>
              <span>• Sistem Penerbitan Berita Multi-Platform</span>
            </p>
          </div>

          <div className="nr-hero-actions">
            <Link
              href="/admin/collections/articles/create"
              className="nr-btn nr-btn-primary"
              title="Tulis artikel berita baru"
            >
              <span>✍️</span>
              <span>Tulis Berita Baru</span>
            </Link>

            <Link
              href="/admin/globals/breaking-news"
              className="nr-btn nr-btn-crimson"
              title="Pasang atau perbarui breaking news running text"
            >
              <span>⚡</span>
              <span>Atur Breaking News</span>
            </Link>

            <Link
              href="/admin/collections/comments"
              className="nr-btn nr-btn-glass"
              title="Periksa dan moderasi komentar pembaca"
            >
              <span>💬</span>
              <span>Moderasi Komentar {commentsPending > 0 && `(${commentsPending})`}</span>
            </Link>

            <Link
              href="/reporter"
              className="nr-btn nr-btn-glass"
              title="Buka meja kerja jurnalis & wartawan"
            >
              <span>📰</span>
              <span>Meja Wartawan</span>
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="nr-btn nr-btn-glass"
              title="Buka portal berita publik di tab baru"
            >
              <span>🌐</span>
              <span>Pratinjau Web ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. NEWSROOM EXECUTIVE KPIS (5 REALTIME METRIC CARDS)
          =================================================================== */}
      <section className="nr-kpi-grid">
        {/* Metric 1: Artikel Terbit */}
        <Link
          href="/admin/collections/articles?where[status][equals]=published"
          className="nr-kpi-card"
        >
          <div className="nr-kpi-header">
            <span className="nr-kpi-label">Artikel Terbit</span>
            <div className="nr-kpi-icon-wrap nr-icon-emerald">📰</div>
          </div>
          <h3 className="nr-kpi-value">{publishedCount}</h3>
          <p className="nr-kpi-desc">
            <span>Tayang di portal berita</span>
          </p>
        </Link>

        {/* Metric 2: Draf & Menunggu Review */}
        <Link
          href="/admin/collections/articles?where[status][equals]=draft"
          className="nr-kpi-card"
        >
          <div className="nr-kpi-header">
            <span className="nr-kpi-label">Draf Naskah</span>
            <div className="nr-kpi-icon-wrap nr-icon-amber">✍️</div>
          </div>
          <h3 className="nr-kpi-value">{draftCount}</h3>
          <p className="nr-kpi-desc">
            {draftCount > 0 ? (
              <span className="nr-badge-alert">⚠️ Perlu review editor</span>
            ) : (
              <span>Semua naskah terkelola</span>
            )}
          </p>
        </Link>

        {/* Metric 3: Breaking News Live Status */}
        <Link href="/admin/globals/breaking-news" className="nr-kpi-card">
          <div className="nr-kpi-header">
            <span className="nr-kpi-label">Breaking News</span>
            <div className="nr-kpi-icon-wrap nr-icon-rose">⚡</div>
          </div>
          <h3 className="nr-kpi-value" style={{ fontSize: "1.25rem", paddingTop: "0.25rem" }}>
            {breakingNews.isActive ? "🔴 AKTIF SIAR" : "⚪ NON-AKTIF"}
          </h3>
          <p className="nr-kpi-desc">
            <span>{breakingNews.isActive ? "Ticker tayang di header" : "Mode siaga"}</span>
          </p>
        </Link>

        {/* Metric 4: Komentar Pembaca */}
        <Link href="/admin/collections/comments" className="nr-kpi-card">
          <div className="nr-kpi-header">
            <span className="nr-kpi-label">Komentar Pembaca</span>
            <div className="nr-kpi-icon-wrap nr-icon-blue">💬</div>
          </div>
          <h3 className="nr-kpi-value">{commentsTotal}</h3>
          <p className="nr-kpi-desc">
            {commentsPending > 0 ? (
              <span className="nr-badge-alert">🔴 {commentsPending} menunggu moderasi</span>
            ) : (
              <span>Moderasi bersih</span>
            )}
          </p>
        </Link>

        {/* Metric 5: Tim & Pembaca */}
        <Link href="/admin/collections/authors" className="nr-kpi-card">
          <div className="nr-kpi-header">
            <span className="nr-kpi-label">Tim Jurnalis & Audiens</span>
            <div className="nr-kpi-icon-wrap nr-icon-purple">👥</div>
          </div>
          <h3 className="nr-kpi-value">{authorsCount}</h3>
          <p className="nr-kpi-desc">
            <span>Penulis aktif • {subscribersCount} pelanggan buletin</span>
          </p>
        </Link>
      </section>

      {/* ===================================================================
          3. EDITORIAL WORKFLOW & PRODUCTION PIPELINE
          =================================================================== */}
      <section className="nr-pipeline-strip">
        <div className="nr-pipeline-header">
          <h3 className="nr-pipeline-title">
            <span>🔄 Pipeline Alur Kerja Redaksi</span>
          </h3>
          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
            Total {totalArticles} Naskah Terdata
          </span>
        </div>

        <div className="nr-pipeline-track">
          <div className="nr-pipeline-step">
            <div className="nr-pipeline-step-info">
              <p>Tahap 1</p>
              <h4>Draf & Riset Liputan</h4>
            </div>
            <span className="nr-pipeline-step-count">{draftCount}</span>
          </div>

          <div className="nr-pipeline-step">
            <div className="nr-pipeline-step-info">
              <p>Tahap 2</p>
              <h4>Siap Tayang / Publikasi</h4>
            </div>
            <span className="nr-pipeline-step-count" style={{ color: "#10b981" }}>
              {publishedCount}
            </span>
          </div>

          <div className="nr-pipeline-step">
            <div className="nr-pipeline-step-info">
              <p>Tahap 3</p>
              <h4>Naskah Diarsipkan</h4>
            </div>
            <span className="nr-pipeline-step-count" style={{ color: "#64748b" }}>
              {archivedCount}
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. TWO-COLUMN WORKBENCH: RECENT ARTICLES & EDITORIAL GUIDELINES
          =================================================================== */}
      <section className="nr-workbench-grid">
        {/* Left Column: Recent Newsroom Articles Desk */}
        <div className="nr-card">
          <div className="nr-card-header">
            <h3 className="nr-card-title">
              <span>📋 Meja Liputan & Pembaruan Terkini</span>
            </h3>
            <Link href="/admin/collections/articles" className="nr-card-link">
              Lihat Semua Naskah ({totalArticles}) →
            </Link>
          </div>

          {recentArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "#94a3b8" }}>
              <p>Belum ada artikel yang dibuat.</p>
              <Link
                href="/admin/collections/articles/create"
                className="nr-btn nr-btn-primary"
                style={{ marginTop: "0.5rem" }}
              >
                Mulai Tulis Artikel Perdana
              </Link>
            </div>
          ) : (
            <div className="nr-article-list">
              {recentArticles.map((art) => (
                <div key={art.id} className="nr-article-row">
                  <div className="nr-article-meta-left">
                    <div className="nr-article-tags">
                      <span
                        className={`nr-badge-status ${
                          art.status === "published"
                            ? "nr-status-published"
                            : art.status === "draft"
                              ? "nr-status-draft"
                              : ""
                        }`}
                      >
                        {art.status === "published"
                          ? "Terbit"
                          : art.status === "draft"
                            ? "Draf"
                            : "Arsip"}
                      </span>
                      {art.category?.name && (
                        <span className="nr-badge-cat">📁 {art.category.name}</span>
                      )}
                    </div>

                    <Link
                      href={`/admin/collections/articles/${art.id}`}
                      className="nr-article-title-link"
                      title={art.title}
                    >
                      {art.title}
                    </Link>

                    <div className="nr-article-submeta">
                      <span>👤 {art.author?.name || "Tim Redaksi"}</span>
                      <span>• Diperbarui {formatRelativeTime(art.updatedAt)}</span>
                      <span>• 👁️ {art.viewCount || 0} pembaca</span>
                    </div>
                  </div>

                  <div className="nr-article-actions">
                    <Link
                      href={`/admin/collections/articles/${art.id}`}
                      className="nr-btn-sm nr-btn-outline"
                      title="Edit naskah ini"
                    >
                      <span>✏️ Edit</span>
                    </Link>

                    {art.status === "published" && (
                      <a
                        href={`/berita/${art.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nr-btn-sm nr-btn-outline"
                        title="Buka artikel live di portal"
                      >
                        <span>↗ Web</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Breaking News Live Card & Editorial Ethics Checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Breaking News Live Quick Card */}
          <div className="nr-card">
            <div className="nr-card-header">
              <h3 className="nr-card-title">
                <span>⚡ Monitor Breaking News</span>
              </h3>
              <Link href="/admin/globals/breaking-news" className="nr-card-link">
                Ubah →
              </Link>
            </div>

            <p style={{ margin: 0, fontSize: "0.78125rem", color: "#64748b" }}>
              Headline siaran kilat yang tayang langsung di ticker bagian atas portal web.
            </p>

            <div className="nr-breaking-preview">
              <span className="nr-breaking-tag">
                {breakingNews.isActive ? `🔴 ${breakingNews.badgeText}` : "⚪ SIAGA NON-AKTIF"}
              </span>
              <p className="nr-breaking-title">{breakingNews.headline}</p>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Link
                href="/admin/globals/breaking-news"
                className="nr-btn nr-btn-crimson"
                style={{ width: "100%", boxSizing: "border-box" }}
              >
                <span>⚡ Edit Breaking News Langsung</span>
              </Link>
            </div>
          </div>

          {/* Quality Control & Dewan Pers Guidelines */}
          <div className="nr-card">
            <div className="nr-card-header">
              <h3 className="nr-card-title">
                <span>⚖️ Standar Editorial & Kode Etik</span>
              </h3>
            </div>

            <ul className="nr-checklist">
              <li className="nr-checklist-item">
                <span className="nr-check-icon">✓</span>
                <span>
                  <strong>Verifikasi Dua Sumber:</strong> Wajib konfirmasi silang minimal dua pihak
                  independen sebelum penayangan.
                </span>
              </li>
              <li className="nr-checklist-item">
                <span className="nr-check-icon">✓</span>
                <span>
                  <strong>Hak Cipta Foto:</strong> Cantumkan sumber dokumentasi atau nama fotografer
                  di setiap takarir media.
                </span>
              </li>
              <li className="nr-checklist-item">
                <span className="nr-check-icon">✓</span>
                <span>
                  <strong>Cover Both Sides:</strong> Berikan ruang berimbang pada berita yang memuat
                  isu kontroversial atau investigasi.
                </span>
              </li>
              <li className="nr-checklist-item">
                <span className="nr-check-icon">✓</span>
                <span>
                  <strong>Optimasi SEO:</strong> Pastikan lead paragraf memuat kata kunci utama
                  untuk indeks Google News.
                </span>
              </li>
            </ul>

            <div
              style={{
                marginTop: "1.25rem",
                paddingTop: "1rem",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <Link
                href="/admin/collections/categories"
                className="nr-btn-sm nr-btn-outline"
                title="Kelola kategori kanal berita"
              >
                📁 Kategori
              </Link>
              <Link
                href="/admin/collections/tags"
                className="nr-btn-sm nr-btn-outline"
                title="Kelola topik & tag berita"
              >
                🏷️ Tagar
              </Link>
              <Link
                href="/admin/globals/site-settings"
                className="nr-btn-sm nr-btn-outline"
                title="Pengaturan portal & SEO"
              >
                ⚙️ Pengaturan Web
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
