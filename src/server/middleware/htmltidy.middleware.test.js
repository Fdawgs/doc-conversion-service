const fs = require('fs');
const httpMocks = require('node-mocks-http');
const Middleware = require('./htmltidy.middleware');

const { serverConfig } = require('../../config');

describe('Htmltidy2 conversion middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = Middleware();

		expect(typeof middleware).toBe('function');
	});

	test('Should tidy HTML file', async () => {
		const middleware = Middleware(serverConfig.routes.html.htmltidy);
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			)
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(typeof req.body).toBe('string');
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});
});
