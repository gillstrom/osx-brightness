'use strict';

var execFile = require('child_process').execFile;
var stream = require('stream');
var grep = require('grep1');

function streamText(text) {
    var s = new stream.Readable();
    s.push(text);
    s.push(null);
    return s;
}

module.exports = {
	get: function (cb) {
		if (process.platform !== 'darwin') {
			throw new Error('Only OS X are supported');
		}

		var cmd = 'ioreg';
		var args = [
			'-c',
			'AppleBacklightDisplay'
		];

		execFile(cmd, args, function (err, stdout, stderr) {
			if (err) {
				cb(err);
			}

			var search = grep('brightness');
			var str = '';

			search.on('data', function (d) {
				str += d;
			}).on('end', function () {
				var obj = JSON.parse(str.substring(str.indexOf('{'), str.lastIndexOf('}') + 1).replace(/=/g, ':'));

				cb(null, obj.brightness.value / obj.brightness.max);
			});

			streamText(stdout).pipe(search);
		});
	},
	set: function (steps, cb) {
		if (process.platform !== 'darwin') {
			throw new Error('Only OS X are supported');
		}

		if (!steps || isNaN(steps)) {
			throw new Error('Steps has to be a number');
		} else {
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
		}
	}
};
