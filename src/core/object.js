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