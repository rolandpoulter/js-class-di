/*!
### Class.prototype.define(name, value, context);
*/

Class.define =
Class.prototype.define = function (name, value, context) {

	if (name === 'constructor') return;

	context = context || this.prototype || this;

	if (name === 'dependencies') {
		var dependencies = Class.helpers.get_dependencies(context);

		if (value && value.forEach) {
			value.forEach(push_dependency);
		}

		else {
			push_dependency(value);
		}

		return;
	}

	return context[name] = value;

	function push_dependency (dependency) {

		if (typeof dependency === 'string') {
			context.dependencies.push(dependency);
		}

	}

};
