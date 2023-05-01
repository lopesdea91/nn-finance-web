// jest.config.mjs
import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./src",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleDirectories: ["node_modules", "<rootDir>/"],

  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },

  testPathIgnorePatterns: [
    "/node_modules/*",
    "/src/__mock__/*",
    "/src/__tests__/*",
    "/src/store/*",
  ],

  coveragePathIgnorePatterns: [
    "/src/__mock__/*",
    "/src/__tests__/*",
    "/src/store/*",
  ],

  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
