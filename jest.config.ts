import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './'
})

module.exports = createJestConfig(async () => {
  return {
    testEnvironment: 'jest-environment-jsdom',

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    moduleDirectories: ['node_modules', '<rootDir>/'],

    moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/$1'
    },

    testPathIgnorePatterns: [
      // '/src/store/*',
    ],

    coverageReporters: ['text', 'lcov', 'clover', ['text', { skipFull: true }]],

    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50
      }
    }
  }
})
