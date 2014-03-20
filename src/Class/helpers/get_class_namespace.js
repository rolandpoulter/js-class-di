/*!
### Class.helpers.get_object_class(class_constructor);
*/

Class.helpers.get_class_namespace = function (class_constructor) {

	class_constructor = Class.helpers.get_class_constructor(class_constructor);

	if (!class_constructor.namespace) {
		Object.defineProperty(class_constructor, 'namespace', {value: {}});
	}

	return class_constructor.namespace;

};
