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
  collectCoverageFrom: ['{cli,src}/**/*.{ts,js}'],
  testMatch: [
    "tests/**/*.ts",
    "**/*.{spec,test}.{ts,js}",
    "**/__test__/*.{ts,js}"
  ],
  testPathIgnorePatterns: ['/node_modules/'],
};
