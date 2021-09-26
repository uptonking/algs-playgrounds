const { checkAppEnv } = require('./config/config-utils');

const isEnvPreact = checkAppEnv('preact');
console.log(';;isEnvPreact，', isEnvPreact);

let reactAlias = {};
if (isEnvPreact) {
  reactAlias = {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
    'react-dom/test-utils': 'preact/test-utils',
    'react/jsx-runtime': 'preact/jsx-runtime',
  };
}

const testConfigForReact = {
  verbose: true,
  // roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
  // transformIgnorePatterns: ['^.+\\.js$'],
  transform: {
    '\\.[jt]sx?$': ['babel-jest'],
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleNameMapper: {
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    // ...reactAlias,
  },
  // testMatch: [
  //   '<rootDir>/src/**/*.test.(ts|tsx)',
  //   '<rootDir>/**/*.test.(ts|tsx)',
  // ],
};

const testConfigForPreact = {
  preset: 'jest-preset-preact',
};

module.exports = isEnvPreact ? testConfigForPreact : testConfigForReact;
