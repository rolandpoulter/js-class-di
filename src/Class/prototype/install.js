/*!
### Class.prototype.install(object, trait);

1. object - any Object.
2. trait - String | Function | Object.

Gives an object a trait.

Returns this Function - class constructor.
*/

Class.install =
Class.prototype.install = function (object, trait) {

	object = object || Object.create(this.prototype);

	var traits = Class.helpers.get_traits(this),
	    namespace = Class.helpers.get_class_namespace(this);

	if (typeof trait === 'string') {
		trait = namespace[trait];
	}

	if (typeof trait === 'function') {
		if (typeof trait.create === 'function') {
			trait.create(this.prototype);
		}

		else {
			trait.call(this, this.prototype);
		}
	}

	if (typeof trait === 'object' && trait) {
		if (typeof trait.constructor === 'object' && trait.constructor) {
			Object.keys(trait.constructor).forEach(function (name) {

				this.define(name, trait.constructor[name], this);

			}.bind(this));
		}

		Object.keys(trait).forEach(function (name) {

			this.define(name, trait[name]);

		}.bind(this));
	}

	return this;

};
