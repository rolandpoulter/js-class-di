/*!
### Class.prototype.decorate(trait);
*/

Class.decorate =
Class.prototype.decorate = function (trait) {

	var traits = Class.helpers.get_traits(this),
	    namespace = Class.helpers.get_class_namespace(this);

	if (!trait) {
		throw Class.helpers.new_error(this, 'Invalid trait.');
	}

	if (traits.indexOf(trait) !== -1) {
		throw Class.helpers.new_error(this, 'Is already dervided from: ' + trait);
	}

	if (trait && typeof trait.forEeach === 'function') {
		trait.forEach(trait.bind(this));

		return this;
	}

	if (typeof trait === 'string' && namespace[trait]) {
		trait = namespace[trait];
	}

	if (typeof trait === 'function') {
		if (trait.name && namespace[trait.name] === trait) {
			traits[trait.name] = trait;
		}
	}

	else if (typeof trait !== 'object') {
		throw Class.helpers.new_error(this, 'Invalid derivative.');
	}

	traits.push(trait);

	return this;

};
