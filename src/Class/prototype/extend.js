/*!
### Class.prototype.extend(constructor);
*/

Class.extend =
Class.prototype.extend = function (constructor) {

	var derivatives = [].slice.call(arguments, 1);

	constructor = this.initialize.call(this, constructor);

	constructor.inherits(this);

	constructor.include.apply(constructor, derivatives);

	return constructor;

};
