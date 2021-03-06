import path from 'path';
import test from 'ava';
import execa from 'execa';
import cpy from 'cpy';
import del from 'del';

test.before(async () => {
	await execa('npm', ['link']);
});

test.after(async () => {
	await execa('npm', ['unlink']);
});

test('local', async t => {
	await cpy(
		['package.json', 'index.js', 'fixtures/cli.js'],
		path.join(__dirname, 'fixtures/local/node_modules/import-local-file'),
		{parents: true}
	);

	const {stdout} = await execa('import-local-file-fixture', {
		preferLocal: false,
		cwd: path.join(__dirname, 'fixtures/local')
	});
	t.is(stdout, 'local');

	await del(path.join(__dirname, 'fixtures/local/node_modules'));
});

test('global', async t => {
	const {stdout} = await execa('import-local-file-fixture', {
		preferLocal: false,
		cwd: path.join(__dirname, 'fixtures/global')
	});
	t.is(stdout, '');
});

