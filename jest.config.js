// eslint-disable-next-line no-undef
module.exports = {
	globals: {
		__DEV__: true
	},
	setupFilesAfterEnv: ["<rootDir>/test/jest/jest.setup.ts"],
	// noStackTrace: true,
	// bail: true,
	// cache: false,
	// verbose: true,
	// watch: true,
	// collectCoverage: true,
	coverageReporters: ["text", "text-summary"],
	coverageDirectory: "<rootDir>/test/jest/coverage",
	collectCoverageFrom: [
		"<rootDir>/src/**/{!(_*),}.vue",
		// "<rootDir>/src/**/*.js",
		"<rootDir>/src/**/{!(types|index|*.d),}.ts"
		// "<rootDir>/src/**/*.jsx"
	],
	coveragePathIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/src/boot/",
		"<rootDir>/src-ssr/",
		"<rootDir>/src/themes/_initializers/",
		"<rootDir>/src/mett/theming/__tests__/"
	],
	coverageThreshold: {
		global: {
			//  branches: 50,
			//  functions: 50,
			//  lines: 50,
			//  statements: 50
		}
	},
	testMatch: [
		"<rootDir>/test/jest/__tests__/**/*.(spec|test).+(ts|js)?(x)",
		"<rootDir>/src/**/__tests__/*.(spec|test).+(ts|js)?(x)"
	],
	moduleFileExtensions: ["vue", "js", "jsx", "json", "ts", "tsx"],
	moduleNameMapper: {
		"^vue$": "<rootDir>/node_modules/vue/dist/vue.common.js",
		"^test-utils$": "<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.js",
		"^quasar$": "<rootDir>/node_modules/quasar/dist/quasar.common.js",
		"^~/(.*)$": "<rootDir>/$1",
		"^src/(.*)$": "<rootDir>/src/$1",
		"^utils/(.*)$": "<rootDir>/test/jest/utils/$1",
		".*css$": "<rootDir>/test/jest/utils/stub.css"
	},
	modulePathIgnorePatterns: ["<rootDir>/dist"],
	transform: {
		".*\\.vue$": "vue-jest",
		".*\\.js$": "babel-jest",
		".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
		"\\.ts$": "ts-jest"
		// use these if NPM is being flaky
		// '.*\\.vue$': '<rootDir>/node_modules/@quasar/quasar-app-extension-testing-unit-jest/node_modules/vue-jest',
		// '.*\\.js$': '<rootDir>/node_modules/@quasar/quasar-app-extension-testing-unit-jest/node_modules/babel-jest'
	},
	transformIgnorePatterns: ["<rootDir>/node_modules/(?!quasar/lang)"],
	snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"]
};
