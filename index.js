'use strict';

var execFile = require('child_process').execFile;

module.exports = function (steps, cb) {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X are supported');
	}

	if (!steps || isNaN(steps)) {
		throw new Error('Argument has to be a number');
	}

	var cmd = 'osascript';
	var args = [
		"-e",
		"tell application \"System Events\" to repeat " + Math.abs(steps) + " times",
		"-e",
		"key code " + (steps < 0 ? 107 : 113),
		"-e",
		"end repeat"
	];

	execFile(cmd, args, cb);
};
