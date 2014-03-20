/*!
### Class.prototype.initialize(definition, traits...);

1. definition - String, Function, Object.
2. traits... - String, Function, Object.

Returns a Function.
*/

Class.initialize =
Class.prototype.initialize = function () {

	return Class.construct.apply(this.constructor, arguments);

};
