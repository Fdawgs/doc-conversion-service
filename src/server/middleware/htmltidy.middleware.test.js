const fs = require('fs');
const httpMocks = require('node-mocks-http');
const isHtml = require('is-html');
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
		expect(isHtml(req.body)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should pass an error to next if HTML missing from req.body', async () => {
		const middleware = Middleware();
		const req = {
			body: undefined
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);

		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe(
			'Invalid HTML passed to htmltidy middleware'
		);
	});
});
