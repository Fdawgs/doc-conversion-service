const fs = require('fs');
const httpMocks = require('node-mocks-http');
const embedHtmlImagesMiddleware = require('./embed-html-images.middleware');

describe('Embed HTML Images middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = embedHtmlImagesMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should embed images into HTML', async () => {
		const middleware = embedHtmlImagesMiddleware('./test_files/');
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			),
			query: {
				removealt: true
			}
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);
		expect(res.locals).toMatchObject({
			results: { embedded_images: 'Fixed' }
		});
		expect(/alt=""/gm.exec(req.body)).not.toBeNull();
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should flag file as passed if no issues found', async () => {
		const middleware = embedHtmlImagesMiddleware('./test_files/');
		const req = {
			body: fs.readFileSync('./test_files/empty-test.html', {
				encoding: 'UTF-8'
			})
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);
		expect(res.locals).toMatchObject({
			results: { embedded_images: 'Passed' }
		});
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should throw error if temp directory not defined', async () => {
		const middleware = embedHtmlImagesMiddleware();
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			)
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);
		expect(res.locals.results.embedded_images).toBeUndefined();
		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message.substring(0, 40)).toBe(
			'Error: ENOENT: no such file or directory'
		);
	});

	test('Should build res.locals.results if not defined', async () => {
		const middleware = embedHtmlImagesMiddleware('./test_files/');
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			)
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);
		expect(res.locals).toMatchObject({
			results: { embedded_images: 'Fixed' }
		});
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});
});
