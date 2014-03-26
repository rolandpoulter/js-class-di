var fs = require('fs'),
		path = require('path');

var destination = './build/dass.' + require('./package.json').version + '.js';

concat_and_save('./src', destination);

fs.writeFileSync('./dass.js', fs.readFileSync(destination));

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

		list = list.filter(function (file) {

			if (file.charAt(0) === '.') return false;

			var extention = path.extname(file);

			return extention === '.js' || extention === '';

		});

		var prepend = [];

		list.forEach(function (file, index) {

			var extention = path.extname(file);

			if (extention === '') {

				var new_index = list.indexOf(file + '.js');

				if (index > new_index) return;

				if (new_index === -1) {
					prepend.push(index);

					return;
				}

				list[index] = list[new_index];

				list[new_index] = file;

			}

		});

		prepend.forEach(function (index) {

			list.unshift(list[index]);

			list.splice(index, 1);

		});

		// console.log(list);

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
