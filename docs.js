var fs = require('fs'),
		path = require('path');

parse_docs('./output.js', './README.md', './docs.html');

function parse_docs (source, md_destination, html_destination) {

	var input = fs.readFileSync(source).toString(),
			start = Date.now(),
			output = '',
			segment,
	    segments = [],
	    next_block_comment = input.indexOf('/*!'),
	    end_next_block_comment;

	while (next_block_comment !== -1) {
		if (segment) {
			segment.code = input.substring(end_next_block_comment + 2, next_block_comment);
		}

		end_next_block_comment = input.indexOf('*/', next_block_comment);

		segment = {};

		segment.docs = input.substring(next_block_comment + 3, end_next_block_comment)

		next_block_comment = input.indexOf('/*!', next_block_comment + 3);

		segments.push(segment);
	}

	if (segment) {
		segment.code = input.substr(end_next_block_comment + 2);
	}

	// console.log(segments.length + ' segments.');

	segments.forEach(function (segment) {

		output += '\n' + segment.docs;

		output += '\n```javascript\n' + segment.code + '\n```\n';

	});

	fs.writeFileSync(md_destination, output);

	fs.writeFileSync(html_destination, html_docs(require('marked')(output)));

	console.log('Documentation generated in ' + (Date.now() - start) + ' ms.');

}

function html_docs (markdown_fragment) {

	var html = '';

	html += markdown_fragment;

	return html;

}
