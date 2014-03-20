var fs = require('fs'),
		path = require('path');

concat_and_save('./src', './output.js');

function concat_and_save (filename, destination) {

	var	output = '',
			started = Date.now();

	concat_directory(filename);

	fs.writeFileSync(destination, output);

	console.log('Build finished in ' + (Date.now() - started) + ' ms.');

	function get_directory (dir) {

		var list = fs.readdirSync(dir, {flats: 'rs-'});

		if (dir.charAt(dir.length - 1) !== path.sep) {
			dir += path.sep;
		}

		list = list.filter(function (filename) {

			var extention = path.extname(filename);

			return extention === '.js' || extention === '';

		});

		list.sort(function (a, b) {

			if (a + '.js' === b) return 1;

			if (b + '.js' === a) return -1;

			return 0;

		});

		list = list.map(function (file) {

			return dir + file;

		});

		return list;

	}

	function concat_directory (filename) {

		var stats = fs.statSync(filename);

		if (stats.isDirectory()) {
			get_directory(filename).forEach(concat_directory);
		}

		else if (stats.isFile()) {		
			concat_file(filename);
		}

	}

	function concat_file (filename) {

		if (path.extname(filename) !== '.js') return;

		// console.log(filename);

		output += fs.readFileSync(filename, {flag: 'rs+'}) + '\n';

	}

}
