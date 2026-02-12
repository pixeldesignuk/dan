import { defineType, defineField } from "sanity";

export default defineType({
  name: "trustStripSection",
  title: "Trust Strip Section",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      enabled: "enabled",
    },
    prepare({ enabled }) {
      return {
        title: "Trust Strip Section",
        subtitle: enabled ? "Enabled" : "Disabled",
      };
    },
  },
});
