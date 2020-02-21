const fs = require('fs');
const httpMocks = require('node-mocks-http');
const cleanCssMiddleware = require('./clean-css.middleware');

describe('Clean CSS middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = cleanCssMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should clean CSS', async () => {
		const middleware = cleanCssMiddleware('arial, sans-serif', 10);
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			),
			results: {}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.results.clean_css).toBe('Fixed');
		expect(next).toHaveBeenCalledTimes(1);
		expect(/font-size:\s*([0-9])px;/gm.exec(req.body)).toBeNull();
	});

	test('Should build req.results if not defined', async () => {
		const middleware = cleanCssMiddleware(10, 'arial, sans-serif');
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
