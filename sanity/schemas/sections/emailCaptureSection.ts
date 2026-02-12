import { defineType, defineField } from "sanity";

export default defineType({
  name: "emailCaptureSection",
  title: "Email Capture Section",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "overline",
      title: "Overline",
      type: "string",
      initialValue: "Stay connected",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Get updates from the field",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      initialValue:
        "Mission reports, impact stories, and ways to get involved. No spam, just meaningful updates.",
    }),
  ],
  preview: {
    select: {
      enabled: "enabled",
    },
    prepare({ enabled }) {
      return {
        title: "Email Capture Section",
        subtitle: enabled ? "Enabled" : "Disabled",
      };
    },
  },
});
