import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { SanityLive } from "@/sanity/lib/live";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarToggle from "@/components/SidebarToggle";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingDock } from "@/components/FloatingDock";
import { ModeToggle } from "@/components/DarkModeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nerijus Urbonas",
  description: "Portfolio Next",
};

/**
 * Defines the root layout for the localized portfolio app.
 * @param {{ children: React.ReactNode; params: { locale: string } }} props - Layout props with child routes and locale.
 * @returns {Promise<JSX.Element>} The root layout structure.
 */
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const activeLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;

  const messages = (await import(`../../../messages/${activeLocale}.json`))
    .default;

  return (
    <ClerkProvider>
      <NextIntlClientProvider locale={activeLocale} messages={messages}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Script
            src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
            strategy="afterInteractive"
          />
          <SidebarProvider defaultOpen={false}>
            <SidebarInset>{children}</SidebarInset>
            <AppSidebar side="right" />
            <FloatingDock locale={activeLocale} />
            <SidebarToggle />

            {/* Mode Toggle & Language Switcher - Desktop: bottom right next to AI chat, Mobile: top right next to burger menu */}
            <div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-40 flex items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12">
                <LanguageSwitcher />
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12">
                <ModeToggle />
              </div>
            </div>
          </SidebarProvider>

          <SanityLive />

          {(await draftMode()).isEnabled && (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}
        </ThemeProvider>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
