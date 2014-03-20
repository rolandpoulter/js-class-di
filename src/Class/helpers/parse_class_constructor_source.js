/*!
### Class.helpers.parse_class_constructor_source(class_constructor);
*/

Class.helpers.parse_class_constructor_source = function (class_constructor) {

	var source;

	if (!class_constructor.argument_names) {
		source = class_constructor.toSource();

		class_constructor.argument_names = source.substring(
			source.indexOf('(') + 1,
			source.indexOf(')')
		);
	}

	if (!class_constructor.function_body) {
		source = source || class_constructor.toSource();

		class_constructor.function_body = source.substring(
			source.indexOf('{') + 1,
			source.lastIndexOf('}')
		)
	}

};
