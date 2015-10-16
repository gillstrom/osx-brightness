'use strict';
var execFile = require('child_process').execFile;
var inRange = require('in-range');
var Promise = require('pinkie-promise');
var pify = require('pify');
var parse = require('json-promise').parse;

function getBrightness(str) {
	return new Promise(function (resolve, reject) {
		var regex = new RegExp('"brightness"={(.*?)}');
		str = regex.exec(str);

		if (!str) {
			reject(new Error('This display is not supported'));
		}

		return parse(JSON.parse(str[0].substring(str[0].indexOf('{'), str[0].lastIndexOf('}') + 1).replace(/\=/g, ':'))).then(function (res) {
			resolve(res.value / res.max);
		});
	});
}

exports.get = function () {
	if (process.platform !== 'darwin') {
		return Promise.reject(new Error('Only OS X systems are supported'));
	}

	var cmd = 'ioreg';
	var args = [
		'-c',
		'AppleBacklightDisplay',
		'-r',
		'-d',
		1
	];

	return pify(execFile, Promise)(cmd, args).then(function (stdout) {
		if (stdout) {
			return getBrightness(stdout);
		}

		args[1] = 'AppleDisplay';

		return pify(execFile, Promise)(cmd, args).then(function (stdout) {
			if (!stdout) {
				return Promise.reject(new Error('This display is not supported'));
			}

			return getBrightness(stdout);
		});
	});
};

exports.set = function (val) {
	if (process.platform !== 'darwin') {
		return Promise.reject(new Error('Only OS X systems are supported'));
	}

	if (typeof val !== 'number' || isNaN(val)) {
		return Promise.reject(new TypeError('Expected a number'));
	}

	if (!inRange(val, 1)) {
		return Promise.reject(new Error('Expected a value between 0 and 1'));
	}

	return pify(execFile, Promise)('./main', [val], {cwd: __dirname});
};
