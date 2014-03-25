/*!
### Class.prototype.derived(object);

1. object - Object.

Checks if an object is an instance of the this class, or if this class
is a trait of the object and therefore helped in its composition.

Returns a Boolean.
*/

Class.derived =
Class.prototype.derived = function (object) {

	if (object === this) return true;

	if (object instanceof this) return true;

	if (object.isPrototypeOf(this.prototype)) return true;

	var object_constructor = object.constructor;

	if (!object_constructor) return false;

	if (object_constructor === this || object_constructor === Object) {
		return true;
	}

	var object_traits = Class.helpers.get_traits(object);

	if (object_traits[this.name] === this) return true;

	if (object_traits.indexOf(this) !== -1) return true;

	if (object.super_class && object.super_class) {
		return this.derived(object.super_class);
	}

	var super_class = Class.helpers.get_super_class(object_constructor);

	if (super_class && super_class.derives) {
		return super_class.derived(object);
	}

	return false;

};
