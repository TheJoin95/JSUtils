require([
	'src/var/init.js'
],

function( checkFn ) {

	return (function() {
		
		/**
		 * Swaps two elements by their index in array
		 *
		 * @param {number} i1
		 * @param {number} i2
		 * @function swapByIndex
		 * @memberof Array
		 * @global
		 */
		Array.prototype.swapByIndex = function( i1, i2 ) {
			var e1 = null, e2 = null;
			i1 = checkFn( i1 );
			i2 = checkFn( i2 );

			if( typeof i1 === 'string' && i1 !== '' ) e1 = i1.toNumber();
			if( typeof i2 === 'string' && i2 !== '' ) e2 = i2.toNumber();

			if( e1 === -1 || this[i1] === undefined ) { throw new Error( 'No element with index \'' + i1 + '\' was found in array.' ); return; }
			if( e2 === -1 || this[i2] === undefined ) { throw new Error( 'No element with index \'' + i2 + '\' was found in array.' ); return; }

			var e = this[i1];
			this[i1] = this[i2];
			this[i2] = e;
		};

		/**
		 * Swaps two elements in array searching by their value 
		 *
		 * @param {number} v1
		 * @param {number} v2
		 * @function swapByValue
		 * @memberof Array
		 * @global
		 */
		Array.prototype.swapByValue = function( v1, v2 ) {
			var i1 = null, i2 = null;
			v1 = checkFn( v1 );
			v2 = checkFn( v2 );

			for( var i = 0; i < this.length; i++ )
				if 	   ( this[i] === v1 ) i1 = i;
				else if( this[i] === v2 ) i2 = i;

			if( i1 === null ) { throw new Error( 'No element with value \'' + v1 + '\' was found in array.' ); return; }
			if( i2 === null ) { throw new Error( 'No element with value \'' + v2 + '\' was found in array.' ); return; }

			this.swapByIndex( i1, i2 );
		};

	})();

});