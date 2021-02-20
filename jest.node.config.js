module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
    'cobertura',
    'text-summary',
  ],
  collectCoverageFrom: ['{cli,src}/**/*.{ts,tsx,js,jsx}'],
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
};
