// module.exports = {
//     testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
//     setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
//     moduleNameMapper: {
//       "\\.(css|less)$": "identity-obj-proxy"
//     },
//     transform: {
//       "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
//       // "^.+\\.(css|less|scss|sass)$": "identity-obj-proxy"
//     }
//   };
module.exports = {
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
        // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    },
    transformIgnorePatterns: ['/node_modules/', '\\.(css|less|sass|scss)$'],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    }
};
