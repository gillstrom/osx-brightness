'use strict';

var execFile = require('child_process').execFile;

module.exports = {
	get: function (cb) {
		if (process.platform !== 'darwin') {
			throw new Error('Only OS X are supported');
		}

		var cmd = 'ioreg';
		var args = [
			'-c',
			'AppleBacklightDisplay',
			'-r',
			'-d',
			1
		];

		execFile(cmd, args, function (err, stdout, stderr) {
			if (err) {
				cb(err);
				return;
			}

			var reg = new RegExp('"brightness"={(.*?)}');
			var str = reg.exec(stdout)[0];

			try {
				var b = JSON.parse(str.substring(str.indexOf('{'), str.lastIndexOf('}') + 1).replace(/=/g, ':'));
			} catch (err) {
				cb(err);
				return;
			}

			cb(null, b.value / b.max);
		});
	},
	set: function (val, cb) {
		if (process.platform !== 'darwin') {
			throw new Error('Only OS X are supported');
		}

		if ((typeof val !== 'number' && typeof val !== 'string') || isNaN(parseInt(val, 10))) {
			throw new Error('Expected a value');
		}

		this.get(function (err, res) {
			if (err) {
				cb(err);
				return;
			}

			var current = (res * 64);
			var steps = Math.round((val / 100) * 64) - current;

			if (val > 0 && current + steps < 1) {
				steps = steps + 1;
			}

			if (steps === 0) {
				cb();
			}

			var cmd = 'osascript';
			var args = [
				"-e",
				"tell application \"System Events\" to repeat " + Math.abs(steps) + " times",
				"-e",
				"key code " + (steps < 0 ? 107 : 113) + ' using {shift down, option down}',
				"-e",
				"end repeat"
			];

			execFile(cmd, args, cb);
		});
	}
};
