export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio?: string;
  avatar?: string;
  email?: string;
  twitter?: string;
  linkedin?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  lead: string;
  content: string;
  featuredImageUrl: string;
  imageCaption?: string;
  category: Category;
  tags: Tag[];
  author: Author;
  status: "published" | "draft" | "archived";
  isFeatured: boolean;
  isBreaking: boolean;
  publishedAt: string;
  readingTimeMinutes: number;
  viewCount: number;
}

export interface Comment {
  id: string;
  articleId: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
  status: "approved" | "pending" | "spam";
}

export interface BreakingNewsItem {
  id: string;
  headline: string;
  url: string;
  badgeText?: string;
  publishedAt: string;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  mainNav: { label: string; href: string }[];
  categoriesNav: { label: string; href: string }[];
  socialLinks: { platform: string; url: string }[];
}

export interface PaginatedResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
