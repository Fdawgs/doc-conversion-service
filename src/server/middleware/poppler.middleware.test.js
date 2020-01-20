const fs = require('fs');
const popplerMiddleware = require('./poppler.middleware');
const { serverConfig } = require('../../config');

describe('Poppler conversion middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = popplerMiddleware(serverConfig.html_parsing.poppler);
		expect(typeof middleware).toBe('function');
	});

	test('Should convert PDF to HTML', async () => {
		const middleware = popplerMiddleware();

		const req = {
			body: fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf', {
				encoding: 'UTF-8'
			}),
			results: {}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.body).toBe('string');
		expect(typeof req.doclocation).toBe('object');
		expect(fs.existsSync(req.doclocation.html)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should convert PDF to HTML and place in specified directory', async () => {
		const middleware = popplerMiddleware({
			tempDirectory: './src/server/temp/',
			encoding: 'UTF-8'
		});

		const req = {
			body: fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf', {
				encoding: 'UTF-8'
			}),
			results: {}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.body).toBe('string');
		expect(typeof req.doclocation).toBe('object');
		expect(fs.existsSync(req.doclocation.html)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
	});
});
