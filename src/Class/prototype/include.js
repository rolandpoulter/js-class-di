/*!
### Class.prototype.include(derivatices...);
*/

Class.include =
Class.prototype.include = function () {

	var new_derivatives = [].slice.call(arguments);

	new_derivatives.forEach(this.decorate.bind(this));

	return this;

};
