const fs = require('fs');
const fileRemoverUtil = require('./file-remover.utils');

describe('Error handler utility', () => {
	test('Should remove test file from path', () => {
		const testPath = './message.txt';
		fs.writeFileSync(testPath, 'test');

		fileRemoverUtil(testPath);

		expect(fs.existsSync(testPath)).toBe(false);
	});
});
