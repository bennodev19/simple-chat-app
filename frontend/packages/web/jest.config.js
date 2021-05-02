const baseConfig = require('../../jest.base.config.js');
const packageJson = require('./package.json');
const packageName = packageJson.name.split('@chatapp/').pop();

module.exports = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  rootDir: '../..',
  roots: [`<rootDir>/packages/${packageName}`],
  name: packageName,
  displayName: packageName,
};
