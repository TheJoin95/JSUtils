requirejs.config({
    baseUrl: './',
    paths: { }
});

requirejs([
	'src/core/string',
	'src/core/array',
	'src/core/object',
	'src/lib'
]);