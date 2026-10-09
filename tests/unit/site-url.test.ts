import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "../../src/lib/seo/site-url";

describe("resolveSiteUrl", () => {
  it("uses localhost only for development when no URL is configured", () => {
    expect(resolveSiteUrl(undefined, false).origin).toBe("http://localhost:3000");
  });

  it("requires a configured URL in production", () => {
    expect(() => resolveSiteUrl(undefined, true)).toThrow("NEXT_PUBLIC_SERVER_URL must be set");
  });

  it("accepts a public HTTPS origin in production", () => {
    expect(resolveSiteUrl("https://news.example.com/", true).origin).toBe(
      "https://news.example.com",
    );
  });

  it.each(["http://news.example.com", "http://localhost:3000", "https://news.example.com/path"])(
    "rejects unsafe production URL %s",
    (url) => {
      expect(() => resolveSiteUrl(url, true)).toThrow();
    },
  );

  it("rejects credentials and query strings", () => {
    expect(() => resolveSiteUrl("https://user:secret@news.example.com", false)).toThrow();
    expect(() => resolveSiteUrl("https://news.example.com/?preview=true", false)).toThrow();
  });
});
