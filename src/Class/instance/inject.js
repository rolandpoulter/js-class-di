/*!
### Class.instance.inject(overrides?, context?);
*/

Class.inject =
Class.prototype.inject =
Class.instance.inject = function (overrides, context) {

	overrides = overrides || {};

	if (Array.isArray(overrides)) {
		overrides.forEach(function (override) {

			if (override.name) {
				overrides[override.name] = override;
			}

		});
	}

	context = context || this;

	var namespace = Class.helper.get_class_namespace(context),
			dependencies = Class.helper.get_dependencies(context);

	if (dependencies.forEach) {
		dependencies.forEach(function (dependency) {

			context[dependency] = overrides[dependency] || namespace[dependency] || context[dependency];

		});
	}

	return context;

};
