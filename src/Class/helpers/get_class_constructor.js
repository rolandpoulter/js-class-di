/*!
### Class.helpers.get_class_constructor(object);
*/

Class.helpers.get_class_constructor = function (object) {

	return (
		object.class_constructor ||
		object.constructor && object.constructor.class_constructor
	);

};

Class.class_constructor =
Class.prototype.class_constructor = Class;
