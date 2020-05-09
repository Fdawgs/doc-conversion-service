const fs = require('fs');
const httpMocks = require('node-mocks-http');
const cleanCssMiddleware = require('./clean-css.middleware');

describe('Clean CSS middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = cleanCssMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should clean CSS and change font', async () => {
		const middleware = cleanCssMiddleware();
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			),
			query: {
				fonts: 'arial'
			}
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof res.locals.results).toBe('object');
		expect(res.locals.results.clean_css).toBe('Fixed');
		expect(/font-family: arial;/gm.exec(req.body)).not.toBeNull();
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should continue to parse style elements with no type attribute', async () => {
		const middleware = cleanCssMiddleware();
		const req = {
			body: fs.readFileSync('./test_files/empty-test-style.html', {
				encoding: 'UTF-8'
			})
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof res.locals.results).toBe('object');
		expect(res.locals.results.clean_css).toBe('Fixed');
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should flag file as passed if no issues found', async () => {
		const middleware = cleanCssMiddleware();
		const req = {
			body: fs.readFileSync('./test_files/empty-test.html', {
				encoding: 'UTF-8'
			})
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof res.locals.results).toBe('object');
		expect(res.locals.results.clean_css).toBe('Passed');
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should build res.locals.results if not defined', async () => {
		const middleware = cleanCssMiddleware();
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			)
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof res.locals.results).toBe('object');
		expect(res.locals.results.clean_css).toBe('Fixed');
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});
});
