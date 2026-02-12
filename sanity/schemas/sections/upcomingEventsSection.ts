import { defineType, defineField } from "sanity";

export default defineType({
  name: "upcomingEventsSection",
  title: "Upcoming Events Section",
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
      initialValue: "Get involved",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Upcoming events",
    }),
    defineField({
      name: "viewAllLabel",
      title: "View All Label",
      type: "string",
      initialValue: "View all events",
    }),
    defineField({
      name: "count",
      title: "Number of Events",
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
        title: "Upcoming Events Section",
        subtitle: enabled ? `Enabled (${count || 3} events)` : "Disabled",
      };
    },
  },
});
