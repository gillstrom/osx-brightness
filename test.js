import test from 'ava';
import fn from './';

test('get level', t => {
	t.plan(2);

	fn.get((err, res) => {
		t.assert(!err, err);
		t.assert(typeof res === 'number');
	});
});

test('set level to 50%', t => {
	t.plan(3);

	fn.set(0.5, err => {
		t.assert(!err, err);

		fn.get((err, res) => {
			t.assert(!err, err);
			t.assert(res === 0.5);
		});
	});
});
