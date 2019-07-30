module.exports = {
    "roots": [
        "<rootDir>/src/frontend"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": [
        'underscore.js',
        'cookies.js',
        'node_modules',
    ],

    // Setup Enzyme
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "setupFilesAfterEnv": ["./src/frontend/setupTests.ts"],
}
