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
			},
			results: {}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.results).toBe('object');
		expect(req.results.clean_css).toBe('Fixed');
		expect(next).toHaveBeenCalledTimes(1);
		expect(/font-family: arial;/gm.exec(req.body)).not.toBeNull();
	});

	test('Should flag file as passed if no issues found', async () => {
		const middleware = cleanCssMiddleware();
		const req = {
			body: fs.readFileSync(
				'./test_files/empty-test.html',
				{ encoding: 'UTF-8' }
			),
			results: {}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.results).toBe('object');
		expect(req.results.clean_css).toBe('Passed');
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should build req.results if not defined', async () => {
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
		expect(typeof req.results).toBe('object');
		expect(next).toHaveBeenCalledTimes(1);
	});
});
