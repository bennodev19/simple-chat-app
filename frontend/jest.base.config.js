module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$'],
  modulePathIgnorePatterns: ['dist', 'node_modules'],
  collectCoverageFrom: ['**/*.ts', '!**/node_modules/**', '!**/dist/**'],
  coverageDirectory: '<rootDir>/coverage/',
  transform: {
    '^.+\\.js|jsx|ts|tsx?$': 'ts-jest',
  },
  /* https://stackoverflow.com/questions/63904196/esmoduleinterop-flag-set-still-getting-default-import-error */
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/packages/tsconfig.default.json',
    },
  },
};
