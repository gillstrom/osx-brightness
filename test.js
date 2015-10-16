import test from 'ava';
import fn from './';

test('get level', async t => {
	const level = await fn.get();

	t.assert(typeof level === 'number');
	t.assert(level > 0 && level <= 1);
});

test('set level to 50%', async t => {
	await fn.set(0.5);
	t.assert(await fn.get() === 0.5);
});
