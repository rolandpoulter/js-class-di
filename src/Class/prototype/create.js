/*!
### Class.prototype.create(object, constructor);
*/

Class.create =
Class.prototype.create = function (object, constructor) {

	constructor = constructor || this;

	object = object || Object.create(constructor.prototype);

	Class.helpers.get_dependencies(object);

	var traits = Class.helpers.get_traits(this);

	traits.forEach(this.install.bind(constructor, object));

	return object;

};
