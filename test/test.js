(function() {
	'use strict';

	document.addEventListener( 'DOMContentLoaded', function() {
		var a = ['Hello,		World!', 'Ciao', 'Voice      In\tMe', 'JSUtils', 'Java\nScript'];

		for( var i = 0; i < a.length; i++ ) {
			var s = a[i].trim( true );
			console.log( s );
		}
	});
})();