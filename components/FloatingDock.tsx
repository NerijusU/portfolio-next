import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { FloatingDockClient } from "./FloatingDockClient";
import type { Locale } from "@/i18n";

const NAVIGATION_QUERY =
  defineQuery(`*[_type == "navigation"] | order(order asc){
  "title": title[$locale],
  href,
  icon,
  isExternal
}`);

const NAVIGATION_FALLBACK_QUERY =
  defineQuery(`*[_type == "navigation"] | order(order asc){
  "title": coalesce(title.en, title),
  href,
  icon,
  isExternal
}`);

export async function FloatingDock({
  locale,
}: {
  locale?: Locale;
}) {
  const hasLocale = typeof locale === "string" && locale.length > 0;
  const { data: navItems } = await sanityFetch({
    query: hasLocale ? NAVIGATION_QUERY : NAVIGATION_FALLBACK_QUERY,
    params: hasLocale ? { locale } : undefined,
  });

  if (!navItems || navItems.length === 0) {
    return null;
  }

  return <FloatingDockClient navItems={navItems} />;
}
