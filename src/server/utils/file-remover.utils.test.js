const faker = require('faker');
const fs = require('fs');
const Util = require('./file-remover.utils');

describe('File remover utility', () => {
	test('Should remove test file from path', () => {
		const testPath = `./${faker.system.fileName('txt')}`;
		fs.writeFileSync(testPath, faker.lorem.sentences());

		Util(testPath);

		expect(fs.existsSync(testPath)).toBe(false);
	});
});
