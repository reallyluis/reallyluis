const { defineConfig } = require('cypress');
const BASE_URL = process.env.BASE_URL || "https://reallyluis.com";

module.exports = defineConfig({
  projectId: "87cut1",
  e2e: {
    baseUrl: BASE_URL,
  },
});
