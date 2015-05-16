#!/usr/bin/env node
'use strict';

var meow = require('meow');
var brightness = require('./');

var cli = meow({
	help: [
		'Usage',
		'	$ osx-brightness',
		'	$ osx-brightness <steps>',
		'',
		'Example',
		'	$ osx-brightness',
		'		=> 0.4375',
		'	$ osx-brightness 5',
		'	$ osx-brightness -5'
	].join('\n')
});

var steps = cli.input[0] || process.argv.slice(2)[0];

if (steps) {
	brightness.set(steps, function (err) {
		if (err) {
			console.error(err.message);
			process.exit(1);
		}

		console.log('Brightness changed by ' + steps + ' steps.');
	});
} else {
	brightness.get(function (err, lvl) {
		if (err) {
			console.error(err.message);
			process.exit(1);
		}

		console.log(lvl);
	});
}


