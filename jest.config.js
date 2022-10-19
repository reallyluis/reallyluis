/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  bail: true,
  testMatch: ["<rootDir>/tests/**/*.test.(j|t)s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testEnvironmentOptions: {
    url: "http://127.0.0.1:3000",
  },
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@layouts/(.*)$": "<rootDir>/src/layouts/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@workers/(.*)$": "<rootDir>/workers/$1",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  maxConcurrency: 1,
  setupFilesAfterEnv: ["./jest.setup.js"],
};
