/*!
# new Class(definition, traits...);

1. definition - String, Function, Object.
2. traits... - String, Function, Object.

Constructs JavaScript classes that provide easy type introspection and remove the need for boilerplate code.
Also has inheritance and depedency injection built in. Aims to be a lightweight, and simple implementation that
can be easily monkey patched if need be.

Returns a Function.
*/

"use strict";

function Class () {

	return this.initialize.apply(this, arguments);

}

if (typeof module !== 'undefined') {
	module.exports = Class;

	global.Class = global.Class || Class;
}

if (typeof window !== 'undefined') {
	window.Class = window.Class || Class;
}
