/* eslint-disable max-len */
module.exports = {
	parser: "@typescript-eslint/parser",
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	ignorePatterns: ["src/components/formSpecs/typescript/**"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:react-hooks/recommended",
		"plugin:sonarjs/recommended",
		"plugin:testing-library/react"
	],
	plugins: [
		"@typescript-eslint",
		"prefer-arrow",
		"import",
		"react-hooks",
		"sonarjs",
		"unicorn",
		"promise",
		"simple-import-sort",
		"testing-library"
	],
	overrides: [
		{
			files: ["*.ts", "*.tsx"] // Your TypeScript files extension
		}
	],
	parserOptions: {
		project: ["./tsconfig.json"] // Specify it only for TypeScript files
	},
	rules: {

		"@typescript-eslint/array-type": "error",
		"@typescript-eslint/explicit-module-boundary-types": "off", // we're returning components, try and put return types on functions
		"@typescript-eslint/consistent-type-definitions": "error",
		"@typescript-eslint/explicit-member-accessibility": [
			"warn",
			{
				accessibility: "explicit"
			}
		],
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/member-ordering": "error",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-empty-function": "warn",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/no-floating-promises": "error",
		"@typescript-eslint/no-unsafe-assignment": "warn",
		"@typescript-eslint/no-unsafe-member-access": "warn",
		"@typescript-eslint/no-unsafe-call": "warn",
		"@typescript-eslint/no-unsafe-return": "warn",
		"@typescript-eslint/no-parameter-properties": "off",
		"@typescript-eslint/prefer-regexp-exec": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/require-await": "warn",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ varsIgnorePattern: "_*" }
		],
		"@typescript-eslint/await-thenable": "off", // this not working properly
		"@typescript-eslint/unbound-method": "off", // functional programming and preferring arrow functions leads us to the state where all functions are unbound by definition
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/ban-ts-comment": [
			"warn",
			{
				"ts-ignore": "allow-with-description",
				minimumDescriptionLength: 10
			}
		],
		"@typescript-eslint/prefer-function-type": "error",
		quotes: ["error", "double"],
		"@typescript-eslint/unified-signatures": "error",
		"@typescript-eslint/no-unnecessary-type-assertion": "off",
		"testing-library/await-async-query": "error",
		"testing-library/no-await-sync-query": "error",
		"testing-library/no-dom-import": "off",
		"testing-library/prefer-user-event": "warn",
		"arrow-body-style": "error",
		"arrow-parens": [
			// Following this style will help you find arrow functions (=>) which may be mistakenly included in a condition when a comparison such as >= was the intent.
			"error",
			"always"
		],
		camelcase: "error",
		"comma-dangle": "error",
		complexity: [
			"warn",
			{
				max: 10
			}
		],
		"constructor-super": "error",
		curly: "error",
		"dot-notation": "error",
		"eol-last": "error",
		eqeqeq: ["error", "smart"],
		"guard-for-in": "error",
		"id-blacklist": "off", // this conflicting with typescript. It bans Number, Boolean, String, number, boolean, undefined but we widely use it in typescript
		"id-match": "error",
		"import/order": "off", // replaced by simple-import-sort
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
		"linebreak-style": ["error", "unix"],
		"max-classes-per-file": ["error", 1],
		"max-len": [
			"error",
			{
				code: 120
			}
		],
		"new-parens": "error",
		"newline-per-chained-call": "off",
		"no-bitwise": "error",
		"no-caller": "error",
		"no-cond-assign": "error",
		"no-console": [
			"warn",
			{
				allow: [
					"dirxml",
					"warn",
					"error",
					"dir",
					"timeLog",
					"assert",
					"clear",
					"count",
					"countReset",
					"group",
					"groupCollapsed",
					"groupEnd",
					"table",
					"Console",
					"markTimeline",
					"profile",
					"profileEnd",
					"timeline",
					"timelineEnd",
					"timeStamp",
					"context"
				]
			}
		],
		"no-debugger": "warn",
		"no-duplicate-imports": "error",
		"no-empty": "warn",
		"no-eval": "error",
		"no-fallthrough": "off",
		"no-invalid-this": "off",
		"no-irregular-whitespace": "error",
		"no-multiple-empty-lines": [
			"warn",
			{
				max: 2
			}
		],
		"no-new-wrappers": "error",
		"no-shadow": [
			"error",
			{
				hoist: "all"
			}
		],
		"no-throw-literal": "error",
		"no-trailing-spaces": "error",
		"no-undef-init": "error",
		"no-underscore-dangle": "warn",
		"no-unsafe-finally": "error",
		"no-unused-expressions": "error",
		"no-unused-labels": "error",
		"object-shorthand": "error",
		"no-multi-spaces": "error",
		"object-curly-spacing": ["error", "always"],
		"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"], // smart-tabs stops it arguing with prettier
		"one-var": ["error", "never"],
		indent: "off", // because @typescript-eslint/indent is on
		"padding-line-between-statements": [
			"error",
			{
				blankLine: "always",
				prev: "*",
				next: "return"
			}
		],
		"prefer-arrow/prefer-arrow-functions": [
			"warn",
			{
				singleReturnOnly: true
			}
		],
		"promise/no-return-wrap": "error",
		"promise/param-names": "error",
		"quote-props": ["error", "as-needed"],
		radix: "off", // doesnt respect the fact that radix can be undefined
		"space-before-function-paren": [
			"error",
			{
				anonymous: "always",
				named: "never",
				asyncArrow: "always"
			}
		],
		"spaced-comment": "error",
		"unicorn/prefer-includes": "warn",
		"unicorn/no-array-for-each": "warn",
		"use-isnan": "error",
		"valid-typeof": "error"
	}
}
