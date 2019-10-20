const esModules = ['@ionic'].join('|');

module.exports = {
  preset: "jest-preset-angular",
  roots: ['src'],
  setupFilesAfterEnv: ["<rootDir>/src/setupJest.ts"],
  moduleNameMapper: {
    'testing/(.*)': '<rootDir>/src/testing/$1'
  },
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${esModules})`
  ]
};