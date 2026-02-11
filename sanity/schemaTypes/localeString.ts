import { defineField, defineType } from "sanity";

export default defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "de", title: "German", type: "string" }),
    defineField({ name: "pl", title: "Polish", type: "string" }),
    defineField({ name: "ru", title: "Russian", type: "string" }),
  ],
});
