const cloneDeep = require('lodash/cloneDeep');
const fs = require('fs');
const httpMocks = require('node-mocks-http');
const isHtml = require('is-html');
const Middleware = require('./pdf-to-html.middleware');
const { serverConfig } = require('../../config');

describe('PDF-to-HTML conversion middleware', () => {
	const modServerConfig = cloneDeep(serverConfig);
	modServerConfig.routes.html.poppler.tempDirectory = './src/server/temp1/';

	afterAll(() => {
		fs.rmdir('./src/server/temp/', { recursive: true }, () => {});
		fs.rmdir(
			modServerConfig.routes.html.poppler.tempDirectory,
			{ recursive: true },
			() => {}
		);
	});

	test('Should return a middleware function', () => {
		const middleware = Middleware();

		expect(typeof middleware).toBe('function');
	});

	test('Should convert PDF file to HTML', async () => {
		const middleware = Middleware();
		const req = {
			body: fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf'),
			headers: {
				'content-type': 'application/pdf'
			}
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(typeof req.body).toBe('string');
		expect(isHtml(req.body)).toBe(true);
		expect(typeof res.locals.doclocation).toBe('object');
		expect(fs.existsSync(res.locals.doclocation.html)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should convert PDF file to HTML and place in specified directory', async () => {
		const middleware = Middleware(modServerConfig.routes.html.poppler);
		const req = {
			body: fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf'),
			headers: {
				'content-type': 'application/pdf'
			}
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(typeof req.body).toBe('string');
		expect(isHtml(req.body)).toBe(true);
		expect(typeof res.locals.doclocation).toBe('object');
		expect(fs.existsSync(res.locals.doclocation.html)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
		expect(
			fs.existsSync(modServerConfig.routes.txt.poppler.tempDirectory)
		).toBe(true);
	});

	test('Should pass an error to next if PDF file missing', async () => {
		const middleware = Middleware();
		const req = {
			body: undefined,
			headers: {
				'content-type': 'application/pdf'
			}
		};
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe(
			'Failed to convert PDF file to HTML'
		);
	});
});
