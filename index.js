'use strict';
var execFile = require('child_process').execFile;
var inRange = require('in-range');

function getBrightness(str, cb) {
	var regex = new RegExp('"brightness"={(.*?)}');
	var b;

	str = regex.exec(str);

	if (!str) {
		cb(new Error('This display is not supported'));
		return;
	}

	try {
		b = JSON.parse(str[0].substring(str[0].indexOf('{'), str[0].lastIndexOf('}') + 1).replace(/=/g, ':'));
	} catch (err) {
		cb(err);
		return;
	}

	cb(null, b.value / b.max);
}

exports.get = function (cb) {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	var cmd = 'ioreg';
	var args = [
		'-c',
		'AppleBacklightDisplay',
		'-r',
		'-d',
		1
	];

	execFile(cmd, args, function (err, stdout) {
		if (err) {
			cb(err);
			return;
		}

		if (stdout) {
			getBrightness(stdout, cb);
			return;
		}

		args[1] = 'AppleDisplay';

		execFile(cmd, args, function (err, stdout) {
			if (err) {
				cb(err);
				return;
			}

			if (!stdout) {
				cb(new Error('This display is not supported'));
				return;
			}

			getBrightness(stdout, cb);
		});
	});
};

exports.set = function (val, cb) {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	if (typeof val !== 'number' || isNaN(val)) {
		throw new TypeError('Expected a number');
	}

	if (!inRange(val, 1)) {
		cb(new Error('Expected a value between 0 and 1'));
		return;
	}

	execFile('./main', [val], {cwd: __dirname}, function (err) {
		if (err) {
			cb(err);
			return;
		}

		cb();
	});
};
