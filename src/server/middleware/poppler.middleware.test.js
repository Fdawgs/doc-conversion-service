const fs = require('fs');
const httpMocks = require('node-mocks-http');
const isHtml = require('is-html');
const Middleware = require('./poppler.middleware');
const { serverConfig } = require('../../config');

describe('Poppler conversion middleware', () => {
	afterAll(() => {
		fs.rmdir('./src/server/temp/', { recursive: true }, () => {});
	});

	test('Should return a middleware function', () => {
		const middleware = Middleware(serverConfig.routes.html.poppler);

		expect(typeof middleware).toBe('function');
	});

	test('Should convert PDF to HTML', async () => {
		const middleware = Middleware();

		const req = {
			body: fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf')
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(typeof req.body).toBe('string');
		expect(isHtml(req.body)).toBe(true);
		expect(typeof res.locals.doclocation).toBe('object');
		expect(fs.existsSync('./src/server/temp/')).toBe(true);
		expect(fs.existsSync(res.locals.doclocation.html)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should convert PDF to HTML and place in specified directory', async () => {
		const options = {
			tempDirectory: './src/server/temp/',
			encoding: 'UTF-8'
		};

		const middleware = Middleware(options);

		const req = {
			body: fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf')
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(typeof req.body).toBe('string');
		expect(isHtml(req.body)).toBe(true);
		expect(typeof res.locals.doclocation).toBe('object');
		expect(fs.existsSync(res.locals.doclocation.html)).toBe(true);
		expect(fs.existsSync(options.tempDirectory)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should pass an error to next if PDF file missing', async () => {
		const middleware = Middleware();

		const req = {
			body: undefined
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe(
			'Failed to convert PDF to HTML'
		);
	});
});
