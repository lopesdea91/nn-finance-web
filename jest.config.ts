import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './'
})

module.exports = createJestConfig(async () => {
  return {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    moduleDirectories: ['node_modules', '<rootDir>/'],

    testEnvironment: 'jest-environment-jsdom',

    moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/$1'
    },

    coveragePathIgnorePatterns: [
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
