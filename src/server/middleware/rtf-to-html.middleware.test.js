const fs = require('fs');
const httpMocks = require('node-mocks-http');
const isHtml = require('is-html');
const Middleware = require('./rtf-to-html.middleware');

describe('RTF-to-HTML conversion middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = Middleware();

		expect(typeof middleware).toBe('function');
	});

	// eslint-disable-next-line jest/no-commented-out-tests
	test('Should convert RTF file to HTML', async () => {
		const middleware = Middleware();
		const req = {
			body: fs.readFileSync('./test_files/test-rtf.rtf'),
			headers: {
				'content-type': 'application/rtf'
			}
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(typeof res.locals.body).toBe('string');
		expect(isHtml(res.locals.body)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should pass an error to next if RTF file missing', async () => {
		const middleware = Middleware();
		const req = {
			body: undefined,
			headers: {
				'content-type': 'application/rtf'
			}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);

		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe(
			'Failed to convert RTF file to HTML'
		);
	});
});
