/*!
## Class.get(name);
*/

Class.get = function (name) {

	var namespace = Class.helpers.get_class_namespace(this);

	return namespace[name];

};

