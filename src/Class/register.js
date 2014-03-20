/*!
## Class.register(constructor);

1. constructor - String, Function, Object.

Creates a new constructor function with a name and stores it in a namespace.

Returns a Function.
*/

Class.register = function (constructor) {

	var namespace = Class.helpers.get_class_namespace(this);

	if (!constructor) {
		throw Class.helpers.new_error(this, 'Null constructor.');
	}

	constructor = Class.helpers.namespace_upsert_constructor(this, constructor);

	if (typeof constructor === 'object' && constructor) {
		constructor = Class.helpers.spawn_prototype_constructor(this, constructor);
	}

	if (typeof constructor !== 'function') {
		throw Class.helpers.new_error(this, 'Invalid constructor.');
	}

	if (typeof constructor.name !== 'string' || (/[^A-Za-z0-9$_]/).test(constructor.name)) {
		throw Class.helpers.new_error(this, 'Invalid constructor name.');
	}

	if (namespace[constructor.name] && namespace[constructor.name] !== constructor) {
		if (namespace[constructor.name].toSource() === constructor.toString()) {
			return namespace[constructor];
		}

		throw Class.helpers.new_error(this, constructor.name + ' is already registered.');
	}

	return namespace[constructor.name] = constructor;

};
