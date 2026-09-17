module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/server.js',
        '!src/config/**',
    ],
    testTimeout: 10000,
    clearMocks: true,
    restoreMocks: true,
};