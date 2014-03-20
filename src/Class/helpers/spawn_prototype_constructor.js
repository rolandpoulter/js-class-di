/*!
### Class.helpers.spawn_prototype_constructor(class_constructor, constructor_prototype);
*/

Class.helpers.spawn_prototype_constructor = function (class_constructor, constructor_prototype) {

	var constructor = constructor_prototype.constructor;

	if (!constructor.name) {
		throw Class.helpers.new_error(class_constructor, 'Invalid constructor name.');
	}

	constructor.prototype = constructor_prototype;

	return Class.helpers.namespace_upsert_constructor(class_constructor, constructor);

};
