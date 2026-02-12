import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "primaryDonateUrl",
      title: "Primary Donate URL",
      type: "url",
      description: "Main Givebrite donation page URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headerCtaLabel",
      title: "Header CTA Label",
      type: "string",
      initialValue: "Donate Now",
    }),
    defineField({
      name: "announcementBar",
      title: "Announcement Bar",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enabled",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "text",
          title: "Announcement Text",
          type: "string",
        }),
        defineField({
          name: "linkLabel",
          title: "Link Label",
          type: "string",
        }),
        defineField({
          name: "linkUrl",
          title: "Link URL",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "trustItems",
      title: "Trust Strip Items",
      type: "array",
      of: [{ type: "string" }],
      description: "Short trust statements displayed on homepage (e.g., '100% of donations go to care')",
    }),
    defineField({
      name: "donationSettings",
      title: "Donation Settings",
      type: "object",
      fields: [
        defineField({
          name: "donationToolbarEnabled",
          title: "Enable Donation Toolbar",
          type: "boolean",
          description: "Show the floating donation toolbar on desktop",
          initialValue: false,
        }),
        defineField({
          name: "defaultAmount",
          title: "Default Amount (£)",
          type: "number",
          description: "Default donation amount in pounds",
          initialValue: 25,
        }),
        defineField({
          name: "suggestedAmounts",
          title: "Suggested Amounts",
          type: "array",
          of: [{ type: "number" }],
          description: "List of suggested donation amounts in pounds",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter/X", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "siteName",
    },
  },
});
