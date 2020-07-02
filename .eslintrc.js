module.exports = {
	root: true,

	// Rules order is important, please avoid shuffling them
	extends: [
		// Base ESLint recommended rules
		"eslint:recommended",

		// ESLint typescript rules
		// See https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",

		// ESLint testing rules
		"plugin:jest/recommended",
		"plugin:cypress/recommended",

		// `plugin:vue/essential` by default, consider switching to `plugin:vue/strongly-recommended`
		//  or `plugin:vue/recommended` for stricter rules.
		// See https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
		"plugin:vue/recommended",

		// Usage with Prettier, provided by 'eslint-config-prettier'.
		// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage-with-prettier
		"prettier",
		"prettier/@typescript-eslint",
		"prettier/vue"
	],

	plugins: [
		// Required to apply rules which need type information
		"@typescript-eslint",
		// Required to lint *.vue files
		// See https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
		"vue",
		// Prettier has not been included as plugin to avoid performance impact
		// See https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
		// Add it as an extension
		"jest",
		"cypress"
	],

	// Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
	// See https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
	// `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
	parserOptions: {
		parser: "@typescript-eslint/parser"
		// sourceType: "module",
		// project: "./tsconfig.json" // Makes the linting very slow :(
	},

	env: {
		browser: true,
		"jest/globals": true,
		"cypress/globals": true
	},

	globals: {
		ga: true, // Google Analytics
		cordova: true,
		__statics: true,
		process: true,
		global: true,
		module: true
	},

	// add your custom rules here
	rules: {
		"prefer-promise-reject-errors": "off",
		quotes: ["warn", "double", { avoidEscape: true }],
		"@typescript-eslint/indent": ["warn", "tab"],

		// allow console.log during development only
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		// allow debugger during development only
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

		// Custom
		"vue/component-name-in-template-casing": ["error", "kebab-case"],

		// Correct typescript linting until at least 2.0.0 major release
		// See https://github.com/typescript-eslint/typescript-eslint/issues/501
		// See https://github.com/typescript-eslint/typescript-eslint/issues/493
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/ban-types": "off",

		// Added later
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/no-angle-bracket-type-assertion": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/camelcase": "off",
		"jest/expect-expect": "off",
		"@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }]
	}
};
