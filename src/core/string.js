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