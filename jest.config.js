/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  bail: true,
  collectCoverageFrom: ["src/**/*.ts*"],
  coveragePathIgnorePatterns: [".d.ts"],
  maxWorkers: "50%",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@layouts/(.*)$": "<rootDir>/src/layouts/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@root/(.*)$": "<rootDir>/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@workers/(.*)$": "<rootDir>/workers/$1",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://127.0.0.1:3000",
  },
  testMatch: ["<rootDir>/tests/**/*.test.(j|t)s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};
