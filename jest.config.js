module.exports = {
  preset: 'react-native',
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  transformIgnorePatterns: ["/node_modules/(?!react-file-drop)"],
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/__tests__/jest.setup.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif)$":
      "<rootDir>/node_modules/react-native/Libraries/Image/RelativeImageStub",
  },
  testMatch: ["**/__tests__/**/*-(spec|test).(js|tsx)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [
    "<rootDir>/android",
    "<rootDir>/ios",
    "<rootDir>/node_modules",
    "<rootDir>/__tests__/jest.setup.js",
  ],
  modulePathIgnorePatterns: ["node_modules", "mock", 'axios'],
  collectCoverage: false,
};
