/*!
### Class.helpers.get_dependencies(object);
*/

Class.helpers.get_dependencies = function (object) {

	if (!object.dependencies) {
		Object.defineProperty(object, 'dependencies', {value: []});
	}

	return object.dependencies;

};
