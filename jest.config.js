const nextJest = require('next/jest')

const createJestConfig = nestJest({dir: '.'})

const customJestConfig = {
    estEnvironment: 'jsdom',
    clearMocks: true,
    moduleDirectories: ['node_modules'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts']

}

module.exports = createJestConfig(customJestConfig)
