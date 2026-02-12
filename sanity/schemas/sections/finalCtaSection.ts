import { defineType, defineField } from "sanity";

export default defineType({
  name: "finalCtaSection",
  title: "Final CTA Section",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Every smile",
    }),
    defineField({
      name: "highlightedText",
      title: "Highlighted Text",
      type: "string",
      description: "Text shown in brand-blue color",
      initialValue: "starts with you",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue:
        "Your generosity funds volunteer missions, dental equipment, and life-changing care for communities who need it most.",
    }),
    defineField({
      name: "trustPoints",
      title: "Trust Points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Give now",
    }),
  ],
  preview: {
    select: {
      enabled: "enabled",
    },
    prepare({ enabled }) {
      return {
        title: "Final CTA Section",
        subtitle: enabled ? "Enabled" : "Disabled",
      };
    },
  },
});
