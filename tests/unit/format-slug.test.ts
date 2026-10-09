import { describe, expect, it } from "vitest";
import type { CollectionBeforeValidateHook } from "payload";
import { formatSlugString, autoGenerateSlug } from "../../payload/hooks/formatSlug";

type HookArgs = Parameters<CollectionBeforeValidateHook>[0];

describe("formatSlugString utility", () => {
  it("converts simple titles to kebab-case", () => {
    expect(formatSlugString("Pemerintah Resmikan Kereta Cepat")).toBe(
      "pemerintah-resmikan-kereta-cepat",
    );
  });

  it("removes punctuation, accents, and special characters", () => {
    expect(formatSlugString("BREAKING: Gempa M 6,2 Guncang Malang, Warga Panik!")).toBe(
      "breaking-gempa-m-62-guncang-malang-warga-panik",
    );

    expect(formatSlugString("iPhone 17 Pro Max & AI Baru: Apakah Layak Beli?")).toBe(
      "iphone-17-pro-max-ai-baru-apakah-layak-beli",
    );
  });

  it("handles leading and trailing spaces or dashes", () => {
    expect(formatSlugString("  --- Judul Berita Penting ---  ")).toBe("judul-berita-penting");
  });
});

describe("autoGenerateSlug hook", () => {
  it("auto generates slug from title if slug is empty", () => {
    const data = {
      title: "Presiden Tinjau Pembangunan IKN Nusantara",
      slug: "",
    };
    const result = autoGenerateSlug({
      data,
      req: {} as unknown as HookArgs["req"],
      operation: "create",
      context: {},
      collection: {} as unknown as HookArgs["collection"],
    });
    expect(result?.slug).toBe("presiden-tinjau-pembangunan-ikn-nusantara");
  });

  it("preserves and cleans user-provided slug", () => {
    const data = {
      title: "Presiden Tinjau Pembangunan IKN Nusantara",
      slug: "custom-slug-ikn-2026",
    };
    const result = autoGenerateSlug({
      data,
      req: {} as unknown as HookArgs["req"],
      operation: "create",
      context: {},
      collection: {} as unknown as HookArgs["collection"],
    });
    expect(result?.slug).toBe("custom-slug-ikn-2026");
  });
});
