import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "overline",
      title: "Overline",
      type: "string",
      initialValue: "Global dental care nonprofit",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Smiles that",
    }),
    defineField({
      name: "highlightedText",
      title: "Highlighted Text",
      type: "string",
      description: "Text shown in brand-blue color",
      initialValue: "change lives",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 3,
      initialValue:
        "We send volunteer dental teams to underserved communities worldwide. Your generosity transforms pain into relief, shame into confidence.",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
      initialValue: "Give now",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      type: "string",
      initialValue: "Our missions",
    }),
    defineField({
      name: "secondaryCtaLink",
      title: "Secondary CTA Link",
      type: "string",
      initialValue: "/missions",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Main hero image (recommended: 800x1000px or similar portrait orientation)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Describe the image for accessibility",
        },
      ],
    }),
    defineField({
      name: "trustMetrics",
      title: "Trust Metrics",
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
    defineField({
      name: "floatingStatValue",
      title: "Floating Stat Value",
      type: "string",
      initialValue: "$2M+",
    }),
    defineField({
      name: "floatingStatLabel",
      title: "Floating Stat Label",
      type: "string",
      initialValue: "In care delivered",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Hero Section",
        subtitle: "Always enabled",
      };
    },
  },
});
