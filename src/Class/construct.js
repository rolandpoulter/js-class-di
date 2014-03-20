/*!
## Class.construct(constructor, traits...);

1. constructor - String, Function, Object.
2. traits... - String, Function, Object.

Returns a Function.
*/

Class.construct = function (constructor) {

	var class_constructor = Class.helpers.get_class_constructor(this);

	constructor = class_constructor.register(constructor);

	Object.keys(class_constructor.prototype).forEach(function (method_name) {

		constructor[method_name] = class_constructor.prototype[method_name];

	});

	constructor.include.apply(constructor, [].slice.call(arguments, 1));

	class_constructor.create(constructor, constructor);

	constructor.create(constructor.prototype, constructor);

	if (class_constructor !== constructor) {
		Object.defineProperty(constructor, 'constructor', {value: class_constructor});
	}

	Object.defineProperty(constructor, 'class_constructor', {value: class_constructor});

	return constructor;

};