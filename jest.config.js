module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
};