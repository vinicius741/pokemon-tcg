module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
