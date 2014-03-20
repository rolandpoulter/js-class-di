/*!
# new Class(definition, traits...);

1. definition - String, Function, Object.
2. traits... - String, Function, Object.

Constructs JavaScript classes that provide easy type introspection and remove the need for boilerplate code.
Also has inheritance and depedency injection built in. Aims to be a lightweight, and simple implementation that
can be easily monkey patched if needed.

Returns a Function.
*/

"use strict";

function Class () {

	return this.initialize.apply(this, arguments);

}

/*!
## Class.construct(constructor, traits...);

1. constructor - String, Function, Object.
2. traits... - String, Function, Object.

Returns a Function.
*/

Class.construct = function (constructor) {

	var class_constructor = Class.helpers.get_class_constructor(this);

	constructor = class_constructor.register(constructor);

	Object.keys(class_constructor.prototype).forEach(function (method_name) {

		constructor[method_name] = class_constructor.prototype[method_name];

	});

	constructor.include.apply(constructor, [].slice.call(arguments, 1));

	class_constructor.create(constructor, constructor);

	constructor.create(constructor.prototype, constructor);

	if (class_constructor !== constructor) {
		Object.defineProperty(constructor, 'constructor', {value: class_constructor});
	}

	Object.defineProperty(constructor, 'class_constructor', {value: class_constructor});

	return constructor;

};
/*!
## Class.helpers;

A home for helper methods that do not need to be class or instance methods.
*/

Class.helpers = {};

/*!
### Class.helpers.get_traits(constructor);
*/

Class.helpers.get_traits = function (constructor) {

	if (!constructor.prototype) {
		constructor = constructor.constructor;
	}

	if (!constructor.traits) {
		var class_constructor = Class.helpers.get_class_constructor(constructor);

		Object.defineProperty(constructor, 'traits', {value: [
			class_constructor.instance
		]});
	}

	return constructor.traits;

};

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

/*!
### Class.helpers.get_object_class(class_constructor);
*/

Class.helpers.get_class_namespace = function (class_constructor) {

	class_constructor = Class.helpers.get_class_constructor(class_constructor);

	if (!class_constructor.namespace) {
		Object.defineProperty(class_constructor, 'namespace', {value: {}});
	}

	return class_constructor.namespace;

};

/*!
### Class.helpers.get_dependencies(object);
*/

Class.helpers.get_dependencies = function (object) {

	if (!object.dependencies) {
		Object.defineProperty(object, 'dependencies', {value: []});
	}

	return object.dependencies;

};

/*!
### Class.helpers.get_super_class(constructor);
*/

Class.helpers.get_super_class = function (constructor) {

	if (!constructor.prototype) {
		constructor = constructor.constructor;
	}

	return constructor.super_class;

};

/*!
### Class.helpers.eval_function(name, args, body);
*/

Class.helpers.eval_function = function (name, args, body) {

	return (('indirect', eval)('(function ' + name + '(' + args + '){' + body + '})'));

};

/*!
### Class.helpers.namespace_upsert_constructor(class_constructor, constructor);
*/

Class.helpers.namespace_upsert_constructor = function (class_constructor, constructor) {

	var namespace = Class.helpers.get_class_namespace(class_constructor);

	if (typeof constructor === 'string') {
		return namespace[constructor] || Class.helpers.spawn_constructor(class_constructor, constructor);
	}

	else if (typeof constructor.name === 'string') {
		return namespace[constructor.name] || constructor;
	}

	return constructor;

}

/*!
### Class.helpers.new_error(error_message);
*/

Class.helpers.new_error = function (constructor, error_message) {

	var class_constructor = Class.helpers.get_class_constructor(constructor);

	var error_prefix = (class_constructor !== constructor) ?
		class_constructor + '(' + constructor + ')' :
		constructor;

	var class_error = new Error(error_prefix + ': ' + error_message);

	return class_error;

};

/*!
### Class.helpers.parse_class_constructor_source(class_constructor);
*/

Class.helpers.parse_class_constructor_source = function (class_constructor) {

	var source;

	if (!class_constructor.argument_names) {
		source = class_constructor.toSource();

		class_constructor.argument_names = source.substring(
			source.indexOf('(') + 1,
			source.indexOf(')')
		);
	}

	if (!class_constructor.function_body) {
		source = source || class_constructor.toSource();

		class_constructor.function_body = source.substring(
			source.indexOf('{') + 1,
			source.lastIndexOf('}')
		)
	}

};

/*!
### Class.helpers.spawn_constructor(class_constructor, constructor_name);
*/

Class.helpers.spawn_constructor = function (class_constructor, constructor_name) {

	Class.helpers.parse_class_constructor_source(class_constructor);

	return Class.helpers.eval_function(
		constructor_name,
		class_constructor.argument_names,
		class_constructor.function_body.replace(class_constructor.name, constructor_name)
	);

};

/*!
### Class.helpers.spawn_prototype_constructor(class_constructor, constructor_prototype);
*/

Class.helpers.spawn_prototype_constructor = function (class_constructor, constructor_prototype) {

	var constructor = constructor_prototype.constructor;

	if (!constructor.name) {
		throw Class.helpers.new_error(class_constructor, 'Invalid constructor name.');
	}

	constructor.prototype = constructor_prototype;

	return Class.helpers.namespace_upsert_constructor(class_constructor, constructor);

};

/*!
## Class.instance;

New classes start with Class.instance as a trait. This provides default instance methods for new classes.
*/

Class.instance = {};

/*!
### Class.instance.initialize();
*/

Class.instance.initialize = function () {

	return this;

};

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

/*!
## Class.prototype;

Properties are copied from Class.prototype and given to new classes.
This is necessary because it is currently not possible to use Object.create()
on a Function. 
*/

/*!
### Class.prototype.include(derivatices...);
*/

Class.include =
Class.prototype.include = function () {

	var new_derivatives = [].slice.call(arguments);

	new_derivatives.forEach(this.decorate.bind(this));

	return this;

};

/*!
### Class.prototype.create(object, constructor);
*/

Class.create =
Class.prototype.create = function (object, constructor) {

	constructor = constructor || this;

	object = object || Object.create(constructor.prototype);

	Class.helpers.get_dependencies(object);

	var traits = Class.helpers.get_traits(this);

	traits.forEach(this.install.bind(constructor, object));

	return object;

};

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
	}

	return context[name] = value;

	function push_dependency (dependency) {

		if (typeof dependency === 'string') {
			context.dependencies.push(dependency);
		}

	}

};

/*!
### Class.prototype.extend(constructor);
*/

Class.extend =
Class.prototype.extend = function (constructor) {

	var derivatives = [].slice.call(arguments, 1);

	constructor = this.initialize.call(this, constructor);

	constructor.inherits(this);

	constructor.include.apply(constructor, derivatives);

	return constructor;

};

/*!
### Class.prototype.composed(object);

1. object - Object.

Checks if an object is an instance of the this class, or if this class
is a trait of the object and therefore helped in its composition.

Returns a Boolean.
*/

Class.composed =
Class.prototype.composed = function (object) {

	if (object === this) return true;

	if (object instanceof this) return true;

	if (object.isPrototypeOf(this.prototype)) return true;

	var object_constructor = object.constructor;

	if (!object_constructor) return false;

	if (object_constructor === this || object_constructor === Object) {
		return true;
	}

	var object_traits = Class.helpers.get_traits(object);

	if (object_traits[this.name] === this) return true;

	if (object_traits.indexOf(this) !== -1) return true;

	if (object.super_class && object.super_class) {
		return this.composed(object.super_class);
	}

	var super_class = Class.helpers.get_super_class(object_constructor);

	if (super_class && super_class.derives) {
		return super_class.composed(object);
	}

	return false;

};

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

/*!
### Class.prototype.initialize(definition, traits...);

1. definition - String, Function, Object.
2. traits... - String, Function, Object.

Returns a Function.
*/

Class.initialize =
Class.prototype.initialize = function () {

	return Class.construct.apply(this.constructor, arguments);

};

/*!
### Class.prototype.install(object, trait);

1. object - any Object.
2. trait - String | Function | Object.

Gives an object a trait.

Returns this Function - class constructor.
*/

Class.install =
Class.prototype.install = function (object, trait) {

	object = object || Object.create(this.prototype);

	var traits = Class.helpers.get_traits(this),
	    namespace = Class.helpers.get_class_namespace(this);

	if (typeof trait === 'string') {
		trait = namespace[trait];
	}

	if (typeof trait === 'function') {
		if (typeof trait.create === 'function') {
			trait.create(this.prototype);
		}

		else {
			trait.call(this, this.prototype);
		}
	}

	if (typeof trait === 'object' && trait) {
		if (typeof trait.constructor === 'object' && trait.constructor) {
			Object.keys(trait.constructor).forEach(function (name) {

				this.define(name, trait.constructor[name], this);

			}.bind(this));
		}

		Object.keys(trait).forEach(function (name) {

			this.define(name, trait[name]);

		}.bind(this));
	}

	return this;

};

/*!
### Class.prototype.toSouce();

Returns a String - the raw source of the constructor function.
*/

if (!Class.prototype.toSource) {
	Class.toSource =
	Class.prototype.toSource =
		Function.prototype.toSource ||
		Function.prototype.toString;
}

/*!
### Class.prototype.toString();

Returns a String - the name of the class.
*/

Class.toString =
Class.prototype.toString = function () {

	return this.name;

};

/*!
## Class.register(constructor);

1. constructor - String, Function, Object.

Creates a new constructor function with a name and stores it in a namespace.

Returns a Function.
*/

Class.register = function (constructor) {

	var namespace = Class.helpers.get_class_namespace(this);

	if (!constructor) {
		throw Class.helpers.new_error(this, 'Null constructor.');
	}

	constructor = Class.helpers.namespace_upsert_constructor(this, constructor);

	if (typeof constructor === 'object' && constructor) {
		constructor = Class.helpers.spawn_prototype_constructor(this, constructor);
	}

	if (typeof constructor !== 'function') {
		throw Class.helpers.new_error(this, 'Invalid constructor.');
	}

	if (typeof constructor.name !== 'string' || (/[^A-Za-z0-9$_]/).test(constructor.name)) {
		throw Class.helpers.new_error(this, 'Invalid constructor name.');
	}

	if (namespace[constructor.name] && namespace[constructor.name] !== constructor) {
		if (namespace[constructor.name].toSource() === constructor.toString()) {
			return namespace[constructor];
		}

		throw Class.helpers.new_error(this, constructor.name + ' is already registered.');
	}

	return namespace[constructor.name] = constructor;

};

/*!
## Class.version;

Exposes the semantic version number. 
*/

Class.version = '0.0.1';

