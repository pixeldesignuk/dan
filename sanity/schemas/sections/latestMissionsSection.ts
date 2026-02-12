import { defineType, defineField } from "sanity";

export default defineType({
  name: "latestMissionsSection",
  title: "Latest Missions Section",
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
      initialValue: "Where we work",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Latest missions",
    }),
    defineField({
      name: "viewAllLabel",
      title: "View All Label",
      type: "string",
      initialValue: "View all missions",
    }),
    defineField({
      name: "count",
      title: "Number of Missions",
      type: "number",
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],
  preview: {
    select: {
      enabled: "enabled",
      count: "count",
    },
    prepare({ enabled, count }) {
      return {
        title: "Latest Missions Section",
        subtitle: enabled ? `Enabled (${count || 3} missions)` : "Disabled",
      };
    },
  },
});
