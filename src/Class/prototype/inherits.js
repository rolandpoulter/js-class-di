/*!
### Class.prototype.inherits(super_class);
*/

Class.inherits =
Class.prototype.inherits = function (super_class) {

	var current_super_class = Class.helpers.get_super_class(this);

	if (current_super_class) {
		throw Class.helpers.new_error(this, 'Super class already exists.');
	}

	var derivatives = Class.helpers.get_traits(this),
	    namespace = Class.helpers.get_class_namespace(this);

	if (typeof super_class === 'string') {
		super_class = namespace[super_class];
	}

	if (typeof super_class !== 'function' || !super_class.name) {
		throw Class.helpers.new_error(this, 'Invalid super class.');
	}

	if (super_class.create) {
		this.prototype = super_class.create();
	}

	else {
		this.prototype = Object.create(super_class.prototype);
	}

	Object.defineProperty(this.prototype, 'constructor', {value: this});

	Object.defineProperty(this, 'super_class', {value: super_class});

	super_class.create(this.prototype, this);

	this.create(this.prototype);

	return this;

};
