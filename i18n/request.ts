import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isValidLocale } from "../i18n";

/**
 * Loads messages for the current request locale.
 */
export default getRequestConfig(async ({ locale }) => {
  const activeLocale =
    locale && isValidLocale(locale) ? locale : defaultLocale;

  return {
    locale: activeLocale,
    messages: (await import(`../messages/${activeLocale}.json`)).default,
  };
});
