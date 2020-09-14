module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: [
		'airbnb-base',
		'plugin:promise/recommended',
		'plugin:jest/recommended',
		'plugin:jsdoc/recommended',
		'plugin:security/recommended',
		'prettier'
	],
	parserOptions: {
		sourceType: 'module'
	},
	plugins: ['import', 'jest', 'jsdoc', 'json', 'promise', 'security'],
	rules: {
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true
			}
		],
		'lines-between-class-members': 'error',
		'no-console': 'off',
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1
			}
		],
		'prefer-destructuring': 'off',
		'promise/prefer-await-to-callbacks': 'warn',
		'promise/prefer-await-to-then': 'warn'
	}
};
