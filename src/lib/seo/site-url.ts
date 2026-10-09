export function resolveSiteUrl(configuredUrl: string | undefined, isProduction: boolean): URL {
  const rawUrl = configuredUrl?.trim();
  if (!rawUrl) {
    if (isProduction) {
      throw new Error(
        "NEXT_PUBLIC_SERVER_URL must be set to the public HTTPS site URL in production.",
      );
    }
    return new URL("http://localhost:3000");
  }

  let siteUrl: URL;
  try {
    siteUrl = new URL(rawUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_SERVER_URL must be a valid absolute URL.");
  }

  if (
    siteUrl.username ||
    siteUrl.password ||
    siteUrl.pathname !== "/" ||
    siteUrl.search ||
    siteUrl.hash
  ) {
    throw new Error(
      "NEXT_PUBLIC_SERVER_URL must contain only the site origin, without credentials, path, query, or hash.",
    );
  }
  if (isProduction && siteUrl.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SERVER_URL must use HTTPS in production.");
  }
  if (isProduction && ["localhost", "127.0.0.1", "::1"].includes(siteUrl.hostname)) {
    throw new Error("NEXT_PUBLIC_SERVER_URL must not point to localhost in production.");
  }

  return siteUrl;
}

export function getSiteUrl(): URL {
  return resolveSiteUrl(process.env.NEXT_PUBLIC_SERVER_URL, process.env.NODE_ENV === "production");
}
