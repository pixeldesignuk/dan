import { defineType, defineField } from "sanity";

export default defineType({
  name: "volunteerCtaSection",
  title: "Volunteer CTA Section",
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
      initialValue: "Join our team",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Become a volunteer",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue:
        "Whether you're a dental professional or passionate about making a difference, we have a place for you. Join us on our next mission.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Apply to volunteer",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "string",
      initialValue: "/volunteer",
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      enabled: "enabled",
    },
    prepare({ enabled }) {
      return {
        title: "Volunteer CTA Section",
        subtitle: enabled ? "Enabled" : "Disabled",
      };
    },
  },
});
