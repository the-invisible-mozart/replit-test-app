/* eslint-env node */
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["dist", "node_modules"],
	},
	js.configs.recommended,
	// Use non-type-checked configs to avoid requiring a TS project setup
	...tseslint.configs.recommended,
	...tseslint.configs.stylistic,
	{
		files: ["**/*.{ts,tsx,js,jsx,cjs}"],
		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},
		plugins: {
			import: importPlugin,
			"unused-imports": unusedImports,
			react: reactPlugin,
			"react-hooks": reactHooks,
			"jsx-a11y": jsxA11y,
		},
		rules: {
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ prefer: "type-imports" },
			],
			// Unused imports/vars
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"error",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],

			// Import hygiene
			"import/order": [
				"error",
				{
					groups: [
						["builtin", "external"],
						"internal",
						["parent", "sibling", "index"],
						"type",
					],
					"newlines-between": "always",
					alphabetize: { order: "asc", caseInsensitive: true },
				},
			],
			"import/no-default-export": "warn",
			// React
			"react/jsx-no-target-blank": "warn",
			"react/self-closing-comp": "warn",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
		},
	},
	// Overrides for Node/CommonJS style config files
	{
		files: [
			"**/*.config.{js,cjs,mjs}",
			"postcss.config.js",
			"tailwind.config.js",
			".prettierrc.cjs",
			"eslint.config.js",
		],
		languageOptions: {
			globals: globals.node,
		},
		rules: {
			"import/no-default-export": "off",
			"@typescript-eslint/no-require-imports": "off",
			"no-undef": "off",
		},
	},
);
