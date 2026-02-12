import { defineType, defineField } from "sanity";

export default defineType({
  name: "mission",
  title: "Missions",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateRange",
      title: "Date Range",
      type: "object",
      fields: [
        defineField({
          name: "start",
          title: "Start Date",
          type: "date",
        }),
        defineField({
          name: "end",
          title: "End Date",
          type: "date",
        }),
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g., Guatemala, Kenya, Cambodia",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for accessibility",
        }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A brief summary shown on listing pages",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "givebriteDonateUrl",
      title: "Givebrite Donate URL",
      type: "url",
      description: "Optional: Mission-specific donation page. Falls back to site default if not set.",
    }),
    defineField({
      name: "fundingGoal",
      title: "Funding Goal",
      type: "number",
      description: "Target amount in USD",
    }),
    defineField({
      name: "fundingRaised",
      title: "Funding Raised",
      type: "number",
      description: "Amount raised so far in USD",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
        ],
      },
      initialValue: "upcoming",
    }),
  ],
  orderings: [
    {
      title: "Start Date, New",
      name: "dateRangeStartDesc",
      by: [{ field: "dateRange.start", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
      location: "location",
      status: "status",
    },
    prepare({ title, media, location, status }) {
      const statusEmoji = status === "active" ? "🟢" : status === "completed" ? "✅" : "📅";
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: location,
        media,
      };
    },
  },
});
