import path from 'path';
import execa from 'execa';
import cpy from 'cpy';
import del from 'del';

beforeAll(async () => {
	await execa('npm', ['link']);
});

afterAll(async () => {
	await execa('npm', ['unlink']);
});

test('local', async () => {
	await cpy(
		['package.json', 'index.js', 'fixtures/cli.js'],
		path.join(__dirname, 'fixtures/local/node_modules/import-local-file'),
		{parents: true}
	);

	const {stdout} = await execa('import-local-file-fixture', {
		preferLocal: false,
		cwd: path.join(__dirname, 'fixtures/local')
	});
	expect(stdout).toBe('local');

	await del(path.join(__dirname, 'fixtures/local/node_modules'));
});

test('global', async () => {
	const {stdout} = await execa('import-local-file-fixture', {
		preferLocal: false,
		cwd: path.join(__dirname, 'fixtures/global')
	});
	expect(stdout).toBe('');
});

