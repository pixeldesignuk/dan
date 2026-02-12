import { defineType, defineField } from "sanity";
import { SectionArrayItem } from "../components/SectionArrayItem";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Homepage",
      hidden: true,
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "heroSection",
          components: { item: SectionArrayItem },
        },
        {
          type: "trustStripSection",
          components: { item: SectionArrayItem },
        },
        {
          type: "donationIntentSection",
          components: { item: SectionArrayItem },
        },
        {
          type: "featuredStorySection",
          components: { item: SectionArrayItem },
        },
        {
          type: "latestMissionsSection",
          components: { item: SectionArrayItem },
        },
        {
          type: "upcomingEventsSection",
          components: { item: SectionArrayItem },
        },
        {
          type: "volunteerCtaSection",
          components: { item: SectionArrayItem },
        },
        {
          type: "finalCtaSection",
          components: { item: SectionArrayItem },
        },
        {
          type: "emailCaptureSection",
          components: { item: SectionArrayItem },
        },
      ],
      validation: (Rule) =>
        Rule.custom((sections: Array<{ _type: string }> | undefined) => {
          if (!sections || sections.length === 0) {
            return "At least one section is required";
          }
          const heroSections = sections.filter((s) => s._type === "heroSection");
          if (heroSections.length === 0) {
            return "Homepage must have a Hero section";
          }
          if (heroSections.length > 1) {
            return "Homepage can only have one Hero section";
          }
          return true;
        }),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage",
        subtitle: "Manage homepage sections",
      };
    },
  },
});
