import { defineField, defineType } from "sanity";

export default defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text" }),
    defineField({ name: "de", title: "German", type: "text" }),
    defineField({ name: "pl", title: "Polish", type: "text" }),
    defineField({ name: "ru", title: "Russian", type: "text" }),
  ],
});
