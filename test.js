'use strict';
var test = require('ava');
var brightness = require('./');

test('get level', function (t) {
	if (process.env.CI) {
		t.end();
	}

	t.plan(2);

	brightness.get(function (err, lvl) {
		t.assert(!err, err);
		t.assert(typeof lvl === 'number', lvl);
	});
});

test('set level to 50%', function (t) {
	if (process.env.CI) {
		t.end();
	}

	t.plan(2);

	brightness.set(50, function (err) {
		setTimeout(function () {
			brightness.get(function (err, lvl) {
				t.assert(!err, err);
				t.assert(lvl === 0.5, lvl);
			});
		}, 500);
	});
});
