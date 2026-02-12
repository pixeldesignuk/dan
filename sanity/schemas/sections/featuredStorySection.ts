import { defineType, defineField } from "sanity";

export default defineType({
  name: "featuredStorySection",
  title: "Featured Story Section",
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
      initialValue: "Impact Story",
    }),
    defineField({
      name: "customCtaLabel",
      title: "Custom CTA Label",
      type: "string",
      description: "Optional override for the donate button label",
      initialValue: "Support this cause",
    }),
    defineField({
      name: "readMoreLabel",
      title: "Read More Label",
      type: "string",
      initialValue: "Read the full story",
    }),
    defineField({
      name: "viewAllLabel",
      title: "View All Label",
      type: "string",
      initialValue: "View all stories",
    }),
  ],
  preview: {
    select: {
      enabled: "enabled",
    },
    prepare({ enabled }) {
      return {
        title: "Featured Story Section",
        subtitle: enabled ? "Enabled" : "Disabled",
      };
    },
  },
});
