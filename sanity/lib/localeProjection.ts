/**
 * Helpers for GROQ locale projections (e.g. field[$locale]).
 * Typegen infers object types for these projections; use these helpers to safely
 * narrow to the resolved runtime types.
 */

/**
 * Safely narrows a localeString projection to string.
 * @param value - Value from GROQ localeString[$locale] projection.
 * @returns Resolved string, or empty string if invalid.
 */
export function asLocaleString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * Safely narrows a localeStringArray projection to string[].
 * @param value - Value from GROQ localeStringArray[$locale] projection.
 * @returns Resolved string array, or empty array if invalid.
 */
export function asLocaleStringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((v): v is string => typeof v === "string")
    ? value
    : [];
}

/**
 * Safely narrows a localeText projection to string.
 * @param value - Value from GROQ localeText[$locale] projection.
 * @returns Resolved string, or empty string if invalid.
 */
export function asLocaleText(value: unknown): string {
  return typeof value === "string" ? value : "";
}
