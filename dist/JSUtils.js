/*!
 *
 * JSUtils - Useful JavaScript functions for JS purists
 *
 * @version v1.0.0
 * @link https://github.com/UstymUkhman/JSUtils
 * @author Ustym Ukhman <ustym.ukhman@gmail.com>
 * @license MIT License, https://github.com/UstymUkhman/JSUtils/blob/master/LICENSE
 *
 * Date: 12-12-2015 9:16:12 AM GMT+0100
 */


(function() {

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

/**
 * Defines new methods for Object class
 *
 * @param {Object} Object.prototype 	  - Object to extend
 * @param {Object} properties descriptors - A collection of configurations which describe new properties
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

			if( typeof obj !== 'object' ) { throw new Error( 'Element \'' + obj + '\' is not an object.' ); return; }

			for( var i in obj ) {					
				if( this[i] !== undefined && owrr ) console.warn( 'Element \'' + i + '\' was overwritten becaus already existed.' );
				else if( this[i] !== undefined ) { throw new Error( 'Element \'' + i + '\' already exist.' ); return; }
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
		 * @see Object.prototype.getOwnPropertyNames()
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
		 * @see Object.prototype.getOwnPropertyNames()
		 */
		value: function() {
			var prop = [];

			for( var i in this )
				if( typeof this[i] === 'function' )
					prop.push( i );

			return prop;
		}
	},

	'getPropertiesByValue': {
		writable: true,

		/**
		 * Gets the list of object's properties with the passed value
		 *
		 * @function getPropertiesByValue
		 * @memberof Object
		 * @global
		 * @returns {string[]} array of properties' names
		 */
		value: function( v ) {
			var prop = [];
			v = checkFn( v );

			for( var i in this )
				if( this[i] === v )
					prop.push( i );

			return prop;
		}
	},

	'hasOwnValue': {
		writable: true,

		/**
		 * Checks if the passed value is present in object
		 *
		 * @function hasOwnValue
		 * @memberof Object
		 * @global
		 * @returns {boolean} true if at least one property equals to val | false otherwise
		 * @see Object.prototype.hasOwnProperty()
		 */
		value: function( val ) {
			val = checkFn( val );

			for( var p in this )
				if( this[p] === val )
					return true;

			return false;
		}
	}
});

/**
 * Defines new method for Object class
 *
 * @param {Object} Object 	  			- Object to extend
 * @param {string} getOwnPropertyValues - New property name
 * @param {Object} property descriptor  - A collection of configurations which describe new property
 * @function defineProperty
 * @memberof Object
 * @global
 */
Object.defineProperty( Object, 'getOwnPropertyValues', {
	writable: true,

	/**
	 * Gets an array of all properties' values of the object
	 *
	 * @function getOwnPropertyValues
	 * @memberof Object
	 * @global
	 * @returns {*[]} object properties' values
	 * @see Object.getOwnPropertyNames()
	 */
	value: function( obj ) {
		obj = checkFn( obj );
		if( typeof obj !== 'object' ) { throw new Error( '\'' + obj + '\' is not an object.' ); return; }

		var vals = [];
		for( var o in obj ) vals.push( obj[o] );
		return vals;
	}
});

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
 * Remove all spaces from string
 * If 'f' is true, '\t' characters will be removed too
 * String.trim() doesn't work if string is an array element
 *
 * @param {boolean} f
 * @function trim
 * @memberof String
 * @global
 * @returns {string} the current string without spaces [and '\t' characters].
 * @see String.trim()
 */
String.prototype.trim = function( f ) {
	f = checkFn( f );
    return f ? this.replaceAll( '\t', '' ).trim() : this.replaceAll( ' ', '' );
};


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

})();