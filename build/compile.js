({
	baseUrl: '../',

	paths: {
		stringUtils: 'src/core/string',
		arrayUtils: 'src/core/array',
		objectUtils: 'src/core/object',
		JSUtils: 'src/lib'
	},

	include: [
  		'src/core/string',
		'src/core/array',
		'src/core/object',
  		'src/lib'
	],

	optimize: "none",
	out: "../dist/utils.js"
})