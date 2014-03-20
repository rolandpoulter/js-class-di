/*!
### Class.helpers.get_traits(constructor);
*/

Class.helpers.get_traits = function (constructor) {

	if (!constructor.prototype) {
		constructor = constructor.constructor;
	}

	if (!constructor.traits) {
		var class_constructor = Class.helpers.get_class_constructor(constructor);

		Object.defineProperty(constructor, 'traits', {value: [
			class_constructor.instance
		]});
	}

	return constructor.traits;

};
