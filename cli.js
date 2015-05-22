#!/usr/bin/env node
'use strict';
var meow = require('meow');
var osxBrightness = require('./');

var cli = meow({
	help: [
		'Example',
		'  $ osx-brightness',
		'  $ osx-brightness 75'
	].join('\n')
});

var steps = cli.input[0] || process.argv.slice(2)[0];

if (steps) {
	osxBrightness.set(parseFloat(steps, 10), function (err) {
		if (err) {
			console.error(err.message);
			process.exit(1);
		}
	});
} else {
	osxBrightness.get(function (err, bright) {
		if (err) {
			console.error(err.message);
			process.exit(1);
		}

		console.log(bright);
	});
}
