const fs = require('fs');
const httpMocks = require('node-mocks-http');
const Middleware = require('./clean-css.middleware');

describe('Clean CSS middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = Middleware();

		expect(typeof middleware).toBe('function');
	});

	test('Should clean CSS and change font', () => {
		const middleware = Middleware();
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

		middleware(req, res, next);

		expect(res.locals).toMatchObject({ results: { clean_css: 'Fixed' } });
		expect(/font-family: arial;/gm.exec(req.body)).not.toBeNull();
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should continue to parse style elements with no type attribute', () => {
		const middleware = Middleware();
		const req = {
			body: fs.readFileSync('./test_files/empty-test-style.html', {
				encoding: 'UTF-8'
			})
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.locals).toMatchObject({ results: { clean_css: 'Fixed' } });
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should flag file as passed if no issues found', () => {
		const middleware = Middleware();
		const req = {
			body: fs.readFileSync('./test_files/empty-test.html', {
				encoding: 'UTF-8'
			})
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.locals).toMatchObject({ results: { clean_css: 'Passed' } });
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should build res.locals.results object if not defined', () => {
		const middleware = Middleware();
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			)
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.locals).toMatchObject({ results: { clean_css: 'Fixed' } });
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});
});
