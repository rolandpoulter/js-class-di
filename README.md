# new Class(definition, traits...);

1. definition - String, Function, Object.
2. traits... - String, Function, Object.

Constructs JavaScript classes that provide easy type introspection and remove the need for boilerplate code.
Also has inheritance and depedency injection built in. Aims to be a lightweight, and simple implementation that
can be easily monkey patched if need be.

Returns a Function.

## Class.version;

Exposes the semantic version number. 

## Class.construct(constructor, traits...);

1. constructor - String, Function, Object.
2. traits... - String, Function, Object.

Returns a Function.

## Class.helpers;

A home for helper methods that do not need to be class or instance methods.

### Class.helpers.eval_function(name, args, body);

### Class.helpers.get_class_constructor(object);

### Class.helpers.get_object_class(class_constructor);

### Class.helpers.get_dependencies(object);

### Class.helpers.get_super_class(constructor);

### Class.helpers.get_traits(constructor);

### Class.helpers.namespace_upsert_constructor(class_constructor, constructor);

### Class.helpers.new_error(error_message);

### Class.helpers.parse_class_constructor_source(class_constructor);

### Class.helpers.spawn_constructor(class_constructor, constructor_name);

### Class.helpers.spawn_prototype_constructor(class_constructor, constructor_prototype);

## Class.instance;

New classes start with Class.instance as a trait. This provides default instance methods for new classes.

### Class.instance.initialize();

### Class.instance.inject(overrides?, context?);

## Class.get(name);

## Class.register(constructor);

1. constructor - String, Function, Object.

Creates a new constructor function with a name and stores it in a namespace.

Returns a Function.

## Class.set(name, value);

## Class.prototype;

Properties are copied from Class.prototype and given to new classes.
This is necessary because it is currently not possible to use Object.create()
on a Function. 

### Class.prototype.create(object, constructor);

### Class.prototype.decorate(trait);

### Class.prototype.define(name, value, context);

### Class.prototype.derived(object);

1. object - Object.

Checks if an object is an instance of the this class, or if this class
is a trait of the object and therefore helped in its composition.

Returns a Boolean.

### Class.prototype.extend(constructor);

### Class.prototype.include(derivatices...);

### Class.prototype.inherits(super_class);

### Class.prototype.initialize(definition, traits...);

1. definition - String, Function, Object.
2. traits... - String, Function, Object.

Returns a Function.

### Class.prototype.install(object, trait);

1. object - any Object.
2. trait - String | Function | Object.

Gives an object a trait.

Returns this Function - class constructor.

### Class.prototype.toSouce();

Returns a String - the raw source of the constructor function.

### Class.prototype.toString();

Returns a String - the name of the class.
