import PortfolioContent from "@/components/PortfolioContent";
import type { Locale } from "@/i18n";

/**
 * Renders the localized portfolio homepage.
 * @param {{ params: { locale: Locale } }} props - Route params with locale.
 * @returns {JSX.Element} The localized portfolio page.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <main className="min-h-screen">
      <PortfolioContent locale={locale} />
    </main>
  );
}
