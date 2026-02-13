import { defineField, defineType } from "sanity";

/**
 * Localized rich text: one Portable Text array per locale.
 */
export default defineType({
  name: "localeBlockContent",
  title: "Localized Block Content",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "de",
      title: "German",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "pl",
      title: "Polish",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ru",
      title: "Russian",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "lt",
      title: "Lithuanian",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
