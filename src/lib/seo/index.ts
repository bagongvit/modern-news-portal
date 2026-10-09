import { Metadata } from "next";
import { Article } from "@/types/news";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/seo/site-url";

const baseUrl = getSiteUrl().origin;

export function generatePortalMetadata(options?: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const title = options?.title
    ? `${options.title} | ${siteConfig.siteName}`
    : `${siteConfig.siteName} — ${siteConfig.tagline}`;
  const description = options?.description || siteConfig.description;
  const url = `${baseUrl}${options?.path || ""}`;
  const image = options?.image || `${baseUrl}/og-default.png`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": `${baseUrl}/feed.xml`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "id_ID",
      type: options?.type || "website",
      ...(options?.publishedTime && {
        publishedTime: options.publishedTime,
      }),
      ...(options?.authors && {
        authors: options.authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@modernnews",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateNewsArticleJsonLd(article: Article) {
  const url = `${baseUrl}/berita/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.lead,
    image: [article.featuredImageUrl],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      url: `${baseUrl}/penulis/${article.author.slug}`,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.siteName,
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.svg`,
      },
    },
    articleSection: article.category.name,
    keywords: article.tags.map((t) => t.name).join(", "),
    wordCount: article.content.split(/\s+/).length,
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
