
;(function( window, document ) {
	'use strict';

	if( window.Utils ) {
		throw new Error( 'It was not possible to include \'UtilsJS\' library because class \'Utils\' already exists.' );
		return;
	}

    /**
	 * Utils class definition
	 *
	 * @namespace {Class} Utils
	 * @class
	 * @classdesc This is the core of JSUtils library
	 * @constructs Utils
	 * @global
	 */
	window.Utils = (function() {

		/**
		 * Utils class constructor function
		 *
		 * @lends Utils.prototype
		 * @constructs Utils
		 * @function Utils
		 * @memberof Utils
		 * @global
		 */
		var Utils = function() { };

		/**
		 * Checks if the passed value is actualy an object
		 * because: typeof Array = 'object'
		 *
		 * @param {*} o
		 * @function isObject
		 * @memberof Utils
		 * @public
		 * @returns {boolean} true if 'o' is a real object | fasle otherwise
		 * @see Array.prototype.isArray()
		 */
		Utils.prototype.isObject = function( o ) {
			return ( typeof o === 'object' ) ? !Array.isArray( o ) : false;
		};

		/**
		 * Gets a random value between two passed numbers, endpoints included
		 * (if the second is not passed, the first is 0)
		 *
		 * @param {number} min
		 * @param {number} max
		 * @function getRandomInRange
		 * @memberof Utils
		 * @public
		 * @returns {number} a random value >= min && <= max | 0 if nothing is passed
		 * @see Math.prototype.floor()
		 * @see Math.prototype.random()
		 */
		Utils.prototype.getRandomInRange = function( min, max ) {
			min = ( min === undefined ) ? 0 : checkFn( min );
			max = ( max === undefined ) ? 0 : checkFn( max );

			return Math.floor( Math.random() * ( max - min + 1 ) + min );
		};

		/**
		 * Parses to a string the passed element
		 * Parsing rules:
		 *
		 * anonymus function		  - ''
		 * not anonymus function	  - function's name
		 * empty object 			  - ''
		 * not empty object 		  - JSON.stringify()
		 * number != 0 				  - number string
		 * number == 0 				  - ''
		 * empty string 			  - ''
		 * not empty string 		  - string
		 * true 					  - ' '
		 * undefined || null || false - ''
		 *
		 * @function toString
		 * @param {Object|function|number|string|boolean|*[]} s
		 * @memberof Utils
		 * @public
		 * @returns {string} casted from s.
		 * @see Utils.prototype.isEmpty()
		 * @see Utils.prototype.isObject()
		 * @see JSON.prototype.stringify()
		 */
		Utils.prototype.toString = function( s ) {
			switch( typeof s ) {
				case 'object'   : return s === null || s.isEmpty()
									? '' : Utils.prototype.isObject( s )
										? JSON.stringify( s ) : s.toString();

				case 'number'   : return s === 0 ? '' : s.toString();
				case 'boolean'  : return s ? ' ' : '';
				case 'function' : return s.name;
				case 'string'   : return s;
				default		    : return '';
			}
		};

		/**
		 * Parses to an integer number the passed element
		 * Parsing rules:
		 *
		 * empty object 			  - 0
		 * not empty object 		  - 1
		 * number < 0 				  - 0
		 * number > 0 				  - number value
		 * empty string 			  - 0
		 * not empty string 		  - string value
		 * true 					  - 1
		 * undefined || null || false - 0
		 *
		 * @function toNumber
		 * @param {Object|function|number|string|boolean|*[]} n
		 * @memberof Utils
		 * @public
		 * @returns {number} casted from n.
		 * @see Object.prototype.isEmpty()
		 * @see String.prototype.toNumber()
		 */
		Utils.prototype.toNumber = function( n ) {
			n = checkFn( n );

			switch( typeof n ) {
				case 'object'  : return n === null || n.isEmpty() ? 0 : n.length ? n.length : 1;
				case 'number'  : return n < 0 ? 0 : n;
				case 'string'  : return n.toNumber();
				case 'boolean' : return n ? 1 : 0;
				default		   : return 0;
			}
		};

		/**
		 * Parses to a boolean value the passed element
		 * Parsing rules:
		 *
		 * empty object 			  - false
		 * not empty object 		  - true
		 * number <= 0 				  - false
		 * number > 0 				  - true
		 * empty string 			  - false
		 * not empty string 		  - true
		 * true 					  - true
		 * undefined || null || false - false
		 *
		 * @function toBoolean
		 * @param {Object|function|number|string|boolean|*[]} b
		 * @memberof Utils
		 * @public
		 * @returns {boolean} casted from b.
		 * @see Array.prototype.isArray()
		 */
		Utils.prototype.toBoolean = function( b ) {
			b = checkFn( b );

			switch( typeof b ) {
				case 'object'  : return b === null || b.isEmpty()
									? false : Array.isArray( b )
										? !!b.length : true;

				case 'number'  : return b <= 0 ? false : true;
				case 'string'  : return b.length ? true : false;
				case 'boolean' : return b;
				default		   : return false;
			}
		};

		return Utils;
	})();

})( window, document );