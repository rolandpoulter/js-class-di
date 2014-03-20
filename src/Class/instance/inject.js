/*!
### Class.instance.inject(overrides);
*/

Class.instance.inject = function (overrides) {

	if (Array.isArray(overrides)) {
		overrides.forEach(function (override) {

			if (override.name) {
				overrides[override.name] = override;
			}

		});
	}

	var namespace = Class.helper.get_class_namespace(this);

	if (this.dependencies && this.dependencies.forEach) {
		this.dependencies.forEach(function (dependency) {

			this[dependency] = overrides[dependency] || namespace[dependency];

		}.bind(this));
	}

	return this;

};
