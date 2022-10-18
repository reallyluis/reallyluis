import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "87cut1",
  e2e: {
    baseUrl: "https://add-testing.reallyluis.pages.dev",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
