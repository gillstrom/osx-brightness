'use strict';
var test = require('ava');
var osxBrightness = require('./');

test('get level', function (t) {
	if (process.env.CI) {
		t.end();
	}

	t.plan(2);

	osxBrightness.get(function (err, brightness) {
		t.assert(!err, err);
		t.assert(typeof brightness === 'number', brightness);
	});
});

test('set level to 50%', function (t) {
	if (process.env.CI) {
		t.end();
	}

	t.plan(2);

	osxBrightness.set(0.5, function (err) {
		setTimeout(function () {
			osxBrightness.get(function (err, brightness) {
				t.assert(!err, err);
				t.assert(brightness === 0.5, brightness);
			});
		}, 500);
	});
});
