module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ['eslint:recommended'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		process: true,
		module: true,
		export: true,
		require: true,
		__dirname: true,
		__filename: true,
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-unused-vars': 'off',
	},
}
