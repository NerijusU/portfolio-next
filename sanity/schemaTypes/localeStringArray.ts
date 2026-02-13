import { defineField, defineType } from "sanity";

/**
 * Localized array of strings: one array per locale.
 * Use for word lists, tags, responsibilities, achievements, etc.
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
    }),
    defineField({
      name: "de",
      title: "German",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "pl",
      title: "Polish",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ru",
      title: "Russian",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lt",
      title: "Lithuanian",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
