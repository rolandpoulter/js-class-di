/*!
### Class.helpers.namespace_upsert_constructor(class_constructor, constructor);
*/

Class.helpers.namespace_upsert_constructor = function (class_constructor, constructor) {

	var namespace = Class.helpers.get_class_namespace(class_constructor);

	if (typeof constructor === 'string') {
		return namespace[constructor] || Class.helpers.spawn_constructor(class_constructor, constructor);
	}

	else if (typeof constructor.name === 'string') {
		return namespace[constructor.name] || constructor;
	}

	return constructor;

}
