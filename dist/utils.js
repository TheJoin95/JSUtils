/*!
 *
 * JSUtils - Useful JavaScript functions for JS purists and JQuery haters
 *
 * @version v0.0.1
 * @link https://github.com/UstymUkhman
 * @author Ustym Ukhman <ustym.ukhman@gmail.com>
 * @license MIT License, https://github.com/UstymUkhman/JSUtils/blob/master/LICENSE
 *
 * Date: 2015-11-21T13:28Z
 */

;(function() {
	'use strict';

	/**
	 * Checks if the passed parameter is a function and executes it if so
	 *
	 * @param {function|*} fn
	 * @function checkFn
	 * @local
	 * @returns {*} function's return value | passed value
	 */
	function checkFn( fn ) {
		return ( typeof fn === 'function' ) ? fn() : fn;
	}

	/**
	 * Parses to number the current string value
	 *
	 * @function toNumber
	 * @memberof String
	 * @global
	 * @returns {number} number value - string is a number
	 * 					 			0 - string is empty
	 * 					 		   -1 - string is a not a number
	 */
	String.prototype.toNumber = function() {
		return this.length ? !isNaN( this ) ? parseFloat( this ) : -1 : 0;
	};

	/**
	 * Counts the passed character(s) in a string
	 *
	 * @param {string} c
	 * @function count
	 * @memberof String
	 * @global
	 * @returns {number} number of 'c' characters in the current string
	 */
	String.prototype.count = function( c ) { 
	    return ( this.length - this.replace( new RegExp( c, "g" ), '' ).length ) / c.length;
	};

	/**
	 * Replace all characters of the first string
	 * with the second string in the current one
	 * If 'c' is true, returns -1 if nothing was replaced
	 *
	 * @param {string} f
	 * @param {string} r
	 * @param {boolean} c
	 * @function replaceAll
	 * @memberof String
	 * @global
	 * @returns {string} s without the 'f' substring.
	 * @returns {number} -1 if 'c' is true, and nothing was replaced.
	 * @see String.replace()
	 */
	String.prototype.replaceAll = function( f, r, c ) {
		f = checkFn( f );
		r = checkFn( r );

		if( typeof r !== 'string' || !r ) { c = r; r = ''; }
		var that = this, s = this.split( f ).join( r );
		return c ? that === this ? -1 : s : s;
	};

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

		if( e1 === -1 || this[i1] === undefined ) { console.error( 'No element with index \'' + i1 + '\' was found in array.' ); return; }
		if( e2 === -1 || this[i2] === undefined ) { console.error( 'No element with index \'' + i2 + '\' was found in array.' ); return; }

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

		if( i1 === null ) { console.error( 'No element with value \'' + v1 + '\' was found in array.' ); return; }
		if( i2 === null ) { console.error( 'No element with value \'' + v2 + '\' was found in array.' ); return; }

		this.swapByIndex( i1, i2 );
	};

	/**
	 * Defines new methods for Object class
	 *
	 * @param {Object} Object.prototype 	  - Object to extend
	 * @param {Object} properties descriptors - A collection of configurations which will extend the object
	 * @function defineProperties
	 * @memberof Object
	 * @global
	 * @see Object.defineProperty()
	 */
	Object.defineProperties( Object.prototype, {

		/**
		 * @param {boolean} writable
		 * @default [false]
		 * @description Set to 'true' only if the value associated with the property
		 *				may be changed with an assignment operator (=).
		 *
		 * @param {boolean} enumerable
		 * @default [false]
		 * @description Set to 'true' only if this property shows up during enumeration
		 *				of the properties on the extended object.
		 *
		 * @param {boolean} configurable
		 * @default [false]
		 * @description Set to 'true' only if this property descriptor may be changed
		 *				and if the property may be deleted from the extended object.
		 *
		 * @param {function} set
		 * @default [undefined]
		 * @description The function will receive as only argument the new value to be assigned to the property.
		 *
		 * @param {function} get
		 * @default [undefined]
		 * @description The function will return the value of property.
		 *
		 * @param {*} value
		 * @default [undefined]
		 * @description The value associated with the property.
		 */
		'isEmpty': {
			writable: true,

			/**
			 * Checks if the current object is empty
			 *
			 * @function isEmpty
			 * @memberof Object
			 * @global
			 * @returns {boolean} false if the object is empty | true otherwise
			 * @see Object.keys()
			 */
			value: function() {
				return !Object.keys( this ).length;
			}
		},

		'extend': {
			writable: true,

			/**
			 * Extends the current object is with the passad one
			 *
			 * @param {Object} obj
			 * @param {boolean} owrr
			 * @function extend
			 * @memberof Object
			 * @global
			 */
			value: function( obj, owrr ) {
				var ext = { };
				obj  = checkFn( obj );
				owrr = checkFn( owrr );

				if( typeof obj !== 'object' ) { console.error( 'Element \'' + obj + '\' is not an object.' ); return; }

				for( var i in obj ) {					
					if( this[i] !== undefined && owrr ) console.warn( 'Element \'' + i + '\' was overwritten becaus already existed.' );
					else if( this[i] !== undefined ) { console.error( 'Element \'' + i + '\' already exist.' ); return; }
					ext[i] = obj[i];
				}

				for( var i in ext ) this[i] = ext[i];
			}
		},

		'getProperties': {
			writable: true,

			/**
			 * Gets the list of object's properties (functions excluded)
			 *
			 * @function getProperties
			 * @memberof Object
			 * @global
			 * @returns {string[]} array of properties' names
			 * @see Object.getOwnPropertyNames()
			 */
			value: function() {
				var prop = [];

				for( var i in this )
					if( typeof this[i] !== 'function' )
						prop.push( i );

				return prop;
			}
		},

		'getMethods': {
			writable: true,

			/**
			 * Gets the list of object's functions
			 *
			 * @function getMethods
			 * @memberof Object
			 * @global
			 * @returns {string[]} array of functions' names
			 * @see Object.getOwnPropertyNames()
			 */
			value: function() {
				var prop = [];

				for( var i in this )
					if( typeof this[i] === 'function' )
						prop.push( i );

				return prop;
			}
		}
	});

	/**
	 * Utils class definition
	 *
	 * @namespace {Class} Utils
	 * @class
	 * @classdesc This is the core of JSUtils library
	 * @constructs Utils
	 * @global
	 */
	var Utils = (function() {

		/**
		 * Utils class constructor function
		 *
		 * @lends Utils.prototype
		 * @function Utils
		 * @memberof Utils
		 * @global
		 */
		var Utils = function() { };

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
				case 'object'   : return n === null || n.isEmpty() ? 0 : n.length ? n.length : 1;
				case 'number'   : return n < 0 ? 0 : n;
				case 'string'   : return n.toNumber();
				case 'boolean'  : return n ? 1 : 0;
				default		    : return 0;
			}
		};

		return Utils;
	})();

})();