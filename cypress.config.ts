import { defineConfig } from "cypress";

const BASE_URL = process.env.BASE_URL || "https://reallyluis.com";

export default defineConfig({
  projectId: "87cut1",
  e2e: {
    baseUrl: BASE_URL,
  },
});
