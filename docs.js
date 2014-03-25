var fs = require('fs'),
		path = require('path');

var hljs = require('highlight.js'),
		marked = require('marked'),
		mustache = require('mustache');

var template_dir = './docs-templates';

// install highlight.js as the highlighter for marked
// use all other default options
marked.setOptions({
	highlight: function(code, lang) {

		var hl;

		try {
			hl = hljs.highlight(lang, code);
		}

		catch (e) {
			return code;
		}

		return hl.value;

	}
});

parse_docs('./dass.js', './README.md', './docs.html');

function parse_docs (source, md_destination, html_destination, options) {

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

		var docs = segment.docs;

		docs = docs.replace(/^[\n\r]+/, '');
		docs = docs.replace('/[\n\r]+$/', '');

		output += segment.docs;

		var code = segment.code;

		code = code.replace(/^[\n\r]+/, '');
		code = code.replace('/[\n\r]+$/', '')

		if (!/\S/.test(code)) return;

		output += '```javascript' + segment.code + '```';

	});

	fs.writeFileSync(md_destination, output);

	fs.writeFileSync(html_destination, html_docs(marked(output, null, options)));

	console.log('Documentation generated in ' + (Date.now() - start) + ' ms.');

}

function html_docs (markdown_fragment, template_name, options) {

	options = options || {};

	template_name = template_name || options.template || 'default';

	template = fs.readFileSync(template_dir + '/' + template_name + '.mustache', 'utf-8');

	options.content = markdown_fragment || options.input;

	options.title = options.title ? options.title : 'Docs';

	options.css_inline = options.css_inline || fs.readFileSync(template_dir + '/' + template_name + '.css', 'utf-8');

	if (options.css_link) {
		delete options.css_inline;
	}

	options.css_hljs_theme = options.css_hljs_theme ||
		'http://highlightjs.org/static/styles/tomorrow.css'

	return mustache.render(template, options);

}

