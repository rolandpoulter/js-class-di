/*!
### Class.prototype.toSouce();

Returns a String - the raw source of the constructor function.
*/

if (!Class.prototype.toSource) {
	Class.toSource =
	Class.prototype.toSource =
		Function.prototype.toSource ||
		Function.prototype.toString;
}
