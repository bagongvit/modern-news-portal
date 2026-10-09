import type { Metadata } from "next";
import React from "react";
import { fontSans, fontSerif } from "@/lib/fonts";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { QueryProvider } from "@/components/shared/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopBar } from "@/components/layout/TopBar";
import { MarketTickerBar } from "@/components/layout/MarketTickerBar";
import { BreakingNewsTicker } from "@/components/layout/BreakingNewsTicker";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { headers } from "next/headers";
import { getBreakingNews, getPayloadClient } from "@/lib/cms/payload";
import { generatePortalMetadata, generateWebsiteJsonLd } from "@/lib/seo";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { BreakingNewsNotification } from "@/components/layout/BreakingNewsNotification";
import { CommandPalette } from "@/components/search/CommandPalette";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { WebNotificationPrompt } from "@/components/layout/WebNotificationPrompt";
import "../globals.css";

export const metadata: Metadata = generatePortalMetadata();

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayloadClient();
  const [breakingNews, auth] = await Promise.all([
    getBreakingNews(),
    payload ? payload.auth({ headers: await headers() }) : Promise.resolve(null),
  ]);

  const currentUser = auth?.user
    ? {
        name: auth.user.name ?? null,
        email: auth.user.email ?? null,
        role: auth.user.role ?? null,
      }
    : null;

  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100"
      >
        <ThemeProvider
          attribute="class"
          themes={["light", "dark", "solar"]}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="flex min-h-screen flex-col pb-14 md:pb-0">
              <SkipToContent />
              <TopBar />
              <MarketTickerBar />
              <BreakingNewsTicker items={breakingNews} />
              <Header currentUser={currentUser} />
              <main id="main-content" className="flex-1 focus:outline-none">
                {children}
              </main>
              <Footer />
              <MobileBottomNav />
              <BreakingNewsNotification />
              <CommandPalette />
              <ToastContainer />
              <WebNotificationPrompt />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
