const fs = require('fs');
const htmlTidyMiddleware = require('./htmltidy.middleware');
const { serverConfig } = require('../../config');

describe('Htmltidy2 conversion middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = htmlTidyMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should tidy HTML file', async () => {
		const middleware = htmlTidyMiddleware(
			serverConfig.html_parsing.htmltidy
		);
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			),
			results: {}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(next).toHaveBeenCalledTimes(1);
	});
});
