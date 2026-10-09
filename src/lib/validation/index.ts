import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().min(1, "Alamat email wajib diisi.").email("Format alamat email tidak valid."),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const commentSchema = z.object({
  articleId: z.coerce.number().int().positive("ID artikel tidak valid."),
  name: z.string().min(2, "Nama minimal 2 karakter.").max(50, "Nama maksimal 50 karakter."),
  email: z.string().min(1, "Alamat email wajib diisi.").email("Format email tidak valid."),
  content: z
    .string()
    .min(5, "Komentar minimal 5 karakter.")
    .max(1000, "Komentar maksimal 1000 karakter."),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type CommentInput = z.infer<typeof commentSchema>;

export const searchSchema = z.object({
  q: z.string().optional().default(""),
  kategori: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type SearchInput = z.infer<typeof searchSchema>;
