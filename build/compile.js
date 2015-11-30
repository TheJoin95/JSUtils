({
	baseUrl: '../src',

	paths: {
		stringUtils: 'core/string',
		arrayUtils: 'core/array',
		objectUtils: 'core/object',
		JSUtils: 'lib'
	},

	include: [
  		'core/string',
		'core/array',
		'core/object',
  		'lib'
	],

  out: "../dist/utils.min.js"
})