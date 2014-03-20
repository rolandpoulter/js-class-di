/*!
### Class.helpers.get_super_class(constructor);
*/

Class.helpers.get_super_class = function (constructor) {

	if (!constructor.prototype) {
		constructor = constructor.constructor;
	}

	return constructor.super_class;

};
