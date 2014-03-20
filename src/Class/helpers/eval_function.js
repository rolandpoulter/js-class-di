/*!
### Class.helpers.eval_function(name, args, body);
*/

Class.helpers.eval_function = function (name, args, body) {

	return (('indirect', eval)('(function ' + name + '(' + args + '){' + body + '})'));

};
