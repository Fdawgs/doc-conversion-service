const fs = require('fs');
const httpMocks = require('node-mocks-http');
const popplerMiddleware = require('./poppler.middleware');
const { serverConfig } = require('../../config');

describe('Poppler conversion middleware', () => {
	afterAll(async () => {
		fs.rmdir('./src/server/temp/', { recursive: true }, () => {});
	});

	test('Should return a middleware function', () => {
		const middleware = popplerMiddleware(serverConfig.routes.html.poppler);
		expect(typeof middleware).toBe('function');
	});

	test('Should convert PDF to HTML', async () => {
		const middleware = popplerMiddleware();

		const req = {
			body: fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf'),
			results: {}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.body).toBe('string');
		expect(typeof req.doclocation).toBe('object');
		expect(fs.existsSync(req.doclocation.html)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should convert PDF to HTML and place in specified directory', async () => {
		const options = {
			tempDirectory: './src/server/temp/',
			encoding: 'UTF-8'
		};

		const middleware = popplerMiddleware(options);

		const req = {
			body: fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf'),
			results: {}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.body).toBe('string');
		expect(typeof req.doclocation).toBe('object');
		expect(fs.existsSync(req.doclocation.html)).toBe(true);
		expect(fs.existsSync(options.tempDirectory)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
	});
});
