const fs = require('fs');
const httpMocks = require('node-mocks-http');
const isHtml = require('is-html');
const Middleware = require('./embed-html-images.middleware');

describe('Embed HTML Images middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = Middleware();

		expect(typeof middleware).toBe('function');
	});

	test('Should embed images into HTML', () => {
		const middleware = Middleware('./test_files/');
		const req = httpMocks.createRequest({
			query: {
				removeAlt: true
			}
		});
		const res = httpMocks.createResponse({
			locals: {
				body: fs.readFileSync(
					'./test_files/tester_bullet_issues-html.html',
					{ encoding: 'UTF-8' }
				),
				results: {}
			}
		});
		const next = jest.fn();

		middleware(req, res, next);

		expect(/alt=""/gm.exec(res.locals.body)).not.toBeNull();
		expect(isHtml(res.locals.body)).toBe(true);
		expect(res.locals).toMatchObject({
			body: expect.any(String),
			results: { embedded_images: 'Fixed' }
		});
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should flag file as passed if no issues found', () => {
		const middleware = Middleware('./test_files/');
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse({
			locals: {
				body: fs.readFileSync('./test_files/empty-test.html', {
					encoding: 'UTF-8'
				}),
				results: {}
			}
		});
		const next = jest.fn();

		middleware(req, res, next);

		expect(isHtml(res.locals.body)).toBe(true);
		expect(res.locals).toMatchObject({
			body: expect.any(String),
			results: { embedded_images: 'Passed' }
		});
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should build res.locals.results if not defined', () => {
		const middleware = Middleware('./test_files/');
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse({
			locals: {
				body: fs.readFileSync(
					'./test_files/tester_bullet_issues-html.html',
					{ encoding: 'UTF-8' }
				)
			}
		});
		const next = jest.fn();

		middleware(req, res, next);

		expect(isHtml(res.locals.body)).toBe(true);
		expect(res.locals).toMatchObject({
			body: expect.any(String),
			results: { embedded_images: 'Fixed' }
		});
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should pass an error to next if temp directory not defined', () => {
		const middleware = Middleware();
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse({
			locals: {
				body: fs.readFileSync(
					'./test_files/tester_bullet_issues-html.html',
					{ encoding: 'UTF-8' }
				),
				results: {}
			}
		});
		const next = jest.fn();

		middleware(req, res, next);

		expect(isHtml(res.locals.body)).toBe(true);
		expect(res.locals.results.embedded_images).toBeUndefined();
		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe(
			'Invalid HTML passed to embedHtmlImages middleware'
		);
	});

	test('Should pass an error to next if temp directory missing', async () => {
		const middleware = Middleware();
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);

		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe(
			'Invalid HTML passed to embedHtmlImages middleware'
		);
	});
});
