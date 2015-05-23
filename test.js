'use strict';
var test = require('ava');
var osxBrightness = require('./');

if (!process.env.CI) {
	test('get level', function (t) {
		t.plan(2);

		osxBrightness.get(function (err, brightness) {
			t.assert(!err, err);
			t.assert(typeof brightness === 'number');
		});
	});

	test('set level to 50%', function (t) {
		t.plan(3);

		osxBrightness.set(0.5, function (err) {
			t.assert(!err, err);

			osxBrightness.get(function (err, brightness) {
				t.assert(!err, err);
				t.assert(brightness === 0.5);
			});
		});
	});
}
