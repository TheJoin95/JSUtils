requirejs.config({
    baseUrl: './src',
    paths: { }
});

requirejs([
	'core/string',
	'core/array',
	'core/object',
	'lib'
]);