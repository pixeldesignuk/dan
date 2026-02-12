import { defineType, defineField } from "sanity";

export default defineType({
  name: "donationIntentSection",
  title: "Donation Intent Section",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "problemOverline",
      title: "Problem Overline",
      type: "string",
      initialValue: "The challenge",
    }),
    defineField({
      name: "problemStatement",
      title: "Problem Statement",
      type: "string",
      initialValue: "2 billion people lack access to basic dental care",
    }),
    defineField({
      name: "narrativeText",
      title: "Narrative Text",
      type: "text",
      rows: 3,
      initialValue:
        "Untreated dental disease causes chronic pain, malnutrition, and missed opportunities. For many communities, a dentist is a luxury they have never known.",
    }),
    defineField({
      name: "helpOverline",
      title: "Help Overline",
      type: "string",
      initialValue: "How you can help",
    }),
    defineField({
      name: "helpHeadline",
      title: "Help Headline",
      type: "string",
      initialValue: "Choose your impact",
    }),
    defineField({
      name: "generalDonationTitle",
      title: "General Donation Title",
      type: "string",
      initialValue: "Give where needed most",
    }),
    defineField({
      name: "generalDonationSubtitle",
      title: "General Donation Subtitle",
      type: "string",
      initialValue: "Flexible funding",
    }),
    defineField({
      name: "generalDonationDescription",
      title: "General Donation Description",
      type: "text",
      rows: 2,
      initialValue:
        "Your donation goes directly to equipment, supplies, and mission logistics. 100% of funds support our charitable work.",
    }),
    defineField({
      name: "generalDonationCtaLabel",
      title: "General Donation CTA Label",
      type: "string",
      initialValue: "Donate now",
    }),
    defineField({
      name: "missionDonationTitle",
      title: "Mission Donation Title",
      type: "string",
      initialValue: "Fund a specific mission",
    }),
    defineField({
      name: "missionDonationSubtitle",
      title: "Mission Donation Subtitle",
      type: "string",
      initialValue: "Direct impact",
    }),
    defineField({
      name: "missionDonationDescription",
      title: "Mission Donation Description",
      type: "text",
      rows: 2,
      initialValue:
        "Choose a mission to support and follow along as we provide care to communities you help reach.",
    }),
    defineField({
      name: "missionDonationCtaLabel",
      title: "Mission Donation CTA Label",
      type: "string",
      initialValue: "Browse missions",
    }),
  ],
  preview: {
    select: {
      enabled: "enabled",
    },
    prepare({ enabled }) {
      return {
        title: "Donation Intent Section",
        subtitle: enabled ? "Enabled" : "Disabled",
      };
    },
  },
});
