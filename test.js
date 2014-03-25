try {
	Class = Class || require('./output');
} catch (err) {}

Emitter = new Class('Emitter');

Options = new Class('Options');

Publisher = new Class('Publisher').inherits('Emitter').include('Options', function (def) {

	def.initialize = function () {};

});


assert(Publisher.constructor === Class);

var publisher = new Publisher();

assert(publisher.constructor === Publisher);

assert(Publisher.constructor === Class);

// Publisher.begetter = Class;

// Publisher.superior = Emitter;

assert(Publisher.class_constructor = Class);

assert(Class.constructor === Function);


// debugger;
assert(Options === new Class('Options'));

assert(Options.derived(publisher) === true);

assert(Options.derived(Publisher) === true);

assert(Emitter.derived(Publisher) === true);

assert(Class.derived(Publisher));


function assert (bool) {

	console.log(!!bool);

	if (!bool) {
		throw new Error('Failure.');
	}

}
