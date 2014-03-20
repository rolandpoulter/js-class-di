/*!
### Class.helpers.spawn_constructor(class_constructor, constructor_name);
*/

Class.helpers.spawn_constructor = function (class_constructor, constructor_name) {

	Class.helpers.parse_class_constructor_source(class_constructor);

	return Class.helpers.eval_function(
		constructor_name,
		class_constructor.argument_names,
		class_constructor.function_body.replace(class_constructor.name, constructor_name)
	);

};
