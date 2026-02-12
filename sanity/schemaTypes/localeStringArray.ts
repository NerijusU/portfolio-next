import { defineField, defineType } from "sanity";

/**
 * Localized array of strings: one array per locale (en, de, pl, ru).
 * Use for word lists, tags, etc. that differ by language.
 */
export default defineType({
  name: "localeStringArray",
  title: "Localized String Array",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(0).max(10),
    }),
    defineField({
      name: "de",
      title: "German",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(0).max(10),
    }),
    defineField({
      name: "pl",
      title: "Polish",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(0).max(10),
    }),
    defineField({
      name: "ru",
      title: "Russian",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(0).max(10),
    }),
  ],
});
