/*!
## Class.set(name, value);
*/

Class.set = function (name, value) {

	var namespace = Class.helpers.get_class_namespace(this);

	return namespace[name] = value;

};
