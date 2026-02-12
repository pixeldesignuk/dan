import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "dental-aid-network",
  title: "Dental Aid Network",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Site Settings as a singleton
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings")
              ),
            // Homepage as a singleton
            S.listItem()
              .title("Homepage")
              .id("homepage")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage")
                  .title("Homepage")
              ),
            S.divider(),
            // Content types
            S.documentTypeListItem("story").title("Stories"),
            S.documentTypeListItem("mission").title("Missions"),
            S.documentTypeListItem("event").title("Events"),
            S.documentTypeListItem("page").title("Pages"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
