/*!
### Class.helpers.new_error(error_message);
*/

Class.helpers.new_error = function (constructor, error_message) {

	var class_constructor = Class.helpers.get_class_constructor(constructor);

	var error_prefix = (class_constructor !== constructor) ?
		class_constructor + '(' + constructor + ')' :
		constructor;

	var class_error = new Error(error_prefix + ': ' + error_message);

	return class_error;

};
