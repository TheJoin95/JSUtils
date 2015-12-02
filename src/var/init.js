
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